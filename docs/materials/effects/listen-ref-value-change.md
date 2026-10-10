# listenRefValueChange

监听引用**变量定义**的变化，并在变化时触发回调函数。

## 案例演示

import { BasicStory } from 'components/form-materials/effects/listen-ref-value-change';

### 基本使用

<BasicStory />

```tsx pure title="form-meta.tsx"
import { listenRefValueChange } from '@flowgram.ai/form-materials';

const formMeta = {
  effect: {
    'inputsValues.*': listenRefValueChange(({ name, variable, form }) => {
      form.setValueIn(
        `log`,
        `${form.getValueIn(`log`) || ''}* ${name}: ${JSON.stringify(
          variable?.toJSON() || {}
        )} \n`
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
      <Field<any> name="log" defaultValue={'When variable value updated, log changes:\n'}>
        {({ field }) => (
          <pre style={{ width: 500, padding: 4, background: '#f5f5f5', fontSize: 12 }}>
            {field.value}
          </pre>
        )}
      </Field>
    </>
  ),
}
```

## API 介绍

### listenRefValueChange

```typescript
listenRefValueChange(
  cb: (props: EffectFuncProps<IFlowRefValue> & { variable?: BaseVariableField }) => void
): EffectOptions[]
```

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| `cb` | `(props: EffectFuncProps<IFlowRefValue> & { variable?: BaseVariableField }) => void` | 回调函数，当引用的值发生变化时触发 |

#### 回调函数参数

| 参数 | 类型 | 描述 |
|------|------|------|
| `name` | `string` | 字段名称 |
| `value` | `IFlowRefValue` | 引用值对象 |
| `form` | `IForm` | 表单实例 |
| `variable` | `BaseVariableField` | 引用指向的变量实例 |

### 支持值类型

* `IFlowRefValue`：引用类型值，包含 `type: 'ref'` 和 `content: string[]`

## 源码导读

import { SourceCode } from '@theme';

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/effects/listen-ref-value-change" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials effects/listen-ref-value-change
```

### 目录结构

```
listen-ref-value-change/
└── index.ts          # 主入口文件
```

### 工作原理

1. **监听值变化**：监听 `DataEvent.onValueInitOrChange` 事件
2. **类型检查**：检查值是否为 `ref` 类型
3. **路径跟踪**：使用 `trackByKeyPath` 跟踪引用路径，获取被引用的变量
4. **回调触发**：当引用的变量值发生变化时触发回调

### 使用到的 flowgram API

#### @flowgram.ai/variable-core

* `getNodeScope(context.node).available.trackByKeyPath`: 跟踪指定路径的值变化，当路径对应的值发生变化时触发回调。
