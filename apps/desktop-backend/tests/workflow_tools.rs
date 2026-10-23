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
