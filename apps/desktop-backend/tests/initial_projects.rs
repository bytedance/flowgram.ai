use flowgram_desktop_backend::{
    project::{atomic_json, read_project},
    project_transfer::{export_project, import_project},
    registry::Registry,
    runtime,
};
use serde_json::{Value, json};

#[tokio::test]
async fn default_examples_are_english_throughout_projects_workflows_conversations_and_runs() {
    fn assert_english(text: &str, scope: &str) {
        assert!(
            !text.chars().any(|c| ('\u{3400}'..='\u{9fff}').contains(&c)),
            "Unexpected Chinese text in {scope}"
        );
    }
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    assert!(registry.initialize_projects("").await.unwrap());
    let projects = registry.projects().await;
    assert_eq!(projects.len(), 6);
    for project in projects {
        assert!(project.name.starts_with("Example · "));
        assert_english(&project.name, "project name");
        let store = registry.resolve(&project.id).await.unwrap();
        for workflow in store.workflows().await.unwrap() {
            assert_english(&workflow.name, "workflow name");
            assert_english(
                &workflow.schema.to_string(),
                "node titles, defaults and prompts",
            );
        }
        for session in store.sessions().await.unwrap() {
            assert_english(&session.title, "session title");
            let conversation = store.conversation(&session.id, None).await.unwrap();
            assert_english(&conversation.to_string(), "conversation and tool results");
            for item in conversation["items"].as_array().unwrap() {
                assert!(!item["content"].as_str().unwrap().contains('：'));
            }
        }
        for run in store.runs().await.unwrap() {
            assert_english(&serde_json::to_string(&run).unwrap(), "run record");
            let definition = store.run_definition(&run.id).await.unwrap().unwrap();
            assert_english(
                &serde_json::to_string(&definition).unwrap(),
                "historical canvas",
            );
        }
        let guide = tokio::fs::read_to_string(
            std::path::Path::new(&project.directory).join("assets/README.md"),
        )
        .await
        .unwrap();
        assert_english(&guide, "project guide");
        assert!(guide.contains("## Workflows and inputs"));
    }
}

