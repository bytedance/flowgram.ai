use super::{AgentContext, Owner, budget::tokens};
use crate::{
    error::{Error, Result},
    store::{Store, id},
};
use serde_json::{Value, json};

impl Store {
    pub(crate) async fn read_tool_result(
        &self,
        args: &Value,
        owner_run: Option<&str>,
    ) -> Result<Value> {
        let result_id = args["resultId"]
            .as_str()
            .ok_or_else(|| Error::Invalid("resultId is required".into()))?;
        let text: Option<String> = sqlx::query_scalar(
            "SELECT data FROM agent_tool_results WHERE id=? AND (? IS NULL OR run_id=?)",
        )
        .bind(result_id)
        .bind(owner_run)
        .bind(owner_run)
        .fetch_optional(&self.db)
        .await?;
        let value: Value = serde_json::from_str(
            &text.ok_or_else(|| Error::NotFound("Tool result not found in this project".into()))?,
        )?;
        let path = args["path"].as_str().unwrap_or("");
        if !path.is_empty() && !path.starts_with('/') {
            return Err(Error::Invalid(
                "path must be a JSON Pointer beginning with /".into(),
            ));
        }
        let value = value
            .pointer(path)
            .ok_or_else(|| Error::NotFound("Tool result path not found".into()))?;
        let offset = args["offset"].as_u64().unwrap_or(0) as usize;
        let limit = args["limit"].as_u64().unwrap_or(2000).clamp(1, 8000) as usize;
        let text = serde_json::to_string(value)?;
        let total = text.chars().count();
        let content = text.chars().skip(offset).take(limit).collect::<String>();
        let next = (offset.saturating_add(limit) < total).then(|| offset.saturating_add(limit));
        Ok(
            json!({"resultId":result_id,"path":path,"offset":offset,"totalCharacters":total,"nextOffset":next,"content":content}),
        )
    }
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
            json!({"resultId":result_id,"truncated":true,"totalCharacters":text.chars().count(),"preview":preview,"instruction":"The full result is retained. Use read_tool_result with resultId, optional JSON Pointer path, offset and limit to retrieve only the needed fields. This operation has already executed; do not repeat it to retrieve its output."}),
            Some(result_id),
        ))
    }
}
