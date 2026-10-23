use crate::{
    agent_context::{AgentContext, Owner},
    agent_stream::ModelResponse,
    conversation::{Turn, display_payload},
    error::{Error, Result},
    store::Store,
    tools,
};
use serde_json::{Value, json};
use tokio_util::sync::CancellationToken;

fn transient_model_failure(error: &Error) -> bool {
    matches!(error, Error::ModelResponse { status, code } if status == "failed" &&
        matches!(code.as_str(), "server_error" | "overloaded_error" | "temporarily_unavailable"))
}

const MAX_TOOL_ARGUMENT_BYTES: usize = 512_000;
fn parse_tool_arguments(text: &str) -> Result<Value> {
    if text.len() > MAX_TOOL_ARGUMENT_BYTES {
        return Err(Error::Invalid(
            "Tool arguments exceed the 512 KB limit".into(),
        ));
    }
    serde_json::from_str(text).map_err(|_| Error::Invalid("Tool arguments are invalid JSON".into()))
}

const INSTRUCTIONS: &str = include_str!("../prompts/workflow-assistant.txt");
const WORKFLOW_AGENT_INSTRUCTIONS: &str = include_str!("../prompts/workflow-agent.txt");
pub fn output_text(response: &Value) -> String {
    response["output"]
        .as_array()
        .into_iter()
        .flatten()
        .flat_map(|item| item["content"].as_array().into_iter().flatten())
        .filter_map(|c| c["text"].as_str())
        .collect::<Vec<_>>()
        .join("")
}
impl Store {
    pub async fn complete_model(&self, input: Value, cancel: &CancellationToken) -> Result<Value> {
        self.request_model(input, cancel, None, None).await
    }
    pub async fn request_model(
        &self,
        input: Value,
        cancel: &CancellationToken,
        tools: Option<Value>,
        instructions: Option<&str>,
    ) -> Result<Value> {
        let project = self.projects().await?.remove(0).id;
        let model = self
            .deployment_settings
            .resolve_model(
                &crate::models::Selection::default(),
                &project,
                tools.is_some(),
                false,
            )
            .await?;
        Ok(self
            .request_model_stream(input, cancel, tools, instructions, None, &model)
            .await?
            .value)
    }
    async fn request_model_stream(
        &self,
        input: Value,
        cancel: &CancellationToken,
        tools: Option<Value>,
        instructions: Option<&str>,
        turn: Option<&str>,
        model: &crate::models::Resolved,
    ) -> Result<ModelResponse> {
        crate::models::request(
            &self.deployment_settings,
            model,
            crate::models::transport::Query {
                input,
                tools,
                instructions,
                turn,
                force_tool: false,
                trace: None,
            },
            cancel,
            Some(self),
        )
        .await
    }
    #[allow(clippy::too_many_arguments)]
    pub(crate) async fn workflow_agent(
        &self,
        prompt: &str,
        run: &str,
        node: &str,
        steps: usize,
        context: &crate::control_runtime::ExecutionContext,
        model: &crate::models::Resolved,
        cancel: &CancellationToken,
    ) -> Result<Value> {
        let mut definitions = tools::visible(&Default::default(), true);
        let owner = Owner::Workflow { run, node, context };
        let mut model_context = AgentContext::default();
        model_context.configure(model, WORKFLOW_AGENT_INSTRUCTIONS, &definitions)?;
        model_context.append(vec![json!({"role":"user","content":prompt})]);
        for step in 0..steps {
            definitions = tools::visible(&model_context.loaded_tools, true);
            model_context.configure(model, WORKFLOW_AGENT_INSTRUCTIONS, &definitions)?;
            model_context
                .prepare(self, model, &owner, cancel, false)
                .await?;
            let response = self
                .request_workflow_model(
                    run,
                    node,
                    model,
                    crate::models::transport::Query {
                        input: model_context.input(),
                        tools: Some(definitions.clone()),
                        instructions: Some(WORKFLOW_AGENT_INSTRUCTIONS),
                        turn: None,
                        force_tool: false,
                        trace: None,
                    },
                    context,
                    cancel,
                )
                .await;
            let response = match response {
                Err(Error::ContextLength(_)) => {
                    model_context
                        .prepare(self, model, &owner, cancel, true)
                        .await?;
                    self.request_workflow_model(
                        run,
                        node,
                        model,
                        crate::models::transport::Query {
                            input: model_context.input(),
                            tools: Some(definitions.clone()),
                            instructions: Some(WORKFLOW_AGENT_INSTRUCTIONS),
                            turn: None,
                            force_tool: false,
                            trace: None,
                        },
                        context,
                        cancel,
                    )
                    .await?
                }
                result => result?,
            };
            let output = response["output"]
                .as_array()
                .ok_or_else(|| Error::Execution("Invalid agent output format".into()))?;
            model_context.append(output.clone());
            model_context.observe(&response);
            let calls = output
                .iter()
                .filter(|item| item["type"] == "function_call")
                .collect::<Vec<_>>();
            if calls.is_empty() {
                return Ok(json!({"result":output_text(&response),"steps":step+1}));
            }
            for call in calls {
                if cancel.is_cancelled() {
                    return Err(Error::Cancelled);
                }
                let name = call["name"].as_str().unwrap_or_default();
                let call_id = call["call_id"].as_str().unwrap_or_default();
                let args = parse_tool_arguments(call["arguments"].as_str().unwrap_or("{}"));
                let span = self
                    .begin_trace_call(
                        run,
                        node,
                        "tool",
                        name,
                        args.as_ref().cloned().unwrap_or(Value::Null),
                        json!({"callId":call_id}),
                        context,
                    )
                    .await?;
                let result = match args {
                    Ok(args) => self.run_agent_tool(run, name, args).await,
                    Err(error) => Err(error),
                };
                self.finish_trace_call(run, node, "tool", &span, &result, context)
                    .await?;
                let value = match result {
                    Ok(value) => value,
                    Err(error) => error.tool_value(),
                };
                model_context.discover(name, &value);
                let (value, _) = self
                    .context_tool_output(&model_context, &owner, &value)
                    .await?;
                model_context.append_results(json!({"type":"function_call_output","call_id":call_id,"output":value.to_string()}));
            }
        }
        Err(Error::Execution(
            "Agent reached the configured tool step limit".into(),
        ))
    }
    pub(crate) async fn agent_turn(
        &self,
        turn: &Turn,
        project: &str,
        cancel: &CancellationToken,
    ) -> Result<()> {
        let pinned_model = self.turn_model(&turn.id).await?;
        let mut definitions = tools::visible(&Default::default(), false);
        let owner = Owner::Turn(turn);
        let mut context = self
            .load_agent_context(turn, &pinned_model, INSTRUCTIONS, &definitions, cancel)
            .await?;
        loop {
            definitions = tools::visible(&context.loaded_tools, false);
            context.configure(&pinned_model, INSTRUCTIONS, &definitions)?;
            if cancel.is_cancelled() {
                return Err(Error::Cancelled);
            }
            let early = self.take_supplements(&turn.id).await?;
            for supplement in early {
                context.append(vec![
                    json!({"role":"user","content":supplement.model_text()}),
                ]);
                context.acknowledge(turn.ordinal, &supplement.id);
            }
            context
                .prepare(self, &pinned_model, &owner, cancel, false)
                .await?;
            self.turn_phase(&turn.id, "model").await?;
            let mut context_recovered = false;
            let mut transient_retries = 0;
            let mut response = loop {
                match self
                    .request_model_stream(
                        context.input(),
                        cancel,
                        Some(definitions.clone()),
                        Some(INSTRUCTIONS),
                        Some(&turn.id),
                        &pinned_model,
                    )
                    .await
                {
                    Err(Error::ContextLength(_)) if !context_recovered => {
                        context_recovered = true;
                        context
                            .prepare(self, &pinned_model, &owner, cancel, true)
                            .await?;
                        self.turn_phase(&turn.id, "model").await?;
                    }
                    Err(error @ Error::ModelResponse { .. })
                        if transient_retries == 0 && transient_model_failure(&error) =>
                    {
                        transient_retries += 1;
                        self.turn_phase(&turn.id, "retrying").await?;
                        self.emit(
                            "conversation_model_retry",
                            &turn.session_id,
                            json!({"turnId":turn.id,"attempt":2,"reason":error.to_string()}),
                        )
                        .await?;
                        tokio::select! {
                            _ = cancel.cancelled() => return Err(Error::Cancelled),
                            _ = tokio::time::sleep(std::time::Duration::from_secs(1)) => {}
                        }
                        self.turn_phase(&turn.id, "model").await?;
                    }
                    result => break result?,
                }
            };
            let output = response.value["output"]
                .as_array()
                .ok_or_else(|| Error::Execution("Invalid model output format".into()))?;
            context.append(output.clone());
            context.observe(&response.value);
            if let Some(item) = &response.text {
                context.acknowledge(turn.ordinal, &item.id);
            }
            let calls: Vec<_> = output
                .iter()
                .enumerate()
                .filter(|(_, item)| item["type"] == "function_call")
                .collect();
            if calls.len() > 32 {
                return Err(Error::Execution(
                    "Model exceeded the per-response tool call limit".into(),
                ));
            }
            if calls.is_empty() {
                if cancel.is_cancelled() {
                    return Err(Error::Cancelled);
                }
                if response.text.as_ref().is_none_or(|i| i.content.is_empty()) {
                    return Err(Error::Execution(
                        "The model did not return a displayable response".into(),
                    ));
                }
                context.finish_turn();
                context.checkpoint(self, &owner).await?;
                let supplements = self
                    .finish_turn_success(&turn.id, response.text.as_ref().map(|i| i.id.as_str()))
                    .await?;
                if supplements.is_empty() {
                    return Ok(());
                }
                for supplement in supplements {
                    context.append(vec![
                        json!({"role":"user","content":supplement.model_text()}),
                    ]);
                    context.acknowledge(turn.ordinal, &supplement.id);
                }
                continue;
            }
            let mut redirected = false;
            let mut supplements = Vec::new();
            for (index, call) in calls {
                if cancel.is_cancelled() {
                    return Err(Error::Cancelled);
                }
                let updates = self.take_supplements(&turn.id).await?;
                if !updates.is_empty() {
                    redirected = true;
                    supplements.extend(updates);
                }
                let item = response
                    .tools
                    .get_mut(&index)
                    .ok_or_else(|| Error::Execution("Missing tool call identity".into()))?;
                let name = call["name"].as_str().unwrap_or_default();
                let call_id = call["call_id"]
                    .as_str()
                    .filter(|s| !s.is_empty())
                    .ok_or_else(|| {
                        Error::Execution("The model did not provide a tool call ID".into())
                    })?;
                if redirected {
                    item.status = "cancelled".into();
                    item.payload["result"] = json!({"reason":"The user updated this turn's instructions. Unstarted calls were canceled; replan using the new instructions"});
                    self.put_item(item).await?;
                    context.append_results(json!({"type":"function_call_output","call_id":call_id,"output":"The user updated this turn's instructions. This call was not executed. Replan using the new instructions."}));
                    context.acknowledge(turn.ordinal, &item.id);
                    continue;
                }
                self.turn_phase(&turn.id, "tool").await?;
                item.status = "running".into();
                item.payload["startedAt"] = json!(crate::store::now());
                self.put_item(item).await?;
                let result =
                    match parse_tool_arguments(call["arguments"].as_str().unwrap_or_default()) {
                        Ok(args) => self.tool(project, Some(&turn.session_id), name, args).await,
                        Err(error) => Err(error),
                    };
                let (value, is_error) = match result {
                    Ok(value) => {
                        let failed = value["ok"] == false;
                        (value, failed)
                    }
                    Err(error) => (error.tool_value(), true),
                };
                if matches!(name, "run_workflow" | "test_node")
                    && !is_error
                    && let Some(run) = value["data"]["runId"].as_str()
                {
                    self.link_turn_run(&turn.id, run).await?;
                }
                context.discover(name, &value);
                item.status = if is_error { "failed" } else { "completed" }.into();
                let (model_value, result_id) =
                    self.context_tool_output(&context, &owner, &value).await?;
                item.payload["contextResultId"] = json!(result_id);
                item.payload["result"] = display_payload(&value);
                item.payload["isError"] = json!(is_error);
                item.payload["endedAt"] = json!(crate::store::now());
                self.put_item(item).await?;
                context.append_results(json!({"type":"function_call_output","call_id":call_id,"output":model_value.to_string()}));
                context.acknowledge(turn.ordinal, &item.id);
            }
            // All tool outputs precede supplementary user input, preserving the provider protocol.
            for supplement in supplements {
                context.append(vec![
                    json!({"role":"user","content":supplement.model_text()}),
                ]);
                context.acknowledge(turn.ordinal, &supplement.id);
            }
        }
    }
}

