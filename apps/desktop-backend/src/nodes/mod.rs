//! Pure workflow capabilities. The same catalog is consumed by the desktop UI and MCP discovery.
mod data;
mod lists;
mod paths;
mod text;
mod values;
pub use data::schema_issues;
pub use lists::predicate;

use crate::{
    error::{Error, Result},
    model::Node,
    runtime::Values,
};
use serde_json::{Value, json};
use std::sync::LazyLock;

pub const MAX_ITEMS: usize = 10_000;
pub const MAX_BYTES: usize = 2_000_000;
pub static CATALOG: LazyLock<Vec<Value>> = LazyLock::new(|| {
    serde_json::from_str(include_str!("../../catalog/atomic-nodes.json"))
        .expect("valid embedded node catalog")
});
pub fn definition(kind: &str) -> Option<&'static Value> {
    CATALOG.iter().find(|node| node["type"] == kind)
}
pub fn supported(kind: &str) -> bool {
    definition(kind).is_some()
}
pub fn invalid(message: impl Into<String>) -> Error {
    Error::Invalid(message.into())
}
pub fn required<'a>(input: &'a Value, key: &str) -> Result<&'a Value> {
    input
        .get(key)
        .ok_or_else(|| invalid(format!("{key}: required value is missing")))
}
pub fn string<'a>(input: &'a Value, key: &str) -> Result<&'a str> {
    required(input, key)?
        .as_str()
        .ok_or_else(|| invalid(format!("{key}: text is required")))
}
pub fn option<'a>(input: &'a Value, key: &str, default: &'a str) -> &'a str {
    input[key].as_str().unwrap_or(default)
}
pub fn array<'a>(input: &'a Value, key: &str) -> Result<&'a Vec<Value>> {
    let items = required(input, key)?
        .as_array()
        .ok_or_else(|| invalid(format!("{key}: a list is required")))?;
    if items.len() > MAX_ITEMS {
        return Err(invalid(format!(
            "{key}: at most {MAX_ITEMS} items are allowed"
        )));
    }
    Ok(items)
}
pub fn number(input: &Value, key: &str) -> Result<f64> {
    required(input, key)?
        .as_f64()
        .filter(|v| v.is_finite())
        .ok_or_else(|| invalid(format!("{key}: a finite number is required")))
}
pub fn usize_value(input: &Value, key: &str, default: usize) -> Result<usize> {
    match input.get(key) {
        None => Ok(default),
        Some(v) => v
            .as_u64()
            .and_then(|n| usize::try_from(n).ok())
            .ok_or_else(|| invalid(format!("{key}: a non-negative integer is required"))),
    }
}
pub fn finite(value: f64) -> Result<Value> {
    if !value.is_finite() {
        return Err(invalid("Numeric overflow; result is not finite"));
    }
    Ok(json!(value))
}
pub fn check_size(value: &Value) -> Result<()> {
    if serde_json::to_vec(value)?.len() > MAX_BYTES {
        return Err(invalid("Node data exceeded 2 MB"));
    }
    Ok(())
}
pub fn fields<'a>(kind: &'a str, data: &'a Value) -> impl Iterator<Item = &'static Value> + 'a {
    definition(kind)
        .into_iter()
        .flat_map(|d| d["fields"].as_array().into_iter().flatten())
        .filter(move |field| {
            if field.get("visible").is_none() {
                return true;
            }
            let name = field["visible"]["field"].as_str().unwrap_or_default();
            let supplied = data.pointer(&format!("/inputsValues/{name}/content"));
            let fallback = definition(kind)
                .and_then(|d| d.pointer(&format!("/defaults/inputsValues/{name}/content")));
            field["visible"]["values"]
                .as_array()
                .is_some_and(|allowed| supplied.or(fallback).is_some_and(|v| allowed.contains(v)))
        })
}
/// Resolve defaults and validate the actual values, including conditional required fields.
pub fn prepare(node: &Node, input: Value) -> Result<Value> {
    let spec = definition(&node.kind).ok_or_else(|| invalid("Node is not registered"))?;
    let mut merged = spec["defaults"]["inputsValues"]
        .as_object()
        .map(|fields| {
            fields
                .iter()
                .map(|(k, v)| (k.clone(), v["content"].clone()))
                .collect::<serde_json::Map<_, _>>()
        })
        .unwrap_or_default();
    let supplied = input
        .as_object()
        .ok_or_else(|| invalid("Node input must be an object"))?;
    if let Some(key) = supplied
        .keys()
        .find(|key| spec["inputSchema"]["properties"].get(*key).is_none())
    {
        return Err(invalid(format!(
            "{key}: this input field is not declared by the node"
        )));
    }
    merged.extend(supplied.clone());
    let mut data = if node.data.is_null() {
        json!({})
    } else {
        if !node.data.is_object() {
            return Err(invalid("Node data must be an object"));
        }
        node.data.clone()
    };
    data["inputsValues"] = Value::Object(
        merged
            .iter()
            .map(|(k, v)| (k.clone(), json!({"type":"constant","content":v})))
            .collect(),
    );
    let visible: Vec<_> = fields(&node.kind, &data).collect();
    let allowed: Vec<_> = visible
        .iter()
        .filter_map(|f| f["key"].as_str()?.strip_prefix("inputsValues."))
        .collect();
    merged.retain(|key, _| allowed.contains(&key.as_str()));
    for field in visible {
        let Some(key) = field["key"]
            .as_str()
            .and_then(|key| key.strip_prefix("inputsValues."))
        else {
            continue;
        };
        let Some(value) = merged.get_mut(key) else {
            if field["required"] == true {
                return Err(invalid(format!(
                    "{}: required value is missing",
                    field["label"].as_str().unwrap_or(key)
                )));
            }
            continue;
        };
        if field["type"] == "integer"
            && let Some(number) = value.as_f64()
            && number.fract() == 0.0
            && number.abs() <= 9_007_199_254_740_991.0
        {
            *value = json!(number as i64);
        }
        let valid = match field["type"].as_str().unwrap_or("any") {
            "string" => value.is_string(),
            "object" => value.is_object(),
            "array" => value.is_array(),
            "boolean" => value.is_boolean(),
            "integer" => value.as_i64().is_some() || value.as_u64().is_some(),
            "number" => value.is_number(),
            _ => true,
        };
        if !valid {
            return Err(invalid(format!(
                "{key}: type does not match the node definition"
            )));
        }
        if let Some(choices) = field["choices"].as_array()
            && !choices.iter().any(|c| c[0] == *value)
        {
            return Err(invalid(format!("{key}: unsupported option")));
        }
        if let Some(n) = value.as_f64()
            && (field["min"].as_f64().is_some_and(|min| n < min)
                || field["max"].as_f64().is_some_and(|max| n > max))
        {
            return Err(invalid(format!("{key}: outside the allowed range")));
        }
    }
    let result = Value::Object(merged);
    check_size(&result)?;
    Ok(result)
}
pub fn static_value<'a>(node: &'a Node, key: &str) -> &'a Value {
    node.data.get(key).unwrap_or_else(|| {
        definition(&node.kind)
            .and_then(|d| d["defaults"].get(key))
            .unwrap_or(&Value::Null)
    })
}
pub fn execute(node: &Node, input: Value, scope: &Values) -> Result<Value> {
    let input = prepare(node, input)?;
    let result = match node.kind.split('.').next().unwrap_or_default() {
        "data" => data::execute(node, &input, scope)?,
        "list" => lists::execute(node, &input, scope)?,
        "text" | "document" => text::execute(node, &input)?,
        "value" => values::execute(node, &input)?,
        _ => return Err(invalid("Node executor is not registered")),
    };
    check_size(&result)?;
    Ok(result)
}

