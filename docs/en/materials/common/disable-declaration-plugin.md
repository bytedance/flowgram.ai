import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/common/disable-declaration-plugin';

# DisableDeclarationPlugin

:::note{title=""}

In the design of the materials library, **"nodes themselves" are defined as VariableDeclaration**.

Components in the materials library such as [`VariableSelector`](/en/materials/components/variable-selector.md), [`PromptEditorWithVariables`](/en/materials/components/prompt-editor-with-variables.md), and [`SQLEditorWithVariables`](/en/materials/components/sql-editor-with-variables.md) all support selecting **"node"** by default.

:::

DisableDeclarationPlugin can **disable variable declarations (only allowing drilling down)** , making "node" unselectable.

## Demo

### Basic Usage

<BasicStory />

```tsx pure title="use-editor-props.tsx"
import { createDisableDeclarationPlugin } from '@flowgram.ai/form-materials';

// ...
{
  plugins: () => [createDisableDeclarationPlugin()],
}
// ...
```

## API

### createDisableDeclarationPlugin

Used to create a plugin that disables variable declarations. This plugin intercepts events from the variable engine and marks all variable declarations as disabled.

```ts
export const createDisableDeclarationPlugin = definePluginCreator<void>({...});
```

**Parameters**: None

**Return Value**: A plugin instance that can be directly added to the Editor's plugin list.

## Source Code Guide

<SourceCode href="https://github.com/bytedance/flowgram.ai/blob/main/packages/materials/form-materials/src/plugins/disable-declaration-plugin/create-disable-declaration-plugin.ts" />

You can copy the source code locally using the CLI command:

```bash
npx @flowgram.ai/cli@latest materials plugins/disable-declaration-plugin
```

### Directory Structure

```plaintext
packages/materials/form-materials/src/plugins/disable-declaration-plugin/
└── create-disable-declaration-plugin.ts  # Main implementation file of the plugin
```

### Core Implementation

The core implementation of DisableDeclarationPlugin is very concise, mainly including the following steps:

1. **Plugin Initialization**: Create the plugin through `definePluginCreator` and obtain the variable engine instance in the `onInit` hook
2. **Event Listening**: Listen to the `NewAST` and `UpdateAST` events of the variable engine
3. **Processing Logic**: When a variable declaration type (`VariableDeclaration`) AST node is detected, set its `meta.disabled` property to `true`

This implementation ensures that all newly created or updated variable declarations are automatically disabled, making them unselectable in variable selectors and other components.

### Dependencies

#### flowgram API

[**@flowgram.ai/editor**](https://github.com/bytedance/flowgram.ai/tree/main/packages/client/editor)

* [`ASTMatch`](https://flowgram.ai/auto-docs/editor/modules/ASTMatch): A utility class for matching and determining AST node types
* [`definePluginCreator`](https://flowgram.ai/auto-docs/core/functions/definePluginCreator): A function to define plugin creators
* [`GlobalEventActionType`](https://flowgram.ai/auto-docs/editor/interfaces/GlobalEventActionType): Type definitions for global event actions
* [`VariableEngine`](https://flowgram.ai/auto-docs/editor/classes/VariableEngine): Variable engine responsible for managing and processing variable-related operations