#[cfg(test)]
mod language_tests {
    use super::*;

    #[test]
    fn default_instructions_and_tools_are_english_and_do_not_force_response_language() {
        let has_han = |text: &str| text.chars().any(|c| ('\u{3400}'..='\u{9fff}').contains(&c));
        assert!(!has_han(INSTRUCTIONS));
        assert!(!has_han(WORKFLOW_AGENT_INSTRUCTIONS));
        assert!(!has_han(&tools::definitions().to_string()));
        assert!(!has_han(
            &serde_json::to_string(&*crate::nodes::CATALOG).unwrap()
        ));
        assert!(!has_han(
            &serde_json::to_string(&*crate::control::CATALOG).unwrap()
        ));
        assert!(INSTRUCTIONS.contains("Match the user's requested language"));
        assert!(WORKFLOW_AGENT_INSTRUCTIONS.contains("Match the input request language"));
        assert!(INSTRUCTIONS.contains("Do not narrate individual calls"));
    }
}

#[cfg(test)]
mod argument_tests {
    use super::*;
    #[test]
    fn large_workflow_arguments_are_supported_without_unbounded_payloads() {
        let graph = json!({"schema":{"nodes":(0..100).map(|index| json!({"id":format!("node_{index}"),"type":"assign","data":{"title":"Business transformation","inputsValues":{"payload":{"type":"constant","content":"x".repeat(300)}}}})).collect::<Vec<_>>(),"edges":[]}});
        let text = graph.to_string();
        assert!(text.len() > 20000);
        assert_eq!(parse_tool_arguments(&text).unwrap(), graph);
        assert!(parse_tool_arguments(&"x".repeat(MAX_TOOL_ARGUMENT_BYTES + 1)).is_err());
        assert!(parse_tool_arguments("{").is_err());
    }
}
