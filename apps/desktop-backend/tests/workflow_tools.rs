use flowgram_desktop_backend::{store::Store, tools};
use serde_json::{Value, json};
async fn setup() -> (tempfile::TempDir, Store, String) {
    let d = tempfile::tempdir().unwrap();
    let s = Store::open(d.path()).await.unwrap();
    let p = s.projects().await.unwrap()[0].id.clone();
    (d, s, p)
}
async fn call(s: &Store, p: &str, name: &str, args: Value) -> Value {
    s.tool(p, None, name, args).await.unwrap()
}
#[test]
fn all_twenty_three_contracts_and_mcp_pages_are_valid() {
    let defs = tools::definitions();
    assert_eq!(defs.as_array().unwrap().len(), 23);
    for t in defs.as_array().unwrap() {
        jsonschema::validator_for(&t["parameters"]).unwrap();
        assert!(!matches!(
            t["name"].as_str().unwrap(),
            "save_workflow" | "inspect_workflow" | "get_run" | "list_node_types"
        ));
    }
    let first = tools::mcp_list(None).unwrap();
    let second = tools::mcp_list(first["nextCursor"].as_str()).unwrap();
    assert_eq!(
        first["tools"].as_array().unwrap().len() + second["tools"].as_array().unwrap().len(),
        23
    );
    for t in first["tools"]
        .as_array()
        .unwrap()
        .iter()
        .chain(second["tools"].as_array().unwrap())
    {
        jsonschema::validator_for(&t["inputSchema"]).unwrap();
    }
    assert!(
        tools::visible(&Default::default(), true)
            .as_array()
            .unwrap()
            .iter()
            .all(|t| tools::readonly(t["name"].as_str().unwrap()))
    );
    assert_eq!(
        tools::visible(&Default::default(), false)
            .as_array()
            .unwrap()
            .len(),
        8
    );
}
#[tokio::test]
async fn creation_and_atomic_edit_have_small_receipts_without_schema_escape_hatches() {
    let (_d, s, p) = setup().await;
    let c = call(
        &s,
        &p,
        "create_workflow",
        json!({"name":"Novel","mutationId":"create"}),
    )
    .await;
    let id = c["context"]["workflowId"].as_str().unwrap();
    let retry = call(
        &s,
        &p,
        "create_workflow",
        json!({"name":"Novel","mutationId":"create"}),
    )
    .await;
    assert_eq!(retry["data"], c["data"]);
    assert!(
        s.tool(
            &p,
            None,
            "create_workflow",
            json!({"name":"Bad","schema":{}})
        )
        .await
        .is_err()
    );
    let r=call(&s,&p,"edit_workflow",json!({"workflowId":id,"expectedRevision":1,"mutationId":"build","operations":[{"op":"insert_node","nodeId":"writer","nodeType":"llm","scopeId":"root","edge":{"sourceNodeID":"start","targetNodeID":"end"},"fields":{"/inputsValues/prompt":{"type":"constant","content":"Write a story."}}}]})).await;
    assert_eq!(r["data"]["createdNodes"], json!(["writer"]));
    assert!(r.get("schema").is_none());
    let list = call(&s, &p, "list_workflows", json!({})).await;
    assert_eq!(list["data"]["items"][0]["nodeCount"], 3);
    assert!(!list.to_string().contains("Write a story"));
    let summary = call(&s, &p, "read_workflow", json!({"workflowId":id})).await;
    assert_eq!(summary["data"]["nodeCount"], 3);
    assert!(summary["data"].get("nodes").is_none());
}
#[tokio::test]
async fn node_contracts_strip_editor_metadata_and_discovery_is_scoped() {
    let (_d, s, p) = setup().await;
    let r = call(
        &s,
        &p,
        "describe_node_type",
        json!({"nodeTypes":["http","loop"]}),
    )
    .await;
    assert_eq!(r["data"]["items"].as_array().unwrap().len(), 2);
    assert!(!r.to_string().contains("\"editor\""));
    assert!(r["data"]["items"][0]["contractHash"].is_string());
    let search = call(&s, &p, "search_tools", json!({"query":"run_workflow"})).await;
    assert!(
        search["data"]["items"]
            .as_array()
            .unwrap()
            .iter()
            .any(|i| i["name"] == "run_workflow")
    );
}
#[tokio::test]
async fn reads_are_snapshot_bound_and_long_text_pages_are_unicode_safe() {
    let (_d, s, p) = setup().await;
    let c = call(
        &s,
        &p,
        "create_workflow",
        json!({"name":"Book","mutationId":"create"}),
    )
    .await;
    let id = c["context"]["workflowId"].as_str().unwrap();
    call(&s,&p,"edit_workflow",json!({"workflowId":id,"expectedRevision":1,"mutationId":"title","operations":[{"op":"update_node","nodeId":"start","set":{"/description":"🧭你好\n".repeat(3000)}}]})).await;
    let fields = call(
        &s,
        &p,
        "read_workflow",
        json!({"workflowId":id,"view":"fields","nodeIds":["start"],"paths":["/description"]}),
    )
    .await;
    let key = fields["data"]["items"][0]["fields"]["/description"]["valueRef"]["resultId"]
        .as_str()
        .unwrap();
    let mut cursor = Value::Null;
    let mut text = String::new();
    loop {
        let mut a = json!({"resultId":key,"limit":37});
        if cursor.is_string() {
            a["cursor"] = cursor;
        }
        let page = call(&s, &p, "read_tool_result", a).await;
        text.push_str(page["data"]["content"].as_str().unwrap());
        cursor = page["data"]["nextCursor"].clone();
        if cursor.is_null() {
            break;
        }
    }
    assert_eq!(text, "🧭你好\n".repeat(3000));
    let first = call(
        &s,
        &p,
        "read_workflow",
        json!({"workflowId":id,"view":"outline","limit":1}),
    )
    .await;
    call(&s,&p,"edit_workflow",json!({"workflowId":id,"expectedRevision":2,"mutationId":"rename","operations":[{"op":"rename_workflow","name":"Later"}]})).await;
    let second = call(
        &s,
        &p,
        "read_workflow",
        json!({"workflowId":id,"view":"outline","limit":1,"cursor":first["data"]["nextCursor"]}),
    )
    .await;
    assert_eq!(first["context"]["revision"], second["context"]["revision"]);
    let snap = call(
        &s,
        &p,
        "read_workflow",
        json!({"workflowId":id,"snapshotId":fields["context"]["snapshotId"]}),
    )
    .await;
    assert_eq!(snap["data"]["name"], "Book");
    assert!(
        s.tool(&p, None, "read_tool_result", json!({"resultId":"missing"}))
            .await
            .is_err()
    );
}
#[tokio::test]
async fn retries_do_not_execute_runs_twice_and_historical_reads_use_frozen_definitions() {
    let (_d, s, p) = setup().await;
    let c = call(
        &s,
        &p,
        "create_workflow",
        json!({"name":"Before","mutationId":"create"}),
    )
    .await;
    let id = c["context"]["workflowId"].as_str().unwrap();
    let args =
        json!({"workflowId":id,"expectedRevision":1,"mutationId":"run","inputs":{"value":1}});
    let r = call(&s, &p, "run_workflow", args.clone()).await;
    let run = r["data"]["runId"].as_str().unwrap();
    call(&s,&p,"edit_workflow",json!({"workflowId":id,"expectedRevision":1,"mutationId":"rename","operations":[{"op":"rename_workflow","name":"After"}]})).await;
    let retry = call(&s, &p, "run_workflow", args).await;
    assert_eq!(retry["data"]["runId"], run);
    assert_eq!(s.runs().await.unwrap().len(), 1);
    let frozen = call(
        &s,
        &p,
        "read_workflow",
        json!({"workflowId":id,"source":{"runId":run}}),
    )
    .await;
    assert_eq!(frozen["data"]["name"], "Before");
    let runtime = s
        .published_agent_tool(run, "read_workflow", json!({"workflowId":id}))
        .await
        .unwrap();
    assert_eq!(runtime["data"]["name"], "Before");
    assert!(
        s.published_agent_tool(run, "edit_workflow", json!({}))
            .await
            .is_err()
    );
    let other = call(
        &s,
        &p,
        "create_workflow",
        json!({"name":"Private","mutationId":"private"}),
    )
    .await;
    assert!(
        s.published_agent_tool(
            run,
            "read_workflow",
            json!({"workflowId":other["context"]["workflowId"]})
        )
        .await
        .is_err()
    );
    let state = call(&s, &p, "read_run", json!({"runId":run})).await;
    assert!(state["data"].get("events").is_none());
    assert!(state["data"]["outputsRef"]["resultId"].is_string());
}

