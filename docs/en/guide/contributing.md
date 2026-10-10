# Contribution Guide

This document helps you quickly develop, test, and submit PRs in this repository. The repository uses a Monorepo managed by Rush + pnpm, and the documentation site is built with Rspress.

## Setting Up the Development Environment

1. **Install Node.js 18+** (LTS/Hydrogen recommended)

   ```bash
   nvm install lts/hydrogen
   nvm alias default lts/hydrogen # Set as the default Node version
   nvm use lts/hydrogen
   ```

2. **Clone the repository locally**

   ```bash
   git clone git@github.com:bytedance/flowgram.ai.git
   ```

3. **Install global dependencies**

   ```bash
   npm i -g pnpm@10.6.5 @microsoft/rush@5.150.0
   ```

4. **Install project dependencies**

   ```bash
   rush install
   ```

5. **Build the project**

   ```bash
   rush build
   ```

6. **Run the documentation or examples**

   ```bash
   rush dev:docs                  # Start the documentation site in apps/docs (with incremental build)
   rush dev:demo-fixed-layout     # Run the fixed layout example
   rush dev:demo-free-layout      # Run the free layout example
   ```

## Common Commands (Rush Custom)

```bash
rush build            # Build all packages
rush build:watch      # Incrementally build and watch
rush lint             # Run ESLint checks
rush lint:fix         # Automatically fix ESLint issues
rush ts-check         # TypeScript type checking
rush test             # Run test scripts for each package (aggregated by package)
rush e2e:test         # Run all e2e tests
rush e2e:update-screenshot # Update e2e snapshots
rush dep-check        # Automatically check dependency health
```

## Branch and Commit Conventions

* Branch naming:
  * `feat/description` (new feature)
  * `fix/description` (bug fix)
  * `docs/description` (documentation changes)
  * `chore/description` (maintenance/miscellaneous)
* Commit messages (Conventional Commits):
  * Format: `type(scope): subject`, for example:

    ```text
    feat(editor): Support batch alignment of nodes
    ```

  * Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

  * The repository has commitlint validation enabled (commit-msg hook), so commit messages will be automatically checked; pre-commit will also run lint-staged (automatically update license headers, fix eslint issues) and `rush check`.

## Development and Quality Assurance

* Local development recommendations:
  * First, run `rush build:watch`, then run the development command in the corresponding demo or docs directory (e.g., `rush dev:docs`).
  * After modifying the code, ensure it passes: `rush lint`, `rush ts-check`, `rush build`, `rush test`.
* Testing instructions:
  * e2e test cases are located in the `e2e/` directory and can be run with `rush e2e:test`, or you can update snapshots with `rush e2e:update-screenshot`.

## Pull Request Process

1. Create your working branch from `main` (following the branch naming conventions).
2. Code and add tests/documentation.
3. Pass local quality checks (lint, ts-check, build, test).
4. Submit a PR: fill in the description, link the Issue, and use the template.
5. Review and CI: Maintainers will review the code, and it can be merged after the CI passes.

## Documentation Contribution

* Documentation location: `apps/docs/src/zh/**` (Chinese) and `apps/docs/src/en/**` (English).
* Local preview: Run `rush dev:docs` to start the Rspress documentation site.
* To automatically generate API documentation, you can run `rushx docs` in the `apps/docs` directory (which calls a script to generate it).

## Common Issues

* pnpm-lock merge conflicts: The repository has a merge strategy configured in the `post-checkout` hook, which usually avoids lock file conflicts.
* Node version: Please ensure you are using Node 18+, otherwise you may encounter dependency or build failures.

## Reporting Issues

* Please submit an Issue on GitHub: https://github.com/bytedance/flowgram.ai/issues/new/choose
  * Describe the problem, reproduction steps, expected and actual behavior, and provide a code example if necessary.

## License

* This project is licensed under the MIT License. By submitting code, you agree to the relevant terms.
