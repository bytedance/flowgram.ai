# FlowGram Desktop

围绕工作流搭建、试运行和复用的桌面 Agent 工作台。项目是一份有真实目录的工作流工程。工作流、会话与运行分别导航；会话可以引用多个流程，手动运行独立于会话。

前端使用 React 19、TypeScript、Vite、Tailwind CSS 4、Radix UI 和 Lucide。FlowGram 提供真实画布。Tauri 2 仅提供桌面窗口和后端进程托管。

业务后端、Agent Runtime、Workflow Runtime 和 Workflow Tools 均在独立 Rust crate `apps/desktop-backend` 中，能够脱离 UI 运行。

## 安装预览版

macOS 在终端运行（自动识别 Apple Silicon / Intel）：

```sh
curl --fail --silent --show-error https://flowgram.ai/desktop/install.sh | sh
```

脚本下载现有预览频道的最新安装包，验证 SHA-256，安装到 `/Applications`（没有写入权限时使用 `~/Applications`），并仅移除 FlowGram 应用的隔离标记，使未签名预览版能够打开。无需 `sudo`。更新前先退出 FlowGram，再运行同一命令；不会改动项目或应用数据。可以设置 `FLOWGRAM_INSTALL_DIR` 指定绝对安装目录，设置 `FLOWGRAM_NO_LAUNCH=1` 仅安装而不启动。

