import { SourceCode } from '@theme';
import { BasicStory, StringOnlyStory } from 'components/form-materials/components/prompt-editor-with-variables';

# PromptEditorWithVariables

PromptEditorWithVariables is an enhanced prompt editor that integrates variable management functionality. Built on PromptEditor, it provides a variable tree selector and variable tag injection, enabling users to conveniently reference and manage variables in prompt templates.

<br />

<div>
  <img loading="lazy" src="/materials/prompt-editor-with-variables.png" alt="Component" style={{ width: '50%' }} />

  *Prompts in LLM\_3 and LLM\_4 reference loop batch processing variables*
</div>

## Demo

### Basic Usage

:::tip{title="Variable Insertion"}

Enter the `@`, `{` characters in the editor to trigger the variable selector.

After entering `@`, `{`, a list of available variables will be displayed. Selecting a variable will automatically insert it in the `{{variable.path}}` format.

:::

<BasicStory />

```tsx pure title="form-meta.tsx"
import { PromptEditorWithVariables } from '@flowgram.ai/form-materials';

const formMeta = {
  render: () => (
    <>
      <Field<any> name="prompt_template" defaultValue={{
              type: 'template',
              content: `# Role
You are a helpful assistant

# Query
{{start_0.str}}`,
            }}>
        {({ field }) => (
          <PromptEditorWithVariables
            value={field.value}
            onChange={(value) => field.onChange(value)}
          />
        )}
      </Field>
    </>
  ),
}
```

### String Only Variables

<StringOnlyStory />

```tsx pure title="form-meta.tsx"
import { PromptEditorWithVariables, VariableSelectorProvider } from '@flowgram.ai/form-materials';

const STRING_ONLY_SCHEMA = { type: 'string' };

const formMeta = {
  render: () => (
    <VariableSelectorProvider includeSchema={STRING_ONLY_SCHEMA}>
      <Field<any> name="prompt_template">
        {({ field }) => (
          <PromptEditorWithVariables
            value={field.value}
            onChange={(value) => field.onChange(value)}
          />
        )}
      </Field>
    </VariableSelectorProvider>
  ),
}
```

## API Reference

### PromptEditorWithVariables Props

| Property | Type | Default | Description |
|--------|------|--------|------|
| `value` | `{ type: 'template', content: string }` | - | Prompt template content |
| `onChange` | `(value: { type: 'template', content: string }) => void` | - | Callback function when content changes |
| `readonly` | `boolean` | `false` | Whether it's read-only mode |
| `placeholder` | `string` | - | Placeholder text |
| `activeLinePlaceholder` | `string` | - | Current line placeholder hint |
| `hasError` | `boolean` | `false` | Whether to display error state |
| `disableMarkdownHighlight` | `boolean` | `false` | Whether to disable Markdown highlighting |
| `options` | `Options` | - | CodeMirror configuration options |

## Source Code Guide

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/prompt-editor-with-variables/index.tsx" />

Use CLI command to copy source code locally:

```bash
npx @flowgram.ai/cli@latest materials components/prompt-editor-with-variables
```

### Directory Structure Explanation

```
prompt-editor-with-variables/
└── index.tsx           # Main component implementation
```

### Core Implementation Explanation

#### Variable Capability Integration

PromptEditorWithVariables extends the basic [PromptEditor](/en/materials/components/prompt-editor.md) and adds variable reference and tag display functionality based on [CozeEditorExtensions](/en/materials/components/coze-editor-extensions.md).

### Dependent Materials

[**PromptEditor**](/en/materials/components/prompt-editor.md)

[**CozeEditorExtensions**](/en/materials/components/coze-editor-extensions.md)

* `EditorVariableTree`: Variable tree selection trigger
* `EditorVariableTagInject`: Variable Tag display
