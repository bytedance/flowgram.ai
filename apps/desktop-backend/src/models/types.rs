use crate::error::{Error, Result};
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "kebab-case")]
pub enum Protocol {
    Responses,
    ChatCompletions,
    Anthropic,
}
#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Parameters {
    pub temperature: Option<f64>,
    pub top_p: Option<f64>,
    pub max_output_tokens: Option<u32>,
    pub reasoning_effort: Option<String>,
    pub output_schema: Option<Value>,
}
impl Parameters {
    pub fn merged(&self, other: &Self) -> Self {
        Self {
            temperature: other.temperature.or(self.temperature),
            top_p: other.top_p.or(self.top_p),
            max_output_tokens: other.max_output_tokens.or(self.max_output_tokens),
            reasoning_effort: other
                .reasoning_effort
                .clone()
                .or_else(|| self.reasoning_effort.clone()),
            output_schema: other
                .output_schema
                .clone()
                .or_else(|| self.output_schema.clone()),
        }
    }
    pub fn validate(&self, capabilities: &Capabilities, protocol: Protocol) -> Result<()> {
        if self
            .temperature
            .is_some_and(|v| !v.is_finite() || !(0.0..=2.0).contains(&v))
            || self
                .top_p
                .is_some_and(|v| !v.is_finite() || !(0.0..=1.0).contains(&v))
            || self.max_output_tokens.is_some_and(|v| v == 0 || v > 262144)
        {
            return Err(Error::Invalid(
                "Model parameters are outside the supported range".into(),
            ));
        }
        if (self.temperature.is_some() || self.top_p.is_some())
            && capabilities.temperature != Some(true)
        {
            return Err(Error::Invalid(
                "Temperature is not supported by this model".into(),
            ));
        }
        if protocol == Protocol::Anthropic && self.temperature.is_some_and(|t| t > 1.0) {
            return Err(Error::Invalid(
                "Anthropic temperature must be between 0 and 1".into(),
            ));
        }
        if let Some(effort) = &self.reasoning_effort
            && (!capabilities.reasoning_efforts.contains(effort) || protocol == Protocol::Anthropic)
        {
            return Err(Error::Invalid(
                "This reasoning effort is not supported by this model and protocol".into(),
            ));
        }
        if let Some(schema) = &self.output_schema {
            if capabilities.structured_output != Some(true) || !schema.is_object() {
                return Err(Error::Invalid(
                    "Structured output is not supported or its schema is invalid".into(),
                ));
            }
            jsonschema::validator_for(schema)
                .map_err(|_| Error::Invalid("Invalid model output JSON schema".into()))?;
        }
        Ok(())
    }
}
#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Capabilities {
    pub streaming: Option<bool>,
    pub tools: Option<bool>,
    pub structured_output: Option<bool>,
    pub temperature: Option<bool>,
    #[serde(default)]
    pub reasoning_efforts: Vec<String>,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Connection {
    #[serde(default)]
    pub id: String,
    pub name: String,
    pub provider: String,
    pub protocol: Protocol,
    pub base_url: String,
    pub credential_id: Option<String>,
    pub enabled: bool,
    #[serde(default = "timeout")]
    pub timeout_ms: u64,
    #[serde(default)]
    pub revision: i64,
    #[serde(default)]
    pub updated_at: String,
}
fn timeout() -> u64 {
    180_000
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Entry {
    #[serde(default)]
    pub id: String,
    pub connection_id: String,
    pub name: String,
    pub model_id: String,
    pub enabled: bool,
    #[serde(default)]
    pub capabilities: Capabilities,
    pub context_window: Option<u32>,
    #[serde(default)]
    pub parameters: Parameters,
    #[serde(default)]
    pub revision: i64,
    #[serde(default)]
    pub updated_at: String,
}
#[derive(Debug, Clone, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Defaults {
    pub chat: Option<String>,
    pub workflow: Option<String>,
    #[serde(default)]
    pub revision: i64,
}
#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Selection {
    pub model_id: Option<String>,
    #[serde(default)]
    pub parameters: Parameters,
}
/// Non-secret execution snapshot. Credentials are resolved with current authorization at call time.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Resolved {
    pub model_id: String,
    pub model_name: String,
    pub upstream_model: String,
    pub model_revision: i64,
    pub connection_id: String,
    pub connection_name: String,
    pub connection_revision: i64,
    pub protocol: Protocol,
    pub base_url: String,
    pub credential_id: Option<String>,
    pub timeout_ms: u64,
    #[serde(default)]
    pub context_window: Option<u32>,
    pub capabilities: Capabilities,
    pub parameters: Parameters,
    pub project_id: String,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Verification {
    pub streaming: Option<bool>,
    pub checked_at: String,
    pub connection_revision: i64,
    pub model_revision: i64,
    pub credential_revision: Option<String>,
    pub success: bool,
    pub tools: Option<bool>,
    pub message: String,
    pub elapsed_ms: u64,
}
