use crate::{
    error::{Error, Result},
    model::{Project, Workflow},
    store::{Store, id, nonempty, now},
};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::path::{Path, PathBuf};
use tokio::io::AsyncWriteExt;

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
struct ProjectFile {
    format_version: u32,
    id: String,
    name: String,
    created_at: String,
}

/// Windows may briefly retain SQLite/WAL handles after the pool has closed.
/// Retry only sharing/access errors, preserve the original failure, and never
/// fall back to copying or removing a source directory.
pub async fn rename_directory(source: &Path, destination: &Path) -> std::io::Result<()> {
    retry_directory_operation(|| tokio::fs::rename(source, destination)).await
}

pub async fn remove_directory(path: &Path) -> std::io::Result<()> {
    retry_directory_operation(|| tokio::fs::remove_dir_all(path)).await
}

async fn retry_directory_operation<F, Fut>(mut operation: F) -> std::io::Result<()>
where
    F: FnMut() -> Fut,
    Fut: std::future::Future<Output = std::io::Result<()>>,
{
    #[cfg(windows)]
    {
        let deadline = tokio::time::Instant::now() + std::time::Duration::from_secs(2);
        let mut delay = 10;
        loop {
            match operation().await {
                Err(error)
                    if matches!(error.raw_os_error(), Some(5 | 32 | 33))
                        && tokio::time::Instant::now() < deadline =>
                {
                    tokio::time::sleep(std::time::Duration::from_millis(delay)).await;
                    delay = (delay * 2).min(100);
                }
                result => return result,
            }
        }
    }
    #[cfg(not(windows))]
    operation().await
}

