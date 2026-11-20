use flowgram_desktop_backend::{model::Graph, runtime, store::Store};
use serde_json::{Value, json};
use tokio_util::sync::CancellationToken;
fn c(v: Value) -> Value {
    json!({"type":"constant","content":v})
}
fn r(n: &str, f: &str) -> Value {
    json!({"type":"ref","content":[n,f]})
}
fn n(id: &str, kind: &str, data: Value) -> Value {
    json!({"id":id,"type":kind,"data":data})
}
fn e(a: &str, b: &str) -> Value {
    json!({"sourceNodeID":a,"targetNodeID":b})
}
fn fork_schema(kind: &str, mode: &str, policy: &str) -> Value {
    let exclusive = kind == "control.switch" && mode == "first";
    let mut a = e("fork", "a");
    a["sourcePortID"] = json!("a");
    let mut b = e("fork", "b");
    b["sourcePortID"] = json!("b");
    let mut aj = e("a", "join");
    aj["targetPortID"] = json!("a");
    let mut bj = e("b", "join");
    bj["targetPortID"] = json!("b");
    let pred = json!({"left":r("start","enabled"),"operator":"eq","right":c(json!(true))});
    let mut graph = json!({"nodes":[n("start","start",json!({})),n("fork",kind,json!({"branches":[{"id":"a","label":"A","predicate":pred},{"id":"b","label":"B","predicate":pred}],"mode":mode,"joinId":"join","concurrency":2})),n("a","delay",json!({"inputsValues":{"durationMs":c(json!(40))}})),n("b","delay",json!({"inputsValues":{"durationMs":c(json!(100))}})),n("join",if exclusive{"control.merge-branches"}else{"control.join"},json!({"forkId":"fork","policy":policy,"errorMode":"collect","quorum":2,"outputs":{"type":"object"}})),n("end","end",json!({"inputsValues":{"result":{"type":"ref","content":["join"]}}}))],"edges":[e("start","fork"),a,b,aj,bj,e("join","end")]});
    if kind == "control.switch" {
        graph["nodes"].as_array_mut().unwrap().push(n(
            "otherwise",
            "assign",
            json!({"inputsValues":{"fallback":c(json!(true))}}),
        ));
        let mut default = e("fork", "otherwise");
        default["sourcePortID"] = json!("else");
        let mut edge = e("otherwise", "join");
        edge["targetPortID"] = json!("else");
        graph["edges"]
            .as_array_mut()
            .unwrap()
            .extend([default, edge]);
    }
    graph
}
async fn execute(
    schema: Value,
    input: Value,
    run: &str,
) -> (Value, Vec<flowgram_desktop_backend::model::Event>) {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    execute_in_store(&store, schema, input, run).await
}
async fn execute_in_store(
    store: &Store,
    schema: Value,
    input: Value,
    run: &str,
) -> (Value, Vec<flowgram_desktop_backend::model::Event>) {
    let errors = runtime::validate(&schema).unwrap();
    assert!(errors.is_empty(), "{errors:?}");
    let output = store
        .execute_graph(
            serde_json::from_value(schema).unwrap(),
            input,
            Default::default(),
            run,
            &CancellationToken::new(),
            0,
        )
        .await
        .unwrap();
    (output, store.history(0, Some(run)).await.unwrap())
}
#[tokio::test]
async fn parallel_branches_overlap_and_join_once_with_named_inputs() {
    let (output, events) = execute(
        fork_schema("control.parallel", "all", "all"),
        json!({}),
        "parallel",
    )
    .await;
    assert_eq!(output["result"]["results"]["a"]["output"]["durationMs"], 40);
    let index = |id: &str, kind: &str| {
        events
            .iter()
            .position(|e| {
                e.kind == kind && serde_json::from_str::<Value>(&e.data).unwrap()["nodeId"] == id
            })
            .unwrap()
    };
    assert!(index("b", "node_started") < index("a", "node_finished"));
    assert!(index("join", "node_started") > index("b", "node_finished"));
    assert_eq!(
        events
            .iter()
            .filter(|e| e.kind == "node_finished"
                && serde_json::from_str::<Value>(&e.data).unwrap()["nodeId"] == "join")
            .count(),
        1
    );
    let graph: Graph =
        serde_json::from_value(fork_schema("control.parallel", "all", "all")).unwrap();
    assert_eq!(
        serde_json::to_value(graph).unwrap()["edges"][3]["targetPortID"],
        "a"
    );
}
#[tokio::test]
async fn switches_choose_first_all_or_default_and_merge_only_the_selected_output() {
    let (first, events) = execute(
        fork_schema("control.switch", "first", "all"),
        json!({"enabled":true}),
        "first",
    )
    .await;
    assert_eq!(first, json!({"result":{"durationMs":40}}));
    assert!(!events.iter().any(|e| e.kind == "node_started"
        && serde_json::from_str::<Value>(&e.data).unwrap()["nodeId"] == "b"));
    let (default, _) = execute(
        fork_schema("control.switch", "first", "all"),
        json!({"enabled":false}),
        "default",
    )
    .await;
    assert_eq!(default, json!({"result":{"fallback":true}}));
    let (all, _) = execute(
        fork_schema("control.switch", "all", "all"),
        json!({"enabled":true}),
        "all",
    )
    .await;
    assert_eq!(
        all["result"]["completedBranchIds"]
            .as_array()
            .unwrap()
            .len(),
        2
    );
    assert!(all["result"]["results"].get("else").is_none());
}
#[tokio::test]
async fn first_success_cancels_slow_work_and_does_not_treat_first_failure_as_winner() {
    let mut graph = fork_schema("control.parallel", "all", "first-success");
    graph["nodes"][3]["data"]["inputsValues"]["durationMs"] = c(json!(30000));
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let start = std::time::Instant::now();
    let (out, events) = execute_in_store(&store, graph, json!({}), "race").await;
    assert!(start.elapsed() < std::time::Duration::from_secs(2));
    assert_eq!(out["result"]["results"]["b"]["status"], "canceled");
    assert!(events.iter().any(|e| e.kind == "branch_canceled"));
    let mut graph = fork_schema("control.parallel", "all", "first-success");
    graph["nodes"][2]["data"]["inputsValues"]["durationMs"] = c(json!(-1));
    let (out, _) = execute(graph, json!({}), "recovery").await;
    assert_eq!(out["result"]["successfulBranchIds"], json!(["b"]));
    assert_eq!(out["result"]["results"]["a"]["status"], "failed");
}
#[tokio::test]
async fn quorum_and_collect_have_explicit_failure_semantics() {
    let mut graph = fork_schema("control.parallel", "all", "all");
    graph["nodes"][2]["data"]["inputsValues"]["durationMs"] = c(json!(-1));
    let (out, _) = execute(graph.clone(), json!({}), "collect").await;
    assert_eq!(out["result"]["results"]["a"]["status"], "failed");
    graph["nodes"][4]["data"]["policy"] = json!("quorum");
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let error = store
        .execute_graph(
            serde_json::from_value(graph).unwrap(),
            json!({}),
            Default::default(),
            "quorum",
            &CancellationToken::new(),
            0,
        )
        .await
        .unwrap_err();
    assert!(error.to_string().contains("cannot be satisfied"));
}
fn loop_graph(kind: &str, body: Vec<Value>, edges: Vec<Value>, data: Value) -> Value {
    let mut loop_node = n("loop", kind, data);
    loop_node["blocks"] = json!(body);
    loop_node["edges"] = json!(edges);
    json!({"nodes":[n("start","start",json!({})),loop_node,n("end","end",json!({"inputsValues":{"result":{"type":"ref","content":["loop"]}}}))],"edges":[e("start","loop"),e("loop","end")]})
}
#[tokio::test]
async fn parallel_foreach_preserves_order_and_iteration_identity() {
    let graph = loop_graph(
        "loop",
        vec![
            n("in", "block-start", json!({})),
            n(
                "wait",
                "delay",
                json!({"inputsValues":{"durationMs":r("in","item")}}),
            ),
            n("out", "block-end", json!({})),
        ],
        vec![e("in", "wait"), e("wait", "out")],
        json!({"loopFor":c(json!([80,10,20])),"mode":"parallel","concurrency":3,"loopOutputs":{"delays":r("wait","durationMs")}}),
    );
    let (out, events) = execute(graph, json!({}), "foreach").await;
    assert_eq!(out["result"]["delays"], json!([80, 10, 20]));
    assert_eq!(out["result"]["processedCount"], 3);
    let instances: Vec<Value> = events
        .iter()
        .filter(|e| e.kind == "node_finished")
        .map(|e| serde_json::from_str(&e.data).unwrap())
        .filter(|v: &Value| v["nodeId"] == "wait")
        .collect();
    assert_eq!(instances.len(), 3);
    assert_ne!(instances[0]["scopeId"], instances[1]["scopeId"]);
    assert!(
        instances.iter().all(|e| e["parentExecutionId"].is_string()
            && e["iterationPath"].as_array().unwrap().len() == 1)
    );
    // Completion order depends on scheduling and event persistence. Each result
    // must keep its original iteration identity regardless of completion order.
    let mut paths: Vec<_> = instances
        .iter()
        .map(|event| event["iterationPath"][0].as_u64().unwrap())
        .collect();
    paths.sort();
    assert_eq!(paths, vec![0, 1, 2]);
}
#[tokio::test]
async fn foreach_empty_collect_skip_and_break_continue() {
    let base = loop_graph(
        "loop",
        vec![
            n("in", "block-start", json!({})),
            n(
                "wait",
                "delay",
                json!({"inputsValues":{"durationMs":r("in","item")}}),
            ),
            n("out", "block-end", json!({})),
        ],
        vec![e("in", "wait"), e("wait", "out")],
        json!({"loopFor":c(json!([])),"loopOutputs":{"delays":r("wait","durationMs")}}),
    );
    let (out, _) = execute(base.clone(), json!({}), "empty").await;
    assert_eq!(out["result"]["delays"], json!([]));
    for mode in ["collect", "skip"] {
        let mut graph = base.clone();
        graph["nodes"][1]["data"]["loopFor"] = c(json!([1, -1, 2]));
        graph["nodes"][1]["data"]["errorMode"] = json!(mode);
        let (out, _) = execute(graph, json!({}), mode).await;
        assert_eq!(
            out["result"]["delays"],
            if mode == "collect" {
                json!([1, null, 2])
            } else {
                json!([1, 2])
            }
        );
        assert_eq!(out["result"]["errors"][0]["index"], 1);
    }
    for signal in ["control.break", "control.continue"] {
        let mut graph = loop_graph(
            "loop",
            vec![
                n("in", "block-start", json!({})),
                n("signal", signal, json!({})),
                n("out", "block-end", json!({})),
            ],
            vec![e("in", "signal")],
            json!({"loopFor":c(json!([1,2,3])),"loopOutputs":{}}),
        );
        // Unreachable body exit is allowed only when the iteration intentionally exits via control.
        graph["nodes"][1]["edges"]
            .as_array_mut()
            .unwrap()
            .push(e("in", "out"));
        // Use an exclusive condition so both the body end and early exit are statically reachable.
        graph["nodes"][1]["blocks"].as_array_mut().unwrap().push(n("if","condition",json!({"conditions":[{"key":"true","value":{"left":c(json!(true)),"operator":"eq","right":c(json!(true))}}]})));
        graph["nodes"][1]["edges"] = json!([e("in","if"),{"sourceNodeID":"if","targetNodeID":"signal","sourcePortID":"true"},{"sourceNodeID":"if","targetNodeID":"out","sourcePortID":"else"}]);
        let (_, events) = execute(graph, json!({}), signal).await;
        let count = events
            .iter()
            .filter(|e| {
                e.kind == "node_finished"
                    && serde_json::from_str::<Value>(&e.data).unwrap()["nodeId"] == "signal"
            })
            .count();
        assert_eq!(count, if signal == "control.break" { 1 } else { 3 });
    }
}
fn repeat(check: &str, limit: usize) -> Value {
    loop_graph(
        "control.repeat",
        vec![
            n("in", "block-start", json!({})),
            n(
                "add",
                "value.math",
                json!({"inputsValues":{"operation":c(json!("power")),"value":r("state","count"),"exponent":c(json!(2))}}),
            ),
            n("out", "block-end", json!({})),
        ],
        vec![e("in", "add"), e("add", "out")],
        json!({"initialState":c(json!({"count":2})),"stateSchema":{"type":"object","properties":{"count":{"type":"number"}},"required":["count"]},"stateUpdates":{"count":r("add","value")},"predicate":{"left":r("state","count"),"operator":"gte","right":c(json!(100))},"check":check,"maxIterations":limit}),
    )
}
#[tokio::test]
async fn repeat_carries_state_checks_before_after_and_enforces_budget() {
    for check in ["before", "after"] {
        let (out, _) = execute(repeat(check, 5), json!({}), check).await;
        assert_eq!(
            out["result"],
            json!({"state":{"count":256.0},"iterations":3,"exitReason":"condition"})
        );
    }
    let mut zero = repeat("before", 5);
    zero["nodes"][1]["data"]["initialState"] = c(json!({"count":256}));
    let (out, _) = execute(zero, json!({}), "zero").await;
    assert_eq!(out["result"]["iterations"], 0);
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let err = store
        .execute_graph(
            serde_json::from_value(repeat("before", 2)).unwrap(),
            json!({}),
            Default::default(),
            "budget",
            &CancellationToken::new(),
            0,
        )
        .await
        .unwrap_err();
    assert!(err.to_string().contains("limit of 2 iterations"));
}
#[test]
fn invalid_ports_unpaired_joins_cross_branch_refs_and_cycles_fail_before_execution() {
    let base = fork_schema("control.parallel", "all", "all");
    for mutate in 0..6 {
        let mut graph = base.clone();
        match mutate {
            0 => graph["edges"][3]["targetPortID"] = json!("wrong"),
            1 => graph["nodes"][1]["data"]["joinId"] = json!("missing"),
            2 => graph["nodes"][2]["data"]["inputsValues"]["durationMs"] = r("b", "durationMs"),
            3 => graph["edges"][2]["targetNodeID"] = json!("a"),
            4 => graph["edges"]
                .as_array_mut()
                .unwrap()
                .push(e("end", "start")),
            _ => graph["nodes"][5]["data"]["inputsValues"]["result"] = r("a", "durationMs"),
        }
        assert!(
            !runtime::validate(&graph).unwrap().is_empty(),
            "case {mutate}"
        );
    }
}

