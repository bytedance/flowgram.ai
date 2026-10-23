use super::{Protocol, Resolved};
use crate::{
    agent_stream::{ModelResponse, TurnProjection},
    deployment_settings::Catalog,
    error::{Error, Result},
    store::Store,
};
use futures_util::StreamExt;
use serde_json::{Value, json};
use tokio_util::sync::CancellationToken;

pub(crate) struct CallTrace<'a> {
    pub run: &'a str,
    pub node: &'a str,
    pub id: &'a str,
    pub context: &'a crate::control_runtime::ExecutionContext,
}
pub(crate) struct Query<'a> {
    pub trace: Option<CallTrace<'a>>,
    pub input: Value,
    pub tools: Option<Value>,
    pub instructions: Option<&'a str>,
    pub turn: Option<&'a str>,
    pub force_tool: bool,
}
fn context_length_error(status: u16, value: &Value) -> bool {
    if ![400, 413, 422].contains(&status) {
        return false;
    }
    let text = value.to_string().to_ascii_lowercase();
    [
        "context_length_exceeded",
        "maximum context length",
        "context window",
        "prompt is too long",
        "too many tokens",
        "input is too long",
        "input token count exceeds",
    ]
    .iter()
    .any(|s| text.contains(s))
}
fn response_failure(value: &Value) -> Error {
    let response = value
        .get("response")
        .filter(|v| v.is_object())
        .unwrap_or(value);
    let status = if value["type"] == "response.incomplete" || response["status"] == "incomplete" {
        "incomplete"
    } else {
        "failed"
    };
    let code = response["incomplete_details"]["reason"]
        .as_str()
        .or_else(|| response["error"]["code"].as_str())
        .or_else(|| value["error"]["code"].as_str())
        .or_else(|| value["code"].as_str())
        .unwrap_or("unknown");
    // Preserve diagnostic codes without surfacing arbitrary provider text or credentials.
    let code: String = code
        .chars()
        .filter(|c| c.is_ascii_alphanumeric() || matches!(c, '_' | '-'))
        .take(80)
        .collect();
    Error::ModelResponse {
        status: status.into(),
        code: if code.is_empty() {
            "unknown".into()
        } else {
            code
        },
    }
}

