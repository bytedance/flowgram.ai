use super::{AgentContext, Group, Owner};
use crate::{conversation::ConversationItem, error::Result, store::Store};
use serde_json::{Value, json};
use sqlx::Row;

pub(crate) async fn initialize(db: &sqlx::SqlitePool) -> Result<()> {
    for sql in [
        "CREATE TABLE IF NOT EXISTS conversation_contexts(session_id TEXT PRIMARY KEY REFERENCES sessions(id) ON DELETE CASCADE,data TEXT NOT NULL,state TEXT NOT NULL)",
        "CREATE TABLE IF NOT EXISTS agent_tool_results(id TEXT PRIMARY KEY,turn_id TEXT REFERENCES conversation_turns(id) ON DELETE CASCADE,run_id TEXT REFERENCES runs(id) ON DELETE CASCADE,data TEXT NOT NULL,CHECK((turn_id IS NULL)!=(run_id IS NULL)))",
    ] {
        sqlx::query(sql).execute(db).await?;
    }
    sqlx::query("UPDATE conversation_contexts SET state=json_set(state,'$.status','ready','$.revision',COALESCE(json_extract(state,'$.revision'),0)+1),data=json_set(data,'$.usage.status','ready','$.usage.revision',COALESCE(json_extract(state,'$.revision'),0)+1) WHERE json_extract(state,'$.status')='compacting'").execute(db).await?;
    Ok(())
}
impl Store {
    pub(crate) async fn context_usage(&self, session: &str) -> Result<Value> {
        let state: Option<String> =
            sqlx::query_scalar("SELECT state FROM conversation_contexts WHERE session_id=?")
                .bind(session)
                .fetch_optional(&self.db)
                .await?;
        Ok(state
            .map(|s| serde_json::from_str(&s))
            .transpose()?
            .unwrap_or(Value::Null))
    }
    pub(super) async fn save_context(
        &self,
        owner: &Owner<'_>,
        context: &mut AgentContext,
    ) -> Result<()> {
        if let Owner::Turn(turn) = owner {
            context.usage.revision += 1;
            sqlx::query("INSERT INTO conversation_contexts VALUES(?,?,?) ON CONFLICT(session_id) DO UPDATE SET data=excluded.data,state=excluded.state")
                .bind(&turn.session_id).bind(serde_json::to_string(context)?).bind(serde_json::to_string(&context.usage)?)
                .execute(&self.db).await?;
            self.emit(
                "conversation_context",
                &turn.session_id,
                json!(context.usage),
            )
            .await?;
        }
        Ok(())
    }
    pub(super) async fn restore_context(&self, session: &str) -> Result<AgentContext> {
        let text: Option<String> =
            sqlx::query_scalar("SELECT data FROM conversation_contexts WHERE session_id=?")
                .bind(session)
                .fetch_optional(&self.db)
                .await?;
        if let Some(text) = text {
            let value = serde_json::from_str(&text)?;
            super::validate_checkpoint(&value)?;
            Ok(serde_json::from_value(value)?)
        } else {
            Ok(AgentContext::default())
        }
    }
    /// Page canonical records; do not silently discard an arbitrary number of turns.
    pub(super) async fn context_page(
        &self,
        session: &str,
        after: (i64, i64),
        turn: i64,
    ) -> Result<Vec<(i64, ConversationItem)>> {
        let rows=sqlx::query("SELECT t.ordinal AS turn_ordinal,i.data FROM conversation_items i JOIN conversation_turns t ON t.id=i.turn_id WHERE t.session_id=? AND t.ordinal<=? AND (t.ordinal>? OR (t.ordinal=? AND i.ordinal>?)) AND json_extract(i.data,'$.kind') IN ('user','assistant','tool') ORDER BY t.ordinal,i.ordinal LIMIT 32")
            .bind(session).bind(turn).bind(after.0).bind(after.0).bind(after.1).fetch_all(&self.db).await?;
        rows.into_iter()
            .map(|r| Ok((r.get("turn_ordinal"), serde_json::from_str(r.get("data"))?)))
            .collect()
    }
}
impl AgentContext {
    pub fn acknowledges(&self, ordinal: i64, id: &str) -> bool {
        ordinal < self.source_turn
            || (ordinal == self.source_turn && self.source_items.contains(id))
    }
    pub fn acknowledge(&mut self, ordinal: i64, id: &str) {
        if ordinal > self.source_turn {
            self.source_turn = ordinal;
            self.source_items.clear();
        }
        if ordinal == self.source_turn {
            self.source_items.insert(id.into());
        }
    }
    pub(super) fn history_item(&mut self, ordinal: i64, item: ConversationItem) {
        if self.acknowledges(ordinal, &item.id) {
            return;
        }
        self.acknowledge(ordinal, &item.id);
        let value = match item.kind.as_str() {
            "user" => {
                let content = if item.payload["references"].is_null() {
                    item.content
                } else {
                    format!(
                        "{}\n\nUser-referenced context (workflow IDs are authoritative; start/end are UTF-16 offsets of inline @labels in the user message, preserving their order and surrounding instructions): {}",
                        item.content, item.payload["references"]
                    )
                };
                json!({"role":"user","content":content})
            }
            "assistant" if !item.content.is_empty() => {
                let content = if item.status == "completed" {
                    item.content
                } else {
                    format!(
                        "Partial assistant output from an interrupted or failed request (not a confirmed outcome): {}",
                        item.content
                    )
                };
                json!({"role":"assistant","content":content})
            }
            "tool" => {
                json!({"role":"assistant","content":format!("Historical execution record; never repeat an operation with an unknown outcome without inspecting its status: {}",json!({"tool":item.payload["name"],"callId":item.payload["callId"],"arguments":item.payload["arguments"],"status":item.status,"result":item.payload["result"],"resultId":item.payload["contextResultId"]}))})
            }
            _ => return,
        };
        self.groups.push(Group { items: vec![value] });
    }
}
