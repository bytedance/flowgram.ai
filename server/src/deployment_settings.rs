//! Device-owned deployment catalog. Secret values never appear in public DTOs or project bundles.
use crate::{
    error::{Error, Result},
    store::{id, now},
};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use sqlx::{Row, SqlitePool, sqlite::SqlitePoolOptions};
use std::path::Path;

#[derive(Clone)]
pub struct Catalog {
    pub db: SqlitePool,
}

#[derive(Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct CredentialInput {
    pub name: String,
    pub purpose: String,
    /// None means all projects; an empty list grants no project access.
    pub project_ids: Option<Vec<String>>,
    #[serde(default)]
    pub value: Option<String>,
}
#[derive(Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Target {
    #[serde(default)]
    pub id: String,
    pub name: String,
    pub url: String,
    pub credential_id: String,
}
impl Catalog {
    pub async fn open(directory: &Path) -> Result<Self> {
        tokio::fs::create_dir_all(directory).await?;
        let path = directory.join("deployment.sqlite");
        let mut file = std::fs::OpenOptions::new();
        file.write(true).create_new(true);
        #[cfg(unix)]
        {
            use std::os::unix::fs::OpenOptionsExt;
            file.mode(0o600);
        }
        match file.open(&path) {
            Ok(_) => {}
            Err(e) if e.kind() == std::io::ErrorKind::AlreadyExists => {}
            Err(e) => return Err(e.into()),
        }
        let db = SqlitePoolOptions::new()
            .max_connections(4)
            .connect_with(
                sqlx::sqlite::SqliteConnectOptions::new()
                    .filename(path)
                    .create_if_missing(true)
                    .journal_mode(sqlx::sqlite::SqliteJournalMode::Wal)
                    .busy_timeout(std::time::Duration::from_secs(10)),
            )
            .await?;
        for statement in [
            "CREATE TABLE IF NOT EXISTS credentials (id TEXT PRIMARY KEY, name TEXT NOT NULL, purpose TEXT NOT NULL, project_ids TEXT, value TEXT NOT NULL, updated_at TEXT NOT NULL)",
            "CREATE TABLE IF NOT EXISTS credential_sync (credential_id TEXT NOT NULL, project_id TEXT NOT NULL, target_id TEXT NOT NULL, generation TEXT NOT NULL, last_error TEXT, next_at INTEGER NOT NULL DEFAULT 0, PRIMARY KEY(credential_id,project_id,target_id))",
            "CREATE TABLE IF NOT EXISTS targets (id TEXT PRIMARY KEY, definition TEXT NOT NULL)",
            "CREATE TABLE IF NOT EXISTS publications (id TEXT PRIMARY KEY, project_id TEXT NOT NULL UNIQUE, title TEXT NOT NULL, draft TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)",
            "CREATE TABLE IF NOT EXISTS publication_versions (publication_id TEXT NOT NULL, version TEXT NOT NULL, notes TEXT NOT NULL, created_at TEXT NOT NULL, operation_count INTEGER NOT NULL, PRIMARY KEY(publication_id,version))",
            "CREATE TABLE IF NOT EXISTS publication_deployments (publication_id TEXT NOT NULL, target_id TEXT NOT NULL, environment TEXT NOT NULL, definition TEXT NOT NULL, PRIMARY KEY(publication_id,target_id,environment))",
        ] {
            sqlx::query(statement).execute(&db).await?;
        }
        crate::models::initialize(&db).await?;
        Ok(Self { db })
    }
    pub async fn credentials(&self) -> Result<Value> {
        let rows = sqlx::query("SELECT id,name,purpose,project_ids,updated_at FROM credentials ORDER BY updated_at DESC").fetch_all(&self.db).await?;
        let mut values = vec![];
        for r in rows {
            let scope: Option<String> = r.get("project_ids");
            values.push(json!({"id":r.get::<String,_>("id"),"name":r.get::<String,_>("name"),"purpose":r.get::<String,_>("purpose"),"projectIds":scope.map(|s|serde_json::from_str::<Value>(&s)).transpose()?,"updatedAt":r.get::<String,_>("updated_at"),"hasValue":true}));
        }
        Ok(json!(values))
    }
    pub async fn save_credential(&self, credential_id: &str, input: CredentialInput) -> Result<()> {
        if input.name.trim().is_empty()
            || input.name.len() > 200
            || !["connection", "management"].contains(&input.purpose.as_str())
        {
            return Err(Error::Invalid(
                "A credential requires a name and a supported purpose".into(),
            ));
        }
        let purpose: Option<String> =
            sqlx::query_scalar("SELECT purpose FROM credentials WHERE id=?")
                .bind(credential_id)
                .fetch_optional(&self.db)
                .await?;
        if purpose.is_some_and(|p| p != input.purpose) {
            return Err(Error::Invalid(
                "Credential purpose cannot be changed; create another credential".into(),
            ));
        }
        let old: Option<String> = sqlx::query_scalar("SELECT value FROM credentials WHERE id=?")
            .bind(credential_id)
            .fetch_optional(&self.db)
            .await?;
        let value = input
            .value
            .filter(|v| !v.is_empty())
            .or(old)
            .ok_or_else(|| Error::Invalid("A secret value is required".into()))?;
        if value.len() < 8 || value.len() > 65536 || value.contains(['\r', '\n']) {
            return Err(Error::Invalid(
                "Secret values must contain 8-65536 bytes without line breaks".into(),
            ));
        }
        sqlx::query("INSERT INTO credentials VALUES(?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET name=excluded.name,purpose=excluded.purpose,project_ids=excluded.project_ids,value=excluded.value,updated_at=excluded.updated_at")
            .bind(credential_id).bind(input.name.trim()).bind(input.purpose).bind(input.project_ids.map(|v|serde_json::to_string(&v)).transpose()?).bind(value).bind(now()).execute(&self.db).await?;
        Ok(())
    }
    pub async fn secret(
        &self,
        credential_id: &str,
        project: Option<&str>,
        purpose: &str,
    ) -> Result<String> {
        let row = sqlx::query("SELECT purpose,project_ids,value FROM credentials WHERE id=?")
            .bind(credential_id)
            .fetch_optional(&self.db)
            .await?
            .ok_or_else(|| Error::NotFound("Credential not found".into()))?;
        if row.get::<String, _>("purpose") != purpose {
            return Err(Error::Invalid(
                "Credential purpose does not match this use".into(),
            ));
        }
        if let (Some(project), Some(scope)) = (project, row.get::<Option<String>, _>("project_ids"))
        {
            let ids: Vec<String> = serde_json::from_str(&scope)?;
            if !ids.iter().any(|p| p == project) {
                return Err(crate::services::failure(
                    403,
                    "credential_scope",
                    "Credential is not available to this project",
                ));
            }
        }
        Ok(row.get("value"))
    }
    pub async fn targets(&self) -> Result<Vec<Target>> {
        let rows: Vec<String> = sqlx::query_scalar("SELECT definition FROM targets ORDER BY id")
            .fetch_all(&self.db)
            .await?;
        rows.iter().map(|s| Ok(serde_json::from_str(s)?)).collect()
    }
    pub async fn target(&self, target_id: &str) -> Result<Target> {
        self.targets()
            .await?
            .into_iter()
            .find(|t| t.id == target_id)
            .ok_or_else(|| Error::NotFound("Runtime service not found".into()))
    }
    pub async fn save_target(&self, mut target: Target) -> Result<Target> {
        if target.name.trim().is_empty() || target.name.len() > 200 {
            return Err(Error::Invalid("Runtime service name is required".into()));
        }
        let url = reqwest::Url::parse(&target.url)
            .map_err(|_| Error::Invalid("Invalid runtime service URL".into()))?;
        let local = url
            .host_str()
            .is_some_and(|h| ["localhost", "127.0.0.1", "[::1]"].contains(&h));
        if !(url.scheme() == "https" || url.scheme() == "http" && local)
            || !url.username().is_empty()
            || url.password().is_some()
            || url.query().is_some()
            || url.fragment().is_some()
            || url.path() != "/"
        {
            return Err(Error::Invalid("Runtime services require an HTTPS origin (HTTP is allowed for loopback testing only)".into()));
        }
        self.secret(&target.credential_id, None, "management")
            .await?;
        target.url = url.origin().ascii_serialization();
        if target.id.is_empty() {
            target.id = id();
        }
        if target.id == "local" {
            return Err(Error::Invalid(
                "The built-in runtime service cannot be replaced".into(),
            ));
        }
        sqlx::query("INSERT INTO targets VALUES(?,?) ON CONFLICT(id) DO UPDATE SET definition=excluded.definition").bind(&target.id).bind(serde_json::to_string(&target)?).execute(&self.db).await?;
        Ok(target)
    }
}
