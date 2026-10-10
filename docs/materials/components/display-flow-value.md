import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/components/display-flow-value';

# DisplayFlowValue

DisplayFlowValue 是一个用于可视化展示 [Flow Value](/materials/common/flow-value.md) 数据类型的组件，它能够根据 Flow Value 的类型推断出相应的 JSON Schema，并通过友好的界面展示给用户。

## 案例演示

### 基本使用

<BasicStory />

```tsx pure title="form-meta.tsx"
const formMeta = {
  render: () => (
    <>
      <Field<any> name="dynamic_value_input">
        {({ field }) => (
          <DynamicValueInput value={field.value} onChange={(value) => field.onChange(value)} />
        )}
      </Field>
      <Field<any> name="dynamic_value_input">
        {({ field }) => <DisplayFlowValue value={field.value} title="Display Flow Value" />}
      </Field>
    </>
  ),
}
```

## API 参考

### Props

| 属性名 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| value | `IFlowValue` | 否 | - | 要显示的 Flow Value 数据 |
| title | `string \| JSX.Element` | 否 | - | 显示在标签上的标题文本 |
| showIconInTree | `boolean` | 否 | - | 是否在 Schema 树中显示图标 |
| typeManager | `JsonSchemaTypeManager` | 否 | - | 用于获取类型显示信息的管理器 |

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/display-flow-value" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials components/display-flow-value
```

### 核心实现说明

DisplayFlowValue 组件的主要功能是将 Flow Value 转换为 JSON Schema 并可视化展示。核心实现包括：

1. **类型推断**：根据不同类型的 Flow Value 推断出对应的 JSON Schema
   * 对于引用类型，从作用域中获取变量的类型信息
   * 对于模板类型，默认推断为字符串类型
   * 对于常量类型，根据常量值推断其类型

2. **可视化展示**：通过 DisplaySchemaTag 组件展示推断出的 Schema
   * 使用半 UI 的 Popover 和 Tag 组件
   * 点击标签可以查看详细的 Schema 树形结构

3. **错误处理**：当引用类型指向的变量不存在时，会显示警告颜色

### 依赖梳理

#### flowgram API

[**@flowgram.ai/json-schema**](https://github.com/bytedance/flowgram.ai/tree/main/packages/common/json-schema)

* `JsonSchemaTypeManager`: 用于获取类型显示信息
* `JsonSchemaUtils`: 提供 JSON Schema 相关的工具函数

[**@flowgram.ai/editor**](https://github.com/bytedance/flowgram.ai/tree/main/packages/client/editor)

* `useScopeAvailable`: 获取当前作用域中可用的变量

#### 其他物料

[**DisplaySchemaTag**](/materials/components/display-schema-tag.md) 用于展示 JSON Schema 的标签组件

[**FlowValueUtils**](/materials/common/flow-value.md)

* [FlowValueUtils.inferJsonSchema](/materials/common/flow-value.md#schema-推断函数)

#### 第三方库

[**Semi UI**](https://semi.design/zh-CN/)

* `Popover`: 弹出框组件
* `Tag`: 标签组件
