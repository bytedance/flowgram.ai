# FlowGram Runtime NodeJS

## Starting the server
```bash
pnpm dev
```

## Building the server
```bash
pnpm build
```

## Running the server
```bash
node dist/index.js
```

## Task retention

The runtime keeps at most 1000 running and completed tasks in memory. Completed
tasks remain available through `/api/task/report` and `/api/task/result` for up to
five minutes after execution settles, including failed and cancelled executions.
At capacity, the oldest completed task is removed to make room for a new task.
If every retained task is still running, new task submissions fail until capacity
becomes available. Running tasks are never evicted.

Expired or evicted task IDs return no report or result, and cancellation returns
`success: false`. Persist reports and results outside the runtime if they need to
remain available longer.
