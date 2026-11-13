//! Project-owned archive lifecycle shared by the workspace and settings.
use crate::{
    api::ApiState,
    error::{Error, Result},
    project::read_project,
    registry::RegistryState,
    store::{Store, now},
};
use axum::{
    Json, Router,
    extract::{Path, State},
    routing::{get, post},
};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use sqlx::Row;

#[derive(Clone, Debug, Serialize, Deserialize, sqlx::FromRow)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct ArchivedObject {
    pub kind: String,
    pub id: String,
    pub archived_at: String,
}
fn kind(value: &str) -> Result<()> {
    if !matches!(value, "session" | "workflow") {
        return Err(Error::Invalid("Unsupported archive object type".into()));
    }
    Ok(())
}
pub async fn initialize(db: &sqlx::SqlitePool) -> Result<()> {
    sqlx::query("CREATE TABLE IF NOT EXISTS archived_objects (kind TEXT NOT NULL CHECK(kind IN ('session','workflow')), id TEXT NOT NULL, archived_at TEXT NOT NULL, PRIMARY KEY(kind,id))").execute(db).await?;
    Ok(())
}
impl Store {
    pub async fn is_archived(&self, kind: &str, id: &str) -> Result<bool> {
        Ok(sqlx::query_scalar::<_, i64>(
            "SELECT count(*) FROM archived_objects WHERE kind=? AND id=?",
        )
        .bind(kind)
        .bind(id)
        .fetch_one(&self.db)
        .await?
            > 0)
    }
    pub async fn require_unarchived(&self, kind: &str, id: &str) -> Result<()> {
        self.ensure_open()?;
        if self.is_archived(kind, id).await? {
            return Err(Error::Invalid(
                "Restore this archived item in Settings before editing or running it".into(),
            ));
        }
        Ok(())
    }
    pub async fn archive_records(&self) -> Result<Vec<ArchivedObject>> {
        Ok(sqlx::query_as(
            "SELECT kind,id,archived_at FROM archived_objects ORDER BY archived_at DESC",
        )
        .fetch_all(&self.db)
        .await?)
    }
    pub async fn archived_items(&self) -> Result<Vec<Value>> {
        let project = read_project(&self.project_root).await?;
        let rows = sqlx::query("SELECT a.*,CASE a.kind WHEN 'session' THEN s.title ELSE w.name END AS name FROM archived_objects a LEFT JOIN sessions s ON a.kind='session' AND s.id=a.id LEFT JOIN workflows w ON a.kind='workflow' AND w.id=a.id ORDER BY a.archived_at DESC").fetch_all(&self.db).await?;
        Ok(rows.iter().map(|row| json!({"kind":row.get::<String,_>("kind"),"id":row.get::<String,_>("id"),"archivedAt":row.get::<String,_>("archived_at"),"name":row.get::<Option<String>,_>("name").unwrap_or_default(),"projectId":project.id,"projectName":project.name})).collect())
    }
    async fn ensure_idle(&self, kind: &str, id: &str) -> Result<()> {
        let count: i64 = if kind == "session" {
            sqlx::query_scalar("SELECT (SELECT count(*) FROM conversation_turns WHERE session_id=? AND status IN ('running','stopping')) + (SELECT count(*) FROM runs WHERE session_id=? AND status='running')")
                .bind(id).bind(id).fetch_one(&self.db).await?
        } else {
            sqlx::query_scalar("SELECT count(*) FROM runs r WHERE r.status='running' AND (r.workflow_id=? OR EXISTS(SELECT 1 FROM run_workflows w WHERE w.run_id=r.id AND w.workflow_id=?))")
                .bind(id).bind(id).fetch_one(&self.db).await?
        };
        if count > 0 {
            return Err(Error::Invalid("Wait for active execution to finish or stop it before archiving or deleting this item".into()));
        }
        Ok(())
    }
    async fn require_object(&self, kind: &str, id: &str) -> Result<()> {
        crate::archive::kind(kind)?;
        if kind == "session" {
            self.session(id).await?;
        } else {
            self.workflow(id).await?;
        }
        Ok(())
    }
    pub async fn set_archived(&self, kind: &str, id: &str, archived: bool) -> Result<()> {
        let _workflow = self.workflow_lock.lock().await;
        let _conversation = self.conversation_lock.lock().await;
        let _service = self.service_lock.lock().await;
        self.require_object(kind, id).await?;
        if archived {
            self.ensure_idle(kind, id).await?;
        }
        let mut tx = self.db.begin().await?;
        if archived {
            sqlx::query(
                "INSERT INTO archived_objects VALUES(?,?,?) ON CONFLICT(kind,id) DO NOTHING",
            )
            .bind(kind)
            .bind(id)
            .bind(now())
            .execute(&mut *tx)
            .await?;
            if kind == "session" {
                sqlx::query("INSERT INTO conversation_controls VALUES(?,1) ON CONFLICT(session_id) DO UPDATE SET paused=1").bind(id).execute(&mut *tx).await?;
            }
        } else {
            sqlx::query("DELETE FROM archived_objects WHERE kind=? AND id=?")
                .bind(kind)
                .bind(id)
                .execute(&mut *tx)
                .await?;
        }
        tx.commit().await?;
        self.emit(
            if archived {
                "object_archived"
            } else {
                "object_restored"
            },
            id,
            json!({"kind":kind,"id":id}),
        )
        .await?;
        Ok(())
    }
    pub async fn delete_archived(&self, kind: &str, id: &str) -> Result<()> {
        let _workflow = self.workflow_lock.lock().await;
        let _conversation = self.conversation_lock.lock().await;
        let _service = self.service_lock.lock().await;
        self.require_object(kind, id).await?;
        if !self.is_archived(kind, id).await? {
            return Err(Error::Invalid(
                "Only archived items can be permanently deleted".into(),
            ));
        }
        self.ensure_idle(kind, id).await?;
        if kind == "workflow" {
            self.ensure_unreferenced(id).await?;
        }
        let mut tx = self.db.begin().await?;
        if kind == "session" {
            sqlx::query("DELETE FROM events WHERE object_id=? OR object_id IN (SELECT id FROM conversation_turns WHERE session_id=?) OR object_id IN (SELECT id FROM conversation_inputs WHERE session_id=?) OR object_id IN (SELECT i.id FROM conversation_items i JOIN conversation_turns t ON t.id=i.turn_id WHERE t.session_id=?)").bind(id).bind(id).bind(id).bind(id).execute(&mut *tx).await?;
            sqlx::query("DELETE FROM conversation_runs WHERE turn_id IN (SELECT id FROM conversation_turns WHERE session_id=?)").bind(id).execute(&mut *tx).await?;
            sqlx::query("DELETE FROM conversation_items WHERE turn_id IN (SELECT id FROM conversation_turns WHERE session_id=?)").bind(id).execute(&mut *tx).await?;
            for table in [
                "conversation_inputs",
                "conversation_turns",
                "conversation_controls",
            ] {
                sqlx::query(&format!("DELETE FROM {table} WHERE session_id=?"))
                    .bind(id)
                    .execute(&mut *tx)
                    .await?;
            }
            sqlx::query("UPDATE runs SET session_id=NULL WHERE session_id=?")
                .bind(id)
                .execute(&mut *tx)
                .await?;
            sqlx::query("DELETE FROM sessions WHERE id=?")
                .bind(id)
                .execute(&mut *tx)
                .await?;
        } else {
            for table in [
                "conversation_runs",
                "node_tests",
                "run_definitions",
                "run_workflows",
                "service_run_connections",
                "service_deliveries",
                "service_runs",
            ] {
                sqlx::query(&format!(
                    "DELETE FROM {table} WHERE run_id IN (SELECT id FROM runs WHERE workflow_id=?)"
                ))
                .bind(id)
                .execute(&mut *tx)
                .await?;
            }
            sqlx::query("DELETE FROM events WHERE object_id=? OR object_id IN (SELECT id FROM runs WHERE workflow_id=?)").bind(id).bind(id).execute(&mut *tx).await?;
            sqlx::query("DELETE FROM runs WHERE workflow_id=?")
                .bind(id)
                .execute(&mut *tx)
                .await?;
            sqlx::query("DELETE FROM workflows WHERE id=?")
                .bind(id)
                .execute(&mut *tx)
                .await?;
        }
        sqlx::query("DELETE FROM archived_objects WHERE kind=? AND id=?")
            .bind(kind)
            .bind(id)
            .execute(&mut *tx)
            .await?;
        // Rename before commit; startup restores an interrupted transaction's files.
        let moved = if kind == "workflow" {
            let source = self.project_root.join("workflows").join(id);
            let target = self
                .project_root
                .join(".flowgram")
                .join(format!("delete-{id}"));
            crate::project::rename_directory(&source, &target).await?;
            Some((source, target))
        } else {
            None
        };
        if let Err(error) = tx.commit().await {
            if let Some((source, target)) = &moved {
                crate::project::rename_directory(target, source).await?;
            }
            return Err(error.into());
        }
        if let Some((_, target)) = moved {
            crate::project::remove_directory(&target).await?;
        }
        self.emit("object_deleted", id, json!({"kind":kind,"id":id}))
            .await?;
        Ok(())
    }
    async fn ensure_unreferenced(&self, id: &str) -> Result<()> {
        for workflow in self.sync_workflow_index().await? {
            if workflow.id != id && references(&workflow.schema, id) {
                return Err(Error::Invalid(format!(
                    "Workflow is referenced by \"{}\". Remove that reference before permanently deleting it",
                    workflow.name
                )));
            }
        }
        let releases: Vec<String> = sqlx::query_scalar("SELECT bundle FROM service_releases")
            .fetch_all(&self.db)
            .await?;
        for release in releases {
            let release: crate::services::Bundle = serde_json::from_str(&release)?;
            if release.workflows.iter().any(|w| w.id == id) {
                return Err(Error::Invalid(
                    "Workflow belongs to a published release and cannot be permanently deleted"
                        .into(),
                ));
            }
        }
        let project = read_project(&self.project_root).await?;
        let drafts: Vec<String> =
            sqlx::query_scalar("SELECT draft FROM publications WHERE project_id=?")
                .bind(project.id)
                .fetch_all(&self.deployment_settings.db)
                .await?;
        for draft in drafts {
            if references(&serde_json::from_str(&draft)?, id) {
                return Err(Error::Invalid("Remove this workflow from its publication draft before permanently deleting it".into()));
            }
        }
        Ok(())
    }
    pub(crate) async fn recover_deleted_workflows(&self) -> Result<()> {
        let mut entries = tokio::fs::read_dir(self.project_root.join(".flowgram")).await?;
        while let Some(entry) = entries.next_entry().await? {
            let name = entry.file_name().to_string_lossy().into_owned();
            let Some(id) = name.strip_prefix("delete-") else {
                continue;
            };
            if uuid::Uuid::parse_str(id).is_err() || !entry.file_type().await?.is_dir() {
                continue;
            }
            let exists: i64 = sqlx::query_scalar("SELECT count(*) FROM workflows WHERE id=?")
                .bind(id)
                .fetch_one(&self.db)
                .await?;
            if exists > 0 {
                crate::project::rename_directory(
                    &entry.path(),
                    &self.project_root.join("workflows").join(id),
                )
                .await?;
            } else {
                crate::project::remove_directory(&entry.path()).await?;
            }
        }
        Ok(())
    }
}
fn references(value: &Value, id: &str) -> bool {
    match value {
        Value::Object(object) => object.iter().any(|(key, value)| {
            (key == "workflowId"
                && (value.as_str() == Some(id) || value["content"].as_str() == Some(id)))
                || references(value, id)
        }),
        Value::Array(values) => values.iter().any(|value| references(value, id)),
        _ => false,
    }
}
pub(crate) fn project_routes() -> Router<ApiState> {
    Router::new()
        .route("/api/sessions/{id}/archive", post(archive_session))
        .route("/api/workflows/{id}/archive", post(archive_workflow))
        .route("/api/archives/{kind}/{id}/restore", post(restore))
        .route("/api/archives/{kind}/{id}", axum::routing::delete(delete))
}
async fn archive_session(State(s): State<ApiState>, Path(id): Path<String>) -> Result<Json<Value>> {
    s.store.set_archived("session", &id, true).await?;
    Ok(Json(json!({"archived":true})))
}
async fn archive_workflow(
    State(s): State<ApiState>,
    Path(id): Path<String>,
) -> Result<Json<Value>> {
    s.store.set_archived("workflow", &id, true).await?;
    Ok(Json(json!({"archived":true})))
}
async fn restore(
    State(s): State<ApiState>,
    Path((kind, id)): Path<(String, String)>,
) -> Result<Json<Value>> {
    s.store.set_archived(&kind, &id, false).await?;
    Ok(Json(json!({"restored":true})))
}
async fn delete(
    State(s): State<ApiState>,
    Path((kind, id)): Path<(String, String)>,
) -> Result<Json<Value>> {
    s.store.delete_archived(&kind, &id).await?;
    Ok(Json(json!({"deleted":true})))
}
pub(crate) fn global_routes() -> Router<RegistryState> {
    Router::new().route("/api/archives", get(list))
}
async fn list(State(s): State<RegistryState>) -> Result<Json<Value>> {
    let mut items = vec![];
    let mut unavailable = vec![];
    let projects = s.registry.projects().await;
    for project in &projects {
        match s.registry.resolve(&project.id).await {
            Ok(store)=>items.extend(store.archived_items().await?),
            Err(error)=>unavailable.push(json!({"projectId":project.id,"projectName":project.name,"error":error.to_string()})),
        }
    }
    items.sort_by(|a, b| b["archivedAt"].as_str().cmp(&a["archivedAt"].as_str()));
    Ok(Json(
        json!({"items":items,"unavailableProjects":unavailable,"projects":projects}),
    ))
}
