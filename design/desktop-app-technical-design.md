# FlowGram 桌面技术方案

FlowGram 是围绕 Workflow 构建的桌面 Agent 工作台。产品以真实项目工程组织工作流和资源，通过会话与画布完成搭建、执行和复用。工程目录、对象归属、依赖快照、结果存储和清理规则以 [项目工程与 App 信息架构](agent-workflow-app-information-architecture.md) 为准。

前后端独立。后端使用 Rust，实现 Agent Runtime、Workflow Runtime、Workflow Tools、持久化和 MCP。前端使用 React，Tauri 提供桌面集成。后端无需启动 UI 即可运行和测试。

本方案定义目标架构。已实现的第一阶段范围与运行方式见 [桌面应用说明](../apps/desktop/README.md)；架构中尚未完成的能力不能视为当前功能。

## 技术选择

| 层次 | 选择 | 职责 |
| --- | --- | --- |
| 桌面壳 | Tauri 2 | 窗口、菜单、托盘、原生对话框及打包 |
| 界面 | React 19 目标版本、TypeScript、Vite | 项目工程导航、对话、画布、结果与设置 |
| UI | Tailwind CSS 4、shadcn/ui、Lucide React | 主题、基础控件与图标 |
| 前端状态 | Zustand、TanStack Query | 界面状态、服务查询和缓存 |
| 长列表 | TanStack Virtual | 会话与历史记录的有界渲染 |
| 导航与正文 | React Router、react-markdown、remark-gfm | 对象定位、恢复和消息展示 |
| 画布 | 现有 FlowGram 画布、表单与变量引擎 | 节点编排、配置和编辑反馈 |
| 后端 | Rust stable、Tokio、Axum 0.8 | 独立应用服务、API 和异步执行 |
| 数据与错误 | Serde、thiserror、tracing | 协议序列化、结构化错误和诊断 |
| 模型访问 | Rust reqwest 与 Provider Adapter | 流式模型请求、工具调用及取消 |
| Agent Runtime | FlowGram Rust 实现 | 模型循环、上下文、工具调度与运行限制 |
| Workflow Runtime | FlowGram Rust 实现 | 图校验、变量解析、节点调度与恢复 |
| Workflow Tools | Rust Tool Registry 与业务服务 | 手动操作、Agent 和 MCP 的共享能力 |
| 外部接入 | Rust MCP Server 与 MCP Client | 对外开放能力、调用外部工具 |
| 存储 | SQLx、SQLite 与项目文件 | 会话、事件、运行、审批、工作流与产物 |
| 契约 | OpenAPI 与 JSON Schema | 公开 API、工具参数和生成的 TypeScript 客户端 |
| 验证 | Rust tests、Vitest、Testing Library、Playwright | 后端语义、组件和端到端流程 |

