import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/components/display-inputs-values';

# DisplayInputsValues

DisplayInputsValues 是一个用于可视化展示树状结构输入值的组件。

它能够**递归**地遍历输入值对象，对于解析其中 [Flow Value](/materials/common/flow-value.md) 的类型，并推导出每一个字段的 Json Schema 结构。

:::tip

DisplayInputsValues 支持展示 [InputsValues](/materials/components/inputs-values.md) 和 [InputsValuesTree](/materials/components/inputs-values-tree.md) 两个组件配置的值。

:::

## 案例演示

### 基本使用

<BasicStory />

```tsx pure title="form-meta.tsx"
import { InputsValuesTree, DisplayInputsValues } from '@flowgram.ai/form-materials';

const formMeta = {
  render: () => (
    <>
      <Field<Record<string, any> | undefined> name="inputs_values">
        {({ field }) => (
          <InputsValuesTree value={field.value} onChange={(value) => field.onChange(value)} />
        )}
      </Field>
      <Field<Record<string, any> | undefined> name="inputs_values">
        {({ field }) => <DisplayInputsValues value={field.value} />}
      </Field>
    </>
  ),
}
```

## API 参考

### Props

| 属性名 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| value | `IInputsValues` | 否 | - | 要展示的输入值数据 |
| showIconInTree | `boolean` | 否 | - | 是否在 Schema 树中显示图标 |

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/display-inputs-values" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials components/display-inputs-values
```

### 核心实现说明

DisplayInputsValues 组件的主要功能是递归地展示树状结构的输入值。核心实现包括：

1. **数据遍历**：遍历输入的 value 对象，处理每一个键值对
2. **类型区分**：
   * 对于 Flow Value 类型的值，使用 DisplayFlowValue 组件进行展示
   * 对于普通对象类型的值，使用 DisplayInputsValueAllInTag 组件展示其 JSON Schema 结构
3. **递归展示**：支持展示多层嵌套的数据结构

### 依赖梳理

#### flowgram API

[**@flowgram.ai/editor**](https://github.com/bytedance/flowgram.ai/tree/main/packages/client/editor)

* `useScopeAvailable`: 获取当前作用域中可用的变量

[**@flowgram.ai/form-materials**](https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials)

* `FlowValueUtils`: Flow Value 相关工具函数
* `DisplayFlowValue`: 展示 Flow Value 的组件
* `DisplaySchemaTag`: 展示 JSON Schema 的标签组件

#### 第三方库

[**lodash-es**](https://lodash.com/)

* `isPlainObject`: 判断是否为普通对象
