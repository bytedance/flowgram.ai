//! Apply inverse changes against current values, preserving independent later edits.
use super::graph::failure;
use crate::error::Result;
use serde_json::{Value, json};
use std::collections::{BTreeMap, BTreeSet};
fn identity(value: &Value, field: &str) -> Option<String> {
    match field {
        "$scalar" => value.as_str().map(str::to_owned),
        "$edge" if value["sourceNodeID"].is_string() && value["targetNodeID"].is_string() => Some(
            json!([
                value["sourceNodeID"],
                value["sourcePortID"].as_str().unwrap_or(""),
                value["targetNodeID"],
                value["targetPortID"].as_str().unwrap_or("")
            ])
            .to_string(),
        ),
        _ => value[field].as_str().map(str::to_owned),
    }
}
pub(super) fn inverse(
    before: Option<&Value>,
    after: Option<&Value>,
    current: Option<&Value>,
    path: &str,
) -> Result<Option<Value>> {
    if before == after {
        return Ok(current.cloned());
    }
    if current == after {
        return Ok(before.cloned());
    }
    if let (Some(a), Some(b), Some(c)) = (
        before.and_then(Value::as_object),
        after.and_then(Value::as_object),
        current.and_then(Value::as_object),
    ) {
        let mut result = c.clone();
        let keys: BTreeSet<_> = a.keys().chain(b.keys()).collect();
        for key in keys {
            match inverse(
                a.get(key),
                b.get(key),
                c.get(key),
                &format!("{path}/{}", super::graph::escape(key)),
            )? {
                Some(value) => {
                    result.insert(key.clone(), value);
                }
                None => {
                    result.remove(key);
                }
            }
        }
        return Ok(Some(json!(result)));
    }
    if let (Some(a), Some(b), Some(c)) = (
        before.and_then(Value::as_array),
        after.and_then(Value::as_array),
        current.and_then(Value::as_array),
    ) && let Some(field) = ["id", "key", "name", "$scalar", "$edge"]
        .into_iter()
        .find(|key| {
            a.iter()
                .chain(b)
                .chain(c)
                .all(|v| identity(v, key).is_some())
        })
    {
        let map = |values: &[Value]| -> BTreeMap<String, Value> {
            values
                .iter()
                .map(|v| (identity(v, field).unwrap(), v.clone()))
                .collect()
        };
        let (left, right, latest) = (map(a), map(b), map(c));
        if left.len() == a.len() && right.len() == b.len() && latest.len() == c.len() {
            let mut merged = latest.clone();
            for key in left.keys().chain(right.keys()).collect::<BTreeSet<_>>() {
                match inverse(
                    left.get(key),
                    right.get(key),
                    latest.get(key),
                    &format!("{path}/{}", super::graph::escape(key)),
                )? {
                    Some(value) => {
                        merged.insert(key.clone(), value);
                    }
                    None => {
                        merged.remove(key);
                    }
                }
            }
            let ids = |values: &[Value]| -> Vec<String> {
                values.iter().map(|v| identity(v, field).unwrap()).collect()
            };
            let (original, edited, latest) = (ids(a), ids(b), ids(c));
            let common = |ids: &[String]| -> Vec<String> {
                ids.iter()
                    .filter(|id| left.contains_key(*id) && right.contains_key(*id))
                    .cloned()
                    .collect()
            };
            let reordered = common(&original) != common(&edited);
            if reordered && latest != edited {
                return Err(failure(
                    "REVERT_CONFLICT",
                    format!("A later edit overlaps {path}/order"),
                ));
            }
            let mut order = if reordered { original.clone() } else { latest };
            order.retain(|id| merged.contains_key(id));
            // Restore deleted rows beside surviving original anchors, while keeping
            // later insertions and edits in their current relative order.
            for (index, key) in original.iter().enumerate() {
                if merged.contains_key(key) && !order.contains(key) {
                    let next = original[index + 1..]
                        .iter()
                        .find_map(|id| order.iter().position(|v| v == id));
                    let previous = original[..index]
                        .iter()
                        .rev()
                        .find_map(|id| order.iter().position(|v| v == id).map(|i| i + 1));
                    order.insert(next.or(previous).unwrap_or(order.len()), key.clone());
                }
            }
            return Ok(Some(json!(
                order
                    .iter()
                    .filter_map(|id| merged.get(id))
                    .collect::<Vec<_>>()
            )));
        }
    }
    Err(failure(
        "REVERT_CONFLICT",
        format!("A later edit overlaps {path}"),
    ))
}
