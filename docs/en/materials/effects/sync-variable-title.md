import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/effects/sync-variable-title';

# syncVariableTitle

syncVariableTitle is a form effect used to synchronize the node's title to the metadata of its output variables.

When the node title changes, it automatically updates the title and icon metadata of all output variables.

| Before | After |
| --- | --- |
| <img loading="lazy" src="/materials/sync-variable-title-without-effect.gif" alt="syncVariableTitle not introduced" style={{ width: 500 }} /> *When node title changes, it cannot automatically sync to variables* | <img loading="lazy" src="/materials/sync-variable-title-with-effect.gif" alt="syncVariableTitle introduced" style={{ width: 500 }} /> *Node title in variables will automatically sync* |

## Example Demonstration

### Basic Usage

<BasicStory />

```tsx pure title="form-meta.tsx"
import { syncVariableTitle } from '@flowgram.ai/form-materials';

const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <p>Please Edit Title below to sync to variables:</p>
      <Field<string | undefined> name="title">
        {({ field }) => (
          <Input value={field.value} onChange={(value) => field.onChange(value)} />
        )}
      </Field>
    </>
  ),
  effect: {
    // Sync the title to variables
    title: syncVariableTitle,
    outputs: provideJsonSchemaOutputs,
  },
}
```

## API Reference

### syncVariableTitle

Provides a form effect for synchronizing the node's title to the metadata of its output variables.

#### Parameters

* No direct parameters, used directly in formMeta.effect as a form effect

#### Return Value

* `EffectOptions[]`: Form effect options array for formMeta.effect configuration

#### Working Principle

This form effect:

1. Listens to the `onValueChange` event of the node title field
2. When the title changes, retrieves all output variables of the node
3. Updates the metadata of each output variable, including title and icon
4. If the title is empty, uses the node ID as the title

## Source Code Guide

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/effects/sync-variable-title" />

Use the CLI command to copy the source code to your local machine:

```bash
npx @flowgram.ai/cli@latest materials effects/sync-variable-title
```

### Directory Structure

```
sync-variable-title/
└── index.ts           # Main implementation file, exports syncVariableTitle form effect
```

### Synchronization Logic

`syncVariableTitle` implements real-time synchronization from node title to variable metadata by registering a `DataEvent.onValueChange` event listener.

### Dependency Overview

#### flowgram API

[**@flowgram.ai/editor**](https://github.com/bytedance/flowgram.ai/tree/main/packages/client/editor)

* [`DataEvent`](https://flowgram.ai/auto-docs/editor/enums/DataEvent): Data event enumeration for listening to value change events
* [`Effect`](https://flowgram.ai/auto-docs/editor/types/Effect): Side effect function type definition
* [`EffectOptions`](https://flowgram.ai/auto-docs/editor/interfaces/EffectOptions): Side effect configuration options interface
* [`FlowNodeRegistry`](https://flowgram.ai/auto-docs/document/interfaces/FlowNodeRegistry-1): Node registration type definition
* [`FlowNodeVariableData`](https://flowgram.ai/auto-docs/editor/classes/FlowNodeVariableData): Node variable data class providing node variable management functionality
