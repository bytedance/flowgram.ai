//! Diagnostic reads cover the executable graph, model bindings and dependencies.
use super::node_contract::execution_contract;
use crate::{
    error::Result,
    model::Workflow,
    store::Store,
    workflow_edit::graph::{Document, escape, failure},
};
use serde_json::{Value, json};
fn diagnostic(
    code: &str,
    category: &str,
    workflow: &str,
    node: Option<&str>,
    path: &str,
    message: impl ToString,
) -> Value {
    let recovery = if let Some(node) = node {
        if let Some(relative) = path
            .strip_prefix(&format!("/nodes/{}/data", escape(node)))
            .filter(|p| p.starts_with('/'))
        {
            json!({"tool":"read_workflow","workflowId":workflow,"view":"fields","nodeIds":[node],"paths":[relative]})
        } else {
            json!({"tool":"read_workflow","workflowId":workflow,"view":"nodes","nodeIds":[node]})
        }
    } else {
        json!({"tool":"read_workflow","workflowId":workflow,"view":"summary"})
    };
    json!({"code":code,"category":category,"severity":"error","workflowId":workflow,"nodeId":node,"path":path,"message":message.to_string(),"recovery":recovery})
}
impl Store {
    async fn definition_diagnostics(
        &self,
        root: &Workflow,
        source: Option<&str>,
    ) -> Result<Vec<Value>> {
        let mut diagnostics = Vec::new();
        let workflows = if let Some(run) = source {
            let rows: Vec<String> = sqlx::query_scalar(
                "SELECT definition FROM run_workflows WHERE run_id=? ORDER BY workflow_id",
            )
            .bind(run)
            .fetch_all(&self.db)
            .await?;
            rows.iter()
                .map(|s| serde_json::from_str(s))
                .collect::<std::result::Result<Vec<Workflow>, _>>()?
        } else {
            match self.capture_workflows(root).await {
                Ok(definitions) => definitions,
                Err(e) => {
                    diagnostics.push(diagnostic(
                        "DEPENDENCY_INVALID",
                        "dependency",
                        &root.id,
                        None,
                        "/",
                        e,
                    ));
                    vec![root.clone()]
                }
            }
        };
        let model_set = self.deployment_settings.model_set().await?;
        for w in workflows {
            let doc = Document::read(&w.name, &w.schema)?;
            let nodes = doc.0["nodes"].as_object().unwrap();
            for message in crate::runtime::validate(&w.schema)? {
                let node = nodes.keys().find(|id| {
                    message.starts_with(&format!("{id}:"))
                        || message.starts_with(&format!("{id}."))
                        || message.starts_with(&format!("Node {id}:"))
                        || message.starts_with(&format!("Node {id} "))
                        || message.starts_with(&format!("Loop {id} "))
                });
                diagnostics.push(diagnostic(
                    "GRAPH_INVALID",
                    "graph",
                    &w.id,
                    node.map(String::as_str),
                    &node
                        .map(|id| format!("/nodes/{}", escape(id)))
                        .unwrap_or_else(|| "/".into()),
                    message,
                ));
            }
            for (id, node) in nodes {
                let kind = node["type"].as_str().unwrap_or("");
                if let Ok(contract) = execution_contract(kind) {
                    for field in contract["fields"].as_array().unwrap() {
                        let path = field["path"].as_str().unwrap();
                        let Some(stored) = node["data"].pointer(path) else {
                            continue;
                        };
                        let value = if field["binding"] == true {
                            if stored["type"] != "constant" {
                                continue;
                            }
                            &stored["content"]
                        } else {
                            stored
                        };
                        if let Ok(validator) = jsonschema::validator_for(&field["schema"]) {
                            for error in validator.iter_errors(value).take(5) {
                                let suffix = if field["binding"] == true {
                                    "/content"
                                } else {
                                    ""
                                };
                                diagnostics.push(diagnostic(
                                    "FIELD_INVALID",
                                    "configuration",
                                    &w.id,
                                    Some(id),
                                    &format!(
                                        "/nodes/{}/data{path}{suffix}{}",
                                        escape(id),
                                        error.instance_path
                                    ),
                                    format!(
                                        "Value at {path} violates the node contract rule {}",
                                        error.schema_path
                                    ),
                                ));
                            }
                        }
                    }
                }
                if matches!(kind, "llm" | "agent") {
                    let model_error = if let Some(run) = source {
                        let exists:bool=sqlx::query_scalar("SELECT EXISTS(SELECT 1 FROM run_models WHERE run_id=? AND workflow_id=? AND node_id=?)").bind(run).bind(&w.id).bind(id).fetch_one(&self.db).await?;
                        (!exists).then(|| {
                            "Model binding is missing from the frozen run manifest".to_owned()
                        })
                    } else {
                        match serde_json::from_value::<crate::models::Selection>(
                            node["data"].get("model").cloned().unwrap_or(json!({})),
                        ) {
                            Ok(selection) => self
                                .deployment_settings
                                .resolve_in_set(
                                    &model_set,
                                    &selection,
                                    &w.project_id,
                                    kind == "agent",
                                    false,
                                )
                                .await
                                .err()
                                .map(|e| e.to_string()),
                            Err(e) => Some(e.to_string()),
                        }
                    };
                    if let Some(message) = model_error {
                        diagnostics.push(diagnostic(
                            "MODEL_UNAVAILABLE",
                            "model",
                            &w.id,
                            Some(id),
                            &format!("/nodes/{}/data/model", escape(id)),
                            message,
                        ));
                    }
                }
            }
        }
        Ok(diagnostics)
    }
    pub(super) async fn validate_workflow_tool(
        &self,
        args: &Value,
        run: Option<&str>,
    ) -> Result<Value> {
        let mut page = if args["cursor"].is_string() {
            self.page(vec![], args, json!({}), run).await?
        } else {
            let (workflow, mut context) = self.tool_workflow(args, run).await?;
            let source = run.or_else(|| context["runId"].as_str());
            let diagnostics = self.definition_diagnostics(&workflow, source).await?;
            let doc = Document::read(&workflow.name, &workflow.schema)?;
            let filtered = args.get("nodeIds").is_some() || args.get("scopeId").is_some();
            let ids: Vec<String> = if let Some(a) = args["nodeIds"].as_array() {
                a.iter()
                    .filter_map(Value::as_str)
                    .map(str::to_owned)
                    .collect()
            } else if let Some(scope) = args["scopeId"].as_str() {
                doc.scope(scope)?;
                doc.ids(scope)
            } else {
                vec![]
            };
            for id in &ids {
                doc.node(id)
                    .map_err(|_| failure("NODE_NOT_FOUND", format!("Node not found: {id}")))?;
            }
            let count = diagnostics.len();
            let items = diagnostics
                .into_iter()
                .filter(|d| {
                    !filtered
                        || d["nodeId"].is_null()
                        || (d["workflowId"] == workflow.id
                            && ids.iter().any(|id| d["nodeId"] == *id))
                })
                .collect();
            context["validation"] = json!({"scope":if filtered{"local"}else{"full"},"executable":if filtered{Value::Null}else{json!(count==0)},"fullErrorCount":count,"modelAvailabilityBasis":if source.is_some(){"frozen_bindings"}else{"configuration"}});
            self.page(items, args, context, run).await?
        };
        let summary = page["context"]["validation"]
            .as_object()
            .cloned()
            .unwrap_or_default();
        for (key, value) in summary {
            page["data"][&key] = value;
        }
        Ok(page)
    }
}
