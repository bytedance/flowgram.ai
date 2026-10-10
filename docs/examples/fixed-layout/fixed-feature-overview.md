# 最佳实践

import { FixedFeatureOverview } from '../../../../components';

<FixedFeatureOverview />

## 安装

```shell
npx @flowgram.ai/create-app@latest fixed-layout
```

## 源码

https://github.com/bytedance/flowgram.ai/tree/main/apps/demo-fixed-layout

## 项目概览

### 核心技术栈

* **前端框架**: React 18 + TypeScript
* **构建工具**: Rsbuild (基于 Rspack 的现代构建工具)
* **样式方案**: Less + Styled Components + CSS Variables
* **UI 组件库**: Semi Design (@douyinfe/semi-ui)
* **状态管理**: 基于 Flowgram 自研的编辑器框架
* **依赖注入**: Inversify

### 核心依赖包

* **@flowgram.ai/fixed-layout-editor**: 固定布局编辑器核心依赖
* **@flowgram.ai/fixed-semi-materials**: Semi Design 物料库
* **@flowgram.ai/form-materials**: 表单物料库
* **@flowgram.ai/group-plugin**: 分组插件
* **@flowgram.ai/minimap-plugin**: 缩略图插件

## 代码说明

```
src/
├── app.tsx                    # 应用入口组件
├── editor.tsx                 # 主编辑器组件
├── index.ts                   # 模块导出入口
├── initial-data.ts            # 初始化数据配置
├── type.d.ts                  # 全局类型声明
│
├── assets/                    # 静态资源
│   ├── icon-mouse.tsx         # 鼠标图标组件
│   └── icon-pad.tsx           # 触控板图标组件
│
├── components/                # 通用组件库
│   ├── index.ts               # 组件导出入口
│   ├── node-list.tsx          # 节点列表组件
│   │
│   ├── agent-adder/           # Agent 添加器组件
│   │   └── index.tsx
│   ├── agent-label/           # Agent 标签组件
│   │   └── index.tsx
│   ├── base-node/             # 基础节点组件
│   │   ├── index.tsx
│   │   └── styles.tsx
│   ├── branch-adder/          # 分支添加器组件
│   │   ├── index.tsx
│   │   └── styles.tsx
│   ├── drag-node/             # 拖拽节点组件
│   │   ├── index.tsx
│   │   └── styles.tsx
│   ├── node-adder/            # 节点添加器组件
│   │   ├── index.tsx
│   │   ├── styles.tsx
│   │   └── utils.ts
│   ├── selector-box-popover/  # 选择框弹出层组件
│   │   └── index.tsx
│   ├── sidebar/               # 侧边栏组件
│   │   ├── index.tsx
│   │   ├── sidebar-node-renderer.tsx
│   │   ├── sidebar-provider.tsx
│   │   └── sidebar-renderer.tsx
│   └── tools/                 # 工具栏组件群
│       ├── index.tsx
│       ├── styles.tsx
│       ├── fit-view.tsx       # 适应视图工具
│       ├── minimap-switch.tsx # 缩略图开关
│       ├── minimap.tsx        # 缩略图组件
│       ├── readonly.tsx       # 只读模式切换
│       ├── run.tsx            # 运行工具
│       ├── save.tsx           # 保存工具
│       ├── switch-vertical.tsx # 垂直布局切换
│       └── zoom-select.tsx    # 缩放选择器
│
├── context/                   # React Context 状态管理
│   ├── index.ts               # Context 导出入口
│   ├── node-render-context.ts # 节点渲染上下文
│   └── sidebar-context.ts     # 侧边栏上下文
│
├── form-components/           # 表单组件库
│   ├── index.ts               # 表单组件导出入口
│   ├── feedback.tsx           # 反馈组件
│   │
│   ├── form-content/          # 表单内容组件
│   │   ├── index.tsx
│   │   └── styles.tsx
│   ├── form-header/           # 表单头部组件
│   │   ├── index.tsx
│   │   ├── styles.tsx
│   │   ├── title-input.tsx
│   │   └── utils.tsx
│   ├── form-inputs/           # 表单输入组件
│   │   ├── index.tsx
│   │   └── styles.tsx
│   ├── form-item/             # 表单项组件
│   │   ├── index.css
│   │   └── index.tsx
│   ├── form-outputs/          # 表单输出组件
│   │   ├── index.tsx
│   │   └── styles.tsx
│   └── properties-edit/       # 属性编辑组件
│       ├── index.tsx
│       ├── property-edit.tsx
│       └── styles.tsx
│
├── hooks/                     # 自定义 React Hooks
│   ├── index.ts               # Hooks 导出入口
│   ├── use-editor-props.ts    # 编辑器属性 Hook
│   ├── use-is-sidebar.ts      # 侧边栏状态 Hook
│   └── use-node-render-context.ts # 节点渲染上下文 Hook
│
├── nodes/                     # 流程节点定义
│   ├── index.ts               # 节点注册表
│   ├── default-form-meta.tsx  # 默认表单元数据
│   │
│   ├── agent/                 # Agent 节点类型
│   │   ├── index.ts
│   │   ├── agent.ts
│   │   ├── agent-llm.ts
│   │   ├── agent-memory.ts
│   │   ├── agent-tools.ts
│   │   ├── memory.ts
│   │   └── tool.ts
│   ├── break-loop/            # 跳出循环节点
│   │   ├── index.ts
│   │   └── form-meta.tsx
│   ├── case/                  # Case 分支节点
│   │   ├── index.ts
│   │   └── form-meta.tsx
│   ├── case-default/          # 默认 Case 节点
│   │   ├── index.ts
│   │   └── form-meta.tsx
│   ├── catch-block/           # 异常捕获块节点
│   │   ├── index.ts
│   │   └── form-meta.tsx
│   ├── end/                   # 结束节点
│   │   ├── index.ts
│   │   └── form-meta.tsx
│   ├── if/                    # 条件判断节点
│   │   └── index.ts
│   ├── if-block/              # 条件块节点
│   │   ├── index.ts
│   │   └── form-meta.tsx
│   ├── llm/                   # LLM 节点
│   │   └── index.ts
│   ├── loop/                  # 循环节点
│   │   ├── index.ts
│   │   └── form-meta.tsx
│   ├── start/                 # 开始节点
│   │   ├── index.ts
│   │   └── form-meta.tsx
│   ├── switch/                # Switch 分支节点
│   │   └── index.ts
│   └── trycatch/              # Try-Catch 节点
│       ├── index.ts
│       └── form-meta.tsx
│
├── plugins/                   # 插件系统
│   ├── index.ts               # 插件导出入口
│   │
│   ├── clipboard-plugin/      # 剪贴板插件
│   │   └── create-clipboard-plugin.ts
│   ├── group-plugin/          # 分组插件
│   │   ├── index.ts
│   │   ├── group-box-header.tsx
│   │   ├── group-node.tsx
│   │   ├── group-note.tsx
│   │   ├── group-tools.tsx
│   │   ├── icons/
│   │   │   └── index.tsx
│   │   └── multilang-textarea-editor/
│   │       ├── index.css
│   │       ├── index.tsx
│   │       └── base-textarea.tsx
│   └── variable-panel-plugin/ # 变量面板插件
│       ├── index.ts
│       ├── variable-panel-layer.tsx
│       ├── variable-panel-plugin.ts
│       └── components/
│           ├── full-variable-list.tsx
│           ├── global-variable-editor.tsx
│           └── variable-panel.tsx
│
├── services/                  # 服务层
│   ├── index.ts
│   └── custom-service.ts      # 自定义服务
│
├── shortcuts/                 # 快捷键系统
│   ├── index.ts
│   ├── constants.ts           # 快捷键常量
│   └── utils.ts               # 快捷键工具函数
│
└── typings/                   # 类型定义
    ├── index.ts               # 类型导出入口
    ├── json-schema.ts         # JSON Schema 类型
    └── node.ts                # 节点类型定义
```

