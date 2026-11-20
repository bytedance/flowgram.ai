//! Global deployment control plane; project stores remain the source of immutable releases.
use crate::{
    deployment_settings::{CredentialInput, Target},
    error::{Error, Result},
    registry::{Registry, RegistryState},
    services::{Bundle, Deployment, Operation, Publish},
    store::{id, now},
};
use axum::{
    Json, Router,
    extract::{Path, Query, State},
    http::HeaderMap,
    routing::{get, post},
};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use sqlx::Row;
use std::collections::BTreeMap;

#[derive(Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Draft {
    pub title: String,
    pub version: String,
    #[serde(default)]
    pub notes: String,
    pub operations: Vec<Operation>,
    pub target_id: String,
    pub environment: String,
    pub max_concurrency: u32,
    #[serde(default)]
    pub bindings: BTreeMap<String, Value>,
    #[serde(default)]
    pub credential_bindings: BTreeMap<String, String>,
    #[serde(default)]
    pub model_bindings: BTreeMap<String, String>,
    #[serde(default)]
    pub callback: Option<crate::services::Callback>,
}
#[derive(Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Activation {
    pub target_id: String,
    pub environment: String,
    pub version: String,
    pub enabled: bool,
    pub max_concurrency: u32,
    #[serde(default)]
    pub bindings: BTreeMap<String, Value>,
    #[serde(default)]
    pub credential_bindings: BTreeMap<String, String>,
    #[serde(default)]
    pub model_bindings: BTreeMap<String, String>,
    #[serde(default)]
    pub callback: Option<crate::services::Callback>,
}
pub(crate) fn routes() -> Router<RegistryState> {
    Router::new()
        .route("/api/deployment",get(inventory))
        .route("/api/deployment/credentials",post(create_credential))
        .route("/api/deployment/credentials/{id}",axum::routing::put(update_credential).delete(delete_credential))
        .route("/api/deployment/targets",post(create_target))
        .route("/api/deployment/targets/{id}",axum::routing::put(update_target).delete(delete_target))
        .route("/api/deployment/targets/{id}/probe",post(probe))
        .route("/api/deployment/targets/{id}/models",get(target_models))
        .route("/api/deployment/publications",post(create_publication))
        .route("/api/deployment/publications/{id}",get(detail).put(save_draft).delete(delete_draft))
        .route("/api/deployment/publications/{id}/publish",post(publish))
        .route("/api/deployment/publications/{id}/targets/{target}/{environment}/runs",get(run_list))
        .route("/api/deployment/publications/{id}/targets/{target}/{environment}/runs/{run}",get(run_detail))
        .route("/api/deployment/publications/{id}/targets/{target}/{environment}/runs/{run}/cancel",post(run_cancel))
        .route("/api/deployment/publications/{id}/deploy",post(activate))
        .route("/api/deployment/publications/{id}/releases/{version}",get(export))
        .route("/api/deployment/publications/{id}/targets/{target}/{environment}",get(target_detail))
        .route("/api/deployment/publications/{id}/targets/{target}/{environment}/consumers",post(create_consumer))
        .route("/api/deployment/publications/{id}/targets/{target}/{environment}/consumers/{consumer}/revoke",post(revoke_consumer))
}
fn catalog(s: &RegistryState) -> &crate::deployment_settings::Catalog {
    &s.registry.deployment_settings
}
async fn credential_scope(registry: &Registry, input: &CredentialInput) -> Result<()> {
    if let Some(ids) = &input.project_ids {
        let projects = registry.projects().await;
        if ids.is_empty() || ids.iter().any(|id| !projects.iter().any(|p| p.id == *id)) {
            return Err(Error::Invalid(
                "Select at least one registered project for a restricted credential".into(),
            ));
        }
    }
    Ok(())
}
async fn inventory(State(s): State<RegistryState>) -> Result<Json<Value>> {
    let rows=sqlx::query("SELECT id,project_id,title,draft,created_at,updated_at FROM publications ORDER BY updated_at DESC").fetch_all(&catalog(&s).db).await?;
    let mut publications = vec![];
    for r in rows {
        let publication_id: String = r.get("id");
        let versions: i64 =
            sqlx::query_scalar("SELECT count(*) FROM publication_versions WHERE publication_id=?")
                .bind(&publication_id)
                .fetch_one(&catalog(&s).db)
                .await?;
        let deployments:Vec<String>=sqlx::query_scalar("SELECT definition FROM publication_deployments WHERE publication_id=? ORDER BY target_id,environment").bind(&publication_id).fetch_all(&catalog(&s).db).await?;
        let operation_count:Option<i64>=sqlx::query_scalar("SELECT operation_count FROM publication_versions WHERE publication_id=? ORDER BY created_at DESC LIMIT 1").bind(&publication_id).fetch_optional(&catalog(&s).db).await?;
        publications.push(json!({"id":publication_id,"projectId":r.get::<String,_>("project_id"),"title":r.get::<String,_>("title"),"draft":serde_json::from_str::<Value>(r.get("draft"))?,"versionCount":versions,"publicWorkflowCount":operation_count,"deployments":deployments.iter().map(|s|serde_json::from_str::<Value>(s)).collect::<std::result::Result<Vec<_>,_>>()?,"createdAt":r.get::<String,_>("created_at"),"updatedAt":r.get::<String,_>("updated_at")}));
    }
    let pending = sqlx::query("SELECT credential_id,target_id,last_error FROM credential_sync")
        .fetch_all(&catalog(&s).db)
        .await?;
    Ok(Json(
        json!({"projects":s.registry.projects().await,"publications":publications,"credentials":catalog(&s).credentials().await?,"targets":catalog(&s).targets().await?,"credentialSync":pending.iter().map(|r|json!({"credentialId":r.get::<String,_>("credential_id"),"targetId":r.get::<String,_>("target_id"),"failed":r.get::<Option<String>,_>("last_error").is_some()})).collect::<Vec<_>>()}),
    ))
}
async fn create_credential(
    State(s): State<RegistryState>,
    Json(input): Json<CredentialInput>,
) -> Result<Json<Value>> {
    credential_scope(&s.registry, &input).await?;
    let credential_id = id();
    catalog(&s).save_credential(&credential_id, input).await?;
    Ok(Json(json!({"id":credential_id})))
}
async fn update_credential(
    State(s): State<RegistryState>,
    Path(id): Path<String>,
    Json(input): Json<CredentialInput>,
) -> Result<Json<Value>> {
    credential_scope(&s.registry, &input).await?;
    catalog(&s).save_credential(&id, input).await?;
    crate::deployment_sync::schedule(catalog(&s), &id).await?;
    crate::deployment_sync::deliver(catalog(&s)).await?;
    Ok(Json(json!({"saved":true})))
}
async fn delete_credential(
    State(s): State<RegistryState>,
    Path(id): Path<String>,
) -> Result<Json<Value>> {
    if catalog(&s)
        .model_connections()
        .await?
        .iter()
        .any(|c| c.credential_id.as_deref() == Some(&id))
    {
        return Err(Error::Invalid(
            "Credential is referenced by a model connection".into(),
        ));
    }
    if catalog(&s)
        .targets()
        .await?
        .iter()
        .any(|t| t.credential_id == id)
    {
        return Err(Error::Invalid(
            "Credential is referenced by a runtime service".into(),
        ));
    }
    for table in ["publications", "publication_deployments"] {
        let column = if table == "publications" {
            "draft"
        } else {
            "definition"
        };
        let values: Vec<String> = sqlx::query_scalar(&format!("SELECT {column} FROM {table}"))
            .fetch_all(&catalog(&s).db)
            .await?;
        if values.iter().any(|s| {
            serde_json::from_str::<Value>(s)
                .ok()
                .and_then(|v| v["credentialBindings"].as_object().cloned())
                .is_some_and(|m| m.values().any(|v| v.as_str() == Some(&id)))
        }) {
            return Err(Error::Invalid(
                "Credential is referenced by a publication".into(),
            ));
        }
    }
    sqlx::query("DELETE FROM credentials WHERE id=?")
        .bind(id)
        .execute(&catalog(&s).db)
        .await?;
    Ok(Json(json!({"deleted":true})))
}
async fn create_target(
    State(s): State<RegistryState>,
    Json(input): Json<Target>,
) -> Result<Json<Target>> {
    Ok(Json(catalog(&s).save_target(input).await?))
}
async fn update_target(
    State(s): State<RegistryState>,
    Path(id): Path<String>,
    Json(mut input): Json<Target>,
) -> Result<Json<Target>> {
    input.id = id;
    Ok(Json(catalog(&s).save_target(input).await?))
}
async fn delete_target(
    State(s): State<RegistryState>,
    Path(id): Path<String>,
) -> Result<Json<Value>> {
    let count: i64 =
        sqlx::query_scalar("SELECT count(*) FROM publication_deployments WHERE target_id=?")
            .bind(&id)
            .fetch_one(&catalog(&s).db)
            .await?;
    if count > 0 {
        return Err(Error::Invalid(
            "Runtime service is referenced by a deployment".into(),
        ));
    }
    let drafts: Vec<String> = sqlx::query_scalar("SELECT draft FROM publications")
        .fetch_all(&catalog(&s).db)
        .await?;
    for draft in drafts {
        if serde_json::from_str::<Draft>(&draft)?.target_id == id {
            return Err(Error::Invalid(
                "Runtime service is referenced by a publication draft".into(),
            ));
        }
    }
    sqlx::query("DELETE FROM targets WHERE id=?")
        .bind(id)
        .execute(&catalog(&s).db)
        .await?;
    Ok(Json(json!({"deleted":true})))
}
async fn remote(
    registry: &Registry,
    target: &str,
    project: Option<&str>,
    method: reqwest::Method,
    path: &str,
    body: Option<Value>,
) -> Result<Value> {
    let target = registry.deployment_settings.target(target).await?;
    let token = registry
        .deployment_settings
        .secret(&target.credential_id, project, "management")
        .await?;
    let client = reqwest::Client::builder()
        .redirect(reqwest::redirect::Policy::none())
        .timeout(std::time::Duration::from_secs(30))
        .build()
        .map_err(|_| Error::Execution("Could not initialize runtime connection".into()))?;
    let mut request = client
        .request(method, format!("{}{path}", target.url))
        .bearer_auth(token);
    if let Some(body) = body {
        request = request.json(&body);
    }
    let response = request
        .send()
        .await
        .map_err(|_| Error::Execution("Could not connect to runtime service".into()))?;
    if !response.status().is_success() {
        return Err(Error::Execution(format!(
            "Runtime service returned HTTP {}",
            response.status().as_u16()
        )));
    }
    // Do not relay remote diagnostics: credentials must never be echoed into the desktop API.
    let bytes = response
        .bytes()
        .await
        .map_err(|_| Error::Execution("Could not read runtime response".into()))?;
    if bytes.len() > 8_000_000 {
        return Err(Error::Invalid("Runtime response exceeds 8 MB".into()));
    }
    serde_json::from_slice(&bytes)
        .map_err(|_| Error::Execution("Runtime returned an invalid response".into()))
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct ModelScope {
    project_id: String,
}
async fn target_models(
    State(s): State<RegistryState>,
    Path(id): Path<String>,
    Query(scope): Query<ModelScope>,
) -> Result<Json<Value>> {
    s.registry.resolve(&scope.project_id).await?;
    if id == "local" {
        return Ok(Json(catalog(&s).models_inventory().await?));
    }
    Ok(Json(
        remote(
            &s.registry,
            &id,
            Some(&scope.project_id),
            reqwest::Method::GET,
            "/admin/models",
            None,
        )
        .await?,
    ))
}
async fn probe(State(s): State<RegistryState>, Path(id): Path<String>) -> Result<Json<Value>> {
    if id != "local" {
        remote(
            &s.registry,
            &id,
            None,
            reqwest::Method::GET,
            "/admin/status",
            None,
        )
        .await?;
    }
    Ok(Json(json!({"connected":true,"checkedAt":now()})))
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
struct NewPublication {
    project_id: String,
}
async fn create_publication(
    State(s): State<RegistryState>,
    Json(input): Json<NewPublication>,
) -> Result<Json<Value>> {
    let project = s
        .registry
        .projects()
        .await
        .into_iter()
        .find(|p| p.id == input.project_id)
        .ok_or_else(|| Error::NotFound("Project not found".into()))?;
    if let Some(id) =
        sqlx::query_scalar::<_, String>("SELECT id FROM publications WHERE project_id=?")
            .bind(&input.project_id)
            .fetch_optional(&catalog(&s).db)
            .await?
    {
        return Ok(Json(json!({"id":id})));
    }
    let draft = Draft {
        title: project.name.clone(),
        version: "1.0.0".into(),
        notes: String::new(),
        operations: vec![],
        target_id: "local".into(),
        environment: "local".into(),
        max_concurrency: 8,
        bindings: BTreeMap::new(),
        credential_bindings: BTreeMap::new(),
        model_bindings: BTreeMap::new(),
        callback: None,
    };
    let publication_id = id();
    let time = now();
    sqlx::query("INSERT INTO publications VALUES(?,?,?,?,?,?) ON CONFLICT(project_id) DO NOTHING")
        .bind(&publication_id)
        .bind(input.project_id)
        .bind(&project.name)
        .bind(serde_json::to_string(&draft)?)
        .bind(&time)
        .bind(&time)
        .execute(&catalog(&s).db)
        .await?;
    let saved_id: String = sqlx::query_scalar("SELECT id FROM publications WHERE project_id=?")
        .bind(&project.id)
        .fetch_one(&catalog(&s).db)
        .await?;
    Ok(Json(json!({"id":saved_id})))
}
async fn publication(s: &RegistryState, id: &str) -> Result<(String, Draft)> {
    let row = sqlx::query("SELECT project_id,draft FROM publications WHERE id=?")
        .bind(id)
        .fetch_optional(&catalog(s).db)
        .await?
        .ok_or_else(|| Error::NotFound("Publication not found".into()))?;
    Ok((
        row.get("project_id"),
        serde_json::from_str(row.get("draft"))?,
    ))
}
fn service_id(project: &str) -> String {
    format!("project-{}", project.replace('-', ""))
}
async fn save_draft(
    State(s): State<RegistryState>,
    Path(id): Path<String>,
    Json(draft): Json<Draft>,
) -> Result<Json<Value>> {
    let (project, _) = publication(&s, &id).await?;
    if draft.title.trim().is_empty()
        || draft.title.len() > 200
        || draft.operations.len() > 64
        || !(1..=128).contains(&draft.max_concurrency)
    {
        return Err(Error::Invalid("Invalid publication configuration".into()));
    }
    crate::services::identifier(&draft.environment)?;
    let store = s.registry.resolve(&project).await?;
    let workflows = store.workflows().await?;
    if draft
        .operations
        .iter()
        .any(|op| !workflows.iter().any(|w| w.id == op.workflow_id))
    {
        return Err(Error::Invalid(
            "Public workflows must belong to the selected project".into(),
        ));
    }
    if draft.target_id != "local" {
        catalog(&s).target(&draft.target_id).await?;
    }
    for credential in draft.credential_bindings.values() {
        catalog(&s)
            .secret(credential, Some(&project), "connection")
            .await?;
    }
    sqlx::query("UPDATE publications SET title=?,draft=?,updated_at=? WHERE id=?")
        .bind(&draft.title)
        .bind(serde_json::to_string(&draft)?)
        .bind(now())
        .bind(&id)
        .execute(&catalog(&s).db)
        .await?;
    Ok(Json(json!({"saved":true})))
}
async fn detail(State(s): State<RegistryState>, Path(id): Path<String>) -> Result<Json<Value>> {
    let (project, draft) = publication(&s, &id).await?;
    let store = s.registry.resolve(&project).await?;
    let inventory = store.service_inventory().await?;
    let service = service_id(&project);
    let releases: Vec<Value> = inventory["releases"]
        .as_array()
        .unwrap()
        .iter()
        .filter(|r| r["service"] == service)
        .cloned()
        .collect();
    let versions=sqlx::query("SELECT version,notes,created_at FROM publication_versions WHERE publication_id=? ORDER BY created_at DESC").bind(&id).fetch_all(&catalog(&s).db).await?;
    Ok(Json(
        json!({"id":id,"projectId":project,"service":service,"draft":draft,"workflows":store.workflows().await?,"releases":releases,"versions":versions.iter().map(|r|json!({"version":r.get::<String,_>("version"),"notes":r.get::<String,_>("notes"),"createdAt":r.get::<String,_>("created_at")})).collect::<Vec<_>>()}),
    ))
}
async fn delete_draft(
    State(s): State<RegistryState>,
    Path(id): Path<String>,
) -> Result<Json<Value>> {
    let count: i64 =
        sqlx::query_scalar("SELECT count(*) FROM publication_versions WHERE publication_id=?")
            .bind(&id)
            .fetch_one(&catalog(&s).db)
            .await?;
    if count > 0 {
        return Err(Error::Invalid(
            "Published configurations cannot be deleted as drafts".into(),
        ));
    }
    sqlx::query("DELETE FROM publications WHERE id=?")
        .bind(id)
        .execute(&catalog(&s).db)
        .await?;
    Ok(Json(json!({"deleted":true})))
}
async fn publish(State(s): State<RegistryState>, Path(id): Path<String>) -> Result<Json<Value>> {
    let (project, draft) = publication(&s, &id).await?;
    let store = s.registry.resolve(&project).await?;
    for credential in draft.credential_bindings.values() {
        catalog(&s)
            .secret(credential, Some(&project), "connection")
            .await?;
    }
    if draft.target_id != "local" {
        let target = catalog(&s).target(&draft.target_id).await?;
        catalog(&s)
            .secret(&target.credential_id, Some(&project), "management")
            .await?;
    }
    let bundle = store
        .publish_service(Publish {
            service: service_id(&project),
            title: draft.title.clone(),
            version: draft.version.clone(),
            operations: draft.operations.clone(),
        })
        .await?;
    sqlx::query("INSERT INTO publication_versions VALUES(?,?,?,?,?)")
        .bind(&id)
        .bind(&bundle.version)
        .bind(draft.notes)
        .bind(&bundle.created_at)
        .bind(bundle.operations.len() as i64)
        .execute(&catalog(&s).db)
        .await?;
    // The immutable version exists before deployment. A failed deployment remains retryable.
    let activation = Activation {
        target_id: draft.target_id,
        environment: draft.environment,
        version: bundle.version,
        enabled: true,
        max_concurrency: draft.max_concurrency,
        bindings: draft.bindings,
        credential_bindings: draft.credential_bindings,
        model_bindings: draft.model_bindings,
        callback: draft.callback,
    };
    deploy(&s, &id, activation).await?;
    Ok(Json(json!({"published":true})))
}
async fn activate(
    State(s): State<RegistryState>,
    Path(id): Path<String>,
    Json(input): Json<Activation>,
) -> Result<Json<Value>> {
    deploy(&s, &id, input).await?;
    Ok(Json(json!({"deployed":true})))
}
async fn deploy(s: &RegistryState, id: &str, input: Activation) -> Result<()> {
    let (project, _) = publication(s, id).await?;
    let store = s.registry.resolve(&project).await?;
    let bundle = store.release(&service_id(&project), &input.version).await?;
    let definition = Deployment {
        model_bindings: input.model_bindings.clone(),
        service: bundle.service.clone(),
        environment: input.environment.clone(),
        version: input.version.clone(),
        enabled: input.enabled,
        max_concurrency: input.max_concurrency,
        bindings: input.bindings.clone(),
        callback: input.callback.clone(),
    };
    if input.target_id == "local" {
        store
            .configure_service_connections(
                &bundle.service,
                &input.environment,
                &input.credential_bindings,
                &project,
            )
            .await?;
        store.deploy_service(definition).await?;
    } else {
        let mut secrets = vec![];
        let mut remote_bindings = BTreeMap::new();
        for credential_id in input.credential_bindings.values() {
            let value = catalog(s)
                .secret(credential_id, Some(&project), "connection")
                .await?;
            secrets.push(json!({"id":format!("{project}:{credential_id}"),"name":"Published connection","purpose":"connection","projectIds":[project],"value":value}));
        }
        for (slot, credential) in &input.credential_bindings {
            remote_bindings.insert(slot.clone(), format!("{project}:{credential}"));
        }
        remote(
            &s.registry,
            &input.target_id,
            Some(&project),
            reqwest::Method::POST,
            "/admin/releases",
            Some(serde_json::to_value(&bundle)?),
        )
        .await?;
        remote(&s.registry,&input.target_id,Some(&project),reqwest::Method::POST,"/admin/connections",Some(json!({"service":bundle.service,"environment":input.environment,"projectId":project,"credentials":secrets,"bindings":remote_bindings}))).await?;
        remote(
            &s.registry,
            &input.target_id,
            Some(&project),
            reqwest::Method::POST,
            "/admin/deployments",
            Some(serde_json::to_value(definition)?),
        )
        .await?;
    }
    sqlx::query("INSERT INTO publication_deployments VALUES(?,?,?,?) ON CONFLICT(publication_id,target_id,environment) DO UPDATE SET definition=excluded.definition").bind(id).bind(&input.target_id).bind(&input.environment).bind(serde_json::to_string(&input)?).execute(&catalog(s).db).await?;
    sqlx::query("UPDATE publications SET updated_at=? WHERE id=?")
        .bind(now())
        .bind(id)
        .execute(&catalog(s).db)
        .await?;
    Ok(())
}
async fn export(
    State(s): State<RegistryState>,
    Path((id, version)): Path<(String, String)>,
) -> Result<Json<Bundle>> {
    let (project, _) = publication(&s, &id).await?;
    Ok(Json(
        s.registry
            .resolve(&project)
            .await?
            .release(&service_id(&project), &version)
            .await?,
    ))
}
async fn target_detail(
    State(s): State<RegistryState>,
    headers: HeaderMap,
    Path((id, target, environment)): Path<(String, String, String)>,
) -> Result<Json<Value>> {
    crate::services::identifier(&environment)?;
    let (project, _) = publication(&s, &id).await?;
    let service = service_id(&project);
    if target == "local" {
        let store = s.registry.resolve(&project).await?;
        let deployment = store.deployment(&service, &environment).await?;
        let host = headers
            .get("host")
            .and_then(|v| v.to_str().ok())
            .unwrap_or("127.0.0.1");
        Ok(Json(
            json!({"deployment":deployment,"consumers":store.consumers(&service,&environment).await?,"runs":store.service_runs(&service,&environment).await?,"publicBase":format!("http://{host}/v1/projects/{project}/services/{service}/{environment}"),"checkedAt":now()}),
        ))
    } else {
        let mut value = remote(
            &s.registry,
            &target,
            Some(&project),
            reqwest::Method::GET,
            &format!("/admin/services/{service}/{environment}"),
            None,
        )
        .await?;
        value["publicBase"] = json!(format!(
            "{}/v1/services/{service}/{environment}",
            catalog(&s).target(&target).await?.url
        ));
        Ok(Json(value))
    }
}
async fn create_consumer(
    State(s): State<RegistryState>,
    Path((id, target, environment)): Path<(String, String, String)>,
    Json(input): Json<crate::services::KeyInput>,
) -> Result<Json<Value>> {
    crate::services::identifier(&environment)?;
    let (project, _) = publication(&s, &id).await?;
    let service = service_id(&project);
    let result = if target == "local" {
        s.registry
            .resolve(&project)
            .await?
            .create_consumer(&service, &environment, input)
            .await?
    } else {
        remote(
            &s.registry,
            &target,
            Some(&project),
            reqwest::Method::POST,
            &format!("/admin/consumers/{service}/{environment}"),
            Some(serde_json::to_value(input)?),
        )
        .await?
    };
    Ok(Json(result))
}
async fn revoke_consumer(
    State(s): State<RegistryState>,
    Path((id, target, environment, consumer)): Path<(String, String, String, String)>,
) -> Result<Json<Value>> {
    crate::services::identifier(&environment)?;
    uuid::Uuid::parse_str(&consumer).map_err(|_| Error::Invalid("Invalid consumer ID".into()))?;
    let (project, _) = publication(&s, &id).await?;
    let service = service_id(&project);
    if target == "local" {
        s.registry
            .resolve(&project)
            .await?
            .revoke_consumer(&service, &environment, &consumer)
            .await?;
    } else {
        remote(
            &s.registry,
            &target,
            Some(&project),
            reqwest::Method::POST,
            &format!("/admin/consumers/{service}/{environment}/{consumer}/revoke"),
            Some(json!({})),
        )
        .await?;
    }
    Ok(Json(json!({"revoked":true})))
}

async fn run_list(
    State(s): State<RegistryState>,
    Path((id, target, environment)): Path<(String, String, String)>,
    Query(q): Query<crate::run_list::RunListQuery>,
) -> Result<Json<Value>> {
    crate::services::identifier(&environment)?;
    let (project, _) = publication(&s, &id).await?;
    let service = service_id(&project);
    let value = if target == "local" {
        s.registry
            .resolve(&project)
            .await?
            .list_runs(&q, Some((&service, &environment)))
            .await?
    } else {
        remote(
            &s.registry,
            &target,
            Some(&project),
            reqwest::Method::GET,
            &format!(
                "/admin/services/{service}/{environment}/runs?{}",
                q.query_string()
            ),
            None,
        )
        .await?
    };
    Ok(Json(value))
}
async fn run_detail(
    State(s): State<RegistryState>,
    Path((id, target, environment, run)): Path<(String, String, String, String)>,
    Query(q): Query<crate::run_trace::TraceQuery>,
) -> Result<Json<Value>> {
    crate::services::identifier(&environment)?;
    uuid::Uuid::parse_str(&run).map_err(|_| Error::Invalid("Invalid run ID".into()))?;
    let (project, _) = publication(&s, &id).await?;
    let service = service_id(&project);
    let result = if target == "local" {
        let store = s.registry.resolve(&project).await?;
        store
            .service_run(&service, &environment, &run, None)
            .await?;
        store.inspect_trace(&run, &q).await?
    } else {
        remote(
            &s.registry,
            &target,
            Some(&project),
            reqwest::Method::GET,
            &format!(
                "/admin/services/{service}/{environment}/runs/{run}?{}",
                q.query_string()
            ),
            None,
        )
        .await?
    };
    Ok(Json(result))
}
async fn run_cancel(
    State(s): State<RegistryState>,
    Path((id, target, environment, run)): Path<(String, String, String, String)>,
) -> Result<Json<Value>> {
    crate::services::identifier(&environment)?;
    uuid::Uuid::parse_str(&run).map_err(|_| Error::Invalid("Invalid run ID".into()))?;
    let (project, _) = publication(&s, &id).await?;
    let service = service_id(&project);
    if target == "local" {
        let store = s.registry.resolve(&project).await?;
        store
            .service_run(&service, &environment, &run, None)
            .await?;
        if let Some(token) = store.active.lock().await.get(&run) {
            token.cancel();
        }
    } else {
        remote(
            &s.registry,
            &target,
            Some(&project),
            reqwest::Method::POST,
            &format!("/admin/services/{service}/{environment}/runs/{run}/cancel"),
            Some(json!({})),
        )
        .await?;
    }
    Ok(Json(json!({"canceled":true})))
}
