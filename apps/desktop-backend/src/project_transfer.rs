//! Portable project packages. Local connections and deployment authority are never copied.
use crate::{
    error::{Error, Result},
    model::{Graph, Project, Workflow},
    project::{atomic_json, read_project, write_project},
    registry::{Registry, RegistryState},
    store::{Store, id, nonempty, now},
};
use axum::{
    Json, Router,
    extract::{Path, State},
    routing::post,
};
use base64::{Engine, engine::general_purpose::STANDARD};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use sqlx::Row;
use std::{
    collections::{BTreeMap, HashSet},
    path::{Component, Path as FsPath, PathBuf},
};

pub const MAX_PACKAGE_BYTES: usize = 64 * 1024 * 1024;
const MAX_RESOURCE_BYTES: usize = 32 * 1024 * 1024;
// Fixed schemas prevent an imported package from supplying SQL or adding authority.
const TABLES: &[(&str, &str)] = &[
    ("sessions", "id,project_id,title,status,created_at"),
    (
        "runs",
        "id,workflow_id,session_id,status,inputs,outputs,error,revision,created_at",
    ),
    ("run_definitions", "run_id,schema_json"),
    ("run_workflows", "run_id,workflow_id,definition"),
    ("node_tests", "run_id,node_id,definition,bindings"),
    ("events", "sequence,kind,object_id,data,created_at"),
    (
        "conversation_inputs",
        "ordinal,id,session_id,client_input_id,status,turn_id,delivery_mode,data",
    ),
    ("conversation_turns", "ordinal,id,session_id,status,data"),
    ("conversation_items", "id,turn_id,ordinal,data"),
    ("conversation_controls", "session_id,paused"),
    ("conversation_runs", "turn_id,run_id"),
    ("session_models", "session_id,selection"),
    ("conversation_contexts", "session_id,data,state"),
    ("agent_tool_results", "id,turn_id,run_id,data"),
    ("tool_values", "id,owner_run,data,created_at"),
    (
        "workflow_mutations",
        "id,workflow_id,caller,mutation_id,request_hash,state,before_doc,after_doc,patch,receipt",
    ),
    (
        "tool_run_requests",
        "caller,mutation_id,request_hash,state,receipt",
    ),
    ("run_model_labels", "run_id,workflow_id,node_id,label"),
];

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Package {
    pub format: String,
    pub format_version: u32,
    pub exported_at: String,
    pub source_project_id: String,
    pub name: String,
    pub workflows: Vec<Workflow>,
    pub files: Vec<Resource>,
    pub history: Option<BTreeMap<String, Vec<Vec<Value>>>>,
    #[serde(default)]
    pub archives: Vec<crate::archive::ArchivedObject>,
}
#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Resource {
    pub path: String,
    pub content_base64: String,
}
fn invalid(message: &str) -> Error {
    Error::Invalid(message.into())
}
fn resource_path(path: &str) -> Result<PathBuf> {
    let parts: Vec<_> = FsPath::new(path).components().collect();
    if path.len() > 1024
        || path.contains('\\')
        || path.contains(':')
        || parts.len() < 2
        || !matches!(parts[0], Component::Normal(p) if p == "assets" || p == "config")
        || parts.iter().any(|p| !matches!(p, Component::Normal(_)))
        || path
            .split('/')
            .any(|p| p.is_empty() || p == "." || p == "..")
    {
        return Err(invalid("Project package contains an unsafe resource path"));
    }
    Ok(PathBuf::from(path))
}
impl Package {
    pub fn validate(&self) -> Result<()> {
        if self.format != "flowgram-project" || self.format_version != 3 {
            return Err(invalid("Unsupported project package format"));
        }
        nonempty(&self.name, "Project name")?;
        uuid::Uuid::parse_str(&self.source_project_id)
            .map_err(|_| invalid("Invalid project package identity"))?;
        if self.workflows.len() > 1000 || self.files.len() > 2000 {
            return Err(invalid(
                "Project package contains too many workflows or resources",
            ));
        }
        let mut ids = HashSet::new();
        for workflow in &self.workflows {
            uuid::Uuid::parse_str(&workflow.id)
                .map_err(|_| invalid("Invalid workflow ID in project package"))?;
            if !ids.insert(workflow.id.as_str())
                || workflow.project_id != self.source_project_id
                || workflow.revision < 1
            {
                return Err(invalid(
                    "Project package contains duplicate or inconsistent workflows",
                ));
            }
            nonempty(&workflow.name, "Workflow name")?;
            serde_json::from_value::<Graph>(workflow.schema.clone())
                .map_err(|_| invalid("Invalid workflow graph in project package"))?;
        }
        let mut paths = HashSet::new();
        let mut bytes = 0usize;
        for file in &self.files {
            let path = resource_path(&file.path)?;
            // Case-folding also rejects collisions on default macOS/Windows filesystems.
            if !paths.insert(path.to_string_lossy().to_lowercase()) {
                return Err(invalid("Project package contains duplicate resource paths"));
            }
            bytes += STANDARD
                .decode(&file.content_base64)
                .map_err(|_| invalid("Invalid resource encoding in project package"))?
                .len();
            if bytes > MAX_RESOURCE_BYTES {
                return Err(invalid("Project resources exceed 32 MB"));
            }
        }
        if let Some(history) = &self.history {
            if history.len() != TABLES.len()
                || TABLES.iter().any(|(name, _)| !history.contains_key(*name))
            {
                return Err(invalid("Invalid history tables in project package"));
            }
            let mut count = 0;
            for (table, columns) in TABLES {
                for row in &history[*table] {
                    count += 1;
                    if count > 100_000
                        || row.len() != columns.split(',').count()
                        || row
                            .iter()
                            .any(|v| !v.is_null() && !v.is_string() && v.as_i64().is_none())
                    {
                        return Err(invalid("Invalid or oversized project history"));
                    }
                    if *table == "sessions" && row[1].as_str() != Some(&self.source_project_id) {
                        return Err(invalid("Project history belongs to a different project"));
                    }
                    if *table == "runs" && !ids.contains(row[1].as_str().unwrap_or_default()) {
                        return Err(invalid("Project history references a missing workflow"));
                    }
                    validate_history_row(table, row)?;
                }
            }
        }
        let mut archived_ids = HashSet::new();
        for archived in &self.archives {
            let exists = if archived.kind == "workflow" {
                ids.contains(archived.id.as_str())
            } else if archived.kind == "session" {
                self.history.as_ref().is_some_and(|h| {
                    h["sessions"]
                        .iter()
                        .any(|row| row[0].as_str() == Some(&archived.id))
                })
            } else {
                false
            };
            if !exists || !archived_ids.insert((&archived.kind, &archived.id)) {
                return Err(invalid("Project package contains invalid archive metadata"));
            }
        }
        Ok(())
    }
}
fn validate_history_row(table: &str, row: &[Value]) -> Result<()> {
    let data = |index: usize| -> Result<Value> {
        serde_json::from_str(
            row[index]
                .as_str()
                .ok_or_else(|| invalid("Invalid history document"))?,
        )
        .map_err(|_| invalid("Invalid history document"))
    };
    match table {
        "conversation_contexts" => {
            crate::agent_context::validate_checkpoint(&data(1)?)?;
            serde_json::from_value::<crate::agent_context::ContextUsage>(data(2)?)
                .map_err(|_| invalid("Invalid context usage in project package"))?;
        }
        "agent_tool_results" => {
            data(3)?;
        }
        "tool_values" => {
            data(2)?;
        }
        "workflow_mutations" => {
            if row[5] != "committed" {
                return Err(invalid("Only committed workflow changes can be imported"));
            }
            for index in [6, 7] {
                let workflow: Workflow = serde_json::from_value(data(index)?)
                    .map_err(|_| invalid("Invalid workflow change definition"))?;
                if row[1] != workflow.id {
                    return Err(invalid(
                        "Workflow change identity differs from its definition",
                    ));
                }
            }
            if !data(8)?.is_array() {
                return Err(invalid("Invalid workflow change patch"));
            }
            data(9)?;
        }
        "tool_run_requests" => {
            if !matches!(row[3].as_str(), Some("committed" | "failed")) || row[4].is_null() {
                return Err(invalid("Unresolved execution requests cannot be imported"));
            }
            data(4)?;
        }
        "session_models" => {
            serde_json::from_value::<crate::models::Selection>(data(1)?)
                .map_err(|_| invalid("Invalid session model selection"))?;
        }
        "run_model_labels" => {
            serde_json::from_value::<crate::models::Trace>(data(3)?)
                .map_err(|_| invalid("Invalid model execution label"))?;
        }
        "conversation_inputs" => {
            let value: crate::conversation::ConversationInput = serde_json::from_value(data(7)?)
                .map_err(|_| invalid("Invalid conversation input in project package"))?;
            if row[1] != value.id
                || row[2] != value.session_id
                || row[3] != value.client_input_id
                || row[4] != value.status
                || row[5] != serde_json::to_value(value.turn_id)?
                || row[6] != value.delivery_mode
            {
                return Err(invalid(
                    "Inconsistent conversation input in project package",
                ));
            }
        }
        "conversation_turns" => {
            let value: crate::conversation::Turn = serde_json::from_value(data(4)?)
                .map_err(|_| invalid("Invalid conversation turn in project package"))?;
            if row[1] != value.id || row[2] != value.session_id || row[3] != value.status {
                return Err(invalid("Inconsistent conversation turn in project package"));
            }
        }
        "conversation_items" => {
            let value: crate::conversation::ConversationItem = serde_json::from_value(data(3)?)
                .map_err(|_| invalid("Invalid conversation item in project package"))?;
            if row[0] != value.id || row[1] != value.turn_id || row[2] != value.ordinal {
                return Err(invalid("Inconsistent conversation item in project package"));
            }
        }
        "runs" => {
            data(4)?;
            data(5)?;
        }
        "events" => {
            data(3)?;
        }
        "run_definitions" => {
            serde_json::from_value::<Graph>(data(1)?)
                .map_err(|_| invalid("Invalid archived run graph"))?;
        }
        "run_workflows" => {
            serde_json::from_value::<Workflow>(data(2)?)
                .map_err(|_| invalid("Invalid archived workflow"))?;
        }
        "node_tests" => {
            data(2)?;
            data(3)?;
        }
        _ => {}
    }
    Ok(())
}

