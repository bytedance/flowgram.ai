import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/effects/sync-variable-title';

# syncVariableTitle

syncVariableTitle 是一个表单副作用（Effect），用于同步节点的标题到该节点输出变量的元数据中。

当节点标题发生变化时，会自动更新所有输出变量的 title 和 icon 元数据。

| 引入前 | 引入后 |
| --- | --- |
| <img loading="lazy" src="/materials/sync-variable-title-without-effect.gif" alt="syncVariableTitle 没引入" style={{ width: 500 }} /> *变量中的节点标题变化时，无法自动同步到变量中* | <img loading="lazy" src="/materials/sync-variable-title-with-effect.gif" alt="syncVariableTitle 引入" style={{ width: 500 }} /> *变量中的节点标题会自动同步* |

## 案例演示

### 基本使用

<BasicStory />

```tsx pure title="form-meta.tsx"
import { syncVariableTitle } from '@flowgram.ai/form-materials';

const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <p>Please Edit Title below to sync to variables:</p>
      <Field<string | undefined> name="title">
        {({ field }) => (
          <Input value={field.value} onChange={(value) => field.onChange(value)} />
        )}
      </Field>
    </>
  ),
  effect: {
    // Sync the title to variables
    title: syncVariableTitle,
    outputs: provideJsonSchemaOutputs,
  },
}
```

## API 参考

### syncVariableTitle

提供一个表单副作用，用于同步节点的标题到该节点输出变量的元数据中。

#### 参数

* 无直接参数，作为表单副作用直接使用在 formMeta.effect 中

#### 返回值

* `EffectOptions[]`: 表单副作用选项数组，用于 formMeta.effect 配置

#### 工作原理

该表单副作用会：

1. 监听节点标题字段的 `onValueChange` 事件
2. 当标题发生变化时，获取节点的所有输出变量
3. 更新每个输出变量的元数据，包括标题和图标
4. 如果标题为空，则使用节点 ID 作为标题

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/effects/sync-variable-title" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials effects/sync-variable-title
```

### 目录结构讲解

```
sync-variable-title/
└── index.ts           # 主实现文件，导出 syncVariableTitle 表单副作用
```

### 同步逻辑

`syncVariableTitle` 通过注册 `DataEvent.onValueChange` 事件监听器，实现节点标题到变量元数据的实时同步。

### 依赖梳理

#### flowgram API

[**@flowgram.ai/editor**](https://github.com/bytedance/flowgram.ai/tree/main/packages/client/editor)

* [`DataEvent`](https://flowgram.ai/auto-docs/editor/enums/DataEvent): 数据事件枚举，用于监听值变化事件
* [`Effect`](https://flowgram.ai/auto-docs/editor/types/Effect): 副作用函数类型定义
* [`EffectOptions`](https://flowgram.ai/auto-docs/editor/interfaces/EffectOptions): 副作用配置选项接口
* [`FlowNodeRegistry`](https://flowgram.ai/auto-docs/document/interfaces/FlowNodeRegistry-1): 节点注册类型定义
* [`FlowNodeVariableData`](https://flowgram.ai/auto-docs/editor/classes/FlowNodeVariableData): 节点变量数据类，提供节点变量管理功能
