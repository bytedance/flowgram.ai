//! Six authored business projects. Every graph and tool uses the ordinary public runtime.
use super::history::Walkthrough;
use crate::{
    error::{Error, Result},
    store::Store,
};
use serde::Deserialize;
use serde_json::{Value, json};
use std::collections::HashMap;

#[derive(Clone, Deserialize)]
pub(super) struct Copy {
    en: String,
    #[serde(rename = "zh-CN")]
    zh: String,
}
impl Copy {
    fn get(&self, chinese: bool) -> &str {
        if chinese { &self.zh } else { &self.en }
    }
}
#[derive(Deserialize)]
struct Workflow {
    key: String,
    name: Copy,
    input: Value,
    schema: Value,
}
#[derive(Deserialize)]
struct Case {
    workflow: String,
    input: Value,
    status: String,
    label: Copy,
}
#[derive(Deserialize)]
struct Change {
    workflow: String,
    pointer: String,
    value: Value,
    input: Value,
}
#[derive(Deserialize)]
struct DurationEstimates {
    build: u64,
    change: u64,
    debug: [u64; 2],
}
#[derive(Deserialize)]
pub(super) struct Scenario {
    pub name: Copy,
    key: String,
    workflows: Vec<Workflow>,
    cases: Vec<Case>,
    change: Change,
    focus: Copy,
    walkthrough: HashMap<String, Copy>,
    #[serde(rename = "durationEstimatesMs")]
    duration_estimates: DurationEstimates,
    translations: HashMap<String, String>,
    #[serde(skip)]
    chinese: bool,
}
impl Scenario {
    pub fn name(&self) -> &str {
        self.name.get(self.chinese)
    }
}
pub(super) fn scenarios(locale: &str) -> Vec<Scenario> {
    [
        include_str!("../../catalog/examples/commerce.json"),
        include_str!("../../catalog/examples/procurement.json"),
        include_str!("../../catalog/examples/support.json"),
        include_str!("../../catalog/examples/media.json"),
        include_str!("../../catalog/examples/operations.json"),
        include_str!("../../catalog/examples/education.json"),
    ]
    .into_iter()
    .map(|source| {
        let mut scenario: Scenario =
            serde_json::from_str(source).expect("validated initial project catalog");
        scenario.chinese = locale == "zh-CN";
        scenario
    })
    .collect()
}
fn localize(schema: &mut Value, translations: &HashMap<String, String>) {
    if let Some(nodes) = schema["nodes"].as_array_mut() {
        for node in nodes {
            if let Some(translated) = node["data"]["title"]
                .as_str()
                .and_then(|s| translations.get(s))
            {
                node["data"]["title"] = json!(translated);
            }
            if let Some(branches) = node["data"]["branches"].as_array_mut() {
                for branch in branches {
                    if let Some(translated) =
                        branch["label"].as_str().and_then(|s| translations.get(s))
                    {
                        branch["label"] = json!(translated);
                    }
                }
            }
            if node.get("blocks").is_some() {
                let mut body = json!({"nodes":node["blocks"].take()});
                localize(&mut body, translations);
                node["blocks"] = body["nodes"].take();
            }
        }
    }
}
fn references(value: &mut Value, identities: &HashMap<String, String>) -> Result<()> {
    match value {
        Value::String(s) => {
            if let Some(key) = s.strip_prefix("$workflow:") {
                *s = identities.get(key).cloned().ok_or_else(|| {
                    Error::Invalid(format!("Missing example workflow dependency: {key}"))
                })?;
            }
        }
        Value::Array(values) => {
            for v in values {
                references(v, identities)?;
            }
        }
        Value::Object(fields) => {
            for v in fields.values_mut() {
                references(v, identities)?;
            }
        }
        _ => {}
    }
    Ok(())
}
fn count_nodes(schema: &Value) -> usize {
    schema["nodes"]
        .as_array()
        .into_iter()
        .flatten()
        .map(|node| 1 + count_nodes(&json!({"nodes":node["blocks"]})))
        .sum()
}
fn requires_model(schema: &Value) -> bool {
    schema["nodes"]
        .as_array()
        .into_iter()
        .flatten()
        .any(|node| {
            matches!(node["type"].as_str(), Some("llm" | "agent"))
                || requires_model(&json!({"nodes":node["blocks"]}))
        })
}
fn check_run(result: &Value, expected: &str) -> Result<()> {
    if result["run"]["status"] != expected {
        return Err(Error::Execution(format!(
            "Initial example expected {expected}, received {}: {}",
            result["run"]["status"], result["run"]["error"]
        )));
    }
    Ok(())
}
fn text(chinese: bool, zh: &str, en: &str) -> String {
    if chinese { zh } else { en }.into()
}

