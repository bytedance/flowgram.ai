use super::*;
use regex::{Regex, RegexBuilder};
use unicode_segmentation::UnicodeSegmentation;

fn append(target: &mut String, text: &str) -> Result<()> {
    if target.len().saturating_add(text.len()) > MAX_BYTES {
        return Err(invalid("Text output exceeded 2 MB"));
    }
    target.push_str(text);
    Ok(())
}
fn regex(input: &Value) -> Result<Regex> {
    let pattern = string(input, "pattern")?;
    if pattern.len() > 64000 {
        return Err(invalid("Regular expression is limited to 64 KB"));
    }
    let flags = option(input, "flags", "");
    if !flags.chars().all(|c| "imsx".contains(c)) {
        return Err(invalid("Regular expression flags support only i/m/s/x"));
    }
    let re = RegexBuilder::new(pattern)
        .size_limit(4_000_000)
        .dfa_size_limit(2_000_000)
        .nest_limit(64)
        .case_insensitive(flags.contains('i'))
        .multi_line(flags.contains('m'))
        .dot_matches_new_line(flags.contains('s'))
        .ignore_whitespace(flags.contains('x'))
        .build()
        .map_err(|e| invalid(format!("Invalid regular expression: {e}")))?;
    if re.captures_len() > 100 {
        return Err(invalid(
            "Regular expressions may contain at most 100 capture groups",
        ));
    }
    Ok(re)
}
fn replacement(captures: &regex::Captures<'_>, template: &str) -> Result<String> {
    let mut output = String::new();
    let mut remaining = template;
    while let Some(index) = remaining.find('$') {
        append(&mut output, &remaining[..index])?;
        remaining = &remaining[index + 1..];
        if let Some(next) = remaining.strip_prefix('$') {
            append(&mut output, "$")?;
            remaining = next;
        } else if let Some(next) = remaining.strip_prefix('{') {
            let end = next
                .find('}')
                .ok_or_else(|| invalid("Unclosed capture group in replacement template"))?;
            let name = &next[..end];
            let found = if let Ok(index) = name.parse::<usize>() {
                if index >= captures.len() {
                    return Err(invalid(
                        "Replacement template references a nonexistent capture group",
                    ));
                }
                captures.get(index)
            } else {
                captures.name(name)
            };
            if let Some(value) = found {
                append(&mut output, value.as_str())?;
            }
            remaining = &next[end + 1..];
        } else {
            append(&mut output, "$")?;
        }
    }
    append(&mut output, remaining)?;
    Ok(output)
}
pub fn execute(node: &Node, input: &Value) -> Result<Value> {
    Ok(match node.kind.as_str() {
        "text.transform" => {
            let operation = option(input, "operation", "trim");
            if operation == "join" {
                let mut output = String::new();
                let separator = string(input, "separator")?;
                for (index, item) in array(input, "items")?.iter().enumerate() {
                    if index > 0 {
                        append(&mut output, separator)?;
                    }
                    append(
                        &mut output,
                        item.as_str().ok_or_else(|| {
                            invalid("Each item in a text-join list must be a string")
                        })?,
                    )?;
                }
                return Ok(json!({"text":output}));
            }
            let text = string(input, "text")?;
            let result = match operation {
                "trim" => match option(input, "position", "both") {
                    "start" => text.trim_start().into(),
                    "end" => text.trim_end().into(),
                    "all" => text.chars().filter(|c| !c.is_whitespace()).collect(),
                    _ => text.trim().into(),
                },
                "upper" => text.to_uppercase(),
                "lower" => text.to_lowercase(),
                "replace" => {
                    let search = string(input, "search")?;
                    if search.is_empty() {
                        return Err(invalid("Search text must be nonempty"));
                    }
                    let mut result = String::new();
                    let mut cursor = 0;
                    let limit = if option(input, "all", "yes") == "no" {
                        1
                    } else {
                        usize::MAX
                    };
                    for (start, _) in text.match_indices(search).take(limit) {
                        append(&mut result, &text[cursor..start])?;
                        append(&mut result, string(input, "replacement")?)?;
                        cursor = start + search.len();
                    }
                    append(&mut result, &text[cursor..])?;
                    result
                }
                "split" => {
                    let separator = string(input, "separator")?;
                    if separator.is_empty() {
                        return Err(invalid("Separator must be nonempty"));
                    }
                    let limit = usize_value(input, "maxItems", MAX_ITEMS)?;
                    let mut items = vec![];
                    // Apply the count to retained items, leaving the remainder in the last item.
                    let mut rest = text;
                    while items.len() + 1 < limit {
                        let Some(index) = rest.find(separator) else {
                            break;
                        };
                        let part = &rest[..index];
                        rest = &rest[index + separator.len()..];
                        if !part.is_empty() || option(input, "keepEmpty", "yes") == "yes" {
                            items.push(part);
                        }
                    }
                    if !rest.is_empty() || option(input, "keepEmpty", "yes") == "yes" {
                        items.push(rest);
                    }
                    return Ok(json!({"items":items}));
                }
                "slice" => {
                    let start = usize_value(input, "start", 0)?;
                    let length = usize_value(input, "length", usize::MAX)?;
                    text.graphemes(true).skip(start).take(length).collect()
                }
                _ => return Err(invalid("Text operation is not registered")),
            };
            json!({"text":result})
        }
        "text.regex" => {
            let re = regex(input)?;
            let text = string(input, "text")?;
            let operation = option(input, "operation", "extract");
            let all = option(input, "all", "yes") == "yes";
            if operation == "test" {
                return Ok(json!({"matched":re.is_match(text)}));
            }
            if operation == "replace" {
                let mut result = String::new();
                let mut cursor = 0;
                for captures in re
                    .captures_iter(text)
                    .take(if all { MAX_ITEMS + 1 } else { 1 })
                    .enumerate()
                {
                    let (index, captures) = captures;
                    if index >= MAX_ITEMS {
                        return Err(invalid("Regular expression matches exceeded 10000 items"));
                    }
                    let whole = captures.get(0).unwrap();
                    append(&mut result, &text[cursor..whole.start()])?;
                    append(
                        &mut result,
                        &replacement(&captures, string(input, "replacement")?)?,
                    )?;
                    cursor = whole.end();
                }
                append(&mut result, &text[cursor..])?;
                return Ok(json!({"text":result}));
            }
            if operation == "split" {
                let mut items = vec![];
                for part in re.split(text) {
                    if option(input, "keepEmpty", "yes") == "yes" || !part.is_empty() {
                        if items.len() >= MAX_ITEMS {
                            return Err(invalid("Regular expression split exceeded 10000 items"));
                        }
                        items.push(part);
                    }
                }
                return Ok(json!({"items":items}));
            }
            let names = re.capture_names().flatten().collect::<Vec<_>>();
            let mut matches = vec![];
            let (mut byte_cursor, mut character_cursor, mut output_bytes) = (0, 0, 0);
            for captures in re.captures_iter(text) {
                if matches.len() >= MAX_ITEMS {
                    return Err(invalid("Regular expression matches exceeded 10000 items"));
                }
                let whole = captures.get(0).unwrap();
                output_bytes += whole.len()
                    + captures
                        .iter()
                        .skip(1)
                        .flatten()
                        .map(|m| m.len())
                        .sum::<usize>()
                    + names
                        .iter()
                        .filter_map(|name| captures.name(name))
                        .map(|m| m.len())
                        .sum::<usize>();
                if output_bytes > MAX_BYTES {
                    return Err(invalid("Regular expression extraction exceeded 2 MB"));
                }
                let start = character_cursor + text[byte_cursor..whole.start()].chars().count();
                let end = start + whole.as_str().chars().count();
                byte_cursor = whole.end();
                character_cursor = end;
                matches.push(json!({"text":whole.as_str(),"groups":captures.iter().skip(1).map(|m|m.map(|m|m.as_str())).collect::<Vec<_>>(),"namedGroups":names.iter().map(|name|((*name).to_owned(),json!(captures.name(name).map(|m|m.as_str())))).collect::<serde_json::Map<_,_>>(),"start":start,"end":end}));
                if !all {
                    break;
                }
            }
            json!({"matches":matches})
        }
        "text.template" => {
            let mut env = minijinja::Environment::new();
            env.set_undefined_behavior(minijinja::UndefinedBehavior::Strict);
            env.set_fuel(Some(50_000));
            let html = option(input, "format", "text") == "html";
            env.set_auto_escape_callback(move |_: &str| {
                if html {
                    minijinja::AutoEscape::Html
                } else {
                    minijinja::AutoEscape::None
                }
            });
            let template = env
                .template_from_str(string(input, "template")?)
                .map_err(|e| invalid(format!("Template compilation failed: {e}")))?;
            struct Bounded(Vec<u8>);
            impl std::io::Write for Bounded {
                fn write(&mut self, bytes: &[u8]) -> std::io::Result<usize> {
                    if self.0.len() + bytes.len() > MAX_BYTES {
                        return Err(std::io::Error::other("Template output exceeded 2 MB"));
                    }
                    self.0.extend_from_slice(bytes);
                    Ok(bytes.len())
                }
                fn flush(&mut self) -> std::io::Result<()> {
                    Ok(())
                }
            }
            let mut output = Bounded(vec![]);
            template
                .render_captured_to(required(input, "variables")?, &mut output)
                .map_err(|e| invalid(format!("Template rendering failed: {e}")))?;
            json!({"text":String::from_utf8(output.0).expect("template UTF-8")})
        }
        "document.chunk" => chunks(input)?,
        _ => return Err(invalid("Text executor is not registered")),
    })
}
fn chunks(input: &Value) -> Result<Value> {
    let source = required(input, "source")?;
    let text = source
        .as_str()
        .or_else(|| source["text"].as_str())
        .ok_or_else(|| invalid("source: text or a document with a text field is required"))?;
    let size = usize_value(input, "size", 1000)?;
    let overlap = usize_value(input, "overlap", 100)?;
    if size == 0 || overlap >= size {
        return Err(invalid("Overlap must be smaller than the target length"));
    }
    let boundaries = text
        .char_indices()
        .map(|(i, _)| i)
        .chain(std::iter::once(text.len()))
        .collect::<Vec<_>>();
    let count = boundaries.len() - 1;
    let mode = option(input, "mode", "paragraph");
    let separator = option(input, "separator", "\n\n");
    if mode == "paragraph" && separator.is_empty() {
        return Err(invalid("Paragraph separator must be nonempty"));
    }
    let breaks = if mode == "heading" {
        Regex::new(r"(?m)^#{1,6}\s")
            .unwrap()
            .find_iter(text)
            .map(|m| m.start())
            .collect::<Vec<_>>()
    } else {
        vec![]
    };
    let mut result = vec![];
    let mut start = 0;
    let metadata_bytes = serde_json::to_vec(&source.get("metadata"))?.len()
        + serde_json::to_vec(&source.get("source"))?.len();
    let mut output_bytes = 0;
    while start < count {
        if result.len() >= MAX_ITEMS {
            return Err(invalid("Chunks exceeded 10000 items"));
        }
        let mut end = start.saturating_add(size).min(count);
        if end < count && mode != "fixed" {
            let a = boundaries[start];
            let b = boundaries[end];
            let boundary = if mode == "paragraph" {
                text[a..b].rfind(separator).map(|n| a + n + separator.len())
            } else {
                breaks.iter().copied().rfind(|n| *n > a && *n <= b)
            };
            if let Some(boundary) = boundary
                && let Ok(i) = boundaries.binary_search(&boundary)
                && i > start + overlap
            {
                end = i;
            }
        }
        output_bytes += boundaries[end] - boundaries[start] + metadata_bytes + 100;
        if output_bytes > MAX_BYTES {
            return Err(invalid("Chunk output exceeded 2 MB"));
        }
        result.push(json!({"id":format!("chunk_{}",result.len()+1),"text":&text[boundaries[start]..boundaries[end]],"start":start,"end":end,"source":source.get("source"),"metadata":source.get("metadata").cloned().unwrap_or_else(||json!({}))}));
        if end == count {
            break;
        }
        start = end - overlap;
    }
    Ok(json!({"chunks":result}))
}
