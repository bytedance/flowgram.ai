//! Lossless graph projection: IDs, rather than array offsets, address mutations.
use crate::{
    error::{Error, Result},
    model::{Graph, Node},
    store::id,
};
use serde_json::{Value, json};
use std::collections::{HashMap, HashSet};

pub fn failure(code: &str, message: impl Into<String>) -> Error {
    Error::Tool(json!({"code":code,"message":message.into()}))
}
pub fn text<'a>(v: &'a Value, key: &str) -> Result<&'a str> {
    v[key]
        .as_str()
        .ok_or_else(|| failure("INVALID_ARGUMENT", format!("{key} must be a string")))
}
pub fn hash(value: &Value) -> String {
    use sha2::{Digest, Sha256};
    format!("sha256:{:x}", Sha256::digest(value.to_string().as_bytes()))
}
pub fn geometry(key: &str) -> f64 {
    static GEOMETRY: std::sync::LazyLock<Value> = std::sync::LazyLock::new(|| {
        serde_json::from_str(include_str!("../../catalog/node-layout.json")).expect("node layout")
    });
    GEOMETRY[key].as_f64().expect("geometry number")
}
pub fn escape(s: &str) -> String {
    s.replace('~', "~0").replace('/', "~1")
}
pub fn catalog(kind: &str) -> Result<&'static Value> {
    crate::core_nodes::definition(kind)
        .or_else(|| crate::nodes::definition(kind))
        .or_else(|| crate::control::definition(kind))
        .ok_or_else(|| failure("INVALID_NODE_TYPE", format!("Unknown node type: {kind}")))
}
#[derive(Clone)]
pub struct Document(pub Value);
impl Document {
    pub fn read(name: &str, graph: &Value) -> Result<Self> {
        let mut doc =
            Self(json!({"name":name,"nodes":{},"order":{},"edges":{},"extensions":graph}));
        doc.0["extensions"]
            .as_object_mut()
            .ok_or_else(|| failure("INVALID_GRAPH", "Graph must be an object"))?
            .remove("nodes");
        doc.0["extensions"].as_object_mut().unwrap().remove("edges");
        doc.read_scope(
            "root",
            graph.get("nodes").unwrap_or(&json!([])),
            graph.get("edges").unwrap_or(&json!([])),
        )?;
        Ok(doc)
    }
    fn read_scope(&mut self, scope: &str, nodes: &Value, edges: &Value) -> Result<()> {
        let nodes = nodes
            .as_array()
            .ok_or_else(|| failure("INVALID_GRAPH", "nodes must be an array"))?;
        self.0["order"][scope] = json!([]);
        self.0["edges"][scope] = edges.clone();
        for node in nodes {
            let key = text(node, "id")?;
            if key.is_empty()
                || key.contains('.')
                || self.0["nodes"].get(key).is_some()
                || key == "root"
            {
                return Err(failure(
                    "INVALID_NODE_ID",
                    format!(
                        "Node ID must be globally unique, nonempty, and contain no periods: {key}"
                    ),
                ));
            }
            let mut raw = node.clone();
            let object = raw.as_object_mut().unwrap();
            object.remove("blocks");
            object.remove("edges");
            object.insert("scopeId".into(), json!(scope));
            self.0["nodes"][key] = raw;
            self.0["order"][scope]
                .as_array_mut()
                .unwrap()
                .push(json!(key));
            if let Some(blocks) = node.get("blocks") {
                self.read_scope(key, blocks, node.get("edges").unwrap_or(&json!([])))?;
            }
        }
        Ok(())
    }
    pub fn schema(&self) -> Value {
        let mut result = self.0["extensions"].clone();
        result["nodes"] = self.scope_nodes("root");
        result["edges"] = self.0["edges"]["root"].clone();
        result
    }
    fn scope_nodes(&self, scope: &str) -> Value {
        json!(
            self.ids(scope)
                .iter()
                .map(|key| {
                    let mut raw = self.0["nodes"][key].clone();
                    raw.as_object_mut().unwrap().remove("scopeId");
                    if self.0["order"].get(key).is_some() {
                        raw["blocks"] = self.scope_nodes(key);
                        raw["edges"] = self.0["edges"][key].clone();
                    }
                    raw
                })
                .collect::<Vec<_>>()
        )
    }
    pub fn ids(&self, scope: &str) -> Vec<String> {
        self.0["order"][scope]
            .as_array()
            .map(|a| {
                a.iter()
                    .filter_map(Value::as_str)
                    .map(str::to_owned)
                    .collect()
            })
            .unwrap_or_default()
    }
    pub fn node(&self, key: &str) -> Result<&Value> {
        self.0["nodes"]
            .get(key)
            .ok_or_else(|| failure("NODE_NOT_FOUND", format!("Node not found: {key}")))
    }
    pub fn node_mut(&mut self, key: &str) -> Result<&mut Value> {
        self.0["nodes"]
            .get_mut(key)
            .ok_or_else(|| failure("NODE_NOT_FOUND", format!("Node not found: {key}")))
    }
    pub fn scope(&self, scope: &str) -> Result<()> {
        if self.0["order"].get(scope).is_none() {
            return Err(failure(
                "INVALID_SCOPE",
                format!("Scope not found: {scope}"),
            ));
        }
        Ok(())
    }
    fn append(&mut self, key: &str, kind: &str, scope: &str, fields: &Value) -> Result<()> {
        self.scope(scope)?;
        if key.is_empty()
            || key == "root"
            || key.contains('.')
            || self.0["nodes"].get(key).is_some()
        {
            return Err(failure(
                "INVALID_NODE_ID",
                format!("Invalid or duplicate node ID: {key}"),
            ));
        }
        let definition = catalog(kind)?;
        let mut data = definition["defaults"].clone();
        if !data.is_object() {
            data = json!({});
        }
        data["title"] = definition["title"].clone();
        data["runtime"] = json!({});
        if matches!(kind, "llm" | "agent") {
            data["model"] = json!({});
        }
        let position = json!({"x":self.ids(scope).len() as f64*(geometry("width")+geometry("rankGap")),"y":if scope=="root" {0.}else{geometry("containerTop")}});
        self.0["nodes"][key] =
            json!({"id":key,"type":kind,"scopeId":scope,"data":data,"meta":{"position":position}});
        self.0["order"][scope]
            .as_array_mut()
            .unwrap()
            .push(json!(key));
        if let Some(fields) = fields.as_object() {
            for (path, value) in fields {
                self.set_field(key, path, Some(value.clone()))?;
            }
        }
        Ok(())
    }
    pub fn add(&mut self, op: &Value) -> Result<String> {
        let kind = text(op, "nodeType")?;
        let key = op["nodeId"].as_str().map(str::to_owned).unwrap_or_else(id);
        if matches!(kind, "start" | "end" | "block-start" | "block-end") {
            return Err(failure(
                "PROTECTED_STRUCTURE",
                "Boundary nodes are created by their owning workflow or container",
            ));
        }
        let scope = op["scopeId"].as_str().unwrap_or("root");
        self.append(&key, kind, scope, &op["fields"])?;
        if crate::control::is_loop(kind) {
            self.0["order"][&key] = json!([]);
            self.0["edges"][&key] = json!([]);
            let entry = op["boundaryIds"]["entry"]
                .as_str()
                .map(str::to_owned)
                .unwrap_or_else(id);
            let exit = op["boundaryIds"]["exit"]
                .as_str()
                .map(str::to_owned)
                .unwrap_or_else(id);
            self.append(&entry, "block-start", &key, &Value::Null)?;
            self.append(&exit, "block-end", &key, &Value::Null)?;
            self.edge(
                &json!({"sourceNodeID":entry,"targetNodeID":exit}),
                &key,
                true,
            )?;
        }
        if crate::control::is_fork(kind) {
            let join = op["joinId"].as_str().map(str::to_owned).unwrap_or_else(id);
            let join_kind =
                if kind == "control.parallel" || self.node(&key)?["data"]["mode"] == "all" {
                    "control.join"
                } else {
                    "control.merge-branches"
                };
            self.append(&join, join_kind, scope, &Value::Null)?;
            self.node_mut(&key)?["data"]["joinId"] = json!(join);
            self.node_mut(&join)?["data"]["forkId"] = json!(key);
            let typed: Node = serde_json::from_value(self.node(&key)?.clone())?;
            for branch in crate::control::branches(&typed) {
                self.edge(&json!({"sourceNodeID":key,"sourcePortID":branch,"targetNodeID":join,"targetPortID":branch}),scope,true)?;
            }
        }
        Ok(key)
    }
    fn writable(&self, key: &str, path: &str) -> Result<()> {
        let node = self.node(key)?;
        let kind = text(node, "type")?;
        let def = catalog(kind)?;
        let tokens = pointer_tokens(path)?;
        let root = tokens.first().map(String::as_str).unwrap_or("");
        if matches!(
            root,
            "branches"
                | "joinId"
                | "forkId"
                | "conditions"
                | "scopeId"
                | "blocks"
                | "edges"
                | "id"
                | "type"
                | "meta"
        ) {
            return Err(failure(
                "PROTECTED_STRUCTURE",
                format!("Use a structural operation for {path}"),
            ));
        }
        let declared = matches!(
            root,
            "title" | "description" | "inputs" | "outputs" | "runtime"
        ) || (root == "model" && matches!(kind, "agent" | "llm"))
            || def["defaults"].get(root).is_some()
            || def["fields"].as_array().is_some_and(|a| {
                a.iter().any(|f| {
                    f["key"]
                        .as_str()
                        .is_some_and(|k| k.split('.').next() == Some(root))
                })
            });
        let dynamic_inputs = root == "inputsValues"
            && (matches!(kind, "start" | "end" | "assign" | "block-end")
                || tokens.get(1).is_none_or(|k| {
                    def["defaults"]["inputsValues"].get(k).is_some()
                        || def["fields"].as_array().is_some_and(|a| {
                            a.iter()
                                .any(|f| f["key"].as_str() == Some(&format!("inputsValues.{k}")))
                        })
                }));
        if !declared && !dynamic_inputs {
            return Err(failure(
                "FIELD_NOT_WRITABLE",
                format!("Field is not declared by the node contract: {path}"),
            ));
        }
        if root == "inputsValues" && !dynamic_inputs {
            return Err(failure(
                "FIELD_NOT_WRITABLE",
                format!("Unknown input field: {path}"),
            ));
        }
        Ok(())
    }
    pub fn set_field(&mut self, key: &str, path: &str, value: Option<Value>) -> Result<()> {
        self.writable(key, path)?;
        if let Some(value) = &value {
            let tokens = pointer_tokens(path)?;
            if tokens.len() == 1 {
                let root = &tokens[0];
                let def = catalog(text(self.node(key)?, "type")?)?;
                let expected = &def["defaults"][root];
                let wrong = match root.as_str() {
                    "title" | "description" => !value.is_string(),
                    "inputs" | "outputs" | "runtime" | "model" | "inputsValues" => {
                        !value.is_object()
                    }
                    _ => match expected {
                        Value::String(_) => !value.is_string(),
                        Value::Number(_) => !value.is_number(),
                        Value::Bool(_) => !value.is_boolean(),
                        Value::Array(_) => !value.is_array(),
                        Value::Object(_) => !value.is_object(),
                        _ => false,
                    },
                };
                if wrong {
                    return Err(failure(
                        "INVALID_FIELD_TYPE",
                        format!("Value has an incompatible type for {path}"),
                    ));
                }
                if root == "inputsValues"
                    && !matches!(
                        text(self.node(key)?, "type")?,
                        "start" | "end" | "assign" | "block-start" | "block-end"
                    )
                {
                    for (field, content) in value.as_object().unwrap() {
                        let declared = def["defaults"]["inputsValues"].get(field).is_some()
                            || def["fields"].as_array().is_some_and(|fields| {
                                fields.iter().any(|f| {
                                    f["key"].as_str() == Some(&format!("inputsValues.{field}"))
                                })
                            });
                        if !declared
                            && self.node(key)?["data"]["inputsValues"].get(field) != Some(content)
                        {
                            return Err(failure(
                                "FIELD_NOT_WRITABLE",
                                format!("Unknown input field: /inputsValues/{}", escape(field)),
                            ));
                        }
                    }
                }
                if let Some(field) = def["fields"]
                    .as_array()
                    .and_then(|a| a.iter().find(|f| f["key"] == *root))
                    && field["choices"]
                        .as_array()
                        .is_some_and(|a| !a.iter().any(|c| c[0] == *value))
                {
                    return Err(failure(
                        "INVALID_FIELD_VALUE",
                        format!("Value is outside the contract enum for {path}"),
                    ));
                }
            }
        }
        if value
            .as_ref()
            .is_some_and(|v| v == "[REDACTED]" || v == "••••••••")
        {
            return Err(failure(
                "INVALID_ARGUMENT",
                "Redaction placeholders cannot be written as field values",
            ));
        }
        set_pointer(&mut self.node_mut(key)?["data"], path, value)
    }
    pub fn edge(&mut self, descriptor: &Value, scope: &str, add: bool) -> Result<()> {
        self.scope(scope)?;
        let source = text(descriptor, "sourceNodeID")?;
        let target = text(descriptor, "targetNodeID")?;
        for key in [source, target] {
            if self.node(key)?["scopeId"] != scope {
                return Err(failure(
                    "INVALID_SCOPE",
                    "Connections must stay within one scope",
                ));
            }
        }
        let graph: Graph = serde_json::from_value(
            json!({"nodes":self.scope_nodes(scope),"edges":self.0["edges"][scope]}),
        )?;
        let mut edge = descriptor.clone();
        for (key, node_id, output) in [
            ("sourcePortID", source, true),
            ("targetPortID", target, false),
        ] {
            let node = graph.nodes.iter().find(|n| n.id == node_id).unwrap();
            let ports = crate::control::ports(node, &graph);
            let ports = if output { ports.1 } else { ports.0 };
            let port = if let Some(p) = descriptor[key].as_str() {
                p.to_owned()
            } else if ports.len() == 1 {
                ports[0].clone()
            } else {
                return Err(Error::Tool(
                    json!({"code":"AMBIGUOUS_PORT","message":"Specify an explicit port ID","nodeId":node_id,"details":{"ports":ports}}),
                ));
            };
            if !ports.contains(&port) {
                return Err(failure(
                    "INVALID_PORT",
                    format!("Port {port} does not exist on {node_id}"),
                ));
            }
            if !port.is_empty() {
                edge[key] = json!(port);
            } else {
                edge.as_object_mut().unwrap().remove(key);
            }
        }
        let edges = self.0["edges"][scope].as_array_mut().unwrap();
        let matching = |e: &Value| {
            [
                "sourceNodeID",
                "targetNodeID",
                "sourcePortID",
                "targetPortID",
            ]
            .iter()
            .all(|k| e[*k].as_str().unwrap_or("") == edge[*k].as_str().unwrap_or(""))
        };
        if add {
            if !edges.iter().any(matching) {
                edges.push(edge);
            }
        } else {
            let index = edges
                .iter()
                .position(matching)
                .ok_or_else(|| failure("EDGE_NOT_FOUND", "The exact connection does not exist"))?;
            edges.remove(index);
        }
        Ok(())
    }
    pub fn remove(&mut self, key: &str, owned: bool) -> Result<()> {
        let node = self.node(key)?.clone();
        let kind = text(&node, "type")?;
        if !owned
            && (matches!(kind, "start" | "end" | "block-start" | "block-end")
                || crate::control::is_join(kind))
        {
            return Err(failure(
                "PROTECTED_STRUCTURE",
                "Remove the owning structure instead of its protected boundary or join",
            ));
        }
        if crate::control::is_fork(kind) {
            let join = text(&node["data"], "joinId")?.to_owned();
            self.remove(&join, true)?;
        }
        for child in self.ids(key) {
            self.remove(&child, true)?;
        }
        let scope = text(&node, "scopeId")?;
        self.0["order"][scope]
            .as_array_mut()
            .unwrap()
            .retain(|i| i != key);
        self.0["edges"][scope]
            .as_array_mut()
            .unwrap()
            .retain(|e| e["sourceNodeID"] != key && e["targetNodeID"] != key);
        for section in ["nodes", "order", "edges"] {
            self.0[section].as_object_mut().unwrap().remove(key);
        }
        Ok(())
    }
    pub fn width(&self, key: &str) -> Result<f64> {
        let node = self.node(key)?;
        let kind = text(node, "type")?;
        if crate::control::is_loop(kind) {
            let mut width = geometry("containerWidth");
            for child in self.ids(key) {
                let n = self.node(&child)?;
                width = width.max(
                    n["meta"]["position"]["x"].as_f64().unwrap_or(0.)
                        + self.width(&child)?
                        + geometry("containerSide"),
                );
            }
            return Ok(width);
        }
        Ok(
            if crate::control::is_fork(kind) || crate::control::is_join(kind) || kind == "condition"
            {
                geometry("routeWidth")
            } else if matches!(kind, "start" | "end" | "block-start" | "block-end") {
                geometry("boundaryWidth")
            } else {
                geometry("width")
            },
        )
    }
    pub fn check_output_changes(&self, before: &Self) -> Result<()> {
        fn keys(node: &Value) -> HashSet<String> {
            let mut keys = HashSet::new();
            for props in [
                &node["data"]["outputs"]["properties"],
                &catalog(node["type"].as_str().unwrap_or(""))
                    .ok()
                    .map(|v| v["outputSchema"]["properties"].clone())
                    .unwrap_or(Value::Null),
            ] {
                if let Some(props) = props.as_object() {
                    keys.extend(props.keys().cloned());
                }
            }
            if matches!(node["type"].as_str(), Some("assign" | "end" | "block-end"))
                && let Some(values) = node["data"]["inputsValues"].as_object()
            {
                keys.extend(values.keys().cloned());
            }
            keys
        }
        fn bindings(value: &Value, out: &mut Vec<(String, String)>) {
            match value {
                Value::Object(o) if o.get("type") == Some(&json!("constant")) => {}
                Value::Object(o) if o.get("type") == Some(&json!("ref")) => {
                    if let (Some(node), Some(field)) =
                        (value["content"][0].as_str(), value["content"][1].as_str())
                    {
                        out.push((node.into(), field.into()));
                    }
                }
                Value::Object(o) if o.get("type") == Some(&json!("template")) => {
                    if let Some(text) = value["content"].as_str() {
                        for cap in regex::Regex::new(r"\{\{\s*([^\s.}]+)\.([^\s.}]+)")
                            .unwrap()
                            .captures_iter(text)
                        {
                            out.push((cap[1].into(), cap[2].into()));
                        }
                    }
                }
                Value::Object(o) => {
                    for v in o.values() {
                        bindings(v, out);
                    }
                }
                Value::Array(a) => {
                    for v in a {
                        bindings(v, out);
                    }
                }
                _ => {}
            }
        }
        for (consumer, node) in self.0["nodes"].as_object().unwrap() {
            let mut refs = Vec::new();
            bindings(&node["data"], &mut refs);
            for (source, field) in refs {
                if let (Ok(old), Ok(new)) = (before.node(&source), self.node(&source))
                    && keys(old).contains(&field)
                    && !keys(new).contains(&field)
                {
                    return Err(Error::Tool(
                        json!({"code":"REFERENCED_OUTPUT","message":"An output still has consumers; rebind them in the same transaction","nodeId":consumer,"details":{"sourceNodeId":source,"field":field}}),
                    ));
                }
            }
        }
        Ok(())
    }
    pub fn validate(&self) -> Result<Vec<String>> {
        let graph = self.schema();
        let _: Graph = serde_json::from_value(graph.clone())?;
        let mut all = HashSet::new();
        for (key, node) in self.0["nodes"].as_object().unwrap() {
            all.insert(key.clone());
            if crate::control::is_loop(text(node, "type")?) {
                all.insert(format!("{key}_locals"));
            }
        }
        all.extend(["item", "index", "state"].map(str::to_owned));
        for (key, node) in self.0["nodes"].as_object().unwrap() {
            catalog(text(node, "type")?)?;
            if let Some(inputs) = node["data"]["inputsValues"].as_object() {
                for binding in inputs.values() {
                    let valid = match binding["type"].as_str() {
                        Some("constant") => binding.get("content").is_some(),
                        Some("ref") => binding["content"]
                            .as_array()
                            .is_some_and(|a| !a.is_empty() && a.iter().all(Value::is_string)),
                        Some("template") => binding["content"].is_string(),
                        _ => false,
                    };
                    if !valid {
                        return Err(failure(
                            "INVALID_BINDING",
                            format!(
                                "{key}: inputsValues requires typed constant, ref, or template bindings"
                            ),
                        ));
                    }
                }
            }
            let mut refs = HashSet::new();
            references(&node["data"], &mut refs);
            for reference in refs {
                if !all.contains(&reference) {
                    return Err(Error::Tool(
                        json!({"code":"REFERENCED_NODE","message":"A binding refers to a missing node","nodeId":key,"details":{"reference":reference}}),
                    ));
                }
            }
        }
        for (scope, edges) in self.0["edges"].as_object().unwrap() {
            let typed: Graph =
                serde_json::from_value(json!({"nodes":self.scope_nodes(scope),"edges":edges}))?;
            let mut degrees: HashMap<String, usize> =
                self.ids(scope).into_iter().map(|k| (k, 0)).collect();
            let mut outputs = HashSet::new();
            for edge in &typed.edges {
                for k in [&edge.source, &edge.target] {
                    if !degrees.contains_key(k) {
                        return Err(failure(
                            "INVALID_SCOPE",
                            "Edge endpoint is outside its scope",
                        ));
                    }
                }
                let a = typed.nodes.iter().find(|n| n.id == edge.source).unwrap();
                let b = typed.nodes.iter().find(|n| n.id == edge.target).unwrap();
                if !crate::control::ports(a, &typed)
                    .1
                    .contains(&edge.port.clone().unwrap_or_default())
                    || !crate::control::ports(b, &typed)
                        .0
                        .contains(&edge.target_port.clone().unwrap_or_default())
                {
                    return Err(failure(
                        "INVALID_PORT",
                        "Connection references a nonexistent static port",
                    ));
                }
                if !outputs.insert((edge.source.clone(), edge.port.clone().unwrap_or_default())) {
                    return Err(failure(
                        "INVALID_PORT",
                        "Use a fork node for multiple outgoing connections from one port",
                    ));
                }
                *degrees.get_mut(&edge.target).unwrap() += 1;
            }
            let mut ready: Vec<_> = degrees
                .iter()
                .filter(|(_, v)| **v == 0)
                .map(|(k, _)| k.clone())
                .collect();
            let mut count = 0;
            while let Some(k) = ready.pop() {
                count += 1;
                for e in typed.edges.iter().filter(|e| e.source == k) {
                    let d = degrees.get_mut(&e.target).unwrap();
                    *d -= 1;
                    if *d == 0 {
                        ready.push(e.target.clone());
                    }
                }
            }
            if count != degrees.len() {
                return Err(failure(
                    "INVALID_CYCLE",
                    "Cycles require a loop or repeat container",
                ));
            }
            let start = if scope == "root" {
                "start"
            } else {
                "block-start"
            };
            let end = if scope == "root" { "end" } else { "block-end" };
            for kind in [start, end] {
                if typed.nodes.iter().filter(|n| n.kind == kind).count() != 1 {
                    return Err(failure(
                        "PROTECTED_STRUCTURE",
                        format!("Scope {scope} requires exactly one {kind}"),
                    ));
                }
            }
            for n in &typed.nodes {
                if crate::control::is_fork(&n.kind) {
                    let mut seen = HashSet::new();
                    if n.data["branches"].as_array().is_none_or(|a| {
                        a.iter().any(|b| {
                            b["id"]
                                .as_str()
                                .is_none_or(|k| k.is_empty() || k == "else" || !seen.insert(k))
                        })
                    }) {
                        return Err(failure(
                            "PROTECTED_STRUCTURE",
                            "Branch IDs must be nonempty, unique, and cannot be else",
                        ));
                    }
                    let join = typed
                        .nodes
                        .iter()
                        .find(|j| Some(j.id.as_str()) == n.data["joinId"].as_str());
                    if join.is_none_or(|j| {
                        !crate::control::is_join(&j.kind) || j.data["forkId"] != n.id
                    }) {
                        return Err(failure(
                            "PROTECTED_STRUCTURE",
                            "Fork/join pair is inconsistent",
                        ));
                    }
                }
                if crate::control::is_join(&n.kind)
                    && !typed.nodes.iter().any(|f| {
                        crate::control::is_fork(&f.kind)
                            && f.data["joinId"] == n.id
                            && n.data["forkId"] == f.id
                    })
                {
                    return Err(failure("PROTECTED_STRUCTURE", "Join has no owning fork"));
                }
            }
        }
        // Execution validation reports incomplete configuration separately from graph corruption.
        let issues = crate::runtime::validate(&graph)?;
        if let Some(issue) = issues.iter().find(|s| {
            s.contains("reference ")
                && (s.contains("unavailable")
                    || s.contains("cannot reference")
                    || s.contains("not guaranteed"))
        }) {
            return Err(failure("INVALID_BINDING", issue.clone()));
        }
        Ok(issues)
    }
}
pub fn pointer_tokens(path: &str) -> Result<Vec<String>> {
    if !path.starts_with('/') || path == "/" {
        return Err(failure(
            "INVALID_ARGUMENT",
            "A nonempty JSON Pointer is required",
        ));
    }
    Ok(path[1..]
        .split('/')
        .map(|s| s.replace("~1", "/").replace("~0", "~"))
        .collect())
}
pub fn set_pointer(target: &mut Value, path: &str, value: Option<Value>) -> Result<()> {
    let tokens = pointer_tokens(path)?;
    let mut parent = target;
    for part in &tokens[..tokens.len() - 1] {
        parent = parent.get_mut(part).ok_or_else(|| {
            failure(
                "FIELD_NOT_FOUND",
                format!("Intermediate field does not exist: {path}"),
            )
        })?;
    }
    let key = tokens.last().unwrap();
    let object = parent
        .as_object_mut()
        .ok_or_else(|| failure("INVALID_ARGUMENT", "Use edit_collection for array elements"))?;
    match value {
        Some(v) => {
            object.insert(key.clone(), v);
        }
        None => {
            if object.remove(key).is_none() {
                return Err(failure(
                    "FIELD_NOT_FOUND",
                    format!("Field does not exist: {path}"),
                ));
            }
        }
    }
    Ok(())
}
pub fn references(value: &Value, out: &mut HashSet<String>) {
    match value {
        Value::Object(o) if o.get("type") == Some(&json!("constant")) => {}
        Value::Object(o) if o.get("type") == Some(&json!("ref")) => {
            if let Some(k) = value["content"][0].as_str() {
                out.insert(k.into());
            }
        }
        Value::Object(o) if o.get("type") == Some(&json!("template")) => {
            if let Some(s) = value["content"].as_str() {
                for cap in regex::Regex::new(r"\{\{\s*([^\s.}]+)\.")
                    .unwrap()
                    .captures_iter(s)
                {
                    out.insert(cap[1].into());
                }
            }
        }
        Value::Object(o) => {
            for v in o.values() {
                references(v, out);
            }
        }
        Value::Array(a) => {
            for v in a {
                references(v, out);
            }
        }
        _ => {}
    }
}
pub fn remap(value: &mut Value, map: &HashMap<String, String>) {
    if value["type"] == "constant" {
        return;
    }
    if value["type"] == "ref" {
        if let Some(k) = value["content"][0].as_str().and_then(|k| map.get(k)) {
            value["content"][0] = json!(k);
        }
        return;
    }
    if value["type"] == "template" {
        if let Some(s) = value["content"].as_str() {
            let re = regex::Regex::new(r"(\{\{\s*)([^\s.}]+)([.}\s])").unwrap();
            value["content"] = json!(
                re.replace_all(s, |c: &regex::Captures| format!(
                    "{}{}{}",
                    &c[1],
                    map.get(&c[2]).map(String::as_str).unwrap_or(&c[2]),
                    &c[3]
                ))
                .to_string()
            );
        }
        return;
    }
    match value {
        Value::Object(o) => {
            for (k, v) in o {
                if matches!(
                    k.as_str(),
                    "forkId" | "joinId" | "sourceNodeID" | "targetNodeID"
                ) {
                    if let Some(new) = v.as_str().and_then(|k| map.get(k)) {
                        *v = json!(new);
                    }
                } else {
                    remap(v, map);
                }
            }
        }
        Value::Array(a) => {
            for v in a {
                remap(v, map);
            }
        }
        _ => {}
    }
}
