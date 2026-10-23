//! Execution-only projections. UI labels, widgets and visibility never enter prompts.
use crate::{
    error::Result,
    workflow_edit::graph::{catalog, escape, hash},
};
use serde_json::{Value, json};
fn value_type(v: &Value) -> &'static str {
    if v.is_boolean() {
        "boolean"
    } else if v.is_i64() || v.is_u64() {
        "integer"
    } else if v.is_number() {
        "number"
    } else if v.is_array() {
        "array"
    } else if v.is_object() {
        "object"
    } else {
        "string"
    }
}
fn choices(v: &Value) -> Value {
    json!(
        v.as_array()
            .into_iter()
            .flatten()
            .map(|v| v[0].clone())
            .collect::<Vec<_>>()
    )
}
fn binding() -> Value {
    json!({"oneOf":[
        {"type":"object","properties":{"type":{"const":"constant"},"content":{}},"required":["type","content"],"additionalProperties":false},
        {"type":"object","properties":{"type":{"const":"ref"},"content":{"type":"array","items":{"type":"string"},"minItems":2}},"required":["type","content"],"additionalProperties":false},
        {"type":"object","properties":{"type":{"const":"template"},"content":{"type":"string"}},"required":["type","content"],"additionalProperties":false}
    ]})
}
fn inferred(default: &Value) -> Value {
    let mut schema = json!({"type":value_type(default)});
    if let Some(items) = default.as_array() {
        if let Some(item) = items.first() {
            schema["items"] = inferred(item);
        }
    } else if let Some(o) = default.as_object() {
        schema["properties"] = json!({});
        for (k, v) in o {
            schema["properties"][k] = inferred(v);
        }
    }
    schema
}
fn predicate(field: &Value) -> Value {
    json!({"type":"object","properties":{"combinator":{"enum":["and","or"]},"rules":{"type":"array","items":{"type":"object","properties":{"left":binding(),"operator":{"enum":choices(&field["operators"])},"right":binding()},"required":["left","operator"]}}},"required":["rules"]})
}
pub(super) fn execution_contract(kind: &str) -> Result<Value> {
    let c = catalog(kind)?;
    let mut fields = Vec::new();
    for f in c["fields"].as_array().into_iter().flatten() {
        let key = f["key"].as_str().unwrap();
        let path = format!(
            "/{}",
            key.split('.').map(escape).collect::<Vec<_>>().join("/")
        );
        let default = c["defaults"].pointer(&path).unwrap_or(&Value::Null);
        let typed = f["editor"] == "value" || key.starts_with("inputsValues.");
        let sample = if default["type"] == "constant" {
            &default["content"]
        } else {
            default
        };
        let mut schema = inferred(sample);
        if let Some(t) = f.get("type") {
            if t == "any" {
                schema = json!({});
            } else {
                schema["type"] = t.clone();
            }
        }
        if let Some(choices_) = f.get("choices") {
            schema["enum"] = choices(choices_);
            if let Some(first) = schema["enum"].as_array().and_then(|a| a.first()) {
                schema["type"] = json!(value_type(first));
            }
        }
        for (source, target) in [("min", "minimum"), ("max", "maximum")] {
            if let Some(value) = f.get(source) {
                schema[target] = value.clone();
            }
        }
        match f["editor"].as_str().unwrap_or("") {
            "schema" => schema = json!({"type":"object"}),
            "paths" => schema = json!({"type":"array","items":{"type":"string"}}),
            "node-select" => schema = json!({"type":"string"}),
            "mapping" => schema = json!({"type":"object","additionalProperties":binding()}),
            "predicate" => schema = predicate(f),
            "records" => {
                let mut properties = json!({});
                let mut required = Vec::new();
                for column in f["columns"].as_array().into_iter().flatten() {
                    let k = column["key"].as_str().unwrap();
                    let mut item = inferred(&sample[0][k]);
                    if column["choices"].is_array() {
                        item["enum"] = choices(&column["choices"]);
                    }
                    properties[k] = item;
                    if column["required"] == true {
                        required.push(k);
                    }
                }
                schema = json!({"type":"array","items":{"type":"object","properties":properties,"required":required}});
            }
            _ => {}
        }
        let structural = matches!(key, "branches" | "joinId" | "forkId" | "conditions");
        let description = f
            .get("description")
            .or_else(|| f.get("hint"))
            .cloned()
            .unwrap_or(Value::Null);
        fields.push(json!({"path":path,"type":f.get("type").unwrap_or(&schema["type"]),"binding":typed,"schema":schema,"storedSchema":if typed{binding()}else{schema.clone()},"required":f["required"]==true,"default":default,"description":description,"structural":structural,"writable":!structural}));
    }
    if matches!(kind, "llm" | "agent") {
        fields.push(json!({"path":"/model","type":"object","binding":false,"writable":true,"schema":{"type":"object","properties":{"modelId":{"type":"string"},"parameters":{"type":"object","properties":{"temperature":{"type":"number"},"topP":{"type":"number"},"maxOutputTokens":{"type":"integer","minimum":1},"reasoningEffort":{"type":"string"},"outputSchema":{"type":"object"}}}},"additionalProperties":false},"description":"Use project-available model entry IDs from list_models; omit modelId for the workflow default. Agent nodes require confirmed tool calling support."}));
    }
    for field in &mut fields {
        if field.get("storedSchema").is_none() {
            field["storedSchema"] = field["schema"].clone();
        }
    }
    let node: crate::model::Node =
        serde_json::from_value(json!({"id":"example","type":kind,"data":c["defaults"]}))?;
    let ports = crate::control::ports(
        &node,
        &crate::model::Graph {
            nodes: vec![node.clone()],
            edges: vec![],
        },
    );
    let mut example_fields = json!({});
    for f in &fields {
        if f["writable"] == true && !f["default"].is_null() {
            example_fields[f["path"].as_str().unwrap()] = f["default"].clone();
        }
    }
    let mut result = json!({"nodeType":kind,"description":c["description"],"fields":fields,"defaults":c["defaults"],"inputSchema":c["inputSchema"],"outputSchema":c["outputSchema"],"configuration":c["configuration"],"commonWritableFields":["/title","/description","/inputs","/outputs","/runtime"],"binding":{"schema":binding(),"reference":"Use node IDs and output field paths; never node titles.","template":"Text {{nodeId.field}}"},"ports":{"inputs":ports.0,"outputs":ports.1,"static":true,"derivedFrom":"Persisted branch IDs; join input IDs derive from its paired fork"},"structure":{"container":crate::control::is_loop(kind),"fork":crate::control::is_fork(kind),"join":crate::control::is_join(kind),"scaffold":"add_node creates loop boundaries or the paired join atomically. Supply boundaryIds/joinId for same-batch references.","scope":"root or loop container node ID","loopLocals":"Reference [loopId+'_locals','item'|'index']; repeat uses state/index; export via loopOutputs/stateUpdates","singleOutput":"Use explicit forks for fan-out","branchEditing":"Use add_branch/update_branch/remove_branch/move_branch; do not replace structural arrays."},"examples":[{"tool":"edit_workflow","operation":{"op":"add_node","scopeId":"root","nodeType":kind,"nodeId":"example","fields":example_fields}}]});
    result["contractHash"] = json!(hash(&result));
    Ok(result)
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn every_node_field_has_a_typed_execution_schema_and_examples() {
        for c in crate::core_nodes::CATALOG
            .iter()
            .chain(crate::nodes::CATALOG.iter())
            .chain(crate::control::CATALOG.iter())
        {
            let contract = execution_contract(c["type"].as_str().unwrap()).unwrap();
            assert!(!contract.to_string().contains("\"editor\""));
            assert!(!contract.to_string().contains("\"visible\""));
            for field in contract["fields"].as_array().unwrap() {
                assert!(field["type"].is_string(), "{}", field);
                jsonschema::validator_for(&field["schema"]).unwrap();
                jsonschema::validator_for(&field["storedSchema"]).unwrap();
            }
            assert!(contract["examples"][0]["operation"].is_object());
        }
    }
    #[test]
    fn records_and_predicates_expose_executable_values_instead_of_ui_choices() {
        let c = execution_contract("list.sort").unwrap();
        let f = c["fields"]
            .as_array()
            .unwrap()
            .iter()
            .find(|f| f["path"] == "/keys")
            .unwrap();
        assert_eq!(
            f["schema"]["items"]["properties"]["direction"]["enum"],
            json!(["asc", "desc"])
        );
        let c = execution_contract("control.repeat").unwrap();
        let f = c["fields"]
            .as_array()
            .unwrap()
            .iter()
            .find(|f| f["path"] == "/predicate")
            .unwrap();
        assert!(
            f["schema"]["properties"]["rules"]["items"]["properties"]["operator"]["enum"]
                .as_array()
                .unwrap()
                .contains(&json!("eq"))
        );
    }
}