pub async fn export_project(store: &Store, include_history: bool) -> Result<Package> {
    let _workflows = store.workflow_lock.lock().await;
    let _conversation = store.conversation_lock.lock().await;
    let project = read_project(&store.project_root).await?;
    let mut files = vec![];
    let mut pending = vec![PathBuf::from("assets"), PathBuf::from("config")];
    let mut total = 0;
    while let Some(relative) = pending.pop() {
        let path = store.project_root.join(&relative);
        let metadata = tokio::fs::symlink_metadata(&path).await?;
        if metadata.file_type().is_symlink() {
            return Err(invalid("Project resources cannot contain symbolic links"));
        }
        if metadata.is_dir() {
            let mut entries = tokio::fs::read_dir(path).await?;
            while let Some(entry) = entries.next_entry().await? {
                pending.push(relative.join(entry.file_name()));
            }
        } else if metadata.is_file() {
            total += metadata.len();
            if total > MAX_RESOURCE_BYTES as u64 || files.len() >= 2000 {
                return Err(invalid("Project resources exceed 32 MB or 2000 files"));
            }
            files.push(Resource {
                path: relative.to_string_lossy().replace('\\', "/"),
                content_base64: STANDARD.encode(tokio::fs::read(path).await?),
            });
        } else {
            return Err(invalid("Project resources must be regular files"));
        }
        if pending.len() > 4000 {
            return Err(invalid("Project contains too many resource directories"));
        }
    }
    files.sort_by(|a, b| a.path.cmp(&b.path));
    let history = if include_history {
        let mut transaction = store.db.begin().await?;
        let mut history = BTreeMap::new();
        for (table, columns) in TABLES {
            let rows = sqlx::query(&format!(
                "SELECT json_array({columns}) AS data FROM {table} {} ORDER BY rowid",
                match *table {
                    "workflow_mutations" => "WHERE state='committed'",
                    "tool_run_requests" =>
                        "WHERE receipt IS NOT NULL AND state IN ('committed','failed')",
                    _ => "",
                }
            ))
            .fetch_all(&mut *transaction)
            .await?;
            let rows = rows
                .into_iter()
                .map(|row| serde_json::from_str::<Vec<Value>>(row.get("data")))
                .collect::<std::result::Result<Vec<_>, _>>()?;
            history.insert(table.to_string(), rows);
        }
        transaction.commit().await?;
        Some(history)
    } else {
        None
    };
    let package = Package {
        format: "flowgram-project".into(),
        format_version: 3,
        exported_at: now(),
        source_project_id: project.id,
        name: project.name,
        workflows: store.sync_workflow_index().await?,
        files,
        history,
        archives: store
            .archive_records()
            .await?
            .into_iter()
            .filter(|a| include_history || a.kind == "workflow")
            .collect(),
    };
    package.validate()?;
    if serde_json::to_vec_pretty(&package)?.len() > MAX_PACKAGE_BYTES {
        return Err(invalid("Project package exceeds 64 MB"));
    }
    Ok(package)
}

