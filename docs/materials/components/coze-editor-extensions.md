import { SourceCode } from '@theme';
import { BasicStory as PromptWithVariablesStory } from 'components/form-materials/components/prompt-editor-with-variables';
import { BasicStory as PromptWithInputsStory } from 'components/form-materials/components/prompt-editor-with-inputs';

# CozeEditorExtensions

CozeEditorExtensions 是一组基于 [coze-editor](https://github.com/coze-dev/rush-arch/tree/main/packages/text-editor) 的功能扩展，提供变量、Inputs 选择器与变量标签回显能力。

* `EditorVariableTree`：监听 `@`/`{` 等触发字符，弹出可用变量树并将选中项写入编辑器。
* `EditorVariableTagInject`：对 `{{variable.path}}` 文本进行标记渲染，展示变量图标、标题与回显提示。
* `EditorInputsTree`：基于节点 `inputsValues` 构造层级树，支持在提示词中插入 `{{inputs.xxx}}` 引用。

## 案例演示

### 变量树 + 标签回显

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

:::tip{title="触发方式"}
`EditorVariableTree` 默认监听 `{`、`{{` 和 `@`，你可以通过 `triggerCharacters` 自定义触发字符。
:::

### 节点 Inputs 引用

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

### 渲染键与二次扩展

CozeEditorExtensions 通过 [`createInjectMaterial`](/materials/common/inject-material.md) 声明了固定的 `renderKey`：

* `EditorVariableTree.renderKey = 'EditorVariableTree'`
* `EditorVariableTagInject.renderKey = 'EditorVariableTagInject'`
* `EditorInputsTree.renderKey = 'EditorInputsTree'`

你可以在 `use-editor-props` 中注册同名渲染器，以替换默认行为。例如自定义变量选择面板：

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

## API 参考

### EditorVariableTree Props

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `triggerCharacters` | `string[]` | `['{', '{}', '@']` | 触发变量树弹出的字符集 |

### EditorVariableTagInject Props

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| *无* | - | - | 组件无额外属性，渲染即生效 |

### EditorInputsTree Props

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `inputsValues` | `IInputsValues` | - | 节点 Inputs 的键值数据，支持 `FlowValue` 引用 |
| `triggerCharacters` | `string[]` | `['{', '{}', '@']` | 触发 Inputs 选择器的字符集 |

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/coze-editor-extensions" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials components/coze-editor-extensions
```

### 目录结构讲解

```
coze-editor-extensions/
├── index.tsx                 # 导出可注入物料
├── extensions/
│   ├── inputs-tree.tsx       # Inputs Tree 实现
│   ├── variable-tag.tsx      # 变量标签渲染
│   └── variable-tree.tsx     # 变量树选择器
└── styles.css                # 标签样式与弹窗样式
```

### 核心实现说明

**EditorVariableTree**

* 弹窗定位与滚动同步：`Mention` + `PositionMirror` 组合确保 Popover 始终贴合光标位置，滚动时会通过 `rePosKey` 触发重新定位
* 变量树数据来源：`useVariableTree` 读取 `Scope.available` 中注册的变量，自动应用 schema 过滤、禁用状态和图标

**EditorVariableTagInject**

* 标签渲染与订阅：使用 CodeMirror `MatchDecorator` 将 `{{xxx}}` 文本替换为 `Tag` 小部件，并订阅变量标题/Icon 更新，实现实时回显

**EditorInputsTree**

* Inputs 树构造：支持 `FlowValue` 与普通对象，递归生成层级节点，并在插入前统一格式化为 `{{path}}`

### 依赖梳理

#### 其他物料

[**InjectMaterial**](/materials/common/inject-material.md)

* `createInjectMaterial`: 创建可注入的物料组件

#### 第三方库

[**coze-editor**](https://github.com/coze-dev/rush-arch/tree/main/packages/text-editor)

* 基础编辑器组件

[**CodeMirror MatchDecorator**](https://codemirror.net/docs/ref/#search.MatchDecorator)

* 用于变量标签的文本匹配和替换