#[tokio::test]
async fn pending_creation_recovers_without_replacing_later_edits() {
    let (d, s, p) = setup().await;
    let c = call(
        &s,
        &p,
        "create_workflow",
        json!({"name":"Recoverable","mutationId":"create"}),
    )
    .await;
    let id = c["context"]["workflowId"].as_str().unwrap();
    let original = s.workflow(id).await.unwrap();
    sqlx::query("UPDATE tool_run_requests SET state='pending',receipt=? WHERE caller='create:mcp'")
        .bind(json!({"prepared":original}).to_string())
        .execute(&s.db)
        .await
        .unwrap();
    tokio::fs::remove_file(d.path().join("workflows").join(id).join("workflow.json"))
        .await
        .unwrap();
    s.db.close().await;
    let reopened = Store::open(d.path()).await.unwrap();
    assert_eq!(reopened.workflow(id).await.unwrap().name, "Recoverable");
    call(&reopened,&p,"edit_workflow",json!({"workflowId":id,"expectedRevision":1,"mutationId":"rename","operations":[{"op":"rename_workflow","name":"Later"}]})).await;
    sqlx::query("UPDATE tool_run_requests SET state='pending',receipt=? WHERE caller='create:mcp'")
        .bind(json!({"prepared":original}).to_string())
        .execute(&reopened.db)
        .await
        .unwrap();
    let retry = call(
        &reopened,
        &p,
        "create_workflow",
        json!({"name":"Recoverable","mutationId":"create"}),
    )
    .await;
    assert_eq!(retry["context"]["workflowId"], id);
    assert_eq!(reopened.workflow(id).await.unwrap().name, "Later");
}

