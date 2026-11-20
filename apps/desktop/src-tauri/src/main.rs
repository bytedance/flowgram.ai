#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod owned_process;

use owned_process::OwnedProcess;
use serde::Serialize;
use std::{
    path::PathBuf,
    process::{Command, Stdio},
    sync::Mutex,
    time::Duration,
};
use tauri::Manager;

#[derive(Clone, Serialize)]
struct Connection {
    endpoint: String,
    token: String,
}
struct Backend {
    child: Mutex<Option<OwnedProcess>>,
    connection: Connection,
}
impl Drop for Backend {
    fn drop(&mut self) {
        if let Ok(child) = self.child.get_mut()
            && let Some(process) = child.take()
        {
            drop(process);
        }
    }
}
#[tauri::command]
fn backend_connection(backend: tauri::State<'_, Backend>) -> Connection {
    backend.connection.clone()
}
fn start_backend(app: &tauri::App) -> Result<Backend, Box<dyn std::error::Error>> {
    let dir = std::env::var_os("FLOWGRAM_DATA_DIR")
        .map(PathBuf::from)
        .map(Ok)
        .unwrap_or_else(|| app.path().app_data_dir())?;
    std::fs::create_dir_all(&dir)?;
    let executable = std::env::current_exe()?
        .parent()
        .ok_or("Application executable directory is unavailable")?
        .join(if cfg!(windows) {
            "flowgram-server.exe"
        } else {
            "flowgram-server"
        });
    let connection_file = dir.join("connection.json");
    if connection_file.exists() {
        std::fs::remove_file(&connection_file)?;
    }
    let log = std::fs::OpenOptions::new()
        .create(true)
        .append(true)
        .open(dir.join("backend.log"))?;
    let mut command = Command::new(executable);
    command
        .env("FLOWGRAM_DATA_DIR", &dir)
        .env("FLOWGRAM_PORT", "0")
        .stdin(Stdio::null())
        .stdout(Stdio::null())
        .stderr(Stdio::from(log));
    let mut child = OwnedProcess::spawn(&mut command)?;
    // Wait only for metadata written by this owned process.
    for _ in 0..100 {
        if let Some(status) = child.try_wait()? {
            return Err(format!("FlowGram backend exited: {status}").into());
        }
        if let Ok(bytes) = std::fs::read(&connection_file)
            && let Ok(value) = serde_json::from_slice::<serde_json::Value>(&bytes)
            && let (Some(endpoint), Some(token)) =
                (value["endpoint"].as_str(), value["token"].as_str())
        {
            let address = endpoint.trim_start_matches("http://");
            if std::net::TcpStream::connect_timeout(&address.parse()?, Duration::from_millis(100))
                .is_ok()
            {
                return Ok(Backend {
                    child: Mutex::new(Some(child)),
                    connection: Connection {
                        endpoint: endpoint.into(),
                        token: token.into(),
                    },
                });
            }
        }
        std::thread::sleep(Duration::from_millis(100));
    }
    Err("FlowGram backend did not become ready".into())
}
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _, _| {
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.unminimize();
                let _ = window.show();
                let _ = window.set_focus();
            }
        }))
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            #[cfg(windows)]
            if let Some(window) = app.get_webview_window("main")
                && let Ok(Some(monitor)) = window.current_monitor()
                && let Ok(size) = window.outer_size()
                && (size.width > monitor.work_area().size.width
                    || size.height > monitor.work_area().size.height)
            {
                // High-DPI or small displays must keep the footer and window controls reachable.
                window.maximize()?;
            }
            let backend = start_backend(app)?;
            app.manage(backend);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![backend_connection])
        .build(tauri::generate_context!())
        .expect("Unable to start FlowGram")
        .run(|app, event| {
            if matches!(event, tauri::RunEvent::Exit) {
                let backend = app.state::<Backend>();
                if let Ok(mut child) = backend.child.lock()
                    && let Some(process) = child.take()
                {
                    drop(process);
                }
            }
        });
}
