use super::{MAX_ITEMS, Result, Value, invalid};

pub fn segments(path: &str) -> Result<Vec<String>> {
    if path.len() > 4096 {
        return Err(invalid("Field path is too long"));
    }
    let parts: Vec<String> = if let Some(path) = path.strip_prefix('/') {
        path.split('/')
            .map(|p| {
                let mut text = String::new();
                let mut chars = p.chars();
                while let Some(c) = chars.next() {
                    if c == '~' {
                        text.push(match chars.next() {
                            Some('0') => '~',
                            Some('1') => '/',
                            _ => return Err(invalid("Invalid JSON Pointer escape")),
                        });
                    } else {
                        text.push(c);
                    }
                }
                Ok(text)
            })
            .collect::<Result<_>>()?
    } else {
        let path = path.strip_prefix("$.").unwrap_or(path);
        if path.is_empty() || path == "$" {
            vec![]
        } else {
            path.split('.').map(str::to_owned).collect()
        }
    };
    if parts.len() > 64 {
        return Err(invalid("Field paths may contain at most 64 levels"));
    }
    Ok(parts)
}
pub fn get<'a>(data: &'a Value, path: &str) -> Result<Option<&'a Value>> {
    let mut current = Some(data);
    for key in segments(path)? {
        current = current.and_then(|value| {
            if value.is_array() {
                key.parse::<usize>().ok().and_then(|i| value.get(i))
            } else {
                value.get(&key)
            }
        });
    }
    Ok(current)
}
pub fn query(data: &Value, path: &str) -> Result<Vec<Value>> {
    let mut current = vec![data];
    for key in segments(path)? {
        let mut next = vec![];
        for value in current {
            if key == "*" {
                match value {
                    Value::Array(a) => next.extend(a.iter()),
                    Value::Object(o) => next.extend(o.values()),
                    _ => {}
                }
            } else if let Some(v) = if value.is_array() {
                key.parse::<usize>().ok().and_then(|i| value.get(i))
            } else {
                value.get(&key)
            } {
                next.push(v);
            }
            if next.len() > MAX_ITEMS {
                return Err(invalid("Path matches exceeded 10000 items"));
            }
        }
        current = next;
    }
    Ok(current.into_iter().cloned().collect())
}
pub fn set(target: &mut Value, path: &str, value: Value) -> Result<()> {
    let parts = segments(path)?;
    if parts.is_empty() {
        return Err(invalid("Target path must be nonempty"));
    }
    let mut target = target;
    for (i, key) in parts.iter().enumerate() {
        let object = target.as_object_mut().ok_or_else(|| {
            invalid(format!(
                "Target path {path} conflicts with an existing value"
            ))
        })?;
        if i + 1 == parts.len() {
            object.insert(key.clone(), value);
            return Ok(());
        }
        target = object.entry(key).or_insert_with(|| serde_json::json!({}));
    }
    Ok(())
}
pub fn remove(target: &mut Value, path: &str) -> Result<()> {
    let mut parts = segments(path)?;
    let last = parts
        .pop()
        .ok_or_else(|| invalid("Removal path must be nonempty"))?;
    let mut target = target;
    for key in parts {
        let Some(v) = target.get_mut(&key) else {
            return Ok(());
        };
        target = v;
    }
    if let Some(object) = target.as_object_mut() {
        object.remove(&last);
    }
    Ok(())
}
pub fn check_conflicts(paths: impl IntoIterator<Item = String>) -> Result<()> {
    let mut all: Vec<Vec<String>> = vec![];
    for path in paths {
        let parts = segments(&path)?;
        if parts.is_empty()
            || all
                .iter()
                .any(|p| p.starts_with(&parts) || parts.starts_with(p))
        {
            return Err(invalid(format!(
                "Target path {path} is duplicated or has a parent/child path conflict"
            )));
        }
        all.push(parts);
    }
    Ok(())
}
