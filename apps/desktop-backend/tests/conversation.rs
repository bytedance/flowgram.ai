use axum::{Json, Router, body::Body, response::Response, routing::post};
use flowgram_desktop_backend::{
    conversation::{ConversationItem, SendInput, Turn},
    model::ModelConfig,
    store::{Store, id, now},
};
use serde_json::{Value, json};
use std::{
    sync::{
        Arc,
        atomic::{AtomicUsize, Ordering},
    },
    time::Duration,
};
use tokio::sync::Notify;

fn input(client: &str, text: &str) -> SendInput {
    SendInput {
        client_input_id: client.into(),
        content: text.into(),
        delivery_mode: "queue".into(),
        expected_turn_id: None,
        references: Value::Null,
        model: None,
    }
}
fn response(output: Value) -> String {
    format!(
        "data: {}\n\n",
        json!({"type":"response.completed","response":{"output":output}})
    )
}
fn text_output(text: &str) -> Value {
    json!([{"type":"message","content":[{"type":"output_text","text":text}]}])
}
async fn configured(app: Router) -> (tempfile::TempDir, Store, tokio::task::JoinHandle<()>) {
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
    let address = listener.local_addr().unwrap();
    let server = tokio::spawn(async move {
        axum::serve(listener, app).await.unwrap();
    });
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
    (dir, store, server)
}
async fn session(store: &Store) -> String {
    let project = store.projects().await.unwrap().remove(0);
    store
        .create_session(&project.id, "Conversation test")
        .await
        .unwrap()
        .id
}
async fn snapshot(store: &Store, session: &str) -> Value {
    store.conversation(session, None).await.unwrap()
}
async fn wait_for(store: &Store, session: &str, predicate: impl Fn(&Value) -> bool) -> Value {
    tokio::time::timeout(Duration::from_secs(5), async {
        loop {
            let current = snapshot(store, session).await;
            if predicate(&current) {
                return current;
            }
            tokio::time::sleep(Duration::from_millis(5)).await;
        }
    })
    .await
    .expect("conversation did not reach expected state")
}
#[tokio::test]
async fn queued_inputs_are_idempotent_and_steering_cancels_old_unstarted_mutations() {
    let gate = Arc::new(Notify::new());
    let calls = Arc::new(AtomicUsize::new(0));
    let observed = calls.clone();
    let release = gate.clone();
    let app=Router::new().route("/responses",post(move |Json(body):Json<Value>|{let gate=gate.clone();let calls=calls.clone();async move {
        let index=calls.fetch_add(1,Ordering::SeqCst);
        if index==0 {
            let stream=async_stream::stream! {
                let call=json!({"type":"function_call","id":"provider-create","name":"create_workflow","call_id":"create-1","arguments":"{\"name\":\"Must not be created\",\"schema\":{\"nodes\":[],\"edges\":[]}}"});
                yield Ok::<_,std::convert::Infallible>(format!("data: {}\n\n",json!({"type":"response.output_item.added","output_index":0,"item":call})));
                gate.notified().await;
                yield Ok(response(json!([call])));
            };Response::new(Body::from_stream(stream))
        } else {
            if index==1 {
                let entries=body["input"].as_array().unwrap();
                assert!(entries.iter().any(|i|i["type"]=="function_call_output"&&i["output"].as_str().unwrap_or_default().contains("not executed")));
                assert!(entries.iter().any(|i|i["role"]=="user"&&i["content"]=="不要创建，只说明方案"));
            }
            Response::new(Body::from(response(text_output("已完成本轮"))))
        }
    }}));
    let (_dir, store, server) = configured(app).await;
    let session = session(&store).await;
    let first = store
        .submit_input(&session, input("first", "创建工作流"))
        .await
        .unwrap();
    let started = wait_for(&store, &session, |s| {
        s["items"]
            .as_array()
            .unwrap()
            .iter()
            .any(|i| i["kind"] == "tool")
    })
    .await;
    let turn = started["turns"][0]["id"].as_str().unwrap();
    let queued = input("queued", "下一轮检查结果");
    let queued1 = store.submit_input(&session, queued).await.unwrap();
    let duplicate = store
        .submit_input(&session, input("queued", "下一轮检查结果"))
        .await
        .unwrap();
    assert_eq!(queued1.id, duplicate.id);
    let mut steer = input("steer", "不要创建，只说明方案");
    steer.delivery_mode = "steer".into();
    steer.expected_turn_id = Some(turn.into());
    let pending = store.submit_input(&session, steer).await.unwrap();
    assert_eq!(pending.status, "pending");
    release.notify_one();
    let final_state = wait_for(&store, &session, |s| {
        s["turns"].as_array().unwrap().len() == 2
            && s["turns"]
                .as_array()
                .unwrap()
                .iter()
                .all(|t| t["status"] == "completed")
    })
    .await;
    assert!(store.workflows().await.unwrap().is_empty());
    assert_eq!(observed.load(Ordering::SeqCst), 3);
    assert_eq!(
        final_state["items"]
            .as_array()
            .unwrap()
            .iter()
            .filter(|i| i["kind"] == "tool" && i["status"] == "cancelled")
            .count(),
        1
    );
    assert!(
        final_state["items"]
            .as_array()
            .unwrap()
            .iter()
            .any(|i| i["id"] == pending.id && i["phase"] == "steering")
    );
    assert_eq!(
        store
            .submit_input(&session, input("first", "创建工作流"))
            .await
            .unwrap()
            .id,
        first.id
    );
    let mut stale = input("stale", "不应改投");
    stale.delivery_mode = "steer".into();
    stale.expected_turn_id = Some(turn.into());
    assert!(store.submit_input(&session, stale).await.is_err());
    server.abort();
}
#[tokio::test]
async fn stopping_preserves_partial_text_and_pauses_the_server_owned_queue() {
    let gate = Arc::new(Notify::new());
    let calls = Arc::new(AtomicUsize::new(0));
    let observed = calls.clone();
    let app=Router::new().route("/responses",post(move ||{let gate=gate.clone();let calls=calls.clone();async move{
        calls.fetch_add(1,Ordering::SeqCst);
        let stream=async_stream::stream! {
            yield Ok::<_,std::convert::Infallible>(format!("data: {}\n\n",json!({"type":"response.output_text.delta","delta":"已经读取了客户数据。"})));
            gate.notified().await;yield Ok(response(text_output("最终答复")));
        };Response::new(Body::from_stream(stream))
    }}));
    let (_dir, store, server) = configured(app).await;
    let session = session(&store).await;
    store
        .submit_input(&session, input("first", "开始检查"))
        .await
        .unwrap();
    let partial = wait_for(&store, &session, |s| {
        s["items"]
            .as_array()
            .unwrap()
            .iter()
            .any(|i| i["content"] == "已经读取了客户数据。")
    })
    .await;
    let turn = partial["turns"][0]["id"].as_str().unwrap();
    let item_id = partial["items"]
        .as_array()
        .unwrap()
        .iter()
        .find(|i| i["kind"] == "assistant")
        .unwrap()["id"]
        .clone();
    store
        .submit_input(&session, input("next", "下一轮需求"))
        .await
        .unwrap();
    assert_eq!(
        store.stop_turn(&session, turn).await.unwrap().status,
        "stopping"
    );
    let stopped = wait_for(&store, &session, |s| {
        s["turns"][0]["status"] == "interrupted"
    })
    .await;
    assert_eq!(stopped["paused"], true);
    assert_eq!(stopped["turns"].as_array().unwrap().len(), 1);
    assert_eq!(observed.load(Ordering::SeqCst), 1);
    let partial = stopped["items"]
        .as_array()
        .unwrap()
        .iter()
        .find(|i| i["id"] == item_id)
        .unwrap();
    assert_eq!(partial["content"], "已经读取了客户数据。");
    assert_eq!(partial["status"], "interrupted");
    assert!(
        stopped["inputs"]
            .as_array()
            .unwrap()
            .iter()
            .any(|i| i["status"] == "queued")
    );
    server.abort();
}
#[tokio::test]
async fn failed_tool_and_final_reply_keep_stable_identities_and_distinct_terminal_states() {
    let requests = Arc::new(AtomicUsize::new(0));
    let app=Router::new().route("/responses",post(move ||{let requests=requests.clone();async move {
        if requests.fetch_add(1,Ordering::SeqCst)==0 {
            let call=json!({"type":"function_call","id":"save-provider-id","name":"save_workflow","call_id":"save-call","arguments":"{}"});
            format!("data: {}\n\n{}",json!({"type":"response.output_item.added","output_index":0,"item":call}),response(json!([call])))
        } else {format!("data: {}\n\n{}",json!({"type":"response.output_text.delta","delta":"参数不完整。"}),response(text_output("参数不完整，请提供工作流。")))}
    }}));
    let (_dir, store, server) = configured(app).await;
    let session = session(&store).await;
    store
        .submit_input(&session, input("one", "保存流程"))
        .await
        .unwrap();
    let done = wait_for(&store, &session, |s| {
        s["turns"]
            .as_array()
            .is_some_and(|t| !t.is_empty() && t[0]["status"] == "completed")
    })
    .await;
    let items = done["items"].as_array().unwrap();
    let tools: Vec<_> = items.iter().filter(|i| i["kind"] == "tool").collect();
    assert_eq!(tools.len(), 1);
    assert_eq!(tools[0]["status"], "failed");
    assert_eq!(tools[0]["payload"]["callId"], "save-call");
    let texts: Vec<_> = items.iter().filter(|i| i["kind"] == "assistant").collect();
    assert_eq!(texts.len(), 1);
    assert_eq!(texts[0]["phase"], "final");
    assert_eq!(texts[0]["content"], "参数不完整，请提供工作流。");
    assert_eq!(done["turns"][0]["finalItemId"], texts[0]["id"]);
    let refreshed = snapshot(&store, &session).await;
    assert_eq!(done["items"], refreshed["items"]);
    server.abort();
}
#[tokio::test]
async fn restart_keeps_unstarted_inputs_but_does_not_replay_unknown_tool_results() {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let session = session(&store).await;
    let turn = Turn {
        id: id(),
        session_id: session.clone(),
        initiating_input_id: id(),
        status: "running".into(),
        phase: "tool".into(),
        revision: 1,
        ordinal: 1,
        started_at: now(),
        ended_at: None,
        final_item_id: None,
        origin: Default::default(),
        estimated_duration_ms: None,
        model: None,
        error: None,
    };
    sqlx::query("INSERT INTO conversation_turns(id,session_id,status,data) VALUES(?,?,?,?)")
        .bind(&turn.id)
        .bind(&session)
        .bind("running")
        .bind(serde_json::to_string(&turn).unwrap())
        .execute(&store.db)
        .await
        .unwrap();
    let item = ConversationItem {
        id: id(),
        session_id: session.clone(),
        turn_id: turn.id.clone(),
        ordinal: 1,
        kind: "tool".into(),
        status: "running".into(),
        phase: "commentary".into(),
        content: String::new(),
        payload: json!({"name":"save_workflow"}),
        revision: 1,
        created_at: now(),
        updated_at: now(),
    };
    sqlx::query("INSERT INTO conversation_items VALUES(?,?,?,?)")
        .bind(&item.id)
        .bind(&turn.id)
        .bind(1)
        .bind(serde_json::to_string(&item).unwrap())
        .execute(&store.db)
        .await
        .unwrap();
    let pending = flowgram_desktop_backend::conversation::ConversationInput {
        id: id(),
        client_input_id: "pending".into(),
        session_id: session.clone(),
        content: "接着处理".into(),
        references: Value::Null,
        model: None,
        delivery_mode: "queue".into(),
        turn_id: None,
        status: "queued".into(),
        revision: 1,
        created_at: now(),
        error: None,
    };
    sqlx::query("INSERT INTO conversation_inputs(id,session_id,client_input_id,status,delivery_mode,data) VALUES(?,?,?,?,?,?)").bind(&pending.id).bind(&session).bind("pending").bind("queued").bind("queue").bind(serde_json::to_string(&pending).unwrap()).execute(&store.db).await.unwrap();
    store.db.close().await;
    drop(store);
    let recovered = Store::open(dir.path()).await.unwrap();
    let snapshot = snapshot(&recovered, &session).await;
    assert_eq!(snapshot["turns"][0]["status"], "interrupted");
    assert_eq!(snapshot["items"][0]["status"], "uncertain");
    assert_eq!(snapshot["inputs"][0]["id"], pending.id);
    assert_eq!(snapshot["paused"], true);
}