#[tokio::test]
async fn large_unicode_results_remain_readable_within_the_byte_budget() {
    let (_d, s, p) = setup().await;
    let c = call(
        &s,
        &p,
        "create_workflow",
        json!({"name":"Unicode","mutationId":"create"}),
    )
    .await;
    let id = c["context"]["workflowId"].as_str().unwrap();
    let expected = "🧭\u{0001}中".repeat(4000);
    call(&s,&p,"edit_workflow",json!({"workflowId":id,"expectedRevision":1,"mutationId":"text","operations":[{"op":"update_node","nodeId":"start","set":{"/description":expected}}]})).await;
    let fields = call(
        &s,
        &p,
        "read_workflow",
        json!({"workflowId":id,"view":"fields","nodeIds":["start"],"paths":["/description"]}),
    )
    .await;
    let key = fields["data"]["items"][0]["fields"]["/description"]["valueRef"]["resultId"]
        .as_str()
        .unwrap();
    let mut cursor = Value::Null;
    let mut actual = String::new();
    loop {
        let mut args = json!({"resultId":key,"limit":4000});
        if cursor.is_string() {
            args["cursor"] = cursor;
        }
        let page = call(&s, &p, "read_tool_result", args).await;
        assert!(page.to_string().len() <= 8192);
        let text = page["data"]["content"].as_str().unwrap();
        assert!(!text.is_empty());
        actual.push_str(text);
        cursor = page["data"]["nextCursor"].clone();
        if cursor.is_null() {
            break;
        }
    }
    assert_eq!(actual, expected);
}

#[tokio::test]
async fn node_sections_include_descendant_spans_but_not_other_iterations() {
    let (_d, s, p) = setup().await;
    let c = call(
        &s,
        &p,
        "create_workflow",
        json!({"name":"Trace","mutationId":"create"}),
    )
    .await;
    let run = call(&s,&p,"run_workflow",json!({"workflowId":c["context"]["workflowId"],"expectedRevision":1,"mutationId":"run","inputs":{}})).await;
    let id = run["data"]["runId"].as_str().unwrap();
    for iteration in ["first", "second"] {
        s.emit(
            "node_started",
            id,
            json!({"nodeId":"agent","executionId":iteration,"inputs":{"query":iteration}}),
        )
        .await
        .unwrap();
        s.emit("model_started",id,json!({"nodeId":"agent","executionId":format!("{iteration}-model"),"parentExecutionId":iteration,"inputs":{"prompt":iteration}})).await.unwrap();
        s.emit("tool_started",id,json!({"nodeId":"agent","executionId":format!("{iteration}-tool"),"parentExecutionId":format!("{iteration}-model"),"name":"search","inputs":{"query":iteration}})).await.unwrap();
    }
    let nested = call(
        &s,
        &p,
        "list_run_steps",
        json!({"runId":id,"nodeId":"agent","parentExecutionId":"first-model"}),
    )
    .await;
    assert_eq!(nested["data"]["items"].as_array().unwrap().len(), 1);
    assert_eq!(nested["data"]["items"][0]["id"], "first-tool");
    for (section, expected) in [("model", "first-model"), ("tools", "first-tool")] {
        let r = call(
            &s,
            &p,
            "read_run_step",
            json!({"runId":id,"executionId":"first","section":section}),
        )
        .await;
        let key = &r["data"]["valueRef"]["resultId"];
        let value = call(&s, &p, "read_tool_result", json!({"resultId":key})).await;
        assert_eq!(value["data"]["fields"]["executionId"], expected);
        assert!(!value.to_string().contains("second"));
    }
}

