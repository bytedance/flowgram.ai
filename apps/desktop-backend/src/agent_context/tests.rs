use super::*;
use crate::{
    conversation::{ConversationItem, TurnOrigin},
    models::{Capabilities, Parameters, Protocol},
    store::{id, now},
};
use axum::{Json, Router, routing::post};
use std::sync::{
    Arc,
    atomic::{AtomicUsize, Ordering},
};

fn model(url: &str, window: u32) -> Resolved {
    Resolved {
        model_id: "test".into(),
        model_name: "Test".into(),
        upstream_model: "test".into(),
        model_revision: 1,
        connection_id: "connection".into(),
        connection_name: "Test".into(),
        connection_revision: 1,
        protocol: Protocol::Responses,
        base_url: url.into(),
        credential_id: None,
        timeout_ms: 5000,
        context_window: Some(window),
        capabilities: Capabilities::default(),
        parameters: Parameters::default(),
        project_id: "project".into(),
    }
}
async fn turn(store: &Store) -> Turn {
    let p = store.projects().await.unwrap().remove(0);
    let session = store.create_session(&p.id, "Context test").await.unwrap();
    let mut turn = Turn {
        id: id(),
        session_id: session.id,
        initiating_input_id: id(),
        status: "running".into(),
        phase: "model".into(),
        revision: 1,
        ordinal: 0,
        started_at: now(),
        ended_at: None,
        final_item_id: None,
        origin: TurnOrigin::Agent,
        estimated_duration_ms: None,
        model: None,
        error: None,
    };
    turn.ordinal=sqlx::query_scalar("INSERT INTO conversation_turns(id,session_id,status,data) VALUES(?,?,'running',?) RETURNING ordinal")
        .bind(&turn.id).bind(&turn.session_id).bind(serde_json::to_string(&turn).unwrap()).fetch_one(&store.db).await.unwrap();
    sqlx::query("UPDATE conversation_turns SET data=? WHERE id=?")
        .bind(serde_json::to_string(&turn).unwrap())
        .bind(&turn.id)
        .execute(&store.db)
        .await
        .unwrap();
    turn
}
async fn provider(app: Router) -> (String, tokio::task::JoinHandle<()>) {
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
    let url = format!("http://{}", listener.local_addr().unwrap());
    (
        url,
        tokio::spawn(async move { axum::serve(listener, app).await.unwrap() }),
    )
}
fn summary(text: &str) -> Value {
    json!({"output":[{"type":"message","role":"assistant","content":[{"type":"output_text","text":text}]}]})
}
fn context(model: &Resolved) -> AgentContext {
    let mut context = AgentContext::default();
    context
        .configure(model, "Workflow instructions", &json!([]))
        .unwrap();
    context
}

