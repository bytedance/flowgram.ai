//! Prepare editable copies of immutable execution definitions. Never resume or
//! replay external effects merely by opening an historical execution.
use crate::{
    error::{Error, Result},
    model::Workflow,
    store::{Store, id, now},
};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use std::collections::{HashMap, HashSet};

#[derive(Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Origin {
    pub run_id: String,
    pub workflow_id: String,
    pub execution_id: Option<String>,
    pub request_root: Option<String>,
}
impl Origin {
    pub fn validate(&self) -> Result<()> {
        for value in [&self.run_id, &self.workflow_id] {
            uuid::Uuid::parse_str(value)
                .map_err(|_| Error::Invalid("Invalid source run identity".into()))?;
        }
        if self.execution_id.as_ref().is_some_and(|s| s.len() > 200) {
            return Err(Error::Invalid("Invalid source execution identity".into()));
        }
        if let Some(root) = &self.request_root {
            let parts: Vec<_> = root.split('/').collect();
            if parts.len() != 8
                || !parts[0].is_empty()
                || parts[1..4] != ["api", "deployment", "publications"]
                || parts[5] != "targets"
                || uuid::Uuid::parse_str(parts[4]).is_err()
                || (parts[6] != "local" && uuid::Uuid::parse_str(parts[6]).is_err())
                || crate::services::identifier(parts[7]).is_err()
            {
                return Err(Error::Invalid("Invalid source run reference".into()));
            }
        }
        Ok(())
    }
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct DebugCopy {
    pub workflow_id: String,
    pub workflows: Vec<Workflow>,
    pub name_suffix: String,
    pub origin: Origin,
}
fn calls(nodes: &Value, targets: &mut Vec<String>) -> Result<()> {
    for node in nodes
        .as_array()
        .ok_or_else(|| Error::Invalid("Invalid snapshot nodes".into()))?
    {
        if node["type"] == "subworkflow" {
            let binding = &node["data"]["inputsValues"]["workflowId"];
            let target = if binding["type"] == "constant" {
                binding["content"].as_str()
            } else {
                binding.as_str()
            };
            targets.push(
                target
                    .filter(|s| !s.is_empty())
                    .ok_or_else(|| {
                        Error::Invalid(
                            "A historical dependency must use a fixed workflow ID".into(),
                        )
                    })?
                    .into(),
            );
        }
        if let Some(blocks) = node.get("blocks") {
            calls(blocks, targets)?;
        }
    }
    Ok(())
}
fn rewrite(nodes: &mut Value, ids: &HashMap<String, String>) {
    for node in nodes.as_array_mut().into_iter().flatten() {
        if node["type"] == "subworkflow" {
            let binding = &mut node["data"]["inputsValues"]["workflowId"];
            let old = if binding["type"] == "constant" {
                binding["content"].as_str()
            } else {
                binding.as_str()
            }
            .unwrap_or_default();
            if let Some(id) = ids.get(old) {
                *binding = json!({"type":"constant","content":id});
            }
        }
        if let Some(blocks) = node.get_mut("blocks") {
            rewrite(blocks, ids);
        }
    }
}
impl Store {
    pub async fn prepare_debug_copy(&self, input: DebugCopy) -> Result<Value> {
        input.origin.validate()?;
        if input.workflows.is_empty()
            || input.workflows.len() > 128
            || input.name_suffix.trim().is_empty()
            || input.name_suffix.len() > 100
            || serde_json::to_vec(&input.workflows)?.len() > 8_000_000
        {
            return Err(Error::Invalid("Invalid debug snapshot bundle".into()));
        }
        let project = self.projects().await?.remove(0).id;
        let count = input.workflows.len();
        let sources: HashMap<_, _> = input
            .workflows
            .into_iter()
            .map(|workflow| (workflow.id.clone(), workflow))
            .collect();
        if count != sources.len() {
            return Err(Error::Invalid("Duplicate snapshot workflow ID".into()));
        }
        let mut pending = vec![(input.workflow_id.clone(), vec![])];
        let mut selected = HashSet::new();
        while let Some((id, path)) = pending.pop() {
            if path.contains(&id) || path.len() > 16 {
                return Err(Error::Invalid("Invalid historical dependency graph".into()));
            }
            if !selected.insert(id.clone()) {
                continue;
            }
            let workflow = sources.get(&id).ok_or_else(|| {
                Error::Invalid("A required historical dependency was not recorded".into())
            })?;
            if workflow.project_id != project {
                return Err(Error::Invalid(
                    "Debug snapshots must belong to this project".into(),
                ));
            }
            let _: crate::model::Graph = serde_json::from_value(workflow.schema.clone())?;
            let mut targets = vec![];
            calls(&workflow.schema["nodes"], &mut targets)?;
            let mut path = path;
            path.push(id);
            for target in targets {
                pending.push((target, path.clone()));
            }
        }
        let ids: HashMap<_, _> = selected.iter().map(|old| (old.clone(), id())).collect();
        let root = ids[&input.workflow_id].clone();
        let mut clones = vec![];
        for old in selected {
            let mut workflow = sources[&old].clone();
            workflow.id = ids[&old].clone();
            workflow.revision = 1;
            workflow.updated_at = now();
            workflow.name = format!("{} · {}", workflow.name, input.name_suffix.trim());
            let mut direct = vec![];
            calls(&workflow.schema["nodes"], &mut direct)?;
            let aliases: serde_json::Map<String, Value> = direct
                .into_iter()
                .map(|target| {
                    let original = &sources[&target];
                    let canonical = original.schema["canonicalWorkflowId"]
                        .as_str()
                        .or_else(|| original.schema["debugOrigin"]["workflowId"].as_str())
                        .unwrap_or(&target);
                    (ids[&target].clone(), json!(canonical))
                })
                .collect();
            workflow.schema["dependencyAliases"] = Value::Object(aliases);
            rewrite(&mut workflow.schema["nodes"], &ids);
            let canonical = workflow.schema["canonicalWorkflowId"]
                .as_str()
                .or_else(|| workflow.schema["debugOrigin"]["workflowId"].as_str())
                .unwrap_or(&old)
                .to_owned();
            workflow.schema["canonicalWorkflowId"] = json!(canonical);
            let mut origin = input.origin.clone();
            origin.workflow_id = old.clone();
            workflow.schema["debugOrigin"] = json!(origin);
            clones.push(workflow);
        }
        let _guard = self.workflow_lock.lock().await;
        self.ensure_open()?;
        let mut tx = self.db.begin().await?;
        let result:Result<()>=async {
            for workflow in &clones {
                self.write_workflow_file(workflow).await?;
                sqlx::query("INSERT INTO workflows(id,project_id,name,revision,schema_json,updated_at) VALUES(?,?,?,?,?,?)")
                    .bind(&workflow.id).bind(&project).bind(&workflow.name).bind(1_i64).bind(workflow.schema.to_string()).bind(&workflow.updated_at).execute(&mut *tx).await?;
            }
            tx.commit().await?;Ok(())
        }.await;
        if let Err(error) = result {
            for workflow in &clones {
                let _ = tokio::fs::remove_dir_all(
                    self.project_root.join("workflows").join(&workflow.id),
                )
                .await;
            }
            return Err(error);
        }
        for workflow in &clones {
            self.emit("workflow_changed", &workflow.id, json!(workflow))
                .await?;
        }
        Ok(json!({"workflow":clones.iter().find(|w|w.id==root).unwrap(),"workflows":clones}))
    }
    pub(crate) async fn record_run_start(
        &self,
        run: &crate::model::Run,
        schema: &Value,
    ) -> Result<()> {
        let mut data = json!(run);
        data["runtime"] = json!(crate::services::RUNTIME);
        data["snapshotFormat"] = json!("flowgram.canvas/v1");
        self.emit("run_started", &run.id, data).await?;
        if let Ok(origin) = serde_json::from_value::<Origin>(schema["debugOrigin"].clone())
            && origin.validate().is_ok()
        {
            self.link_debug_origin(&run.id, &origin).await?;
        }
        Ok(())
    }
    pub async fn link_debug_origin(&self, run: &str, origin: &Origin) -> Result<()> {
        origin.validate()?;
        self.run(run).await?;
        self.emit("run_origin", run, json!(origin)).await
    }
    /// Resolve only values available before the selected execution in its scope
    /// and ancestor scopes. Later loop iterations cannot contaminate the sample.
    pub(crate) async fn trace_sample(&self, run: &str, execution: &str) -> Result<Value> {
        let rows:Vec<(i64,String)>=sqlx::query_as("SELECT sequence,data FROM events WHERE object_id=? AND kind='node_started' AND json_extract(data,'$.executionId')=? ORDER BY sequence LIMIT 1").bind(run).bind(execution).fetch_all(&self.db).await?;
        let (before, text) = rows.into_iter().next().ok_or_else(|| {
            Error::Invalid("Resolved node inputs were not recorded for this execution".into())
        })?;
        let node: Value = serde_json::from_str(&text)?;
        let mut cursor = node.clone();
        let mut ancestors = vec![];
        let mut seen = HashSet::new();
        let mut parent_ids = HashSet::new();
        loop {
            if let Some(scope) = cursor["scopeId"].as_str()
                && seen.insert(scope.to_owned())
                && cursor["workflowId"] == node["workflowId"]
            {
                ancestors.push(cursor.clone());
            }
            let Some(parent) = cursor["parentExecutionId"].as_str() else {
                break;
            };
            if !parent_ids.insert(parent.to_owned()) {
                return Err(Error::Invalid("Execution ancestry contains a cycle".into()));
            }
            let parent:Option<String>=sqlx::query_scalar("SELECT data FROM events WHERE object_id=? AND kind='node_started' AND json_extract(data,'$.executionId')=? ORDER BY sequence LIMIT 1").bind(run).bind(parent).fetch_optional(&self.db).await?;
            let Some(parent) = parent else { break };
            cursor = serde_json::from_str(&parent)?;
            if ancestors.len() > 32 {
                return Err(Error::Invalid(
                    "Execution ancestry exceeds the inspection limit".into(),
                ));
            }
        }
        let mut bindings = serde_json::Map::new();
        let mut bytes = 0;
        for ancestor in ancestors.into_iter().rev() {
            let rows:Vec<String>=sqlx::query_scalar("SELECT data FROM events e JOIN (SELECT MAX(sequence) AS latest FROM events WHERE object_id=? AND kind='node_finished' AND sequence<? AND json_extract(data,'$.scopeId')=? GROUP BY json_extract(data,'$.nodeId')) grouped ON e.sequence=grouped.latest ORDER BY sequence").bind(run).bind(before).bind(ancestor["scopeId"].as_str()).fetch_all(&self.db).await?;
            for row in rows {
                bytes += row.len();
                if bytes > 2_000_000 {
                    return Err(Error::Invalid(
                        "Upstream sample exceeds the 2 MB node-test limit".into(),
                    ));
                }
                let data: Value = serde_json::from_str(&row)?;
                if let Some(id) = data["nodeId"].as_str() {
                    bindings.insert(id.into(), data["outputs"].clone());
                }
                if data["nodeType"] == "block-start" {
                    if let Some(parent) = ancestor["parentExecutionId"].as_str() {
                        let text:Option<String>=sqlx::query_scalar("SELECT json_extract(data,'$.nodeId') FROM events WHERE object_id=? AND kind='node_started' AND json_extract(data,'$.executionId')=? LIMIT 1").bind(run).bind(parent).fetch_optional(&self.db).await?;
                        if let Some(parent) = text {
                            bindings.insert(format!("{parent}_locals"), data["outputs"].clone());
                        }
                    }
                    if data["outputs"].get("state").is_some() {
                        bindings.insert("state".into(), data["outputs"]["state"].clone());
                        bindings.insert("index".into(), data["outputs"]["index"].clone());
                    }
                }
            }
        }
        Ok(
            json!({"inputs":node["inputs"],"bindings":bindings,"nodeId":node["nodeId"],"workflowId":node["workflowId"]}),
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    async fn setup() -> (tempfile::TempDir, Store, Vec<Workflow>, crate::model::Run) {
        let dir = tempfile::tempdir().unwrap();
        let store = Store::open(dir.path()).await.unwrap();
        let project = store.projects().await.unwrap().remove(0);
        let child=store.create_workflow(&project.id,"Child",json!({"nodes":[{"id":"child","type":"assign","meta":{"position":{"x":42,"y":81}}}],"edges":[]})).await.unwrap();
        let root=store.create_workflow(&project.id,"Original",json!({"nodes":[{"id":"call","type":"subworkflow","data":{"inputsValues":{"workflowId":{"type":"constant","content":child.id}}}}],"edges":[]})).await.unwrap();
        let workflows = vec![root.clone(), child];
        let mut tx = store.db.begin().await.unwrap();
        let run = store
            .prepare_run(&root, None, &json!({}), &workflows, &mut tx)
            .await
            .unwrap();
        tx.commit().await.unwrap();
        (dir, store, workflows, run)
    }
    #[tokio::test]
    async fn copies_pinned_dependencies_without_mutating_current_workflows() {
        let (_dir, store, workflows, run) = setup().await;
        store
            .save_workflow(
                &workflows[0].id,
                1,
                "Changed",
                json!({"nodes":[{"id":"start","type":"start","data":{}},{"id":"end","type":"end","data":{"inputsValues":{}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"end"}]}),
            )
            .await
            .unwrap();
        let result = store
            .prepare_debug_copy(DebugCopy {
                workflow_id: workflows[0].id.clone(),
                workflows: workflows.clone(),
                name_suffix: "Debug copy".into(),
                origin: Origin {
                    run_id: run.id.clone(),
                    workflow_id: workflows[0].id.clone(),
                    execution_id: None,
                    request_root: None,
                },
            })
            .await
            .unwrap();
        let root = &result["workflow"];
        assert_ne!(root["id"], workflows[0].id);
        assert_eq!(root["revision"], 1);
        assert_eq!(root["schema"]["debugOrigin"]["runId"], run.id);
        let target = root["schema"]["nodes"][0]["data"]["inputsValues"]["workflowId"]["content"]
            .as_str()
            .unwrap();
        assert_ne!(target, workflows[1].id);
        let copied = store.workflow(target).await.unwrap();
        assert_eq!(copied.schema["nodes"][0]["meta"]["position"]["x"], 42);
        let definitions: Vec<Workflow> =
            serde_json::from_value(result["workflows"].clone()).unwrap();
        let root_workflow: Workflow = serde_json::from_value(root.clone()).unwrap();
        let mut tx = store.db.begin().await.unwrap();
        let copied_run = store
            .prepare_run(&root_workflow, None, &json!({}), &definitions, &mut tx)
            .await
            .unwrap();
        tx.commit().await.unwrap();
        let original_groups = store
            .inspect_trace(
                &run.id,
                &crate::run_trace::TraceQuery {
                    view: Some("compare".into()),
                    ..Default::default()
                },
            )
            .await
            .unwrap();
        let copied_groups = store
            .inspect_trace(
                &copied_run.id,
                &crate::run_trace::TraceQuery {
                    view: Some("compare".into()),
                    ..Default::default()
                },
            )
            .await
            .unwrap();
        let call = |groups: &Value| {
            groups["groups"]
                .as_array()
                .unwrap()
                .iter()
                .find(|group| group["nodeId"] == "call")
                .unwrap()["configHash"]
                .clone()
        };
        assert_eq!(call(&original_groups), call(&copied_groups));
        assert_eq!(
            store.workflow(&workflows[0].id).await.unwrap().name,
            "Changed"
        );
        assert_eq!(
            store
                .pinned_workflow(&run.id, &workflows[0].id)
                .await
                .unwrap()
                .name,
            "Original"
        );
        assert!(
            store
                .prepare_debug_copy(DebugCopy {
                    workflow_id: workflows[0].id.clone(),
                    workflows: vec![workflows[0].clone()],
                    name_suffix: "Debug".into(),
                    origin: Origin {
                        run_id: run.id,
                        workflow_id: workflows[0].id.clone(),
                        execution_id: None,
                        request_root: None
                    }
                })
                .await
                .is_err()
        );
        assert_eq!(store.workflows().await.unwrap().len(), 4);
    }
    #[tokio::test]
    async fn sample_uses_only_the_selected_iteration_and_earlier_values() {
        let (_dir, store, workflows, run) = setup().await;
        let wf = &workflows[0].id;
        store.emit("node_started",&run.id,json!({"nodeId":"loop","workflowId":wf,"executionId":"loop-call","scopeId":"outer","inputs":{}})).await.unwrap();
        for (scope, round, value) in [("round-1", 0, 10), ("round-2", 1, 20)] {
            store.emit("node_finished",&run.id,json!({"nodeId":"upstream","nodeType":"block-start","workflowId":wf,"executionId":format!("entry-{round}"),"scopeId":scope,"parentExecutionId":"loop-call","outputs":{"value":value,"state":{"count":round},"index":round}})).await.unwrap();
            store.emit("node_started",&run.id,json!({"nodeId":"selected","workflowId":wf,"executionId":format!("selected-{round}"),"scopeId":scope,"parentExecutionId":"loop-call","inputs":{"value":value}})).await.unwrap();
            store.emit("node_finished",&run.id,json!({"nodeId":"upstream","workflowId":wf,"executionId":format!("later-{round}"),"scopeId":scope,"outputs":{"value":999}})).await.unwrap();
        }
        let sample = store.trace_sample(&run.id, "selected-0").await.unwrap();
        assert_eq!(sample["inputs"]["value"], 10);
        assert_eq!(sample["bindings"]["upstream"]["value"], 10);
        assert_eq!(sample["bindings"]["state"]["count"], 0);
        assert!(
            store
                .trace_sample("another-run", "selected-0")
                .await
                .is_err()
        );
        let bad = Origin {
            run_id: run.id,
            workflow_id: wf.clone(),
            execution_id: None,
            request_root: Some("/api/deployment/publications/../../settings".into()),
        };
        assert!(bad.validate().is_err());
    }
}
