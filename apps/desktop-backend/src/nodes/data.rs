use super::paths;
use super::*;
use crate::runtime::resolve;

pub fn path_list(node: &Node, key: &str) -> Result<Vec<String>> {
    let value = static_value(node, key);
    if value.as_array().is_some_and(|v| v.len() > 100) {
        return Err(invalid("At most 100 field paths are allowed"));
    }
    value
        .as_array()
        .ok_or_else(|| invalid(format!("{key}: a list of field paths is required")))?
        .iter()
        .map(|v| {
            v.as_str()
                .map(str::to_owned)
                .ok_or_else(|| invalid(format!("{key}: paths must be strings")))
        })
        .collect()
}
pub fn mapping(node: &Node, scope: &Values) -> Result<Value> {
    let map = static_value(node, "mapping")
        .as_object()
        .ok_or_else(|| invalid("mapping: a field mapping object is required"))?;
    if map.len() > 200 {
        return Err(invalid("Field mappings are limited to 200 entries"));
    }
    paths::check_conflicts(map.keys().cloned())?;
    let mut result = json!({});
    let mut bytes = 0;
    for (path, binding) in map {
        let value = resolve(binding, scope)?;
        bytes += serde_json::to_vec(&value)?.len() + path.len();
        if bytes > MAX_BYTES {
            return Err(invalid("Field mapping output exceeded 2 MB"));
        }
        paths::set(&mut result, path, value)?;
    }
    Ok(result)
}
fn reject_refs(value: &Value) -> Result<()> {
    match value {
        Value::Object(object) => {
            for (key, value) in object {
                if key == "$ref" || key == "$dynamicRef" {
                    return Err(invalid(
                        "Schemas must use inline definitions; references and remote loading are not supported",
                    ));
                }
                reject_refs(value)?;
            }
        }
        Value::Array(array) => {
            for value in array {
                reject_refs(value)?;
            }
        }
        _ => {}
    }
    Ok(())
}
pub fn schema_issues(value: &Value, schema: &Value, strict: bool) -> Result<Vec<Value>> {
    if serde_json::to_vec(schema)?.len() > 64000 {
        return Err(invalid("Schema is limited to 64 KB"));
    }
    reject_refs(schema)?;
    fn close(schema: &mut Value) {
        if schema["type"] == "object" {
            schema["additionalProperties"] = json!(false);
        }
        if let Some(properties) = schema.get_mut("properties").and_then(Value::as_object_mut) {
            for value in properties.values_mut() {
                close(value);
            }
        }
        if let Some(items) = schema.get_mut("items") {
            close(items);
        }
    }
    let mut schema = schema.clone();
    if strict {
        close(&mut schema);
    }
    let validator = jsonschema::options()
        .with_pattern_options(
            jsonschema::PatternOptions::regex()
                .size_limit(4_000_000)
                .dfa_size_limit(2_000_000),
        )
        .should_validate_formats(true)
        .build(&schema)
        .map_err(|e| invalid(format!("Invalid schema: {e}")))?;
    Ok(validator.iter_errors(value).take(100).map(|e|json!({"path":e.instance_path.to_string(),"message":e.to_string().chars().take(2000).collect::<String>(),"schemaPath":e.schema_path.to_string()})).collect())
}
fn merge(
    target: &mut Value,
    source: &Value,
    deep: bool,
    conflict: &str,
    arrays: &str,
    path: &str,
) -> Result<()> {
    let source = source
        .as_object()
        .ok_or_else(|| invalid("objects: each item must be an object"))?;
    let target = target
        .as_object_mut()
        .ok_or_else(|| invalid("Merge target is not an object"))?;
    for (key, value) in source {
        let location = format!("{path}/{key}");
        match target.get_mut(key) {
            Some(existing) if deep && existing.is_object() && value.is_object() => {
                merge(existing, value, true, conflict, arrays, &location)?
            }
            Some(existing)
                if deep && existing.is_array() && value.is_array() && arrays == "append" =>
            {
                let a = existing.as_array_mut().unwrap();
                a.extend(value.as_array().unwrap().clone());
                if a.len() > MAX_ITEMS {
                    return Err(invalid("Merged list exceeded 10000 items"));
                }
            }
            Some(existing) if existing != value && conflict == "error" => {
                return Err(invalid(format!("Merge conflict: {location}")));
            }
            _ => {
                target.insert(key.clone(), value.clone());
            }
        }
    }
    Ok(())
}
fn convert(value: &Value, target: &str) -> Result<Value> {
    let result = match target {
        "string" => json!(
            value
                .as_str()
                .map(str::to_owned)
                .unwrap_or_else(|| value.to_string())
        ),
        "number" | "integer" => {
            if value.is_boolean() || value.is_null() {
                return Err(invalid(
                    "Booleans and null cannot be implicitly converted to numbers",
                ));
            }
            let n = if let Some(n) = value.as_f64() {
                n
            } else {
                let text = value
                    .as_str()
                    .ok_or_else(|| invalid("Numeric conversion requires a number or numeric text"))?
                    .trim();
                if text.is_empty() {
                    return Err(invalid("Empty text is not a number"));
                }
                text.parse::<f64>()
                    .map_err(|_| invalid("Invalid numeric text"))?
            };
            if !n.is_finite() {
                return Err(invalid("Numbers must be finite"));
            }
            if target == "integer" {
                if n.fract() != 0.0
                    || !(-9_007_199_254_740_991.0..=9_007_199_254_740_991.0).contains(&n)
                {
                    return Err(invalid(
                        "Integer conversion requires an integer in the safe range",
                    ));
                }
                json!(n as i64)
            } else {
                json!(n)
            }
        }
        "boolean" => match value {
            Value::Bool(b) => json!(b),
            Value::String(s) if s.trim().eq_ignore_ascii_case("true") => json!(true),
            Value::String(s) if s.trim().eq_ignore_ascii_case("false") => json!(false),
            _ => {
                return Err(invalid(
                    "Boolean conversion accepts only booleans or true/false text",
                ));
            }
        },
        "object" | "array" => {
            let parsed = if let Some(text) = value.as_str() {
                serde_json::from_str(text)
                    .map_err(|e| invalid(format!("JSON conversion failed: {e}")))?
            } else {
                value.clone()
            };
            if (target == "object" && !parsed.is_object())
                || (target == "array" && !parsed.is_array())
            {
                return Err(invalid("Converted result does not match the target type"));
            }
            parsed
        }
        _ => return Err(invalid("Unsupported target type")),
    };
    Ok(result)
}
pub fn execute(node: &Node, input: &Value, scope: &Values) -> Result<Value> {
    Ok(match node.kind.as_str() {
        "data.map-fields" => {
            let mapped = mapping(node, scope)?;
            let mut result = if option(input, "preserve", "no") == "yes" {
                required(input, "source")?.clone()
            } else {
                json!({})
            };
            merge(&mut result, &mapped, true, "overwrite", "replace", "")?;
            json!({"result":result})
        }
        "data.select-fields" => {
            let source = required(input, "object")?;
            let mode = option(input, "operation", "keep");
            let mut result = if mode == "keep" {
                json!({})
            } else {
                source.clone()
            };
            if mode == "rename" {
                let rules = static_value(node, "renames")
                    .as_array()
                    .ok_or_else(|| invalid("renames: a list of renames is required"))?;
                if rules.len() > 200 {
                    return Err(invalid("Rename rules are limited to 200 entries"));
                }
                paths::check_conflicts(
                    rules
                        .iter()
                        .map(|r| r["to"].as_str().unwrap_or_default().to_owned()),
                )?;
                for rule in rules {
                    let from = string(rule, "from")?;
                    let to = string(rule, "to")?;
                    if from == to {
                        continue;
                    }
                    if let Some(value) = paths::get(source, from)? {
                        if paths::get(&result, to)?.is_some() {
                            return Err(invalid(format!("Rename target {to} already exists")));
                        }
                        paths::remove(&mut result, from)?;
                        paths::set(&mut result, to, value.clone())?;
                        check_size(&result)?;
                    }
                }
            } else {
                let keys = path_list(node, "paths")?;
                if mode == "keep" {
                    paths::check_conflicts(keys.clone())?;
                }
                for path in keys {
                    if mode == "remove" {
                        paths::remove(&mut result, &path)?;
                    } else if let Some(value) = paths::get(source, &path)? {
                        paths::set(&mut result, &path, value.clone())?;
                    }
                }
            }
            json!({"result":result})
        }
        "data.merge-objects" => {
            let mut result = json!({});
            for source in array(input, "objects")? {
                merge(
                    &mut result,
                    source,
                    option(input, "depth", "shallow") == "deep",
                    option(input, "conflict", "overwrite"),
                    option(input, "arrays", "replace"),
                    "",
                )?;
                check_size(&result)?;
            }
            json!({"result":result})
        }
        "data.get-value" => {
            let matches = paths::query(required(input, "data")?, string(input, "path")?)?;
            let value = if option(input, "mode", "single") == "multiple" {
                json!(matches)
            } else {
                if matches.len() > 1 {
                    return Err(invalid(
                        "Single-value path matched multiple values; use multiple-value mode",
                    ));
                }
                match matches.into_iter().next() {
                    Some(v) => v,
                    None if option(input, "missing", "error") == "default" => {
                        required(input, "fallback")?.clone()
                    }
                    None => return Err(invalid("Path matched no values")),
                }
            };
            json!({"value":value})
        }
        "data.default" => {
            let mode = option(input, "replace", "null");
            let value = input.get("value");
            let replace = value.is_none_or(|v| {
                v.is_null()
                    || (["empty-text", "empty"].contains(&mode) && v.as_str() == Some(""))
                    || (["empty-list", "empty"].contains(&mode)
                        && v.as_array().is_some_and(Vec::is_empty))
            });
            json!({"value":if replace{required(input,"fallback")?}else{value.unwrap()}})
        }
        "data.convert" => {
            let target = string(input, "target")?;
            let value = match convert(required(input, "value")?, target) {
                Ok(value) => value,
                Err(_) if option(input, "failure", "error") == "fallback" => {
                    convert(required(input, "fallback")?, target)?
                }
                Err(error) => return Err(error),
            };
            json!({"value":value})
        }
        "data.parse-json" => {
            let value: Value = serde_json::from_str(string(input, "text")?).map_err(|e| {
                invalid(format!(
                    "JSON parsing failed (line {}, column {}): {e}",
                    e.line(),
                    e.column()
                ))
            })?;
            if option(input, "validate", "no") == "yes" {
                let issues = schema_issues(&value, static_value(node, "schema"), false)?;
                if !issues.is_empty() {
                    return Err(invalid(format!(
                        "JSON does not match the schema: {}",
                        json!(issues)
                    )));
                }
            }
            json!({"result":value})
        }
        "data.stringify-json" => {
            let value = required(input, "value")?;
            let mut bytes = vec![];
            let indent = option(input, "indent", "0");
            if indent == "0" {
                serde_json::to_writer(&mut bytes, value)?;
            } else {
                use serde::Serialize;
                let formatter = serde_json::ser::PrettyFormatter::with_indent(if indent == "4" {
                    b"    "
                } else {
                    b"  "
                });
                value.serialize(&mut serde_json::Serializer::with_formatter(
                    &mut bytes, formatter,
                ))?;
            }
            json!({"text":String::from_utf8(bytes).expect("JSON is UTF-8")})
        }
        "data.validate" => {
            let value = required(input, "value")?;
            let issues = schema_issues(
                value,
                static_value(node, "schema"),
                option(input, "strict", "yes") == "yes",
            )?;
            if !issues.is_empty() && option(input, "failure", "error") == "error" {
                return Err(invalid(format!(
                    "Data validation failed: {}",
                    json!(issues)
                )));
            }
            json!({"value":value,"valid":issues.is_empty(),"issues":issues})
        }
        _ => return Err(invalid("Object executor is not registered")),
    })
}
