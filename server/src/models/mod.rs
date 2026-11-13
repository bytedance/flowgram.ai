//! Shared model catalog, provider adapters, and immutable execution bindings.
mod api;
pub(crate) mod execution;
pub(crate) mod transport;
mod types;
pub(crate) use api::routes;
pub use execution::{Requirement, Trace, requirements};
pub(crate) use transport::request;
pub use types::*;

use crate::{
    deployment_settings::Catalog,
    error::{Error, Result},
    model::ModelConfig,
    store::{id, nonempty, now},
};
use serde_json::{Value, json};
use sqlx::{Row, SqlitePool};
use std::path::Path;

pub async fn initialize(db: &SqlitePool) -> Result<()> {
    for sql in [
        "CREATE TABLE IF NOT EXISTS model_connections(id TEXT PRIMARY KEY,definition TEXT NOT NULL)",
        "CREATE TABLE IF NOT EXISTS model_entries(id TEXT PRIMARY KEY,connection_id TEXT NOT NULL,definition TEXT NOT NULL)",
        "CREATE TABLE IF NOT EXISTS model_defaults(id INTEGER PRIMARY KEY CHECK(id=1),definition TEXT NOT NULL)",
        "CREATE TABLE IF NOT EXISTS model_verifications(model_id TEXT PRIMARY KEY,definition TEXT NOT NULL)",
        "CREATE TABLE IF NOT EXISTS model_catalog_state(id INTEGER PRIMARY KEY CHECK(id=1))",
    ] {
        sqlx::query(sql).execute(db).await?;
    }
    sqlx::query("INSERT INTO model_defaults VALUES(1,?) ON CONFLICT DO NOTHING")
        .bind(serde_json::to_string(&Defaults::default())?)
        .execute(db)
        .await?;
    Ok(())
}
pub(crate) struct ModelSet {
    defaults: Defaults,
    entries: Vec<Entry>,
    connections: Vec<Connection>,
}
impl Catalog {
    pub async fn model_connections(&self) -> Result<Vec<Connection>> {
        let rows:Vec<String>=sqlx::query_scalar("SELECT definition FROM model_connections ORDER BY json_extract(definition,'$.name'),id").fetch_all(&self.db).await?;
        rows.iter().map(|s| Ok(serde_json::from_str(s)?)).collect()
    }
    pub async fn model_connection(&self, id: &str) -> Result<Connection> {
        self.model_connections()
            .await?
            .into_iter()
            .find(|c| c.id == id)
            .ok_or_else(|| Error::NotFound("Model connection not found".into()))
    }
    pub async fn model_entries(&self) -> Result<Vec<Entry>> {
        let rows: Vec<String> = sqlx::query_scalar(
            "SELECT definition FROM model_entries ORDER BY json_extract(definition,'$.name'),id",
        )
        .fetch_all(&self.db)
        .await?;
        rows.iter().map(|s| Ok(serde_json::from_str(s)?)).collect()
    }
    pub async fn model_entry(&self, id: &str) -> Result<Entry> {
        self.model_entries()
            .await?
            .into_iter()
            .find(|m| m.id == id)
            .ok_or_else(|| Error::NotFound("Model not found".into()))
    }
    pub async fn model_defaults(&self) -> Result<Defaults> {
        Ok(serde_json::from_str(
            &sqlx::query_scalar::<_, String>("SELECT definition FROM model_defaults WHERE id=1")
                .fetch_one(&self.db)
                .await?,
        )?)
    }
    pub async fn models_inventory(&self) -> Result<Value> {
        let connections = self.model_connections().await?;
        let models = self.model_entries().await?;
        let mut tests = serde_json::Map::new();
        for row in sqlx::query("SELECT model_id,definition FROM model_verifications")
            .fetch_all(&self.db)
            .await?
        {
            let check: Verification = serde_json::from_str(row.get("definition"))?;
            let Some(model) = models
                .iter()
                .find(|m| m.id == row.get::<String, _>("model_id"))
            else {
                continue;
            };
            let Some(connection) = connections.iter().find(|c| c.id == model.connection_id) else {
                continue;
            };
            let credential_revision = if let Some(credential) = &connection.credential_id {
                sqlx::query_scalar::<_, String>("SELECT updated_at FROM credentials WHERE id=?")
                    .bind(credential)
                    .fetch_optional(&self.db)
                    .await?
            } else {
                None
            };
            if check.connection_revision == connection.revision
                && check.model_revision == model.revision
                && check.credential_revision == credential_revision
            {
                tests.insert(model.id.clone(), serde_json::to_value(check)?);
            }
        }
        Ok(
            json!({"connections":connections,"models":models,"defaults":self.model_defaults().await?,"credentials":self.credentials().await?,"verifications":tests}),
        )
    }
    pub async fn save_model_connection(&self, mut c: Connection) -> Result<Connection> {
        c.name = nonempty(&c.name, "Connection name")?;
        c.base_url = nonempty(&c.base_url, "Model service URL")?;
        let url = reqwest::Url::parse(&c.base_url)
            .map_err(|_| Error::Invalid("Invalid model service URL".into()))?;
        if !matches!(url.scheme(), "http" | "https")
            || url.host_str().is_none()
            || !url.username().is_empty()
            || url.password().is_some()
            || url.query().is_some()
            || url.fragment().is_some()
        {
            return Err(Error::Invalid("Model service URL must be an HTTP or HTTPS base URL without credentials, query or fragment".into()));
        }
        if c.name.len() > 200 || c.provider.len() > 100 || !(1000..=180000).contains(&c.timeout_ms)
        {
            return Err(Error::Invalid(
                "Invalid model connection name, provider or timeout".into(),
            ));
        }
        c.base_url = c.base_url.trim_end_matches('/').into();
        if let Some(credential) = &c.credential_id {
            self.secret(credential, None, "connection").await?;
        }
        let new = c.id.is_empty();
        if new {
            c.id = id();
        }
        let expected = c.revision;
        c.revision += 1;
        c.updated_at = now();
        let result = if new {
            sqlx::query("INSERT INTO model_connections VALUES(?,?)")
                .bind(&c.id)
                .bind(serde_json::to_string(&c)?)
                .execute(&self.db)
                .await?
        } else {
            sqlx::query("UPDATE model_connections SET definition=? WHERE id=? AND json_extract(definition,'$.revision')=?").bind(serde_json::to_string(&c)?).bind(&c.id).bind(expected).execute(&self.db).await?
        };
        if result.rows_affected() != 1 {
            return Err(Error::Conflict);
        }
        Ok(c)
    }
    pub async fn save_model_entry(&self, mut m: Entry) -> Result<Entry> {
        let c = self.model_connection(&m.connection_id).await?;
        m.name = nonempty(&m.name, "Model name")?;
        m.model_id = nonempty(&m.model_id, "Model ID")?;
        if m.name.len() > 200
            || m.model_id.len() > 300
            || m.context_window
                .is_some_and(|v| !(256..=10000000).contains(&v))
            || m.capabilities.reasoning_efforts.len() > 10
            || m.capabilities.reasoning_efforts.iter().any(|v| {
                !matches!(
                    v.as_str(),
                    "none" | "minimal" | "low" | "medium" | "high" | "xhigh"
                )
            })
        {
            return Err(Error::Invalid("Invalid model metadata".into()));
        }
        m.parameters.validate(&m.capabilities, c.protocol)?;
        let new = m.id.is_empty();
        if new {
            m.id = id();
        }
        if self.model_entries().await?.iter().any(|other| {
            other.id != m.id
                && other.connection_id == m.connection_id
                && other.model_id == m.model_id
        }) {
            return Err(Error::Invalid(
                "This model ID is already registered for the connection".into(),
            ));
        }
        let expected = m.revision;
        m.revision += 1;
        m.updated_at = now();
        let result = if new {
            sqlx::query("INSERT INTO model_entries VALUES(?,?,?)")
                .bind(&m.id)
                .bind(&m.connection_id)
                .bind(serde_json::to_string(&m)?)
                .execute(&self.db)
                .await?
        } else {
            sqlx::query("UPDATE model_entries SET connection_id=?,definition=? WHERE id=? AND json_extract(definition,'$.revision')=?").bind(&m.connection_id).bind(serde_json::to_string(&m)?).bind(&m.id).bind(expected).execute(&self.db).await?
        };
        if result.rows_affected() != 1 {
            return Err(Error::Conflict);
        }
        Ok(m)
    }
    pub async fn save_model_defaults(&self, mut defaults: Defaults) -> Result<Defaults> {
        let current = self.model_defaults().await?;
        for (model, old, tools) in [
            (&defaults.chat, &current.chat, true),
            (&defaults.workflow, &current.workflow, false),
        ] {
            if let Some(model) = model
                && Some(model) != old.as_ref()
            {
                self.resolve_model(
                    &Selection {
                        model_id: Some(model.clone()),
                        parameters: Parameters::default(),
                    },
                    "",
                    tools,
                    tools,
                )
                .await?;
            }
        }
        let expected = defaults.revision;
        defaults.revision += 1;
        if sqlx::query("UPDATE model_defaults SET definition=? WHERE id=1 AND json_extract(definition,'$.revision')=?").bind(serde_json::to_string(&defaults)?).bind(expected).execute(&self.db).await?.rows_affected()!=1 {return Err(Error::Conflict);}
        Ok(defaults)
    }
    pub async fn resolve_model(
        &self,
        selection: &Selection,
        project: &str,
        tools: bool,
        chat: bool,
    ) -> Result<Resolved> {
        let set = self.model_set().await?;
        self.resolve_in_set(&set, selection, project, tools, chat)
            .await
    }
    pub(crate) async fn model_set(&self) -> Result<ModelSet> {
        let mut tx = self.db.begin().await?;
        let defaults: String =
            sqlx::query_scalar("SELECT definition FROM model_defaults WHERE id=1")
                .fetch_one(&mut *tx)
                .await?;
        let models: Vec<String> = sqlx::query_scalar("SELECT definition FROM model_entries")
            .fetch_all(&mut *tx)
            .await?;
        let connections: Vec<String> =
            sqlx::query_scalar("SELECT definition FROM model_connections")
                .fetch_all(&mut *tx)
                .await?;
        tx.commit().await?;
        Ok(ModelSet {
            defaults: serde_json::from_str(&defaults)?,
            entries: models
                .iter()
                .map(|v| serde_json::from_str(v))
                .collect::<std::result::Result<_, _>>()?,
            connections: connections
                .iter()
                .map(|v| serde_json::from_str(v))
                .collect::<std::result::Result<_, _>>()?,
        })
    }
    pub(crate) async fn resolve_in_set(
        &self,
        set: &ModelSet,
        selection: &Selection,
        project: &str,
        tools: bool,
        chat: bool,
    ) -> Result<Resolved> {
        let target = selection
            .model_id
            .as_ref()
            .or(if chat {
                set.defaults.chat.as_ref()
            } else {
                set.defaults.workflow.as_ref()
            })
            .ok_or_else(|| {
                Error::Invalid("Select a model in Settings before running this action".into())
            })?;
        let m = set
            .entries
            .iter()
            .find(|m| &m.id == target)
            .cloned()
            .ok_or_else(|| Error::NotFound("Model not found".into()))?;
        let c = set
            .connections
            .iter()
            .find(|c| c.id == m.connection_id)
            .cloned()
            .ok_or_else(|| Error::NotFound("Model connection not found".into()))?;
        if !m.enabled || !c.enabled {
            return Err(Error::Invalid(
                "The selected model or connection is disabled".into(),
            ));
        }
        if tools && m.capabilities.tools != Some(true) {
            return Err(Error::Invalid(
                "This action requires confirmed tool calling support".into(),
            ));
        }
        if chat && m.capabilities.streaming != Some(true) {
            return Err(Error::Invalid(
                "The assistant requires streaming support".into(),
            ));
        }
        if let Some(credential) = &c.credential_id {
            self.secret(
                credential,
                if project.is_empty() {
                    None
                } else {
                    Some(project)
                },
                "connection",
            )
            .await?;
        }
        let parameters = m.parameters.merged(&selection.parameters);
        parameters.validate(&m.capabilities, c.protocol)?;
        Ok(Resolved {
            model_id: m.id,
            model_name: m.name,
            upstream_model: m.model_id,
            model_revision: m.revision,
            connection_id: c.id,
            connection_name: c.name,
            connection_revision: c.revision,
            protocol: c.protocol,
            base_url: c.base_url,
            credential_id: c.credential_id,
            timeout_ms: c.timeout_ms,
            context_window: m.context_window,
            capabilities: m.capabilities,
            parameters,
            project_id: project.into(),
        })
    }
    /// Preserve the existing device connection once; subsequent configuration uses the catalog only.
    pub async fn import_device_model(&self, directory: &Path) -> Result<()> {
        let done: i64 = sqlx::query_scalar("SELECT count(*) FROM model_catalog_state")
            .fetch_one(&self.db)
            .await?;
        if done > 0 {
            return Ok(());
        }
        let legacy = match tokio::fs::read(directory.join("model.json")).await {
            Ok(bytes) => Some(serde_json::from_slice::<ModelConfig>(&bytes)?),
            Err(e) if e.kind() == std::io::ErrorKind::NotFound => None,
            Err(e) => return Err(e.into()),
        };
        if let Some(config) = legacy
            && !config.base_url.is_empty()
            && !config.model.is_empty()
        {
            self.configure_model(config).await?;
        }
        sqlx::query("INSERT INTO model_catalog_state VALUES(1) ON CONFLICT DO NOTHING")
            .execute(&self.db)
            .await?;
        Ok(())
    }
    pub async fn configure_model(&self, config: ModelConfig) -> Result<()> {
        let previous = self.model_defaults().await?;
        let old = if let Some(id) = &previous.chat {
            self.model_entry(id).await.ok()
        } else {
            None
        };
        let connection = if let Some(m) = &old {
            Some(self.model_connection(&m.connection_id).await?)
        } else {
            None
        };
        let credential_id = if config.api_key.is_empty() {
            None
        } else {
            let credential = connection
                .as_ref()
                .and_then(|c| c.credential_id.clone())
                .unwrap_or_else(id);
            self.save_credential(
                &credential,
                crate::deployment_settings::CredentialInput {
                    name: "Model service credential".into(),
                    purpose: "connection".into(),
                    project_ids: None,
                    value: Some(config.api_key),
                },
            )
            .await?;
            Some(credential)
        };
        let c = self
            .save_model_connection(Connection {
                id: connection
                    .as_ref()
                    .map(|c| c.id.clone())
                    .unwrap_or_default(),
                name: "Model service".into(),
                provider: "custom".into(),
                protocol: Protocol::Responses,
                base_url: config.base_url,
                credential_id,
                enabled: true,
                timeout_ms: 180000,
                revision: connection.map(|c| c.revision).unwrap_or(0),
                updated_at: String::new(),
            })
            .await?;
        let m = self
            .save_model_entry(Entry {
                id: old.as_ref().map(|m| m.id.clone()).unwrap_or_default(),
                connection_id: c.id,
                name: config
                    .model
                    .split(" -> ")
                    .last()
                    .unwrap_or(&config.model)
                    .into(),
                model_id: config.model,
                enabled: true,
                capabilities: Capabilities {
                    streaming: Some(true),
                    tools: Some(true),
                    ..Default::default()
                },
                context_window: None,
                parameters: Parameters::default(),
                revision: old.map(|m| m.revision).unwrap_or(0),
                updated_at: String::new(),
            })
            .await?;
        self.save_model_defaults(Defaults {
            chat: Some(m.id.clone()),
            workflow: Some(m.id),
            revision: previous.revision,
        })
        .await?;
        Ok(())
    }
}

