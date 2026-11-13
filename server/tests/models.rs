use axum::{
    Json, Router,
    body::Body,
    http::{HeaderMap, Request},
    response::Response,
    routing::{get, post},
};
use flowgram_desktop_backend::{
    conversation::SendInput,
    models::*,
    registry::{self, Registry},
    services::*,
    store::Store,
};
use http_body_util::BodyExt;
use serde_json::{Value, json};
use std::{
    sync::{Arc, Mutex},
    time::Duration,
};
use tower::ServiceExt;

async fn call(router: &Router, method: &str, path: &str, body: Value) -> (u16, Value) {
    let response = router
        .clone()
        .oneshot(
            Request::builder()
                .method(method)
                .uri(path)
                .header("authorization", "Bearer test")
                .header("content-type", "application/json")
                .body(Body::from(body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    (
        response.status().as_u16(),
        serde_json::from_slice(&response.into_body().collect().await.unwrap().to_bytes())
            .unwrap_or_default(),
    )
}
async fn mock(app: Router) -> (String, tokio::task::JoinHandle<()>) {
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
    let url = format!("http://{}", listener.local_addr().unwrap());
    (
        url,
        tokio::spawn(async move { axum::serve(listener, app).await.unwrap() }),
    )
}
fn stream(events: Vec<Value>) -> Response {
    Response::builder()
        .header("content-type", "text/event-stream")
        .body(Body::from(
            events
                .iter()
                .map(|e| format!("data: {e}\n\n"))
                .collect::<String>(),
        ))
        .unwrap()
}
fn text(text: &str) -> Value {
    json!({"type":"message","role":"assistant","content":[{"type":"output_text","text":text}]})
}
fn response(output: Value) -> Response {
    stream(vec![
        json!({"type":"response.completed","response":{"output":output}}),
    ])
}
async fn connection(registry: &Registry, url: &str, protocol: Protocol) -> Connection {
    registry
        .deployment_settings
        .save_model_connection(Connection {
            id: String::new(),
            name: "Test connection".into(),
            provider: "custom".into(),
            protocol,
            base_url: url.into(),
            credential_id: None,
            enabled: true,
            timeout_ms: 5000,
            revision: 0,
            updated_at: String::new(),
        })
        .await
        .unwrap()
}
async fn entry(registry: &Registry, connection: &Connection, id: &str, known: bool) -> Entry {
    registry
        .deployment_settings
        .save_model_entry(Entry {
            id: String::new(),
            connection_id: connection.id.clone(),
            name: id.into(),
            model_id: id.into(),
            enabled: true,
            capabilities: Capabilities {
                streaming: known.then_some(true),
                tools: known.then_some(true),
                temperature: Some(true),
                ..Default::default()
            },
            context_window: None,
            parameters: Default::default(),
            revision: 0,
            updated_at: String::new(),
        })
        .await
        .unwrap()
}
async fn finished(store: &Store, run: &str) -> Value {
    tokio::time::timeout(Duration::from_secs(5), async {
        loop {
            let r = store.run(run).await.unwrap();
            if r.status != "running" {
                return serde_json::to_value(r).unwrap();
            }
            tokio::time::sleep(Duration::from_millis(5)).await;
        }
    })
    .await
    .unwrap()
}
#[tokio::test]
async fn discovery_is_not_verification_and_all_protocols_complete_tool_round_trips() {
    for protocol in [
        Protocol::Responses,
        Protocol::ChatCompletions,
        Protocol::Anthropic,
    ] {
        let app=Router::new().route("/models",get(||async{Json(json!({"data":[{"id":"unknown-model","display_name":"Discovered"}]}))})).route("/{*path}",post(move |headers:HeaderMap,Json(body):Json<Value>|async move {
   if protocol==Protocol::Anthropic {assert_eq!(headers["anthropic-version"],"2023-06-01");}
   assert_eq!(body["stream"],true);
   let first=if protocol==Protocol::Responses {body["input"][0]["content"].as_str().unwrap()}else{body["messages"][0]["content"].as_str().unwrap()};
   let nonce=first.split_whitespace().find_map(|part|uuid::Uuid::parse_str(part.trim_matches(|c:char|!c.is_ascii_hexdigit() && c!='-')).ok()).unwrap().to_string();
   let tool= !body["tool_choice"].is_null();
   match protocol {
    Protocol::Responses=>response(if tool{json!([{"type":"function_call","id":"provider","call_id":"echo","name":"flowgram_echo","arguments":json!({"value":nonce}).to_string()}])}else{json!([text(&nonce)])}),
    Protocol::ChatCompletions=>{
     if !tool&&body["messages"].as_array().unwrap().len()>1 {assert!(body["messages"].as_array().unwrap().iter().any(|m|m["role"]=="tool"&&m["tool_call_id"]=="echo"));}
     if tool{stream(vec![json!({"choices":[{"delta":{"tool_calls":[{"index":0,"id":"echo","type":"function","function":{"name":"flowgram_echo","arguments":"{\"value\":\""}}]},"finish_reason":null}]}),json!({"choices":[{"delta":{"tool_calls":[{"index":0,"function":{"arguments":format!("{nonce}\"}}")}}]},"finish_reason":"tool_calls"}]})])} else {stream(vec![json!({"choices":[{"delta":{"content":nonce},"finish_reason":"stop"}]})])}
    },
    Protocol::Anthropic=>{
     if !tool&&body["messages"].as_array().unwrap().len()>1 {assert!(body["messages"].as_array().unwrap().iter().any(|m|m["content"].as_array().is_some_and(|c|c.iter().any(|v|v["type"]=="tool_result"&&v["tool_use_id"]=="echo"))));}
     let mut events=if tool {vec![json!({"type":"content_block_start","index":0,"content_block":{"type":"tool_use","id":"echo","name":"flowgram_echo","input":{}}}),json!({"type":"content_block_delta","index":0,"delta":{"type":"input_json_delta","partial_json":json!({"value":nonce}).to_string()}})]} else {vec![json!({"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":nonce}})]};
     events.push(json!({"type":"message_delta","delta":{"stop_reason":if tool{"tool_use"}else{"end_turn"}}}));events.push(json!({"type":"message_stop"}));stream(events)
    }
   }
  }));
        let (url, server) = mock(app).await;
        let dir = tempfile::tempdir().unwrap();
        let registry = Registry::open(dir.path()).await.unwrap();
        registry.create("Test", None).await.unwrap();
        let router = registry::router(registry.clone(), "test".into());
        let c = connection(&registry, &url, protocol).await;
        let (status, list) = call(
            &router,
            "POST",
            &format!("/api/settings/models/connections/{}/discover", c.id),
            json!({}),
        )
        .await;
        assert_eq!(status, 200, "{list}");
        assert_eq!(list["models"][0]["modelId"], "unknown-model");
        assert!(
            registry
                .deployment_settings
                .model_entries()
                .await
                .unwrap()
                .is_empty()
        );
        let m = entry(&registry, &c, "unknown-model", false).await;
        assert!(
            registry
                .deployment_settings
                .resolve_model(
                    &Selection {
                        model_id: Some(m.id.clone()),
                        ..Default::default()
                    },
                    "",
                    true,
                    true
                )
                .await
                .is_err()
        );
        let (status, result) = call(
            &router,
            "POST",
            &format!("/api/settings/models/entries/{}/test", m.id),
            json!({"tools":true}),
        )
        .await;
        assert_eq!(status, 200, "{result}");
        assert_eq!(result["success"], true, "{protocol:?}: {result}");
        assert_eq!(result["streaming"], true);
        assert_eq!(result["tools"], true);
        assert!(
            registry
                .deployment_settings
                .resolve_model(
                    &Selection {
                        model_id: Some(m.id.clone()),
                        ..Default::default()
                    },
                    "",
                    true,
                    true
                )
                .await
                .is_ok()
        );
        let mut c = c.clone();
        c.name = "Edited".into();
        registry
            .deployment_settings
            .save_model_connection(c)
            .await
            .unwrap();
        assert!(
            registry
                .deployment_settings
                .models_inventory()
                .await
                .unwrap()["verifications"]
                .as_object()
                .unwrap()
                .is_empty()
        );
        server.abort();
    }
}
#[tokio::test]
async fn queued_inputs_and_the_whole_tool_loop_keep_submitted_models() {
    let requests = Arc::new(Mutex::new(Vec::<String>::new()));
    let recorded = requests.clone();
    let gate = Arc::new(tokio::sync::Notify::new());
    let release = gate.clone();
    let (url,server)=mock(Router::new().route("/responses",post(move|Json(body):Json<Value>|{let requests=requests.clone();let gate=gate.clone();async move{
  let index={let mut requests=requests.lock().unwrap();requests.push(body["model"].as_str().unwrap().into());requests.len()};
  if index==1{gate.notified().await;response(json!([{"type":"function_call","id":"provider","call_id":"read","name":"list_workflows","arguments":"{}"}]))}else{response(json!([text("Done")]))}
 }}))).await;
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let project = registry.create("Chats", None).await.unwrap();
    let store = registry.resolve(&project.id).await.unwrap();
    let c = connection(&registry, &url, Protocol::Responses).await;
    let a = entry(&registry, &c, "a", true).await;
    let b = entry(&registry, &c, "b", true).await;
    let session = store
        .create_session(&project.id, "Pinned inputs")
        .await
        .unwrap();
    let send = |id: &str, m: &Entry| SendInput {
        client_input_id: id.into(),
        content: "Inspect workflows".into(),
        delivery_mode: "queue".into(),
        expected_turn_id: None,
        references: Value::Null,
        model: Some(Selection {
            model_id: Some(m.id.clone()),
            parameters: Default::default(),
        }),
    };
    store
        .submit_input(&session.id, send("a", &a))
        .await
        .unwrap();
    tokio::time::timeout(Duration::from_secs(3), async {
        while recorded.lock().unwrap().is_empty() {
            tokio::time::sleep(Duration::from_millis(5)).await;
        }
    })
    .await
    .unwrap();
    store
        .submit_input(&session.id, send("b", &b))
        .await
        .unwrap();
    let mut changed = b.clone();
    changed.model_id = "changed-after-queue".into();
    registry
        .deployment_settings
        .save_model_entry(changed)
        .await
        .unwrap();
    let mut changed = c;
    changed.base_url = "http://127.0.0.1:1".into();
    registry
        .deployment_settings
        .save_model_connection(changed)
        .await
        .unwrap();
    release.notify_one();
    let snapshot = tokio::time::timeout(Duration::from_secs(5), async {
        loop {
            let s = store.conversation(&session.id, None).await.unwrap();
            if s["turns"].as_array().unwrap().len() == 2
                && s["turns"]
                    .as_array()
                    .unwrap()
                    .iter()
                    .all(|t| t["status"] == "completed")
            {
                break s;
            }
            tokio::time::sleep(Duration::from_millis(5)).await;
        }
    })
    .await
    .unwrap();
    assert_eq!(*recorded.lock().unwrap(), vec!["a", "a", "b"]);
    assert_eq!(snapshot["turns"][1]["model"]["upstreamModel"], "b");
    assert_eq!(snapshot["modelSelection"]["modelId"], b.id);
    server.abort();
}
fn graph(model: &str) -> Value {
    json!({"nodes":[{"id":"start","type":"start","data":{"outputs":{"type":"object","properties":{}}}},{"id":"delay","type":"delay","data":{"inputsValues":{"durationMs":{"type":"constant","content":100}}}},{"id":"model","type":"llm","data":{"model":{"modelId":model,"parameters":{"temperature":0.2}},"inputsValues":{"prompt":{"type":"constant","content":"Reply"}}}},{"id":"end","type":"end","data":{"inputsValues":{"result":{"type":"ref","content":["model","result"]}}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"delay"},{"sourceNodeID":"delay","targetNodeID":"model"},{"sourceNodeID":"model","targetNodeID":"end"}]})
}
#[tokio::test]
async fn manual_runs_and_deployments_freeze_models_independently_of_catalog_edits() {
    let (url, server) = mock(Router::new().route(
        "/responses",
        post(|Json(body): Json<Value>| async move {
            assert_eq!(body["temperature"], 0.2);
            response(json!([text(body["model"].as_str().unwrap())]))
        }),
    ))
    .await;
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let project = registry.create("Execution", None).await.unwrap();
    let store = registry.resolve(&project.id).await.unwrap();
    let c = connection(&registry, &url, Protocol::Responses).await;
    let m = entry(&registry, &c, "original", true).await;
    let workflow = store
        .create_workflow(&project.id, "Generation", graph(&m.id))
        .await
        .unwrap();
    let run = store
        .start_run(&workflow.id, None, json!({}))
        .await
        .unwrap();
    let bundle = store
        .publish_service(Publish {
            service: "generation".into(),
            title: "Generation".into(),
            version: "1.0.0".into(),
            operations: vec![Operation {
                name: "generate".into(),
                description: "Generate a result.".into(),
                workflow_id: workflow.id.clone(),
                input_schema: json!({"type":"object","properties":{},"additionalProperties":false}),
                output_schema: json!({"type":"object"}),
                bindings: Default::default(),
                timeout_ms: 5000,
                read_only: true,
            }],
        })
        .await
        .unwrap();
    let mut deployment = Deployment {
        service: bundle.service,
        environment: "test".into(),
        version: "1.0.0".into(),
        enabled: true,
        max_concurrency: 2,
        bindings: Default::default(),
        model_bindings: Default::default(),
        callback: None,
    };
    assert!(store.deploy_service(deployment.clone()).await.is_err());
    deployment.model_bindings.insert(m.id.clone(), m.id.clone());
    store.deploy_service(deployment).await.unwrap();
    let mut edited = m.clone();
    edited.model_id = "edited".into();
    registry
        .deployment_settings
        .save_model_entry(edited)
        .await
        .unwrap();
    let mut edited = c.clone();
    edited.base_url = "http://127.0.0.1:1".into();
    registry
        .deployment_settings
        .save_model_connection(edited)
        .await
        .unwrap();
    assert_eq!(
        finished(&store, &run.id).await["outputs"]["result"],
        "original"
    );
    let key = store
        .create_consumer(
            "generation",
            "test",
            KeyInput {
                name: "Business".into(),
                operations: vec!["generate".into()],
                can_cancel: false,
            },
        )
        .await
        .unwrap();
    let caller = store
        .authenticate_consumer("generation", "test", key["token"].as_str().unwrap())
        .await
        .unwrap();
    let service = store
        .invoke_service(&caller, "generate", json!({}), "one")
        .await
        .unwrap();
    assert_eq!(
        finished(&store, &service.run_id).await["outputs"]["result"],
        "original"
    );
    assert_eq!(
        store.inspect_run(&service.run_id, 0, None).await.unwrap()["models"][0]["model"]["upstreamModel"],
        "original"
    );
    assert!(!registry.model_references(&m.id).await.unwrap().is_empty());
    let package = flowgram_desktop_backend::project_transfer::export_project(&store, true)
        .await
        .unwrap();
    let json = serde_json::to_string(&package).unwrap();
    assert!(!json.contains(&url));
    assert!(!json.contains("credentialId"));
    let copy = flowgram_desktop_backend::project_transfer::import_project(
        &registry,
        package,
        Some("Copied history"),
        None,
    )
    .await
    .unwrap();
    let copied = registry.resolve(&copy.id).await.unwrap();
    assert_eq!(
        copied.run_model_traces(&run.id).await.unwrap()[0]["model"]["upstreamModel"],
        "original"
    );
    server.abort();
}
#[tokio::test]
async fn authorization_revisions_and_unsupported_parameters_are_enforced() {
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let one = registry.create("One", None).await.unwrap();
    let two = registry.create("Two", None).await.unwrap();
    let router = registry::router(registry.clone(), "test".into());
    let (_,credential)=call(&router,"POST","/api/deployment/credentials",json!({"name":"Private","purpose":"connection","projectIds":[one.id],"value":"secret-test-value"})).await;
    let mut c = connection(&registry, "http://127.0.0.1:1", Protocol::Responses).await;
    c.credential_id = Some(credential["id"].as_str().unwrap().into());
    c = registry
        .deployment_settings
        .save_model_connection(c)
        .await
        .unwrap();
    let m = entry(&registry, &c, "Model", true).await;
    let selection = Selection {
        model_id: Some(m.id.clone()),
        ..Default::default()
    };
    assert!(
        registry
            .deployment_settings
            .resolve_model(&selection, &one.id, true, true)
            .await
            .is_ok()
    );
    assert!(
        registry
            .deployment_settings
            .resolve_model(&selection, &two.id, true, true)
            .await
            .is_err()
    );
    let mut changed = m.clone();
    changed.parameters.reasoning_effort = Some("high".into());
    assert!(
        registry
            .deployment_settings
            .save_model_entry(changed)
            .await
            .is_err()
    );
    let mut changed = m.clone();
    changed.name = "Renamed".into();
    registry
        .deployment_settings
        .save_model_entry(changed)
        .await
        .unwrap();
    assert!(
        registry
            .deployment_settings
            .save_model_entry(m.clone())
            .await
            .is_err()
    );
    let (status, _) = call(
        &router,
        "DELETE",
        &format!(
            "/api/deployment/credentials/{}",
            credential["id"].as_str().unwrap()
        ),
        Value::Null,
    )
    .await;
    assert_eq!(status, 400);
    let inventory = registry
        .deployment_settings
        .models_inventory()
        .await
        .unwrap()
        .to_string();
    assert!(!inventory.contains("secret-test-value"));
    let tools = registry
        .resolve(&one.id)
        .await
        .unwrap()
        .tool(&one.id, None, "list_models", json!({}))
        .await
        .unwrap()
        .to_string();
    assert!(!tools.contains("credentialId"));
    assert!(!tools.contains("127.0.0.1"));
}

#[tokio::test]
async fn json_only_responses_are_not_reported_as_streaming_and_legacy_settings_import_once() {
    let (url, server) = mock(Router::new().route(
        "/responses",
        post(|Json(body): Json<Value>| async move {
            let nonce = body["input"][0]["content"]
                .as_str()
                .unwrap()
                .split_whitespace()
                .last()
                .unwrap();
            Json(json!({"output":[text(nonce)]}))
        }),
    ))
    .await;
    let dir = tempfile::tempdir().unwrap();
    std::fs::write(
        dir.path().join("model.json"),
        json!({"baseUrl":url,"model":"Original","apiKey":""}).to_string(),
    )
    .unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let catalog = &registry.deployment_settings;
    let model = catalog.model_entries().await.unwrap().remove(0);
    let router = registry::router(registry.clone(), "test".into());
    let (status, result) = call(
        &router,
        "POST",
        &format!("/api/settings/models/entries/{}/test", model.id),
        json!({"tools":false}),
    )
    .await;
    assert_eq!(status, 200);
    assert_eq!(result["success"], true);
    assert_eq!(result["streaming"], false);
    let mut edited = catalog.model_entry(&model.id).await.unwrap();
    edited.name = "Preserved edit".into();
    catalog.save_model_entry(edited).await.unwrap();
    catalog.import_device_model(dir.path()).await.unwrap();
    assert_eq!(catalog.model_entries().await.unwrap().len(), 1);
    assert_eq!(
        catalog.model_entry(&model.id).await.unwrap().name,
        "Preserved edit"
    );
    assert!(
        catalog
            .resolve_model(
                &Selection {
                    model_id: Some(model.id),
                    ..Default::default()
                },
                "",
                true,
                true
            )
            .await
            .is_err()
    );
    server.abort();
}

#[tokio::test]
async fn failed_model_calls_retain_redacted_responses_and_partial_output() {
    let (url,server)=mock(Router::new().route("/responses",post(|Json(body):Json<Value>|async move {
        match body["model"].as_str().unwrap() {
            "quota"=>Response::builder().status(429).header("content-type","application/json").body(Body::from(json!({"error":{"message":"Rejected fixture-provider-key","code":"quota"}}).to_string())).unwrap(),
            "invalid-json"=>Response::builder().header("content-type","application/json").body(Body::from(json!({"output":[text("not valid JSON")],"usage":{"input_tokens":11,"output_tokens":4}}).to_string())).unwrap(),
            _=>Response::builder().header("content-type","text/event-stream").body(Body::from_stream(async_stream::stream! {
                yield Ok::<_,std::io::Error>(format!("data: {}\n\n",json!({"type":"response.output_text.delta","delta":"Partial answer before timeout"})));
                std::future::pending::<()>().await;
            })).unwrap(),
        }
    }))).await;
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let project = registry.create("Trace failures", None).await.unwrap();
    let store = registry.resolve(&project.id).await.unwrap();
    let credential = uuid::Uuid::new_v4().to_string();
    registry
        .deployment_settings
        .save_credential(
            &credential,
            flowgram_desktop_backend::deployment_settings::CredentialInput {
                name: "Fixture credential".into(),
                purpose: "connection".into(),
                project_ids: None,
                value: Some("fixture-provider-key".into()),
            },
        )
        .await
        .unwrap();
    let mut c = connection(&registry, &url, Protocol::Responses).await;
    c.credential_id = Some(credential);
    let c = registry
        .deployment_settings
        .save_model_connection(c)
        .await
        .unwrap();
    for name in ["quota", "invalid-json", "partial"] {
        let mut model = entry(&registry, &c, name, true).await;
        model.capabilities.structured_output = Some(true);
        let model = registry
            .deployment_settings
            .save_model_entry(model)
            .await
            .unwrap();
        let mut schema = graph(&model.id);
        if name == "invalid-json" {
            schema["nodes"][2]["data"]["model"]["parameters"]["outputSchema"] =
                json!({"type":"object","required":["result"]});
        }
        if name == "partial" {
            schema["nodes"][2]["data"]["runtime"] = json!({"timeoutMs":100});
        }
        let workflow = store
            .create_workflow(&project.id, name, schema)
            .await
            .unwrap();
        let run = store
            .start_run(&workflow.id, None, json!({}))
            .await
            .unwrap();
        assert_eq!(finished(&store, &run.id).await["status"], "failed");
        let events = store.history(0, Some(&run.id)).await.unwrap();
        assert!(
            !events
                .iter()
                .any(|event| event.data.contains("fixture-provider-key"))
        );
        if name == "quota" {
            let data: Value = serde_json::from_str(
                &events
                    .iter()
                    .find(|event| event.kind == "model_transport_error")
                    .unwrap()
                    .data,
            )
            .unwrap();
            assert_eq!(data["httpStatus"], 429);
            assert_eq!(
                data["errorDetails"]["error"]["message"],
                "Rejected [redacted]"
            );
        } else if name == "invalid-json" {
            let data: Value = serde_json::from_str(
                &events
                    .iter()
                    .find(|event| event.kind == "model_response")
                    .unwrap()
                    .data,
            )
            .unwrap();
            assert_eq!(data["outputs"]["usage"]["input_tokens"], 11);
            assert_eq!(
                data["outputs"]["output"][0]["content"][0]["text"],
                "not valid JSON"
            );
        } else {
            let data: Value = serde_json::from_str(
                &events
                    .iter()
                    .find(|event| event.kind == "model_canceled")
                    .unwrap()
                    .data,
            )
            .unwrap();
            assert_eq!(data["partial"], true);
            assert_eq!(
                data["outputs"]["partialText"],
                "Partial answer before timeout"
            );
        }
    }
    server.abort();
}
