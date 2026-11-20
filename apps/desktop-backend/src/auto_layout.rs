//! Headless layout for shared Workflow Tools. Only node positions are changed.
use crate::error::{Error, Result};
use serde_json::{Value, json};
use std::{
    collections::{BTreeSet, HashMap},
    sync::LazyLock,
};

static GEOMETRY: LazyLock<Value> = LazyLock::new(|| {
    serde_json::from_str(include_str!("../catalog/node-layout.json")).expect("node geometry")
});
fn size(key: &str) -> f64 {
    GEOMETRY[key].as_f64().expect("geometry number")
}
fn invalid(message: &str) -> Error {
    Error::Invalid(message.into())
}

fn declared_branches(node: &Value) -> Vec<String> {
    let mut ids = Vec::new();
    if node["type"] == "condition" {
        for condition in node["data"]["conditions"].as_array().into_iter().flatten() {
            let id = condition["key"]
                .as_str()
                .filter(|id| !id.is_empty())
                .unwrap_or("true")
                .to_owned();
            if !ids.contains(&id) {
                ids.push(id);
            }
        }
    } else {
        ids.extend(
            node["data"]["branches"]
                .as_array()
                .into_iter()
                .flatten()
                .filter_map(|b| b["id"].as_str().map(str::to_owned)),
        );
    }
    if node["type"] == "condition" || node["type"] == "control.switch" {
        ids.push("else".into());
    }
    ids
}
pub(crate) fn arrange(schema: &Value) -> Result<Value> {
    let mut result = schema.clone();
    let mut count = 0;
    scope(&mut result, 0, &mut count, false)?;
    Ok(result)
}
#[derive(Clone, Copy)]
struct BoxSize {
    width: f64,
    height: f64,
}
fn scope(graph: &mut Value, depth: usize, count: &mut usize, nested: bool) -> Result<BoxSize> {
    if depth > 32 {
        return Err(invalid("Auto layout supports at most 32 nested scopes"));
    }
    let edges = graph["edges"].as_array().cloned().unwrap_or_default();
    let nodes = graph["nodes"]
        .as_array_mut()
        .ok_or_else(|| invalid("Auto layout requires a nodes array"))?;
    *count += nodes.len();
    if *count > 10000 {
        return Err(invalid("Auto layout supports at most 10000 nodes"));
    }
    let mut indices = HashMap::new();
    for (i, node) in nodes.iter().enumerate() {
        let id = node["id"]
            .as_str()
            .filter(|id| !id.is_empty())
            .ok_or_else(|| invalid("Auto layout requires nonempty node IDs"))?;
        if indices.insert(id.to_owned(), i).is_some() {
            return Err(invalid(
                "Auto layout requires unique node IDs within each scope",
            ));
        }
    }
    let mut outgoing = vec![vec![]; nodes.len()];
    let mut incoming = vec![vec![]; nodes.len()];
    for edge in &edges {
        // Incomplete drafts may retain dangling edges; layout never deletes them.
        let (Some(&a), Some(&b)) = (
            edge["sourceNodeID"].as_str().and_then(|id| indices.get(id)),
            edge["targetNodeID"].as_str().and_then(|id| indices.get(id)),
        ) else {
            continue;
        };
        if a == b {
            continue;
        }
        let port = edge["sourcePortID"].as_str().unwrap_or("");
        let slot = declared_branches(&nodes[a])
            .iter()
            .position(|id| id == port)
            .unwrap_or(match port {
                "true" => 0,
                "false" => 1,
                "else" => usize::MAX / 2,
                _ => 0,
            });
        outgoing[a].push((b, slot));
        incoming[b].push((a, slot));
    }
    let rows: Vec<_> = nodes
        .iter()
        .map(|node| {
            if matches!(
                node["type"].as_str(),
                Some("control.join" | "control.merge-branches")
            ) {
                node["data"]["forkId"]
                    .as_str()
                    .and_then(|id| indices.get(id))
                    .map_or(1, |&index| declared_branches(&nodes[index]).len())
            } else {
                declared_branches(node).len()
            }
        })
        .collect();
    let mut sizes = Vec::new();
    for (i, node) in nodes.iter_mut().enumerate() {
        let kind = node["type"].as_str().unwrap_or_default().to_owned();
        let mut bounds = match kind.as_str() {
            "start" | "end" => BoxSize {
                width: size("boundaryWidth"),
                height: size("boundaryHeight"),
            },
            "block-start" | "block-end" | "control.break" | "control.continue" => BoxSize {
                width: size("controlWidth"),
                height: size("controlHeight"),
            },
            "condition"
            | "control.switch"
            | "control.parallel"
            | "control.join"
            | "control.merge-branches" => {
                let ports = rows[i].max(incoming[i].len()).max(outgoing[i].len()).max(1);
                BoxSize {
                    width: size("routeWidth"),
                    height: size("rowTop") + ports as f64 * size("rowHeight") + size("rowBottom"),
                }
            }
            "loop" | "control.repeat" => BoxSize {
                width: size("containerWidth"),
                height: size("containerHeight"),
            },
            _ => BoxSize {
                width: size("width"),
                height: size("height"),
            },
        };
        if node["blocks"].is_array() {
            let mut body = json!({"nodes":node["blocks"].take(),"edges":node["edges"]});
            let child = scope(&mut body, depth + 1, count, true)?;
            node["blocks"] = body["nodes"].take();
            bounds.width = bounds.width.max(child.width + size("containerSide"));
            bounds.height = bounds.height.max(child.height + size("containerBottom"));
        }
        sizes.push(bounds);
    }
    let n = nodes.len();
    let mut ranks = vec![0usize; n];
    let mut pending: Vec<_> = incoming.iter().map(Vec::len).collect();
    let mut done = vec![false; n];
    let mut queue: BTreeSet<_> = (0..n)
        .map(|i| {
            (
                pending[i],
                nodes[i]["id"].as_str().unwrap_or_default().to_owned(),
                i,
            )
        })
        .collect();
    // Kahn ranking, with deterministic feedback-edge handling for cyclic drafts.
    for _ in 0..n {
        let (_, _, next) = queue.pop_first().expect("unranked node");
        done[next] = true;
        for &(target, _) in &outgoing[next] {
            if !done[target] {
                let id = nodes[target]["id"].as_str().unwrap_or_default().to_owned();
                queue.remove(&(pending[target], id.clone(), target));
                ranks[target] = ranks[target].max(ranks[next] + 1);
                pending[target] = pending[target].saturating_sub(1);
                queue.insert((pending[target], id, target));
            }
        }
    }
    let mut layers = vec![vec![]; ranks.iter().max().map_or(0, |rank| rank + 1)];
    for (i, &rank) in ranks.iter().enumerate() {
        layers[rank].push(i);
    }
    let mut order = vec![0.0; n];
    for layer in &mut layers {
        layer.sort_by_key(|&i| nodes[i]["id"].as_str().unwrap_or_default());
        for (slot, &i) in layer.iter().enumerate() {
            order[i] = slot as f64;
        }
    }
    // Barycentric sweeps reduce branch crossings while preserving declared port order.
    for pass in 0..6 {
        let forward = pass % 2 == 0;
        let visits: Vec<_> = if forward {
            (0..layers.len()).collect()
        } else {
            (0..layers.len()).rev().collect()
        };
        for rank in visits {
            let score = |i: usize| {
                let peers = if forward { &incoming[i] } else { &outgoing[i] };
                let valid: Vec<_> = peers
                    .iter()
                    .filter(|&&(j, _)| {
                        if forward {
                            ranks[j] < rank
                        } else {
                            ranks[j] > rank
                        }
                    })
                    .collect();
                if valid.is_empty() {
                    order[i]
                } else {
                    valid
                        .iter()
                        .map(|&&(j, slot)| {
                            order[j]
                                + if forward {
                                    (slot.min(1024) as f64) / 2048.0
                                } else {
                                    0.0
                                }
                        })
                        .sum::<f64>()
                        / valid.len() as f64
                }
            };
            layers[rank].sort_by(|&a, &b| {
                score(a)
                    .total_cmp(&score(b))
                    .then_with(|| order[a].total_cmp(&order[b]))
                    .then_with(|| nodes[a]["id"].as_str().cmp(&nodes[b]["id"].as_str()))
            });
            for (slot, &i) in layers[rank].iter().enumerate() {
                order[i] = slot as f64;
            }
        }
    }
    let heights: Vec<f64> = layers
        .iter()
        .map(|layer| {
            layer.iter().map(|&i| sizes[i].height).sum::<f64>()
                + layer.len().saturating_sub(1) as f64 * size("nodeGap")
        })
        .collect();
    let max_height = heights.iter().copied().fold(0.0, f64::max);
    let mut x = if nested { size("containerSide") } else { 60.0 };
    let top = if nested { size("containerTop") } else { 60.0 };
    let mut right = x;
    for (rank, layer) in layers.iter().enumerate() {
        let width = layer.iter().map(|&i| sizes[i].width).fold(0.0, f64::max);
        let mut y = top + (max_height - heights[rank]) / 2.0;
        for &i in layer {
            if !nodes[i]["meta"].is_object() {
                nodes[i]["meta"] = json!({});
            }
            nodes[i]["meta"]["position"] = json!({"x":x,"y":y});
            y += sizes[i].height + size("nodeGap");
        }
        right = x + width;
        x += width + size("rankGap");
    }
    Ok(BoxSize {
        width: right,
        height: top + max_height,
    })
}

#[cfg(test)]
mod tests;
