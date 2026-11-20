# FlowGram Rust Backend

独立的本机 HTTP 服务，实现项目、会话、工作流、Agent 模型循环、Workflow Runtime、共享工具和 MCP Server。该 crate 不依赖 Tauri、React、Node.js 或浏览器。

```sh
cargo run -p flowgram-desktop-backend --bin flowgram-server
cargo clippy --locked -p flowgram-desktop-backend --all-targets -- -D warnings
cargo test --locked -p flowgram-desktop-backend
```

默认监听 `127.0.0.1:18789`。可配置 `FLOWGRAM_PORT`（设为 0 让系统分配端口）、`FLOWGRAM_DATA_DIR`、`FLOWGRAM_AUTH_TOKEN`。未指定令牌时，每次启动生成新的随机令牌。数据目录由文件锁保护，仅允许一个服务拥有。

应用数据目录包含 `projects.json`（已打开工程目录）、`model.json` 和 `connection.json`；凭证与连接文件在 Unix 上以 0600 权限写入。每份工程包含 `flowgram.project.json`、`workflows/<workflowId>/workflow.json`、`assets/` 和 `.flowgram/state.sqlite`。工作流文件是定义源，SQLite 中的工作流记录用于索引和运行关联。不要将应用数据目录或工程 `.flowgram/` 提交到版本管理。服务启动移除旧原型 `flowgram.sqlite` / `flowgram.db`，保留模型配置。

## API

除 `GET /health` 外均要求 `Authorization: Bearer <token>`。真实地址和令牌从当前数据目录的 `connection.json` 读取。模型密钥不通过读取 API 返回。工程内接口必须显式发送 `X-FlowGram-Project: <projectId>`，不根据全局 UI 选择猜测范围。无该头的 bootstrap 只返回工程列表；带头时额外返回该工程的会话、流程与运行。模型设置、工程注册和 MCP 是应用级接口；MCP 工具参数必须显式携带 projectId。

| 方法 | 路径 | 用途 |
| --- | --- | --- |
| GET | /api/bootstrap | 项目、会话、工作流和最近 100 次运行 |
| POST | /api/projects/initialize | 首次空白工作区初始化普通示例项目，`{locale}`（`"en"` 或 `"zh-CN"`）；幂等，已登记过项目不再填充 |
| POST | /api/projects | 创建工程，`{name,directory?}`；目录需为空 |
| GET | /api/projects/{id} | 查看项目元数据与对象数量，无需切换当前项目 |
| PUT | /api/projects/{id} | 重命名，`{name,expectedName}`；保留身份和目录，拒绝过期名称 |
| DELETE | /api/projects/{id} | 永久删除整个项目目录，`{confirmationName}` 必须精确匹配完整名称 |
| POST | /api/projects/open | 打开已有工程，`{directory}` |
| POST | /api/projects/{id}/export | 导出项目包，`{includeHistory?:true,destination?}`；无保存路径返回包 JSON，有路径原子写入 `.flowgram.json` 并返回 `{saved:true}` |
| POST | /api/projects/import | 校验并导入项目包，`{package,name?,directory?,modelBindings?}`；`directory` 为保存位置，在其中新建独立项目文件夹，成功返回新项目 |
| GET | /api/archives | 跨项目归档清单，返回 `items`、项目列表与不可访问项目的错误 |
| POST | /api/sessions/{id}/archive | 归档会话并暂停队列，要求显式项目范围 |
| POST | /api/workflows/{id}/archive | 归档工作流，执行中的依赖不可归档 |
| POST | /api/archives/{kind}/{id}/restore | 恢复 `session` / `workflow`，要求显式项目范围 |
| DELETE | /api/archives/{kind}/{id} | 彻底删除已归档对象，执行范围、运行状态和引用约束由 Rust 校验 |
| GET / POST | /api/resources | 列出 / 导入项目共享文件（每个文件最多 1 MB） |
| POST | /api/sessions | 创建会话 |
| GET | /api/sessions/{id}/references | 会话实际引用与工具操作关联的工作流 |
| GET | /api/sessions/{id}/conversation | 轮次、内容、待办与事件水位，before 分页 |
| POST | /api/sessions/{id}/inputs | 幂等投递下一轮或补充本轮 |
| PUT | /api/sessions/{id}/inputs/{input} | 按 revision 编辑未执行输入 |
| POST | /api/sessions/{id}/inputs/{input}/cancel | 按 revision 移除未执行输入 |
| POST | /api/sessions/{id}/inputs/{input}/steer | 按 revision 将待办补充给指定轮次 |
| POST | /api/sessions/{id}/turns/{turn}/stop | 请求停止指定轮次及它发起的运行 |
| POST | /api/sessions/{id}/queue/resume | 明确继续已暂停的待办 |
| POST | /api/workflows | 创建工作流 |
| GET / PUT | /api/workflows/{id} | 读取 / 按预期 revision 保存 |
| POST | /api/workflows/{id}/validate | 结构与执行能力诊断 |
| POST | /api/workflows/{id}/run | 试运行，输入 `{inputs,sessionId?}` |
| GET | /api/runs/{id} | 运行结果与节点事件 |
| POST | /api/runs/{id}/cancel | 请求取消运行 |
| GET | /api/events | 有序 SSE，支持 after、objectId 与 Last-Event-ID |
| GET | /api/events/history | 事件查询，支持 after、objectId；每页最多 500 项 |
| GET / PUT | /api/settings/model | 连接状态 / 模型配置 |
| GET | /api/tools | 工具定义 |
| POST | /api/tools/call | 调用共享工具 |
| POST | /mcp | MCP JSON-RPC |

