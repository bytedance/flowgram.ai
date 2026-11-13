//! Immutable, project-scoped workflow dependencies captured before execution.
use crate::{
    error::{Error, Result},
    model::{Graph, Node, Workflow},
    runtime,
    store::Store,
};
use serde_json::{Value, json};
use sha2::{Digest, Sha256};
use std::collections::{HashMap, HashSet};

fn targets(nodes: &[Node], output: &mut Vec<String>) -> Result<()> {
    for node in nodes {
        if node.kind == "subworkflow" {
            let binding = &node.data["inputsValues"]["workflowId"];
            let target = if binding["type"] == "constant" {
                binding["content"].as_str()
            } else {
                binding.as_str()
            };
            output.push(target.filter(|id| !id.is_empty()).ok_or_else(|| Error::Invalid(format!(
                "Subworkflow node {} must use a constant workflowId so dependencies can be pinned before execution", node.id
            )))?.to_owned());
        }
        targets(&node.blocks, output)?;
    }
    Ok(())
}
impl Store {
    pub(crate) async fn capture_workflows(&self, root: &Workflow) -> Result<Vec<Workflow>> {
        let mut pinned = HashMap::from([(root.id.clone(), root.clone())]);
        let mut checked = HashSet::new();
        let mut stack = vec![(root.id.clone(), Vec::<String>::new())];
        let mut bytes = 0;
        while let Some((id, ancestors)) = stack.pop() {
            if ancestors.contains(&id) {
                return Err(Error::Invalid(
                    "Recursive workflow dependencies are not supported".into(),
                ));
            }
            if ancestors.len() > 16 || pinned.len() > 128 {
                return Err(Error::Invalid(
                    "Workflow dependencies exceed the 16-level / 128-workflow limit".into(),
                ));
            }
            if !checked.insert(id.clone()) {
                continue;
            }
            if checked.len() > 128 {
                return Err(Error::Invalid(
                    "Workflow dependency snapshot exceeds 128 workflows".into(),
                ));
            }
            let workflow = match pinned.get(&id) {
                Some(w) => w.clone(),
                None => self.workflow(&id).await?,
            };
            if workflow.project_id != root.project_id {
                return Err(Error::Invalid(
                    "Workflow dependencies must belong to the same project".into(),
                ));
            }
            if id != root.id {
                let errors = runtime::validate(&workflow.schema)?;
                if !errors.is_empty() {
                    return Err(Error::Invalid(format!(
                        "Invalid dependency {}: {}",
                        workflow.name,
                        errors.join("; ")
                    )));
                }
            }
            bytes += serde_json::to_vec(&workflow.schema)?.len();
            if bytes > 8_000_000 {
                return Err(Error::Invalid(
                    "Workflow dependency snapshot exceeded 8 MB".into(),
                ));
            }
            let graph: Graph = serde_json::from_value(workflow.schema.clone())?;
            let mut calls = vec![];
            targets(&graph.nodes, &mut calls)?;
            let mut path = ancestors;
            path.push(id.clone());
            for target in calls {
                stack.push((target, path.clone()));
            }
            pinned.insert(id, workflow);
        }
        let mut result: Vec<_> = pinned.into_values().collect();
        result.sort_by(|a, b| a.id.cmp(&b.id));
        Ok(result)
    }
    pub(crate) async fn pinned_workflow(&self, run: &str, workflow: &str) -> Result<Workflow> {
        let text: Option<String> = sqlx::query_scalar(
            "SELECT definition FROM run_workflows WHERE run_id=? AND workflow_id=?",
        )
        .bind(run)
        .bind(workflow)
        .fetch_optional(&self.db)
        .await?;
        serde_json::from_str(&text.ok_or_else(|| {
            Error::Invalid("The requested workflow is not in this run's dependency snapshot".into())
        })?)
        .map_err(Into::into)
    }
    pub async fn run_manifest(&self, run: &str) -> Result<Value> {
        let definitions: Vec<String> = sqlx::query_scalar(
            "SELECT definition FROM run_workflows WHERE run_id=? ORDER BY workflow_id",
        )
        .bind(run)
        .fetch_all(&self.db)
        .await?;
        let mut entries = vec![];
        for text in definitions {
            let workflow: Workflow = serde_json::from_str(&text)?;
            let hash = hex::encode(Sha256::digest(serde_json::to_vec(&workflow.schema)?));
            entries.push(json!({"workflowId":workflow.id,"name":workflow.name,"revision":workflow.revision,"schemaHash":hash}));
        }
        Ok(json!({"workflows":entries}))
    }
}
pub(crate) async fn persist(
    tx: &mut sqlx::Transaction<'_, sqlx::Sqlite>,
    run: &str,
    workflows: &[Workflow],
) -> Result<()> {
    for workflow in workflows {
        sqlx::query("INSERT INTO run_workflows VALUES(?,?,?)")
            .bind(run)
            .bind(&workflow.id)
            .bind(serde_json::to_string(workflow)?)
            .execute(&mut **tx)
            .await?;
    }
    Ok(())
}

impl crate::store::Store {
    /// Shared execution inspector used by the workspace and published-runtime management.
    pub async fn inspect_run(
        &self,
        id: &str,
        after: i64,
        workflow: Option<&str>,
    ) -> crate::error::Result<serde_json::Value> {
        let run = self.run(id).await?;
        let events = self.run_history(id, after, workflow).await?;
        let next = if events.len() == 500 {
            events.last().map(|e| e.sequence)
        } else {
            None
        };
        let states = self
            .run_node_states(id, workflow.unwrap_or(&run.workflow_id))
            .await?;
        Ok(
            serde_json::json!({"models":self.run_model_traces(id).await?,"run":run,"events":events,"nextAfter":next,"nodeStates":states,"nodeTest":self.node_test_definition(id).await?,"schema":self.run_definition(id).await?,"manifest":self.run_manifest(id).await?}),
        )
    }
}
