import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/components/display-inputs-values';

# DisplayInputsValues

DisplayInputsValues is a component used to visually display tree-structured input values.

It can **recursively** traverse input value objects, parse the types of [Flow Values](/en/materials/common/flow-value.md) within them, and derive the JSON Schema structure for each field.

:::tip

DisplayInputsValues supports displaying values configured by both [InputsValues](/en/materials/components/inputs-values.md) and [InputsValuesTree](/en/materials/components/inputs-values-tree.md) components.

:::

## Case Demonstration

### Basic Usage

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

## API Reference

### Props

| Property Name | Type | Required | Default Value | Description |
| --- | --- | --- | --- | --- |
| value | `IInputsValues` | No | - | Input value data to be displayed |
| showIconInTree | `boolean` | No | - | Whether to show icons in the Schema tree |

## Source Code Guide

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/display-inputs-values" />

Use CLI command to copy source code locally:

```bash
npx @flowgram.ai/cli@latest materials components/display-inputs-values
```

### Core Implementation Explanation

The main function of the DisplayInputsValues component is to recursively display tree-structured input values. The core implementation includes:

1. **Data Traversal**: Traverse the input value object and process each key-value pair
2. **Type Differentiation**:
   * For Flow Value type values, use the DisplayFlowValue component for display
   * For plain object type values, use the DisplayInputsValueAllInTag component to display their JSON Schema structure
3. **Recursive Display**: Support for displaying multi-level nested data structures

### Dependency Overview

#### flowgram API

[**@flowgram.ai/editor**](https://github.com/bytedance/flowgram.ai/tree/main/packages/client/editor)

* `useScopeAvailable`: Get available variables in the current scope

[**@flowgram.ai/form-materials**](https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials)

* `FlowValueUtils`: Flow Value related utility functions
* `DisplayFlowValue`: Component for displaying Flow Value
* `DisplaySchemaTag`: Tag component for displaying JSON Schema

#### Third-party Libraries

[**lodash-es**](https://lodash.com/)

* `isPlainObject`: Check if a value is a plain object
