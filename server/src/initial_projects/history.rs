use crate::{
    conversation::{ConversationInput, ConversationItem, Turn, TurnOrigin, display_payload},
    error::{Error, Result},
    store::{Store, id, now},
};
use serde_json::{Value, json};

/// Authored walkthrough text uses the same transcript model as normal conversations.
/// Tools and runs are executed, never fabricated or replayed by a model during setup.
pub(super) struct Walkthrough<'a> {
    store: &'a Store,
    project: &'a str,
    turn: Turn,
}
impl<'a> Walkthrough<'a> {
    pub async fn begin(
        store: &'a Store,
        project: &'a str,
        session: &str,
        text: String,
        workflow: Option<&str>,
        estimated_duration_ms: u64,
    ) -> Result<Self> {
        let input_id = id();
        let mut turn = Turn {
            id: id(),
            session_id: session.into(),
            initiating_input_id: input_id.clone(),
            status: "running".into(),
            phase: "tool".into(),
            revision: 1,
            ordinal: 0,
            started_at: now(),
            ended_at: None,
            final_item_id: None,
            origin: TurnOrigin::Authored,
            estimated_duration_ms: Some(estimated_duration_ms),
            model: None,
            error: None,
        };
        let input = ConversationInput {
            id: input_id.clone(),
            client_input_id: id(),
            session_id: session.into(),
            content: text.clone(),
            model: None,
            references: workflow
                .map(|w| json!({"workflowId":w}))
                .unwrap_or(Value::Null),
            delivery_mode: "queue".into(),
            turn_id: Some(turn.id.clone()),
            status: "accepted".into(),
            revision: 1,
            created_at: now(),
            error: None,
        };
        let user = ConversationItem {
            id: input_id,
            session_id: session.into(),
            turn_id: turn.id.clone(),
            ordinal: 1,
            kind: "user".into(),
            status: "completed".into(),
            phase: "input".into(),
            content: text,
            payload: json!({"references":input.references,"deliveryMode":"queue"}),
            revision: 1,
            created_at: now(),
            updated_at: now(),
        };
        let mut tx = store.db.begin().await?;
        turn.ordinal=sqlx::query_scalar("INSERT INTO conversation_turns(id,session_id,status,data) VALUES(?,?,'running',?) RETURNING ordinal").bind(&turn.id).bind(session).bind(serde_json::to_string(&turn)?).fetch_one(&mut *tx).await?;
        sqlx::query("UPDATE conversation_turns SET data=? WHERE id=?")
            .bind(serde_json::to_string(&turn)?)
            .bind(&turn.id)
            .execute(&mut *tx)
            .await?;
        sqlx::query("INSERT INTO conversation_inputs(id,session_id,client_input_id,status,turn_id,delivery_mode,data) VALUES(?,?,?,'accepted',?,'queue',?)").bind(&input.id).bind(session).bind(&input.client_input_id).bind(&turn.id).bind(serde_json::to_string(&input)?).execute(&mut *tx).await?;
        sqlx::query("INSERT INTO conversation_items VALUES(?,?,1,?)")
            .bind(&user.id)
            .bind(&turn.id)
            .bind(serde_json::to_string(&user)?)
            .execute(&mut *tx)
            .await?;
        tx.commit().await?;
        Ok(Self {
            store,
            project,
            turn,
        })
    }
    pub async fn call(&self, name: &str, arguments: Value) -> Result<Value> {
        let mut item = self.store.new_item(&self.turn.id, "tool").await?;
        item.status = "running".into();
        item.payload = json!({"name":name,"arguments":display_payload(&arguments),"callId":id(),"attempt":1,"startedAt":now()});
        self.store.put_item(&mut item).await?;
        let result = self
            .store
            .tool(self.project, Some(&self.turn.session_id), name, arguments)
            .await?;
        if name == "run_workflow" {
            self.store
                .link_turn_run(
                    &self.turn.id,
                    result["data"]["runId"].as_str().ok_or_else(|| {
                        Error::Execution("Initial run did not return an identity".into())
                    })?,
                )
                .await?;
        }
        item.status = "completed".into();
        item.payload["result"] = display_payload(&result);
        item.payload["isError"] = json!(false);
        item.payload["endedAt"] = json!(now());
        self.store.put_item(&mut item).await?;
        Ok(result)
    }
    pub async fn create_graph(&self, name: &str, schema: &Value) -> Result<Value> {
        use crate::workflow_edit::graph::{Document, catalog, text};
        let created = self
            .call("create_workflow", json!({"name":name,"mutationId":id()}))
            .await?;
        let workflow = created["context"]["workflowId"].as_str().unwrap();
        let w = self.store.workflow(workflow).await?;
        let mut candidate = Document::read(name, &w.schema)?;
        let source = Document::read(name, schema)?;
        let mut operations = Vec::new();
        fn apply(candidate: &mut Document, operations: &mut Vec<Value>, op: Value) -> Result<()> {
            candidate.apply(&op)?;
            operations.push(op);
            Ok(())
        }
        fn build(
            scope: &str,
            source: &Document,
            candidate: &mut Document,
            operations: &mut Vec<Value>,
        ) -> Result<()> {
            let ids = source.ids(scope);
            for key in &ids {
                let node = source.node(key)?;
                let kind = text(node, "type")?;
                if matches!(kind, "start" | "end" | "block-start" | "block-end")
                    || crate::control::is_join(kind)
                {
                    continue;
                }
                let mut op = json!({"op":"add_node","nodeId":key,"nodeType":kind,"scopeId":scope});
                if crate::control::is_loop(kind) {
                    let children = source.ids(key);
                    op["boundaryIds"] = json!({"entry":children.iter().find(|id|source.node(id).unwrap()["type"]=="block-start").unwrap(),"exit":children.iter().find(|id|source.node(id).unwrap()["type"]=="block-end").unwrap()});
                }
                if crate::control::is_fork(kind) {
                    op["joinId"] = node["data"]["joinId"].clone();
                }
                apply(candidate, operations, op)?;
                if crate::control::is_fork(kind) {
                    for branch in catalog(kind)?["defaults"]["branches"].as_array().unwrap() {
                        apply(
                            candidate,
                            operations,
                            json!({"op":"remove_branch","nodeId":key,"branchId":branch["id"]}),
                        )?;
                    }
                    for branch in node["data"]["branches"].as_array().unwrap() {
                        apply(
                            candidate,
                            operations,
                            json!({"op":"add_branch","nodeId":key,"branchId":branch["id"],"branch":branch}),
                        )?;
                    }
                }
                if crate::control::is_loop(kind) {
                    build(key, source, candidate, operations)?;
                }
            }
            for key in &ids {
                let node = source.node(key)?;
                let set: serde_json::Map<String, Value> = node["data"]
                    .as_object()
                    .into_iter()
                    .flat_map(|o| o.iter())
                    .filter(|(k, _)| {
                        !matches!(k.as_str(), "branches" | "joinId" | "forkId" | "conditions")
                    })
                    .map(|(k, v)| {
                        (
                            format!("/{}", crate::workflow_edit::graph::escape(k)),
                            v.clone(),
                        )
                    })
                    .collect();
                if !set.is_empty() {
                    apply(
                        candidate,
                        operations,
                        json!({"op":"update_node","nodeId":key,"set":set}),
                    )?;
                }
            }
            Ok(())
        }
        build("root", &source, &mut candidate, &mut operations)?;
        for (scope, edges) in candidate.0["edges"].as_object().unwrap().clone() {
            for edge in edges.as_array().unwrap() {
                operations.push(json!({"op":"disconnect","scopeId":scope,"edge":edge}));
            }
        }
        for (scope, edges) in source.0["edges"].as_object().unwrap() {
            for edge in edges.as_array().unwrap() {
                operations.push(json!({"op":"connect","scopeId":scope,"edge":edge}));
            }
        }
        self.call("edit_workflow",json!({"workflowId":workflow,"expectedRevision":1,"mutationId":id(),"operations":operations})).await?;
        self.call(
            "layout_workflow",
            json!({"workflowId":workflow,"expectedRevision":2,"mutationId":id(),"recursive":true}),
        )
        .await?;
        Ok(created)
    }
    pub async fn run(&self, workflow: &str, inputs: Value) -> Result<Value> {
        let run = self
            .call(
                "run_workflow",
                json!({"workflowId":workflow,"expectedRevision":self.store.workflow(workflow).await?.revision,"mutationId":id(),"inputs":inputs}),
            )
            .await?;
        let run_id = run["data"]["runId"].as_str().unwrap();
        tokio::time::timeout(std::time::Duration::from_secs(60), async {
            // The status row is committed before the final event. Capture the
            // walkthrough only after the owned worker has flushed the trace.
            while self.store.run(run_id).await?.status == "running"
                || self.store.active.lock().await.contains_key(run_id)
            {
                tokio::time::sleep(std::time::Duration::from_millis(5)).await;
            }
            self.call("read_run", json!({"runId":run_id})).await?;
            Ok(json!({"run":self.store.run(run_id).await?}))
        })
        .await
        .map_err(|_| Error::Execution("Initial example execution timed out".into()))?
    }
    pub async fn finish(self, text: String) -> Result<()> {
        let mut item = self.store.new_item(&self.turn.id, "assistant").await?;
        item.status = "completed".into();
        item.phase = "final".into();
        item.content = text;
        self.store.put_item(&mut item).await?;
        self.store
            .finish_turn_success(&self.turn.id, Some(&item.id))
            .await?;
        Ok(())
    }
}
