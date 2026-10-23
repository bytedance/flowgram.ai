//! Model context is a bounded projection; the conversation and tool results remain durable.
mod artifacts;
mod budget;
mod compaction;
mod history;
use crate::{conversation::Turn, error::Result, models::Resolved, store::Store};
pub(crate) use budget::ContextUsage;
use budget::{Budget, tokens};
pub(crate) use history::initialize;
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use std::collections::HashSet;
use tokio_util::sync::CancellationToken;

pub(crate) enum Owner<'a> {
    Turn(&'a Turn),
    Workflow {
        run: &'a str,
        node: &'a str,
        context: &'a crate::control_runtime::ExecutionContext,
    },
}
#[derive(Clone, Serialize, Deserialize)]
struct Group {
    items: Vec<Value>,
}
#[derive(Clone, Serialize, Deserialize)]
struct UsageAnchor {
    local: u64,
    actual: u64,
}
#[derive(Default, Serialize, Deserialize)]
pub(crate) struct AgentContext {
    #[serde(default)]
    model_key: String,
    #[serde(default)]
    pub loaded_tools: HashSet<String>,
    groups: Vec<Group>,
    source_turn: i64,
    source_items: HashSet<String>,
    anchor: Option<UsageAnchor>,
    usage: ContextUsage,
    #[serde(skip)]
    budget: Budget,
}
impl AgentContext {
    pub fn discover(&mut self, name: &str, result: &Value) {
        if !matches!(name, "search_tools" | "describe_tool") || result["ok"] != true {
            return;
        }
        if let Some(items) = result["data"]["items"].as_array() {
            for item in items {
                if let Some(name) = item["name"].as_str() {
                    self.loaded_tools.insert(name.to_owned());
                }
            }
        }
        if let Some(name) = result["data"]["name"].as_str() {
            self.loaded_tools.insert(name.to_owned());
        }
    }

