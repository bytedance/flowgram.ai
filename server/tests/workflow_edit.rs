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
    for count in [20, 200, 1000] {
        let mut graph = schema();
        for i in 0..count - 3 {
            graph["nodes"].as_array_mut().unwrap().push(json!({"id":format!("item_{i}"),"type":"assign","data":{"inputsValues":{"large":{"type":"constant","content":"x".repeat(1000)}}},"meta":{"position":{"x":i*20,"y":300}}}));
        }
        let w = s.create_workflow(&p, "Large", graph.clone()).await.unwrap();
        let target = format!("item_{}", (count - 3) / 2);
        let request = json!({"workflowId":w.id,"expectedRevision":1,"mutationId":"small","operations":[{"op":"update_node","nodeId":target,"set":{"/title":"One item"}}]});
        let started = std::time::Instant::now();
        let r = s
            .tool(&p, None, "edit_workflow", request.clone())
            .await
            .unwrap();
        let elapsed = started.elapsed().as_millis();
        assert!(r.to_string().len() < 3000);
        let fields = s
            .tool(
                &p,
                None,
                "read_workflow",
                json!({"workflowId":w.id,"view":"fields","nodeIds":[target],"paths":["/title"]}),
            )
            .await
            .unwrap();
        assert_eq!(fields["data"]["items"].as_array().unwrap().len(), 1);
        assert!(fields.to_string().len() < 3000);
        let after = s.workflow(&w.id).await.unwrap();
        for (i, node) in graph["nodes"].as_array().unwrap().iter().enumerate() {
            assert_eq!(after.schema["nodes"][i]["meta"], node["meta"]);
        }
        eprintln!(
            "scale nodes={count} request_bytes={} receipt_bytes={} field_read_bytes={} edit_ms={elapsed}",
            request.to_string().len(),
            r.to_string().len(),
            fields.to_string().len()
        );
    }
}

#[tokio::test]
async fn branch_reordering_collection_updates_and_scope_moves_keep_stable_identity() {
    let (_d, s, p) = setup().await;
    let w = s.create_workflow(&p, "Graph", schema()).await.unwrap();
    edit(&s,&w.id,1,"branches",json!([
        {"op":"add_node","nodeId":"fork","nodeType":"control.parallel","scopeId":"root","joinId":"join"},
        {"op":"add_branch","nodeId":"fork","branchId":"third","branch":{"label":"Third"}},
        {"op":"update_branch","nodeId":"fork","branchId":"third","set":{"/label":"Updated"}},
        {"op":"move_branch","nodeId":"fork","branchId":"third","before":"branch_a"},
        {"op":"remove_branch","nodeId":"fork","branchId":"branch_b"},
        {"op":"add_node","nodeId":"container","nodeType":"control.repeat","scopeId":"root"},
        {"op":"add_node","nodeId":"loose","nodeType":"assign","scopeId":"root","fields":{"/inputsValues/value":{"type":"constant","content":"loose"}}},
        {"op":"move_subgraph","nodeIds":["loose"],"targetScopeId":"container"}
    ])).await;
    let w = s.workflow(&w.id).await.unwrap();
    let doc = Document::read(&w.name, &w.schema).unwrap();
    assert_eq!(
        doc.node("fork").unwrap()["data"]["branches"][0]["id"],
        "third"
    );
    assert_eq!(doc.node("loose").unwrap()["scopeId"], "container");
    let r = edit(
        &s,
        &w.id,
        2,
        "same-scope",
        json!([{"op":"move_subgraph","nodeIds":["writer"],"targetScopeId":"root"}]),
    )
    .await;
    assert_eq!(r["data"]["changed"], false);
    assert_eq!(
        s.workflow(&w.id).await.unwrap().schema["edges"],
        w.schema["edges"]
    );
}
#[tokio::test]
async fn node_type_replacement_preserves_unknown_extensions_and_reconnect_is_exact() {
    let (_d, s, p) = setup().await;
    let w = s.create_workflow(&p, "Graph", schema()).await.unwrap();
    edit(&s,&w.id,1,"replace",json!([
        {"op":"replace_node_type","nodeId":"writer","nodeType":"text","fields":{"/inputsValues/text":{"type":"constant","content":"Hello"}}},
        {"op":"disconnect","scopeId":"root","edge":{"sourceNodeID":"writer","targetNodeID":"end"}},
        {"op":"add_node","nodeId":"step","nodeType":"assign","scopeId":"root"},
        {"op":"reconnect","scopeId":"root","from":{"sourceNodeID":"start","targetNodeID":"writer"},"to":{"sourceNodeID":"start","targetNodeID":"step"}},
        {"op":"connect","scopeId":"root","edge":{"sourceNodeID":"step","targetNodeID":"writer"}},
        {"op":"connect","scopeId":"root","edge":{"sourceNodeID":"writer","targetNodeID":"end"}}
    ])).await;
    let current = s.workflow(&w.id).await.unwrap();
    let d = Document::read(&current.name, &current.schema).unwrap();
    assert_eq!(
        d.node("writer").unwrap()["data"]["extension"],
        json!({"keep":42})
    );
    assert_eq!(
        d.node("writer").unwrap()["meta"],
        w.schema["nodes"][1]["meta"]
    );
    assert_eq!(current.schema["edges"].as_array().unwrap().len(), 3);
}