PUT 工作流输入 `{revision,name,schema}`。版本不匹配返回 HTTP 409。模型配置输入 `{baseUrl,model?,apiKey?}`；省略模型或密钥会保留已有值。

项目删除使用应用级变更锁及项目执行锁，阻止执行中任务、启用部署及包含应用数据或其他已登记项目的目录被删除。删除前关闭项目写入与投递 worker，旧请求不能重新创建目录。工程先移入同级临时目录，再更新注册表；持久化失败恢复原目录及可用 Store，进程中断则在下次启动任何项目 worker 前根据删除日志恢复或清理。项目发布记录与凭证的项目授权一并清理，保留其他项目、全局凭证和模型连接。

示例初始化由前端首次连接时显式请求，不由 `Registry::open` 或独立运行服务自动创建。检查从未写入的注册表与空工程目录，在应用变更锁内生成暂存工程，完成后移动并一次提交注册表；完成标记支持移动后的中断恢复，未完成的暂存内容可重建。普通服务端数据模型中不增加示例标识或只读规则。预置讲解写入现有 Turn / Item / Input，工具调用与运行通过共享 Workflow Tools 执行，结束后无运行中轮次、待办队列或自动模型请求。

## 对话与运行中输入

对话只使用 Turn / Item / Input 一套存储和协议；原型阶段已移除旧消息表与旧消息接口，不保留旧测试数据的迁移或兼容展示。清理不兼容测试数据时保留模型连接配置。

常规操作由工具状态表达进度，模型不逐次报幕；关键发现、阻塞、需要用户补充和最终结果才产生说明。跨轮上下文读取用户输入、最终答复与结构化工具事实，过程说明仅保留在所属轮次供回看，不作为后续对话的示范文本。

`POST inputs` 使用 `{clientInputId,content,deliveryMode:"queue"|"steer",expectedTurnId?,references?}`。同一会话中，相同标识和内容重试返回原输入；改变内容或目标轮次返回 409。响应表示服务已保存输入，不表示执行完成。`references` 当前支持同项目的 `workflowId`。

每个会话由 Rust 串行派发轮次；会话之间可以并行。`queue` 创建后续轮次；`steer` 必须指定仍在运行的目标，不会在目标结束后自动改成下一轮。补充输入先为 pending，在模型返回或下一次工具执行前的安全边界转为 accepted；尚未开始的旧工具调用会取消，由模型按新要求重新规划。已经开始的操作不会回滚。

Turn 状态为 running → stopping → interrupted，或 running → completed / failed。Tool Item 在同一 ID 上依次保存 drafting、pending、running 和 completed / failed / cancelled；服务重启时无法确认的执行中工具标为 uncertain。流式助手文本从追加到最终回复保持同一 ID。工具 `run_workflow` 完成仅表示已发起运行，运行本身另有持久化状态。

SSE 的 `conversation_turn`、`conversation_item`、`conversation_input` 推送完整对象和递增 revision，`conversation_queue` 推送暂停状态。客户端先读取快照和 watermark，再订阅该会话在水位之后的事件，重连时重新读取快照。每页最近 10 轮，每轮最多 128 项；工具详情为脱敏、有长度上限的预览。

停止由服务确认：只取消本轮和与本轮显式关联的运行，保留部分回复、工作流修改与运行记录。失败或中断暂停后续待办；用户明确继续后才派发。重启不会重放已开始的工具或外部副作用；未开始输入仍保留。询问、审批和检查点恢复尚未接入本轮协议。

## 外部 Agent 接入

MCP 使用本机 HTTP 地址 `<endpoint>/mcp`，并在 HTTP Authorization 头中设置连接令牌。支持初始化、工具发现与工具调用；当前实现为无状态 JSON-RPC，不提供 MCP 会话恢复、外部资源或提示词服务。

