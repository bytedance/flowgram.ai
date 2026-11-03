//! One registry and dispatcher for the built-in assistant and authoring MCP.
mod catalog;
mod guidance;
mod node_contract;
mod read;
mod runs;
mod validation;
use crate::{
    error::{Error, Result},
    store::{Store, id, now},
    workflow_edit::graph::{Document, failure, hash, text},
};
pub use catalog::{definitions, mcp_list, mcp_result, readonly, visible};
use read::ok;
pub(crate) use runs::persist_run_request;
use serde_json::{Value, json};

impl Store {
    pub async fn tool(
        &self,
        project: &str,
        session: Option<&str>,
        name: &str,
        args: Value,
    ) -> Result<Value> {
        self.require_project(project).await?;
        if let Some(session) = session
            && self.session(session).await?.project_id != project
        {
            return Err(failure(
                "FORBIDDEN",
                "Session does not belong to this project",
            ));
        }
        self.authoring_tool(project, session, None, name, args)
            .await
    }
    pub(crate) async fn run_agent_tool(&self, run: &str, name: &str, args: Value) -> Result<Value> {
        if !readonly(name) {
            return Err(failure(
                "FORBIDDEN",
                "Workflow Agents may only inspect their frozen execution scope",
            ));
        }
        let root = self.run(run).await?;
        let w = self.pinned_workflow(run, &root.workflow_id).await?;
        self.authoring_tool(&w.project_id, None, Some(run), name, args)
            .await
    }
    async fn authoring_tool(
        &self,
        project: &str,
        session: Option<&str>,
        run: Option<&str>,
        name: &str,
        args: Value,
    ) -> Result<Value> {
        let definition = catalog::definition(name)
            .ok_or_else(|| failure("UNKNOWN_TOOL", format!("Unknown tool: {name}")))?;
        let validator = jsonschema::validator_for(&definition["parameters"])
            .map_err(|e| failure("INVALID_CONTRACT", e.to_string()))?;
        if let Err(error) = validator.validate(&args) {
            return Err(Error::Tool(
                json!({"code":"INVALID_ARGUMENT","message":error.to_string(),"path":error.instance_path.to_string()}),
            ));
        }
        let caller = session.unwrap_or("mcp");
        let context = json!({"projectId":project,"runId":run});
        let result = match name {
            "search_tools" => {
                let items = catalog::matches(
                    args["query"].as_str().unwrap_or(""),
                    args["group"].as_str(),
                    run.is_some(),
                );
                self.page(items, &args, context, run).await?
            }
            "describe_tool" => {
                let name = text(&args, "name")?;
                if run.is_some() && !readonly(name) {
                    return Err(failure(
                        "FORBIDDEN",
                        "Tool is unavailable in this execution scope",
                    ));
                }
                let mut tool = catalog::definition(name)
                    .ok_or_else(|| failure("UNKNOWN_TOOL", "Tool not found"))?;
                if name == "edit_workflow"
                    && let Some(operations) = args["operations"].as_array()
                {
                    tool["parameters"]["properties"]["operations"]["items"]["oneOf"]
                        .as_array_mut()
                        .unwrap()
                        .retain(|v| operations.contains(&v["properties"]["op"]["const"]));
                }
                if name == "edit_workflow" {
                    let operations =
                        tool["parameters"]["properties"]["operations"]["items"]["oneOf"]
                            .as_array()
                            .unwrap();
                    tool["operationGuides"] = json!(
                        operations
                            .iter()
                            .filter_map(|op| op["properties"]["op"]["const"].as_str())
                            .map(guidance::operation)
                            .collect::<Vec<_>>()
                    );
                    tool["constraints"] = json!([
                        "One atomic candidate: any operation failure rolls back the entire batch.",
                        "Use the current expectedRevision and a stable mutationId. Retry unchanged arguments with the same ID after an uncertain result; never blindly use a new ID.",
                        "Drafts may be incomplete, but scope/port/reference and structural invariants are enforced."
                    ]);
                } else {
                    tool["constraints"] = json!([
                        "Read results by explicit IDs/paths; reuse immutable snapshot cursors with the same filters.",
                        "Discovering or describing a tool never expands the caller's permissions.",
                        "Execution requests require explicit user intent and stable mutation IDs. Reading results must not repeat execution."
                    ]);
                }
                ok(context, tool)
            }
            "search_node_types" => {
                let query = args["query"].as_str().unwrap_or("").to_lowercase();
                let items=crate::core_nodes::CATALOG.iter().chain(crate::nodes::CATALOG.iter()).chain(crate::control::CATALOG.iter()).filter(|n|(query.is_empty()||format!("{} {} {}",n["type"],n["title"],n["description"]).to_lowercase().contains(&query))&&args["group"].as_str().is_none_or(|g|n["group"].as_str().is_some_and(|v|v.eq_ignore_ascii_case(g)))).map(|n|json!({"nodeType":n["type"],"title":n["title"],"group":n["group"],"description":n["description"]})).collect();
                self.page(items, &args, context, run).await?
            }
            "describe_node_type" => {
                let mut items = Vec::new();
                for kind in args["nodeTypes"].as_array().unwrap() {
                    let kind = kind.as_str().unwrap();
                    let mut contract = node_contract::execution_contract(kind)?;
                    if args["knownHashes"][kind] == contract["contractHash"] {
                        items.push(json!({"nodeType":kind,"contractHash":contract["contractHash"],"unchanged":true}));
                        continue;
                    }
                    if let Some(sections) = args["sections"].as_array() {
                        for section in ["fields", "ports", "structure", "examples"] {
                            if !sections.contains(&json!(section)) {
                                contract.as_object_mut().unwrap().remove(section);
                            }
                        }
                    }
                    items.push(contract);
                }
                self.page(items, &json!({"limit":12}), context, run).await?
            }
            "list_models" | "read_model" => {
                if let Some(run) = run {
                    let rows:Vec<String>=sqlx::query_scalar("SELECT definition FROM run_models WHERE run_id=? ORDER BY workflow_id,node_id").bind(run).fetch_all(&self.db).await?;
                    let mut entries = std::collections::BTreeMap::new();
                    for row in rows {
                        let m: crate::models::Resolved = serde_json::from_str(&row)?;
                        let v = if name == "read_model" {
                            json!({"id":m.model_id,"name":m.model_name,"capabilities":m.capabilities,"contextWindow":m.context_window,"parameters":m.parameters,"availability":"pinned"})
                        } else {
                            json!({"id":m.model_id,"name":m.model_name,"capabilities":m.capabilities,"availability":"pinned"})
                        };
                        if name == "read_model" && args["modelId"] != m.model_id {
                            continue;
                        }
                        if args["query"].as_str().is_some_and(|q| {
                            !format!("{} {}", m.model_id, m.model_name)
                                .to_lowercase()
                                .contains(&q.to_lowercase())
                        }) {
                            continue;
                        }
                        if let Some(requires) = args["requires"].as_array() {
                            let caps = serde_json::to_value(&m.capabilities)?;
                            if !requires
                                .iter()
                                .all(|r| r.as_str().is_some_and(|k| caps[k] == true))
                            {
                                continue;
                            }
                        }
                        entries.insert(m.model_id, v);
                    }
                    if name == "read_model" {
                        return Ok(ok(
                            context,
                            entries.into_values().next().ok_or_else(|| {
                                failure("NOT_FOUND", "Model is outside this run's frozen bindings")
                            })?,
                        ));
                    }
                    return self
                        .page(entries.into_values().collect(), &args, context, Some(run))
                        .await;
                }
                let mut items = Vec::new();
                for model in self.deployment_settings.model_entries().await? {
                    if name == "read_model" && args["modelId"] != model.id {
                        continue;
                    }
                    let available = self
                        .deployment_settings
                        .resolve_model(
                            &crate::models::Selection {
                                model_id: Some(model.id.clone()),
                                parameters: Default::default(),
                            },
                            project,
                            false,
                            false,
                        )
                        .await
                        .is_ok();
                    let mut value = serde_json::to_value(&model)?;
                    if name == "list_models" {
                        value = json!({"id":model.id,"name":model.name,"capabilities":model.capabilities,"available":available});
                    } else {
                        value["available"] = json!(available);
                    }
                    if args["query"].as_str().is_some_and(|q| {
                        !format!("{} {}", model.id, model.name)
                            .to_lowercase()
                            .contains(&q.to_lowercase())
                    }) {
                        continue;
                    }
                    if let Some(requires) = args["requires"].as_array() {
                        let caps = serde_json::to_value(&model.capabilities)?;
                        if !requires
                            .iter()
                            .all(|r| r.as_str().is_some_and(|k| caps[k] == true))
                        {
                            continue;
                        }
                    }
                    items.push(value);
                }
                if name == "read_model" {
                    ok(
                        context,
                        items
                            .into_iter()
                            .next()
                            .ok_or_else(|| failure("NOT_FOUND", "Model not found"))?,
                    )
                } else {
                    let mut page = self.page(items, &args, context, run).await?;
                    page["data"]["defaults"] =
                        serde_json::to_value(self.deployment_settings.model_defaults().await?)?;
                    page
                }
            }
            "list_workflows" => {
                let workflows = if let Some(run) = run {
                    let texts: Vec<String> = sqlx::query_scalar(
                        "SELECT definition FROM run_workflows WHERE run_id=? ORDER BY workflow_id",
                    )
                    .bind(run)
                    .fetch_all(&self.db)
                    .await?;
                    texts
                        .iter()
                        .map(|s| serde_json::from_str::<crate::model::Workflow>(s))
                        .collect::<std::result::Result<Vec<_>, _>>()?
                } else {
                    self.workflows().await?
                };
                let items=workflows.into_iter().filter(|w|w.project_id==project&&args["query"].as_str().is_none_or(|q|w.name.to_lowercase().contains(&q.to_lowercase()))).map(|w|{let count=Document::read(&w.name,&w.schema).map(|d|d.0["nodes"].as_object().unwrap().len()).unwrap_or(0);json!({"workflowId":w.id,"name":w.name,"revision":w.revision,"nodeCount":count,"updatedAt":w.updated_at})}).collect();
                self.page(items, &args, context, run).await?
            }
            "read_tool_result" => self.structured_tool_result(&args, run).await?,
            "create_workflow" => self.create_workflow_tool(project, caller, &args).await?,
            "read_run" | "list_run_steps" | "read_run_step" | "read_run_events" | "cancel_run" => {
                self.run_tool(project, caller, run, name, &args).await?
            }
            _ => {
                let workflow = text(&args, "workflowId")?;
                let w = if let Some(run) = run {
                    self.pinned_workflow(run, workflow).await?
                } else if let Some(source) = args["source"]["runId"].as_str() {
                    self.pinned_workflow(source, workflow).await?
                } else {
                    self.workflow(workflow).await?
                };
                if w.project_id != project {
                    return Err(failure(
                        "FORBIDDEN",
                        "Workflow does not belong to this project",
                    ));
                }
                match name {
                    "read_workflow" | "search_workflow" => {
                        self.read_workflow_tool(name, &args, run).await?
                    }
                    "edit_workflow" => self.edit_workflow(workflow, caller, &args).await?,
                    "get_workflow_change" => {
                        self.get_workflow_change(workflow, caller, &args).await?
                    }
                    "revert_workflow_change" => {
                        let mut request = args.clone();
                        request["revertChangeId"] = args["changeId"].clone();
                        self.edit_workflow(workflow, caller, &request).await?
                    }
                    "layout_workflow" => {
                        let mut request = args.clone();
                        request["layout"] = json!(true);
                        self.edit_workflow(workflow, caller, &request).await?
                    }
                    "validate_workflow" => self.validate_workflow_tool(&args, run).await?,
                    "run_workflow" | "test_node" => {
                        self.start_run_tool(project, session, caller, name, &args)
                            .await?
                    }
                    _ => return Err(failure("UNKNOWN_TOOL", "Unknown tool")),
                }
            }
        };
        let mut result = self
            .bounded(crate::run_trace::safe_payload(result), run)
            .await?;
        result["resultRef"] = self.retain_value(&result, run).await?;
        Ok(result)
    }
    async fn create_workflow_tool(
        &self,
        project: &str,
        caller: &str,
        args: &Value,
    ) -> Result<Value> {
        let key = text(args, "mutationId")?;
        let request_key = format!("create:{caller}");
        let request_hash = hash(args);
        let _guard = self.workflow_lock.lock().await;
        let existing: Option<(String, Option<String>)> = sqlx::query_as(
            "SELECT request_hash,receipt FROM tool_run_requests WHERE caller=? AND mutation_id=?",
        )
        .bind(&request_key)
        .bind(key)
        .fetch_optional(&self.db)
        .await?;
        if let Some((h, Some(receipt))) = existing {
            if h != request_hash {
                return Err(failure(
                    "IDEMPOTENCY_CONFLICT",
                    "mutationId was used with different arguments",
                ));
            }
            let receipt: Value = serde_json::from_str(&receipt)?;
            if receipt["ok"] == true {
                return Ok(receipt);
            }
            let w: crate::model::Workflow = serde_json::from_value(receipt["prepared"].clone())?;
            match self.workflow(&w.id).await {
                Ok(_) => {}
                Err(Error::NotFound(_)) => self.write_workflow_file(&w).await?,
                Err(Error::Io(error)) if error.kind() == std::io::ErrorKind::NotFound => {
                    self.write_workflow_file(&w).await?
                }
                Err(error) => return Err(error),
            }
            self.index_workflow(&self.workflow(&w.id).await?).await?;
            return self.finish_create(&request_key, key, &w).await;
        }
        let name = text(args, "name")?.trim();
        if name.is_empty() {
            return Err(failure("INVALID_ARGUMENT", "Workflow name cannot be empty"));
        }
        let w = crate::model::Workflow {
            id: id(),
            project_id: project.into(),
            name: name.into(),
            revision: 1,
            updated_at: now(),
            schema: json!({"nodes":[{"id":"start","type":"start","data":{"title":"Input","inputsValues":{},"outputs":{"type":"object","properties":{}}},"meta":{"position":{"x":100,"y":160}}},{"id":"end","type":"end","data":{"title":"Output","inputsValues":{}},"meta":{"position":{"x":460,"y":160}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"end"}]}),
        };
        sqlx::query("INSERT INTO tool_run_requests VALUES(?,?,?,'pending',?)")
            .bind(&request_key)
            .bind(key)
            .bind(request_hash)
            .bind(json!({"prepared":w}).to_string())
            .execute(&self.db)
            .await?;
        self.write_workflow_file(&w).await?;
        self.index_workflow(&w).await?;
        self.finish_create(&request_key, key, &w).await
    }
    pub(crate) async fn recover_tool_creations(&self) -> Result<()> {
        let rows:Vec<(String,String,String)>=sqlx::query_as("SELECT caller,mutation_id,receipt FROM tool_run_requests WHERE caller LIKE 'create:%' AND state='pending' AND receipt IS NOT NULL").fetch_all(&self.db).await?;
        for (caller, key, receipt) in rows {
            let value: Value = serde_json::from_str(&receipt)?;
            let w: crate::model::Workflow = serde_json::from_value(value["prepared"].clone())?;
            match self.workflow(&w.id).await {
                Ok(current) => self.index_workflow(&current).await?,
                Err(Error::NotFound(_)) => {
                    self.write_workflow_file(&w).await?;
                    self.index_workflow(&w).await?;
                }
                Err(Error::Io(error)) if error.kind() == std::io::ErrorKind::NotFound => {
                    self.write_workflow_file(&w).await?;
                    self.index_workflow(&w).await?;
                }
                Err(error) => return Err(error),
            }
            self.finish_create(&caller, &key, &w).await?;
        }
        Ok(())
    }
    async fn finish_create(
        &self,
        caller: &str,
        key: &str,
        w: &crate::model::Workflow,
    ) -> Result<Value> {
        let receipt = ok(
            json!({"workflowId":w.id,"projectId":w.project_id,"revision":1}),
            json!({"workflowId":w.id,"name":w.name,"mutationId":key,"boundaryIds":{"entry":"start","exit":"end"}}),
        );
        sqlx::query("UPDATE tool_run_requests SET state='committed',receipt=? WHERE caller=? AND mutation_id=?").bind(receipt.to_string()).bind(caller).bind(key).execute(&self.db).await?;
        self.emit(
            "workflow_changed",
            &w.id,
            json!({"workflowId":w.id,"revision":1}),
        )
        .await?;
        Ok(receipt)
    }
}
