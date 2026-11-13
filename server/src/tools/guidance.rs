//! Longer operational help is disclosed on demand, not repeated in every prompt.
use serde_json::{Value, json};
pub(super) fn operation(name: &str) -> Value {
    let (constraints, example) = match name {
        "rename_workflow" => (
            "Rename only; does not move files or change workflow identity.",
            json!({"op":name,"name":"Editorial pipeline"}),
        ),
        "add_node" => (
            "Creates defaults. Loop boundaries and paired fork/join units are scaffolded atomically. Supply IDs when later operations in this batch need them.",
            json!({"op":name,"nodeType":"http","nodeId":"request","scopeId":"root"}),
        ),
        "update_node" => (
            "JSON Pointers are relative to node.data. set replaces exactly that value; null is a value, unset deletes. Do not send unrelated fields or overlapping paths. Structural branches use branch operations.",
            json!({"op":name,"nodeId":"writer","set":{"/inputsValues/prompt/content":"Write a concise summary."}}),
        ),
        "replace_text" => (
            "Each oldText must match expectedMatches exactly (default 1). No fuzzy matching. Read the relevant text fragment if a match fails.",
            json!({"op":name,"nodeId":"writer","path":"/inputsValues/prompt/content","edits":[{"oldText":"concise","newText":"detailed","expectedMatches":1}]}),
        ),
        "edit_collection" => (
            "Locate a unique stable row key, or use snapshot index plus expectedItemHash. Update fields with set/unset; other fields and rows survive. Row keys and branch arrays are protected.",
            json!({"op":name,"nodeId":"sort","path":"/keys","changes":[{"action":"update","key":{"id":"primary"},"set":{"/direction":"desc"}}]}),
        ),
        "remove_node" => (
            "Removes owned descendants and incident edges. Repair remaining data consumers in the same batch. Protected boundaries/joins must be removed through their owning unit.",
            json!({"op":name,"nodeId":"request"}),
        ),
        "replace_node_type" => (
            "Ordinary node types only. Preserve compatible identity and extensions; explicitly map outputs/ports and supply the new fields. Constants are never rewritten as references.",
            json!({"op":name,"nodeId":"writer","nodeType":"http","outputMapping":{"result":"body"},"fields":{"/inputsValues/url":{"type":"constant","content":"https://example.com"}}}),
        ),
        "connect" | "disconnect" => (
            "Use the exact edge and static port IDs from outline. Both endpoints must share one scope. Ambiguous ports require explicit IDs; single outputs cannot fan out.",
            json!({"op":name,"scopeId":"root","edge":{"sourceNodeID":"request","targetNodeID":"end"}}),
        ),
        "reconnect" => (
            "Replace one exact edge atomically; unrelated edges and their metadata remain unchanged.",
            json!({"op":name,"scopeId":"root","from":{"sourceNodeID":"request","targetNodeID":"end"},"to":{"sourceNodeID":"request","targetNodeID":"writer"}}),
        ),
        "insert_node" => (
            "Replace an exact edge with a new node and its two connections. The backend allocates local space; no whole-workflow layout is needed. Container scaffold IDs can be supplied.",
            json!({"op":name,"scopeId":"root","edge":{"sourceNodeID":"start","targetNodeID":"writer"},"nodeType":"wait","nodeId":"throttle","fields":{"/inputsValues/durationMs":{"type":"constant","content":500}}}),
        ),
        "add_branch" => (
            "Use a new stable branch ID. The paired join receives the matching static port; move existing body nodes explicitly if needed.",
            json!({"op":name,"nodeId":"fork","branchId":"review","branch":{"label":"Review"}}),
        ),
        "update_branch" => (
            "Update branch label or predicate fields without replacing its stable ID or the other branches.",
            json!({"op":name,"nodeId":"fork","branchId":"review","set":{"/label":"Manual review"}}),
        ),
        "remove_branch" => (
            "Move/remove the branch body explicitly first. Removes branch edges, the paired join port and its mapping. The fallback branch is protected.",
            json!({"op":name,"nodeId":"fork","branchId":"review"}),
        ),
        "move_branch" => (
            "Supply exactly one neighboring before or after branch ID. IDs, bodies and references do not change.",
            json!({"op":name,"nodeId":"fork","branchId":"review","before":"branch_a"}),
        ),
        "duplicate_subgraph" => (
            "Select complete structural units. References internal to the clone are remapped; constants and external references remain unchanged. idMapping can reserve deterministic IDs.",
            json!({"op":name,"nodeIds":["writer"],"targetScopeId":"root","idMapping":{"writer":"writer_copy"}}),
        ),
        "move_subgraph" => (
            "Move complete structural units. Cross-scope edges and unavailable data references must be repaired explicitly in this atomic batch.",
            json!({"op":name,"nodeIds":["writer"],"targetScopeId":"chapter_loop"}),
        ),
        "move_nodes" => (
            "Change only explicit coordinates. For automatic layout, discover layout_workflow; parameter edits never trigger global layout.",
            json!({"op":name,"positions":[{"nodeId":"writer","x":400,"y":120}]}),
        ),
        _ => (
            "Read this tool's input schema before calling it.",
            Value::Null,
        ),
    };
    json!({"op":name,"constraints":constraints,"example":example})
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn every_disclosed_operation_example_satisfies_the_shared_edit_schema() {
        let definition = super::super::catalog::definition("edit_workflow").unwrap();
        let validator = jsonschema::validator_for(&definition["parameters"]).unwrap();
        for item in definition["parameters"]["properties"]["operations"]["items"]["oneOf"]
            .as_array()
            .unwrap()
        {
            let name = item["properties"]["op"]["const"].as_str().unwrap();
            let guide = operation(name);
            let args = json!({"workflowId":"workflow_id","expectedRevision":1,"mutationId":"example","operations":[guide["example"]]});
            assert!(validator.is_valid(&args), "Invalid example: {name}: {args}");
        }
    }
}
