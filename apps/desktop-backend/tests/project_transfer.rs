use axum::{
    body::{Body, to_bytes},
    http::{Request, StatusCode},
};
use base64::{Engine, engine::general_purpose::STANDARD};
use flowgram_desktop_backend::{
    project_transfer::{self, Package, Resource},
    registry::{self, Registry},
    store::{id, now, starter_schema},
};
use serde_json::{Value, json};
use tower::ServiceExt;

async fn request(app: &axum::Router, path: &str, body: Value) -> (StatusCode, Value) {
    let response = app
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(path)
                .header("authorization", "Bearer test-token")
                .header("content-type", "application/json")
                .body(Body::from(body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    let status = response.status();
    let bytes = to_bytes(response.into_body(), 70 * 1024 * 1024)
        .await
        .unwrap();
    (status, serde_json::from_slice(&bytes).unwrap_or_default())
}

#[tokio::test]
async fn full_round_trip_preserves_project_content_and_history_without_replaying_work() {
    let directory = tempfile::tempdir().unwrap();
    let registry = Registry::open(directory.path()).await.unwrap();
    let source = registry.create("采购对账", None).await.unwrap();
    let store = registry.resolve(&source.id).await.unwrap();
    let child = store
        .create_workflow(&source.id, "Child", starter_schema())
        .await
        .unwrap();
    let mut schema = starter_schema();
    schema["nodes"].as_array_mut().unwrap().push(json!({"id":"child-call","type":"subworkflow","data":{"inputsValues":{"workflowId":{"type":"constant","content":child.id}}}}));
    let root = store
        .create_workflow(&source.id, "Parent", schema.clone())
        .await
        .unwrap();
    let session = store.create_session(&source.id, "会话记录").await.unwrap();
    let run = store
        .start_run(
            &child.id,
            Some(session.id.clone()),
            json!({"message":"historical"}),
        )
        .await
        .unwrap();
    for _ in 0..200 {
        if store.run(&run.id).await.unwrap().status != "running" {
            break;
        }
        tokio::time::sleep(std::time::Duration::from_millis(5)).await;
    }
    assert_eq!(store.run(&run.id).await.unwrap().status, "succeeded");
    let input = flowgram_desktop_backend::conversation::ConversationInput {
        id: id(),
        client_input_id: id(),
        session_id: session.id.clone(),
        content: "Do not run automatically".into(),
        references: Value::Null,
        model: None,
        delivery_mode: "queue".into(),
        turn_id: None,
        status: "queued".into(),
        revision: 1,
        created_at: now(),
        error: None,
    };
    sqlx::query("INSERT INTO conversation_inputs(id,session_id,client_input_id,status,turn_id,delivery_mode,data) VALUES(?,?,?,'queued',NULL,'queue',?)")
        .bind(&input.id).bind(&input.session_id).bind(&input.client_input_id).bind(serde_json::to_string(&input).unwrap()).execute(&store.db).await.unwrap();
    let turn = id();
    let item = id();
    let turn_data = json!({"id":turn,"sessionId":session.id,"initiatingInputId":input.id,"status":"running","phase":"tools","revision":1,"ordinal":1,"startedAt":now(),"endedAt":null,"finalItemId":null,"error":null});
    sqlx::query("INSERT INTO conversation_turns(ordinal,id,session_id,status,data) VALUES(1,?,?,'running',?)").bind(&turn).bind(&session.id).bind(turn_data.to_string()).execute(&store.db).await.unwrap();
    let item_data = json!({"id":item,"sessionId":session.id,"turnId":turn,"ordinal":1,"kind":"tool","status":"running","phase":"tools","content":"","payload":{"toolName":"inspect_workflow","arguments":{"workflowId":root.id}},"revision":1,"createdAt":now(),"updatedAt":now()});
    sqlx::query("INSERT INTO conversation_items VALUES(?,?,1,?)")
        .bind(&item)
        .bind(&turn)
        .bind(item_data.to_string())
        .execute(&store.db)
        .await
        .unwrap();
    let root_path = std::path::Path::new(&source.directory);
    tokio::fs::create_dir_all(root_path.join("assets/样本"))
        .await
        .unwrap();
    tokio::fs::write(root_path.join("assets/样本/data.bin"), [0, 255, 1, 128])
        .await
        .unwrap();
    tokio::fs::write(root_path.join("config/业务.json"), "{\"currency\":\"CNY\"}")
        .await
        .unwrap();
    tokio::fs::write(
        directory.path().join("model.json"),
        br#"{"baseUrl":"","model":"","apiKey":"global-secret-do-not-export"}"#,
    )
    .await
    .unwrap();
    let package = project_transfer::export_project(&store, true)
        .await
        .unwrap();
    assert_eq!(package.files.len(), 2);
    assert!(
        !serde_json::to_string(&package)
            .unwrap()
            .contains("global-secret-do-not-export")
    );
    assert_eq!(
        store.turn(&turn).await.unwrap().status,
        "running",
        "export must not mutate source history"
    );
    let destination = tempfile::tempdir().unwrap();
    let imported = project_transfer::import_project(
        &registry,
        package,
        Some("Independent copy"),
        Some(destination.path().to_str().unwrap()),
    )
    .await
    .unwrap();
    assert_ne!(source.id, imported.id);
    assert!(
        std::path::Path::new(&imported.directory)
            .starts_with(destination.path().canonicalize().unwrap())
    );
    let copied = registry.resolve(&imported.id).await.unwrap();
    assert_eq!(copied.workflows().await.unwrap().len(), 2);
    assert_eq!(copied.workflow(&root.id).await.unwrap().schema, schema);
    assert_eq!(
        copied.workflow(&root.id).await.unwrap().project_id,
        imported.id
    );
    assert_eq!(
        copied.session(&session.id).await.unwrap().project_id,
        imported.id
    );
    assert_eq!(
        copied.run(&run.id).await.unwrap().outputs,
        store.run(&run.id).await.unwrap().outputs
    );
    let history = copied.conversation(&session.id, None).await.unwrap();
    assert_eq!(history["paused"], true);
    assert_eq!(history["turns"][0]["status"], "interrupted");
    assert_eq!(history["items"][0]["status"], "uncertain");
    assert_eq!(history["inputs"][0]["status"], "queued");
    copied.resume_conversations().await.unwrap();
    tokio::task::yield_now().await;
    assert_eq!(
        copied.conversation(&session.id, None).await.unwrap()["turns"]
            .as_array()
            .unwrap()
            .len(),
        1
    );
    assert_eq!(
        tokio::fs::read(std::path::Path::new(&imported.directory).join("assets/样本/data.bin"))
            .await
            .unwrap(),
        [0, 255, 1, 128]
    );
    assert_eq!(copied.projects().await.unwrap().len(), 1);
    let reexport = project_transfer::export_project(&copied, true)
        .await
        .unwrap();
    assert_eq!(reexport.source_project_id, imported.id);
    assert!(reexport.validate().is_ok());
}

#[tokio::test]
async fn source_only_packages_can_be_imported_repeatedly_and_routes_allow_large_resources() {
    let directory = tempfile::tempdir().unwrap();
    let registry = Registry::open(directory.path()).await.unwrap();
    let project = registry.create("Source", None).await.unwrap();
    let store = registry.resolve(&project.id).await.unwrap();
    store
        .create_workflow(&project.id, "Echo", starter_schema())
        .await
        .unwrap();
    store
        .create_session(&project.id, "Local only")
        .await
        .unwrap();
    let app = registry::router(registry.clone(), "test-token".into());
    let (status, value) = request(
        &app,
        &format!("/api/projects/{}/export", project.id),
        json!({"includeHistory":false}),
    )
    .await;
    assert_eq!(status, StatusCode::OK);
    assert!(value["history"].is_null());
    let mut package: Package = serde_json::from_value(value).unwrap();
    package.files.push(Resource {
        path: "assets/large.bin".into(),
        content_base64: STANDARD.encode(vec![7; 7 * 1024 * 1024]),
    });
    for name in ["Copy one", "Copy two"] {
        let (status, value) = request(
            &app,
            "/api/projects/import",
            json!({"package":package,"name":name}),
        )
        .await;
        assert_eq!(status, StatusCode::OK, "{value}");
        let copied = registry
            .resolve(value["id"].as_str().unwrap())
            .await
            .unwrap();
        assert!(copied.sessions().await.unwrap().is_empty());
        assert_eq!(copied.workflows().await.unwrap().len(), 1);
    }
    assert_eq!(registry.projects().await.len(), 3);
}

#[tokio::test]
async fn malformed_packages_and_history_roll_back_without_touching_existing_projects() {
    let directory = tempfile::tempdir().unwrap();
    let registry = Registry::open(directory.path()).await.unwrap();
    let project = registry.create("Existing", None).await.unwrap();
    let store = registry.resolve(&project.id).await.unwrap();
    let workflow = store
        .create_workflow(&project.id, "Keep me", starter_schema())
        .await
        .unwrap();
    let package = project_transfer::export_project(&store, true)
        .await
        .unwrap();
    let app = registry::router(registry.clone(), "test-token".into());
    let target = tempfile::tempdir().unwrap();
    for path in [
        "../outside",
        "/tmp/outside",
        "assets/../../outside",
        "assets/../outside",
        "assets\\outside",
        "config/C:/outside",
        "assets//file",
        "assets/./file",
    ] {
        let mut bad = package.clone();
        bad.files.push(Resource {
            path: path.into(),
            content_base64: STANDARD.encode(b"bad"),
        });
        let (status, _) = request(
            &app,
            "/api/projects/import",
            json!({"package":bad,"directory":target.path()}),
        )
        .await;
        assert_eq!(status, StatusCode::BAD_REQUEST, "{path}");
    }
    let mut bad = package.clone();
    bad.history
        .as_mut()
        .unwrap()
        .get_mut("runs")
        .unwrap()
        .push(vec![
            json!(id()),
            json!(workflow.id),
            json!("missing-session"),
            json!("succeeded"),
            json!("{}"),
            json!("{}"),
            Value::Null,
            json!(1),
            json!(now()),
        ]);
    let (status, _) = request(
        &app,
        "/api/projects/import",
        json!({"package":bad,"directory":target.path()}),
    )
    .await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
    assert_eq!(
        std::fs::read_dir(target.path()).unwrap().count(),
        0,
        "failed imports must remove all staging files"
    );
    let mut duplicate = package.clone();
    duplicate.workflows.push(duplicate.workflows[0].clone());
    assert!(duplicate.validate().is_err());
    let mut unsupported = package.clone();
    unsupported.format_version = 99;
    assert!(unsupported.validate().is_err());
    let mut authority = package;
    authority
        .history
        .as_mut()
        .unwrap()
        .insert("service_consumers".into(), vec![]);
    assert!(authority.validate().is_err());
    assert_eq!(registry.projects().await.len(), 1);
    assert_eq!(store.workflow(&workflow.id).await.unwrap().name, "Keep me");
}

#[tokio::test]
async fn export_save_requires_authentication_and_never_writes_into_an_open_project() {
    let directory = tempfile::tempdir().unwrap();
    let registry = Registry::open(directory.path()).await.unwrap();
    let project = registry.create("Source", None).await.unwrap();
    let app = registry::router(registry, "test-token".into());
    let route = format!("/api/projects/{}/export", project.id);
    let response = app
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(&route)
                .header("content-type", "application/json")
                .body(Body::from("{}"))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), StatusCode::UNAUTHORIZED);
    let saved = directory.path().join("source.flowgram.json");
    assert_eq!(
        request(&app, &route, json!({"destination":saved})).await.0,
        StatusCode::OK
    );
    let package: Package = serde_json::from_slice(&tokio::fs::read(saved).await.unwrap()).unwrap();
    assert_eq!(package.name, "Source");
    assert_eq!(
        request(
            &app,
            &route,
            json!({"destination":format!("{}/bad.flowgram.json",project.directory)})
        )
        .await
        .0,
        StatusCode::BAD_REQUEST
    );
}

