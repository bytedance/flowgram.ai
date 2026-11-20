use axum::{Router, body::Body, http::Request};
use flowgram_desktop_backend::{
    registry::{self, Registry},
    service_api,
    services::KeyInput,
    store::Store,
};
use http_body_util::BodyExt;
use serde_json::{Value, json};
use tower::ServiceExt;

async fn call(router: Router, method: &str, path: &str, body: Value) -> (u16, Value) {
    let response = router
        .oneshot(
            Request::builder()
                .method(method)
                .uri(path)
                .header("authorization", "Bearer device-test-token")
                .header("content-type", "application/json")
                .body(Body::from(body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    let status = response.status().as_u16();
    let bytes = response.into_body().collect().await.unwrap().to_bytes();
    (status, serde_json::from_slice(&bytes).unwrap_or_default())
}
async fn setup() -> (tempfile::TempDir, Registry, Router, String, String, String) {
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let one = registry.create("Orders", None).await.unwrap();
    let two = registry.create("Finance", None).await.unwrap();
    let store = registry.resolve(&one.id).await.unwrap();
    let workflow=store.create_workflow(&one.id,"Review order",json!({"nodes":[{"id":"start","type":"start","data":{"outputs":{"type":"object","properties":{},"additionalProperties":false}}},{"id":"end","type":"end","data":{"inputsValues":{"value":{"type":"constant","content":42}}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"end"}]})).await.unwrap();
    let router = registry::router(registry.clone(), "device-test-token".into());
    (dir, registry, router, one.id, two.id, workflow.id)
}
async fn draft(router: &Router, project: &str, workflow: &str) -> (String, Value) {
    let (status, p) = call(
        router.clone(),
        "POST",
        "/api/deployment/publications",
        json!({"projectId":project}),
    )
    .await;
    assert_eq!(status, 200, "{p}");
    let id = p["id"].as_str().unwrap().to_owned();
    let (_, d) = call(
        router.clone(),
        "GET",
        &format!("/api/deployment/publications/{id}"),
        Value::Null,
    )
    .await;
    let mut config = d["draft"].clone();
    config["operations"] = json!([{"name":"review_order","description":"Review an order.","workflowId":workflow,"inputSchema":{"type":"object","properties":{},"additionalProperties":false},"outputSchema":{"type":"object"},"bindings":{},"timeoutMs":1000,"readOnly":true}]);
    (id, config)
}
#[tokio::test]
async fn global_inventory_and_project_publications_survive_restart_without_a_selected_project() {
    let (dir, registry, router, project, _, workflow) = setup().await;
    let model = std::fs::read(dir.path().join("model.json")).ok();
    let (id, mut config) = draft(&router, &project, &workflow).await;
    config["notes"] = json!("Initial release");
    let path = format!("/api/deployment/publications/{id}");
    assert_eq!(
        call(router.clone(), "PUT", &path, config.clone()).await.0,
        200
    );
    let (status, result) = call(
        router.clone(),
        "POST",
        &format!("{path}/publish"),
        json!({}),
    )
    .await;
    assert_eq!(status, 200, "{result}");
    config["version"] = json!("1.0.1");
    config["notes"] = json!("New version");
    assert_eq!(call(router.clone(), "PUT", &path, config).await.0, 200);
    assert_eq!(
        call(
            router.clone(),
            "POST",
            &format!("{path}/publish"),
            json!({})
        )
        .await
        .0,
        200
    );
    let (_, inventory) = call(router.clone(), "GET", "/api/deployment", Value::Null).await;
    assert_eq!(inventory["projects"].as_array().unwrap().len(), 2);
    assert_eq!(inventory["publications"].as_array().unwrap().len(), 1);
    assert_eq!(inventory["publications"][0]["versionCount"], 2);
    assert_eq!(
        inventory["publications"][0]["deployments"][0]["version"],
        "1.0.1"
    );
    let (_, details) = call(router.clone(), "GET", &path, Value::Null).await;
    assert_eq!(details["versions"][0]["notes"], "New version");
    assert_eq!(std::fs::read(dir.path().join("model.json")).ok(), model);
    // Release all project locks; catalog persistence itself is independent of project lifetime.
    drop(router);
    drop(registry);
    let catalog = flowgram_desktop_backend::deployment_settings::Catalog::open(dir.path())
        .await
        .unwrap();
    let count: i64 = sqlx::query_scalar("SELECT count(*) FROM publication_versions")
        .fetch_one(&catalog.db)
        .await
        .unwrap();
    assert_eq!(count, 2);
}
#[tokio::test]
async fn credential_secrets_are_redacted_and_project_scope_is_enforced_by_rust() {
    let (_dir, _registry, router, one, two, workflow) = setup().await;
    let secret = "private-connection-secret-abc";
    let (status, c) = call(
        router.clone(),
        "POST",
        "/api/deployment/credentials",
        json!({"name":"ERP","purpose":"connection","projectIds":[two],"value":secret}),
    )
    .await;
    assert_eq!(status, 200, "{c}");
    let credential = c["id"].as_str().unwrap();
    let (id, mut config) = draft(&router, &one, &workflow).await;
    config["credentialBindings"] = json!({"FLOWGRAM_CONNECTION_ERP":credential});
    let path = format!("/api/deployment/publications/{id}");
    let (status, error) = call(router.clone(), "PUT", &path, config.clone()).await;
    assert_eq!(status, 403, "{error}");
    assert!(!error.to_string().contains(secret));
    assert_eq!(
        call(
            router.clone(),
            "PUT",
            &format!("/api/deployment/credentials/{credential}"),
            json!({"name":"ERP","purpose":"connection","projectIds":null,"value":null})
        )
        .await
        .0,
        200
    );
    assert_eq!(call(router.clone(), "PUT", &path, config).await.0, 200);
    assert_eq!(
        call(
            router.clone(),
            "POST",
            &format!("{path}/publish"),
            json!({})
        )
        .await
        .0,
        200
    );
    let (_, inventory) = call(router.clone(), "GET", "/api/deployment", Value::Null).await;
    assert!(!inventory.to_string().contains(secret));
    let (_, bundle) = call(
        router.clone(),
        "GET",
        &format!("{path}/releases/1.0.0"),
        Value::Null,
    )
    .await;
    assert!(!bundle.to_string().contains(secret));
    assert!(!bundle.to_string().contains(credential));
    assert_eq!(
        call(
            router,
            "DELETE",
            &format!("/api/deployment/credentials/{credential}"),
            Value::Null
        )
        .await
        .0,
        400
    );
}
#[tokio::test]
async fn remote_target_publishes_real_versions_and_manages_consumer_permissions() {
    let (_dir, registry, router, project, other, workflow) = setup().await;
    let hostdir = tempfile::tempdir().unwrap();
    let host = Store::open(hostdir.path()).await.unwrap();
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
    let address = listener.local_addr().unwrap();
    let admin = "a-valid-runtime-administration-token-123456";
    let host_router = service_api::public_router(host.clone())
        .merge(service_api::host_admin_router(host.clone(), admin.into()));
    let server = tokio::spawn(async move {
        axum::serve(listener, host_router).await.unwrap();
    });
    let (_,credential)=call(router.clone(),"POST","/api/deployment/credentials",json!({"name":"Production admin","purpose":"management","projectIds":[other],"value":admin})).await;
    let (_,target)=call(router.clone(),"POST","/api/deployment/targets",json!({"name":"Production","url":format!("http://{address}"),"credentialId":credential["id"]})).await;
    let target_id = target["id"].as_str().unwrap();
    assert_eq!(
        call(
            router.clone(),
            "POST",
            &format!("/api/deployment/targets/{target_id}/probe"),
            json!({})
        )
        .await
        .0,
        200
    );
    let (id, mut config) = draft(&router, &project, &workflow).await;
    config["targetId"] = json!(target_id);
    config["environment"] = json!("production");
    let path = format!("/api/deployment/publications/{id}");
    assert_eq!(
        call(router.clone(), "PUT", &path, config.clone()).await.0,
        200
    );
    assert_eq!(
        call(
            router.clone(),
            "POST",
            &format!("{path}/publish"),
            json!({})
        )
        .await
        .0,
        403
    );
    registry
        .deployment_settings
        .save_credential(
            credential["id"].as_str().unwrap(),
            flowgram_desktop_backend::deployment_settings::CredentialInput {
                name: "Production admin".into(),
                purpose: "management".into(),
                project_ids: None,
                value: None,
            },
        )
        .await
        .unwrap();
    let (status, result) = call(
        router.clone(),
        "POST",
        &format!("{path}/publish"),
        json!({}),
    )
    .await;
    assert_eq!(status, 200, "{result}");
    let (_,shared)=call(router.clone(),"POST","/api/deployment/credentials",json!({"name":"Shared API","purpose":"connection","projectIds":null,"value":"shared-business-secret-12345"})).await;
    config["version"] = json!("1.0.1");
    config["credentialBindings"] = json!({"FLOWGRAM_CONNECTION_SHARED":shared["id"]});
    assert_eq!(
        call(router.clone(), "PUT", &path, config.clone()).await.0,
        200
    );
    assert_eq!(
        call(
            router.clone(),
            "POST",
            &format!("{path}/publish"),
            json!({})
        )
        .await
        .0,
        200
    );
    let second_store = registry.resolve(&other).await.unwrap();
    let second_workflow = second_store
        .create_workflow(
            &other,
            "Finance entry",
            registry
                .resolve(&project)
                .await
                .unwrap()
                .workflow(&workflow)
                .await
                .unwrap()
                .schema,
        )
        .await
        .unwrap();
    let (second_id, mut second_config) = draft(&router, &other, &second_workflow.id).await;
    second_config["targetId"] = json!(target_id);
    second_config["environment"] = json!("production");
    second_config["credentialBindings"] = json!({"FLOWGRAM_CONNECTION_SHARED":shared["id"]});
    let second_path = format!("/api/deployment/publications/{second_id}");
    assert_eq!(
        call(router.clone(), "PUT", &second_path, second_config)
            .await
            .0,
        200
    );
    assert_eq!(
        call(
            router.clone(),
            "POST",
            &format!("{second_path}/publish"),
            json!({})
        )
        .await
        .0,
        200
    );
    let shared_id = shared["id"].as_str().unwrap();
    assert!(
        host.deployment_settings
            .secret(
                &format!("{project}:{shared_id}"),
                Some(&project),
                "connection"
            )
            .await
            .is_ok()
    );
    assert!(
        host.deployment_settings
            .secret(&format!("{other}:{shared_id}"), Some(&other), "connection")
            .await
            .is_ok()
    );
    let (status, result) = call(
        router.clone(),
        "PUT",
        &format!("/api/deployment/credentials/{shared_id}"),
        json!({"name":"Shared API","purpose":"connection","projectIds":[other],"value":null}),
    )
    .await;
    assert_eq!(status, 200, "{result}");
    assert!(
        host.deployment_settings
            .secret(
                &format!("{project}:{shared_id}"),
                Some(&project),
                "connection"
            )
            .await
            .is_err()
    );
    assert!(
        host.deployment_settings
            .secret(&format!("{other}:{shared_id}"), Some(&other), "connection")
            .await
            .is_ok()
    );
    let target_path = format!("{path}/targets/{target_id}/production");
    let (_, details) = call(router.clone(), "GET", &target_path, Value::Null).await;
    assert_eq!(details["deployment"]["version"], "1.0.1");
    assert!(
        details["publicBase"]
            .as_str()
            .unwrap()
            .starts_with(&format!("http://{address}/v1/services/"))
    );
    let (status, key) = call(
        router.clone(),
        "POST",
        &format!("{target_path}/consumers"),
        json!({"name":"ERP","operations":["review_order"],"canCancel":false}),
    )
    .await;
    assert_eq!(status, 200, "{key}");
    let client = reqwest::Client::new();
    let result: Value = client
        .post(format!(
            "{}/operations/review_order/invoke?waitMs=1000",
            details["publicBase"].as_str().unwrap()
        ))
        .bearer_auth(key["token"].as_str().unwrap())
        .header("idempotency-key", "remote-real-run")
        .json(&json!({}))
        .send()
        .await
        .unwrap()
        .json()
        .await
        .unwrap();
    assert_eq!(result["outputs"]["value"], 42, "{result}");
    let run_path = format!("{target_path}/runs/{}", result["runId"].as_str().unwrap());
    let (status, inspector) = call(router.clone(), "GET", &run_path, Value::Null).await;
    assert_eq!(status, 200, "{inspector}");
    assert_eq!(inspector["run"]["outputs"]["value"], 42);
    assert!(inspector["events"].as_array().is_some());
    assert!(inspector["schema"]["nodes"].as_array().is_some());
    let (status, revoked) = call(
        router,
        "POST",
        &format!(
            "{target_path}/consumers/{}/revoke",
            key["consumer"]["id"].as_str().unwrap()
        ),
        json!({}),
    )
    .await;
    assert_eq!(status, 200, "{revoked}");
    server.abort();
}
#[tokio::test]
async fn saved_but_unreachable_target_keeps_a_retryable_immutable_version() {
    let (_dir, _registry, router, project, _, workflow) = setup().await;
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
    let address = listener.local_addr().unwrap();
    drop(listener);
    let (_,credential)=call(router.clone(),"POST","/api/deployment/credentials",json!({"name":"Offline admin","purpose":"management","projectIds":null,"value":"runtime-administration-token-123456"})).await;
    let (_,target)=call(router.clone(),"POST","/api/deployment/targets",json!({"name":"Offline target","url":format!("http://{address}"),"credentialId":credential["id"]})).await;
    let (id, mut config) = draft(&router, &project, &workflow).await;
    config["targetId"] = target["id"].clone();
    let path = format!("/api/deployment/publications/{id}");
    assert_eq!(call(router.clone(), "PUT", &path, config).await.0, 200);
    assert_eq!(
        call(
            router.clone(),
            "POST",
            &format!("{path}/publish"),
            json!({})
        )
        .await
        .0,
        422
    );
    let (_, details) = call(router.clone(), "GET", &path, Value::Null).await;
    assert_eq!(details["releases"].as_array().unwrap().len(), 1);
    let (_, inventory) = call(router, "GET", "/api/deployment", Value::Null).await;
    assert_eq!(inventory["publications"][0]["versionCount"], 1);
    assert_eq!(inventory["publications"][0]["deployments"], json!([]));
}
#[tokio::test]
async fn vault_credential_injection_and_scope_revocation_apply_at_execution_time() {
    let (_dir, registry, router, project, other, _) = setup().await;
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
    let address = listener.local_addr().unwrap();
    let web = Router::new().route(
        "/",
        axum::routing::get(|headers: axum::http::HeaderMap| async move {
            Json(json!({"echo":headers.get("authorization").unwrap().to_str().unwrap()}))
        }),
    );
    let server = tokio::spawn(async move {
        axum::serve(listener, web).await.unwrap();
    });
    let store = registry.resolve(&project).await.unwrap();
    let workflow=store.create_workflow(&project,"Authenticated HTTP",json!({"nodes":[{"id":"start","type":"start","data":{"outputs":{"type":"object","properties":{},"additionalProperties":false}}},{"id":"http","type":"http","data":{"inputsValues":{"url":{"type":"constant","content":format!("http://{address}")},"method":{"type":"constant","content":"GET"},"credentialEnv":{"type":"constant","content":"FLOWGRAM_CONNECTION_TEST"}}}},{"id":"end","type":"end","data":{"inputsValues":{"body":{"type":"ref","content":["http","body"]}}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"http"},{"sourceNodeID":"http","targetNodeID":"end"}]})).await.unwrap();
    let secret = "global-business-secret-12345";
    let (_, credential) = call(
        router.clone(),
        "POST",
        "/api/deployment/credentials",
        json!({"name":"API","purpose":"connection","projectIds":[project],"value":secret}),
    )
    .await;
    let (id, mut config) = draft(&router, &project, &workflow.id).await;
    config["credentialBindings"] = json!({"FLOWGRAM_CONNECTION_TEST":credential["id"]});
    let path = format!("/api/deployment/publications/{id}");
    assert_eq!(call(router.clone(), "PUT", &path, config).await.0, 200);
    let (status, result) = call(
        router.clone(),
        "POST",
        &format!("{path}/publish"),
        json!({}),
    )
    .await;
    assert_eq!(status, 200, "{result}");
    let (_, details) = call(router.clone(), "GET", &path, Value::Null).await;
    let service = details["service"].as_str().unwrap();
    let key = store
        .create_consumer(
            service,
            "local",
            KeyInput {
                name: "ERP".into(),
                operations: vec!["review_order".into()],
                can_cancel: false,
            },
        )
        .await
        .unwrap();
    let caller = store
        .authenticate_consumer(service, "local", key["token"].as_str().unwrap())
        .await
        .unwrap();
    let invocation = store
        .invoke_service(&caller, "review_order", json!({}), "one")
        .await
        .unwrap();
    for _ in 0..100 {
        if store.run(&invocation.run_id).await.unwrap().status != "running" {
            break;
        }
        tokio::time::sleep(std::time::Duration::from_millis(10)).await;
    }
    let run = store.run(&invocation.run_id).await.unwrap();
    assert_eq!(run.status, "succeeded", "{:?}", run.error);
    assert!(!run.outputs.to_string().contains(secret));
    assert!(run.outputs.to_string().contains("[redacted]"));
    assert_eq!(
        call(
            router,
            "PUT",
            &format!(
                "/api/deployment/credentials/{}",
                credential["id"].as_str().unwrap()
            ),
            json!({"name":"API","purpose":"connection","projectIds":[other],"value":null})
        )
        .await
        .0,
        200
    );
    let invocation = store
        .invoke_service(&caller, "review_order", json!({}), "two")
        .await
        .unwrap();
    for _ in 0..100 {
        if store.run(&invocation.run_id).await.unwrap().status != "running" {
            break;
        }
        tokio::time::sleep(std::time::Duration::from_millis(10)).await;
    }
    assert_eq!(
        store.run(&invocation.run_id).await.unwrap().status,
        "failed"
    );
    server.abort();
}
use axum::Json;
