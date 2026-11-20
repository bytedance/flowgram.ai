//! Paged run inventory, shared by project and deployment management transports.
use crate::{
    error::{Error, Result},
    store::Store,
};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use sqlx::{QueryBuilder, Row, Sqlite};
const PAGE: i64 = 50;
#[derive(Default, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RunListQuery {
    pub workflow_id: Option<String>,
    pub status: Option<String>,
    pub source: Option<String>,
    pub search: Option<String>,
    pub since: Option<String>,
    pub until: Option<String>,
    pub environment: Option<String>,
    pub version: Option<String>,
    pub before_time: Option<String>,
    pub before_id: Option<String>,
}
const BASE:&str="WITH inventory AS (SELECT r.id,r.workflow_id,r.revision,r.created_at,r.status,r.error,COALESCE(json_extract(w.definition,'$.name'),'') AS workflow_name,n.node_id AS test_node_id,s.service,s.environment,s.version AS release_version,s.operation,s.idempotency_key AS request_key,d.status AS callback_status,d.attempts AS callback_attempts,d.last_error AS callback_error,
CASE WHEN n.node_id IS NOT NULL THEN 'node_test' WHEN s.run_id IS NOT NULL THEN 'published' WHEN r.session_id IS NOT NULL THEN 'agent' WHEN EXISTS(SELECT 1 FROM events e WHERE e.object_id=r.id AND e.kind='run_origin') THEN 'debug' ELSE 'manual' END AS source,
(SELECT created_at FROM events e WHERE e.object_id=r.id AND e.kind='run_finished' ORDER BY sequence DESC LIMIT 1) AS ended_at,
CAST(COALESCE(json_extract(r.inputs,'$.requestId'),json_extract(r.inputs,'$.orderId'),json_extract(r.inputs,'$.invoiceId'),'') AS TEXT) AS business_id
FROM runs r LEFT JOIN run_workflows w ON w.run_id=r.id AND w.workflow_id=r.workflow_id LEFT JOIN node_tests n ON n.run_id=r.id LEFT JOIN service_runs s ON s.run_id=r.id LEFT JOIN service_deliveries d ON d.run_id=r.id) ";
fn date(text: &str) -> Result<String> {
    Ok(chrono::DateTime::parse_from_rfc3339(text)
        .map_err(|_| Error::Invalid("Run time filters require RFC 3339 timestamps".into()))?
        .with_timezone(&chrono::Utc)
        .to_rfc3339())
}
impl RunListQuery {
    pub fn query_string(&self) -> String {
        let mut url = reqwest::Url::parse("http://localhost/").expect("static URL");
        for (key, value) in serde_json::to_value(self)
            .expect("query")
            .as_object()
            .expect("object")
        {
            if let Some(value) = value.as_str() {
                url.query_pairs_mut().append_pair(key, value);
            }
        }
        url.query().unwrap_or_default().into()
    }
    fn build(
        &self,
        scope: Option<(&str, &str)>,
        count: bool,
    ) -> Result<QueryBuilder<'static, Sqlite>> {
        if self.search.as_ref().is_some_and(|s| s.len() > 500) {
            return Err(Error::Invalid(
                "Run search is limited to 500 characters".into(),
            ));
        }
        let mut query = QueryBuilder::new(BASE);
        query.push(if count {
            "SELECT count(*) AS total FROM inventory WHERE 1=1"
        } else {
            "SELECT * FROM inventory WHERE 1=1"
        });
        if let Some((service, environment)) = scope {
            query
                .push(" AND service=")
                .push_bind(service.to_owned())
                .push(" AND environment=")
                .push_bind(environment.to_owned());
        }
        if let Some(workflow) = &self.workflow_id {
            query.push(" AND workflow_id=").push_bind(workflow.clone());
        }
        if let Some(status) = &self.status {
            query.push(" AND status=").push_bind(status.clone());
        }
        if let Some(source) = &self.source {
            query.push(" AND source=").push_bind(source.clone());
        }
        if let Some(environment) = &self.environment {
            query
                .push(" AND environment=")
                .push_bind(environment.clone());
        }
        if let Some(version) = &self.version {
            query
                .push(" AND release_version=")
                .push_bind(version.clone());
        }
        if let Some(search) = &self.search {
            query.push(" AND instr(lower(id||' '||workflow_name||' '||COALESCE(error,'')||' '||COALESCE(request_key,'')||' '||business_id),lower(").push_bind(search.clone()).push("))>0");
        }
        if let Some(since) = &self.since {
            query.push(" AND created_at>=").push_bind(date(since)?);
        }
        if let Some(until) = &self.until {
            query.push(" AND created_at<").push_bind(date(until)?);
        }
        if !count {
            if let (Some(time), Some(id)) = (&self.before_time, &self.before_id) {
                let time = date(time)?;
                query
                    .push(" AND (created_at<")
                    .push_bind(time.clone())
                    .push(" OR (created_at=")
                    .push_bind(time)
                    .push(" AND id<")
                    .push_bind(id.clone())
                    .push("))");
            }
            query
                .push(" ORDER BY created_at DESC,id DESC LIMIT ")
                .push_bind(PAGE + 1);
        }
        Ok(query)
    }
}
impl Store {
    pub async fn list_runs(
        &self,
        query: &RunListQuery,
        scope: Option<(&str, &str)>,
    ) -> Result<Value> {
        let total: i64 = query
            .build(scope, true)?
            .build_query_scalar()
            .fetch_one(&self.db)
            .await?;
        let rows = query
            .build(scope, false)?
            .build()
            .fetch_all(&self.db)
            .await?;
        let more = rows.len() > PAGE as usize;
        let mut runs = vec![];
        for row in rows.into_iter().take(PAGE as usize) {
            let started: String = row.get("created_at");
            let ended: Option<String> = row.get("ended_at");
            runs.push(json!({"id":row.get::<String,_>("id"),"workflowId":row.get::<String,_>("workflow_id"),"workflowName":row.get::<String,_>("workflow_name"),"revision":row.get::<i64,_>("revision"),"testNodeId":row.get::<Option<String>,_>("test_node_id"),"status":row.get::<String,_>("status"),"source":row.get::<String,_>("source"),"createdAt":started,"endedAt":ended,"durationMs":ended.as_ref().and_then(|end|crate::run_trace::milliseconds(&started,end)),"error":row.get::<Option<String>,_>("error").map(|e|e.chars().take(240).collect::<String>()),"environment":row.get::<Option<String>,_>("environment"),"releaseVersion":row.get::<Option<String>,_>("release_version"),"operation":row.get::<Option<String>,_>("operation"),"callbackStatus":row.get::<Option<String>,_>("callback_status"),"callbackAttempts":row.get::<Option<i64>,_>("callback_attempts"),"callbackError":row.get::<Option<String>,_>("callback_error"),"requestId":row.get::<Option<String>,_>("request_key"),"businessId":row.try_get::<String,_>("business_id").unwrap_or_default()}));
        }
        let next = if more {
            runs.last()
                .map(|run| json!({"time":run["createdAt"],"id":run["id"]}))
        } else {
            None
        };
        let mut facets = QueryBuilder::<Sqlite>::new(BASE);
        facets.push("SELECT workflow_id,workflow_name,environment FROM inventory WHERE 1=1");
        if let Some((service, environment)) = scope {
            facets
                .push(" AND service=")
                .push_bind(service.to_owned())
                .push(" AND environment=")
                .push_bind(environment.to_owned());
        }
        facets.push(" GROUP BY workflow_id,environment ORDER BY MAX(created_at) DESC LIMIT 1000");
        let facets = facets.build().fetch_all(&self.db).await?;
        let mut workflows = std::collections::BTreeMap::new();
        let mut environments = std::collections::BTreeSet::new();
        for row in facets {
            workflows
                .entry(row.get::<String, _>("workflow_id"))
                .or_insert(row.get::<String, _>("workflow_name"));
            if let Some(environment) = row.get::<Option<String>, _>("environment") {
                environments.insert(environment);
            }
        }
        Ok(
            json!({"runs":runs,"total":total,"next":next,"workflows":workflows.into_iter().map(|(id,name)|json!({"id":id,"name":name})).collect::<Vec<_>>(),"environments":environments}),
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[tokio::test]
    async fn pages_frozen_names_and_filters_without_loading_payloads() {
        let dir = tempfile::tempdir().unwrap();
        let store = Store::open(dir.path()).await.unwrap();
        let project = store.projects().await.unwrap().remove(0);
        let workflow = store
            .create_workflow(
                &project.id,
                "Historical title",
                json!({"nodes":[{"id":"start","type":"start","data":{}},{"id":"end","type":"end","data":{"inputsValues":{}}}],"edges":[{"sourceNodeID":"start","targetNodeID":"end"}]}),
            )
            .await
            .unwrap();
        let mut tx = store.db.begin().await.unwrap();
        for i in 0..103 {
            let run = store
                .prepare_run(
                    &workflow,
                    None,
                    &json!({"orderId":format!("PO-{i:04}"),"payload":"x".repeat(2000)}),
                    std::slice::from_ref(&workflow),
                    &mut tx,
                )
                .await
                .unwrap();
            sqlx::query(
                "UPDATE runs SET created_at='2026-10-20T00:00:00+00:00',status=? WHERE id=?",
            )
            .bind(if i % 2 == 0 { "succeeded" } else { "failed" })
            .bind(run.id)
            .execute(&mut *tx)
            .await
            .unwrap();
        }
        tx.commit().await.unwrap();
        store
            .save_workflow(&workflow.id, 1, "Renamed draft", workflow.schema.clone())
            .await
            .unwrap();
        let first = store
            .list_runs(&RunListQuery::default(), None)
            .await
            .unwrap();
        assert_eq!(first["total"], 103);
        assert_eq!(first["runs"].as_array().unwrap().len(), 50);
        assert_eq!(first["runs"][0]["workflowName"], "Historical title");
        assert!(first["runs"][0].get("inputs").is_none());
        let second = store
            .list_runs(
                &RunListQuery {
                    before_time: first["next"]["time"].as_str().map(str::to_owned),
                    before_id: first["next"]["id"].as_str().map(str::to_owned),
                    ..Default::default()
                },
                None,
            )
            .await
            .unwrap();
        let first_ids: std::collections::HashSet<_> = first["runs"]
            .as_array()
            .unwrap()
            .iter()
            .map(|run| run["id"].as_str().unwrap())
            .collect();
        assert!(
            second["runs"]
                .as_array()
                .unwrap()
                .iter()
                .all(|run| !first_ids.contains(run["id"].as_str().unwrap()))
        );
        let search = store
            .list_runs(
                &RunListQuery {
                    search: Some("PO-0037".into()),
                    ..Default::default()
                },
                None,
            )
            .await
            .unwrap();
        assert_eq!(search["total"], 1);
        assert_eq!(search["runs"][0]["status"], "failed");
        assert_eq!(
            store
                .list_runs(
                    &RunListQuery {
                        status: Some("succeeded".into()),
                        ..Default::default()
                    },
                    None
                )
                .await
                .unwrap()["total"],
            52
        );
        assert_eq!(
            store
                .list_runs(
                    &RunListQuery::default(),
                    Some(("other-service", "production"))
                )
                .await
                .unwrap()["total"],
            0
        );
        assert_eq!(
            store
                .list_runs(
                    &RunListQuery {
                        since: Some("2026-10-21T00:00:00Z".into()),
                        ..Default::default()
                    },
                    None
                )
                .await
                .unwrap()["total"],
            0
        );
    }
}
