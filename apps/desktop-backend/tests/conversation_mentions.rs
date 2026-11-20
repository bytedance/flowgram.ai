use axum::{Json, Router, body::Body, response::Response, routing::post};
use flowgram_desktop_backend::{conversation::SendInput, model::ModelConfig, registry::Registry};
use serde_json::{Value, json};
use std::sync::{
    Arc,
    atomic::{AtomicUsize, Ordering},
};
use tokio::sync::{Mutex, Notify};

fn references(content: &str, entries: &[(&str, &str)]) -> Value {
    let mut cursor = 0;
    json!({"workflows":entries.iter().map(|(id,name)| {
        let label=format!("@{name}");let found=content[cursor..].find(&label).unwrap()+cursor;
        let start=content[..found].encode_utf16().count();let end=start+label.encode_utf16().count();cursor=found+label.len();
        json!({"workflowId":id,"name":name,"start":start,"end":end})
    }).collect::<Vec<_>>()})
}
fn input(client: &str, content: &str, refs: Value) -> SendInput {
    SendInput {
        client_input_id: client.into(),
        content: content.into(),
        references: refs,
        delivery_mode: "queue".into(),
        expected_turn_id: None,
        model: None,
    }
}
#[tokio::test]
async fn multiple_mentions_are_project_checked_ordered_and_preserved_through_queue_edits() {
    let calls = Arc::new(AtomicUsize::new(0));
    let gate = Arc::new(Notify::new());
    let hold = gate.clone();
    let counter = calls.clone();
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
    let address = listener.local_addr().unwrap();
    let captured = Arc::new(Mutex::new(Vec::<Value>::new()));
    let recorded = captured.clone();
    let server =
        tokio::spawn(async move {
            let router = Router::new().route("/responses", post(move |Json(body): Json<Value>| {
            let gate = gate.clone();
            let calls = calls.clone();
            let captured = captured.clone();
            async move {
                captured.lock().await.push(body);
                calls.fetch_add(1, Ordering::SeqCst);
                gate.notified().await;
                Response::new(Body::from(format!("data: {}\n\n", json!({
                    "type":"response.completed", "response":{"output":[{
                        "type":"message", "content":[{"type":"output_text", "text":"Done"}]
                    }]}
                }))))
            }
        }));
            axum::serve(listener, router).await.unwrap()
        });
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let project = registry.create("Mentions", None).await.unwrap();
    let other = registry.create("Other", None).await.unwrap();
    let store = registry.resolve(&project.id).await.unwrap();
    store
        .set_model(ModelConfig {
            base_url: format!("http://{address}"),
            model: "test".into(),
            api_key: String::new(),
        })
        .await
        .unwrap();
    let a = store
        .create_workflow(
            &project.id,
            "A 工作流",
            flowgram_desktop_backend::store::starter_schema(),
        )
        .await
        .unwrap();
    let b = store
        .create_workflow(
            &project.id,
            "B 工作流",
            flowgram_desktop_backend::store::starter_schema(),
        )
        .await
        .unwrap();
    let elsewhere = registry.resolve(&other.id).await.unwrap();
    let foreign = elsewhere
        .create_workflow(
            &other.id,
            "Foreign",
            flowgram_desktop_backend::store::starter_schema(),
        )
        .await
        .unwrap();
    let session = store
        .create_session(&project.id, "Mention test")
        .await
        .unwrap();
    let first = format!("先读 @{} 再读 @{}", a.name, b.name);
    store
        .submit_input(
            &session.id,
            input(
                "hold",
                &first,
                references(&first, &[(&a.id, &a.name), (&b.id, &b.name)]),
            ),
        )
        .await
        .unwrap();
    tokio::time::timeout(std::time::Duration::from_secs(3), async {
        while counter.load(Ordering::SeqCst) == 0 {
            tokio::time::sleep(std::time::Duration::from_millis(5)).await;
        }
    })
    .await
    .unwrap();
    let requests = recorded.lock().await;
    let user = requests[0]["input"]
        .as_array()
        .unwrap()
        .iter()
        .find(|item| item["role"] == "user")
        .unwrap()["content"]
        .as_str()
        .unwrap();
    assert!(user.starts_with(&first));
    assert!(user.contains("UTF-16"));
    assert!(user.find(&a.id).unwrap() < user.find(&b.id).unwrap());
    drop(requests);
    let content = " 😀 让 @A 工作流 完成审核，然后接入 @B 工作流 再使用 @A 工作流 ";
    let refs = references(
        content,
        &[(&a.id, &a.name), (&b.id, &b.name), (&a.id, &a.name)],
    );
    let submitted = store
        .submit_input(&session.id, input("mentions", content, refs.clone()))
        .await
        .unwrap();
    assert_eq!(submitted.content, content);
    assert_eq!(submitted.references, refs);
    let retry = store
        .submit_input(&session.id, input("mentions", content, refs.clone()))
        .await
        .unwrap();
    assert_eq!(submitted.id, retry.id);
    let changed = "先用 @B 工作流 ，再用 @A 工作流";
    let new_refs = references(changed, &[(&b.id, &b.name), (&a.id, &a.name)]);
    let edited = store
        .change_queued_input_with_references(
            &session.id,
            &submitted.id,
            submitted.revision,
            Some(changed),
            Some(new_refs.clone()),
            None,
        )
        .await
        .unwrap();
    assert_eq!(edited.references, new_refs);
    let removed = store
        .change_queued_input_with_references(
            &session.id,
            &submitted.id,
            edited.revision,
            Some(changed),
            Some(Value::Null),
            None,
        )
        .await
        .unwrap();
    assert!(removed.references.is_null());
    let foreign_content = "@Foreign";
    assert!(
        store
            .submit_input(
                &session.id,
                input(
                    "foreign",
                    foreign_content,
                    references(foreign_content, &[(&foreign.id, &foreign.name)])
                )
            )
            .await
            .is_err()
    );
    let mut invalid = refs.clone();
    invalid["workflows"][1]["start"] = json!(0);
    assert!(
        store
            .submit_input(&session.id, input("overlap", content, invalid))
            .await
            .is_err()
    );
    let mut invalid = refs.clone();
    invalid["workflows"][0]["start"] = json!(2);
    invalid["workflows"][0]["end"] = json!(3);
    assert!(
        store
            .submit_input(&session.id, input("surrogate", content, invalid))
            .await
            .is_err()
    );
    let mut invalid = refs.clone();
    invalid["workflows"][0]["name"] = json!("Forged label");
    assert!(
        store
            .submit_input(&session.id, input("label", content, invalid))
            .await
            .is_err()
    );
    let mut invalid = refs.clone();
    invalid["workflows"][0]["workflowId"] = json!("missing-workflow");
    assert!(
        store
            .submit_input(&session.id, input("missing", content, invalid))
            .await
            .is_err()
    );
    let duplicated = json!({"workflows":std::iter::repeat_n(json!({"workflowId":a.id,"name":a.name,"start":0,"end":1}),33).collect::<Vec<_>>()});
    assert!(
        store
            .submit_input(&session.id, input("limit", content, duplicated))
            .await
            .unwrap_err()
            .to_string()
            .contains("32")
    );
    let old = store
        .submit_input(
            &session.id,
            input("legacy", "Inspect", json!({"workflowId":a.id})),
        )
        .await
        .unwrap();
    assert_eq!(old.references["workflowId"], a.id);
    hold.notify_waiters();
    server.abort();
}
