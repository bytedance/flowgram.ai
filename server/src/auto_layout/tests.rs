use super::*;

fn node(id: &str, kind: &str) -> Value {
    json!({"id":id,"type":kind,"meta":{"position":{"x":9000,"y":-500},"custom":"retained"},"data":{"title":id}})
}
fn edge(a: &str, b: &str, port: &str) -> Value {
    json!({"sourceNodeID":a,"targetNodeID":b,"sourcePortID":port})
}
fn position(graph: &Value, id: &str) -> (f64, f64) {
    let node = graph["nodes"]
        .as_array()
        .unwrap()
        .iter()
        .find(|n| n["id"] == id)
        .unwrap();
    (
        node["meta"]["position"]["x"].as_f64().unwrap(),
        node["meta"]["position"]["y"].as_f64().unwrap(),
    )
}
fn semantics(mut graph: Value) -> Value {
    for node in graph["nodes"].as_array_mut().unwrap() {
        node["meta"].as_object_mut().unwrap().remove("position");
        if node["blocks"].is_array() {
            let body = semantics(json!({"nodes":node["blocks"],"edges":node["edges"]}));
            node["blocks"] = body["nodes"].clone();
        }
    }
    graph
}
#[test]
fn branches_follow_port_order_nested_loops_do_not_overlap_and_behavior_is_unchanged() {
    let mut fork = node("fork", "control.parallel");
    fork["data"]["branches"] = json!([{"id":"first"},{"id":"second"},{"id":"third"}]);
    let mut container = node("z-loop", "loop");
    container["blocks"] = json!([
        node("in", "block-start"),
        node("inner", "wait"),
        node("out", "block-end")
    ]);
    container["edges"] = json!([edge("in", "inner", ""), edge("inner", "out", "")]);
    let mut join = node("join", "control.join");
    join["data"]["forkId"] = json!("fork");
    let graph = json!({"nodes":[node("end","end"),node("a-step","assign"),join,container,node("m-step","assign"),fork,node("start","start")],"edges":[edge("start","fork",""),edge("fork","z-loop","first"),edge("fork","a-step","second"),edge("fork","m-step","third"),edge("z-loop","join",""),edge("a-step","join",""),edge("m-step","join",""),edge("join","end","")]});
    let laid = arrange(&graph).unwrap();
    assert_eq!(semantics(laid.clone()), semantics(graph));
    assert_eq!(arrange(&laid).unwrap(), laid);
    let (loop_x, loop_y) = position(&laid, "z-loop");
    let (step_x, step_y) = position(&laid, "a-step");
    assert_eq!(loop_x, step_x);
    assert!(step_y >= loop_y + size("containerHeight") + size("nodeGap"));
    assert!(position(&laid, "m-step").1 > step_y);
    let loop_node = laid["nodes"]
        .as_array()
        .unwrap()
        .iter()
        .find(|n| n["id"] == "z-loop")
        .unwrap();
    let body = json!({"nodes":loop_node["blocks"],"edges":loop_node["edges"]});
    let end = position(&body, "out");
    assert!(position(&body, "in").1 >= size("containerTop"));
    assert!(
        position(&laid, "join").0
            >= loop_x + end.0 + size("controlWidth") + size("containerSide") + size("rankGap")
    );
    assert!(position(&laid, "end").0 > position(&laid, "join").0);
}
#[test]
fn missing_nested_positions_never_drop_nodes() {
    let mut container = node("loop", "loop");
    let mut child = node("child", "wait");
    child["meta"].as_object_mut().unwrap().remove("position");
    container["blocks"] = json!([child]);
    container["edges"] = json!([]);
    let incomplete = json!({"nodes":[container],"edges":[]});
    let repaired = arrange(&incomplete).unwrap();
    assert_eq!(repaired["nodes"][0]["blocks"][0]["id"], "child");
    assert!(repaired["nodes"][0]["blocks"][0]["meta"]["position"]["x"].is_number());
}
#[test]
fn cyclic_and_disconnected_drafts_are_finite_deterministic_and_keep_all_edges() {
    let graph = json!({"nodes":[node("a","assign"),node("b","assign"),node("c","assign")],"edges":[edge("a","b",""),edge("b","a",""),edge("missing","a","")]});
    let first = arrange(&graph).unwrap();
    assert_eq!(first, arrange(&graph).unwrap());
    assert_eq!(first["edges"], graph["edges"]);
    assert_ne!(position(&first, "a"), position(&first, "c"));
    assert!(position(&first, "b").0 > position(&first, "a").0);
}
