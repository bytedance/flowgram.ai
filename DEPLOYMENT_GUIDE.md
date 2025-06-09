## Deployment Guide

This document outlines the deployment process for the FlowGram.AI project, covering both the documentation website and the software packages.

### Overview

Deployment is managed through GitHub Actions workflows, primarily triggered manually.
-   **Documentation:** Deployed to GitHub Pages.
-   **Packages:** Published to the npm registry.

The [Rush](https://rushjs.io/) monorepo manager plays a central role in building, versioning, and publishing packages.

### 1. Documentation Deployment (GitHub Pages)

The documentation website, sourced from the `apps/docs` directory, is deployed to GitHub Pages.

**Workflow File:** `.github/workflows/deploy.yml`

**Process:**

1.  **Trigger:** Manually triggered via `workflow_dispatch` on the GitHub Actions UI. This workflow typically runs on the `main` branch.
2.  **Setup:**
    *   Node.js environment (version 18) is set up.
    *   Project dependencies are installed using `rush install`.
    *   All packages are built using `rush build`.
3.  **Documentation Generation:**
    *   The command `npm run docs` is executed within the `apps/docs` directory to generate documentation content.
    *   There's a step to copy auto-generated documentation from a Chinese path (`apps/docs/src/zh/auto-docs`) to an English path (`apps/docs/src/en/auto-docs`).
    *   The documentation site is built using `npm run build` within `apps/docs`. The output is expected in `apps/docs/doc_build`.
4.  **Artifact Preparation:**
    *   The existing root `docs` directory (if any) is removed.
    *   The build output (`apps/docs/doc_build`) is moved to become the new root `docs` directory.
5.  **Deployment:**
    *   The content of the `docs` directory is uploaded as a GitHub Pages artifact.
    *   GitHub Actions then deploys this artifact to GitHub Pages, making it available at the configured project URL (e.g., `https://flowgram.ai/`).

**To Deploy Documentation:**
Navigate to the "Actions" tab in the GitHub repository, select the "Deploy With Actions" workflow, and run it (typically on the `main` branch).

### 2. Package Publishing (npm)

Project packages (e.g., `@flowgram.ai/core`, `@flowgram.ai/fixed-layout-editor`) are published to the npm registry.

**Main Workflow File:** `.github/workflows/publish.yml` (for regular/latest releases)
*Other workflow files like `publish-alpha.yml`, `publish-minor.yml` handle pre-releases or specific version bump strategies but follow a similar core process.*

**Process:**

1.  **Trigger:** Manually triggered via `workflow_dispatch` on the GitHub Actions UI.
2.  **Setup:**
    *   Node.js environment (version 18) is set up.
    *   npm is authenticated using a secret `NPM_PUBLISH_TOKEN`.
    *   Project dependencies are installed using `rush install`.
    *   All packages are built using `rush build`.
3.  **Version Management (using `publish.yml` as an example for `latest` tag):**
    *   The workflow retrieves the current latest version of a core package (e.g., `@flowgram.ai/core`) from npm.
    *   This version is used to update `common/config/rush/version-policies.json`, setting the `version` for the `publishPolicy` and specifying the `nextBump` (e.g., "patch").
    *   `rush version --bump --version-policy publishPolicy` is executed. This command updates the version numbers in the `package.json` files of the relevant packages according to the specified policy and bump type.
4.  **Publishing to npm:**
    *   `rush publish --include-all -p --tag latest` is executed. This command publishes all packages that have been updated (and meet the criteria of the version policy) to npm, tagging them with `latest`.
5.  **Git Tagging:**
    *   After successful publishing, the workflow retrieves the newly published version.
    *   A Git tag (e.g., `vX.Y.Z`) is created using this new version.
    *   The new tag is pushed to the GitHub repository.

**To Publish Packages:**
Navigate to the "Actions" tab in the GitHub repository, select the relevant publish workflow (e.g., "Publish" for a standard release), and run it. Ensure any necessary secrets (like `NPM_PUBLISH_TOKEN`) are correctly configured in the repository settings.

### Summary of Key Files and Tools:

*   **GitHub Actions Workflows:** Located in `.github/workflows/`.
    *   `deploy.yml`: For documentation.
    *   `publish.yml`, `publish-alpha.yml`, etc.: For package publishing.
*   **Rush Configuration:** Primarily in `rush.json` and `common/config/rush/`.
    *   `common/config/rush/version-policies.json`: Defines how package versions are managed and bumped.
*   **Documentation Source:** `apps/docs/`.
*   **npm:** The target registry for packages.
*   **GitHub Pages:** The hosting platform for documentation.