## 架构设计分析

### 整体架构模式

该项目采用了**分层架构**和**模块化设计**相结合的架构模式：

1. **表现层 (Presentation Layer)**

* 组件层：负责 UI 渲染和用户交互
* 工具层：提供编辑器工具功能

2. **业务逻辑层 (Business Logic Layer)**

* 节点系统：定义各种流程节点的行为和属性
* 插件系统：提供可扩展的功能模块
* 服务层：处理业务逻辑和数据操作

3. **数据层 (Data Layer)**

* Context 状态管理：管理应用全局状态
* 类型系统：确保数据结构的一致性

### 核心设计模式

#### 1. 提供者模式 (Provider Pattern)

```typescript
// 主编辑器组件使用多层 Provider 嵌套
<FixedLayoutEditorProvider {...editorProps}>
  <SidebarProvider>
    <EditorRenderer />
    <DemoTools />
    <SidebarRenderer />
  </SidebarProvider>
</FixedLayoutEditorProvider>
```

**应用场景**:

* `FixedLayoutEditorProvider`: 提供编辑器核心功能和状态
* `SidebarProvider`: 管理侧边栏的显示状态和选中节点

#### 2. 注册表模式 (Registry Pattern)

```typescript
export const FlowNodeRegistries: FlowNodeRegistry[] = [
  StartNodeRegistry,
  EndNodeRegistry,
  SwitchNodeRegistry,
  LLMNodeRegistry,
  // ... 更多节点类型
];
```

