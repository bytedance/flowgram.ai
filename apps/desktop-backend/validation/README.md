# Complex project acceptance

This directory builds executable FlowGram projects and checks business outcomes against the real Rust Workflow Runtime, HTTP calls, SQLite stock/ledgers, the configured model, shared Workflow Tools and MCP. It is an acceptance harness, not an application backend or production connector.

## Projects

- **复杂验证 · 订单履约**: batch deduplication, bounded parallel iterations, reusable per-order workflow, parallel customer/stock reads, risk and stock routes, atomic stock reservation, fulfillment/backorder/review records, partial input failures and grouped totals.
- **复杂验证 · 采购对账**: parallel invoice/PO/receipt reads, deduplication, two left joins, reusable three-way matcher, missing PO / short receipt / amount / currency routes, idempotent approval and exception ledgers. Money uses minor units and currency-specific groups.
- **复杂验证 · AI 客服**: parallel customer/knowledge context, real model classification, strict JSON/schema checks, deterministic sensitive-action guard, human handoff, urgent routing and reply drafts. A committed decision is read before reclassification on replay.
- The invoice project also contains **Agent · 采购异常日报**, built and repaired by the application's real agent session. Its runtime template failure was fed back to the agent; it repaired the original workflow, tested the template node and reran the complete report. The harness only adds a local API input default to this agent-authored workflow.

Ten reusable business workflow definitions are installed by `scenarios.py`. The agent adds an eleventh. Two explicitly named version probes belong to the test evidence, not the business graph count.

## Run

Start the desktop application first. It alone owns the project directories and model configuration. Do not start another backend against these projects.

From the repository root:

```sh
python3 apps/desktop-backend/validation/client.py
```

Start the local business service in a persistent terminal (the acceptance run uses a dedicated `flowgram-business-validation` tmux session):

```sh
python3 apps/desktop-backend/validation/service.py --directory .flowgram-local/complex-validation
```

In another terminal:

```sh
python3 apps/desktop-backend/validation/scenarios.py
python3 apps/desktop-backend/validation/verify.py
```

The service binds only loopback and records its selected port in `.flowgram-local/complex-validation/business-connection.json`. Reinstall scenarios after restarting it to refresh the UI input defaults. `--skip-model` skips new classification calls; it does not fake model responses. Model settings must already be configured in the application.

`agent_check.py` creates a real agent construction session in the invoice project. It intentionally does not run during fault injection. It is separate from deterministic scenario generation. Generated definitions, run inputs and all trace evidence remain in the project directories or the acceptance output directory.

## Assertions

`verify.py` fails on incorrect output, unexpected status, duplicate external side effects, overselling, missing failure indices, reordered iteration results, sensitive-ticket auto replies, incorrect money grouping or incomplete paginated trace retrieval. It checks:

- ordinary paths, duplicates, invalid orders, missing POs, short receipts, one-minor-unit mismatch and currency mismatch;
- transient 503 responses, an acknowledged-as-failed committed reservation, retry exhaustion and 404 status rejection;
- repeat execution against the same durable ledgers;
- 100 orders with nested parallelism, independent iteration scopes and all event pages;
- cancellation without silently resuming external writes;
- editing a dependency during a live run, followed by a new run through MCP;
- real-model output, invalid structured output and a hard sensitive-action guard;
- the agent-authored exception report's actual execution and currency-specific summaries.

Evidence is written to `.flowgram-local/complex-validation/acceptance.json`. Every case includes the real run ID, business output, event and execution counts, and dependency manifest. Read full events with the paginated history API. The UI exposes paginated run details and dependency hashes; canvas state is a separate latest-per-node projection, so the first event page cannot hide terminal node status.

## Scope of the result

Business data is controlled, non-production acceptance data. HTTP requests, SQLite commits, Rust execution and model calls are real. This proves the tested orchestration and failure semantics; it does not claim a production ERP/payment/CRM integration. Review routing writes a review record; it is not a durable human-approval suspension engine. Idempotency is enforced by the downstream business resource and explicitly reused by the workflows, not by a claim of universal exactly-once execution.

