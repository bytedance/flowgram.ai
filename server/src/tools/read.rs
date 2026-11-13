use crate::{
    error::Result,
    model::Workflow,
    store::Store,
    workflow_edit::graph::{Document, failure, hash, references, text},
};
use base64::{Engine, engine::general_purpose::URL_SAFE_NO_PAD as B64};
use serde_json::{Value, json};
use std::collections::HashSet;
pub fn ok(context: Value, data: Value) -> Value {
    json!({"ok":true,"context":context,"data":data})
}
fn fingerprint(args: &Value) -> String {
    let mut a = args.clone();
    if let Some(o) = a.as_object_mut() {
        for k in ["cursor", "limit", "snapshotId"] {
            o.remove(k);
        }
    }
    hash(&a)
}
fn cursor(id: &str, offset: usize, filter: &str) -> String {
    B64.encode(json!({"id":id,"offset":offset,"filter":filter}).to_string())
}
fn decode(raw: &str) -> Result<Value> {
    let bytes = B64
        .decode(raw)
        .map_err(|_| failure("INVALID_CURSOR", "Cursor is invalid"))?;
    serde_json::from_slice(&bytes).map_err(|_| failure("INVALID_CURSOR", "Cursor is invalid"))
}
impl Store {
    pub(crate) async fn tool_value(&self, key: &str, run: Option<&str>) -> Result<Value> {
        // Results, immutable read snapshots and mutation diffs share the project's
        // lifetime. Age alone must not invalidate a reference held by a conversation,
        // unfinished run or undo receipt. Project deletion removes this database.
        let value: Option<String> = sqlx::query_scalar(
            "SELECT data FROM tool_values WHERE id=? AND (? IS NULL OR owner_run=?)",
        )
        .bind(key)
        .bind(run)
        .bind(run)
        .fetch_optional(&self.db)
        .await?;
        if let Some(data) = value {
            return Ok(serde_json::from_str(&data)?);
        }
        let data: Option<String> = sqlx::query_scalar(
            "SELECT data FROM agent_tool_results WHERE id=? AND (? IS NULL OR run_id=?)",
        )
        .bind(key)
        .bind(run)
        .bind(run)
        .fetch_optional(&self.db)
        .await?;
        serde_json::from_str(&data.ok_or_else(|| {
            failure(
                "RESULT_NOT_FOUND",
                "Result was not found in this project or run scope",
            )
        })?)
        .map_err(Into::into)
    }
    pub(crate) async fn bounded(&self, mut result: Value, run: Option<&str>) -> Result<Value> {
        // Keep small receipt facts (revision/counts/status/cursors) available even
        // when one field is large. Leave headroom for the outer result reference.
        while result.to_string().len() > 7600 {
            let largest = result["data"].as_object().and_then(|o| {
                o.iter()
                    .filter(|(_, v)| v.get("valueRef").is_none() && v.to_string().len() > 300)
                    .max_by_key(|(_, v)| v.to_string().len())
                    .map(|(k, v)| (k.clone(), v.clone()))
            });
            if let Some((field, value)) = largest {
                let reference = self.retain_value(&value, run).await?;
                result["data"][&field] = json!({"valueRef":reference});
            } else {
                let reference = self.retain_value(&result["data"], run).await?;
                result["data"] = json!({"valueRef":reference,"instruction":"Read the required path with read_tool_result."});
                break;
            }
        }
        Ok(result)
    }
    pub(crate) async fn page(
        &self,
        items: Vec<Value>,
        args: &Value,
        context: Value,
        run: Option<&str>,
    ) -> Result<Value> {
        let filter = fingerprint(args);
        let limit = args["limit"].as_u64().unwrap_or(20).clamp(1, 100) as usize;
        let (items, key, start, context) = if let Some(c) = args["cursor"].as_str() {
            let c = decode(c)?;
            if c["filter"] != filter {
                return Err(failure(
                    "INVALID_CURSOR",
                    "Cursor belongs to different filters",
                ));
            }
            let key = text(&c, "id")?.to_owned();
            let snapshot = self.tool_value(&key, run).await?;
            if snapshot["filter"] != filter {
                return Err(failure("INVALID_CURSOR", "Snapshot filters changed"));
            }
            (
                snapshot["items"]
                    .as_array()
                    .ok_or_else(|| failure("INVALID_CURSOR", "Cursor does not reference a page"))?
                    .clone(),
                key,
                c["offset"].as_u64().unwrap_or(0) as usize,
                snapshot["context"].clone(),
            )
        } else {
            let reference = self
                .retain_value(
                    &json!({"items":items,"filter":filter,"context":context}),
                    run,
                )
                .await?;
            (items, text(&reference, "resultId")?.into(), 0, context)
        };
        let mut page = Vec::new();
        let mut end = start;
        for item in items.iter().skip(start).take(limit) {
            let mut item = item.clone();
            while item.to_string().len() > 4000 {
                let largest = item.as_object().and_then(|o| {
                    o.iter()
                        .filter(|(k, v)| {
                            !matches!(
                                k.as_str(),
                                "nodeId"
                                    | "nodeType"
                                    | "workflowId"
                                    | "name"
                                    | "id"
                                    | "title"
                                    | "contractHash"
                            ) && v.get("valueRef").is_none()
                        })
                        .max_by_key(|(_, v)| v.to_string().len())
                        .map(|(k, v)| (k.clone(), v.clone()))
                });
                if let Some((field, value)) = largest {
                    if value.to_string().len() < 300 {
                        break;
                    }
                    item[&field] = json!({"valueRef":{"resultId":key,"path":format!("/items/{end}/{}",crate::workflow_edit::graph::escape(&field)),"kind":if value.is_string(){"text"}else if value.is_array(){"array"}else{"object"},"contentHash":hash(&value),"size":value.to_string().len()}});
                } else {
                    item = json!({"valueRef":{"resultId":key,"path":format!("/items/{end}"),"contentHash":hash(&item),"size":item.to_string().len()}});
                    break;
                }
            }
            if !page.is_empty() && json!(page).to_string().len() + item.to_string().len() > 6500 {
                break;
            }
            page.push(item);
            end += 1;
        }
        Ok(ok(
            context,
            json!({"items":page,"total":items.len(),"hasMore":end<items.len(),"nextCursor":if end<items.len(){Some(cursor(&key,end,&filter))}else{None}}),
        ))
    }
    pub(crate) async fn structured_tool_result(
        &self,
        args: &Value,
        run: Option<&str>,
    ) -> Result<Value> {
        let key = text(args, "resultId")?;
        let path = args["path"].as_str().unwrap_or("");
        let root = self.tool_value(key, run).await?;
        let value = root
            .pointer(path)
            .ok_or_else(|| failure("FIELD_NOT_FOUND", "Result path does not exist"))?;
        let filter = fingerprint(args);
        let start = if let Some(raw) = args["cursor"].as_str() {
            let c = decode(raw)?;
            if c["id"] != key || c["filter"] != filter {
                return Err(failure(
                    "INVALID_CURSOR",
                    "Cursor belongs to a different value or view",
                ));
            }
            c["offset"].as_u64().unwrap_or(0) as usize
        } else {
            args["offset"].as_u64().unwrap_or(0) as usize
        };
        let limit = args["limit"]
            .as_u64()
            .unwrap_or(if value.is_string() { 2000 } else { 20 })
            .clamp(1, if value.is_string() { 4000 } else { 100 }) as usize;
        let context = json!({"resultId":key,"path":path,"contentHash":hash(value)});
        let mut data = json!({});
        let end;
        let total;
        if let Some(s) = value.as_str() {
            if args["view"] == "lines" || args.get("startLine").is_some() {
                let lines: Vec<_> = s.split_inclusive('\n').collect();
                let begin = if args["cursor"].is_string() {
                    start
                } else {
                    args["startLine"].as_u64().unwrap_or(1).saturating_sub(1) as usize
                };
                let count = args["lineCount"].as_u64().unwrap_or(30).clamp(1, 100) as usize;
                let mut content = String::new();
                let mut pos = begin;
                for line in lines.iter().skip(begin).take(count) {
                    if serde_json::to_string(&content)?.len() + serde_json::to_string(line)?.len()
                        > 5500
                    {
                        if content.is_empty() {
                            return Ok(ok(
                                context,
                                json!({"kind":"text","valueRef":{"resultId":key,"path":path},"instruction":"This line exceeds the page budget; use view=characters."}),
                            ));
                        }
                        break;
                    }
                    content.push_str(line);
                    pos += 1;
                }
                end = pos;
                total = lines.len();
                data["kind"] = json!("text");
                data["startLine"] = json!(begin + 1);
                data["endLine"] = json!(end);
                data["content"] = json!(content);
            } else {
                let mut content = String::new();
                let mut bytes = 0;
                for c in s.chars().skip(start).take(limit) {
                    // Budget the encoded JSON, including escaped control characters.
                    let size = serde_json::to_string(&c.to_string())?.len() - 2;
                    if bytes + size > 5500 {
                        break;
                    }
                    content.push(c);
                    bytes += size;
                }
                end = start + content.chars().count();
                total = s.chars().count();
                data = json!({"kind":"text","offset":start,"endOffset":end,"totalCharacters":total,"content":content});
            }
        } else if let Some(a) = value.as_array() {
            let mut items = Vec::new();
            let mut pos = start;
            for item in a.iter().skip(start).take(limit) {
                let item = if item.to_string().len() > 4000 {
                    json!({"valueRef":{"resultId":key,"path":format!("{path}/{pos}"),"contentHash":hash(item),"size":item.to_string().len()}})
                } else {
                    item.clone()
                };
                if !items.is_empty()
                    && json!(items).to_string().len() + item.to_string().len() > 6000
                {
                    break;
                }
                items.push(item);
                pos += 1;
            }
            end = pos;
            total = a.len();
            data = json!({"kind":"array","items":items,"offset":start});
        } else if let Some(o) = value.as_object() {
            let mut fields = serde_json::Map::new();
            let mut pos = start;
            for (k, v) in o.iter().skip(start).take(limit) {
                let v = if v.to_string().len() > 3000 {
                    json!({"valueRef":{"resultId":key,"path":format!("{path}/{}",crate::workflow_edit::graph::escape(k)),"kind":if v.is_string(){"text"}else if v.is_array(){"array"}else{"object"},"contentHash":hash(v),"size":v.to_string().len()}})
                } else {
                    v.clone()
                };
                if !fields.is_empty()
                    && json!(fields).to_string().len() + v.to_string().len() > 6000
                {
                    break;
                }
                fields.insert(k.clone(), v);
                pos += 1;
            }
            end = pos;
            total = o.len();
            data = json!({"kind":"object","fields":fields,"offset":start});
        } else {
            end = 1;
            total = 1;
            data = json!({"kind":"scalar","value":value});
        }
        data["total"] = json!(total);
        data["hasMore"] = json!(end < total);
        data["nextCursor"] = if end < total {
            json!(cursor(key, end, &filter))
        } else {
            Value::Null
        };
        data["nextOffset"] = if end < total { json!(end) } else { Value::Null };
        self.bounded(ok(context, data), run).await
    }
    pub(crate) async fn tool_workflow(
        &self,
        args: &Value,
        run: Option<&str>,
    ) -> Result<(Workflow, Value)> {
        let workflow = text(args, "workflowId")?;
        if let Some(snapshot) = args["snapshotId"].as_str() {
            let v = self.tool_value(snapshot, run).await?;
            let mut w: Workflow = serde_json::from_value(v.clone())?;
            // A project import preserves immutable payloads and hashes. The current
            // Store, rather than historical origin metadata, defines read authority.
            w.project_id = self.projects().await?[0].id.clone();
            if w.id != workflow {
                return Err(failure(
                    "INVALID_CURSOR",
                    "Snapshot belongs to a different workflow",
                ));
            }
            let source = v["sourceRunId"].as_str();
            if args["source"]["runId"]
                .as_str()
                .is_some_and(|requested| Some(requested) != source)
            {
                return Err(failure(
                    "INVALID_CURSOR",
                    "Snapshot belongs to a different run source",
                ));
            }
            let h = hash(&w.schema);
            let context = json!({"workflowId":w.id,"projectId":w.project_id,"revision":w.revision,"snapshotId":snapshot,"definitionHash":h,"runId":source});
            return Ok((w, context));
        }
        let source = run.or_else(|| args["source"]["runId"].as_str());
        let w = if let Some(run) = source {
            self.pinned_workflow(run, workflow).await?
        } else {
            self.workflow(workflow).await?
        };
        let mut retained = serde_json::to_value(&w)?;
        retained["sourceRunId"] = json!(source);
        let reference = self.retain_value(&retained, source).await?;
        let context = json!({"workflowId":w.id,"projectId":w.project_id,"revision":w.revision,"snapshotId":reference["resultId"],"definitionHash":hash(&w.schema),"runId":source});
        Ok((w, context))
    }
    pub(crate) async fn read_workflow_tool(
        &self,
        name: &str,
        args: &Value,
        run: Option<&str>,
    ) -> Result<Value> {
        if args["cursor"].is_string() {
            return self.page(vec![], args, json!({}), run).await;
        }
        let (w, context) = self.tool_workflow(args, run).await?;
        let doc = Document::read(&w.name, &w.schema)?;
        let scope = args["scopeId"].as_str().unwrap_or("root");
        doc.scope(scope)?;
        let view = args["view"].as_str().unwrap_or("summary");
        if name == "read_workflow" && view == "summary" {
            return Ok(ok(
                context,
                json!({"name":w.name,"nodeCount":doc.0["nodes"].as_object().unwrap().len(),"edgeCount":doc.0["edges"].as_object().unwrap().values().map(|v|v.as_array().map_or(0,Vec::len)).sum::<usize>(),"scopeCount":doc.0["order"].as_object().unwrap().len(),"inputs":doc.ids("root").iter().find_map(|id| { let n=&doc.0["nodes"][id]; (n["type"]=="start").then(||n["data"]["outputs"].clone()) }),"outputs":doc.ids("root").iter().find_map(|id| { let n=&doc.0["nodes"][id]; (n["type"]=="end").then(||n["data"]["inputs"].clone()) }),"instruction":"Use outline for topology or nodes/fields with explicit nodeIds and paths."}),
            ));
        }
        let summary = |key: &str| {
            let n = &doc.0["nodes"][key];
            json!({"nodeId":key,"nodeType":n["type"],"title":n["data"]["title"],"scopeId":n["scopeId"],"childCount":doc.ids(key).len()})
        };
        let ids: Vec<String> = args["nodeIds"]
            .as_array()
            .map(|a| {
                a.iter()
                    .filter_map(Value::as_str)
                    .map(str::to_owned)
                    .collect()
            })
            .unwrap_or_default();
        if name == "search_workflow" {
            let query = args["query"].as_str().unwrap_or("").to_lowercase();
            let mut related = None;
            if let Some(relation) = args["relation"].as_str() {
                if ids.is_empty() {
                    return Err(failure(
                        "INVALID_ARGUMENT",
                        "Relation searches require nodeIds",
                    ));
                }
                let mut found = HashSet::new();
                let mut queue = ids.clone();
                while let Some(key) = queue.pop() {
                    doc.node(&key)?;
                    let mut next = Vec::new();
                    match relation {
                        "upstream" | "downstream" => {
                            for edges in doc.0["edges"].as_object().unwrap().values() {
                                for e in edges.as_array().unwrap() {
                                    let (a, b) = if relation == "upstream" {
                                        ("targetNodeID", "sourceNodeID")
                                    } else {
                                        ("sourceNodeID", "targetNodeID")
                                    };
                                    if e[a] == key {
                                        next.push(text(e, b)?.to_owned());
                                    }
                                }
                            }
                        }
                        "references" => {
                            let mut refs = HashSet::new();
                            references(&doc.node(&key)?["data"], &mut refs);
                            next.extend(refs);
                        }
                        "consumers" => {
                            for (k, n) in doc.0["nodes"].as_object().unwrap() {
                                let mut refs = HashSet::new();
                                references(&n["data"], &mut refs);
                                if refs.contains(&key) {
                                    next.push(k.clone());
                                }
                            }
                        }
                        _ => return Err(failure("INVALID_ARGUMENT", "Unknown relation")),
                    }
                    for n in next {
                        if found.insert(n.clone()) && matches!(relation, "upstream" | "downstream")
                        {
                            queue.push(n);
                        }
                    }
                }
                related = Some(found);
            }
            let items = doc.0["nodes"]
                .as_object()
                .unwrap()
                .iter()
                .filter(|(k, n)| {
                    related.as_ref().is_none_or(|r| r.contains(*k))
                        && (args.get("scopeId").is_none() || n["scopeId"] == scope)
                        && (args["nodeTypes"]
                            .as_array()
                            .is_none_or(|a| a.contains(&n["type"])))
                        && (query.is_empty()
                            || format!("{k} {} {}", n["type"], n["data"])
                                .to_lowercase()
                                .contains(&query))
                })
                .map(|(k, _)| summary(k))
                .collect();
            return self.page(items, args, context, run).await;
        }
        let items = match view {
            "outline" => {
                let graph: crate::model::Graph = serde_json::from_value(if scope == "root" {
                    w.schema.clone()
                } else {
                    json!({"nodes":doc.ids(scope).iter().map(|k|doc.node(k).unwrap().clone()).collect::<Vec<_>>(),"edges":doc.0["edges"][scope]})
                })?;
                let mut items = Vec::new();
                for key in doc.ids(scope) {
                    let mut s = summary(&key);
                    let node = graph.nodes.iter().find(|n| n.id == key).unwrap();
                    let ports = crate::control::ports(node, &graph);
                    s["ports"] = json!({"inputs":ports.0,"outputs":ports.1});
                    s["outgoing"] = json!(
                        doc.0["edges"][scope]
                            .as_array()
                            .unwrap()
                            .iter()
                            .filter(|e| e["sourceNodeID"] == key)
                            .collect::<Vec<_>>()
                    );
                    items.push(s);
                }
                items
            }
            "nodes" | "fields" => {
                if ids.is_empty() {
                    return Err(failure(
                        "INVALID_ARGUMENT",
                        "nodes/fields views require nodeIds",
                    ));
                }
                if view == "fields" && args["paths"].as_array().is_none_or(Vec::is_empty) {
                    return Err(failure(
                        "INVALID_ARGUMENT",
                        "fields view requires paths relative to node.data",
                    ));
                }
                let mut items = Vec::new();
                for key in ids {
                    let n = doc.node(&key)?;
                    let mut item = summary(&key);
                    let mut fields = serde_json::Map::new();
                    if let Some(paths) = args["paths"].as_array() {
                        for path in paths {
                            let p = path.as_str().ok_or_else(|| {
                                failure("INVALID_ARGUMENT", "paths requires strings")
                            })?;
                            let value = n["data"].pointer(p).ok_or_else(|| {
                                failure(
                                    "FIELD_NOT_FOUND",
                                    format!("Field {p} does not exist on {key}"),
                                )
                            })?;
                            let value = if value.is_string() || value.to_string().len() > 2000 {
                                json!({"valueRef":self.retain_value(value,run).await?})
                            } else {
                                value.clone()
                            };
                            fields.insert(p.into(), value);
                        }
                        item["fields"] = json!(fields);
                    } else {
                        item["data"] = n["data"].clone();
                    }
                    items.push(item);
                }
                items
            }
            _ => return Err(failure("INVALID_ARGUMENT", "Unknown workflow view")),
        };
        self.page(items, args, context, run).await
    }
}
