use flowgram_desktop_backend::{model::Node, nodes, runtime, store::Store};
use serde_json::{Value, json};
type Values = std::collections::HashMap<String, Value>;

fn node(kind: &str, config: Value) -> Node {
    let mut data = nodes::definition(kind).unwrap()["defaults"].clone();
    data.as_object_mut()
        .unwrap()
        .extend(config.as_object().unwrap().clone());
    serde_json::from_value(json!({"id":"operation","type":kind,"data":data})).unwrap()
}
fn run(kind: &str, input: Value, config: Value) -> Value {
    nodes::execute(&node(kind, config), input, &Values::new()).unwrap()
}
fn fails(kind: &str, input: Value, config: Value) -> String {
    nodes::execute(&node(kind, config), input, &Values::new())
        .unwrap_err()
        .to_string()
}
#[test]
fn object_mapping_selection_and_merging_preserve_real_types() {
    let n = node(
        "data.map-fields",
        json!({"mapping":{"person.name":{"type":"ref","content":["start","name"]},"enabled":{"type":"constant","content":false}}}),
    );
    let result = nodes::execute(
        &n,
        json!({}),
        &Values::from([("start".into(), json!({"name":"Ada"}))]),
    )
    .unwrap();
    assert_eq!(
        result,
        json!({"result":{"person":{"name":"Ada"},"enabled":false}})
    );
    assert!(fails("data.map-fields",json!({}),json!({"mapping":{"user":{"type":"constant","content":{}},"user.name":{"type":"constant","content":"A"}}})).contains("conflict"));
    assert_eq!(
        run(
            "data.select-fields",
            json!({"object":{"a":{"x":1,"y":2},"b":false}}),
            json!({"paths":["a.x","b"]})
        ),
        json!({"result":{"a":{"x":1},"b":false}})
    );
    assert_eq!(
        run(
            "data.select-fields",
            json!({"object":{"name":"A","other":0},"operation":"rename"}),
            json!({"renames":[{"from":"name","to":"person.name"}]})
        ),
        json!({"result":{"person":{"name":"A"},"other":0}})
    );
    assert!(
        fails(
            "data.select-fields",
            json!({"object":{"a":1,"b":2},"operation":"rename"}),
            json!({"renames":[{"from":"a","to":"b"}]})
        )
        .contains("already exists")
    );
    assert_eq!(
        run(
            "data.merge-objects",
            json!({"objects":[{"a":{"x":1},"list":[1]},{"a":{"y":2},"list":[2]}],"depth":"deep","arrays":"append"}),
            json!({})
        ),
        json!({"result":{"a":{"x":1,"y":2},"list":[1,2]}})
    );
    assert!(
        fails(
            "data.merge-objects",
            json!({"objects":[{"a":1},{"a":2}],"conflict":"error"}),
            json!({})
        )
        .contains("/a")
    );
}
#[test]
fn paths_and_defaults_distinguish_missing_null_zero_and_false() {
    assert_eq!(
        run(
            "data.get-value",
            json!({"data":{"a.b":[null,false]},"path":"/a.b/1"}),
            json!({})
        ),
        json!({"value":false})
    );
    assert_eq!(
        run(
            "data.get-value",
            json!({"data":{"rows":[{"n":1},{"n":2}]},"path":"rows.*.n","mode":"multiple"}),
            json!({})
        ),
        json!({"value":[1,2]})
    );
    assert!(
        fails(
            "data.get-value",
            json!({"data":[1,2],"path":"*"}),
            json!({})
        )
        .contains("multiple")
    );
    assert_eq!(
        run(
            "data.get-value",
            json!({"data":{},"path":"missing","mode":"multiple"}),
            json!({})
        ),
        json!({"value":[]})
    );
    for value in [json!(0), json!(false), json!(""), json!([])] {
        assert_eq!(
            run(
                "data.default",
                json!({"value":value,"fallback":42}),
                json!({})
            ),
            json!({"value":value})
        );
    }
    for input in [
        json!({"fallback":42}),
        json!({"value":null,"fallback":42}),
        json!({"value":"","fallback":42,"replace":"empty-text"}),
    ] {
        assert_eq!(run("data.default", input, json!({})), json!({"value":42}));
    }
    let scope = Values::from([("start".into(), json!({"null":null}))]);
    assert_eq!(
        runtime::resolve_optional(&json!({"type":"ref","content":["start","missing"]}), &scope)
            .unwrap(),
        None
    );
    assert_eq!(
        runtime::resolve_optional(&json!({"type":"ref","content":["start","null"]}), &scope)
            .unwrap(),
        Some(Value::Null)
    );
    assert!(
        runtime::resolve_optional(
            &json!({"type":"ref","content":["not_executed","x"]}),
            &scope
        )
        .is_err()
    );
}
#[test]
fn conversion_and_json_validation_reject_invalid_values() {
    assert_eq!(
        run(
            "data.convert",
            json!({"value":" false ","target":"boolean"}),
            json!({})
        ),
        json!({"value":false})
    );
    for value in [json!(""), json!("NaN"), json!(false), json!(null)] {
        assert!(
            fails(
                "data.convert",
                json!({"value":value,"target":"number"}),
                json!({})
            )
            .to_lowercase()
            .contains("num")
        );
    }
    assert_eq!(
        run(
            "data.convert",
            json!({"value":"oops","target":"integer","failure":"fallback","fallback":0}),
            json!({})
        ),
        json!({"value":0})
    );
    assert_eq!(
        run(
            "data.parse-json",
            json!({"text":"{\"enabled\":false,\"amount\":0}"}),
            json!({})
        ),
        json!({"result":{"enabled":false,"amount":0}})
    );
    assert!(fails("data.parse-json", json!({"text":"{\n bad}"}), json!({})).contains("line 2"));
    assert_eq!(
        run("data.stringify-json", json!({"value":null}), json!({})),
        json!({"text":"null"})
    );
    assert_eq!(
        run(
            "data.stringify-json",
            json!({"value":{"x":0},"indent":"4"}),
            json!({})
        )["text"],
        "{\n    \"x\": 0\n}"
    );
    let schema =
        json!({"type":"object","required":["n"],"properties":{"n":{"type":"integer","minimum":1}}});
    let report = run(
        "data.validate",
        json!({"value":{"n":0,"extra":true},"failure":"report"}),
        json!({"schema":schema}),
    );
    assert_eq!(report["valid"], false);
    assert_eq!(report["issues"].as_array().unwrap().len(), 2);
    assert!(
        fails(
            "data.validate",
            json!({"value":{}}),
            json!({"schema":{"$ref":"https://invalid.example/schema"}})
        )
        .contains("remote")
    );
}
#[test]
fn list_conditions_and_mapping_use_per_item_scope() {
    let config = json!({"predicate":{"combinator":"and","rules":[{"left":{"type":"ref","content":["item","active"]},"operator":"eq","right":{"type":"constant","content":true}},{"combinator":"or","rules":[{"left":{"type":"ref","content":["item","n"]},"operator":"gte","right":{"type":"constant","content":5}},{"left":{"type":"ref","content":["item","tag"]},"operator":"exists"}]}]}});
    let input = json!({"items":[{"active":true,"n":1},{"active":true,"n":6},{"active":false,"n":10},{"active":true,"n":1,"tag":null}]});
    let result = run("list.filter", input, config);
    assert_eq!(result["matchedCount"], 2);
    assert_eq!(result["removedCount"], 2);
    let mapped = run(
        "list.map",
        json!({"items":[{"name":"A"},{"bad":1}],"onError":"null"}),
        json!({"mapping":{"profile.name":{"type":"ref","content":["item","name"]},"index":{"type":"ref","content":["index"]}}}),
    );
    assert_eq!(
        mapped["items"],
        json!([{"profile":{"name":"A"},"index":0},null])
    );
    assert_eq!(mapped["errors"][0]["index"], 1);
    assert!(
        fails(
            "list.filter",
            json!({"items":[1]}),
            json!({"predicate":{"combinator":"and","rules":[]}})
        )
        .contains("1 and 100")
    );
}
#[test]
fn sorting_deduplication_and_set_operations_are_structural_and_stable() {
    let sorted = run(
        "list.sort",
        json!({"items":[{"n":2,"id":"a"},{"n":null,"id":"null"},{"n":2,"id":"b"},{"n":1,"id":"c"}]}),
        json!({"keys":[{"path":"n","direction":"desc","nulls":"last"}]}),
    );
    assert_eq!(
        sorted["items"]
            .as_array()
            .unwrap()
            .iter()
            .map(|v| v["id"].as_str().unwrap())
            .collect::<Vec<_>>(),
        vec!["a", "b", "c", "null"]
    );
    assert!(fails("list.sort", json!({"items":[1,"2"]}), json!({})).contains("type"));
    assert_eq!(
        run(
            "list.deduplicate",
            json!({"items":[{"a":1,"b":2},{"b":2,"a":1},false,0,false]}),
            json!({})
        )["items"],
        json!([{"a":1,"b":2},false,0])
    );
    assert_eq!(
        run(
            "list.deduplicate",
            json!({"items":[{"k":"A","v":1},{"k":"a","v":2}],"keep":"last","caseSensitive":"no"}),
            json!({"keys":["k"]})
        )["items"],
        json!([{"k":"a","v":2}])
    );
    assert_eq!(
        run(
            "list.set",
            json!({"left":[1,1,2],"right":[2,3,3],"operation":"symmetric"}),
            json!({})
        ),
        json!({"items":[1,3]})
    );
    assert_eq!(
        run(
            "list.set",
            json!({"left":[false,null,0],"right":[false,0]}),
            json!({})
        ),
        json!({"items":[false,0]})
    );
}
#[test]
fn slicing_flattening_batching_and_concatenation_do_not_schedule_actions() {
    assert_eq!(
        run(
            "list.slice",
            json!({"items":[1,2,3],"operation":"last","length":2}),
            json!({})
        ),
        json!({"items":[2,3],"count":2})
    );
    assert_eq!(
        run(
            "list.slice",
            json!({"items":[1],"start":100,"length":10}),
            json!({})
        ),
        json!({"items":[],"count":0})
    );
    assert!(fails("list.slice", json!({"items":[],"start":-1}), json!({})).contains("range"));
    assert_eq!(
        run(
            "list.flatten",
            json!({"items":[[1,[2]],3],"depth":2}),
            json!({})
        ),
        json!({"items":[1,2,3]})
    );
    assert_eq!(
        run("list.batch", json!({"items":[1,2,3],"size":2}), json!({})),
        json!({"batches":[[1,2],[3]],"batchCount":2})
    );
    assert!(fails("list.batch", json!({"items":[],"size":0}), json!({})).contains("range"));
    assert_eq!(
        run(
            "list.concat",
            json!({"lists":[[1,1],[null,false],[]]}),
            json!({})
        ),
        json!({"items":[1,1,null,false]})
    );
    assert!(fails("list.concat", json!({"lists":[[1]]}), json!({})).contains("two"));
}
#[test]
fn grouping_and_aggregation_handle_missing_null_empty_and_invalid_numbers() {
    let grouped = run(
        "list.group",
        json!({"items":[{}, {"k":null},{"k":false},{"k":null}]}),
        json!({"keys":["k"]}),
    );
    assert_eq!(grouped["groups"].as_array().unwrap().len(), 3);
    assert_eq!(grouped["groups"][0]["key"], json!({}));
    assert_eq!(grouped["groups"][1]["count"], 2);
    let metrics = json!([{"name":"count","operation":"count","path":""},{"name":"total","operation":"sum","path":"amount"},{"name":"average","operation":"avg","path":"amount"}]);
    assert_eq!(
        run(
            "list.aggregate",
            json!({"items":[]}),
            json!({"metrics":metrics})
        )["rows"],
        json!([{"key":{},"count":0,"total":0.0,"average":null}])
    );
    assert_eq!(
        run(
            "list.aggregate",
            json!({"items":[{"k":"A","amount":3},{"k":"A","amount":null},{"k":"B","amount":7}]}),
            json!({"keys":["k"],"metrics":metrics})
        )["rows"][0],
        json!({"key":{"k":"A"},"count":2,"total":3.0,"average":3.0})
    );
    assert!(
        fails(
            "list.aggregate",
            json!({"items":[{"amount":"3"}]}),
            json!({"metrics":metrics})
        )
        .to_lowercase()
        .contains("num")
    );
}
#[test]
fn joins_preserve_many_matches_and_distinguish_unmatched_sides() {
    let result = run(
        "list.join",
        json!({"left":[{"id":1},{"id":2},{}],"right":[{"id":1,"v":"A"},{"id":1,"v":"B"},{"id":3}],"join":"full"}),
        json!({}),
    );
    assert_eq!(result["items"].as_array().unwrap().len(), 5);
    assert_eq!(result["unmatchedLeftCount"], 2);
    assert_eq!(result["unmatchedRightCount"], 1);
    assert_eq!(
        result["items"][0],
        json!({"left":{"id":1},"right":{"id":1,"v":"A"}})
    );
    assert_eq!(
        run(
            "list.join",
            json!({"left":[0,false],"right":["a"],"mode":"position"}),
            json!({})
        )["items"],
        json!([{"left":0,"right":"a"},{"left":false,"right":null}])
    );
}
#[test]
fn unicode_text_regex_and_templates_keep_content_and_bounds() {
    assert_eq!(
        run(
            "text.transform",
            json!({"operation":"slice","text":"Ae\u{301}👩‍💻Z","start":1,"length":2}),
            json!({})
        ),
        json!({"text":"e\u{301}👩‍💻"})
    );
    assert_eq!(
        run(
            "text.transform",
            json!({"operation":"split","text":"a,b,c,d","separator":",","maxItems":3}),
            json!({})
        ),
        json!({"items":["a","b","c,d"]})
    );
    assert!(
        fails(
            "text.transform",
            json!({"operation":"join","items":["a",1]}),
            json!({})
        )
        .contains("string")
    );
    assert!(
        fails(
            "text.transform",
            json!({"operation":"split","text":"abc","separator":""}),
            json!({})
        )
        .contains("nonempty")
    );
    assert_eq!(
        run(
            "text.regex",
            json!({"text":"中ab 12","pattern":"(?P<word>ab)","operation":"extract"}),
            json!({})
        )["matches"][0],
        json!({"text":"ab","groups":["ab"],"namedGroups":{"word":"ab"},"start":1,"end":3})
    );
    assert_eq!(
        run(
            "text.regex",
            json!({"text":"a1 b2","pattern":"([a-z])(\\d)","operation":"replace","replacement":"${2}-${1}$$"}),
            json!({})
        ),
        json!({"text":"1-a$ 2-b$"})
    );
    assert!(fails("text.regex", json!({"text":"x","pattern":"("}), json!({})).contains("Invalid"));
    assert_eq!(
        run(
            "text.regex",
            json!({"text":"x","pattern":"^|$","operation":"split"}),
            json!({})
        )["items"],
        json!(["", "x", ""])
    );
    assert_eq!(
        run(
            "text.template",
            json!({"template":"{% for x in items %}{{ x }}{% endfor %}","variables":{"items":["<A>","B"]},"format":"html"}),
            json!({})
        )["text"],
        "&lt;A&gt;B"
    );
    assert!(
        fails(
            "text.template",
            json!({"template":"{{ missing }}","variables":{}}),
            json!({})
        )
        .contains("failed")
    );
}
#[test]
fn math_encoding_and_hashing_use_strict_values() {
    assert_eq!(
        run(
            "value.math",
            json!({"operation":"subtract","operands":[10,2,3]}),
            json!({})
        ),
        json!({"value":5.0})
    );
    assert_eq!(
        run(
            "value.math",
            json!({"operation":"round","value":-2.5}),
            json!({})
        ),
        json!({"value":-3.0})
    );
    assert!(
        fails(
            "value.math",
            json!({"operation":"divide","operands":[1,0]}),
            json!({})
        )
        .contains("zero")
    );
    assert!(
        fails("value.math", json!({"operands":[1,"2"]}), json!({}))
            .to_lowercase()
            .contains("num")
    );
    for encoding in ["base64", "hex", "url"] {
        let encoded = run(
            "value.encode",
            json!({"text":"中文 + /~_-.","encoding":encoding}),
            json!({}),
        );
        assert_eq!(
            run(
                "value.encode",
                json!({"text":encoded["text"],"encoding":encoding,"operation":"decode"}),
                json!({})
            )["text"],
            "中文 + /~_-."
        );
    }
    assert!(
        fails(
            "value.encode",
            json!({"text":"%GG","encoding":"url","operation":"decode"}),
            json!({})
        )
        .contains("Invalid")
    );
    assert_eq!(
        run("value.hash", json!({"text":"abc"}), json!({}))["digest"],
        "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    );
}
#[test]
fn dates_handle_calendar_clamping_elapsed_time_and_dst_ambiguity() {
    assert_eq!(
        run(
            "value.datetime",
            json!({"value":"2024-01-31T12:00:00Z","operation":"add","unit":"month","amount":1}),
            json!({})
        )["value"],
        "2024-02-29T12:00:00.000+00:00"
    );
    assert!(fails("value.datetime",json!({"value":"2024-01-31T12:00:00Z","operation":"add","unit":"month","amount":1,"overflow":"error"}),json!({})).contains("number of days"));
    assert_eq!(
        run(
            "value.datetime",
            json!({"value":"2026-01-01T00:00:00Z","timezone":"Asia/Shanghai","operation":"format","format":"%Y-%m-%d %H:%M"}),
            json!({})
        )["value"],
        "2026-01-01 08:00"
    );
    for value in ["2024-11-03 01:30:00", "2024-03-10 02:30:00"] {
        assert!(
            fails(
                "value.datetime",
                json!({"value":value,"timezone":"America/New_York"}),
                json!({})
            )
            .contains("daylight saving")
        );
    }
    assert_eq!(
        run(
            "value.datetime",
            json!({"value":"2024-03-10T00:00:00-05:00","timezone":"America/New_York","operation":"end","unit":"day"}),
            json!({})
        )["value"],
        "2024-03-10T23:59:59.999-04:00"
    );
    assert!(
        fails(
            "value.datetime",
            json!({"value":"2024-01-01T00:00:00Z","operation":"format","format":"%Q"}),
            json!({})
        )
        .contains("format")
    );
}
#[test]
fn document_chunks_preserve_unicode_offsets_and_progress() {
    let source = "中文内容\n\n第二段内容";
    let result = run(
        "document.chunk",
        json!({"source":{"text":source,"metadata":{"document":"A"}},"size":6,"overlap":1}),
        json!({}),
    );
    let chunks = result["chunks"].as_array().unwrap();
    assert!(!chunks.is_empty());
    for chunk in chunks {
        let start = chunk["start"].as_u64().unwrap() as usize;
        let end = chunk["end"].as_u64().unwrap() as usize;
        assert_eq!(
            chunk["text"],
            source
                .chars()
                .skip(start)
                .take(end - start)
                .collect::<String>()
        );
        assert_eq!(chunk["metadata"]["document"], "A");
    }
    assert!(
        fails(
            "document.chunk",
            json!({"source":"abc","size":2,"overlap":2}),
            json!({})
        )
        .contains("smaller")
    );
    assert_eq!(
        run(
            "document.chunk",
            json!({"source":"","size":1,"overlap":0}),
            json!({})
        )["chunks"],
        json!([])
    );
}
#[test]
fn every_atomic_contract_is_discoverable_and_has_an_executor() {
    assert_eq!(nodes::CATALOG.len(), 29);
    let mut types = std::collections::HashSet::new();
    for spec in nodes::CATALOG.iter() {
        let kind = spec["type"].as_str().unwrap();
        assert!(types.insert(kind));
        assert!(runtime::is_supported(kind));
        assert!(spec["inputSchema"].is_object());
        assert!(spec["outputSchema"].is_object());
        let n = node(kind, json!({}));
        let error = nodes::execute(&n, json!({}), &Values::new())
            .err()
            .map(|e| e.to_string())
            .unwrap_or_default();
        assert!(
            !error.contains("executor is not registered"),
            "{kind}: {error}"
        );
    }
    assert!(fails("list.slice", json!({"items":vec![0;10001]}), json!({})).contains("10000"));
    let n = node(
        "text.transform",
        json!({"inputsValues":{"operation":{"type":"ref","content":["start","mode"]}}}),
    );
    assert!(nodes::check_static(&n, None).is_err());
}
#[test]
fn expanding_outputs_stop_at_the_shared_budget_and_unknown_inputs_fail() {
    assert!(
        fails(
            "document.chunk",
            json!({"source":"x".repeat(30000),"size":10000,"overlap":9999,"mode":"fixed"}),
            json!({})
        )
        .contains("2 MB")
    );
    assert!(
        fails(
            "text.regex",
            json!({"text":"x".repeat(300000),"pattern":"((((((((x+))))))))"}),
            json!({})
        )
        .contains("2 MB")
    );
    assert!(fails("list.join",json!({"left":vec![json!({"id":1,"text":"x".repeat(3000)});40],"right":vec![json!({"id":1});40]}),json!({})).contains("2 MB"));
    assert!(fails("data.map-fields",json!({}),json!({"mapping":(0..30).map(|i|(format!("field{i}"),json!({"type":"constant","content":"x".repeat(80000)}))).collect::<serde_json::Map<_,_>>()})).contains("2 MB"));
    assert!(fails("list.batch", json!({"itmes":[1,2]}), json!({})).contains("not declared"));
    assert_eq!(
        run("list.batch", json!({"items":[1,2,3],"size":2.0}), json!({}))["batchCount"],
        2
    );
}
#[tokio::test]
async fn workflow_node_tests_and_mcp_share_contract_execution_and_revisions() {
    let dir = tempfile::tempdir().unwrap();
    let store = Store::open(dir.path()).await.unwrap();
    let project = store.projects().await.unwrap().remove(0);
    let filter = node(
        "list.filter",
        json!({"inputsValues":{"items":{"type":"ref","content":["start","items"]}},"predicate":{"combinator":"and","rules":[{"left":{"type":"ref","content":["item","active"]},"operator":"eq","right":{"type":"constant","content":true}}]}}),
    );
    let mut filter = serde_json::to_value(filter).unwrap();
    filter["id"] = json!("filter");
    let mut aggregate=serde_json::to_value(node("list.aggregate",json!({"inputsValues":{"items":{"type":"ref","content":["filter","items"]}},"keys":["category"],"metrics":[{"name":"total","operation":"sum","path":"amount"}]}))).unwrap();
    aggregate["id"] = json!("aggregate");
    let workflow=store.create_workflow(&project.id,"Atomic pipeline",json!({"nodes":[{"id":"start","type":"start"},filter,aggregate,{"id":"end","type":"end","data":{"inputsValues":{"rows":{"type":"ref","content":["aggregate","rows"]}}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"filter"},{"sourceNodeID":"filter","targetNodeID":"aggregate"},{"sourceNodeID":"aggregate","targetNodeID":"end"}]})).await.unwrap();
    let discovered = store
        .tool(
            &project.id,
            None,
            "describe_node_type",
            json!({"nodeTypes":["list.filter"]}),
        )
        .await
        .unwrap();
    assert_eq!(
        discovered["data"]["items"][0]["defaults"],
        nodes::definition("list.filter").unwrap()["defaults"]
    );
    let run=store.start_run(&workflow.id,None,json!({"items":[{"category":"A","amount":3,"active":true},{"category":"B","amount":10,"active":false},{"category":"A","amount":4,"active":true}]})).await.unwrap();
    for _ in 0..200 {
        if store.run(&run.id).await.unwrap().status != "running" {
            break;
        }
        tokio::time::sleep(std::time::Duration::from_millis(5)).await;
    }
    let result = store.run(&run.id).await.unwrap();
    assert_eq!(result.status, "succeeded", "{:?}", result.error);
    assert_eq!(
        result.outputs,
        json!({"rows":[{"key":{"category":"A"},"total":7.0}]})
    );
    assert_eq!(
        store
            .history(0, Some(&run.id))
            .await
            .unwrap()
            .iter()
            .filter(|e| e.kind == "node_started")
            .count(),
        4
    );
    let tested=store.tool(&project.id,None,"test_node",json!({"workflowId":workflow.id,"nodeId":"filter","expectedRevision":1,"mutationId":"filter-test","inputs":{"items":[{"active":true},{"active":false}]}})).await.unwrap();
    let run_id = tested["data"]["runId"].as_str().unwrap();
    for _ in 0..200 {
        if store.run(run_id).await.unwrap().status != "running" {
            break;
        }
        tokio::time::sleep(std::time::Duration::from_millis(5)).await;
    }
    assert_eq!(store.run(run_id).await.unwrap().outputs["matchedCount"], 1);
    assert!(store.node_test_definition(run_id).await.unwrap().is_some());
    assert!(store.tool(&project.id,None,"test_node",json!({"workflowId":workflow.id,"nodeId":"filter","expectedRevision":0,"mutationId":"invalid-test","inputs":{"items":[]}})).await.is_err());
}
