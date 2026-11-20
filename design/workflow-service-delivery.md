# 工作流服务发布与消费

状态：已实现并完成本机与独立 Rust 进程验收。桌面入口为「设置 → 部署」，包含发布、凭证和运行服务；工作流工具栏「发布」带入所属项目。容器配置已提供，本机 Docker daemon 不可用，尚未完成容器启动实测。

## 对象与边界

桌面按项目维护一份持续发布配置，多个公开工作流作为同一版本交付；每个公开入口绑定一个根工作流。Rust 内部使用 Service / Operation 表达发布和调用，用户无需额外创建同级服务对象。每个入口声明英文工具说明、JSON Schema 输入与输出、超时、只读提示和环境配置映射。发布版本冻结全部传递子工作流，并记录 SHA-256 摘要及 Rust 运行时格式要求。同名版本不能覆盖；切换部署版本仅影响新请求，原运行继续使用原依赖。

服务版本、部署环境、调用方凭证和运行记录存储在项目数据库中。独立宿主导入发布包后使用自己的目录和数据库，不访问原工程或依赖桌面进程。发布包包含工作流定义；不包含会话、运行历史、设备模型配置、访问令牌和凭证值。工作流中自行写入的业务常量仍是发布内容。

## 消费入口

| 入口 | 地址 | 权限 |
|---|---|---|
| 本机业务接口 | `<desktop-endpoint>/v1/projects/<projectId>/services/<service>/<environment>` | 服务消费凭证；URL 已绑定工程，不再要求项目头 |
| 独立服务接口 | `<host>/v1/services/<service>/<environment>` | 服务消费凭证 |
| 桌面开发 MCP | `<desktop-endpoint>/mcp` | 设备连接令牌，包含工作流创建、修改与调试能力 |
| 业务 MCP | `<business-base>/mcp` | 只发现已授权业务操作及运行查询／取消工具 |

消费端点面向后端应用与原生 MCP 客户端，拒绝浏览器 Origin 请求。网页业务应由自己的后端持有消费凭证并转发，不在网页中分发服务令牌。

HTTP 与 MCP 调用相同的 `Store::invoke_service`。调用方不需要知道内部节点和子流程 ID；普通业务执行不会额外经过一个会话 Agent。工作流内部的 LLM / Agent 节点仍按定义执行；发布后的 Agent 只读工具只能查看本次冻结的流程集合和自身运行。

### HTTP

以下路径相对于 business-base：

| 方法 | 路径 | 行为 |
|---|---|---|
| POST | `/operations/{operation}/invoke?waitMs=30000` | body 直接为业务输入；必须提供 Idempotency-Key |
| GET | `/runs/{runId}` | 查询调用方自己的运行 |
| POST | `/runs/{runId}/cancel` | 须有取消权限；停止后续动作，已提交副作用保留 |
| GET | `/runs/{runId}/events?after={sequence}` | SSE 进度投影；支持 Last-Event-ID 与游标补读 |
| GET | `/runs/{runId}/result` | 下载成功运行的 JSON 产物；须使用原调用方凭证 |
| GET | `/openapi.json` | 按调用权限生成 OpenAPI 3.1 文档，包含业务输出契约 |

`waitMs` 有界等待最多 30 秒。仍在执行时返回 202；终态返回 200，消费方继续检查 `status`，业务输出位于 `outputs`。异常运行的 `status=failed` 与错误说明保存在同一个运行对象中；人工分流等正常业务决定仍是成功输出。

```sh
curl -X POST \
  'https://workflow.example.com/v1/services/order-fulfillment/production/operations/fulfill_order/invoke?waitMs=30000' \
  -H "Authorization: Bearer $FLOWGRAM_SERVICE_TOKEN" \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: erp-order-1001' \
  -d '{"order":{"id":"ERP-1001","customerId":"C1","sku":"A","quantity":2,"amountMinor":12900}}'
```

鉴权失败为 401，未授予操作为 403，幂等冲突为 409，输入契约错误为 422，并发耗尽为 429，停用部署拒绝新请求为 503。跨调用方查询返回 404。相同服务、环境、操作、调用方与幂等键的相同输入返回同一个 Run；输入不同则冲突。切换版本后重试原键仍返回原运行。

### MCP

每个业务操作直接成为工具，业务参数不再套 `projectId/arguments/workflowId`。运行元数据位于保留字段 `_flowgram`：

```json
{
  "name": "fulfill_order",
  "arguments": {
    "order": {"id":"ERP-1001","customerId":"C1","sku":"A","quantity":2,"amountMinor":12900},
    "_flowgram": {"idempotencyKey":"erp-order-1001","waitMs":30000}
  }
}
```

长任务返回运行句柄，用 `flowgram_get_run` 查询；只有获得取消授权的调用方才能发现并调用 `flowgram_cancel_run`。工具返回结构化运行结果，业务输出在 `structuredContent.outputs`。没有声明 MCP Tasks 扩展，不能把运行句柄误认为协议 Tasks。

