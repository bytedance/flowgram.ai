use super::{
    Capabilities, Connection, Defaults, Entry, Parameters, Resolved, Verification,
    transport::{self, Query},
};
use crate::{
    error::{Error, Result},
    registry::{Registry, RegistryState},
    store::now,
};
use axum::{
    Json, Router,
    extract::{Path, State},
    routing::{get, post, put},
};
use serde::Deserialize;
use serde_json::{Value, json};
use sqlx::Row;
use tokio_util::sync::CancellationToken;

pub(crate) fn routes() -> Router<RegistryState> {
    Router::new()
        .route("/api/settings/models", get(inventory))
        .route("/api/settings/models/defaults", put(defaults))
        .route("/api/settings/models/connections", post(create_connection))
        .route(
            "/api/settings/models/connections/{id}",
            put(update_connection).delete(delete_connection),
        )
        .route(
            "/api/settings/models/connections/{id}/discover",
            post(discover),
        )
        .route("/api/settings/models/entries", post(create_entry))
        .route(
            "/api/settings/models/entries/{id}",
            put(update_entry).delete(delete_entry),
        )
        .route(
            "/api/settings/models/entries/{id}/references",
            get(references),
        )
        .route("/api/settings/models/entries/{id}/test", post(test))
}
async fn inventory(State(s): State<RegistryState>) -> Result<Json<Value>> {
    Ok(Json(
        s.registry.deployment_settings.models_inventory().await?,
    ))
}
async fn defaults(
    State(s): State<RegistryState>,
    Json(input): Json<Defaults>,
) -> Result<Json<Defaults>> {
    let _guard = s.registry.mutations.lock().await;
    Ok(Json(
        s.registry
            .deployment_settings
            .save_model_defaults(input)
            .await?,
    ))
}
async fn create_connection(
    State(s): State<RegistryState>,
    Json(mut input): Json<Connection>,
) -> Result<Json<Connection>> {
    let _guard = s.registry.mutations.lock().await;
    input.id.clear();
    input.revision = 0;
    Ok(Json(
        s.registry
            .deployment_settings
            .save_model_connection(input)
            .await?,
    ))
}
async fn update_connection(
    State(s): State<RegistryState>,
    Path(id): Path<String>,
    Json(mut input): Json<Connection>,
) -> Result<Json<Connection>> {
    let _guard = s.registry.mutations.lock().await;
    input.id = id;
    Ok(Json(
        s.registry
            .deployment_settings
            .save_model_connection(input)
            .await?,
    ))
}
async fn create_entry(
    State(s): State<RegistryState>,
    Json(mut input): Json<Entry>,
) -> Result<Json<Entry>> {
    let _guard = s.registry.mutations.lock().await;
    input.id.clear();
    input.revision = 0;
    Ok(Json(
        s.registry
            .deployment_settings
            .save_model_entry(input)
            .await?,
    ))
}
async fn update_entry(
    State(s): State<RegistryState>,
    Path(id): Path<String>,
    Json(mut input): Json<Entry>,
) -> Result<Json<Entry>> {
    let _guard = s.registry.mutations.lock().await;
    input.id = id;
    Ok(Json(
        s.registry
            .deployment_settings
            .save_model_entry(input)
            .await?,
    ))
}
impl Registry {
    pub async fn model_references(&self, id: &str) -> Result<Vec<Value>> {
        let mut output = Vec::new();
        let defaults = self.deployment_settings.model_defaults().await?;
        if defaults.chat.as_deref() == Some(id) {
            output.push(json!({"kind":"default","name":"New chats"}));
        }
        if defaults.workflow.as_deref() == Some(id) {
            output.push(json!({"kind":"default","name":"Workflow default"}));
        }
        fn contains(value: &Value, id: &str) -> bool {
            if value
                .as_object()
                .is_some_and(|o| o.get("modelId").and_then(Value::as_str) == Some(id))
            {
                return true;
            }
            match value {
                Value::Object(o) => o.values().any(|v| contains(v, id)),
                Value::Array(a) => a.iter().any(|v| contains(v, id)),
                _ => false,
            }
        }
        for project in self.projects().await {
            let store = self.resolve(&project.id).await?;
            for workflow in store.sync_workflow_index().await? {
                if contains(&workflow.schema, id) {
                    output.push(
                        json!({"kind":"workflow","projectId":project.id,"name":workflow.name}),
                    );
                }
            }
            for row in sqlx::query("SELECT s.title,m.selection FROM session_models m JOIN sessions s ON s.id=m.session_id").fetch_all(&store.db).await? {
                if contains(&serde_json::from_str::<Value>(row.get("selection"))?,id){output.push(json!({"kind":"session","projectId":project.id,"name":row.get::<String,_>("title")}));}
            }
            for (kind, sql) in [
                (
                    "input",
                    "SELECT m.definition FROM input_models m JOIN conversation_inputs i ON i.id=m.input_id WHERE i.status='queued'",
                ),
                (
                    "turn",
                    "SELECT m.definition FROM turn_models m JOIN conversation_turns t ON t.id=m.turn_id WHERE t.status IN ('running','stopping')",
                ),
                (
                    "run",
                    "SELECT m.definition FROM run_models m JOIN runs r ON r.id=m.run_id WHERE r.status='running'",
                ),
                (
                    "deployment",
                    "SELECT m.definition FROM service_models m JOIN service_deployments d ON d.service=m.service AND d.environment=m.environment AND json_extract(d.definition,'$.version')=m.version",
                ),
            ] {
                for text in sqlx::query_scalar::<_, String>(sql)
                    .fetch_all(&store.db)
                    .await?
                {
                    if contains(&serde_json::from_str::<Value>(&text)?, id) {
                        output
                            .push(json!({"kind":kind,"projectId":project.id,"name":project.name}));
                        break;
                    }
                }
            }
        }
        for text in
            sqlx::query_scalar::<_, String>("SELECT definition FROM publication_deployments")
                .fetch_all(&self.deployment_settings.db)
                .await?
        {
            let value: Value = serde_json::from_str(&text)?;
            if value["modelBindings"]
                .as_object()
                .is_some_and(|b| b.values().any(|v| v == id))
            {
                output.push(json!({"kind":"deployment","name":value["environment"]}));
            }
        }
        Ok(output)
    }
}
async fn references(State(s): State<RegistryState>, Path(id): Path<String>) -> Result<Json<Value>> {
    Ok(Json(
        json!({"references":s.registry.model_references(&id).await?}),
    ))
}
async fn delete_entry(
    State(s): State<RegistryState>,
    Path(id): Path<String>,
) -> Result<Json<Value>> {
    let _guard = s.registry.mutations.lock().await;
    if !s.registry.model_references(&id).await?.is_empty() {
        return Err(Error::Invalid(
            "Replace model references before deleting this model".into(),
        ));
    }
    let mut tx = s.registry.deployment_settings.db.begin().await?;
    sqlx::query("DELETE FROM model_verifications WHERE model_id=?")
        .bind(&id)
        .execute(&mut *tx)
        .await?;
    sqlx::query("DELETE FROM model_entries WHERE id=?")
        .bind(&id)
        .execute(&mut *tx)
        .await?;
    tx.commit().await?;
    Ok(Json(json!({"deleted":true})))
}
async fn delete_connection(
    State(s): State<RegistryState>,
    Path(id): Path<String>,
) -> Result<Json<Value>> {
    let _guard = s.registry.mutations.lock().await;
    let entries = s.registry.deployment_settings.model_entries().await?;
    for entry in entries.iter().filter(|m| m.connection_id == id) {
        if !s.registry.model_references(&entry.id).await?.is_empty() {
            return Err(Error::Invalid(
                "Replace model references before deleting this connection".into(),
            ));
        }
    }
    let mut tx = s.registry.deployment_settings.db.begin().await?;
    sqlx::query("DELETE FROM model_verifications WHERE model_id IN (SELECT id FROM model_entries WHERE connection_id=?)").bind(&id).execute(&mut *tx).await?;
    sqlx::query("DELETE FROM model_entries WHERE connection_id=?")
        .bind(&id)
        .execute(&mut *tx)
        .await?;
    sqlx::query("DELETE FROM model_connections WHERE id=?")
        .bind(&id)
        .execute(&mut *tx)
        .await?;
    tx.commit().await?;
    Ok(Json(json!({"deleted":true})))
}
async fn discover(State(s): State<RegistryState>, Path(id): Path<String>) -> Result<Json<Value>> {
    let catalog = &s.registry.deployment_settings;
    let c = catalog.model_connection(&id).await?;
    let mut request = reqwest::Client::builder()
        .redirect(reqwest::redirect::Policy::none())
        .timeout(std::time::Duration::from_secs(15))
        .build()
        .map_err(|_| Error::Execution("Cannot initialize model transport".into()))?
        .get(format!("{}/models", c.base_url));
    if c.protocol == super::Protocol::Anthropic {
        request = request.header("anthropic-version", "2023-06-01");
    }
    if let Some(id) = &c.credential_id {
        let secret = catalog.secret(id, None, "connection").await?;
        request = if c.protocol == super::Protocol::Anthropic {
            request.header("x-api-key", secret)
        } else {
            request.bearer_auth(secret)
        };
    }
    let response = request.send().await.map_err(|_| {
        Error::Execution("Cannot fetch models. Check the connection or add a model manually".into())
    })?;
    if !response.status().is_success() {
        return Err(Error::Execution(format!(
            "Model discovery returned HTTP {}. You can add models manually",
            response.status().as_u16()
        )));
    }
    use futures_util::StreamExt;
    let mut bytes = Vec::new();
    let mut stream = response.bytes_stream();
    while let Some(chunk) = stream.next().await {
        let chunk = chunk.map_err(|_| Error::Execution("Model discovery disconnected".into()))?;
        if bytes.len() + chunk.len() > 2_000_000 {
            return Err(Error::Execution(
                "Model discovery exceeded the size limit".into(),
            ));
        }
        bytes.extend_from_slice(&chunk);
    }
    let value: Value = serde_json::from_slice(&bytes)
        .map_err(|_| Error::Execution("Model discovery returned invalid JSON".into()))?;
    let list = value["data"].as_array().ok_or_else(|| {
        Error::Execution("This service does not provide a model list. Add models manually".into())
    })?;
    let mut models = list
        .iter()
        .take(1000)
        .filter_map(|v| {
            v["id"]
                .as_str()
                .map(|id| json!({"modelId":id,"name":v["display_name"].as_str().unwrap_or(id)}))
        })
        .collect::<Vec<_>>();
    models.sort_by(|a, b| a["modelId"].as_str().cmp(&b["modelId"].as_str()));
    models.dedup_by(|a, b| a["modelId"] == b["modelId"]);
    Ok(Json(json!({"models":models})))
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
struct Test {
    #[serde(default)]
    tools: bool,
    project_id: Option<String>,
}
async fn test(
    State(s): State<RegistryState>,
    Path(id): Path<String>,
    Json(input): Json<Test>,
) -> Result<Json<Verification>> {
    let catalog = &s.registry.deployment_settings;
    let model = catalog.model_entry(&id).await?;
    let connection = catalog.model_connection(&model.connection_id).await?;
    let credentials = catalog.credentials().await?;
    let scope = connection
        .credential_id
        .as_ref()
        .and_then(|id| credentials.as_array()?.iter().find(|c| c["id"] == *id))
        .map(|c| c["projectIds"].clone())
        .unwrap_or(Value::Null);
    let projects = s.registry.projects().await;
    let project = input
        .project_id
        .or_else(|| {
            projects
                .iter()
                .find(|p| {
                    scope.is_null()
                        || scope
                            .as_array()
                            .is_some_and(|a| a.iter().any(|id| id == &p.id))
                })
                .map(|p| p.id.clone())
        })
        .unwrap_or_else(|| "model-test".into());
    if project != "model-test" && !projects.iter().any(|p| p.id == project) {
        return Err(Error::Invalid(
            "Select a registered project for model testing".into(),
        ));
    }
    let credential_revision = if let Some(credential) = &connection.credential_id {
        sqlx::query_scalar::<_, String>("SELECT updated_at FROM credentials WHERE id=?")
            .bind(credential)
            .fetch_optional(&catalog.db)
            .await?
    } else {
        None
    };
    let config = Resolved {
        model_id: model.id.clone(),
        model_name: model.name.clone(),
        upstream_model: model.model_id.clone(),
        model_revision: model.revision,
        connection_id: connection.id.clone(),
        connection_name: connection.name.clone(),
        connection_revision: connection.revision,
        protocol: connection.protocol,
        base_url: connection.base_url.clone(),
        credential_id: connection.credential_id.clone(),
        timeout_ms: connection.timeout_ms.min(30000),
        context_window: model.context_window,
        capabilities: Capabilities {
            streaming: Some(true),
            ..model.capabilities.clone()
        },
        parameters: Parameters::default(),
        project_id: project,
    };
    let started = std::time::Instant::now();
    let nonce = crate::store::id();
    let cancel = CancellationToken::new();
    let mut streamed = None;
    let attempt=async {
        let response=transport::request(catalog,&config,Query{trace:None,input:json!([{"role":"user","content":format!("Reply with this exact value and nothing else: {nonce}")}]),tools:None,instructions:None,turn:None,force_tool:false},&cancel,None).await?;
        streamed = Some(response.streamed);
        if !crate::agent::output_text(&response.value).contains(&nonce){return Err(Error::Execution("The model did not return the test value".into()));}
        if input.tools {
            let tools=json!([{"type":"function","name":"flowgram_echo","description":"Echo a test value without external effects.","parameters":{"type":"object","properties":{"value":{"type":"string"}},"required":["value"],"additionalProperties":false}}]);
            let mut history=vec![json!({"role":"user","content":format!("Call flowgram_echo with value {nonce}, then return the tool result exactly.")})];
            let response=transport::request(catalog,&config,Query{trace:None,input:json!(history),tools:Some(tools),instructions:None,turn:None,force_tool:true},&cancel,None).await?;
            let output=response.value["output"].as_array().ok_or_else(||Error::Execution("Invalid tool test response".into()))?;
            let calls=output.iter().filter(|v|v["type"]=="function_call").collect::<Vec<_>>();
            if calls.len()!=1||calls[0]["name"]!="flowgram_echo"||serde_json::from_str::<Value>(calls[0]["arguments"].as_str().unwrap_or("")).ok().and_then(|v|v["value"].as_str().map(str::to_owned)).as_deref()!=Some(&nonce) {return Err(Error::Execution("The model did not complete the expected tool call".into()));}
            history.extend(output.iter().cloned());history.push(json!({"type":"function_call_output","call_id":calls[0]["call_id"],"output":nonce}));
            let final_response=transport::request(catalog,&config,Query{trace:None,input:json!(history),tools:None,instructions:None,turn:None,force_tool:false},&cancel,None).await?;
            if !crate::agent::output_text(&final_response.value).contains(&nonce){return Err(Error::Execution("The model did not consume the tool result".into()));}
        }
        Ok::<_,Error>(())
    }.await;
    let success = attempt.is_ok();
    let mut verification = Verification {
        streaming: streamed,
        checked_at: now(),
        connection_revision: connection.revision,
        model_revision: model.revision,
        credential_revision,
        success,
        tools: if input.tools { Some(success) } else { None },
        message: attempt
            .err()
            .map(|e| e.to_string())
            .unwrap_or_else(|| "Model test passed".into()),
        elapsed_ms: started.elapsed().as_millis() as u64,
    };
    let _guard = s.registry.mutations.lock().await;
    if catalog.model_connection(&connection.id).await?.revision != connection.revision
        || catalog.model_entry(&model.id).await?.revision != model.revision
    {
        return Err(Error::Conflict);
    }
    if let Some(credential) = &connection.credential_id {
        let current: Option<String> =
            sqlx::query_scalar("SELECT updated_at FROM credentials WHERE id=?")
                .bind(credential)
                .fetch_optional(&catalog.db)
                .await?;
        if current != verification.credential_revision {
            return Err(Error::Conflict);
        }
    }
    if success {
        let mut confirmed = model.clone();
        confirmed.capabilities.streaming = streamed;
        if input.tools {
            confirmed.capabilities.tools = Some(true);
        }
        let confirmed = catalog.save_model_entry(confirmed).await?;
        verification.model_revision = confirmed.revision;
    }
    sqlx::query("INSERT INTO model_verifications VALUES(?,?) ON CONFLICT(model_id) DO UPDATE SET definition=excluded.definition").bind(&id).bind(serde_json::to_string(&verification)?).execute(&catalog.db).await?;
    Ok(Json(verification))
}
