# Workflow Tools：渐进式读取与精细化编辑

状态：已实现。Rust 工具注册、Agent 与创作 MCP、局部编辑、变更回执、画布同步和结构化结果分页已采用本协议；实现范围及验收记录见第 12 节。

## 1. 核心决定

Agent 编辑工作流应像编辑工程中的局部代码：定位对象、读取必要片段、提交最小变更、检查变更结果。

- 所有列表默认只返回索引。所有对象默认只返回摘要。
- 工具定义、节点契约、工作流、长文本、运行数据分别按需展开。
- 编辑以稳定 ID、字段路径和明确操作为单位；支持一次提交一组相关操作。
- 从 Agent 和创作 MCP 中移除 `save_workflow`；不提供要求回传整图的替代工具。
- 新建也采用后端初始化加增量构建，不要求 Agent 手写完整 FlowGram 文档。
- 所有变更返回小型回执、变更范围和校验摘要；不回显整图。
- 搜索不修改对象，编辑不启动运行，布局不修改配置，运行不发布，重试查询不重复执行。

底层仍可原子写入完整 JSON 文件。需要消除的是让模型重建文档，以及让 UI 为局部修改重新加载整个画布；不是禁止存储层写文件。

## 2. 改造前的问题

| 位置 | 当前行为 | 后果 |
| --- | --- | --- |
| `tools.rs / list_workflows` | 返回包含 `schema` 的完整 Workflow 列表 | 找一个工作流也会读进整个项目的图 |
| `inspect_workflow` | 只有整图读取 | 无法只看一个节点、一条路径或循环内部 |
| `list_node_types` | 搜索与完整节点契约混在同一个工具；目录附带完整类型列表 | 发现、配置和重复查询边界不清楚 |
| `create_workflow / save_workflow` | 要求完整 schema，返回完整 Workflow | 修改一个字段也会重发其他节点、连线和元数据 |
| `auto_layout::prepare` | 拓扑变化触发整图重排 | 插入一个节点可能改变用户的整体布局 |
| `validate_workflow` | 错误字符串列表及完整支持类型目录 | 缺少可定位字段、稳定错误码与修改前后差异 |
| `get_run` | 一次混合运行、输出、事件、模型和依赖 manifest | 检查状态时携带大量无关数据；缺少按执行实例读取 |
| `read_tool_result` | 将序列化 JSON 按字符截段返回 | 分页片段可能不是完整 JSON，模型仍要拼接解析 |
| Agent prompt | 常驻大量图格式和节点实现说明 | 每次请求都承担与当前任务无关的契约成本 |
| UI / 发布运行 Agent | 依赖旧工具名、旧结果结构和单独 allowlist | 工具变化容易造成自动打开、图标、来源与权限不同步 |

2026-10-23 对本地现有数据做了只读测量：12 个工具定义的紧凑 UTF-8 JSON 合计 4,995 字节，助手常驻提示 5,932 字节；一个包含 4 个工作流、68 个节点的项目，其工作流列表正文达 37,732 字节。这是改造前的测量，不是新协议的性能承诺。当前首要问题是数据披露与整图编辑，不能为了“延迟加载”让每次常规修改多绕几次发现调用。

参考依据：

