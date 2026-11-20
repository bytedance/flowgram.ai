use crate::{
    error::{Error, Result},
    model::*,
};
use serde_json::{Value, json};
use sqlx::{Row, SqlitePool, sqlite::SqlitePoolOptions};
use std::{
    collections::{HashMap, HashSet},
    path::{Path, PathBuf},
    sync::Arc,
};
use tokio::sync::{Mutex, broadcast};
use tokio_util::sync::CancellationToken;

#[derive(Clone)]
pub struct Store {
    pub closed: CancellationToken,
    pub deployment_settings: crate::deployment_settings::Catalog,
    pub db: SqlitePool,
    pub events: broadcast::Sender<Event>,
    pub active: Arc<Mutex<HashMap<String, CancellationToken>>>,
    pub model: Arc<Mutex<ModelConfig>>,
    pub data_dir: PathBuf,
    pub project_root: PathBuf,
    pub workflow_lock: Arc<Mutex<()>>,
    pub service_lock: Arc<Mutex<()>>,
    pub client: reqwest::Client,
    pub conversation_lock: Arc<Mutex<()>>,
    pub conversation_workers: Arc<Mutex<HashSet<String>>>,
}
pub fn id() -> String {
    uuid::Uuid::new_v4().to_string()
}
pub fn now() -> String {
    chrono::Utc::now().to_rfc3339()
}
impl Store {
    pub async fn open(path: &Path) -> Result<Self> {
        Self::open_configured(path, path, None).await
    }
    pub async fn open_configured(
        path: &Path,
        settings: &Path,
        shared_model: Option<Arc<Mutex<ModelConfig>>>,
    ) -> Result<Self> {
        tokio::fs::create_dir_all(path).await?;
        let path = tokio::fs::canonicalize(path).await?;
        let project = if path.join("flowgram.project.json").exists() {
            crate::project::read_project(&path).await?
        } else {
            crate::project::write_project(&path, "My project").await?
        };
        tokio::fs::create_dir_all(path.join(".flowgram")).await?;
        let state_directory = tokio::fs::canonicalize(path.join(".flowgram")).await?;
        if !state_directory.starts_with(&path) {
            return Err(Error::Invalid(
                "Project state must remain inside its directory".into(),
            ));
        }
        let options = sqlx::sqlite::SqliteConnectOptions::new()
            .filename(state_directory.join("state.sqlite"))
            .create_if_missing(true)
            .journal_mode(sqlx::sqlite::SqliteJournalMode::Wal)
            .foreign_keys(true);
        let db = SqlitePoolOptions::new()
            .max_connections(4)
            .connect_with(options)
            .await?;
        for statement in [
            "CREATE TABLE IF NOT EXISTS projects (id TEXT PRIMARY KEY, name TEXT NOT NULL, created_at TEXT NOT NULL, directory TEXT NOT NULL)",
            "CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, project_id TEXT NOT NULL REFERENCES projects(id), title TEXT NOT NULL, status TEXT NOT NULL, created_at TEXT NOT NULL)",
            "CREATE TABLE IF NOT EXISTS workflows (id TEXT PRIMARY KEY, project_id TEXT NOT NULL REFERENCES projects(id), name TEXT NOT NULL, revision INTEGER NOT NULL, schema_json TEXT NOT NULL, updated_at TEXT NOT NULL)",
            "CREATE TABLE IF NOT EXISTS runs (id TEXT PRIMARY KEY, workflow_id TEXT NOT NULL REFERENCES workflows(id), session_id TEXT REFERENCES sessions(id), status TEXT NOT NULL, inputs TEXT NOT NULL, outputs TEXT NOT NULL, error TEXT, revision INTEGER NOT NULL, created_at TEXT NOT NULL)",
            "CREATE TABLE IF NOT EXISTS run_definitions (run_id TEXT PRIMARY KEY REFERENCES runs(id), schema_json TEXT NOT NULL)",
            "CREATE TABLE IF NOT EXISTS run_workflows (run_id TEXT NOT NULL REFERENCES runs(id), workflow_id TEXT NOT NULL, definition TEXT NOT NULL, PRIMARY KEY(run_id,workflow_id))",
            "CREATE TABLE IF NOT EXISTS node_tests (run_id TEXT PRIMARY KEY REFERENCES runs(id), node_id TEXT NOT NULL, definition TEXT NOT NULL, bindings TEXT NOT NULL)",
            "CREATE TABLE IF NOT EXISTS events (sequence INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL, object_id TEXT NOT NULL, data TEXT NOT NULL, created_at TEXT NOT NULL)",
            "CREATE INDEX IF NOT EXISTS events_object_sequence ON events(object_id, sequence)",
            "CREATE INDEX IF NOT EXISTS events_object_kind ON events(object_id,kind,sequence)",
            "CREATE INDEX IF NOT EXISTS runs_created ON runs(created_at DESC,id DESC)",
            "CREATE INDEX IF NOT EXISTS events_execution ON events(object_id, json_extract(data,'$.executionId'), sequence)",
        ] {
            sqlx::query(statement).execute(&db).await?;
        }
        crate::conversation::initialize(&db).await?;
        crate::workflow_edit::initialize(&db).await?;
        crate::archive::initialize(&db).await?;
        crate::services::initialize(&db).await?;
        crate::models::execution::initialize(&db).await?;
        // An interrupted process cannot safely replay external side effects.
        sqlx::query("UPDATE runs SET status='interrupted', error='The application service restarted and execution was interrupted. Completed steps remain in run history' WHERE status='running'").execute(&db).await?;
        sqlx::query("UPDATE sessions SET status='idle' WHERE status='running'")
            .execute(&db)
            .await?;
        let model = match tokio::fs::read(settings.join("model.json")).await {
            Ok(bytes) => serde_json::from_slice(&bytes)?,
            Err(e) if e.kind() == std::io::ErrorKind::NotFound => ModelConfig::default(),
            Err(e) => return Err(e.into()),
        };
        let (events, _) = broadcast::channel(512);
        let store = Self {
            closed: CancellationToken::new(),
            deployment_settings: crate::deployment_settings::Catalog::open(settings).await?,
            db,
            events,
            active: Arc::default(),
            model: shared_model.unwrap_or_else(|| Arc::new(Mutex::new(model))),
            data_dir: settings.to_path_buf(),
            project_root: path.to_path_buf(),
            workflow_lock: Arc::default(),
            service_lock: Arc::default(),
            client: reqwest::Client::builder()
                .redirect(reqwest::redirect::Policy::none())
                .timeout(std::time::Duration::from_secs(180))
                .build()
                .map_err(|e| Error::Execution(e.to_string()))?,
            conversation_lock: Arc::default(),
            conversation_workers: Arc::default(),
        };
        sqlx::query("INSERT INTO projects(id,name,created_at,directory) VALUES(?,?,?,?) ON CONFLICT(id) DO UPDATE SET name=excluded.name,directory=excluded.directory")
            .bind(&project.id).bind(&project.name).bind(&project.created_at).bind(&project.directory).execute(&store.db).await?;
        store
            .deployment_settings
            .import_device_model(settings)
            .await?;
        store.recover_deleted_workflows().await?;
        store.recover_workflow_mutations().await?;
        store.recover_tool_creations().await?;
        store.sync_workflow_index().await?;
        store.resume_conversations().await?;
        Ok(store)
    }
    pub async fn emit(&self, kind: &str, object_id: &str, data: Value) -> Result<()> {
        let created_at = now();
        let data = if ["node_", "model_", "tool_", "http_"]
            .iter()
            .any(|prefix| kind.starts_with(prefix))
        {
            crate::run_trace::safe_payload(data)
        } else {
            data
        }
        .to_string();
        let result =
            sqlx::query("INSERT INTO events(kind,object_id,data,created_at) VALUES(?,?,?,?)")
                .bind(kind)
                .bind(object_id)
                .bind(&data)
                .bind(&created_at)
                .execute(&self.db)
                .await?;
        let _ = self.events.send(Event {
            sequence: result.last_insert_rowid(),
            kind: kind.into(),
            object_id: object_id.into(),
            data,
            created_at,
        });
        Ok(())
    }
    pub async fn projects(&self) -> Result<Vec<Project>> {
        Ok(sqlx::query_as("SELECT * FROM projects ORDER BY created_at")
            .fetch_all(&self.db)
            .await?)
    }
    pub async fn require_project(&self, id: &str) -> Result<()> {
        self.ensure_open()?;
        if sqlx::query("SELECT id FROM projects WHERE id=?")
            .bind(id)
            .fetch_optional(&self.db)
            .await?
            .is_none()
        {
            return Err(Error::NotFound("Project not found".into()));
        }
        Ok(())
    }
    pub async fn sessions(&self) -> Result<Vec<Session>> {
        Ok(
            sqlx::query_as("SELECT * FROM sessions WHERE id NOT IN (SELECT id FROM archived_objects WHERE kind='session') ORDER BY created_at DESC")
                .fetch_all(&self.db)
                .await?,
        )
    }
    pub async fn session(&self, id: &str) -> Result<Session> {
        sqlx::query_as("SELECT * FROM sessions WHERE id=?")
            .bind(id)
            .fetch_optional(&self.db)
            .await?
            .ok_or_else(|| Error::NotFound("Session not found".into()))
    }
    pub async fn create_session(&self, project: &str, title: &str) -> Result<Session> {
        self.require_project(project).await?;
        let t = Session {
            id: id(),
            project_id: project.into(),
            title: nonempty(title, "Session name")?,
            status: "idle".into(),
            created_at: now(),
        };
        sqlx::query("INSERT INTO sessions VALUES(?,?,?,?,?)")
            .bind(&t.id)
            .bind(&t.project_id)
            .bind(&t.title)
            .bind(&t.status)
            .bind(&t.created_at)
            .execute(&self.db)
            .await?;
        Ok(t)
    }
    pub async fn workflows(&self) -> Result<Vec<Workflow>> {
        let _guard = self.workflow_lock.lock().await;
        let mut workflows = self.sync_workflow_index().await?;
        let archived = self.archive_records().await?;
        workflows.retain(|w| {
            !archived
                .iter()
                .any(|a| a.kind == "workflow" && a.id == w.id)
        });
        Ok(workflows)
    }
    pub async fn workflow(&self, id: &str) -> Result<Workflow> {
        self.read_workflow_file(id).await
    }
    pub async fn create_workflow(
        &self,
        project: &str,
        name: &str,
        schema: Value,
    ) -> Result<Workflow> {
        self.require_project(project).await?;
        let _guard = self.workflow_lock.lock().await;
        self.ensure_open()?;
        let w = Workflow {
            id: id(),
            project_id: project.into(),
            name: nonempty(name, "Workflow name")?,
            revision: 1,
            schema,
            updated_at: now(),
        };
        self.write_workflow_file(&w).await?;
        self.index_workflow(&w).await?;
        self.emit("workflow_changed", &w.id, serde_json::to_value(&w)?)
            .await?;
        Ok(w)
    }
    pub async fn save_workflow(
        &self,
        id: &str,
        revision: i64,
        name: &str,
        schema: Value,
    ) -> Result<Workflow> {
        let name = nonempty(name, "Workflow name")?;
        let document = crate::workflow_edit::graph::Document::read(&name, &schema)?;
        let result=self.edit_workflow(id,"manual",&json!({"expectedRevision":revision,"mutationId":crate::store::id(),"manualReplacement":document.0})).await;
        match result {
            Err(Error::Tool(value)) if value["code"] == "REVISION_CONFLICT" => Err(Error::Conflict),
            Err(error) => Err(error),
            Ok(_) => self.workflow(id).await,
        }
    }

