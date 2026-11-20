use flowgram_desktop_backend::{
    model::{Run, Workflow},
    runtime,
    store::Store,
};
use serde_json::{Value, json};

fn constant(value: Value) -> Value {
    json!({"type":"constant","content":value})
}
fn schema(target: Option<&str>, version: i64) -> Value {
    if let Some(target) = target {
        json!({"nodes":[{"id":"start","type":"start"},{"id":"pause","type":"delay","data":{"inputsValues":{"durationMs":constant(json!(80))}}},{"id":"child","type":"subworkflow","data":{"inputsValues":{"workflowId":constant(json!(target)),"inputs":constant(json!({}))}}},{"id":"end","type":"end","data":{"inputsValues":{"value":{"type":"ref","content":["child","value"]}}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"pause"},{"sourceNodeID":"pause","targetNodeID":"child"},{"sourceNodeID":"child","targetNodeID":"end"}]})
    } else {
        json!({"nodes":[{"id":"start","type":"start"},{"id":"end","type":"end","data":{"inputsValues":{"value":constant(json!(version))}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"end"}]})
    }
}
async fn finish(store: &Store, run: &Run) -> Run {
    for _ in 0..200 {
        let value = store.run(&run.id).await.unwrap();
        if value.status != "running" {
            return value;
        }
        tokio::time::sleep(std::time::Duration::from_millis(5)).await;
    }
    panic!("Run did not finish")
}
#[tokio::test]
async fn transitive_revisions_are_frozen_and_trace_identifies_workflow_scopes() {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let project = store.projects().await.unwrap().remove(0);
    let leaf = store
        .create_workflow(&project.id, "Leaf", schema(None, 1))
        .await
        .unwrap();
    let child = store
        .create_workflow(&project.id, "Child", schema(Some(&leaf.id), 0))
        .await
        .unwrap();
    let parent = store
        .create_workflow(&project.id, "Parent", schema(Some(&child.id), 0))
        .await
        .unwrap();
    let run = store.start_run(&parent.id, None, json!({})).await.unwrap();
    store
        .save_workflow(&leaf.id, leaf.revision, "Leaf", schema(None, 2))
        .await
        .unwrap();
    let result = finish(&store, &run).await;
    assert_eq!(result.outputs, json!({"value":1}));
    let manifest = store.run_manifest(&run.id).await.unwrap();
    assert_eq!(manifest["workflows"].as_array().unwrap().len(), 3);
    assert_eq!(
        manifest["workflows"]
            .as_array()
            .unwrap()
            .iter()
            .find(|w| w["workflowId"] == leaf.id)
            .unwrap()["revision"],
        1
    );
    let events = store.history(0, Some(&run.id)).await.unwrap();
    let scopes: std::collections::HashSet<_> = events
        .iter()
        .filter(|e| e.kind == "node_finished")
        .map(|e| {
            serde_json::from_str::<Value>(&e.data).unwrap()["workflowId"]
                .clone()
                .to_string()
        })
        .collect();
    assert_eq!(scopes.len(), 3);
    let newer = store.start_run(&parent.id, None, json!({})).await.unwrap();
    assert_eq!(finish(&store, &newer).await.outputs, json!({"value":2}));
}
#[tokio::test]
async fn recursive_and_dynamic_dependencies_fail_before_any_run_is_published() {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let project = store.projects().await.unwrap().remove(0);
    let child = store
        .create_workflow(&project.id, "Child", schema(None, 1))
        .await
        .unwrap();
    let root = store
        .create_workflow(&project.id, "Root", schema(Some(&child.id), 0))
        .await
        .unwrap();
    store
        .save_workflow(&child.id, 1, "Child", schema(Some(&root.id), 0))
        .await
        .unwrap();
    assert!(
        store
            .start_run(&root.id, None, json!({}))
            .await
            .unwrap_err()
            .to_string()
            .contains("Recursive")
    );
    let mut dynamic = schema(Some(&child.id), 0);
    dynamic["nodes"][2]["data"]["inputsValues"]["workflowId"] =
        json!({"type":"ref","content":["start","target"]});
    let dynamic = store
        .create_workflow(&project.id, "Dynamic", dynamic)
        .await
        .unwrap();
    assert!(
        store
            .start_run(&dynamic.id, None, json!({"target":child.id}))
            .await
            .unwrap_err()
            .to_string()
            .contains("constant workflowId")
    );
    assert!(store.runs().await.unwrap().is_empty());
}
#[tokio::test]
async fn all_supported_nodes_have_discoverable_english_contracts() {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let project = store.projects().await.unwrap().remove(0);
    for kind in runtime::supported_types() {
        let contract = store
            .tool(
                &project.id,
                None,
                "describe_node_type",
                json!({"nodeTypes":[kind]}),
            )
            .await
            .unwrap();
        let contract = &contract["data"]["items"][0];
        assert_eq!(contract["nodeType"], kind);
        assert!(contract["inputSchema"].is_object());
        assert!(contract["outputSchema"].is_object());
        assert!(
            !contract
                .to_string()
                .chars()
                .any(|c| ('\u{3400}'..='\u{9fff}').contains(&c))
        );
    }
}
#[tokio::test]
async fn node_test_subworkflow_uses_the_same_pinned_dependency_rules() {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let project = store.projects().await.unwrap().remove(0);
    let leaf = store
        .create_workflow(&project.id, "Leaf", schema(None, 1))
        .await
        .unwrap();
    let child = store
        .create_workflow(&project.id, "Child", schema(Some(&leaf.id), 0))
        .await
        .unwrap();
    let root: Workflow = store
        .create_workflow(&project.id, "Root", schema(Some(&child.id), 0))
        .await
        .unwrap();
    let run = store
        .start_node_test(
            &root.id,
            "child",
            flowgram_desktop_backend::node_test::NodeTestInput {
                revision: 1,
                inputs: json!({"workflowId":child.id,"inputs":{}}),
                bindings: Default::default(),
            },
        )
        .await
        .unwrap();
    store
        .save_workflow(&leaf.id, 1, "Leaf", schema(None, 2))
        .await
        .unwrap();
    assert_eq!(finish(&store, &run).await.outputs, json!({"value":1}));
}

#[tokio::test]
async fn workflow_trace_filtering_happens_before_bounded_pagination() {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    for index in 0..520 {
        store
            .emit(
                "node_finished",
                "run",
                json!({"workflowId":"child","nodeId":"start","executionId":index}),
            )
            .await
            .unwrap();
    }
    store
        .emit(
            "node_finished",
            "run",
            json!({"workflowId":"root","nodeId":"end"}),
        )
        .await
        .unwrap();
    let page = store.run_history("run", 0, Some("root")).await.unwrap();
    assert_eq!(page.len(), 1);
    assert_eq!(
        serde_json::from_str::<Value>(&page[0].data).unwrap()["nodeId"],
        "end"
    );
    let first = store.run_history("run", 0, None).await.unwrap();
    assert_eq!(first.len(), 500);
    let second = store
        .run_history("run", first.last().unwrap().sequence, None)
        .await
        .unwrap();
    assert_eq!(second.len(), 21);
    let states = store.run_node_states("run", "root").await.unwrap();
    assert_eq!(states, json!({"end":"node_finished"}));
}

#[tokio::test]
async fn typed_run_inputs_are_validated_before_execution_and_control_diagnostics_are_english() {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let project = store.projects().await.unwrap().remove(0);
    let mut graph = schema(None, 1);
    graph["nodes"][0]["data"] = json!({"outputs":{"type":"object","properties":{"count":{"type":"integer"}},"required":["count"]}});
    let root = store
        .create_workflow(&project.id, "Typed input", graph)
        .await
        .unwrap();
    assert!(
        store
            .start_run(&root.id, None, json!({"count":"100"}))
            .await
            .unwrap_err()
            .to_string()
            .contains("start schema")
    );
    assert!(store.runs().await.unwrap().is_empty());
    let mut invalid = schema(None, 1);
    invalid["nodes"]
        .as_array_mut()
        .unwrap()
        .push(json!({"id":"start","type":"assign"}));
    for diagnostic in runtime::validate(&invalid).unwrap() {
        assert!(
            !diagnostic
                .chars()
                .any(|c| ('\u{3400}'..='\u{9fff}').contains(&c)),
            "{diagnostic}"
        );
    }
}
