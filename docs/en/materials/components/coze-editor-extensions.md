import { SourceCode } from '@theme';
import { BasicStory as PromptWithVariablesStory } from 'components/form-materials/components/prompt-editor-with-variables';
import { BasicStory as PromptWithInputsStory } from 'components/form-materials/components/prompt-editor-with-inputs';

# CozeEditorExtensions

CozeEditorExtensions is a set of functional extensions based on [coze-editor](https://github.com/coze-dev/rush-arch/tree/main/packages/text-editor), providing variable selection, Inputs selector, and variable tag echo capabilities.

* `EditorVariableTree`: Monitors trigger characters like `@`/`{`, pops up an available variable tree, and writes the selected item into the editor.
* `EditorVariableTagInject`: Renders `{{variable.path}}` text with markup, displaying variable icons, titles, and echo hints.
* `EditorInputsTree`: Constructs a hierarchical tree based on node `inputsValues`, supporting insertion of `{{inputs.xxx}}` references in prompts.

## Demo

### Variable Tree + Tag Echo

<PromptWithVariablesStory />

```tsx pure title="prompt-editor-with-extensions.tsx"
import {
  PromptEditor,
  EditorVariableTree,
  EditorVariableTagInject,
  EditorInputsTree,
} from '@flowgram.ai/form-materials';

const formMeta = {
  render: () => (
    <PromptEditor value={value} onChange={onChange}>
      <EditorVariableTree triggerCharacters={TRIGGER_CHARACTERS} />
      <EditorVariableTagInject />
    </PromptEditor>
  );
}
```

:::tip{title="Trigger Method"}
`EditorVariableTree` defaults to monitoring `{`, `{{`, and `@`. You can customize trigger characters through `triggerCharacters`.
:::

### Node Inputs Reference

<PromptWithInputsStory />

```tsx pure title="prompt-editor-with-extensions.tsx"
import {
  PromptEditor,
  EditorVariableTree,
  EditorVariableTagInject,
  EditorInputsTree,
} from '@flowgram.ai/form-materials';


export function PromptEditorWithExtensions({ value, onChange, inputsValues }) {
  return (
    <PromptEditor value={value} onChange={onChange}>
      <EditorInputsTree inputsValues={inputsValues} />
    </PromptEditor>
  );
}
```

### Render Keys and Secondary Extension

CozeEditorExtensions declares fixed `renderKey` through [`createInjectMaterial`](/en/materials/common/inject-material.md):

* `EditorVariableTree.renderKey = 'EditorVariableTree'`
* `EditorVariableTagInject.renderKey = 'EditorVariableTagInject'`
* `EditorInputsTree.renderKey = 'EditorInputsTree'`

You can register renderers with the same name in `use-editor-props` to replace the default behavior. For example, customize the variable selection panel:

```tsx pure title="override-variable-tree.tsx"
import { useEditorProps } from '@flowgram.ai/editor';
import { EditorVariableTree } from '@flowgram.ai/form-materials';
import { CustomVariableTree } from './custom-variable-tree';

export function useCustomEditorProps() {
  return useEditorProps({
    materials: {
      components: {
        [EditorVariableTree.renderKey!]: CustomVariableTree,
      },
    },
  });
}
```

## API Reference

### EditorVariableTree Props

| Property Name | Type | Default | Description |
|--------|------|--------|------|
| `triggerCharacters` | `string[]` | `['{', '{}', '@']` | Character set that triggers variable tree popup |

### EditorVariableTagInject Props

| Property Name | Type | Default | Description |
|--------|------|--------|------|
| *None* | - | - | Component has no additional properties, rendering takes effect immediately |

### EditorInputsTree Props

| Property Name | Type | Default | Description |
|--------|------|--------|------|
| `inputsValues` | `IInputsValues` | - | Node Inputs key-value data, supports `FlowValue` reference |
| `triggerCharacters` | `string[]` | `['{', '{}', '@']` | Character set that triggers Inputs selector |

## Source Code Guide

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/coze-editor-extensions" />

Use CLI command to copy source code locally:

```bash
npx @flowgram.ai/cli@latest materials components/coze-editor-extensions
```

### Directory Structure Explanation

```
coze-editor-extensions/
├── index.tsx                 # Export injectable materials
├── extensions/
│   ├── inputs-tree.tsx       # Inputs Tree implementation
│   ├── variable-tag.tsx      # Variable tag rendering
│   └── variable-tree.tsx     # Variable tree selector
└── styles.css                # Tag styles and popup styles
```

### Core Implementation Explanation

**EditorVariableTree**

* Popup positioning and scroll synchronization: `Mention` + `PositionMirror` combination ensures Popover always stays close to cursor position, scrolling triggers repositioning through `rePosKey`
* Variable tree data source: `useVariableTree` reads variables registered in `Scope.available`, automatically applies schema filtering, disabled states, and icons

**EditorVariableTagInject**

* Tag rendering and subscription: Uses CodeMirror `MatchDecorator` to replace `{{xxx}}` text with `Tag` widget, and subscribes to variable title/Icon updates for real-time echo

**EditorInputsTree**

* Inputs tree construction: Supports both `FlowValue` and regular objects, recursively generates hierarchical nodes, and uniformly formats them as `{{path}}` before insertion

### Dependencies

#### Other Materials

[**InjectMaterial**](/en/materials/common/inject-material.md)

* `createInjectMaterial`: Creates injectable material components

#### Third-party Libraries

[**coze-editor**](https://github.com/coze-dev/rush-arch/tree/main/packages/text-editor)

* Base editor component

[**CodeMirror MatchDecorator**](https://codemirror.net/docs/ref/#search.MatchDecorator)

* Used for text matching and replacement of variable tags
