import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/components/display-schema-tag';

# DisplaySchemaTag

DisplaySchemaTag 是一个用于展示 JSON Schema 的标签组件，当用户点击标签时，会弹出详细的 schema 树形结构，方便查看复杂的数据结构。

## 案例演示

### 基本使用

<BasicStory />

```tsx pure title="form-meta.tsx"
import { DisplaySchemaTag } from '@flowgram.ai/form-materials';

const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <DisplaySchemaTag
        title="Transaction"
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
| title | `JSX.Element \| string` | - | 标签显示的标题文本 |
| value | `IJsonSchema` | `{}` | 要展示的 JSON Schema 对象 |
| showIconInTree | `boolean` | - | 是否在弹出的树形结构中显示图标 |
| warning | `boolean` | `false` | 是否显示警告状态（黄色标签） |

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/display-schema-tag" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials components/display-schema-tag
```

### 目录结构讲解

```plaintext
components/display-schema-tag/
├── index.tsx  # 组件主要实现文件
└── styles.css # 组件样式文件
```

### 核心实现说明

DisplaySchemaTag 组件基于 Semi UI 的 Popover 和 Tag 组件实现，内部集成了 DisplaySchemaTree 来在弹出框中展示详细的 schema 结构。

### 依赖梳理

#### flowgram API

[**@flowgram.ai/json-schema**](https://github.com/bytedance/flowgram.ai/tree/main/packages/json-schema)

* [`IJsonSchema`](https://flowgram.ai/auto-docs/json-schema/interfaces/IJsonSchema): JSON Schema 类型定义
* [`useTypeManager`](https://flowgram.ai/auto-docs/json-schema/functions/useTypeManager): 类型管理器 Hook

#### 其他物料

[**DisplaySchemaTree**](/materials/components/display-schema-tree.md) 用于在弹出框中展示详细的 schema 树形结构

#### 第三方库

[**Semi UI**](https://semi.design/zh-CN)

* `Popover`: 弹出框组件
* `Tag`: 标签组件
