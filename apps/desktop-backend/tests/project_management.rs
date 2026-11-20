use axum::{
    body::{Body, to_bytes},
    http::{Request, StatusCode},
};
use flowgram_desktop_backend::{
    project::{atomic_json, read_project},
    registry::{self, Registry},
    store::{id, starter_schema},
};
use serde_json::{Value, json};
use tower::ServiceExt;
async fn request(app: &axum::Router, method: &str, path: &str, body: Value) -> (StatusCode, Value) {
    let response = app
        .clone()
        .oneshot(
            Request::builder()
                .method(method)
                .uri(path)
                .header("authorization", "Bearer test-token")
                .header("content-type", "application/json")
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
async fn project_row_actions_do_not_require_switching_and_rename_preserves_identity_and_files() {
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let first = registry.create("Current", None).await.unwrap();
    let second = registry.create("Original", None).await.unwrap();
    let store = registry.resolve(&second.id).await.unwrap();
    let workflow = store
        .create_workflow(&second.id, "Keep workflow", starter_schema())
        .await
        .unwrap();
    let session = store.create_session(&second.id, "Keep chat").await.unwrap();
    let app = registry::router(registry.clone(), "test-token".into());
    let path = format!("/api/projects/{}", second.id);
    let (status, details) = request(&app, "GET", &path, Value::Null).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(details["counts"]["workflows"], 1);
    assert_eq!(details["counts"]["sessions"], 1);
    let (status, renamed) = request(
        &app,
        "PUT",
        &path,
        json!({"name":"新项目名称","expectedName":"Original"}),
    )
    .await;
    assert_eq!(status, StatusCode::OK, "{renamed}");
    assert_eq!(renamed["id"], second.id);
    assert_eq!(renamed["directory"], second.directory);
    assert_eq!(
        read_project(&store.project_root).await.unwrap().name,
        "新项目名称"
    );
    assert_eq!(store.projects().await.unwrap()[0].name, "新项目名称");
    assert_eq!(
        store.workflow(&workflow.id).await.unwrap().schema,
        workflow.schema
    );
    assert_eq!(
        store.session(&session.id).await.unwrap().title,
        session.title
    );
    assert_eq!(
        registry
            .projects()
            .await
            .iter()
            .find(|p| p.id == first.id)
            .unwrap()
            .name,
        "Current"
    );
    assert_eq!(
        request(
            &app,
            "PUT",
            &path,
            json!({"name":"Stale overwrite","expectedName":"Original"})
        )
        .await
        .0,
        StatusCode::BAD_REQUEST
    );
    assert_eq!(
        request(
            &app,
            "PUT",
            &path,
            json!({"name":" ","expectedName":"新项目名称"})
        )
        .await
        .0,
        StatusCode::BAD_REQUEST
    );
    store.closed.cancel();
    store.db.close().await;
    drop(store);
    drop(app);
    drop(registry);
    let reopened = Registry::open(dir.path()).await.unwrap();
    assert_eq!(
        reopened
            .projects()
            .await
            .iter()
            .find(|p| p.id == second.id)
            .unwrap()
            .name,
        "新项目名称"
    );
}
#[tokio::test]
async fn deletion_requires_exact_full_name_and_removes_only_the_target_project() {
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let keep = registry.create("Keep", None).await.unwrap();
    let project = registry.create("订单 自动化", None).await.unwrap();
    let store = registry.resolve(&project.id).await.unwrap();
    store
        .create_workflow(&project.id, "Workflow", starter_schema())
        .await
        .unwrap();
    store.create_session(&project.id, "Chat").await.unwrap();
    tokio::fs::write(
        store.project_root.join("assets/private.txt"),
        "delete project content",
    )
    .await
    .unwrap();
    let model = br#"{"baseUrl":"","model":"","apiKey":"preserved-global-model"}"#;
    tokio::fs::write(dir.path().join("model.json"), model)
        .await
        .unwrap();
    registry.deployment_settings.save_credential("shared",serde_json::from_value(json!({"name":"Shared","purpose":"connection","projectIds":[project.id,keep.id],"value":"preserved-global-secret"})).unwrap()).await.unwrap();
    let app = registry::router(registry.clone(), "test-token".into());
    let path = format!("/api/projects/{}", project.id);
    for name in ["", "订单", "订单自动化", "订单 自动化 ", " 订单 自动化"] {
        assert_eq!(
            request(&app, "DELETE", &path, json!({"confirmationName":name}))
                .await
                .0,
            StatusCode::BAD_REQUEST
        );
        assert!(store.project_root.exists());
        assert_eq!(registry.projects().await.len(), 2);
    }
    let (status, value) = request(
        &app,
        "DELETE",
        &path,
        json!({"confirmationName":project.name}),
    )
    .await;
    assert_eq!(status, StatusCode::OK, "{value}");
    assert!(!store.project_root.exists());
    assert!(store.closed.is_cancelled());
    assert!(registry.resolve(&project.id).await.is_err());
    assert_eq!(registry.projects().await.len(), 1);
    assert!(std::path::Path::new(&keep.directory).exists());
    assert!(
        store
            .create_workflow(&project.id, "Must not resurrect", starter_schema())
            .await
            .is_err()
    );
    assert!(store.workflows().await.is_err());
    assert!(!store.project_root.exists());
    assert_eq!(
        tokio::fs::read(dir.path().join("model.json"))
            .await
            .unwrap(),
        model
    );
    assert_eq!(
        registry
            .deployment_settings
            .secret("shared", Some(&keep.id), "connection")
            .await
            .unwrap(),
        "preserved-global-secret"
    );
    assert!(
        registry
            .deployment_settings
            .secret("shared", Some(&project.id), "connection")
            .await
            .is_err()
    );
    assert_eq!(
        std::fs::read_dir(dir.path().join("project-deletions"))
            .unwrap()
            .count(),
        0
    );
    drop(store);
    drop(app);
    drop(registry);
    let reopened = Registry::open(dir.path()).await.unwrap();
    assert_eq!(reopened.projects().await[0].id, keep.id);
}
#[tokio::test]
async fn project_deletion_blocks_active_runs_enabled_deployments_and_nested_projects() {
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let project = registry.create("Busy", None).await.unwrap();
    let store = registry.resolve(&project.id).await.unwrap();
    let workflow=store.create_workflow(&project.id,"Wait",json!({"nodes":[{"id":"in","type":"start"},{"id":"wait","type":"delay","data":{"inputsValues":{"durationMs":{"type":"constant","content":30000}}}},{"id":"out","type":"end"}],"edges":[{"sourceNodeID":"in","targetNodeID":"wait"},{"sourceNodeID":"wait","targetNodeID":"out"}]})).await.unwrap();
    let run = store
        .start_run(&workflow.id, None, json!({}))
        .await
        .unwrap();
    assert!(
        registry
            .delete_project(&project.id, &project.name)
            .await
            .unwrap_err()
            .to_string()
            .contains("active")
    );
    store.active.lock().await.get(&run.id).unwrap().cancel();
    for _ in 0..200 {
        if store.run(&run.id).await.unwrap().status != "running" {
            break;
        }
        tokio::time::sleep(std::time::Duration::from_millis(5)).await;
    }
    sqlx::query("INSERT INTO service_deployments VALUES('test','production',?)")
        .bind(json!({"enabled":true}).to_string())
        .execute(&store.db)
        .await
        .unwrap();
    assert!(
        registry
            .delete_project(&project.id, &project.name)
            .await
            .unwrap_err()
            .to_string()
            .contains("deployments")
    );
    sqlx::query("DELETE FROM service_deployments")
        .execute(&store.db)
        .await
        .unwrap();
    let child = registry
        .create(
            "Nested",
            Some(store.project_root.join("nested").to_str().unwrap()),
        )
        .await
        .unwrap();
    assert!(
        registry
            .delete_project(&project.id, &project.name)
            .await
            .unwrap_err()
            .to_string()
            .contains("another project")
    );
    assert!(std::path::Path::new(&child.directory).exists());
}
#[tokio::test]
async fn failed_registry_write_rolls_back_rename_and_project_directory_deletion() {
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let project = registry.create("Original", None).await.unwrap();
    let store = registry.resolve(&project.id).await.unwrap();
    let workflow = store
        .create_workflow(&project.id, "Keep", starter_schema())
        .await
        .unwrap();
    tokio::fs::remove_file(dir.path().join("projects.json"))
        .await
        .unwrap();
    tokio::fs::create_dir(dir.path().join("projects.json"))
        .await
        .unwrap();
    assert!(
        registry
            .rename(&project.id, "Changed", &project.name)
            .await
            .is_err()
    );
    assert_eq!(
        read_project(&store.project_root).await.unwrap().name,
        "Original"
    );
    assert_eq!(store.projects().await.unwrap()[0].name, "Original");
    assert!(
        registry
            .delete_project(&project.id, &project.name)
            .await
            .is_err()
    );
    assert!(store.project_root.exists());
    let reopened = registry.resolve(&project.id).await.unwrap();
    assert!(!reopened.closed.is_cancelled());
    assert_eq!(reopened.workflow(&workflow.id).await.unwrap().name, "Keep");
    assert_eq!(registry.projects().await.len(), 1);
}
#[tokio::test]
async fn interrupted_project_deletion_recovers_before_any_project_workers_start() {
    for committed in [false, true] {
        let dir = tempfile::tempdir().unwrap();
        let registry = Registry::open(dir.path()).await.unwrap();
        let project = registry.create("Recover", None).await.unwrap();
        let store = registry.resolve(&project.id).await.unwrap();
        store
            .create_workflow(&project.id, "Workflow", starter_schema())
            .await
            .unwrap();
        let root = store.project_root.clone();
        let staged =
            root.parent()
                .unwrap()
                .join(format!(".flowgram-delete-{}-{}", project.id, id()));
        let journal = dir.path().join("project-deletions");
        tokio::fs::create_dir(&journal).await.unwrap();
        atomic_json(
            &journal.join(format!("{}.json", project.id)),
            &json!({"project":project,"staged":staged}),
        )
        .await
        .unwrap();
        store.closed.cancel();
        store.db.close().await;
        drop(store);
        drop(registry);
        flowgram_desktop_backend::project::rename_directory(&root, &staged)
            .await
            .unwrap();
        if committed {
            atomic_json(&dir.path().join("projects.json"), &Vec::<Value>::new())
                .await
                .unwrap();
        }
        let reopened = Registry::open(dir.path()).await.unwrap();
        assert!(!staged.exists());
        assert_eq!(root.exists(), !committed);
        assert_eq!(reopened.projects().await.len(), usize::from(!committed));
        assert_eq!(std::fs::read_dir(journal).unwrap().count(), 0);
    }
}

#[tokio::test]
async fn desktop_project_deletion_passes_preflight_but_still_requires_authorization() {
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let keep = registry.create("Keep", None).await.unwrap();
    let app = registry::router(registry.clone(), "test-token".into());
    for origin in [
        "tauri://localhost",
        "http://tauri.localhost",
        "https://tauri.localhost",
        "http://127.0.0.1:1420",
    ] {
        let project = registry
            .create("Disposable deletion test", None)
            .await
            .unwrap();
        let path = format!("/api/projects/{}", project.id);
        let preflight = app
            .clone()
            .oneshot(
                Request::builder()
                    .method("OPTIONS")
                    .uri(&path)
                    .header("origin", origin)
                    .header("access-control-request-method", "DELETE")
                    .header(
                        "access-control-request-headers",
                        "authorization,content-type",
                    )
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap();
        assert!(preflight.status().is_success());
        assert_eq!(preflight.headers()["access-control-allow-origin"], origin);
        assert!(
            preflight.headers()["access-control-allow-methods"]
                .to_str()
                .unwrap()
                .split(',')
                .any(|method| method.trim() == "DELETE"),
            "Desktop DELETE is blocked by preflight: {:?}",
            preflight.headers()
        );
        let unauthorized = app
            .clone()
            .oneshot(
                Request::builder()
                    .method("DELETE")
                    .uri(&path)
                    .header("origin", origin)
                    .header("content-type", "application/json")
                    .body(Body::from(
                        json!({"confirmationName":project.name}).to_string(),
                    ))
                    .unwrap(),
            )
            .await
            .unwrap();
        assert_eq!(unauthorized.status(), StatusCode::UNAUTHORIZED);
        assert!(std::path::Path::new(&project.directory).exists());
        let deleted = app
            .clone()
            .oneshot(
                Request::builder()
                    .method("DELETE")
                    .uri(&path)
                    .header("origin", origin)
                    .header("authorization", "Bearer test-token")
                    .header("content-type", "application/json")
                    .body(Body::from(
                        json!({"confirmationName":project.name}).to_string(),
                    ))
                    .unwrap(),
            )
            .await
            .unwrap();
        assert_eq!(deleted.status(), StatusCode::OK);
        assert_eq!(deleted.headers()["access-control-allow-origin"], origin);
        assert!(!std::path::Path::new(&project.directory).exists());
    }
    let denied = app
        .oneshot(
            Request::builder()
                .method("OPTIONS")
                .uri(format!("/api/projects/{}", keep.id))
                .header("origin", "https://untrusted.example")
                .header("access-control-request-method", "DELETE")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert!(!denied.headers().contains_key("access-control-allow-origin"));
    assert_eq!(registry.projects().await[0].id, keep.id);
    assert!(std::path::Path::new(&keep.directory).exists());
}
