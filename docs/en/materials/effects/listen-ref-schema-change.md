# listenRefSchemaChange

Listen to JSON schema changes of reference variable types and trigger callback functions when changes occur.

## Demo

import { BasicStory } from 'components/form-materials/effects/listen-ref-schema-change';

### Basic Usage

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

## API Reference

### listenRefSchemaChange

```typescript
listenRefSchemaChange(
  cb: (props: EffectFuncProps<IFlowRefValue> & { schema?: IJsonSchema }) => void
): EffectOptions[]
```

#### Parameters

| Parameter | Type | Description |
|----------|------|-------------|
| `cb` | `(props: EffectFuncProps<IFlowRefValue> & { schema?: IJsonSchema }) => void` | Callback function triggered when the referenced schema changes |

#### Callback Function Parameters

| Parameter | Type | Description |
|----------|------|-------------|
| `name` | `string` | Field name |
| `value` | `IFlowRefValue` | Reference value object |
| `form` | `IForm` | Form instance |
| `schema` | `IJsonSchema` | Converted JSON Schema |

### Supported Value Types

* `IFlowRefValue`: Reference type value, contains `type: 'ref'` and `content: string[]`

## Source Code Guide

import { SourceCode } from '@theme';

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/effects/listen-ref-schema-change" />

Copy source code locally using CLI command:

```bash
npx @flowgram.ai/cli@latest materials effects/listen-ref-schema-change
```

### Directory Structure

```
listen-ref-schema-change/
└── index.ts          # Main entry file
```

### How It Works

1. **Value Change Listening**: Listen to `DataEvent.onValueInitOrChange` events
2. **Type Checking**: Check if the value is of `ref` type
3. **Path Tracking**: Use `trackByKeyPath` to track reference paths
4. **Schema Conversion**: Convert AST type to JSON Schema
5. **Callback Trigger**: Trigger callback when the referenced type changes

### Flowgram APIs Used

#### @flowgram.ai/variable-core

* `getNodeScope(context.node).available.trackByKeyPath`: Track value changes for specified paths, trigger callbacks when values corresponding to paths change.

#### @flowgram.ai/json-schema

* `JsonSchemaUtils.astToSchema`: Convert AST type nodes to JSON Schema objects.
