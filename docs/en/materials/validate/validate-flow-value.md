import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/validate/validate-flow-value';

# validateFlowValue

validateFlowValue is a validation function for verifying the **requiredness and variable reference validity** of [`FlowValue`](/en/materials/common/flow-value.md).

## Case Demonstration

### Basic Usage

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

## API Reference

### validateFlowValue Function

```typescript
export function validateFlowValue(value: IFlowValue | undefined, ctx: Context): {
  level: FeedbackLevel.Error;
  message: string;
} | undefined;
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `IFlowValue \| undefined` | The FlowValue to validate |
| `ctx` | `Context` | Validation context |

#### Context Interface

```typescript
interface Context {
  node: FlowNodeEntity;
  required?: boolean; // Whether required
  errorMessages?: {
    required?: string; // Required error message
    unknownVariable?: string; // Unknown variable error message
  };
}
```

#### Return Value

* If validation passes, returns `undefined`
* If validation fails, returns an object containing error level and error message

### Supported Validation Types

1. **Required Validation**: When `required` is set to `true`, verifies if the value exists and is not empty
2. **Reference Variable Validation**: For values of type `ref`, verifies if the referenced variable exists
3. **Template Variable Validation**: For values of type `template`, verifies if all variables referenced in the template exist

## Source Code Guide

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/validate/validate-flow-value/index.ts" />

Use the CLI command to copy the source code locally:

```bash
npx @flowgram.ai/cli@latest materials validate/validate-flow-value
```

### Directory Structure

```
validate-flow-value/
└── index.tsx           # Main function implementation, containing validateFlowValue core logic
```

### Core Implementation

#### Required Validation Logic

```typescript
if (required && (isNil(value) || isNil(value?.content) || value?.content === '')) {
  return {
    level: FeedbackLevel.Error,
    message: requiredMessage,
  };
}
```

#### Reference Variable Validation Logic

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

#### Template Variable Validation Logic

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

### Flowgram APIs Used

[**@flowgram.ai/editor**](https://github.com/bytedance/flowgram.ai/tree/main/packages/client/editor)

* [`FeedbackLevel`](https://flowgram.ai/auto-docs/editor/enums/FeedbackLevel): Feedback level enum

### Dependencies on Other Materials

[**FlowValue**](/en/materials/common/flow-value.md)

* `IFlowValue`: FlowValue type definition
* `FlowValueUtils`: FlowValue utility class
  * `getTemplateKeyPaths`: Method to extract all variable reference paths from templates

### Third-party Libraries

[**lodash-es**](https://lodash.com/)

* `isNil`: Checks if a value is null or undefined
