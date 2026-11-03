use axum::{
    Json, Router,
    body::Body,
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::post,
};
use flowgram_desktop_backend::{
    conversation::{SendInput, Turn, TurnOrigin},
    model::ModelConfig,
    store::{Store, id, now},
};
use serde_json::{Value, json};
use std::{
    sync::{
        Arc, Mutex,
        atomic::{AtomicUsize, Ordering},
    },
    time::Duration,
};

fn response(output: Value) -> Response {
    Response::new(Body::from(format!(
        "data: {}\n\n",
        json!({"type":"response.completed","response":{"output":output,"usage":{"input_tokens":1000,"output_tokens":100}}})
    )))
}
fn text(text: &str) -> Response {
    response(
        json!([{"type":"message","role":"assistant","content":[{"type":"output_text","text":text}]}]),
    )
}
fn send(key: &str, content: &str) -> SendInput {
    SendInput {
        client_input_id: key.into(),
        content: content.into(),
        references: Value::Null,
        delivery_mode: "queue".into(),
        expected_turn_id: None,
        model: None,
    }
}
async fn configured(
    app: Router,
) -> (
    tempfile::TempDir,
    Store,
    String,
    tokio::task::JoinHandle<()>,
) {
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
    let session = store
        .create_session(&project.id, "Context integration")
        .await
        .unwrap();
    (dir, store, session.id, server)
}
async fn seed(store: &Store, session: &str) -> String {
    let mut turn = Turn {
        id: id(),
        session_id: session.into(),
        initiating_input_id: id(),
        status: "completed".into(),
        phase: "completed".into(),
        revision: 1,
        ordinal: 0,
        started_at: now(),
        ended_at: Some(now()),
        final_item_id: None,
        origin: TurnOrigin::Agent,
        estimated_duration_ms: None,
        model: None,
        error: None,
    };
    turn.ordinal=sqlx::query_scalar("INSERT INTO conversation_turns(id,session_id,status,data) VALUES(?,?,'completed',?) RETURNING ordinal").bind(&turn.id).bind(session).bind(serde_json::to_string(&turn).unwrap()).fetch_one(&store.db).await.unwrap();
    sqlx::query("UPDATE conversation_turns SET data=? WHERE id=?")
        .bind(serde_json::to_string(&turn).unwrap())
        .bind(&turn.id)
        .execute(&store.db)
        .await
        .unwrap();
    let mut user = store.new_item(&turn.id, "user").await.unwrap();
    user.content =
        "Never publish or run external writes. Keep the original order workflow IDs.".into();
    user.status = "completed".into();
    store.put_item(&mut user).await.unwrap();
    let mut item = store.new_item(&turn.id, "assistant").await.unwrap();
    item.content = "Earlier design notes: preserve auditability and project scope. ".repeat(500);
    item.status = "completed".into();
    item.phase = "final".into();
    store.put_item(&mut item).await.unwrap();
    item.id
}
async fn finished(store: &Store, session: &str, minimum_turns: usize) -> Value {
    tokio::time::timeout(Duration::from_secs(10), async {
        loop {
            let data = store.conversation(session, None).await.unwrap();
            if data["turns"].as_array().unwrap().len() >= minimum_turns
                && data["turns"]
                    .as_array()
                    .unwrap()
                    .last()
                    .is_some_and(|t| t["status"] != "running" && t["status"] != "stopping")
            {
                return data;
            }
            tokio::time::sleep(Duration::from_millis(10)).await;
        }
    })
    .await
    .expect("turn did not finish")
}
#[tokio::test]
async fn provider_overflow_compacts_and_retries_without_replaying_a_mutation_and_survives_restart()
{
    let normal = Arc::new(AtomicUsize::new(0));
    let compact = Arc::new(AtomicUsize::new(0));
    let workflow_id = Arc::new(Mutex::new(String::new()));
    let (seen, summaries, result_id) = (normal.clone(), compact.clone(), workflow_id.clone());
    let app=Router::new().route("/responses",post(move|Json(body):Json<Value>|{let normal=normal.clone();let compact=compact.clone();let workflow_id=workflow_id.clone();async move{
        if body.get("tools").is_none() {
            compact.fetch_add(1,Ordering::SeqCst);let id=workflow_id.lock().unwrap().clone();
            assert!(!id.is_empty());
            if !body["input"].to_string().contains(&id) { return text("Original goal: create one draft, never publish or execute external writes. Preserve auditability and project scope. Earlier design notes have been summarized."); }
            return text(&format!("Original goal: create one draft, never publish or execute external writes. Workflow {id} was successfully created by call create-once; do not create it again. Continue with the latest user request."));
        }
        match normal.fetch_add(1,Ordering::SeqCst) {
            0=>response(json!([{"type":"function_call","id":"provider-create","call_id":"create-once","name":"create_workflow","arguments":"{\"name\":\"Created once\",\"mutationId\":\"create-once\"}"}])),
            1=>{
                let output=body["input"].as_array().unwrap().iter().find(|v|v["type"]=="function_call_output").unwrap();
                let result:Value=serde_json::from_str(output["output"].as_str().unwrap()).unwrap();*workflow_id.lock().unwrap()=result["context"]["workflowId"].as_str().unwrap().into();
                (StatusCode::BAD_REQUEST,Json(json!({"error":{"code":"context_length_exceeded","message":"maximum context length exceeded"}}))).into_response()
            }
            _=>{
                assert!(body["input"].to_string().contains("never publish"));assert!(body["input"].to_string().contains(workflow_id.lock().unwrap().as_str()));
                text("The existing draft is ready; no duplicate action was executed.")
            }
        }
    }}));
    let (dir, store, session, server) = configured(app).await;
    let original = seed(&store, &session).await;
    store
        .submit_input(
            &session,
            send("one", "Create one empty draft, then report its ID"),
        )
        .await
        .unwrap();
    let data = finished(&store, &session, 2).await;
    assert_eq!(
        data["turns"].as_array().unwrap().last().unwrap()["status"],
        "completed",
        "{data}"
    );
    assert_eq!(seen.load(Ordering::SeqCst), 3);
    let compact_requests = summaries.load(Ordering::SeqCst);
    assert!((1..=4).contains(&compact_requests));
    assert_eq!(store.workflows().await.unwrap().len(), 1);
    assert_eq!(data["contextUsage"]["compactions"], 1);
    assert!(
        data["items"]
            .as_array()
            .unwrap()
            .iter()
            .any(|i| i["id"] == original)
    );
    assert!(
        data["items"]
            .as_array()
            .unwrap()
            .iter()
            .any(|i| i["kind"] == "compaction" && i["status"] == "completed")
    );
    let expected = result_id.lock().unwrap().clone();
    store.closed.cancel();
    store.db.close().await;
    drop(store);
    let reopened = Store::open(dir.path()).await.unwrap();
    reopened
        .submit_input(
            &session,
            send("two", "Continue using the draft we already created"),
        )
        .await
        .unwrap();
    let data = finished(&reopened, &session, 3).await;
    assert_eq!(
        data["turns"].as_array().unwrap().last().unwrap()["status"],
        "completed",
        "{data}"
    );
    assert_eq!(summaries.load(Ordering::SeqCst), compact_requests);
    assert_eq!(reopened.workflows().await.unwrap()[0].id, expected);
    assert_eq!(seen.load(Ordering::SeqCst), 4);
    server.abort();
}
#[tokio::test]
async fn non_context_errors_are_not_retried_or_hidden_by_compaction() {
    let calls = Arc::new(AtomicUsize::new(0));
    let seen = calls.clone();
    let app = Router::new().route(
        "/responses",
        post(move || {
            calls.fetch_add(1, Ordering::SeqCst);
            async {
                (
                    StatusCode::TOO_MANY_REQUESTS,
                    Json(json!({"error":{"message":"rate limited"}})),
                )
            }
        }),
    );
    let (_dir, store, session, server) = configured(app).await;
    store
        .submit_input(&session, send("one", "Say hello"))
        .await
        .unwrap();
    let data = finished(&store, &session, 1).await;
    assert_eq!(data["turns"][0]["status"], "failed");
    assert_eq!(seen.load(Ordering::SeqCst), 1);
    assert_eq!(data["contextUsage"]["compactions"], 0);
    server.abort();
}
#[tokio::test]
async fn partial_streams_are_not_retried_as_if_no_output_had_occurred() {
    let calls = Arc::new(AtomicUsize::new(0));
    let seen = calls.clone();
    let app = Router::new().route(
        "/responses",
        post(move || {
            calls.fetch_add(1, Ordering::SeqCst);
            async {
                Response::new(Body::from(format!(
                    "data: {}\n\ndata: {}\n\n",
                    json!({"type":"response.output_text.delta","delta":"Partial answer"}),
                    json!({"type":"error","error":{"code":"context_length_exceeded"}})
                )))
            }
        }),
    );
    let (_dir, store, session, server) = configured(app).await;
    store
        .submit_input(&session, send("one", "Say hello"))
        .await
        .unwrap();
    let data = finished(&store, &session, 1).await;
    assert_eq!(data["turns"][0]["status"], "failed");
    assert_eq!(seen.load(Ordering::SeqCst), 1);
    assert!(
        data["items"]
            .as_array()
            .unwrap()
            .iter()
            .any(|i| i["content"] == "Partial answer")
    );
    server.abort();
}

