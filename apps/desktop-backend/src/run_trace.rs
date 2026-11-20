//! Transport-independent execution inspection. Payloads are loaded on selection;
//! the execution index never reads large input/output bodies into the tree.
use crate::{
    error::{Error, Result},
    model::Run,
    store::Store,
};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use std::collections::{HashMap, HashSet};

const PAGE_SIZE: usize = 100;
#[derive(Default, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct TraceQuery {
    pub after: Option<i64>,
    pub workflow_id: Option<String>,
    pub view: Option<String>,
    pub execution: Option<String>,
    pub parent: Option<String>,
    pub cursor: Option<i64>,
    pub at: Option<i64>,
    pub node_id: Option<String>,
    pub scope_id: Option<String>,
    pub light: Option<bool>,
}
impl TraceQuery {
    pub fn query_string(&self) -> String {
        let mut url = reqwest::Url::parse("http://localhost/").expect("static URL");
        let value = serde_json::to_value(self).expect("serializable query");
        for (key, value) in value.as_object().expect("query object") {
            if !value.is_null() {
                url.query_pairs_mut().append_pair(
                    key,
                    &value
                        .as_str()
                        .map(str::to_owned)
                        .unwrap_or_else(|| value.to_string()),
                );
            }
        }
        url.query().unwrap_or_default().to_owned()
    }
}
#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct Execution {
    id: String,
    parent_id: Option<String>,
    parent_path: Vec<String>,
    node_id: String,
    workflow_id: String,
    scope_id: String,
    kind: String,
    name: Option<String>,
    status: String,
    first_sequence: i64,
    last_sequence: i64,
    started_at: String,
    ended_at: Option<String>,
    duration_ms: Option<i64>,
    branch_path: Value,
    iteration_path: Value,
    attempt: i64,
    reason: Option<String>,
    children: usize,
    inputs_available: bool,
    outputs_available: bool,
    links: Value,
}
pub(crate) fn milliseconds(start: &str, end: &str) -> Option<i64> {
    let start = chrono::DateTime::parse_from_rfc3339(start).ok()?;
    let end = chrono::DateTime::parse_from_rfc3339(end).ok()?;
    (end >= start).then(|| (end - start).num_milliseconds())
}
fn text(value: &Value, key: &str) -> Option<String> {
    value[key].as_str().map(str::to_owned)
}
impl Store {
    pub(crate) async fn execution_index(&self, run: &Run, at: Option<i64>) -> Result<Vec<Execution>> {
        // Extract metadata in SQLite: do not deserialize every request/response
        // merely to display a paged execution tree or timeline.
        let rows: Vec<(i64, String, String, String)> = sqlx::query_as(
            "SELECT sequence,kind,created_at,json_object('executionId',json_extract(data,'$.executionId'),'parentExecutionId',json_extract(data,'$.parentExecutionId'),'nodeId',json_extract(data,'$.nodeId'),'workflowId',json_extract(data,'$.workflowId'),'scopeId',json_extract(data,'$.scopeId'),'branchPath',json_extract(data,'$.branchPath'),'iterationPath',json_extract(data,'$.iterationPath'),'attempt',json_extract(data,'$.attempt'),'name',json_extract(data,'$.name'),'reason',json_extract(data,'$.reason'),'error',substr(json_extract(data,'$.error'),1,1000),'links',json_extract(data,'$.links'),'hasInputs',json_type(data,'$.inputs') IS NOT NULL,'hasOutputs',json_type(data,'$.outputs') IS NOT NULL) FROM events WHERE object_id=? AND (? IS NULL OR sequence<=?) AND (kind LIKE 'node_%' OR kind LIKE 'model_%' OR kind LIKE 'tool_%' OR kind LIKE 'http_%') ORDER BY sequence"
        ).bind(&run.id).bind(at).bind(at).fetch_all(&self.db).await?;
        let mut entries = Vec::<Execution>::new();
        let mut lookup = HashMap::new();
        let mut recorded_starts = HashSet::new();
        for (sequence, kind, timestamp, data) in rows {
            if kind == "model_usage" {
                continue;
            }
            let data: Value = serde_json::from_str(&data)?;
            let Some(node) = text(&data, "nodeId") else {
                continue;
            };
            let id = text(&data, "executionId").unwrap_or_else(|| format!("event:{sequence}"));
            let index = *lookup.entry(id.clone()).or_insert_with(|| {
                let index = entries.len();
                entries.push(Execution {
                    id,
                    parent_id: text(&data, "parentExecutionId"),
                    parent_path: vec![],
                    node_id: node,
                    workflow_id: text(&data, "workflowId")
                        .unwrap_or_else(|| run.workflow_id.clone()),
                    scope_id: text(&data, "scopeId").unwrap_or_default(),
                    kind: kind.split('_').next().unwrap_or("node").into(),
                    name: text(&data, "name"),
                    status: "running".into(),
                    first_sequence: sequence,
                    last_sequence: sequence,
                    started_at: timestamp.clone(),
                    ended_at: None,
                    duration_ms: None,
                    branch_path: data["branchPath"]
                        .as_array()
                        .map(|v| json!(v))
                        .unwrap_or(json!([])),
                    iteration_path: data["iterationPath"]
                        .as_array()
                        .map(|v| json!(v))
                        .unwrap_or(json!([])),
                    attempt: data["attempt"].as_i64().unwrap_or(1),
                    reason: None,
                    children: 0,
                    inputs_available: false,
                    outputs_available: false,
                    links: data["links"]
                        .as_array()
                        .map(|v| json!(v))
                        .unwrap_or(json!([])),
                });
                index
            });
            let entry = &mut entries[index];
            if kind.ends_with("_started") {
                recorded_starts.insert(index);
            }
            entry.last_sequence = sequence;
            entry.inputs_available |= data["hasInputs"].as_i64() == Some(1);
            entry.outputs_available |= data["hasOutputs"].as_i64() == Some(1);
            let terminal = if kind.ends_with("_finished") {
                Some("succeeded")
            } else if kind.ends_with("_failed") {
                Some("failed")
            } else if kind.ends_with("_canceled") {
                Some("canceled")
            } else if kind.ends_with("_skipped") {
                Some("skipped")
            } else {
                None
            };
            if let Some(status) = terminal {
                entry.status = status.into();
                entry.ended_at = Some(timestamp.clone());
                entry.duration_ms = if status != "skipped" && recorded_starts.contains(&index) {
                    milliseconds(&entry.started_at, &timestamp)
                } else {
                    None
                };
            } else if kind.ends_with("_waiting") {
                entry.status = "waiting".into();
            }
            if let Some(reason) = text(&data, "error").or_else(|| text(&data, "reason")) {
                entry.reason = Some(reason);
            }
        }
        // Missing parents (old recordings) stay inspectable at the root.
        let parents: Vec<_> = entries
            .iter()
            .map(|e| e.parent_id.as_ref().and_then(|p| lookup.get(p).copied()))
            .collect();
        for (index, parent) in parents.into_iter().enumerate() {
            if let Some(parent) = parent {
                entries[parent].children += 1;
            } else {
                entries[index].parent_id = None;
            }
            if at.is_none()
                && run.status != "running"
                && matches!(entries[index].status.as_str(), "running" | "waiting")
            {
                entries[index].status = "interrupted".into();
                entries[index].reason =
                    Some("No terminal event was recorded for this execution".into());
            }
        }
        for index in 0..entries.len() {
            let mut path = vec![];
            let mut cursor = entries[index]
                .parent_id
                .as_ref()
                .and_then(|parent| lookup.get(parent).copied());
            while let Some(parent) = cursor {
                if path.len() >= 64 {
                    break;
                }
                path.push(entries[parent].node_id.clone());
                cursor = entries[parent]
                    .parent_id
                    .as_ref()
                    .and_then(|id| lookup.get(id).copied());
            }
            path.reverse();
            entries[index].parent_path = path;
        }
        Ok(entries)
    }
    async fn comparison(&self, id: &str) -> Result<Value> {
        use sha2::{Digest, Sha256};
        let run = self.run(id).await?;
        let entries = self.execution_index(&run, None).await?;
        let definitions: Vec<String> = sqlx::query_scalar(
            "SELECT definition FROM run_workflows WHERE run_id=? ORDER BY workflow_id",
        )
        .bind(id)
        .fetch_all(&self.db)
        .await?;
        let models = self.run_model_traces(id).await?;
        let mut groups = std::collections::BTreeMap::<(String, String), Value>::new();
        fn walk(
            nodes: &Value,
            workflow: &crate::model::Workflow,
            canonical: &str,
            models: &Value,
            groups: &mut std::collections::BTreeMap<(String, String), Value>,
            canonical_ids: &HashMap<String, String>,
            connections: &HashMap<(String, String), Vec<Value>>,
        ) {
            for node in nodes.as_array().into_iter().flatten() {
                if let Some(id) = node["id"].as_str() {
                    let model = models
                        .as_array()
                        .into_iter()
                        .flatten()
                        .find(|model| model["workflowId"] == workflow.id && model["nodeId"] == id)
                        .map(|model| model["model"].clone());
                    let mut configuration = node["data"].clone();
                    if node["type"] == "subworkflow" {
                        let binding = &mut configuration["inputsValues"]["workflowId"];
                        let target = if binding["type"] == "constant" {
                            binding["content"].as_str()
                        } else {
                            binding.as_str()
                        };
                        if let Some(canonical) = target.and_then(|id| canonical_ids.get(id)) {
                            *binding = json!({"type":"constant","content":canonical});
                        }
                    }
                    let hash = hex::encode(Sha256::digest(
                        serde_json::to_vec(&json!({"type":node["type"],"data":configuration,"connections":connections.get(&(workflow.id.clone(),id.to_owned()))}))
                            .expect("JSON node"),
                    ));
                    let model_hash = model.map(|model| {
                        hex::encode(Sha256::digest(
                            serde_json::to_vec(&model).expect("model label"),
                        ))
                    });
                    groups.insert((workflow.id.clone(),id.into()),json!({"workflowId":workflow.id,"canonicalWorkflowId":canonical,"workflowName":workflow.name,"nodeId":id,"nodeType":node["type"],"name":node["data"]["title"].as_str().unwrap_or(id),"configHash":hash,"modelHash":model_hash,"counts":{},"executions":0,"durationMs":null,"durationComplete":true,"modelCalls":0,"toolCalls":0,"httpCalls":0,"inputTokens":null,"outputTokens":null,"usageRecorded":0}));
                }
                if let Some(blocks) = node.get("blocks") {
                    walk(
                        blocks,
                        workflow,
                        canonical,
                        models,
                        groups,
                        canonical_ids,
                        connections,
                    );
                }
            }
        }
        let definitions: Vec<crate::model::Workflow> = definitions
            .iter()
            .map(|text| serde_json::from_str(text))
            .collect::<std::result::Result<_, _>>()?;
        let mut canonical_ids: HashMap<_, _> = definitions
            .iter()
            .map(|workflow| {
                (
                    workflow.id.clone(),
                    workflow.schema["canonicalWorkflowId"]
                        .as_str()
                        .or_else(|| workflow.schema["debugOrigin"]["workflowId"].as_str())
                        .unwrap_or(&workflow.id)
                        .to_owned(),
                )
            })
            .collect();
        fn edges(
            nodes: &Value,
            links: &Value,
            workflow: &str,
            output: &mut HashMap<(String, String), Vec<Value>>,
        ) {
            for edge in links.as_array().into_iter().flatten() {
                for key in ["sourceNodeID", "targetNodeID"] {
                    if let Some(node) = edge[key].as_str() {
                        output
                            .entry((workflow.into(), node.into()))
                            .or_default()
                            .push(edge.clone());
                    }
                }
            }
            for node in nodes.as_array().into_iter().flatten() {
                edges(&node["blocks"], &node["edges"], workflow, output);
            }
        }
        let mut connections = HashMap::new();
        for workflow in &definitions {
            edges(
                &workflow.schema["nodes"],
                &workflow.schema["edges"],
                &workflow.id,
                &mut connections,
            );
            if let Some(aliases) = workflow.schema["dependencyAliases"].as_object() {
                for (id, canonical) in aliases {
                    if let Some(canonical) = canonical.as_str() {
                        canonical_ids.insert(id.clone(), canonical.into());
                    }
                }
            }
        }
        for values in connections.values_mut() {
            values.sort_by_key(Value::to_string);
        }
        for workflow in &definitions {
            walk(
                &workflow.schema["nodes"],
                workflow,
                &canonical_ids[&workflow.id],
                &models,
                &mut groups,
                &canonical_ids,
                &connections,
            );
        }
        for entry in &entries {
            if let Some(group) = groups.get_mut(&(entry.workflow_id.clone(), entry.node_id.clone()))
            {
                if entry.kind == "node" {
                    if entry.duration_ms.is_none() && entry.status != "skipped" {
                        group["durationComplete"] = json!(false);
                    }
                    group["executions"] = json!(group["executions"].as_u64().unwrap_or(0) + 1);
                    if let Some(duration) = entry.duration_ms {
                        group["durationMs"] = json!(group["durationMs"].as_i64().unwrap_or(0) + duration);
                    }
                    group["counts"][&entry.status] =
                        json!(group["counts"][&entry.status].as_u64().unwrap_or(0) + 1);
                } else {
                    let key = match entry.kind.as_str() {
                        "model" => "modelCalls",
                        "tool" => "toolCalls",
                        "http" => "httpCalls",
                        _ => continue,
                    };
                    group[key] = json!(group[key].as_u64().unwrap_or(0) + 1);
                }
            }
        }
        let usage:Vec<(String,String,String)>=sqlx::query_as("SELECT json_extract(data,'$.workflowId'),json_extract(data,'$.nodeId'),json_extract(data,'$.outputs.usage') FROM events WHERE object_id=? AND kind IN ('model_finished','model_response') AND json_type(data,'$.outputs.usage')='object'").bind(id).fetch_all(&self.db).await?;
        for (workflow, node, usage) in usage {
            if let Some(group) = groups.get_mut(&(workflow, node)) {
                let usage: Value = serde_json::from_str(&usage)?;
                let input = usage["input_tokens"]
                    .as_u64()
                    .or_else(|| usage["prompt_tokens"].as_u64());
                let output = usage["output_tokens"]
                    .as_u64()
                    .or_else(|| usage["completion_tokens"].as_u64());
                if input.is_some() || output.is_some() {
                    group["usageRecorded"] =
                        json!(group["usageRecorded"].as_u64().unwrap_or(0) + 1);
                    if let Some(value) = input {
                        group["inputTokens"] =
                            json!(group["inputTokens"].as_u64().unwrap_or(0) + value);
                    }
                    if let Some(value) = output {
                        group["outputTokens"] =
                            json!(group["outputTokens"].as_u64().unwrap_or(0) + value);
                    }
                }
            }
        }
        Ok(json!({"groups":groups.into_values().collect::<Vec<_>>(),"nodeTest":run.test_node_id}))
    }
    pub async fn inspect_trace(&self, id: &str, query: &TraceQuery) -> Result<Value> {
        let run = self.run(id).await?;
        match query.view.as_deref() {
            Some("compare") => self.comparison(id).await,
            Some("sample") => {
                self.trace_sample(
                    id,
                    query
                        .execution
                        .as_deref()
                        .ok_or_else(|| Error::Invalid("Execution ID is required".into()))?,
                )
                .await
            }
            Some("snapshot") => {
                let workflow = query.workflow_id.as_deref().unwrap_or(&run.workflow_id);
                Ok(json!({"snapshot":self.pinned_workflow(id, workflow).await?}))
            }
            Some("execution") => {
                let execution = query
                    .execution
                    .as_deref()
                    .ok_or_else(|| Error::Invalid("Execution ID is required".into()))?;
                let events: Vec<crate::model::Event> = if let Some(sequence) = execution
                    .strip_prefix("event:")
                    .and_then(|s| s.parse::<i64>().ok())
                {
                    sqlx::query_as("SELECT * FROM events WHERE object_id=? AND sequence=?")
                        .bind(id)
                        .bind(sequence)
                        .fetch_all(&self.db)
                        .await?
                } else {
                    sqlx::query_as("SELECT * FROM events WHERE object_id=? AND json_extract(data,'$.executionId')=? AND sequence>? ORDER BY sequence LIMIT 100")
                        .bind(id).bind(execution).bind(query.after.unwrap_or(0)).fetch_all(&self.db).await?
                };
                if events.is_empty() && query.after.unwrap_or(0) == 0 {
                    return Err(Error::NotFound("Execution not found in this run".into()));
                }
                let next = (events.len() == PAGE_SIZE).then(|| events.last().unwrap().sequence);
                Ok(json!({"events":events,"nextAfter":next}))
            }
            Some("executions") => {
                let entries = self.execution_index(&run, query.at).await?;
                let filtered: Vec<_> = entries
                    .iter()
                    .filter(|e| {
                        if let Some(node) = &query.node_id {
                            return &e.node_id == node
                                && e.kind == "node"
                                && query
                                    .workflow_id
                                    .as_ref()
                                    .is_none_or(|w| w == &e.workflow_id);
                        }
                        if let Some(scope) = &query.scope_id {
                            return &e.scope_id == scope && e.kind == "node";
                        }
                        e.parent_id.as_deref() == query.parent.as_deref()
                    })
                    .collect();
                let start = if let Some(focus) = &query.execution {
                    filtered.iter().position(|e| &e.id == focus).unwrap_or(0) / PAGE_SIZE
                        * PAGE_SIZE
                } else {
                    filtered
                        .iter()
                        .take_while(|e| e.first_sequence <= query.cursor.unwrap_or(0))
                        .count()
                };
                let page: Vec<_> = filtered
                    .iter()
                    .skip(start)
                    .take(PAGE_SIZE)
                    .copied()
                    .collect();
                let cursor = (start + PAGE_SIZE < filtered.len())
                    .then(|| page.last().unwrap().first_sequence);
                let previous = if start > 0 {
                    Some(if start <= PAGE_SIZE {
                        0
                    } else {
                        filtered[start - PAGE_SIZE - 1].first_sequence
                    })
                } else {
                    None
                };
                Ok(
                    json!({"executions":page,"nextCursor":cursor,"previousCursor":previous,"total":filtered.len()}),
                )
            }
            Some(other) if other != "overview" => {
                Err(Error::Invalid("Unknown run inspection view".into()))
            }
            _ => {
                let mut detail = if query.view.as_deref() == Some("overview") {
                    if query.light == Some(true) {
                        let mut detail = json!({"run":run});
                        detail["run"].as_object_mut().unwrap().remove("inputs");
                        detail
                    } else {
                        json!({"run":run,"models":self.run_model_traces(id).await?,"nodeTest":self.node_test_definition(id).await?,"manifest":self.run_manifest(id).await?})
                    }
                } else {
                    self.inspect_run(id, query.after.unwrap_or(0), query.workflow_id.as_deref())
                        .await?
                };
                let entries = self.execution_index(&run, query.at).await?;
                let mut counts = HashMap::<String, usize>::new();
                for entry in &entries {
                    *counts.entry(entry.status.clone()).or_default() += 1;
                }
                let ended: Option<String> = sqlx::query_scalar("SELECT created_at FROM events WHERE object_id=? AND kind='run_finished' AND (? IS NULL OR sequence<=?) ORDER BY sequence DESC LIMIT 1").bind(id).bind(query.at).bind(query.at).fetch_optional(&self.db).await?;
                let observed:Option<String>=sqlx::query_scalar("SELECT created_at FROM events WHERE object_id=? AND (? IS NULL OR sequence<=?) ORDER BY sequence DESC LIMIT 1").bind(id).bind(query.at).bind(query.at).fetch_optional(&self.db).await?;
                let watermark: i64 = sqlx::query_scalar(
                    "SELECT COALESCE(MAX(sequence),0) FROM events WHERE object_id=?",
                )
                .bind(id)
                .fetch_one(&self.db)
                .await?;
                let published: Option<(String, String, String, String)> = sqlx::query_as(
                    "SELECT service,environment,operation,version FROM service_runs WHERE run_id=?",
                )
                .bind(id)
                .fetch_optional(&self.db)
                .await?;
                let origin:Option<String>=sqlx::query_scalar("SELECT data FROM events WHERE object_id=? AND kind='run_origin' ORDER BY sequence DESC LIMIT 1").bind(id).fetch_optional(&self.db).await?;
                let source = if run.test_node_id.is_some() {
                    "node_test"
                } else if published.is_some() {
                    "published"
                } else if run.session_id.is_some() {
                    "agent"
                } else if origin.is_some() {
                    "debug"
                } else {
                    "manual"
                };
                let roots: Vec<_> = entries
                    .iter()
                    .filter(|e| e.parent_id.is_none())
                    .take(PAGE_SIZE)
                    .collect();
                let root_count = entries.iter().filter(|e| e.parent_id.is_none()).count();
                let snapshot = if query.light == Some(true) {
                    None
                } else {
                    self.pinned_workflow(id, &run.workflow_id).await.ok()
                };
                let mut nodes = HashMap::<String, Value>::new();
                for entry in entries.iter().filter(|e| e.kind == "node") {
                    let key = format!("{}:{}", entry.workflow_id, entry.node_id);
                    let node=nodes.entry(key).or_insert_with(||json!({"workflowId":entry.workflow_id,"nodeId":entry.node_id,"counts":{},"total":0,"durationMs":0,"startedAt":entry.started_at}));
                    let count = node["counts"][&entry.status].as_u64().unwrap_or(0) + 1;
                    node["counts"][&entry.status] = json!(count);
                    node["total"] = json!(node["total"].as_u64().unwrap_or(0) + 1);
                    node["durationMs"] = match (node["durationMs"].as_i64(), entry.duration_ms) {
                        (Some(total), Some(duration)) => json!(total + duration),
                        _ => Value::Null,
                    };
                }
                if query.at.is_some() && ended.is_none() {
                    let started:bool=sqlx::query_scalar("SELECT EXISTS(SELECT 1 FROM events WHERE object_id=? AND kind='run_started' AND sequence<=?)").bind(id).bind(query.at).fetch_one(&self.db).await?;
                    detail["run"]["status"] = json!(if started { "running" } else { "pending" });
                    detail["run"]["outputs"] = Value::Null;
                    detail["run"]["error"] = Value::Null;
                }
                let lookup: HashMap<_, _> = entries
                    .iter()
                    .map(|entry| (entry.id.as_str(), entry))
                    .collect();
                let links:Vec<_>=entries.iter().filter(|entry|entry.kind=="node").flat_map(|entry|entry.links.as_array().into_iter().flatten().filter_map(|link|{
                    let source=lookup.get(link["executionId"].as_str()?)?;
                    (source.workflow_id==entry.workflow_id).then(||json!({"workflowId":entry.workflow_id,"scopeId":entry.scope_id,"sourceNodeId":source.node_id,"sourcePortId":link["sourcePortId"],"targetNodeId":entry.node_id}))
                })).collect();
                let runtime:Option<String>=sqlx::query_scalar("SELECT json_extract(data,'$.runtime') FROM events WHERE object_id=? AND kind='run_started' ORDER BY sequence LIMIT 1").bind(id).fetch_optional(&self.db).await?.flatten();
                if query.light != Some(true) {
                    detail["snapshot"] = json!(snapshot);
                }
                detail["trace"] = json!({
                    "format":"flowgram.trace/v1", "runtime":runtime.unwrap_or_else(||"not_recorded".into()),
                    "origin":origin.map(|text|serde_json::from_str::<Value>(&text)).transpose()?,
                    "at":query.at,"observedAt":observed,"outputsAvailable":query.at.is_none() || ended.is_some(),
                    "source":source,"endedAt":ended,"durationMs":ended.as_ref().and_then(|end| milliseconds(&run.created_at,end)),
                    "watermark":watermark,"total":entries.len(),"rootTotal":root_count,"counts":counts,
                    "links":links,
                    "nodes":nodes.into_values().collect::<Vec<_>>(),
                    "focus":failure_path(&entries).iter().filter_map(|id|entries.iter().find(|entry|&entry.id==id)).collect::<Vec<_>>(),
                    "executions":roots,"nextCursor":if root_count>PAGE_SIZE { roots.last().map(|e|e.first_sequence) } else { None },
                    "failureId":entries.iter().rev().find(|e|e.status=="failed").map(|e|&e.id),
                    "failurePath":failure_path(&entries),
                    "publication":published.map(|(service,environment,operation,version)|json!({"service":service,"environment":environment,"operation":operation,"version":version})),
                });
                Ok(detail)
            }
        }
    }
}
fn failure_path(entries: &[Execution]) -> Vec<String> {
    let mut path = vec![];
    let mut cursor = entries.iter().rev().find(|e| e.status == "failed");
    while let Some(entry) = cursor {
        path.push(entry.id.clone());
        cursor = entry
            .parent_id
            .as_ref()
            .and_then(|p| entries.iter().find(|e| &e.id == p));
        if path.len() > 64 {
            break;
        }
    }
    path.reverse();
    path
}

