use crate::{
    error::{Error, Result},
    store::{Store, id, nonempty, now},
};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use sqlx::{Row, SqlitePool};
use tokio_util::sync::CancellationToken;

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ConversationInput {
    pub id: String,
    pub client_input_id: String,
    pub session_id: String,
    pub content: String,
    pub references: Value,
    #[serde(default)]
    pub model: Option<crate::models::Selection>,
    pub delivery_mode: String,
    pub turn_id: Option<String>,
    pub status: String,
    pub revision: i64,
    pub created_at: String,
    pub error: Option<String>,
}
#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Turn {
    pub id: String,
    pub session_id: String,
    pub initiating_input_id: String,
    pub status: String,
    pub phase: String,
    pub revision: i64,
    pub ordinal: i64,
    pub started_at: String,
    pub ended_at: Option<String>,
    pub final_item_id: Option<String>,
    #[serde(default)]
    pub origin: TurnOrigin,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub estimated_duration_ms: Option<u64>,
    #[serde(default)]
    pub model: Option<crate::models::Trace>,
    pub error: Option<String>,
}
#[derive(Clone, Debug, Default, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum TurnOrigin {
    #[default]
    Agent,
    Authored,
}
#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ConversationItem {
    pub id: String,
    pub session_id: String,
    pub turn_id: String,
    pub ordinal: i64,
    pub kind: String,
    pub status: String,
    pub phase: String,
    pub content: String,
    pub payload: Value,
    pub revision: i64,
    pub created_at: String,
    pub updated_at: String,
}
#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SendInput {
    pub client_input_id: String,
    pub content: String,
    #[serde(default = "queue_mode")]
    pub delivery_mode: String,
    pub expected_turn_id: Option<String>,
    #[serde(default)]
    pub references: Value,
    #[serde(default)]
    pub model: Option<crate::models::Selection>,
}
fn queue_mode() -> String {
    "queue".into()
}

