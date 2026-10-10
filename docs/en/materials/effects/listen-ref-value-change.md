# listenRefValueChange

Listen for changes for the referenced **variable definition** and trigger a callback function when it changes.

## Case Demo

import { BasicStory } from 'components/form-materials/effects/listen-ref-value-change';

### Basic Usage

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

## API Introduction

### listenRefValueChange

```typescript
listenRefValueChange(
  cb: (props: EffectFuncProps<IFlowRefValue> & { variable?: BaseVariableField }) => void
): EffectOptions[]
```

#### Parameters

| Parameter | Type | Description |
|---|---|---|
| `cb` | `(props: EffectFuncProps<IFlowRefValue> & { variable?: BaseVariableField }) => void` | Callback function, triggered when the referenced value changes |

#### Callback Function Parameters

| Parameter | Type | Description |
|---|---|---|
| `name` | `string` | Field name |
| `value` | `IFlowRefValue` | Reference value object |
| `form` | `IForm` | Form instance |
| `variable` | `BaseVariableField` | The variable instance pointed to by the reference |

### Supported Value Types

* `IFlowRefValue`: Reference type value, including `type: 'ref'` and `content: string[]`

## Source Code Guide

import { SourceCode } from '@theme';

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/effects/listen-ref-value-change" />

Use the CLI command to copy the source code locally:

```bash
npx @flowgram.ai/cli@latest materials effects/listen-ref-value-change
```

### Directory Structure

```
listen-ref-value-change/
└── index.ts          # Main entry file
```

### How It Works

1. **Listen for value changes**: Listen for the `DataEvent.onValueInitOrChange` event
2. **Type check**: Check if the value is of `ref` type
3. **Path tracking**: Use `trackByKeyPath` to track the reference path and get the referenced variable
4. **Callback trigger**: Trigger the callback when the value of the referenced variable changes

### flowgram APIs Used

#### @flowgram.ai/variable-core

* `getNodeScope(context.node).available.trackByKeyPath`: Tracks changes to the value of the specified path and triggers a callback when the value corresponding to the path changes.
