import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/components/display-schema-tree';

# DisplaySchemaTree

DisplaySchemaTree 是一个用于可视化展示 JSON Schema 结构的树形组件，可以递归地展示对象、数组等复杂数据结构的层级关系。

## 案例演示

### 基本使用

<BasicStory />

```tsx pure title="form-meta.tsx"
import { DisplaySchemaTree } from '@flowgram.ai/form-materials';

const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <DisplaySchemaTree
        value={{
          type: 'object',
          properties: {
            transaction_id: { type: 'integer' },
            amount: { type: 'number' },
            description: { type: 'string' },
            archived: { type: 'boolean' },
            owner: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                friends: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      username: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        }}
      />
    </>
  ),
}
```

## API 参考

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | `IJsonSchema` | `{}` | 要展示的 JSON Schema 对象 |
| drilldown | `boolean` | `true` | 是否展开嵌套的属性结构 |
| showIcon | `boolean` | `true` | 是否显示类型图标 |
| typeManager | `JsonSchemaTypeManager` | - | 类型管理器，用于获取类型相关信息 |

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/display-schema-tree" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials components/display-schema-tree
```

### 目录结构讲解

```plaintext
components/display-schema-tree/
├── index.tsx  # 组件主要实现文件
└── styles.css # 组件样式文件
```

### 核心实现说明

DisplaySchemaTree 组件通过递归渲染的方式展示 JSON Schema 的层级结构。

它使用 `useTypeManager` 获取类型相关信息，包括图标、显示文本等。组件内部递归渲染 Schema 的子属性，支持多级嵌套的数据结构展示。

### 依赖梳理

#### flowgram API

[**@flowgram.ai/json-schema**](https://github.com/bytedance/flowgram.ai/tree/main/packages/json-schema)

* [`IJsonSchema`](https://flowgram.ai/auto-docs/json-schema/interfaces/IJsonSchema): JSON Schema 类型定义
* [`useTypeManager`](https://flowgram.ai/auto-docs/json-schema/functions/useTypeManager): 类型管理器 Hook
