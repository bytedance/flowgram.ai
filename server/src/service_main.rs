//! Standalone published-service host. Contains no editor API and never opens source projects.
use flowgram_desktop_backend::{
    model::ModelConfig,
    service_api,
    services::{Bundle, Deployment, KeyInput},
    store::Store,
};
use std::{env, path::PathBuf};
use tokio::io::{AsyncBufReadExt, AsyncWriteExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args: Vec<String> = env::args().skip(1).collect();
    if args.first().is_some_and(|s| s == "stdio") {
        return bridge(
            args.get(1)
                .ok_or("Usage: flowgram-service stdio <mcp-url>; set FLOWGRAM_SERVICE_TOKEN")?,
        )
        .await;
    }
    let root = PathBuf::from(
        env::var_os("FLOWGRAM_SERVICE_DATA_DIR")
            .ok_or("Set FLOWGRAM_SERVICE_DATA_DIR to a dedicated runtime directory")?,
    );
    std::fs::create_dir_all(&root)?;
    if root.join("flowgram.project.json").exists() {
        return Err("Use a dedicated runtime directory, not an editable project".into());
    }
    let lock = std::fs::OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .truncate(false)
        .open(root.join("service.lock"))?;
    fs2::FileExt::try_lock_exclusive(&lock)
        .map_err(|_| "Service runtime directory is already in use")?;
    let store = Store::open_configured(&root.join("runtime"), &root, None).await?;
    if let Ok(url) = env::var("FLOWGRAM_MODEL_BASE_URL") {
        store
            .set_model(ModelConfig {
                base_url: url,
                model: env::var("FLOWGRAM_MODEL").unwrap_or_default(),
                api_key: env::var("FLOWGRAM_MODEL_API_KEY").unwrap_or_default(),
            })
            .await?;
    }
    let output = match args.first().map(String::as_str) {
        Some("models") => Some(store.deployment_settings.models_inventory().await?),
        Some("model-connection") => {
            let input: flowgram_desktop_backend::models::Connection = serde_json::from_slice(
                &tokio::fs::read(
                    args.get(1)
                        .ok_or("Usage: model-connection <connection.json>")?,
                )
                .await?,
            )?;
            Some(serde_json::to_value(
                store
                    .deployment_settings
                    .save_model_connection(input)
                    .await?,
            )?)
        }
        Some("model") => {
            let input: flowgram_desktop_backend::models::Entry = serde_json::from_slice(
                &tokio::fs::read(args.get(1).ok_or("Usage: model <model.json>")?).await?,
            )?;
            Some(serde_json::to_value(
                store.deployment_settings.save_model_entry(input).await?,
            )?)
        }
        Some("model-defaults") => {
            let input: flowgram_desktop_backend::models::Defaults = serde_json::from_slice(
                &tokio::fs::read(args.get(1).ok_or("Usage: model-defaults <defaults.json>")?)
                    .await?,
            )?;
            Some(serde_json::to_value(
                store.deployment_settings.save_model_defaults(input).await?,
            )?)
        }
        Some("import") => {
            let bytes = tokio::fs::read(args.get(1).ok_or("Usage: import <bundle.json>")?).await?;
            if bytes.len() > 8_000_000 {
                return Err("Bundle exceeds 8 MB".into());
            }
            let bundle: Bundle = serde_json::from_slice(&bytes)?;
            let b = store.import_service(bundle).await?;
            Some(serde_json::json!({"service":b.service,"version":b.version,"digest":b.digest}))
        }
        Some("deploy") => {
            let value: Deployment = serde_json::from_slice(
                &tokio::fs::read(args.get(1).ok_or("Usage: deploy <deployment.json>")?).await?,
            )?;
            Some(serde_json::to_value(store.deploy_service(value).await?)?)
        }
        Some("key") => {
            let service = args
                .get(1)
                .ok_or("Usage: key <service> <environment> <consumer.json>")?;
            let environment = args.get(2).ok_or("Missing environment")?;
            let input: KeyInput = serde_json::from_slice(
                &tokio::fs::read(args.get(3).ok_or("Missing consumer.json")?).await?,
            )?;
            Some(store.create_consumer(service, environment, input).await?)
        }
        Some("revoke") => {
            store
                .revoke_consumer(
                    args.get(1).ok_or("Missing service")?,
                    args.get(2).ok_or("Missing environment")?,
                    args.get(3).ok_or("Missing consumer ID")?,
                )
                .await?;
            Some(serde_json::json!({"revoked":true}))
        }
        Some("status") => Some(store.service_inventory().await?),
        Some("serve") | None => None,
        _ => return Err("Commands: import, deploy, key, revoke, status, serve, stdio".into()),
    };
    if let Some(output) = output {
        println!("{}", serde_json::to_string_pretty(&output)?);
        return Ok(());
    }
    let listener = tokio::net::TcpListener::bind(
        env::var("FLOWGRAM_SERVICE_BIND").unwrap_or_else(|_| "127.0.0.1:18790".into()),
    )
    .await?;
    flowgram_desktop_backend::service_delivery::start(store.clone());
    eprintln!(
        "FlowGram published services ready at http://{}",
        listener.local_addr()?
    );
    let mut router = service_api::public_router(store.clone());
    if let Ok(token) = env::var("FLOWGRAM_SERVICE_ADMIN_TOKEN") {
        if token.len() < 32 {
            return Err("Admin token must contain at least 32 bytes".into());
        }
        router = router.merge(service_api::host_admin_router(store, token));
    }
    axum::serve(
        listener,
        router.route(
            "/health",
            axum::routing::get(|| async {
                axum::Json(
                    serde_json::json!({"status":"ready","service":"flowgram-published-services"}),
                )
            }),
        ),
    )
    .with_graceful_shutdown(async {
        let _ = tokio::signal::ctrl_c().await;
    })
    .await?;
    Ok(())
}
async fn bridge(url: &str) -> Result<(), Box<dyn std::error::Error>> {
    let token = env::var("FLOWGRAM_SERVICE_TOKEN")
        .map_err(|_| "Set FLOWGRAM_SERVICE_TOKEN for the stdio bridge")?;
    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(40))
        .redirect(reqwest::redirect::Policy::none())
        .build()?;
    let mut input = tokio::io::BufReader::new(tokio::io::stdin());
    let mut output = tokio::io::stdout();
    let mut bytes = Vec::new();
    let mut version = "2025-11-25".to_owned();
    loop {
        bytes.clear();
        // read_until would allocate without a bound; fill_buf keeps untrusted frames bounded.
        loop {
            let chunk = input.fill_buf().await?;
            if chunk.is_empty() {
                if bytes.is_empty() {
                    return Ok(());
                }
                return Err("Incomplete MCP frame".into());
            }
            let count = chunk
                .iter()
                .position(|b| *b == b'\n')
                .map(|n| n + 1)
                .unwrap_or(chunk.len());
            if bytes.len() + count > 2_000_000 {
                return Err("MCP frame exceeds 2 MB".into());
            }
            let done = chunk[count - 1] == b'\n';
            bytes.extend_from_slice(&chunk[..count]);
            input.consume(count);
            if done {
                break;
            }
        }
        let request: serde_json::Value = serde_json::from_slice(&bytes)?;
        let mut http = client
            .post(url)
            .bearer_auth(&token)
            .header("accept", "application/json, text/event-stream")
            .header("mcp-protocol-version", &version);
        if version == "2026-07-28" {
            http = http.header("mcp-method", request["method"].as_str().unwrap_or_default());
            if let Some(name) = request["params"]["name"].as_str() {
                http = http.header("mcp-name", name);
            }
        }
        let response = http.json(&request).send().await?;
        if !response.status().is_success() {
            return Err(format!("MCP host returned HTTP {}", response.status()).into());
        }
        if response.status() == reqwest::StatusCode::ACCEPTED {
            continue;
        }
        let body = response.bytes().await?;
        if body.len() > 8_000_000 {
            return Err("MCP response exceeds 8 MB".into());
        }
        let value: serde_json::Value = serde_json::from_slice(&body)?;
        if request["method"] == "initialize"
            && let Some(v) = value["result"]["protocolVersion"].as_str()
        {
            version = v.into();
        }
        output.write_all(&serde_json::to_vec(&value)?).await?;
        output.write_all(b"\n").await?;
        output.flush().await?;
    }
}
