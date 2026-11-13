use super::*;
use super::{data, paths};
use crate::runtime::{resolve, resolve_optional};
use std::{
    cmp::Ordering,
    collections::{HashMap, HashSet},
};

pub fn predicate(rule: &Value, scope: &Values, depth: usize) -> Result<bool> {
    if depth > 8 {
        return Err(invalid("Condition groups may nest at most 8 levels"));
    }
    if let Some(rules) = rule["rules"].as_array() {
        if rules.is_empty() || rules.len() > 100 {
            return Err(invalid("Condition groups require between 1 and 100 rules"));
        }
        let and = match option(rule, "combinator", "and") {
            "and" => true,
            "or" => false,
            _ => return Err(invalid("Condition combinator must be and or or")),
        };
        for rule in rules {
            let matched = predicate(rule, scope, depth + 1)?;
            if and && !matched {
                return Ok(false);
            }
            if !and && matched {
                return Ok(true);
            }
        }
        return Ok(and);
    }
    let left = resolve_optional(required(rule, "left")?, scope)?;
    let op = string(rule, "operator")?;
    if op == "exists" {
        return Ok(left.is_some());
    }
    if op == "missing" {
        return Ok(left.is_none());
    }
    let Some(left) = left else {
        return Err(invalid(
            "Comparison field does not exist; use an existence condition or default value",
        ));
    };
    if op == "null" {
        return Ok(left.is_null());
    }
    if op == "empty" {
        return Ok(left.as_str() == Some("")
            || left.as_array().is_some_and(Vec::is_empty)
            || left.as_object().is_some_and(serde_json::Map::is_empty));
    }
    let right = resolve(required(rule, "right")?, scope)?;
    Ok(match op {
        "eq" => left == right,
        "neq" => left != right,
        "gt" | "gte" | "lt" | "lte" => {
            let (a, b) = left
                .as_f64()
                .zip(right.as_f64())
                .ok_or_else(|| invalid("Numeric comparison requires numbers on both sides"))?;
            match op {
                "gt" => a > b,
                "gte" => a >= b,
                "lt" => a < b,
                _ => a <= b,
            }
        }
        "contains" => {
            if let Some(a) = left.as_array() {
                a.contains(&right)
            } else {
                left.as_str()
                    .zip(right.as_str())
                    .ok_or_else(|| invalid("Contains requires text or a list"))?
                    .0
                    .contains(right.as_str().unwrap())
            }
        }
        "starts" | "ends" => {
            let (a, b) = left
                .as_str()
                .zip(right.as_str())
                .ok_or_else(|| invalid("Text conditions require text on both sides"))?;
            if op == "starts" {
                a.starts_with(b)
            } else {
                a.ends_with(b)
            }
        }
        "in" => right
            .as_array()
            .ok_or_else(|| invalid("The right operand of an in-list condition must be a list"))?
            .contains(&left),
        _ => return Err(invalid(format!("Unsupported condition operator {op}"))),
    })
}
fn key(value: &Value, keys: &[String], case_sensitive: bool) -> Result<String> {
    fn normalize(v: Value, sensitive: bool) -> Value {
        match v {
            Value::String(s) if !sensitive => json!(s.to_lowercase()),
            Value::Array(a) => json!(
                a.into_iter()
                    .map(|v| normalize(v, sensitive))
                    .collect::<Vec<_>>()
            ),
            Value::Object(o) => Value::Object(
                o.into_iter()
                    .map(|(k, v)| (k, normalize(v, sensitive)))
                    .collect(),
            ),
            v => v,
        }
    }
    let selected = if keys.is_empty() {
        value.clone()
    } else {
        let mut selected = LimitedList::default();
        for path in keys {
            let value = paths::get(value, path)?;
            push(
                &mut selected,
                json!({"exists":value.is_some(),"value":value}),
            )?;
        }
        json!(selected)
    };
    Ok(normalize(selected, case_sensitive).to_string())
}
#[derive(Default)]
struct LimitedList {
    items: Vec<Value>,
    bytes: usize,
}
impl serde::Serialize for LimitedList {
    fn serialize<S: serde::Serializer>(
        &self,
        serializer: S,
    ) -> std::result::Result<S::Ok, S::Error> {
        self.items.serialize(serializer)
    }
}
impl LimitedList {
    fn len(&self) -> usize {
        self.items.len()
    }
}
fn push(items: &mut LimitedList, value: Value) -> Result<()> {
    if items.items.len() >= MAX_ITEMS {
        return Err(invalid("List output exceeded 10000 items"));
    }
    items.bytes += serde_json::to_vec(&value)?.len() + 1;
    if items.bytes > MAX_BYTES {
        return Err(invalid("List output exceeded 2 MB"));
    }
    items.items.push(value);
    Ok(())
}
fn grouped<'a>(items: &'a [Value], keys: &[String]) -> Result<Vec<(Value, Vec<&'a Value>)>> {
    let mut groups: Vec<(Value, Vec<&Value>)> = vec![];
    let mut indices = HashMap::new();
    let mut key_bytes = 0;
    for item in items {
        let signature = key(item, keys, true)?;
        let index = if let Some(index) = indices.get(&signature) {
            *index
        } else {
            let mut group = json!({});
            for path in keys {
                if let Some(value) = paths::get(item, path)? {
                    group
                        .as_object_mut()
                        .unwrap()
                        .insert(path.clone(), value.clone());
                }
            }
            let index = groups.len();
            key_bytes += serde_json::to_vec(&group)?.len() + signature.len();
            if key_bytes > MAX_BYTES {
                return Err(invalid("Group key exceeded 2 MB"));
            }
            groups.push((group, vec![]));
            indices.insert(signature, index);
            index
        };
        groups[index].1.push(item);
    }
    Ok(groups)
}
fn scalar_cmp(a: &Value, b: &Value) -> Result<Ordering> {
    match (a, b) {
        (Value::String(a), Value::String(b)) => Ok(a.cmp(b)),
        (Value::Number(a), Value::Number(b)) => {
            Ok(a.as_f64().unwrap().total_cmp(&b.as_f64().unwrap()))
        }
        (Value::Bool(a), Value::Bool(b)) => Ok(a.cmp(b)),
        _ => Err(invalid(
            "Sort fields must have a consistent type: string, number, or boolean",
        )),
    }
}
pub fn execute(node: &Node, input: &Value, scope: &Values) -> Result<Value> {
    if node.kind == "list.concat" {
        let lists = array(input, "lists")?;
        if lists.len() < 2 {
            return Err(invalid("Concatenation requires at least two lists"));
        }
        let mut result = LimitedList::default();
        for list in lists {
            for value in list
                .as_array()
                .ok_or_else(|| invalid("Each item in lists must be a list"))?
            {
                push(&mut result, value.clone())?;
            }
        }
        return Ok(json!({"items":result}));
    }
    if node.kind == "list.join" {
        return join(input);
    }
    if node.kind == "list.set" {
        let (left, right) = (array(input, "left")?, array(input, "right")?);
        let keys = data::path_list(node, "keys")?;
        let left_keys = left
            .iter()
            .map(|v| key(v, &keys, true))
            .collect::<Result<HashSet<_>>>()?;
        let right_keys = right
            .iter()
            .map(|v| key(v, &keys, true))
            .collect::<Result<HashSet<_>>>()?;
        let op = option(input, "operation", "intersection");
        let mut seen = HashSet::new();
        let mut result = LimitedList::default();
        for (is_right, list) in [(false, left), (true, right)] {
            for value in list {
                let k = key(value, &keys, true)?;
                let include = match op {
                    "intersection" => !is_right && right_keys.contains(&k),
                    "difference" => !is_right && !right_keys.contains(&k),
                    "union" => true,
                    "symmetric" => {
                        if is_right {
                            !left_keys.contains(&k)
                        } else {
                            !right_keys.contains(&k)
                        }
                    }
                    _ => return Err(invalid("Invalid set operation")),
                };
                if include && seen.insert(k) {
                    push(&mut result, value.clone())?;
                }
            }
        }
        return Ok(json!({"items":result}));
    }
    let items = array(input, "items")?;
    Ok(match node.kind.as_str() {
        "list.filter" | "list.map" => {
            let mut local = scope.clone();
            let mut result = LimitedList::default();
            let mut errors = LimitedList::default();
            for (index, item) in items.iter().enumerate() {
                local.insert("item".into(), item.clone());
                local.insert("index".into(), json!(index));
                if node.kind == "list.filter" {
                    if predicate(static_value(node, "predicate"), &local, 0)? {
                        push(&mut result, item.clone())?;
                    }
                } else {
                    match data::mapping(node, &local) {
                        Ok(value) => {
                            check_size(&value)?;
                            push(&mut result, value)?;
                        }
                        Err(e) if option(input, "onError", "error") == "null" => {
                            push(&mut result, Value::Null)?;
                            push(
                                &mut errors,
                                json!({"index":index,"message":e.to_string().chars().take(1000).collect::<String>()}),
                            )?;
                        }
                        Err(e) => return Err(invalid(format!("Mapping item {index} failed: {e}"))),
                    }
                }
            }
            if node.kind == "list.filter" {
                json!({"matchedCount":result.len(),"removedCount":items.len()-result.len(),"items":result})
            } else {
                json!({"items":result,"errors":errors})
            }
        }
        "list.sort" => {
            let keys = static_value(node, "keys")
                .as_array()
                .ok_or_else(|| invalid("Sort keys are required"))?;
            if keys.is_empty() || keys.len() > 20 {
                return Err(invalid("Between 1 and 20 sort keys are required"));
            }
            let mut rows = items
                .iter()
                .map(|v| {
                    Ok((
                        v.clone(),
                        keys.iter()
                            .map(|k| Ok(paths::get(v, string(k, "path")?)?.cloned()))
                            .collect::<Result<Vec<_>>>()?,
                    ))
                })
                .collect::<Result<Vec<_>>>()?;
            for (index, k) in keys.iter().enumerate() {
                if !["asc", "desc"].contains(&option(k, "direction", "asc"))
                    || !["first", "last"].contains(&option(k, "nulls", "last"))
                {
                    return Err(invalid("Invalid sort direction or null placement"));
                }
                let mut first = None;
                for (_, values) in &rows {
                    if let Some(value) = values[index].as_ref().filter(|v| !v.is_null()) {
                        if let Some(prev) = first {
                            scalar_cmp(prev, value)?;
                        } else {
                            scalar_cmp(value, value)?;
                            first = Some(value);
                        }
                    }
                }
            }
            rows.sort_by(|(_, a), (_, b)| {
                for (index, k) in keys.iter().enumerate() {
                    let a = a[index].as_ref().filter(|v| !v.is_null());
                    let b = b[index].as_ref().filter(|v| !v.is_null());
                    let order = match (a, b) {
                        (None, None) => Ordering::Equal,
                        (None, _) => {
                            if option(k, "nulls", "last") == "first" {
                                Ordering::Less
                            } else {
                                Ordering::Greater
                            }
                        }
                        (_, None) => {
                            if option(k, "nulls", "last") == "first" {
                                Ordering::Greater
                            } else {
                                Ordering::Less
                            }
                        }
                        (Some(a), Some(b)) => {
                            let c = scalar_cmp(a, b).expect("validated keys");
                            if option(k, "direction", "asc") == "desc" {
                                c.reverse()
                            } else {
                                c
                            }
                        }
                    };
                    if order != Ordering::Equal {
                        return order;
                    }
                }
                Ordering::Equal
            });
            json!({"items":rows.into_iter().map(|(v,_)|v).collect::<Vec<_>>()})
        }
        "list.deduplicate" => {
            let keys = data::path_list(node, "keys")?;
            let sensitive = option(input, "caseSensitive", "yes") == "yes";
            let mut seen = HashSet::new();
            let mut selected = vec![];
            let indices: Box<dyn Iterator<Item = usize>> =
                if option(input, "keep", "first") == "last" {
                    Box::new((0..items.len()).rev())
                } else {
                    Box::new(0..items.len())
                };
            for index in indices {
                if seen.insert(key(&items[index], &keys, sensitive)?) {
                    selected.push(index);
                }
            }
            selected.sort_unstable();
            json!({"items":selected.iter().map(|i|items[*i].clone()).collect::<Vec<_>>(),"duplicateCount":items.len()-selected.len()})
        }
        "list.slice" => {
            let length = usize_value(input, "length", items.len())?;
            let start = match option(input, "operation", "slice") {
                "last" => items.len().saturating_sub(length),
                "first" => 0,
                _ => usize_value(input, "start", 0)?,
            }
            .min(items.len());
            let end = start.saturating_add(length).min(items.len());
            json!({"items":&items[start..end],"count":end-start})
        }
        "list.flatten" => {
            fn flatten(
                items: &[Value],
                depth: usize,
                strict: bool,
                result: &mut LimitedList,
            ) -> Result<()> {
                for value in items {
                    if depth > 0 {
                        if let Some(array) = value.as_array() {
                            flatten(array, depth - 1, strict, result)?;
                            continue;
                        }
                        if strict {
                            return Err(invalid("Flattened level contains a non-list item"));
                        }
                    }
                    push(result, value.clone())?;
                }
                Ok(())
            }
            let mut result = LimitedList::default();
            flatten(
                items,
                usize_value(input, "depth", 1)?,
                option(input, "nonArray", "keep") == "error",
                &mut result,
            )?;
            json!({"items":result})
        }
        "list.batch" => {
            let size = usize_value(input, "size", 10)?;
            if size == 0 {
                return Err(invalid("Batch size must be greater than 0"));
            }
            let batches = items
                .chunks(size)
                .filter(|c| option(input, "remainder", "keep") != "drop" || c.len() == size)
                .collect::<Vec<_>>();
            json!({"batchCount":batches.len(),"batches":batches})
        }
        "list.group" => {
            let keys = data::path_list(node, "keys")?;
            if keys.is_empty() {
                return Err(invalid("At least one group field is required"));
            }
            json!({"groups":grouped(items,&keys)?.into_iter().map(|(key,items)|json!({"key":key,"count":items.len(),"items":items})).collect::<Vec<_>>()})
        }
        "list.aggregate" => {
            let keys = data::path_list(node, "keys")?;
            let metrics = static_value(node, "metrics")
                .as_array()
                .ok_or_else(|| invalid("Aggregate metrics are required"))?;
            if metrics.is_empty() || metrics.len() > 100 {
                return Err(invalid("Between 1 and 100 metrics are required"));
            }
            let mut names = HashSet::from(["key"]);
            for metric in metrics {
                let name = string(metric, "name")?;
                if name.is_empty() || !names.insert(name) {
                    return Err(invalid(
                        "Metric names must be nonempty, unique, and cannot use the reserved name key",
                    ));
                }
            }
            let groups = if keys.is_empty() {
                vec![(json!({}), items.iter().collect::<Vec<_>>())]
            } else {
                grouped(items, &keys)?
            };
            let mut rows = vec![];
            for (group, items) in groups {
                let mut row = json!({"key":group});
                for metric in metrics {
                    let op = string(metric, "operation")?;
                    let path = string(metric, "path")?;
                    let values = items
                        .iter()
                        .map(|item| paths::get(item, path))
                        .collect::<Result<Vec<_>>>()?
                        .into_iter()
                        .flatten()
                        .filter(|v| !v.is_null())
                        .collect::<Vec<_>>();
                    let value = match op {
                        "count" => json!(if path.is_empty() {
                            items.len()
                        } else {
                            values.len()
                        }),
                        "collect" => json!(values),
                        "sum" | "avg" | "min" | "max" => {
                            let numbers = values
                                .iter()
                                .map(|v| {
                                    v.as_f64().ok_or_else(|| {
                                        invalid(format!(
                                            "Metric {} requires a numeric field",
                                            string(metric, "name").unwrap_or_default()
                                        ))
                                    })
                                })
                                .collect::<Result<Vec<_>>>()?;
                            if numbers.is_empty() && op != "sum" {
                                Value::Null
                            } else {
                                finite(match op {
                                    "sum" => numbers.iter().sum(),
                                    "avg" => numbers.iter().sum::<f64>() / numbers.len() as f64,
                                    "min" => numbers.iter().copied().fold(f64::INFINITY, f64::min),
                                    _ => numbers.iter().copied().fold(f64::NEG_INFINITY, f64::max),
                                })?
                            }
                        }
                        _ => return Err(invalid("Unsupported aggregate metric")),
                    };
                    row.as_object_mut()
                        .unwrap()
                        .insert(string(metric, "name")?.into(), value);
                }
                rows.push(row);
                check_size(&json!(rows))?;
            }
            json!({"rows":rows})
        }
        _ => return Err(invalid("List executor is not registered")),
    })
}
fn join(input: &Value) -> Result<Value> {
    let left = array(input, "left")?;
    let right = array(input, "right")?;
    let by_position = option(input, "mode", "key") == "position";
    let kind = option(input, "join", "left");
    let mut lookup: HashMap<String, Vec<usize>> = HashMap::new();
    for (index, row) in right.iter().enumerate() {
        let value = if by_position {
            Some(json!(index))
        } else {
            paths::get(row, string(input, "rightKey")?)?.cloned()
        };
        if let Some(value) = value {
            lookup.entry(value.to_string()).or_default().push(index);
        }
    }
    let mut matched_right = HashSet::new();
    let mut unmatched_left = 0;
    let mut result = LimitedList::default();
    for (index, row) in left.iter().enumerate() {
        let value = if by_position {
            Some(json!(index))
        } else {
            paths::get(row, string(input, "leftKey")?)?.cloned()
        };
        let matches = value.and_then(|v| lookup.get(&v.to_string()));
        if let Some(matches) = matches {
            for index in matches {
                matched_right.insert(*index);
                push(&mut result, json!({"left":row,"right":right[*index]}))?;
            }
        } else {
            unmatched_left += 1;
            if ["left", "full"].contains(&kind) {
                push(&mut result, json!({"left":row,"right":null}))?;
            }
        }
    }
    if ["right", "full"].contains(&kind) {
        for (index, row) in right.iter().enumerate() {
            if !matched_right.contains(&index) {
                push(&mut result, json!({"left":null,"right":row}))?;
            }
        }
    }
    Ok(
        json!({"items":result,"unmatchedLeftCount":unmatched_left,"unmatchedRightCount":right.len()-matched_right.len()}),
    )
}