impl Store {
    #[allow(clippy::too_many_arguments)]
    pub(crate) async fn begin_trace_call(
        &self,
        run: &str,
        node: &str,
        kind: &str,
        name: &str,
        inputs: Value,
        metadata: Value,
        context: &crate::control_runtime::ExecutionContext,
    ) -> Result<String> {
        let id = crate::store::id();
        let mut data = context.trace(
            json!({"nodeId":node,"executionId":id,"callKind":kind,"name":name,"inputs":inputs}),
        );
        if let Some(metadata) = metadata.as_object() {
            data.as_object_mut().unwrap().extend(metadata.clone());
        }
        context.register_call(data.clone());
        self.emit(&format!("{kind}_started"), run, data).await?;
        Ok(id)
    }
    pub(crate) async fn finish_trace_call(
        &self,
        run: &str,
        node: &str,
        kind: &str,
        id: &str,
        result: &Result<Value>,
        context: &crate::control_runtime::ExecutionContext,
    ) -> Result<()> {
        let prior = context.take_call(id);
        let (status, mut value) = match result {
            Ok(value) => ("finished", json!({"outputs":value})),
            Err(Error::Cancelled) => ("canceled", json!({"error":"Execution canceled"})),
            Err(error) => ("failed", json!({"error":error.to_string()})),
        };
        if result.is_err()
            && let Some(prior) = prior
            && prior["partial"] == true
        {
            value["outputs"] = prior["outputs"].clone();
            value["partial"] = json!(true);
        }
        let mut data = context.trace(json!({"nodeId":node,"executionId":id,"callKind":kind}));
        data.as_object_mut()
            .unwrap()
            .extend(value.as_object().unwrap().clone());
        self.emit(&format!("{kind}_{status}"), run, data).await
    }
}