**设计优势**:

* 支持动态节点类型注册
* 易于扩展新的节点类型
* 实现了节点类型的解耦

#### 3. 插件模式 (Plugin Pattern)

```typescript
plugins: () => [
  createMinimapPlugin({...}),
  createGroupPlugin({...}),
  createClipboardPlugin(),
  createVariablePanelPlugin({}),
]
```

**插件系统特点**:

* **缩略图插件**: 提供画布缩略图功能
* **分组插件**: 支持节点分组管理
* **剪贴板插件**: 实现复制粘贴功能
* **变量面板插件**: 提供变量管理界面

#### 4. 工厂模式 (Factory Pattern)

在节点创建和配置中广泛使用：

```typescript
getNodeDefaultRegistry(type) {
  return {
    type,
    meta: {
      defaultExpanded: true,
    },
  };
}
```

#### 5. 观察者模式 (Observer Pattern)

通过历史记录系统实现：

```typescript
history: {
  enable: true,
  enableChangeNode: true,
  onApply: debounce((ctx, opt) => {
    console.log('auto save: ', ctx.document.toJSON());
  }, 100),
}
```

#### 6. 策略模式 (Strategy Pattern)

在材料系统中体现：

```typescript
materials: {
  components: {
    ...defaultFixedSemiMaterials,
    [FlowRendererKey.ADDER]: NodeAdder,
    [FlowRendererKey.BRANCH_ADDER]: BranchAdder,
    // 可根据 key 替换不同的渲染策略
  }
}
```

### 状态管理架构

#### Context 系统设计

项目采用了多个专用的 Context 来管理不同领域的状态：

1. **SidebarContext**: 管理侧边栏状态

```typescript
export const SidebarContext = React.createContext<{
  visible: boolean;
  nodeId?: string;
  setNodeId: (node: string | undefined) => void;
}>({ visible: false, setNodeId: () => {} });
```

2. **NodeRenderContext**: 管理节点渲染相关状态
3. **IsSidebarContext**: 简单的布尔状态管理

#### 自定义 Hooks 设计

* `useEditorProps`: 集中管理编辑器的所有配置属性
* `useIsSidebar`: 判断当前是否在侧边栏环境中
* `useNodeRenderContext`: 获取节点渲染上下文

### 组件架构设计

#### 组件分层结构

1. **基础组件层**

* `BaseNode`: 所有节点的基础渲染组件
* `DragNode`: 拖拽状态下的节点组件

2. **功能组件层**

* 添加器组件: `NodeAdder`, `BranchAdder`, `AgentAdder`
* 工具组件: 缩放、保存、运行等功能组件

3. **容器组件层**

* `Sidebar`: 侧边栏容器及其子组件
* `Tools`: 工具栏容器

### 数据流架构

#### 初始数据结构

项目定义了完整的初始流程数据，包含多种节点类型的示例：

* **Start 节点**: 流程起始点，定义输出参数
* **Agent 节点**: 包含 LLM、Memory、Tools 子组件
* **LLM 节点**: 大语言模型处理节点
* **Switch 节点**: 条件分支节点
* **Loop 节点**: 循环处理节点
* **TryCatch 节点**: 异常处理节点
* **End 节点**: 流程结束点

#### 数据转换机制

```typescript
fromNodeJSON(node, json) {
  return json; // 数据导入时的转换逻辑
},
toNodeJSON(node, json) {
  return json; // 数据导出时的转换逻辑
}
```
