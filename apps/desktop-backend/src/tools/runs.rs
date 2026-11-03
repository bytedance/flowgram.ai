use super::read::ok;
use crate::{
    error::Result,
    model::Run,
    store::Store,
    workflow_edit::graph::{failure, hash, text},
};
use serde_json::{Value, json};
pub(crate) fn run_receipt(run: &Run) -> Value {
    ok(
        json!({"workflowId":run.workflow_id,"revision":run.revision,"runId":run.id}),
        json!({"runId":run.id,"status":run.status,"accepted":true,"nodeId":run.test_node_id}),
    )
}
pub(crate) async fn persist_run_request(
    tx: &mut sqlx::Transaction<'_, sqlx::Sqlite>,
    request: Option<(&str, &str)>,
    run: &Run,
) -> Result<()> {
    if let Some((caller, key)) = request {
        sqlx::query("UPDATE tool_run_requests SET state='committed',receipt=? WHERE caller=? AND mutation_id=?").bind(run_receipt(run).to_string()).bind(caller).bind(key).execute(&mut **tx).await?;
    }
    Ok(())
}
impl Store {
    pub(super) async fn start_run_tool(
        &self,
        _project: &str,
        session: Option<&str>,
        caller: &str,
        name: &str,
        args: &Value,
    ) -> Result<Value> {
        let key = text(args, "mutationId")?;
        let owner = format!("execution:{caller}");
        let request_hash = hash(&json!({"tool":name,"arguments":args}));
        // Reserve before starting, and commit the receipt in the same transaction as the run.
        let inserted =
            sqlx::query("INSERT OR IGNORE INTO tool_run_requests VALUES(?,?,?,'pending',NULL)")
                .bind(&owner)
                .bind(key)
                .bind(&request_hash)
                .execute(&self.db)
                .await?
                .rows_affected();
        if inserted == 0 {
            let(h,state,receipt):(String,String,Option<String>)=sqlx::query_as("SELECT request_hash,state,receipt FROM tool_run_requests WHERE caller=? AND mutation_id=?").bind(&owner).bind(key).fetch_one(&self.db).await?;
            if h != request_hash {
                return Err(failure(
                    "IDEMPOTENCY_CONFLICT",
                    "mutationId was used for different execution arguments",
                ));
            }
            if let Some(receipt) = receipt {
                let value: Value = serde_json::from_str(&receipt)?;
                return Ok(value);
            }
            return Ok(ok(
                json!({"workflowId":args["workflowId"]}),
                json!({"state":state,"mutationId":key,"accepted":false,"instruction":"The request outcome is pending; do not start another run with a new mutationId."}),
            ));
        }
        let revision = args["expectedRevision"].as_i64().unwrap();
        let workflow = text(args, "workflowId")?;
        let result = if name == "run_workflow" {
            self.start_run_requested(
                workflow,
                session.map(str::to_owned),
                args["inputs"].clone(),
                Some(revision),
                Some((&owner, key)),
            )
            .await
        } else {
            self.start_node_test_requested(
                workflow,
                text(args, "nodeId")?,
                crate::node_test::NodeTestInput {
                    revision,
                    inputs: args["inputs"].clone(),
                    bindings: serde_json::from_value(
                        args.get("bindings").cloned().unwrap_or(json!({})),
                    )?,
                },
                Some((&owner, key)),
            )
            .await
        };
        match result {
            Ok(run) => Ok(run_receipt(&run)),
            Err(error) => {
                let value = error.tool_value();
                sqlx::query("UPDATE tool_run_requests SET state='failed',receipt=? WHERE caller=? AND mutation_id=? AND state='pending'").bind(value.to_string()).bind(&owner).bind(key).execute(&self.db).await?;
                Err(error)
            }
        }
    }
    pub(super) async fn run_tool(
        &self,
        project: &str,
        caller: &str,
        owner_run: Option<&str>,
        name: &str,
        args: &Value,
    ) -> Result<Value> {
        let id = text(args, "runId")?;
        if owner_run.is_some_and(|r| r != id) {
            return Err(failure(
                "FORBIDDEN",
                "This Agent may only inspect its owning run",
            ));
        }
        let run = self.run(id).await?;
        let workflow = self.pinned_workflow(id, &run.workflow_id).await?;
        if workflow.project_id != project {
            return Err(failure("FORBIDDEN", "Run does not belong to this project"));
        }
        let context = json!({"projectId":project,"runId":id,"workflowId":run.workflow_id,"revision":run.revision});
        match name {
            "read_run" => {
                let trace = self
                    .inspect_trace(
                        id,
                        &crate::run_trace::TraceQuery {
                            view: Some("overview".into()),
                            light: Some(true),
                            ..Default::default()
                        },
                    )
                    .await?;
                Ok(ok(
                    context,
                    json!({"runId":id,"status":run.status,"createdAt":run.created_at,"endedAt":trace["trace"]["endedAt"],"durationMs":trace["trace"]["durationMs"],"counts":trace["trace"]["counts"],"executionCount":trace["trace"]["total"],"failureId":trace["trace"]["failureId"],"error":run.error,"outputsRef":self.retain_value(&run.outputs,Some(id)).await?,"inputsRef":self.retain_value(&run.inputs,Some(id)).await?,"manifestRef":self.retain_value(&self.run_manifest(id).await?,Some(id)).await?}),
                ))
            }
            "list_run_steps" => {
                if args["cursor"].is_string() {
                    return self.page(vec![], args, context, owner_run).await;
                }
                let entries = serde_json::to_value(self.execution_index(&run, None).await?)?;
                let items = entries
                    .as_array()
                    .unwrap()
                    .iter()
                    .filter(|e| {
                        let node_matches = args["nodeId"]
                            .as_str()
                            .is_none_or(|node| e["nodeId"] == node);
                        let parent_matches =
                            if let Some(parent) = args["parentExecutionId"].as_str() {
                                e["parentId"] == parent
                            } else {
                                args["nodeId"].is_string() || e["parentId"].is_null()
                            };
                        node_matches && parent_matches
                    })
                    .filter(|e| args["status"].as_str().is_none_or(|s| e["status"] == s))
                    .cloned()
                    .collect();
                self.page(items, args, context, owner_run).await
            }
            "read_run_step" => {
                let execution = text(args, "executionId")?;
                let section = args["section"].as_str().unwrap_or("summary");
                let entries = serde_json::to_value(self.execution_index(&run, None).await?)?;
                let summary = entries
                    .as_array()
                    .unwrap()
                    .iter()
                    .find(|e| e["id"] == execution)
                    .ok_or_else(|| failure("NOT_FOUND", "Execution not found in this run"))?;
                if section == "summary" {
                    return Ok(ok(context, summary.clone()));
                }
                let mut executions = std::collections::BTreeSet::from([execution.to_owned()]);
                if matches!(section, "model" | "tools") {
                    // Model and tool spans have their own execution IDs. Resolve the
                    // descendant tree, never collect other iterations of the same node.
                    loop {
                        let before = executions.len();
                        for e in entries.as_array().unwrap() {
                            if e["parentId"]
                                .as_str()
                                .is_some_and(|p| executions.contains(p))
                                && let Some(id) = e["id"].as_str()
                            {
                                executions.insert(id.into());
                            }
                        }
                        if executions.len() == before {
                            break;
                        }
                    }
                }
                let rows:Vec<(String,String)>=sqlx::query_as("SELECT kind,data FROM events WHERE object_id=? AND json_extract(data,'$.executionId') IN (SELECT value FROM json_each(?)) ORDER BY sequence").bind(id).bind(json!(executions).to_string()).fetch_all(&self.db).await?;
                let mut values = Vec::new();
                for (kind, data) in rows {
                    let data: Value = serde_json::from_str(&data)?;
                    match section {
                        "inputs" | "outputs" | "error" => {
                            if let Some(value) = data.get(section) {
                                values.push(value.clone());
                            }
                        }
                        "model" if kind.starts_with("model_") => values.push(data),
                        "tools" if kind.starts_with("tool_") => values.push(data),
                        _ => {}
                    }
                }
                let mut value = if values.len() == 1 {
                    values.remove(0)
                } else {
                    json!(values)
                };
                if let Some(path) = args["path"].as_str() {
                    value = value
                        .pointer(path)
                        .ok_or_else(|| {
                            failure("FIELD_NOT_FOUND", "Execution payload path does not exist")
                        })?
                        .clone();
                }
                let reference = self.retain_value(&value, Some(id)).await?;
                Ok(ok(
                    context,
                    json!({"executionId":execution,"section":section,"summary":summary,"valueRef":reference}),
                ))
            }
            "read_run_events" => {
                let after = args["after"].as_i64().unwrap_or(0);
                let limit = args["limit"].as_u64().unwrap_or(20).clamp(1, 100) as i64;
                let rows:Vec<crate::model::Event>=sqlx::query_as("SELECT * FROM events WHERE object_id=? AND sequence>? AND (? IS NULL OR json_extract(data,'$.executionId')=?) AND (? IS NULL OR kind IN (SELECT value FROM json_each(?))) ORDER BY sequence LIMIT ?").bind(id).bind(after).bind(args["executionId"].as_str()).bind(args["executionId"].as_str()).bind(args.get("kinds").map(Value::to_string)).bind(args.get("kinds").map(Value::to_string)).bind(limit+1).fetch_all(&self.db).await?;
                let available = rows.len().min(limit as usize);
                let more = rows.len() > limit as usize;
                let mut events = Vec::new();
                let mut next = after;
                for e in rows.into_iter().take(limit as usize) {
                    if events.len() >= 10 && json!(events).to_string().len() > 5000 {
                        break;
                    }
                    next = e.sequence;
                    let data: Value = serde_json::from_str(&e.data)?;
                    events.push(json!({"sequence":e.sequence,"kind":e.kind,"createdAt":e.created_at,"executionId":data["executionId"],"nodeId":data["nodeId"],"valueRef":self.retain_value(&data,Some(id)).await?}));
                }
                Ok(ok(
                    context,
                    json!({"items":events,"hasMore":more||events.len()<available,"nextAfter":next}),
                ))
            }
            "cancel_run" => {
                let mutation = text(args, "mutationId")?;
                let owner = format!("cancel:{caller}");
                let request_hash = hash(args);
                let old:Option<(String,Option<String>)>=sqlx::query_as("SELECT request_hash,receipt FROM tool_run_requests WHERE caller=? AND mutation_id=?").bind(&owner).bind(mutation).fetch_optional(&self.db).await?;
                if let Some((h, receipt)) = old {
                    if h != request_hash {
                        return Err(failure(
                            "IDEMPOTENCY_CONFLICT",
                            "Cancellation ID was used for another request",
                        ));
                    }
                    if let Some(v) = receipt {
                        return Ok(serde_json::from_str(&v)?);
                    }
                }
                let accepted = if let Some(token) = self.active.lock().await.get(id) {
                    token.cancel();
                    true
                } else {
                    false
                };
                let value = ok(
                    context,
                    json!({"accepted":accepted,"status":run.status,"cancellationRequested":accepted,"terminal":!matches!(run.status.as_str(),"running"|"waiting")}),
                );
                sqlx::query("INSERT INTO tool_run_requests VALUES(?,?,?,'committed',?) ON CONFLICT(caller,mutation_id) DO UPDATE SET receipt=excluded.receipt").bind(owner).bind(mutation).bind(request_hash).bind(value.to_string()).execute(&self.db).await?;
                Ok(value)
            }
            _ => Err(failure("UNKNOWN_TOOL", "Unknown run tool")),
        }
    }
}
