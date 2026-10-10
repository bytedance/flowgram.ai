import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/effects/validate-when-variable-sync';

# validateWhenVariableSync

When accessible variables of a field change, re-trigger validation for the specified **error fields**.

:::note{title="Why error fields?"}

Error messages for error fields may be derived from the validity of variable references.

If the **accessible variables of a field change, making the variable references of the field change from invalid to valid**, there's a need to re-validate the current field to clear previous error messages.

:::

| Before Introduction | After Introduction |
| --- | --- |
| <img loading="lazy" src="/materials/validate-when-variable-sync-without-effect.gif" alt="syncVariableTitle not introduced" style={{ width: 500 }} /> *Variable changes from invalid to valid, error message persists* | <img loading="lazy" src="/materials/validate-when-variable-sync-with-effect.gif" alt="syncVariableTitle introduced" style={{ width: 500 }} /> *Variable changes from invalid to valid, error message automatically cleared* |

## Example Demonstration

### Basic Usage

<BasicStory />

```tsx pure title="form-meta.tsx"
const formMeta = {
  effect: {
    value: validateWhenVariableSync(),
  },
  validate: {
    value: ({ value, context }) =>
      validateFlowValue(value, {
        node: context.node,
        errorMessages: {
          unknownVariable: 'Unknown Variable',
        },
      }),
  },
};
```

## API Reference

`validateWhenVariableSync(options?: { scope?: 'private' | 'public' })`

| Parameter | Type | Description | Default Value | Required |
| --- | --- | --- | --- | --- |
| `options.scope` | `'private' \| 'public'` | Variable scope type, specifies whether to listen for changes in private or public variables | - | No |

## Source Code Guide

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/effects/validate-when-variable-sync/index.ts" />

Use the CLI command to copy the source code to local:

```bash
npx @flowgram.ai/cli@latest materials effects/validate-when-variable-sync
```

### Directory Structure

```
packages/materials/form-materials/src/effects/validate-when-variable-sync/
└── index.ts           # Core implementation and export
```

### Core Implementation Explanation

This effect automatically triggers validation for error fields by listening to changes in accessible variables of the field, ensuring that error messages are cleared promptly when variable references change from invalid to valid.

Main process:

1. Listen for form initialization event `DataEvent.onValueInit`
2. Get the corresponding node scope (private or public) based on configuration
3. Listen to the variable change event in the scope `available.onListOrAnyVarChange`
4. When variables change, filter out error fields that include the current field name
5. Re-validate the filtered error fields
6. Return a cleanup function to release event listeners

### Dependency Overview

#### flowgram API

[**@flowgram.ai/variable-core**](https://github.com/bytedance/flowgram.ai/tree/main/packages/variable-engine/variable-core)

* `scope.available.onListOrAnyVarChange`: Listen for changes in available variables in the scope
