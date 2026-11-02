# Agent context management

The Rust backend owns context projection for both desktop conversations and workflow Agent nodes. UI history is never deleted or rewritten by compaction.

## Budget

The execution snapshot captures the selected model's configured context window. Each request budgets instructions, tool schemas, history, new input, output tokens and a safety margin. The automatic threshold is the smaller of 85% of the window and the window minus the output reserve and margin. The default output reserve is up to one quarter of the window, capped at 16,384 tokens; an explicit larger output limit is also reserved.

When the model window is unknown, a conservative 32,768-token working budget is used. The UI identifies this as a fallback, not a discovered model capability. Text estimates account for non-ASCII content and are calibrated by provider usage. Cached input still counts toward the window; providers that report cache reads/creation separately have those counts added.

## Automatic compaction

Before sending a model request, the backend checks the projected context, including new user input and tool results. Completed older groups are summarized with the same authorized model connection. Instructions and tool schemas are supplied fresh. The newest user request is retained verbatim, with workflow references and their UTF-16 positions; recent history is retained within budget. A model response and all of its tool results form one indivisible group.

The summary preserves the active objective, corrections, constraints, authorizations, exact workflow/node/run/result IDs and revisions, confirmed results, uncertain outcomes and next steps. Summaries are historical evidence, not new authorization. Oversized summary input is processed in bounded fragments rather than dropping old tasks. Empty, ineffective or failed summaries do not replace the existing context. Cancellation leaves the original context intact.

Provider context-length rejections before any response output trigger one forced compaction and one retry. Other transport failures, partial responses and already executed tools are not retried by this mechanism. Desktop conversations continue until the model finishes, the user stops, or an execution error occurs; there is no fixed request or item count that forces a new turn. Workflow Agent nodes retain their explicitly configured maximum steps as part of the workflow contract, independent of compaction requests.

## Durable history and large results

Conversation checkpoints persist the projected input, source turn/item identities, summary and usage. History is loaded in bounded pages rather than a fixed number of messages. Item identities allow late steering messages and interrupted operations to be reconciled after restart without duplicating already projected records. Model/connection revisions invalidate old usage calibration and opaque reasoning items.

Tool-call narration stays out of durable model context. Completed turns fold native tool exchanges into factual records with exact call IDs, arguments and result references, while keeping the final answer. Interrupted assistant text is labeled as partial evidence rather than a confirmed outcome.

Large tool results are stored intact in the project database. The model receives a bounded preview and result ID; the shared `read_tool_result` tool supports JSON Pointer paths and structured object, array and Unicode-safe text pages. Published Agent nodes can only read result IDs created within their current run. Compaction checkpoints and stored results accompany project history on export/import; they do not carry credentials. Project package format version 3 includes these history tables, immutable tool values, mutation journals and execution receipts; older prototype package formats are unsupported. Existing project directories remain usable. Permanent session/run deletion cascades to their retained outputs.

## Presentation

The composer displays context usage with the compaction threshold and output reserve in its tooltip. Conversation events show compaction in progress, completion, interruption or failure. Usage revisions prevent stale events or reconnect snapshots from replacing newer values. Presentation strings support English and Simplified Chinese; model prompts and diagnostics remain English.
