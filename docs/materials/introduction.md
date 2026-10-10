import { PackageManagerTabs } from '@theme';

# 快速上手

## 如何使用？

### 通过包引用使用

官方表单物料可以直接通过包引用使用：

<PackageManagerTabs command="install @flowgram.ai/form-materials" />

```tsx
import { JsonSchemaEditor } from '@flowgram.ai/form-materials'
```

### 通过 CLI 添加物料源代码使用

如果业务对组件有定制诉求（如：更改文案、样式、业务逻辑），推荐 **通过 CLI 将物料源代码添加到项目中进行定制**：

```bash
npx @flowgram.ai/cli@latest materials
```

运行后 CLI 会提示用户选择要添加到项目中的物料:

```console
? Select one material to add: (Use arrow keys)
❯ components/json-schema-editor
  components/type-selector
  components/variable-selector
```

使用者也可以直接在 CLI 中添加指定物料的源代码:

```bash
npx @flowgram.ai/cli@latest materials components/json-schema-editor
```

CLI 运行成功后，相关物料会自动添加到当前项目下的 `src/form-materials` 目录下

:::warning 注意事项

1. 官方物料目前底层基于 [Semi Design](https://semi.design/) 实现，业务如果有底层组件库的诉求，可以通过 CLI 复制源码进行替换
2. 一些物料会依赖一些第三方 npm 库，这些库会在 CLI 运行时自动安装
3. 一些物料会依赖另外一些官方物料，这些被依赖的物料源代码在 CLI 运行时会一起被添加到项目中去

:::

## 附：根据节点类型查找物料

### 实现节点输入输出

**出入参配置**

* 节点入参：[InputsValues](/materials/components/inputs-values.md), [InputsValuesTree](/materials/components/inputs-values-tree.md)
* 节点出参：[JsonSchemaEditor](/materials/components/json-schema-editor.md)
* 入参校验：[validateFlowValue](/materials/validate/validate-flow-value.md)
* 出参变量生成：[provideJsonSchemaOutputs](/materials/effects/provide-json-schema-outputs.md)

**出入参展示**

* 入参展示：[DisplayInputsValues](/materials/components/display-inputs-values.md)
* 出参展示：[DisplayOutputs](/materials/components/display-outputs.md)

### 实现代码节点

* 代码编辑器：[CodeEditor](/materials/components/code-editor.md)

### 实现大模型节点

* 提示词编辑器：[PromptEditor](/materials/components/prompt-editor.md)
* 可选变量的提示词编辑器：[PromptEditorWithVariables](/materials/components/prompt-editor-with-variables.md)

### 实现条件分支节点

* 单行条件分支配置：[ConditionRow](/materials/components/condition-row.md)
* 监听变量实现分支联动：[listenRefSchemaChange](/materials/effects/listen-ref-schema-change.md), [listenRefValueChange](/materials/effects/listen-ref-value-change.md)

### 实现数据库节点

* 单行数据库查询条件配置：[DBConditionRow](/materials/components/db-condition-row.md)
* SQL 编辑器：[SQLCodeEditor](/materials/components/code-editor.md)
* 可选变量的 SQL 编辑器：[SQLEditorWithVariables](/materials/components/sql-editor-with-variables.md)

#### 实现循环节点

**循环输入**

* 循环输入数组变量选择器：[BatchVariableSelector](/materials/components/batch-variable-selector.md)
* Item、Index 推导：[provideBatchInput](/materials/effects/provide-batch-input.md)

**循环输出**

* 循环输出数组变量选择器：[BatchOutputs](/materials/components/batch-outputs.md)
* 输出变量作用域链调整 + 类型推导：[batchOutputsPlugin](/materials/form-plugins/batch-outputs-plugin.md)

### 实现 HTTP 节点

* JSON 编辑器：[JsonCodeEditor](/materials/components/code-editor.md)
* 可选变量的 JSON 编辑器：[JsonEditorWithVariables](/materials/components/json-editor-with-variables.md)

### 实现变量赋值/声明节点

* 单行变量赋值、声明：[AssignRow](/materials/components/assign-row.md)
* 变量赋值、声明配置列表：[AssignRows](/materials/components/assign-rows.md)
* 变量声明类型自动推导：[inferAssignPlugin](/materials/form-plugins/infer-assign-plugin.md)
