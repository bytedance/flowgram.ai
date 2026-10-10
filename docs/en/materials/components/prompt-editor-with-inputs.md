import { SourceCode } from '@theme';
import { BasicStory, WithoutCanvas } from 'components/form-materials/components/prompt-editor-with-inputs';

# PromptEditorWithInputs

PromptEditorWithInputs is an enhanced prompt editor that integrates input variable management functionality. Built on PromptEditor, it additionally provides a tree-structured variable selector for inputs, enabling users to conveniently reference and manage input variables in prompt templates.

## Demo

### Basic Usage

<BasicStory />

```tsx pure title="form-meta.tsx"
import { PromptEditorWithInputs } from '@flowgram.ai/form-materials';

const formMeta = {
  render: () => (
    <>
      <Field<IInputsValues | undefined>
        name="inputsValues"
        defaultValue={{
          a: { type: 'constant', content: '123' },
          b: { type: 'ref', content: ['start_0', 'obj'] },
        }}
      >
        {({ field }) => (
          <InputsValuesTree value={field.value} onChange={(value) => field.onChange(value)} />
        )}
      </Field>
      <br />
      <Field<IInputsValues | undefined> name="inputsValues">
        {({ field: inputsField }) => (
          <Field<IFlowTemplateValue | undefined>
            name="prompt_editor_with_inputs"
            defaultValue={{
              type: 'template',
              content: '# Query \n {{b.obj2.num}}',
            }}
          >
            {({ field }) => (
              <PromptEditorWithInputs
                value={field.value}
                onChange={(value) => field.onChange(value)}
                inputsValues={inputsField.value || {}}
              />
            )}
          </Field>
        )}
      </Field>
    </>
  ),
}
```

### Inputs Insertion

Enter the `@`, `{` characters in the editor to trigger the Inputs selector.

After entering `@`, `{`, a list of available variables will be displayed. Selecting a variable will automatically insert it in the `{{inputs.path}}` format.

### Usage Without Canvas

:::warning

When used without canvas, due to inability to access variables, inputsValues does not support value definitions of type: 'ref'.

:::

<WithoutCanvas />

```tsx pure title="with-canvas.tsx"
export const WithoutCanvas = () => {
  const [value, setValue] = useState<IFlowTemplateValue | undefined>({
    type: 'template',
    content: '# Role \n You are a helpful assistant. \n\n # Query \n {{b.obj2.num}} \n\n',
  });

  return (
    <div>
      <PromptEditorWithInputs
        value={value}
        onChange={(value) => setValue(value)}
        inputsValues={{
          a: { type: 'constant', content: '123' },
          b: {
            c: {
              d: { type: 'constant', content: 456 },
            },
            e: { type: 'constant', content: 789 },
          },
        }}
      />
    </div>
  );
};
```

## API Reference

### PromptEditorWithInputs Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `{ type: 'template', content: string }` | - | Prompt template content |
| `inputsValues` | `IInputsValues` | `{}` | Input variable key-value pairs |
| `onChange` | `(value: { type: 'template', content: string }) => void` | - | Callback function when content changes |
| `readonly` | `boolean` | `false` | Whether it's read-only mode |
| `placeholder` | `string` | - | Placeholder text |
| `activeLinePlaceholder` | `string` | - | Current line placeholder hint |
| `hasError` | `boolean` | `false` | Whether to display error state |
| `disableMarkdownHighlight` | `boolean` | `false` | Whether to disable Markdown highlighting |
| `options` | `Options` | - | CodeMirror configuration options |

## Source Code Guide

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/prompt-editor-with-inputs" />

Use CLI command to copy source code locally:

```bash
npx @flowgram.ai/cli@latest materials components/prompt-editor-with-inputs
```

### Directory Structure Explanation

```
prompt-editor-with-inputs/
└──  index.tsx          # Main component implementation
```

### Core Implementation Explanation

#### Input Variable Integration

PromptEditorWithInputs extends the basic [PromptEditor](/en/materials/components/prompt-editor.md) and adds node inputs reference functionality based on [coze-editor-extensions](/en/materials/components/coze-editor-extensions.md).

### Dependencies

[**PromptEditor**](/en/materials/components/prompt-editor.md)

[**CozeEditorExtensions**](/en/materials/components/coze-editor-extensions.md)

* `EditorInputsTree`: Input tree selection trigger

[**FlowValue**](/en/materials/common/flow-value.md)

* `IInputsValues`: Input variable type definition
