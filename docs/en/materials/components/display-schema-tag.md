import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/components/display-schema-tag';

# DisplaySchemaTag

DisplaySchemaTag is a tag component used to display JSON Schema. When users click on the tag, a detailed schema tree structure will pop up, making it easy to view complex data structures.

## Examples

### Basic Usage

<BasicStory />

```tsx pure title="form-meta.tsx"
import { DisplaySchemaTag } from '@flowgram.ai/form-materials';

const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <DisplaySchemaTag
        title="Transaction"
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
| title | `JSX.Element \| string` | - | The title text displayed on the tag |
| value | `IJsonSchema` | `{}` | The JSON Schema object to display |
| showIconInTree | `boolean` | - | Whether to show icons in the popped-up tree structure |
| warning | `boolean` | `false` | Whether to show warning state (yellow tag) |

## Source Code Guide

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/display-schema-tag" />

Use the CLI command to copy the source code locally:

```bash
npx @flowgram.ai/cli@latest materials components/display-schema-tag
```

### Directory Structure

```plaintext
components/display-schema-tag/
├── index.tsx  # Main component implementation
└── styles.css # Component styles
```

### Core Implementation

DisplaySchemaTag component is implemented based on Semi UI's Popover and Tag components, with DisplaySchemaTree integrated internally to display detailed schema structure in a pop-up box.

### Dependencies

#### flowgram API

[**@flowgram.ai/json-schema**](https://github.com/bytedance/flowgram.ai/tree/main/packages/json-schema)

* [`IJsonSchema`](https://flowgram.ai/auto-docs/json-schema/interfaces/IJsonSchema): JSON Schema type definition
* [`useTypeManager`](https://flowgram.ai/auto-docs/json-schema/functions/useTypeManager): Type manager Hook

#### Other Materials

[**DisplaySchemaTree**](/en/materials/components/display-schema-tree.md) Used to display detailed schema tree structure in the pop-up box

#### Third-party Libraries

[**Semi UI**](https://semi.design/en-US)

* `Popover`: Pop-up box component
* `Tag`: Tag component