#[tokio::test]
async fn stopping_a_turn_cancels_only_its_owned_workflow_runs() {
    let app = Router::new().route("/responses", post(|| async {
        let stream = async_stream::stream! {
            yield Ok::<_, std::convert::Infallible>(format!("data: {}\n\n", json!({"type":"response.output_text.delta","delta":"正在运行流程"})));
            std::future::pending::<()>().await;
        };
        Response::new(Body::from_stream(stream))
    }));
    let (_dir, store, server) = configured(app).await;
    let session = session(&store).await;
    let project = store.session(&session).await.unwrap().project_id;
    let graph = json!({"nodes":[
        {"id":"start","type":"start"},
        {"id":"wait","type":"delay","data":{"inputsValues":{"durationMs":{"type":"constant","content":30000}}}},
        {"id":"end","type":"end"}
    ],"edges":[{"sourceNodeID":"start","targetNodeID":"wait"},{"sourceNodeID":"wait","targetNodeID":"end"}]});
    let workflow = store
        .create_workflow(&project, "Wait", graph)
        .await
        .unwrap();
    store
        .submit_input(&session, input("one", "运行流程"))
        .await
        .unwrap();
    let active = wait_for(&store, &session, |s| {
        !s["items"].as_array().unwrap().is_empty()
    })
    .await;
    let turn = active["turns"][0]["id"].as_str().unwrap();
    let manual = store
        .start_run(&workflow.id, Some(session.clone()), json!({}))
        .await
        .unwrap();
    let owned = store
        .start_run(&workflow.id, Some(session.clone()), json!({}))
        .await
        .unwrap();
    store.link_turn_run(turn, &owned.id).await.unwrap();
    store.stop_turn(&session, turn).await.unwrap();
    wait_for(&store, &session, |s| {
        s["turns"][0]["status"] == "interrupted"
    })
    .await;
    tokio::time::timeout(Duration::from_secs(2), async {
        loop {
            if store.run(&owned.id).await.unwrap().status == "canceled" {
                break;
            }
            tokio::time::sleep(Duration::from_millis(5)).await;
        }
    })
    .await
    .unwrap();
    assert_eq!(store.run(&manual.id).await.unwrap().status, "running");
    store.active.lock().await.get(&manual.id).unwrap().cancel();
    server.abort();
}

