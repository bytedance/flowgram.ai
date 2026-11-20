use crate::{
    error::{Error, Result},
    model::{Graph, Node, Run},
    runtime::{Values, is_supported},
    store::{Store, id, now},
};
use futures_util::future::BoxFuture;
use serde::Deserialize;
use serde_json::{Value, json};
use sqlx::Row;
use tokio_util::sync::CancellationToken;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NodeTestInput {
    pub revision: i64,
    pub inputs: Value,
    #[serde(default)]
    pub bindings: Values,
}
fn find(nodes: &[Node], id: &str) -> Option<Node> {
    nodes.iter().find_map(|node| {
        if node.id == id {
            Some(node.clone())
        } else {
            find(&node.blocks, id)
        }
    })
}
impl Store {
    pub fn start_node_test<'a>(
        &'a self,
        workflow: &'a str,
        node_id: &'a str,
        input: NodeTestInput,
    ) -> BoxFuture<'a, Result<Run>> {
        self.start_node_test_requested(workflow, node_id, input, None)
    }
    pub(crate) fn start_node_test_requested<'a>(
        &'a self,
        workflow: &'a str,
        node_id: &'a str,
        input: NodeTestInput,
        request: Option<(&'a str, &'a str)>,
    ) -> BoxFuture<'a, Result<Run>> {
        Box::pin(async move {
            let _guard = self.workflow_lock.lock().await;
            self.require_unarchived("workflow", workflow).await?;
            let workflow = self.workflow(workflow).await?;
            if workflow.revision != input.revision {
                return Err(Error::Conflict);
            }
            if !input.inputs.is_object() {
                return Err(Error::Invalid(
                    "Node test inputs must be a JSON object".into(),
                ));
            }
            let graph: Graph = serde_json::from_value(workflow.schema.clone())?;
            let node = find(&graph.nodes, node_id)
                .ok_or_else(|| Error::NotFound("Node not found".into()))?;
            if !is_supported(&node.kind) {
                return Err(Error::Invalid("Node executor is unavailable".into()));
            }
            let fixed_fields: &[&str] = match node.kind.as_str() {
                "text" | "array" => &["operation"],
                "http" => &["method"],
                _ => &[],
            };
            for key in fixed_fields {
                let configured = &node.data["inputsValues"][key];
                if configured["type"] == "constant"
                    && input
                        .inputs
                        .get(key)
                        .is_some_and(|value| value != &configured["content"])
                {
                    return Err(Error::Invalid(format!(
                        "Change {key} in node configuration; test inputs cannot override operation settings"
                    )));
                }
            }
            let mut snapshot_root = workflow.clone();
            let mut snapshot_node = node.clone();
            if node.kind == "subworkflow" {
                snapshot_node.data["inputsValues"]["workflowId"] =
                    json!({"type":"constant","content":input.inputs["workflowId"]});
            }
            snapshot_root.schema = json!({"nodes":[snapshot_node],"edges":[]});
            let dependencies = self.capture_workflows(&snapshot_root).await?;
            let run = Run {
                id: id(),
                workflow_id: workflow.id.clone(),
                session_id: None,
                status: "running".into(),
                inputs: input.inputs.clone(),
                outputs: json!({}),
                error: None,
                revision: workflow.revision,
                created_at: now(),
                test_node_id: Some(node.id.clone()),
            };
            let mut tx = self.db.begin().await?;
            sqlx::query("INSERT INTO runs VALUES(?,?,?,?,?,?,?,?,?)")
                .bind(&run.id)
                .bind(&run.workflow_id)
                .bind(&run.session_id)
                .bind(&run.status)
                .bind(run.inputs.to_string())
                .bind("{}")
                .bind(Option::<String>::None)
                .bind(run.revision)
                .bind(&run.created_at)
                .execute(&mut *tx)
                .await?;
            sqlx::query("INSERT INTO node_tests VALUES(?,?,?,?)")
                .bind(&run.id)
                .bind(&node.id)
                .bind(serde_json::to_string(&node)?)
                .bind(serde_json::to_string(&input.bindings)?)
                .execute(&mut *tx)
                .await?;
            self.pin_models(&mut tx, &run.id, &dependencies, None)
                .await?;
            // Execution is scoped to the selected node, but inspection retains
            // the complete source canvas, including untested surrounding nodes.
            sqlx::query("INSERT INTO run_definitions VALUES(?,?)")
                .bind(&run.id)
                .bind(workflow.schema.to_string())
                .execute(&mut *tx)
                .await?;
            let snapshots: Vec<_> = dependencies
                .into_iter()
                .map(|entry| {
                    if entry.id == workflow.id {
                        workflow.clone()
                    } else {
                        entry
                    }
                })
                .collect();
            crate::run_snapshot::persist(&mut tx, &run.id, &snapshots).await?;
            crate::tools::persist_run_request(&mut tx, request, &run).await?;
            tx.commit().await?;
            let token = CancellationToken::new();
            self.active
                .lock()
                .await
                .insert(run.id.clone(), token.clone());
            self.record_run_start(&run, &workflow.schema).await?;
            let store = self.clone();
            let run_id = run.id.clone();
            let workflow_id = run.workflow_id.clone();
            tokio::spawn(async move {
                let execution_id = id();
                let root =
                    crate::control_runtime::ExecutionContext::root(0).with_workflow(workflow_id);
                let _ = store
                    .emit(
                        "node_started",
                        &run_id,
                        root.trace(json!({"nodeId":node.id,"executionId":execution_id,"name":node.data["title"],"inputs":input.inputs})),
                    )
                    .await;
                let context = root.with_parent(execution_id.clone());
                let result = store
                    .execute_scoped_node(
                        &node,
                        input.inputs,
                        &input.bindings,
                        &run_id,
                        &token,
                        &context,
                    )
                    .await;
                let (status, output, error) = match result {
                    Ok((output, branch)) => {
                        let _ = store.emit("node_finished", &run_id, root.trace(json!({"nodeId":node.id,"executionId":execution_id,"outputs":output,"branch":branch}))).await;
                        ("succeeded", output, None)
                    }
                    Err(error) => {
                        let _ = store.cancel_scope(&run_id, &context, "parent_failed").await;
                        let status = if matches!(error, Error::Cancelled) {
                            "canceled"
                        } else {
                            "failed"
                        };
                        let message = error.to_string();
                        let _ = store
                        .emit(
                            if status=="canceled" {"node_canceled"} else {"node_failed"},
                            &run_id,
                            root.trace(json!({"nodeId":node.id,"executionId":execution_id,"error":message})),
                        )
                        .await;
                        (status, json!({}), Some(message))
                    }
                };
                let _ = sqlx::query("UPDATE runs SET status=?,outputs=?,error=? WHERE id=?")
                    .bind(status)
                    .bind(output.to_string())
                    .bind(&error)
                    .bind(&run_id)
                    .execute(&store.db)
                    .await;
                let _ = store
                    .emit(
                        "run_finished",
                        &run_id,
                        json!({"status":status,"outputs":output,"error":error}),
                    )
                    .await;
                store.active.lock().await.remove(&run_id);
            });
            Ok(run)
        })
    }
    pub async fn node_test_definition(&self, run_id: &str) -> Result<Option<Value>> {
        let row = sqlx::query("SELECT node_id,definition,bindings FROM node_tests WHERE run_id=?")
            .bind(run_id)
            .fetch_optional(&self.db)
            .await?;
        row.map(|row| -> Result<Value> {
            Ok(json!({"nodeId":row.get::<String,_>("node_id"),"node":serde_json::from_str::<Value>(row.get("definition"))?,"bindings":serde_json::from_str::<Value>(row.get("bindings"))?}))
        }).transpose()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    async fn settled(store: &Store, id: &str) -> Run {
        for _ in 0..100 {
            let run = store.run(id).await.unwrap();
            if run.status != "running" {
                return run;
            }
            tokio::time::sleep(std::time::Duration::from_millis(5)).await;
        }
        panic!("test run did not finish")
    }
    #[tokio::test]
    async fn executes_only_selected_node_and_freezes_its_definition() {
        let dir = tempfile::tempdir().unwrap();
        let store = Store::open(dir.path()).await.unwrap();
        let project = store.projects().await.unwrap().remove(0);
        let schema = json!({"nodes":[{"id":"start","type":"start"},{"id":"danger","type":"http","data":{"inputsValues":{}}},{"id":"trim","type":"text","data":{"inputsValues":{}}},{"id":"end","type":"end"}],"edges":[]});
        let workflow = store
            .create_workflow(&project.id, "Node test", schema)
            .await
            .unwrap();
        let run = store
            .start_node_test(
                &workflow.id,
                "trim",
                NodeTestInput {
                    revision: 1,
                    inputs: json!({"text":"  hello  ","operation":"trim"}),
                    bindings: Values::new(),
                },
            )
            .await
            .unwrap();
        let result = settled(&store, &run.id).await;
        assert_eq!(result.outputs, json!({"result":"hello"}));
        assert_eq!(result.test_node_id.as_deref(), Some("trim"));
        assert_eq!(
            store
                .history(0, Some(&run.id))
                .await
                .unwrap()
                .iter()
                .filter(|e| e.kind == "node_started")
                .count(),
            1
        );
        assert!(store.node_test_definition(&run.id).await.unwrap().is_some());
        assert_eq!(
            store.run_definition(&run.id).await.unwrap().unwrap()["nodes"]
                .as_array()
                .unwrap()
                .len(),
            4
        );
        assert_eq!(
            store
                .pinned_workflow(&run.id, &workflow.id)
                .await
                .unwrap()
                .schema["nodes"]
                .as_array()
                .unwrap()
                .len(),
            4
        );
        let tool_run = store.tool(&project.id,None,"test_node",json!({"workflowId":workflow.id,"nodeId":"trim","expectedRevision":1,"mutationId":"trim-once","inputs":{"text":" hi ","operation":"trim"}})).await.unwrap();
        assert_eq!(
            settled(&store, tool_run["data"]["runId"].as_str().unwrap())
                .await
                .outputs,
            json!({"result":"hi"})
        );
        let other_directory = tempfile::tempdir().unwrap();
        let other_store = Store::open(other_directory.path()).await.unwrap();
        let other = other_store.projects().await.unwrap().remove(0);
        assert!(
            store
                .tool(
                    &other.id,
                    None,
                    "test_node",
                    json!({"workflowId":workflow.id,"nodeId":"trim","expectedRevision":1,"mutationId":"trim-once","inputs":{}})
                )
                .await
                .is_err()
        );

        assert!(matches!(
            store
                .start_node_test(
                    &workflow.id,
                    "trim",
                    NodeTestInput {
                        revision: 0,
                        inputs: json!({}),
                        bindings: Values::new()
                    }
                )
                .await,
            Err(Error::Conflict)
        ));
    }
    #[tokio::test]
    async fn test_and_workflow_use_same_timeout_and_cancel_semantics() {
        let dir = tempfile::tempdir().unwrap();
        let store = Store::open(dir.path()).await.unwrap();
        let project = store.projects().await.unwrap().remove(0);
        let workflow = store.create_workflow(&project.id,"Delay",json!({"nodes":[{"id":"wait","type":"delay","data":{"runtime":{"timeoutMs":10}}}],"edges":[]})).await.unwrap();
        let run = store
            .start_node_test(
                &workflow.id,
                "wait",
                NodeTestInput {
                    revision: 1,
                    inputs: json!({"durationMs":2000}),
                    bindings: Values::new(),
                },
            )
            .await
            .unwrap();
        assert_eq!(settled(&store, &run.id).await.status, "failed");
        let workflow = store
            .save_workflow(
                &workflow.id,
                1,
                "Delay",
                json!({"nodes":[{"id":"start","type":"start","data":{}},{"id":"wait","type":"delay","data":{}},{"id":"end","type":"end","data":{"inputsValues":{}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"wait"},{"sourceNodeID":"wait","targetNodeID":"end"}]}),
            )
            .await
            .unwrap();
        let run = store
            .start_node_test(
                &workflow.id,
                "wait",
                NodeTestInput {
                    revision: 2,
                    inputs: json!({"durationMs":2000}),
                    bindings: Values::new(),
                },
            )
            .await
            .unwrap();
        store.active.lock().await.get(&run.id).unwrap().cancel();
        assert_eq!(settled(&store, &run.id).await.status, "canceled");
    }
}