#[tokio::test]
async fn removing_consumed_outputs_requires_rebinding_and_container_insertion_allocates_its_width()
{
    let (_d, s, p) = setup().await;
    let mut graph = schema();
    graph["nodes"][0]["data"]["outputs"] =
        json!({"type":"object","properties":{"theme":{"type":"string"}}});
    graph["nodes"][1]["data"]["inputsValues"]["prompt"] =
        json!({"type":"ref","content":["start","theme"]});
    let w = s.create_workflow(&p, "Graph", graph).await.unwrap();
    let error=s.edit_workflow(&w.id,"test",&json!({"expectedRevision":1,"mutationId":"remove-output","operations":[{"op":"update_node","nodeId":"start","unset":["/outputs/properties/theme"]}]})).await.unwrap_err().tool_value();
    assert_eq!(error["error"]["code"], "REFERENCED_OUTPUT");
    edit(&s,&w.id,1,"rebind",json!([{"op":"update_node","nodeId":"start","unset":["/outputs/properties/theme"]},{"op":"update_node","nodeId":"writer","set":{"/inputsValues/prompt":{"type":"constant","content":"Write a story."}}}])).await;
    edit(&s,&w.id,2,"insert-loop",json!([{"op":"insert_node","nodeId":"loop","nodeType":"control.repeat","scopeId":"root","edge":{"sourceNodeID":"writer","targetNodeID":"end"}}])).await;
    let w = s.workflow(&w.id).await.unwrap();
    let doc = Document::read(&w.name, &w.schema).unwrap();
    let loop_node = doc.node("loop").unwrap();
    let end = doc.node("end").unwrap();
    assert!(
        end["meta"]["position"]["x"].as_f64().unwrap()
            >= loop_node["meta"]["position"]["x"].as_f64().unwrap() + doc.width("loop").unwrap()
    );
    for child in doc.ids("loop") {
        assert!(
            doc.node(&child).unwrap()["meta"]["position"]["y"]
                .as_f64()
                .unwrap()
                >= 128.
        );
    }
}

#[tokio::test]
async fn undo_collection_edits_preserves_other_rows_and_other_fields_of_the_same_row() {
    let (_d, s, p) = setup().await;
    let mut graph = schema();
    graph["nodes"][1] = json!({"id":"writer","type":"list.sort","data":{"inputsValues":{"items":{"type":"constant","content":[]}},"keys":[{"id":"a","path":"name","direction":"asc","nulls":"last"},{"id":"b","path":"age","direction":"asc","nulls":"last"}]}});
    let w = s.create_workflow(&p, "Collections", graph).await.unwrap();
    let r=edit(&s,&w.id,1,"first",json!([{"op":"edit_collection","nodeId":"writer","path":"/keys","changes":[{"action":"update","key":{"id":"a"},"set":{"/direction":"desc"}}]}])).await;
    edit(&s,&w.id,2,"later",json!([{"op":"edit_collection","nodeId":"writer","path":"/keys","changes":[{"action":"update","key":{"id":"a"},"set":{"/nulls":"first"}},{"action":"update","key":{"id":"b"},"set":{"/direction":"desc"}},{"action":"insert","value":{"id":"c","path":"createdAt","direction":"desc","nulls":"last"}}]}])).await;
    s.edit_workflow(
        &w.id,
        "test",
        &json!({"expectedRevision":3,"mutationId":"undo","revertChangeId":r["data"]["changeId"]}),
    )
    .await
    .unwrap();
    let current = s.workflow(&w.id).await.unwrap();
    let rows = &current.schema["nodes"][1]["data"]["keys"];
    assert_eq!(rows[0]["direction"], "asc");
    assert_eq!(rows[0]["nulls"], "first");
    assert_eq!(rows[1]["direction"], "desc");
    assert_eq!(rows[2]["id"], "c");
    edit(&s,&w.id,4,"overlap",json!([{"op":"edit_collection","nodeId":"writer","path":"/keys","changes":[{"action":"update","key":{"id":"a"},"set":{"/direction":"desc"}}]}])).await;
    // A later rewrite of the exact field is detected, rather than reverting the row wholesale.
    let r=edit(&s,&w.id,5,"remove",json!([{"op":"edit_collection","nodeId":"writer","path":"/keys","changes":[{"action":"remove","key":{"id":"a"}}]}])).await;
    edit(&s,&w.id,6,"reinsert",json!([{"op":"edit_collection","nodeId":"writer","path":"/keys","changes":[{"action":"insert","value":{"id":"a","path":"new","direction":"asc","nulls":"last"}}]}])).await;
    assert!(s.edit_workflow(&w.id,"test",&json!({"expectedRevision":7,"mutationId":"conflicting-undo","revertChangeId":r["data"]["changeId"]})).await.is_err());
}