#[tokio::test]
async fn concurrent_retries_and_queue_edits_preserve_one_input_and_revision_checks() {
    let gate = Arc::new(Notify::new());
    let release = gate.clone();
    let app = Router::new().route("/responses", post(move || {
        let gate = gate.clone();
        async move {
            let stream = async_stream::stream! {
                yield Ok::<_, std::convert::Infallible>(format!("data: {}\n\n", json!({"type":"response.output_text.delta","delta":"检查中"})));
                gate.notified().await;
                yield Ok(response(text_output("检查完成")));
            };
            Response::new(Body::from_stream(stream))
        }
    }));
    let (_dir, store, server) = configured(app).await;
    let session = session(&store).await;
    let (one, retry) = tokio::join!(
        store.submit_input(&session, input("first", "检查流程")),
        store.submit_input(&session, input("first", "检查流程"))
    );
    assert_eq!(one.unwrap().id, retry.unwrap().id);
    let active = wait_for(&store, &session, |s| {
        s["items"]
            .as_array()
            .unwrap()
            .iter()
            .any(|i| i["kind"] == "assistant")
    })
    .await;
    let turn = active["turns"][0]["id"].as_str().unwrap();
    let queued = store
        .submit_input(&session, input("queue", "原需求"))
        .await
        .unwrap();
    let edited = store
        .change_queued_input(&session, &queued.id, queued.revision, Some("新需求"), None)
        .await
        .unwrap();
    assert!(
        store
            .change_queued_input(&session, &queued.id, queued.revision, None, None)
            .await
            .is_err()
    );
    assert!(
        store
            .change_queued_input(
                &session,
                &edited.id,
                edited.revision,
                None,
                Some("unknown-turn")
            )
            .await
            .is_err()
    );
    let pending = store
        .change_queued_input(&session, &edited.id, edited.revision, None, Some(turn))
        .await
        .unwrap();
    assert_eq!(pending.id, queued.id);
    assert_eq!(pending.status, "pending");
    assert_eq!(pending.content, "新需求");
    assert!(
        store
            .change_queued_input(&session, &pending.id, pending.revision, None, None)
            .await
            .is_err()
    );
    release.notify_one();
    let accepted = wait_for(&store, &session, |s| {
        s["items"]
            .as_array()
            .unwrap()
            .iter()
            .any(|i| i["id"] == pending.id)
    })
    .await;
    assert_eq!(accepted["turns"].as_array().unwrap().len(), 1);
    store.stop_turn(&session, turn).await.unwrap();
    wait_for(&store, &session, |s| {
        s["turns"][0]["status"] == "interrupted"
    })
    .await;
    server.abort();
}