pub(crate) fn endpoint(config: &Resolved, suffix: &str) -> String {
    format!("{}/{}", config.base_url.trim_end_matches('/'), suffix)
}
fn messages(input: &Value, anthropic: bool) -> Vec<Value> {
    let mut messages = Vec::<Value>::new();
    for item in input.as_array().into_iter().flatten() {
        if item["type"] == "function_call" {
            if anthropic {
                messages.push(json!({"role":"assistant","content":[{"type":"tool_use","id":item["call_id"],"name":item["name"],"input":serde_json::from_str::<Value>(item["arguments"].as_str().unwrap_or("{}")).unwrap_or(json!({}))}]}));
            } else {
                messages.push(json!({"role":"assistant","content":null,"tool_calls":[{"id":item["call_id"],"type":"function","function":{"name":item["name"],"arguments":item["arguments"]}}]}));
            }
        } else if item["type"] == "function_call_output" {
            messages.push(if anthropic {json!({"role":"user","content":[{"type":"tool_result","tool_use_id":item["call_id"],"content":item["output"]}]})}else{json!({"role":"tool","tool_call_id":item["call_id"],"content":item["output"]})});
        } else if item["type"] == "message" {
            let text = item["content"]
                .as_array()
                .into_iter()
                .flatten()
                .filter_map(|c| c["text"].as_str())
                .collect::<Vec<_>>()
                .join("");
            if !text.is_empty() {
                messages.push(json!({"role":"assistant","content":text}));
            }
        } else if item.get("role").is_some() {
            messages.push(item.clone());
        }
    }
    // Providers require all calls from one assistant response before its tool results.
    let mut merged = Vec::<Value>::new();
    for message in messages {
        let combine = merged.last().is_some_and(|last| {
            last["role"] == message["role"]
                && (anthropic
                    || (last["tool_calls"].is_array() && message["tool_calls"].is_array()))
        });
        if combine {
            let last = merged.last_mut().unwrap();
            if anthropic {
                let content = |v: &Value| {
                    if v.is_array() {
                        v.as_array().unwrap().clone()
                    } else {
                        vec![json!({"type":"text","text":v.as_str().unwrap_or("")})]
                    }
                };
                let mut blocks = content(&last["content"]);
                blocks.extend(content(&message["content"]));
                last["content"] = json!(blocks);
            } else {
                last["tool_calls"]
                    .as_array_mut()
                    .unwrap()
                    .extend(message["tool_calls"].as_array().unwrap().iter().cloned());
            }
        } else {
            merged.push(message);
        }
    }
    merged
}
pub(crate) fn body(config: &Resolved, query: &Query<'_>) -> Value {
    let streaming = config.capabilities.streaming == Some(true);
    let mut body = match config.protocol {
        Protocol::Responses => {
            json!({"model":config.upstream_model,"input":query.input,"stream":streaming,"store":false})
        }
        Protocol::ChatCompletions => {
            json!({"model":config.upstream_model,"messages":messages(&query.input,false),"stream":streaming,"store":false})
        }
        Protocol::Anthropic => {
            json!({"model":config.upstream_model,"messages":messages(&query.input,true),"stream":streaming,"max_tokens":config.parameters.max_output_tokens.unwrap_or(4096)})
        }
    };
    if let Some(instructions) = query.instructions {
        match config.protocol {
            Protocol::Responses => body["instructions"] = json!(instructions),
            Protocol::Anthropic => body["system"] = json!(instructions),
            Protocol::ChatCompletions => body["messages"]
                .as_array_mut()
                .unwrap()
                .insert(0, json!({"role":"system","content":instructions})),
        }
    }
    if let Some(tools) = &query.tools {
        body["tools"]=match config.protocol {
            Protocol::Responses=>tools.clone(),
            Protocol::ChatCompletions=>json!(tools.as_array().into_iter().flatten().map(|t|json!({"type":"function","function":{"name":t["name"],"description":t["description"],"parameters":t["parameters"]}})).collect::<Vec<_>>()),
            Protocol::Anthropic=>json!(tools.as_array().into_iter().flatten().map(|t|json!({"name":t["name"],"description":t["description"],"input_schema":t["parameters"]})).collect::<Vec<_>>()),
        };
        if config.protocol != Protocol::Anthropic {
            body["parallel_tool_calls"] = json!(false);
        }
        if query.force_tool {
            body["tool_choice"] = if config.protocol == Protocol::Anthropic {
                json!({"type":"tool","name":"flowgram_echo"})
            } else if config.protocol == Protocol::Responses {
                json!({"type":"function","name":"flowgram_echo"})
            } else {
                json!({"type":"function","function":{"name":"flowgram_echo"}})
            };
        }
    }
    if let Some(v) = config.parameters.temperature {
        body["temperature"] = json!(v);
    }
    if let Some(v) = config.parameters.top_p {
        body["top_p"] = json!(v);
    }
    if let Some(v) = config.parameters.max_output_tokens {
        body[match config.protocol {
            Protocol::Responses => "max_output_tokens",
            Protocol::ChatCompletions => "max_completion_tokens",
            Protocol::Anthropic => "max_tokens",
        }] = json!(v);
    }
    if let Some(v) = &config.parameters.reasoning_effort {
        if config.protocol == Protocol::Responses {
            body["reasoning"] = json!({"effort":v});
        } else {
            body["reasoning_effort"] = json!(v);
        }
    }
    if let Some(schema) = &config.parameters.output_schema {
        match config.protocol {
            Protocol::Responses => {
                body["text"] = json!({"format":{"type":"json_schema","name":"result","schema":schema,"strict":true}})
            }
            Protocol::ChatCompletions => {
                body["response_format"] = json!({"type":"json_schema","json_schema":{"name":"result","schema":schema,"strict":true}})
            }
            Protocol::Anthropic => {
                body["output_config"] = json!({"format":{"type":"json_schema","schema":schema}})
            }
        }
    }
    body
}
#[derive(Default)]
struct Adapter {
    received_output: bool,
    text: String,
    tools: Vec<(usize, Value)>,
    model: Value,
    usage: Value,
    stop: String,
}
impl Adapter {
    fn tool(&mut self, index: usize) -> (usize, &mut Value) {
        let pos=self.tools.iter().position(|(i,_)|*i==index).unwrap_or_else(||{self.tools.push((index,json!({"type":"function_call","id":format!("call-{index}"),"call_id":"","name":"","arguments":""})));self.tools.len()-1});
        (pos + 1, &mut self.tools[pos].1)
    }
    fn completed(&self) -> Value {
        let mut output = vec![
            json!({"type":"message","role":"assistant","content":[{"type":"output_text","text":self.text}]}),
        ];
        output.extend(self.tools.iter().map(|(_, call)| {
            let mut call = call.clone();
            if call["arguments"] == "" {
                call["arguments"] = json!("{}");
            }
            call
        }));
        json!({"model":self.model,"usage":self.usage,"output":output})
    }
    fn event(&mut self, protocol: Protocol, event: Value) -> Result<(Vec<Value>, Option<Value>)> {
        let is_error = !event["error"].is_null()
            || matches!(event["type"].as_str(), Some("error" | "response.failed"));
        if !self.received_output && is_error && context_length_error(400, &event) {
            return Err(Error::ContextLength(
                "The model context window was exceeded".into(),
            ));
        }
        if protocol == Protocol::Responses {
            if matches!(
                event["type"].as_str(),
                Some("response.output_text.delta" | "response.output_item.added")
            ) {
                self.received_output = true;
            }
            return match event["type"].as_str() {
                Some("response.completed")
                    if matches!(
                        event["response"]["status"].as_str(),
                        Some("failed" | "incomplete")
                    ) =>
                {
                    Err(response_failure(&event))
                }
                Some("response.completed") => Ok((vec![], Some(event["response"].clone()))),
                Some("response.failed" | "response.incomplete" | "error") => {
                    Err(response_failure(&event))
                }
                _ => Ok((vec![event], None)),
            };
        }
        let mut events = Vec::new();
        if !event["error"].is_null() {
            return Err(Error::Execution(
                "The model provider returned a stream error".into(),
            ));
        }
        if protocol == Protocol::ChatCompletions {
            if event.get("model").is_some() {
                self.model = event["model"].clone();
            }
            if event.get("usage").is_some() {
                self.usage = event["usage"].clone();
            }
            let delta = &event["choices"][0]["delta"];
            if let Some(text) = delta["content"].as_str() {
                self.text.push_str(text);
                events.push(json!({"type":"response.output_text.delta","delta":text}));
            }
            for change in delta["tool_calls"].as_array().into_iter().flatten() {
                let (index, call) = self.tool(change["index"].as_u64().unwrap_or(0) as usize);
                if let Some(id) = change["id"].as_str() {
                    call["call_id"] = json!(id);
                    call["id"] = json!(id);
                }
                for key in ["name", "arguments"] {
                    if let Some(part) = change["function"][key].as_str() {
                        let mut text = call[key].as_str().unwrap_or("").to_owned();
                        text.push_str(part);
                        call[key] = json!(text);
                    }
                }
                events.push(
                    json!({"type":"response.output_item.added","output_index":index,"item":call}),
                );
            }
            if let Some(reason) = event["choices"][0]["finish_reason"].as_str() {
                if !["stop", "tool_calls"].contains(&reason) {
                    return Err(Error::Execution(
                        "The model stopped before completing its response".into(),
                    ));
                }
                return Ok((events, Some(self.completed())));
            }
        } else {
            match event["type"].as_str().unwrap_or_default() {
                "message_start" => {
                    self.model = event["message"]["model"].clone();
                    self.usage = event["message"]["usage"].clone();
                }
                "content_block_start" if event["content_block"]["type"] == "tool_use" => {
                    let (index, call) = self.tool(event["index"].as_u64().unwrap_or(0) as usize);
                    let block = &event["content_block"];
                    call["id"] = block["id"].clone();
                    call["call_id"] = block["id"].clone();
                    call["name"] = block["name"].clone();
                    if block["input"].as_object().is_some_and(|v| !v.is_empty()) {
                        call["arguments"] = json!(block["input"].to_string());
                    }
                    events.push(json!({"type":"response.output_item.added","output_index":index,"item":call}));
                }
                "content_block_delta" => {
                    let delta = &event["delta"];
                    if delta["type"] == "text_delta" {
                        let text = delta["text"].as_str().unwrap_or("");
                        self.text.push_str(text);
                        events.push(json!({"type":"response.output_text.delta","delta":text}));
                    }
                    if delta["type"] == "input_json_delta" {
                        let (index, call) =
                            self.tool(event["index"].as_u64().unwrap_or(0) as usize);
                        let text = format!(
                            "{}{}",
                            call["arguments"].as_str().unwrap_or(""),
                            delta["partial_json"].as_str().unwrap_or("")
                        );
                        call["arguments"] = json!(text);
                        events.push(json!({"type":"response.output_item.added","output_index":index,"item":call}));
                    }
                }
                "message_delta" => {
                    self.stop = event["delta"]["stop_reason"].as_str().unwrap_or("").into();
                    if let (Some(base), Some(usage)) =
                        (self.usage.as_object_mut(), event["usage"].as_object())
                    {
                        base.extend(usage.clone());
                    }
                }
                "message_stop" => {
                    if !["end_turn", "tool_use", "stop_sequence"].contains(&self.stop.as_str()) {
                        return Err(Error::Execution(
                            "The model stopped before completing its response".into(),
                        ));
                    }
                    return Ok((events, Some(self.completed())));
                }
                _ => {}
            }
        }
        if self.text.len() > 200000 || self.tools.len() > 32 {
            return Err(Error::Execution(
                "Model response exceeds the supported limit".into(),
            ));
        }
        self.received_output |= !events.is_empty() || event["type"] == "content_block_start";
        Ok((events, None))
    }
    fn non_stream(protocol: Protocol, value: Value) -> Result<Value> {
        if protocol == Protocol::Responses {
            if matches!(value["status"].as_str(), Some("failed" | "incomplete")) {
                return Err(response_failure(&value));
            }
            return if value["output"].is_array() {
                Ok(value)
            } else {
                Err(Error::Execution("Invalid model response format".into()))
            };
        }
        let mut adapter = Self {
            model: value["model"].clone(),
            usage: value["usage"].clone(),
            ..Default::default()
        };
        if protocol == Protocol::ChatCompletions {
            let message = &value["choices"][0]["message"];
            if !["stop", "tool_calls"]
                .contains(&value["choices"][0]["finish_reason"].as_str().unwrap_or(""))
            {
                return Err(Error::Execution("The model response was incomplete".into()));
            }
            adapter.text = message["content"].as_str().unwrap_or("").into();
            for (i, call) in message["tool_calls"]
                .as_array()
                .into_iter()
                .flatten()
                .enumerate()
            {
                adapter.tools.push((i,json!({"type":"function_call","id":call["id"],"call_id":call["id"],"name":call["function"]["name"],"arguments":call["function"]["arguments"]})));
            }
        } else {
            if !["end_turn", "tool_use", "stop_sequence"]
                .contains(&value["stop_reason"].as_str().unwrap_or(""))
            {
                return Err(Error::Execution("The model response was incomplete".into()));
            }
            for (i, block) in value["content"]
                .as_array()
                .into_iter()
                .flatten()
                .enumerate()
            {
                if block["type"] == "text" {
                    adapter.text.push_str(block["text"].as_str().unwrap_or(""));
                } else if block["type"] == "tool_use" {
                    adapter.tools.push((i,json!({"type":"function_call","id":block["id"],"call_id":block["id"],"name":block["name"],"arguments":block["input"].to_string()})));
                }
            }
        }
        Ok(adapter.completed())
    }
}
pub(crate) async fn request(
    catalog: &Catalog,
    config: &Resolved,
    query: Query<'_>,
    cancel: &CancellationToken,
    store: Option<&Store>,
) -> Result<ModelResponse> {
    let mut projection = query.turn.map(TurnProjection::new);
    let started = std::time::Instant::now();
    let mut first_output = false;
    let execute = async {
        let suffix = match config.protocol {
            Protocol::Responses => "responses",
            Protocol::ChatCompletions => "chat/completions",
            Protocol::Anthropic => "messages",
        };
        let client = reqwest::Client::builder()
            .redirect(reqwest::redirect::Policy::none())
            .build()
            .map_err(|_| Error::Execution("Cannot initialize model transport".into()))?;
        let mut request = client
            .post(endpoint(config, suffix))
            .json(&body(config, &query));
        if config.protocol == Protocol::Anthropic {
            request = request.header("anthropic-version", "2023-06-01");
        }
        let mut credential_secret = None;
        if let Some(credential) = &config.credential_id {
            let secret = catalog
                .secret(credential, Some(&config.project_id), "connection")
                .await?;
            request = if config.protocol == Protocol::Anthropic {
                request.header("x-api-key", secret.clone())
            } else {
                request.bearer_auth(secret.clone())
            };
            credential_secret = Some(secret);
        }
        let response = request.send().await.map_err(|_| {
            Error::Execution(
                "Cannot connect to the model service. Check connection settings".into(),
            )
        })?;
        if !response.status().is_success() {
            let status = response.status().as_u16();
            let mut chunks = response.bytes_stream();
            let mut bytes = vec![];
            let mut truncated = false;
            while let Some(Ok(chunk)) = chunks.next().await {
                let remaining = 32768 - bytes.len();
                bytes.extend_from_slice(&chunk[..chunk.len().min(remaining)]);
                if chunk.len() > remaining || bytes.len() == 32768 {
                    truncated = true;
                    break;
                }
            }
            let text = String::from_utf8_lossy(&bytes);
            let text = credential_secret
                .as_ref()
                .map(|secret| text.replace(secret, "[redacted]"))
                .unwrap_or_else(|| text.into_owned());
            let value = serde_json::from_str::<Value>(&text).unwrap_or(json!(text));
            let context_exceeded = context_length_error(status, &value);
            if let (Some(trace), Some(store)) = (&query.trace, store) {
                store.emit("model_transport_error",trace.run,trace.context.trace(json!({"nodeId":trace.node,"executionId":trace.id,"httpStatus":status,"errorDetails":crate::run_trace::safe_payload(value),"truncated":truncated}))).await?;
            }
            if context_exceeded {
                return Err(Error::ContextLength(
                    "The model context window was exceeded".into(),
                ));
            }
            return Err(Error::Execution(format!(
                "Model service returned HTTP {status}"
            )));
        }
        let json_response = response
            .headers()
            .get("content-type")
            .and_then(|h| h.to_str().ok())
            .is_some_and(|v| v.contains("application/json"))
            || config.capabilities.streaming != Some(true);
        let mut chunks = response.bytes_stream();
        let mut pending = Vec::new();
        let mut total = 0;
        let mut data = Vec::<String>::new();
        let mut adapter = Adapter::default();
        let mut partial = String::new();
        let mut last_partial = None::<std::time::Instant>;
        let mut partial_truncated = false;
        while let Some(chunk) = chunks.next().await {
            let chunk =
                chunk.map_err(|_| Error::Execution("Model event stream disconnected".into()))?;
            total += chunk.len();
            if total > 8_000_000 {
                return Err(Error::Execution(
                    "Model output exceeded the size limit".into(),
                ));
            }
            pending.extend_from_slice(&chunk);
            if json_response {
                continue;
            }
            while let Some(end) = pending.iter().position(|b| *b == b'\n') {
                let line: Vec<u8> = pending.drain(..=end).collect();
                let line = std::str::from_utf8(&line)
                    .map_err(|_| Error::Execution("Invalid model event encoding".into()))?
                    .trim_end();
                if let Some(value) = line.strip_prefix("data:") {
                    data.push(value.trim_start().into());
                }
                if line.is_empty() && !data.is_empty() {
                    let text = data.join("\n");
                    data.clear();
                    if text == "[DONE]" {
                        continue;
                    }
                    let event = serde_json::from_str(&text)
                        .map_err(|_| Error::Execution("Invalid model event JSON".into()))?;
                    let (events, complete) = adapter.event(config.protocol, event)?;
                    for delta in events
                        .iter()
                        .filter(|event| event["type"] == "response.output_text.delta")
                        .filter_map(|event| event["delta"].as_str())
                    {
                        for ch in delta.chars() {
                            if partial.len() + ch.len_utf8() > 32768 {
                                partial_truncated = true;
                                break;
                            }
                            partial.push(ch);
                        }
                    }
                    if !partial.is_empty()
                        && last_partial
                            .is_none_or(|at| at.elapsed() >= std::time::Duration::from_millis(200))
                    {
                        last_partial = Some(std::time::Instant::now());
                        if let Some(trace) = &query.trace {
                            trace.context.update_partial(
                                trace.id,
                                Some(json!({"partialText":partial,"truncated":partial_truncated})),
                            );
                        }
                    }

                    if !first_output
                        && events.iter().any(|event| {
                            event["type"] == "response.output_text.delta"
                                || event["type"] == "response.function_call_arguments.delta"
                        })
                    {
                        first_output = true;
                        if let (Some(trace), Some(store)) = (&query.trace, store) {
                            store.emit("model_output_started",trace.run,trace.context.trace(json!({"nodeId":trace.node,"executionId":trace.id,"firstOutputMs":started.elapsed().as_millis() as u64}))).await?;
                        }
                    }

                    if let (Some(p), Some(store)) = (&mut projection, store) {
                        for event in events {
                            p.event(store, &event).await?;
                        }
                    }
                    if let Some(complete) = complete {
                        return Ok((complete, true));
                    }
                }
            }
        }
        if json_response {
            return Adapter::non_stream(
                config.protocol,
                serde_json::from_slice(&pending)
                    .map_err(|_| Error::Execution("Invalid model response JSON".into()))?,
            )
            .map(|value| (value, false));
        }
        Err(Error::Execution(
            "The model did not return a completion event".into(),
        ))
    };
    let result = tokio::select! {_ =cancel.cancelled()=>Err(Error::Cancelled),result=tokio::time::timeout(std::time::Duration::from_millis(config.timeout_ms),execute)=>result.map_err(|_|Error::Execution("Model request timed out".into())).and_then(|v|v)};
    match result {
        Ok((response, streamed)) => {
            if let Some(trace) = &query.trace {
                trace.context.update_partial(trace.id, None);
            }
            let validation: Result<()> = (|| {
                if let Some(schema) = &config.parameters.output_schema {
                    let has_calls = response["output"].as_array().is_some_and(|items| {
                        items.iter().any(|value| value["type"] == "function_call")
                    });
                    if !has_calls {
                        let text = crate::agent::output_text(&response);
                        let value: Value = serde_json::from_str(&text).map_err(|_| {
                            Error::Execution("Model output is not valid JSON".into())
                        })?;
                        let validator = jsonschema::validator_for(schema).map_err(|_| {
                            Error::Invalid("Invalid model output JSON schema".into())
                        })?;
                        if !validator.is_valid(&value) {
                            return Err(Error::Execution(
                                "Model output does not match its JSON schema".into(),
                            ));
                        }
                    }
                }
                Ok(())
            })();
            if let Err(error) = validation {
                if let (Some(trace), Some(store)) = (&query.trace, store) {
                    store.emit("model_response",trace.run,trace.context.trace(json!({"nodeId":trace.node,"executionId":trace.id,"outputs":response}))).await?;
                }
                return Err(error);
            }

            if let (Some(projection), Some(store)) = (projection, store) {
                let mut result = projection.complete(store, response).await?;
                result.streamed = streamed;
                Ok(result)
            } else {
                Ok(ModelResponse {
                    value: response,
                    streamed,
                    text: None,
                    tools: Default::default(),
                })
            }
        }
        Err(error) => {
            if let (Some(p), Some(store), Some(turn_id)) = (&mut projection, store, query.turn) {
                p.interrupt(store).await?;
                let turn = store.turn(turn_id).await?;
                store
                    .emit(
                        "conversation_model_error",
                        &turn.session_id,
                        json!({"turnId":turn.id,"error":error.to_string()}),
                    )
                    .await?;
            }
            Err(error)
        }
    }
}
