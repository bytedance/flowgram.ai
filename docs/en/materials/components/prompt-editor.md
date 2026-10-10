import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/components/prompt-editor';

# PromptEditor

PromptEditor is a professional prompt editor component built on Coze Editor, supporting Markdown syntax highlighting, Jinja template syntax highlighting, and other features, suitable for creating and editing AI prompt templates.

## Examples

### Basic Usage

<BasicStory />

```tsx pure title="form-meta.tsx"
import { PromptEditor } from '@flowgram.ai/form-materials';

const formMeta = {
  render: () => (
    <>
      <Field<any | undefined>
        name="prompt_editor"
        defaultValue={{
          type: 'template',
          content: '# Role\n You are a helpful assistant',
        }}
      >
        {({ field }) => (
          <PromptEditor value={field.value} onChange={(value) => field.onChange(value)} />
        )}
      </Field>
    </>
  ),
}
```

## API Reference

| Property | Type | Default Value | Description |
| :--- | :--- | :--- | :--- |
| value | `{ type: 'template'; content: string }` | - | Editor value object |
| onChange | `(value: { type: 'template'; content: string }) => void` | - | Callback function when value changes |
| readonly | `boolean` | `false` | Whether in read-only mode |
| placeholder | `string` | - | Placeholder text |
| activeLinePlaceholder | `React.ReactNode` | - | Active line placeholder |
| style | `React.CSSProperties` | - | Custom styles |
| hasError | `boolean` | `false` | Whether to show error state |
| disableMarkdownHighlight | `boolean` | `false` | Whether to disable Markdown highlighting |
| options | `Partial<InferValues<Preset[number]>>` | - | Additional editor options |
| children | `React.ReactNode` | - | Child components |

## Source Code Guide

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/prompt-editor" />

Use the CLI command to copy the source code locally:

```bash
npx @flowgram.ai/cli@latest materials components/prompt-editor
```

### Directory Structure

```plaintext
components/prompt-editor/
├── index.tsx          # Component entry file
├── editor.tsx         # Editor core implementation
├── types.tsx          # Type definitions
├── styles.css         # Component styles
└── extensions/        # Editor extensions
    ├── jinja.tsx      # Jinja template syntax highlighting
    ├── markdown.tsx   # Markdown syntax highlighting
    └── language-support.tsx # Language support configuration
```

### Core Implementation

The PromptEditor component is built on @flowgram.ai/coze-editor and provides professional prompt editing functionality. Key features include:

1. **Markdown Syntax Highlighting**: Supports syntax highlighting for Markdown elements such as headings, italics, bold, lists, etc.
2. **Jinja Template Syntax Highlighting**: Supports syntax highlighting for Jinja template engine, facilitating the creation of dynamic prompts
3. **Responsive Updates**: Listens for external value changes and synchronizes to the editor
4. **Customizability**: Supports multiple configuration options such as custom styles and placeholders

The component internally uses lazy loading to optimize performance and provides core editor functionality through EditorProvider and Renderer components.

### Dependencies

#### flowgram API

[**@flowgram.ai/coze-editor**](https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/coze-editor)

* `Renderer`: Editor rendering component
* `EditorProvider`: Editor context provider
* `ActiveLinePlaceholder`: Active line placeholder component
* `preset-prompt`: Prompt editor preset plugin

#### Third-party Libraries

[**CodeMirror**](https://codemirror.net/)

* Provides underlying editor functionality support