#[tokio::test]
async fn tool_only_steps_need_no_narration_and_prior_commentary_does_not_pollute_context() {
    let requests = Arc::new(AtomicUsize::new(0));
    let observed = requests.clone();
    let app = Router::new().route("/responses", post(move |Json(body): Json<Value>| {
        let requests = requests.clone();
        async move {
            let index = requests.fetch_add(1, Ordering::SeqCst);
            assert!(body["instructions"].as_str().unwrap().contains("Do not narrate individual calls or insert a sentence between each call"));
            if index == 0 || index == 2 {
                if index == 2 {
                    let context = body["input"].to_string();
                    assert!(!context.contains("过程报幕标记"));
                    assert!(context.contains("第一轮最终结果"));
                    assert!(context.contains("第一轮需求"));
                    assert!(context.contains("第二轮需求"));
                }
                let mut output = vec![
                    json!({"type":"function_call","id":format!("catalog-{index}"),"name":"search_node_types","call_id":format!("catalog-call-{index}"),"arguments":"{}"}),
                    json!({"type":"function_call","id":format!("list-{index}"),"name":"list_workflows","call_id":format!("list-call-{index}"),"arguments":"{}"}),
                ];
                if index == 0 {
                    output.insert(0, json!({"type":"message","content":[{"type":"output_text","text":"过程报幕标记：现在查询节点，然后查看工作流。"}]}));
                }
                response(json!(output))
            } else {
                let outputs = body["input"].as_array().unwrap().iter().filter(|i| i["type"] == "function_call_output").count();
                assert_eq!(outputs, 2);
                response(text_output(if index == 1 { "第一轮最终结果" } else { "第二轮最终结果" }))
            }
        }
    }));
    let (_dir, store, server) = configured(app).await;
    let session = session(&store).await;
    store
        .submit_input(&session, input("one", "第一轮需求"))
        .await
        .unwrap();
    wait_for(&store, &session, |s| {
        s["turns"].as_array().unwrap().len() == 1 && s["turns"][0]["status"] == "completed"
    })
    .await;
    store
        .submit_input(&session, input("two", "第二轮需求"))
        .await
        .unwrap();
    let done = wait_for(&store, &session, |s| {
        s["turns"].as_array().unwrap().len() == 2 && s["turns"][1]["status"] == "completed"
    })
    .await;
    assert_eq!(observed.load(Ordering::SeqCst), 4);
    let turn = &done["turns"][1]["id"];
    let items: Vec<_> = done["items"]
        .as_array()
        .unwrap()
        .iter()
        .filter(|i| &i["turnId"] == turn)
        .collect();
    assert_eq!(items.iter().filter(|i| i["kind"] == "assistant").count(), 1);
    assert_eq!(
        items
            .iter()
            .filter(|i| i["kind"] == "tool" && i["status"] == "completed")
            .count(),
        2
    );
    let mirrors: i64 = sqlx::query_scalar(
        "SELECT count(*) FROM sqlite_master WHERE type='table' AND name='messages'",
    )
    .fetch_one(&store.db)
    .await
    .unwrap();
    assert_eq!(mirrors, 0);
    server.abort();
}