已用官方 MCP Python SDK 实测无握手的 2026-07-28 HTTP、兼容初始化的 HTTP 和 stdio 桥接。支持的 HTTP 协议版本为 2025-03-26、2025-06-18、2025-11-25、2026-07-28；新版本校验协议元数据和路由头。服务不声明 Resources、Prompts、Sampling 或订阅扩展。远程接入当前使用显式 Bearer 配置；尚未提供 OAuth 登录／发现和公共工具市场接入流程。

stdio 只转发到指定业务 MCP 地址，不再启动第二套调度器或数据库：

```sh
FLOWGRAM_SERVICE_TOKEN=... flowgram-service stdio https://workflow.example.com/v1/services/order-fulfillment/production/mcp
```

## 独立部署

构建 `cargo build --release -p flowgram-desktop-backend --bin flowgram-service`。桌面安装包也携带 `flowgram-service`，但服务器执行无需启动 Tauri。

使用专属运行目录，避免与编辑工程争用锁。首次离线准备：

```sh
export FLOWGRAM_SERVICE_DATA_DIR=/var/lib/flowgram/orders
flowgram-service import ./order-fulfillment-1.0.0.flowgram-service.json
flowgram-service deploy ./deployment.json
flowgram-service key order-fulfillment production ./consumer.json
flowgram-service serve
```

`key` 仅在创建时输出一次令牌，数据库只保存令牌哈希。在线服务占用数据目录时，不另开 CLI 进程管理相同目录；启用独立管理入口，在同一宿主更新发布和部署：

- 设置 `FLOWGRAM_SERVICE_ADMIN_TOKEN`（至少 32 字节），启用 `/admin/status`、`/admin/releases`、`/admin/deployments` 和 `/admin/consumers/...`。
- 管理入口使用独立管理凭证；业务消费凭证不能导入、升级或发放权限。未设置管理令牌时没有管理入口。
- `POST /admin/releases` 上传导出的 JSON 发布包；`POST /admin/deployments` 激活或回滚已有版本；不会中断已有运行。
- 默认监听 `127.0.0.1:18790`。服务器或容器可显式设置 `FLOWGRAM_SERVICE_BIND`；HTTPS 与公网入口由部署方网关提供。

```json
{
  "service":"order-fulfillment",
  "environment":"production",
  "version":"1.0.0",
  "enabled":true,
  "maxConcurrency":8,
  "bindings":{"businessApi":"https://erp.example.com"},
  "callback":null
}
```

```json
{"name":"ERP backend","operations":["fulfill_order","fulfill_batch"],"canCancel":true}
```

容器文件为 `apps/desktop-backend/Dockerfile` 和 `compose.services.yaml`。持久卷保存独立数据，模型与签名密钥通过环境配置，不进入镜像或发布包。当前验收使用相同 Rust 可执行程序在独立进程运行；容器启动尚未实测。

## 配置与凭证

操作的 `bindings` 把根输入字段映射到部署配置名，例如 `{"apiBase":"businessApi"}`。发布表单会从公开输入中移除映射字段，调用方无法覆盖服务地址。普通映射仅用于非敏感配置。

- 模型：独立宿主读取 `FLOWGRAM_MODEL_BASE_URL`、`FLOWGRAM_MODEL`、`FLOWGRAM_MODEL_API_KEY`。
- HTTP 节点：静态 `inputsValues.credentialEnv` 引用 `FLOWGRAM_CONNECTION_...` 环境变量；可配置 `credentialHeader`（默认 Authorization）和 `credentialPrefix`（默认 `Bearer `）。发布包保留槽位名，部署前检查主机是否已配置。
- 已发布 HTTP 节点拒绝常量认证请求头。密钥在发起 HTTP 请求时注入，不写入流程输入；响应回显中的同一密钥会脱敏。HTTP 不自动跟随重定向，Cookie 等认证响应头不会成为输出变量。

现有文件资源不是任意远程文件存储；当前产物下载提供业务 JSON。大文件对象存储、签名下载链接和按时清理尚未实现。

## 执行与回调保障

输入与输出均执行 JSON Schema 校验。超时、并发、权限和幂等在 Rust 服务中执行，两个传输入口共用实现。接受请求后，即使 HTTP 客户端断开，已提交的运行仍由服务执行。

完成回调由部署管理员配置，不允许每次业务请求任意指定地址。持久化投递表从终态运行生成完成事件，失败按指数退避重试，最多 10 次。`eventId=run:<runId>:finished` 在重投中保持不变。接收方按 eventId 去重，并校验：

```text
X-FlowGram-Signature = sha256=<HMAC-SHA256(secret, timestamp + "." + raw_body)>
X-FlowGram-Timestamp = Unix seconds
```

签名密钥来自 `callback.secretEnv` 指定的主机环境变量；接收方应检查时间窗口并采用恒定时间比较。发送端不跟随回调重定向。投递状态、尝试次数和最近错误可在服务调用记录中查看。

