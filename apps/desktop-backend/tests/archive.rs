use axum::{
    body::{Body, to_bytes},
    http::{Request, StatusCode},
};
use flowgram_desktop_backend::{
    project_transfer,
    registry::{self, Registry},
    store::{id, now, starter_schema},
};
use serde_json::{Value, json};
use tower::ServiceExt;
async fn request(
    app: &axum::Router,
    method: &str,
    path: &str,
    project: Option<&str>,
) -> (StatusCode, Value) {
    let mut request = Request::builder()
        .method(method)
        .uri(path)
        .header("authorization", "Bearer test-token");
    if let Some(id) = project {
        request = request.header("x-flowgram-project", id);
    }
    let response = app
        .clone()
        .oneshot(request.body(Body::empty()).unwrap())
        .await
        .unwrap();
    let status = response.status();
    let bytes = to_bytes(response.into_body(), 4_000_000).await.unwrap();
    (status, serde_json::from_slice(&bytes).unwrap_or_default())
}
#[tokio::test]
async fn archive_is_project_scoped_hides_objects_and_restore_preserves_identity() {
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let first = registry.create("First", None).await.unwrap();
    let second = registry.create("Second", None).await.unwrap();
    let store = registry.resolve(&first.id).await.unwrap();
    let workflow = store
        .create_workflow(&first.id, "Preserved", starter_schema())
        .await
        .unwrap();
    let session = store
        .create_session(&first.id, "Conversation")
        .await
        .unwrap();
    let app = registry::router(registry.clone(), "test-token".into());
    assert_eq!(
        request(
            &app,
            "POST",
            &format!("/api/workflows/{}/archive", workflow.id),
            Some(&second.id)
        )
        .await
        .0,
        StatusCode::NOT_FOUND
    );
    for (kind, id) in [("workflows", &workflow.id), ("sessions", &session.id)] {
        assert_eq!(
            request(
                &app,
                "POST",
                &format!("/api/{kind}/{id}/archive"),
                Some(&first.id)
            )
            .await
            .0,
            StatusCode::OK
        );
    }
    assert!(store.sessions().await.unwrap().is_empty());
    assert!(store.workflows().await.unwrap().is_empty());
    let list = request(&app, "GET", "/api/archives", None).await;
    assert_eq!(list.1["items"].as_array().unwrap().len(), 2);
    assert_eq!(list.1["projects"].as_array().unwrap().len(), 2);
    assert_eq!(list.1["items"][0]["projectId"], first.id);
    assert!(
        store
            .start_run(&workflow.id, None, json!({}))
            .await
            .unwrap_err()
            .to_string()
            .contains("Restore")
    );
    assert!(
        store
            .save_workflow(
                &workflow.id,
                workflow.revision,
                "Change",
                workflow.schema.clone()
            )
            .await
            .is_err()
    );
    assert!(store.resume_queue(&session.id).await.is_err());
    for (kind, id) in [("workflow", &workflow.id), ("session", &session.id)] {
        assert_eq!(
            request(
                &app,
                "POST",
                &format!("/api/archives/{kind}/{id}/restore"),
                Some(&first.id)
            )
            .await
            .0,
            StatusCode::OK
        );
    }
    assert_eq!(store.workflows().await.unwrap()[0].id, workflow.id);
    assert_eq!(store.sessions().await.unwrap()[0].id, session.id);
    assert_eq!(
        store.conversation(&session.id, None).await.unwrap()["paused"],
        true
    );
}
#[tokio::test]
async fn archive_state_survives_restart_and_full_or_source_only_project_packages() {
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let project = registry.create("Original", None).await.unwrap();
    let store = registry.resolve(&project.id).await.unwrap();
    let workflow = store
        .create_workflow(&project.id, "Workflow", starter_schema())
        .await
        .unwrap();
    let session = store.create_session(&project.id, "Session").await.unwrap();
    store
        .set_archived("workflow", &workflow.id, true)
        .await
        .unwrap();
    store
        .set_archived("session", &session.id, true)
        .await
        .unwrap();
    for include_history in [true, false] {
        let package = project_transfer::export_project(&store, include_history)
            .await
            .unwrap();
        let copy = project_transfer::import_project(&registry, package, None, None)
            .await
            .unwrap();
        let copied = registry.resolve(&copy.id).await.unwrap();
        assert!(copied.workflows().await.unwrap().is_empty());
        assert_eq!(
            copied.archive_records().await.unwrap().len(),
            if include_history { 2 } else { 1 }
        );
        copied
            .set_archived("workflow", &workflow.id, false)
            .await
            .unwrap();
        assert_eq!(copied.workflows().await.unwrap().len(), 1);
    }
    drop(store);
    drop(registry);
    let reopened = Registry::open(dir.path()).await.unwrap();
    let store = reopened.resolve(&project.id).await.unwrap();
    assert_eq!(store.archive_records().await.unwrap().len(), 2);
    assert!(store.workflows().await.unwrap().is_empty());
}
#[tokio::test]
async fn deletion_requires_archive_and_cleans_conversations_without_deleting_business_runs() {
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let project = registry.create("Project", None).await.unwrap();
    let store = registry.resolve(&project.id).await.unwrap();
    let workflow = store
        .create_workflow(&project.id, "Keep workflow", starter_schema())
        .await
        .unwrap();
    let session = store
        .create_session(&project.id, "Delete session")
        .await
        .unwrap();
    assert!(
        store
            .delete_archived("session", &session.id)
            .await
            .unwrap_err()
            .to_string()
            .contains("Only archived")
    );
    let run = store
        .start_run(
            &workflow.id,
            Some(session.id.clone()),
            json!({"message":"Keep result"}),
        )
        .await
        .unwrap();
    for _ in 0..200 {
        if store.run(&run.id).await.unwrap().status != "running" {
            break;
        }
        tokio::time::sleep(std::time::Duration::from_millis(5)).await;
    }
    let input = id();
    let turn = id();
    let item = id();
    let input_data = json!({"id":input,"clientInputId":input,"sessionId":session.id,"content":"private message","references":null,"deliveryMode":"queue","turnId":turn,"status":"accepted","revision":1,"createdAt":now(),"error":null});
    let turn_data = json!({"id":turn,"sessionId":session.id,"initiatingInputId":input,"status":"completed","phase":"completed","revision":1,"ordinal":1,"startedAt":now(),"endedAt":now(),"finalItemId":item,"error":null});
    sqlx::query("INSERT INTO conversation_inputs(id,session_id,client_input_id,status,turn_id,delivery_mode,data) VALUES(?,?,?,'accepted',?,'queue',?)").bind(&input).bind(&session.id).bind(&input).bind(&turn).bind(input_data.to_string()).execute(&store.db).await.unwrap();
    sqlx::query(
        "INSERT INTO conversation_turns(id,session_id,status,data) VALUES(?,?,'completed',?)",
    )
    .bind(&turn)
    .bind(&session.id)
    .bind(turn_data.to_string())
    .execute(&store.db)
    .await
    .unwrap();
    sqlx::query("INSERT INTO conversation_items VALUES(?,?,1,?)").bind(&item).bind(&turn).bind(json!({"id":item,"sessionId":session.id,"turnId":turn,"ordinal":1,"kind":"assistant","status":"completed","phase":"final","content":"private reply","payload":{},"revision":1,"createdAt":now(),"updatedAt":now()}).to_string()).execute(&store.db).await.unwrap();
    sqlx::query("INSERT INTO conversation_runs VALUES(?,?)")
        .bind(&turn)
        .bind(&run.id)
        .execute(&store.db)
        .await
        .unwrap();
    store
        .emit("conversation_turn", &turn, turn_data)
        .await
        .unwrap();
    store
        .set_archived("session", &session.id, true)
        .await
        .unwrap();
    store.delete_archived("session", &session.id).await.unwrap();
    assert!(store.session(&session.id).await.is_err());
    assert!(store.run(&run.id).await.unwrap().session_id.is_none());
    assert!(store.workflow(&workflow.id).await.is_ok());
    for table in [
        "conversation_inputs",
        "conversation_turns",
        "conversation_items",
        "conversation_controls",
        "conversation_runs",
    ] {
        let count: i64 = sqlx::query_scalar(&format!("SELECT count(*) FROM {table}"))
            .fetch_one(&store.db)
            .await
            .unwrap();
        assert_eq!(count, 0);
    }
    store
        .set_archived("workflow", &workflow.id, true)
        .await
        .unwrap();
    store
        .delete_archived("workflow", &workflow.id)
        .await
        .unwrap();
    assert!(store.workflow(&workflow.id).await.is_err());
    assert!(store.run(&run.id).await.is_err());
    assert!(store.workflows().await.unwrap().is_empty());
    assert!(
        !std::path::Path::new(&project.directory)
            .join("workflows")
            .join(&workflow.id)
            .exists()
    );
    assert!(project_transfer::export_project(&store, true).await.is_ok());
}
#[tokio::test]
async fn referenced_workflows_can_be_archived_but_not_deleted_and_still_execute_as_dependencies() {
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let project = registry.create("Project", None).await.unwrap();
    let store = registry.resolve(&project.id).await.unwrap();
    let child = store
        .create_workflow(&project.id, "Child", starter_schema())
        .await
        .unwrap();
    let graph = json!({"nodes":[{"id":"in","type":"start"},{"id":"call","type":"subworkflow","data":{"inputsValues":{"workflowId":{"type":"constant","content":child.id},"inputs":{"type":"constant","content":{"message":"nested"}}}}},{"id":"out","type":"end","data":{"inputsValues":{"result":{"type":"ref","content":["call","message"]}}}}],"edges":[{"sourceNodeID":"in","targetNodeID":"call"},{"sourceNodeID":"call","targetNodeID":"out"}]});
    let parent = store
        .create_workflow(&project.id, "Parent", graph)
        .await
        .unwrap();
    store
        .set_archived("workflow", &child.id, true)
        .await
        .unwrap();
    assert!(
        store
            .delete_archived("workflow", &child.id)
            .await
            .unwrap_err()
            .to_string()
            .contains("Parent")
    );
    let run = store.start_run(&parent.id, None, json!({})).await.unwrap();
    for _ in 0..200 {
        if store.run(&run.id).await.unwrap().status != "running" {
            break;
        }
        tokio::time::sleep(std::time::Duration::from_millis(5)).await;
    }
    assert_eq!(store.run(&run.id).await.unwrap().status, "succeeded");
    store
        .set_archived("workflow", &parent.id, true)
        .await
        .unwrap();
    store.delete_archived("workflow", &parent.id).await.unwrap();
    store.delete_archived("workflow", &child.id).await.unwrap();
}
#[tokio::test]
async fn active_objects_cannot_be_archived_and_queued_work_stays_paused() {
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let project = registry.create("Project", None).await.unwrap();
    let store = registry.resolve(&project.id).await.unwrap();
    let graph = json!({"nodes":[{"id":"in","type":"start"},{"id":"wait","type":"delay","data":{"inputsValues":{"durationMs":{"type":"constant","content":30000}}}},{"id":"out","type":"end"}],"edges":[{"sourceNodeID":"in","targetNodeID":"wait"},{"sourceNodeID":"wait","targetNodeID":"out"}]});
    let workflow = store
        .create_workflow(&project.id, "Running", graph)
        .await
        .unwrap();
    let session = store.create_session(&project.id, "Session").await.unwrap();
    let run = store
        .start_run(&workflow.id, Some(session.id.clone()), json!({}))
        .await
        .unwrap();
    for (kind, id) in [("session", &session.id), ("workflow", &workflow.id)] {
        assert!(
            store
                .set_archived(kind, id, true)
                .await
                .unwrap_err()
                .to_string()
                .contains("active execution")
        );
    }
    store.active.lock().await.get(&run.id).unwrap().cancel();
    for _ in 0..200 {
        if store.run(&run.id).await.unwrap().status != "running" {
            break;
        }
        tokio::time::sleep(std::time::Duration::from_millis(5)).await;
    }
    let input = id();
    let data = json!({"id":input,"clientInputId":input,"sessionId":session.id,"content":"Keep this queued input","references":null,"deliveryMode":"queue","turnId":null,"status":"queued","revision":1,"createdAt":now(),"error":null});
    sqlx::query("INSERT INTO conversation_inputs(id,session_id,client_input_id,status,turn_id,delivery_mode,data) VALUES(?,?,?,'queued',NULL,'queue',?)").bind(&input).bind(&session.id).bind(&input).bind(data.to_string()).execute(&store.db).await.unwrap();
    store
        .set_archived("session", &session.id, true)
        .await
        .unwrap();
    assert_eq!(
        store.conversation(&session.id, None).await.unwrap()["paused"],
        true
    );
    store
        .set_archived("session", &session.id, false)
        .await
        .unwrap();
    assert_eq!(
        store.conversation(&session.id, None).await.unwrap()["paused"],
        true
    );
    store.resume_conversations().await.unwrap();
    tokio::task::yield_now().await;
    let conversation = store.conversation(&session.id, None).await.unwrap();
    assert_eq!(conversation["inputs"][0]["status"], "queued");
    assert_eq!(conversation["turns"], json!([]));
}
#[tokio::test]
async fn publication_references_block_permanent_deletion() {
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let project = registry.create("Project", None).await.unwrap();
    let store = registry.resolve(&project.id).await.unwrap();
    let workflow = store
        .create_workflow(&project.id, "Published", starter_schema())
        .await
        .unwrap();
    sqlx::query("INSERT INTO publications VALUES(?,?,?,?,?,?)")
        .bind(id())
        .bind(&project.id)
        .bind("Draft")
        .bind(json!({"operations":[{"workflowId":workflow.id}]}).to_string())
        .bind(now())
        .bind(now())
        .execute(&store.deployment_settings.db)
        .await
        .unwrap();
    store
        .set_archived("workflow", &workflow.id, true)
        .await
        .unwrap();
    assert!(
        store
            .delete_archived("workflow", &workflow.id)
            .await
            .unwrap_err()
            .to_string()
            .contains("publication draft")
    );
}
#[tokio::test]
async fn interrupted_file_deletion_is_recovered_before_workflow_indexing() {
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let project = registry.create("Project", None).await.unwrap();
    let store = registry.resolve(&project.id).await.unwrap();
    let workflow = store
        .create_workflow(&project.id, "Preserve", starter_schema())
        .await
        .unwrap();
    store
        .set_archived("workflow", &workflow.id, true)
        .await
        .unwrap();
    let root = std::path::Path::new(&project.directory);
    let staged = root
        .join(".flowgram")
        .join(format!("delete-{}", workflow.id));
    tokio::fs::rename(root.join("workflows").join(&workflow.id), &staged)
        .await
        .unwrap();
    drop(store);
    drop(registry);
    let reopened = Registry::open(dir.path()).await.unwrap();
    let store = reopened.resolve(&project.id).await.unwrap();
    assert!(store.workflow(&workflow.id).await.is_ok());
    assert!(!staged.exists());
}
