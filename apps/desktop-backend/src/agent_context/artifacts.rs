use super::{AgentContext, Owner, budget::tokens};
use crate::{
    error::Result,
    store::{Store, id},
};
use serde_json::{Value, json};

impl Store {
    pub(crate) async fn context_tool_output(
        &self,
        context: &AgentContext,
        owner: &Owner<'_>,
        value: &Value,
    ) -> Result<(Value, Option<String>)> {
        if tokens(value) <= (context.budget.payload_limit() / 4).clamp(512, 4096) {
            return Ok((value.clone(), None));
        }
        let result_id = id();
        let (turn, run) = match owner {
            Owner::Turn(t) => (Some(t.id.as_str()), None),
            Owner::Workflow { run, .. } => (None, Some(*run)),
        };
        let text = serde_json::to_string(value)?;
        sqlx::query("INSERT INTO agent_tool_results VALUES(?,?,?,?)")
            .bind(&result_id)
            .bind(turn)
            .bind(run)
            .bind(&text)
            .execute(&self.db)
            .await?;
        let preview = text.chars().take(1024).collect::<String>();
        Ok((
            json!({"resultId":result_id,"truncated":true,"totalCharacters":text.chars().count(),"preview":preview,"instruction":"The full result is retained. Use read_tool_result with resultId, optional JSON Pointer path, cursor and limit to retrieve only the needed fields. This operation has already executed; do not repeat it to retrieve its output."}),
            Some(result_id),
        ))
    }
}
