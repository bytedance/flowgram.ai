# FlowGram.AI - Demo Free Layout

自由布局最佳实践 demo

## 安装 

```shell
npx @flowgram.ai/create-app@latest free-layout
```

## 项目概览

### 核心技术栈
- **前端框架**: React 18 + TypeScript
- **构建工具**: Rsbuild (基于 Rspack 的现代构建工具)
- **样式方案**: Less + Styled Components + CSS Variables
- **UI 组件库**: Semi Design (@douyinfe/semi-ui)
- **状态管理**: 基于 Flowgram 自研的编辑器框架
- **依赖注入**: Inversify

### 核心依赖包

- **@flowgram.ai/free-layout-editor**: 自由布局编辑器核心依赖
- **@flowgram.ai/free-snap-plugin**: 自动对齐及辅助线插件
- **@flowgram.ai/free-lines-plugin**: 连线渲染插件
- **@flowgram.ai/free-node-panel-plugin**: 节点添加面板渲染插件
- **@flowgram.ai/minimap-plugin**: 缩略图插件
- **@flowgram.ai/free-container-plugin**: 子画布插件
- **@flowgram.ai/free-group-plugin**: 分组插件
- **@flowgram.ai/form-materials**: 表单物料
- **@flowgram.ai/runtime-interface**: 运行时接口
- **@flowgram.ai/runtime-js**: js 运行时模块
- **@flowgram.ai/panel-manager-plugin**:  侧边栏面板管理

## 代码说明

### 目录结构
```
src/
├── app.tsx                  # 应用入口文件
├── editor.tsx               # 编辑器主组件
├── initial-data.ts          # 初始化数据配置
├── assets/                  # 静态资源
├── components/              # 组件库
│   ├── index.ts
│   ├── add-node/            # 添加节点组件
│   ├── base-node/           # 基础节点组件
│   ├── comment/             # 注释组件
│   ├── group/               # 分组组件
│   ├── line-add-button/     # 连线添加按钮
│   ├── node-menu/           # 节点菜单
│   ├── node-panel/          # 节点添加面板
│   ├── selector-box-popover/ # 选择框弹窗
│   ├── sidebar/             # 侧边栏
│   ├── testrun/             # 测试运行组件
│   │   ├── hooks/           # 测试运行钩子
│   │   ├── node-status-bar/ # 节点状态栏
│   │   ├── testrun-button/  # 测试运行按钮
│   │   ├── testrun-form/    # 测试运行表单
│   │   ├── testrun-json-input/ # JSON输入组件
│   │   └── testrun-panel/   # 测试运行面板
│   └── tools/               # 工具组件
├── context/                 # React Context
│   ├── node-render-context.ts # 当前渲染节点 Context
│   ├── sidebar-context        # 侧边栏 Context
├── form-components/         # 表单组件库
│   ├── form-content/        # 表单内容
│   ├── form-header/         # 表单头部
│   ├── form-inputs/         # 表单输入
│   └── form-item/           # 表单项
│   └── feedback.tsx         # 表单校验错误渲染
├── hooks/                   
│   ├── index.ts
│   ├── use-editor-props.tsx # 编辑器属性钩子
│   ├── use-is-sidebar.ts    # 侧边栏状态钩子
│   ├── use-node-render-context.ts # 节点渲染上下文钩子
│   └── use-port-click.ts    # 端口点击钩子
├── nodes/                    # 节点定义
│   ├── index.ts
│   ├── constants.ts         # 节点常量定义
│   ├── default-form-meta.ts # 默认表单元数据
│   ├── block-end/           # 块结束节点
│   ├── block-start/         # 块开始节点
│   ├── break/               # 中断节点
│   ├── code/                # 代码节点
│   ├── comment/             # 注释节点
│   ├── condition/           # 条件节点
│   ├── continue/            # 继续节点
│   ├── end/                 # 结束节点
│   ├── group/               # 分组节点
│   ├── http/                # HTTP节点
│   ├── llm/                 # LLM节点
│   ├── loop/                # 循环节点
│   ├── start/               # 开始节点
│   └── variable/            # 变量节点
├── plugins/                 # 插件系统
│   ├── index.ts
│   ├── context-menu-plugin/ # 右键菜单插件
│   ├── runtime-plugin/      # 运行时插件
│   │   ├── client/          # 客户端
│   │   │   ├── browser-client/ # 浏览器客户端
│   │   │   └── server-client/  # 服务器客户端
│   │   └── runtime-service/ # 运行时服务
│   └── variable-panel-plugin/ # 变量面板插件
│       └── components/      # 变量面板组件
├── services/                 # 服务层
│   ├── index.ts
│   └── custom-service.ts    # 自定义服务
├── shortcuts/                # 快捷键系统
│   ├── index.ts
│   ├── constants.ts         # 快捷键常量
│   ├── shortcuts.ts         # 快捷键定义
│   ├── type.ts              # 类型定义
│   ├── collapse/            # 折叠快捷键
│   ├── copy/                # 复制快捷键
│   ├── delete/              # 删除快捷键
│   ├── expand/              # 展开快捷键
│   ├── paste/               # 粘贴快捷键
│   ├── select-all/          # 全选快捷键
│   ├── zoom-in/             # 放大快捷键
│   └── zoom-out/            # 缩小快捷键
├── styles/                   # 样式文件
├── typings/                  # 类型定义
│   ├── index.ts
│   ├── json-schema.ts       # JSON Schema类型
│   └── node.ts              # 节点类型定义
└── utils/                    # 工具函数
    ├── index.ts
    └── on-drag-line-end.ts  # 拖拽连线结束处理
```