#[tokio::test]
async fn workflow_agents_compact_between_tool_steps_and_trace_the_summary_request() {
    let normal = Arc::new(AtomicUsize::new(0));
    let summaries = Arc::new(AtomicUsize::new(0));
    let (seen, compacted) = (normal.clone(), summaries.clone());
    let app = Router::new().route("/responses", post(move |Json(body): Json<Value>| {
        let normal = normal.clone();
        let summaries = summaries.clone();
        async move {
            if body.get("tools").is_none() {
                summaries.fetch_add(1, Ordering::SeqCst);
                assert!(body["input"].to_string().contains("read-once"));
                return text("Completed read-once: the project workflow list was inspected. Do not repeat that read. Continue with the original request; no external writes are permitted.");
            }
            if normal.fetch_add(1, Ordering::SeqCst) == 0 {
                return Response::new(Body::from(format!("data: {}\n\n", json!({
                    "type":"response.completed", "response":{
                        "output":[{"type":"function_call","call_id":"read-once","name":"list_workflows","arguments":"{}"}],
                        "usage":{"input_tokens":40000,"output_tokens":100}
                    }
                }))));
            }
            assert!(body["input"].to_string().contains("read-once"));
            assert!(body["input"].to_string().contains("Inspect the workflow list; never publish"));
            text("Inspection completed without external writes")
        }
    }));
    let (_dir, store, _session, server) = configured(app).await;
    let project = store.projects().await.unwrap().remove(0);
    let graph = json!({"nodes":[
        {"id":"start","type":"start"},
        {"id":"inspect","type":"agent","data":{"inputsValues":{
            "prompt":{"type":"constant","content":"Inspect the workflow list; never publish"},
            "maxSteps":{"type":"constant","content":3}
        }}},
        {"id":"end","type":"end","data":{"inputsValues":{"result":{"type":"ref","content":["inspect","result"]}}}}
    ],"edges":[{"sourceNodeID":"start","targetNodeID":"inspect"},{"sourceNodeID":"inspect","targetNodeID":"end"}]});
    let workflow = store
        .create_workflow(&project.id, "Context-aware Agent", graph)
        .await
        .unwrap();
    let run = store
        .start_run(&workflow.id, None, json!({}))
        .await
        .unwrap();
    let result = tokio::time::timeout(Duration::from_secs(10), async {
        loop {
            let run = store.run(&run.id).await.unwrap();
            if run.status != "running" {
                break run;
            }
            tokio::time::sleep(Duration::from_millis(10)).await;
        }
    })
    .await
    .unwrap();
    assert_eq!(result.status, "succeeded", "{:?}", result.error);
    assert_eq!(
        result.outputs,
        json!({"result":"Inspection completed without external writes"})
    );
    assert_eq!(seen.load(Ordering::SeqCst), 2);
    assert_eq!(compacted.load(Ordering::SeqCst), 1);
    let history = store.history(0, Some(&run.id)).await.unwrap();
    assert_eq!(
        history.iter().filter(|e| e.kind == "tool_started").count(),
        1
    );
    assert_eq!(
        history.iter().filter(|e| e.kind == "model_started").count(),
        3
    );
    server.abort();
}

