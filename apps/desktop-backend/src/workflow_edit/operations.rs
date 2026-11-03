use super::graph::*;
use crate::{error::Result, store::id};
use serde_json::{Value, json};
use std::collections::{HashMap, HashSet};

impl Document {
    pub fn apply(&mut self, op: &Value) -> Result<Value> {
        let action = text(op, "op")?;
        match action {
            "rename_workflow" => {
                let name = text(op, "name")?.trim();
                if name.is_empty() {
                    return Err(failure("INVALID_ARGUMENT", "Workflow name cannot be empty"));
                }
                self.0["name"] = json!(name);
            }
            "add_node" => {
                let key = self.add(op)?;
                return Ok(
                    json!({"nodeId":key,"boundaryIds":self.ids(&key),"joinId":self.node(&key)?["data"]["joinId"]}),
                );
            }
            "update_node" => {
                let key = text(op, "nodeId")?;
                let mut paths = Vec::new();
                if let Some(set) = op["set"].as_object() {
                    paths.extend(set.keys().cloned());
                }
                if let Some(unset) = op["unset"].as_array() {
                    for path in unset {
                        paths.push(
                            path.as_str()
                                .ok_or_else(|| {
                                    failure("INVALID_ARGUMENT", "unset requires string paths")
                                })?
                                .into(),
                        );
                    }
                }
                for (i, p) in paths.iter().enumerate() {
                    if paths[i + 1..].iter().any(|q| {
                        p == q || p.starts_with(&format!("{q}/")) || q.starts_with(&format!("{p}/"))
                    }) {
                        return Err(failure(
                            "INVALID_ARGUMENT",
                            "Overlapping field paths are ambiguous",
                        ));
                    }
                }
                if let Some(set) = op["set"].as_object() {
                    for (p, v) in set {
                        self.set_field(key, p, Some(v.clone()))?;
                    }
                }
                if let Some(unset) = op["unset"].as_array() {
                    for p in unset {
                        self.set_field(key, p.as_str().unwrap(), None)?;
                    }
                }
            }
            "replace_text" => {
                let key = text(op, "nodeId")?;
                let path = text(op, "path")?;
                let mut value = self.node(key)?["data"]
                    .pointer(path)
                    .and_then(Value::as_str)
                    .ok_or_else(|| failure("FIELD_NOT_FOUND", "Text field does not exist"))?
                    .to_owned();
                for edit in op["edits"]
                    .as_array()
                    .ok_or_else(|| failure("INVALID_ARGUMENT", "edits must be an array"))?
                {
                    let old = text(edit, "oldText")?;
                    let new = text(edit, "newText")?;
                    let expected = edit["expectedMatches"].as_u64().unwrap_or(1) as usize;
                    let found = if old.is_empty() {
                        0
                    } else {
                        value.matches(old).count()
                    };
                    if expected == 0 || found != expected {
                        return Err(crate::error::Error::Tool(
                            json!({"code":"AMBIGUOUS_TEXT_MATCH","message":"Exact text match count differs; no changes were applied","nodeId":key,"path":path,"details":{"expectedMatches":expected,"actualMatches":found},"recovery":{"tool":"read_workflow","view":"fields","nodeIds":[key],"paths":[path]}}),
                        ));
                    }
                    value = value.replace(old, new);
                }
                self.set_field(key, path, Some(json!(value)))?;
            }
            "edit_collection" => {
                let key = text(op, "nodeId")?;
                let path = text(op, "path")?;
                let mut rows = self.node(key)?["data"]
                    .pointer(path)
                    .and_then(Value::as_array)
                    .ok_or_else(|| failure("FIELD_NOT_FOUND", "Collection does not exist"))?
                    .clone();
                for change in op["changes"]
                    .as_array()
                    .ok_or_else(|| failure("INVALID_ARGUMENT", "changes must be an array"))?
                {
                    let action = text(change, "action")?;
                    if action == "insert" {
                        let pos = change["index"].as_u64().unwrap_or(rows.len() as u64) as usize;
                        if pos > rows.len() {
                            return Err(failure(
                                "INVALID_ARGUMENT",
                                "Insertion index is out of bounds",
                            ));
                        }
                        rows.insert(pos, change["value"].clone());
                        continue;
                    }
                    let pos = if let Some(k) = change["key"].as_object() {
                        let found: Vec<_> = rows
                            .iter()
                            .enumerate()
                            .filter(|(_, r)| k.iter().all(|(k, v)| r.get(k) == Some(v)))
                            .map(|(i, _)| i)
                            .collect();
                        if found.len() != 1 {
                            return Err(failure(
                                "AMBIGUOUS_ITEM",
                                "Collection key must match exactly one row",
                            ));
                        }
                        found[0]
                    } else {
                        let i = change["index"].as_u64().ok_or_else(|| {
                            failure(
                                "INVALID_ARGUMENT",
                                "A stable key or index with expectedItemHash is required",
                            )
                        })? as usize;
                        if rows
                            .get(i)
                            .is_none_or(|r| change["expectedItemHash"] != hash(r))
                        {
                            return Err(failure("ITEM_CONFLICT", "Collection item hash changed"));
                        }
                        i
                    };
                    match action {
                        "update" => {
                            let set = change["set"].as_object().cloned().unwrap_or_default();
                            let unset = change["unset"].as_array().cloned().unwrap_or_default();
                            if set.is_empty() && unset.is_empty() {
                                return Err(failure(
                                    "INVALID_ARGUMENT",
                                    "Row update requires set or unset JSON Pointers",
                                ));
                            }
                            let paths: Vec<&str> = set
                                .keys()
                                .map(String::as_str)
                                .chain(unset.iter().filter_map(Value::as_str))
                                .collect();
                            for (i, p) in paths.iter().enumerate() {
                                if matches!(*p, "/id" | "/key" | "/name") {
                                    return Err(failure(
                                        "PROTECTED_STRUCTURE",
                                        "Stable row keys cannot be changed",
                                    ));
                                }
                                if paths[i + 1..].iter().any(|q| {
                                    p == q
                                        || p.starts_with(&format!("{q}/"))
                                        || q.starts_with(&format!("{p}/"))
                                }) {
                                    return Err(failure(
                                        "INVALID_ARGUMENT",
                                        "Overlapping row field paths are ambiguous",
                                    ));
                                }
                            }
                            for (p, v) in set {
                                set_pointer(&mut rows[pos], &p, Some(v))?;
                            }
                            for p in unset {
                                set_pointer(
                                    &mut rows[pos],
                                    text(&json!({"path":p}), "path")?,
                                    None,
                                )?;
                            }
                        }
                        "remove" => {
                            rows.remove(pos);
                        }
                        "move" => {
                            let row = rows.remove(pos);
                            let target = change["toIndex"]
                                .as_u64()
                                .ok_or_else(|| failure("INVALID_ARGUMENT", "toIndex is required"))?
                                as usize;
                            if target > rows.len() {
                                return Err(failure(
                                    "INVALID_ARGUMENT",
                                    "Move index is out of bounds",
                                ));
                            }
                            rows.insert(target, row);
                        }
                        _ => return Err(failure("INVALID_ARGUMENT", "Unknown collection action")),
                    }
                }
                self.set_field(key, path, Some(json!(rows)))?;
            }
            "remove_node" => self.remove(text(op, "nodeId")?, false)?,
            "replace_node_type" => {
                let key = text(op, "nodeId")?;
                let kind = text(op, "nodeType")?;
                let old = self.node(key)?.clone();
                let old_kind = text(&old, "type")?;
                if crate::control::is_loop(kind)
                    || crate::control::is_fork(kind)
                    || crate::control::is_join(kind)
                    || crate::control::is_loop(old_kind)
                    || crate::control::is_fork(old_kind)
                    || crate::control::is_join(old_kind)
                    || matches!(old_kind, "start" | "end" | "block-start" | "block-end")
                    || matches!(kind, "start" | "end" | "block-start" | "block-end")
                {
                    return Err(failure(
                        "PROTECTED_STRUCTURE",
                        "Structural conversions require explicit remove/add operations for the owning unit",
                    ));
                }
                let mut defaults = catalog(kind)?["defaults"]
                    .as_object()
                    .cloned()
                    .unwrap_or_default();
                let old_contract = catalog(old_kind)?;
                if let Some(data) = old["data"].as_object() {
                    for (key, value) in data {
                        let declared = matches!(
                            key.as_str(),
                            "inputs" | "outputs" | "model" | "inputsValues"
                        ) || old_contract["defaults"].get(key).is_some()
                            || old_contract["fields"].as_array().is_some_and(|a| {
                                a.iter().any(|f| {
                                    f["key"]
                                        .as_str()
                                        .is_some_and(|k| k.split('.').next() == Some(key.as_str()))
                                })
                            });
                        if !declared || matches!(key.as_str(), "title" | "description" | "runtime")
                        {
                            defaults.entry(key.clone()).or_insert_with(|| value.clone());
                        }
                    }
                }
                defaults.entry("runtime").or_insert(json!({}));
                if matches!(kind, "llm" | "agent") {
                    defaults.entry("model").or_insert(json!({}));
                }
                let node = self.node_mut(key)?;
                node["type"] = json!(kind);
                node["data"] = json!(defaults);
                node["data"]["title"] = old["data"]["title"].clone();
                if let Some(fields) = op["fields"].as_object() {
                    for (p, v) in fields {
                        self.set_field(key, p, Some(v.clone()))?;
                    }
                }
                // Remap explicit output references and connection port IDs only.
                let outputs = op["outputMapping"].as_object().cloned().unwrap_or_default();
                fn map_refs(v: &mut Value, key: &str, m: &serde_json::Map<String, Value>) {
                    if v["type"] == "constant" {
                        return;
                    }
                    if v["type"] == "ref" && v["content"][0] == key {
                        if let Some(new) = v["content"][1].as_str().and_then(|k| m.get(k)) {
                            v["content"][1] = new.clone();
                        }
                        return;
                    }
                    if v["type"] == "template" {
                        if let Some(text) = v["content"].as_str() {
                            let regex =
                                regex::Regex::new(r"(\{\{\s*)([^\s.}]+)\.([^\s.}]+)([^}]*\}\})")
                                    .unwrap();
                            v["content"] = json!(
                                regex
                                    .replace_all(text, |cap: &regex::Captures| {
                                        if &cap[2] == key
                                            && let Some(mapped) =
                                                m.get(&cap[3]).and_then(Value::as_str)
                                        {
                                            return format!(
                                                "{}{}.{mapped}{}",
                                                &cap[1], key, &cap[4]
                                            );
                                        }
                                        cap[0].to_owned()
                                    })
                                    .to_string()
                            );
                        }
                        return;
                    }
                    match v {
                        Value::Object(o) => {
                            for v in o.values_mut() {
                                map_refs(v, key, m);
                            }
                        }
                        Value::Array(a) => {
                            for v in a {
                                map_refs(v, key, m);
                            }
                        }
                        _ => {}
                    }
                }
                for node in self.0["nodes"].as_object_mut().unwrap().values_mut() {
                    map_refs(&mut node["data"], key, &outputs);
                }
                let scope = text(&old, "scopeId")?;
                for edge in self.0["edges"][scope].as_array_mut().unwrap() {
                    for (endpoint, port, map) in [
                        ("sourceNodeID", "sourcePortID", "sourcePortMapping"),
                        ("targetNodeID", "targetPortID", "targetPortMapping"),
                    ] {
                        if edge[endpoint] == key {
                            let current = edge[port].as_str().unwrap_or("");
                            if let Some(new) = op[map].get(current) {
                                edge[port] = new.clone();
                            }
                        }
                    }
                }
            }
            "connect" | "disconnect" => self.edge(
                &op["edge"],
                op["scopeId"].as_str().unwrap_or("root"),
                action == "connect",
            )?,
            "reconnect" => {
                let scope = op["scopeId"].as_str().unwrap_or("root");
                self.edge(&op["from"], scope, false)?;
                self.edge(&op["to"], scope, true)?;
            }
            "insert_node" => {
                let scope = op["scopeId"].as_str().unwrap_or("root");
                let edge = &op["edge"];
                self.edge(edge, scope, false)?;
                let key = self.add(op)?;
                let node = self.node(&key)?.clone();
                let exit = node["data"]["joinId"].as_str().unwrap_or(&key).to_owned();
                let source = text(edge, "sourceNodeID")?;
                let position = self.node(source)?["meta"]["position"].clone();
                let x = position["x"].as_f64().unwrap_or(0.)
                    + self.width(source)?
                    + geometry("rankGap");
                let y = position["y"].as_f64().unwrap_or(0.);
                self.node_mut(&key)?["meta"]["position"] = json!({"x":x,"y":y});
                if exit != key {
                    self.node_mut(&exit)?["meta"]["position"] =
                        json!({"x":x+self.width(&key)?+geometry("rankGap"),"y":y});
                }
                let target_x = self.node(text(edge, "targetNodeID")?)?["meta"]["position"]["x"]
                    .as_f64()
                    .unwrap_or(0.);
                let exit_x = self.node(&exit)?["meta"]["position"]["x"]
                    .as_f64()
                    .unwrap_or(x);
                let shift = (exit_x + self.width(&exit)? + geometry("rankGap") - target_x).max(0.);
                let mut upstream = edge.clone();
                upstream["targetNodeID"] = json!(key);
                upstream.as_object_mut().unwrap().remove("targetPortID");
                let mut downstream = edge.clone();
                downstream["sourceNodeID"] = json!(exit);
                downstream.as_object_mut().unwrap().remove("sourcePortID");
                self.edge(&upstream, scope, true)?;
                self.edge(&downstream, scope, true)?;
                let mut seen = HashSet::new();
                let mut queue = vec![text(edge, "targetNodeID")?.to_owned()];
                while let Some(k) = queue.pop() {
                    if !seen.insert(k.clone()) {
                        continue;
                    }
                    let n = self.node_mut(&k)?;
                    let old_x = n["meta"]["position"]["x"].as_f64().unwrap_or(0.);
                    n["meta"]["position"]["x"] = json!(old_x + shift);
                    for e in self.0["edges"][scope].as_array().unwrap() {
                        if e["sourceNodeID"] == k {
                            queue.push(text(e, "targetNodeID")?.into());
                        }
                    }
                }
                return Ok(json!({"nodeId":key}));
            }
            "add_branch" | "update_branch" | "remove_branch" | "move_branch" => {
                self.branch(op, action)?
            }
            "duplicate_subgraph" | "move_subgraph" => {
                return self.subgraph(op, action == "duplicate_subgraph");
            }
            "move_nodes" => {
                for p in op["positions"]
                    .as_array()
                    .ok_or_else(|| failure("INVALID_ARGUMENT", "positions must be an array"))?
                {
                    let k = text(p, "nodeId")?;
                    let x = p["x"]
                        .as_f64()
                        .ok_or_else(|| failure("INVALID_ARGUMENT", "x must be a number"))?;
                    let y = p["y"]
                        .as_f64()
                        .ok_or_else(|| failure("INVALID_ARGUMENT", "y must be a number"))?;
                    self.node_mut(k)?["meta"]["position"] = json!({"x":x,"y":y});
                }
            }
            _ => {
                return Err(failure(
                    "INVALID_ARGUMENT",
                    format!("Unknown edit operation: {action}"),
                ));
            }
        }
        Ok(json!({}))
    }
    fn branch(&mut self, op: &Value, action: &str) -> Result<()> {
        let key = text(op, "nodeId")?;
        let node = self.node(key)?.clone();
        let kind = text(&node, "type")?;
        if !crate::control::is_fork(kind) && kind != "condition" {
            return Err(failure(
                "INVALID_NODE_TYPE",
                "Branch operations require a fork, switch, or condition",
            ));
        }
        let field = if kind == "condition" {
            "conditions"
        } else {
            "branches"
        };
        let id_key = if kind == "condition" { "key" } else { "id" };
        let branch = text(op, "branchId")?;
        if branch.is_empty() || branch == "else" {
            return Err(failure(
                "INVALID_ARGUMENT",
                "The fallback branch is protected; use a nonempty stable branch ID",
            ));
        }
        let mut rows = node["data"][field].as_array().cloned().unwrap_or_default();
        let pos = rows.iter().position(|r| r[id_key] == branch);
        let scope = text(&node, "scopeId")?;
        match action {
            "add_branch" => {
                if pos.is_some() {
                    return Err(failure("INVALID_ARGUMENT", "Branch ID already exists"));
                }
                let mut row = op.get("branch").cloned().unwrap_or(json!({}));
                row[id_key] = json!(branch);
                rows.push(row);
            }
            "update_branch" => {
                let pos =
                    pos.ok_or_else(|| failure("BRANCH_NOT_FOUND", "Branch does not exist"))?;
                for (k, v) in op["set"]
                    .as_object()
                    .ok_or_else(|| failure("INVALID_ARGUMENT", "Branch update requires set"))?
                {
                    if k == "/id" || k == "/key" {
                        return Err(failure("PROTECTED_STRUCTURE", "Branch IDs are stable"));
                    }
                    set_pointer(&mut rows[pos], k, Some(v.clone()))?;
                }
            }
            "remove_branch" => {
                let pos =
                    pos.ok_or_else(|| failure("BRANCH_NOT_FOUND", "Branch does not exist"))?;
                let join = node["data"]["joinId"].as_str().unwrap_or("");
                let edges = self.0["edges"][scope].as_array_mut().unwrap();
                let outgoing: Vec<_> = edges
                    .iter()
                    .filter(|e| e["sourceNodeID"] == key && e["sourcePortID"] == branch)
                    .collect();
                if outgoing.iter().any(|e| e["targetNodeID"] != join) {
                    return Err(failure(
                        "BRANCH_NOT_EMPTY",
                        "Move or remove branch body nodes explicitly in this transaction before removing the branch",
                    ));
                }
                edges.retain(|e| {
                    !(e["sourceNodeID"] == key && e["sourcePortID"] == branch
                        || e["targetNodeID"] == join && e["targetPortID"] == branch)
                });
                rows.remove(pos);
                if !join.is_empty()
                    && let Some(mappings) = self.node_mut(join)?["data"]["mappings"].as_object_mut()
                {
                    mappings.remove(branch);
                }
            }
            "move_branch" => {
                if op["before"].is_string() == op["after"].is_string() {
                    return Err(failure(
                        "INVALID_ARGUMENT",
                        "Provide exactly one of before or after",
                    ));
                }
                let row = rows.remove(
                    pos.ok_or_else(|| failure("BRANCH_NOT_FOUND", "Branch does not exist"))?,
                );
                let (neighbor, after) = if let Some(k) = op["before"].as_str() {
                    (k, false)
                } else {
                    (text(op, "after")?, true)
                };
                let target = rows
                    .iter()
                    .position(|r| r[id_key] == neighbor)
                    .ok_or_else(|| failure("BRANCH_NOT_FOUND", "Neighbor branch does not exist"))?;
                rows.insert(target + usize::from(after), row);
            }
            _ => unreachable!(),
        }
        self.node_mut(key)?["data"][field] = json!(rows);
        if action == "add_branch" && crate::control::is_fork(kind) {
            self.edge(&json!({"sourceNodeID":key,"sourcePortID":branch,"targetNodeID":node["data"]["joinId"],"targetPortID":branch}),scope,true)?;
        }
        Ok(())
    }
    fn subgraph(&mut self, op: &Value, duplicate: bool) -> Result<Value> {
        let ids = op["nodeIds"]
            .as_array()
            .ok_or_else(|| failure("INVALID_ARGUMENT", "nodeIds must be an array"))?;
        if ids.is_empty() {
            return Err(failure("INVALID_ARGUMENT", "Select at least one node"));
        }
        let scope = op["targetScopeId"].as_str().unwrap_or("root");
        self.scope(scope)?;
        let mut selected = HashSet::new();
        let mut original_scope = None;
        for k in ids {
            let key = k
                .as_str()
                .ok_or_else(|| failure("INVALID_ARGUMENT", "nodeIds requires strings"))?;
            let n = self.node(key)?;
            if matches!(
                text(n, "type")?,
                "start" | "end" | "block-start" | "block-end"
            ) {
                return Err(failure(
                    "PROTECTED_STRUCTURE",
                    "Select the owning container instead of its boundary",
                ));
            }
            let s = text(n, "scopeId")?.to_owned();
            if original_scope.as_ref().is_some_and(|v| v != &s) {
                return Err(failure(
                    "INVALID_SCOPE",
                    "Selected roots must belong to one scope",
                ));
            }
            original_scope = Some(s);
            selected.insert(key.to_owned());
        }
        let old_scope = original_scope.unwrap();
        if !duplicate && scope == old_scope {
            return Ok(
                json!({"idMapping":selected.iter().map(|k|(k.clone(),k.clone())).collect::<HashMap<_,_>>()}),
            );
        }
        for k in selected.clone() {
            let n = self.node(&k)?;
            if crate::control::is_fork(text(n, "type")?) {
                selected.insert(text(&n["data"], "joinId")?.into());
            }
        }
        for k in &selected {
            if crate::control::is_join(text(self.node(k)?, "type")?)
                && !selected.contains(text(&self.node(k)?["data"], "forkId")?)
            {
                return Err(failure(
                    "PROTECTED_STRUCTURE",
                    "Select the owning fork together with its join",
                ));
            }
        }
        let roots = selected.clone();
        let mut queue: Vec<_> = selected.iter().cloned().collect();
        while let Some(k) = queue.pop() {
            for child in self.ids(&k) {
                if selected.insert(child.clone()) {
                    queue.push(child);
                }
            }
        }
        if selected.contains(scope) {
            return Err(failure(
                "INVALID_SCOPE",
                "A container cannot be moved inside itself",
            ));
        }
        let map: HashMap<String, String> = selected
            .iter()
            .map(|k| {
                (
                    k.clone(),
                    if duplicate {
                        op["idMapping"][k]
                            .as_str()
                            .map(str::to_owned)
                            .unwrap_or_else(id)
                    } else {
                        k.clone()
                    },
                )
            })
            .collect();
        if duplicate {
            let mut unique = HashSet::new();
            for v in map.values() {
                if self.0["nodes"].get(v).is_some()
                    || !unique.insert(v)
                    || v.contains('.')
                    || v == "root"
                {
                    return Err(failure(
                        "INVALID_NODE_ID",
                        "Clone IDs must be new and unique",
                    ));
                }
            }
        }
        let mut refmap = map.clone();
        for (k, v) in &map {
            refmap.insert(format!("{k}_locals"), format!("{v}_locals"));
        }
        let mut nodes = Vec::new();
        let mut scopes = Vec::new();
        for k in &selected {
            let mut n = self.node(k)?.clone();
            n["id"] = json!(map[k]);
            let old_owner = text(&n, "scopeId")?;
            n["scopeId"] = json!(if roots.contains(k) {
                scope.to_owned()
            } else {
                map.get(old_owner).cloned().unwrap_or(old_owner.into())
            });
            remap(&mut n["data"], &refmap);
            if duplicate {
                let x = n["meta"]["position"]["x"].as_f64().unwrap_or(0.);
                let y = n["meta"]["position"]["y"].as_f64().unwrap_or(0.);
                n["meta"]["position"] = json!({"x":x+40.,"y":y+120.});
            }
            nodes.push((map[k].clone(), n));
            if self.0["order"].get(k).is_some() {
                let order: Vec<_> = self.ids(k).iter().map(|id| map[id].clone()).collect();
                let mut edges = self.0["edges"][k].clone();
                remap(&mut edges, &map);
                scopes.push((map[k].clone(), json!(order), edges));
            }
        }
        let internal: Vec<_> = self.0["edges"][&old_scope]
            .as_array()
            .unwrap()
            .iter()
            .filter(|e| {
                roots.contains(e["sourceNodeID"].as_str().unwrap_or(""))
                    && roots.contains(e["targetNodeID"].as_str().unwrap_or(""))
            })
            .cloned()
            .collect();
        if !duplicate {
            let crossing = self.0["edges"][&old_scope]
                .as_array()
                .unwrap()
                .iter()
                .any(|e| {
                    roots.contains(e["sourceNodeID"].as_str().unwrap_or(""))
                        ^ roots.contains(e["targetNodeID"].as_str().unwrap_or(""))
                });
            if crossing && scope != old_scope {
                return Err(failure(
                    "INVALID_SCOPE",
                    "Disconnect boundary edges explicitly before moving a subgraph across scopes",
                ));
            }
            self.0["order"][&old_scope]
                .as_array_mut()
                .unwrap()
                .retain(|k| !roots.contains(k.as_str().unwrap_or("")));
            self.0["edges"][&old_scope]
                .as_array_mut()
                .unwrap()
                .retain(|e| {
                    !roots.contains(e["sourceNodeID"].as_str().unwrap_or(""))
                        && !roots.contains(e["targetNodeID"].as_str().unwrap_or(""))
                });
        }
        for (k, n) in nodes {
            self.0["nodes"][&k] = n;
        }
        for (k, o, e) in scopes {
            self.0["order"][&k] = o;
            self.0["edges"][&k] = e;
        }
        for k in self
            .ids(&old_scope)
            .into_iter()
            .filter(|k| roots.contains(k))
            .chain(roots.iter().filter(|_| !duplicate).cloned())
            .collect::<HashSet<_>>()
        {
            self.0["order"][scope]
                .as_array_mut()
                .unwrap()
                .push(json!(map[&k]));
        }
        let mut edges = json!(internal);
        remap(&mut edges, &map);
        self.0["edges"][scope]
            .as_array_mut()
            .unwrap()
            .extend(edges.as_array().unwrap().iter().cloned());
        Ok(json!({"idMapping":map}))
    }
}
