use flowgram_desktop_backend::{
    store::Store,
    workflow_edit::graph::{Document, hash},
};
use serde_json::{Value, json};
async fn setup() -> (tempfile::TempDir, Store, String) {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let project = store.projects().await.unwrap()[0].id.clone();
    (dir, store, project)
}
fn schema() -> Value {
    json!({"extension":{"keep":true},"nodes":[{"id":"start","type":"start","data":{"outputs":{"type":"object","properties":{}}},"meta":{"position":{"x":10,"y":20}}},{"id":"writer","type":"llm","data":{"title":"Writer","extension":{"keep":42},"inputsValues":{"prompt":{"type":"constant","content":"Keep this. Replace this. Keep that."}}},"meta":{"position":{"x":400,"y":20},"extension":"preserved"}},{"id":"end","type":"end","data":{"inputsValues":{}},"meta":{"position":{"x":800,"y":20}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"writer","extension":"preserved"},{"sourceNodeID":"writer","targetNodeID":"end"}]})
}
async fn edit(store: &Store, id: &str, revision: i64, mutation: &str, ops: Value) -> Value {
    store
        .edit_workflow(
            id,
            "test",
            &json!({"expectedRevision":revision,"mutationId":mutation,"operations":ops}),
        )
        .await
        .unwrap()
}
#[tokio::test]
async fn patch_text_preserves_extensions_positions_and_is_idempotent() {
    let (_d, s, p) = setup().await;
    let w = s.create_workflow(&p, "Book", schema()).await.unwrap();
    let args = json!({"expectedRevision":1,"mutationId":"one","operations":[{"op":"replace_text","nodeId":"writer","path":"/inputsValues/prompt/content","edits":[{"oldText":"Replace this.","newText":"Replaced."}]}]});
    let receipt = s.edit_workflow(&w.id, "test", &args).await.unwrap();
    assert_eq!(receipt["context"]["revision"], 2);
    let current = s.workflow(&w.id).await.unwrap();
    assert_eq!(
        current.schema["nodes"][1]["meta"],
        w.schema["nodes"][1]["meta"]
    );
    assert_eq!(
        current.schema["nodes"][1]["data"]["extension"],
        json!({"keep":42})
    );
    assert_eq!(current.schema["edges"][0]["extension"], "preserved");
    edit(
        &s,
        &w.id,
        2,
        "two",
        json!([{"op":"rename_workflow","name":"Another"}]),
    )
    .await;
    assert_eq!(
        s.edit_workflow(&w.id, "test", &args).await.unwrap(),
        receipt
    );
    let mut different = args;
    different["expectedRevision"] = json!(3);
    assert!(
        s.edit_workflow(&w.id, "test", &different)
            .await
            .unwrap_err()
            .to_string()
            .contains("different arguments")
    );
}
#[tokio::test]
async fn failed_batch_and_dry_run_never_change_document() {
    let (_d, s, p) = setup().await;
    let w = s.create_workflow(&p, "Book", schema()).await.unwrap();
    let args = json!({"expectedRevision":1,"mutationId":"bad","operations":[{"op":"rename_workflow","name":"Unsaved"},{"op":"replace_text","nodeId":"writer","path":"/inputsValues/prompt/content","edits":[{"oldText":"Keep","newText":"Changed"}]}]});
    let error = s
        .edit_workflow(&w.id, "test", &args)
        .await
        .unwrap_err()
        .tool_value();
    assert_eq!(error["error"]["code"], "AMBIGUOUS_TEXT_MATCH");
    assert_eq!(error["error"]["operationIndex"], 1);
    assert_eq!(s.workflow(&w.id).await.unwrap().name, "Book");
    let mut dry = args;
    dry["operations"] = json!([{"op":"rename_workflow","name":"Preview"}]);
    dry["dryRun"] = json!(true);
    let receipt = s.edit_workflow(&w.id, "test", &dry).await.unwrap();
    assert_eq!(receipt["data"]["dryRun"], true);
    assert_eq!(s.workflow(&w.id).await.unwrap().revision, 1);
}
#[tokio::test]
async fn container_scaffolds_and_static_branch_ports() {
    let (_d, s, p) = setup().await;
    let w = s.create_workflow(&p, "Book", schema()).await.unwrap();
    let r=edit(&s,&w.id,1,"structure",json!([{"op":"add_node","nodeType":"control.repeat","nodeId":"repeat","scopeId":"root","boundaryIds":{"entry":"entry","exit":"exit"}},{"op":"add_node","nodeType":"control.parallel","nodeId":"fork","joinId":"join","scopeId":"repeat"},{"op":"add_branch","nodeId":"fork","branchId":"third","branch":{"label":"Third"}}])).await;
    assert_eq!(r["data"]["createdNodeCount"], 5);
    let current = s.workflow(&w.id).await.unwrap();
    let doc = Document::read(&current.name, &current.schema).unwrap();
    assert_eq!(
        doc.node("fork").unwrap()["data"]["branches"]
            .as_array()
            .unwrap()
            .len(),
        3
    );
    assert_eq!(doc.0["edges"]["repeat"].as_array().unwrap().len(), 4);
    doc.validate().unwrap();
}
#[tokio::test]
async fn rollback_rejects_cycles_cross_scope_and_dangling_references() {
    let (_d, s, p) = setup().await;
    let w = s.create_workflow(&p, "Book", schema()).await.unwrap();
    for ops in [
        json!([{"op":"connect","edge":{"sourceNodeID":"writer","targetNodeID":"writer"}}]),
        json!([{"op":"update_node","nodeId":"end","set":{"/inputsValues/result":{"type":"ref","content":["missing","result"]}}}]),
        json!([{"op":"remove_node","nodeId":"start"}]),
    ] {
        assert!(
            s.edit_workflow(
                &w.id,
                "test",
                &json!({"expectedRevision":1,"mutationId":"bad","operations":ops})
            )
            .await
            .is_err()
        );
        assert_eq!(s.workflow(&w.id).await.unwrap().schema, w.schema);
    }
}
#[tokio::test]
async fn inverse_revert_preserves_nonoverlapping_changes() {
    let (_d, s, p) = setup().await;
    let w = s.create_workflow(&p, "Book", schema()).await.unwrap();
    let r = edit(
        &s,
        &w.id,
        1,
        "title",
        json!([{"op":"update_node","nodeId":"writer","set":{"/title":"Renamed"}}]),
    )
    .await;
    edit(
        &s,
        &w.id,
        2,
        "name",
        json!([{"op":"rename_workflow","name":"New book"}]),
    )
    .await;
    s.edit_workflow(
        &w.id,
        "test",
        &json!({"expectedRevision":3,"mutationId":"undo","revertChangeId":r["data"]["changeId"]}),
    )
    .await
    .unwrap();
    let w = s.workflow(&w.id).await.unwrap();
    assert_eq!(w.name, "New book");
    assert_eq!(w.schema["nodes"][1]["data"]["title"], "Writer");
    edit(
        &s,
        &w.id,
        4,
        "title2",
        json!([{"op":"update_node","nodeId":"writer","set":{"/title":"Later"}}]),
    )
    .await;
    assert!(s.edit_workflow(&w.id,"test",&json!({"expectedRevision":5,"mutationId":"undo-again","revertChangeId":r["data"]["changeId"]})).await.is_err());
}
#[tokio::test]
async fn clone_remaps_references_without_rewriting_constants() {
    let (_d, s, p) = setup().await;
    let w = s.create_workflow(&p, "Book", schema()).await.unwrap();
    let r=edit(&s,&w.id,1,"clone",json!([{"op":"duplicate_subgraph","nodeIds":["writer"],"targetScopeId":"root","idMapping":{"writer":"writer2"}}])).await;
    assert_eq!(
        r["data"]["operationResults"][0]["idMapping"]["writer"],
        "writer2"
    );
    let current = s.workflow(&w.id).await.unwrap();
    let doc = Document::read(&current.name, &current.schema).unwrap();
    assert_eq!(
        doc.node("writer2").unwrap()["data"]["inputsValues"],
        doc.node("writer").unwrap()["data"]["inputsValues"]
    );
}
#[tokio::test]
async fn collections_require_stable_identity_and_preserve_rows() {
    let mut doc = Document::read("Book", &schema()).unwrap();
    doc.0["nodes"]["writer"]["data"]["outputs"] = json!({"required":["a","b"]});
    let row_hash = hash(&json!("a"));
    assert!(doc.apply(&json!({"op":"edit_collection","nodeId":"writer","path":"/outputs/required","changes":[{"action":"remove","index":0}]})).is_err());
    doc.apply(&json!({"op":"edit_collection","nodeId":"writer","path":"/outputs/required","changes":[{"action":"remove","index":0,"expectedItemHash":row_hash}]})).unwrap();
    assert_eq!(
        doc.node("writer").unwrap()["data"]["outputs"]["required"],
        json!(["b"])
    );
}
#[tokio::test]
async fn recovery_finishes_file_and_index_before_accepting_next_edit() {
    let (d, s, p) = setup().await;
    let w = s.create_workflow(&p, "Book", schema()).await.unwrap();
    let receipt = edit(
        &s,
        &w.id,
        1,
        "rename",
        json!([{"op":"rename_workflow","name":"Recovered"}]),
    )
    .await;
    let key = receipt["data"]["changeId"].as_str().unwrap();
    sqlx::query("UPDATE workflow_mutations SET state='pending' WHERE id=?")
        .bind(key)
        .execute(&s.db)
        .await
        .unwrap();
    s.write_workflow_file(&w).await.unwrap();
    s.db.close().await;
    let reopened = Store::open(d.path()).await.unwrap();
    assert_eq!(reopened.workflow(&w.id).await.unwrap().name, "Recovered");
    let count: i64 =
        sqlx::query_scalar("SELECT count(*) FROM workflow_mutations WHERE state='pending'")
            .fetch_one(&reopened.db)
            .await
            .unwrap();
    assert_eq!(count, 0);
}
#[tokio::test]
async fn large_graph_edits_return_small_receipts_and_do_not_relayout() {
    let (_d, s, p) = setup().await;
    let mut graph = schema();
    for i in 0..200 {
        graph["nodes"].as_array_mut().unwrap().push(json!({"id":format!("item_{i}"),"type":"assign","data":{"inputsValues":{"large":{"type":"constant","content":"x".repeat(1000)}}},"meta":{"position":{"x":i*20,"y":300}}}));
    }
    let w = s.create_workflow(&p, "Large", graph.clone()).await.unwrap();
    let r = edit(
        &s,
        &w.id,
        1,
        "small",
        json!([{"op":"update_node","nodeId":"item_103","set":{"/title":"One item"}}]),
    )
    .await;
    assert!(r.to_string().len() < 3000);
    let after = s.workflow(&w.id).await.unwrap();
    for (i, n) in graph["nodes"].as_array().unwrap().iter().enumerate() {
        assert_eq!(after.schema["nodes"][i]["meta"], n["meta"]);
    }
}
