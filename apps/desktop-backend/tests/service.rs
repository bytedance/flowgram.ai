use axum::{
    body::{Body, to_bytes},
    http::{Request, StatusCode},
};
use flowgram_desktop_backend::{
    api,
    model::ModelConfig,
    runtime,
    store::{Store, starter_schema},
};
use serde_json::{Value, json};
use tokio_util::sync::CancellationToken;
use tower::ServiceExt;

async fn call(app: axum::Router, path: &str, body: Value, authorized: bool) -> (StatusCode, Value) {
    let mut request = Request::builder()
        .method("POST")
        .uri(path)
        .header("content-type", "application/json");
    if authorized {
        request = request.header("authorization", "Bearer test-token");
    }
    let response = app
        .oneshot(request.body(Body::from(body.to_string())).unwrap())
        .await
        .unwrap();
    let status = response.status();
    let bytes = to_bytes(response.into_body(), 2_000_000).await.unwrap();
    (
        status,
        serde_json::from_slice(&bytes).unwrap_or(Value::Null),
    )
}
#[tokio::test]
async fn mcp_and_manual_clients_share_durable_project_scoped_workflows() {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let project = store.projects().await.unwrap().remove(0);
    let other_directory = tempfile::tempdir().unwrap();
    let other_store = Store::open(other_directory.path()).await.unwrap();
    let other = other_store.projects().await.unwrap().remove(0);
    let app = api::router(store.clone(), "test-token".into());
    let request = json!({"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"create_workflow","arguments":{"projectId":project.id,"arguments":{"name":"Echo","mutationId":"echo-create"}}}});
    assert_eq!(
        call(app.clone(), "/mcp", request.clone(), false).await.0,
        StatusCode::UNAUTHORIZED
    );
    let (status, result) = call(app.clone(), "/mcp", request, true).await;
    assert_eq!(status, StatusCode::OK);
    let workflow = &result["result"]["structuredContent"];
    let workflow_id = workflow["context"]["workflowId"].as_str().unwrap();
    store
        .save_workflow(workflow_id, 1, "Echo", starter_schema())
        .await
        .unwrap();
    assert!(
        store
            .tool(
                &other.id,
                None,
                "read_workflow",
                json!({"workflowId":workflow_id})
            )
            .await
            .is_err()
    );
    let (_, run) = call(
        app,
        &format!("/api/workflows/{workflow_id}/run"),
        json!({"inputs":{"message":"Rust 执行成功"}}),
        true,
    )
    .await;
    let id = run["id"].as_str().unwrap();
    for _ in 0..50 {
        if store.run(id).await.unwrap().status != "running" {
            break;
        }
        tokio::task::yield_now().await;
        tokio::time::sleep(std::time::Duration::from_millis(5)).await;
    }
    assert_eq!(
        store.run(id).await.unwrap().outputs,
        json!({"message":"Rust 执行成功"})
    );
    let reopened = Store::open(dir.path()).await.unwrap();
    assert_eq!(reopened.workflow(workflow_id).await.unwrap().revision, 2);
    assert_eq!(reopened.run(id).await.unwrap().status, "succeeded");
    assert!(
        reopened
            .history(0, Some(id))
            .await
            .unwrap()
            .iter()
            .any(|e| e.kind == "node_finished")
    );
}
#[test]
fn templates_do_not_interpret_delimiters_from_user_values() {
    let values =
        std::collections::HashMap::from([("start".into(), json!({"text":"{{start.text}}"}))]);
    assert_eq!(
        runtime::resolve(
            &json!({"type":"template","content":"Input: {{start.text}}"}),
            &values
        )
        .unwrap(),
        json!("Input: {{start.text}}")
    );
}
#[tokio::test]
async fn responses_stream_preserves_unicode_split_across_network_chunks() {
    use futures_util::stream;
    let response = json!({"type":"response.completed","response":{"output":[{"type":"message","content":[{"type":"output_text","text":"流程完成 ✓"}]}]}});
    let bytes = format!("data: {response}\n\n").into_bytes();
    let chunks: Vec<Result<Vec<u8>, std::convert::Infallible>> =
        bytes.into_iter().map(|b| Ok(vec![b])).collect();
    let app = axum::Router::new().route(
        "/responses",
        axum::routing::post(move || {
            let chunks = chunks.clone();
            async move { Body::from_stream(stream::iter(chunks)) }
        }),
    );
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
    let address = listener.local_addr().unwrap();
    let server = tokio::spawn(async move { axum::serve(listener, app).await.unwrap() });
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    store
        .set_model(ModelConfig {
            base_url: format!("http://{address}"),
            model: "test-model".into(),
            api_key: String::new(),
        })
        .await
        .unwrap();
    let result = store
        .complete_model(json!([]), &CancellationToken::new())
        .await
        .unwrap();
    assert_eq!(
        flowgram_desktop_backend::agent::output_text(&result),
        "流程完成 ✓"
    );
    server.abort();
}
#[tokio::test]
async fn cancelled_execution_and_restart_are_reported_truthfully() {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let token = CancellationToken::new();
    token.cancel();
    let result = store
        .execute_graph(
            serde_json::from_value(starter_schema()).unwrap(),
            json!({}),
            Default::default(),
            "run",
            &token,
            0,
        )
        .await;
    assert!(matches!(
        result,
        Err(flowgram_desktop_backend::error::Error::Cancelled)
    ));
    let project = store.projects().await.unwrap().remove(0);
    let w = store
        .create_workflow(&project.id, "Echo", starter_schema())
        .await
        .unwrap();
    sqlx::query("INSERT INTO runs VALUES('interrupted',?,NULL,'running','{}','{}',NULL,1,'now')")
        .bind(&w.id)
        .execute(&store.db)
        .await
        .unwrap();
    let reopened = Store::open(dir.path()).await.unwrap();
    assert_eq!(
        reopened.run("interrupted").await.unwrap().status,
        "interrupted"
    );
}
#[tokio::test]
async fn conditional_branches_skip_unselected_nodes_and_require_an_output() {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let schema = json!({"nodes":[{"id":"start","type":"start"},{"id":"condition","type":"condition","data":{"conditions":[{"key":"true","value":{"left":{"type":"ref","content":["start","enabled"]},"right":{"type":"constant","content":true},"operator":"eq"}}]}},{"id":"left","type":"assign","data":{"inputsValues":{"result":{"type":"constant","content":"selected"}}}},{"id":"right","type":"assign","data":{"inputsValues":{"result":{"type":"constant","content":"other"}}}},{"id":"end","type":"end","data":{"inputsValues":{"result":{"type":"ref","content":["left","result"]}}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"condition"},{"sourceNodeID":"condition","targetNodeID":"left","sourcePortID":"true"},{"sourceNodeID":"condition","targetNodeID":"right","sourcePortID":"else"},{"sourceNodeID":"left","targetNodeID":"end"}]});
    assert!(!runtime::validate(&schema).unwrap().is_empty()); // The otherwise path has no output.
    let result = store
        .execute_graph(
            serde_json::from_value(schema.clone()).unwrap(),
            json!({"enabled":true}),
            Default::default(),
            "branch",
            &CancellationToken::new(),
            0,
        )
        .await
        .unwrap();
    assert_eq!(result, json!({"result":"selected"}));
    assert!(
        store
            .history(0, Some("branch"))
            .await
            .unwrap()
            .iter()
            .any(|e| e.kind == "node_skipped" && e.data.contains("right"))
    );
    assert!(
        store
            .execute_graph(
                serde_json::from_value(schema).unwrap(),
                json!({"enabled":false}),
                Default::default(),
                "missing-end",
                &CancellationToken::new(),
                0
            )
            .await
            .is_err()
    );
}

#[tokio::test]
async fn loop_scopes_collect_intermediate_outputs_without_leaking_between_iterations() {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let schema = json!({"nodes":[{"id":"start","type":"start"},{"id":"loop","type":"loop","data":{"loopFor":{"type":"ref","content":["start","names"]},"loopOutputs":{"greetings":{"type":"ref","content":["greet","text"]}}},"blocks":[{"id":"in","type":"block-start"},{"id":"greet","type":"assign","data":{"inputsValues":{"text":{"type":"template","content":"Hello {{loop_locals.item}}"}}}},{"id":"out","type":"block-end"}],"edges":[{"sourceNodeID":"in","targetNodeID":"greet"},{"sourceNodeID":"greet","targetNodeID":"out"}]},{"id":"end","type":"end","data":{"inputsValues":{"greetings":{"type":"ref","content":["loop","greetings"]}}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"loop"},{"sourceNodeID":"loop","targetNodeID":"end"}]});
    assert!(runtime::validate(&schema).unwrap().is_empty());
    let result = store
        .execute_graph(
            serde_json::from_value(schema.clone()).unwrap(),
            json!({"names":["Ada","Lin"]}),
            Default::default(),
            "loop",
            &CancellationToken::new(),
            0,
        )
        .await
        .unwrap();
    assert_eq!(result, json!({"greetings":["Hello Ada","Hello Lin"]}));
    let result = store
        .execute_graph(
            serde_json::from_value(schema).unwrap(),
            json!({"names":[]}),
            Default::default(),
            "empty-loop",
            &CancellationToken::new(),
            0,
        )
        .await
        .unwrap();
    assert_eq!(result, json!({"greetings":[]}));
}

fn pipeline(kind: &str, fields: Value) -> Value {
    json!({"nodes":[{"id":"start","type":"start"},{"id":"process","type":kind,"data":{"inputsValues":fields}},{"id":"end","type":"end","data":{"inputsValues":{"result":{"type":"ref","content":["process","result"]}}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"process"},{"sourceNodeID":"process","targetNodeID":"end"}]})
}
#[tokio::test]
async fn business_data_nodes_handle_real_types_and_invalid_inputs() {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let cases = vec![
        (
            "text",
            json!({"text":{"type":"constant","content":"  FlowGram  "},"operation":{"type":"constant","content":"trim"}}),
            json!("FlowGram"),
        ),
        (
            "json-parse",
            json!({"text":{"type":"constant","content":"{\"name\":\"Ada\"}"}}),
            json!({"name":"Ada"}),
        ),
        (
            "array",
            json!({"items":{"type":"constant","content":[1,2,1,{"a":1},{"a":1}]},"operation":{"type":"constant","content":"unique"}}),
            json!([1,2,{"a":1}]),
        ),
        (
            "array",
            json!({"items":{"type":"constant","content":[]},"operation":{"type":"constant","content":"length"}}),
            json!(0),
        ),
        (
            "template",
            json!({"text":{"type":"template","content":"你好，{{start.name}}！"}}),
            json!("你好，Ada！"),
        ),
    ];
    for (kind, fields, expected) in cases {
        let graph = pipeline(kind, fields);
        assert!(runtime::validate(&graph).unwrap().is_empty());
        let output = store
            .execute_graph(
                serde_json::from_value(graph).unwrap(),
                json!({"name":"Ada"}),
                Default::default(),
                "data",
                &CancellationToken::new(),
                0,
            )
            .await
            .unwrap();
        assert_eq!(output, json!({"result":expected}), "{kind}");
    }
    let graph = pipeline(
        "json-parse",
        json!({"text":{"type":"constant","content":"invalid"}}),
    );
    assert!(
        store
            .execute_graph(
                serde_json::from_value(graph).unwrap(),
                json!({}),
                Default::default(),
                "invalid",
                &CancellationToken::new(),
                0
            )
            .await
            .is_err()
    );
}
#[tokio::test]
async fn delay_is_cancellable_without_waiting_for_the_timer() {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let graph = pipeline(
        "delay",
        json!({"durationMs":{"type":"constant","content":30000}}),
    );
    let token = CancellationToken::new();
    let cancel = token.clone();
    tokio::spawn(async move {
        tokio::time::sleep(std::time::Duration::from_millis(15)).await;
        cancel.cancel();
    });
    let result = tokio::time::timeout(
        std::time::Duration::from_secs(1),
        store.execute_graph(
            serde_json::from_value(graph).unwrap(),
            json!({}),
            Default::default(),
            "delay",
            &token,
            0,
        ),
    )
    .await
    .unwrap();
    assert!(matches!(
        result,
        Err(flowgram_desktop_backend::error::Error::Cancelled)
    ));
}
#[tokio::test]
async fn http_node_sends_json_body_and_headers_to_a_local_business_endpoint() {
    let app = axum::Router::new().route(
        "/echo",
        axum::routing::post(
            |headers: axum::http::HeaderMap, axum::Json(body): axum::Json<Value>| async move {
                assert_eq!(headers["x-business-id"], "test");
                axum::Json(body)
            },
        ),
    );
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
    let address = listener.local_addr().unwrap();
    let server = tokio::spawn(async move { axum::serve(listener, app).await.unwrap() });
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let graph = json!({"nodes":[{"id":"start","type":"start"},{"id":"http","type":"http","data":{"inputsValues":{"url":{"type":"constant","content":format!("http://{address}/echo")},"method":{"type":"constant","content":"POST"},"headers":{"type":"constant","content":{"x-business-id":"test"}},"body":{"type":"ref","content":["start"]}}}},{"id":"end","type":"end","data":{"inputsValues":{"body":{"type":"ref","content":["http","body"]}}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"http"},{"sourceNodeID":"http","targetNodeID":"end"}]});
    let output = store
        .execute_graph(
            serde_json::from_value(graph).unwrap(),
            json!({"customer":"Ada"}),
            Default::default(),
            "http",
            &CancellationToken::new(),
            0,
        )
        .await
        .unwrap();
    assert_eq!(output, json!({"body":{"customer":"Ada"}}));
    server.abort();
}
#[tokio::test]
async fn subworkflows_reuse_inputs_and_enforce_project_boundaries() {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let project = store.projects().await.unwrap().remove(0);
    let other_directory = tempfile::tempdir().unwrap();
    let other_store = Store::open(other_directory.path()).await.unwrap();
    let other = other_store.projects().await.unwrap().remove(0);
    let child = store
        .create_workflow(&project.id, "Child", starter_schema())
        .await
        .unwrap();
    let foreign = other_store
        .create_workflow(&other.id, "Foreign", starter_schema())
        .await
        .unwrap();
    async fn execute(
        store: &Store,
        project: &str,
        target: &str,
    ) -> flowgram_desktop_backend::model::Run {
        let graph = json!({"nodes":[{"id":"start","type":"start"},{"id":"child","type":"subworkflow","data":{"inputsValues":{"workflowId":{"type":"constant","content":target},"inputs":{"type":"ref","content":["start"]}}}},{"id":"end","type":"end","data":{"inputsValues":{"message":{"type":"ref","content":["child","message"]}}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"child"},{"sourceNodeID":"child","targetNodeID":"end"}]});
        let w = store
            .create_workflow(project, "Parent", graph)
            .await
            .unwrap();
        let run = store
            .start_run(&w.id, None, json!({"message":"nested"}))
            .await
            .unwrap();
        for _ in 0..100 {
            let current = store.run(&run.id).await.unwrap();
            if current.status != "running" {
                return current;
            }
            tokio::time::sleep(std::time::Duration::from_millis(5)).await;
        }
        panic!("subworkflow did not finish");
    }
    let result = execute(&store, &project.id, &child.id).await;
    assert_eq!(result.outputs, json!({"message":"nested"}));
    let invalid = store.create_workflow(&project.id, "Invalid dependency", json!({"nodes":[{"id":"start","type":"start"},{"id":"child","type":"subworkflow","data":{"inputsValues":{"workflowId":{"type":"constant","content":foreign.id},"inputs":{"type":"constant","content":{}}}}},{"id":"end","type":"end"}],"edges":[{"sourceNodeID":"start","targetNodeID":"child"},{"sourceNodeID":"child","targetNodeID":"end"}]})).await.unwrap();
    assert!(
        store
            .start_run(&invalid.id, None, json!({}))
            .await
            .unwrap_err()
            .to_string()
            .contains("Workflow not found")
    );
}

#[tokio::test]
async fn agent_node_uses_shared_read_only_tools_and_continues_from_tool_output() {
    use std::sync::{
        Arc,
        atomic::{AtomicUsize, Ordering},
    };
    let count = Arc::new(AtomicUsize::new(0));
    let observed = count.clone();
    let app=axum::Router::new().route("/responses",axum::routing::post(move |axum::Json(body):axum::Json<Value>|{let count=count.clone();async move {
        assert!(body["tools"].as_array().unwrap().iter().all(|tool| !["create_workflow","save_workflow","run_workflow"].contains(&tool["name"].as_str().unwrap())));
        let output=if count.fetch_add(1,Ordering::SeqCst)==0{json!([{"type":"function_call","name":"search_node_types","call_id":"read-types","arguments":"{\"query\":\"json-parse\"}"}])}else{assert!(body["input"].as_array().unwrap().iter().any(|item|item["type"]=="function_call_output" && item["output"].as_str().unwrap_or_default().contains("json-parse")));json!([{"type":"message","content":[{"type":"output_text","text":"检查完成"}]}])};
        format!("data: {}\n\n",json!({"type":"response.completed","response":{"output":output}}))
    }}));
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
    let address = listener.local_addr().unwrap();
    let server = tokio::spawn(async move { axum::serve(listener, app).await.unwrap() });
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    store
        .set_model(ModelConfig {
            base_url: format!("http://{address}"),
            model: "test".into(),
            api_key: String::new(),
        })
        .await
        .unwrap();
    let project = store.projects().await.unwrap().remove(0);
    let graph = pipeline(
        "agent",
        json!({"prompt":{"type":"constant","content":"检查支持的节点"},"maxSteps":{"type":"constant","content":3}}),
    );
    let w = store
        .create_workflow(&project.id, "Agent", graph)
        .await
        .unwrap();
    let run = store.start_run(&w.id, None, json!({})).await.unwrap();
    for _ in 0..100 {
        if store.run(&run.id).await.unwrap().status != "running" {
            break;
        }
        tokio::time::sleep(std::time::Duration::from_millis(5)).await;
    }
    let result = store.run(&run.id).await.unwrap();
    assert_eq!(result.status, "succeeded", "{:?}", result.error);
    assert_eq!(result.outputs, json!({"result":"检查完成"}));
    assert_eq!(observed.load(Ordering::SeqCst), 2);
    assert!(
        store
            .history(0, Some(&run.id))
            .await
            .unwrap()
            .iter()
            .any(|event| event.kind == "tool_finished")
    );
    let history = store.history(0, Some(&run.id)).await.unwrap();
    let model_calls: Vec<_> = history
        .iter()
        .filter(|event| event.kind == "model_started")
        .collect();
    assert_eq!(model_calls.len(), 2);
    let first: Value = serde_json::from_str(&model_calls[0].data).unwrap();
    let second: Value = serde_json::from_str(&model_calls[1].data).unwrap();
    assert_ne!(first["executionId"], second["executionId"]);
    assert_eq!(first["parentExecutionId"], second["parentExecutionId"]);
    assert!(first["inputs"]["input"].is_array());
    assert_eq!(
        history
            .iter()
            .filter(|event| event.kind == "model_finished")
            .count(),
        2
    );
    let tool_start: Value = serde_json::from_str(
        &history
            .iter()
            .find(|event| event.kind == "tool_started")
            .unwrap()
            .data,
    )
    .unwrap();
    assert_eq!(tool_start["parentExecutionId"], first["parentExecutionId"]);
    assert!(!tool_start["callId"].is_null());
    server.abort();
}