/// Static choices cannot be replaced by per-test input or a variable binding.
pub fn check_static(node: &Node, input: Option<&Value>) -> Result<()> {
    if matches!(node.kind.as_str(), "llm" | "agent") {
        let selection: crate::models::Selection = serde_json::from_value(
            node.data
                .get("model")
                .cloned()
                .unwrap_or(serde_json::json!({})),
        )
        .map_err(|_| {
            invalid("Invalid model selection; use data.model.modelId and data.model.parameters")
        })?;
        if selection
            .model_id
            .as_ref()
            .is_some_and(|s| s.is_empty() || s.len() > 100)
        {
            return Err(invalid("Invalid model entry ID"));
        }
    }

    let Some(spec) = definition(&node.kind) else {
        return Ok(());
    };
    for field in spec["fields"]
        .as_array()
        .into_iter()
        .flatten()
        .filter(|f| f["editor"] == "select")
    {
        let key = field["key"]
            .as_str()
            .unwrap()
            .strip_prefix("inputsValues.")
            .unwrap();
        let configured = &node.data["inputsValues"][key];
        if !configured.is_null() && configured["type"] != "constant" {
            return Err(invalid(format!("{key}: operation settings must be static")));
        }
        let selected = configured
            .get("content")
            .or_else(|| field.get("defaultValue"))
            .unwrap_or(&Value::Null);
        if !field["choices"]
            .as_array()
            .is_some_and(|choices| choices.iter().any(|choice| &choice[0] == selected))
        {
            return Err(invalid(format!("{key}: unsupported operation setting")));
        }
        if input
            .and_then(|v| v.get(key))
            .is_some_and(|value| value != selected)
        {
            return Err(invalid(format!(
                "{key}: change operation settings in node configuration"
            )));
        }
    }
    Ok(())
}
