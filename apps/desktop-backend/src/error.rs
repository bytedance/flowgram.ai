use axum::{
    Json,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde_json::json;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("{}", .0["message"].as_str().unwrap_or("Tool operation failed"))]
    Tool(serde_json::Value),
    #[error("{0}")]
    Invalid(String),
    #[error("{0}")]
    NotFound(String),
    #[error("The workflow was updated by another operation. Reload it before editing")]
    Conflict,
    #[error("{0}")]
    ConversationConflict(String),
    #[error("{0}")]
    Execution(String),
    #[error("{0}")]
    ContextLength(String),
    #[error("Model response {status} ({code}). No unfinished tool calls were executed")]
    ModelResponse { status: String, code: String },
    #[error("{message}")]
    Service {
        status: u16,
        code: &'static str,
        message: String,
    },
    #[error("Run canceled")]
    Cancelled,
    #[error("{0}")]
    Storage(#[from] sqlx::Error),
    #[error("{0}")]
    Json(#[from] serde_json::Error),
    #[error("{0}")]
    Io(#[from] std::io::Error),
}
pub type Result<T> = std::result::Result<T, Error>;
impl IntoResponse for Error {
    fn into_response(self) -> Response {
        if let Self::Tool(value) = &self {
            return (
                StatusCode::UNPROCESSABLE_ENTITY,
                Json(json!({"ok":false,"error":value})),
            )
                .into_response();
        }
        let (status, code) = match &self {
            Self::Service { status, code, .. } => (
                StatusCode::from_u16(*status).unwrap_or(StatusCode::INTERNAL_SERVER_ERROR),
                *code,
            ),
            Self::Tool(_) | Self::Invalid(_) | Self::Json(_) => {
                (StatusCode::BAD_REQUEST, "invalid_input")
            }
            Self::NotFound(_) => (StatusCode::NOT_FOUND, "not_found"),
            Self::Conflict => (StatusCode::CONFLICT, "revision_conflict"),
            Self::ConversationConflict(_) => (StatusCode::CONFLICT, "conversation_conflict"),
            Self::Storage(_) | Self::Io(_) => (StatusCode::INTERNAL_SERVER_ERROR, "internal_error"),
            _ => (StatusCode::UNPROCESSABLE_ENTITY, "execution_error"),
        };
        let message = if status == StatusCode::INTERNAL_SERVER_ERROR {
            eprintln!("{self}");
            "Local storage is temporarily unavailable".to_owned()
        } else {
            self.to_string()
        };
        (
            status,
            Json(json!({"error": {"code":code,"message":message}})),
        )
            .into_response()
    }
}

impl Error {
    pub fn tool_value(&self) -> serde_json::Value {
        let value = match self {
            Self::Tool(value) => value.clone(),
            Self::Conflict => {
                json!({"code":"REVISION_CONFLICT","message":self.to_string(),"recovery":{"tool":"read_workflow"}})
            }
            Self::NotFound(_) => json!({"code":"NOT_FOUND","message":self.to_string()}),
            Self::Storage(_) | Self::Io(_) => {
                json!({"code":"STORAGE_UNAVAILABLE","message":"Storage is temporarily unavailable. Query the mutation receipt before retrying."})
            }
            _ => json!({"code":"INVALID_ARGUMENT","message":self.to_string()}),
        };
        json!({"ok":false,"error":value})
    }
}
