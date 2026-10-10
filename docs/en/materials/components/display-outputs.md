import { SourceCode } from '@theme';
import { DisplayFromScopeStory, DisplayFromFieldStory } from 'components/form-materials/components/display-outputs';

# DisplayOutputs

DisplayOutputs is a component for visually displaying node output variables, supporting automatic retrieval of output variables from scope or manual specification of output schema through field values.

## Demo

### Getting Output Variables from Scope

When `displayFromScope` is set to `true`, the component automatically retrieves output variables from the current node scope and displays them:

<DisplayFromScopeStory />

```tsx pure title="form-meta.tsx" {27}
import { DisplayOutputs, provideJsonSchemaOutputs } from '@flowgram.ai/form-materials';
import { Field } from '@flowgram.ai/editor';

const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <Field<IJsonSchema | undefined> name="outputs">
        {({ field }) => (
          <JsonSchemaEditor value={field.value} onChange={(value) => field.onChange(value)} />
        )}
      </Field>
      <p>Display Output Schema:</p>
      <DisplayOutputs displayFromScope />
    </>
  ),
  effect: {
    outputs: provideJsonSchemaOutputs,
  },
}
```

### Specifying Output Schema through Field Value

When `displayFromScope` is not set, the component receives the output JSON Schema through the `value` prop:

<DisplayFromFieldStory />

```tsx pure title="form-meta.tsx"
import { DisplayOutputs } from '@flowgram.ai/form-materials';
import { Field } from '@flowgram.ai/editor';

const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <Field<IJsonSchema | undefined>
        name="outputs"
        defaultValue={{
          type: 'object',
          properties: {
            result: { type: 'string' },
            status: { type: 'number' },
          },
        }}
      >
        {({ field }) => (
          <JsonSchemaEditor value={field.value} onChange={(value) => field.onChange(value)} />
        )}
      </Field>
      <p>Display Output Schema:</p>
      <Field<IJsonSchema | undefined> name="outputs">
        {({ field }) => <DisplayOutputs value={field.value} />}
      </Field>
    </>
  ),
}
```

## API Reference

### DisplayOutputs Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| value | `IJsonSchema` | - | JSON Schema object to display, used when `displayFromScope` is `false` |
| displayFromScope | `boolean` | `false` | Whether to automatically get output variables from current scope |
| showIconInTree | `boolean` | `false` | Whether to show icons in tree structure |
| typeManager | `JsonSchemaTypeManager` | - | Custom type manager |
| style | `React.CSSProperties` | - | Custom styles |

## Source Code Guide

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/display-outputs" />

Copy source code locally using CLI command:

```bash
npx @flowgram.ai/cli@latest materials display-outputs
```

### Directory Structure

```plaintext
display-outputs/
├── index.tsx    # Component main entry, implements DisplayOutputs component
└── styles.css   # Component styles
```

### Core Implementation

Core logic of the DisplayOutputs component:

1. **Scope Mode** (`displayFromScope=true`): Uses `useCurrentScope` Hook to get output variables from current scope, converts variable list to JSON Schema properties through `scope?.output.variables`

2. **Field Mode** (`displayFromScope=false`): Directly uses JSON Schema object passed through `value` prop

3. **Variable Listening**: In scope mode, component listens for output variable changes and automatically refreshes display

4. **Rendering Implementation**: Renders each property of JSON Schema as `DisplaySchemaTag` component, supporting type icons and warning state display

### Dependencies

#### flowgram API

[**@flowgram.ai/editor**](https://github.com/bytedance/flowgram.ai/tree/main/packages/client/editor)

* [`useCurrentScope`](https://flowgram.ai/auto-docs/editor/functions/useCurrentScope): Hook to get current scope
* [`useRefresh`](https://flowgram.ai/api/hooks/use-refresh): Hook to force component refresh

[**@flowgram.ai/json-schema**](https://github.com/bytedance/flowgram.ai/tree/main/packages/common/json-schema)

* [`IJsonSchema`](https://flowgram.ai/auto-docs/json-schema/interfaces/IJsonSchema): JSON Schema type definition
* [`JsonSchemaUtils`](https://flowgram.ai/auto-docs/json-schema/modules/JsonSchemaUtils): JSON Schema utility functions
* [`JsonSchemaTypeManager`](https://flowgram.ai/auto-docs/json-schema/classes/JsonSchemaTypeManager): Type manager

#### Other Materials

[**DisplaySchemaTag**](/en/materials/components/display-schema-tag.md)

* `DisplaySchemaTag`: Tag component for displaying individual JSON Schema properties

#### Third-party Libraries

[**React**](https://react.dev/)

* `useLayoutEffect`: Used for listening to scope variable changes
