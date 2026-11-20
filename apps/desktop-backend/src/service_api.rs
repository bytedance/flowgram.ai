//! HTTP and MCP adapters for the same published-operation application service.
use crate::{
    error::{Error, Result},
    services::*,
    store::Store,
};
use axum::{
    Json, Router,
    extract::{Path, Query, State},
    http::{HeaderMap, StatusCode},
    response::{
        IntoResponse, Response, Sse,
        sse::{Event, KeepAlive},
    },
    routing::{get, post},
};
use serde::Deserialize;
use serde_json::{Value, json};
use std::{
    convert::Infallible,
    time::{Duration, Instant},
};

pub fn admin_routes() -> Router<crate::api::ApiState> {
    Router::new()
        .route("/api/services", get(inventory).post(publish))
        .route("/api/services/{service}/releases/{version}", get(export))
        .route("/api/services/{service}/deployments", post(deploy))
        .route(
            "/api/services/{service}/{environment}/consumers",
            get(consumers).post(create_key),
        )
        .route(
            "/api/services/{service}/{environment}/consumers/{id}/revoke",
            post(revoke),
        )
        .route("/api/services/{service}/{environment}/runs", get(runs))
}
pub fn public_router(store: Store) -> Router {
    Router::new()
        .route(
            "/v1/services/{service}/{environment}/operations/{operation}/invoke",
            post(invoke),
        )
        .route(
            "/v1/services/{service}/{environment}/openapi.json",
            get(openapi),
        )
        .route("/v1/services/{service}/{environment}/mcp", post(mcp))
        .route(
            "/v1/services/{service}/{environment}/runs/{id}",
            get(detail),
        )
        .route(
            "/v1/services/{service}/{environment}/runs/{id}/cancel",
            post(cancel),
        )
        .route(
            "/v1/services/{service}/{environment}/runs/{id}/events",
            get(events),
        )
        .route(
            "/v1/services/{service}/{environment}/runs/{id}/result",
            get(download),
        )
        .layer(axum::extract::DefaultBodyLimit::max(2_000_000))
        .layer(axum::middleware::from_fn(origin))
        .with_state(store)
}
async fn origin(request: axum::extract::Request, next: axum::middleware::Next) -> Response {
    // No browser-origin access is needed for server-to-server consumers. Explicit rejection also prevents DNS rebinding.
    if request.headers().contains_key("origin") {
        return (StatusCode::FORBIDDEN,Json(json!({"error":{"code":"origin_not_allowed","message":"Business endpoints accept non-browser clients only"}}))).into_response();
    }
    next.run(request).await
}
async fn inventory(
    State(s): State<crate::api::ApiState>,
    headers: HeaderMap,
) -> Result<Json<Value>> {
    let mut value = s.store.service_inventory().await?;
    let project = s.store.projects().await?.remove(0);
    let host = headers
        .get("host")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("127.0.0.1");
    value["publicBase"] = json!(format!("http://{host}/v1/projects/{}", project.id));
    Ok(Json(value))
}
async fn publish(
    State(s): State<crate::api::ApiState>,
    Json(input): Json<Publish>,
) -> Result<Json<Bundle>> {
    Ok(Json(s.store.publish_service(input).await?))
}
async fn export(
    State(s): State<crate::api::ApiState>,
    Path((service, version)): Path<(String, String)>,
) -> Result<Response> {
    let bundle = s.store.release(&service, &version).await?;
    Ok((
        [
            ("content-type", "application/json"),
            (
                "content-disposition",
                &format!("attachment; filename=\"{service}-{version}.flowgram-service.json\""),
            ),
        ],
        serde_json::to_vec_pretty(&bundle)?,
    )
        .into_response())
}
async fn deploy(
    State(s): State<crate::api::ApiState>,
    Path(service): Path<String>,
    Json(input): Json<Deployment>,
) -> Result<Json<Deployment>> {
    if input.service != service {
        return Err(Error::Invalid(
            "Deployment service does not match URL".into(),
        ));
    }
    Ok(Json(s.store.deploy_service(input).await?))
}
async fn consumers(
    State(s): State<crate::api::ApiState>,
    Path((service, env)): Path<(String, String)>,
) -> Result<Json<Vec<Consumer>>> {
    Ok(Json(s.store.consumers(&service, &env).await?))
}
async fn create_key(
    State(s): State<crate::api::ApiState>,
    Path((service, env)): Path<(String, String)>,
    Json(input): Json<KeyInput>,
) -> Result<Json<Value>> {
    Ok(Json(s.store.create_consumer(&service, &env, input).await?))
}
async fn revoke(
    State(s): State<crate::api::ApiState>,
    Path((service, env, id)): Path<(String, String, String)>,
) -> Result<Json<Value>> {
    s.store.revoke_consumer(&service, &env, &id).await?;
    Ok(Json(json!({"revoked":true})))
}
async fn runs(
    State(s): State<crate::api::ApiState>,
    Path((service, env)): Path<(String, String)>,
) -> Result<Json<Value>> {
    Ok(Json(s.store.service_runs(&service, &env).await?))
}
async fn caller(store: &Store, service: &str, env: &str, headers: &HeaderMap) -> Result<Caller> {
    let token = headers
        .get("authorization")
        .and_then(|v| v.to_str().ok())
        .and_then(|v| v.strip_prefix("Bearer "))
        .ok_or_else(|| failure(401, "unauthorized", "Service bearer credential is required"))?;
    store.authenticate_consumer(service, env, token).await
}
#[derive(Deserialize, Default)]
#[serde(rename_all = "camelCase")]
struct Wait {
    #[serde(default)]
    wait_ms: u64,
}
async fn wait(store: &Store, caller: &Caller, id: &str, ms: u64) -> Result<Invocation> {
    let deadline = Instant::now() + Duration::from_millis(ms.min(30_000));
    loop {
        let run = store
            .service_run(
                &caller.deployment.service,
                &caller.deployment.environment,
                id,
                Some(&caller.consumer.id),
            )
            .await?;
        if run.status != "running" || Instant::now() >= deadline {
            return Ok(run);
        }
        tokio::time::sleep(Duration::from_millis(25)).await;
    }
}
async fn invoke(
    State(store): State<Store>,
    Path((service, env, op)): Path<(String, String, String)>,
    headers: HeaderMap,
    Query(q): Query<Wait>,
    Json(inputs): Json<Value>,
) -> Result<Response> {
    let caller = caller(&store, &service, &env, &headers).await?;
    let key = headers
        .get("idempotency-key")
        .and_then(|v| v.to_str().ok())
        .unwrap_or_default();
    let run = store.invoke_service(&caller, &op, inputs, key).await?;
    let run = wait(&store, &caller, &run.run_id, q.wait_ms).await?;
    let status = if run.status == "running" {
        StatusCode::ACCEPTED
    } else {
        StatusCode::OK
    };
    Ok((status, Json(run)).into_response())
}
async fn detail(
    State(store): State<Store>,
    Path((service, env, id)): Path<(String, String, String)>,
    headers: HeaderMap,
) -> Result<Json<Invocation>> {
    let caller = caller(&store, &service, &env, &headers).await?;
    Ok(Json(
        store
            .service_run(&service, &env, &id, Some(&caller.consumer.id))
            .await?,
    ))
}
async fn cancel_run(store: &Store, caller: &Caller, id: &str) -> Result<Invocation> {
    if !caller.consumer.can_cancel {
        return Err(failure(
            403,
            "forbidden",
            "Cancellation is not granted to this caller",
        ));
    }
    let run = store
        .service_run(
            &caller.deployment.service,
            &caller.deployment.environment,
            id,
            Some(&caller.consumer.id),
        )
        .await?;
    if let Some(token) = store.active.lock().await.get(id) {
        token.cancel();
    }
    Ok(run)
}
async fn cancel(
    State(store): State<Store>,
    Path((service, env, id)): Path<(String, String, String)>,
    headers: HeaderMap,
) -> Result<Json<Invocation>> {
    let caller = caller(&store, &service, &env, &headers).await?;
    Ok(Json(cancel_run(&store, &caller, &id).await?))
}
async fn download(
    State(store): State<Store>,
    Path((service, env, id)): Path<(String, String, String)>,
    headers: HeaderMap,
) -> Result<Response> {
    let caller = caller(&store, &service, &env, &headers).await?;
    let run = store
        .service_run(&service, &env, &id, Some(&caller.consumer.id))
        .await?;
    if run.status != "succeeded" {
        return Err(failure(
            409,
            "result_unavailable",
            "Result is available only after a successful run",
        ));
    }
    Ok((
        [
            ("content-type", "application/json"),
            (
                "content-disposition",
                "attachment; filename=\"result.json\"",
            ),
            ("cache-control", "no-store"),
        ],
        serde_json::to_vec_pretty(&run.outputs)?,
    )
        .into_response())
}
#[derive(Deserialize, Default)]
struct After {
    #[serde(default)]
    after: i64,
}
async fn events(
    State(store): State<Store>,
    Path((service, env, id)): Path<(String, String, String)>,
    headers: HeaderMap,
    Query(q): Query<After>,
) -> Result<Response> {
    let caller = caller(&store, &service, &env, &headers).await?;
    store
        .service_run(&service, &env, &id, Some(&caller.consumer.id))
        .await?;
    let mut after = headers
        .get("last-event-id")
        .and_then(|v| v.to_str().ok())
        .and_then(|v| v.parse::<i64>().ok())
        .unwrap_or(q.after)
        .max(0);
    let stream = async_stream::stream! {
        loop {
            // Recheck revocation on a long-lived stream. Identity is never inferred from the run ID.
            if !store.consumers(&service,&env).await.is_ok_and(|list|list.iter().any(|v|v.id==caller.consumer.id && !v.revoked)) {break;}
            let Ok(page)=store.history(after,Some(&id)).await else {break;};
            let full=page.len()==500;
            for event in page {
                after=event.sequence;
                // Progress projection deliberately omits internal inputs, model prompts and response headers.
                let value=if event.kind=="run_finished" {
                    match store.service_run(&service,&env,&id,Some(&caller.consumer.id)).await {Ok(run)=>json!({"sequence":after,"kind":"run_finished","run":run}),Err(_)=>break}
                } else {json!({"sequence":after,"kind":event.kind,"runId":id})};
                yield Ok::<_,Infallible>(Event::default().id(after.to_string()).json_data(value).unwrap());
            }
            if full {continue;}
            if !store.run(&id).await.is_ok_and(|run|run.status=="running") {
                if let Ok(run)=store.service_run(&service,&env,&id,Some(&caller.consumer.id)).await {
                    yield Ok::<_,Infallible>(Event::default().json_data(json!({"kind":"snapshot","run":run})).unwrap());
                }
                break;
            }
            tokio::time::sleep(Duration::from_millis(200)).await;
        }
    };
    Ok((
        [("cache-control", "no-store"), ("x-accel-buffering", "no")],
        Sse::new(stream).keep_alive(KeepAlive::default()),
    )
        .into_response())
}
fn run_schema() -> Value {
    json!({"type":"object","properties":{"runId":{"type":"string"},"service":{"type":"string"},"environment":{"type":"string"},"operation":{"type":"string"},"version":{"type":"string"},"status":{"type":"string","enum":["running","succeeded","failed","canceled","interrupted"]},"outputs":{},"error":{"type":["string","null"]},"createdAt":{"type":"string"}},"required":["runId","status","outputs","version"],"additionalProperties":false})
}
fn operation_tool(op: &Operation) -> Value {
    let mut input = op.input_schema.clone();
    // A required metadata object makes retries safe even if an Agent loses a response.
    input["properties"]["_flowgram"] = json!({"type":"object","properties":{"idempotencyKey":{"type":"string","minLength":1,"maxLength":200},"waitMs":{"type":"integer","minimum":0,"maximum":30000}},"required":["idempotencyKey"],"additionalProperties":false});
    let required = input
        .as_object_mut()
        .unwrap()
        .entry("required")
        .or_insert(json!([]));
    required.as_array_mut().unwrap().push(json!("_flowgram"));
    json!({"name":op.name,"description":format!("{} Returns a run handle and status; use flowgram_get_run until terminal. Reuse _flowgram.idempotencyKey when retrying the same business request.",op.description),"inputSchema":input,"outputSchema":run_schema(),"annotations":{"readOnlyHint":op.read_only,"destructiveHint":!op.read_only,"idempotentHint":true,"openWorldHint":true}})
}
async fn openapi(
    axum::extract::OriginalUri(uri): axum::extract::OriginalUri,
    State(store): State<Store>,
    Path((service, env)): Path<(String, String)>,
    headers: HeaderMap,
) -> Result<Json<Value>> {
    let caller = caller(&store, &service, &env, &headers).await?;
    let release = store.release(&service, &caller.deployment.version).await?;
    let base = uri.path().trim_end_matches("/openapi.json").to_owned();
    let mut paths = serde_json::Map::new();
    for op in release
        .operations
        .iter()
        .filter(|op| caller.consumer.operations.contains(&op.name))
    {
        paths.insert(format!("{base}/operations/{}/invoke",op.name),json!({"post":{"operationId":op.name,"description":op.description,"security":[{"serviceKey":[]}],"parameters":[{"in":"header","name":"Idempotency-Key","required":true,"schema":{"type":"string","minLength":1,"maxLength":200}},{"in":"query","name":"waitMs","schema":{"type":"integer","minimum":0,"maximum":30000}}],"requestBody":{"required":true,"content":{"application/json":{"schema":op.input_schema}}},"responses":{"200":{"description":"Terminal run; inspect status for execution outcome","content":{"application/json":{"schema":run_schema()}}},"202":{"description":"Accepted; poll runId","content":{"application/json":{"schema":run_schema()}}},"409":{"description":"Idempotency key conflicts with another input"},"422":{"description":"Input contract violation"},"429":{"description":"Concurrency limit"}},"x-flowgram-outputSchema":op.output_schema}}));
    }
    paths.insert(format!("{base}/runs/{{runId}}"),json!({"get":{"operationId":"getRun","security":[{"serviceKey":[]}],"parameters":[{"in":"path","name":"runId","required":true,"schema":{"type":"string"}}],"responses":{"200":{"description":"Caller-owned run","content":{"application/json":{"schema":run_schema()}}}}}}));
    let run_parameter =
        json!({"in":"path","name":"runId","required":true,"schema":{"type":"string"}});
    for (suffix, method, operation_id, description, media) in [
        (
            "/events",
            "get",
            "getRunEvents",
            "Replayable caller-owned progress stream",
            "text/event-stream",
        ),
        (
            "/result",
            "get",
            "downloadRunResult",
            "Download the completed business JSON output",
            "application/json",
        ),
    ] {
        paths.insert(format!("{base}/runs/{{runId}}{suffix}"), json!({
            method: {
                "operationId": operation_id,
                "description": description,
                "security": [{"serviceKey":[]}],
                "parameters": [run_parameter],
                "responses": {"200": {"description": description, "content": {media: {"schema": {}}}}}
            }
        }));
    }
    if caller.consumer.can_cancel {
        paths.insert(format!("{base}/runs/{{runId}}/cancel"),json!({"post":{"operationId":"cancelRun","security":[{"serviceKey":[]}],"parameters":[run_parameter],"responses":{"200":{"description":"Cancellation requested; completed side effects remain","content":{"application/json":{"schema":run_schema()}}}}}}));
    }
    Ok(Json(
        json!({"openapi":"3.1.0","info":{"title":release.title,"version":release.version},"paths":paths,"components":{"securitySchemes":{"serviceKey":{"type":"http","scheme":"bearer"}}}}),
    ))
}
async fn mcp(
    State(store): State<Store>,
    Path((service, env)): Path<(String, String)>,
    headers: HeaderMap,
    Json(request): Json<Value>,
) -> Result<Response> {
    let caller = caller(&store, &service, &env, &headers).await?;
    if request["jsonrpc"] != "2.0" || !request["method"].is_string() {
        return Ok((StatusCode::BAD_REQUEST,Json(json!({"jsonrpc":"2.0","id":request.get("id"),"error":{"code":-32600,"message":"Invalid JSON-RPC request"}}))).into_response());
    }
    let version = headers
        .get("mcp-protocol-version")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("2025-03-26");
    if !["2025-03-26", "2025-06-18", "2025-11-25", "2026-07-28"].contains(&version) {
        return Err(Error::Invalid("Unsupported MCP protocol version".into()));
    }
    let modern = version == "2026-07-28";
    if modern {
        let meta = &request["params"]["_meta"];
        if meta["io.modelcontextprotocol/protocolVersion"] != version
            || !meta["io.modelcontextprotocol/clientInfo"].is_object()
            || !meta["io.modelcontextprotocol/clientCapabilities"].is_object()
            || headers.get("mcp-method").and_then(|v| v.to_str().ok()) != request["method"].as_str()
            || (request["method"] == "tools/call"
                && headers.get("mcp-name").and_then(|v| v.to_str().ok())
                    != request["params"]["name"].as_str())
        {
            return Err(Error::Invalid(
                "MCP request metadata and routing headers must match".into(),
            ));
        }
    }
    let Some(id) = request.get("id") else {
        return Ok(
            if request["method"] == "notifications/initialized" && !modern {
                StatusCode::ACCEPTED.into_response()
            } else {
                StatusCode::BAD_REQUEST.into_response()
            },
        );
    };
    let release = store.release(&service, &caller.deployment.version).await?;
    let result:Result<Value>=async {match request["method"].as_str().unwrap() {
        "initialize" if !modern=>{let requested=request["params"]["protocolVersion"].as_str().unwrap_or("2025-03-26");let selected=if ["2025-03-26","2025-06-18","2025-11-25"].contains(&requested) {requested} else {"2025-11-25"}; Ok(json!({"protocolVersion":selected,"capabilities":{"tools":{}},"serverInfo":{"name":release.service,"version":release.version}}))},
        "ping"=>Ok(json!({})),
        "tools/list"=>{
            let mut tools:Vec<Value>=release.operations.iter().filter(|op|caller.consumer.operations.contains(&op.name)).map(operation_tool).collect();
            tools.push(json!({"name":"flowgram_get_run","description":"Read the status and structured output of a run owned by this caller.","inputSchema":{"type":"object","properties":{"runId":{"type":"string"}},"required":["runId"],"additionalProperties":false},"outputSchema":run_schema(),"annotations":{"readOnlyHint":true}}));
            if caller.consumer.can_cancel {tools.push(json!({"name":"flowgram_cancel_run","description":"Request cancellation of a caller-owned run. Completed external side effects remain.","inputSchema":{"type":"object","properties":{"runId":{"type":"string"}},"required":["runId"],"additionalProperties":false},"outputSchema":run_schema(),"annotations":{"readOnlyHint":false,"destructiveHint":true}}));}
            tools.sort_by(|a,b|a["name"].as_str().cmp(&b["name"].as_str()));
            let mut value=json!({"tools":tools});if modern {value["resultType"]=json!("complete");value["ttlMs"]=json!(0);value["cacheScope"]=json!("private");} Ok(value)
        },
        "tools/call"=>{
            let name=request["params"]["name"].as_str().ok_or_else(||Error::Invalid("Missing tool name".into()))?;
            let mut args=request["params"]["arguments"].clone();
            let outcome:Result<Invocation>=async {match name {
                "flowgram_get_run"=>store.service_run(&service,&env,args["runId"].as_str().unwrap_or_default(),Some(&caller.consumer.id)).await,
                "flowgram_cancel_run"=>cancel_run(&store,&caller,args["runId"].as_str().unwrap_or_default()).await,
                _=>{
                    let meta=args.as_object_mut().and_then(|a|a.remove("_flowgram")).ok_or_else(||Error::Invalid("_flowgram.idempotencyKey is required".into()))?;
                    let run=store.invoke_service(&caller,name,args,meta["idempotencyKey"].as_str().unwrap_or_default()).await?;
                    wait(&store,&caller,&run.run_id,meta["waitMs"].as_u64().unwrap_or(0)).await
                }
            }}.await;
            let mut value=match outcome {Ok(run)=>{let error=matches!(run.status.as_str(),"failed"|"canceled"|"interrupted");let structured=serde_json::to_value(run)?;json!({"content":[{"type":"text","text":structured.to_string()}],"structuredContent":structured,"isError":error})},Err(error)=>json!({"content":[{"type":"text","text":error.to_string()}],"isError":true})};
            if modern {value["resultType"]=json!("complete");} Ok(value)
        },
        _=>Err(failure(404,"method_not_found","Unsupported MCP method")),
    }}.await;
    let status = if modern
        && matches!(
            &result,
            Err(Error::Service {
                code: "method_not_found",
                ..
            })
        ) {
        StatusCode::NOT_FOUND
    } else {
        StatusCode::OK
    };
    Ok((status,Json(match result {Ok(value)=>json!({"jsonrpc":"2.0","id":id,"result":value}),Err(error)=>json!({"jsonrpc":"2.0","id":id,"error":{"code":if request["method"]=="tools/list" || request["method"]=="tools/call" {-32602} else {-32601},"message":error.to_string()}})})).into_response())
}