#[cfg(unix)]
#[tokio::test]
async fn export_rejects_symlinked_resources() {
    let directory = tempfile::tempdir().unwrap();
    let registry = Registry::open(directory.path()).await.unwrap();
    let project = registry.create("Source", None).await.unwrap();
    let store = registry.resolve(&project.id).await.unwrap();
    std::os::unix::fs::symlink(
        directory.path(),
        std::path::Path::new(&project.directory).join("assets/outside"),
    )
    .unwrap();
    assert!(
        project_transfer::export_project(&store, false)
            .await
            .unwrap_err()
            .to_string()
            .contains("symbolic links")
    );
}

#[tokio::test]
async fn tool_receipts_snapshots_and_undo_survive_project_transfer() {
    let directory = tempfile::tempdir().unwrap();
    let registry = Registry::open(directory.path()).await.unwrap();
    let source = registry.create("Tool source", None).await.unwrap();
    let store = registry.resolve(&source.id).await.unwrap();
    let created = store
        .tool(
            &source.id,
            None,
            "create_workflow",
            json!({"name":"Portable","mutationId":"create"}),
        )
        .await
        .unwrap();
    let id = created["context"]["workflowId"].as_str().unwrap();
    let args = json!({"workflowId":id,"expectedRevision":1,"mutationId":"title","operations":[{"op":"update_node","nodeId":"start","set":{"/description":"Portable description"}}]});
    let receipt = store
        .tool(&source.id, None, "edit_workflow", args.clone())
        .await
        .unwrap();
    let snapshot = store
        .tool(&source.id, None, "read_workflow", json!({"workflowId":id}))
        .await
        .unwrap();
    let run = store
        .tool(
            &source.id,
            None,
            "run_workflow",
            json!({"workflowId":id,"expectedRevision":2,"mutationId":"run","inputs":{}}),
        )
        .await
        .unwrap();
    let package = project_transfer::export_project(&store, true)
        .await
        .unwrap();
    let imported = project_transfer::import_project(&registry, package, Some("Tool copy"), None)
        .await
        .unwrap();
    let copy = registry.resolve(&imported.id).await.unwrap();
    let diff = copy
        .tool(
            &imported.id,
            None,
            "read_tool_result",
            json!({"resultId":receipt["data"]["diffRef"]["resultId"],"path":"/patch"}),
        )
        .await
        .unwrap();
    assert_eq!(diff["data"]["items"][0]["after"], "Portable description");
    let pinned = copy
        .tool(
            &imported.id,
            None,
            "read_workflow",
            json!({"workflowId":id,"snapshotId":snapshot["context"]["snapshotId"]}),
        )
        .await
        .unwrap();
    assert_eq!(pinned["context"]["projectId"], imported.id);
    let historical = copy
        .tool(
            &imported.id,
            None,
            "read_run",
            json!({"runId":run["data"]["runId"]}),
        )
        .await
        .unwrap();
    assert_eq!(historical["context"]["projectId"], imported.id);
    let retried = copy
        .tool(&imported.id, None, "edit_workflow", args)
        .await
        .unwrap();
    assert_eq!(retried["data"]["changeId"], receipt["data"]["changeId"]);
    assert_eq!(retried["context"]["projectId"], imported.id);
    copy.tool(&imported.id,None,"revert_workflow_change",json!({"workflowId":id,"changeId":receipt["data"]["changeId"],"expectedRevision":2,"mutationId":"undo"})).await.unwrap();
    assert!(
        copy.workflow(id).await.unwrap().schema["nodes"][0]["data"]
            .get("description")
            .is_none()
    );
}
