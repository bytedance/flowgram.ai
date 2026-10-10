import { SourceCode } from '@theme';
import { BasicStory, WithoutCanvas } from 'components/form-materials/components/prompt-editor-with-inputs';

# PromptEditorWithInputs

PromptEditorWithInputs 是一个增强版的提示编辑器，集成了**节点输入提示**功能。

它基于 [PromptEditor](/materials/components/prompt-editor.md) 构建，通过 `@`, `{` 字符弹出节点输入选择器，使用户能够在提示模板中方便地引用节点的输入。

## 案例演示

### 基本使用

:::tip{title="Inputs 插入"}

在编辑器中输入 `@`, `{` 字符可以触发 Inputs 选择器。

输入 `@`, `{` 后会显示可用的变量列表，选择变量后会自动插入为 `{{inputs.path}}` 格式。

:::

<BasicStory />

```tsx pure title="form-meta.tsx"
import { PromptEditorWithInputs } from '@flowgram.ai/form-materials';

const formMeta = {
  render: () => (
    <>
      <FormHeader />
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

### 脱离画布使用

:::warning

脱离画布使用时，由于没法访问变量，inputsValues 内不支持 type: 'ref' 类型的值定义

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

## API 参考

### PromptEditorWithInputs Props

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `value` | `{ type: 'template', content: string }` | - | 提示模板内容 |
| `inputsValues` | `IInputsValues` | `{}` | 输入变量键值对 |
| `onChange` | `(value: { type: 'template', content: string }) => void` | - | 内容变化时的回调函数 |
| `readonly` | `boolean` | `false` | 是否为只读模式 |
| `placeholder` | `string` | - | 占位符文本 |
| `activeLinePlaceholder` | `string` | - | 当前行的占位提示 |
| `hasError` | `boolean` | `false` | 是否显示错误状态 |
| `disableMarkdownHighlight` | `boolean` | `false` | 是否禁用Markdown高亮 |
| `options` | `Options` | - | CodeMirror 配置选项 |

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/prompt-editor-with-inputs" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials components/prompt-editor-with-inputs
```

### 目录结构讲解

```
prompt-editor-with-inputs/
└──  index.tsx          # 主组件实现
```

### 核心实现说明

#### 输入变量集成

PromptEditorWithInputs 扩展了基础 [PromptEditor](/materials/components/prompt-editor.md)，并基于 [coze-editor-extensions](/materials/components/coze-editor-extensions.md) 增加了节点 inputs 引用功能。

### 依赖的其他物料

[**PromptEditor**](/materials/components/prompt-editor.md)

[**CozeEditorExtensions**](/materials/components/coze-editor-extensions.md)

* `EditorInputsTree`: 输入树选择触发

[**FlowValue**](/materials/common/flow-value.md)

* `IInputsValues`: 输入变量类型定义
