use flowgram_desktop_backend::store::Store;
use serde_json::{Value, json};
fn graph() -> Value {
    json!({"nodes":[{"id":"start","type":"start","meta":{"position":{"x":5000,"y":5000}},"data":{"title":"Input"}},{"id":"end","type":"end","meta":{"position":{"x":-1000,"y":0}},"data":{"inputsValues":{"result":{"type":"constant","content":"unchanged"}}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"end"}]})
}
fn x(g: &Value, id: &str) -> f64 {
    g["nodes"]
        .as_array()
        .unwrap()
        .iter()
        .find(|n| n["id"] == id)
        .unwrap()["meta"]["position"]["x"]
        .as_f64()
        .unwrap()
}
#[tokio::test]
async fn parameter_edits_preserve_positions_and_layout_is_explicit_and_idempotent() {
    let d = tempfile::tempdir().unwrap();
    let s = Store::open(d.path()).await.unwrap();
    let p = s.projects().await.unwrap().remove(0);
    let w = s.create_workflow(&p.id, "Manual", graph()).await.unwrap();
    s.tool(&p.id,None,"edit_workflow",json!({"workflowId":w.id,"expectedRevision":1,"mutationId":"text","operations":[{"op":"update_node","nodeId":"end","set":{"/inputsValues/result/content":"updated"}}]})).await.unwrap();
    let edited = s.workflow(&w.id).await.unwrap();
    assert_eq!(x(&edited.schema, "start"), 5000.);
    assert_eq!(x(&edited.schema, "end"), -1000.);
    let args = json!({"workflowId":w.id,"expectedRevision":2,"mutationId":"layout"});
    let receipt = s
        .tool(&p.id, None, "layout_workflow", args.clone())
        .await
        .unwrap();
    assert_eq!(receipt["context"]["revision"], 3);
    let laid = s.workflow(&w.id).await.unwrap();
    assert!(x(&laid.schema, "start") < x(&laid.schema, "end"));
    assert_eq!(laid.schema["edges"], edited.schema["edges"]);
    assert_eq!(
        laid.schema["nodes"][1]["data"],
        edited.schema["nodes"][1]["data"]
    );
    let repeated = s.tool(&p.id, None, "layout_workflow", args).await.unwrap();
    assert_eq!(repeated["data"], receipt["data"]);
    assert!(
        s.tool(
            &p.id,
            None,
            "layout_workflow",
            json!({"workflowId":w.id,"expectedRevision":2,"mutationId":"new-layout"})
        )
        .await
        .is_err()
    );
}