- [Anthropic：Advanced tool use](https://www.anthropic.com/research/advanced-tool-use) 说明工具定义可按需加载、工具结果只保留与当前任务有关的内容。这里采用工具发现的思想，执行层不依赖某一家模型的专有工具搜索接口。
- [社区 n8n-mcp：Workflow Diff Examples](https://github.com/czlonkowski/n8n-mcp/blob/main/docs/workflow-diff-examples.md) 提供按操作更新节点和连线的实例。它是独立社区项目，不能当成 n8n 官方 MCP 的能力说明。这里借鉴局部编辑形式，版本、作用域、原子性和 FlowGram 容器规则单独定义。

## 3. 三类渐进式披露

### 工具

内置 Agent 初始直接提供 `list_workflows`、`read_workflow`、`search_workflow`、`edit_workflow`、`search_node_types`、`describe_node_type`、`read_tool_result`，以及发现其他能力的 `search_tools`。已知目标时可以直接局部读写，不能为了渐进式披露强制先搜工具。

`search_tools` 根据明确任务查找工具，返回名称、用途、读写性质和使用提示。Harness 把匹配工具的完整参数 schema 加入下一次模型请求；工具结果不再重复塞入同一份完整 schema。它查询的是确定的工具注册表，不调用另一个模型做路由。

`describe_tool` 提供某个工具或编辑操作的详细约束与短示例。已知调用方式时可直接调用工具，不强制每次先读说明。编辑工具直接提供完整的 `operations[].op` 判别参数 schema，复用公共定义；长篇操作说明及例子按需读，不通过任意 `args` 对象牺牲类型校验来缩短定义。

已加载的工具定义在当前任务内保持可用。工具集合变化必须重新计算上下文预算，自动压缩仍保留当前用户要求、版本依据、已执行的变更回执和未完成动作。工具加载状态随会话检查点恢复；加载工具不等于重新执行工具。

创作 MCP 仍按 MCP 协议提供完整、可分页的工具清单与合法 JSON Schema，由外部客户端决定是否延迟加载。不能要求所有 MCP 客户端支持动态注册，也不能把“取到工具说明”当成权限授权。

### 领域契约

节点搜索仅返回类型、用途、分组、配置完整度提示。明确选中节点类型后，才读取其执行契约。

执行契约包含：字段路径、字段类型、绑定方式、默认值、必填项、枚举、输入输出 schema、静态端口和结构约束。不返回表单编辑器、CSS、UI 排版等模型不需要的信息。契约缓存以 nodeType 和 contractHash 标识；相同版本不重复获取，契约变化时返回明确的新依据。

循环契约必须说明作用域、局部变量、边界、结果收集和并发语义；分叉契约必须说明配对汇合、分支端口和汇合输出。仅有几行字段描述不能称为完整契约。

### 业务数据

工作流按摘要 → 作用域拓扑 → 节点／字段 → 长文本片段展开。

运行按状态 → 执行树 → 单次执行 → 输入／输出／事件展开。详情页与工具读取同一份运行快照，不能拿当前草稿代替当时的画布。

已有 ID、契约版本和读取快照可复用。不要把“渐进式”实现成每次修改前必须串行调用所有层级。

## 4. 完整工具目录

以下为创作能力全集。参数中省略的 `projectId` 由内置会话绑定；创作 MCP 使用明确项目上下文并逐次校验。

| 工具 | 关键输入 | 默认返回 | 按需展开 |
| --- | --- | --- | --- |
| `search_tools` | `query, category?, cursor?, limit?` | 相关工具名称、用途、读写属性、加载状态 | 加载匹配工具的参数 schema |
| `describe_tool` | `name, operations?` | 该工具的约束、相关操作说明和短示例 | 只说明点名的编辑操作 |
| `search_node_types` | `query?, group?, cursor?, limit?` | 匹配节点索引 | 不返回全部类型或全部配置 |
| `describe_node_type` | `nodeTypes[], sections?` | 点名类型的执行契约与版本 | `fields / ports / structure / examples`；可一次读取多个已知类型 |
| `list_models` | `query?, requires?, cursor?, limit?` | 项目可用模型的 ID、名称、能力摘要、默认项 | 不携带每个模型的全部参数 |
| `read_model` | `modelId` | 该模型的确认能力、上下文预算、参数约束、授权状态 | 不返回凭证值 |
| `list_workflows` | `query?, cursor?, limit?` | ID、名称、revision、节点数、更新时间 | 永不返回 schema |
| `read_workflow` | `workflowId, source?, snapshotId?, view?, scopeId?, nodeIds?, paths?, cursor?, limit?` | 当前文档摘要和读取快照 | 指定作用域、节点、字段或历史定义 |
| `search_workflow` | `workflowId, snapshotId?, query?, nodeTypes?, scopeId?, relation?, cursor?, limit?` | 节点 ID、类型、标题、作用域和短命中片段 | `upstream / downstream / references / consumers` 必须指定起点 |
| `create_workflow` | `name, mutationId, templateId?` | ID、revision、输入／输出边界 ID、变更回执 | 后端初始化；不接受整图 schema |
| `edit_workflow` | `workflowId, expectedRevision, mutationId, operations[], dryRun?` | 变更 ID、新 revision、变化对象、校验差异 | 可指定需要返回的变化字段；不返回整图 |
| `get_workflow_change` | `workflowId, mutationId` 或 `changeId` | 请求是否执行、版本、对象和路径摘要 | 按对象读取该次 diff |
| `revert_workflow_change` | `workflowId, changeId, expectedRevision, mutationId` | 撤销操作的回执 | 对原变更求逆；检查后续重叠修改 |
| `layout_workflow` | `workflowId, expectedRevision, mutationId, scopeId?, nodeIds?` | 移动的节点 ID 和位置 diff 引用 | 默认当前作用域；整图递归布局需明确 `recursive:true` |
| `validate_workflow` | `workflowId, snapshotId?, nodeIds?, scopeId?, cursor?, limit?` | 完整校验结论、问题计数、第一页定位问题 | 字段错误、拓扑、作用域、模型可用性等分类；省略过滤时检查整图 |
| `run_workflow` | `workflowId, expectedRevision, inputs, mutationId` | run ID、已冻结 revision、启动状态 | 不把启动成功当运行成功 |
| `test_node` | `workflowId, nodeId, expectedRevision, inputs, bindings?, mutationId` | 单节点测试的 run ID 和冻结版本 | 不运行上游；绑定使用显式样本 |
| `read_run` | `runId` | 状态、时间、失败定位、统计、快照来源、结果引用 | 大输出、事件、依赖分别读取 |
| `list_run_steps` | `runId, parentExecutionId?, nodeId?, status?, cursor?, limit?` | 当前层执行实例摘要 | 循环和子工作流按 parent 展开 |
| `read_run_step` | `runId, executionId, section?, path?, cursor?, limit?` | 单个执行实例的状态与数据目录 | `inputs / outputs / error / model / tools`；大值返回引用 |
| `read_run_events` | `runId, executionId?, kinds?, after?, limit?` | 不重复的事件页及 `nextAfter` | 不混入完整输出和整份 manifest |
| `cancel_run` | `runId, mutationId` | 取消意图是否接收、当前权威状态 | 停止中继续读取；不宣称撤销外部副作用 |
| `read_tool_result` | `resultId, path?, view?, cursor?, limit?, startLine?, lineCount?` | 类型、大小和一页结构化内容 | 对象按键、数组按项、文本按行或字符分页 |

不能因为拆出更多能力，就把这些工具和所有操作示例全部常驻系统提示。工具目录是注册表，模型当前可见集合由发现结果与调用身份决定。

### 现有十二个工具的去向

| 当前工具 | 新契约 |
| --- | --- |
| `read_tool_result` | 保留名称，改为类型感知分页 |
| `list_models` | 摘要索引；详细能力交给 `read_model` |
| `list_node_types` | 拆为 `search_node_types` 与 `describe_node_type` |
| `list_workflows` | 摘要索引，去掉 schema |
| `inspect_workflow` | 替换为分层的 `read_workflow` 与 `search_workflow` |
| `create_workflow` | 后端初始化边界，后续增量构建 |
| `save_workflow` | 从 Agent / 创作 MCP 移除，使用 `edit_workflow` |
| `layout_workflow` | 支持局部范围，返回位置差异 |
| `validate_workflow` | 结构化、可定位、可分页的诊断 |
| `run_workflow` | 固定版本、幂等启动、小型回执 |
| `test_node` | 固定版本、显式绑定、幂等启动 |
| `get_run` | 拆成状态、执行树、单次执行和事件读取 |

## 5. 统一读取规则

所有响应带 `context`，明确所属项目、文档或运行、读取版本和内容哈希。列表统一 `items / nextCursor / hasMore`；事件流使用单调序号。

```json
{
  "ok": true,
  "context": {
    "projectId": "project_id",
    "workflowId": "workflow_id",
    "revision": 18,
    "snapshotId": "snapshot_id",
    "definitionHash": "sha256:..."
  },
  "data": {
    "name": "Novel generation",
    "nodeCount": 160,
    "edgeCount": 174,
    "scopeCount": 6
  }
}
```

`read_workflow` 的 `view`：

| view | 内容 |
| --- | --- |
| `summary`，默认 | 名称、revision、统计、工作流输入输出摘要；没有节点配置和长 Prompt |
| `outline` | 指定作用域直接子节点及连线，嵌套容器保持折叠；端口返回真实 ID、名称与方向 |
| `nodes` | 仅 `nodeIds` 点名节点，可用 `paths` 限制字段；子容器默认只给摘要 |
| `fields` | 必须给目标节点和字段路径；字符串默认给长度、内容 hash 与可读取引用 |

`source` 为 `"draft"` 或 `{ "runId": "..." }`。外层 `workflowId` 指定主图或依赖图；后者从该次运行的冻结集合读取相应定义，不隐式跳回最新草稿。完整 manifest 作为结果引用读取。

工作流拓扑、搜索结果和后续分页必须绑定同一 `snapshotId`，避免读取到跨版本拼接的图。第一页建立不可变读取快照；游标携带过滤、排序与版本。快照过期时返回明确错误及最新 revision，不悄悄换数据。

默认每页 20 项，最大 100 项。一个响应的结构化正文上限初定 8 KiB；过大字段返回 `valueRef`，任何 `truncated:true` 必须带可继续读取的引用或游标。8 KiB 是正文预算，不含工具协议固定包络；单项过大同样返回引用，不能拆坏 JSON。

`valueRef` 与 `diffRef` 均使用同一种不可变结果引用，包含 `resultId / path / kind / contentHash / size`；回执中的简写 `"result_id"` 表示该引用的 ID。`read_tool_result` 对对象返回完整键值页，对数组返回完整元素页，对文本返回完整文本页。文本行号从 1 开始，字符分页明确使用 Unicode scalar 计数而非 UTF-8 字节；输出携带实际范围和下一页游标。批量读取节点契约时，过大章节同样返回这种引用。

默认不开放 Agent 的“全量 JSON”读取模式。导入、导出和故障取证仍可使用文件产物或显式引用；需要理解全图拓扑时分页读取 outline，不把所有长字段一起展开。

凭证值与标记为 secret 的字段不展开；读到的遮罩不允许作为真实字段值写回。ID、枚举、schema 和用户内容不随 UI 语言变化；工具描述、例子及诊断均使用英文。

## 6. 编辑是一次有边界的变更

`edit_workflow` 是唯一通用图编辑事务入口。`operations` 按顺序作用于内存候选图，整组完成后统一检查、保存；不能允许前半段成功、后半段失败。

| 操作 | 定位与语义 |
| --- | --- |
| `rename_workflow` | 只改文档名称 |
| `add_node` | `nodeType, nodeId?, scopeId, fields?`；从契约初始化默认值和必要结构 |
| `update_node` | `nodeId, set?, unset?`；只改列出的 data 字段，未出现字段保持原样 |
| `replace_text` | `nodeId, path, edits[]`；精确替换 Prompt、模板或代码中的片段 |
| `edit_collection` | `nodeId, path, changes[]`；对配置数组做插入、修改、删除、重排，不回传整张表 |
| `remove_node` | 明确目标；容器删除包含其内部结构，外部引用默认阻止提交 |
| `replace_node_type` | 明确类型与端口／输出映射；保持可保留的身份、标题和位置，不猜测不兼容映射 |
| `connect` | 明确 scope、两端节点及端口；单出口不能偷偷扇出 |
| `disconnect` | 精确端点描述符，不使用连线数组序号 |
| `reconnect` | `from` 精确描述现存连线，`to` 描述目标；不误删相邻连线 |
| `insert_node` | 在明确连线中插入节点或完整结构单元，一次完成拆线和重接 |
| `add_branch` | 创建稳定 branch ID、端口与配对汇合入口，保持已有分支 |
| `update_branch` | 按 branch ID 改标签、条件或映射 |
| `remove_branch` | 按 branch ID 移除；分支有正文节点时默认拒绝，显式指定正文处理方式后才执行 |
| `move_branch` | 按 ID 与 before/after 重排，明确影响 first-match 的执行优先级 |
| `duplicate_subgraph` | 明确节点集合和目标作用域，返回旧新 ID 映射；仅重写真正的引用 |
| `move_subgraph` | 改变归属作用域；同时检查连线和局部变量，对跨作用域引用要求明确映射 |
| `move_nodes` | 只改点名节点的位置；不改变配置和执行语义 |

### 字段修改

`update_node.set` 和 `unset` 的路径为相对于 `node.data` 的 JSON Pointer，例如 `/title`、`/inputsValues/prompt`、`/model/modelId`。绑定字段的值遵守现有 constant / ref / template 契约；静态字段保持类型化 JSON。

不做隐式 deep merge；一个 set 精确替换该路径对应值。`null` 是值，删除必须通过 `unset`。未在节点执行契约中声明为可写的字段、缺少中间对象、类型错误或重叠路径均返回错误，不猜测模型意图。字段默认值由创建操作初始化，不因日后的局部修改重新覆盖。既有扩展数据若未被明确编辑则原样保留，不能经有损的强类型反序列化顺手丢掉。

结构字段不能借字段路径绕过操作系统：node ID、node type、blocks、edges、配对关系、分支 ID、作用域与位置分别由对应语义操作维护。输出 schema 的增删属于字段变更，但仍检查所有消费者与绑定。

`replace_node_type` 用于普通节点换型。容器与普通节点互换、循环与分叉结构互换，必须在同一批中明确处理下属结构与外部引用，不允许仅覆盖 type 来遗留无主子图。规范文档中的节点 meta、连线和顶层扩展字段也须原样保留；校验可以投影到执行类型，但不能再把有损投影保存回规范文件。

`edit_collection` 优先使用契约声明的 `id / key / name` 定位记录，匹配必须唯一。没有稳定键时，可使用本次快照的 index 加 `expectedItemHash`；不能单凭旧数组序号修改。分支配置只能使用分支语义操作。保留数组顺序及用户未修改的字段。

### 文本修改

`replace_text.edits` 使用 `oldText / newText / expectedMatches`，默认要求精确匹配一次。零次或多次匹配返回匹配计数和短上下文；不做模糊替换，也不暗中全局替换。多段替换按顺序执行于候选字段。

长文本读取返回行范围和整个字段的内容 hash，按需补读相邻行。完整设置字段只用于用户确实要求重写该字段时；修改其中一句应使用文本操作。

### 结构与身份

- node ID 在一个工作流中全局唯一、稳定，不以显示标题定位，不使用 `/nodes/17` 一类文档下标定位。
- 普通节点标题变更不改变 ID，也不重写任何引用。
- 创建 loop / repeat 自动建立合法的内部边界及初始连接；创建分叉自动建立匹配汇合。Agent 不手写边界节点的内部 JSON。
- 批量构建时可显式指定新容器的 `boundaryIds: {entry, exit}` 以及分叉 `joinId`，使后续操作能在同一批引用它们；省略则由后端生成并在回执返回。
- `scopeId:"root"` 指根画布，容器 node ID 指其内部作用域。内部连线只写入该容器的 edges，不能跨容器接线。
- 端口 ID 由静态契约及持久化分支数据推导。单一默认端口允许省略，多端口必须明确指定；歧义时返回候选项，不按第一个猜测。禁止 DOM 测量和 `useDynamicPort`。
- 默认保护根和容器边界、配对汇合身份。不能单独删除被结构单元拥有的边界或汇合。
- 删除或替换仍有消费者的输出，必须在同一提交里明确改绑或解除所有受影响引用；常量内容中即使恰好出现旧 ID，也不参与引用重写。
- 复制和跨作用域移动要检查循环 locals、分支可见性和子工作流依赖，不自动带入其他工程的 ID。

### 布局

修改参数、标题、模型和长文本不改变任何节点的位置。已有图的结构编辑默认只做局部让位及容器尺寸调整，不整图重排。

插入节点仅移动确实受影响的局部下游；新增分支只安排新分支和必要的汇合位置。回执列出所有因局部布局而移动的节点，不能藏在“只插入一个节点”的摘要后面。

从空文档一次创建完整图时，可明确指定提交后对新建作用域自动布局。用户要求整理已有图时调用 `layout_workflow`，精确说明范围；不让每个结构编辑都触发全局布局。

## 7. 回执、版本、幂等和错误

```json
{
  "ok": true,
  "context": {"workflowId":"workflow_id","revision":19},
  "data": {
    "changeId":"change_id",
    "mutationId":"request_id",
    "baseRevision":18,
    "changedNodes":["chapter_writer"],
    "changedPaths":[{"nodeId":"chapter_writer","path":"/inputsValues/prompt"}],
    "createdNodes":[],
    "removedNodes":[],
    "movedNodes":[],
    "topologyChanged":false,
    "validation":{"executable":true,"errorCount":0,"warningCount":0},
    "diffRef":"result_id"
  }
}
```

- `expectedRevision` 是比较并交换依据。冲突返回最新版本及已知的重叠节点／字段，不自动重试写入，不要求整图重读。按需读取受影响节点，再提交新 mutation。
- 同一工作流和调用者的 `mutationId` 绑定请求内容 hash。相同请求返回原回执，即使当前 revision 已前进；同 key 不同内容返回 `IDEMPOTENCY_CONFLICT`。先查重，再检查 revision。
- 超时或连接中断先用 `get_workflow_change` 核实结果，不能换 mutation ID 盲目重做。变更不存在才按原 key 重试；正在恢复的请求返回 pending，不假装不存在。
- `dryRun:true` 在同一基准版本上运行完全相同的校验与局部布局计算，返回影响范围和问题，不保存、不增加 revision、不发修改事件。正式提交重新检查 revision，不把 dry run 当作锁。
- 正常提交只增加一次 revision；无实质变化返回 `changed:false`，不制造空版本。失败零变更。
- 变化对象、移动对象和问题列表也遵守响应预算：返回计数、最多 20 个摘要及完整 diff 引用，不能在大规模布局时让回执变成另一份整图。
- 草稿允许缺少必填配置或尚未连通，但回执必须区分 `draftSaved` 与 `executable`。身份损坏、非法端口、跨作用域边、非法环、悬空引用和破坏结构配对属于不可提交错误。整组操作最终检查，允许过程中暂时断开后再接回。
- 配置缺失等既有问题不会要求 Agent 顺便重写其他节点。回执分别返回新问题、解决的问题和剩余计数。
- 对相关节点的局部验证只作为局部结论，不标记全图通过；运行前始终检查完整冻结定义及依赖。
- `revert_workflow_change` 求原变更的逆操作，只改原范围。后续存在重叠修改时返回冲突，不用整图旧快照覆盖其他人的新工作。撤销图修改不撤销已经发生的外部调用。

错误格式统一为可行动的结构，消息为英文：

```json
{
  "ok":false,
  "error":{
    "code":"AMBIGUOUS_TEXT_MATCH",
    "message":"Expected one exact match; found three. No changes were applied.",
    "operationIndex":0,
    "nodeId":"chapter_writer",
    "path":"/inputsValues/prompt/content",
    "details":{"expectedMatches":1,"actualMatches":3},
    "recovery":{"tool":"read_workflow","view":"fields","nodeIds":["chapter_writer"]}
  }
}
```

至少定义 `REVISION_CONFLICT / IDEMPOTENCY_CONFLICT / NODE_NOT_FOUND / FIELD_NOT_FOUND / INVALID_BINDING / INVALID_SCOPE / INVALID_PORT / AMBIGUOUS_PORT / REFERENCED_NODE / PROTECTED_STRUCTURE / AMBIGUOUS_TEXT_MATCH / SNAPSHOT_EXPIRED / RESULT_NOT_FOUND / FORBIDDEN`，以及操作参数 schema 错误。错误不能附送整份图。

## 8. 运行追踪与结果读取

`read_run` 不再默认返回输出正文、50 条事件和完整 manifest。默认只包含运行事实：状态、冻结版本、开始／结束／持续时间、执行统计、错误起点，以及可继续读取的结果引用。

步骤的主键是 `executionId`。同一 node ID 在循环中出现一百次，就有一百个独立执行实例；`parentExecutionId`、iteration 和 attempt 作为结构字段，不能把所有轮次塞在同一节点结果里。

`read_run_step` 按 section 返回输入、输出、错误、模型用量或工具调用。对于大对象给键目录，对数组给完整元素页，对文本给指定行；绝不返回半截序列化 JSON 再要求模型手工拼接。

`read_workflow(source=run)` 使用该次运行冻结的定义与节点 ID。定位工具返回文档／运行／执行实例的结构化引用，UI 可直接打开相应历史画布并聚焦错误节点，不需 Agent 再描述一次节点位置。

`run_workflow` 与 `test_node` 的幂等键绑定当前项目、调用者、目标版本和输入。查询、分页、重新连接均不重跑。业务确实要求重跑时使用新的 key 并产生新的 run。

取消只作用于指定 run 及其拥有的可取消子执行，不取消其他来源的运行；响应 ACK 与权威终态分开。工具输出保持“已发起”“运行中”“已完成”“失败”“停止中”“已停止”的实际区别。

## 9. 内置 Agent、MCP、工作流 Agent 与 UI

### 共用一个 Rust 注册表和操作内核

注册表统一保存 tool 名称、描述、输入输出 schema、读写属性、作用域、调用权限、幂等策略、取消语义和 UI 动作身份。Agent 和 MCP 不分别维护一份工具名单及 dispatch 分支。

MCP 的 `structuredContent` 返回规范结构，文本 content 只放短摘要与引用，不再把同一份大 JSON 同时完整复制到两个字段。只消费文本的客户端使用可解析的紧凑结果或同一结果引用；支持 MCP 分页，不擅自引入专有的工具注册协议。

| 调用者 | 数据来源 | 可用能力 |
| --- | --- | --- |
| 项目内置助手 | 明确当前工程、草稿与授权运行 | 发现、读写、校验；运行仍遵循用户授权范围 |
| 创作 MCP 客户端 | 明确授权项目上下文 | 与内置助手相同的领域契约，受调用身份限制 |
| 工作流中的 Agent 节点 | 当前运行冻结的依赖集合 | 只读发现、节点契约、冻结工作流与所属运行结果 |
| 发布后的业务 MCP 消费者 | 已发布能力与其拥有的运行 | 继续只暴露发布业务操作和运行查询，不暴露图编辑工具 |

工作流 Agent 不能通过 `search_tools` 加载写工具，也不能通过 resultId 读取其他运行的结果。发布运行不能经 `read_workflow` 落到最新草稿。所有引用读取重新校验归属与授权，工具发现不扩大权限。

### UI 接收差异，不重置编辑器

编辑提交后事件携带 `workflowId / baseRevision / revision / changeId / affectedNodeIds / diffRef`。前端在既有画布实例里执行对应编辑事务，保留选择、视口、已打开节点面板和输入草稿。

本地未保存修改与远端 patch 不相交时可确定性重放；相交时保留双方变更并展示冲突，不覆盖用户草稿。漏事件或 baseRevision 不连续时先补变更日志；日志不可用才取规范快照，并在原编辑器中协调恢复。

工具消息默认展示“修改 1 个节点的 Prompt”“在两节点间插入 HTTP 请求”“增加 1 条分支”等短摘要，展开才读字段 diff；完整原始值按需取。图标根据动作语义区分编辑、插入、连线、复制、布局、校验、运行和查询，状态图标与工具身份分开。

搜索工具、搜索节点类型、读取模型目录不打开工作台。实际读取目标图或成功编辑才产生文档活动；继续遵守当前会话的自动打开／用户收起规则。

### 持久化不能伪装成跨文件事务

当前规范工作流是 JSON 文件、索引和消息是 SQLite。实现时不能在一个 SQL transaction 外写文件，却宣称所有动作已经原子化。

在项目写锁下检查幂等与 revision，生成候选图及 diff；用可恢复的变更 journal 记录意图和前后 hash，原子替换规范文件，再提交索引、回执和事件 outbox。崩溃恢复先根据 journal 和文件 hash 完成或撤销未完成提交，然后才接受新编辑；不能只发成功事件后再写文件。

读取快照、变更前后内容与结果引用使用不可变内容 hash，运行依赖继续固定。历史回执保留必要的去重依据。当前保留策略为项目存续期间持续保留读取快照、变更 diff 和工具大结果，不按创建时间自动过期；随项目彻底删除或用户明确清空历史时回收，避免运行、未完成会话和撤销回执中的引用失效。

## 10. 典型调用

### 仅修改一个节点的 Prompt

已有节点 ID 和当前 revision 时不重新列整个项目；下面仅展示必要读取和编辑。工具契约已加载时直接复用。

```json
{
  "tool":"read_workflow",
  "arguments":{
    "workflowId":"workflow_id",
    "view":"nodes",
    "nodeIds":["chapter_writer"],
    "paths":["/title","/inputsValues/prompt"]
  }
}
```

```json
{
  "tool":"edit_workflow",
  "arguments":{
    "workflowId":"workflow_id",
    "expectedRevision":18,
    "mutationId":"request_id",
    "operations":[{
      "op":"replace_text",
      "nodeId":"chapter_writer",
      "path":"/inputsValues/prompt/content",
      "edits":[{
        "oldText":"Write in first person.",
        "newText":"Write in third person.",
        "expectedMatches":1
      }]
    }]
  }
}
```

输入不含其他节点、连线、坐标或完整 Prompt，输出是第 7 节的小型回执。若 Prompt 是模板绑定，读取契约和当前字段后仍操作其实际字符串路径；不是用猜测的统一格式覆盖它。

### 修改一个输入值

```json
{
  "workflowId":"workflow_id",
  "expectedRevision":19,
  "mutationId":"request_2",
  "operations":[{
    "op":"update_node",
    "nodeId":"wait_before_request",
    "set":{"/inputsValues/durationMs":{"type":"constant","content":2000}}
  }]
}
```

### 在循环内部插入一个节点

先按需读取 `chapter_loop` 的 outline，得到真实边界、连线和端口；只提交插入操作：

```json
{
  "workflowId":"workflow_id",
  "expectedRevision":20,
  "mutationId":"request_3",
  "operations":[{
    "op":"insert_node",
    "scopeId":"chapter_loop",
    "edge":{"sourceNodeID":"chapter_in","targetNodeID":"chapter_writer"},
    "nodeType":"wait",
    "nodeId":"chapter_throttle",
    "fields":{"/inputsValues/durationMs":{"type":"constant","content":500}}
  }]
}
```

后端处理移除旧边、添加节点、连接两条新边、局部让位及作用域校验。外层图与其他循环保持原样。

### 排查某次失败并修复

`read_run` 获取失败 execution ID → `read_run_step(section=error)` 查看错误 → 按 run 来源读取该节点及相邻拓扑 → 对比当前草稿中该节点 → 以当前草稿 revision 提交最小修复。用户要求重新试运行时才启动新的 run，保留原运行用于比较。

## 11. 实现覆盖与验收

这是一套完整替换方案，不只新增 patch 工具却把全量读写入口继续作为默认路径。实现需同时覆盖 Rust 工具注册、Agent prompt、创作 MCP、发布运行只读绑定、参数校验、修改持久化、UI 差异投影及结果分页。

| 场景 | 必须验证的结果 |
| --- | --- |
| 200 节点工作流修改 1 个字段 | 请求只含目标字段；其他节点、连线与位置完全不变；响应不携带整图 |
| 长 Prompt 中改一句 | 只读取必要文本页，精确匹配替换；多匹配时零修改 |
| 同名节点 | 使用稳定 ID，标题重名不会误改 |
| 嵌套循环内插节点 | 内边只进入正确容器；局部变量与边界结构保持合法 |
| 多端口、分支和汇合 | 指定真实端口；增删分支同步配对汇合，不误改其他分支 |
| 删除被引用节点 | 返回引用字段；同一批明确修复后可提交，否则零修改 |
| 调整数组中的一行 | 按稳定键或版本加 hash 修改；其他行、顺序及未知字段保持原样 |
| 多操作中最后一个失败 | 文件、索引、revision、回执和 UI 都不存在部分成功 |
| 手动编辑与 Agent 并发 | CAS 冲突，返回局部恢复信息；不覆盖任何一方的草稿 |
| 响应丢失后重试 | 同 key 同内容返回原结果；同 key 不同内容冲突；不重复创建和运行 |
| 保存过程中崩溃 | journal 恢复后，规范文件、索引与变更回执一致 |
| 旧运行回看 | 读取冻结定义；循环同一节点的多次执行分别定位 |
| 大 JSON 结果 | 每页都是可解析的完整结构，游标稳定，不重复查询原操作 |
| 权限与来源 | 跨项目 ID、越权 resultId、运行 Agent 写调用均被拒绝 |
| UI 实时接收变更 | 画布实例、缩放、选择和草稿保留；只更新受影响节点 |
| 整图重建企图 | Agent 工具契约不存在 `save_workflow` 或任意整图替换操作 |

性能验收记录实际序列化请求／响应大小，不预先声称固定百分比节省。相同的单节点修改在 20、200、1000 节点图中，读写正文应随命中片段和变更大小增长，而不是随整图节点数增长；复杂拓扑验证的后端计算仍可遍历全图。

提示词最终只保留：工程边界、沟通规则、按需发现、精确修改、版本与幂等、执行事实、用户授权。节点格式、所有原子节点和图控制规则从常驻长提示中迁到可读取的契约与注册表校验中。


## 12. Implementation verification

The desktop consumes committed, ID-normalized change journal pages before falling back to a canonical snapshot. Duplicate events are ignored by revision; replay validates each before-value. Existing canvas reconciliation preserves the mounted editor, selection, viewport and inspector. Conflicting drafts have a field-level comparison and explicit local/latest choices; independent changes are merged. Draft persistence includes the base revision and schema.

Tool details read the immutable patch only after expansion and show before/after fields. Single calls have one disclosure within the turn process; arguments remain collapsed. Large values are read through structured, Unicode-safe pages rather than re-executing the original action. Text-only MCP clients receive consumable result pages.

Execution contracts include schemas, enumerated values, row structures, defaults, structural/static-port rules and examples; `knownHashes` revalidates cached contracts. `describe_tool(operations=...)` returns only requested operation guidance. Full validation includes dependencies and configured/frozen model bindings. Local validation explicitly reports a partial scope and never asserts global executability.

Project package format 3 carries tool values, committed mutation journals and resolved execution receipts with history. Import retains immutable value bytes/hashes, rebinds project authority, and does not replay operations. Integration coverage verifies result reads, pinned definitions, idempotency and undo after import. Older prototype package formats are rejected.

Regression coverage includes nested scopes/static ports, atomic rollback, text matching, output-reference rebinding (including templates), partial collection updates/unsets, independent field/row/node undo, concurrent draft resolution, journal catch-up, descendant model/tool execution reads, Unicode byte budgets, snapshot pagination, read-only run ownership, and portable history. Scale checks exercise 20, 200 and 1000 nodes through the public tool dispatcher, measuring request/receipt/field-read size and asserting unchanged coordinates; these are local measurements, not latency guarantees.


Local public-dispatcher scale sample (2026-10-23; a field edit, not workflow generation):

| Nodes | Request bytes | Receipt bytes | Targeted field-read bytes | Edit time (ms) |
| --- | --- | --- | --- | --- |
| 20 | 177 | 1469 | 845 | 194 |
| 200 | 178 | 1473 | 846 | 70 |
| 1000 | 179 | 1476 | 847 | 409 |

Each fixture keeps 1000-character values on its ordinary nodes. Receipt and field-read sizes stay independent of unrelated graph content; every original node position is checked. Timings include local persistence/validation and reflect warm-up variation.