#[tokio::test]
async fn long_conversations_continue_through_compaction_without_request_or_item_caps() {
    let calls = Arc::new(AtomicUsize::new(0));
    let summaries = Arc::new(AtomicUsize::new(0));
    let (seen, compressed) = (calls.clone(), summaries.clone());
    let ready = Arc::new(tokio::sync::Notify::new());
    let waiting = ready.clone();
    let gate = Arc::new(tokio::sync::Notify::new());
    let release = gate.clone();
    let app = Router::new().route("/responses", post(move |Json(body): Json<Value>| {
        let calls = calls.clone();
        let summaries = summaries.clone();
        let ready = ready.clone();
        let gate = gate.clone();
        async move {
            if body.get("tools").is_none() {
                summaries.fetch_add(1, Ordering::SeqCst);
                return text("Earlier inspection calls completed successfully. Continue the current inspection task; no writes have been performed. Follow the latest user request.");
            }
            let index = calls.fetch_add(1, Ordering::SeqCst);
            assert!(body["input"].to_string().contains("Finish all inspection steps"));
            if index == 140 {
                ready.notify_one();
                gate.notified().await;
                return text("Inspection finished before the latest correction");
            }
            if index > 140 {
                assert!(body["input"].to_string().contains("Keep all existing drafts unchanged"));
                return text("All inspection steps completed");
            }
            Response::new(Body::from(format!("data: {}\n\n", json!({
                "type":"response.completed", "response":{
                    "output":[{"type":"function_call","id":format!("provider-{index}"),"call_id":format!("inspect-{index}"),"name":"list_workflows","arguments":"{}"}],
                    "usage":{"input_tokens":if index == 13 {40000} else {1000},"output_tokens":100}
                }
            }))))
        }
    }));
    let (_dir, store, session, server) = configured(app).await;
    store
        .submit_input(
            &session,
            send(
                "long",
                "Finish all inspection steps and report the final result",
            ),
        )
        .await
        .unwrap();
    // This checkpoint follows 140 HTTP/tool exchanges with durable SQLite writes.
    // Bound stalled progress independently of total throughput on Windows runners.
    let checkpoint = waiting.notified();
    tokio::pin!(checkpoint);
    let mut previous_requests = 0;
    tokio::time::timeout(Duration::from_secs(60), async {
        loop {
            if tokio::time::timeout(Duration::from_secs(10), &mut checkpoint)
                .await
                .is_ok()
            {
                break;
            }
            let requests = seen.load(Ordering::SeqCst);
            assert!(
                requests > previous_requests,
                "Inspection stalled at model request {requests} before the checkpoint"
            );
            previous_requests = requests;
        }
    })
    .await
    .expect("Inspection did not reach the gated model request within 60 seconds");
    let current = store.conversation(&session, None).await.unwrap();
    let mut correction = send("long-correction", "Keep all existing drafts unchanged");
    correction.delivery_mode = "steer".into();
    correction.expected_turn_id = current["turns"][0]["id"].as_str().map(str::to_owned);
    store.submit_input(&session, correction).await.unwrap();
    release.notify_one();
    let snapshot = finished(&store, &session, 1).await;
    assert_eq!(snapshot["turns"].as_array().unwrap().len(), 1);
    assert_eq!(
        snapshot["turns"][0]["status"], "completed",
        "{:?}",
        snapshot["turns"][0]["error"]
    );
    assert_eq!(seen.load(Ordering::SeqCst), 142);
    assert!(compressed.load(Ordering::SeqCst) > 0);
    assert!(snapshot["contextUsage"]["compactions"].as_u64().unwrap() > 0);
    let items = snapshot["items"].as_array().unwrap();
    assert_eq!(
        items
            .iter()
            .filter(|i| i["kind"] == "tool" && i["status"] == "completed")
            .count(),
        140
    );
    assert!(
        items
            .iter()
            .any(|i| i["content"] == "All inspection steps completed")
    );
    assert!(
        items
            .iter()
            .any(|i| i["content"] == "Keep all existing drafts unchanged")
    );
    server.abort();
}

