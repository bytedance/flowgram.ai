//! Durable, bounded at-least-once completion delivery. Never retries workflow execution.
use crate::{
    error::Result,
    services::{Callback, Invocation},
    store::Store,
};
use hmac::{Hmac, Mac};
use sha2::Sha256;
use sqlx::Row;
use std::time::Duration;

pub fn start(store: Store) {
    tokio::spawn(async move {
        loop {
            tokio::select! {
                _ = store.closed.cancelled() => break,
                _ = async {
                    if let Err(error) = deliver(&store).await { eprintln!("Service completion delivery failed: {error}"); }
                    tokio::time::sleep(Duration::from_secs(1)).await;
                } => {}
            }
        }
    });
}
pub async fn deliver(store: &Store) -> Result<()> {
    sqlx::query("INSERT INTO service_deliveries(run_id) SELECT s.run_id FROM service_runs s JOIN runs r ON r.id=s.run_id WHERE s.callback IS NOT NULL AND r.status!='running' AND NOT EXISTS (SELECT 1 FROM service_deliveries d WHERE d.run_id=s.run_id)").execute(&store.db).await?;
    let rows=sqlx::query("SELECT d.run_id,s.service,s.environment,s.callback FROM service_deliveries d JOIN service_runs s ON s.run_id=d.run_id WHERE d.status='pending' AND d.next_at<=unixepoch() ORDER BY d.next_at LIMIT 20").fetch_all(&store.db).await?;
    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(10))
        .redirect(reqwest::redirect::Policy::none())
        .build()
        .expect("static callback client");
    for row in rows {
        let run: String = row.get("run_id");
        // A short database lease makes the scan safe even if a worker is restarted.
        let claim=sqlx::query("UPDATE service_deliveries SET next_at=unixepoch()+60,attempts=attempts+1 WHERE run_id=? AND status='pending' AND next_at<=unixepoch() RETURNING attempts").bind(&run).fetch_optional(&store.db).await?;
        let Some(claim) = claim else {
            continue;
        };
        let attempts: i64 = claim.get("attempts");
        let callback: Callback = serde_json::from_str(row.get("callback"))?;
        let result: Invocation = store
            .service_run(row.get("service"), row.get("environment"), &run, None)
            .await?;
        let body = serde_json::to_vec(
            &serde_json::json!({"eventId":format!("run:{run}:finished"),"type":"run.finished","run":result}),
        )?;
        let timestamp = chrono::Utc::now().timestamp().to_string();
        let result = async {
            let secret = store
                .run_connection_secret(&run, &callback.secret_env)
                .await
                .map_err(|_| "Callback signing secret is unavailable".to_owned())?;
            let mut mac = Hmac::<Sha256>::new_from_slice(secret.as_bytes())
                .map_err(|_| "Invalid callback secret".to_owned())?;
            mac.update(timestamp.as_bytes());
            mac.update(b".");
            mac.update(&body);
            let signature = format!("sha256={}", hex::encode(mac.finalize().into_bytes()));
            let response = client
                .post(&callback.url)
                .header("content-type", "application/json")
                .header("x-flowgram-event-id", format!("run:{run}:finished"))
                .header("x-flowgram-timestamp", &timestamp)
                .header("x-flowgram-signature", signature)
                .body(body)
                .send()
                .await
                .map_err(|_| "Callback request failed".to_owned())?;
            if response.status().is_success() {
                Ok(())
            } else {
                Err(format!(
                    "Callback returned HTTP {}",
                    response.status().as_u16()
                ))
            }
        }
        .await;
        let error = result.err();
        let status = if error.is_none() {
            "delivered"
        } else if attempts >= 10 {
            "failed"
        } else {
            "pending"
        };
        sqlx::query("UPDATE service_deliveries SET status=?,next_at=unixepoch()+?,last_error=? WHERE run_id=?").bind(status).bind((1_i64<<attempts.min(10)).min(3600)).bind(error).bind(&run).execute(&store.db).await?;
    }
    Ok(())
}
