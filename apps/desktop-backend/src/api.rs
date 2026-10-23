use crate::{
    conversation::SendInput,
    error::{Error, Result},
    model::{Graph, ModelConfig},
    runtime,
    store::{Store, starter_schema},
    tools,
};
use axum::{
    Json, Router,
    extract::{Path, Query, Request, State},
    http::{HeaderMap, StatusCode},
    middleware::{self, Next},
    response::{
        Response,
        sse::{Event as SseEvent, KeepAlive, Sse},
    },
    routing::{get, post},
};
use serde::Deserialize;
use serde_json::{Value, json};
use std::{convert::Infallible, sync::Arc, time::Duration};

#[derive(Clone)]
pub struct ApiState {
    pub store: Store,
    pub token: Arc<String>,
}
pub fn router(store: Store, token: String) -> Router {
    let state = ApiState {
        store,
        token: Arc::new(token),
    };
    Router::new()
        .merge(crate::service_api::admin_routes())
        .merge(crate::archive::project_routes())
        .route(
            "/health",
            get(|| async { Json(json!({"status":"ready","service":"flowgram"})) }),
        )
        .route("/api/bootstrap", get(bootstrap))
        .route("/api/nodes", get(||async{Json(json!({"types":runtime::supported_types(),"definitions":crate::nodes::CATALOG.iter().chain(crate::control::CATALOG.iter()).chain(crate::core_nodes::CATALOG.iter()).collect::<Vec<_>>()}))}))
        .route("/api/resources", get(resources).post(import_resource))
        .route("/api/sessions", post(create_session))
        .route("/api/sessions/{id}/conversation", get(conversation))
        .route("/api/sessions/{id}/references", get(session_references))
        .route("/api/sessions/{id}/inputs", post(send_input))
        .route(
            "/api/sessions/{id}/inputs/{input}",
            axum::routing::put(edit_input),
        )
        .route("/api/sessions/{id}/inputs/{input}/cancel", post(remove_input))
        .route("/api/sessions/{id}/inputs/{input}/steer", post(steer_input))
        .route("/api/sessions/{id}/turns/{turn}/stop", post(stop_turn))
        .route("/api/sessions/{id}/queue/resume", post(resume_queue))
        .route("/api/workflows", post(create_workflow))
        .route("/api/debug/copy",post(debug_copy).layer(axum::extract::DefaultBodyLimit::max(8_000_000)))
        .route("/api/workflows/{id}", get(workflow).put(save_workflow))
        .route("/api/workflows/{id}/changes", get(workflow_changes))
        .route("/api/workflows/{id}/validate", post(validate))
        .route("/api/workflows/{id}/run", post(run))
        .route("/api/workflows/{id}/nodes/{node}/test", post(test_node))
        .route("/api/runs",get(run_list))
        .route("/api/runs/{id}", get(run_detail))
        .route("/api/runs/{id}/cancel", post(cancel))
        .route("/api/events", get(events))
        .route("/api/events/history", get(history))
        .route("/api/settings/model", get(model_config).put(save_model))
        .route("/api/tools", get(|| async { Json(tools::definitions()) }))
        .route("/api/tools/call", post(call_tool))
        .route("/mcp", post(mcp))
        .layer(axum::extract::DefaultBodyLimit::max(2_000_000))
        .layer(middleware::from_fn_with_state(state.clone(), authorize))
        .layer(cors())
        .with_state(state)
}
async fn authorize(State(state): State<ApiState>, request: Request, next: Next) -> Response {
    if request.uri().path() == "/health" {
        return next.run(request).await;
    }
    if let Err(error) = state.store.ensure_open() {
        return error.into_response();
    }
    let supplied = request
        .headers()
        .get("authorization")
        .and_then(|v| v.to_str().ok())
        .and_then(|v| v.strip_prefix("Bearer "));
    if supplied != Some(state.token.as_str()) {
        return (
            StatusCode::UNAUTHORIZED,
            Json(json!({"error":{"code":"unauthorized","message":"App connection expired. Reconnect"}})),
        )
            .into_response();
    }
    next.run(request).await
}
use axum::response::IntoResponse;
async fn bootstrap(State(s): State<ApiState>) -> Result<Json<Value>> {
    Ok(Json(
        json!({"projects":s.store.projects().await?,"sessions":s.store.sessions().await?,"workflows":s.store.workflows().await?,"runs":s.store.runs().await?}),
    ))
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct NewSession {
    project_id: String,
    title: Option<String>,
}
async fn create_session(
    State(s): State<ApiState>,
    Json(i): Json<NewSession>,
) -> Result<Json<Value>> {
    Ok(Json(serde_json::to_value(
        s.store
            .create_session(&i.project_id, i.title.as_deref().unwrap_or("New session"))
            .await?,
    )?))
}
#[derive(Deserialize)]
struct ConversationQuery {
    before: Option<i64>,
}
async fn conversation(
    State(s): State<ApiState>,
    Path(session): Path<String>,
    Query(q): Query<ConversationQuery>,
) -> Result<Json<Value>> {
    Ok(Json(s.store.conversation(&session, q.before).await?))
}
async fn send_input(
    State(s): State<ApiState>,
    Path(session): Path<String>,
    Json(input): Json<SendInput>,
) -> Result<Json<Value>> {
    Ok(Json(serde_json::to_value(
        s.store.submit_input(&session, input).await?,
    )?))
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct InputChange {
    #[serde(default)]
    references: Value,
    revision: i64,
    content: Option<String>,
    expected_turn_id: Option<String>,
}
async fn edit_input(
    State(s): State<ApiState>,
    Path((session, input)): Path<(String, String)>,
    Json(change): Json<InputChange>,
) -> Result<Json<Value>> {
    let content = change
        .content
        .as_deref()
        .ok_or_else(|| Error::Invalid("Enter the revised content".into()))?;
    Ok(Json(serde_json::to_value(
        s.store
            .change_queued_input_with_references(
                &session,
                &input,
                change.revision,
                Some(content),
                Some(change.references),
                None,
            )
            .await?,
    )?))
}
async fn remove_input(
    State(s): State<ApiState>,
    Path((session, input)): Path<(String, String)>,
    Json(change): Json<InputChange>,
) -> Result<Json<Value>> {
    Ok(Json(serde_json::to_value(
        s.store
            .change_queued_input(&session, &input, change.revision, None, None)
            .await?,
    )?))
}
async fn steer_input(
    State(s): State<ApiState>,
    Path((session, input)): Path<(String, String)>,
    Json(change): Json<InputChange>,
) -> Result<Json<Value>> {
    let turn = change
        .expected_turn_id
        .as_deref()
        .ok_or_else(|| Error::Invalid("A target turn ID is required".into()))?;
    Ok(Json(serde_json::to_value(
        s.store
            .change_queued_input(&session, &input, change.revision, None, Some(turn))
            .await?,
    )?))
}
async fn stop_turn(
    State(s): State<ApiState>,
    Path((session, turn)): Path<(String, String)>,
) -> Result<Json<Value>> {
    Ok(Json(serde_json::to_value(
        s.store.stop_turn(&session, &turn).await?,
    )?))
}
async fn resume_queue(
    State(s): State<ApiState>,
    Path(session): Path<String>,
) -> Result<Json<Value>> {
    s.store.resume_queue(&session).await?;
    Ok(Json(json!({"resumed":true})))
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct NewWorkflow {
    project_id: String,
    name: String,
    schema: Option<Value>,
}
async fn create_workflow(
    State(s): State<ApiState>,
    Json(i): Json<NewWorkflow>,
) -> Result<Json<Value>> {
    let schema = i.schema.unwrap_or_else(starter_schema);
    let _: Graph = serde_json::from_value(schema.clone())?;
    Ok(Json(serde_json::to_value(
        s.store
            .create_workflow(&i.project_id, &i.name, schema)
            .await?,
    )?))
}
async fn workflow(State(s): State<ApiState>, Path(id): Path<String>) -> Result<Json<Value>> {
    Ok(Json(serde_json::to_value(s.store.workflow(&id).await?)?))
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct WorkflowChanges {
    after_revision: i64,
    limit: Option<usize>,
}
async fn workflow_changes(
    State(s): State<ApiState>,
    Path(id): Path<String>,
    Query(q): Query<WorkflowChanges>,
) -> Result<Json<Value>> {
    Ok(Json(
        s.store
            .workflow_changes(&id, q.after_revision, q.limit.unwrap_or(20))
            .await?,
    ))
}
#[derive(Deserialize)]
struct SaveWorkflow {
    revision: i64,
    name: String,
    schema: Value,
}
async fn save_workflow(
    State(s): State<ApiState>,
    Path(id): Path<String>,
    Json(i): Json<SaveWorkflow>,
) -> Result<Json<Value>> {
    let _: Graph = serde_json::from_value(i.schema.clone())?;
    Ok(Json(serde_json::to_value(
        s.store
            .save_workflow(&id, i.revision, &i.name, i.schema)
            .await?,
    )?))
}
async fn validate(State(s): State<ApiState>, Path(id): Path<String>) -> Result<Json<Value>> {
    let w = s.store.workflow(&id).await?;
    let errors = runtime::validate(&w.schema)?;
    Ok(Json(
        json!({"valid":errors.is_empty(),"errors":errors,"supportedNodes":runtime::supported_types()}),
    ))
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct RunInput {
    inputs: Value,
    session_id: Option<String>,
    origin: Option<crate::run_debug::Origin>,
}
async fn run(
    State(s): State<ApiState>,
    Path(id): Path<String>,
    Json(i): Json<RunInput>,
) -> Result<Json<Value>> {
    if let Some(origin) = &i.origin {
        origin.validate()?;
    }
    let run = s.store.start_run(&id, i.session_id, i.inputs).await?;
    if let Some(origin) = &i.origin {
        s.store.link_debug_origin(&run.id, origin).await?;
    }
    Ok(Json(serde_json::to_value(run)?))
}
async fn run_list(
    State(s): State<ApiState>,
    Query(q): Query<crate::run_list::RunListQuery>,
) -> Result<Json<Value>> {
    Ok(Json(s.store.list_runs(&q, None).await?))
}
async fn run_detail(
    State(s): State<ApiState>,
    Path(id): Path<String>,
    Query(query): Query<crate::run_trace::TraceQuery>,
) -> Result<Json<Value>> {
    Ok(Json(s.store.inspect_trace(&id, &query).await?))
}
async fn debug_copy(
    State(s): State<ApiState>,
    Json(input): Json<crate::run_debug::DebugCopy>,
) -> Result<Json<Value>> {
    Ok(Json(s.store.prepare_debug_copy(input).await?))
}
async fn test_node(
    State(s): State<ApiState>,
    Path((id, node)): Path<(String, String)>,
    Json(input): Json<Value>,
) -> Result<Json<Value>> {
    let origin: Option<crate::run_debug::Origin> = input
        .get("origin")
        .cloned()
        .map(serde_json::from_value)
        .transpose()?;
    if let Some(origin) = &origin {
        origin.validate()?;
    }
    let run = s
        .store
        .start_node_test(&id, &node, serde_json::from_value(input)?)
        .await?;
    if let Some(origin) = &origin {
        s.store.link_debug_origin(&run.id, origin).await?;
    }
    Ok(Json(serde_json::to_value(run)?))
}
async fn cancel(State(s): State<ApiState>, Path(id): Path<String>) -> Result<Json<Value>> {
    s.store.run(&id).await?;
    let active = s.store.active.lock().await;
    let canceled = if let Some(token) = active.get(&id) {
        token.cancel();
        true
    } else {
        false
    };
    Ok(Json(json!({"canceled":canceled})))
}
#[derive(Deserialize, Default)]
#[serde(rename_all = "camelCase")]
struct EventQuery {
    after: Option<i64>,
    object_id: Option<String>,
}
async fn history(State(s): State<ApiState>, Query(q): Query<EventQuery>) -> Result<Json<Value>> {
    Ok(Json(serde_json::to_value(
        s.store
            .history(q.after.unwrap_or(0), q.object_id.as_deref())
            .await?,
    )?))
}
async fn events(
    State(s): State<ApiState>,
    headers: HeaderMap,
    Query(q): Query<EventQuery>,
) -> Sse<impl futures_util::Stream<Item = std::result::Result<SseEvent, Infallible>>> {
    let mut receiver = s.store.events.subscribe();
    let store = s.store.clone();
    let after = q
        .after
        .or_else(|| {
            headers
                .get("last-event-id")
                .and_then(|v| v.to_str().ok())
                .and_then(|v| v.parse().ok())
        })
        .unwrap_or(0);
    let stream = async_stream::stream! {
        yield Ok(SseEvent::default().comment("connected"));
        let mut cursor=after;
        loop{
            match store.history(cursor,q.object_id.as_deref()).await{
                Ok(batch)=>{let len=batch.len();for event in batch{cursor=event.sequence;yield Ok(SseEvent::default().id(event.sequence.to_string()).data(serde_json::to_string(&event).unwrap_or_default()));}if len<500{break;}},
                Err(_)=>{yield Ok(SseEvent::default().event("sync_error").data("{}"));return;}
            }
        }
        loop{match receiver.recv().await{
            Ok(event)=>{if event.sequence>cursor && q.object_id.as_ref().is_none_or(|id|*id==event.object_id){cursor=event.sequence;yield Ok(SseEvent::default().id(event.sequence.to_string()).data(serde_json::to_string(&event).unwrap_or_default()));}},
            Err(tokio::sync::broadcast::error::RecvError::Lagged(_))=>{
                loop {let Ok(batch)=store.history(cursor,q.object_id.as_deref()).await else{break;};let len=batch.len();for event in batch{cursor=event.sequence;yield Ok(SseEvent::default().id(event.sequence.to_string()).data(serde_json::to_string(&event).unwrap_or_default()));}if len<500{break;}}
            },
            Err(_)=>break,
        }}
    };
    Sse::new(stream).keep_alive(KeepAlive::new().interval(Duration::from_secs(15)))
}
async fn model_config(State(s): State<ApiState>) -> Result<Json<Value>> {
    Ok(Json(s.store.deployment_settings.model_summary().await?))
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct UpdateModel {
    base_url: String,
    model: Option<String>,
    api_key: Option<String>,
}
async fn save_model(State(s): State<ApiState>, Json(i): Json<UpdateModel>) -> Result<Json<Value>> {
    let existing = s.store.model.lock().await.clone();
    s.store
        .set_model(ModelConfig {
            base_url: i.base_url,
            model: i.model.filter(|v| !v.is_empty()).unwrap_or(existing.model),
            api_key: i
                .api_key
                .filter(|v| !v.is_empty())
                .unwrap_or(existing.api_key),
        })
        .await?;
    model_config(State(s)).await
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct ToolCall {
    project_id: String,
    session_id: Option<String>,
    name: String,
    arguments: Value,
}
async fn call_tool(State(s): State<ApiState>, Json(i): Json<ToolCall>) -> Result<Json<Value>> {
    Ok(Json(
        s.store
            .tool(&i.project_id, i.session_id.as_deref(), &i.name, i.arguments)
            .await?,
    ))
}
async fn mcp(State(s): State<ApiState>, Json(request): Json<Value>) -> Response {
    let id = request.get("id").cloned();
    if id.is_none() {
        return StatusCode::ACCEPTED.into_response();
    }
    let id = id.unwrap();
    let result:Result<Value>=async{match request["method"].as_str().unwrap_or_default(){
        "initialize"=>Ok(json!({"protocolVersion":"2025-03-26","capabilities":{"tools":{}},"serverInfo":{"name":"flowgram","version":"0.1.0"}})),
        "ping"=>Ok(json!({})),
        "tools/list"=>tools::mcp_list(request["params"]["cursor"].as_str()),
        "tools/call"=>{
            let args=&request["params"]["arguments"];let project=args["projectId"].as_str().ok_or_else(||Error::Invalid("Missing projectId".into()))?;let name=request["params"]["name"].as_str().unwrap_or_default();
            Ok(tools::mcp_result(match s.store.tool(project,None,name,args["arguments"].clone()).await { Ok(v)=>v, Err(e)=>e.tool_value() }))
        },
        _=>Err(Error::Invalid("Unsupported MCP method".into())),
    }}.await;
    Json(match result {
        Ok(result) => json!({"jsonrpc":"2.0","id":id,"result":result}),
        Err(e) => json!({"jsonrpc":"2.0","id":id,"error":{"code":-32602,"message":e.to_string()}}),
    })
    .into_response()
}

pub fn cors() -> tower_http::cors::CorsLayer {
    tower_http::cors::CorsLayer::new()
        .allow_origin([
            "http://127.0.0.1:1420".parse().unwrap(),
            "http://tauri.localhost".parse().unwrap(),
            "https://tauri.localhost".parse().unwrap(),
            "tauri://localhost".parse().unwrap(),
        ])
        .allow_methods([
            axum::http::Method::GET,
            axum::http::Method::POST,
            axum::http::Method::PUT,
            axum::http::Method::DELETE,
        ])
        .allow_headers([
            axum::http::header::AUTHORIZATION,
            axum::http::header::CONTENT_TYPE,
            axum::http::HeaderName::from_static("last-event-id"),
            axum::http::HeaderName::from_static("x-flowgram-project"),
        ])
}

async fn session_references(
    State(s): State<ApiState>,
    Path(id): Path<String>,
) -> Result<Json<Value>> {
    Ok(Json(s.store.session_references(&id).await?))
}

async fn resources(State(s): State<ApiState>) -> Result<Json<Value>> {
    let root = s.store.project_root.join("assets").canonicalize()?;
    if !root.starts_with(&s.store.project_root) {
        return Err(Error::Invalid(
            "Resource directory is outside the project".into(),
        ));
    }
    let mut entries = Vec::new();
    for entry in std::fs::read_dir(root)? {
        let entry = entry?;
        if entry.file_type()?.is_file() {
            entries.push(
                json!({"name":entry.file_name().to_string_lossy(),"size":entry.metadata()?.len()}),
            );
        }
    }
    entries.sort_by_key(|entry| entry["name"].as_str().unwrap_or_default().to_owned());
    Ok(Json(json!(entries)))
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct ResourceUpload {
    name: String,
    content_base64: String,
}
async fn import_resource(
    State(s): State<ApiState>,
    Json(input): Json<ResourceUpload>,
) -> Result<Json<Value>> {
    use base64::Engine;
    use std::io::Write;
    if input.name.is_empty()
        || input.name.len() > 200
        || input.name.starts_with('.')
        || input.name.contains(['/', '\\'])
    {
        return Err(Error::Invalid(
            "Use a plain resource filename without path separators".into(),
        ));
    }
    let root = s.store.project_root.join("assets").canonicalize()?;
    if !root.starts_with(&s.store.project_root) {
        return Err(Error::Invalid(
            "Resource directory is outside the project".into(),
        ));
    }
    let content = base64::engine::general_purpose::STANDARD
        .decode(input.content_base64)
        .map_err(|_| Error::Invalid("Invalid resource encoding".into()))?;
    if content.len() > 1_000_000 {
        return Err(Error::Invalid(
            "Resource files must be smaller than 1 MB".into(),
        ));
    }
    let mut file = std::fs::OpenOptions::new()
        .write(true)
        .create_new(true)
        .open(root.join(&input.name))
        .map_err(|error| {
            if error.kind() == std::io::ErrorKind::AlreadyExists {
                Error::Invalid("A resource with this name already exists".into())
            } else {
                error.into()
            }
        })?;
    file.write_all(&content)?;
    file.sync_all()?;
    Ok(Json(json!({"name":input.name,"size":content.len()})))
}
