use crate::{
    api,
    error::{Error, Result},
    model::{ModelConfig, Project},
    project::{atomic_json, read_project, write_project},
    store::Store,
};
use axum::{
    Json, Router,
    extract::{Request, State},
    http::{HeaderMap, StatusCode},
    middleware::{self, Next},
    response::{IntoResponse, Response},
    routing::{any, get, post},
};
use serde::Deserialize;
use serde_json::{Value, json};
use std::{
    collections::HashMap,
    path::{Path, PathBuf},
    sync::Arc,
};
use tokio::sync::Mutex;
use tower::ServiceExt;

#[derive(Clone)]
pub struct Registry {
    pub deployment_settings: crate::deployment_settings::Catalog,
    pub directory: PathBuf,
    pub model: Arc<Mutex<ModelConfig>>,
    pub(crate) records: Arc<Mutex<Vec<Project>>>,
    pub(crate) stores: Arc<Mutex<HashMap<String, (Store, std::fs::File)>>>,
    pub(crate) mutations: Arc<Mutex<()>>,
}
impl Registry {
    pub async fn open(directory: &Path) -> Result<Self> {
        tokio::fs::create_dir_all(directory).await?;
        // The service holds server.lock before calling this. Obsolete prototype
        // databases are disposable; credentials and device preferences are separate.
        for name in [
            "flowgram.sqlite",
            "flowgram.sqlite-wal",
            "flowgram.sqlite-shm",
            "flowgram.db",
            "flowgram.db-wal",
            "flowgram.db-shm",
        ] {
            match tokio::fs::remove_file(directory.join(name)).await {
                Ok(()) => {}
                Err(e) if e.kind() == std::io::ErrorKind::NotFound => {}
                Err(e) => return Err(e.into()),
            }
        }
        crate::project_management::recover(directory).await?;
        let records = match tokio::fs::read(directory.join("projects.json")).await {
            Ok(data) => serde_json::from_slice(&data)?,
            Err(e) if e.kind() == std::io::ErrorKind::NotFound => Vec::new(),
            Err(e) => return Err(e.into()),
        };
        let model = match tokio::fs::read(directory.join("model.json")).await {
            Ok(data) => serde_json::from_slice(&data)?,
            Err(e) if e.kind() == std::io::ErrorKind::NotFound => ModelConfig::default(),
            Err(e) => return Err(e.into()),
        };
        let registry = Self {
            deployment_settings: crate::deployment_settings::Catalog::open(directory).await?,
            directory: directory.to_owned(),
            model: Arc::new(Mutex::new(model)),
            records: Arc::new(Mutex::new(records)),
            stores: Arc::default(),
            mutations: Arc::default(),
        };
        registry
            .deployment_settings
            .import_device_model(directory)
            .await?;
        for project in registry.projects().await {
            if let Err(error) = registry.resolve(&project.id).await {
                eprintln!("Project {} could not be opened: {error}", project.id);
            }
        }
        crate::deployment_sync::start(registry.deployment_settings.clone());
        Ok(registry)
    }
    pub async fn projects(&self) -> Vec<Project> {
        self.records.lock().await.clone()
    }
    pub async fn resolve(&self, id: &str) -> Result<Store> {
        let mut stores = self.stores.lock().await;
        if let Some((store, _)) = stores.get(id) {
            return Ok(store.clone());
        }
        let record = self
            .records
            .lock()
            .await
            .iter()
            .find(|p| p.id == id)
            .cloned()
            .ok_or_else(|| Error::NotFound("Project is not open in this application".into()))?;
        let project = read_project(Path::new(&record.directory)).await?;
        if project.id != id {
            return Err(Error::Invalid(
                "Project identity changed. Open its directory again".into(),
            ));
        }
        let (store, lock) = self.open_store(&project).await?;
        stores.insert(id.into(), (store.clone(), lock));
        Ok(store)
    }
    pub(crate) async fn open_store(&self, project: &Project) -> Result<(Store, std::fs::File)> {
        tokio::fs::create_dir_all(Path::new(&project.directory).join(".flowgram")).await?;
        let state_directory =
            tokio::fs::canonicalize(Path::new(&project.directory).join(".flowgram")).await?;
        if !state_directory.starts_with(&project.directory) {
            return Err(Error::Invalid(
                "Project state must remain inside its directory".into(),
            ));
        }
        let lock = std::fs::OpenOptions::new()
            .read(true)
            .write(true)
            .create(true)
            .truncate(false)
            .open(state_directory.join("project.lock"))?;
        fs2::FileExt::try_lock_exclusive(&lock).map_err(|_| {
            Error::Invalid(format!(
                "Project \"{}\" is already open in another application service",
                project.name
            ))
        })?;
        let store = Store::open_configured(
            Path::new(&project.directory),
            &self.directory,
            Some(self.model.clone()),
        )
        .await?;
        crate::service_delivery::start(store.clone());
        Ok((store, lock))
    }
    pub async fn create(&self, name: &str, directory: Option<&str>) -> Result<Project> {
        let _mutation = self.mutations.lock().await;
        let root = directory
            .map(PathBuf::from)
            .unwrap_or_else(|| self.directory.join("projects").join(crate::store::id()));
        if root.exists() && std::fs::read_dir(&root)?.next().is_some() {
            return Err(Error::Invalid(
                "Choose an empty directory for a new project".into(),
            ));
        }
        let project = write_project(&root, name).await?;
        self.register_locked(project).await
    }
    pub async fn open_project(&self, directory: &str) -> Result<Project> {
        let _mutation = self.mutations.lock().await;
        self.register_locked(read_project(Path::new(directory)).await?)
            .await
    }
    pub(crate) async fn register(&self, project: Project) -> Result<Project> {
        let _mutation = self.mutations.lock().await;
        self.register_locked(project).await
    }
    async fn register_locked(&self, project: Project) -> Result<Project> {
        // Resolve and acquire the project before publishing it to recent projects.
        // A failed open must leave the current workspace and registry unchanged.
        let mut stores = self.stores.lock().await;
        let mut records = self.records.lock().await;
        if let Some(existing) = records
            .iter()
            .find(|item| item.id == project.id && item.directory != project.directory)
        {
            return Err(Error::Invalid(format!(
                "This project ID is already open from {}. Create a separate project before importing copies",
                existing.directory
            )));
        }
        let opened = if stores.contains_key(&project.id) {
            None
        } else {
            Some(self.open_store(&project).await?)
        };
        let mut next = records.clone();
        next.retain(|item| item.id != project.id);
        next.insert(0, project.clone());
        atomic_json(&self.directory.join("projects.json"), &next).await?;
        *records = next;
        if let Some(store) = opened {
            stores.insert(project.id.clone(), store);
        }
        Ok(project)
    }
}
#[derive(Clone)]
pub(crate) struct RegistryState {
    pub(crate) registry: Registry,
    token: Arc<String>,
}
pub fn router(registry: Registry, token: String) -> Router {
    let state = RegistryState {
        registry,
        token: Arc::new(token),
    };
    Router::new()
        .merge(crate::deployment_api::routes())
        .merge(crate::project_transfer::routes())
        .merge(crate::archive::global_routes())
        .merge(crate::project_management::routes())
        .merge(crate::initial_projects::routes())
        .merge(crate::models::routes())
        .route(
            "/health",
            get(|| async { Json(json!({"status":"ready","service":"flowgram"})) }),
        )
        .route("/api/bootstrap", get(bootstrap))
        .route("/api/projects", post(create))
        .route("/api/projects/open", post(open))
        .route("/api/settings/model", get(model).put(save_model))
        .route(
            "/api/tools",
            get(|| async { Json(crate::tools::definitions()) }),
        )
        .route("/mcp", post(mcp))
        .route("/v1/projects/{project}/{*path}", any(consumer_request))
        .fallback(project_request)
        .layer(axum::extract::DefaultBodyLimit::max(8_000_000))
        .layer(middleware::from_fn_with_state(state.clone(), authorize))
        .layer(api::cors())
        .with_state(state)
}
async fn authorize(State(s): State<RegistryState>, request: Request, next: Next) -> Response {
    if request.uri().path() != "/health"
        && !request.uri().path().starts_with("/v1/projects/")
        && request
            .headers()
            .get("authorization")
            .and_then(|v| v.to_str().ok())
            .and_then(|v| v.strip_prefix("Bearer "))
            != Some(s.token.as_str())
    {
        return (StatusCode::UNAUTHORIZED,Json(json!({"error":{"code":"unauthorized","message":"App connection expired. Reconnect"}}))).into_response();
    }
    next.run(request).await
}
async fn consumer_request(
    State(s): State<RegistryState>,
    axum::extract::Path((project, path)): axum::extract::Path<(String, String)>,
    mut request: Request,
) -> Response {
    let result: Result<Response> = async {
        let store = s.registry.resolve(&project).await?;
        let query = request
            .uri()
            .query()
            .map(|q| format!("?{q}"))
            .unwrap_or_default();
        *request.uri_mut() = format!("/v1/{path}{query}")
            .parse()
            .map_err(|_| Error::Invalid("Invalid consumer URL".into()))?;
        // A second Router must not inherit the outer wildcard path captures.
        let original = request
            .extensions()
            .get::<axum::extract::OriginalUri>()
            .cloned();
        request.extensions_mut().clear();
        if let Some(original) = original {
            request.extensions_mut().insert(original);
        }
        Ok(crate::service_api::public_router(store)
            .oneshot(request)
            .await
            .unwrap())
    }
    .await;
    match result {
        Ok(response) => response,
        Err(error) => error.into_response(),
    }
}
fn scope(headers: &HeaderMap) -> Result<&str> {
    headers
        .get("x-flowgram-project")
        .and_then(|v| v.to_str().ok())
        .filter(|id| !id.is_empty())
        .ok_or_else(|| Error::Invalid("Select a project before accessing project resources".into()))
}
async fn project_request(State(s): State<RegistryState>, request: Request) -> Response {
    let result: Result<_> = async {
        let store = s.registry.resolve(scope(request.headers())?).await?;
        Ok(api::router(store, s.token.to_string())
            .oneshot(request)
            .await
            .unwrap())
    }
    .await;
    match result {
        Ok(response) => response,
        Err(error) => error.into_response(),
    }
}
async fn bootstrap(State(s): State<RegistryState>, headers: HeaderMap) -> Result<Json<Value>> {
    let mut value = json!({"projects":s.registry.projects().await,"sessions":[],"workflows":[],"runs":[],"storageVersion":2});
    if let Ok(id) = scope(&headers) {
        let store = s.registry.resolve(id).await?;
        value["sessions"] = serde_json::to_value(store.sessions().await?)?;
        value["workflows"] = serde_json::to_value(store.workflows().await?)?;
        value["runs"] = serde_json::to_value(store.runs().await?)?;
    }
    Ok(Json(value))
}
#[derive(Deserialize)]
struct Create {
    name: String,
    directory: Option<String>,
}
async fn create(
    State(s): State<RegistryState>,
    Json(input): Json<Create>,
) -> Result<Json<Project>> {
    Ok(Json(
        s.registry
            .create(&input.name, input.directory.as_deref())
            .await?,
    ))
}
#[derive(Deserialize)]
struct Open {
    directory: String,
}
async fn open(State(s): State<RegistryState>, Json(input): Json<Open>) -> Result<Json<Project>> {
    Ok(Json(s.registry.open_project(&input.directory).await?))
}
async fn model(State(s): State<RegistryState>) -> Json<Value> {
    Json(
        s.registry
            .deployment_settings
            .model_summary()
            .await
            .unwrap_or_else(
                |_| json!({"configured":false,"displayName":"","hasApiKey":false,"baseUrl":""}),
            ),
    )
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct UpdateModel {
    base_url: String,
    model: Option<String>,
    api_key: Option<String>,
}
async fn save_model(
    State(s): State<RegistryState>,
    Json(input): Json<UpdateModel>,
) -> Result<Json<Value>> {
    let old = s.registry.model.lock().await.clone();
    if !input.base_url.is_empty() {
        let url = reqwest::Url::parse(&input.base_url)
            .map_err(|_| Error::Invalid("Invalid model URL".into()))?;
        if !matches!(url.scheme(), "http" | "https") {
            return Err(Error::Invalid("Model URL must use HTTP or HTTPS".into()));
        }
    }
    let config = ModelConfig {
        base_url: input.base_url,
        model: input.model.filter(|s| !s.is_empty()).unwrap_or(old.model),
        api_key: input
            .api_key
            .filter(|s| !s.is_empty())
            .unwrap_or(old.api_key),
    };
    atomic_json(&s.registry.directory.join("model.json"), &config).await?;
    s.registry
        .deployment_settings
        .configure_model(config.clone())
        .await?;
    *s.registry.model.lock().await = config;
    for (store, _) in s.registry.stores.lock().await.values() {
        store.resume_conversations().await?;
    }
    Ok(model(State(s)).await)
}
async fn mcp(State(s): State<RegistryState>, Json(request): Json<Value>) -> Response {
    let Some(id) = request.get("id") else {
        return StatusCode::ACCEPTED.into_response();
    };
    let result:Result<Value>=async{match request["method"].as_str().unwrap_or_default(){
        "initialize"=>Ok(json!({"protocolVersion":"2025-03-26","capabilities":{"tools":{}},"serverInfo":{"name":"flowgram","version":"0.1.0"}})),
        "ping"=>Ok(json!({})),
        "tools/list"=>crate::tools::mcp_list(request["params"]["cursor"].as_str()),
        "tools/call"=>{let args=&request["params"]["arguments"];let project=args["projectId"].as_str().ok_or_else(||Error::Invalid("Missing projectId".into()))?;let store=s.registry.resolve(project).await?;Ok(crate::tools::mcp_result(match store.tool(project,None,request["params"]["name"].as_str().unwrap_or_default(),args["arguments"].clone()).await{Ok(value)=>value,Err(error)=>error.tool_value()}))},
        _=>Err(Error::Invalid("Unsupported MCP method".into()))
    }}.await;
    Json(match result {
        Ok(result) => json!({"jsonrpc":"2.0","id":id,"result":result}),
        Err(error) => {
            json!({"jsonrpc":"2.0","id":id,"error":{"code":-32602,"message":error.to_string()}})
        }
    })
    .into_response()
}
