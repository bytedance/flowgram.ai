//! Explicit inline workflow references; browser offsets use UTF-16, not UTF-8 bytes.
use crate::{
    error::{Error, Result},
    store::Store,
};
use serde::Deserialize;
use serde_json::Value;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
struct Mention {
    workflow_id: String,
    name: String,
    start: usize,
    end: usize,
}
impl Store {
    pub(crate) async fn validate_input_references(
        &self,
        session: &str,
        content: &str,
        references: &Value,
    ) -> Result<()> {
        if references.is_null() {
            return Ok(());
        }
        let invalid = || Error::Invalid("Invalid workflow references or mention ranges".into());
        let object = references.as_object().ok_or_else(invalid)?;
        if object
            .keys()
            .any(|key| !matches!(key.as_str(), "workflowId" | "workflows"))
            || references.to_string().len() > 64000
        {
            return Err(invalid());
        }
        let mut ids = std::collections::HashSet::new();
        if let Some(id) = object.get("workflowId") {
            ids.insert(id.as_str().ok_or_else(invalid)?.to_owned());
        }
        if let Some(mentions) = object.get("workflows") {
            let mentions: Vec<Mention> =
                serde_json::from_value(mentions.clone()).map_err(|_| invalid())?;
            if mentions.len() > 32 {
                return Err(Error::Invalid(
                    "A message may reference at most 32 workflow mentions".into(),
                ));
            }
            let text = content.encode_utf16().collect::<Vec<_>>();
            let mut previous = 0;
            for mention in mentions {
                if mention.name.is_empty()
                    || mention.start < previous
                    || mention.start >= mention.end
                    || mention.end > text.len()
                {
                    return Err(invalid());
                }
                let label =
                    String::from_utf16(&text[mention.start..mention.end]).map_err(|_| invalid())?;
                if label != format!("@{}", mention.name) {
                    return Err(invalid());
                }
                previous = mention.end;
                ids.insert(mention.workflow_id);
            }
        }
        let project = self.session(session).await?.project_id;
        for id in ids {
            let workflow = self.workflow(&id).await?;
            if workflow.project_id != project {
                return Err(Error::Invalid(
                    "The referenced workflow does not belong to the current project".into(),
                ));
            }
        }
        Ok(())
    }
}