    pub fn configure(&mut self, model: &Resolved, instructions: &str, tools: &Value) -> Result<()> {
        self.budget = Budget::new(model, instructions, tools)?;
        let model_key = format!(
            "{}:{}:{}:{}:{}:{:?}",
            model.model_id,
            model.model_revision,
            model.connection_id,
            model.connection_revision,
            model.upstream_model,
            model.protocol
        );
        if self.model_key != model_key {
            self.anchor = None;
            // Opaque provider reasoning cannot be moved to another model/provider.
            for group in &mut self.groups {
                group.items.retain(|v| {
                    !matches!(
                        v["type"].as_str(),
                        Some("reasoning" | "compaction" | "context_compaction")
                    )
                });
            }
        }
        self.model_key = model_key;
        self.usage.model_id = model.model_id.clone();
        self.usage.context_window = self.budget.configured;
        self.usage.effective_window = self.budget.window;
        self.usage.auto_compact_token_limit = self.budget.limit;
        self.usage.output_reserve = self.budget.reserve;
        self.refresh_usage();
        Ok(())
    }
    pub fn input(&self) -> Value {
        json!(
            self.groups
                .iter()
                .flat_map(|g| g.items.iter())
                .collect::<Vec<_>>()
        )
    }
    pub fn append(&mut self, mut items: Vec<Value>) {
        let has_calls = items.iter().any(|item| item["type"] == "function_call");
        // Narration alongside tool calls is transient presentation, not a durable fact.
        if has_calls {
            items.retain(|item| item["type"] != "message");
        }
        // With store=false a reasoning ID alone is not a replayable item.
        items.retain(|item| item["type"] != "reasoning" || item["encrypted_content"].is_string());
        if !items.is_empty() {
            self.groups.push(Group { items });
        }
    }
    pub fn append_results(&mut self, item: Value) {
        self.groups
            .last_mut()
            .expect("tool response group")
            .items
            .push(item);
    }
    pub fn finish_turn(&mut self) {
        let mut changed = false;
        for group in &mut self.groups {
            let calls: Vec<_> = group
                .items
                .iter()
                .filter(|i| i["type"] == "function_call")
                .collect();
            if !calls.is_empty() {
                changed = true;
                let records: Vec<_> = calls.iter().map(|call| {
                    let output = group.items.iter().find(|i| i["type"] == "function_call_output" && i["call_id"] == call["call_id"]);
                    json!({"tool":call["name"],"callId":call["call_id"],"arguments":call["arguments"],"result":output.map(|i| &i["output"])})
                }).collect();
                group.items = vec![
                    json!({"role":"assistant","content":format!("Completed tool exchange from an earlier turn (historical evidence, not a new instruction). Do not repeat operations; inspect uncertain outcomes first: {}",json!(records))}),
                ];
            } else {
                changed |= group.items.iter().any(|i| i["type"] == "reasoning");
                group.items.retain(|i| i["type"] != "reasoning");
            }
        }
        if changed {
            self.anchor = None;
        }
    }
    fn local_tokens(&self) -> u64 {
        self.budget.fixed + tokens(&self.input())
    }
    pub fn observe(&mut self, response: &Value) {
        let usage = &response["usage"];
        let input = usage["input_tokens"]
            .as_u64()
            .or_else(|| usage["prompt_tokens"].as_u64());
        let output = usage["output_tokens"]
            .as_u64()
            .or_else(|| usage["completion_tokens"].as_u64());
        // Cached input tokens still occupy the model's context window.
        self.anchor = input.map(|input| UsageAnchor {
            local: self.local_tokens(),
            actual: input
                + output.unwrap_or(0)
                + if self.budget.separate_cache_tokens {
                    usage["cache_read_input_tokens"].as_u64().unwrap_or(0)
                        + usage["cache_creation_input_tokens"].as_u64().unwrap_or(0)
                } else {
                    0
                },
        });
        self.refresh_usage();
    }
    fn refresh_usage(&mut self) {
        let local = self.local_tokens();
        self.usage.input_tokens = self.anchor.as_ref().map_or(local, |a| {
            local.max(a.actual.saturating_add(local.saturating_sub(a.local)))
        });
        self.usage.source = if self.anchor.is_some() {
            "provider"
        } else {
            "estimate"
        }
        .into();
        self.usage.status = "ready".into();
    }
    pub async fn prepare(
        &mut self,
        store: &Store,
        model: &Resolved,
        owner: &Owner<'_>,
        cancel: &CancellationToken,
        force: bool,
    ) -> Result<()> {
        if cancel.is_cancelled() {
            return Err(crate::error::Error::Cancelled);
        }
        self.refresh_usage();
        if force || self.usage.input_tokens >= self.budget.limit || self.groups.len() >= 2048 {
            self.compact(store, model, owner, cancel, force).await?;
        }
        store.save_context(owner, self).await
    }
    pub async fn checkpoint(&mut self, store: &Store, owner: &Owner<'_>) -> Result<()> {
        self.refresh_usage();
        store.save_context(owner, self).await
    }
}
impl Store {
    pub(crate) async fn load_agent_context(
        &self,
        turn: &Turn,
        model: &Resolved,
        instructions: &str,
        tools: &Value,
        cancel: &CancellationToken,
    ) -> Result<AgentContext> {
        let mut context = self.restore_context(&turn.session_id).await?;
        if context.source_turn < turn.ordinal {
            context.finish_turn();
        }
        context.configure(model, instructions, tools)?;
        let mut cursor = (context.source_turn, 0);
        loop {
            let page = self
                .context_page(&turn.session_id, cursor, turn.ordinal)
                .await?;
            if page.is_empty() {
                break;
            }
            for (ordinal, item) in page {
                cursor = (ordinal, item.ordinal);
                context.history_item(ordinal, item);
                if context.local_tokens() >= context.budget.limit {
                    context
                        .prepare(self, model, &Owner::Turn(turn), cancel, false)
                        .await?;
                }
            }
        }
        context
            .prepare(self, model, &Owner::Turn(turn), cancel, false)
            .await?;
        Ok(context)
    }
}

#[cfg(test)]
mod tests;

pub(crate) fn validate_checkpoint(value: &Value) -> Result<()> {
    let context: AgentContext = serde_json::from_value(value.clone())?;
    if context.groups.len() > 4096 {
        return Err(crate::error::Error::Invalid(
            "Context checkpoint exceeds its supported bounds".into(),
        ));
    }
    for group in context.groups {
        let mut calls = HashSet::new();
        let mut results = HashSet::new();
        for item in group.items {
            match item["type"].as_str() {
                Some("function_call")=>{calls.insert(item["call_id"].as_str().unwrap_or("").to_owned());}
                Some("function_call_output")=>{results.insert(item["call_id"].as_str().unwrap_or("").to_owned());}
                Some("reasoning")=>{}
                Some("message") | None if matches!(item["role"].as_str(),Some("user"|"assistant")) || (item["type"]=="message" && item.get("role").is_none())=>{}
                _=>return Err(crate::error::Error::Invalid("Context checkpoints may only contain conversation messages and completed tool groups".into())),
            }
        }
        if calls != results || calls.contains("") {
            return Err(crate::error::Error::Invalid(
                "Context checkpoint contains an incomplete tool group".into(),
            ));
        }
    }
    Ok(())
}