#[tokio::test]
async fn referenced_results_do_not_expire_while_the_project_exists() {
    let (d, s, p) = setup().await;
    let c = call(
        &s,
        &p,
        "create_workflow",
        json!({"name":"Retained","mutationId":"create"}),
    )
    .await;
    let key = &c["resultRef"]["resultId"];
    let db = sqlx::sqlite::SqlitePoolOptions::new()
        .max_connections(1)
        .connect_with(
            sqlx::sqlite::SqliteConnectOptions::new()
                .filename(d.path().join(".flowgram/state.sqlite")),
        )
        .await
        .unwrap();
    sqlx::query("UPDATE tool_values SET created_at='2000-01-01T00:00:00Z'")
        .execute(&db)
        .await
        .unwrap();
    let result = call(&s, &p, "read_tool_result", json!({"resultId":key})).await;
    assert_eq!(result["data"]["fields"]["ok"], true);
    db.close().await;
}

#[tokio::test]
async fn change_history_replays_committed_revisions_across_callers_and_skips_noops() {
    let (_d, s, p) = setup().await;
    let c = call(
        &s,
        &p,
        "create_workflow",
        json!({"name":"Original","mutationId":"create"}),
    )
    .await;
    let id = c["context"]["workflowId"].as_str().unwrap();
    call(&s,&p,"edit_workflow",json!({"workflowId":id,"expectedRevision":1,"mutationId":"rename","operations":[{"op":"rename_workflow","name":"Updated"}]})).await;
    call(&s,&p,"edit_workflow",json!({"workflowId":id,"expectedRevision":2,"mutationId":"noop","operations":[{"op":"rename_workflow","name":"Updated"}]})).await;
    let w = s.workflow(id).await.unwrap();
    s.save_workflow(id, 2, "Manual", w.schema).await.unwrap();
    let first = s.workflow_changes(id, 1, 1).await.unwrap();
    assert_eq!(first["changes"][0]["baseRevision"], 1);
    assert_eq!(first["changes"][0]["revision"], 2);
    assert_eq!(first["hasMore"], true);
    assert!(first["changes"][0].get("schema").is_none());
    let second = s.workflow_changes(id, 2, 20).await.unwrap();
    assert_eq!(second["changes"].as_array().unwrap().len(), 1);
    assert_eq!(second["changes"][0]["revision"], 3);
    assert_eq!(second["changes"][0]["patch"][0]["after"], "Manual");
    assert_eq!(second["hasMore"], false);
    assert_eq!(
        s.workflow_changes(id, 0, 20).await.unwrap()["requiresSnapshot"],
        true
    );
}

#[tokio::test]
async fn contracts_are_sectioned_and_support_content_hash_revalidation() {
    let (_d, s, p) = setup().await;
    let first = call(
        &s,
        &p,
        "describe_node_type",
        json!({"nodeTypes":["http"],"sections":["ports","examples"]}),
    )
    .await;
    let c = &first["data"]["items"][0];
    assert!(c["examples"].is_array());
    assert!(c.get("fields").is_none());
    let second = call(
        &s,
        &p,
        "describe_node_type",
        json!({"nodeTypes":["http"],"knownHashes":{"http":c["contractHash"]}}),
    )
    .await;
    assert_eq!(second["data"]["items"][0]["unchanged"], true);
}

