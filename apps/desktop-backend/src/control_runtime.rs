use crate::{
    control,
    error::{Error, Result},
    model::{Graph, Node},
    runtime::{Values, inputs, resolve},
    store::{Store, id},
};
use futures_util::{StreamExt, future::BoxFuture, stream};
use serde_json::{Value, json};
use std::{
    collections::{HashMap, HashSet},
    sync::{
        Arc, Mutex,
        atomic::{AtomicUsize, Ordering},
    },
};
use tokio::sync::Semaphore;
use tokio_util::sync::CancellationToken;

#[derive(Clone)]
pub(crate) struct ExecutionContext {
    pub depth: usize,
    pub permits: Arc<Semaphore>,
    scope_id: String,
    pub(crate) workflow_id: Option<String>,
    parent: Option<String>,
    branches: Vec<String>,
    iterations: Vec<usize>,
    active: Arc<Mutex<HashMap<String, Value>>>,
    executions: Arc<AtomicUsize>,
}
impl ExecutionContext {
    pub fn root(depth: usize) -> Self {
        Self {
            depth,
            permits: Arc::new(Semaphore::new(32)),
            scope_id: id(),
            workflow_id: None,
            parent: None,
            branches: vec![],
            iterations: vec![],
            active: Arc::new(Mutex::new(HashMap::new())),
            executions: Arc::new(AtomicUsize::new(0)),
        }
    }
    pub fn child(&self, branch: Option<String>, iteration: Option<usize>) -> Self {
        let mut child = self.clone();
        child.scope_id = id();
        child.depth += 1;
        if let Some(b) = branch {
            child.branches.push(b);
        }
        if let Some(i) = iteration {
            child.iterations.push(i);
        }
        child
    }
    pub(crate) fn with_workflow(mut self, workflow: String) -> Self {
        self.workflow_id = Some(workflow);
        self
    }
    pub(crate) fn with_parent(&self, parent: String) -> Self {
        let mut c = self.clone();
        c.parent = Some(parent);
        c
    }
    pub(crate) fn register_call(&self, data: Value) {
        if let Some(id) = data["executionId"].as_str() {
            self.active.lock().unwrap().insert(id.to_owned(), data);
        }
    }
    pub(crate) fn update_partial(&self, id: &str, value: Option<Value>) {
        if let Some(call) = self.active.lock().unwrap().get_mut(id) {
            if let Some(value) = value {
                call["outputs"] = value;
                call["partial"] = json!(true);
            } else {
                call.as_object_mut().unwrap().remove("outputs");
                call.as_object_mut().unwrap().remove("partial");
            }
        }
    }
    pub(crate) fn take_call(&self, id: &str) -> Option<Value> {
        self.active.lock().unwrap().remove(id)
    }
    pub(crate) fn finish_call(&self, id: &str) {
        self.active.lock().unwrap().remove(id);
    }
    pub(crate) fn trace(&self, mut data: Value) -> Value {
        data["scopeId"] = json!(self.scope_id);
        data["workflowId"] = json!(self.workflow_id);
        data["parentExecutionId"] = json!(self.parent);
        data["branchPath"] = json!(self.branches);
        data["iterationPath"] = json!(self.iterations);
        data["attempt"] = json!(1);
        data
    }
}
#[derive(Clone, Copy, PartialEq)]
pub(crate) enum LoopSignal {
    Break,
    Continue,
}
pub(crate) struct ScopeOutput {
    pub output: Value,
    pub values: Values,
    pub signal: Option<LoopSignal>,
}
impl Store {
    pub(crate) async fn cancel_scope(
        &self,
        run: &str,
        context: &ExecutionContext,
        reason: &str,
    ) -> Result<()> {
        let canceled = {
            let mut active = context.active.lock().unwrap();
            let keys: Vec<_> = active
                .iter()
                .filter(|(key, event)| {
                    if context.parent.as_ref() == Some(*key) {
                        return false;
                    }
                    let path: Vec<String> = event["branchPath"]
                        .as_array()
                        .into_iter()
                        .flatten()
                        .filter_map(|v| v.as_str().map(String::from))
                        .collect();
                    path.starts_with(&context.branches)
                        && event["iterationPath"].as_array().is_some_and(|rounds| {
                            rounds.starts_with(
                                &context
                                    .iterations
                                    .iter()
                                    .map(|i| json!(i))
                                    .collect::<Vec<_>>(),
                            )
                        })
                })
                .map(|(key, _)| key.clone())
                .collect();
            keys.into_iter()
                .filter_map(|key| active.remove(&key))
                .collect::<Vec<_>>()
        };
        for mut event in canceled {
            event["reason"] = json!(reason);
            let kind = format!("{}_canceled", event["callKind"].as_str().unwrap_or("node"));
            self.emit(&kind, run, event).await?;
        }
        Ok(())
    }
    pub(crate) fn execute_scope<'a>(
        &'a self,
        graph: Graph,
        input: Value,
        values: Values,
        run: &'a str,
        cancel: &'a CancellationToken,
        context: &'a ExecutionContext,
    ) -> BoxFuture<'a, Result<ScopeOutput>> {
        Box::pin(async move {
            let start = graph
                .nodes
                .iter()
                .find(|n| matches!(n.kind.as_str(), "start" | "block-start"))
                .ok_or_else(|| Error::Invalid("Missing scope entry".into()))?
                .id
                .clone();
            self.execute_path(
                Arc::new(graph),
                start,
                None,
                input,
                values,
                run,
                cancel.child_token(),
                context.clone(),
            )
            .await
        })
    }
    #[allow(clippy::too_many_arguments)]
    fn execute_path<'a>(
        &'a self,
        graph: Arc<Graph>,
        mut current: String,
        stop: Option<String>,
        input: Value,
        mut values: Values,
        run: &'a str,
        cancel: CancellationToken,
        context: ExecutionContext,
    ) -> BoxFuture<'a, Result<ScopeOutput>> {
        Box::pin(async move {
            if context.depth > 16 {
                return Err(Error::Execution("Scope nesting exceeded 16 levels".into()));
            }
            let mut output = input.clone();
            let mut seen = HashSet::new();
            let mut previous_execution: Option<String> = None;
            let mut previous_port: Option<String> = None;
            loop {
                if cancel.is_cancelled() {
                    return Err(Error::Cancelled);
                }
                if stop.as_ref() == Some(&current) {
                    return Ok(ScopeOutput {
                        output,
                        values,
                        signal: None,
                    });
                }
                if !seen.insert(current.clone()) {
                    return Err(Error::Invalid("Scope edges form a cycle".into()));
                }
                let node = graph
                    .nodes
                    .iter()
                    .find(|n| n.id == current)
                    .ok_or_else(|| Error::Invalid("Path references a nonexistent node".into()))?;
                if context.executions.fetch_add(1, Ordering::Relaxed) >= 10_000 {
                    return Err(Error::Execution(
                        "Run exceeded the budget of 10000 node executions".into(),
                    ));
                }
                let execution = id();
                let incoming = if matches!(node.kind.as_str(), "start" | "block-start") {
                    input.clone()
                } else {
                    match inputs(node, &values) {
                        Ok(input) => input,
                        Err(error) => {
                            self.emit("node_failed", run, context.trace(json!({"nodeId":node.id,"executionId":execution,"error":error.to_string(),"phase":"input"}))).await?;
                            return Err(error);
                        }
                    }
                };
                let started = context
                    .trace(json!({"nodeId":node.id,"nodeType":node.kind,"name":node.data["title"],"executionId":execution,"inputs":incoming,"links":previous_execution.as_ref().or(context.parent.as_ref()).iter().map(|id|json!({"executionId":id,"sourcePortId":previous_port.as_ref().or(context.branches.last()),"type":"flow"})).collect::<Vec<_>>()}));
                context
                    .active
                    .lock()
                    .unwrap()
                    .insert(execution.clone(), started.clone());
                self.emit("node_started", run, started).await?;
                let step_context = context.with_parent(execution.clone());
                let result = self
                    .execute_scoped_node(node, incoming, &values, run, &cancel, &step_context)
                    .await;
                if !control::is_fork(&node.kind) {
                    context.active.lock().unwrap().remove(&execution);
                }
                let (out, route) = match result {
                    Ok(result) => result,
                    Err(error) => {
                        self.cancel_scope(run, &step_context, "parent_failed")
                            .await?;
                        context.active.lock().unwrap().remove(&execution);
                        self.emit(if matches!(error,Error::Cancelled){"node_canceled"}else{"node_failed"},run,context.trace(json!({"nodeId":node.id,"executionId":execution,"error":error.to_string()}))).await?;
                        return Err(error);
                    }
                };
                if !control::is_fork(&node.kind) {
                    self.emit("node_finished",run,context.trace(json!({"nodeId":node.id,"nodeType":node.kind,"executionId":execution,"outputs":out,"branch":route}))).await?;
                }
                previous_execution = Some(execution.clone());
                previous_port = route.clone();
                output = out.clone();
                values.insert(node.id.clone(), out);
                if matches!(node.kind.as_str(), "control.break" | "control.continue") {
                    return Ok(ScopeOutput {
                        output,
                        values,
                        signal: Some(if node.kind == "control.break" {
                            LoopSignal::Break
                        } else {
                            LoopSignal::Continue
                        }),
                    });
                }
                if matches!(node.kind.as_str(), "end" | "block-end") {
                    return Ok(ScopeOutput {
                        output,
                        values,
                        signal: None,
                    });
                }
                if control::is_fork(&node.kind) {
                    let selected = control::select(node, &values)?;
                    let activated = selected.clone();
                    self.emit("node_dispatched",run,context.trace(json!({"nodeId":node.id,"executionId":execution,"activatedBranchIds":activated}))).await?;
                    let joined = match self
                        .execute_region(
                            graph.clone(),
                            node,
                            selected,
                            values,
                            run,
                            &cancel,
                            &step_context,
                        )
                        .await
                    {
                        Ok(result) => result,
                        Err(error) => {
                            self.cancel_scope(run, &step_context, "scope_failed")
                                .await?;
                            context.active.lock().unwrap().remove(&execution);
                            self.emit(if matches!(error,Error::Cancelled){"node_canceled"}else{"node_failed"}, run, context.trace(json!({"nodeId":node.id,"executionId":execution,"error":error.to_string()}))).await?;
                            return Err(error);
                        }
                    };
                    context.active.lock().unwrap().remove(&execution);
                    self.emit("node_finished",run,context.trace(json!({"nodeId":node.id,"executionId":execution,"outputs":{"activatedBranchIds":activated}}))).await?;
                    if joined.signal.is_some() {
                        return Ok(joined);
                    }
                    values = joined.values;
                    output = joined.output;
                    current = control::edge(&graph, control::option(node, "joinId", ""), None)?
                        .target
                        .clone();
                } else {
                    if node.kind == "condition" {
                        let chosen = route.as_deref().unwrap_or("else");
                        let reach = |entry: &str| {
                            let mut set = HashSet::new();
                            let mut queue = vec![entry.to_string()];
                            while let Some(id) = queue.pop() {
                                if set.insert(id.clone()) {
                                    queue.extend(
                                        graph
                                            .edges
                                            .iter()
                                            .filter(|e| e.source == id)
                                            .map(|e| e.target.clone()),
                                    );
                                }
                            }
                            set
                        };
                        let selected = graph
                            .edges
                            .iter()
                            .filter(|e| e.source == node.id && e.port.as_deref() == Some(chosen))
                            .flat_map(|e| reach(&e.target))
                            .collect::<HashSet<_>>();
                        let skipped = graph
                            .edges
                            .iter()
                            .filter(|e| e.source == node.id && e.port.as_deref() != Some(chosen))
                            .flat_map(|e| reach(&e.target))
                            .collect::<HashSet<_>>();
                        for node_id in skipped.difference(&selected) {
                            self.emit(
                                "node_skipped",
                                run,
                                context.trace(
                                    json!({"nodeId":node_id,"reason":"branch_not_selected"}),
                                ),
                            )
                            .await?;
                        }
                    }
                    current = control::edge(&graph, &node.id, route.as_deref())?
                        .target
                        .clone();
                }
            }
        })
    }
    #[allow(clippy::too_many_arguments)]
    fn execute_region<'a>(
        &'a self,
        graph: Arc<Graph>,
        fork: &'a Node,
        selected: Vec<String>,
        mut values: Values,
        run: &'a str,
        cancel: &'a CancellationToken,
        context: &'a ExecutionContext,
    ) -> BoxFuture<'a, Result<ScopeOutput>> {
        Box::pin(async move {
            let region = control::region(&graph, fork)?;
            let join = graph.nodes.iter().find(|n| n.id == region.join).unwrap();
            let exclusive = join.kind == "control.merge-branches";
            let policy = control::option(join, "policy", "all");
            let required = match policy {
                "first-success" => 1,
                "quorum" => control::integer(join, "quorum", 1, 32)?,
                _ => selected.len(),
            };
            if required > selected.len() {
                return Err(Error::Execution(
                    "Too few active branches to satisfy the success quorum".into(),
                ));
            }
            for (branch, nodes) in &region.branches {
                if !selected.contains(branch) {
                    for node_id in nodes {
                        self.emit(
                            "node_skipped",
                            run,
                            context
                                .child(Some(branch.clone()), None)
                                .trace(json!({"nodeId":node_id,"reason":"branch_not_selected"})),
                        )
                        .await?;
                    }
                }
            }
            let group = cancel.child_token();
            let concurrency = control::integer(fork, "concurrency", 4, 32)?;
            let work = selected.clone().into_iter().map(|branch| {
                let branch = branch.clone();
                let graph = graph.clone();
                let values = values.clone();
                let token = group.child_token();
                let scope = context.child(Some(branch.clone()), None);
                let stop = region.join.clone();
                async move {
                    let edge = control::edge(&graph, &fork.id, Some(&branch))?;
                    let result = self
                        .execute_path(
                            graph.clone(),
                            edge.target.clone(),
                            Some(stop),
                            json!({}),
                            values,
                            run,
                            token,
                            scope,
                        )
                        .await;
                    Ok::<_, Error>((branch, result))
                }
            });
            let mut pending = stream::iter(work).buffer_unordered(concurrency);
            let mut results = serde_json::Map::new();
            let mut successful = vec![];
            let join_execution = id();
            let waiting=context.trace(json!({"nodeId":join.id,"executionId":join_execution,"activatedBranchIds":selected,"policy":policy}));
            context.register_call(waiting.clone());
            self.emit("node_waiting", run, waiting).await?;
            while let Some(result) = pending.next().await {
                let (branch, result) = result?;
                match result {
                    Ok(result) => {
                        if result.signal.is_some() {
                            group.cancel();
                            return if exclusive {
                                Ok(result)
                            } else {
                                Err(Error::Invalid(
                                    "Parallel branches cannot break out of an outer loop".into(),
                                ))
                            };
                        }
                        let mapped = if let Some(mapping) = join.data["mappings"].get(&branch) {
                            control::mapping(mapping, &result.values)
                        } else {
                            Ok(result.output)
                        };
                        match mapped {
                            Ok(output) => {
                                successful.push(branch.clone());
                                results.insert(
                                    branch.clone(),
                                    json!({"status":"succeeded","output":output}),
                                );
                            }
                            Err(error) => {
                                results.insert(
                                    branch.clone(),
                                    json!({"status":"failed","error":error.to_string()}),
                                );
                            }
                        }
                    }
                    Err(Error::Cancelled) if cancel.is_cancelled() => {
                        group.cancel();
                        return Err(Error::Cancelled);
                    }
                    Err(error) => {
                        results.insert(
                            branch.clone(),
                            json!({"status":"failed","error":error.to_string()}),
                        );
                    }
                }
                self.emit(
                    "branch_finished",
                    run,
                    context.trace(
                        json!({"forkId":fork.id,"branchId":branch,"result":results[&branch]}),
                    ),
                )
                .await?;
                if exclusive && successful.is_empty() {
                    group.cancel();
                    return Err(Error::Execution(
                        results[&branch]["error"]
                            .as_str()
                            .unwrap_or("Branch execution failed")
                            .into(),
                    ));
                }
                if !exclusive
                    && policy == "all"
                    && control::option(join, "errorMode", "fail") == "fail"
                    && results[&branch]["status"] == "failed"
                {
                    group.cancel();
                    return Err(Error::Execution(format!(
                        "Branch {branch} failed: {}",
                        results[&branch]["error"]
                    )));
                }
                if policy != "all" && successful.len() >= required {
                    break;
                }
                if policy != "all" && successful.len() + selected.len() - results.len() < required {
                    group.cancel();
                    return Err(Error::Execution(
                        "The join policy cannot be satisfied even if all remaining branches succeed".into(),
                    ));
                }
            }
            group.cancel();
            drop(pending);
            for branch in &selected {
                if !results.contains_key(branch) {
                    results.insert(
                        branch.clone(),
                        json!({"status":"canceled","reason":"join_satisfied"}),
                    );
                    self.emit(
                        "branch_canceled",
                        run,
                        context.trace(
                            json!({"forkId":fork.id,"branchId":branch,"reason":"join_satisfied"}),
                        ),
                    )
                    .await?;
                    self.cancel_scope(
                        run,
                        &context.child(Some(branch.clone()), None),
                        "join_satisfied",
                    )
                    .await?;
                }
            }
            let output = if exclusive {
                let output = results[&selected[0]]["output"].clone();
                if let Some(schema) = join.data.get("outputs")
                    && !crate::nodes::schema_issues(&output, schema, false)?.is_empty()
                {
                    return Err(Error::Execution(
                        "Branch result does not match the merged output schema".into(),
                    ));
                }
                output
            } else {
                json!({"results":results,"completedBranchIds":selected.iter().filter(|id| results[*id]["status"] != "canceled").collect::<Vec<_>>(),"successfulBranchIds":successful})
            };
            crate::nodes::check_size(&output)?;
            let execution = join_execution;
            context.finish_call(&execution);
            self.emit(
                "node_started",
                run,
                context.trace(
                    json!({"nodeId":join.id,"executionId":execution,"inputs":{"branches":results}}),
                ),
            )
            .await?;
            self.emit(
                "node_finished",
                run,
                context.trace(json!({"nodeId":join.id,"executionId":execution,"outputs":output})),
            )
            .await?;
            values.insert(join.id.clone(), output.clone());
            Ok(ScopeOutput {
                output,
                values,
                signal: None,
            })
        })
    }
    pub(crate) fn execute_loop<'a>(
        &'a self,
        node: &'a Node,
        values: &'a Values,
        run: &'a str,
        cancel: &'a CancellationToken,
        context: &'a ExecutionContext,
    ) -> BoxFuture<'a, Result<Value>> {
        Box::pin(async move {
            let child = Graph {
                nodes: node.blocks.clone(),
                edges: node.edges.clone(),
            };
            if node.kind == "control.repeat" {
                let mut state = resolve(&node.data["initialState"], values)?;
                let schema = node
                    .data
                    .get("stateSchema")
                    .cloned()
                    .unwrap_or_else(|| json!({"type":"object"}));
                if !crate::nodes::schema_issues(&state, &schema, false)?.is_empty() {
                    return Err(Error::Invalid(
                        "Initial state does not match the state schema".into(),
                    ));
                }
                let limit = control::integer(node, "maxIterations", 20, 1000)?;
                let after = match control::option(node, "check", "before") {
                    "before" => false,
                    "after" => true,
                    _ => {
                        return Err(Error::Invalid(
                            "Condition check must be before or after".into(),
                        ));
                    }
                };
                let mut iterations = 0;
                loop {
                    let mut scope = values.clone();
                    scope.insert("state".into(), state.clone());
                    scope.insert("index".into(), json!(iterations));
                    scope.insert(
                        format!("{}_locals", node.id),
                        json!({"state":state,"index":iterations}),
                    );
                    if !after && crate::nodes::predicate(&node.data["predicate"], &scope, 0)? {
                        return Ok(
                            json!({"state":state,"iterations":iterations,"exitReason":"condition"}),
                        );
                    }
                    if iterations >= limit {
                        return Err(Error::Execution(format!(
                            "Repeat loop reached its limit of {limit} iterations"
                        )));
                    }
                    let result = self
                        .execute_scope(
                            child.clone(),
                            json!({"state":state,"index":iterations}),
                            scope,
                            run,
                            cancel,
                            &context.child(None, Some(iterations)),
                        )
                        .await?;
                    iterations += 1;
                    if result.signal.is_some() {
                        if let Some(s) = result.output.get("state") {
                            state = s.clone();
                        }
                    } else {
                        state = control::mapping(&node.data["stateUpdates"], &result.values)?;
                    }
                    if !crate::nodes::schema_issues(&state, &schema, false)?.is_empty() {
                        return Err(Error::Execution(
                            "Updated loop state does not match the state schema".into(),
                        ));
                    }
                    if result.signal == Some(LoopSignal::Break) {
                        return Ok(
                            json!({"state":state,"iterations":iterations,"exitReason":"break"}),
                        );
                    }
                    let mut check = values.clone();
                    check.insert("state".into(), state.clone());
                    check.insert("index".into(), json!(iterations));
                    if after && crate::nodes::predicate(&node.data["predicate"], &check, 0)? {
                        return Ok(
                            json!({"state":state,"iterations":iterations,"exitReason":"condition"}),
                        );
                    }
                }
            }
            let array = resolve(&node.data["loopFor"], values)?;
            let array = array
                .as_array()
                .ok_or_else(|| Error::Invalid("For-each input must be an array".into()))?;
            if array.len() > 1000 {
                return Err(Error::Invalid(
                    "For-each loops are limited to 1000 items".into(),
                ));
            }
            let parallel = control::option(node, "mode", "serial") == "parallel";
            let concurrency = if parallel {
                control::integer(node, "concurrency", 4, 32)?
            } else {
                1
            };
            let group = cancel.child_token();
            let work = array.clone().into_iter().enumerate().map(|(index, item)| {
                let mut scope = values.clone();
                scope.insert(
                    format!("{}_locals", node.id),
                    json!({"item":item,"index":index}),
                );
                let child = child.clone();
                let token = group.child_token();
                let context = context.child(None, Some(index));
                async move {
                    let result = self
                        .execute_scope(
                            child,
                            json!({"item":item,"index":index}),
                            scope,
                            run,
                            &token,
                            &context,
                        )
                        .await;
                    let result = result.and_then(|result| {
                        if result.signal.is_some() {
                            return Ok((result.output, result.signal));
                        }
                        let output = if let Some(mapping) = node.data.get("loopOutputs") {
                            control::mapping(mapping, &result.values)?
                        } else {
                            json!({"items":result.output})
                        };
                        Ok((output, None))
                    });
                    (index, result)
                }
            });
            // Buffer completion concurrently, consume in input order to keep positional correspondence.
            let mut pending = stream::iter(work).buffer_unordered(concurrency);
            let mut combined = serde_json::Map::new();
            let mut errors = vec![];
            let mut processed = 0;
            let mut ordered = std::collections::BTreeMap::new();
            if let Some(mapping) = node.data["loopOutputs"].as_object() {
                for key in mapping.keys() {
                    combined.insert(key.clone(), json!([]));
                }
            } else {
                combined.insert("items".into(), json!([]));
            }
            while let Some((index, result)) = pending.next().await {
                match result {
                    Ok((_, Some(LoopSignal::Break))) => {
                        if parallel {
                            return Err(Error::Invalid(
                                "Parallel for-each does not support break".into(),
                            ));
                        }
                        break;
                    }
                    Ok((_, Some(LoopSignal::Continue))) => {
                        if parallel {
                            return Err(Error::Invalid(
                                "Parallel for-each does not support continue".into(),
                            ));
                        }
                        continue;
                    }
                    Ok((output, None)) => {
                        processed += 1;
                        ordered.insert(index, Some(output));
                    }
                    Err(Error::Cancelled) => {
                        group.cancel();
                        return Err(Error::Cancelled);
                    }
                    Err(error) => {
                        if control::option(node, "errorMode", "fail") == "fail" {
                            group.cancel();
                            return Err(error);
                        }
                        errors.push(json!({"index":index,"error":error.to_string()}));
                        if control::option(node, "errorMode", "fail") == "collect" {
                            ordered.insert(index, None);
                        }
                    }
                }
                crate::nodes::check_size(&json!({"results":ordered,"errors":errors}))?;
            }
            group.cancel();
            drop(pending);
            for output in ordered.values() {
                for (key, items) in &mut combined {
                    items.as_array_mut().unwrap().push(
                        output
                            .as_ref()
                            .map(|o| o[key].clone())
                            .unwrap_or(Value::Null),
                    );
                }
            }
            errors.sort_by_key(|e| e["index"].as_u64());
            combined.insert("errors".into(), json!(errors));
            combined.insert("processedCount".into(), json!(processed));
            Ok(Value::Object(combined))
        })
    }
}