/// Opt-in administration for a standalone host. The default public router contains no management API.
pub fn host_admin_router(store: Store, token: String) -> Router {
    let auth = move |request: axum::extract::Request, next: axum::middleware::Next| {
        let expected = token.clone();
        async move {
            if request.headers().contains_key("origin")
                || request
                    .headers()
                    .get("authorization")
                    .and_then(|v| v.to_str().ok())
                    .and_then(|v| v.strip_prefix("Bearer "))
                    != Some(expected.as_str())
            {
                return StatusCode::UNAUTHORIZED.into_response();
            }
            next.run(request).await
        }
    };
    Router::new()
        .route(
            "/admin/models",
            get(|State(store): State<Store>| async move {
                store.deployment_settings.models_inventory().await.map(Json)
            }),
        )
        .route("/admin/connections", post(provision_connections))
        .route(
            "/admin/services/{service}/{environment}/runs",
            get(host_run_list),
        )
        .route(
            "/admin/services/{service}/{environment}/runs/{id}",
            get(host_run_detail),
        )
        .route(
            "/admin/services/{service}/{environment}/runs/{id}/cancel",
            post(host_run_cancel),
        )
        .route(
            "/admin/credentials/{id}",
            axum::routing::put(
                |State(s): State<Store>,
                 Path(id): Path<String>,
                 Json(input): Json<crate::deployment_settings::CredentialInput>| async move {
                    s.deployment_settings.save_credential(&id, input).await?;
                    Ok::<_, Error>(Json(json!({"saved":true})))
                },
            ),
        )
        .route(
            "/admin/services/{service}/{environment}",
            get(host_service_detail),
        )
        .route(
            "/admin/status",
            get(|State(s): State<Store>| async move { s.service_inventory().await.map(Json) }),
        )
        .route(
            "/admin/releases",
            post(|State(s): State<Store>, Json(b): Json<Bundle>| async move {
                s.import_service(b).await.map(Json)
            }),
        )
        .route(
            "/admin/deployments",
            post(
                |State(s): State<Store>, Json(d): Json<Deployment>| async move {
                    s.deploy_service(d).await.map(Json)
                },
            ),
        )
        .route(
            "/admin/consumers/{service}/{environment}",
            post(
                |State(s): State<Store>,
                 Path((service, env)): Path<(String, String)>,
                 Json(k): Json<KeyInput>| async move {
                    s.create_consumer(&service, &env, k).await.map(Json)
                },
            ),
        )
        .route(
            "/admin/consumers/{service}/{environment}/{id}/revoke",
            post(
                |State(s): State<Store>,
                 Path((service, env, id)): Path<(String, String, String)>| async move {
                    s.revoke_consumer(&service, &env, &id)
                        .await
                        .map(|_| Json(json!({"revoked":true})))
                },
            ),
        )
        .layer(axum::extract::DefaultBodyLimit::max(8_000_000))
        .layer(axum::middleware::from_fn(auth))
        .with_state(store)
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
struct ProvisionConnections {
    service: String,
    environment: String,
    project_id: String,
    credentials: Vec<ProvisionCredential>,
    bindings: std::collections::BTreeMap<String, String>,
}
#[derive(Deserialize)]
struct ProvisionCredential {
    id: String,
    #[serde(flatten)]
    input: crate::deployment_settings::CredentialInput,
}
async fn provision_connections(
    State(s): State<Store>,
    Json(input): Json<ProvisionConnections>,
) -> Result<Json<Value>> {
    let bytes: Option<String> = sqlx::query_scalar(
        "SELECT bundle FROM service_releases WHERE service=? ORDER BY created_at DESC LIMIT 1",
    )
    .bind(&input.service)
    .fetch_optional(&s.db)
    .await?;
    let bundle: Bundle =
        serde_json::from_str(&bytes.ok_or_else(|| Error::NotFound("Release not found".into()))?)?;
    if bundle.workflows[0].project_id != input.project_id {
        return Err(Error::Invalid(
            "Credential project does not match the release source".into(),
        ));
    }
    for credential in input.credentials {
        if credential.input.purpose != "connection"
            || credential.input.project_ids.as_ref() != Some(&vec![input.project_id.clone()])
        {
            return Err(Error::Invalid(
                "Published credentials must be restricted to their source project".into(),
            ));
        }
        s.deployment_settings
            .save_credential(&credential.id, credential.input)
            .await?;
    }
    s.configure_service_connections(
        &input.service,
        &input.environment,
        &input.bindings,
        &input.project_id,
    )
    .await?;
    Ok(Json(json!({"configured":true})))
}
async fn host_service_detail(
    State(s): State<Store>,
    Path((service, environment)): Path<(String, String)>,
) -> Result<Json<Value>> {
    Ok(Json(
        json!({"deployment":s.deployment(&service,&environment).await?,"consumers":s.consumers(&service,&environment).await?,"runs":s.service_runs(&service,&environment).await?,"checkedAt":crate::store::now()}),
    ))
}

async fn host_run_list(
    State(s): State<Store>,
    Path((service, environment)): Path<(String, String)>,
    Query(q): Query<crate::run_list::RunListQuery>,
) -> Result<Json<Value>> {
    s.deployment(&service, &environment).await?;
    Ok(Json(s.list_runs(&q, Some((&service, &environment))).await?))
}
async fn host_run_detail(
    State(s): State<Store>,
    Path((service, environment, id)): Path<(String, String, String)>,
    Query(q): Query<crate::run_trace::TraceQuery>,
) -> Result<Json<Value>> {
    s.service_run(&service, &environment, &id, None).await?;
    Ok(Json(s.inspect_trace(&id, &q).await?))
}
async fn host_run_cancel(
    State(s): State<Store>,
    Path((service, environment, id)): Path<(String, String, String)>,
) -> Result<Json<Value>> {
    s.service_run(&service, &environment, &id, None).await?;
    let canceled = if let Some(token) = s.active.lock().await.get(&id) {
        token.cancel();
        true
    } else {
        false
    };
    Ok(Json(json!({"canceled":canceled})))
}
