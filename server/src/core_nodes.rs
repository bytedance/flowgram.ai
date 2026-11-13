//! Discoverable core-node contracts; execution remains in the standalone runtime.
use serde_json::Value;
use std::sync::LazyLock;
pub static CATALOG: LazyLock<Vec<Value>> = LazyLock::new(|| {
    serde_json::from_str(include_str!("../catalog/core-nodes.json")).expect("core node catalog")
});
pub fn definition(kind: &str) -> Option<&'static Value> {
    CATALOG.iter().find(|node| node["type"] == kind)
}