pub async fn initialize(db: &SqlitePool) -> Result<()> {
    for sql in [
        "CREATE TABLE IF NOT EXISTS conversation_inputs (ordinal INTEGER PRIMARY KEY AUTOINCREMENT, id TEXT NOT NULL UNIQUE, session_id TEXT NOT NULL REFERENCES sessions(id), client_input_id TEXT NOT NULL, status TEXT NOT NULL, turn_id TEXT, delivery_mode TEXT NOT NULL, data TEXT NOT NULL, UNIQUE(session_id,client_input_id))",
        "CREATE TABLE IF NOT EXISTS conversation_turns (ordinal INTEGER PRIMARY KEY AUTOINCREMENT, id TEXT NOT NULL UNIQUE, session_id TEXT NOT NULL REFERENCES sessions(id), status TEXT NOT NULL, data TEXT NOT NULL)",
        "CREATE UNIQUE INDEX IF NOT EXISTS conversation_one_active ON conversation_turns(session_id) WHERE status IN ('running','stopping')",
        "CREATE TABLE IF NOT EXISTS conversation_items (id TEXT PRIMARY KEY, turn_id TEXT NOT NULL REFERENCES conversation_turns(id), ordinal INTEGER NOT NULL, data TEXT NOT NULL, UNIQUE(turn_id,ordinal))",
        "CREATE INDEX IF NOT EXISTS conversation_pending ON conversation_inputs(session_id,status,ordinal)",
        "CREATE TABLE IF NOT EXISTS conversation_controls (session_id TEXT PRIMARY KEY REFERENCES sessions(id), paused INTEGER NOT NULL DEFAULT 0)",
        "CREATE TABLE IF NOT EXISTS conversation_runs (turn_id TEXT NOT NULL REFERENCES conversation_turns(id), run_id TEXT NOT NULL REFERENCES runs(id), PRIMARY KEY(turn_id,run_id))",
    ] {
        sqlx::query(sql).execute(db).await?;
    }
    crate::agent_context::initialize(db).await?;
    // Never replay a model/tool operation whose external outcome may be unknown.
    let active =
        sqlx::query("SELECT data FROM conversation_turns WHERE status IN ('running','stopping')")
            .fetch_all(db)
            .await?;
    for row in active {
        let mut turn: Turn = serde_json::from_str(row.get("data"))?;
        turn.status = "interrupted".into();
        turn.phase = "interrupted".into();
        turn.ended_at = Some(now());
        turn.error = Some("The service restarted and this turn was interrupted. Completed operations will not be replayed automatically".into());
        turn.revision += 1;
        let mut tx = db.begin().await?;
        sqlx::query("UPDATE conversation_turns SET status=?,data=? WHERE id=?")
            .bind(&turn.status)
            .bind(json_text(&turn)?)
            .bind(&turn.id)
            .execute(&mut *tx)
            .await?;
        sqlx::query("INSERT INTO conversation_controls(session_id,paused) VALUES(?,1) ON CONFLICT(session_id) DO UPDATE SET paused=1").bind(&turn.session_id).execute(&mut *tx).await?;
        let rows = sqlx::query("SELECT data FROM conversation_items WHERE turn_id=?")
            .bind(&turn.id)
            .fetch_all(&mut *tx)
            .await?;
        for row in rows {
            let mut item: ConversationItem = serde_json::from_str(row.get("data"))?;
            if matches!(item.status.as_str(), "running" | "pending" | "drafting") {
                item.status = if item.kind == "tool" && item.status == "running" {
                    "uncertain"
                } else {
                    "interrupted"
                }
                .into();
                item.revision += 1;
                item.updated_at = now();
                sqlx::query("UPDATE conversation_items SET data=? WHERE id=?")
                    .bind(json_text(&item)?)
                    .bind(&item.id)
                    .execute(&mut *tx)
                    .await?;
            }
        }
        let rows = sqlx::query(
            "SELECT data FROM conversation_inputs WHERE turn_id=? AND status='pending'",
        )
        .bind(&turn.id)
        .fetch_all(&mut *tx)
        .await?;
        for row in rows {
            let mut input: ConversationInput = serde_json::from_str(row.get("data"))?;
            input.status = "rejected".into();
            input.error = Some("The target turn was interrupted. Reschedule this input".into());
            input.revision += 1;
            sqlx::query("UPDATE conversation_inputs SET status=?,data=? WHERE id=?")
                .bind(&input.status)
                .bind(json_text(&input)?)
                .bind(&input.id)
                .execute(&mut *tx)
                .await?;
        }
        sqlx::query("UPDATE sessions SET status='interrupted' WHERE id=?")
            .bind(&turn.session_id)
            .execute(&mut *tx)
            .await?;
        tx.commit().await?;
    }
    Ok(())
}
fn json_text(value: &impl Serialize) -> Result<String> {
    Ok(serde_json::to_string(value)?)
}
fn conflict(message: &str) -> Error {
    Error::ConversationConflict(message.into())
}
fn decode<T: serde::de::DeserializeOwned>(rows: Vec<sqlx::sqlite::SqliteRow>) -> Result<Vec<T>> {
    rows.iter()
        .map(|row| Ok(serde_json::from_str(row.get("data"))?))
        .collect()
}
impl ConversationInput {
    pub fn model_text(&self) -> String {
        if self.references.is_null() {
            self.content.clone()
        } else {
            format!(
                "{}\n\nUser-referenced context (workflow IDs are authoritative; start/end are UTF-16 offsets of inline @labels in the user message, preserving their order and surrounding instructions): {}",
                self.content, self.references
            )
        }
    }
}
impl Store {
    pub async fn turn(&self, turn_id: &str) -> Result<Turn> {
        let row = sqlx::query("SELECT data FROM conversation_turns WHERE id=?")
            .bind(turn_id)
            .fetch_optional(&self.db)
            .await?
            .ok_or_else(|| Error::NotFound("Turn not found".into()))?;
        Ok(serde_json::from_str(row.get("data"))?)
    }
    pub async fn conversation(&self, session: &str, before: Option<i64>) -> Result<Value> {
        self.session(session).await?;
        let _guard = self.conversation_lock.lock().await;
        let mut turns: Vec<Turn> = decode(sqlx::query("SELECT data FROM conversation_turns WHERE session_id=? AND (? IS NULL OR ordinal<?) ORDER BY ordinal DESC LIMIT 10").bind(session).bind(before).bind(before).fetch_all(&self.db).await?)?;
        turns.reverse();
        let mut items = Vec::<ConversationItem>::new();
        for turn in &turns {
            items.extend(decode::<ConversationItem>(
                sqlx::query("SELECT data FROM conversation_items WHERE turn_id=? ORDER BY ordinal")
                    .bind(&turn.id)
                    .fetch_all(&self.db)
                    .await?,
            )?);
        }
        let inputs: Vec<ConversationInput> = decode(sqlx::query("SELECT data FROM conversation_inputs WHERE session_id=? AND status IN ('queued','pending','rejected') ORDER BY ordinal LIMIT 64").bind(session).fetch_all(&self.db).await?)?;
        let paused: Option<i64> =
            sqlx::query_scalar("SELECT paused FROM conversation_controls WHERE session_id=?")
                .bind(session)
                .fetch_optional(&self.db)
                .await?;
        let watermark: i64 = sqlx::query_scalar("SELECT COALESCE(MAX(sequence),0) FROM events")
            .fetch_one(&self.db)
            .await?;
        let next = if turns.len() == 10 {
            turns.first().map(|t| t.ordinal)
        } else {
            None
        };
        Ok(
            json!({"sessionId":session,"modelSelection":self.session_model(session).await?,"contextUsage":self.context_usage(session).await?,"turns":turns,"items":items,"inputs":inputs,"paused":paused.unwrap_or(0)!=0,"watermark":watermark,"nextBefore":next}),
        )
    }
    pub async fn submit_input(
        &self,
        session: &str,
        request: SendInput,
    ) -> Result<ConversationInput> {
        self.session(session).await?;
        if request.content.len() > 20000 {
            return Err(Error::Invalid(
                "Message must be nonempty and no longer than 20000 characters".into(),
            ));
        }
        nonempty(&request.content, "Message")?;
        let content = request.content.clone();
        if request.client_input_id.is_empty()
            || request.client_input_id.len() > 128
            || !matches!(request.delivery_mode.as_str(), "queue" | "steer")
        {
            return Err(Error::Invalid("Invalid input ID or delivery mode".into()));
        }
        self.validate_input_references(session, &content, &request.references)
            .await?;
        let guard = self.conversation_lock.lock().await;
        self.require_unarchived("session", session).await?;
        if let Some(row) = sqlx::query(
            "SELECT data FROM conversation_inputs WHERE session_id=? AND client_input_id=?",
        )
        .bind(session)
        .bind(&request.client_input_id)
        .fetch_optional(&self.db)
        .await?
        {
            let previous: ConversationInput = serde_json::from_str(row.get("data"))?;
            if previous.content != content
                || previous.references != request.references
                || previous.model != request.model
                || previous.delivery_mode != request.delivery_mode
                || (request.delivery_mode == "steer"
                    && previous.turn_id != request.expected_turn_id)
            {
                return Err(conflict(
                    "This input ID was used for different content. Send it again with a new ID",
                ));
            }
            return Ok(previous);
        }
        let selection = match &request.model {
            Some(value) => value.clone(),
            None => self.session_model(session).await?,
        };
        let frozen = if request.delivery_mode == "steer" {
            self.turn_model(request.expected_turn_id.as_deref().ok_or_else(|| {
                conflict("Adding instructions to a turn requires a target turn ID")
            })?)
            .await?
        } else {
            self.deployment_settings
                .resolve_model(
                    &selection,
                    &self.session(session).await?.project_id,
                    true,
                    true,
                )
                .await?
        };
        let pending: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM conversation_inputs WHERE session_id=? AND status IN ('queued','pending','rejected')").bind(session).fetch_one(&self.db).await?;
        if pending >= 32 {
            return Err(Error::Invalid(
                "The queue has reached 32 inputs. Process existing inputs first".into(),
            ));
        }
        let turn_id = if request.delivery_mode == "steer" {
            let expected = request.expected_turn_id.as_deref().ok_or_else(|| {
                conflict("Adding instructions to a turn requires a target turn ID")
            })?;
            let turn = self.turn(expected).await?;
            if turn.session_id != session || turn.status != "running" {
                return Err(conflict(
                    "The target turn ended or is stopping. The input was not redirected; queue it for the next turn",
                ));
            }
            Some(expected.to_owned())
        } else {
            None
        };
        let queued: i64 = sqlx::query_scalar(
            "SELECT COUNT(*) FROM conversation_inputs WHERE session_id=? AND status='queued'",
        )
        .bind(session)
        .fetch_one(&self.db)
        .await?;
        let active:i64=sqlx::query_scalar("SELECT COUNT(*) FROM conversation_turns WHERE session_id=? AND status IN ('running','stopping')").bind(session).fetch_one(&self.db).await?;
        if request.delivery_mode == "queue" && queued == 0 && active == 0 {
            sqlx::query("UPDATE conversation_controls SET paused=0 WHERE session_id=?")
                .bind(session)
                .execute(&self.db)
                .await?;
            self.emit("conversation_queue", session, json!({"paused":false}))
                .await?;
        }
        let input = ConversationInput {
            id: id(),
            client_input_id: request.client_input_id,
            session_id: session.into(),
            content,
            references: request.references,
            model: request.model,
            delivery_mode: request.delivery_mode,
            status: if turn_id.is_some() {
                "pending"
            } else {
                "queued"
            }
            .into(),
            turn_id,
            revision: 1,
            created_at: now(),
            error: None,
        };
        let mut tx = self.db.begin().await?;
        sqlx::query(
            "INSERT INTO conversation_controls(session_id) VALUES(?) ON CONFLICT DO NOTHING",
        )
        .bind(session)
        .execute(&mut *tx)
        .await?;
        sqlx::query("INSERT INTO conversation_inputs(id,session_id,client_input_id,status,turn_id,delivery_mode,data) VALUES(?,?,?,?,?,?,?)").bind(&input.id).bind(session).bind(&input.client_input_id).bind(&input.status).bind(&input.turn_id).bind(&input.delivery_mode).bind(json_text(&input)?).execute(&mut *tx).await?;
        sqlx::query("INSERT INTO input_models VALUES(?,?)")
            .bind(&input.id)
            .bind(serde_json::to_string(&frozen)?)
            .execute(&mut *tx)
            .await?;
        if input.delivery_mode == "queue" {
            let selected = crate::models::Selection {
                model_id: Some(frozen.model_id.clone()),
                parameters: selection.parameters,
            };
            sqlx::query("INSERT INTO session_models VALUES(?,?) ON CONFLICT(session_id) DO UPDATE SET selection=excluded.selection").bind(session).bind(serde_json::to_string(&selected)?).execute(&mut *tx).await?;
        }
        tx.commit().await?;
        self.emit("conversation_input", session, serde_json::to_value(&input)?)
            .await?;
        drop(guard);
        self.kick_conversation(session).await;
        Ok(input)
    }
    async fn save_input(&self, input: &mut ConversationInput) -> Result<()> {
        input.revision += 1;
        sqlx::query(
            "UPDATE conversation_inputs SET status=?,turn_id=?,delivery_mode=?,data=? WHERE id=?",
        )
        .bind(&input.status)
        .bind(&input.turn_id)
        .bind(&input.delivery_mode)
        .bind(json_text(input)?)
        .bind(&input.id)
        .execute(&self.db)
        .await?;
        self.emit(
            "conversation_input",
            &input.session_id,
            serde_json::to_value(&input)?,
        )
        .await
    }
    pub async fn change_queued_input(
        &self,
        session: &str,
        input_id: &str,
        revision: i64,
        content: Option<&str>,
        steer_to: Option<&str>,
    ) -> Result<ConversationInput> {
        self.change_queued_input_with_references(
            session, input_id, revision, content, None, steer_to,
        )
        .await
    }
    pub async fn change_queued_input_with_references(
        &self,
        session: &str,
        input_id: &str,
        revision: i64,
        content: Option<&str>,
        references: Option<Value>,
        steer_to: Option<&str>,
    ) -> Result<ConversationInput> {
        let _guard = self.conversation_lock.lock().await;
        let row = sqlx::query("SELECT data FROM conversation_inputs WHERE id=? AND session_id=?")
            .bind(input_id)
            .bind(session)
            .fetch_optional(&self.db)
            .await?
            .ok_or_else(|| Error::NotFound("Queued input not found".into()))?;
        let mut input: ConversationInput = serde_json::from_str(row.get("data"))?;
        if input.revision != revision || !matches!(input.status.as_str(), "queued" | "rejected") {
            return Err(conflict(
                "This input changed or started execution. Refresh before editing it",
            ));
        }
        if let Some(turn_id) = steer_to {
            let turn = self.turn(turn_id).await?;
            if turn.session_id != session || turn.status != "running" {
                return Err(conflict(
                    "The target turn ended or is stopping. The queued input is preserved",
                ));
            }
            input.delivery_mode = "steer".into();
            input.turn_id = Some(turn_id.into());
            input.status = "pending".into();
            input.error = None;
        } else if let Some(content) = content {
            if content.len() > 20000 {
                return Err(Error::Invalid(
                    "Message must be nonempty and no longer than 20000 characters".into(),
                ));
            }
            nonempty(content, "Message")?;
            let refs = references.unwrap_or_else(|| {
                if input.content == content {
                    input.references.clone()
                } else {
                    Value::Null
                }
            });
            self.validate_input_references(session, content, &refs)
                .await?;
            input.content = content.to_owned();
            input.references = refs;
            input.status = "queued".into();
            input.delivery_mode = "queue".into();
            input.turn_id = None;
            input.error = None;
        } else {
            input.status = "cancelled".into();
        }
        self.save_input(&mut input).await?;
        Ok(input)
    }
    pub async fn resume_queue(&self, session: &str) -> Result<()> {
        self.session(session).await?;
        {
            let _guard = self.conversation_lock.lock().await;
            self.require_unarchived("session", session).await?;
            let rows = sqlx::query("SELECT i.data FROM conversation_inputs i LEFT JOIN input_models m ON m.input_id=i.id WHERE i.session_id=? AND i.status='queued' AND m.input_id IS NULL").bind(session).fetch_all(&self.db).await?;
            let mut snapshots = Vec::new();
            for row in rows {
                let input: ConversationInput = serde_json::from_str(row.get("data"))?;
                let selection = input.model.unwrap_or(self.session_model(session).await?);
                let resolved = self
                    .deployment_settings
                    .resolve_model(
                        &selection,
                        &self.session(session).await?.project_id,
                        true,
                        true,
                    )
                    .await?;
                snapshots.push((input.id, resolved));
            }
            let mut tx = self.db.begin().await?;
            for (id, model) in snapshots {
                sqlx::query("INSERT INTO input_models VALUES(?,?)")
                    .bind(id)
                    .bind(serde_json::to_string(&model)?)
                    .execute(&mut *tx)
                    .await?;
            }
            tx.commit().await?;
            sqlx::query("INSERT INTO conversation_controls(session_id,paused) VALUES(?,0) ON CONFLICT(session_id) DO UPDATE SET paused=0").bind(session).execute(&self.db).await?;
            self.emit("conversation_queue", session, json!({"paused":false}))
                .await?;
        }
        self.kick_conversation(session).await;
        Ok(())
    }
    pub async fn resume_conversations(&self) -> Result<()> {
        sqlx::query("INSERT INTO conversation_controls(session_id,paused) SELECT DISTINCT i.session_id,1 FROM conversation_inputs i LEFT JOIN input_models m ON m.input_id=i.id WHERE i.status='queued' AND m.input_id IS NULL ON CONFLICT(session_id) DO UPDATE SET paused=1").execute(&self.db).await?;

        let sessions: Vec<String> = sqlx::query_scalar(
            "SELECT DISTINCT session_id FROM conversation_inputs WHERE status='queued'",
        )
        .fetch_all(&self.db)
        .await?;
        for session in sessions {
            self.kick_conversation(&session).await;
        }
        Ok(())
    }
    async fn kick_conversation(&self, session: &str) {
        if !self
            .conversation_workers
            .lock()
            .await
            .insert(session.into())
        {
            return;
        }
        let store = self.clone();
        let session = session.to_owned();
        tokio::spawn(async move {
            loop {
                let claimed = store.claim_next(&session).await;
                let (turn, token) = match claimed {
                    Ok(Some(value)) => value,
                    Ok(None) => break,
                    Err(error) => {
                        eprintln!("Conversation dispatch: {error}");
                        store.conversation_workers.lock().await.remove(&session);
                        break;
                    }
                };
                let project = store.session(&session).await.map(|t| t.project_id);
                let result = match project {
                    Ok(project) => store.agent_turn(&turn, &project, &token).await,
                    Err(error) => Err(error),
                };
                if let Err(error) = result {
                    let _ = store.finish_failed_turn(&turn.id, &error).await;
                }
                let mut active = store.active.lock().await;
                active.remove(&turn.id);
                active.remove(&session);
            }
        });
    }
    async fn claim_next(&self, session: &str) -> Result<Option<(Turn, CancellationToken)>> {
        let _guard = self.conversation_lock.lock().await;
        if self.closed.is_cancelled() || self.is_archived("session", session).await? {
            self.conversation_workers.lock().await.remove(session);
            return Ok(None);
        }
        let paused: Option<i64> =
            sqlx::query_scalar("SELECT paused FROM conversation_controls WHERE session_id=?")
                .bind(session)
                .fetch_optional(&self.db)
                .await?;
        let active: i64=sqlx::query_scalar("SELECT COUNT(*) FROM conversation_turns WHERE session_id=? AND status IN ('running','stopping')").bind(session).fetch_one(&self.db).await?;

        let row=sqlx::query("SELECT data FROM conversation_inputs WHERE session_id=? AND status='queued' ORDER BY ordinal LIMIT 1").bind(session).fetch_optional(&self.db).await?;
        if paused == Some(1) || active > 0 || row.is_none() {
            self.conversation_workers.lock().await.remove(session);
            return Ok(None);
        }
        let mut input: ConversationInput = serde_json::from_str(row.unwrap().get("data"))?;
        let frozen = self.input_model(&input.id).await?;
        let mut turn = Turn {
            id: id(),
            session_id: session.into(),
            initiating_input_id: input.id.clone(),
            status: "running".into(),
            phase: "model".into(),
            revision: 1,
            ordinal: 0,
            started_at: now(),
            ended_at: None,
            final_item_id: None,
            origin: TurnOrigin::Agent,
            estimated_duration_ms: None,
            model: Some(crate::models::Trace::from(&frozen)),
            error: None,
        };
        input.status = "accepted".into();
        input.turn_id = Some(turn.id.clone());
        input.revision += 1;
        let item = ConversationItem {
            id: input.id.clone(),
            session_id: session.into(),
            turn_id: turn.id.clone(),
            ordinal: 1,
            kind: "user".into(),
            status: "completed".into(),
            phase: "initial".into(),
            content: input.content.clone(),
            payload: json!({"references":input.references}),
            revision: 1,
            created_at: now(),
            updated_at: now(),
        };
        let mut tx = self.db.begin().await?;
        let row = sqlx::query(
            "INSERT INTO conversation_turns(id,session_id,status,data) VALUES(?,?,?,?)",
        )
        .bind(&turn.id)
        .bind(session)
        .bind(&turn.status)
        .bind(json_text(&turn)?)
        .execute(&mut *tx)
        .await?;
        turn.ordinal = row.last_insert_rowid();
        sqlx::query("UPDATE conversation_turns SET data=? WHERE id=?")
            .bind(json_text(&turn)?)
            .bind(&turn.id)
            .execute(&mut *tx)
            .await?;
        sqlx::query("INSERT INTO conversation_items VALUES(?,?,?,?)")
            .bind(&item.id)
            .bind(&turn.id)
            .bind(1)
            .bind(json_text(&item)?)
            .execute(&mut *tx)
            .await?;

        sqlx::query("UPDATE conversation_inputs SET status=?,turn_id=?,data=? WHERE id=?")
            .bind(&input.status)
            .bind(&turn.id)
            .bind(json_text(&input)?)
            .bind(&input.id)
            .execute(&mut *tx)
            .await?;
        sqlx::query("INSERT INTO turn_models VALUES(?,?)")
            .bind(&turn.id)
            .bind(serde_json::to_string(&frozen)?)
            .execute(&mut *tx)
            .await?;
        sqlx::query("UPDATE sessions SET status='running' WHERE id=?")
            .bind(session)
            .execute(&mut *tx)
            .await?;
        tx.commit().await?;
        let token = CancellationToken::new();
        let mut active = self.active.lock().await;
        active.insert(session.into(), token.clone());
        active.insert(turn.id.clone(), token.clone());
        drop(active);
        self.emit("conversation_input", session, serde_json::to_value(&input)?)
            .await?;
        self.emit("conversation_turn", session, serde_json::to_value(&turn)?)
            .await?;
        self.emit("conversation_item", session, serde_json::to_value(&item)?)
            .await?;
        self.emit("session_status", session, json!({"status":"running"}))
            .await?;
        Ok(Some((turn, token)))
    }
    pub async fn new_item(&self, turn_id: &str, kind: &str) -> Result<ConversationItem> {
        let _guard = self.conversation_lock.lock().await;
        let turn = self.turn(turn_id).await?;
        let ordinal: i64 = sqlx::query_scalar(
            "SELECT COALESCE(MAX(ordinal),0)+1 FROM conversation_items WHERE turn_id=?",
        )
        .bind(turn_id)
        .fetch_one(&self.db)
        .await?;
        let item = ConversationItem {
            id: id(),
            session_id: turn.session_id,
            turn_id: turn_id.into(),
            ordinal,
            kind: kind.into(),
            status: if kind == "tool" {
                "drafting"
            } else {
                "running"
            }
            .into(),
            phase: "commentary".into(),
            content: String::new(),
            payload: json!({}),
            revision: 1,
            created_at: now(),
            updated_at: now(),
        };
        sqlx::query("INSERT INTO conversation_items VALUES(?,?,?,?)")
            .bind(&item.id)
            .bind(turn_id)
            .bind(ordinal)
            .bind(json_text(&item)?)
            .execute(&self.db)
            .await?;
        self.emit(
            "conversation_item",
            &item.session_id,
            serde_json::to_value(&item)?,
        )
        .await?;
        Ok(item)
    }
    pub async fn put_item(&self, item: &mut ConversationItem) -> Result<()> {
        let _guard = self.conversation_lock.lock().await;
        self.put_item_locked(item).await
    }
    async fn put_item_locked(&self, item: &mut ConversationItem) -> Result<()> {
        item.revision += 1;
        item.updated_at = now();
        sqlx::query("UPDATE conversation_items SET data=? WHERE id=?")
            .bind(json_text(item)?)
            .bind(&item.id)
            .execute(&self.db)
            .await?;
        self.emit(
            "conversation_item",
            &item.session_id,
            serde_json::to_value(&item)?,
        )
        .await
    }
    pub async fn turn_phase(&self, turn_id: &str, phase: &str) -> Result<()> {
        let _guard = self.conversation_lock.lock().await;
        let mut turn = self.turn(turn_id).await?;
        if turn.status != "running" || turn.phase == phase {
            return Ok(());
        }
        turn.phase = phase.into();
        self.put_turn_locked(&mut turn).await
    }
    async fn put_turn_locked(&self, turn: &mut Turn) -> Result<()> {
        turn.revision += 1;
        sqlx::query("UPDATE conversation_turns SET status=?,data=? WHERE id=?")
            .bind(&turn.status)
            .bind(json_text(turn)?)
            .bind(&turn.id)
            .execute(&self.db)
            .await?;
        self.emit(
            "conversation_turn",
            &turn.session_id,
            serde_json::to_value(&turn)?,
        )
        .await
    }
    async fn accept_supplements_locked(&self, turn: &Turn) -> Result<Vec<ConversationInput>> {
        let mut inputs:Vec<ConversationInput>=decode(sqlx::query("SELECT data FROM conversation_inputs WHERE turn_id=? AND status='pending' ORDER BY ordinal").bind(&turn.id).fetch_all(&self.db).await?)?;
        for input in &mut inputs {
            let ordinal: i64 = sqlx::query_scalar(
                "SELECT COALESCE(MAX(ordinal),0)+1 FROM conversation_items WHERE turn_id=?",
            )
            .bind(&turn.id)
            .fetch_one(&self.db)
            .await?;
            let item = ConversationItem {
                id: input.id.clone(),
                session_id: turn.session_id.clone(),
                turn_id: turn.id.clone(),
                ordinal,
                kind: "user".into(),
                status: "completed".into(),
                phase: "steering".into(),
                content: input.content.clone(),
                payload: json!({"references":input.references}),
                revision: 1,
                created_at: input.created_at.clone(),
                updated_at: now(),
            };
            input.status = "accepted".into();
            input.revision += 1;
            let mut tx = self.db.begin().await?;
            sqlx::query("INSERT INTO conversation_items VALUES(?,?,?,?)")
                .bind(&item.id)
                .bind(&turn.id)
                .bind(ordinal)
                .bind(json_text(&item)?)
                .execute(&mut *tx)
                .await?;

            sqlx::query("UPDATE conversation_inputs SET status=?,data=? WHERE id=?")
                .bind(&input.status)
                .bind(json_text(input)?)
                .bind(&input.id)
                .execute(&mut *tx)
                .await?;
            tx.commit().await?;
            self.emit(
                "conversation_input",
                &turn.session_id,
                serde_json::to_value(&input)?,
            )
            .await?;
            self.emit(
                "conversation_item",
                &turn.session_id,
                serde_json::to_value(&item)?,
            )
            .await?;
        }
        Ok(inputs)
    }
    pub async fn take_supplements(&self, turn_id: &str) -> Result<Vec<ConversationInput>> {
        let _guard = self.conversation_lock.lock().await;
        let turn = self.turn(turn_id).await?;
        if turn.status != "running" {
            return Err(Error::Cancelled);
        }
        self.accept_supplements_locked(&turn).await
    }
    pub async fn finish_turn_success(
        &self,
        turn_id: &str,
        final_item_id: Option<&str>,
    ) -> Result<Vec<ConversationInput>> {
        let _guard = self.conversation_lock.lock().await;
        let mut turn = self.turn(turn_id).await?;
        if turn.status != "running" {
            return Err(Error::Cancelled);
        }
        let supplements = self.accept_supplements_locked(&turn).await?;
        if !supplements.is_empty() {
            return Ok(supplements);
        }
        if let Some(id) = final_item_id {
            let row = sqlx::query("SELECT data FROM conversation_items WHERE id=? AND turn_id=?")
                .bind(id)
                .bind(turn_id)
                .fetch_one(&self.db)
                .await?;
            let mut item: ConversationItem = serde_json::from_str(row.get("data"))?;
            item.phase = "final".into();
            self.put_item_locked(&mut item).await?;
            turn.final_item_id = Some(id.into());
        }
        turn.status = "completed".into();
        turn.phase = "completed".into();
        turn.ended_at = Some(now());
        self.put_turn_locked(&mut turn).await?;
        sqlx::query("UPDATE sessions SET status='idle' WHERE id=?")
            .bind(&turn.session_id)
            .execute(&self.db)
            .await?;
        self.emit("session_status", &turn.session_id, json!({"status":"idle"}))
            .await?;
        Ok(Vec::new())
    }
    pub async fn finish_failed_turn(&self, turn_id: &str, error: &Error) -> Result<()> {
        let _guard = self.conversation_lock.lock().await;
        let mut turn = self.turn(turn_id).await?;
        if !matches!(turn.status.as_str(), "running" | "stopping") {
            return Ok(());
        }
        turn.status = if matches!(error, Error::Cancelled) {
            "interrupted"
        } else {
            "failed"
        }
        .into();
        turn.phase = turn.status.clone();
        turn.error = Some(error.to_string());
        turn.ended_at = Some(now());
        let mut items: Vec<ConversationItem> = decode(
            sqlx::query("SELECT data FROM conversation_items WHERE turn_id=?")
                .bind(turn_id)
                .fetch_all(&self.db)
                .await?,
        )?;
        for item in &mut items {
            if matches!(item.status.as_str(), "running" | "pending" | "drafting") {
                item.status = if item.kind == "tool" && item.status == "running" {
                    "uncertain"
                } else if item.kind == "tool" {
                    "cancelled"
                } else {
                    "interrupted"
                }
                .into();
                self.put_item_locked(item).await?;
            }
        }
        let mut inputs: Vec<ConversationInput> = decode(
            sqlx::query(
                "SELECT data FROM conversation_inputs WHERE turn_id=? AND status='pending'",
            )
            .bind(turn_id)
            .fetch_all(&self.db)
            .await?,
        )?;
        for input in &mut inputs {
            input.status = "rejected".into();
            input.error = Some("The turn ended before receiving the supplemental input. Queue it for the next turn".into());
            self.save_input(input).await?;
        }
        sqlx::query("INSERT INTO conversation_controls(session_id,paused) VALUES(?,1) ON CONFLICT(session_id) DO UPDATE SET paused=1").bind(&turn.session_id).execute(&self.db).await?;
        self.put_turn_locked(&mut turn).await?;
        sqlx::query("UPDATE sessions SET status=? WHERE id=?")
            .bind(&turn.status)
            .bind(&turn.session_id)
            .execute(&self.db)
            .await?;
        self.emit(
            "conversation_queue",
            &turn.session_id,
            json!({"paused":true}),
        )
        .await?;
        self.emit(
            "session_status",
            &turn.session_id,
            json!({"status":turn.status}),
        )
        .await?;
        Ok(())
    }
    pub async fn stop_turn(&self, session: &str, turn_id: &str) -> Result<Turn> {
        let _guard = self.conversation_lock.lock().await;
        let mut turn = self.turn(turn_id).await?;
        if turn.session_id != session {
            return Err(Error::NotFound(
                "The turn does not belong to the current session".into(),
            ));
        }
        if !matches!(turn.status.as_str(), "running" | "stopping") {
            return Err(conflict(
                "This turn already ended. Inspect its actual result",
            ));
        }
        turn.status = "stopping".into();
        self.put_turn_locked(&mut turn).await?;
        let runs: Vec<String> =
            sqlx::query_scalar("SELECT run_id FROM conversation_runs WHERE turn_id=?")
                .bind(turn_id)
                .fetch_all(&self.db)
                .await?;
        let active = self.active.lock().await;
        if let Some(token) = active.get(turn_id) {
            token.cancel();
        }
        for run in runs {
            if let Some(token) = active.get(&run) {
                token.cancel();
            }
        }
        Ok(turn)
    }
    pub async fn link_turn_run(&self, turn_id: &str, run: &str) -> Result<()> {
        let _guard = self.conversation_lock.lock().await;
        sqlx::query("INSERT INTO conversation_runs VALUES(?,?) ON CONFLICT DO NOTHING")
            .bind(turn_id)
            .bind(run)
            .execute(&self.db)
            .await?;
        if self.turn(turn_id).await?.status == "stopping"
            && let Some(token) = self.active.lock().await.get(run)
        {
            token.cancel();
        }
        Ok(())
    }
}

pub fn display_payload(value: &Value) -> Value {
    fn redact(value: &Value) -> Value {
        match value {
            Value::Object(map) => Value::Object(
                map.iter()
                    .map(|(k, v)| {
                        let key = k.to_lowercase();
                        let v = if [
                            "apikey",
                            "api_key",
                            "authorization",
                            "password",
                            "secret",
                            "token",
                        ]
                        .contains(&key.as_str())
                        {
                            json!("[redacted]")
                        } else {
                            redact(v)
                        };
                        (k.clone(), v)
                    })
                    .collect(),
            ),
            Value::Array(items) => Value::Array(items.iter().map(redact).collect()),
            other => other.clone(),
        }
    }
    let clean = redact(value);
    let text = clean.to_string();
    if text.len() <= 12000 {
        clean
    } else {
        json!({"truncated":true,"preview":text.chars().take(2500).collect::<String>(),"id":clean["id"],"name":clean["name"],"revision":clean["revision"],"status":clean["status"],"runId":clean["runId"]})
    }
}
