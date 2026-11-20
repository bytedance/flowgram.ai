use crate::{
    error::{Error, Result},
    model::{Graph, Node, Run},
    store::{Store, id, now},
};
use futures_util::{StreamExt, future::BoxFuture};
use serde_json::{Value, json};
use std::collections::{HashMap, HashSet, VecDeque};
use tokio_util::sync::CancellationToken;

pub(crate) type Values = HashMap<String, Value>;
pub const SUPPORTED: &[&str] = &[
    "start",
    "end",
    "condition",
    "loop",
    "block-start",
    "block-end",
    "http",
    "llm",
    "assign",
    "template",
    "json-parse",
    "json-stringify",
    "text",
    "array",
    "delay",
    "subworkflow",
    "agent",
];
pub fn supported_types() -> Vec<&'static str> {
    let mut seen = HashSet::new();
    SUPPORTED
        .iter()
        .copied()
        .chain(
            crate::nodes::CATALOG
                .iter()
                .filter_map(|v| v["type"].as_str()),
        )
        .chain(
            crate::control::CATALOG
                .iter()
                .filter_map(|v| v["type"].as_str()),
        )
        .filter(|kind| seen.insert(*kind))
        .collect()
}
pub fn is_supported(kind: &str) -> bool {
    SUPPORTED.contains(&kind)
        || crate::nodes::supported(kind)
        || crate::control::definition(kind).is_some()
}
pub fn validate(schema: &Value) -> Result<Vec<String>> {
    let graph: Graph = serde_json::from_value(schema.clone())
        .map_err(|e| Error::Invalid(format!("Invalid workflow format: {e}")))?;
    fn size(nodes: &[Node], depth: usize, count: &mut usize) -> bool {
        *count += nodes.len();
        depth <= 16
            && *count <= 1000
            && nodes
                .iter()
                .all(|node| size(&node.blocks, depth + 1, count))
    }
    if !size(&graph.nodes, 0, &mut 0) {
        return Ok(vec![
            "A workflow may contain at most 1000 nodes and 16 nested scopes".into(),
        ]);
    }
    let mut errors = vec![];
    for kind in ["start", "end"] {
        if graph.nodes.iter().filter(|n| n.kind == kind).count() != 1 {
            errors.push(format!("Exactly one {kind} node is required"));
        }
    }
    check_graph(&graph, &mut errors);
    crate::control::validate(
        &graph,
        &HashSet::new(),
        None,
        &mut HashSet::new(),
        &mut errors,
    );
    Ok(errors)
}
fn check_graph(graph: &Graph, errors: &mut Vec<String>) {
    let mut ids = HashSet::new();
    for n in &graph.nodes {
        if !ids.insert(&n.id) {
            errors.push(format!("Duplicate node ID: {}", n.id));
        }
        if !is_supported(&n.kind) {
            errors.push(format!(
                "Node {} has an unsupported executable type: {}",
                n.id, n.kind
            ));
        }
        if let Err(error) = crate::nodes::check_static(n, None) {
            errors.push(format!("Node {}: {error}", n.id));
        }
        if crate::control::is_loop(&n.kind) {
            for kind in ["block-start", "block-end"] {
                if n.blocks.iter().filter(|child| child.kind == kind).count() != 1 {
                    errors.push(format!(
                        "Loop {} must contain exactly one {kind} node",
                        n.id
                    ));
                }
            }
        }
        if !n.blocks.is_empty() {
            check_graph(
                &Graph {
                    nodes: n.blocks.clone(),
                    edges: n.edges.clone(),
                },
                errors,
            );
        }
    }
    for e in &graph.edges {
        if !ids.contains(&e.source) || !ids.contains(&e.target) {
            errors.push("An edge references a nonexistent node".into());
        }
    }
    if topological(graph).is_err() {
        errors.push("Edges cannot form cycles; use a loop node".into());
    }
    let start = graph
        .nodes
        .iter()
        .find(|n| matches!(n.kind.as_str(), "start" | "block-start"));
    if let Some(start) = start {
        let mut reachable = HashSet::from([start.id.clone()]);
        let mut pending = vec![start.id.clone()];
        while let Some(source) = pending.pop() {
            for edge in graph.edges.iter().filter(|e| e.source == source) {
                if reachable.insert(edge.target.clone()) {
                    pending.push(edge.target.clone());
                }
            }
        }
        for n in &graph.nodes {
            if !reachable.contains(&n.id)
                && !(n.kind == "block-end"
                    && graph.nodes.iter().any(|node| {
                        matches!(node.kind.as_str(), "control.break" | "control.continue")
                    }))
            {
                errors.push(format!("Node {} is unreachable from the input node", n.id));
            }
        }
    }
}
pub(crate) fn validate_run_inputs(schema: &Value, input: &Value) -> Result<()> {
    if let Some(contract) = schema["nodes"]
        .as_array()
        .and_then(|nodes| nodes.iter().find(|node| node["type"] == "start"))
        .and_then(|node| node["data"].get("outputs"))
        .filter(|value| value.is_object())
    {
        let issues = crate::nodes::schema_issues(input, contract, false)?;
        if !issues.is_empty() {
            return Err(Error::Invalid(format!(
                "Run inputs do not match the start schema: {}",
                json!(issues)
            )));
        }
    }
    Ok(())
}
fn topological(graph: &Graph) -> Result<Vec<String>> {
    let mut degree: HashMap<String, usize> =
        graph.nodes.iter().map(|n| (n.id.clone(), 0)).collect();
    for edge in &graph.edges {
        if let Some(d) = degree.get_mut(&edge.target) {
            *d += 1;
        }
    }
    if degree.len() != graph.nodes.len() {
        return Err(Error::Invalid(
            "Duplicate node IDs cannot be scheduled".into(),
        ));
    }
    let mut queue: VecDeque<String> = graph
        .nodes
        .iter()
        .filter(|n| degree.get(&n.id) == Some(&0))
        .map(|n| n.id.clone())
        .collect();
    let mut order = vec![];
    while let Some(current) = queue.pop_front() {
        order.push(current.clone());
        for edge in graph.edges.iter().filter(|e| e.source == current) {
            if let Some(d) = degree.get_mut(&edge.target) {
                *d -= 1;
                if *d == 0 {
                    queue.push_back(edge.target.clone());
                }
            }
        }
    }
    if order.len() != graph.nodes.len() {
        return Err(Error::Invalid("The workflow contains a cycle".into()));
    }
    Ok(order)
}
pub fn resolve(value: &Value, values: &Values) -> Result<Value> {
    match value.get("type").and_then(Value::as_str) {
        Some("constant") => Ok(value.get("content").cloned().unwrap_or(Value::Null)),
        Some("ref") => {
            let path = value["content"]
                .as_array()
                .ok_or_else(|| Error::Invalid("Invalid variable reference format".into()))?;
            let node = path
                .first()
                .and_then(Value::as_str)
                .ok_or_else(|| Error::Invalid("Variable reference is missing a node".into()))?;
            let mut current = values.get(node).ok_or_else(|| {
                Error::Execution(format!("Referenced node {node} has not executed"))
            })?;
            for key in path.iter().skip(1) {
                current = match key.as_str() {
                    Some(key) => current
                        .get(key)
                        .or_else(|| key.parse::<usize>().ok().and_then(|i| current.get(i))),
                    None => None,
                }
                .ok_or_else(|| Error::Execution("Referenced field does not exist".into()))?;
            }
            Ok(current.clone())
        }
        Some("template") => {
            let source = value["content"].as_str().unwrap_or_default();
            let mut remaining = source;
            let mut text = String::new();
            while let Some(begin) = remaining.find("{{") {
                text.push_str(&remaining[..begin]);
                let Some(end) = remaining[begin + 2..].find("}}") else {
                    return Err(Error::Invalid("Unclosed template reference".into()));
                };
                let end = begin + 2 + end;
                let path: Vec<_> = remaining[begin + 2..end]
                    .trim()
                    .split('.')
                    .map(|s| json!(s))
                    .collect();
                let result = resolve(&json!({"type":"ref","content":path}), values)?;
                let replacement = result
                    .as_str()
                    .map(str::to_owned)
                    .unwrap_or_else(|| result.to_string());
                text.push_str(&replacement);
                if text.len() > 1_000_000 {
                    return Err(Error::Execution("Template output is too large".into()));
                }
                remaining = &remaining[end + 2..];
            }
            text.push_str(remaining);
            Ok(json!(text))
        }
        Some("expression") => Err(Error::Invalid(
            "Expression execution is not supported".into(),
        )),
        _ => Ok(value.clone()),
    }
}
/// Missing object fields can be handled by explicit default / existence capabilities.
/// An unavailable node or malformed reference still fails instead of becoming null.
pub fn resolve_optional(value: &Value, values: &Values) -> Result<Option<Value>> {
    if value["type"] != "ref" {
        return resolve(value, values).map(Some);
    }
    let path = value["content"]
        .as_array()
        .ok_or_else(|| Error::Invalid("Invalid variable reference format".into()))?;
    let node = path
        .first()
        .and_then(Value::as_str)
        .ok_or_else(|| Error::Invalid("Variable reference is missing a node".into()))?;
    let mut current = values
        .get(node)
        .ok_or_else(|| Error::Execution(format!("Referenced node {node} has not executed")))?;
    for key in path.iter().skip(1) {
        let key = key
            .as_str()
            .ok_or_else(|| Error::Invalid("Reference path segments must be strings".into()))?;
        let found = if current.is_array() {
            key.parse::<usize>().ok().and_then(|i| current.get(i))
        } else {
            current.get(key)
        };
        let Some(found) = found else { return Ok(None) };
        current = found;
    }
    Ok(Some(current.clone()))
}
pub(crate) fn inputs(node: &Node, values: &Values) -> Result<Value> {
    let mut output = serde_json::Map::new();
    if let Some(fields) = node.data.get("inputsValues").and_then(Value::as_object) {
        for (key, value) in fields {
            if let Some(spec) = crate::nodes::definition(&node.kind)
                && spec["inputSchema"]["properties"].get(key).is_none()
            {
                return Err(Error::Invalid(format!(
                    "{key}: this input field is not declared by the node"
                )));
            }
            if crate::nodes::supported(&node.kind)
                && !crate::nodes::fields(&node.kind, &node.data)
                    .any(|field| field["key"].as_str() == Some(&format!("inputsValues.{key}")))
            {
                continue;
            }
            if node.kind == "data.default" && key == "value" {
                if let Some(value) = resolve_optional(value, values)? {
                    output.insert(key.clone(), value);
                }
                continue;
            }
            output.insert(key.clone(), resolve(value, values)?);
        }
    }
    Ok(Value::Object(output))
}
fn condition(node: &Node, values: &Values) -> Result<String> {
    if let Some(conditions) = node.data["conditions"].as_array() {
        for c in conditions {
            let left = resolve(&c["value"]["left"], values)?;
            let right = resolve(&c["value"]["right"], values)?;
            let pass = match c["value"]["operator"].as_str().unwrap_or("eq") {
                "eq" | "equal" => left == right,
                "neq" | "not_equal" => left != right,
                "gt" => left
                    .as_f64()
                    .zip(right.as_f64())
                    .is_some_and(|(a, b)| a > b),
                "lt" => left
                    .as_f64()
                    .zip(right.as_f64())
                    .is_some_and(|(a, b)| a < b),
                "contains" => left
                    .as_str()
                    .zip(right.as_str())
                    .is_some_and(|(a, b)| a.contains(b)),
                op => {
                    return Err(Error::Invalid(format!(
                        "Unsupported condition operator: {op}"
                    )));
                }
            };
            if pass {
                return Ok(c["key"].as_str().unwrap_or("true").into());
            }
        }
    }
    Ok("else".into())
}
impl Store {
    pub async fn start_run(
        &self,
        workflow: &str,
        session: Option<String>,
        input: Value,
    ) -> Result<Run> {
        self.start_run_requested(workflow, session, input, None, None)
            .await
    }
    pub(crate) async fn start_run_requested(
        &self,
        workflow: &str,
        session: Option<String>,
        input: Value,
        expected: Option<i64>,
        request: Option<(&str, &str)>,
    ) -> Result<Run> {
        if !input.is_object() {
            return Err(Error::Invalid("Run inputs must be a JSON object".into()));
        }
        let _guard = self.workflow_lock.lock().await;
        self.require_unarchived("workflow", workflow).await?;
        if let Some(session) = &session {
            self.require_unarchived("session", session).await?;
        }
        let w = self.workflow(workflow).await?;
        if expected.is_some_and(|revision| revision != w.revision) {
            return Err(Error::Conflict);
        }
        let errors = validate(&w.schema)?;
        if !errors.is_empty() {
            return Err(Error::Invalid(errors.join("; ")));
        }
        if let Some(session) = &session
            && self.session(session).await?.project_id != w.project_id
        {
            return Err(Error::Invalid(
                "The session and workflow must belong to the same project".into(),
            ));
        }
        validate_run_inputs(&w.schema, &input)?;
        let dependencies = self.capture_workflows(&w).await?;
        let mut tx = self.db.begin().await?;
        let run = self
            .prepare_run(&w, session, &input, &dependencies, &mut tx)
            .await?;
        self.pin_models(&mut tx, &run.id, &dependencies, None)
            .await?;
        crate::tools::persist_run_request(&mut tx, request, &run).await?;
        tx.commit().await?;
        self.launch_run(run.clone(), w, input, None).await?;
        Ok(run)
    }
    pub(crate) async fn prepare_run(
        &self,
        workflow: &crate::model::Workflow,
        session: Option<String>,
        input: &Value,
        dependencies: &[crate::model::Workflow],
        tx: &mut sqlx::Transaction<'_, sqlx::Sqlite>,
    ) -> Result<Run> {
        let run = Run {
            id: id(),
            workflow_id: workflow.id.clone(),
            session_id: session,
            status: "running".into(),
            inputs: input.clone(),
            outputs: json!({}),
            error: None,
            revision: workflow.revision,
            created_at: now(),
            test_node_id: None,
        };
        sqlx::query("INSERT INTO runs VALUES(?,?,?,?,?,?,?,?,?)")
            .bind(&run.id)
            .bind(&run.workflow_id)
            .bind(&run.session_id)
            .bind(&run.status)
            .bind(input.to_string())
            .bind("{}")
            .bind(Option::<String>::None)
            .bind(run.revision)
            .bind(&run.created_at)
            .execute(&mut **tx)
            .await?;
        sqlx::query("INSERT INTO run_definitions VALUES(?,?)")
            .bind(&run.id)
            .bind(workflow.schema.to_string())
            .execute(&mut **tx)
            .await?;
        crate::run_snapshot::persist(tx, &run.id, dependencies).await?;
        Ok(run)
    }
    pub(crate) async fn launch_run(
        &self,
        run: Run,
        workflow: crate::model::Workflow,
        input: Value,
        policy: Option<crate::services::ExecutionPolicy>,
    ) -> Result<()> {
        let token = CancellationToken::new();
        self.active
            .lock()
            .await
            .insert(run.id.clone(), token.clone());
        // The persisted run is authoritative even if a client disconnects here.
        self.record_run_start(&run, &workflow.schema).await?;
        let store = self.clone();
        tokio::spawn(async move {
            let future = store.execute_graph(
                serde_json::from_value(workflow.schema).expect("validated graph"),
                input,
                HashMap::new(),
                &run.id,
                &token,
                0,
            );
            let result = if let Some(policy) = policy {
                match tokio::time::timeout(
                    std::time::Duration::from_millis(policy.timeout_ms),
                    future,
                )
                .await
                {
                    Ok(Ok(value)) => crate::services::check_contract(&policy.output_schema, &value)
                        .map(|_| value),
                    Ok(Err(error)) => Err(error),
                    Err(_) => {
                        token.cancel();
                        Err(Error::Execution(
                            "Service execution timed out; completed side effects may remain".into(),
                        ))
                    }
                }
            } else {
                future.await
            };
            let (status, output, error) = match result {
                Ok(value) => ("succeeded", value, None),
                Err(Error::Cancelled) => ("canceled", json!({}), Some("Run canceled".into())),
                Err(e) => ("failed", json!({}), Some(e.to_string())),
            };
            let _ = sqlx::query("UPDATE runs SET status=?,outputs=?,error=? WHERE id=?")
                .bind(status)
                .bind(output.to_string())
                .bind(&error)
                .bind(&run.id)
                .execute(&store.db)
                .await;
            let _ = store
                .emit(
                    "run_finished",
                    &run.id,
                    json!({"status":status,"outputs":output,"error":error}),
                )
                .await;
            store.active.lock().await.remove(&run.id);
        });
        Ok(())
    }
    pub(crate) async fn execute_scoped_node(
        &self,
        node: &Node,
        incoming: Value,
        values: &Values,
        run: &str,
        cancel: &CancellationToken,
        context: &crate::control_runtime::ExecutionContext,
    ) -> Result<(Value, Option<String>)> {
        if crate::nodes::supported(&node.kind) {
            crate::nodes::check_static(node, Some(&incoming))?;
        }
        let default = if matches!(
            node.kind.as_str(),
            "llm" | "agent" | "loop" | "control.repeat" | "subworkflow"
        ) {
            180_000
        } else {
            60_000
        };
        let timeout = match node.data.pointer("/runtime/timeoutMs") {
            None | Some(Value::Null) => default,
            Some(value) => value
                .as_u64()
                .filter(|v| (10..=180_000).contains(v))
                .ok_or_else(|| {
                    Error::Invalid("Node timeout must be between 10 and 180000 milliseconds".into())
                })?,
        };
        let token = cancel.child_token();
        let future = async {
            let _permit = if crate::control::is_loop(&node.kind) || node.kind == "subworkflow" {
                None
            } else {
                Some(
                    context
                        .permits
                        .clone()
                        .acquire_owned()
                        .await
                        .map_err(|_| Error::Cancelled)?,
                )
            };
            if node.kind == "http" {
                let call = self
                    .begin_trace_call(
                        run,
                        &node.id,
                        "http",
                        "HTTP request",
                        crate::run_trace::safe_payload(incoming.clone()),
                        json!({}),
                        context,
                    )
                    .await?;
                let result = self
                    .execute_node(node, incoming, values, run, &token, context)
                    .await;
                let payload = result
                    .as_ref()
                    .map(|(output, _)| output.clone())
                    .map_err(|error| Error::Execution(error.to_string()));
                self.finish_trace_call(run, &node.id, "http", &call, &payload, context)
                    .await?;
                result
            } else {
                self.execute_node(node, incoming, values, run, &token, context)
                    .await
            }
        };
        let result = tokio::select! {
            _ = cancel.cancelled() => Err(Error::Cancelled),
            result = tokio::time::timeout(std::time::Duration::from_millis(timeout), future) => {
                result.map_err(|_| Error::Execution(format!("Node execution exceeded {timeout} milliseconds")))?
            }
        };
        token.cancel();
        result
    }
    #[allow(clippy::too_many_arguments)]
    async fn execute_node(
        &self,
        node: &Node,
        incoming: Value,
        values: &Values,
        run: &str,
        cancel: &CancellationToken,
        context: &crate::control_runtime::ExecutionContext,
    ) -> Result<(Value, Option<String>)> {
        if crate::nodes::supported(&node.kind) {
            let (node, scope) = (node.clone(), values.clone());
            let result =
                tokio::task::spawn_blocking(move || crate::nodes::execute(&node, incoming, &scope))
                    .await
                    .map_err(|e| Error::Execution(format!("Node execution failed: {e}")))??;
            return Ok((result, None));
        }
        match node.kind.as_str() {
            "start" | "block-start" => Ok((incoming.clone(), None)),
            "end" | "block-end" | "assign" => Ok((incoming.clone(), None)),
            "condition" => {
                let branch = condition(node, values)?;
                Ok((json!({"branch":branch}), Some(branch)))
            }
            "http" => {
                let url = incoming["url"]
                    .as_str()
                    .or_else(|| node.data["url"].as_str())
                    .ok_or_else(|| Error::Invalid("HTTP node is missing url".into()))?;
                let method = incoming["method"].as_str().unwrap_or("GET");
                if !["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"].contains(&method) {
                    return Err(Error::Invalid("Unsupported HTTP method".into()));
                }
                let url = reqwest::Url::parse(url)
                    .map_err(|_| Error::Invalid("Invalid HTTP request URL".into()))?;
                if !["http", "https"].contains(&url.scheme()) {
                    return Err(Error::Invalid("Request URLs must use HTTP or HTTPS".into()));
                }
                let mut request = self.client.request(
                    method
                        .parse()
                        .map_err(|_| Error::Invalid("Invalid HTTP method".into()))?,
                    url,
                );
                if let Some(query) = incoming.get("query").filter(|v| !v.is_null()) {
                    let query = query.as_object().ok_or_else(|| {
                        Error::Invalid("Query parameters must be an object".into())
                    })?;
                    let mut pairs = Vec::new();
                    for (key, value) in query {
                        let values = value
                            .as_array()
                            .cloned()
                            .unwrap_or_else(|| vec![value.clone()]);
                        for value in values {
                            if value.is_object() || value.is_array() || value.is_null() {
                                return Err(Error::Invalid(
                                    "Query parameters must be strings, numbers, or booleans".into(),
                                ));
                            }
                            pairs.push((
                                key.clone(),
                                value
                                    .as_str()
                                    .map(str::to_owned)
                                    .unwrap_or_else(|| value.to_string()),
                            ));
                        }
                    }
                    request = request.query(&pairs);
                }
                if let Some(headers) = incoming["headers"].as_object() {
                    for (name, value) in headers {
                        request = request.header(
                            name,
                            value.as_str().ok_or_else(|| {
                                Error::Invalid("HTTP header values must be strings".into())
                            })?,
                        );
                    }
                }
                let mut credential_secret = None;
                if let Some((name, header, prefix)) = crate::service_credentials::slot(node)? {
                    let secret = self.run_connection_secret(run, &name).await?;
                    let mut headers = reqwest::header::HeaderMap::new();
                    if let Some(values) = incoming["headers"].as_object() {
                        for (key, value) in values {
                            let key = reqwest::header::HeaderName::from_bytes(key.as_bytes())
                                .map_err(|_| Error::Invalid("Invalid HTTP header name".into()))?;
                            let value = reqwest::header::HeaderValue::from_str(
                                value.as_str().unwrap_or_default(),
                            )
                            .map_err(|_| Error::Invalid("Invalid HTTP header value".into()))?;
                            headers.insert(key, value);
                        }
                    }
                    headers.insert(
                        reqwest::header::HeaderName::from_bytes(header.as_bytes())
                            .expect("validated header"),
                        reqwest::header::HeaderValue::from_str(&format!("{prefix}{secret}"))
                            .map_err(|_| {
                                Error::Execution("Invalid HTTP credential value".into())
                            })?,
                    );
                    request = request.headers(headers);
                    credential_secret = Some(secret);
                }
                if let Some(body) = incoming.get("body") {
                    if let Some(text) = body.as_str() {
                        request = request.body(text.to_owned());
                    } else {
                        request = request.json(body);
                    }
                }
                let response = request
                    .send()
                    .await
                    .map_err(|error| Error::Execution(format!("HTTP request failed: {error}")))?;
                let status = response.status().as_u16();
                let headers: serde_json::Map<String, Value> = response
                    .headers()
                    .iter()
                    .filter_map(|(key, value)| {
                        if ["set-cookie", "authorization", "proxy-authorization"]
                            .contains(&key.as_str())
                        {
                            return None;
                        }
                        value.to_str().ok().map(|v| {
                            (
                                key.to_string(),
                                json!(
                                    credential_secret
                                        .as_ref()
                                        .map(|secret| v.replace(secret, "[redacted]"))
                                        .unwrap_or_else(|| v.to_owned())
                                ),
                            )
                        })
                    })
                    .collect();
                let mut chunks = response.bytes_stream();
                let mut bytes = Vec::new();
                while let Some(chunk) = chunks.next().await {
                    let chunk = chunk.map_err(|e| Error::Execution(e.to_string()))?;
                    if bytes.len() + chunk.len() > 2_000_000 {
                        return Err(Error::Execution("HTTP response exceeded 2 MB".into()));
                    }
                    bytes.extend_from_slice(&chunk);
                }
                let safe = credential_secret
                    .as_ref()
                    .map(|secret| String::from_utf8_lossy(&bytes).replace(secret, "[redacted]"));
                let bytes = safe.as_ref().map(|v| v.as_bytes()).unwrap_or(&bytes);
                let body = serde_json::from_slice::<Value>(bytes)
                    .unwrap_or_else(|_| json!(String::from_utf8_lossy(bytes)));
                Ok((
                    json!({"statusCode":status,"headers":headers,"body":body}),
                    None,
                ))
            }
            "llm" => {
                let prompt = incoming["prompt"]
                    .as_str()
                    .or_else(|| node.data["prompt"].as_str())
                    .ok_or_else(|| Error::Invalid("LLM node is missing prompt".into()))?;
                let response = self
                    .request_model_stream_for_node(
                        json!([{"role":"user","content":prompt}]),
                        cancel,
                        run,
                        &node.id,
                        context,
                    )
                    .await?;
                let text = crate::agent::output_text(&response);
                Ok((json!({"result":text}), None))
            }
            "template" => Ok((json!({"result":incoming["text"]}), None)),
            "json-parse" => {
                let text = incoming["text"]
                    .as_str()
                    .ok_or_else(|| Error::Invalid("JSON parsing requires text input".into()))?;
                let value: Value = serde_json::from_str(text)
                    .map_err(|error| Error::Execution(format!("JSON parsing failed: {error}")))?;
                Ok((json!({"result":value}), None))
            }
            "json-stringify" => Ok((
                json!({"result":serde_json::to_string_pretty(&incoming["value"])?}),
                None,
            )),
            "text" => {
                let text = incoming["text"]
                    .as_str()
                    .ok_or_else(|| Error::Invalid("Text processing requires text input".into()))?;
                let operation = incoming["operation"].as_str().unwrap_or("trim");
                let result =
                    match operation {
                        "trim" => json!(text.trim()),
                        "upper" => json!(text.to_uppercase()),
                        "lower" => json!(text.to_lowercase()),
                        "replace" => {
                            let search = incoming["search"]
                                .as_str()
                                .filter(|s| !s.is_empty())
                                .ok_or_else(|| {
                                    Error::Invalid("Replacement requires search text".into())
                                })?;
                            json!(text.replace(
                                search,
                                incoming["replacement"].as_str().unwrap_or_default()
                            ))
                        }
                        "split" => {
                            let separator = incoming["separator"].as_str().unwrap_or(",");
                            json!(text.split(separator).collect::<Vec<_>>())
                        }
                        _ => return Err(Error::Invalid("Unsupported text operation".into())),
                    };
                if result.to_string().len() > 2_000_000 {
                    return Err(Error::Execution(
                        "Text processing result exceeded 2 MB".into(),
                    ));
                }
                Ok((json!({"result":result}), None))
            }
            "array" => {
                let items = incoming["items"]
                    .as_array()
                    .ok_or_else(|| Error::Invalid("List processing requires array input".into()))?;
                if items.len() > 10000 {
                    return Err(Error::Invalid("Lists are limited to 10000 items".into()));
                }
                let result = match incoming["operation"].as_str().unwrap_or("unique") {
                    "unique" => {
                        let mut seen = HashSet::new();
                        json!(
                            items
                                .iter()
                                .filter(|item| seen.insert(item.to_string()))
                                .cloned()
                                .collect::<Vec<_>>()
                        )
                    }
                    "length" => json!(items.len()),
                    "first" => items.first().cloned().unwrap_or(Value::Null),
                    "last" => items.last().cloned().unwrap_or(Value::Null),
                    "flatten" => json!(
                        items
                            .iter()
                            .flat_map(|item| item
                                .as_array()
                                .cloned()
                                .unwrap_or_else(|| vec![item.clone()]))
                            .collect::<Vec<_>>()
                    ),
                    "join" => json!(
                        items
                            .iter()
                            .map(|item| item
                                .as_str()
                                .map(str::to_owned)
                                .unwrap_or_else(|| item.to_string()))
                            .collect::<Vec<_>>()
                            .join(incoming["separator"].as_str().unwrap_or(","))
                    ),
                    _ => return Err(Error::Invalid("Unsupported list operation".into())),
                };
                Ok((json!({"result":result}), None))
            }
            "delay" => {
                let duration = incoming["durationMs"].as_u64().ok_or_else(|| {
                    Error::Invalid(
                        "Wait duration must be a non-negative integer in milliseconds".into(),
                    )
                })?;
                if duration > 30000 {
                    return Err(Error::Invalid(
                        "A single wait cannot exceed 30 seconds".into(),
                    ));
                }
                tokio::time::sleep(std::time::Duration::from_millis(duration)).await;
                Ok((json!({"durationMs":duration}), None))
            }
            "subworkflow" => {
                let id = incoming["workflowId"]
                    .as_str()
                    .ok_or_else(|| Error::Invalid("Select a workflow to call".into()))?;
                let target = self.pinned_workflow(run, id).await?;
                let parent = self
                    .pinned_workflow(run, &self.run(run).await?.workflow_id)
                    .await?;
                if target.project_id != parent.project_id {
                    return Err(Error::Invalid(
                        "Only workflows in the same project may be called".into(),
                    ));
                }
                let errors = validate(&target.schema)?;
                if !errors.is_empty() {
                    return Err(Error::Invalid(errors.join("; ")));
                }
                let input = incoming.get("inputs").cloned().unwrap_or_else(|| json!({}));
                if !input.is_object() {
                    return Err(Error::Invalid(
                        "Subworkflow inputs must be an object".into(),
                    ));
                }
                validate_run_inputs(&target.schema, &input)?;
                let result = self
                    .execute_scope(
                        serde_json::from_value(target.schema)?,
                        input,
                        HashMap::new(),
                        run,
                        cancel,
                        &context.child(None, None).with_workflow(target.id.clone()),
                    )
                    .await?;
                Ok((result.output, None))
            }
            "agent" => {
                let prompt = incoming["prompt"]
                    .as_str()
                    .ok_or_else(|| Error::Invalid("Agent requires a goal description".into()))?;
                let steps = incoming
                    .get("maxSteps")
                    .map(|value| {
                        value
                            .as_u64()
                            .filter(|value| (1..=8).contains(value))
                            .ok_or_else(|| {
                                Error::Invalid("Agent maximum steps must be between 1 and 8".into())
                            })
                    })
                    .transpose()?
                    .unwrap_or(6) as usize;
                let result = self
                    .workflow_agent(
                        prompt,
                        run,
                        &node.id,
                        steps,
                        context,
                        &self
                            .run_model(
                                run,
                                context.workflow_id.as_deref().ok_or_else(|| {
                                    Error::Invalid("Missing model workflow scope".into())
                                })?,
                                &node.id,
                            )
                            .await?,
                        cancel,
                    )
                    .await?;
                Ok((result, None))
            }
            "loop" | "control.repeat" => {
                let output = self
                    .execute_loop(node, values, run, cancel, context)
                    .await?;
                Ok((output, None))
            }
            "control.break" | "control.continue" => Ok((incoming, None)),
            "control.switch" | "control.parallel" => {
                let branches = crate::control::select(node, values)?;
                Ok((json!({"matchedBranchIds":branches}), None))
            }
            "control.join" | "control.merge-branches" => Err(Error::Invalid(
                "A join requires its fork's execution scope and cannot be tested independently"
                    .into(),
            )),
            kind => Err(Error::Invalid(format!(
                "Unsupported executable node: {kind}"
            ))),
        }
    }
    pub fn execute_graph<'a>(
        &'a self,
        graph: Graph,
        input: Value,
        values: Values,
        run: &'a str,
        cancel: &'a CancellationToken,
        depth: usize,
    ) -> BoxFuture<'a, Result<Value>> {
        Box::pin(async move {
            let mut context = crate::control_runtime::ExecutionContext::root(depth);
            if let Ok(definition) = self.run(run).await {
                context = context.with_workflow(definition.workflow_id);
            }
            let result = self
                .execute_scope(graph, input, values, run, cancel, &context)
                .await?;
            if result.signal.is_some() {
                return Err(Error::Invalid(
                    "Loop control cannot escape its loop scope".into(),
                ));
            }
            Ok(result.output)
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn rejects_cycle_and_unknown_nodes() {
        let schema = json!({"nodes":[{"id":"a","type":"start"},{"id":"b","type":"end"}],"edges":[{"sourceNodeID":"a","targetNodeID":"b"},{"sourceNodeID":"b","targetNodeID":"a"}]});
        assert!(!validate(&schema).unwrap().is_empty());
    }
    #[test]
    fn resolves_nested_variables_and_templates() {
        let values = HashMap::from([("start".into(), json!({"user":{"name":"Ada"}}))]);
        assert_eq!(
            resolve(
                &json!({"type":"ref","content":["start","user","name"]}),
                &values
            )
            .unwrap(),
            json!("Ada")
        );
        assert_eq!(
            resolve(
                &json!({"type":"template","content":"Hello {{start.user.name}}"}),
                &values
            )
            .unwrap(),
            json!("Hello Ada")
        );
    }
    #[tokio::test]
    async fn runs_real_graph_and_rejects_stale_revision() {
        let dir = tempfile::tempdir().unwrap();
        let store = Store::open(dir.path()).await.unwrap();
        let project = store.projects().await.unwrap().remove(0);
        let w = store
            .create_workflow(&project.id, "Echo", crate::store::starter_schema())
            .await
            .unwrap();
        let run = store
            .start_run(&w.id, None, json!({"message":"hello"}))
            .await
            .unwrap();
        for _ in 0..30 {
            tokio::time::sleep(std::time::Duration::from_millis(10)).await;
            if store.run(&run.id).await.unwrap().status != "running" {
                break;
            }
        }
        let result = store.run(&run.id).await.unwrap();
        assert_eq!(result.status, "succeeded");
        assert_eq!(result.outputs, json!({"message":"hello"}));
        store
            .save_workflow(&w.id, 1, "New", w.schema.clone())
            .await
            .unwrap();
        assert!(matches!(
            store.save_workflow(&w.id, 1, "Stale", w.schema).await,
            Err(Error::Conflict)
        ));
    }
}