Windows 安装包及 macOS 手动下载见[最新预览版](https://github.com/bytedance/flowgram.ai/releases/tag/desktop-preview)。

## 项目与工作区

新建项目选择工程目录；留空时使用应用管理的位置。打开项目选择包含 `flowgram.project.json` 的目录。工作流文档位于 `workflows/<workflowId>/workflow.json`，共享文件位于 `assets/`，会话和运行数据库位于 `.flowgram/state.sqlite`。项目可以独立重新打开，模型连接仍由应用统一管理，不写入工程。

单一项目侧栏顶部提供项目切换、搜索和收起；下方操作区只保留新聊天、搜索和项目资源，再同时展示工作流和会话列表。新建工作流通过工作流分组的 + 进入，运行记录放在该分组右上角的更多菜单中；会话分组的 + 同样创建新聊天。工作流总览与模板页仍作为项目的初始页及关闭独立工作流后的落点，分组标题保持静态标签。设置固定在底部。项目新建、打开、导入、导出集中在项目菜单；每个项目行的更多菜单提供重命名、查看详情和删除，工程路径仅在详情中显示。

会话在左，按需工作台在右。会话成功读取、创建、修改、校验或运行具体流程后自动在右侧打开；目录查询和历史恢复不会撑开画布。手动选文档和收起后，本轮后台更新不抢视图。每段会话独立恢复文档与开合状态，切换画布不修改输入引用。侧栏或搜索打开流程进入独立编辑器，不带会话；“让助手修改”明确选择新会话或已有会话，并附加流程引用。

手动运行不附加会话，历史提供结果、执行时主流程定义与编辑当前流程的独立入口。切换入口或项目保留已挂载画布、草稿与队列。项目打开失败留在打开界面，可重试，成功取得工程后才写入最近项目。

原型升级不兼容旧 Task 数据模型：服务启动清理应用旧原型数据库，前端清理旧对象选择和草稿键；保留模型连接、密钥及语言、主题、动效和布局偏好。新工程和会话不自动填充演示数据。

工程模型完整目标见 [信息架构](../../design/agent-workflow-app-information-architecture.md)。当前尚未实现嵌套文件夹整理、完整依赖发布包、资源绑定和产物库；执行快照目前仅覆盖主流程或单节点定义，不应视为可复现的发布版本。

## 首次使用的示例项目

工作区从未登记项目、且应用管理的工程目录为空时，首次打开自动初始化「示例 · 电商 · 订单履约」「示例 · 制造 · 采购对账」「示例 · SaaS · 客户支持」「示例 · 媒体 · 内容生产」「示例 · IT 运维 · 故障排查」「示例 · 教育 · 学员服务」六个普通项目。共 18 个工作流、294 个画布节点、18 个会话、24 轮讲解与 29 次实际运行，保留六次真实失败及修正后的独立成功记录。

六套内容覆盖有界并行与串行循环、嵌套分支、并行汇合、两次单据关联、按币种汇总、敏感操作分流、素材来源指纹、多渠道模型生成、渠道质量检查、HTTP 有界重试、只读诊断 Agent，以及排除缺交项的成绩统计。会话分别讲解搭建、业务变更和失败排查；工具结果、运行记录和执行快照在初始化时真实执行生成。

预置讲解按工作量提供估算时长：搭建三个工作流约 2 分 45 秒至 4 分钟，局部修改约 45–75 秒，排错或修正约 1–2 分钟。会话统一使用「已处理 3m」「已处理 1m 30s」的状态与耗时格式。估算独立保存为会话轮次的 `estimatedDurationMs`，随项目导入导出；真实 Agent 会话和工作流运行仍使用实测耗时，原始时间戳不被估算覆盖。

11 个规则工作流可用默认输入离线重跑；七个包含模型或 Agent 的工作流需要设置中的模型连接，初始化不会调用模型或模拟模型结果。模型提示与工具契约始终使用英文。运维流程默认使用明确提供的健康快照，source=http 时才访问输入 endpoint。示例不创建凭证或部署，也不执行真实付款、退款、库存扣减、消息发送或基础设施修改。各项目资源包含 README、按工作流命名的输入 JSON 和示例目录清单。

项目名称与会话按初始化时的界面语言保存为普通内容，语言切换不会改写它们。后续重命名、编辑、归档、导出与删除全部走普通项目逻辑。已有项目、未登记的非空工程目录和用户主动删除全部项目后的空工作区均不会被填充；初始化中断后可重试，不重复登记半成品。

## 项目管理

项目切换列表的每一行提供独立的更多菜单，无需先切换项目即可重命名或查看详情。详情展示工程目录、项目 ID、创建时间与工作流 / 会话 / 运行 / 归档数量，支持复制路径和在文件管理器中显示。重命名仅修改显示名称，保留项目 ID、目录、引用和当前工作区。

删除必须完整、准确输入项目名称，前后端均校验，不忽略大小写或空格。确认后永久删除整个工程目录（包括用户放入的文件）、会话、运行和项目发布记录；全局模型连接与凭证保留，删除的项目从凭证授权范围中移除。存在执行中任务、启用的部署，或目录内包含应用数据 / 其他已登记项目时阻止删除。删除当前项目后切到剩余项目；最后一个项目被删除后返回项目创建入口。

## 项目导入与导出

在项目菜单选择「导出项目」，保存 `.flowgram.json` 项目包。包内包含已保存的全部工作流（包括子工作流引用）、`assets/` 和 `config/` 文件；默认同时包含会话、工具调用、运行结果与执行快照，可取消历史记录选项仅交付工程内容。桌面版使用系统保存窗口，浏览器版直接下载文件。

在项目菜单选择「导入项目」，选择项目包、确认项目名称及可选的保存位置。导入始终新建独立项目身份与文件夹，可重复导入同一份包，工作流 ID 和引用在项目范围内保持稳定。完整校验和写入成功后才加入项目列表并打开；失败清理暂存文件，不覆盖现有工程。历史中的未结束执行标记为中断，所有会话队列保持暂停，需要用户明确恢复。

全局模型连接、凭证、部署配置、调用授权和回调投递不随项目包迁移；导入后使用当前应用的连接设置，发布需要重新配置。用户自行写在工作流或资源中的内容按原样保存。项目包最大 64 MB，资源总量最大 32 MB / 2000 个文件，最多 1000 个工作流和 100000 行历史记录；拒绝路径越界、符号链接、重复资源和不支持的包版本。项目包不同于部署包，后者仅服务于发布与运行消费。

## 归档与清理

会话和工作流可通过侧栏条目菜单或内容头部的更多操作归档。归档前保存已打开工作流的草稿；归档后从侧栏、主页、搜索和 Agent 的工作流列表中隐藏，并关闭相关文档，保留其他工作区内容。正在执行的会话、工作流及被运行引用的依赖需要先结束或停止执行。归档会话会暂停待办队列；恢复不会自动重启待办。

「设置 → 归档」统一列出已登记项目的归档内容，显示名称、类型、所属项目和归档时间，支持搜索、项目筛选、会话 / 工作流筛选、刷新和恢复。恢复保持原 ID、工作流引用、会话记录与运行结果，回到原项目；项目暂不可访问时显示错误，避免误以为归档为空。

只有归档内容可以彻底删除，界面要求二次确认。删除会话会清除其消息、工具调用和队列，保留工作流及独立运行记录；删除工作流会清除源文件与该流程的运行记录。仍被其他工作流（包括已归档流程）、发布草稿或已发布版本引用的工作流禁止删除。其他运行中已有的冻结快照是独立历史产物，会继续保留。删除文件与数据库之间发生中断时，启动自动恢复未提交操作，或清理已提交操作的暂存目录。

归档状态属于项目数据，随完整项目包迁移；仅导出工程内容时保留工作流的归档状态，不包含会话归档。归档不是停用已发布服务，归档子工作流也不破坏现有父流程调用；归档源流程的直接编辑、试运行和节点测试需先恢复。

## 语言

在「设置 → 通用 → 界面语言」选择跟随系统、English 或简体中文，立即生效并保存在本机。未设置时跟随系统；不支持的系统语言使用英文。切换语言保留未发送输入、节点编辑状态与画布视口，不修改用户内容或已保存的工作流。

Agent 默认指令位于 `apps/desktop-backend/prompts/`，系统提示词、工具定义、共享节点契约与运行诊断使用英文。助手按照用户消息或明确指令选择回复语言，与界面语言独立。新增界面文案补齐 `src/lib/locales/messages.json`，并保持 `localized` 的展示字段边界；禁止翻译执行字段、操作枚举、端口 ID 和用户内容。

## 开发

需要仓库指定的 Node.js / pnpm、Rust stable（支持 edition 2024）及 Tauri 对应平台的编译环境。先在仓库根目录运行：

```sh
node common/scripts/install-run-rush.js install
node common/scripts/install-run-rush.js build --to @flowgram.ai/free-layout-editor
```

桌面开发，在本目录运行：

```sh
node ../../common/scripts/install-run-rushx.js desktop
```

此命令编译 Rust 服务、准备 sidecar、启动 Vite 和 Tauri。首次打开设置，连接兼容 Responses API 的模型服务。模型凭证只存储在本机 Rust 服务的数据目录中，前端不会读取已保存的模型密钥。

只开发前端时，在仓库根目录启动服务：

```sh
FLOWGRAM_DATA_DIR="$PWD/.flowgram-local" cargo run -p flowgram-desktop-backend
```

另一个终端进入本目录：

```sh
node ../../common/scripts/install-run-rushx.js dev
```

浏览器访问 `http://127.0.0.1:1420`。Vite 在本机代理 API，并从 `.flowgram-local/connection.json` 读取地址与授权。自定义服务连接文件可设置 `FLOWGRAM_CONNECTION_FILE`。

## 构建与验证

```sh
# 本目录
node ../../common/scripts/install-run-rushx.js lint
node ../../common/scripts/install-run-rushx.js test
node ../../common/scripts/install-run-rushx.js build
node ../../common/scripts/install-run-rushx.js desktop:build

# 仓库根目录
cargo test -p flowgram-desktop-backend
cargo clippy -p flowgram-desktop-backend --all-targets -- -D warnings
```

macOS App 生成在 `target/release/bundle/macos/FlowGram.app`。当前包供本地开发验证，尚未配置发布签名、公证与自动更新。

### Windows

支持 Windows 10 / 11 x64，使用同一前端、独立 Rust 后端、工作流运行时和普通项目格式。Windows 安装包内含 `flowgram-server.exe` 与 `flowgram-service.exe`，使用 WebView2 渲染；安装和运行无需 Node.js、Rust 或 C++ 开发工具。安装器在缺少 WebView2 时通过内嵌的微软引导程序安装运行时，此步骤需要联网。

Windows 开发环境需要 Node.js、Rust MSVC 工具链、Visual Studio C++ Build Tools 与 WebView2。仓库依赖安装完成后，在 `apps/desktop` 运行：

```powershell
node ../../common/scripts/install-run-rushx.js desktop
node ../../common/scripts/install-run-rushx.js desktop:build
```

Windows 默认生成 NSIS 安装器，支持中英文安装界面，按当前用户安装，无需管理员权限。产物位于 `target/release/bundle/nsis/FlowGram_0.1.0_x64-setup.exe`。MSVC 运行库静态链接，无需单独安装 VC++ 运行库。界面与后端分别运行；后端无额外控制台窗口，窗口退出和进程异常终止均释放所属后台进程。应用数据位于 `%APPDATA%\ai.flowgram.desktop`，启动诊断写入其中的 `backend.log`，不会将模型凭证放进安装包。

macOS / Linux 也可以使用配置好的 Linux 编译机生成 Windows 安装器：

```sh
FLOWGRAM_WINDOWS_BUILD_HOST=devbox node ../../common/scripts/install-run-rushx.js desktop:build:windows
```

编译机需要 Rust 的 `x86_64-pc-windows-msvc` 目标、cargo-xwin、Clang / LLVM（含 llvm-rc）、NSIS、Node.js 和 Corepack。脚本在独立缓存中编译，只传输源码、前端构建结果和静态示例，不传输项目或密钥，也不在编译机启动服务。安装包下载到 `.flowgram-local/packages/windows/`。该命令仅构建，不发布。

当前安装包未配置 Windows 发布者签名和自动更新。跨平台编译不能替代实机验收；安装后应检查首次示例初始化、中文和空格路径、保存与重新打开、运行及历史画布、项目导入导出、归档恢复、单实例以及正常退出与异常退出的后台进程清理。

2026-10-20 在 Windows 10 x64 开发机完成安装与升级、深浅主题、画布缩放、高 DPI 下窗口适配、单实例、正常退出和强制结束后的后台进程清理及重新启动验证。安装包解包后的三个可执行文件与实机安装内容逐一校验一致，无额外 VC++ DLL 依赖。

Windows 共运行 118 项 Rust 测试；修复后复测受影响的导入、删除与示例测试。首次示例初始化涉及大量磁盘写入，该套测试在开发机串行执行，避免并行初始化多份工作区导致样例节点超时。本机 117 项 Rust 测试、Clippy 与桌面前端构建均通过。

最终安装包的真实后端另通过 [Windows 验收脚本](../desktop-backend/validation/windows_desktop.py)：六个项目、18 个工作流、294 个节点、11 个离线流程重跑、中文与空格路径、工作流保存与历史图快照、归档恢复、带历史导入导出、项目重命名、重新打开与完整名称确认删除均通过。重新启动后保留 18 个会话和 40 次运行，MCP 初始化正常。Windows 本轮未配置真实模型连接；Windows 11 尚未单独实机验收。

## GitHub Actions 安装包流水线

[Desktop Build](../../.github/workflows/desktop-build.yml) 在桌面、Rust 后端、共享库及构建配置相关的 PR / main 提交时执行，支持合并队列，也可在 GitHub 的 Actions → Desktop Build → Run workflow 手动选择分支运行。

三个原生 GitHub 托管 runner 分别构建安装包，不依赖私人编译机、SSH、本机服务或本地数据：

| 平台 | Runner | 下载产物 |
| --- | --- | --- |
| macOS Apple Silicon | `macos-15` | `FlowGram-aarch64-apple-darwin`，包含 `.dmg` |
| macOS Intel | `macos-15-intel` | `FlowGram-x86_64-apple-darwin`，包含 `.dmg` |
| Windows x64 | `windows-2022` | `FlowGram-x86_64-pc-windows-msvc`，包含 `-setup.exe` |

流水线使用 Node.js 22、仓库指定的 Rush / pnpm、Rust 1.97.0 stable，以及已提交的 pnpm / Cargo 锁文件。先构建桌面所需的共享库，再运行前端单测与 lint、Rust Clippy 与后端 / 工作流运行时测试，最后打包 GUI 和两个原生 Rust sidecar。Rust 测试串行执行，避免多份首次示例初始化争抢磁盘；缓存按平台和架构隔离。

产物检查在临时中文与空格路径内使用独立数据目录。macOS 挂载实际 DMG；Windows 解包实际 NSIS 安装器，核对三个二进制齐备，并运行包内服务验证 HTTP、MCP 初始化 / 工具目录及独立服务数据库可用性。此检查不启动 GUI，也不替代实机交互验收。

三个平台全部构建成功后，官方仓库的 main 推送或 main 分支手动构建会自动更新公开的 [Desktop Preview](https://github.com/bytedance/flowgram.ai/releases/tag/desktop-preview) 预发布通道。安装包下载无需登录 GitHub；沿用现有的 `desktop-preview` 通道和不含版本号的文件名，确保官网与 README 无需随版本更新。自动更新只替换安装包、校验和与构建信息，不创建或移动标签、不新建或发布 Release；通道不存在时直接失败。标签保持创建时的位置，当前安装包的实际版本、源码提交及构建记录以 `build-info.json` 为准。发布前校验三平台的来源提交、版本、文件大小和 SHA-256，发布页同时提供校验和及构建信息。PR、合并队列和 fork 构建不会发布；Actions 原始产物另保留 14 天用于排查。发布任务仅使用仓库的 GitHub token，保持 npm 发布流程独立。当前预览包未配置发布者签名 / Apple 公证，应用内自动更新需另行配置。

本地复查流水线脚本（先完成对应平台打包）：

```sh
# 仓库根目录；Windows 设为 x86_64-pc-windows-msvc
DESKTOP_TARGET=aarch64-apple-darwin python3 .github/scripts/desktop-smoke.py
DESKTOP_TARGET=aarch64-apple-darwin DESKTOP_ARTIFACT_DIR=.flowgram-local/ci-artifacts node .github/scripts/desktop-artifacts.mjs
```

## 当前可用范围

- 新建 / 打开工程目录，切换项目恢复各自的工作区；工作流、会话、运行、资源分别导航，项目内搜索；独立设置页面，包含模型、外观、动效、MCP 和快捷键。
- 按轮次组织流式回复和工具调用；运行中内联展示，连续工具合为摘要，按需逐层展开调用与原始结果。正常完成收起过程，保留最终回复与成果；失败、中断或最新无最终回复时保留过程。输入框两行起步并自动增高，手动展开详情不触发尾部跳转。
- 运行中继续输入：下一轮待办、本轮补充、编辑或移除待办、停止后暂停与明确继续。补充在安全边界接收，刷新和重连恢复服务端状态。
- 可拖拽并记忆尺寸的侧栏、对话、节点配置和运行结果；官方 FlowGram 标志。
- 自然语言创建、读取、保存、校验和试运行工作流。
- FlowGram 画布、节点名称编辑和连线；注册定义驱动的节点配置、输出与测试页签、展开编辑、分类节点库、操作搜索与常用节点；草稿自动保存和版本冲突检测。
- Rust 执行 15 类节点：流程输入输出、变量、文本模板、JSON 解析与生成、文本、列表、LLM、Agent、HTTP、子工作流、条件、循环、等待。
- 29 个扩展原子节点：对象映射/选择/合并/提取/默认值/转换/JSON/校验；12 种列表操作；文本处理/正则/模板；数学/日期/编码/哈希；文档分块。全部接入配置、输出、单节点测试和完整流程执行。
- 结构化控制流：多路选择（首个/全部命中）、并行分叉、互斥归并、并行汇合（全部/首个成功/成功数达标）、串行/并发遍历、条件循环、break/continue。支持循环与分支嵌套，后端校验端口和作用域；画布仅使用显式静态端口。
- 执行实例记录父执行、分支路径、循环轮次和作用域；面板按实例选择样本。完整运行保存冻结的图定义。
- 四个可运行模板：清理文本、解析客户数据、列表去重、内容摘要。HTTP 支持 GET / POST / PUT / PATCH / DELETE / HEAD、Query 参数、请求头与请求体。
- 工作流定义保存在工程文件中；项目内 SQLite 持久化会话、运行、执行时主流程定义和有序事件；SSE 推送、重连补发、取消、运行结果和节点轨迹。
- MCP Server 对外复用相同的 Workflow Tools。

现有节点统一使用共享取值、变量选择、字段映射、Schema 和条件编辑器；未完成的输入在会话中保留。节点测试使用独立 Rust 接口和正式执行器，只执行当前节点，支持取消、超时、测试快照和旧配置提示；同一能力通过 test_node Workflow Tool 向 MCP 暴露。工作流内 Agent 复用只读工具，最多 8 步；外部 Agent 通过 MCP Server 复用完整工具集。表达式、Code、断点续跑、审批、MCP Client 与团队协作尚未实现。服务重启会将未完成运行标记为中断，不自动重放外部操作。

遍历最多 1000 项；每个并行作用域最多 32 个分支，并发执行器总上限为每次运行 32 个叶节点。图最多 1000 个节点、16 层子流程，运行最多 10000 次节点执行；条件循环最多 1000 轮，并受节点超时限制。HTTP 响应限制 2 MB，模型响应限制 8 MB，单轮 Agent 最多 12 次模型请求。普通路径串行，显式分叉和并发遍历才创建并发作用域。

## 原子节点契约

扩展节点的公共定义在 [atomic-nodes.json](../desktop-backend/catalog/atomic-nodes.json)，控制节点在 [control-nodes.json](../desktop-backend/catalog/control-nodes.json)。Rust 内嵌同一份定义，前端通过注册适配器生成配置面板、默认值、搜索和输出结构。`GET /api/nodes` 返回目录；`list_node_types` Workflow Tool 默认返回精简列表，传入 `nodeType` 后返回该节点的完整契约，避免向模型一次注入全部字段。

`inputsValues.*` 字段使用固定值、引用或文本模板绑定；`mapping`、`predicate`、`keys`、`metrics` 等结构配置直接保存在 `data` 下。操作枚举必须静态配置，不能由变量或测试样本覆盖。`list.filter` 和 `list.map` 在每项执行时提供 `item` 与从 0 开始的 `index`，不会提前解析这些局部引用；AND/OR 条件按顺序短路求值。

路径支持点路径、JSON Pointer 和提取节点中的 `*` 通配符，不执行脚本。字段缺失与 null 分开处理，只有默认值和存在性判断允许显式处理缺失；未执行的上游节点仍然报错。列表结果仍是一次节点激活，不会隐式执行下游多次。列表最多 10000 项，节点输入输出最多 2 MB；关联和映射在展开过程中检查结果预算。

当前日期节点使用显式 IANA 时区（默认 UTC）；日/月/年按日历计算，夏令时歧义报错。编码和哈希支持 UTF-8 文本；文件、HMAC 凭证资源和 Token 分块没有伪装成可用选项。Schema 使用内联定义，不加载远程引用。文本模板采用有预算的 [MiniJinja](https://docs.rs/minijinja/2/)，HTML 模式默认转义；正则使用受限的 [regex](https://docs.rs/regex/1/)，文本截取使用 [Unicode 字素簇](https://docs.rs/unicode-segmentation/1/)。

## 控制流约束

分叉的出口和汇合的入口使用稳定分支 ID；改名和重排不改变连线。`sourcePortID`、`targetPortID` 都进入后端图模型和测试快照签名。普通节点的同一出口只能连接一条路径；需要多路执行时使用并行分叉。每个结构化分叉绑定一个对应汇合，分支不可在汇合前交叉，也不能从外部进入其内部。

`control.switch` 使用 `branches[{id,label,predicate}]`、`mode=first|all`、`joinId`；固定 `else` 出口。`first` 对应 `control.merge-branches`，`all` 对应 `control.join`。汇合设置 `forkId`，入边的 `targetPortID` 必须匹配来源分支。`mappings[branchId]` 按所选分支作用域求值；不设置映射时返回该路径末尾节点的输出。互斥归并校验统一输出 Schema；并行汇合按分支 ID 保存状态、输出或错误，提前达标后停止派发并取消剩余工作。已发生的外部副作用不会撤销。

`loop` 配置 `mode=serial|parallel`、`concurrency`、`errorMode=fail|collect|skip`；收集模式保留失败项空位，移除模式仍保留错误记录的原始索引。`control.repeat` 使用 `initialState`、`stateSchema`、`stateUpdates`、退出 `predicate`、`check=before|after`、`maxIterations`；轮内引用 `state/index`。达到次数上限按失败处理。break/continue 仅作用于最近的串行循环；穿过并行作用域的控制信号在运行前被拒绝。continue 跳过当前轮结果收集；条件循环的控制节点可显式返回下一轮状态。

分支、循环局部值不能直接泄漏到外层；必须通过归并、汇合或循环结果映射导出。循环内节点的历史样本按执行实例选择，默认外层样本不包含某一轮的最后一次输出。汇合节点不能独立测试，完整试运行使用正式作用域。服务重启恢复、通用 Retry/Catch、持久化等待与子工作流固定发布版本仍是未实现能力；冻结图定义不代表可恢复执行。

界面与动效遵循 [桌面设计规范](../../design/desktop-design-system.md)，后续 UI 修改应一起维护该规范并完成截图验收。

轮次交互遵循 [对话信息架构](../../design/conversation-information-architecture.md)。当前已实现基础生命周期和输入投递；询问、审批、工作流差异和检查点恢复仍待后续迭代。

## 复杂业务验证

应用项目菜单中保留了“复杂验证 · 订单履约”“复杂验证 · 采购对账”“复杂验证 · AI 客服”三个工程。共享节点、结构化控制流、循环、子工作流、HTTP、真实模型、幂等业务资源及故障注入的复现说明见 [业务验收](../desktop-backend/validation/README.md)。运行详情可查看冻结的工作流依赖及分页执行过程。

## 服务发布

设置中的「部署」统一管理跨项目发布卡片、全局凭证和运行服务。新建发布进入二级配置页，已发布卡片提供详情、接入、版本和调用授权；新版本沿用同一卡片。凭证可授权全部或指定项目，后端执行范围校验。工作流工具栏「发布」保存当前草稿并带入所属项目。支持直接发布到已连接的独立 Rust 运行服务，也可导出部署包，详见 [工作流服务发布与消费](../../design/workflow-service-delivery.md)。
