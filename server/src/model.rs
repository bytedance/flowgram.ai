use serde::{Deserialize, Serialize};
use serde_json::Value;
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
#[serde(rename_all = "camelCase")]
pub struct Project {
    pub id: String,
    pub name: String,
    pub created_at: String,
    pub directory: String,
}
#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
#[serde(rename_all = "camelCase")]
pub struct Session {
    pub id: String,
    pub project_id: String,
    pub title: String,
    pub status: String,
    pub created_at: String,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Workflow {
    pub id: String,
    pub project_id: String,
    pub name: String,
    pub revision: i64,
    pub schema: Value,
    pub updated_at: String,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Run {
    pub id: String,
    pub workflow_id: String,
    pub session_id: Option<String>,
    pub status: String,
    pub inputs: Value,
    pub outputs: Value,
    pub error: Option<String>,
    pub revision: i64,
    pub created_at: String,
    pub test_node_id: Option<String>,
}
#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
#[serde(rename_all = "camelCase")]
pub struct Event {
    pub sequence: i64,
    pub kind: String,
    pub object_id: String,
    pub data: String,
    pub created_at: String,
}
#[derive(Debug, Clone, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct ModelConfig {
    pub base_url: String,
    pub model: String,
    #[serde(default)]
    pub api_key: String,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Node {
    pub id: String,
    #[serde(rename = "type")]
    pub kind: String,
    #[serde(default)]
    pub data: Value,
    #[serde(default)]
    pub blocks: Vec<Node>,
    #[serde(default)]
    pub edges: Vec<Edge>,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Edge {
    #[serde(rename = "sourceNodeID")]
    pub source: String,
    #[serde(rename = "targetNodeID")]
    pub target: String,
    #[serde(rename = "sourcePortID")]
    pub port: Option<String>,
    #[serde(
        rename = "targetPortID",
        default,
        skip_serializing_if = "Option::is_none"
    )]
    pub target_port: Option<String>,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Graph {
    pub nodes: Vec<Node>,
    pub edges: Vec<Edge>,
}
