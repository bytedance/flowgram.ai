use super::*;
use base64::{Engine, engine::general_purpose::STANDARD};
use chrono::{DateTime, Datelike, Duration, Months, NaiveDate, NaiveDateTime, TimeZone, Timelike};
use chrono_tz::Tz;
use sha2::{Digest, Sha256, Sha384, Sha512};

pub fn execute(node: &Node, input: &Value) -> Result<Value> {
    Ok(match node.kind.as_str() {
        "value.math" => {
            let op = option(input, "operation", "add");
            let n = match op {
                "add" | "subtract" | "multiply" | "divide" => {
                    let operands = array(input, "operands")?;
                    if operands.len() < 2 {
                        return Err(invalid("At least two operands are required"));
                    }
                    let numbers = operands
                        .iter()
                        .map(|v| {
                            v.as_f64()
                                .ok_or_else(|| invalid("Operands must be numbers"))
                        })
                        .collect::<Result<Vec<_>>>()?;
                    let mut result = numbers[0];
                    for n in &numbers[1..] {
                        result = match op {
                            "add" => result + n,
                            "subtract" => result - n,
                            "multiply" => result * n,
                            _ => {
                                if *n == 0.0 {
                                    return Err(invalid("Cannot divide by zero"));
                                }
                                result / n
                            }
                        };
                        if !result.is_finite() {
                            return Err(invalid("Numeric operation overflow"));
                        }
                    }
                    result
                }
                "abs" => number(input, "value")?.abs(),
                "power" => number(input, "value")?.powf(number(input, "exponent")?),
                "round" => {
                    let factor = 10_f64.powi(input["digits"].as_i64().unwrap_or(0) as i32);
                    let v = number(input, "value")? * factor;
                    let rounded = match option(input, "rounding", "round") {
                        "floor" => v.floor(),
                        "ceil" => v.ceil(),
                        "trunc" => v.trunc(),
                        _ => v.round(),
                    };
                    rounded / factor
                }
                "clamp" | "range" => {
                    let value = number(input, "value")?;
                    let min = number(input, "min")?;
                    let max = number(input, "max")?;
                    if min > max {
                        return Err(invalid("Lower bound cannot exceed upper bound"));
                    }
                    if op == "range" {
                        return Ok(json!({"matched":value>=min&&value<=max}));
                    }
                    value.clamp(min, max)
                }
                _ => return Err(invalid("Math operation is not registered")),
            };
            json!({"value":finite(n)?})
        }
        "value.encode" => {
            let text = string(input, "text")?;
            let encoding = option(input, "encoding", "base64");
            let encode = option(input, "operation", "encode") == "encode";
            let result = if encode {
                match encoding {
                    "base64" => STANDARD.encode(text.as_bytes()),
                    "hex" => hex::encode(text.as_bytes()),
                    "url" => {
                        const COMPONENT: &percent_encoding::AsciiSet =
                            &percent_encoding::NON_ALPHANUMERIC
                                .remove(b'-')
                                .remove(b'_')
                                .remove(b'.')
                                .remove(b'~');
                        percent_encoding::utf8_percent_encode(text, COMPONENT).to_string()
                    }
                    _ => return Err(invalid("Encoding is not registered")),
                }
            } else {
                let bytes = match encoding {
                    "base64" => STANDARD
                        .decode(text)
                        .map_err(|e| invalid(format!("Invalid Base64: {e}")))?,
                    "hex" => hex::decode(text).map_err(|e| invalid(format!("Invalid Hex: {e}")))?,
                    "url" => {
                        let bytes = text.as_bytes();
                        for (index, c) in bytes.iter().enumerate() {
                            if *c == b'%'
                                && (index + 2 >= bytes.len()
                                    || !bytes[index + 1].is_ascii_hexdigit()
                                    || !bytes[index + 2].is_ascii_hexdigit())
                            {
                                return Err(invalid("Invalid URL percent escape"));
                            }
                        }
                        percent_encoding::percent_decode_str(text).collect()
                    }
                    _ => return Err(invalid("Encoding is not registered")),
                };
                String::from_utf8(bytes).map_err(|_| invalid("Decoded result is not UTF-8 text"))?
            };
            json!({"text":result})
        }
        "value.hash" => {
            let text = string(input, "text")?;
            let algorithm = option(input, "algorithm", "sha256");
            let bytes = match algorithm {
                "sha256" => Sha256::digest(text.as_bytes()).to_vec(),
                "sha384" => Sha384::digest(text.as_bytes()).to_vec(),
                "sha512" => Sha512::digest(text.as_bytes()).to_vec(),
                _ => return Err(invalid("Hash algorithm is not registered")),
            };
            json!({"digest":if option(input,"encoding","hex")=="base64"{STANDARD.encode(bytes)}else{hex::encode(bytes)},"algorithm":algorithm})
        }
        "value.datetime" => datetime(input)?,
        _ => return Err(invalid("Value executor is not registered")),
    })
}
fn local(timezone: Tz, naive: NaiveDateTime) -> Result<DateTime<Tz>> {
    timezone
        .from_local_datetime(&naive)
        .single()
        .ok_or_else(|| invalid("This local time is ambiguous or nonexistent due to daylight saving. Provide an ISO 8601 time with an explicit offset"))
}
fn check_format(format: &str) -> Result<()> {
    if format.len() > 1024 {
        return Err(invalid("Date format is limited to 1024 bytes"));
    }
    if chrono::format::StrftimeItems::new(format).any(|v| matches!(v, chrono::format::Item::Error))
    {
        return Err(invalid(
            "Invalid date format; use directives such as %Y-%m-%d",
        ));
    }
    Ok(())
}
fn parse(text: &str, format: &str, timezone: Tz) -> Result<DateTime<Tz>> {
    if let Ok(value) = DateTime::parse_from_rfc3339(text) {
        return Ok(value.with_timezone(&timezone));
    }
    check_format(format)?;
    if let Ok(value) = DateTime::parse_from_str(text, format) {
        return Ok(value.with_timezone(&timezone));
    }
    if let Ok(value) = NaiveDateTime::parse_from_str(text, format) {
        return local(timezone, value);
    }
    let date = NaiveDate::parse_from_str(text, format)
        .or_else(|_| NaiveDate::parse_from_str(text, "%Y-%m-%d"))
        .map_err(|e| invalid(format!("Date parsing failed: {e}")))?;
    local(
        timezone,
        date.and_hms_opt(0, 0, 0)
            .ok_or_else(|| invalid("Date is out of range"))?,
    )
}
fn duration(unit: &str, amount: i64) -> Result<Duration> {
    let multiplier = match unit {
        "second" => 1,
        "minute" => 60,
        "hour" => 3600,
        "day" => 86400,
        "week" => 604800,
        _ => return Err(invalid("This time unit is not supported for the operation")),
    };
    amount
        .checked_mul(multiplier)
        .and_then(Duration::try_seconds)
        .ok_or_else(|| invalid("Time offset is out of range"))
}
fn add(time: DateTime<Tz>, unit: &str, amount: i64, overflow: &str) -> Result<DateTime<Tz>> {
    if ["month", "year"].contains(&unit) {
        let months = amount
            .checked_mul(if unit == "year" { 12 } else { 1 })
            .ok_or_else(|| invalid("Month offset is out of range"))?;
        let n = u32::try_from(months.unsigned_abs())
            .map_err(|_| invalid("Month offset is out of range"))?;
        let naive = if months >= 0 {
            time.naive_local().checked_add_months(Months::new(n))
        } else {
            time.naive_local().checked_sub_months(Months::new(n))
        }
        .ok_or_else(|| invalid("Date is out of range"))?;
        if overflow == "error" && naive.day() != time.day() {
            return Err(invalid(
                "Calendar operation exceeds the number of days in the target month",
            ));
        }
        return local(time.timezone(), naive);
    }
    let delta = duration(unit, amount)?;
    if ["day", "week"].contains(&unit) {
        return local(
            time.timezone(),
            time.naive_local()
                .checked_add_signed(delta)
                .ok_or_else(|| invalid("Date is out of range"))?,
        );
    }
    time.checked_add_signed(delta)
        .ok_or_else(|| invalid("Date is out of range"))
}
fn boundary(time: DateTime<Tz>, unit: &str) -> Result<DateTime<Tz>> {
    let naive = time.naive_local();
    let date = naive.date();
    let start = match unit {
        "year" => date
            .with_month(1)
            .and_then(|v| v.with_day(1))
            .and_then(|v| v.and_hms_opt(0, 0, 0)),
        "month" => date.with_day(1).and_then(|v| v.and_hms_opt(0, 0, 0)),
        "week" => date
            .checked_sub_signed(Duration::days(date.weekday().num_days_from_monday() as i64))
            .and_then(|v| v.and_hms_opt(0, 0, 0)),
        "day" => date.and_hms_opt(0, 0, 0),
        "hour" => date.and_hms_opt(naive.hour(), 0, 0),
        "minute" => date.and_hms_opt(naive.hour(), naive.minute(), 0),
        "second" => naive.with_nanosecond(0),
        _ => return Err(invalid("Unsupported date boundary unit")),
    }
    .ok_or_else(|| invalid("Date boundary is out of range"))?;
    local(time.timezone(), start)
}
fn datetime(input: &Value) -> Result<Value> {
    let timezone = string(input, "timezone")?
        .parse::<Tz>()
        .map_err(|_| invalid("Invalid IANA time zone"))?;
    let format = option(input, "format", "%Y-%m-%d %H:%M:%S");
    let time = parse(string(input, "value")?, format, timezone)?;
    let op = option(input, "operation", "parse");
    let unit = option(input, "unit", "second");
    if op == "format" {
        check_format(format)?;
        return Ok(json!({"value":time.format(format).to_string()}));
    }
    if op == "diff" {
        let end = parse(string(input, "end")?, format, timezone)?;
        let scale = match unit {
            "second" => 1000.0,
            "minute" => 60000.0,
            "hour" => 3600000.0,
            "day" => 86400000.0,
            "week" => 604800000.0,
            _ => {
                return Err(invalid(
                    "Date differences support seconds, minutes, hours, days, and weeks",
                ));
            }
        };
        let n = end.signed_duration_since(time).num_milliseconds() as f64 / scale;
        let value = match option(input, "rounding", "none") {
            "floor" => n.floor(),
            "ceil" => n.ceil(),
            "trunc" => n.trunc(),
            _ => n,
        };
        return Ok(json!({"value":finite(value)?}));
    }
    let result = match op {
        "add" => add(
            time,
            unit,
            input["amount"]
                .as_i64()
                .ok_or_else(|| invalid("Offset must be a signed integer"))?,
            option(input, "overflow", "clamp"),
        )?,
        "start" => boundary(time, unit)?,
        "end" => add(boundary(time, unit)?, unit, 1, "clamp")?
            .checked_sub_signed(Duration::milliseconds(1))
            .ok_or_else(|| invalid("Date is out of range"))?,
        _ => time,
    };
    Ok(json!({"value":result.to_rfc3339_opts(chrono::SecondsFormat::Millis,false)}))
}
