import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/components/prompt-editor';

# PromptEditor

PromptEditor 是一个专业的提示词编辑器组件，基于 Coze Editor 构建，支持 Markdown 语法高亮、Jinja 模板语法高亮等功能，适用于创建和编辑 AI 提示词模板。

## 案例演示

### 基本使用

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

## API 参考

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | `{ type: 'template'; content: string }` | - | 编辑器的值对象 |
| onChange | `(value: { type: 'template'; content: string }) => void` | - | 值变化时的回调函数 |
| readonly | `boolean` | `false` | 是否只读模式 |
| placeholder | `string` | - | 占位符文本 |
| activeLinePlaceholder | `React.ReactNode` | - | 活动行占位符 |
| style | `React.CSSProperties` | - | 自定义样式 |
| hasError | `boolean` | `false` | 是否显示错误状态 |
| disableMarkdownHighlight | `boolean` | `false` | 是否禁用 Markdown 高亮 |
| options | `Partial<InferValues<Preset[number]>>` | - | 编辑器额外选项 |
| children | `React.ReactNode` | - | 子组件 |

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/prompt-editor" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials components/prompt-editor
```

### 目录结构讲解

```plaintext
components/prompt-editor/
├── index.tsx          # 组件入口文件
├── editor.tsx         # 编辑器核心实现
├── types.tsx          # 类型定义文件
├── styles.css         # 组件样式文件
└── extensions/        # 编辑器扩展功能
    ├── jinja.tsx      # Jinja 模板语法高亮支持
    ├── markdown.tsx   # Markdown 语法高亮支持
    └── language-support.tsx # 语言支持基础配置
```

### 核心实现说明

PromptEditor 组件基于 @flowgram.ai/coze-editor 构建，提供了专业的提示词编辑功能。主要特点包括：

1. **Markdown 语法高亮**：支持标题、斜体、粗体、列表等 Markdown 元素的语法高亮
2. **Jinja 模板语法高亮**：支持 Jinja 模板引擎的语法高亮，方便创建动态提示词
3. **响应式更新**：监听外部值变化并同步到编辑器
4. **可定制性**：支持自定义样式、占位符等多种配置选项

组件内部使用懒加载优化性能，并通过 EditorProvider 和 Renderer 组件提供编辑器核心功能。

### 依赖梳理

#### flowgram API

[**@flowgram.ai/coze-editor**](https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/coze-editor)

* `Renderer`: 编辑器渲染组件
* `EditorProvider`: 编辑器上下文提供者
* `ActiveLinePlaceholder`: 活动行占位符组件
* `preset-prompt`: 提示词编辑器预设插件

#### 第三方库

[**CodeMirror**](https://codemirror.net/)

* 提供底层编辑器功能支持