#[tokio::test]
async fn undo_independent_node_additions_preserves_later_nodes_and_order() {
    let (_d, s, p) = setup().await;
    let w = s.create_workflow(&p, "Graph", schema()).await.unwrap();
    let r = edit(
        &s,
        &w.id,
        1,
        "first",
        json!([{"op":"add_node","nodeId":"first","nodeType":"assign","scopeId":"root"}]),
    )
    .await;
    edit(
        &s,
        &w.id,
        2,
        "second",
        json!([{"op":"add_node","nodeId":"second","nodeType":"assign","scopeId":"root"}]),
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
    assert_eq!(
        w.schema["nodes"]
            .as_array()
            .unwrap()
            .iter()
            .map(|n| n["id"].as_str().unwrap())
            .collect::<Vec<_>>(),
        vec!["start", "writer", "end", "second"]
    );
}

#[tokio::test]
async fn type_replacement_remaps_templates_without_touching_literal_constants() {
    let (_d, s, p) = setup().await;
    let mut graph = schema();
    graph["nodes"][2]["data"]["inputsValues"] = json!({"message":{"type":"template","content":"Body: {{writer.result.text}}"},"literal":{"type":"constant","content":"{{writer.result}}"}});
    let w = s.create_workflow(&p, "Bindings", graph).await.unwrap();
    edit(&s,&w.id,1,"replace",json!([{"op":"replace_node_type","nodeId":"writer","nodeType":"http","outputMapping":{"result":"body"},"fields":{"/inputsValues/url":{"type":"constant","content":"https://example.com"}}}])).await;
    let w = s.workflow(&w.id).await.unwrap();
    assert_eq!(
        w.schema["nodes"][2]["data"]["inputsValues"]["message"]["content"],
        "Body: {{writer.body.text}}"
    );
    assert_eq!(
        w.schema["nodes"][2]["data"]["inputsValues"]["literal"]["content"],
        "{{writer.result}}"
    );
}
#[tokio::test]
async fn whole_input_updates_cannot_bypass_declared_fields_and_branch_removal_cleans_mappings() {
    let (_d, s, p) = setup().await;
    let w = s.create_workflow(&p, "Contracts", schema()).await.unwrap();
    assert!(s.edit_workflow(&w.id,"test",&json!({"expectedRevision":1,"mutationId":"bypass","operations":[{"op":"update_node","nodeId":"writer","set":{"/inputsValues":{"undeclared":{"type":"constant","content":true}}}}]})).await.is_err());
    edit(&s,&w.id,1,"fork",json!([{"op":"add_node","nodeId":"fork","nodeType":"control.parallel","scopeId":"root","joinId":"join"},{"op":"update_node","nodeId":"join","set":{"/mappings":{"branch_b":{"note":{"type":"constant","content":"remove"}}}}},{"op":"remove_branch","nodeId":"fork","branchId":"branch_b"}])).await;
    let w = s.workflow(&w.id).await.unwrap();
    let doc = Document::read(&w.name, &w.schema).unwrap();
    assert!(
        doc.node("join").unwrap()["data"]["mappings"]
            .get("branch_b")
            .is_none()
    );
}
#[test]
fn collection_updates_can_unset_optional_fields_without_replacing_rows() {
    let mut doc = Document::read("Graph", &schema()).unwrap();
    doc.0["nodes"]["writer"]["data"]["outputs"] =
        json!({"anyOf":[{"id":"a","type":"string","description":"remove","extension":42}]});
    doc.apply(&json!({"op":"edit_collection","nodeId":"writer","path":"/outputs/anyOf","changes":[{"action":"update","key":{"id":"a"},"unset":["/description"]}]})).unwrap();
    assert_eq!(
        doc.node("writer").unwrap()["data"]["outputs"]["anyOf"][0],
        json!({"id":"a","type":"string","extension":42})
    );
}