#[tokio::test]
async fn nested_parallel_regions_keep_results_scoped_and_do_not_run_a_join_twice() {
    let mut graph = fork_schema("control.parallel", "all", "all");
    graph["nodes"][2] = n(
        "a",
        "control.parallel",
        json!({"branches":[{"id":"x","label":"X"},{"id":"y","label":"Y"}],"joinId":"inner_join","concurrency":2}),
    );
    graph["nodes"].as_array_mut().unwrap().extend([
        n(
            "inner_x",
            "assign",
            json!({"inputsValues":{"value":c(json!(1))}}),
        ),
        n(
            "inner_y",
            "assign",
            json!({"inputsValues":{"value":c(json!(2))}}),
        ),
        n(
            "inner_join",
            "control.join",
            json!({"forkId":"a","policy":"all"}),
        ),
    ]);
    graph["edges"][3]["sourceNodeID"] = json!("inner_join");
    graph["edges"].as_array_mut().unwrap().extend([
        json!({"sourceNodeID":"a","targetNodeID":"inner_x","sourcePortID":"x"}),
        json!({"sourceNodeID":"a","targetNodeID":"inner_y","sourcePortID":"y"}),
        json!({"sourceNodeID":"inner_x","targetNodeID":"inner_join","targetPortID":"x"}),
        json!({"sourceNodeID":"inner_y","targetNodeID":"inner_join","targetPortID":"y"}),
    ]);
    let (out, events) = execute(graph, json!({}), "nested").await;
    assert_eq!(
        out["result"]["results"]["a"]["output"]["results"]["x"]["output"]["value"],
        1
    );
    for join in ["inner_join", "join"] {
        assert_eq!(
            events
                .iter()
                .filter(|e| e.kind == "node_finished"
                    && serde_json::from_str::<Value>(&e.data).unwrap()["nodeId"] == join)
                .count(),
            1
        );
    }
}
#[tokio::test]
async fn parallel_regions_inside_foreach_have_separate_rounds_and_branch_paths() {
    let inner = fork_schema("control.parallel", "all", "first-success");
    let mut body = inner["nodes"].as_array().unwrap().clone();
    for node in &mut body {
        if node["id"] == "start" {
            node["id"] = json!("body_in");
            node["type"] = json!("block-start");
        }
        if node["id"] == "end" {
            node["id"] = json!("body_out");
            node["type"] = json!("block-end");
        }
    }
    let mut edges = inner["edges"].as_array().unwrap().clone();
    for edge in &mut edges {
        if edge["sourceNodeID"] == "start" {
            edge["sourceNodeID"] = json!("body_in");
        }
        if edge["targetNodeID"] == "end" {
            edge["targetNodeID"] = json!("body_out");
        }
    }
    let graph = loop_graph(
        "loop",
        body,
        edges,
        json!({"mode":"parallel","concurrency":2,"loopFor":c(json!([1,2])),"loopOutputs":{"results":r("body_out","result")}}),
    );
    let (out, events) = execute(graph, json!({}), "loop-parallel").await;
    assert_eq!(out["result"]["results"].as_array().unwrap().len(), 2);
    let finished: Vec<Value> = events
        .iter()
        .filter(|e| e.kind == "node_finished")
        .map(|e| serde_json::from_str(&e.data).unwrap())
        .filter(|e: &Value| e["nodeId"] == "a")
        .collect();
    assert_eq!(finished.len(), 2);
    assert!(
        finished.iter().all(|e| e["branchPath"] == json!(["a"])
            && e["iterationPath"].as_array().unwrap().len() == 1)
    );
    assert!(!events.iter().any(|e| e.kind == "node_canceled"
        && serde_json::from_str::<Value>(&e.data).unwrap()["nodeId"] == "a"));
}
#[tokio::test]
async fn timeout_and_cancel_terminate_the_owned_branch_scope() {
    let mut graph = fork_schema("control.parallel", "all", "all");
    graph["nodes"][2]["data"]["runtime"] = json!({"timeoutMs":10});
    let (out, _) = execute(graph, json!({}), "timeout").await;
    assert_eq!(out["result"]["results"]["a"]["status"], "failed");
    let graph = fork_schema("control.parallel", "all", "all");
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let token = CancellationToken::new();
    let worker = token.clone();
    tokio::spawn(async move {
        tokio::time::sleep(std::time::Duration::from_millis(10)).await;
        worker.cancel();
    });
    assert!(
        store
            .execute_graph(
                serde_json::from_value(graph).unwrap(),
                json!({}),
                Default::default(),
                "cancel",
                &token,
                0
            )
            .await
            .is_err()
    );
    assert!(
        !store
            .history(0, Some("cancel"))
            .await
            .unwrap()
            .iter()
            .any(|e| e.kind == "node_finished"
                && serde_json::from_str::<Value>(&e.data).unwrap()["nodeId"] == "join")
    );
}
#[test]
fn control_signals_and_local_bindings_cannot_escape_their_scope() {
    let graph = json!({"nodes":[n("start","start",json!({})),n("break","control.break",json!({})),n("end","end",json!({}))],"edges":[e("start","break")]});
    assert!(!runtime::validate(&graph).unwrap().is_empty());
    let mut graph = repeat("before", 10);
    graph["nodes"][1]["type"] = json!("loop");
    graph["nodes"][1]["data"] = json!({"loopFor":c(json!([1])),"mode":"parallel"});
    graph["nodes"][1]["blocks"][1] = n("add", "control.break", json!({}));
    assert!(!runtime::validate(&graph).unwrap().is_empty());
}

#[test]
fn quorum_configuration_is_checked_only_when_that_policy_is_active() {
    let mut graph = fork_schema("control.parallel", "all", "quorum");
    graph["nodes"][4]["data"]["quorum"] = json!("two");
    assert!(!runtime::validate(&graph).unwrap().is_empty());
    graph["nodes"][4]["data"]["policy"] = json!("all");
    assert!(runtime::validate(&graph).unwrap().is_empty());
}
