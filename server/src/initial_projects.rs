//! First-use content is authored into ordinary project files and conversation records.
mod content;
mod history;

use crate::{
    error::{Error, Result},
    project::{atomic_json, read_project, write_project},
    registry::{Registry, RegistryState},
    store::{Store, id},
};
use axum::{Json, Router, extract::State, routing::post};
use serde::Deserialize;
use serde_json::{Value, json};

const READY: &str = ".initial-projects-ready.json";
fn example_locale(system_language: &str) -> &'static str {
    if system_language
        .split(['-', '_'])
        .next()
        .is_some_and(|language| language.eq_ignore_ascii_case("zh"))
    {
        "zh-CN"
    } else {
        "en"
    }
}
impl Registry {
    /// A persisted empty registry is intentional, including after deleting every project.
    /// Only a never-initialized workspace receives examples. No model or network is used.
    pub async fn initialize_projects(&self, locale: &str) -> Result<bool> {
        // Seed documents follow the device language, not a saved UI preference.
        let locale = example_locale(locale);
        let _mutation = self.mutations.lock().await;
        if !self.records.lock().await.is_empty()
            || self.directory.join("projects.json").try_exists()?
        {
            return Ok(false);
        }
        let destination = self.directory.join("projects");
        let stage = self.directory.join(".flowgram-initializing");
        // A ready marker survives a crash between the directory move and registry commit.
        if !destination.join(READY).try_exists()? {
            if destination.try_exists()?
                && tokio::fs::read_dir(&destination)
                    .await?
                    .next_entry()
                    .await?
                    .is_some()
            {
                return Ok(false);
            }
            if !stage.join(READY).try_exists()? {
                if stage.try_exists()? {
                    tokio::fs::remove_dir_all(&stage).await?;
                }
                tokio::fs::create_dir(&stage).await?;
                let mut directories = Vec::new();
                for scenario in content::scenarios(locale) {
                    let folder = id();
                    let root = stage.join(&folder);
                    let project = write_project(&root, scenario.name()).await?;
                    let store =
                        Store::open_configured(&root, &self.directory, Some(self.model.clone()))
                            .await?;
                    let result = content::populate(&store, &project.id, scenario).await;
                    store.closed.cancel();
                    store.db.close().await;
                    result?;
                    directories.push(folder);
                }
                atomic_json(&stage.join(READY), &directories).await?;
            }
            if destination.try_exists()? {
                // Never recursively remove a user's unregistered projects.
                tokio::fs::remove_dir(&destination).await?;
            }
            crate::project::rename_directory(&stage, &destination).await?;
        }
        let directories: Vec<String> =
            serde_json::from_slice(&tokio::fs::read(destination.join(READY)).await?)?;
        let mut projects = Vec::new();
        for folder in directories {
            uuid::Uuid::parse_str(&folder)
                .map_err(|_| Error::Invalid("Invalid initial project directory".into()))?;
            projects.push(read_project(&destination.join(folder)).await?);
        }
        atomic_json(&self.directory.join("projects.json"), &projects).await?;
        *self.records.lock().await = projects;
        if let Err(error) = tokio::fs::remove_file(destination.join(READY)).await {
            eprintln!("Initial project marker cleanup failed: {error}");
        }
        Ok(true)
    }
}
#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
struct Initialize {
    #[serde(default)]
    locale: String,
}
pub(crate) fn routes() -> Router<RegistryState> {
    Router::new().route("/api/projects/initialize", post(initialize))
}
async fn initialize(
    State(state): State<RegistryState>,
    Json(input): Json<Initialize>,
) -> Result<Json<Value>> {
    let initialized = state.registry.initialize_projects(&input.locale).await?;
    Ok(Json(json!({"initialized":initialized})))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn examples_default_to_english_and_only_chinese_system_languages_opt_in() {
        for language in ["", "en", "en-US", "fr-FR", "ja-JP", "unknown", "zhish"] {
            assert_eq!(example_locale(language), "en");
        }
        for language in ["zh", "zh-CN", "zh-Hans-CN", "zh_TW", "ZH-hant-HK"] {
            assert_eq!(example_locale(language), "zh-CN");
        }
        let missing: Initialize = serde_json::from_value(json!({})).unwrap();
        assert_eq!(example_locale(&missing.locale), "en");
    }
}