#[tokio::test]
async fn users_can_stop_a_turn_after_more_than_twelve_model_requests() {
    let calls = Arc::new(AtomicUsize::new(0));
    let seen = calls.clone();
    let ready = Arc::new(tokio::sync::Notify::new());
    let waiting = ready.clone();
    let app = Router::new().route("/responses", post(move || {
        let calls = calls.clone();
        let ready = ready.clone();
        async move {
            let index = calls.fetch_add(1, Ordering::SeqCst);
            if index == 13 {
                ready.notify_one();
                return std::future::pending::<Response>().await;
            }
            response(json!([{"type":"function_call","id":format!("provider-{index}"),"call_id":format!("inspect-{index}"),"name":"list_workflows","arguments":"{}"}]))
        }
    }));
    let (_dir, store, session, server) = configured(app).await;
    store
        .submit_input(
            &session,
            send("stop-long", "Inspect workflows until stopped"),
        )
        .await
        .unwrap();
    tokio::time::timeout(Duration::from_secs(10), waiting.notified())
        .await
        .unwrap();
    let current = store.conversation(&session, None).await.unwrap();
    store
        .stop_turn(&session, current["turns"][0]["id"].as_str().unwrap())
        .await
        .unwrap();
    let stopped = finished(&store, &session, 1).await;
    assert_eq!(stopped["turns"][0]["status"], "interrupted");
    assert_eq!(seen.load(Ordering::SeqCst), 14);
    assert_eq!(stopped["turns"].as_array().unwrap().len(), 1);
    server.abort();
}

