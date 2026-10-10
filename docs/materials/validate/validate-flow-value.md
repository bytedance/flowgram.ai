import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/validate/validate-flow-value';

# validateFlowValue

validateFlowValue 是一个用于验证 [`FlowValue`](/materials/common/flow-value.md) **必填性和变量引用有效性** 的验证函数。

## 案例演示

### 基本使用

<BasicStory />

```tsx pure title="form-meta.tsx"
import { validateFlowValue } from '@flowgram.ai/form-materials';

const formMeta = {
  validate: {
    dynamic_value_input: ({ value, context }) =>
      validateFlowValue(value, {
        node: context.node,
        errorMessages: {
          required: 'Value is required',
          unknownVariable: 'Unknown Variable',
        },
      }),
    required_dynamic_value_input: ({ value, context }) =>
      validateFlowValue(value, {
        node: context.node,
        required: true,
        errorMessages: {
          required: 'Value is required',
          unknownVariable: 'Unknown Variable',
        },
      }),
    prompt_editor: ({ value, context }) =>
      validateFlowValue(value, {
        node: context.node,
        required: true,
        errorMessages: {
          required: 'Prompt is required',
          unknownVariable: 'Unknown Variable In Template',
        },
      }),
  },
  render: ({ form }) => (
    <>
      <FormHeader />
      <b>Validate variable valid</b>
      <Field<any> name="dynamic_value_input">
        {({ field, fieldState }) => (
          <>
            <DynamicValueInput
              value={field.value}
              onChange={(value) => field.onChange(value)}
            />
            <span style={{ color: 'red' }}>
              {fieldState.errors?.map((e) => e.message).join('\n')}
            </span>
          </>
        )}
      </Field>
      <br />
      <b>Validate required value</b>
      <Field<any> name="required_dynamic_value_input">
        {({ field, fieldState }) => (
          <>
            <DynamicValueInput
              value={field.value}
              onChange={(value) => field.onChange(value)}
            />
            <span style={{ color: 'red' }}>
              {fieldState.errors?.map((e) => e.message).join('\n')}
            </span>
          </>
        )}
      </Field>
      <br />
      <b>Validate required and variables valid in prompt</b>
      <Field<any> name="prompt_editor">
        {({ field, fieldState }) => (
          <>
            <PromptEditorWithVariables
              value={field.value}
              onChange={(value) => field.onChange(value)}
            />
            <span style={{ color: 'red' }}>
              {fieldState.errors?.map((e) => e.message).join('\n')}
            </span>
          </>
        )}
      </Field>
      <br />
      <Button onClick={() => form.validate()}>Trigger Validate</Button>
    </>
  ),
};
```

## API 参考

### validateFlowValue 函数

```typescript
export function validateFlowValue(value: IFlowValue | undefined, ctx: Context): {
  level: FeedbackLevel.Error;
  message: string;
} | undefined;
```

#### 参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| `value` | `IFlowValue \| undefined` | 要验证的 FlowValue 值 |
| `ctx` | `Context` | 验证上下文 |

#### Context 接口

```typescript
interface Context {
  node: FlowNodeEntity;
  required?: boolean; // 是否必填
  errorMessages?: {
    required?: string; // 必填错误消息
    unknownVariable?: string; // 未知变量错误消息
  };
}
```

#### 返回值

* 如果验证通过，返回 `undefined`
* 如果验证失败，返回包含错误级别和错误消息的对象

### 支持的验证类型

1. **必填验证**：当 `required` 设置为 `true` 时，验证值是否存在且内容不为空
2. **引用变量验证**：对于 `ref` 类型的值，验证引用的变量是否存在
3. **模板变量验证**：对于 `template` 类型的值，验证模板中引用的所有变量是否存在

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/validate/validate-flow-value/index.ts" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials validate/validate-flow-value
```

### 目录结构讲解

```
validate-flow-value/
└── index.tsx           # 主函数实现，包含 validateFlowValue 核心逻辑
```

### 核心实现说明

#### 必填验证逻辑

```typescript
if (required && (isNil(value) || isNil(value?.content) || value?.content === '')) {
  return {
    level: FeedbackLevel.Error,
    message: requiredMessage,
  };
}
```

#### 引用变量验证逻辑

```typescript
if (value?.type === 'ref') {
  const variable = node.scope.available.getByKeyPath(value?.content || []);
  if (!variable) {
    return {
      level: FeedbackLevel.Error,
      message: unknownVariableMessage,
    };
  }
}
```

#### 模板内变量验证逻辑

```typescript
if (value?.type === 'template') {
  const allRefs = FlowValueUtils.getTemplateKeyPaths(value);

  for (const ref of allRefs) {
    const variable = node.scope.available.getByKeyPath(ref);
    if (!variable) {
      return {
        level: FeedbackLevel.Error,
        message: unknownVariableMessage,
      };
    }
  }
}
```

### 使用到的 flowgram API

[**@flowgram.ai/editor**](https://github.com/bytedance/flowgram.ai/tree/main/packages/client/editor)

* [`FeedbackLevel`](https://flowgram.ai/auto-docs/editor/enums/FeedbackLevel): 反馈级别枚举

### 依赖的其他物料

[**FlowValue**](/materials/common/flow-value.md)

* `IFlowValue`: FlowValue 类型定义
* `FlowValueUtils`: FlowValue 工具类
  * `getTemplateKeyPaths`: 从模板中提取所有变量引用路径的方法

### 第三方库

[**lodash-es**](https://lodash.com/)

* `isNil`: 检查值是否为 null 或 undefined
