use axum::{body::Body, http::Request};
use flowgram_desktop_backend::{service_api, services::*, store::Store};
use http_body_util::BodyExt;
use serde_json::{Value, json};
use tower::ServiceExt;
fn schema(value: i64, delay: u64) -> Value {
    json!({"nodes":[{"id":"start","type":"start","data":{"outputs":{"type":"object","properties":{},"additionalProperties":false}}},{"id":"delay","type":"delay","data":{"inputsValues":{"durationMs":{"type":"constant","content":delay}}}},{"id":"end","type":"end","data":{"inputsValues":{"value":{"type":"constant","content":value}}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"delay"},{"sourceNodeID":"delay","targetNodeID":"end"}]})
}
async fn setup(delay: u64) -> (tempfile::TempDir, Store, Value, Bundle) {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let project = store.projects().await.unwrap().remove(0);
    let workflow = store
        .create_workflow(&project.id, "Business operation", schema(1, delay))
        .await
        .unwrap();
    let bundle=store.publish_service(Publish {service:"orders".into(),title:"Orders".into(),version:"1.0.0".into(),operations:vec![Operation {name:"fulfill".into(),description:"Fulfill a validated order.".into(),workflow_id:workflow.id,input_schema:json!({"type":"object","properties":{},"additionalProperties":false}),output_schema:json!({"type":"object","properties":{"value":{"type":"integer"}},"required":["value"],"additionalProperties":false}),bindings:Default::default(),timeout_ms:1000,read_only:false}]}).await.unwrap();
    store
        .deploy_service(Deployment {
            model_bindings: Default::default(),
            service: "orders".into(),
            environment: "test".into(),
            version: "1.0.0".into(),
            enabled: true,
            max_concurrency: 2,
            bindings: Default::default(),
            callback: None,
        })
        .await
        .unwrap();
    let key = store
        .create_consumer(
            "orders",
            "test",
            KeyInput {
                name: "ERP".into(),
                operations: vec!["fulfill".into()],
                can_cancel: true,
            },
        )
        .await
        .unwrap();
    (dir, store, key, bundle)
}
async fn request(
    store: &Store,
    method: &str,
    path: &str,
    token: &str,
    key: &str,
    body: Value,
) -> (u16, Value) {
    let request = Request::builder()
        .method(method)
        .uri(path)
        .header("authorization", format!("Bearer {token}"))
        .header("idempotency-key", key)
        .header("content-type", "application/json")
        .body(Body::from(body.to_string()))
        .unwrap();
    let response = service_api::public_router(store.clone())
        .oneshot(request)
        .await
        .unwrap();
    let status = response.status().as_u16();
    let bytes = response.into_body().collect().await.unwrap().to_bytes();
    (
        status,
        serde_json::from_slice(&bytes).unwrap_or(Value::Null),
    )
}
async fn finished(store: &Store, id: &str) -> Value {
    for _ in 0..400 {
        let r = store.service_run("orders", "test", id, None).await.unwrap();
        if r.status != "running" {
            return serde_json::to_value(r).unwrap();
        }
        tokio::time::sleep(std::time::Duration::from_millis(5)).await;
    }
    panic!("Run did not terminate")
}
#[tokio::test]
async fn published_dependencies_remain_immutable_and_alias_upgrade_and_rollback_are_explicit() {
    let (_dir, store, key, bundle) = setup(80).await;
    let caller = store
        .authenticate_consumer("orders", "test", key["token"].as_str().unwrap())
        .await
        .unwrap();
    let first = store
        .invoke_service(&caller, "fulfill", json!({}), "request-1")
        .await
        .unwrap();
    let workflow = &bundle.workflows[0];
    store
        .save_workflow(&workflow.id, 1, &workflow.name, schema(2, 0))
        .await
        .unwrap();
    assert_eq!(finished(&store, &first.run_id).await["outputs"]["value"], 1);
    let old = store
        .invoke_service(&caller, "fulfill", json!({}), "request-2")
        .await
        .unwrap();
    assert_eq!(finished(&store, &old.run_id).await["outputs"]["value"], 1);
    store
        .publish_service(Publish {
            service: "orders".into(),
            title: "Orders".into(),
            version: "2.0.0".into(),
            operations: bundle.operations.clone(),
        })
        .await
        .unwrap();
    let mut deployment = caller.deployment.clone();
    deployment.version = "2.0.0".into();
    store.deploy_service(deployment.clone()).await.unwrap();
    let new = store
        .invoke_service(&caller, "fulfill", json!({}), "request-3")
        .await
        .unwrap();
    assert_eq!(new.version, "2.0.0");
    assert_eq!(finished(&store, &new.run_id).await["outputs"]["value"], 2);
    let retry = store
        .invoke_service(&caller, "fulfill", json!({}), "request-1")
        .await
        .unwrap();
    assert_eq!(retry.run_id, first.run_id);
    assert_eq!(retry.version, "1.0.0");
    deployment.version = "1.0.0".into();
    store.deploy_service(deployment).await.unwrap();
    let rollback = store
        .invoke_service(&caller, "fulfill", json!({}), "request-4")
        .await
        .unwrap();
    assert_eq!(
        finished(&store, &rollback.run_id).await["outputs"]["value"],
        1
    );
    assert!(
        store
            .publish_service(Publish {
                service: "orders".into(),
                title: "Orders".into(),
                version: "1.0.0".into(),
                operations: bundle.operations
            })
            .await
            .is_err()
    );
}
#[tokio::test]
async fn http_and_mcp_share_idempotency_and_caller_isolation_and_revocation() {
    let (_dir, store, key, _bundle) = setup(80).await;
    let token = key["token"].as_str().unwrap();
    let base = "/v1/services/orders/test";
    let (status, run) = request(
        &store,
        "POST",
        &format!("{base}/operations/fulfill/invoke"),
        token,
        "same",
        json!({}),
    )
    .await;
    assert_eq!(status, 202);
    let (_,mcp)=request(&store,"POST",&format!("{base}/mcp"),token,"",json!({"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"fulfill","arguments":{"_flowgram":{"idempotencyKey":"same","waitMs":500}}}})).await;
    assert_eq!(mcp["result"]["structuredContent"]["runId"], run["runId"]);
    assert_eq!(mcp["result"]["structuredContent"]["outputs"]["value"], 1);
    let (conflict, _) = request(
        &store,
        "POST",
        &format!("{base}/operations/fulfill/invoke"),
        token,
        "same",
        json!({"different":true}),
    )
    .await;
    assert_eq!(conflict, 409);
    let second = store
        .create_consumer(
            "orders",
            "test",
            KeyInput {
                name: "Other".into(),
                operations: vec!["fulfill".into()],
                can_cancel: false,
            },
        )
        .await
        .unwrap();
    let other = second["token"].as_str().unwrap();
    assert_eq!(
        request(
            &store,
            "GET",
            &format!("{base}/runs/{}", run["runId"].as_str().unwrap()),
            other,
            "",
            Value::Null
        )
        .await
        .0,
        404
    );
    assert_eq!(
        request(
            &store,
            "POST",
            &format!("{base}/runs/{}/cancel", run["runId"].as_str().unwrap()),
            other,
            "",
            Value::Null
        )
        .await
        .0,
        403
    );
    let (_, tools) = request(
        &store,
        "POST",
        &format!("{base}/mcp"),
        other,
        "",
        json!({"jsonrpc":"2.0","id":2,"method":"tools/list"}),
    )
    .await;
    let names: Vec<_> = tools["result"]["tools"]
        .as_array()
        .unwrap()
        .iter()
        .map(|v| v["name"].as_str().unwrap())
        .collect();
    assert_eq!(names, vec!["flowgram_get_run", "fulfill"]);
    store
        .revoke_consumer("orders", "test", key["consumer"]["id"].as_str().unwrap())
        .await
        .unwrap();
    assert_eq!(
        request(
            &store,
            "GET",
            &format!("{base}/runs/{}", run["runId"].as_str().unwrap()),
            token,
            "",
            Value::Null
        )
        .await
        .0,
        401
    );
}
#[tokio::test]
async fn concurrent_retries_admit_one_run_and_limits_cancel_and_contracts_are_enforced() {
    let (_dir, store, key, _) = setup(500).await;
    let caller = store
        .authenticate_consumer("orders", "test", key["token"].as_str().unwrap())
        .await
        .unwrap();
    let mut joins = vec![];
    for _ in 0..16 {
        let s = store.clone();
        let c = caller.clone();
        joins.push(tokio::spawn(async move {
            s.invoke_service(&c, "fulfill", json!({}), "one")
                .await
                .unwrap()
                .run_id
        }));
    }
    let mut ids = std::collections::HashSet::new();
    for join in joins {
        ids.insert(join.await.unwrap());
    }
    assert_eq!(ids.len(), 1);
    assert_eq!(store.runs().await.unwrap().len(), 1);
    let other = store
        .invoke_service(&caller, "fulfill", json!({}), "two")
        .await
        .unwrap();
    assert!(
        store
            .invoke_service(&caller, "fulfill", json!({}), "three")
            .await
            .unwrap_err()
            .to_string()
            .contains("concurrency")
    );
    let token = key["token"].as_str().unwrap();
    request(
        &store,
        "POST",
        &format!("/v1/services/orders/test/runs/{}/cancel", other.run_id),
        token,
        "",
        Value::Null,
    )
    .await;
    assert_eq!(finished(&store, &other.run_id).await["status"], "canceled");
    assert!(
        store
            .invoke_service(&caller, "fulfill", json!({"unexpected":1}), "invalid")
            .await
            .is_err()
    );
    assert_eq!(store.runs().await.unwrap().len(), 2);
}
#[tokio::test]
async fn bundle_import_needs_no_source_files_and_rejects_tampering() {
    let (_dir, store, key, bundle) = setup(0).await;
    let remote = tempfile::tempdir().unwrap();
    let server = Store::open(remote.path()).await.unwrap();
    server.import_service(bundle.clone()).await.unwrap();
    let deployment = store.deployment("orders", "test").await.unwrap();
    server.deploy_service(deployment).await.unwrap();
    let mut bad = bundle.clone();
    bad.workflows[0].schema = schema(999, 0);
    assert!(server.import_service(bad).await.is_err());
    let remote_key = server
        .create_consumer(
            "orders",
            "test",
            KeyInput {
                name: "Remote".into(),
                operations: vec!["fulfill".into()],
                can_cancel: true,
            },
        )
        .await
        .unwrap();
    let token = remote_key["token"].as_str().unwrap();
    let (status, value) = request(
        &server,
        "POST",
        "/v1/services/orders/test/operations/fulfill/invoke?waitMs=1000",
        token,
        "remote",
        json!({}),
    )
    .await;
    assert_eq!(status, 200);
    assert_eq!(value["outputs"]["value"], 1);
    assert_eq!(
        request(
            &server,
            "POST",
            "/v1/services/orders/test/operations/fulfill/invoke",
            key["token"].as_str().unwrap(),
            "foreign",
            json!({})
        )
        .await
        .0,
        401
    );
}
#[tokio::test]
async fn output_contract_and_service_deadline_fail_the_run_and_openapi_is_scoped() {
    let (_dir, store, key, bundle) = setup(100).await;
    let mut op = bundle.operations[0].clone();
    op.timeout_ms = 10;
    store
        .publish_service(Publish {
            service: "orders".into(),
            title: "Orders".into(),
            version: "timeout".into(),
            operations: vec![op.clone()],
        })
        .await
        .unwrap();
    let mut deployment = store.deployment("orders", "test").await.unwrap();
    deployment.version = "timeout".into();
    store.deploy_service(deployment.clone()).await.unwrap();
    let token = key["token"].as_str().unwrap();
    let (_, run) = request(
        &store,
        "POST",
        "/v1/services/orders/test/operations/fulfill/invoke?waitMs=1000",
        token,
        "timeout",
        json!({}),
    )
    .await;
    assert_eq!(run["status"], "failed");
    assert!(run["error"].as_str().unwrap().contains("timed out"));
    op.timeout_ms = 1000;
    op.output_schema["properties"]["value"] = json!({"type":"string"});
    store
        .publish_service(Publish {
            service: "orders".into(),
            title: "Orders".into(),
            version: "invalid-output".into(),
            operations: vec![op],
        })
        .await
        .unwrap();
    deployment.version = "invalid-output".into();
    store.deploy_service(deployment).await.unwrap();
    let (_, run) = request(
        &store,
        "POST",
        "/v1/services/orders/test/operations/fulfill/invoke?waitMs=1000",
        token,
        "bad-output",
        json!({}),
    )
    .await;
    assert_eq!(run["status"], "failed");
    let (status, doc) = request(
        &store,
        "GET",
        "/v1/services/orders/test/openapi.json",
        token,
        "",
        Value::Null,
    )
    .await;
    assert_eq!(status, 200);
    assert_eq!(doc["openapi"], "3.1.0");
    assert!(doc["paths"]["/v1/services/orders/test/operations/fulfill/invoke"].is_object());
}

#[tokio::test]
async fn completion_callbacks_are_signed_durable_and_retry_delivery_without_reexecution() {
    use hmac::{Hmac, Mac};
    use sha2::Sha256;
    use std::sync::{
        Arc,
        atomic::{AtomicUsize, Ordering},
    };
    let (_dir, store, key, _) = setup(0).await;
    let count = Arc::new(AtomicUsize::new(0));
    let calls = count.clone();
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
    let address = listener.local_addr().unwrap();
    let callback = axum::Router::new().route(
        "/completion",
        axum::routing::post(
            move |headers: axum::http::HeaderMap, body: axum::body::Bytes| {
                let calls = calls.clone();
                async move {
                    let mut mac =
                        Hmac::<Sha256>::new_from_slice(std::env::var("PATH").unwrap().as_bytes())
                            .unwrap();
                    mac.update(headers["x-flowgram-timestamp"].as_bytes());
                    mac.update(b".");
                    mac.update(&body);
                    assert_eq!(
                        headers["x-flowgram-signature"].to_str().unwrap(),
                        format!("sha256={}", hex::encode(mac.finalize().into_bytes()))
                    );
                    let event: Value = serde_json::from_slice(&body).unwrap();
                    assert_eq!(event["run"]["outputs"]["value"], 1);
                    assert!(event["eventId"].as_str().unwrap().ends_with(":finished"));
                    if calls.fetch_add(1, Ordering::SeqCst) == 0 {
                        axum::http::StatusCode::SERVICE_UNAVAILABLE
                    } else {
                        axum::http::StatusCode::OK
                    }
                }
            },
        ),
    );
    let server = tokio::spawn(async move {
        axum::serve(listener, callback).await.unwrap();
    });
    let mut deployment = store.deployment("orders", "test").await.unwrap();
    deployment.callback = Some(Callback {
        url: format!("http://{address}/completion"),
        secret_env: "PATH".into(),
    });
    store.deploy_service(deployment).await.unwrap();
    let token = key["token"].as_str().unwrap();
    let (_, run) = request(
        &store,
        "POST",
        "/v1/services/orders/test/operations/fulfill/invoke?waitMs=1000",
        token,
        "callback",
        json!({}),
    )
    .await;
    flowgram_desktop_backend::service_delivery::deliver(&store)
        .await
        .unwrap();
    sqlx::query("UPDATE service_deliveries SET next_at=0")
        .execute(&store.db)
        .await
        .unwrap();
    flowgram_desktop_backend::service_delivery::deliver(&store)
        .await
        .unwrap();
    assert_eq!(count.load(Ordering::SeqCst), 2);
    assert_eq!(store.runs().await.unwrap().len(), 1);
    let state: String = sqlx::query_scalar("SELECT status FROM service_deliveries WHERE run_id=?")
        .bind(run["runId"].as_str().unwrap())
        .fetch_one(&store.db)
        .await
        .unwrap();
    assert_eq!(state, "delivered");
    server.abort();
}
#[tokio::test]
async fn published_agent_discovery_is_limited_to_the_pinned_bundle_and_own_run() {
    let (_dir, store, key, bundle) = setup(0).await;
    let caller = store
        .authenticate_consumer("orders", "test", key["token"].as_str().unwrap())
        .await
        .unwrap();
    let run = store
        .invoke_service(&caller, "fulfill", json!({}), "agent-scope")
        .await
        .unwrap();
    let project = store.projects().await.unwrap().remove(0);
    let private = store
        .create_workflow(&project.id, "Private draft", schema(99, 0))
        .await
        .unwrap();
    assert_eq!(
        store
            .published_agent_tool(&run.run_id, "list_workflows", json!({}))
            .await
            .unwrap()["data"]["items"]
            .as_array()
            .unwrap()
            .len(),
        1
    );
    assert!(
        store
            .published_agent_tool(
                &run.run_id,
                "read_workflow",
                json!({"workflowId":private.id})
            )
            .await
            .is_err()
    );
    assert_eq!(
        store
            .published_agent_tool(
                &run.run_id,
                "read_workflow",
                json!({"workflowId":bundle.workflows[0].id})
            )
            .await
            .unwrap()["context"]["revision"],
        1
    );
    assert!(
        store
            .published_agent_tool(&run.run_id, "read_run", json!({"runId":"other"}))
            .await
            .is_err()
    );
    assert!(
        store
            .published_agent_tool(&run.run_id, "save_workflow", json!({}))
            .await
            .is_err()
    );
}
#[tokio::test]
async fn progress_is_resumable_and_omits_node_payloads_and_result_download_is_authorized() {
    let (_dir, store, key, _) = setup(0).await;
    let token = key["token"].as_str().unwrap();
    let (_, run) = request(
        &store,
        "POST",
        "/v1/services/orders/test/operations/fulfill/invoke?waitMs=1000",
        token,
        "events",
        json!({}),
    )
    .await;
    let id = run["runId"].as_str().unwrap();
    let events = store.history(0, Some(id)).await.unwrap();
    let after = events[1].sequence;
    let response = service_api::public_router(store.clone())
        .oneshot(
            Request::builder()
                .uri(format!(
                    "/v1/services/orders/test/runs/{id}/events?after={after}"
                ))
                .header("authorization", format!("Bearer {token}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), 200);
    let bytes = response.into_body().collect().await.unwrap().to_bytes();
    let text = String::from_utf8(bytes.to_vec()).unwrap();
    assert!(text.contains("run_finished"));
    assert!(!text.contains("durationMs"));
    assert!(!text.contains(&format!("id: {after}\n")));
    let (status, result) = request(
        &store,
        "GET",
        &format!("/v1/services/orders/test/runs/{id}/result"),
        token,
        "",
        Value::Null,
    )
    .await;
    assert_eq!(status, 200);
    assert_eq!(result, json!({"value":1}));
}
#[tokio::test]
async fn environment_bound_inputs_cannot_be_overridden_and_the_bundle_contains_no_values() {
    let (_dir, store, key, bundle) = setup(0).await;
    let workflow = &bundle.workflows[0];
    let mut graph = schema(1, 0);
    graph["nodes"][0]["data"]["outputs"] = json!({"type":"object","properties":{"endpoint":{"type":"string"}},"required":["endpoint"],"additionalProperties":false});
    graph["nodes"][2]["data"]["inputsValues"] =
        json!({"value":{"type":"ref","content":["start","endpoint"]}});
    store
        .save_workflow(&workflow.id, 1, &workflow.name, graph)
        .await
        .unwrap();
    let mut op = bundle.operations[0].clone();
    op.bindings.insert("endpoint".into(), "businessApi".into());
    op.output_schema["properties"]["value"] = json!({"type":"string"});
    let release = store
        .publish_service(Publish {
            service: "orders".into(),
            title: "Orders".into(),
            version: "bound".into(),
            operations: vec![op],
        })
        .await
        .unwrap();
    assert!(
        !serde_json::to_string(&release)
            .unwrap()
            .contains("https://example.invalid")
    );
    let mut deployment = store.deployment("orders", "test").await.unwrap();
    deployment.version = "bound".into();
    deployment
        .bindings
        .insert("businessApi".into(), json!("https://example.invalid"));
    store.deploy_service(deployment).await.unwrap();
    let token = key["token"].as_str().unwrap();
    let (_, run) = request(
        &store,
        "POST",
        "/v1/services/orders/test/operations/fulfill/invoke?waitMs=1000",
        token,
        "config",
        json!({}),
    )
    .await;
    assert_eq!(run["outputs"]["value"], "https://example.invalid");
    assert_eq!(
        request(
            &store,
            "POST",
            "/v1/services/orders/test/operations/fulfill/invoke",
            token,
            "override",
            json!({"endpoint":"other"})
        )
        .await
        .0,
        422
    );
}

#[tokio::test]
async fn project_business_routes_clear_outer_captures_and_preserve_openapi_paths() {
    use flowgram_desktop_backend::registry::{Registry, router};
    let root = tempfile::tempdir().unwrap();
    let registry = Registry::open(root.path()).await.unwrap();
    let project = registry.create("Business project", None).await.unwrap();
    let store = registry.resolve(&project.id).await.unwrap();
    let workflow = store
        .create_workflow(&project.id, "Flow", schema(1, 0))
        .await
        .unwrap();
    store
        .publish_service(Publish {
            service: "orders".into(),
            title: "Orders".into(),
            version: "1".into(),
            operations: vec![Operation {
                name: "execute".into(),
                description: "Execute the business workflow.".into(),
                workflow_id: workflow.id,
                input_schema: json!({"type":"object","properties":{},"additionalProperties":false}),
                output_schema: json!({"type":"object"}),
                bindings: Default::default(),
                timeout_ms: 1000,
                read_only: false,
            }],
        })
        .await
        .unwrap();
    store
        .deploy_service(Deployment {
            model_bindings: Default::default(),
            service: "orders".into(),
            environment: "local".into(),
            version: "1".into(),
            enabled: true,
            max_concurrency: 2,
            bindings: Default::default(),
            callback: None,
        })
        .await
        .unwrap();
    let key = store
        .create_consumer(
            "orders",
            "local",
            KeyInput {
                name: "Caller".into(),
                operations: vec!["execute".into()],
                can_cancel: false,
            },
        )
        .await
        .unwrap();
    let token = key["token"].as_str().unwrap();
    let base = format!("/v1/projects/{}/services/orders/local", project.id);
    let response = router(registry.clone(), "editor-secret".into())
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!("{base}/operations/execute/invoke?waitMs=1000"))
                .header("authorization", format!("Bearer {token}"))
                .header("idempotency-key", "route")
                .header("content-type", "application/json")
                .body(Body::from("{}"))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), 200);
    let value: Value =
        serde_json::from_slice(&response.into_body().collect().await.unwrap().to_bytes()).unwrap();
    assert_eq!(value["outputs"]["value"], 1);
    let response = router(registry.clone(), "editor-secret".into())
        .oneshot(
            Request::builder()
                .uri(format!("{base}/openapi.json"))
                .header("authorization", format!("Bearer {token}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), 200);
    let value: Value =
        serde_json::from_slice(&response.into_body().collect().await.unwrap().to_bytes()).unwrap();
    assert!(
        value["paths"]
            .get(format!("{base}/operations/execute/invoke"))
            .is_some()
    );
    let response = router(registry, "editor-secret".into())
        .oneshot(
            Request::builder()
                .uri("/api/bootstrap")
                .header("authorization", format!("Bearer {token}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), 401);
}