    pub async fn run_definition(&self, run: &str) -> Result<Option<Value>> {
        let text: Option<String> =
            sqlx::query_scalar("SELECT schema_json FROM run_definitions WHERE run_id=?")
                .bind(run)
                .fetch_optional(&self.db)
                .await?;
        text.map(|text| serde_json::from_str(&text))
            .transpose()
            .map_err(Into::into)
    }
    pub async fn runs(&self) -> Result<Vec<Run>> {
        sqlx::query("SELECT runs.*,node_tests.node_id AS test_node_id FROM runs LEFT JOIN node_tests ON node_tests.run_id=runs.id ORDER BY runs.created_at DESC LIMIT 100")
            .fetch_all(&self.db)
            .await?
            .iter()
            .map(decode_run)
            .collect()
    }
    pub async fn run(&self, id: &str) -> Result<Run> {
        let row = sqlx::query("SELECT runs.*,node_tests.node_id AS test_node_id FROM runs LEFT JOIN node_tests ON node_tests.run_id=runs.id WHERE runs.id=?")
            .bind(id)
            .fetch_optional(&self.db)
            .await?
            .ok_or_else(|| Error::NotFound("Run not found".into()))?;
        decode_run(&row)
    }
    pub async fn history(&self, after: i64, object: Option<&str>) -> Result<Vec<Event>> {
        Ok(sqlx::query_as("SELECT * FROM events WHERE sequence>? AND (? IS NULL OR object_id=?) ORDER BY sequence LIMIT 500").bind(after).bind(object).bind(object).fetch_all(&self.db).await?)
    }
    pub async fn run_node_states(&self, run: &str, workflow: &str) -> Result<serde_json::Value> {
        let rows: Vec<(String,String)> = sqlx::query_as("SELECT e.kind,e.data FROM events e JOIN (SELECT MAX(sequence) AS latest FROM events WHERE object_id=? AND kind LIKE 'node_%' AND json_extract(data,'$.nodeId') IS NOT NULL AND (json_extract(data,'$.workflowId') IS NULL OR json_extract(data,'$.workflowId')=?) GROUP BY json_extract(data,'$.nodeId')) grouped ON e.sequence=grouped.latest ORDER BY e.sequence")
            .bind(run).bind(workflow).fetch_all(&self.db).await?;
        let mut states = serde_json::Map::new();
        for (kind, text) in rows {
            let data: serde_json::Value = serde_json::from_str(&text)?;
            if let Some(node) = data["nodeId"].as_str() {
                states.insert(node.to_owned(), json!(kind));
            }
        }
        Ok(serde_json::Value::Object(states))
    }
    pub async fn run_history(
        &self,
        run: &str,
        after: i64,
        workflow: Option<&str>,
    ) -> Result<Vec<Event>> {
        Ok(sqlx::query_as("SELECT * FROM events WHERE object_id=? AND sequence>? AND (? IS NULL OR json_extract(data,'$.workflowId') IS NULL OR json_extract(data,'$.workflowId')=?) ORDER BY sequence LIMIT 500")
            .bind(run).bind(after).bind(workflow).bind(workflow).fetch_all(&self.db).await?)
    }
    pub async fn set_model(&self, config: ModelConfig) -> Result<()> {
        if !config.base_url.is_empty() {
            let url = reqwest::Url::parse(&config.base_url)
                .map_err(|_| Error::Invalid("Invalid model URL".into()))?;
            if !matches!(url.scheme(), "http" | "https") {
                return Err(Error::Invalid("Model URL must use HTTP or HTTPS".into()));
            }
        }
        let path = self.data_dir.join("model.json");
        #[cfg(unix)]
        {
            use std::os::unix::fs::OpenOptionsExt;
            let mut f = std::fs::OpenOptions::new()
                .write(true)
                .create(true)
                .truncate(true)
                .mode(0o600)
                .open(&path)?;
            use std::io::Write;
            f.write_all(&serde_json::to_vec(&config)?)?;
        }
        #[cfg(not(unix))]
        tokio::fs::write(path, serde_json::to_vec(&config)?).await?;
        self.deployment_settings
            .configure_model(config.clone())
            .await?;
        *self.model.lock().await = config;
        self.resume_conversations().await?;
        Ok(())
    }
}
impl Store {
    pub fn ensure_open(&self) -> Result<()> {
        if self.closed.is_cancelled() {
            return Err(Error::NotFound(
                "This project was deleted. Select another project".into(),
            ));
        }
        Ok(())
    }
}
fn decode_run(row: &sqlx::sqlite::SqliteRow) -> Result<Run> {
    Ok(Run {
        id: row.get("id"),
        workflow_id: row.get("workflow_id"),
        session_id: row.get("session_id"),
        status: row.get("status"),
        inputs: serde_json::from_str(row.get("inputs"))?,
        outputs: serde_json::from_str(row.get("outputs"))?,
        error: row.get("error"),
        revision: row.get("revision"),
        created_at: row.get("created_at"),
        test_node_id: row.get("test_node_id"),
    })
}
pub fn nonempty(s: &str, label: &str) -> Result<String> {
    let v = s.trim();
    if v.is_empty() || v.len() > 20000 {
        return Err(Error::Invalid(format!(
            "{label} must be nonempty and no longer than 20000 characters"
        )));
    }
    Ok(v.into())
}
pub fn starter_schema() -> Value {
    json!({"nodes":[{"id":"start","type":"start","meta":{"position":{"x":80,"y":160}},"data":{"title":"Input","outputs":{"type":"object","properties":{"message":{"type":"string"}}}}},{"id":"end","type":"end","meta":{"position":{"x":460,"y":160}},"data":{"title":"Output","inputs":{"type":"object","properties":{"message":{"type":"string"}}},"inputsValues":{"message":{"type":"ref","content":["start","message"]}}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"end"}]})
}
