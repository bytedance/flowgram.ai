use flowgram_desktop_backend::registry::{self, Registry};
use serde_json::json;
use std::{env, path::PathBuf};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let data_dir = env::var_os("FLOWGRAM_DATA_DIR")
        .map(PathBuf::from)
        .unwrap_or_else(|| {
            #[cfg(windows)]
            {
                env::var_os("APPDATA")
                    .map(PathBuf::from)
                    .unwrap_or_else(|| {
                        env::var_os("USERPROFILE")
                            .map(PathBuf::from)
                            .unwrap_or_else(env::temp_dir)
                            .join("AppData/Roaming")
                    })
                    .join("ai.flowgram.desktop")
            }
            #[cfg(not(windows))]
            {
                let home = env::var_os("HOME")
                    .map(PathBuf::from)
                    .unwrap_or_else(env::temp_dir);
                #[cfg(target_os = "macos")]
                {
                    home.join("Library/Application Support/FlowGram")
                }
                #[cfg(not(target_os = "macos"))]
                {
                    home.join(".local/share/flowgram")
                }
            }
        });
    std::fs::create_dir_all(&data_dir)?;
    let lock = std::fs::OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .truncate(false)
        .open(data_dir.join("server.lock"))?;
    fs2::FileExt::try_lock_exclusive(&lock)
        .map_err(|_| "FlowGram data directory is already in use")?;
    let registry = Registry::open(&data_dir).await?;
    let token =
        env::var("FLOWGRAM_AUTH_TOKEN").unwrap_or_else(|_| uuid::Uuid::new_v4().to_string());
    let listener = tokio::net::TcpListener::bind((
        "127.0.0.1",
        env::var("FLOWGRAM_PORT")
            .ok()
            .and_then(|s| s.parse::<u16>().ok())
            .unwrap_or(18789),
    ))
    .await?;
    let endpoint = format!("http://{}", listener.local_addr()?);
    let path = data_dir.join("connection.json");
    let content = serde_json::to_vec(&json!({"endpoint":endpoint,"token":token}))?;
    #[cfg(unix)]
    {
        use std::io::Write;
        use std::os::unix::fs::OpenOptionsExt;
        let mut f = std::fs::OpenOptions::new()
            .write(true)
            .create(true)
            .truncate(true)
            .mode(0o600)
            .open(path)?;
        f.write_all(&content)?;
    }
    #[cfg(not(unix))]
    tokio::fs::write(path, content).await?;
    eprintln!("FlowGram backend ready at {endpoint}");
    axum::serve(listener, registry::router(registry, token))
        .with_graceful_shutdown(async {
            let _ = tokio::signal::ctrl_c().await;
        })
        .await?;
    Ok(())
}
