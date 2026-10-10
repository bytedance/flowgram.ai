import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/components/display-schema-tree';

# DisplaySchemaTree

DisplaySchemaTree is a tree component used to visually display JSON Schema structure, which can recursively show hierarchical relationships of complex data structures such as objects and arrays.

## Examples

### Basic Usage

<BasicStory />

```tsx pure title="form-meta.tsx"
import { DisplaySchemaTree } from '@flowgram.ai/form-materials';

const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <DisplaySchemaTree
        value={{
          type: 'object',
          properties: {
            transaction_id: { type: 'integer' },
            amount: { type: 'number' },
            description: { type: 'string' },
            archived: { type: 'boolean' },
            owner: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                friends: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      username: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        }}
      />
    </>
  ),
}
```

## API Reference

| Property | Type | Default Value | Description |
| :--- | :--- | :--- | :--- |
| value | `IJsonSchema` | `{}` | The JSON Schema object to display |
| drilldown | `boolean` | `true` | Whether to expand nested property structure |
| showIcon | `boolean` | `true` | Whether to show type icons |
| typeManager | `JsonSchemaTypeManager` | - | Type manager for getting type-related information |

## Source Code Guide

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/display-schema-tree" />

Use the CLI command to copy the source code locally:

```bash
npx @flowgram.ai/cli@latest materials components/display-schema-tree
```

### Directory Structure

```plaintext
components/display-schema-tree/
├── index.tsx  # Main component implementation
└── styles.css # Component styles
```

### Core Implementation

DisplaySchemaTree component displays JSON Schema hierarchical structure through recursive rendering.

It uses `useTypeManager` to obtain type-related information, including icons, display text, etc. The component recursively renders the child properties of the Schema internally, supporting multi-level nested data structure display.

### Dependencies

#### flowgram API

[**@flowgram.ai/json-schema**](https://github.com/bytedance/flowgram.ai/tree/main/packages/json-schema)

* [`IJsonSchema`](https://flowgram.ai/auto-docs/json-schema/interfaces/IJsonSchema): JSON Schema type definition
* [`useTypeManager`](https://flowgram.ai/auto-docs/json-schema/functions/useTypeManager): Type manager Hook
