//! Host-owned outbound HTTP credentials. Bundles contain environment-slot names only.
use crate::store::Store;
use crate::{
    error::{Error, Result},
    model::Node,
};
use serde_json::Value;
use sqlx::Row;
use std::collections::BTreeSet;

impl Store {
    pub async fn configure_service_connections(
        &self,
        service: &str,
        environment: &str,
        bindings: &std::collections::BTreeMap<String, String>,
        project: &str,
    ) -> Result<()> {
        crate::services::identifier(service)?;
        crate::services::identifier(environment)?;
        for (slot, credential) in bindings {
            if !slot.starts_with("FLOWGRAM_CONNECTION_")
                || slot.len() > 128
                || !slot
                    .bytes()
                    .all(|c| c.is_ascii_uppercase() || c.is_ascii_digit() || c == b'_')
            {
                return Err(Error::Invalid(
                    "Credential bindings require a FLOWGRAM_CONNECTION_ slot".into(),
                ));
            }
            self.deployment_settings
                .secret(credential, Some(project), "connection")
                .await?;
        }
        let mut tx = self.db.begin().await?;
        sqlx::query("DELETE FROM service_connections WHERE service=? AND environment=?")
            .bind(service)
            .bind(environment)
            .execute(&mut *tx)
            .await?;
        for (slot, credential) in bindings {
            sqlx::query("INSERT INTO service_connections VALUES(?,?,?,?)")
                .bind(service)
                .bind(environment)
                .bind(slot)
                .bind(credential)
                .execute(&mut *tx)
                .await?;
        }
        tx.commit().await?;
        Ok(())
    }
    pub async fn connection_secret(
        &self,
        service: &str,
        environment: &str,
        slot: &str,
        project: &str,
    ) -> Result<String> {
        let reference:Option<String>=sqlx::query_scalar("SELECT credential_id FROM service_connections WHERE service=? AND environment=? AND slot=?").bind(service).bind(environment).bind(slot).fetch_optional(&self.db).await?;
        match reference {
            Some(id) => {
                self.deployment_settings
                    .secret(&id, Some(project), "connection")
                    .await
            }
            None => std::env::var(slot)
                .ok()
                .filter(|s| s.len() >= 8)
                .ok_or_else(|| Error::Execution(format!("Credential slot is unavailable: {slot}"))),
        }
    }
    pub async fn run_connection_secret(&self, run: &str, slot: &str) -> Result<String> {
        let row=sqlx::query("SELECT c.credential_id,w.definition FROM service_run_connections c JOIN run_workflows w ON w.run_id=c.run_id WHERE c.run_id=? AND c.slot=? LIMIT 1").bind(run).bind(slot).fetch_optional(&self.db).await?;
        if let Some(row) = row {
            let workflow: crate::model::Workflow = serde_json::from_str(row.get("definition"))?;
            return self
                .deployment_settings
                .secret(
                    row.get("credential_id"),
                    Some(&workflow.project_id),
                    "connection",
                )
                .await;
        }
        std::env::var(slot)
            .ok()
            .filter(|s| s.len() >= 8)
            .ok_or_else(|| Error::Execution(format!("Credential slot is unavailable: {slot}")))
    }
}

pub fn slot(node: &Node) -> Result<Option<(String, String, String)>> {
    let binding = &node.data["inputsValues"]["credentialEnv"];
    if binding.is_null() {
        return Ok(None);
    }
    let configured = |field: &str, default: &str| -> Result<String> {
        let value = &node.data["inputsValues"][field];
        if value.is_null() {
            return Ok(default.into());
        }
        if value["type"] != "constant" {
            return Err(Error::Invalid(
                "HTTP credential configuration must use static constant bindings".into(),
            ));
        }
        value["content"]
            .as_str()
            .map(str::to_owned)
            .ok_or_else(|| Error::Invalid("HTTP credential configuration must be text".into()))
    };
    let name = configured("credentialEnv", "")?;
    if name.is_empty() {
        return Ok(None);
    }
    if !name.starts_with("FLOWGRAM_CONNECTION_")
        || name.len() > 128
        || !name
            .bytes()
            .all(|c| c.is_ascii_uppercase() || c.is_ascii_digit() || c == b'_')
    {
        return Err(Error::Invalid(
            "HTTP credential slots must use FLOWGRAM_CONNECTION_ environment variables".into(),
        ));
    }
    let header = configured("credentialHeader", "Authorization")?;
    reqwest::header::HeaderName::from_bytes(header.as_bytes())
        .map_err(|_| Error::Invalid("Invalid credential header name".into()))?;
    let prefix = configured("credentialPrefix", "Bearer ")?;
    if prefix.contains(['\r', '\n']) {
        return Err(Error::Invalid("Invalid credential prefix".into()));
    }
    Ok(Some((name, header, prefix)))
}
pub fn required(nodes: &Value) -> Result<BTreeSet<String>> {
    let mut names = BTreeSet::new();
    for value in nodes.as_array().into_iter().flatten() {
        let node: Node = serde_json::from_value(value.clone())?;
        if node.kind == "http" {
            if let Some((name, _, _)) = slot(&node)? {
                names.insert(name);
            }
            let headers = &node.data["inputsValues"]["headers"];
            if headers["type"] == "constant"
                && headers["content"].as_object().is_some_and(|m| {
                    m.iter().any(|(k, v)| {
                        [
                            "authorization",
                            "proxy-authorization",
                            "x-api-key",
                            "api-key",
                            "cookie",
                        ]
                        .contains(&k.to_ascii_lowercase().as_str())
                            && v.as_str().is_some_and(|s| !s.is_empty())
                    })
                })
            {
                return Err(Error::Invalid("Published HTTP credentials must use a host environment slot, not literal secret headers".into()));
            }
        }
        names.extend(required(&value["blocks"])?);
    }
    Ok(names)
}
