# Material Management CLI

Flowgram provides a dedicated CLI command-line tool to help you manage official materials in your project.

## Installation

You can run it directly with npx:

```bash
npx @flowgram.ai/cli@latest [command]
```

## Sync Materials to Project

Use the `materials` command to add the source code of official materials to your project for customization:

```bash
# Interactive material selection
npx @flowgram.ai/cli@latest materials

# Directly specify material
npx @flowgram.ai/cli@latest materials components/json-schema-editor

# Specify multiple materials (comma-separated)
npx @flowgram.ai/cli@latest materials components/variable-selector,effect/provideJsonSchemaOutputs

# Select multiple materials (interactive multi-select)
npx @flowgram.ai/cli@latest materials --select-multiple
```

After running, the CLI will prompt you to select materials to add to your project:

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

### Advanced Options

The `materials` command supports the following options:

| Option | Description | Example |
|------|------|------|
| `--refresh-project-imports` | Refresh project imports for copied materials | `npx @flowgram.ai/cli@latest materials components/json-schema-editor --refresh-project-imports` |
| `--target-material-root-dir <dir>` | Specify target directory for material copying | `npx @flowgram.ai/cli@latest materials --target-material-root-dir src/custom-materials` |
| `--select-multiple` | Enable interactive multi-select mode | `npx @flowgram.ai/cli@latest materials --select-multiple` |

## Find Used Materials

Use the `find-used-materials` command to analyze project code and find all used official materials:

```bash
npx @flowgram.ai/cli@latest find-used-materials
```

Output example:

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

This command will:

* Scan all TypeScript files in the project
* Analyze import statements from `@flowgram.ai/form-materials`
* Identify specific materials being used
* Output detailed usage location information

## Case Run Down

### Sync all used official materials in the project to the src/custom-materials directory

1. Use the `find-used-materials` command to see the official materials used in the project.

```bash
npx @flowgram.ai/cli@latest find-used-materials
```

After the command runs, it will output a list of official materials used in the project.

```console
📦 All used materials:
components/json-schema-editor,components/variable-selector
```

2. Use the `materials` command to add the source code of these materials to the project's src/custom-materials directory.

```bash
npx @flowgram.ai/cli@latest materials components/json-schema-editor,components/variable-selector \
  --target-material-root-dir src/custom-materials \
  --refresh-project-imports
```

* The `--refresh-project-imports` option will refresh the import paths for copied materials in the project, ensuring the latest customized versions are used.
* The `--target-material-root-dir src/custom-materials` option specifies the target directory for material copying as src/custom-materials.

## FAQ

### Q: Can't find the newly added dependencies after CLI adds them?

A: Please check if you have run `npm install` to install the newly added dependencies.