#[test]
fn budgets_include_output_tools_and_cjk_and_reject_unusable_windows() {
    let m = model("http://localhost", 32000);
    let b = Budget::new(&m, "instructions", &json!([{"name":"read"}])).unwrap();
    assert!(b.limit + b.reserve < 32000);
    assert!(budget::text_tokens("中文汉字") >= 8);
    assert_eq!(budget::text_tokens("abcdef"), 2);
    assert!(
        Budget::new(
            &model("http://localhost", 256),
            &"x".repeat(5000),
            &json!([])
        )
        .is_err()
    );
    let mut m = m;
    m.context_window = None;
    assert_eq!(context(&m).budget.window, budget::DEFAULT_WINDOW);
}
#[test]
fn compaction_keeps_the_latest_request_and_whole_tool_batches() {
    let mut ctx = context(&model("http://localhost", 16000));
    ctx.append(vec![
        json!({"role":"user","content":"Original requirement: do not publish"}),
    ]);
    ctx.append(vec![
        json!({"role":"assistant","content":"older facts ".repeat(4000)}),
    ]);
    ctx.append(vec![
        json!({"role":"user","content":"Change node alpha only"}),
    ]);
    ctx.append(vec![json!({"type":"function_call","call_id":"call-a","name":"inspect_workflow","arguments":"{}"}),json!({"type":"function_call_output","call_id":"call-a","output":"confirmed revision 3"})]);
    let (prefix, tail) = compaction::plan(&ctx, false).unwrap();
    assert!(
        json!(prefix.iter().flat_map(|g| &g.items).collect::<Vec<_>>())
            .to_string()
            .contains("Original requirement")
    );
    let retained = json!(tail.iter().flat_map(|g| &g.items).collect::<Vec<_>>());
    assert!(retained.to_string().contains("Change node alpha only"));
    assert_eq!(
        retained
            .as_array()
            .unwrap()
            .iter()
            .filter(|v| v["call_id"] == "call-a")
            .count(),
        2
    );
    assert!(validate_checkpoint(&json!(ctx)).is_ok());
    let mut malicious = json!(ctx);
    malicious["groups"][0]["items"][0]["role"] = json!("system");
    assert!(validate_checkpoint(&malicious).is_err());
    let mut orphan = json!(ctx);
    orphan["groups"][3]["items"].as_array_mut().unwrap().pop();
    assert!(validate_checkpoint(&orphan).is_err());
}
#[test]
fn provider_usage_including_cached_tokens_calibrates_new_content_and_model_changes() {
    let mut ctx = context(&model("http://localhost", 32000));
    ctx.append(vec![json!({"role":"user","content":"hello"})]);
    ctx.observe(&json!({"usage":{"input_tokens":12000,"output_tokens":1000,"input_tokens_details":{"cached_tokens":10000}}}));
    assert_eq!(ctx.usage.input_tokens, 13000);
    ctx.append(vec![json!({"role":"user","content":"new content"})]);
    ctx.refresh_usage();
    assert!(ctx.usage.input_tokens > 13000);
    let mut other = model("http://localhost", 16000);
    other.model_id = "other".into();
    ctx.configure(&other, "Workflow instructions", &json!([]))
        .unwrap();
    assert!(ctx.anchor.is_none());
    assert_eq!(ctx.usage.context_window, Some(16000));
    other.protocol = Protocol::Anthropic;
    ctx.configure(&other, "Workflow instructions", &json!([]))
        .unwrap();
    ctx.observe(&json!({"usage":{"input_tokens":1000,"cache_read_input_tokens":12000,"cache_creation_input_tokens":2000,"output_tokens":100}}));
    assert_eq!(ctx.usage.input_tokens, 15100);
}
#[test]
fn completed_turns_preserve_tool_evidence_without_replaying_protocol_or_narration() {
    let mut ctx = context(&model("http://localhost", 32000));
    ctx.append(vec![
        json!({"role":"user","content":"Inspect workflow alpha"}),
    ]);
    ctx.append(vec![
        json!({"type":"message","content":[{"type":"output_text","text":"Transient tool narration"}]}),
        json!({"type":"function_call","call_id":"inspect-a","name":"inspect_workflow","arguments":"{\"workflowId\":\"alpha\"}"}),
    ]);
    ctx.append_results(json!({"type":"function_call_output","call_id":"inspect-a","output":"revision 17; resultId retained-123"}));
    ctx.append(vec![
        json!({"role":"assistant","content":"Confirmed revision 17"}),
    ]);
    ctx.finish_turn();
    let input = ctx.input();
    assert!(!input.to_string().contains("Transient tool narration"));
    assert!(
        input
            .as_array()
            .unwrap()
            .iter()
            .all(|i| i["type"] != "function_call_output")
    );
    for fact in [
        "alpha",
        "inspect-a",
        "retained-123",
        "Confirmed revision 17",
    ] {
        assert!(input.to_string().contains(fact));
    }
    assert!(validate_checkpoint(&json!(ctx)).is_ok());
}

