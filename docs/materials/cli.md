# 物料管理 CLI

Flowgram 提供了专门的 CLI 命令行工具，帮助你管理项目中的官方物料。

## 安装

可使用 npx 直接运行：

```bash
npx @flowgram.ai/cli@latest [command]
```

## 同步物料到项目

使用 `materials` 命令将官方物料的源代码添加到你的项目中进行定制：

```bash
# 交互式选择物料
npx @flowgram.ai/cli@latest materials

# 直接指定物料
npx @flowgram.ai/cli@latest materials components/json-schema-editor

# 指定多个物料（逗号分隔）
npx @flowgram.ai/cli@latest materials components/variable-selector,effect/provideJsonSchemaOutputs

# 选择多个物料（交互式多选）
npx @flowgram.ai/cli@latest materials --select-multiple
```

运行后，CLI 会提示你选择要添加到项目中的物料：

```console
🚀 Welcome to @flowgram.ai form-materials CLI!
📁 Project: /path/to/your/project
🎯 Flowgram Version: 1.0.0
  - Target material root: /path/to/your/project/src/form-materials

🚀 The following materials will be added to your project
📦 components/json-schema-editor
📦 components/variable-selector
📦 effect/provideJsonSchemaOutputs

✅ These npm dependencies is added to your package.json
- @semi-design/icons
- lodash-es
- classnames

➡️ Please run npm install to install dependencies
```

### 高级选项

`materials` 命令支持以下选项：

| 选项 | 说明 | 示例 |
|------|------|------|
| `--refresh-project-imports` | 刷新项目中对复制物料的导入路径 | `npx @flowgram.ai/cli@latest materials components/json-schema-editor --refresh-project-imports` |
| `--target-material-root-dir <dir>` | 指定物料复制的目标目录 | `npx @flowgram.ai/cli@latest materials --target-material-root-dir src/custom-materials` |
| `--select-multiple` | 启用交互式多选模式 | `npx @flowgram.ai/cli@latest materials --select-multiple` |

## 查找已使用的物料

使用 `find-used-materials` 命令分析项目代码，找出所有已使用的官方物料：

```bash
npx @flowgram.ai/cli@latest find-used-materials
```

输出示例：

```console
🚀 Welcome to @flowgram.ai form-materials CLI!
📁 Project: /path/to/your/project
🎯 Flowgram Version: 1.0.0

👀 The exports of components/json-schema-editor is JsonSchemaEditor,JsonSchemaEditorProps
👀 The exports of components/variable-selector is VariableSelector,VariableSelectorProps

👀 Searching src/components/MyForm.tsx
🔍 import { JsonSchemaEditor } from '@flowgram.ai/form-materials'
import components/json-schema-editor by JsonSchemaEditor

👀 Searching src/pages/Settings.tsx
🔍 import { VariableSelector } from '@flowgram.ai/form-materials'
import components/variable-selector by VariableSelector

📦 All used materials:
components/json-schema-editor,components/variable-selector
```

这个命令会：

* 扫描项目中所有的 TypeScript 文件
* 分析从 `@flowgram.ai/form-materials` 的导入语句
* 识别出使用的具体物料
* 输出详细的使用位置信息

## Case Run Down

### 将项目中所有使用到的官方物料，代码同步到项目的 src/custom-materials 目录

1. 使用 `find-used-materials` 命令查看项目中使用到的官方物料。

```bash
npx @flowgram.ai/cli@latest find-used-materials
```

命令运行后，会输出项目中使用到的官方物料列表。

```console
📦 All used materials:
components/json-schema-editor,components/variable-selector
```

2. 使用 `materials` 命令将这些物料的源代码添加到项目的 src/custom-materials 目录。

```bash
npx @flowgram.ai/cli@latest materials components/json-schema-editor,components/variable-selector \
  --target-material-root-dir src/custom-materials \
  --refresh-project-imports
```

* `--refresh-project-imports` 选项会刷新项目中对复制物料的导入路径，确保使用的是最新的定制版本。
* `--target-material-root-dir src/custom-materials` 选项指定了物料复制的目标目录为 src/custom-materials。

## 常见问题

### Q: CLI 添加后找不到新增的依赖项目？

A: 请检查是否运行了 `npm install` 安装新添加的依赖。