#[tokio::test]
async fn initial_content_has_real_workflows_runs_and_consistent_editable_conversations() {
    let dir = tempfile::tempdir().unwrap();
    let model =
        json!({"baseUrl":"http://127.0.0.1:1","model":"not-called","apiKey":"keep-model-settings"});
    atomic_json(&dir.path().join("model.json"), &model)
        .await
        .unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    assert!(registry.initialize_projects("zh-Hans-CN").await.unwrap());
    assert!(!registry.initialize_projects("en").await.unwrap());
    let projects = registry.projects().await;
    assert_eq!(projects.len(), 6);
    let mut workflows_count = 0;
    let mut sessions_count = 0;
    let mut turns_count = 0;
    let mut runs_count = 0;
    let mut failed_count = 0;
    let mut canvas_nodes = 0;
    for project in &projects {
        assert!(project.name.starts_with("示例 · "));
        let store = registry.resolve(&project.id).await.unwrap();
        let workflows = store.workflows().await.unwrap();
        workflows_count += workflows.len();
        let sessions = store.sessions().await.unwrap();
        sessions_count += sessions.len();
        for workflow in &workflows {
            canvas_nodes += count_nodes(&workflow.schema);
            assert!(
                runtime::validate(&workflow.schema).unwrap().is_empty(),
                "{}",
                workflow.name
            );
            assert_eq!(workflow.project_id, project.id);
            assert!(
                workflow.schema["nodes"]
                    .as_array()
                    .unwrap()
                    .iter()
                    .all(|n| n["meta"]["position"]["x"].is_number())
            );
            for node in workflow.schema["nodes"].as_array().unwrap() {
                if node["type"] == "llm" {
                    assert!(
                        node["data"]["inputsValues"]["prompt"]["content"]
                            .as_str()
                            .unwrap()
                            .is_ascii()
                    );
                }
            }
        }
        for session in sessions {
            assert_eq!(session.status, "idle");
            let conversation = store.conversation(&session.id, None).await.unwrap();
            assert!(conversation["inputs"].as_array().unwrap().is_empty());
            let turns = conversation["turns"].as_array().unwrap();
            turns_count += turns.len();
            let items = conversation["items"].as_array().unwrap();
            for turn in turns {
                assert_eq!(turn["status"], "completed");
                assert_eq!(turn["origin"], "authored");
                assert!((45000..=240000).contains(&turn["estimatedDurationMs"].as_u64().unwrap()));
                assert!(turn["model"].is_null());
                assert!(
                    items
                        .iter()
                        .any(|i| i["id"] == turn["initiatingInputId"] && i["kind"] == "user")
                );
                assert!(
                    items
                        .iter()
                        .any(|i| i["id"] == turn["finalItemId"] && i["phase"] == "final")
                );
            }
            for item in items.iter().filter(|i| i["kind"] == "tool") {
                assert_eq!(item["status"], "completed");
                assert_eq!(item["payload"]["isError"], false);
                if item["payload"]["name"] == "read_run" {
                    let run = store
                        .run(item["payload"]["arguments"]["runId"].as_str().unwrap())
                        .await
                        .unwrap();
                    let expected = store
                        .tool(
                            &project.id,
                            Some(&session.id),
                            "read_run",
                            json!({"runId":run.id}),
                        )
                        .await
                        .unwrap();
                    assert_eq!(
                        item["payload"]["result"]["data"]["status"],
                        expected["data"]["status"]
                    );
                }
            }
            for id in store.session_references(&session.id).await.unwrap()["workflowIds"]
                .as_array()
                .unwrap()
            {
                assert!(workflows.iter().any(|w| w.id == id.as_str().unwrap()));
            }
        }
        for run in store.runs().await.unwrap() {
            runs_count += 1;
            if run.status == "failed" {
                failed_count += 1;
            } else {
                assert_eq!(run.status, "succeeded");
            }
            assert!(store.run_definition(&run.id).await.unwrap().is_some());
            assert!(
                store
                    .run_model_traces(&run.id)
                    .await
                    .unwrap()
                    .as_array()
                    .unwrap()
                    .is_empty()
            );
        }
        verify_business_outcomes(&store, &project.name).await;
        assert!(
            std::path::Path::new(&project.directory)
                .join("assets/README.md")
                .exists()
        );
        assert!(
            std::path::Path::new(&project.directory)
                .join("assets/sample-input.json")
                .exists()
        );
    }
    assert_eq!(
        (
            workflows_count,
            sessions_count,
            turns_count,
            runs_count,
            failed_count
        ),
        (18, 18, 24, 29, 6)
    );
    assert_eq!(canvas_nodes, 294);
    let actual: Value = serde_json::from_slice(
        &tokio::fs::read(dir.path().join("model.json"))
            .await
            .unwrap(),
    )
    .unwrap();
    assert_eq!(actual, model);
    let order = registry.resolve(&projects[0].id).await.unwrap();
    let batch = order
        .workflows()
        .await
        .unwrap()
        .into_iter()
        .find(|w| w.name.contains("批量订单"))
        .unwrap();
    let runs = order.runs().await.unwrap();
    let output = &runs
        .iter()
        .find(|r| r.workflow_id == batch.id)
        .unwrap()
        .outputs["result"];
    assert_eq!(output["duplicates"], 1);
    assert_eq!(output["results"].as_array().unwrap().len(), 3);
    assert!(
        output["errors"].as_array().unwrap().is_empty(),
        "Order fulfillment errors: {}",
        output["errors"]
    );
    assert_eq!(
        output["results"]
            .as_array()
            .unwrap()
            .iter()
            .map(|r| r["status"].as_str().unwrap())
            .collect::<Vec<_>>(),
        vec!["ready", "review", "backorder"]
    );
    let package = export_project(&order, true).await.unwrap();
    let imported = import_project(&registry, package, Some("Normal imported copy"), None)
        .await
        .unwrap();
    let copy = registry.resolve(&imported.id).await.unwrap();
    assert_eq!(copy.sessions().await.unwrap().len(), 3);
    for session in copy.sessions().await.unwrap() {
        let conversation = copy.conversation(&session.id, None).await.unwrap();
        for turn in conversation["turns"].as_array().unwrap() {
            assert_eq!(turn["origin"], "authored");
            assert!(turn["estimatedDurationMs"].as_u64().unwrap() >= 45000);
        }
    }
    assert_eq!(copy.runs().await.unwrap().len(), 5);
    let w = copy.workflows().await.unwrap().remove(0);
    copy.set_archived("workflow", &w.id, true).await.unwrap();
    copy.set_archived("workflow", &w.id, false).await.unwrap();
    registry
        .rename(&imported.id, "Renamed ordinary project", &imported.name)
        .await
        .unwrap();
    assert_eq!(
        read_project(std::path::Path::new(&imported.directory))
            .await
            .unwrap()
            .name,
        "Renamed ordinary project"
    );
}
#[tokio::test]
async fn initialization_is_language_scoped_atomic_and_does_not_refill_cleared_or_existing_workspaces()
 {
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    assert!(!dir.path().join("projects").exists());
    // A partially built, unpublished staging area is disposable on retry.
    tokio::fs::create_dir(dir.path().join(".flowgram-initializing"))
        .await
        .unwrap();
    tokio::fs::write(
        dir.path().join(".flowgram-initializing/partial"),
        "incomplete",
    )
    .await
    .unwrap();
    let (a, b) = tokio::join!(
        registry.initialize_projects("fr-FR"),
        registry.initialize_projects("en")
    );
    assert_ne!(a.unwrap(), b.unwrap());
    let projects = registry.projects().await;
    assert!(projects.iter().all(|p| p.name.starts_with("Example · ")));
    for p in projects {
        registry.delete_project(&p.id, &p.name).await.unwrap();
    }
    assert!(registry.projects().await.is_empty());
    assert!(!registry.initialize_projects("zh-CN").await.unwrap());
    drop(registry);
    let registry = Registry::open(dir.path()).await.unwrap();
    assert!(!registry.initialize_projects("en").await.unwrap());
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    let user = registry.create("User project", None).await.unwrap();
    assert!(!registry.initialize_projects("en").await.unwrap());
    assert_eq!(registry.projects().await[0].id, user.id);
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    tokio::fs::create_dir_all(dir.path().join("projects/unregistered"))
        .await
        .unwrap();
    assert!(!registry.initialize_projects("en").await.unwrap());
    assert!(registry.projects().await.is_empty());
}
#[tokio::test]
async fn completed_directory_move_is_recovered_without_recreating_content() {
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    registry.initialize_projects("en").await.unwrap();
    let original = registry.projects().await;
    let folders: Vec<_> = original
        .iter()
        .map(|p| {
            std::path::Path::new(&p.directory)
                .file_name()
                .unwrap()
                .to_str()
                .unwrap()
                .to_owned()
        })
        .collect();
    atomic_json(
        &dir.path().join("projects/.initial-projects-ready.json"),
        &folders,
    )
    .await
    .unwrap();
    tokio::fs::remove_file(dir.path().join("projects.json"))
        .await
        .unwrap();
    drop(registry);
    let registry = Registry::open(dir.path()).await.unwrap();
    assert!(registry.initialize_projects("zh-CN").await.unwrap());
    assert_eq!(
        serde_json::to_value(registry.projects().await).unwrap(),
        serde_json::to_value(original).unwrap()
    );
    assert!(
        !dir.path()
            .join("projects/.initial-projects-ready.json")
            .exists()
    );
}

