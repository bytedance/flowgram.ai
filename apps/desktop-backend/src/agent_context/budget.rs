use crate::{
    error::{Error, Result},
    models::Resolved,
};
use serde::{Deserialize, Serialize};
use serde_json::Value;

pub(super) const DEFAULT_WINDOW: u64 = 32_768;

/// A conservative, provider-neutral estimate. CJK text is not treated as ASCII.
pub(super) fn text_tokens(text: &str) -> u64 {
    let ascii = text.bytes().filter(u8::is_ascii).count() as u64;
    ascii.div_ceil(3) + text.chars().filter(|c| !c.is_ascii()).count() as u64 * 2
}
pub(super) fn tokens(value: &Value) -> u64 {
    text_tokens(&value.to_string())
}

#[derive(Clone, Copy, Default)]
pub(super) struct Budget {
    pub separate_cache_tokens: bool,
    pub window: u64,
    pub configured: Option<u32>,
    pub reserve: u64,
    pub limit: u64,
    pub fixed: u64,
    pub summary_output: u64,
}
impl Budget {
    pub fn new(model: &Resolved, instructions: &str, tools: &Value) -> Result<Self> {
        let window = model
            .context_window
            .map(u64::from)
            .unwrap_or(DEFAULT_WINDOW);
        let reserve = u64::from(model.parameters.max_output_tokens.unwrap_or(0))
            .max((window / 4).min(16_384));
        let margin = (window / 20).clamp(256, 8192);
        let limit = (window * 85 / 100).min(window.saturating_sub(reserve + margin));
        let fixed = text_tokens(instructions) + tokens(tools) + 128;
        if limit <= fixed + 512 {
            return Err(Error::Invalid("The model context window cannot fit its instructions, tools and output reserve. Increase the context window or reduce the output token limit in Settings".into()));
        }
        Ok(Self {
            separate_cache_tokens: model.protocol == crate::models::Protocol::Anthropic,
            window,
            configured: model.context_window,
            reserve,
            limit,
            fixed,
            summary_output: (window / 8).clamp(256, 4096).min((limit - fixed) / 3),
        })
    }
    pub fn payload_limit(&self) -> u64 {
        self.limit - self.fixed
    }
}

#[derive(Clone, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct ContextUsage {
    pub revision: u64,
    pub model_id: String,
    pub input_tokens: u64,
    pub context_window: Option<u32>,
    pub effective_window: u64,
    pub auto_compact_token_limit: u64,
    pub output_reserve: u64,
    pub source: String,
    pub status: String,
    pub compactions: u32,
}