#[tokio::test]
async fn continuation_restores_node_lookup_arguments_and_the_failed_turn_plan() {
    let calls = Arc::new(AtomicUsize::new(0));
    let observed = calls.clone();
    let app = Router::new().route(
        "/responses",
        post(move |Json(body): Json<Value>| {
            observed.fetch_add(1, Ordering::SeqCst);
            async move {
                let history = body["input"].to_string();
                assert!(
                    history.contains("chapter-plan-v1"),
                    "Lost the interrupted design plan: {history}"
                );
                assert!(
                    history.contains("nodeType"),
                    "Lost tool arguments: {history}"
                );
                assert!(history.contains("block-start"));
                assert!(history.contains("novel-loop-contract"));
                assert!(history.contains("Continue the existing design"));
                text("Continuing the existing chapter plan using the retained node contracts.")
            }
        }),
    );
    let (_dir, store, session, server) = configured(app).await;
    seed(&store, &session).await;
    let old: Turn = serde_json::from_str(
        &sqlx::query_scalar::<_, String>(
            "SELECT data FROM conversation_turns WHERE session_id=? ORDER BY ordinal LIMIT 1",
        )
        .bind(&session)
        .fetch_one(&store.db)
        .await
        .unwrap(),
    )
    .unwrap();
    let mut plan = store.new_item(&old.id, "assistant").await.unwrap();
    plan.content =
        "chapter-plan-v1: generate outline, use loop blocks with block-start, merge chapter text"
            .into();
    plan.phase = "commentary".into();
    plan.status = "interrupted".into();
    store.put_item(&mut plan).await.unwrap();
    let mut lookup = store.new_item(&old.id, "tool").await.unwrap();
    lookup.status = "completed".into();
    lookup.payload = json!({"name":"list_node_types","callId":"lookup-loop","arguments":{"nodeType":"loop"},"result":{"contract":"novel-loop-contract","blocks":["block-start","block-end"]}});
    store.put_item(&mut lookup).await.unwrap();
    let mut failed = old.clone();
    failed.status = "failed".into();
    failed.error = Some("The model response failed or was incomplete".into());
    sqlx::query("UPDATE conversation_turns SET status='failed',data=? WHERE id=?")
        .bind(serde_json::to_string(&failed).unwrap())
        .bind(&old.id)
        .execute(&store.db)
        .await
        .unwrap();
    store
        .submit_input(&session, send("continue", "Continue the existing design"))
        .await
        .unwrap();
    let result = finished(&store, &session, 2).await;
    assert_eq!(
        result["turns"].as_array().unwrap().last().unwrap()["status"],
        "completed"
    );
    assert_eq!(calls.load(Ordering::SeqCst), 1);
    assert_eq!(store.workflows().await.unwrap().len(), 0);
    server.abort();
}