pub async fn atomic_json(path: &Path, value: &impl Serialize) -> Result<()> {
    let parent = path
        .parent()
        .ok_or_else(|| Error::Invalid("Invalid document path".into()))?;
    let temporary = parent.join(format!(".{}.tmp", id()));
    let mut options = tokio::fs::OpenOptions::new();
    options.write(true).create_new(true);
    #[cfg(unix)]
    options.mode(0o600);
    let mut file = options.open(&temporary).await?;
    file.write_all(&serde_json::to_vec_pretty(value)?).await?;
    file.sync_all().await?;
    drop(file);
    tokio::fs::rename(&temporary, path).await?;
    Ok(())
}
pub async fn read_project(root: &Path) -> Result<Project> {
    let root = tokio::fs::canonicalize(root).await.map_err(|error| {
        if error.kind() == std::io::ErrorKind::NotFound {
            Error::Invalid("Select an existing project directory".into())
        } else {
            error.into()
        }
    })?;
    let manifest = tokio::fs::canonicalize(root.join("flowgram.project.json"))
        .await
        .map_err(|error| {
            if error.kind() == std::io::ErrorKind::NotFound {
                Error::Invalid("Select a directory containing flowgram.project.json".into())
            } else {
                error.into()
            }
        })?;
    if !manifest.starts_with(&root) {
        return Err(Error::Invalid(
            "Project manifest must remain inside its directory".into(),
        ));
    }
    let file: ProjectFile = serde_json::from_slice(&tokio::fs::read(manifest).await?)?;
    if file.format_version != 1 {
        return Err(Error::Invalid(
            "Unsupported project format. Create or open a current FlowGram project".into(),
        ));
    }
    uuid::Uuid::parse_str(&file.id).map_err(|_| Error::Invalid("Invalid project ID".into()))?;
    Ok(Project {
        id: file.id,
        name: nonempty(&file.name, "Project name")?,
        created_at: file.created_at,
        directory: root.to_string_lossy().into_owned(),
    })
}
pub async fn write_project(root: &Path, name: &str) -> Result<Project> {
    tokio::fs::create_dir_all(root).await?;
    if root.join("flowgram.project.json").exists() {
        return Err(Error::Invalid(
            "This directory already contains a project. Open it instead".into(),
        ));
    }
    let file = ProjectFile {
        format_version: 1,
        id: id(),
        name: nonempty(name, "Project name")?,
        created_at: now(),
    };
    atomic_json(&root.join("flowgram.project.json"), &file).await?;
    for directory in ["workflows", "assets", "config", ".flowgram"] {
        tokio::fs::create_dir_all(root.join(directory)).await?;
    }
    read_project(root).await
}
pub async fn rename_project(root: &Path, name: &str) -> Result<Project> {
    let mut file: ProjectFile =
        serde_json::from_slice(&tokio::fs::read(root.join("flowgram.project.json")).await?)?;
    file.name = nonempty(name, "Project name")?;
    atomic_json(&root.join("flowgram.project.json"), &file).await?;
    read_project(root).await
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct WorkflowFile {
    format_version: u32,
    #[serde(flatten)]
    workflow: Workflow,
}
impl Store {
    async fn workflow_path(&self, workflow: &str, create: bool) -> Result<PathBuf> {
        uuid::Uuid::parse_str(workflow)
            .map_err(|_| Error::Invalid("Invalid workflow ID".into()))?;
        let base = tokio::fs::canonicalize(self.project_root.join("workflows")).await?;
        if !base.starts_with(&self.project_root) {
            return Err(Error::Invalid(
                "Workflow resources must remain inside the project".into(),
            ));
        }
        let folder = base.join(workflow);
        if create {
            tokio::fs::create_dir_all(&folder).await?;
        }
        let folder = tokio::fs::canonicalize(folder).await.map_err(|e| {
            if e.kind() == std::io::ErrorKind::NotFound {
                Error::NotFound("Workflow not found".into())
            } else {
                e.into()
            }
        })?;
        if !folder.starts_with(&self.project_root) {
            return Err(Error::Invalid(
                "Workflow resources must remain inside the project".into(),
            ));
        }
        Ok(folder.join("workflow.json"))
    }
    pub async fn read_workflow_file(&self, workflow: &str) -> Result<Workflow> {
        let path = self.workflow_path(workflow, false).await?;
        let canonical = tokio::fs::canonicalize(&path).await?;
        if !canonical.starts_with(&self.project_root) {
            return Err(Error::Invalid(
                "Workflow document is outside the project".into(),
            ));
        }
        let file: WorkflowFile = serde_json::from_slice(&tokio::fs::read(canonical).await?)?;
        if file.format_version != 1 || file.workflow.id != workflow {
            return Err(Error::Invalid(
                "Invalid or unsupported workflow document".into(),
            ));
        }
        self.require_project(&file.workflow.project_id).await?;
        Ok(file.workflow)
    }
    pub async fn write_workflow_file(&self, workflow: &Workflow) -> Result<()> {
        let path = self.workflow_path(&workflow.id, true).await?;
        atomic_json(
            &path,
            &WorkflowFile {
                format_version: 1,
                workflow: workflow.clone(),
            },
        )
        .await
    }
    pub async fn index_workflow(&self, workflow: &Workflow) -> Result<()> {
        sqlx::query("INSERT INTO workflows(id,project_id,name,revision,schema_json,updated_at) VALUES(?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET name=excluded.name,revision=excluded.revision,schema_json=excluded.schema_json,updated_at=excluded.updated_at")
            .bind(&workflow.id).bind(&workflow.project_id).bind(&workflow.name).bind(workflow.revision).bind(workflow.schema.to_string()).bind(&workflow.updated_at).execute(&self.db).await?;
        Ok(())
    }
    pub async fn sync_workflow_index(&self) -> Result<Vec<Workflow>> {
        self.ensure_open()?;
        let folder = self.project_root.join("workflows");
        tokio::fs::create_dir_all(&folder).await?;
        let mut entries = tokio::fs::read_dir(folder).await?;
        let mut workflows = Vec::new();
        while let Some(entry) = entries.next_entry().await? {
            if !entry.file_type().await?.is_dir() {
                continue;
            }
            let workflow = self
                .read_workflow_file(&entry.file_name().to_string_lossy())
                .await?;
            self.index_workflow(&workflow).await?;
            workflows.push(workflow);
        }
        workflows.sort_by(|a, b| b.updated_at.cmp(&a.updated_at));
        Ok(workflows)
    }
    pub async fn session_references(&self, session: &str) -> Result<Value> {
        self.session(session).await?;
        let inputs:Vec<String> = sqlx::query_scalar("SELECT data FROM conversation_inputs WHERE session_id=? ORDER BY ordinal DESC LIMIT 1000").bind(session).fetch_all(&self.db).await?;
        let mut ids = std::collections::BTreeSet::new();
        for input in inputs {
            let value: Value = serde_json::from_str(&input)?;
            if let Some(id) = value["references"]["workflowId"].as_str() {
                ids.insert(id.to_owned());
            }
        }
        let items:Vec<String> = sqlx::query_scalar("SELECT i.data FROM conversation_items i JOIN conversation_turns t ON t.id=i.turn_id WHERE t.session_id=? AND json_extract(i.data,'$.kind')='tool' ORDER BY t.ordinal DESC,i.ordinal DESC LIMIT 1000").bind(session).fetch_all(&self.db).await?;
        for item in items {
            let value: Value = serde_json::from_str(&item)?;
            for id in [
                value["payload"]["arguments"]["workflowId"].as_str(),
                value["payload"]["result"]["context"]["workflowId"].as_str(),
            ]
            .into_iter()
            .flatten()
            {
                if self.workflow(id).await.is_ok() {
                    ids.insert(id.to_owned());
                }
            }
        }
        Ok(serde_json::json!({"workflowIds":ids}))
    }
}
