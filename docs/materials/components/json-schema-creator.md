import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/components/json-schema-creator';

# JsonSchemaCreator

JsonSchemaCreator 是一个用于从 JSON 字符串自动生成 JSON Schema 的组件。它提供了一个按钮来触发弹窗，用户可以在弹窗中粘贴 JSON 数据，组件会自动分析数据结构并生成对应的 JSON Schema。

## 案例演示

### 基本使用

<BasicStory />

```tsx pure title="form-meta.tsx"
import { JsonSchemaCreator } from '@flowgram.ai/form-materials';

const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <Field<IJsonSchema | undefined> name="json_schema">
        {({ field }) => (
          <div>
            <JsonSchemaCreator
              onSchemaCreate={(schema) => field.onChange(schema)}
            />
            <div style={{ marginTop: 16 }}>
              <JsonSchemaEditor
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            </div>
          </div>
        )}
      </Field>
    </>
  ),
}
```

## API 参考

### JsonSchemaCreator Props

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `onSchemaCreate` | `(schema: IJsonSchema) => void` | - | 生成 schema 后的回调函数 |

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/json-schema-creator" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials components/json-schema-creator
```

### 目录结构讲解

```
json-schema-creator/
├── index.tsx              # 主组件导出，包含 JsonSchemaCreator 和 JsonSchemaCreatorProps
├── json-schema-creator.tsx # 主组件实现，包含按钮和状态管理
├── json-input-modal.tsx   # JSON 输入弹窗组件
└── utils/
    └── json-to-schema.ts  # JSON 转 Schema 的核心工具函数
```

### 核心实现说明

#### JSON 解析和 Schema 生成流程

以下是 JSON Schema 创建的完整交互时序图：

```mermaid
sequenceDiagram
    participant User as 用户
    participant Creator as JsonSchemaCreator
    participant Modal as JsonInputModal
    participant Parser as jsonToSchema
    participant Generator as generateSchema

    %% 初始交互
    User->>Creator: 点击"从 JSON 创建"按钮
    Creator->>Creator: setVisible(true)
    Creator->>Modal: 显示弹窗

    %% 用户输入和确认
    User->>Modal: 输入 JSON 字符串
    User->>Modal: 点击确认

    %% JSON 解析和 Schema 生成
    Modal->>Parser: 调用 jsonToSchema(jsonString)
    Parser->>Parser: JSON.parse(jsonString)

    %% 递归生成 Schema
    Parser->>Generator: 调用 generateSchema(data)

    %% 根据数据类型处理
    alt 数据为 null
        Generator->>Generator: 返回 {type: 'string'}
    else 数据为数组
        Generator->>Generator: schema = {type: 'array'}
        loop 对每个数组元素
            Generator->>Generator: 递归调用 generateSchema(item)
        end
    else 数据为对象
        Generator->>Generator: schema = {type: 'object', properties: {}, required: []}
        loop 对每个属性
            Generator->>Generator: 递归调用 generateSchema(value)
            Generator->>Generator: 添加到 properties 和 required
        end
    else 原始类型
        Generator->>Generator: 返回 {type: typeof value}
    end

    %% 返回结果
    Generator-->>Parser: 返回生成的 schema
    Parser-->>Modal: 返回 IJsonSchema

    %% 回调和关闭
    Modal->>Creator: 调用 onSchemaCreate(schema)
    Creator->>Creator: setVisible(false)
    Creator->>Modal: 关闭弹窗
    Creator-->>User: Schema 创建完成
```

### 使用到的 FlowGram API

[**@flowgram.ai/json-schema**](https://github.com/bytedance/flowgram.ai/tree/main/packages/variable/json-schema)

* [`IJsonSchema`](https://flowgram.ai/auto-docs/json-schema/interfaces/IJsonSchema): JSON Schema 类型定义

### 依赖的其他物料

[**JsonCodeEditor**](/materials/components/code-editor.md) 代码编辑器组件

* 用于在弹窗中编辑 JSON 数据

### 使用的第三方库

[**@douyinfe/semi-ui**](https://semi.design/)

* `Button`: 触发弹窗的按钮组件
* `Modal`: 弹窗容器
* `Typography`: 文本组件
