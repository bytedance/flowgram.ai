use super::{Resolved, Selection};
use crate::{
    error::{Error, Result},
    model::{Node, Workflow},
    store::Store,
};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use sqlx::SqlitePool;
use std::collections::BTreeMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Trace {
    pub model_id: String,
    pub model_name: String,
    pub upstream_model: String,
    pub connection_name: String,
    pub parameters: super::Parameters,
}
impl From<&Resolved> for Trace {
    fn from(c: &Resolved) -> Self {
        Self {
            model_id: c.model_id.clone(),
            model_name: c.model_name.clone(),
            upstream_model: c.upstream_model.clone(),
            connection_name: c.connection_name.clone(),
            parameters: c.parameters.clone(),
        }
    }
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Requirement {
    pub slot: String,
    pub tools: bool,
    pub workflow_id: String,
    pub node_id: String,
    pub parameters: super::Parameters,
}
pub fn requirements(workflows: &[Workflow]) -> Result<Vec<Requirement>> {
    fn walk(nodes: &[Node], workflow: &str, output: &mut Vec<Requirement>) -> Result<()> {
        for node in nodes {
            if matches!(node.kind.as_str(), "llm" | "agent") {
                let selection: Selection =
                    serde_json::from_value(node.data.get("model").cloned().unwrap_or(json!({})))?;
                output.push(Requirement {
                    slot: selection
                        .model_id
                        .unwrap_or_else(|| "workflow-default".into()),
                    tools: node.kind == "agent",
                    workflow_id: workflow.into(),
                    node_id: node.id.clone(),
                    parameters: selection.parameters,
                });
            }
            walk(&node.blocks, workflow, output)?;
        }
        Ok(())
    }
    let mut output = Vec::new();
    for w in workflows {
        let graph: crate::model::Graph = serde_json::from_value(w.schema.clone())?;
        walk(&graph.nodes, &w.id, &mut output)?;
    }
    Ok(output)
}
pub async fn initialize(db: &SqlitePool) -> Result<()> {
    for sql in [
        "CREATE TABLE IF NOT EXISTS session_models(session_id TEXT PRIMARY KEY REFERENCES sessions(id) ON DELETE CASCADE,selection TEXT NOT NULL)",
        "CREATE TABLE IF NOT EXISTS input_models(input_id TEXT PRIMARY KEY REFERENCES conversation_inputs(id) ON DELETE CASCADE,definition TEXT NOT NULL)",
        "CREATE TABLE IF NOT EXISTS turn_models(turn_id TEXT PRIMARY KEY REFERENCES conversation_turns(id) ON DELETE CASCADE,definition TEXT NOT NULL)",
        "CREATE TABLE IF NOT EXISTS run_models(run_id TEXT NOT NULL REFERENCES runs(id) ON DELETE CASCADE,workflow_id TEXT NOT NULL,node_id TEXT NOT NULL,definition TEXT NOT NULL,PRIMARY KEY(run_id,workflow_id,node_id))",
        "CREATE TABLE IF NOT EXISTS run_model_labels(run_id TEXT NOT NULL REFERENCES runs(id) ON DELETE CASCADE,workflow_id TEXT NOT NULL,node_id TEXT NOT NULL,label TEXT NOT NULL,PRIMARY KEY(run_id,workflow_id,node_id))",
        "CREATE TABLE IF NOT EXISTS service_models(service TEXT NOT NULL,environment TEXT NOT NULL,version TEXT NOT NULL,slot TEXT NOT NULL,definition TEXT NOT NULL,PRIMARY KEY(service,environment,version,slot))",
    ] {
        sqlx::query(sql).execute(db).await?;
    }
    Ok(())
}
impl Store {
    pub async fn session_model(&self, session: &str) -> Result<Selection> {
        let text: Option<String> =
            sqlx::query_scalar("SELECT selection FROM session_models WHERE session_id=?")
                .bind(session)
                .fetch_optional(&self.db)
                .await?;
        Ok(text
            .map(|v| serde_json::from_str(&v))
            .transpose()?
            .unwrap_or_default())
    }
    pub async fn input_model(&self, input: &str) -> Result<Resolved> {
        let text: Option<String> =
            sqlx::query_scalar("SELECT definition FROM input_models WHERE input_id=?")
                .bind(input)
                .fetch_optional(&self.db)
                .await?;
        serde_json::from_str(&text.ok_or_else(|| {
            Error::Invalid("Choose a model again before resuming imported inputs".into())
        })?)
        .map_err(Into::into)
    }
    pub async fn turn_model(&self, turn: &str) -> Result<Resolved> {
        let text: String = sqlx::query_scalar("SELECT definition FROM turn_models WHERE turn_id=?")
            .bind(turn)
            .fetch_one(&self.db)
            .await?;
        Ok(serde_json::from_str(&text)?)
    }
    pub async fn run_model(&self, run: &str, workflow: &str, node: &str) -> Result<Resolved> {
        let text: Option<String> = sqlx::query_scalar(
            "SELECT definition FROM run_models WHERE run_id=? AND workflow_id=? AND node_id=?",
        )
        .bind(run)
        .bind(workflow)
        .bind(node)
        .fetch_optional(&self.db)
        .await?;
        serde_json::from_str(
            &text.ok_or_else(|| {
                Error::Invalid("The run has no model binding for this node".into())
            })?,
        )
        .map_err(Into::into)
    }
    pub async fn run_model_traces(&self, run: &str) -> Result<Value> {
        use sqlx::Row;
        let rows = sqlx::query("SELECT workflow_id,node_id,label FROM run_model_labels WHERE run_id=? ORDER BY workflow_id,node_id").bind(run).fetch_all(&self.db).await?;
        let labels = rows.into_iter().map(|row| { let label: Trace=serde_json::from_str(row.get("label"))?; Ok(json!({"workflowId":row.get::<String,_>("workflow_id"),"nodeId":row.get::<String,_>("node_id"),"model":label})) }).collect::<Result<Vec<_>>>()?;
        Ok(json!(labels))
    }
    pub(crate) async fn pin_models(
        &self,
        tx: &mut sqlx::Transaction<'_, sqlx::Sqlite>,
        run: &str,
        workflows: &[Workflow],
        deployment: Option<&crate::services::Deployment>,
    ) -> Result<()> {
        let set = self.deployment_settings.model_set().await?;
        for requirement in requirements(workflows)? {
            let workflow = workflows
                .iter()
                .find(|w| w.id == requirement.workflow_id)
                .unwrap();
            let mut model = if let Some(deployment) = deployment {
                let text:Option<String>=sqlx::query_scalar("SELECT definition FROM service_models WHERE service=? AND environment=? AND version=? AND slot=?").bind(&deployment.service).bind(&deployment.environment).bind(&deployment.version).bind(&requirement.slot).fetch_optional(&mut **tx).await?;
                serde_json::from_str::<Resolved>(&text.ok_or_else(|| {
                    Error::Invalid(format!(
                        "Missing deployed model binding: {}",
                        requirement.slot
                    ))
                })?)?
            } else {
                self.deployment_settings
                    .resolve_in_set(
                        &set,
                        &Selection {
                            model_id: if requirement.slot == "workflow-default" {
                                None
                            } else {
                                Some(requirement.slot.clone())
                            },
                            parameters: Default::default(),
                        },
                        &workflow.project_id,
                        requirement.tools,
                        false,
                    )
                    .await?
            };
            if requirement.tools && model.capabilities.tools != Some(true) {
                return Err(Error::Invalid(
                    "An Agent node requires a model with tool calling support".into(),
                ));
            }
            model.parameters = model.parameters.merged(&requirement.parameters);
            model
                .parameters
                .validate(&model.capabilities, model.protocol)?;
            sqlx::query("INSERT INTO run_model_labels VALUES(?,?,?,?)")
                .bind(run)
                .bind(&requirement.workflow_id)
                .bind(&requirement.node_id)
                .bind(serde_json::to_string(&Trace::from(&model))?)
                .execute(&mut **tx)
                .await?;
            sqlx::query("INSERT INTO run_models VALUES(?,?,?,?)")
                .bind(run)
                .bind(&requirement.workflow_id)
                .bind(&requirement.node_id)
                .bind(serde_json::to_string(&model)?)
                .execute(&mut **tx)
                .await?;
        }
        Ok(())
    }
    pub(crate) async fn deployment_models(
        &self,
        release: &crate::services::Bundle,
        bindings: &BTreeMap<String, String>,
    ) -> Result<BTreeMap<String, Resolved>> {
        let mut output = BTreeMap::new();
        let set = self.deployment_settings.model_set().await?;
        for requirement in requirements(&release.workflows)? {
            let target = bindings.get(&requirement.slot).ok_or_else(|| {
                Error::Invalid(format!(
                    "Select a target model for slot: {}",
                    requirement.slot
                ))
            })?;
            let selection = Selection {
                model_id: Some(target.clone()),
                parameters: Default::default(),
            };
            let model = self
                .deployment_settings
                .resolve_in_set(
                    &set,
                    &selection,
                    &release.workflows[0].project_id,
                    requirement.tools,
                    false,
                )
                .await?;
            model
                .parameters
                .merged(&requirement.parameters)
                .validate(&model.capabilities, model.protocol)?;
            output.entry(requirement.slot).or_insert(model);
        }
        Ok(output)
    }
}