#[tokio::test]
async fn validation_includes_models_dependencies_and_snapshot_bound_diagnostics() {
    let (_d, s, p) = setup().await;
    let c = call(
        &s,
        &p,
        "create_workflow",
        json!({"name":"Validate","mutationId":"create"}),
    )
    .await;
    let id = c["context"]["workflowId"].as_str().unwrap();
    call(&s,&p,"edit_workflow",json!({"workflowId":id,"expectedRevision":1,"mutationId":"build","operations":[{"op":"insert_node","nodeType":"llm","nodeId":"writer","scopeId":"root","edge":{"sourceNodeID":"start","targetNodeID":"end"}}]})).await;
    let first = call(
        &s,
        &p,
        "validate_workflow",
        json!({"workflowId":id,"limit":1}),
    )
    .await;
    assert_eq!(first["data"]["executable"], false);
    assert!(
        first["data"]["items"]
            .as_array()
            .unwrap()
            .iter()
            .any(|d| d["code"] == "MODEL_UNAVAILABLE"
                && d["nodeId"] == "writer"
                && d["path"] == "/nodes/writer/data/model")
    );
    let mut recovery = first["data"]["items"][0]["recovery"].clone();
    let recovery_tool = recovery.as_object_mut().unwrap().remove("tool").unwrap();
    assert!(
        s.tool(&p, None, recovery_tool.as_str().unwrap(), recovery)
            .await
            .is_ok()
    );
    let local = call(
        &s,
        &p,
        "validate_workflow",
        json!({"workflowId":id,"nodeIds":["start"]}),
    )
    .await;
    assert_eq!(local["data"]["executable"], Value::Null);
    assert!(local["data"]["fullErrorCount"].as_u64().unwrap() > 0);
    call(&s,&p,"edit_workflow",json!({"workflowId":id,"expectedRevision":2,"mutationId":"dependency","operations":[{"op":"insert_node","nodeType":"subworkflow","nodeId":"child","scopeId":"root","edge":{"sourceNodeID":"writer","targetNodeID":"end"},"fields":{"/inputsValues/workflowId":{"type":"constant","content":"nonexistent"}}}]})).await;
    let first = call(
        &s,
        &p,
        "validate_workflow",
        json!({"workflowId":id,"limit":1}),
    )
    .await;
    assert_eq!(first["data"]["items"][0]["category"], "dependency");
    let error_count = first["data"]["fullErrorCount"].clone();
    call(&s,&p,"edit_workflow",json!({"workflowId":id,"expectedRevision":3,"mutationId":"rename","operations":[{"op":"rename_workflow","name":"Later"}]})).await;
    let next = call(
        &s,
        &p,
        "validate_workflow",
        json!({"workflowId":id,"limit":1,"cursor":first["data"]["nextCursor"]}),
    )
    .await;
    assert_eq!(next["context"]["revision"], first["context"]["revision"]);
    assert_eq!(next["data"]["fullErrorCount"], error_count);
}

#[test]
fn text_only_mcp_clients_can_read_result_pages_without_reference_loops() {
    let value = json!({"ok":true,"context":{"resultId":"original"},"data":{"kind":"object","fields":{"prompt":"x".repeat(3000)},"hasMore":false},"resultRef":{"resultId":"receipt"}});
    let result = tools::mcp_result(value.clone());
    let text: Value = serde_json::from_str(result["content"][0]["text"].as_str().unwrap()).unwrap();
    assert_eq!(text["data"], value["data"]);
    let result = tools::mcp_result(
        json!({"ok":true,"context":{},"data":{"large":"x".repeat(4000)},"resultRef":{"resultId":"receipt"}}),
    );
    let text: Value = serde_json::from_str(result["content"][0]["text"].as_str().unwrap()).unwrap();
    assert_eq!(text["data"]["valueRef"]["path"], "/data");
    assert_eq!(text["data"]["valueRef"]["resultId"], "receipt");
}

#[tokio::test]
async fn discovery_groups_and_selected_operation_guides_do_not_mix_unrelated_capabilities() {
    let (_d, s, p) = setup().await;
    let tools = call(&s, &p, "search_tools", json!({"group":"execution"})).await;
    let names: Vec<_> = tools["data"]["items"]
        .as_array()
        .unwrap()
        .iter()
        .map(|t| t["name"].as_str().unwrap())
        .collect();
    assert_eq!(names, vec!["run_workflow", "test_node", "cancel_run"]);
    let guide = call(
        &s,
        &p,
        "describe_tool",
        json!({"name":"edit_workflow","operations":["replace_text"]}),
    )
    .await;
    assert_eq!(
        guide["data"]["operationGuides"].as_array().unwrap().len(),
        1
    );
    assert_eq!(guide["data"]["operationGuides"][0]["op"], "replace_text");
    assert!(guide["data"]["operationGuides"][0]["example"].is_object());
}
