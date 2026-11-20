//! Durable, revision-checked authoring transactions shared by all tool transports.
pub mod graph;
mod operations;
mod undo;
use crate::{
    error::{Error, Result},
    model::{Event, Workflow},
    store::{Store, id, now},
};
use graph::{Document, escape, failure, hash, text};
use serde_json::{Value, json};
use sqlx::SqlitePool;

pub async fn initialize(db: &SqlitePool) -> Result<()> {
    for sql in [
        "CREATE TABLE IF NOT EXISTS workflow_mutations (id TEXT PRIMARY KEY, workflow_id TEXT NOT NULL, caller TEXT NOT NULL, mutation_id TEXT NOT NULL, request_hash TEXT NOT NULL, state TEXT NOT NULL, before_doc TEXT NOT NULL, after_doc TEXT NOT NULL, patch TEXT NOT NULL, receipt TEXT NOT NULL, UNIQUE(workflow_id,caller,mutation_id))",
        "CREATE TABLE IF NOT EXISTS tool_values (id TEXT PRIMARY KEY, owner_run TEXT, data TEXT NOT NULL, created_at TEXT NOT NULL)",
        "CREATE TABLE IF NOT EXISTS tool_run_requests (caller TEXT NOT NULL, mutation_id TEXT NOT NULL, request_hash TEXT NOT NULL, state TEXT NOT NULL, receipt TEXT, PRIMARY KEY(caller,mutation_id))",
    ] {
        sqlx::query(sql).execute(db).await?;
    }
    // A run receipt commits atomically with the run. A reservation without a
    // receipt therefore never started execution and can be retried after restart.
    sqlx::query("DELETE FROM tool_run_requests WHERE caller LIKE 'execution:%' AND state='pending' AND receipt IS NULL").execute(db).await?;
    Ok(())
}
/// Patches use an ID-normalized graph. Missing keys differ from explicit JSON null.
pub fn diff(before: &Value, after: &Value, path: &str, out: &mut Vec<Value>) {
    if before == after {
        return;
    }
    if let (Some(a), Some(b)) = (before.as_object(), after.as_object()) {
        let keys: std::collections::BTreeSet<_> = a.keys().chain(b.keys()).collect();
        for k in keys {
            let p = format!("{path}/{}", escape(k));
            match(a.get(k),b.get(k)){(Some(a),Some(b))=>diff(a,b,&p,out),(a,b)=>out.push(json!({"path":p,"before":a,"after":b,"hadBefore":a.is_some(),"hasAfter":b.is_some()}))}
        }
    } else {
        out.push(
            json!({"path":path,"before":before,"after":after,"hadBefore":true,"hasAfter":true}),
        );
    }
}
impl Store {
    pub(crate) async fn retain_value(&self, value: &Value, run: Option<&str>) -> Result<Value> {
        let value = crate::run_trace::safe_payload(value.clone());
        let key = id();
        let kind = if value.is_array() {
            "array"
        } else if value.is_object() {
            "object"
        } else if value.is_string() {
            "text"
        } else {
            "scalar"
        };
        sqlx::query("INSERT INTO tool_values VALUES(?,?,?,?)")
            .bind(&key)
            .bind(run)
            .bind(value.to_string())
            .bind(now())
            .execute(&self.db)
            .await?;
        Ok(
            json!({"resultId":key,"path":"","kind":kind,"contentHash":hash(&value),"size":value.to_string().len()}),
        )
    }
    pub async fn recover_workflow_mutations(&self) -> Result<()> {
        let rows: Vec<String> = sqlx::query_scalar(
            "SELECT id FROM workflow_mutations WHERE state='pending' ORDER BY rowid",
        )
        .fetch_all(&self.db)
        .await?;
        for key in rows {
            self.finish_mutation(&key).await?;
        }
        Ok(())
    }
    async fn finish_mutation(&self, key: &str) -> Result<Value> {
        let (state, before, after, receipt): (String, String, String, String) = sqlx::query_as(
            "SELECT state,before_doc,after_doc,receipt FROM workflow_mutations WHERE id=?",
        )
        .bind(key)
        .fetch_one(&self.db)
        .await?;
        let receipt: Value = serde_json::from_str(&receipt)?;
        if state == "committed" {
            return Ok(receipt);
        }
        let before: Workflow = serde_json::from_str(&before)?;
        let after: Workflow = serde_json::from_str(&after)?;
        let current = self.workflow(&after.id).await?;
        if (current.revision == before.revision
            && (current.schema != before.schema || current.name != before.name))
            || current.revision != before.revision
                && (current.revision != after.revision
                    || current.schema != after.schema
                    || current.name != after.name)
        {
            return Err(failure(
                "RECOVERY_CONFLICT",
                "Pending edit conflicts with the canonical workflow; no newer document was overwritten",
            ));
        }
        if current.revision == before.revision {
            self.write_workflow_file(&after).await?;
        }
        let full_diff = self
            .tool_value(text(&receipt["data"]["diffRef"], "resultId")?, None)
            .await?;
        let data = json!({"workflowId":after.id,"baseRevision":before.revision,"revision":after.revision,"changeId":key,"affectedNodeIds":full_diff["changedNodes"],"diffRef":receipt["data"]["diffRef"]});
        let timestamp = now();
        let mut tx = self.db.begin().await?;
        sqlx::query("UPDATE workflows SET name=?,revision=?,schema_json=?,updated_at=? WHERE id=?")
            .bind(&after.name)
            .bind(after.revision)
            .bind(after.schema.to_string())
            .bind(&after.updated_at)
            .bind(&after.id)
            .execute(&mut *tx)
            .await?;
        let event = sqlx::query(
            "INSERT INTO events(kind,object_id,data,created_at) VALUES('workflow_patch',?,?,?)",
        )
        .bind(&after.id)
        .bind(data.to_string())
        .bind(&timestamp)
        .execute(&mut *tx)
        .await?;
        sqlx::query("UPDATE workflow_mutations SET state='committed' WHERE id=?")
            .bind(key)
            .execute(&mut *tx)
            .await?;
        tx.commit().await?;
        let _ = self.events.send(Event {
            sequence: event.last_insert_rowid(),
            kind: "workflow_patch".into(),
            object_id: after.id,
            data: data.to_string(),
            created_at: timestamp,
        });
        Ok(receipt)
    }
    /// UI synchronization reads the committed journal, regardless of transport/caller.
    /// Unlike agent receipts this endpoint includes complete patches for reconciliation.
    pub async fn workflow_changes(
        &self,
        workflow: &str,
        after_revision: i64,
        limit: usize,
    ) -> Result<Value> {
        let _guard = self.workflow_lock.lock().await;
        let current = self.workflow(workflow).await?;
        let rows: Vec<(String,String,String,String)> = sqlx::query_as(
            "SELECT id,patch,receipt,after_doc FROM workflow_mutations WHERE workflow_id=? AND state='committed' AND json_extract(after_doc,'$.revision')>? AND json_extract(after_doc,'$.revision')>json_extract(before_doc,'$.revision') ORDER BY json_extract(after_doc,'$.revision') LIMIT ?"
        ).bind(workflow).bind(after_revision).bind(limit.clamp(1,100) as i64).fetch_all(&self.db).await?;
        let mut revision = after_revision;
        let mut changes = Vec::new();
        for (id, patch, receipt, after) in rows {
            let receipt: Value = serde_json::from_str(&receipt)?;
            let after: Workflow = serde_json::from_str(&after)?;
            if receipt["data"]["baseRevision"] != revision {
                return Ok(
                    json!({"requiresSnapshot":true,"revision":current.revision,"changes":[]}),
                );
            }
            changes.push(json!({"changeId":id,"baseRevision":revision,"revision":after.revision,"updatedAt":after.updated_at,"patch":serde_json::from_str::<Value>(&patch)?}));
            revision = after.revision;
        }
        let missing = revision != current.revision && changes.is_empty();
        Ok(
            json!({"requiresSnapshot":missing,"revision":current.revision,"changes":changes,"hasMore":!missing && revision<current.revision}),
        )
    }
    pub async fn get_workflow_change(
        &self,
        workflow: &str,
        caller: &str,
        args: &Value,
    ) -> Result<Value> {
        let row: Option<(String, String)> = if let Some(change) = args["changeId"].as_str() {
            sqlx::query_as("SELECT state,receipt FROM workflow_mutations WHERE workflow_id=? AND caller=? AND id=?").bind(workflow).bind(caller).bind(change).fetch_optional(&self.db).await?
        } else {
            sqlx::query_as("SELECT state,receipt FROM workflow_mutations WHERE workflow_id=? AND caller=? AND mutation_id=?").bind(workflow).bind(caller).bind(text(args,"mutationId")?).fetch_optional(&self.db).await?
        };
        match row {
            Some((state, receipt)) => {
                let mut receipt: Value = serde_json::from_str(&receipt)?;
                receipt["data"]["state"] = json!(state);
                Ok(receipt)
            }
            None => Err(failure(
                "CHANGE_NOT_FOUND",
                "No change exists for this caller and mutation ID",
            )),
        }
    }
    pub async fn edit_workflow(&self, workflow: &str, caller: &str, args: &Value) -> Result<Value> {
        let _guard = self.workflow_lock.lock().await;
        self.ensure_open()?;
        self.require_unarchived("workflow", workflow).await?;
        self.recover_workflow_mutations().await?;
        let mutation = text(args, "mutationId")?;
        if mutation.is_empty() {
            return Err(failure("INVALID_ARGUMENT", "mutationId must be nonempty"));
        }
        let request_hash = hash(args);
        if args["dryRun"] != true {
            let existing:Option<(String,String)>=sqlx::query_as("SELECT request_hash,receipt FROM workflow_mutations WHERE workflow_id=? AND caller=? AND mutation_id=?").bind(workflow).bind(caller).bind(mutation).fetch_optional(&self.db).await?;
            if let Some((known, receipt)) = existing {
                if known != request_hash {
                    return Err(failure(
                        "IDEMPOTENCY_CONFLICT",
                        "mutationId was already used with different arguments",
                    ));
                }
                return Ok(serde_json::from_str(&receipt)?);
            }
        }
        let before = self.workflow(workflow).await?;
        if Some(before.revision) != args["expectedRevision"].as_i64() {
            return Err(Error::Tool(
                json!({"code":"REVISION_CONFLICT","message":"The draft revision changed; inspect the affected nodes before retrying","details":{"revision":before.revision},"recovery":{"tool":"read_workflow","workflowId":workflow}}),
            ));
        }
        let original = Document::read(&before.name, &before.schema)?;
        let mut candidate = original.clone();
        let mut results = Vec::new();
        if let Some(revert) = args["revertChangeId"].as_str() {
            let patch:Option<String>=sqlx::query_scalar("SELECT patch FROM workflow_mutations WHERE id=? AND workflow_id=? AND caller=? AND state='committed'").bind(revert).bind(workflow).bind(caller).fetch_optional(&self.db).await?;
            let patch: Vec<Value> = serde_json::from_str(&patch.ok_or_else(|| {
                failure(
                    "CHANGE_NOT_FOUND",
                    "The original committed change was not found",
                )
            })?)?;
            for part in patch.iter().rev() {
                let path = text(part, "path")?;
                let value = undo::inverse(
                    (part["hadBefore"] == true).then_some(&part["before"]),
                    (part["hasAfter"] == true).then_some(&part["after"]),
                    candidate.0.pointer(path),
                    path,
                )?;
                graph::set_pointer(&mut candidate.0, path, value)?;
            }
        } else if let Some(replacement) = args.get("manualReplacement") {
            // Private UI save path. The public tool schema rejects this field.
            candidate = Document(replacement.clone());
        } else if args["layout"] == true {
            let scope = args["scopeId"].as_str().unwrap_or("root");
            candidate.scope(scope)?;
            let arranged = crate::auto_layout::arrange(&candidate.schema())?;
            let laid = Document::read(&before.name, &arranged)?;
            let ids = if let Some(ids) = args["nodeIds"].as_array() {
                ids.iter()
                    .map(|i| {
                        i.as_str()
                            .map(str::to_owned)
                            .ok_or_else(|| failure("INVALID_ARGUMENT", "nodeIds requires strings"))
                    })
                    .collect::<Result<Vec<_>>>()?
            } else {
                if args["recursive"] == true {
                    candidate.0["nodes"]
                        .as_object()
                        .unwrap()
                        .keys()
                        .cloned()
                        .collect()
                } else {
                    candidate.ids(scope)
                }
            };
            for key in ids {
                if args["recursive"] != true && candidate.node(&key)?["scopeId"] != scope {
                    return Err(failure(
                        "INVALID_SCOPE",
                        "Layout selection must belong to the selected scope",
                    ));
                }
                candidate.node_mut(&key)?["meta"]["position"] =
                    laid.node(&key)?["meta"]["position"].clone();
            }
        } else {
            let operations = args["operations"]
                .as_array()
                .ok_or_else(|| failure("INVALID_ARGUMENT", "operations must be an array"))?;
            if operations.is_empty() || operations.len() > 500 {
                return Err(failure(
                    "INVALID_ARGUMENT",
                    "Provide between 1 and 500 operations",
                ));
            }
            for (index, operation) in operations.iter().enumerate() {
                match candidate.apply(operation) {
                    Ok(result) => results.push(result),
                    Err(Error::Tool(mut error)) => {
                        error["operationIndex"] = json!(index);
                        return Err(Error::Tool(error));
                    }
                    Err(e) => return Err(e),
                }
            }
        }
        candidate.check_output_changes(&original)?;
        let issues = candidate.validate()?;
        let previous_issues = crate::runtime::validate(&before.schema).unwrap_or_default();
        let new_issues: Vec<_> = issues
            .iter()
            .filter(|i| !previous_issues.contains(i))
            .collect();
        let resolved_issues: Vec<_> = previous_issues
            .iter()
            .filter(|i| !issues.contains(i))
            .collect();
        let mut patch = Vec::new();
        diff(&original.0, &candidate.0, "", &mut patch);
        let mut after = before.clone();
        after.name = text(&candidate.0, "name")?.into();
        after.schema = candidate.schema();
        if !patch.is_empty() {
            after.revision += 1;
            after.updated_at = now();
        }
        let mut changed = std::collections::BTreeSet::new();
        let mut paths = Vec::new();
        let mut moved = std::collections::BTreeSet::new();
        let mut topology = false;
        for part in &patch {
            let path = text(part, "path")?;
            let tokens = graph::pointer_tokens(path)?;
            if tokens[0] == "nodes" {
                if let Some(k) = tokens.get(1) {
                    changed.insert(k.clone());
                    if tokens.get(2).is_some_and(|s| s == "meta") {
                        moved.insert(k.clone());
                    }
                    if tokens.get(2).is_some_and(|s| s == "data") {
                        paths.push(json!({"nodeId":k,"path":format!("/{}",tokens[3..].iter().map(|s|escape(s)).collect::<Vec<_>>().join("/"))}));
                    }
                    if tokens.len() == 2
                        || tokens.get(2).is_some_and(|s| s == "type" || s == "scopeId")
                    {
                        topology = true;
                    }
                }
            } else if tokens[0] == "edges" || tokens[0] == "order" {
                topology = true;
            }
        }
        let created: Vec<_> = candidate.0["nodes"]
            .as_object()
            .unwrap()
            .keys()
            .filter(|k| original.0["nodes"].get(k.as_str()).is_none())
            .cloned()
            .collect();
        let removed: Vec<_> = original.0["nodes"]
            .as_object()
            .unwrap()
            .keys()
            .filter(|k| candidate.0["nodes"].get(k.as_str()).is_none())
            .cloned()
            .collect();
        let change = id();
        let dry = args["dryRun"] == true;
        let diff_value = json!({"patch":patch,"changedNodes":changed,"changedPaths":paths,"createdNodes":created,"removedNodes":removed,"movedNodes":moved,"operations":results,"validation":{"errors":issues,"newErrors":new_issues,"resolvedErrors":resolved_issues}});
        let reference = if dry {
            Value::Null
        } else {
            self.retain_value(&diff_value, None).await?
        };
        let receipt = json!({"ok":true,"context":{"workflowId":workflow,"projectId":before.project_id,"revision":if dry{before.revision}else{after.revision}},"data":{"changeId":change,"mutationId":mutation,"baseRevision":before.revision,"changed":!patch.is_empty(),"dryRun":dry,"draftSaved":!dry,"changedNodes":changed.iter().take(20).collect::<Vec<_>>(),"changedNodeCount":changed.len(),"changedPaths":paths.iter().take(20).collect::<Vec<_>>(),"createdNodes":created.iter().take(20).collect::<Vec<_>>(),"createdNodeCount":created.len(),"removedNodes":removed.iter().take(20).collect::<Vec<_>>(),"movedNodes":moved.iter().take(20).collect::<Vec<_>>(),"topologyChanged":topology,"validation":{"executable":issues.is_empty(),"errorCount":issues.len(),"errors":issues.iter().take(10).collect::<Vec<_>>(),"newErrors":new_issues.iter().take(10).collect::<Vec<_>>(),"resolvedErrors":resolved_issues.iter().take(10).collect::<Vec<_>>()},"operationResults":results.iter().take(20).collect::<Vec<_>>(),"diffRef":reference}});
        if dry {
            return Ok(receipt);
        }
        sqlx::query("INSERT INTO workflow_mutations VALUES(?,?,?,?,?,?,?,?,?,?)")
            .bind(&change)
            .bind(workflow)
            .bind(caller)
            .bind(mutation)
            .bind(request_hash)
            .bind(if patch.is_empty() {
                "committed"
            } else {
                "pending"
            })
            .bind(serde_json::to_string(&before)?)
            .bind(serde_json::to_string(&after)?)
            .bind(json!(patch).to_string())
            .bind(receipt.to_string())
            .execute(&self.db)
            .await?;
        if patch.is_empty() {
            return Ok(receipt);
        }
        self.finish_mutation(&change).await
    }
}
