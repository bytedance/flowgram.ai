//! Project metadata and durable, explicitly confirmed project deletion.
use crate::{
    error::{Error, Result},
    model::Project,
    project::{atomic_json, read_project, rename_project},
    registry::{Registry, RegistryState},
    store::{id, nonempty},
};
use axum::{
    Json, Router,
    extract::{Path, State},
    routing::get,
};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use sqlx::Row;
use std::path::{Path as FsPath, PathBuf};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
struct Deletion {
    project: Project,
    staged: PathBuf,
}
async fn cleanup_catalog(
    catalog: &crate::deployment_settings::Catalog,
    project: &str,
) -> Result<()> {
    let mut tx = catalog.db.begin().await?;
    for table in ["publication_deployments", "publication_versions"] {
        sqlx::query(&format!("DELETE FROM {table} WHERE publication_id IN (SELECT id FROM publications WHERE project_id=?)")).bind(project).execute(&mut *tx).await?;
    }
    sqlx::query("DELETE FROM publications WHERE project_id=?")
        .bind(project)
        .execute(&mut *tx)
        .await?;
    sqlx::query("DELETE FROM credential_sync WHERE project_id=?")
        .bind(project)
        .execute(&mut *tx)
        .await?;
    let rows = sqlx::query("SELECT id,project_ids FROM credentials WHERE project_ids IS NOT NULL")
        .fetch_all(&mut *tx)
        .await?;
    for row in rows {
        let mut projects: Vec<String> = serde_json::from_str(row.get("project_ids"))?;
        if projects.iter().any(|id| id == project) {
            projects.retain(|id| id != project);
            sqlx::query("UPDATE credentials SET project_ids=? WHERE id=?")
                .bind(serde_json::to_string(&projects)?)
                .bind(row.get::<String, _>("id"))
                .execute(&mut *tx)
                .await?;
        }
    }
    tx.commit().await?;
    Ok(())
}
pub(crate) async fn recover(directory: &FsPath) -> Result<()> {
    let journal = directory.join("project-deletions");
    if !journal.exists() {
        return Ok(());
    }
    let projects: Vec<Project> = match tokio::fs::read(directory.join("projects.json")).await {
        Ok(bytes) => serde_json::from_slice(&bytes)?,
        Err(error) if error.kind() == std::io::ErrorKind::NotFound => vec![],
        Err(error) => return Err(error.into()),
    };
    let catalog = crate::deployment_settings::Catalog::open(directory).await?;
    let mut entries = tokio::fs::read_dir(journal).await?;
    while let Some(entry) = entries.next_entry().await? {
        if !entry.file_type().await?.is_file() {
            continue;
        }
        let record: Deletion = serde_json::from_slice(&tokio::fs::read(entry.path()).await?)?;
        let root = PathBuf::from(&record.project.directory);
        let prefix = format!(".flowgram-delete-{}-", record.project.id);
        if uuid::Uuid::parse_str(&record.project.id).is_err()
            || record.staged.parent() != root.parent()
            || !record
                .staged
                .file_name()
                .is_some_and(|name| name.to_string_lossy().starts_with(&prefix))
        {
            return Err(Error::Invalid("Invalid project deletion journal".into()));
        }
        if projects.iter().any(|p| p.id == record.project.id) {
            if record.staged.exists() {
                crate::project::rename_directory(&record.staged, &root).await?;
            }
        } else {
            cleanup_catalog(&catalog, &record.project.id).await?;
            if record.staged.exists() {
                crate::project::remove_directory(&record.staged).await?;
            }
        }
        tokio::fs::remove_file(entry.path()).await?;
    }
    Ok(())
}
impl Registry {
    pub async fn project_details(&self, project: &str) -> Result<Value> {
        let store = self.resolve(project).await?;
        let project = read_project(&store.project_root).await?;
        let counts=sqlx::query("SELECT (SELECT count(*) FROM workflows) AS workflows,(SELECT count(*) FROM sessions) AS sessions,(SELECT count(*) FROM runs) AS runs,(SELECT count(*) FROM archived_objects) AS archived").fetch_one(&store.db).await?;
        Ok(
            json!({"project":project,"counts":{"workflows":counts.get::<i64,_>("workflows"),"sessions":counts.get::<i64,_>("sessions"),"runs":counts.get::<i64,_>("runs"),"archived":counts.get::<i64,_>("archived")}}),
        )
    }
    pub async fn rename(&self, project: &str, name: &str, expected_name: &str) -> Result<Project> {
        let _mutation = self.mutations.lock().await;
        let store = self.resolve(project).await?;
        let _workflow = store.workflow_lock.lock().await;
        let mut records = self.records.lock().await;
        let current = read_project(&store.project_root).await?;
        if current.id != project {
            return Err(Error::Invalid(
                "Project identity changed. Open its directory again".into(),
            ));
        }
        if current.name != expected_name {
            return Err(Error::Invalid(
                "Project name changed. Reopen its details and try again".into(),
            ));
        }
        let name = nonempty(name, "Project name")?;
        if name.len() > 256 || name.chars().any(char::is_control) {
            return Err(Error::Invalid(
                "Project name must be at most 256 bytes and contain no control characters".into(),
            ));
        }
        let updated = rename_project(&store.project_root, &name).await?;
        let mut next = records.clone();
        if let Some(record) = next.iter_mut().find(|p| p.id == project) {
            *record = updated.clone();
        }
        let result = async {
            sqlx::query("UPDATE projects SET name=? WHERE id=?")
                .bind(&name)
                .bind(project)
                .execute(&store.db)
                .await?;
            atomic_json(&self.directory.join("projects.json"), &next).await?;
            Ok::<_, Error>(())
        }
        .await;
        if let Err(error) = result {
            rename_project(&store.project_root, &current.name).await?;
            sqlx::query("UPDATE projects SET name=? WHERE id=?")
                .bind(&current.name)
                .bind(project)
                .execute(&store.db)
                .await?;
            return Err(error);
        }
        *records = next;
        store
            .emit("project_changed", project, json!({"project":updated}))
            .await?;
        Ok(updated)
    }
    pub async fn delete_project(&self, project: &str, confirmation: &str) -> Result<()> {
        let _mutation = self.mutations.lock().await;
        let store = self.resolve(project).await?;
        let _workflow = store.workflow_lock.lock().await;
        let _conversation = store.conversation_lock.lock().await;
        let _service = store.service_lock.lock().await;
        let mut stores = self.stores.lock().await;
        let mut records = self.records.lock().await;
        let current = read_project(&store.project_root).await?;
        if current.id != project {
            return Err(Error::Invalid(
                "Project identity changed. Open its directory again".into(),
            ));
        }
        // Confirmation is exact: no trimming, case folding or partial names.
        if confirmation != current.name {
            return Err(Error::Invalid(
                "Enter the complete project name exactly to delete it".into(),
            ));
        }
        let root = &store.project_root;
        let app = tokio::fs::canonicalize(&self.directory).await?;
        if app.starts_with(root)
            || records
                .iter()
                .any(|p| p.id != project && FsPath::new(&p.directory).starts_with(root))
        {
            return Err(Error::Invalid("This project directory contains application data or another project and cannot be deleted".into()));
        }
        let active:i64=sqlx::query_scalar("SELECT (SELECT count(*) FROM runs WHERE status='running')+(SELECT count(*) FROM conversation_turns WHERE status IN ('running','stopping'))").fetch_one(&store.db).await?;
        if active > 0 {
            return Err(Error::Invalid(
                "Stop all active project executions before deleting the project".into(),
            ));
        }
        let local: i64 = sqlx::query_scalar(
            "SELECT count(*) FROM service_deployments WHERE json_extract(definition,'$.enabled')=1",
        )
        .fetch_one(&store.db)
        .await?;
        let remote:i64=sqlx::query_scalar("SELECT count(*) FROM publication_deployments d JOIN publications p ON p.id=d.publication_id WHERE p.project_id=? AND json_extract(d.definition,'$.enabled')=1").bind(project).fetch_one(&self.deployment_settings.db).await?;
        if local + remote > 0 {
            return Err(Error::Invalid(
                "Disable this project's deployments before deleting it".into(),
            ));
        }
        let parent = root
            .parent()
            .ok_or_else(|| Error::Invalid("Cannot delete a filesystem root".into()))?;
        let record = Deletion {
            project: current.clone(),
            staged: parent.join(format!(".flowgram-delete-{project}-{}", id())),
        };
        let journal = self.directory.join("project-deletions");
        tokio::fs::create_dir_all(&journal).await?;
        let journal = journal.join(format!("{project}.json"));
        atomic_json(&journal, &record).await?;
        store.closed.cancel();
        store.db.close().await;
        // Windows must release the locked project.lock handle before moving the directory.
        // The stores mutex stays held, so no new owner can open it during this transition.
        stores.remove(project);
        let mut next = records.clone();
        next.retain(|p| p.id != project);
        let result = async {
            crate::project::rename_directory(root, &record.staged).await?;
            atomic_json(&self.directory.join("projects.json"), &next).await
        }
        .await;
        if let Err(error) = result {
            if record.staged.exists() {
                crate::project::rename_directory(&record.staged, root).await?;
            }
            stores.insert(project.into(), self.open_store(&current).await?);
            tokio::fs::remove_file(&journal).await?;
            return Err(error);
        }
        *records = next;
        let _ = store.events.send(crate::model::Event {
            sequence: i64::MAX,
            kind: "project_deleted".into(),
            object_id: project.into(),
            data: json!({"projectId":project}).to_string(),
            created_at: crate::store::now(),
        });
        cleanup_catalog(&self.deployment_settings, project).await?;
        crate::project::remove_directory(&record.staged).await?;
        tokio::fs::remove_file(journal).await?;
        Ok(())
    }
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
struct Rename {
    name: String,
    expected_name: String,
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
struct Delete {
    confirmation_name: String,
}
pub(crate) fn routes() -> Router<RegistryState> {
    Router::new().route(
        "/api/projects/{id}",
        get(details).put(rename).delete(delete),
    )
}
async fn details(State(s): State<RegistryState>, Path(id): Path<String>) -> Result<Json<Value>> {
    Ok(Json(s.registry.project_details(&id).await?))
}
async fn rename(
    State(s): State<RegistryState>,
    Path(id): Path<String>,
    Json(input): Json<Rename>,
) -> Result<Json<Project>> {
    Ok(Json(
        s.registry
            .rename(&id, &input.name, &input.expected_name)
            .await?,
    ))
}
async fn delete(
    State(s): State<RegistryState>,
    Path(id): Path<String>,
    Json(input): Json<Delete>,
) -> Result<Json<Value>> {
    s.registry
        .delete_project(&id, &input.confirmation_name)
        .await?;
    Ok(Json(json!({"deleted":true,"projectId":id})))
}