#[tokio::test]
async fn every_offline_example_can_be_rerun_through_normal_runtime_with_its_visible_defaults() {
    let dir = tempfile::tempdir().unwrap();
    let registry = Registry::open(dir.path()).await.unwrap();
    registry.initialize_projects("en").await.unwrap();
    let mut count = 0;
    for project in registry.projects().await {
        let store = registry.resolve(&project.id).await.unwrap();
        for workflow in store.workflows().await.unwrap() {
            if needs_model(&workflow.schema) {
                continue;
            }
            let start = workflow.schema["nodes"]
                .as_array()
                .unwrap()
                .iter()
                .find(|n| n["type"] == "start")
                .unwrap();
            let inputs: serde_json::Map<String, Value> = start["data"]["outputs"]["properties"]
                .as_object()
                .unwrap()
                .iter()
                .map(|(key, spec)| (key.clone(), spec["default"].clone()))
                .collect();
            let run = store
                .start_run(&workflow.id, None, Value::Object(inputs))
                .await
                .unwrap();
            let result = tokio::time::timeout(std::time::Duration::from_secs(5), async {
                loop {
                    let current = store.run(&run.id).await.unwrap();
                    if current.status != "running" {
                        break current;
                    }
                    tokio::time::sleep(std::time::Duration::from_millis(5)).await;
                }
            })
            .await
            .unwrap();
            assert_eq!(
                result.status, "succeeded",
                "{}: {:?}",
                workflow.name, result.error
            );
            count += 1;
        }
    }
    assert_eq!(count, 11);
}

fn needs_model(schema: &Value) -> bool {
    schema["nodes"].as_array().into_iter().flatten().any(|n| {
        matches!(n["type"].as_str(), Some("llm" | "agent"))
            || needs_model(&json!({"nodes":n["blocks"]}))
    })
}

fn count_nodes(schema: &Value) -> usize {
    schema["nodes"]
        .as_array()
        .into_iter()
        .flatten()
        .map(|n| 1 + count_nodes(&json!({"nodes":n["blocks"]})))
        .sum()
}

