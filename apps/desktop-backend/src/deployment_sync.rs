//! Durable propagation of credential rotation and scope changes to connected runtimes.
use crate::{
    deployment_settings::{Catalog, CredentialInput},
    error::{Error, Result},
};
use serde_json::Value;
use sqlx::Row;
use std::time::Duration;

pub fn start(catalog: Catalog) {
    tokio::spawn(async move {
        loop {
            if let Err(error) = deliver(&catalog).await {
                eprintln!("Credential synchronization failed: {error}");
            }
            tokio::time::sleep(Duration::from_secs(5)).await;
        }
    });
}
pub async fn schedule(catalog: &Catalog, credential: &str) -> Result<()> {
    let rows=sqlx::query("SELECT p.project_id,d.target_id,d.definition FROM publication_deployments d JOIN publications p ON p.id=d.publication_id WHERE d.target_id!='local'").fetch_all(&catalog.db).await?;
    for row in rows {
        let definition: Value = serde_json::from_str(row.get("definition"))?;
        if definition["credentialBindings"]
            .as_object()
            .is_some_and(|m| m.values().any(|v| v.as_str() == Some(credential)))
        {
            sqlx::query("INSERT INTO credential_sync(credential_id,project_id,target_id,generation) VALUES(?,?,?,?) ON CONFLICT(credential_id,project_id,target_id) DO UPDATE SET generation=excluded.generation,next_at=0,last_error=NULL").bind(credential).bind(row.get::<String,_>("project_id")).bind(row.get::<String,_>("target_id")).bind(crate::store::id()).execute(&catalog.db).await?;
        }
    }
    Ok(())
}
pub async fn deliver(catalog: &Catalog) -> Result<()> {
    let rows=sqlx::query("SELECT credential_id,project_id,target_id,generation FROM credential_sync WHERE next_at<=unixepoch() LIMIT 20").fetch_all(&catalog.db).await?;
    for row in rows {
        let generation: String = row.get("generation");
        let credential: String = row.get("credential_id");
        let project: String = row.get("project_id");
        let target_id: String = row.get("target_id");
        let claim=sqlx::query("UPDATE credential_sync SET next_at=unixepoch()+60 WHERE credential_id=? AND project_id=? AND target_id=? AND generation=? AND next_at<=unixepoch()").bind(&credential).bind(&project).bind(&target_id).bind(&generation).execute(&catalog.db).await?;
        if claim.rows_affected() == 0 {
            continue;
        }
        let result: Result<()> = async {
            let record = sqlx::query("SELECT name,purpose,project_ids FROM credentials WHERE id=?")
                .bind(&credential)
                .fetch_one(&catalog.db)
                .await?;
            let purpose: String = record.get("purpose");
            let scope: Option<Vec<String>> = record
                .get::<Option<String>, _>("project_ids")
                .map(|s| serde_json::from_str(&s))
                .transpose()?;
            let allowed = scope.as_ref().is_none_or(|ids| ids.contains(&project));
            let input = CredentialInput {
                name: record.get("name"),
                purpose: purpose.clone(),
                project_ids: Some(if allowed {
                    vec![project.clone()]
                } else {
                    vec![]
                }),
                value: Some(catalog.secret(&credential, None, &purpose).await?),
            };
            let target = catalog.target(&target_id).await?;
            let token = catalog
                .secret(&target.credential_id, None, "management")
                .await?;
            let client = reqwest::Client::builder()
                .redirect(reqwest::redirect::Policy::none())
                .timeout(Duration::from_secs(10))
                .build()
                .map_err(|_| {
                    Error::Execution("Could not initialize credential synchronization".into())
                })?;
            let response = client
                .put(format!(
                    "{}/admin/credentials/{}:{}",
                    target.url, project, credential
                ))
                .bearer_auth(token)
                .json(&input)
                .send()
                .await
                .map_err(|_| Error::Execution("Runtime service is unavailable".into()))?;
            if !response.status().is_success() {
                return Err(Error::Execution(
                    "Runtime credential update was not accepted".into(),
                ));
            }
            Ok(())
        }
        .await;
        if result.is_ok() {
            sqlx::query("DELETE FROM credential_sync WHERE credential_id=? AND project_id=? AND target_id=? AND generation=?").bind(&credential).bind(&project).bind(&target_id).bind(&generation).execute(&catalog.db).await?;
        } else {
            sqlx::query("UPDATE credential_sync SET last_error='Runtime credential update pending',next_at=unixepoch()+15 WHERE credential_id=? AND project_id=? AND target_id=? AND generation=?").bind(&credential).bind(&project).bind(&target_id).bind(&generation).execute(&catalog.db).await?;
        }
    }
    Ok(())
}