### 关键目录功能说明

#### 1. `/components` - 组件库
- **base-node**: 所有节点的基础渲染组件
- **testrun**: 完整的测试运行功能模块，包含状态栏、表单、面板等
- **sidebar**: 侧边栏组件，提供工具和属性面板
- **node-panel**: 节点添加面板，支持拖拽添加新节点

#### 2. `/nodes` - 节点系统
每个节点类型都有独立的目录，包含：
- 节点注册信息 (`index.ts`)
- 表单元数据定义 (`form-meta.ts`)
- 节点特定的组件和逻辑

#### 3. `/plugins` - 插件系统
- **runtime-plugin**: 支持浏览器和服务器两种运行模式
- **context-menu-plugin**: 右键菜单功能
- **variable-panel-plugin**: 变量管理面板

#### 4. `/shortcuts` - 快捷键系统
完整的快捷键支持，包括：
- 基础操作：复制、粘贴、删除、全选
- 视图操作：放大、缩小、折叠、展开
- 每个快捷键都有独立的实现模块

## 应用架构设计

### 核心设计模式

#### 1. 插件化架构 (Plugin Architecture)
应用采用高度模块化的插件系统，每个功能都作为独立插件存在：

```typescript
plugins: () => [
  createFreeLinesPlugin({ renderInsideLine: LineAddButton }),
  createMinimapPlugin({ /* 配置 */ }),
  createFreeSnapPlugin({ /* 对齐配置 */ }),
  createFreeNodePanelPlugin({ renderer: NodePanel }),
  createContainerNodePlugin({}),
  createFreeGroupPlugin({ groupNodeRender: GroupNodeRender }),
  createContextMenuPlugin({}),
  createRuntimePlugin({ mode: 'browser' }),
  createVariablePanelPlugin({})
]
```

#### 2. 节点注册系统 (Node Registry Pattern)
通过注册表模式管理不同类型的工作流节点：

```typescript
export const nodeRegistries: FlowNodeRegistry[] = [
  ConditionNodeRegistry,    // 条件节点
  StartNodeRegistry,        // 开始节点
  EndNodeRegistry,          // 结束节点
  LLMNodeRegistry,          // LLM节点
  LoopNodeRegistry,         // 循环节点
  CommentNodeRegistry,      // 注释节点
  HTTPNodeRegistry,         // HTTP节点
  CodeNodeRegistry,         // 代码节点
  // ... 更多节点类型
];
```

#### 3. 依赖注入模式 (Dependency Injection)
使用 Inversify 框架实现服务的依赖注入：

```typescript
onBind: ({ bind }) => {
  bind(CustomService).toSelf().inSingletonScope();
}
```

## 核心功能分析

### 1. 编辑器配置系统

`useEditorProps` 是整个编辑器的配置中心，包含：

```typescript
export function useEditorProps(
  initialData: FlowDocumentJSON,
  nodeRegistries: FlowNodeRegistry[]
): FreeLayoutProps {
  return useMemo<FreeLayoutProps>(() => ({
    background: true,                    // 背景网格
    readonly: false,                     // 是否只读
    initialData,                         // 初始数据
    nodeRegistries,                      // 节点注册表
    
    // 核心功能配置
    playground: { preventGlobalGesture: true /* 阻止 mac 浏览器手势翻页 */ },
    nodeEngine: { enable: true },
    variableEngine: { enable: true },
    history: { enable: true, enableChangeNode: true },
    
    // 业务逻辑配置
    canAddLine: (ctx, fromPort, toPort) => { /* 连线规则 */ },
    canDeleteLine: (ctx, line) => { /* 删除连线规则 */ },
    canDeleteNode: (ctx, node) => { /* 删除节点规则 */ },
    canDropToNode: (ctx, params) => { /* 拖拽规则 */ },
    
    // 插件配置
    plugins: () => [/* 插件列表 */],
    
    // 事件处理
    onContentChange: debounce((ctx, event) => { /* 自动保存 */ }, 1000),
    onInit: (ctx) => { /* 初始化 */ },
    onAllLayersRendered: (ctx) => { /* 渲染完成 */ }
  }), []);
}
```