async fn verify_business_outcomes(store: &flowgram_desktop_backend::store::Store, name: &str) {
    let runs = store.runs().await.unwrap();
    let workflows = store.workflows().await.unwrap();
    let results = |name: &str| {
        let id = &workflows.iter().find(|w| w.name.contains(name)).unwrap().id;
        runs.iter()
            .filter(|r| &r.workflow_id == id && r.status == "succeeded")
            .collect::<Vec<_>>()
    };
    if name.contains("采购") {
        let output = &results("批量对账")
            .into_iter()
            .find(|r| r.inputs["invoices"].as_array().unwrap().len() == 6)
            .unwrap()
            .outputs;
        let mut statuses = output["results"]
            .as_array()
            .unwrap()
            .iter()
            .map(|r| r["status"].as_str().unwrap())
            .collect::<Vec<_>>();
        statuses.sort();
        assert_eq!(
            statuses,
            [
                "amount-mismatch",
                "currency-mismatch",
                "matched",
                "missing-po",
                "short-receipt"
            ]
        );
        assert_eq!(output["duplicates"], 1);
        assert!(output["errors"].as_array().unwrap().is_empty());
        let currencies = output["summary"]
            .as_array()
            .unwrap()
            .iter()
            .map(|r| r["key"]["currency"].as_str().unwrap())
            .collect::<std::collections::HashSet<_>>();
        assert_eq!(currencies.len(), 2);
    } else if name.contains("客户支持") {
        let cases = results("分类与敏感");
        let sensitive = cases
            .iter()
            .find(|r| r.inputs["ticket"]["sensitive"] == true)
            .unwrap();
        assert_eq!(sensitive.outputs["result"]["queue"], "human");
        let output = &results("工单趋势")[0].outputs;
        assert_eq!(output["duplicates"], 1);
        assert_eq!(output["summary"].as_array().unwrap().len(), 3);
    } else if name.contains("媒体") {
        let output = &results("质量与审核包")[0].outputs;
        assert_eq!(output["results"].as_array().unwrap().len(), 2);
        assert!(
            output["results"]
                .as_array()
                .unwrap()
                .iter()
                .all(|r| r["status"] == "ready-for-review")
        );
        assert_eq!(
            results("清理素材")[0].outputs["result"]["digest"]
                .as_str()
                .unwrap()
                .len(),
            64
        );
    } else if name.contains("运维") {
        let cases = results("告警聚合");
        let critical = cases
            .iter()
            .find(|r| r.inputs["severity"] == "critical")
            .unwrap();
        assert_eq!(critical.outputs["result"]["duplicates"], 1);
        assert_eq!(
            critical.outputs["result"]["services"][0]["occurrences"],
            25.0
        );
        let warning = cases
            .iter()
            .find(|r| r.inputs["severity"] == "warning")
            .unwrap();
        assert_eq!(
            warning.outputs["result"]["services"][0]["key"]["service"],
            "inventory"
        );
    } else if name.contains("教育") {
        let output = &results("班级学习周报")[0].outputs;
        assert_eq!(output["evidence"]["scores"][0]["averageScore"], 72.0);
        assert_eq!(output["evidence"]["scores"][0]["submitted"], 2);
        assert_eq!(output["evidence"]["missing"].as_array().unwrap().len(), 1);
    }
}

#[test]
fn financial_reports_render_minor_units_and_exclude_money_from_model_context() {
    use flowgram_desktop_backend::{model::Node, nodes};
    let catalog: Value =
        serde_json::from_str(include_str!("../catalog/examples/commerce.json")).unwrap();
    let report = catalog["workflows"]
        .as_array()
        .unwrap()
        .iter()
        .find(|w| w["key"] == "order-report")
        .unwrap();
    let find = |id: &str| -> Node {
        serde_json::from_value(
            report["schema"]["nodes"]
                .as_array()
                .unwrap()
                .iter()
                .find(|n| n["id"] == id)
                .unwrap()
                .clone(),
        )
        .unwrap()
    };
    let rows = json!([
        {"key":{"currency":"CNY","status":"ready"},"count":1,"amountMinor":25800},
        {"key":{"currency":"USD","status":"review"},"count":2,"amountMinor":150000}
    ]);
    let node = find("report");
    let rendered = nodes::execute(&node,json!({"template":node.data["inputsValues"]["template"]["content"],"variables":{"rows":rows},"format":"text"}),&std::collections::HashMap::new()).unwrap();
    let text = rendered["text"].as_str().unwrap();
    assert!(text.contains("25800 minor units (CNY)"));
    assert!(text.contains("150000 minor units (USD)"));
    assert!(!text.contains("258.00"));
    let facts = nodes::execute(
        &find("model_facts"),
        json!({"items":rows}),
        &std::collections::HashMap::new(),
    )
    .unwrap();
    assert_eq!(
        facts["items"],
        json!([
            {"dimensions":{"currency":"CNY","status":"ready"},"count":1},
            {"dimensions":{"currency":"USD","status":"review"},"count":2}
        ])
    );
}
