//! Structured control flow contracts and validation. No UI or canvas dependency.
use crate::{
    error::{Error, Result},
    model::{Edge, Graph, Node},
    runtime::{Values, resolve},
};
use serde_json::{Value, json};
use std::{
    collections::{HashMap, HashSet},
    sync::LazyLock,
};

pub static CATALOG: LazyLock<Vec<Value>> = LazyLock::new(|| {
    serde_json::from_str(include_str!("../catalog/control-nodes.json")).expect("control catalog")
});
pub fn definition(kind: &str) -> Option<&'static Value> {
    CATALOG.iter().find(|n| n["type"] == kind)
}
pub fn is_loop(kind: &str) -> bool {
    matches!(kind, "loop" | "control.repeat")
}
pub fn is_fork(kind: &str) -> bool {
    matches!(kind, "control.parallel" | "control.switch")
}
pub fn is_join(kind: &str) -> bool {
    matches!(kind, "control.join" | "control.merge-branches")
}
pub fn option<'a>(node: &'a Node, key: &str, fallback: &'a str) -> &'a str {
    node.data[key].as_str().unwrap_or(fallback)
}
pub fn integer(node: &Node, key: &str, default: usize, max: usize) -> Result<usize> {
    match node.data.get(key) {
        None => Ok(default),
        Some(v) => v
            .as_u64()
            .filter(|n| *n > 0 && *n <= max as u64)
            .map(|n| n as usize)
            .ok_or_else(|| {
                Error::Invalid(format!(
                    "{}.{key} must be an integer between 1 and {max}",
                    node.id
                ))
            }),
    }
}
pub fn branches(node: &Node) -> Vec<String> {
    let mut ids: Vec<_> = node.data["branches"]
        .as_array()
        .into_iter()
        .flatten()
        .filter_map(|v| v["id"].as_str().map(String::from))
        .collect();
    if node.kind == "control.switch" {
        ids.push("else".into());
    }
    ids
}
pub fn mapping(mapping: &Value, values: &Values) -> Result<Value> {
    let fields = mapping
        .as_object()
        .ok_or_else(|| Error::Invalid("Result mappings must be objects".into()))?;
    fields
        .iter()
        .map(|(k, v)| Ok((k.clone(), resolve(v, values)?)))
        .collect::<Result<serde_json::Map<_, _>>>()
        .map(Value::Object)
}
pub fn select(node: &Node, values: &Values) -> Result<Vec<String>> {
    if node.kind == "control.parallel" {
        return Ok(branches(node));
    }
    let mut selected = vec![];
    for branch in node.data["branches"]
        .as_array()
        .ok_or_else(|| Error::Invalid("Branch rules are missing".into()))?
    {
        if crate::nodes::predicate(&branch["predicate"], values, 0)? {
            selected.push(branch["id"].as_str().unwrap_or_default().into());
            if option(node, "mode", "first") == "first" {
                break;
            }
        }
    }
    if selected.is_empty() {
        selected.push("else".into());
    }
    Ok(selected)
}
#[derive(Clone, Debug)]
pub struct Region {
    pub fork: String,
    pub join: String,
    pub branches: HashMap<String, HashSet<String>>,
}
pub fn region(graph: &Graph, fork: &Node) -> Result<Region> {
    let join = option(fork, "joinId", "").to_string();
    let target = graph
        .nodes
        .iter()
        .find(|n| n.id == join)
        .ok_or_else(|| Error::Invalid(format!("{}: select the paired join", fork.id)))?;
    let exclusive = fork.kind == "control.switch" && option(fork, "mode", "first") == "first";
    if target.kind
        != if exclusive {
            "control.merge-branches"
        } else {
            "control.join"
        }
        || option(target, "forkId", "") != fork.id
    {
        return Err(Error::Invalid(format!(
            "{}: fork and join types or associations do not match",
            fork.id
        )));
    }
    let mut result = Region {
        fork: fork.id.clone(),
        join,
        branches: HashMap::new(),
    };
    for branch in branches(fork) {
        let outgoing: Vec<_> = graph
            .edges
            .iter()
            .filter(|e| e.source == fork.id && e.port.as_deref() == Some(&branch))
            .collect();
        if outgoing.len() != 1 {
            return Err(Error::Invalid(format!(
                "{}: output {branch} must connect to exactly one path",
                fork.id
            )));
        }
        let mut visited = HashSet::new();
        let mut stack = vec![outgoing[0]];
        let mut arrivals = 0;
        while let Some(edge) = stack.pop() {
            if edge.target == result.join {
                if edge.target_port.as_deref() != Some(&branch) {
                    return Err(Error::Invalid(format!(
                        "{}: branch {branch} must enter its corresponding join input",
                        fork.id
                    )));
                }
                arrivals += 1;
                continue;
            }
            if !visited.insert(edge.target.clone()) {
                continue;
            }
            let node = graph
                .nodes
                .iter()
                .find(|n| n.id == edge.target)
                .ok_or_else(|| Error::Invalid("Branch node does not exist".into()))?;
            let next: Vec<_> = graph.edges.iter().filter(|e| e.source == node.id).collect();
            if next.is_empty()
                && !matches!(node.kind.as_str(), "control.break" | "control.continue")
            {
                return Err(Error::Invalid(format!(
                    "{}: branch {branch} does not reach its paired join",
                    fork.id
                )));
            }
            stack.extend(next);
        }
        if arrivals == 0 && !exclusive {
            return Err(Error::Invalid(format!(
                "{}: parallel branches must reach the join",
                fork.id
            )));
        }
        if result
            .branches
            .values()
            .any(|set| !set.is_disjoint(&visited))
        {
            return Err(Error::Invalid(format!(
                "{}: branches intersect before their paired join",
                fork.id
            )));
        }
        result.branches.insert(branch, visited);
    }
    let union: HashSet<_> = result.branches.values().flatten().cloned().collect();
    for edge in &graph.edges {
        if union.contains(&edge.target) && !union.contains(&edge.source) && edge.source != fork.id {
            return Err(Error::Invalid(format!(
                "{}: external edges cannot enter a branch interior",
                fork.id
            )));
        }
        if edge.target == result.join && edge.source != fork.id && !union.contains(&edge.source) {
            return Err(Error::Invalid(format!(
                "{}: join inputs must belong to its scope",
                result.join
            )));
        }
    }
    Ok(result)
}
pub fn ports(node: &Node, graph: &Graph) -> (Vec<String>, Vec<String>) {
    let outputs = if is_fork(&node.kind) {
        branches(node)
    } else if node.kind == "condition" {
        let mut ports: Vec<_> = node.data["conditions"]
            .as_array()
            .into_iter()
            .flatten()
            .filter_map(|v| v["key"].as_str().map(String::from))
            .collect();
        ports.push("else".into());
        ports.sort();
        ports.dedup();
        ports
    } else if matches!(
        node.kind.as_str(),
        "end" | "block-end" | "control.break" | "control.continue"
    ) {
        vec![]
    } else {
        vec![String::new()]
    };
    let inputs = if is_join(&node.kind) {
        graph
            .nodes
            .iter()
            .find(|n| n.id == option(node, "forkId", ""))
            .map(branches)
            .unwrap_or_default()
    } else if matches!(node.kind.as_str(), "start" | "block-start") {
        vec![]
    } else {
        vec![String::new()]
    };
    (inputs, outputs)
}
fn refs(value: &Value, result: &mut HashSet<String>) {
    match value {
        Value::Object(o) if o.get("type") == Some(&json!("constant")) => {}
        Value::Object(o) if o.get("type") == Some(&json!("ref")) => {
            if let Some(s) = o.get("content").and_then(|v| v[0].as_str()) {
                result.insert(s.into());
            }
        }
        Value::Object(o) if o.get("type") == Some(&json!("template")) => {
            static PATTERN: LazyLock<regex::Regex> =
                LazyLock::new(|| regex::Regex::new(r"\{\{\s*([^\s.}]+)").unwrap());
            for m in PATTERN.captures_iter(o.get("content").and_then(Value::as_str).unwrap_or("")) {
                result.insert(m[1].into());
            }
        }
        Value::Object(o) => {
            for v in o.values() {
                refs(v, result);
            }
        }
        Value::Array(a) => {
            for v in a {
                refs(v, result);
            }
        }
        _ => {}
    }
}
pub fn dominators(graph: &Graph, entry: &str) -> HashMap<String, HashSet<String>> {
    let all: HashSet<_> = graph.nodes.iter().map(|n| n.id.clone()).collect();
    let mut dom: HashMap<_, _> = all
        .iter()
        .map(|id| {
            (
                id.clone(),
                if id == entry {
                    HashSet::from([id.clone()])
                } else {
                    all.clone()
                },
            )
        })
        .collect();
    for _ in 0..=graph.nodes.len() {
        let mut changed = false;
        for node in &graph.nodes {
            if node.id == entry {
                continue;
            }
            let parents: Vec<_> = graph
                .edges
                .iter()
                .filter(|e| e.target == node.id)
                .filter_map(|e| dom.get(&e.source))
                .collect();
            let mut next = parents.first().map(|s| (*s).clone()).unwrap_or_default();
            for set in parents.iter().skip(1) {
                next.retain(|id| set.contains(id));
            }
            next.insert(node.id.clone());
            if dom.get(&node.id) != Some(&next) {
                dom.insert(node.id.clone(), next);
                changed = true;
            }
        }
        if !changed {
            break;
        }
    }
    dom
}
pub fn validate(
    graph: &Graph,
    inherited: &HashSet<String>,
    loop_mode: Option<bool>,
    ids: &mut HashSet<String>,
    errors: &mut Vec<String>,
) {
    let regions: Vec<_> = graph
        .nodes
        .iter()
        .filter(|n| is_fork(&n.kind))
        .filter_map(|n| match region(graph, n) {
            Ok(r) => Some(r),
            Err(e) => {
                errors.push(e.to_string());
                None
            }
        })
        .collect();
    let entry = graph
        .nodes
        .iter()
        .find(|n| matches!(n.kind.as_str(), "start" | "block-start"))
        .map(|n| n.id.as_str())
        .unwrap_or("");
    let dom = dominators(graph, entry);
    for node in &graph.nodes {
        if !ids.insert(node.id.clone()) {
            errors.push(format!(
                "Node IDs must be unique throughout the workflow: {}",
                node.id
            ));
        }
        let (inputs, outputs) = ports(node, graph);
        for edge in graph.edges.iter().filter(|e| e.source == node.id) {
            if !outputs
                .iter()
                .any(|id| id == edge.port.as_deref().unwrap_or(""))
            {
                errors.push(format!("{}: output port does not exist", node.id));
            }
        }
        for edge in graph.edges.iter().filter(|e| e.target == node.id) {
            if !inputs
                .iter()
                .any(|id| id == edge.target_port.as_deref().unwrap_or(""))
            {
                errors.push(format!("{}: input port does not exist", node.id));
            }
        }
        for port in &outputs {
            let count = graph
                .edges
                .iter()
                .filter(|e| e.source == node.id && e.port.as_deref().unwrap_or("") == port)
                .count();
            if count > 1 {
                errors.push(format!(
                    "{}: an output can connect to only one path; use a parallel fork",
                    node.id
                ));
            }
            if count == 0 {
                errors.push(format!(
                    "{}: output {} is not connected",
                    node.id,
                    if port.is_empty() { "output" } else { port }
                ));
            }
        }
        if !is_join(&node.kind)
            && !matches!(node.kind.as_str(), "end" | "block-end")
            && graph.edges.iter().filter(|e| e.target == node.id).count() > 1
        {
            errors.push(format!(
                "{}: multiple incoming paths require an explicit merge or join",
                node.id
            ));
        }
        if is_fork(&node.kind) {
            let b = node.data["branches"].as_array();
            if b.is_none_or(|b| {
                b.len()
                    < if node.kind == "control.parallel" {
                        2
                    } else {
                        1
                    }
                    || b.len() > 32
            }) {
                errors.push(format!(
                    "{}: branch count must be between 1 and 32",
                    node.id
                ));
            }
            let mut seen = HashSet::new();
            for b in b.into_iter().flatten() {
                let id = b["id"].as_str().unwrap_or("");
                if id.is_empty() || id == "else" || !seen.insert(id) {
                    errors.push(format!(
                        "{}: branch IDs must be unique and cannot be else",
                        node.id
                    ));
                }
            }
            if node.kind == "control.switch"
                && !["first", "all"].contains(&option(node, "mode", "first"))
            {
                errors.push(format!("{}: invalid branch match mode", node.id));
            }
        }
        if is_join(&node.kind) && !regions.iter().any(|r| r.join == node.id) {
            errors.push(format!("{}: no paired fork exists", node.id));
        }
        if node.kind == "control.join" {
            if !["all", "first-success", "quorum"].contains(&option(node, "policy", "all"))
                || !["fail", "collect"].contains(&option(node, "errorMode", "fail"))
            {
                errors.push(format!("{}: invalid join policy", node.id));
            }
            if option(node, "policy", "all") == "quorum" {
                match integer(node, "quorum", 1, 32) {
                    Err(error) => errors.push(error.to_string()),
                    Ok(count)
                        if regions.iter().any(|region| {
                            region.join == node.id && count > region.branches.len()
                        }) =>
                    {
                        errors.push(format!(
                            "{}: Success quorum exceeds the number of branches",
                            node.id
                        ));
                    }
                    _ => {}
                }
            }
        }
        for (key, default, max) in [("concurrency", 4, 32), ("maxIterations", 20, 1000)] {
            if node.data.get(key).is_some()
                && let Err(e) = integer(node, key, default, max)
            {
                errors.push(e.to_string());
            }
        }
        if matches!(node.kind.as_str(), "control.break" | "control.continue")
            && (loop_mode != Some(false)
                || regions.iter().any(|r| {
                    r.branches.values().any(|s| s.contains(&node.id))
                        && graph
                            .nodes
                            .iter()
                            .find(|n| n.id == r.fork)
                            .is_some_and(|n| {
                                n.kind == "control.parallel" || option(n, "mode", "first") == "all"
                            })
                }))
        {
            errors.push(format!(
                "{}: control signals apply only to the nearest serial loop and cannot cross parallel branches",
                node.id
            ));
        }
        let mut visible = inherited.clone();
        visible.extend(
            dom.get(&node.id)
                .into_iter()
                .flatten()
                .filter(|id| *id != &node.id)
                .cloned(),
        );
        for r in &regions {
            let branch = r.branches.values().find(|s| s.contains(&node.id));
            for inner in r.branches.values().flatten() {
                if branch.is_none_or(|s| !s.contains(inner)) {
                    visible.remove(inner);
                }
            }
        }
        let mut data = node.data.clone();
        if let Some(o) = data.as_object_mut() {
            o.remove("loopOutputs");
            o.remove("stateUpdates");
            o.remove("mappings");
            o.remove("outputs");
            o.remove("stateSchema");
        }
        let mut references = HashSet::new();
        refs(&data, &mut references);
        // Pointwise list predicates use their own item/index binding scope.
        if crate::nodes::supported(&node.kind) {
            references.remove("item");
            references.remove("index");
        }
        if node.kind == "control.repeat" {
            references.remove("state");
            references.remove("index");
        }
        for reference in references {
            if !visible.contains(&reference) {
                errors.push(format!(
                    "{}: reference {reference} is unavailable in the current path or scope",
                    node.id
                ));
            }
        }
        if is_join(&node.kind)
            && let Some(r) = regions.iter().find(|r| r.join == node.id)
        {
            let fork = graph.nodes.iter().find(|n| n.id == r.fork).unwrap();
            let outer = dom.get(&fork.id).cloned().unwrap_or_default();
            for branch in branches(fork) {
                let mut allowed = inherited.clone();
                allowed.extend(outer.clone());
                let terminal_edges: Vec<_> = graph
                    .edges
                    .iter()
                    .filter(|e| e.target == r.join && e.target_port.as_deref() == Some(&branch))
                    .collect();
                if let Some(edge) = terminal_edges.first() {
                    allowed.extend(dom.get(&edge.source).cloned().unwrap_or_default());
                }
                if let Some(nodes) = r.branches.get(&branch) {
                    for other in r.branches.values().flatten() {
                        if !nodes.contains(other) {
                            allowed.remove(other);
                        }
                    }
                }
                let mut references = HashSet::new();
                refs(&node.data["mappings"][&branch], &mut references);
                for reference in references {
                    if !allowed.contains(&reference) {
                        errors.push(format!(
                            "{}: input {branch} cannot reference {reference}",
                            node.id
                        ));
                    }
                }
            }
        }
        if is_loop(&node.kind) {
            let child = Graph {
                nodes: node.blocks.clone(),
                edges: node.edges.clone(),
            };
            let mut child_inherited = visible.clone();
            child_inherited.insert(format!("{}_locals", node.id));
            if node.kind == "control.repeat" {
                child_inherited.extend(["state".into(), "index".into()]);
            }
            let parallel = node.kind == "loop" && option(node, "mode", "serial") == "parallel";
            if !["serial", "parallel"].contains(&option(node, "mode", "serial"))
                || !["fail", "collect", "skip"].contains(&option(node, "errorMode", "fail"))
            {
                errors.push(format!("{}: invalid iteration policy", node.id));
            }
            validate(&child, &child_inherited, Some(parallel), ids, errors);
            if let Some(end) = child.nodes.iter().find(|n| n.kind == "block-end") {
                let child_dom = dominators(
                    &child,
                    child
                        .nodes
                        .iter()
                        .find(|n| n.kind == "block-start")
                        .map(|n| n.id.as_str())
                        .unwrap_or(""),
                );
                let mut allowed = child_inherited;
                allowed.extend(child_dom.get(&end.id).cloned().unwrap_or_default());
                let mut references = HashSet::new();
                refs(
                    &node.data[if node.kind == "loop" {
                        "loopOutputs"
                    } else {
                        "stateUpdates"
                    }],
                    &mut references,
                );
                for reference in references {
                    if !allowed.contains(&reference) {
                        errors.push(format!(
                            "{}: loop output reference {reference} is not guaranteed to exist",
                            node.id
                        ));
                    }
                }
            }
        } else if !node.blocks.is_empty() {
            errors.push(format!(
                "{}: this node does not support child scopes",
                node.id
            ));
        }
    }
}
pub fn edge<'a>(graph: &'a Graph, node: &str, port: Option<&str>) -> Result<&'a Edge> {
    let outgoing: Vec<_> = graph
        .edges
        .iter()
        .filter(|e| e.source == node && port.is_none_or(|p| e.port.as_deref().unwrap_or("") == p))
        .collect();
    if outgoing.len() != 1 {
        return Err(Error::Execution(format!(
            "Execution output of {node} must connect to exactly one path"
        )));
    }
    Ok(outgoing[0])
}