#[test]
fn long_turn_checkpoints_can_retain_all_processed_item_identities() {
    let mut ctx = context(&model("http://localhost", 32000));
    for index in 0..700 {
        ctx.acknowledge(1, &format!("processed-{index}"));
    }
    let value = json!(ctx);
    validate_checkpoint(&value).unwrap();
    let restored: AgentContext = serde_json::from_value(value).unwrap();
    assert!(restored.acknowledges(1, "processed-0"));
    assert!(restored.acknowledges(1, "processed-699"));
}
#[tokio::test]
async fn summaries_survive_reopen_and_export_without_deleting_original_records() {
    let requests = Arc::new(AtomicUsize::new(0));
    let observed = requests.clone();
    let app=Router::new().route("/responses",post(move|Json(body):Json<Value>|{let observed=observed.clone();async move{
        observed.fetch_add(1,Ordering::SeqCst);assert!(body.get("tools").is_none());
        assert!(body["instructions"].as_str().unwrap().contains("unknown outcome"));
        Json(summary("Original objective: configure workflow alpha, revision 3. Never publish. Completed call call-a; inspect uncertain operations before repeating. Next: change node beta."))
    }}));
    let (url, server) = provider(app).await;
    let m = model(&url, 12000);
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let turn = turn(&store).await;
    let mut original = store.new_item(&turn.id, "assistant").await.unwrap();
    original.content = "Original record".into();
    original.status = "completed".into();
    store.put_item(&mut original).await.unwrap();
    let mut ctx = context(&m);
    ctx.append(vec![
        json!({"role":"assistant","content":"prior facts ".repeat(5000)}),
    ]);
    ctx.append(vec![json!({"role":"user","content":"Change node beta"})]);
    ctx.acknowledge(turn.ordinal, &original.id);
    ctx.prepare(
        &store,
        &m,
        &Owner::Turn(&turn),
        &CancellationToken::new(),
        false,
    )
    .await
    .unwrap();
    assert!(requests.load(Ordering::SeqCst) > 0);
    assert_eq!(ctx.usage.compactions, 1);
    assert!(ctx.usage.input_tokens < ctx.budget.limit);
    let saved = ctx.input();
    let restored = store.restore_context(&turn.session_id).await.unwrap();
    assert_eq!(restored.input(), saved);
    let conversation = store.conversation(&turn.session_id, None).await.unwrap();
    assert!(
        conversation["items"]
            .as_array()
            .unwrap()
            .iter()
            .any(|i| i["id"] == original.id && i["content"] == "Original record")
    );
    assert!(
        conversation["items"]
            .as_array()
            .unwrap()
            .iter()
            .any(|i| i["kind"] == "compaction" && i["status"] == "completed")
    );
    let package = crate::project_transfer::export_project(&store, true)
        .await
        .unwrap();
    let other = tempfile::tempdir().unwrap();
    let registry = crate::registry::Registry::open(other.path()).await.unwrap();
    let imported = crate::project_transfer::import_project(&registry, package, None, None)
        .await
        .unwrap();
    let copy = registry.resolve(&imported.id).await.unwrap();
    assert_eq!(
        copy.restore_context(&turn.session_id)
            .await
            .unwrap()
            .input(),
        saved
    );
    server.abort();
}
#[tokio::test]
async fn failed_or_cancelled_compaction_retains_the_original_context() {
    let gate = Arc::new(tokio::sync::Notify::new());
    let ready = gate.clone();
    let app = Router::new().route(
        "/responses",
        post(move || {
            let ready = ready.clone();
            async move {
                ready.notify_one();
                std::future::pending::<Json<Value>>().await
            }
        }),
    );
    let (url, server) = provider(app).await;
    let m = model(&url, 12000);
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let turn = turn(&store).await;
    let mut ctx = context(&m);
    ctx.append(vec![
        json!({"role":"assistant","content":"source facts ".repeat(4000)}),
    ]);
    ctx.append(vec![json!({"role":"user","content":"Latest request"})]);
    let before = ctx.input();
    let cancel = CancellationToken::new();
    let token = cancel.clone();
    let stop = tokio::spawn(async move {
        gate.notified().await;
        token.cancel();
    });
    assert!(matches!(
        ctx.prepare(&store, &m, &Owner::Turn(&turn), &cancel, false)
            .await,
        Err(crate::error::Error::Cancelled)
    ));
    stop.await.unwrap();
    assert_eq!(ctx.input(), before);
    assert_eq!(
        store
            .restore_context(&turn.session_id)
            .await
            .unwrap()
            .input(),
        before
    );
    assert_eq!(
        store.context_usage(&turn.session_id).await.unwrap()["status"],
        "ready"
    );
    server.abort();
}
#[tokio::test]
async fn large_results_are_lossless_paged_and_project_scoped() {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let turn = turn(&store).await;
    let ctx = context(&model("http://localhost", 12000));
    let original = json!({"rows":["原始内容🧭".repeat(2000)],"revision":17});
    let (preview, key) = store
        .context_tool_output(&ctx, &Owner::Turn(&turn), &original)
        .await
        .unwrap();
    let key = key.unwrap();
    assert_eq!(preview["truncated"], true);
    assert!(preview.to_string().len() < 5000);
    let mut content = String::new();
    let mut offset = 0;
    loop {
        let page = store
            .structured_tool_result(
                &json!({"resultId":key,"path":"/rows/0","offset":offset,"limit":1999}),
                None,
            )
            .await
            .unwrap();
        content.push_str(page["data"]["content"].as_str().unwrap());
        if let Some(next) = page["data"]["nextOffset"].as_u64() {
            offset = next;
        } else {
            break;
        }
    }
    assert_eq!(json!(content), original["rows"][0]);
    assert!(
        store
            .structured_tool_result(&json!({"resultId":key}), Some("other-run"))
            .await
            .is_err()
    );
    let other = tempfile::tempdir().unwrap();
    let copy = Store::open(other.path()).await.unwrap();
    assert!(
        copy.structured_tool_result(&json!({"resultId":key}), None)
            .await
            .is_err()
    );
}
#[tokio::test]
async fn history_is_paged_without_a_forty_message_cutoff_and_reconciles_late_items() {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let turn = turn(&store).await;
    for index in 0..70 {
        let mut item = store
            .new_item(&turn.id, if index % 2 == 0 { "user" } else { "assistant" })
            .await
            .unwrap();
        item.content = format!("Constraint {index}");
        item.phase = "final".into();
        item.status = "completed".into();
        store.put_item(&mut item).await.unwrap();
    }
    let model = model("http://localhost", 32000);
    let cancel = CancellationToken::new();
    let first = store
        .load_agent_context(&turn, &model, "rules", &json!([]), &cancel)
        .await
        .unwrap();
    assert!(first.input().to_string().contains("Constraint 0"));
    assert!(first.input().to_string().contains("Constraint 69"));
    let mut late = store.new_item(&turn.id, "user").await.unwrap();
    late.content = "Do not discard this late correction".into();
    late.status = "completed".into();
    store.put_item(&mut late).await.unwrap();
    let loaded = store
        .load_agent_context(&turn, &model, "rules", &json!([]), &cancel)
        .await
        .unwrap();
    assert_eq!(loaded.input().as_array().unwrap().len(), 71);
    assert!(loaded.input().to_string().contains("late correction"));
    let last: ConversationItem = serde_json::from_value(
        store.conversation(&turn.session_id, None).await.unwrap()["items"]
            .as_array()
            .unwrap()
            .last()
            .unwrap()
            .clone(),
    )
    .unwrap();
    assert_eq!(last.id, late.id);
}