/// Known credential fields are never included in observable call payloads.
/// This operates on a copy; it cannot change the request sent to a provider.
pub(crate) fn safe_payload(mut value: Value) -> Value {
    match &mut value {
        Value::Object(fields) => {
            for (key, value) in fields {
                let normalized = key.to_ascii_lowercase().replace('-', "_");
                if matches!(
                    normalized.as_str(),
                    "authorization"
                        | "proxy_authorization"
                        | "cookie"
                        | "set_cookie"
                        | "api_key"
                        | "x_api_key"
                        | "password"
                        | "access_token"
                        | "refresh_token"
                        | "secret"
                ) {
                    *value = json!("[redacted]");
                } else {
                    *value = safe_payload(value.take());
                }
            }
        }
        Value::Array(values) => {
            for value in values {
                *value = safe_payload(value.take());
            }
        }
        _ => {}
    }
    value
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn timing_preserves_submillisecond_bounds_and_rejects_reversed_clocks() {
        let start = "2026-10-20T00:00:00.000000Z";
        assert_eq!(milliseconds(start, "2026-10-20T00:00:00.000400Z"), Some(0));
        assert_eq!(milliseconds(start, "2026-10-19T23:59:59.999900Z"), None);
        assert_eq!(milliseconds(start, "invalid"), None);
    }
    #[tokio::test]
    async fn skipped_and_missing_start_events_have_no_measured_duration() {
        let (_dir, store, run) = recording().await;
        for (kind, identity) in [("node_skipped", "skipped"), ("node_finished", "no-start")] {
            store.emit(kind, &run.id, json!({"nodeId":"loop","executionId":identity})).await.unwrap();
        }
        let detail = store.inspect_trace(&run.id, &TraceQuery::default()).await.unwrap();
        for entry in detail["trace"]["executions"].as_array().unwrap() {
            assert!(entry["durationMs"].is_null());
        }
        let comparison = store.inspect_trace(&run.id, &TraceQuery { view: Some("compare".into()), ..Default::default() }).await.unwrap();
        assert!(comparison["groups"][0]["durationMs"].is_null());
        assert_eq!(comparison["groups"][0]["durationComplete"], false);
    }
    async fn recording() -> (tempfile::TempDir, Store, Run) {
        let dir = tempfile::tempdir().unwrap();
        let store = Store::open(dir.path()).await.unwrap();
        let project = store.projects().await.unwrap().remove(0);
        let workflow = store.create_workflow(&project.id, "Original name", json!({"nodes":[{"id":"loop","type":"control.foreach","meta":{"position":{"x":123,"y":456}}}],"edges":[]})).await.unwrap();
        let mut tx = store.db.begin().await.unwrap();
        let run = store
            .prepare_run(
                &workflow,
                None,
                &json!({}),
                std::slice::from_ref(&workflow),
                &mut tx,
            )
            .await
            .unwrap();
        tx.commit().await.unwrap();
        (dir, store, run)
    }
    #[tokio::test]
    async fn pages_instances_without_truncating_totals_or_payloads() {
        let (_dir, store, run) = recording().await;
        store.emit("node_started", &run.id, json!({"nodeId":"loop","executionId":"outer","workflowId":run.workflow_id,"inputs":{"items":[1,2]}})).await.unwrap();
        for i in 0..260 {
            let data = json!({"nodeId":"same-node","executionId":format!("iteration-{i}"),"parentExecutionId":"outer","workflowId":run.workflow_id,"iterationPath":[i],"scopeId":format!("scope-{i}"),"inputs":{"value":i,"large":"x".repeat(1000)}});
            store
                .emit("node_started", &run.id, data.clone())
                .await
                .unwrap();
            let mut done = data;
            done["outputs"] = json!({"result":i});
            store
                .emit(
                    if i == 259 {
                        "node_failed"
                    } else {
                        "node_finished"
                    },
                    &run.id,
                    done,
                )
                .await
                .unwrap();
        }
        let detail = store
            .inspect_trace(&run.id, &TraceQuery::default())
            .await
            .unwrap();
        assert_eq!(detail["trace"]["total"], 261);
        assert_eq!(detail["trace"]["rootTotal"], 1);
        let light = store
            .inspect_trace(
                &run.id,
                &TraceQuery {
                    view: Some("overview".into()),
                    light: Some(true),
                    ..Default::default()
                },
            )
            .await
            .unwrap();
        assert!(light.get("snapshot").is_none());
        assert!(light.get("manifest").is_none());
        assert!(light["run"].get("inputs").is_none());
        assert_eq!(light["trace"]["total"], 261);

        assert_eq!(detail["trace"]["counts"]["succeeded"], 259);
        assert_eq!(detail["trace"]["executions"][0]["children"], 260);
        assert_eq!(
            detail["trace"]["failurePath"],
            json!(["outer", "iteration-259"])
        );
        assert_eq!(detail["snapshot"]["name"], "Original name");
        assert_eq!(
            detail["snapshot"]["schema"]["nodes"][0]["meta"]["position"]["x"],
            123
        );
        let page = store
            .inspect_trace(
                &run.id,
                &TraceQuery {
                    view: Some("executions".into()),
                    parent: Some("outer".into()),
                    ..Default::default()
                },
            )
            .await
            .unwrap();
        assert_eq!(page["executions"].as_array().unwrap().len(), 100);
        assert!(page["executions"][0].get("inputs").is_none());
        assert_eq!(page["executions"][0]["inputsAvailable"], true);
        let cursor = page["nextCursor"].as_i64().unwrap();
        let page2 = store
            .inspect_trace(
                &run.id,
                &TraceQuery {
                    view: Some("executions".into()),
                    parent: Some("outer".into()),
                    cursor: Some(cursor),
                    ..Default::default()
                },
            )
            .await
            .unwrap();
        assert_eq!(page2["executions"][0]["iterationPath"], json!([100]));
        let selected = store
            .inspect_trace(
                &run.id,
                &TraceQuery {
                    view: Some("execution".into()),
                    execution: Some("iteration-259".into()),
                    ..Default::default()
                },
            )
            .await
            .unwrap();
        let data: Value =
            serde_json::from_str(selected["events"][0]["data"].as_str().unwrap()).unwrap();
        assert_eq!(data["inputs"]["value"], 259);
        assert!(
            store
                .inspect_trace(
                    &run.id,
                    &TraceQuery {
                        view: Some("execution".into()),
                        execution: Some("another-run".into()),
                        ..Default::default()
                    }
                )
                .await
                .is_err()
        );
        let at = store
            .inspect_trace(
                &run.id,
                &TraceQuery {
                    view: Some("executions".into()),
                    at: detail["trace"]["executions"][0]["firstSequence"].as_i64(),
                    ..Default::default()
                },
            )
            .await
            .unwrap();
        assert_eq!(at["executions"][0]["children"], 0);
        let focused = store
            .inspect_trace(
                &run.id,
                &TraceQuery {
                    view: Some("executions".into()),
                    parent: Some("outer".into()),
                    execution: Some("iteration-259".into()),
                    ..Default::default()
                },
            )
            .await
            .unwrap();
        assert_eq!(focused["executions"][0]["iterationPath"], json!([200]));
        assert!(focused["previousCursor"].is_i64());
        let initial = store
            .inspect_trace(
                &run.id,
                &TraceQuery {
                    view: Some("overview".into()),
                    at: Some(0),
                    ..Default::default()
                },
            )
            .await
            .unwrap();
        assert_eq!(initial["run"]["status"], "pending");
        assert_eq!(initial["trace"]["total"], 0);
        assert_eq!(initial["trace"]["outputsAvailable"], false);
    }
    #[tokio::test]
    async fn call_lifecycles_keep_parent_scope_failures_and_redaction() {
        let (_dir, store, run) = recording().await;
        store
            .emit(
                "node_started",
                &run.id,
                json!({"nodeId":"agent","executionId":"parent","inputs":{}}),
            )
            .await
            .unwrap();
        let context = crate::control_runtime::ExecutionContext::root(0)
            .with_workflow(run.workflow_id.clone())
            .child(None, Some(36))
            .with_parent("parent".into());
        let model = store
            .begin_trace_call(
                &run.id,
                "agent",
                "model",
                "Generate",
                json!({"messages":[{"role":"user","content":"Classify order"}]}),
                json!({}),
                &context,
            )
            .await
            .unwrap();
        store
            .finish_trace_call(
                &run.id,
                "agent",
                "model",
                &model,
                &Ok(json!({"usage":{"input_tokens":12},"output":[]})),
                &context,
            )
            .await
            .unwrap();
        let tool=store.begin_trace_call(&run.id,"agent","tool","Inspect",json!({"headers":{"Authorization":"private","X-Api-Key":"private"},"value":"visible"}),json!({"callId":"provider-call"}),&context).await.unwrap();
        store
            .finish_trace_call(
                &run.id,
                "agent",
                "tool",
                &tool,
                &Err(Error::Execution("Tool unavailable".into())),
                &context,
            )
            .await
            .unwrap();
        let children = store
            .inspect_trace(
                &run.id,
                &TraceQuery {
                    view: Some("executions".into()),
                    parent: Some("parent".into()),
                    ..Default::default()
                },
            )
            .await
            .unwrap();
        assert_eq!(children["executions"].as_array().unwrap().len(), 2);
        assert_eq!(children["executions"][0]["iterationPath"], json!([36]));
        assert_eq!(children["executions"][0]["kind"], "model");
        assert_eq!(children["executions"][1]["status"], "failed");
        let detail = store
            .inspect_trace(
                &run.id,
                &TraceQuery {
                    view: Some("execution".into()),
                    execution: Some(tool),
                    ..Default::default()
                },
            )
            .await
            .unwrap();
        let event: Value =
            serde_json::from_str(detail["events"][0]["data"].as_str().unwrap()).unwrap();
        assert_eq!(event["inputs"]["headers"]["Authorization"], "[redacted]");
        assert_eq!(event["inputs"]["headers"]["X-Api-Key"], "[redacted]");
        assert_eq!(event["callId"], "provider-call");
        let pending = store
            .begin_trace_call(
                &run.id,
                "agent",
                "http",
                "Fetch",
                json!({}),
                json!({}),
                &context,
            )
            .await
            .unwrap();
        store
            .cancel_scope(&run.id, &context, "parent_failed")
            .await
            .unwrap();
        let canceled = store
            .inspect_trace(
                &run.id,
                &TraceQuery {
                    view: Some("execution".into()),
                    execution: Some(pending),
                    ..Default::default()
                },
            )
            .await
            .unwrap();
        assert_eq!(canceled["events"][1]["kind"], "http_canceled");
    }
    #[tokio::test]
    async fn comparison_preserves_repeated_failures_usage_and_definition_identity() {
        let (_dir, store, run) = recording().await;
        for i in 0..2 {
            store.emit("node_started",&run.id,json!({"nodeId":"loop","executionId":format!("loop-{i}"),"workflowId":run.workflow_id,"inputs":{}})).await.unwrap();
            store.emit(if i==0{"node_failed"}else{"node_finished"},&run.id,json!({"nodeId":"loop","executionId":format!("loop-{i}"),"workflowId":run.workflow_id,"outputs":{"value":i}})).await.unwrap();
        }
        store.emit("model_started",&run.id,json!({"nodeId":"loop","executionId":"model","workflowId":run.workflow_id,"parentExecutionId":"loop-0","inputs":[]})).await.unwrap();
        store.emit("model_finished",&run.id,json!({"nodeId":"loop","executionId":"model","workflowId":run.workflow_id,"parentExecutionId":"loop-0","outputs":{"usage":{"input_tokens":12,"output_tokens":3}}})).await.unwrap();
        let comparison = store
            .inspect_trace(
                &run.id,
                &TraceQuery {
                    view: Some("compare".into()),
                    ..Default::default()
                },
            )
            .await
            .unwrap();
        let group = &comparison["groups"][0];
        assert_eq!(group["executions"], 2);
        assert_eq!(group["counts"]["failed"], 1);
        assert_eq!(group["inputTokens"], 12);
        assert_eq!(group["outputTokens"], 3);
        assert_eq!(group["modelCalls"], 1);
        let clone = store
            .prepare_debug_copy(crate::run_debug::DebugCopy {
                workflow_id: run.workflow_id.clone(),
                workflows: vec![
                    store
                        .pinned_workflow(&run.id, &run.workflow_id)
                        .await
                        .unwrap(),
                ],
                name_suffix: "Debug".into(),
                origin: crate::run_debug::Origin {
                    run_id: run.id.clone(),
                    workflow_id: run.workflow_id.clone(),
                    execution_id: None,
                    request_root: None,
                },
            })
            .await
            .unwrap();
        let workflow: crate::model::Workflow =
            serde_json::from_value(clone["workflow"].clone()).unwrap();
        let mut tx = store.db.begin().await.unwrap();
        let second = store
            .prepare_run(
                &workflow,
                None,
                &json!({}),
                std::slice::from_ref(&workflow),
                &mut tx,
            )
            .await
            .unwrap();
        tx.commit().await.unwrap();
        let second = store
            .inspect_trace(
                &second.id,
                &TraceQuery {
                    view: Some("compare".into()),
                    ..Default::default()
                },
            )
            .await
            .unwrap();
        assert_eq!(second["groups"][0]["canonicalWorkflowId"], run.workflow_id);
        assert_eq!(second["groups"][0]["configHash"], group["configHash"]);
        assert_eq!(second["groups"][0]["executions"], 0);
        assert!(second["groups"][0]["inputTokens"].is_null());
    }
    #[tokio::test]
    async fn failed_parent_remains_focusable_when_children_are_canceled() {
        let (_dir, store, run) = recording().await;
        for (kind, data) in [
            (
                "node_started",
                json!({"nodeId":"loop","executionId":"outer","inputs":{}}),
            ),
            (
                "model_started",
                json!({"nodeId":"llm","executionId":"child","parentExecutionId":"outer","inputs":[]}),
            ),
            (
                "model_canceled",
                json!({"nodeId":"llm","executionId":"child","reason":"parent_failed"}),
            ),
            (
                "node_failed",
                json!({"nodeId":"loop","executionId":"outer","error":"Execution budget exceeded"}),
            ),
        ] {
            store.emit(kind, &run.id, data).await.unwrap();
        }
        let detail = store
            .inspect_trace(&run.id, &TraceQuery::default())
            .await
            .unwrap();
        assert_eq!(detail["trace"]["failureId"], "outer");
        assert_eq!(detail["trace"]["failurePath"], json!(["outer"]));
        assert_eq!(detail["trace"]["focus"][0]["children"], 1);
    }
    #[tokio::test]
    async fn terminal_runs_preserve_unfinished_spans_and_snapshot_identity() {
        let (_dir, store, run) = recording().await;
        store
            .emit(
                "model_started",
                &run.id,
                json!({"nodeId":"llm","executionId":"call","name":"Generate","inputs":[]}),
            )
            .await
            .unwrap();
        sqlx::query("UPDATE runs SET status='interrupted' WHERE id=?")
            .bind(&run.id)
            .execute(&store.db)
            .await
            .unwrap();
        let workflow = store.workflow(&run.workflow_id).await.unwrap();
        store
            .save_workflow(
                &workflow.id,
                workflow.revision,
                "Changed name",
                json!({"nodes":[{"id":"start","type":"start","data":{}},{"id":"end","type":"end","data":{"inputsValues":{}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"end"}]}),
            )
            .await
            .unwrap();
        let detail = store
            .inspect_trace(&run.id, &TraceQuery::default())
            .await
            .unwrap();
        assert_eq!(detail["snapshot"]["name"], "Original name");
        assert_eq!(detail["trace"]["executions"][0]["status"], "interrupted");
        assert!(detail["trace"]["durationMs"].is_null());
        let query = TraceQuery {
            view: Some("execution".into()),
            execution: Some("a&b=x".into()),
            ..Default::default()
        };
        assert!(query.query_string().contains("execution=a%26b%3Dx"));
    }
}
