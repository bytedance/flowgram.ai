use axum::{
    body::{Body, to_bytes},
    http::{Request, StatusCode},
};
use flowgram_desktop_backend::{
    registry::{self, Registry},
    store::starter_schema,
};
use serde_json::{Value, json};
use tower::ServiceExt;

async fn request(
    app: &axum::Router,
    method: &str,
    path: &str,
    project: Option<&str>,
    body: Value,
) -> (StatusCode, Value) {
    let mut request = Request::builder()
        .method(method)
        .uri(path)
        .header("authorization", "Bearer test-token")
        .header("content-type", "application/json");
    if let Some(project) = project {
        request = request.header("x-flowgram-project", project);
    }
    let response = app
        .clone()
        .oneshot(
            request
                .body(if method == "GET" {
                    Body::empty()
                } else {
                    Body::from(body.to_string())
                })
                .unwrap(),
        )
        .await
        .unwrap();
    let status = response.status();
    let bytes = to_bytes(response.into_body(), 2_000_000).await.unwrap();
    (status, serde_json::from_slice(&bytes).unwrap_or_default())
}

#[tokio::test]
async fn project_routes_require_explicit_scope_and_never_mix_objects() {
    let directory = tempfile::tempdir().unwrap();
    let registry = Registry::open(directory.path()).await.unwrap();
    let first = registry.create("First", None).await.unwrap();
    let second = registry.create("Second", None).await.unwrap();
    let store = registry.resolve(&first.id).await.unwrap();
    let workflow = store
        .create_workflow(&first.id, "Echo", starter_schema())
        .await
        .unwrap();
    let session = store
        .create_session(&first.id, "Improve Echo")
        .await
        .unwrap();
    let app = registry::router(registry.clone(), "test-token".into());
    let (_, bootstrap) = request(&app, "GET", "/api/bootstrap", None, Value::Null).await;
    assert_eq!(bootstrap["projects"].as_array().unwrap().len(), 2);
    assert_eq!(bootstrap["workflows"], json!([]));
    assert_eq!(
        request(
            &app,
            "POST",
            "/api/workflows",
            None,
            json!({"projectId":first.id,"name":"Missing scope"})
        )
        .await
        .0,
        StatusCode::BAD_REQUEST
    );
    assert_eq!(
        request(
            &app,
            "GET",
            &format!("/api/workflows/{}", workflow.id),
            Some(&second.id),
            Value::Null
        )
        .await
        .0,
        StatusCode::NOT_FOUND
    );
    assert_eq!(
        request(
            &app,
            "GET",
            &format!("/api/sessions/{}/conversation", session.id),
            Some(&second.id),
            Value::Null
        )
        .await
        .0,
        StatusCode::NOT_FOUND
    );
    assert_eq!(
        request(
            &app,
            "POST",
            "/api/sessions",
            Some(&second.id),
            json!({"projectId":first.id})
        )
        .await
        .0,
        StatusCode::NOT_FOUND
    );
    let (status, run) = request(
        &app,
        "POST",
        &format!("/api/workflows/{}/run", workflow.id),
        Some(&first.id),
        json!({"inputs":{"message":"manual"}}),
    )
    .await;
    assert_eq!(status, StatusCode::OK);
    assert!(run["sessionId"].is_null());
    assert_eq!(
        request(
            &app,
            "GET",
            &format!("/api/runs/{}", run["id"].as_str().unwrap()),
            Some(&second.id),
            Value::Null
        )
        .await
        .0,
        StatusCode::NOT_FOUND
    );
    let (_, second_data) =
        request(&app, "GET", "/api/bootstrap", Some(&second.id), Value::Null).await;
    assert_eq!(second_data["workflows"], json!([]));
    assert_eq!(second_data["sessions"], json!([]));
    assert_eq!(second_data["runs"], json!([]));
    let (_, mcp) = request(&app, "POST", "/mcp", None, json!({"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"inspect_workflow","arguments":{"projectId":second.id,"arguments":{"workflowId":workflow.id}}}})).await;
    assert_eq!(mcp["result"]["isError"], true);
}

#[tokio::test]
async fn project_files_reopen_independently_of_the_application_registry() {
    let app_data = tempfile::tempdir().unwrap();
    let other_app_data = tempfile::tempdir().unwrap();
    let engineering = tempfile::tempdir().unwrap();
    let registry = Registry::open(app_data.path()).await.unwrap();
    let project = registry
        .create(
            "Portable project",
            Some(engineering.path().to_str().unwrap()),
        )
        .await
        .unwrap();
    let store = registry.resolve(&project.id).await.unwrap();
    let workflow = store
        .create_workflow(&project.id, "Original", starter_schema())
        .await
        .unwrap();
    let session = store
        .create_session(&project.id, "Preserved session")
        .await
        .unwrap();
    let path = engineering
        .path()
        .join("workflows")
        .join(&workflow.id)
        .join("workflow.json");
    let mut document: Value =
        serde_json::from_slice(&tokio::fs::read(&path).await.unwrap()).unwrap();
    document["name"] = json!("File is authoritative");
    tokio::fs::write(&path, serde_json::to_vec(&document).unwrap())
        .await
        .unwrap();
    assert_eq!(
        store.workflow(&workflow.id).await.unwrap().name,
        "File is authoritative"
    );
    drop(registry);
    let reopened = Registry::open(other_app_data.path()).await.unwrap();
    let same = reopened
        .open_project(engineering.path().to_str().unwrap())
        .await
        .unwrap();
    assert_eq!(same.id, project.id);
    let store = reopened.resolve(&same.id).await.unwrap();
    assert_eq!(
        store.workflows().await.unwrap()[0].name,
        "File is authoritative"
    );
    assert_eq!(
        store.session(&session.id).await.unwrap().title,
        "Preserved session"
    );
    assert!(engineering.path().join(".flowgram/state.sqlite").exists());
    assert!(engineering.path().join("flowgram.project.json").exists());
}

#[tokio::test]
async fn obsolete_prototype_data_is_removed_without_touching_model_connections() {
    let directory = tempfile::tempdir().unwrap();
    let config =
        json!({"baseUrl":"http://127.0.0.1:9876","model":"test-model","apiKey":"test-secret"});
    let bytes = serde_json::to_vec(&config).unwrap();
    tokio::fs::write(directory.path().join("model.json"), &bytes)
        .await
        .unwrap();
    for name in [
        "flowgram.sqlite",
        "flowgram.sqlite-wal",
        "flowgram.sqlite-shm",
    ] {
        tokio::fs::write(directory.path().join(name), b"obsolete")
            .await
            .unwrap();
    }
    let registry = Registry::open(directory.path()).await.unwrap();
    assert!(registry.projects().await.is_empty());
    assert!(!directory.path().join("flowgram.sqlite").exists());
    assert_eq!(
        tokio::fs::read(directory.path().join("model.json"))
            .await
            .unwrap(),
        bytes
    );
    assert_eq!(registry.model.lock().await.api_key, "test-secret");
}

#[tokio::test]
async fn resource_import_is_project_scoped_and_rejects_path_traversal_and_overwrites() {
    let directory = tempfile::tempdir().unwrap();
    let registry = Registry::open(directory.path()).await.unwrap();
    let first = registry.create("First", None).await.unwrap();
    let second = registry.create("Second", None).await.unwrap();
    let app = registry::router(registry, "test-token".into());
    let body = json!({"name":"sample.txt","contentBase64":"aGVsbG8="});
    assert_eq!(
        request(
            &app,
            "POST",
            "/api/resources",
            Some(&first.id),
            body.clone()
        )
        .await
        .0,
        StatusCode::OK
    );
    assert_eq!(
        request(&app, "POST", "/api/resources", Some(&first.id), body)
            .await
            .0,
        StatusCode::BAD_REQUEST
    );
    assert_eq!(
        request(
            &app,
            "POST",
            "/api/resources",
            Some(&first.id),
            json!({"name":"../outside.txt","contentBase64":""})
        )
        .await
        .0,
        StatusCode::BAD_REQUEST
    );
    assert_eq!(
        request(&app, "GET", "/api/resources", Some(&second.id), Value::Null)
            .await
            .1,
        json!([])
    );
}

#[tokio::test]
async fn failed_project_open_does_not_publish_or_replace_a_registry_entry() {
    let first_data = tempfile::tempdir().unwrap();
    let second_data = tempfile::tempdir().unwrap();
    let first = Registry::open(first_data.path()).await.unwrap();
    let locked = first.create("Locked project", None).await.unwrap();
    let second = Registry::open(second_data.path()).await.unwrap();
    let current = second.create("Current project", None).await.unwrap();
    let before = tokio::fs::read(second_data.path().join("projects.json"))
        .await
        .unwrap();
    let error = second.open_project(&locked.directory).await.unwrap_err();
    assert!(error.to_string().contains("Locked project"));
    assert_eq!(second.projects().await.len(), 1);
    assert_eq!(second.projects().await[0].id, current.id);
    assert_eq!(
        tokio::fs::read(second_data.path().join("projects.json"))
            .await
            .unwrap(),
        before
    );
    let empty = tempfile::tempdir().unwrap();
    assert!(
        second
            .open_project(empty.path().to_str().unwrap())
            .await
            .unwrap_err()
            .to_string()
            .contains("flowgram.project.json")
    );
    drop(first);
    assert_eq!(
        second.open_project(&locked.directory).await.unwrap().id,
        locked.id
    );
}