Workflow definitions are frozen transitively before execution, including node tests. Dynamic subworkflow targets and recursive calls are rejected before side effects. This workflow snapshot does not yet freeze every model configuration, credential binding or external resource. Durable cross-process resume, transactional compensation, production authorization and very large event-list virtualization remain outside this acceptance result.

## Publish and consume the projects

After building the updated desktop app and `flowgram-service`:

```sh
python3 apps/desktop-backend/validation/published_services.py
python3 apps/desktop-backend/validation/service_lifecycle.py
```

The first command creates a separate acceptance business database and standalone service host in dedicated `flowgram-service-business` / `flowgram-services` tmux sessions. It does not reset the earlier complex-project acceptance database. Both source projects and published bundles remain available. Host credentials are kept only in ignored mode-0600 files.

For independent MCP interoperability, install the official `mcp` Python package into an isolated environment, then run `mcp_consumer.py` there. It checks stateless HTTP, initialized legacy HTTP and the Rust stdio bridge.

Close the desktop application normally, preserving any drafts first, then run:

```sh
python3 apps/desktop-backend/validation/service_lifecycle.py --offline
```

This asserts that the desktop backend is unreachable, consumes all three business services, checks injected-credential redaction, cancellation and signed callback retry, restarts only the acceptance service host, and verifies that interrupted execution is retained rather than replayed. Reopen the desktop afterward. The acceptance probe is disabled at the end; the three business services remain enabled.


## Six first-use business projects

The production first-use catalog is authored in `scripts/build-example-catalog.py` and compiled from `catalog/examples/*.json` into the Rust initializer. Python is an authoring and acceptance tool, not an application runtime dependency. Regenerate catalogs with:

```sh
python3 apps/desktop-backend/scripts/build-example-catalog.py
cargo test -p flowgram-desktop-backend --test initial_projects
```

| Project | Workflows | Canvas nodes |
| --- | --- | --- |
| Commerce: fulfillment decisions, batch processing, exception report | 3 | 55 |
| Manufacturing: invoice matching, reconciliation, exception analysis | 3 | 67 |
| SaaS: guarded ticket routing, support Agent, queue trends | 3 | 47 |
| Media: source preparation, parallel channel drafts, quality checks | 3 | 50 |
| IT operations: alert triage and HTTP retry, diagnostic Agent, incident review | 3 | 38 |
| Education: submission checks, grounded feedback, class weekly report | 3 | 37 |

Initialization creates 18 ordinary workflows (294 nodes including loop bodies), 18 authored conversations, 24 turns and 29 actual runs. Six failed executions are retained beside corrected successful runs. All 11 model-free workflows rerun using visible defaults; the seven AI workflows require the configured provider. Initialization makes no model requests and does not fabricate replies or tools. Every generated dependency uses an ordinary stable workflow identity; branch values leave their scopes through the paired join.

For HTTP acceptance, start the loopback fixture in a persistent terminal:

```sh
python3 apps/desktop-backend/validation/example_endpoints.py --port 59146 --connection .flowgram-local/example-http-connection.json
```

Against a workspace containing these six projects, validate all workflows, actual provider requests, Agent read-only tools, generated draft handoff into quality checks, transient HTTP retry and retry exhaustion:

```sh
python3 apps/desktop-backend/validation/example_projects.py \
  --connection "$HOME/Library/Application Support/ai.flowgram.desktop/connection.json" \
  --output .flowgram-local/example-project-acceptance.json \
  --models --http-connection .flowgram-local/example-http-connection.json
```

`--models` makes real calls through the application's existing configured provider. Omit it for model-free checks. `--reuse-model-runs` is intended only for continuing an acceptance pass whose definitions have not changed; it reuses a successful model run with identical inputs. Execution evidence traverses and pages the real parent/child trace, including model, tool and HTTP spans. Sample health data is controlled; HTTP requests and retry attempts are real. Model outputs remain drafts, not publication or operational side effects.

Financial example reports render amounts and currency deterministically from runtime aggregates. Models receive only grouped dimensions and record counts; their qualitative analysis is returned separately and cannot rewrite the displayed monetary facts.
