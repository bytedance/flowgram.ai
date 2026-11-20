# Repository Guidelines

## Project Structure & Module Organization
FlowGram is a Rush-managed monorepo. Production-ready libraries live under `packages/*` (canvas engine, node engine, runtime, plugins). Demo UIs and docs sit inside `apps/*` (for example `apps/demo-free-layout`, `apps/docs`). Shared tooling, config, and scripts live under `common/` and `config/`. End-to-end Playwright suites are isolated in `e2e/<scenario>` so they can be installed and run independently. New code should land in the closest existing package; create additional Rush projects only when a module needs its own version and publish cycle.

## Build, Test, and Development Commands
Use Node.js 18 LTS with pnpm 10.6.5 (Rush enforces versions). Install dependencies via `rush install`. Run `rush build` to compile every registered project. Use `rush dev:docs` or `rush dev:demo-free-layout` for hot-reload docs and demos. `rush lint`, `rush lint:fix`, and `rush ts-check` keep lint/TS diagnostics consistent. `rush test` aggregates unit tests; `rush e2e:test` runs Playwright suites, while `rush e2e:update-screenshot` refreshes snapshots.

## Coding Style & Naming Conventions
We write TypeScript with React, sharing configs from `config/eslint-config`. ESLint enforces 2-space indentation, semicolons, and import order; run `rush lint:fix` before committing. Use `PascalCase` for React components and classes, `camelCase` for variables/functions, and `SCREAMING_SNAKE_CASE` only for constants exported from config files. File names follow kebab-case (e.g., `flow-node-form.tsx`). Keep public API surfaces documented via barrel files such as `packages/canvas-engine/core/src/index.ts`.

## Testing Guidelines
Unit tests use Vitest and live beside source in `__tests__` folders or `*.test.ts` files; prefer descriptive names like `node-service.test.ts`. Ensure new logic is covered by `rush test`, and include data fixtures where possible. Playwright specs under `e2e/*/tests` cover critical workflows—coordinate UI changes with updated snapshots and run `rush e2e:test --to <package>` to scope failures.

## Commit & Pull Request Guidelines
Follow conventional commits (`type(scope): subject`) as seen in history (`fix(auto-layout): ...`). Keep subjects imperative and ≤72 characters, with optional bodies for context. PRs must describe the change, link GitHub issues, and attach before/after screenshots for UI updates. Confirm CI status, note any follow-ups, and request reviewers from the owning package tags (see `rush.json`).

- Commit each completed feature immediately after its relevant checks pass. Do not begin an unrelated feature while the completed feature is still uncommitted.
- Keep each commit focused on one functional change, including its necessary tests and documentation. Split shared files by feature when changes overlap; do not use broad staging to combine unrelated work.
- Before committing, inspect the staged diff and exclude generated artifacts, local data, and credentials. After committing, check the worktree and clearly distinguish any pre-existing or unfinished changes. Do not push unless requested.
- Git tag events notify the team chat. Do not create, push, or move Git tags or publish releases unless the user explicitly requests that action. Desktop preview updates must only replace assets in the existing published channel; never create or publish a channel automatically.

## Desktop Design Standard

- Follow the user-selected Claude design references: https://claude-storybook.bystanderss.chatgpt.site and https://www.figma.com/design/iAyueTdyOjxZZhNpRpbCQY/MCP-Apps-for-Claude--Community-. Keep implementation details and token mappings in `design/desktop-design-system.md`.
- Reuse shared surface, typography, radius, spacing and motion tokens. Prefer restrained action feedback, preserve canvas viewport and mounted editor identity, and never animate panel width during pointer dragging. Respect reduced motion.
- Use the official FlowGram logo from repository assets. Desktop settings are a full-page destination; workspace sections use bounded, keyboard-accessible, persisted resize handles.

- Desktop workflow ports must use explicit static port definitions and data-driven coordinates. Do not enable FlowGram `useDynamicPort` or discover ports by measuring or scanning DOM elements.
- Desktop UI copy must support English and Simplified Chinese with a persisted language setting and a system-language default. Language changes must preserve drafts and the mounted canvas. Translate presentation fields only; never translate IDs, enum values, editor kinds, schemas, or user-authored content.
- Agent system prompts, default agent/LLM prompt templates, Workflow Tool descriptions, shared node contracts, and backend diagnostics must be English. Agents should match the user's requested response language independently of the UI language.
- Use the shared desktop `ui/select` primitive for visible dropdowns. Do not add native `<select>` or `<option>` UI; keep option values stable across themes and locales. Canvas background, dots, node surfaces, and lines must use theme tokens without reinitializing the editor.

- Deployment belongs to full-page Settings as one global module with Releases, Credentials, and Runtime services. Keep project releases as persistent cards with version history and per-target deployments; global credentials explicitly grant all-project or selected-project availability. Do not add a project-scoped Services sidebar destination or a Current project group inside settings. Workflow publish actions deep-link into this same module and preserve the mounted workspace.
