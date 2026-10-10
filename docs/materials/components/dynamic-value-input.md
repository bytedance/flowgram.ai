import { SourceCode } from '@theme';
import { BasicStory, WithSchemaStory } from 'components/form-materials/components/dynamic-value-input';

# DynamicValueInput

DynamicValueInput 是一个动态值输入组件，支持常量和变量两种输入模式。它可以根据提供的 schema 自动选择合适的输入类型，并提供变量选择功能。组件能够智能地在常量输入和变量选择之间切换。

<br />

<div>
  <img loading="lazy" src="/materials/dynamic-value-input.png" alt="DynamicValueInput 组件" style={{ width: '50%' }} />
</div>

## 案例演示

### 基本使用

<BasicStory />

```tsx pure title="form-meta.tsx"
import { DynamicValueInput } from '@flowgram.ai/form-materials';

const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <Field<any> name="dynamic_value_input">
        {({ field }) => (
          <DynamicValueInput value={field.value} onChange={(value) => field.onChange(value)} />
        )}
      </Field>
    </>
  ),
}
```

### 带 Schema 约束

<WithSchemaStory />

```tsx pure title="form-meta.tsx"
import { DynamicValueInput } from '@flowgram.ai/form-materials';

const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <Field<any> name="dynamic_value_input">
        {({ field }) => (
          <DynamicValueInput
            value={field.value}
            onChange={(value) => field.onChange(value)}
            schema={{ type: 'string' }}
          />
        )}
      </Field>
    </>
  ),
}
```

## API 参考

### DynamicValueInput Props

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `value` | `IFlowConstantRefValue` | - | 输入值，支持常量或变量引用 |
| `onChange` | `(value?: IFlowConstantRefValue) => void` | - | 值变化时的回调函数 |
| `readonly` | `boolean` | `false` | 是否为只读模式 |
| `hasError` | `boolean` | `false` | 是否显示错误状态 |
| `style` | `React.CSSProperties` | - | 自定义样式 |
| `schema` | `IJsonSchema` | - | 约束输入类型的 JSON Schema |
| `constantProps` | `ConstantInputProps` | - | 传递给常量输入组件的额外属性 |

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/dynamic-value-input" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials components/dynamic-value-input
```

### 目录结构讲解

```
dynamic-value-input/
├── index.tsx           # 主组件实现，包含 DynamicValueInput 核心逻辑
├── hooks.ts            # 自定义 Hooks，处理变量引用和 schema 选择
└── styles.css          # 样式文件
```

### 核心实现说明

#### 变量引用处理

通过 `useRefVariable` Hook 获取变量引用信息：

```typescript
const refVariable = useRefVariable(value);
```

#### Schema 选择管理

通过 `useSelectSchema` Hook 管理类型选择：

```typescript
const [selectSchema, setSelectSchema] = useSelectSchema(
  schemaFromProps,
  constantProps,
  value
);
```

#### 模式切换逻辑

组件通过判断 `value.type` 来决定渲染常量输入还是变量选择器：

```typescript
if (value?.type === 'ref') {
  // 渲染变量选择器
  return <InjectVariableSelector />;
} else {
  // 渲染常量输入
  return <ConstantInput />;
}
```

### 整体流程

```mermaid
graph TD
    A[DynamicValueInput 组件] --> B{判断输入模式}
    B -->|常量模式| C[渲染常量输入]
    B -->|变量模式| D[渲染变量选择器]

    C --> E[根据 schema 选择输入类型]
    D --> F[显示可用变量列表]

    E --> G[用户输入值]
    F --> H[用户选择变量]

    G --> I[生成常量值]
    H --> J[生成变量引用]

    I --> K[onChange 回调]
    J --> K

```

### 使用到的 flowgram API

[**@flowgram.ai/json-schema**](https://github.com/bytedance/flowgram.ai/tree/main/packages/variable/json-schema)

* [`JsonSchemaUtils`](https://flowgram.ai/auto-docs/json-schema/modules/JsonSchemaUtils): JSON Schema 工具类
* [`IJsonSchema`](https://flowgram.ai/auto-docs/json-schema/interfaces/IJsonSchema): JSON Schema 类型定义
* [`useTypeManager`](https://flowgram.ai/auto-docs/json-schema/functions/useTypeManager): 类型管理器 Hook

[**@flowgram.ai/variable-core**](https://github.com/bytedance/flowgram.ai/tree/main/packages/variable/variable-engine/core)

* [`useScopeAvailable`](https://flowgram.ai/auto-docs/variable-core/functions/useScopeAvailable): 获取当前作用域的可用变量

### 依赖的其他物料

[**TypeSelector**](/materials/components/type-selector.md) 类型选择器

[**ConstantInput**](/materials/components/constant-input.md) 常量输入组件

[**VariableSelector**](/materials/components/variable-selector.md) 变量选择器

* `InjectVariableSelector`: 依赖注入变量选择器

[**FlowValue**](/materials/common/flow-value.md)

* `IFlowConstantRefValue`: 常量或变量引用值类型

[**InjectMaterial**](/materials/common/inject-material.md) 可注入物料组件

* `createInjectMaterial`: 创建可注入的物料组件
