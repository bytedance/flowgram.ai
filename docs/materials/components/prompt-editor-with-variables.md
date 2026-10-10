import { SourceCode } from '@theme';
import { BasicStory, StringOnlyStory } from 'components/form-materials/components/prompt-editor-with-variables';

# PromptEditorWithVariables

PromptEditorWithVariables 是一个增强版的提示编辑器，集成了变量引用功能。

它基于 [PromptEditor](/materials/components/prompt-editor.md) 构建，通过 `@`, `{` 弹出变量树选择器，并将输入变量回显为标签，使用户能够在提示模板中方便地引用和管理变量。

<br />

<div>
  <img loading="lazy" src="/materials/prompt-editor-with-variables.png" alt="组件" style={{ width: '50%' }} />

  *LLM\_3 和 LLM\_4 的提示词中引用了循环的批处理变量*
</div>

## 案例演示

### 基本使用

:::tip{title="变量插入"}

在编辑器中输入 `@`, `{` 字符可以触发变量选择器。

输入 `@`, `{` 后会显示可用的变量列表，选择变量后会自动插入为 `{{variable.path}}` 格式。

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

### 只能选择 String 类型的变量

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

## API 参考

### PromptEditorWithVariables Props

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `value` | `{ type: 'template', content: string }` | - | 提示模板内容 |
| `onChange` | `(value: { type: 'template', content: string }) => void` | - | 内容变化时的回调函数 |
| `readonly` | `boolean` | `false` | 是否为只读模式 |
| `placeholder` | `string` | - | 占位符文本 |
| `activeLinePlaceholder` | `string` | - | 当前行的占位提示 |
| `hasError` | `boolean` | `false` | 是否显示错误状态 |
| `disableMarkdownHighlight` | `boolean` | `false` | 是否禁用Markdown高亮 |
| `options` | `Options` | - | CodeMirror 配置选项 |

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/prompt-editor-with-variables/index.tsx" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials components/prompt-editor-with-variables
```

### 目录结构讲解

```
prompt-editor-with-variables/
└── index.tsx           # 主组件实现
```

### 核心实现说明

#### 变量能力集成

PromptEditorWithVariables 扩展了基础 [PromptEditor](/materials/components/prompt-editor.md)，并基于 [CozeEditorExtensions](/materials/components/coze-editor-extensions.md) 增加了变量引用和回显功能。

### 依赖的其他物料

[**PromptEditor**](/materials/components/prompt-editor.md)

[**CozeEditorExtensions**](/materials/components/coze-editor-extensions.md)

* `EditorVariableTree`: 变量树选择触发
* `EditorVariableTagInject`: 变量 Tag 回显