`tools/list` 返回项目作用域包装后的工具参数。调用时显式传入项目 ID：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "list_workflows",
    "arguments": { "projectId": "project-id", "arguments": {} }
  }
}
```

工具契约统一定义在 [workflow-tools.json](catalog/workflow-tools.json)，共 23 个工具。内置 Agent 初始加载 8 个常用工具，其余通过 `search_tools` 按需加载，加载状态随会话检查点恢复。创作 MCP 通过标准 `tools/list` 游标分页提供完整清单。

工作流读取使用 `read_workflow` 的 summary / outline / nodes / fields 视图；修改使用 `edit_workflow` 的 18 种原子操作，携带 `expectedRevision` 和 `mutationId`。不再暴露整图覆盖工具。参数、文本、分支、连线和集合行分别定位修改；事务校验失败时零写入。规范文件与 SQLite 通过持久化意图日志恢复，手动 UI 保存复用同一个校验和提交内核。

`read_run`、`list_run_steps`、`read_run_step` 和 `read_run_events` 分离状态、执行实例、数据及事件；`read_tool_result` 按对象字段、数组元素或 Unicode 文本分页。引用和游标固定读取快照，默认保留七天。运行与测试在创建 run 的同一个事务中保存幂等回执；运行中的 Agent 只允许读取该次运行冻结的依赖与模型绑定。

完整契约及例子见 [Agent Workflow Tools](../../design/agent-workflow-tools.md)。

模型目录位于全局 `deployment.sqlite`，支持多个连接及每连接多个模型。协议为 Responses、Chat Completions 和 Anthropic Messages；支持流式文本、工具调用和非流式工作流模型。读取 `/api/settings/models` 返回元数据、默认模型与当前版本的测试结果，不返回密钥。旧 `model.json` 只在首次初始化目录时导入，之后以目录为准。

连接与模型分别通过 `/api/settings/models/connections`、`/api/settings/models/entries` 创建，按 ID 更新或删除，更新必须提供最新 revision。模型发现 `POST .../connections/{id}/discover` 只读取模型列表；`POST .../entries/{id}/test` 通过 `{tools:false|true,projectId?}` 执行文本或完整无副作用工具往返测试。实际观察到的流式与工具能力会更新到模型条目，模型、连接或凭证变化使旧测试记录失效。其他能力按服务文档显式声明，不能依据名称推断。

`PUT /api/settings/models/defaults` 设置 `{chat,workflow,revision}`，值为模型条目 ID。节点的 `data.model` 和聊天输入的 `model` 使用 `{modelId?,parameters?}`；可覆盖 temperature、topP、maxOutputTokens、reasoningEffort、outputSchema，仅接受声明支持的参数。聊天要求流式和工具调用，LLM 节点只要求文本；Agent 节点额外要求工具调用。每次输入在提交时固定连接、模型、参数，整轮工具循环使用同一配置；整个工作流及依赖在运行创建时固定配置。

连接引用全局 connection 凭证，项目授权在解析和每次请求时检查，撤销授权会阻止后续调用。删除前检查默认模型、会话、工作流、队列、活动执行和部署引用；历史记录独立保留安全标签。导出包含选择和执行标签，排除私有运行快照、连接地址和凭证。导入 `modelBindings` 将原模型条目 ID 映射到本机条目，未绑定项目可导入，但执行前必须选择有效模型。

工作流内 Agent 节点使用指定的模型和相同工具定义，以 1–8 步完成目标；允许列出、读取、校验工作流、读取运行与节点目录。该节点不暴露创建、保存或执行工作流工具，避免修改正在运行的流程或形成递归副作用。

## 执行语义

工作流 JSON 使用 FlowGram 的 `nodes`、`edges`、`sourceNodeID`、`targetNodeID`；条件边通过 `sourcePortID` 选路。输入常量、变量引用、模板放在节点 `data.inputsValues` 中。Start 输出运行输入，Assign / End 输出解析后的字段。

Loop 子图使用 `blocks`、`edges` 和一组 `block-start` / `block-end`。`data.loopFor` 解析为数组，局部变量位于 `<loopId>_locals.item` / `index`，`data.loopOutputs` 引用子图输出并逐项收集为数组。

每次运行保存 revision 和输入、结果与事件。运行保存执行时的主流程定义，单节点测试保存该节点定义与绑定。子工作流传递依赖和外部资源尚未整体冻结，运行记录不能视为可复现的发布版本。重启后未完成的运行标记为 interrupted；不会自动重试或继续外部副作用。

## Published business services

The authoring API now publishes immutable service releases, pins transitive workflow dependencies, and manages local deployments and scoped consumer credentials. Business HTTP and MCP endpoints share invocation, idempotency, validation, cancellation and result semantics. The existing development MCP remains separate from the published business tools.

`flowgram-service` is a second, standalone Rust binary for importing and serving bundles without the desktop app or source project. It also provides a stdio MCP bridge. See [service publishing and consumption](../../design/workflow-service-delivery.md) for routes, contracts, host configuration, live upgrades, callback signatures, Docker configuration and verified limitations.

### Inline workflow references

Conversation input `references.workflows` is an ordered array of `{workflowId, name, start, end}`. Offsets use UTF-16 code units into the exact, untrimmed `content`; each range must equal `@${name}`. Multiple and repeated references are supported, with at most 32 labels per message. IDs must resolve inside the conversation project. Submit and queued-input edit use the same validation; edits send `references: null` to remove all labels. The Agent receives the ordered IDs and offsets alongside the original message. Plain `@text` is not automatically a workflow reference.