pub(super) async fn populate(store: &Store, project: &str, scenario: Scenario) -> Result<()> {
    let zh = scenario.chinese;
    let build = store
        .create_session(project, scenario.walkthrough["buildTitle"].get(zh))
        .await?;
    let turn = Walkthrough::begin(
        store,
        project,
        &build.id,
        scenario.walkthrough["buildPrompt"].get(zh).to_owned(),
        None,
        scenario.duration_estimates.build,
    )
    .await?;
    let mut identities = HashMap::new();
    let mut schemas = HashMap::new();
    let mut node_count = 0;
    for blueprint in &scenario.workflows {
        let mut schema = blueprint.schema.clone();
        references(&mut schema, &identities)?;
        if zh {
            localize(&mut schema, &scenario.translations);
        }
        node_count += count_nodes(&schema);
        let created = turn.create_graph(blueprint.name.get(zh), &schema).await?;
        let id = created["context"]["workflowId"]
            .as_str()
            .ok_or_else(|| Error::Execution("Initial workflow has no identity".into()))?
            .to_string();
        let valid = turn
            .call("validate_workflow", json!({"workflowId":id}))
            .await?;
        // Model-dependent examples are ordinary drafts until the user configures
        // a model. Preserve their honest diagnostics; never hide graph/config errors.
        let model_setup_only = requires_model(&schema)
            && valid["data"]["hasMore"] == false
            && valid["data"]["items"].as_array().is_some_and(|items| {
                !items.is_empty()
                    && Some(items.len() as u64) == valid["data"]["fullErrorCount"].as_u64()
                    && items.iter().all(|item| item["code"] == "MODEL_UNAVAILABLE")
            });
        if valid["data"]["executable"] != true && !model_setup_only {
            return Err(Error::Execution(format!(
                "Invalid initial workflow {}: {}",
                blueprint.key, valid["data"]["items"]
            )));
        }
        identities.insert(blueprint.key.clone(), id);
        schemas.insert(blueprint.key.clone(), schema);
    }
    let main = &scenario.cases[0];
    let result = turn
        .run(&identities[&main.workflow], main.input.clone())
        .await?;
    check_run(&result, &main.status)?;
    for blueprint in &scenario.workflows {
        if blueprint.key == main.workflow || requires_model(&blueprint.schema) {
            continue;
        }
        let result = turn
            .run(&identities[&blueprint.key], blueprint.input.clone())
            .await?;
        check_run(&result, "succeeded")?;
    }
    turn.finish(format!("{}\n\n{}\n\n{}\n\n{}",
        text(zh,&format!("三个工作流已创建，规则流程已通过实际运行，共 {node_count} 个画布节点。"),&format!("Three workflows were created, and rule-based flows executed successfully, with {node_count} canvas nodes.")),
        scenario.walkthrough["buildResult"].get(zh),
        scenario.focus.get(zh),
        text(zh,"本会话是预置讲解，工具结果和运行记录来自实际执行。AI 流程需要在设置中配置模型，初始化没有调用模型或执行外部业务写入。可打开运行详情查看当时画布、子流程及节点输入输出。","This is an authored walkthrough; tool results and run records come from actual execution. AI workflows require a configured model. Initialization made no model calls or external business writes. Run details preserve the executed canvas, child workflows and node data."))).await?;

    let changes = store
        .create_session(project, scenario.walkthrough["changeTitle"].get(zh))
        .await?;
    let change = &scenario.change;
    let id = &identities[&change.workflow];
    let turn = Walkthrough::begin(
        store,
        project,
        &changes.id,
        scenario.walkthrough["changePrompt"].get(zh).to_owned(),
        Some(id),
        scenario.duration_estimates.change,
    )
    .await?;
    turn.call("read_workflow", json!({"workflowId":id})).await?;
    let graph = &schemas[&change.workflow];
    let tokens: Vec<_> = change.pointer.split('/').collect();
    let index = tokens
        .get(2)
        .and_then(|s| s.parse::<usize>().ok())
        .ok_or_else(|| Error::Invalid("Example changes require a node data field".into()))?;
    let node_id = graph["nodes"][index]["id"]
        .as_str()
        .ok_or_else(|| Error::Invalid("Example change node not found".into()))?;
    let path = format!("/{}", tokens[4..].join("/"));
    turn.call("edit_workflow",json!({"workflowId":id,"expectedRevision":store.workflow(id).await?.revision,"mutationId":crate::store::id(),"operations":[{"op":"update_node","nodeId":node_id,"set":{path:change.value}}]})).await?;
    let valid = turn
        .call("validate_workflow", json!({"workflowId":id}))
        .await?;
    if valid["data"]["executable"] != true {
        return Err(Error::Execution(
            "Changed initial workflow is invalid".into(),
        ));
    }
    let result = turn.run(id, change.input.clone()).await?;
    check_run(&result, "succeeded")?;
    turn.finish(text(zh,"已保存新版本并实际运行。已有运行保留旧版本定义，新运行使用修改后的默认值；可以比较两次运行的输入、业务分支和节点输出。名称、节点 ID 和子流程引用保持稳定。","A new revision was saved and executed. Existing runs retain the previous definition, while new runs use the changed defaults. Compare inputs, business branches and node outputs. Names, node IDs and child-workflow references remain stable.")).await?;

    let debug = store
        .create_session(project, scenario.walkthrough["debugTitle"].get(zh))
        .await?;
    for (index, case) in scenario.cases[2..4].iter().enumerate() {
        let id = &identities[&case.workflow];
        let turn = Walkthrough::begin(
            store,
            project,
            &debug.id,
            format!(
                "{}{}{}",
                text(
                    zh,
                    if index == 0 {
                        "定位这次失败"
                    } else {
                        "修正后重新运行"
                    },
                    if index == 0 {
                        "Locate this failure"
                    } else {
                        "Rerun corrected input"
                    }
                ),
                if zh { "：" } else { ": " },
                case.label.get(zh)
            ),
            Some(id),
            scenario.duration_estimates.debug[index],
        )
        .await?;
        turn.call("read_workflow", json!({"workflowId":id})).await?;
        let result = turn.run(id, case.input.clone()).await?;
        check_run(&result, &case.status)?;
        let message = if index == 0 {
            format!(
                "{}\n\n{}",
                text(
                    zh,
                    "这次执行真实失败，运行详情保留失败节点、调用路径和输入输出。",
                    "This execution actually failed; run details retain the failed node, call path and node data."
                ),
                result["run"]["error"]
                    .as_str()
                    .unwrap_or("See node diagnostics")
            )
        } else {
            text(
                zh,
                "修正输入后的独立运行已成功。此前失败记录仍保留，可通过历史画布对比。没有删除失败记录，也没有自动重放外部写入。",
                "The independent run with corrected input succeeded. The earlier failure remains available for comparison through its historical canvas. No failure was removed and no external write was replayed.",
            )
        };
        turn.finish(message).await?;
    }
    let mut guide = format!(
        "# {}\n\n{}\n\n{}\n\n{}\n\n",
        scenario.name(),
        scenario.walkthrough["buildResult"].get(zh),
        scenario.focus.get(zh),
        text(
            zh,
            "这是普通、可编辑、可导出的项目。会话为预置讲解，工具调用与运行快照均由真实运行时生成。",
            "This is an ordinary editable and exportable project. Conversations are authored walkthroughs; tool calls and execution snapshots are generated by the real runtime."
        )
    );
    guide.push_str(&text(
        zh,
        "## 工作流与输入\n\n",
        "## Workflows and inputs\n\n",
    ));
    for workflow in &scenario.workflows {
        let file = format!("{}-input.json", workflow.key);
        guide.push_str(&format!(
            "- {}: `{file}` · {} {}\n",
            workflow.name.get(zh),
            count_nodes(&workflow.schema),
            text(zh, "节点", "nodes")
        ));
        tokio::fs::write(
            store.project_root.join("assets").join(file),
            serde_json::to_vec_pretty(&workflow.input)?,
        )
        .await?;
    }
    guide.push_str(&text(zh,"\n## 模型与外部接口\n\n规则流程可使用默认输入离线执行。包含模型或 Agent 节点的流程需要设置中已配置的模型，运行后产生实际调用、用量与错误记录；没有离线模拟回复。运维流程 source=http 时访问 endpoint，支持有界 HTTP 重试；默认 source=provided 使用输入快照。\n\n示例不执行付款、退款、库存扣减、消息发送、基础设施修改或持久化审批等待。对应结果是计划、草稿或待人工处理事项。\n","\n## Models and external endpoints\n\nRule-based workflows run offline with their defaults. Workflows containing model or Agent nodes require the configured model and capture actual requests, usage and failures. No model reply is simulated. The operations workflow reads endpoint with bounded HTTP retries when source=http; source=provided uses a supplied snapshot by default.\n\nExamples produce plans, drafts and human follow-up tasks. They do not execute payments, refunds, stock deductions, messages, infrastructure mutations or durable approval waits.\n"));
    tokio::fs::write(store.project_root.join("assets/README.md"), guide).await?;
    tokio::fs::write(
        store.project_root.join("assets/sample-input.json"),
        serde_json::to_vec_pretty(&main.input)?,
    )
    .await?;
    tokio::fs::write(store.project_root.join("assets/scenario.json"),serde_json::to_vec_pretty(&json!({"key":scenario.key,"workflows":identities,"canvasNodes":node_count,"authoredWalkthrough":true,"initialModelCalls":0}))?).await?;
    Ok(())
}