impl Catalog {
    pub async fn model_summary(&self) -> Result<Value> {
        let defaults = self.model_defaults().await?;
        if let Some(id) = defaults.chat {
            let model = self.model_entry(&id).await?;
            let connection = self.model_connection(&model.connection_id).await?;
            return Ok(
                json!({"baseUrl":connection.base_url,"displayName":model.name,"configured":connection.enabled&&model.enabled,"hasApiKey":connection.credential_id.is_some(),"modelId":model.id}),
            );
        }
        Ok(json!({"baseUrl":"","displayName":"","configured":false,"hasApiKey":false}))
    }
}
impl crate::store::Store {
    #[allow(clippy::too_many_arguments)]
    pub(crate) async fn request_workflow_model(
        &self,
        run: &str,
        node: &str,
        model: &Resolved,
        query: transport::Query<'_>,
        context: &crate::control_runtime::ExecutionContext,
        cancel: &tokio_util::sync::CancellationToken,
    ) -> Result<Value> {
        let request_body = transport::body(model, &query);
        let call = self
            .begin_trace_call(
                run,
                node,
                "model",
                &model.model_name,
                request_body,
                json!({"model":Trace::from(model)}),
                context,
            )
            .await?;
        let query = transport::Query {
            trace: Some(transport::CallTrace {
                run,
                node,
                id: &call,
                context,
            }),
            ..query
        };
        let result = request(&self.deployment_settings, model, query, cancel, Some(self))
            .await
            .map(|response| response.value);
        self.finish_trace_call(run, node, "model", &call, &result, context)
            .await?;
        result
    }
    pub(crate) async fn request_model_stream_for_node(
        &self,
        input: Value,
        cancel: &tokio_util::sync::CancellationToken,
        run: &str,
        node: &str,
        context: &crate::control_runtime::ExecutionContext,
    ) -> Result<Value> {
        let workflow = context
            .workflow_id
            .as_deref()
            .ok_or_else(|| crate::error::Error::Invalid("Missing model workflow scope".into()))?;
        let model = self.run_model(run, workflow, node).await?;
        self.request_workflow_model(
            run,
            node,
            &model,
            transport::Query {
                input,
                tools: None,
                instructions: None,
                turn: None,
                force_tool: false,
                trace: None,
            },
            context,
            cancel,
        )
        .await
    }
}