进程重启后，执行中的运行标记为 interrupted，保留已完成事实；同键重试查询原运行，不擅自重放副作用。回调投递记录可在重启后继续扫描。当前没有跨进程断点续跑、通用补偿事务或任意下游的 exactly-once 保证。

## 实证

`validation/published_services.py` 发布已有订单、采购、客服工程，导出／导入到独立宿主，再通过 HTTP 执行业务断言。`mcp_consumer.py` 使用官方 SDK 验证三种 MCP 消费方式。`service_lifecycle.py` 验证运行中升级、回滚、桌面关闭后运行、主机凭证注入与回显脱敏、签名回调故障重投、取消、宿主重启及幂等重放保护。

原始证据位于 `.flowgram-local/service-validation/` 下的 `acceptance.json`、`mcp-sdk-acceptance.json`、`lifecycle-acceptance.json`。凭证保存在独立、受限权限的本机连接文件中，不写入这些报告。

## 部署控制台

全局控制接口位于 `/api/deployment`，由设备管理授权保护，不要求 `X-FlowGram-Project`。全局目录保存在应用数据目录 `deployment.sqlite`，包含发布草稿、版本说明、运行目标及凭证；发布配置绑定具体 projectId，工作流定义与不可变发布包仍由对应项目 Store 管理。`/publications` 创建或返回该项目唯一配置；`/{id}` 保存草稿，`/{id}/publish` 冻结版本并部署，`/{id}/deploy` 将已有版本启用、停用或回滚到目标。部署失败时版本保留，可在版本详情重试，不覆盖已有版本。草稿不修改当前部署。

`/credentials` 管理共享业务连接凭证或运行服务管理凭证，范围为全部项目或显式项目列表；响应从不包含密钥，留空更新保留原密钥。文件及 SQLite 初始权限为 0600，原型使用受限本机文件存储，尚未接入操作系统钥匙串。发布包和项目内绑定只包含槽位及引用。调用方消费凭证继续按发布目标和公开工作流授权，与业务连接凭证分别表达。

`/targets` 配置独立服务的 HTTPS origin 与管理凭证（loopback 调试允许 HTTP），`/{id}/probe` 校验实际管理连接；不跟随重定向。Rust 管理端导入发布、配置目标的凭证引用，然后启用版本；浏览器不直接持有远程管理令牌。独立宿主新增 `/admin/connections`、`/admin/credentials/{id}` 和 `/admin/services/{service}/{environment}` 供授权管理使用。

运行服务上的业务凭证按来源项目隔离命名，避免同一全局凭证用于多个项目时互相覆盖授权。轮换或修改项目范围会向所有已登记远程部署传播；持久队列在服务不可达时重试，界面明确显示待同步，不能把离线目标视为已完成撤权。运行时再次检查引用凭证的用途和项目范围；每次运行固定槽位引用，后续部署不改变已接受运行的映射。环境变量方式继续用于独立命令行部署。

验证覆盖：跨项目全局列表、草稿和多版本保持单卡片、Rust 拒绝越权、密钥不进入 API/发布包、执行时注入及回显脱敏、范围收回、远程目标真实调用与消费凭证撤销、同一凭证跨项目远程隔离与范围同步、失败部署可重试。


## Model bindings

AI nodes use `data.model = {modelId?, parameters?}`. A release contains these non-secret requirements, not the device catalog or its credentials. Deployment `modelBindings` maps each required slot (the explicit source model entry ID, or `workflow-default`) to a model entry ID on the target runtime. Deployment validates project credential grants, tools for Agent nodes, and each node's parameter overrides. Every invocation pins the deployed connection and base model parameters, then applies that node's overrides. Desktop catalog edits and default changes do not modify existing deployments or active runs; redeploy explicitly to adopt changes.

The desktop target-model inventory is `GET /api/deployment/targets/{id}/models?projectId=...`. Standalone hosts expose metadata at authenticated `GET /admin/models` only when administration is enabled. Configure host models through `flowgram-service model-connection <connection.json>`, `model <model.json>`, `model-defaults <defaults.json>` and inspect with `models`. Files use the same model DTOs as the desktop API. `FLOWGRAM_MODEL_BASE_URL`, `FLOWGRAM_MODEL`, and `FLOWGRAM_MODEL_API_KEY` provision a Responses connection into the host catalog; select the returned entry ID explicitly in deployments. Secrets stay on the target. Model snapshots in private runtime tables never enter release bundles, project export packages, tool results, or public run responses.

Protocol references: [Responses streaming](https://developers.openai.com/api/docs/guides/streaming-responses), [function calling](https://developers.openai.com/api/docs/guides/function-calling), [Anthropic streaming](https://platform.claude.com/docs/en/build-with-claude/streaming), [structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs). These describe wire formats; capability declarations and invocation tests determine availability for a particular configured service.
