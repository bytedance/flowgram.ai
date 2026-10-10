import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/components/display-flow-value';

# DisplayFlowValue

DisplayFlowValue is a component used to visually display [Flow Value](/en/materials/common/flow-value.md) data types. It can infer the corresponding JSON Schema based on the type of Flow Value and present it to users through a user-friendly interface.

## Case Demonstration

### Basic Usage

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

## API Reference

### Props

| Property Name | Type | Required | Default Value | Description |
| --- | --- | --- | --- | --- |
| value | `IFlowValue` | No | - | Flow Value data to be displayed |
| title | `string \| JSX.Element` | No | - | Title text displayed on the tag |
| showIconInTree | `boolean` | No | - | Whether to show icons in the Schema tree |
| typeManager | `JsonSchemaTypeManager` | No | - | Manager used to obtain type display information |

## Source Code Guide

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/display-flow-value" />

Use CLI command to copy source code locally:

```bash
npx @flowgram.ai/cli@latest materials components/display-flow-value
```

### Core Implementation Explanation

DisplayFlowValue component's main function is to convert Flow Value into JSON Schema and display it visually. The core implementation includes:

1. **Type Inference**: Infer the corresponding JSON Schema based on different types of Flow Value
   * For reference type, obtain variable type information from the scope
   * For template type, default inference is string type
   * For constant type, infer its type based on the constant value

2. **Visual Display**: Display the inferred Schema through the DisplaySchemaTag component
   * Use Semi UI's Popover and Tag components
   * Click on the tag to view the detailed Schema tree structure

3. **Error Handling**: When the reference type points to a non-existent variable, a warning color will be displayed

### Dependency Overview

#### flowgram API

[**@flowgram.ai/json-schema**](https://github.com/bytedance/flowgram.ai/tree/main/packages/common/json-schema)

* `JsonSchemaTypeManager`: Used to obtain type display information
* `JsonSchemaUtils`: Provides JSON Schema related utility functions

[**@flowgram.ai/editor**](https://github.com/bytedance/flowgram.ai/tree/main/packages/client/editor)

* `useScopeAvailable`: Get available variables in the current scope

#### Other Materials

[**DisplaySchemaTag**](/en/materials/components/display-schema-tag.md) Tag component for displaying JSON Schema

[**FlowValueUtils**](/en/materials/common/flow-value.md)

* [FlowValueUtils.inferJsonSchema](/en/materials/common/flow-value.md#schema-inference-functions)

#### Third-party Libraries

[**Semi UI**](https://semi.design/)

* `Popover`: Pop-up component
* `Tag`: Tag component
