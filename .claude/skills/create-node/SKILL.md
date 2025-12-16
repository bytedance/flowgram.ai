---
skill_name: create-node
description: 用于在 FlowGram demo-free-layout 中创建新的自定义节点，支持简单节点（自动表单）和复杂节点（自定义 UI）
version: 1.0.0
tags: [flowgram, node, workflow, custom-node]
---

# FlowGram Custom Node Development

## 概述

本 SKILL 用于指导在 FlowGram 项目的 `apps/demo-free-layout/src/nodes` 目录下创建新的自定义工作流节点。

## 核心概念

### 节点数据结构

节点数据在保存时会存储到后端，基本结构如下：

```typescript
{
  id: 'node_xxxxx',           // 节点 ID
  type: 'node_type',          // 节点类型
  data: {
    title: 'Node Title',      // 节点标题
    inputsValues: { ... },    // 节点表单字段的初始值（实际的值）
    inputs: { ... },          // 节点表单的 JSON Schema（定义表单结构）
    outputs: { ... },         // 节点输出的 JSON Schema（工作流执行时的输出）
    // ... 其他自定义字段
  }
}
```

### 三个核心字段

#### 1. `data.inputsValues` - 节点表单字段的初始值

存储表单中各个字段的实际值，每个字段值包含 `type` 和 `content` 两个属性：

```typescript
inputsValues: {
  url: {
    type: 'constant',          // 常量类型
    content: 'https://...',    // 实际的值
  },
  prompt: {
    type: 'template',          // 模板类型（支持变量引用）
    content: 'Hello {var}',    // 可以引用变量
  },
}
```

**`type` 的可选值**：
- `'constant'`：常量值，不支持变量引用
- `'template'`：模板值，支持 `{variableName}` 语法引用变量
- `'variable'`：变量引用

#### 2. `data.inputs` - 节点表单的 JSON Schema

使用 JSON Schema 定义表单的结构，系统会根据这个 Schema 自动生成表单界面：

```typescript
inputs: {
  type: 'object',
  required: ['url'],           // 必填字段
  properties: {
    url: {
      type: 'string',
    },
    timeout: {
      type: 'number',
      minimum: 0,
      maximum: 60000,
    },
    prompt: {
      type: 'string',
      extra: {
        formComponent: 'prompt-editor',  // 指定自定义组件
      },
    },
  },
}
```

#### 3. `data.outputs` - 节点输出的 JSON Schema

定义节点在工作流执行时的输出数据结构，供下游节点使用：

```typescript
outputs: {
  type: 'object',
  properties: {
    body: { type: 'string' },
    statusCode: { type: 'number' },
    headers: { type: 'object' },
  },
}
```

### 三者的关系

```
inputs (JSON Schema)     →  定义表单结构
inputsValues (实际值)    →  存储表单数据
[节点执行]
outputs (JSON Schema)    →  定义输出结构
```

### 字段类型与自动组件映射

在简单节点中，字段类型会自动匹配对应的表单组件：

| 字段类型 | `extra.formComponent` | 默认组件 |
|---------|---------------------|---------|
| `string` | - | Input |
| `string` | `'prompt-editor'` | PromptEditorWithVariables |
| `number` | - | InputNumber |
| `boolean` | - | Switch |
| `object` | - | JsonCodeEditor |
| `array` | - | JsonCodeEditor |

## 节点开发模式

### 1. 简单节点（自动表单模式）

- **适用场景**：节点配置较为简单，不需要复杂的自定义 UI
- **特点**：根据 `inputs` Schema 自动生成表单
- **示例**：LLM 节点
- **文件结构**：只需要 `index.ts` 文件
- **模板位置**：`./templates/simple-node/index.ts`

### 2. 复杂节点（自定义 UI 模式）

- **适用场景**：需要自定义表单布局、特殊交互或复杂的 UI 组件
- **特点**：完全控制表单渲染和交互逻辑
- **示例**：HTTP 节点
- **文件结构**：
  ```
  {节点名}/
  ├── index.tsx                # 节点注册配置
  ├── form-meta.tsx            # 自定义表单渲染
  ├── types.tsx                # TypeScript 类型定义
  └── components/              # 自定义组件
      └── *.tsx
  ```
- **模板位置**：`./templates/complex-node/`

## 开发流程

### Step 1: 规划节点

确定节点的核心信息：
- **节点类型 ID**：唯一标识，如 `database`、`webhook`
- **节点功能**：明确节点要做什么
- **输入参数**：节点需要哪些配置项
- **输出数据**：节点执行后返回什么数据
- **UI 复杂度**：是否需要自定义 UI

### Step 2: 选择开发模式

```
是否需要自定义 UI？
├─ 否 → 使用简单节点模式（复制 templates/simple-node/）
└─ 是 → 使用复杂节点模式（复制 templates/complex-node/）
```

### Step 3: 复制模板并修改

#### 简单节点

```bash
# 复制模板
cp .claude/skills/create-node/templates/simple-node/index.ts \
   apps/demo-free-layout/src/nodes/{节点名}/index.ts

# 修改模板中的 TODO 标记
# - {NODE_NAME} → 节点名（PascalCase）
# - {NODE_TYPE} → 节点类型枚举值
# - {node_name} → 节点名（kebab-case）
# - {node_type} → 节点类型（小写）
```

#### 复杂节点

```bash
# 复制模板目录
cp -r .claude/skills/create-node/templates/complex-node \
      apps/demo-free-layout/src/nodes/{节点名}

# 修改所有文件中的 TODO 标记
```

### Step 4: 添加节点类型常量