#[tokio::test]
async fn discovered_tool_schemas_load_next_request_and_survive_session_checkpoints() {
    let requests = Arc::new(AtomicUsize::new(0));
    let seen = requests.clone();
    let app=Router::new().route("/responses",post(move |Json(body):Json<Value>|{let requests=requests.clone();async move{
        let index=requests.fetch_add(1,Ordering::SeqCst);
        let tools=body["tools"].as_array().unwrap();let loaded=tools.iter().any(|t|t["name"]=="create_workflow");
        match index{
            0=>{assert!(!loaded);response(json!([{"type":"function_call","name":"search_tools","call_id":"discover","arguments":"{\"query\":\"create_workflow\"}"}]))},
            1=>{assert!(loaded);response(json!([{"type":"function_call","name":"create_workflow","call_id":"create","arguments":"{\"name\":\"Discovered draft\",\"mutationId\":\"create-once\"}"}]))},
            _=>{assert!(loaded);response(text_output("Created."))}
        }
    }}));
    let (_dir, store, server) = configured(app).await;
    let session = session(&store).await;
    store
        .submit_input(&session, input("discover", "Create a draft"))
        .await
        .unwrap();
    wait_for(&store, &session, |s| s["turns"][0]["status"] == "completed").await;
    store
        .submit_input(&session, input("continue", "What changed?"))
        .await
        .unwrap();
    wait_for(&store, &session, |s| {
        s["turns"]
            .as_array()
            .is_some_and(|t| t.len() == 2 && t[1]["status"] == "completed")
    })
    .await;
    assert_eq!(seen.load(Ordering::SeqCst), 4);
    assert_eq!(store.workflows().await.unwrap().len(), 1);
    assert_eq!(
        store.session_references(&session).await.unwrap()["workflowIds"]
            .as_array()
            .unwrap()
            .len(),
        1
    );
    server.abort();
}