pub async fn import_project(
    registry: &Registry,
    package: Package,
    name: Option<&str>,
    parent: Option<&str>,
) -> Result<Project> {
    package.validate()?;
    let name = nonempty(name.unwrap_or(&package.name), "Project name")?;
    let parent = if let Some(parent) = parent {
        let path = tokio::fs::canonicalize(parent)
            .await
            .map_err(|_| invalid("Select an existing directory for the imported project"))?;
        if !path.is_dir() {
            return Err(invalid(
                "Select an existing directory for the imported project",
            ));
        }
        path
    } else {
        let path = registry.directory.join("projects");
        tokio::fs::create_dir_all(&path).await?;
        path
    };
    let identity = id();
    for project in registry.projects().await {
        if parent.starts_with(&project.directory) {
            return Err(invalid(
                "Choose an import location outside open project directories",
            ));
        }
    }
    let stage = parent.join(format!(".flowgram-import-{identity}"));
    let destination = parent.join(&identity);
    tokio::fs::create_dir(&stage).await?;
    let mut moved = false;
    let result = async {
        let project = write_project(&stage, &name).await?;
        let store = Store::open_configured(&stage, &registry.directory, Some(registry.model.clone())).await?;
        let result = async {
            for mut workflow in package.workflows {
                workflow.project_id = project.id.clone();
                store.write_workflow_file(&workflow).await?;
                store.index_workflow(&workflow).await?;
            }
            for file in package.files {
                let path = stage.join(resource_path(&file.path)?);
                tokio::fs::create_dir_all(path.parent().unwrap()).await?;
                tokio::fs::write(path, STANDARD.decode(file.content_base64).map_err(|_| invalid("Invalid resource encoding in project package"))?).await?;
            }
            if let Some(history) = package.history {
                let mut transaction = store.db.begin().await?;
                for (table, columns) in TABLES {
                    for original in &history[*table] {
                        let mut row=original.clone();
                        // Immutable tool_values are copied verbatim so their content hashes
                        // and reference graph remain valid. Rebind authoring authority only.
                        let indexes:&[usize]=match *table { "run_workflows" => &[2], "workflow_mutations" => &[6,7,9], "tool_run_requests" => &[4], _=>&[] };
                        for &index in indexes {
                            let mut value:Value=serde_json::from_str(row[index].as_str().unwrap())?;
                            if value.get("schema").is_some() && value.get("projectId").is_some() { value["projectId"]=json!(project.id); }
                            if value["context"].is_object() && value["context"].get("projectId").is_some() { value["context"]["projectId"]=json!(project.id); }
                            row[index]=json!(value.to_string());
                        }
                        let mut query = sqlx::QueryBuilder::<sqlx::Sqlite>::new(format!("INSERT INTO {table} ({columns}) VALUES ("));
                        let mut separated = query.separated(",");
                        for (index, value) in row.iter().enumerate() {
                            if *table == "sessions" && index == 1 { separated.push_bind(&project.id); }
                            else { match value {
                                Value::Null => { separated.push_bind(None::<String>); }
                                Value::String(value) => { separated.push_bind(value); }
                                _ => { separated.push_bind(value.as_i64().unwrap()); }
                            }}
                        }
                        query.push(")");
                        query.build().execute(&mut *transaction).await.map_err(|_| invalid("Project history contains invalid or conflicting records"))?;
                    }
                }
                // Imported queues require an explicit user resume. Never replay operations.
                sqlx::query("INSERT INTO conversation_controls(session_id,paused) SELECT id,1 FROM sessions WHERE true ON CONFLICT(session_id) DO UPDATE SET paused=1").execute(&mut *transaction).await?;
                sqlx::query("UPDATE runs SET status='interrupted',error='Execution was interrupted before this project was imported' WHERE status='running'").execute(&mut *transaction).await?;
                sqlx::query("UPDATE sessions SET status='idle' WHERE status='running'").execute(&mut *transaction).await?;
                transaction.commit().await?;
                crate::conversation::initialize(&store.db).await?;
            }
            for archived in package.archives {
                sqlx::query("INSERT INTO archived_objects VALUES(?,?,?)").bind(archived.kind).bind(archived.id).bind(archived.archived_at).execute(&store.db).await?;
            }
            Ok::<_, Error>(())
        }.await;
        store.db.close().await;
        result?;
        drop(store);
        crate::project::rename_directory(&stage, &destination).await?;
        moved = true;
        registry.register(read_project(&destination).await?).await
    }.await;
    if result.is_err() {
        let _ = crate::project::remove_directory(&stage).await;
        if moved {
            let _ = crate::project::remove_directory(&destination).await;
        }
    }
    result
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
struct Export {
    #[serde(default = "yes")]
    include_history: bool,
    destination: Option<String>,
}
fn yes() -> bool {
    true
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
struct Import {
    package: Package,
    #[serde(default)]
    model_bindings: BTreeMap<String, String>,
    name: Option<String>,
    directory: Option<String>,
}
pub(crate) fn routes() -> Router<RegistryState> {
    Router::new()
        .route("/api/projects/{id}/export", post(export))
        .route(
            "/api/projects/import",
            post(import).layer(axum::extract::DefaultBodyLimit::max(MAX_PACKAGE_BYTES)),
        )
}
async fn export(
    State(state): State<RegistryState>,
    Path(id): Path<String>,
    Json(input): Json<Export>,
) -> Result<Json<Value>> {
    let package =
        export_project(&state.registry.resolve(&id).await?, input.include_history).await?;
    if let Some(destination) = input.destination {
        if !destination.ends_with(".flowgram.json") {
            return Err(invalid("Use a .flowgram.json filename for project exports"));
        }
        let path = PathBuf::from(destination);
        let parent = tokio::fs::canonicalize(
            path.parent()
                .ok_or_else(|| invalid("Select an export destination"))?,
        )
        .await?;
        let path = parent.join(
            path.file_name()
                .ok_or_else(|| invalid("Select an export destination"))?,
        );
        for project in state.registry.projects().await {
            if path.starts_with(&project.directory) {
                return Err(invalid(
                    "Save the project package outside open project directories",
                ));
            }
        }
        atomic_json(&path, &package).await?;
        Ok(Json(serde_json::json!({"saved":true})))
    } else {
        Ok(Json(serde_json::to_value(package)?))
    }
}
async fn import(
    State(state): State<RegistryState>,
    Json(input): Json<Import>,
) -> Result<Json<Project>> {
    let mut package = input.package;
    fn bind(nodes: &mut Value, mappings: &BTreeMap<String, String>) {
        for node in nodes.as_array_mut().into_iter().flatten() {
            if let Some(id) = node
                .pointer("/data/model/modelId")
                .and_then(Value::as_str)
                .and_then(|id| mappings.get(id))
                .cloned()
            {
                node["data"]["model"]["modelId"] = Value::String(id);
            }
            if let Some(blocks) = node.get_mut("blocks") {
                bind(blocks, mappings);
            }
        }
    }
    for target in input.model_bindings.values() {
        state
            .registry
            .deployment_settings
            .model_entry(target)
            .await?;
    }
    for workflow in &mut package.workflows {
        bind(&mut workflow.schema["nodes"], &input.model_bindings);
    }
    if let Some(history) = &mut package.history {
        for (table, index) in [("session_models", 1), ("conversation_inputs", 7)] {
            if let Some(rows) = history.get_mut(table) {
                for row in rows {
                    let mut value: Value = serde_json::from_str(
                        row[index]
                            .as_str()
                            .ok_or_else(|| invalid("Invalid imported model selection"))?,
                    )?;
                    let selection = if table == "session_models" {
                        &mut value
                    } else {
                        &mut value["model"]
                    };
                    if let Some(target) = selection["modelId"]
                        .as_str()
                        .and_then(|id| input.model_bindings.get(id))
                    {
                        selection["modelId"] = json!(target);
                    }
                    row[index] = Value::String(serde_json::to_string(&value)?);
                }
            }
        }
    }
    Ok(Json(
        import_project(
            &state.registry,
            package,
            input.name.as_deref(),
            input.directory.as_deref(),
        )
        .await?,
    ))
}