前端采用客户端渲染。桌面壳与 Rust 后端分别构建，安装包携带后端可执行文件。[Tauri 外部程序分发](https://v2.tauri.app/develop/sidecar/)

## 应用边界

```text
React Frontend
    │ HTTP API + 事件流
    ▼
Rust Backend
    ├── Project Repository / Session / Workflow Services
    ├── Agent Runtime
    ├── Workflow Runtime
    ├── Workflow Tools
    ├── MCP Server / Client
    └── SQLite / Project Files

Tauri Desktop Shell
    ├── 窗口、菜单、托盘、文件选择与外部打开
    └── 启动和托管 Rust Backend
```

后端不依赖 React、WebView 或 Tauri。业务模块接收明确的数据与执行上下文，测试不需要窗口、UI store 或 AppHandle。Tauri 只负责桌面集成和本应用后端进程的生命周期。

前端业务请求直接使用公开 HTTP API；事件以带序号的 SSE 推送。桌面原生操作通过薄适配接口访问，项目和执行能力不以 Tauri Commands 作为唯一入口。浏览器开发客户端与桌面客户端使用同一套业务 API。

桌面启动时获取当前后端地址及授权信息。默认监听本机环回地址，校验客户端授权和 Origin；前端只能获得应用 API 的访问凭证，模型密钥留在后端。API 访问控制不依赖 UI 按钮是否可见。

Rust 后端可独立以服务模式启动，明确配置监听地址、数据目录和模型连接。多个客户端连接同一服务时，共享一套调度器和状态存储。后端不会等待画布挂载才执行工具，也不调用前端来完成业务校验。

## Agent Runtime

Agent Runtime 在 Rust 中实现最小模型与工具循环：

```text
接收输入 → 构建上下文 → 流式请求模型
                         ├── 最终回答 → 结束本轮
                         └── 工具调用 → 校验与授权 → 执行 → 写入结果 → 下一轮
```

模型适配层把各提供方的文本、工具调用、结束原因和用量转换为统一事件。首版先接入开发环境提供的兼容模型端点，按实际支持验证流式和工具调用能力。

Runtime 管理消息上下文、执行步数、超时、预算和取消信号。工具参数先完成解析和 schema 校验，再进入统一授权与执行服务。工具错误作为结构化结果返回模型；不以无限重试维持循环。

等待补充输入或审批时先持久化状态，释放占用资源。授权用户的决定写入原执行，再继续后续动作。运行恢复以已保存的步骤和工具结果为依据，避免重新执行已完成的业务写入。

Agent 节点与项目会话共用这套 Runtime，通过执行上下文区分所属项目、会话、工作流及节点。职责、模型、工具和输出要求来自版本化配置。

## Workflow Runtime

Workflow Runtime 全部由 Rust 实现。现有 JavaScript 运行时用于对照工作流定义、行为和测试数据；桌面后端的执行链路不依赖 JavaScript Runtime。

首版实现以下模块：

- Schema 解析与结构校验，包括节点、端口、边、子流程及版本。
- 变量与表达式解析，包括节点输出、作用域、类型与输入映射。
- 调度器，包括依赖就绪、条件分支、并发汇合、显式循环与取消。
- 节点执行器注册，包括 Start、End、Condition、HTTP、LLM、Loop 和 Agent。
- 执行状态，包括运行、节点执行、重试、等待、失败和完成。
- 持久化与恢复，包括检查点、工具结果、审批和子执行引用。

工作流按新工程文档格式和节点契约读取。原型旧数据库和旧文档格式不提供兼容读取；导入是显式的工程/依赖包操作。尚未支持的节点在校验和运行前返回具体诊断，不能静默跳过。Runtime 只消费已完成依赖解析的 Execution Manifest，不在执行中重新读取工作副本或查找最新子流程。

Code 节点等需要额外执行环境的能力单独设计隔离与资源限制。基础节点闭环通过后再纳入可执行范围，不能以用户脚本直接访问后端内部状态。

设计节点 ID 与执行实例 ID 分开。循环、重试和 Agent 内部工具调用分别生成执行实例，并保留父子关系。普通业务图维持明确的控制流，Agent 的动态循环封装在 Agent 执行单元内部。

## Workflow Tools

Workflow Tools 是 Rust 业务能力的统一调用入口，内部 Agent、外部 MCP 和前端操作共用实现。

完整工具契约与替换设计见 [Workflow Tools：渐进式读取与精细化编辑](agent-workflow-tools.md)：列表和读取默认摘要，按需展开节点与运行数据；Agent 通过稳定 ID 和原子操作精确修改，不再提交完整工作流 JSON。该文档目前为设计，尚未实现。

| 能力 | 操作 |
| --- | --- |
| 读取 | 查询工作流结构、节点配置、输入输出和物料定义 |
| 编辑 | 新建草稿、批量修改节点与连线、撤销变更 |
| 校验 | 校验结构、表单数据、变量引用与运行输入 |
| 执行 | 试运行或执行发布版本，返回运行 ID |
| 追踪 | 分页查询事件、节点结果和产物 |
| 控制 | 取消、补充输入、提交审批决定与恢复 |
| 复用 | 发布版本并作为 Agent 工具引用 |

工具定义包含说明、输入输出 schema、读写性质、作用范围和审批策略。调用上下文绑定已打开的项目工程实例、可选会话与轮次、调用者、权限、预期文档标识和取消信号。

前端表单与变量引擎提供即时编辑反馈，Rust 后端完成权威校验。与自定义节点相关的运行规则以数据契约或后端执行器表达，不依赖前端组件回调。

编辑提交进行版本校验，以整组变更为单位保存。Agent 和手动操作并发修改时返回明确冲突。高影响工具通过后端审批和幂等机制约束，MCP 调用不能绕过这些规则。

## MCP 接入

Rust MCP Server 暴露共享工具，Rust MCP Client 接入外部工具，两者分别配置。外部客户端调用与桌面手动操作关联到相同的工作流、版本和执行记录。

本机 stdio 接入可由轻量桥接进程连接已有 Rust 服务；桥接不创建第二套数据库或调度器。需要 HTTP MCP 时，作为同一后端的独立入口启用并鉴权。

外部编辑通过后端提交模型变更，事件同步到打开的画布。外部运行直接进入执行历史，无需建立虚假的用户对话。

## 状态与数据

工程清单、workflows 资源包、assets、非敏感 config 与完整 releases 发布包位于项目根目录，可被 Git 管理及独立导出。工作流定义以文件为权威，目录和 ID 索引可重建；不在全局 SQLite 中保存另一份可独立修改的最新工作流。

每个工程的 .flowgram/state.sqlite 保存会话、Turn/Item、队列、Run、NodeExecution、事件及内容引用。历史属于工程，删除这份数据库会丢失本地会话与执行记录，不能将其整体当作缓存。大输入输出、不可变执行快照及产物字节由 .flowgram/objects 保存，数据库保留受大小限制的内联值或内容引用。

工程发布包具备完整传递依赖，不能引用仅存在于本机 .flowgram 的对象。每次运行固定主流程、子流程、资源、非敏感配置及运行时契约；每次子流程调用有独立子运行身份。连接声明与设备绑定分离，凭证留在本机配置或系统凭证存储。

Project Repository 负责带预期内容标识的文件事务、持久化意图、原子替换与索引对账。文件系统与 SQLite 不具有天然的联合原子性；启动恢复完成后才接受新操作。浏览器 sessionStorage 只能用作设备临时缓存，不能承担工程草稿或有效编辑的权威存储。

前端 store 保存界面所需的最小状态。历史分页加载，事件按 ID 与序号去重。重连后从已知序号恢复事件；后端保留不足时返回需要重新同步的明确状态。项目注册、语言主题与视图偏好属于设备存储；共享节点布局属于工作流文档，视口和选中状态不进入执行定义。

工具调用的意图、幂等键和结果持久化。外部系统调用和数据库提交不能天然保证原子性；中断后通过工具的查询或对账能力决定继续、重试或标为待处理。工作流和依赖的版本冻结保证执行定义可追溯，不承诺模型与外部服务响应完全确定。

旧模型切换时清理旧原型工程、会话、工作流、执行和对象缓存，不做迁移、双写或隐式兼容。保留模型连接、凭证和无关设备偏好，具体范围与完整验收以项目工程方案为准。本轮不执行数据清理。

## 桌面生命周期

关闭窗口由托盘保留宿主与后端运行。真正退出时明确处理正在进行的轮次与运行；独立启动的后端采用自己的服务生命周期。桌面端只停止自己启动并拥有的进程。

重新打开窗口只恢复视图并订阅状态，不重复启动轮次或运行。进程异常退出后，Rust 后端从持久化状态恢复支持续跑的步骤，其余明确显示中断及已完成操作。

普通用户只需安装桌面应用。前端构建所需 Node 和 pnpm 属于开发工具链，产品运行不要求用户安装 Node。

## UI 与命名

UI 通过项目选择器进入当前工程，侧栏按工作流、会话、运行记录、资源和项目设置组织。工作流、会话和运行是独立文档类型，可在同一工作区关联打开；工作流编辑不要求先创建会话。运行详情、会话成果卡与底部结果面板引用同一份执行数据。

基础控件统一使用 shadcn/ui；布局和外观优先使用 Tailwind，必要的第三方覆盖使用 CSS Modules。主题 token 管理颜色、字号和间距，交互文案通过国际化键组织。

产品、文档、窗口标题、安装包、包名和服务标识使用 FlowGram 自有命名。设计资料不包含内部工具名称、参考仓库路径、私有包或私有服务地址。公开依赖保留必要的名称和许可信息。

## 仓库落地

前端桌面应用与 Rust 后端放在独立目录，各自构建和测试。后端 CLI 与 API 可独立使用，桌面安装包分发后端可执行文件。

```text
apps/
├── desktop/
│   ├── src/                  React UI 与 API client
│   ├── src-tauri/            桌面集成
│   └── package.json
└── desktop-backend/
    ├── Cargo.toml
    └── src/
        ├── api/
        ├── application/
        ├── agent-runtime/
        ├── workflow-runtime/
        ├── workflow-tools/
        ├── mcp/
        └── storage/
```

以上为概念模块目录，Rust 文件与标识按 Rust 惯例使用 snake_case。首版在单个后端 crate 内分模块，避免提前拆成大量包。纯业务模块不依赖 HTTP、MCP 或 Tauri，传输适配调用应用服务。

继续使用现有 Rush 与 pnpm 10.6.5 管理前端，不引入第二套 JavaScript workspace。原生壳与后端通过 Cargo workspace 管理，Rust 构建检查通过应用脚本接入现有工程命令。

Rust 中定义 API DTO 和公开 schema，生成 TypeScript 客户端与类型。前后端通过版本化契约协作，不共享 UI store 或业务实现。

## 实现验证

1. 脱离 UI 启动 Rust 后端，通过 API 创建项目、编辑工作流并执行基础节点。
2. 在 Rust 测试中验证分支、循环、并发、变量作用域、失败和取消语义。
3. 实现 Agent 最小工具循环，分别用前端、内置 Agent 和 MCP 调用同一工具并比较结果。
4. 验证 API 事件续接、等待审批、进程中断、重启恢复和重复提交。
5. 用 Tauri、React 19 与 Vite 加载现有画布，验证表单、变量、拖拽、撤销、插件和卸载。现有物料根节点适配及 Less、legacy decorators 处理需单独验证。
6. 在安装包中验证前端、桌面壳和后端的启动、退出与窗口恢复。

React 19 作为目标版本，在画布和表单兼容性验证通过后锁定。peer 范围允许安装不代表运行兼容。[React 19](https://react.dev/blog/2024/12/05/react-19)

本轮交付工程模型与信息架构设计；上述列表是目标验证范围。已有原型能力不代表新工程存储、发布依赖包和迁移替代已经实现。

## 相关资料

- [FlowGram PC App 信息架构](agent-workflow-app-information-architecture.md)
- [Tauri 进程模型](https://v2.tauri.app/concept/process-model/)
- [Tauri 外部程序分发](https://v2.tauri.app/develop/sidecar/)
- [Axum](https://github.com/tokio-rs/axum)
- [SQLx](https://github.com/transact-rs/sqlx)
- [Tailwind 与 Vite](https://tailwindcss.com/docs/installation/using-vite)


## Complex-project acceptance (2026-10-19)

The desktop service now freezes the static transitive workflow dependency closure before execution. The root definition and every called workflow are persisted with each Run; node tests use the same rules. A manifest exposes workflow revisions and schema hashes. Dynamic targets and recursion fail before writes; model settings, credentials and external resources are not yet fully frozen by this manifest.

Execution events carry workflowId in addition to execution, branch, iteration, parent and scope identities. Run details use bounded event pages; the canvas reads a separate latest-per-node state projection so high-volume child events cannot mask terminal state or overwrite identically named parent nodes. The six regression tests in `tests/complex_projects.rs` cover these boundaries, invalid input contracts, duplicate-ID validation safety and node contract discovery.

See [complex-project acceptance](../apps/desktop-backend/validation/README.md) for the executable business harness and its scope. The application contains three registered business projects with real runtime, model and local business-service execution evidence. This acceptance does not add production connectors or cross-process workflow resume.

## 服务交付

已实现的发布、HTTP/MCP 业务消费、独立 Rust 宿主、部署与验收边界见 [工作流服务发布与消费](workflow-service-delivery.md)。运行时的工作流快照、发布快照和部署别名是不同对象；开发 MCP 的编辑权限不授予业务消费方。
