use serde_json::{Value, json};
use std::{collections::HashSet, sync::LazyLock};
pub static REGISTRY: LazyLock<Vec<Value>> = LazyLock::new(|| {
    serde_json::from_str(include_str!("../../catalog/workflow-tools.json")).expect("tool contracts")
});
pub fn readonly(name: &str) -> bool {
    REGISTRY
        .iter()
        .any(|s| s["name"] == name && s["readOnly"] == true)
}
pub fn definition(name: &str) -> Option<Value> {
    REGISTRY.iter().find(|s|s["name"]==name).map(|s|json!({"type":"function","name":s["name"],"description":s["description"],"parameters":s["parameters"],"strict":false}))
}
pub fn definitions() -> Value {
    json!(
        REGISTRY
            .iter()
            .filter_map(|s| definition(s["name"].as_str().unwrap()))
            .collect::<Vec<_>>()
    )
}
pub fn visible(loaded: &HashSet<String>, read_only: bool) -> Value {
    json!(
        REGISTRY
            .iter()
            .filter(|s| (!read_only || s["readOnly"] == true)
                && (s["initial"] == true || loaded.contains(s["name"].as_str().unwrap())))
            .filter_map(|s| definition(s["name"].as_str().unwrap()))
            .collect::<Vec<_>>()
    )
}
pub fn matches(query: &str, group: Option<&str>, read_only: bool) -> Vec<Value> {
    let terms: Vec<_> = query.split_whitespace().map(str::to_lowercase).collect();
    REGISTRY.iter().filter(|s| (!read_only || s["readOnly"]==true)
        && terms.iter().all(|q|format!("{} {}",s["name"],s["description"]).to_lowercase().contains(q))
        && group.is_none_or(|g|s["group"]==g))
        .map(|s|json!({"name":s["name"],"description":s["description"],"group":s["group"],"readOnly":s["readOnly"],"uiIntent":s["uiIntent"]})).collect()
}
/// Standard MCP pagination, shared by project and registry servers.
pub fn mcp_list(cursor: Option<&str>) -> crate::error::Result<Value> {
    let start = cursor.unwrap_or("0").parse::<usize>().map_err(|_| {
        crate::workflow_edit::graph::failure("INVALID_ARGUMENT", "Invalid tool cursor")
    })?;
    if start > REGISTRY.len() {
        return Err(crate::workflow_edit::graph::failure(
            "INVALID_ARGUMENT",
            "Invalid tool cursor",
        ));
    }
    let end = (start + 12).min(REGISTRY.len());
    let tools: Vec<_> = REGISTRY[start..end].iter().map(|t| {
        let mut schema=json!({"type":"object","properties":{"projectId":{"type":"string"},"arguments":t["parameters"]},"required":["projectId","arguments"],"additionalProperties":false});
        if let Some(defs)=t["parameters"].get("$defs") { schema["$defs"]=defs.clone(); }
        json!({"name":t["name"],"description":t["description"],"inputSchema":schema,"annotations":{"readOnlyHint":t["readOnly"],"destructiveHint":t["readOnly"]==false,"idempotentHint":true},"_meta":{"uiIntent":t["uiIntent"]}})
    }).collect();
    let mut page = json!({"tools":tools});
    if end < REGISTRY.len() {
        page["nextCursor"] = json!(end.to_string());
    }
    Ok(page)
}
pub fn mcp_result(value: Value) -> Value {
    let error = value["ok"] == false;
    let text = if error {
        json!({"ok":false,"error":value["error"]})
    } else {
        // Text-only MCP clients must be able to finish reading a result. Returning
        // only another resultRef from read_tool_result would create an endless chain.
        let page = matches!(
            value["data"]["kind"].as_str(),
            Some("object" | "array" | "text" | "scalar")
        );
        let data = if page || value["data"].to_string().len() <= 2500 {
            value["data"].clone()
        } else {
            json!({"valueRef":{"resultId":value["resultRef"]["resultId"],"path":"/data"},"instruction":"Read the required path with read_tool_result."})
        };
        json!({"ok":true,"context":value["context"],"data":data,"resultRef":value["resultRef"]})
    };
    json!({"content":[{"type":"text","text":text.to_string()}],"structuredContent":value,"isError":error})
}
