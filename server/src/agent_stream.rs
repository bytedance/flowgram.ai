use crate::{
    agent::output_text,
    conversation::{ConversationItem, display_payload},
    error::{Error, Result},
    store::Store,
};
use serde_json::{Value, json};
use std::{
    collections::BTreeMap,
    time::{Duration, Instant},
};

pub(crate) struct ModelResponse {
    pub value: Value,
    pub streamed: bool,
    pub text: Option<ConversationItem>,
    pub tools: BTreeMap<usize, ConversationItem>,
}
pub(crate) struct TurnProjection {
    turn_id: String,
    pub text: Option<ConversationItem>,
    tools: BTreeMap<usize, ConversationItem>,
    last_flush: Instant,
    dirty: bool,
}
impl TurnProjection {
    pub fn new(turn_id: &str) -> Self {
        Self {
            turn_id: turn_id.into(),
            text: None,
            tools: BTreeMap::new(),
            last_flush: Instant::now(),
            dirty: false,
        }
    }
    pub async fn event(&mut self, store: &Store, event: &Value) -> Result<()> {
        let kind = event["type"].as_str().unwrap_or_default();
        if kind == "response.output_text.delta" {
            if self.text.is_none() {
                self.text = Some(store.new_item(&self.turn_id, "assistant").await?);
                store.turn_phase(&self.turn_id, "responding").await?;
            }
            let item = self.text.as_mut().unwrap();
            if let Some(delta) = event["delta"].as_str() {
                item.content.push_str(delta);
            }
            if item.content.len() > 200_000 {
                return Err(Error::Execution(
                    "Response exceeded the length limit. Narrow the request".into(),
                ));
            }
            self.dirty = true;
            if self.last_flush.elapsed() > Duration::from_millis(60) || item.content.len() < 80 {
                self.flush(store).await?;
            }
        }
        if matches!(
            kind,
            "response.output_item.added" | "response.output_item.done"
        ) && event["item"]["type"] == "function_call"
        {
            let index = event["output_index"].as_u64().unwrap_or(0) as usize;
            self.tool(store, index, &event["item"], false).await?;
        }
        Ok(())
    }
    async fn tool(&mut self, store: &Store, index: usize, call: &Value, ready: bool) -> Result<()> {
        if !self.tools.contains_key(&index) {
            store.turn_phase(&self.turn_id, "preparing").await?;
            self.tools
                .insert(index, store.new_item(&self.turn_id, "tool").await?);
        }
        let item = self.tools.get_mut(&index).unwrap();
        let arguments = call["arguments"]
            .as_str()
            .and_then(|s| serde_json::from_str::<Value>(s).ok());
        item.payload = json!({"name":call["name"],"callId":call["call_id"],"providerItemId":call["id"],"arguments":arguments.map(|v|display_payload(&v)),"attempt":1});
        item.status = if ready { "pending" } else { "drafting" }.into();
        store.put_item(item).await
    }
    pub async fn flush(&mut self, store: &Store) -> Result<()> {
        if self.dirty {
            if let Some(item) = &mut self.text {
                store.put_item(item).await?;
            }
            self.dirty = false;
            self.last_flush = Instant::now();
        }
        Ok(())
    }
    pub async fn interrupt(&mut self, store: &Store) -> Result<()> {
        if let Some(item) = &mut self.text {
            item.status = "interrupted".into();
            store.put_item(item).await?;
        }
        for item in self.tools.values_mut() {
            item.status = "cancelled".into();
            item.payload["result"] = json!({"reason":"Model generation did not complete. This tool call was not executed."});
            store.put_item(item).await?;
        }
        self.dirty = false;
        Ok(())
    }
    pub async fn complete(mut self, store: &Store, response: Value) -> Result<ModelResponse> {
        let text = output_text(&response);
        if !text.is_empty() && self.text.is_none() {
            self.text = Some(store.new_item(&self.turn_id, "assistant").await?);
        }
        if let Some(item) = &mut self.text {
            if text.len() > 200_000 {
                return Err(Error::Execution(
                    "Response exceeded the length limit".into(),
                ));
            }
            item.content = text;
            item.status = "completed".into();
            store.put_item(item).await?;
        }
        for (index, call) in response["output"]
            .as_array()
            .into_iter()
            .flatten()
            .enumerate()
        {
            if call["type"] == "function_call" {
                self.tool(store, index, call, true).await?;
            }
        }
        Ok(ModelResponse {
            value: response,
            streamed: false,
            text: self.text,
            tools: self.tools,
        })
    }
}
