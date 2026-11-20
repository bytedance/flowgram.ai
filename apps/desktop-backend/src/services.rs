//! Immutable business releases and caller-scoped invocation, independent of transport/UI.
use crate::{
    error::{Error, Result},
    model::{Run, Workflow},
    runtime,
    store::{Store, id, now},
};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use sha2::{Digest, Sha256};
use sqlx::{Row, SqlitePool};
use std::collections::{BTreeMap, HashSet};

pub const FORMAT: &str = "flowgram.service/v1";
pub const RUNTIME: &str = "flowgram.rust/v1";
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Operation {
    pub name: String,
    pub description: String,
    pub workflow_id: String,
    pub input_schema: Value,
    pub output_schema: Value,
    /// Root input field -> environment variable name. Values never enter a bundle.
    #[serde(default)]
    pub bindings: BTreeMap<String, String>,
    #[serde(default = "default_timeout")]
    pub timeout_ms: u64,
    #[serde(default)]
    pub read_only: bool,
}
fn default_timeout() -> u64 {
    180_000
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Publish {
    pub service: String,
    pub title: String,
    pub version: String,
    pub operations: Vec<Operation>,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Bundle {
    pub format: String,
    pub runtime: String,
    pub service: String,
    pub title: String,
    pub version: String,
    pub created_at: String,
    pub operations: Vec<Operation>,
    pub workflows: Vec<Workflow>,
    pub digest: String,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Deployment {
    pub service: String,
    pub environment: String,
    pub version: String,
    pub enabled: bool,
    pub max_concurrency: u32,
    /// Non-secret configuration only. Model credentials are supplied by the host.
    #[serde(default)]
    pub bindings: BTreeMap<String, Value>,
    #[serde(default)]
    pub model_bindings: BTreeMap<String, String>,
    #[serde(default)]
    pub callback: Option<Callback>,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Callback {
    pub url: String,
    /// Name of an environment variable in the server process, never its value.
    pub secret_env: String,
}
#[derive(Clone)]
pub struct ExecutionPolicy {
    pub timeout_ms: u64,
    pub output_schema: Value,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Consumer {
    pub id: String,
    pub name: String,
    pub operations: Vec<String>,
    pub can_cancel: bool,
    pub revoked: bool,
    pub created_at: String,
}
#[derive(Clone)]
pub struct Caller {
    pub consumer: Consumer,
    pub deployment: Deployment,
}
#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct KeyInput {
    pub name: String,
    pub operations: Vec<String>,
    #[serde(default)]
    pub can_cancel: bool,
}
#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Invocation {
    pub run_id: String,
    pub service: String,
    pub environment: String,
    pub operation: String,
    pub version: String,
    pub status: String,
    pub outputs: Value,
    pub error: Option<String>,
    pub created_at: String,
}
pub fn failure(status: u16, code: &'static str, message: impl Into<String>) -> Error {
    Error::Service {
        status,
        code,
        message: message.into(),
    }
}
pub fn hash(value: &[u8]) -> String {
    hex::encode(Sha256::digest(value))
}
pub fn identifier(value: &str) -> Result<()> {
    if value.is_empty()
        || value.len() > 64
        || !value
            .bytes()
            .all(|c| c.is_ascii_lowercase() || c.is_ascii_digit() || c == b'_' || c == b'-')
        || value.starts_with("flowgram_")
    {
        return Err(Error::Invalid("Identifiers must use 1-64 lowercase ASCII letters, digits, underscores or hyphens; flowgram_ is reserved".into()));
    }
    Ok(())
}
pub fn check_contract(schema: &Value, value: &Value) -> Result<()> {
    let issues = crate::nodes::schema_issues(value, schema, false)?;
    if !issues.is_empty() {
        return Err(failure(
            422,
            "contract_violation",
            format!(
                "Value does not match the service contract: {}",
                json!(issues)
            ),
        ));
    }
    Ok(())
}
fn check_schema(schema: &Value) -> Result<()> {
    // Service contracts are self-contained: no network schema resolution or shared mutable refs.
    fn walk(v: &Value) -> bool {
        match v {
            Value::Object(m) => m
                .iter()
                .all(|(k, v)| k != "$ref" && k != "$dynamicRef" && walk(v)),
            Value::Array(a) => a.iter().all(walk),
            _ => true,
        }
    }
    if schema["type"] != "object" || !walk(schema) {
        return Err(Error::Invalid(
            "Service contracts must be self-contained object schemas without references".into(),
        ));
    }
    jsonschema::validator_for(schema)
        .map_err(|e| Error::Invalid(format!("Invalid service JSON Schema: {e}")))?;
    Ok(())
}
fn validate_publish(p: &Publish) -> Result<()> {
    identifier(&p.service)?;
    if p.title.trim().is_empty()
        || p.title.len() > 200
        || p.operations.is_empty()
        || p.operations.len() > 64
    {
        return Err(Error::Invalid(
            "A service needs a title and 1-64 operations".into(),
        ));
    }
    if p.version.is_empty()
        || p.version.len() > 64
        || !p
            .version
            .bytes()
            .all(|c| c.is_ascii_alphanumeric() || b"._-".contains(&c))
    {
        return Err(Error::Invalid("Invalid release version".into()));
    }
    let mut names = HashSet::new();
    for op in &p.operations {
        identifier(&op.name)?;
        if !names.insert(&op.name)
            || op.description.trim().is_empty()
            || op.description.len() > 4000
            || op
                .description
                .chars()
                .any(|c| ('\u{3400}'..='\u{9fff}').contains(&c))
        {
            return Err(Error::Invalid(
                "Operation names must be unique and tool descriptions must be English".into(),
            ));
        }
        if !(10..=3_600_000).contains(&op.timeout_ms) {
            return Err(Error::Invalid(
                "Service timeout must be between 10 and 3600000 milliseconds".into(),
            ));
        }
        if op.input_schema["properties"].get("_flowgram").is_some() {
            return Err(Error::Invalid(
                "_flowgram is reserved for invocation metadata".into(),
            ));
        }
        check_schema(&op.input_schema)?;
        check_schema(&op.output_schema)?;
        if op.input_schema.get("additionalProperties") != Some(&json!(false)) {
            return Err(Error::Invalid(
                "Public inputs must declare additionalProperties: false".into(),
            ));
        }
        for (field, binding) in &op.bindings {
            if field.is_empty()
                || binding.is_empty()
                || binding.len() > 128
                || op.input_schema["properties"].get(field).is_some()
            {
                return Err(Error::Invalid(
                    "Bound inputs must be excluded from public input properties".into(),
                ));
            }
        }
    }
    Ok(())
}
impl Bundle {
    fn calculated_digest(&self) -> Result<String> {
        let mut copy = self.clone();
        copy.digest.clear();
        Ok(hash(&serde_json::to_vec(&copy)?))
    }
    pub fn verify(&self) -> Result<()> {
        if self.format != FORMAT || self.runtime != RUNTIME {
            return Err(Error::Invalid(
                "Unsupported service bundle format or runtime".into(),
            ));
        }
        validate_publish(&Publish {
            service: self.service.clone(),
            title: self.title.clone(),
            version: self.version.clone(),
            operations: self.operations.clone(),
        })?;
        if self.digest != self.calculated_digest()? {
            return Err(Error::Invalid("Service bundle checksum mismatch".into()));
        }
        if self.workflows.is_empty()
            || self.workflows.len() > 128
            || serde_json::to_vec(self)?.len() > 8_000_000
        {
            return Err(Error::Invalid(
                "Service bundle exceeds workflow or size limits".into(),
            ));
        }
        if self
            .workflows
            .iter()
            .any(|w| w.project_id != self.workflows[0].project_id)
        {
            return Err(Error::Invalid(
                "All service workflows must belong to the same source project".into(),
            ));
        }
        let mut ids = HashSet::new();
        for w in &self.workflows {
            if !ids.insert(&w.id) {
                return Err(Error::Invalid(
                    "Duplicate workflow in service bundle".into(),
                ));
            }
            let issues = runtime::validate(&w.schema)?;
            if !issues.is_empty() {
                return Err(Error::Invalid(issues.join("; ")));
            }
        }
        fn inspect(nodes: &Value, ids: &HashSet<&String>) -> Result<()> {
            for node in nodes.as_array().into_iter().flatten() {
                if node["type"] == "subworkflow" {
                    let binding = &node["data"]["inputsValues"]["workflowId"];
                    let target = if binding["type"] == "constant" {
                        binding["content"].as_str()
                    } else {
                        binding.as_str()
                    };
                    if !target
                        .is_some_and(|id| ids.iter().any(|candidate| candidate.as_str() == id))
                    {
                        return Err(Error::Invalid("Service subworkflow dependencies must be constant and included in the bundle".into()));
                    }
                }
                inspect(&node["blocks"], ids)?;
            }
            Ok(())
        }
        for w in &self.workflows {
            inspect(&w.schema["nodes"], &ids)?;
            crate::service_credentials::required(&w.schema["nodes"])?;
        }
        for op in &self.operations {
            if !ids.contains(&op.workflow_id) {
                return Err(Error::Invalid(
                    "Operation workflow is absent from bundle".into(),
                ));
            }
        }
        // Memoized heights validate every DAG path without exponential traversal.
        fn height(
            id: &str,
            bundle: &Bundle,
            active: &mut HashSet<String>,
            heights: &mut BTreeMap<String, usize>,
        ) -> Result<usize> {
            if active.contains(id) {
                return Err(Error::Invalid("Recursive service dependency".into()));
            }
            if let Some(height) = heights.get(id) {
                return Ok(*height);
            }
            active.insert(id.into());
            fn targets(nodes: &Value, out: &mut Vec<String>) {
                for node in nodes.as_array().into_iter().flatten() {
                    if node["type"] == "subworkflow" {
                        let value = &node["data"]["inputsValues"]["workflowId"];
                        if let Some(id) = value["content"].as_str().or_else(|| value.as_str()) {
                            out.push(id.into());
                        }
                    }
                    targets(&node["blocks"], out);
                }
            }
            let workflow = bundle
                .workflows
                .iter()
                .find(|w| w.id == id)
                .ok_or_else(|| Error::Invalid("Missing service dependency".into()))?;
            let mut children = vec![];
            targets(&workflow.schema["nodes"], &mut children);
            let mut maximum = 0;
            for child in children {
                maximum = maximum.max(height(&child, bundle, active, heights)? + 1);
            }
            if maximum > 16 {
                return Err(Error::Invalid("Service dependency depth exceeds 16".into()));
            }
            active.remove(id);
            heights.insert(id.into(), maximum);
            Ok(maximum)
        }
        let mut heights = BTreeMap::new();
        for workflow in &self.workflows {
            height(&workflow.id, self, &mut HashSet::new(), &mut heights)?;
        }
        Ok(())
    }
}
pub async fn initialize(db: &SqlitePool) -> Result<()> {
    for sql in [
        "CREATE TABLE IF NOT EXISTS service_releases (service TEXT NOT NULL, version TEXT NOT NULL, bundle TEXT NOT NULL, created_at TEXT NOT NULL, PRIMARY KEY(service,version))",
        "CREATE TABLE IF NOT EXISTS service_deployments (service TEXT NOT NULL, environment TEXT NOT NULL, definition TEXT NOT NULL, PRIMARY KEY(service,environment))",
        "CREATE TABLE IF NOT EXISTS service_consumers (id TEXT PRIMARY KEY, service TEXT NOT NULL, environment TEXT NOT NULL, token_hash TEXT NOT NULL UNIQUE, definition TEXT NOT NULL)",
        "CREATE TABLE IF NOT EXISTS service_runs (run_id TEXT PRIMARY KEY REFERENCES runs(id), service TEXT NOT NULL, environment TEXT NOT NULL, operation TEXT NOT NULL, version TEXT NOT NULL, caller_id TEXT NOT NULL, idempotency_key TEXT NOT NULL, request_hash TEXT NOT NULL, callback TEXT, UNIQUE(service,environment,operation,caller_id,idempotency_key))",
        "CREATE TABLE IF NOT EXISTS service_connections (service TEXT NOT NULL, environment TEXT NOT NULL, slot TEXT NOT NULL, credential_id TEXT NOT NULL, PRIMARY KEY(service,environment,slot))",
        "CREATE TABLE IF NOT EXISTS service_run_connections (run_id TEXT NOT NULL REFERENCES runs(id), slot TEXT NOT NULL, credential_id TEXT NOT NULL, PRIMARY KEY(run_id,slot))",
        "CREATE INDEX IF NOT EXISTS service_runs_scope ON service_runs(service,environment,caller_id)",
        "CREATE TABLE IF NOT EXISTS service_deliveries (run_id TEXT PRIMARY KEY REFERENCES service_runs(run_id), attempts INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL DEFAULT 'pending', next_at INTEGER NOT NULL DEFAULT 0, last_error TEXT)",
    ] {
        sqlx::query(sql).execute(db).await?;
    }
    Ok(())
}
impl Store {
    pub async fn publish_service(&self, request: Publish) -> Result<Bundle> {
        validate_publish(&request)?;
        let _guard = self.workflow_lock.lock().await;
        let mut all = BTreeMap::new();
        for op in &request.operations {
            let root = self.workflow(&op.workflow_id).await?;
            for workflow in self.capture_workflows(&root).await? {
                all.insert(workflow.id.clone(), workflow);
            }
        }
        // Do not export any host path from workflow metadata. Configured node literals remain authored content.
        let mut bundle = Bundle {
            format: FORMAT.into(),
            runtime: RUNTIME.into(),
            service: request.service,
            title: request.title,
            version: request.version,
            created_at: now(),
            operations: request.operations,
            workflows: all.into_values().collect(),
            digest: String::new(),
        };
        bundle.digest = bundle.calculated_digest()?;
        bundle.verify()?;
        self.store_release(&bundle).await?;
        Ok(bundle)
    }
    async fn store_release(&self, bundle: &Bundle) -> Result<()> {
        let existing: Option<String> =
            sqlx::query_scalar("SELECT bundle FROM service_releases WHERE service=? AND version=?")
                .bind(&bundle.service)
                .bind(&bundle.version)
                .fetch_optional(&self.db)
                .await?;
        if let Some(existing) = existing {
            let previous: Bundle = serde_json::from_str(&existing)?;
            if previous.digest == bundle.digest {
                return Ok(());
            }
            return Err(failure(
                409,
                "immutable_release",
                "A published version cannot be overwritten; use a new version",
            ));
        }
        let inserted = sqlx::query(
            "INSERT INTO service_releases VALUES(?,?,?,?) ON CONFLICT(service,version) DO NOTHING",
        )
        .bind(&bundle.service)
        .bind(&bundle.version)
        .bind(serde_json::to_string(bundle)?)
        .bind(&bundle.created_at)
        .execute(&self.db)
        .await?;
        if inserted.rows_affected() == 0 {
            if self.release(&bundle.service, &bundle.version).await?.digest == bundle.digest {
                return Ok(());
            }
            return Err(failure(
                409,
                "immutable_release",
                "A published version cannot be overwritten; use a new version",
            ));
        }
        self.emit(
            "service_changed",
            &bundle.service,
            json!({"version":bundle.version}),
        )
        .await?;
        Ok(())
    }
    pub async fn release(&self, service: &str, version: &str) -> Result<Bundle> {
        let text: Option<String> =
            sqlx::query_scalar("SELECT bundle FROM service_releases WHERE service=? AND version=?")
                .bind(service)
                .bind(version)
                .fetch_optional(&self.db)
                .await?;
        Ok(serde_json::from_str(&text.ok_or_else(|| {
            Error::NotFound("Service release not found".into())
        })?)?)
    }
    pub async fn import_service(&self, bundle: Bundle) -> Result<Bundle> {
        bundle.verify()?;
        let _guard = self.service_lock.lock().await;
        self.ensure_open()?;
        // A dedicated runtime project owns only service data. Never overwrite editable workflow files.
        let project = self.projects().await?.remove(0);
        let mut tx = self.db.begin().await?;
        for workflow in &bundle.workflows {
            sqlx::query("INSERT INTO workflows VALUES(?,?,?,?,?,?) ON CONFLICT(id) DO NOTHING")
                .bind(&workflow.id)
                .bind(&project.id)
                .bind(&workflow.name)
                .bind(workflow.revision)
                .bind(workflow.schema.to_string())
                .bind(&workflow.updated_at)
                .execute(&mut *tx)
                .await?;
        }
        tx.commit().await?;
        self.store_release(&bundle).await?;
        Ok(bundle)
    }
    pub async fn service_inventory(&self) -> Result<Value> {
        let releases: Vec<String> =
            sqlx::query_scalar("SELECT bundle FROM service_releases ORDER BY created_at DESC")
                .fetch_all(&self.db)
                .await?;
        let releases:Vec<Value>=releases.into_iter().map(|text| {let b:Bundle=serde_json::from_str(&text)?;Ok(json!({"service":b.service,"title":b.title,"version":b.version,"digest":b.digest,"createdAt":b.created_at,"operations":b.operations,"workflows":b.workflows.iter().map(|w|json!({"id":w.id,"name":w.name,"revision":w.revision})).collect::<Vec<_>>()}))}).collect::<Result<_>>()?;
        let deployments: Vec<String> = sqlx::query_scalar(
            "SELECT definition FROM service_deployments ORDER BY service,environment",
        )
        .fetch_all(&self.db)
        .await?;
        let deployments: Vec<Value> = deployments
            .iter()
            .map(|v| serde_json::from_str(v))
            .collect::<std::result::Result<_, _>>()?;
        Ok(json!({"releases":releases,"deployments":deployments}))
    }
    pub async fn deploy_service(&self, definition: Deployment) -> Result<Deployment> {
        identifier(&definition.service)?;
        identifier(&definition.environment)?;
        if !(1..=128).contains(&definition.max_concurrency) {
            return Err(Error::Invalid(
                "Service concurrency must be between 1 and 128".into(),
            ));
        }
        let release = self
            .release(&definition.service, &definition.version)
            .await?;
        for workflow in &release.workflows {
            for name in crate::service_credentials::required(&workflow.schema["nodes"])? {
                if self
                    .connection_secret(
                        &definition.service,
                        &definition.environment,
                        &name,
                        &release.workflows[0].project_id,
                    )
                    .await
                    .is_err()
                {
                    return Err(Error::Invalid(format!(
                        "Missing HTTP credential environment slot: {name}"
                    )));
                }
            }
        }
        if let Some(callback) = &definition.callback {
            let url = reqwest::Url::parse(&callback.url)
                .map_err(|_| Error::Invalid("Invalid callback URL".into()))?;
            let local = url
                .host_str()
                .is_some_and(|h| h == "127.0.0.1" || h == "localhost" || h == "[::1]");
            if (url.scheme() != "https" && !(url.scheme() == "http" && local))
                || !url.username().is_empty()
                || url.password().is_some()
            {
                return Err(Error::Invalid(
                    "Callbacks require HTTPS (HTTP is allowed for loopback testing only)".into(),
                ));
            }
            if self
                .connection_secret(
                    &definition.service,
                    &definition.environment,
                    &callback.secret_env,
                    &release.workflows[0].project_id,
                )
                .await
                .ok()
                .filter(|v| v.len() >= 32)
                .is_none()
            {
                return Err(Error::Invalid(
                    "Callback signing secret environment variable must contain at least 32 bytes"
                        .into(),
                ));
            }
        }
        for op in &release.operations {
            for name in op.bindings.values() {
                if !definition.bindings.contains_key(name) {
                    return Err(Error::Invalid(format!(
                        "Missing deployment configuration binding: {name}"
                    )));
                }
            }
        }
        let models = if definition.enabled {
            self.deployment_models(&release, &definition.model_bindings)
                .await?
        } else {
            Default::default()
        };
        let _guard = self.service_lock.lock().await;
        self.ensure_open()?;
        let mut tx = self.db.begin().await?;
        for (slot, model) in models {
            sqlx::query("INSERT INTO service_models VALUES(?,?,?,?,?) ON CONFLICT(service,environment,version,slot) DO UPDATE SET definition=excluded.definition").bind(&definition.service).bind(&definition.environment).bind(&definition.version).bind(slot).bind(serde_json::to_string(&model)?).execute(&mut *tx).await?;
        }
        sqlx::query("INSERT INTO service_deployments VALUES(?,?,?) ON CONFLICT(service,environment) DO UPDATE SET definition=excluded.definition").bind(&definition.service).bind(&definition.environment).bind(serde_json::to_string(&definition)?).execute(&mut *tx).await?;
        tx.commit().await?;
        self.emit(
            "service_changed",
            &definition.service,
            json!({"environment":definition.environment,"version":definition.version}),
        )
        .await?;
        Ok(definition)
    }
    pub async fn deployment(&self, service: &str, environment: &str) -> Result<Deployment> {
        let text: Option<String> = sqlx::query_scalar(
            "SELECT definition FROM service_deployments WHERE service=? AND environment=?",
        )
        .bind(service)
        .bind(environment)
        .fetch_optional(&self.db)
        .await?;
        Ok(serde_json::from_str(&text.ok_or_else(|| {
            Error::NotFound("Service deployment not found".into())
        })?)?)
    }
    pub async fn create_consumer(
        &self,
        service: &str,
        environment: &str,
        input: KeyInput,
    ) -> Result<Value> {
        let deployment = self.deployment(service, environment).await?;
        let release = self.release(service, &deployment.version).await?;
        if input.name.trim().is_empty()
            || input.name.len() > 200
            || input.operations.is_empty()
            || input
                .operations
                .iter()
                .any(|n| !release.operations.iter().any(|o| &o.name == n))
        {
            return Err(Error::Invalid(
                "Consumer needs a name and existing allowed operations".into(),
            ));
        }
        let consumer = Consumer {
            id: id(),
            name: input.name,
            operations: input.operations,
            can_cancel: input.can_cancel,
            revoked: false,
            created_at: now(),
        };
        let token = format!("fg_{}{}", id().replace('-', ""), id().replace('-', ""));
        sqlx::query("INSERT INTO service_consumers VALUES(?,?,?,?,?)")
            .bind(&consumer.id)
            .bind(service)
            .bind(environment)
            .bind(hash(token.as_bytes()))
            .bind(serde_json::to_string(&consumer)?)
            .execute(&self.db)
            .await?;
        Ok(json!({"consumer":consumer,"token":token}))
    }
    pub async fn consumers(&self, service: &str, environment: &str) -> Result<Vec<Consumer>> {
        let values: Vec<String> = sqlx::query_scalar(
            "SELECT definition FROM service_consumers WHERE service=? AND environment=?",
        )
        .bind(service)
        .bind(environment)
        .fetch_all(&self.db)
        .await?;
        Ok(values
            .iter()
            .map(|v| serde_json::from_str(v))
            .collect::<std::result::Result<_, _>>()?)
    }
    pub async fn revoke_consumer(&self, service: &str, environment: &str, id: &str) -> Result<()> {
        let mut consumer = self
            .consumers(service, environment)
            .await?
            .into_iter()
            .find(|v| v.id == id)
            .ok_or_else(|| Error::NotFound("Consumer not found".into()))?;
        consumer.revoked = true;
        sqlx::query("UPDATE service_consumers SET definition=? WHERE id=?")
            .bind(serde_json::to_string(&consumer)?)
            .bind(id)
            .execute(&self.db)
            .await?;
        Ok(())
    }
    pub async fn authenticate_consumer(
        &self,
        service: &str,
        environment: &str,
        token: &str,
    ) -> Result<Caller> {
        let value:Option<String>=sqlx::query_scalar("SELECT definition FROM service_consumers WHERE service=? AND environment=? AND token_hash=?").bind(service).bind(environment).bind(hash(token.as_bytes())).fetch_optional(&self.db).await?;
        let consumer: Consumer = serde_json::from_str(
            &value.ok_or_else(|| failure(401, "unauthorized", "Invalid service credential"))?,
        )?;
        if consumer.revoked {
            return Err(failure(
                401,
                "unauthorized",
                "Service credential has been revoked",
            ));
        }
        Ok(Caller {
            consumer,
            deployment: self.deployment(service, environment).await?,
        })
    }
    pub async fn invoke_service(
        &self,
        caller: &Caller,
        operation: &str,
        inputs: Value,
        key: &str,
    ) -> Result<Invocation> {
        // Admission survives the HTTP request being dropped after a durable transaction commits.
        let (store, caller, operation, key) = (
            self.clone(),
            caller.clone(),
            operation.to_owned(),
            key.to_owned(),
        );
        tokio::spawn(async move {
            store
                .invoke_service_inner(&caller, &operation, inputs, &key)
                .await
        })
        .await
        .map_err(|_| Error::Execution("Service admission failed".into()))?
    }
    async fn invoke_service_inner(
        &self,
        caller: &Caller,
        operation: &str,
        inputs: Value,
        key: &str,
    ) -> Result<Invocation> {
        if !caller.consumer.operations.iter().any(|n| n == operation) {
            return Err(failure(
                403,
                "forbidden",
                "Operation is not granted to this caller",
            ));
        }
        if key.is_empty() || key.len() > 200 || key.chars().any(char::is_control) {
            return Err(Error::Invalid(
                "A 1-200 character Idempotency-Key is required".into(),
            ));
        }
        let _guard = self.service_lock.lock().await;
        self.ensure_open()?;
        let request_hash = hash(&serde_json::to_vec(&inputs)?);
        let old=sqlx::query("SELECT run_id,request_hash FROM service_runs WHERE service=? AND environment=? AND operation=? AND caller_id=? AND idempotency_key=?").bind(&caller.deployment.service).bind(&caller.deployment.environment).bind(operation).bind(&caller.consumer.id).bind(key).fetch_optional(&self.db).await?;
        if let Some(old) = old {
            if old.get::<String, _>("request_hash") != request_hash {
                return Err(failure(
                    409,
                    "idempotency_conflict",
                    "Idempotency key was already used with different inputs",
                ));
            }
            return self
                .service_run(
                    &caller.deployment.service,
                    &caller.deployment.environment,
                    &old.get::<String, _>("run_id"),
                    Some(&caller.consumer.id),
                )
                .await;
        }
        let deployment = self
            .deployment(&caller.deployment.service, &caller.deployment.environment)
            .await?;
        if !deployment.enabled {
            return Err(failure(
                503,
                "service_disabled",
                "Service deployment is disabled",
            ));
        }
        let release = self
            .release(&deployment.service, &deployment.version)
            .await?;
        let op = release
            .operations
            .iter()
            .find(|o| o.name == operation)
            .ok_or_else(|| Error::NotFound("Published operation not found".into()))?;
        check_contract(&op.input_schema, &inputs)?;
        let count:i64=sqlx::query_scalar("SELECT count(*) FROM service_runs s JOIN runs r ON r.id=s.run_id WHERE s.service=? AND s.environment=? AND r.status='running'").bind(&deployment.service).bind(&deployment.environment).fetch_one(&self.db).await?;
        if count >= i64::from(deployment.max_concurrency) {
            return Err(failure(
                429,
                "concurrency_limit",
                "Service concurrency limit reached; retry later with the same idempotency key",
            ));
        }
        let mut effective = inputs;
        for (field, definition) in op.input_schema["properties"]
            .as_object()
            .into_iter()
            .flatten()
        {
            if effective.get(field).is_none()
                && let Some(default) = definition.get("default")
            {
                effective[field] = default.clone();
            }
        }
        for (field, name) in &op.bindings {
            effective[field] =
                deployment.bindings.get(name).cloned().ok_or_else(|| {
                    Error::Invalid(format!("Missing configuration binding: {name}"))
                })?;
        }
        let workflow = release
            .workflows
            .iter()
            .find(|w| w.id == op.workflow_id)
            .expect("verified release");
        runtime::validate_run_inputs(&workflow.schema, &effective)?;
        let mut tx = self.db.begin().await?;
        let run = self
            .prepare_run(workflow, None, &effective, &release.workflows, &mut tx)
            .await?;
        self.pin_models(&mut tx, &run.id, &release.workflows, Some(&deployment))
            .await?;
        sqlx::query("INSERT INTO service_runs VALUES(?,?,?,?,?,?,?,?,?)")
            .bind(&run.id)
            .bind(&deployment.service)
            .bind(&deployment.environment)
            .bind(operation)
            .bind(&deployment.version)
            .bind(&caller.consumer.id)
            .bind(key)
            .bind(request_hash)
            .bind(
                deployment
                    .callback
                    .as_ref()
                    .map(serde_json::to_string)
                    .transpose()?,
            )
            .execute(&mut *tx)
            .await?;
        sqlx::query("INSERT INTO service_run_connections SELECT ?,slot,credential_id FROM service_connections WHERE service=? AND environment=?")
            .bind(&run.id).bind(&deployment.service).bind(&deployment.environment).execute(&mut *tx).await?;
        tx.commit().await?;
        self.launch_run(
            run.clone(),
            workflow.clone(),
            effective,
            Some(ExecutionPolicy {
                timeout_ms: op.timeout_ms,
                output_schema: op.output_schema.clone(),
            }),
        )
        .await?;
        self.service_run(
            &deployment.service,
            &deployment.environment,
            &run.id,
            Some(&caller.consumer.id),
        )
        .await
    }
    pub async fn service_run(
        &self,
        service: &str,
        environment: &str,
        run: &str,
        caller: Option<&str>,
    ) -> Result<Invocation> {
        let row=sqlx::query("SELECT operation,version,caller_id FROM service_runs WHERE service=? AND environment=? AND run_id=?").bind(service).bind(environment).bind(run).fetch_optional(&self.db).await?.ok_or_else(||Error::NotFound("Service run not found".into()))?;
        if caller.is_some_and(|id| id != row.get::<String, _>("caller_id")) {
            return Err(Error::NotFound("Service run not found".into()));
        }
        let Run {
            id,
            status,
            outputs,
            error,
            created_at,
            ..
        } = self.run(run).await?;
        Ok(Invocation {
            run_id: id,
            service: service.into(),
            environment: environment.into(),
            operation: row.get("operation"),
            version: row.get("version"),
            status,
            outputs,
            error,
            created_at,
        })
    }
    pub async fn service_runs(&self, service: &str, environment: &str) -> Result<Value> {
        let rows=sqlx::query("SELECT s.run_id,s.caller_id,s.operation,s.version,r.status,r.created_at,d.status as delivery_status,d.attempts,d.last_error FROM service_runs s JOIN runs r ON r.id=s.run_id LEFT JOIN service_deliveries d ON d.run_id=s.run_id WHERE s.service=? AND s.environment=? ORDER BY r.created_at DESC LIMIT 100").bind(service).bind(environment).fetch_all(&self.db).await?;
        Ok(json!(rows.iter().map(|r|json!({"runId":r.get::<String,_>("run_id"),"callerId":r.get::<String,_>("caller_id"),"operation":r.get::<String,_>("operation"),"version":r.get::<String,_>("version"),"status":r.get::<String,_>("status"),"createdAt":r.get::<String,_>("created_at"),"callbackStatus":r.get::<Option<String>,_>("delivery_status"),"callbackAttempts":r.get::<Option<i64>,_>("attempts"),"callbackError":r.get::<Option<String>,_>("last_error")})).collect::<Vec<_>>()))
    }
}

impl Store {
    /// Agent nodes in a published run can discover only that run's immutable bundle.
    pub async fn published_agent_tool(&self, run: &str, name: &str, args: Value) -> Result<Value> {
        self.run_agent_tool(run, name, args).await
    }
}
