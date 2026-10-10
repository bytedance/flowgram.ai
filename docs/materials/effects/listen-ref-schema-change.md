# listenRefSchemaChange

监听引用变量类型的 json schema 变化，并在变化时触发回调函数。

## 案例演示

import { BasicStory } from 'components/form-materials/effects/listen-ref-schema-change';

### 基本使用

<BasicStory />

```tsx pure title="form-meta.tsx"
import { listenRefSchemaChange } from '@flowgram.ai/form-materials';

const formMeta = {
  effect: {
    'inputsValues.*': listenRefSchemaChange(({ name, schema, form, formValues }) => {
      form.setValueIn(
        `log`,
        `${form.getValueIn(`log`) || ''}* ${name}: ${JSON.stringify(schema)} \n`
      );
    }),
  },
  render: () => (
    <>
      <FormHeader />
      <Field<Record<string, any> | undefined>
        name="inputsValues"
        defaultValue={{
          a: {
            type: 'ref',
            content: ['start_0', 'str'],
          },
        }}
      >
        {({ field }) => (
          <InputsValues value={field.value} onChange={(value) => field.onChange(value)} />
        )}
      </Field>
      <br />
      <Field<any> name="log" defaultValue={'When schema updated, log changes:\n'}>
        {({ field }) => (
          <pre style={{ padding: 4, background: '#f5f5f5', fontSize: 12 }}>{field.value}</pre>
        )}
      </Field>
    </>
  ),
}
```

## API 介绍

### listenRefSchemaChange

```typescript
listenRefSchemaChange(
  cb: (props: EffectFuncProps<IFlowRefValue> & { schema?: IJsonSchema }) => void
): EffectOptions[]
```

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| `cb` | `(props: EffectFuncProps<IFlowRefValue> & { schema?: IJsonSchema }) => void` | 回调函数，当引用的 schema 发生变化时触发 |

#### 回调函数参数

| 参数 | 类型 | 描述 |
|------|------|------|
| `name` | `string` | 字段名称 |
| `value` | `IFlowRefValue` | 引用值对象 |
| `form` | `IForm` | 表单实例 |
| `schema` | `IJsonSchema` | 转换后的 JSON Schema |

### 支持值类型

* `IFlowRefValue`：引用类型值，包含 `type: 'ref'` 和 `content: string[]`

## 源码导读

import { SourceCode } from '@theme';

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/effects/listen-ref-schema-change" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials effects/listen-ref-schema-change
```

### 目录结构

```
listen-ref-schema-change/
└── index.ts          # 主入口文件
```

### 工作原理

1. **监听值变化**：监听 `DataEvent.onValueInitOrChange` 事件
2. **类型检查**：检查值是否为 `ref` 类型
3. **路径跟踪**：使用 `trackByKeyPath` 跟踪引用路径
4. **Schema 转换**：将 AST 类型转换为 JSON Schema
5. **回调触发**：当引用的类型发生变化时触发回调

### 使用到的 flowgram API

#### @flowgram.ai/variable-core

* `getNodeScope(context.node).available.trackByKeyPath`: 跟踪指定路径的值变化，当路径对应的值发生变化时触发回调。

#### @flowgram.ai/json-schema

* `JsonSchemaUtils.astToSchema`: 将 AST 类型节点转换为 JSON Schema 对象。