#[tokio::test]
async fn transient_generation_failure_retries_without_replaying_completed_mutations() {
    let calls = Arc::new(AtomicUsize::new(0));
    let seen = calls.clone();
    let app = Router::new().route("/responses", post(move |Json(body): Json<Value>| {
        let calls = calls.clone();
        async move {
            match calls.fetch_add(1, Ordering::SeqCst) {
                0 => response(json!([{"type":"function_call","call_id":"create-once","name":"create_workflow","arguments":"{\"name\":\"Only draft\",\"mutationId\":\"create-once\"}"}])),
                1 => Response::new(Body::from(format!("data: {}\n\ndata: {}\n\n",
                    json!({"type":"response.output_item.added","output_index":0,"item":{"type":"function_call","call_id":"unfinished-save","name":"save_workflow","arguments":"{"}}),
                    json!({"type":"response.failed","response":{"error":{"code":"server_error","message":"Private upstream detail must not be exposed"}}})
                ))),
                _ => {
                    assert!(body["input"].to_string().contains("create-once"));
                    assert!(!body["input"].to_string().contains("unfinished-save"));
                    text("The existing draft is ready")
                }
            }
        }
    }));
    let (_dir, store, session, server) = configured(app).await;
    store
        .submit_input(&session, send("one", "Create a single draft"))
        .await
        .unwrap();
    let data = finished(&store, &session, 1).await;
    assert_eq!(data["turns"][0]["status"], "completed", "{data}");
    assert_eq!(seen.load(Ordering::SeqCst), 3);
    let drafts = store.workflows().await.unwrap();
    assert_eq!(drafts.len(), 1);
    assert_eq!(drafts[0].revision, 1);
    let staged = data["items"]
        .as_array()
        .unwrap()
        .iter()
        .find(|i| i["payload"]["callId"] == "unfinished-save")
        .unwrap();
    assert_eq!(staged["status"], "cancelled");
    let history = store.history(0, Some(&session)).await.unwrap();
    assert_eq!(
        history
            .iter()
            .filter(|e| e.kind == "conversation_model_retry")
            .count(),
        1
    );
    let diagnostic = history
        .iter()
        .find(|e| e.kind == "conversation_model_error")
        .unwrap();
    assert!(diagnostic.data.to_string().contains("server_error"));
    assert!(!diagnostic.data.to_string().contains("Private upstream"));
    server.abort();
}

#[tokio::test]
async fn incomplete_tool_generation_preserves_reason_without_executing_or_retrying() {
    for streaming in [true, false] {
        let calls = Arc::new(AtomicUsize::new(0));
        let seen = calls.clone();
        let app = Router::new().route("/responses", post(move || {
            calls.fetch_add(1, Ordering::SeqCst);
            async move {
                let call = json!({"type":"function_call","call_id":"unfinished-create","name":"create_workflow","arguments":"{\"name\":\"Must not exist\",\"mutationId\":\"create-once\"}"});
                let terminal = json!({"status":"incomplete","incomplete_details":{"reason":"max_output_tokens"},"output":[call.clone()]});
                if streaming {
                    Response::new(Body::from(format!("data: {}\n\ndata: {}\n\n",
                        json!({"type":"response.output_item.done","output_index":0,"item":call}),
                        json!({"type":"response.incomplete","response":terminal})
                    )))
                } else { Json(terminal).into_response() }
            }
        }));
        let (_dir, store, session, server) = configured(app).await;
        store
            .submit_input(&session, send("one", "Create a draft"))
            .await
            .unwrap();
        let data = finished(&store, &session, 1).await;
        assert_eq!(data["turns"][0]["status"], "failed", "{data}");
        let error = data["turns"][0]["error"].as_str().unwrap();
        assert!(
            error.contains("incomplete") && error.contains("max_output_tokens"),
            "{error}"
        );
        assert_eq!(seen.load(Ordering::SeqCst), 1);
        assert!(store.workflows().await.unwrap().is_empty());
        assert!(
            data["items"]
                .as_array()
                .unwrap()
                .iter()
                .filter(|i| i["kind"] == "tool")
                .all(|i| i["status"] == "cancelled")
        );
        server.abort();
    }
}

#[tokio::test]
async fn repeated_transient_failures_stop_after_one_retry() {
    let calls = Arc::new(AtomicUsize::new(0));
    let seen = calls.clone();
    let app = Router::new().route(
        "/responses",
        post(move || {
            calls.fetch_add(1, Ordering::SeqCst);
            async {
                Response::new(Body::from(format!(
                    "data: {}\n\n",
                    json!({"type":"error","code":"server_error"})
                )))
            }
        }),
    );
    let (_dir, store, session, server) = configured(app).await;
    store
        .submit_input(&session, send("one", "Say hello"))
        .await
        .unwrap();
    let data = finished(&store, &session, 1).await;
    assert_eq!(data["turns"][0]["status"], "failed", "{data}");
    assert_eq!(seen.load(Ordering::SeqCst), 2);
    server.abort();
}