编辑 `apps/demo-free-layout/src/nodes/constants.ts`：

```typescript
export enum WorkflowNodeType {
  // ... 现有节点
  {节点类型} = '{节点类型}',
}
```

### Step 5: 注册节点

编辑 `apps/demo-free-layout/src/nodes/index.ts`：

```typescript
// 导入节点
export { {节点名}NodeRegistry } from './{节点名}';

// 添加到注册列表
export const nodeRegistries: FlowNodeRegistry[] = [
  // ... 现有节点
  {节点名}NodeRegistry,
];
```

### Step 6: 准备节点图标

在 `apps/demo-free-layout/src/assets/` 目录下添加节点图标（SVG 或 JPG 格式）：

```
apps/demo-free-layout/src/assets/icon-{节点名}.svg
```

### Step 7: 测试验证

```bash
# 启动开发服务器
rush dev:demo-free-layout

# 在浏览器中测试节点功能
```

## 常用组件和工具

### FlowGram 组件

从 `@flowgram.ai/form-materials` 导入：

```typescript
import {
  PromptEditorWithVariables,  // 带变量的提示词编辑器
  VariableSelector,            // 变量选择器
  JsonCodeEditor,              // JSON 代码编辑器
  CodeEditor,                  // 代码编辑器
  DisplayOutputs,              // 输出字段展示
  DynamicValueInput,           // 动态值输入
  createInferInputsPlugin,     // 输入推断插件
} from '@flowgram.ai/form-materials';
```

### Semi UI 组件

从 `@douyinfe/semi-ui` 导入：

```typescript
import {
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  Divider,
} from '@douyinfe/semi-ui';
```

### 表单工具

```typescript
import { Field } from '@flowgram.ai/free-layout-editor';
import { FormItem, FormHeader, FormContent } from '../../form-components';
import { useNodeRenderContext } from '../../hooks';
```

## 最佳实践

### 1. 节点设计

- **单一职责**：一个节点只做一件事
- **清晰的 Schema**：明确定义 inputs 和 outputs
- **合理的默认值**：提供有意义的初始配置
- **友好的描述**：为节点和字段提供清晰的描述

### 2. Schema 设计

```typescript
// ✅ 好的做法：清晰的 Schema
inputs: {
  type: 'object',
  required: ['url', 'method'],
  properties: {
    url: {
      type: 'string',
      description: 'API endpoint URL',
    },
    method: {
      type: 'string',
      enum: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  },
}

// ❌ 不好的做法：缺少约束
inputs: {
  type: 'object',
  properties: {
    url: { type: 'string' },
    method: { type: 'string' },
  },
}
```

### 3. 表单组件使用

```typescript
// ✅ 好的做法：使用 Field 绑定表单状态
<Field<string> name="api.url">
  {({ field }) => (
    <Input
      value={field.value}
      onChange={(value) => field.onChange(value)}
    />
  )}
</Field>

// ❌ 不好的做法：手动管理状态
const [url, setUrl] = useState('');
<Input value={url} onChange={setUrl} />
```

### 4. 只读状态处理

```typescript
export function CustomComponent() {
  const { readonly } = useNodeRenderContext();

  return (
    <Input disabled={readonly} {...props} />
  );
}
```

## 常见问题

### Q1: 如何选择简单节点还是复杂节点？

**判断标准**：
- 字段简单 + 默认布局满足需求 → 简单节点
- 需要自定义布局/特殊交互 → 复杂节点

### Q2: 如何使用变量功能？

在 `inputs` Schema 中使用 `formComponent: 'prompt-editor'`，并在 `inputsValues` 中使用 `type: 'template'`。

### Q3: 如何定义必填字段？

在 `inputs` Schema 的 `required` 数组中列出必填字段名。

### Q4: `inputsValues` 和 `inputs` 必须一致吗？

是的。`inputsValues` 中的字段必须在 `inputs.properties` 中有对应的定义。

### Q5: 节点图标支持什么格式？

支持 SVG、JPG、PNG 格式，推荐使用 SVG。

### Q6: 如何调试节点？

1. 使用浏览器开发者工具查看 console.log
2. 在 FormRender 组件中添加 `console.log(form.getValues())`
3. 使用 React DevTools 查看组件状态

## 参考资源

### 代码示例

- **简单节点**: `apps/demo-free-layout/src/nodes/llm/`
- **复杂节点**: `apps/demo-free-layout/src/nodes/http/`
- **表单组件**: `apps/demo-free-layout/src/form-components/`
- **默认表单**: `apps/demo-free-layout/src/nodes/default-form-meta.tsx`

### 模板文件

- **简单节点模板**: `.claude/skills/create-node/templates/simple-node/`
- **复杂节点模板**: `.claude/skills/create-node/templates/complex-node/`

### 相关文档

- FlowGram 官方文档: https://flowgram.ai
- JSON Schema 规范: https://json-schema.org/
- Semi UI 组件库: https://semi.design/

### 开发命令

```bash
# 启动开发服务器
rush dev:demo-free-layout

# 构建项目
rush build

# 类型检查
rush ts-check

# 代码检查
rush lint
```

## 快速开始检查清单

创建新节点时，按照此检查清单执行：

- [ ] 规划节点功能和数据结构
- [ ] 选择开发模式（简单 vs 复杂）
- [ ] 复制对应的模板文件
- [ ] 修改模板中的 TODO 标记
- [ ] 在 `constants.ts` 中添加节点类型
- [ ] 在 `index.ts` 中注册节点
- [ ] 准备节点图标文件
- [ ] 启动开发服务器测试
- [ ] 验证节点功能正常
