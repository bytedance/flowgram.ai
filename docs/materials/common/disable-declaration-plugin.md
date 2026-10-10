import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/common/disable-declaration-plugin';

# DisableDeclarationPlugin

:::note{title=""}

在物料库的设计中，**“节点本身”作为一种变量声明，是可选的**。

物料库中 [`VariableSelector`](/materials/components/variable-selector.md), [`PromptEditorWithVariables`](/materials/components/prompt-editor-with-variables.md), [`SQLEditorWithVariables`](/materials/components/sql-editor-with-variables.md) 等组件，都默认支持选择 **“节点变量”**。

:::

DisableDeclarationPlugin 可以**禁用变量声明的可选性（只能选下钻）**，从而使“节点变量”不可选。

## 案例演示

### 基本使用

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

用于创建禁用变量声明的插件。该插件会拦截变量引擎的事件，将所有变量声明标记为禁用状态。

```ts
export const createDisableDeclarationPlugin = definePluginCreator<void>({...});
```

**参数**：无

**返回值**：一个插件实例，可直接添加到 Editor 的插件列表中。

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/blob/main/packages/materials/form-materials/src/plugins/disable-declaration-plugin/create-disable-declaration-plugin.ts" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials plugins/disable-declaration-plugin
```

### 目录结构讲解

```plaintext
packages/materials/form-materials/src/plugins/disable-declaration-plugin/
└── create-disable-declaration-plugin.ts  # 插件的主要实现文件
```

### 核心实现说明

DisableDeclarationPlugin 的核心实现非常简洁，主要包含以下步骤：

1. **初始化插件**：通过 `definePluginCreator` 创建插件，并在 `onInit` 钩子中获取变量引擎实例
2. **事件监听**：监听变量引擎的 `NewAST` 和 `UpdateAST` 事件
3. **处理逻辑**：当检测到变量声明类型 (`VariableDeclaration`) 的 AST 节点时，将其 `meta.disabled` 属性设置为 `true`

这种实现方式确保了所有新创建或更新的变量声明都会被自动禁用，从而在变量选择器等组件中不可选。

### 依赖梳理

#### flowgram API

[**@flowgram.ai/editor**](https://github.com/bytedance/flowgram.ai/tree/main/packages/client/editor)

* [`ASTMatch`](https://flowgram.ai/auto-docs/editor/modules/ASTMatch): 用于匹配和判断 AST 节点类型的工具类
* [`definePluginCreator`](https://flowgram.ai/auto-docs/core/functions/definePluginCreator): 定义插件创建器的函数
* [`GlobalEventActionType`](https://flowgram.ai/auto-docs/editor/interfaces/GlobalEventActionType): 全局事件动作的类型定义
* [`VariableEngine`](https://flowgram.ai/auto-docs/editor/classes/VariableEngine): 变量引擎，负责管理和处理变量相关的操作