### 2. 节点类型系统

应用支持多种工作流节点类型：

```typescript
export enum WorkflowNodeType {
  Start = 'start',           // 开始节点
  End = 'end',               // 结束节点
  LLM = 'llm',               // 大语言模型节点
  HTTP = 'http',             // HTTP请求节点
  Code = 'code',             // 代码执行节点
  Variable = 'variable',     // 变量节点
  Condition = 'condition',   // 条件判断节点
  Loop = 'loop',             // 循环节点
  BlockStart = 'block-start', // 子画布开始节点
  BlockEnd = 'block-end',    // 子画布结束节点
  Comment = 'comment',       // 注释节点
  Continue = 'continue',     // 继续节点
  Break = 'break',           // 中断节点
}
```

每个节点都遵循统一的注册模式：

```typescript
export const StartNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Start,
  meta: {
    isStart: true,
    deleteDisable: true,        // 不可删除
    copyDisable: true,          // 不可复制
    nodePanelVisible: false,    // 不在节点面板显示
    defaultPorts: [{ type: 'output' }],
    size: { width: 360, height: 211 }
  },
  info: {
    icon: iconStart,
    description: '工作流的起始节点，用于设置启动工作流所需的信息。'
  },
  formMeta,                     // 表单配置
  canAdd() { return false; }    // 不允许添加多个开始节点
};
```

### 3. 插件化架构

应用的功能通过插件系统实现模块化：

#### 核心插件列表
1. **FreeLinesPlugin** - 连线渲染和交互
2. **MinimapPlugin** - 缩略图导航
3. **FreeSnapPlugin** - 自动对齐和辅助线
4. **FreeNodePanelPlugin** - 节点添加面板
5. **ContainerNodePlugin** - 容器节点（如循环节点）
6. **FreeGroupPlugin** - 节点分组功能
7. **ContextMenuPlugin** - 右键菜单
8. **RuntimePlugin** - 工作流运行时
9. **VariablePanelPlugin** - 变量管理面板

### 4. 运行时系统

应用支持两种运行模式：

```typescript
createRuntimePlugin({
  mode: 'browser',              // 浏览器模式
  // mode: 'server',            // 服务器模式
  // serverConfig: {
  //   domain: 'localhost',
  //   port: 4000,
  //   protocol: 'http',
  // },
})
```

## 设计理念与架构优势

### 1. 高度模块化
- **插件化架构**: 每个功能都是独立插件，易于扩展和维护
- **节点注册系统**: 新节点类型可以轻松添加，无需修改核心代码
- **组件化设计**: UI组件高度复用，职责清晰

### 2. 类型安全
- **完整的TypeScript支持**: 从配置到运行时的全链路类型保护
- **JSON Schema集成**: 节点数据结构通过Schema验证
- **强类型的插件接口**: 插件开发有明确的类型约束

### 3. 用户体验优化
- **实时预览**: 支持工作流的实时运行和调试
- **丰富的交互**: 拖拽、缩放、对齐、快捷键等完整的编辑体验
- **可视化反馈**: 缩略图、状态指示、连线动画等视觉反馈

### 4. 扩展性设计
- **开放的插件系统**: 第三方可以轻松开发自定义插件
- **灵活的节点系统**: 支持自定义节点类型和表单配置
- **多运行时支持**: 浏览器和服务器双模式运行

### 5. 性能优化
- **按需加载**: 组件和插件支持按需加载
- **防抖处理**: 自动保存等高频操作的性能优化

## 技术亮点

### 1. 自研编辑器框架
基于 `@flowgram.ai/free-layout-editor` 自研框架，提供：
- 自由布局的画布系统
- 完整的撤销/重做功能
- 节点和连线的生命周期管理
- 变量引擎和表达式系统

### 2. 先进的构建配置
使用 Rsbuild 作为构建工具：

```typescript
export default defineConfig({
  plugins: [pluginReact(), pluginLess()],
  source: {
    entry: { index: './src/app.tsx' },
    decorators: { version: 'legacy' }  // 支持装饰器
  },
  tools: {
    rspack: {
      ignoreWarnings: [/Critical dependency/]  // 忽略特定警告
    }
  }
});
```

### 3. 国际化支持
内置多语言支持：

```typescript
i18n: {
  locale: navigator.language,
  languages: {
    'zh-CN': {
      'Never Remind': '不再提示',
      'Hold {{key}} to drag node out': '按住 {{key}} 可以将节点拖出',
    },
    'en-US': {},
  }
}
```

