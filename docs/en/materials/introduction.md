import { PackageManagerTabs } from '@theme';

# Getting Started

## How to Use?

### Use via Package Import

Official form materials can be used directly through package import:

<PackageManagerTabs command="install @flowgram.ai/form-materials" />

```tsx
import { JsonSchemaEditor } from '@flowgram.ai/form-materials'
```

### Add Material Source Code via CLI

If your business has customization requirements for components (e.g., changing text, styles, business logic), it is recommended to **add material source code to the project via CLI for customization**:

```bash
npx @flowgram.ai/cli@latest materials
```

After running, the CLI will prompt the user to select materials to add to the project:

```console
? Select one material to add: (Use arrow keys)
❯ components/json-schema-editor
  components/type-selector
  components/variable-selector
```

Users can also directly add source code for specified materials via CLI:

```bash
npx @flowgram.ai/cli@latest materials components/json-schema-editor
```

After the CLI runs successfully, the relevant materials will be automatically added to the `src/form-materials` directory under the current project.

:::warning Notes

1. Official materials are currently implemented based on [Semi Design](https://semi.design/). If your business has underlying component library requirements, you can replace them by copying the source code via CLI
2. Some materials depend on third-party npm libraries, which will be automatically installed when the CLI runs
3. Some materials depend on other official materials, and the source code of these dependent materials will be added to the project together when the CLI runs

:::

## Appendix: Finding Materials by Node Type

### Implementing Node Input and Output

**Parameter Configuration**

* Node Input: [InputsValues](/en/materials/components/inputs-values.md), [InputsValuesTree](/en/materials/components/inputs-values-tree.md)
* Node Output: [JsonSchemaEditor](/en/materials/components/json-schema-editor.md)
* Input Validation: [validateFlowValue](/en/materials/validate/validate-flow-value.md)
* Output Variable Generation: [provideJsonSchemaOutputs](/en/materials/effects/provide-json-schema-outputs.md)

**Parameter Display**

* Input Display: [DisplayInputsValues](/en/materials/components/display-inputs-values.md)
* Output Display: [DisplayOutputs](/en/materials/components/display-outputs.md)

### Implementing Code Nodes

* Code Editor: [CodeEditor](/en/materials/components/code-editor.md)

### Implementing LLM Nodes

* Prompt Editor: [PromptEditor](/en/materials/components/prompt-editor.md)
* Prompt Editor with Variables: [PromptEditorWithVariables](/en/materials/components/prompt-editor-with-variables.md)

### Implementing Condition Branch Nodes

* Single-line Condition Branch Configuration: [ConditionRow](/en/materials/components/condition-row.md)
* Variable Listening for Branch Linkage: [listenRefSchemaChange](/en/materials/effects/listen-ref-schema-change.md), [listenRefValueChange](/en/materials/effects/listen-ref-value-change.md)

### Implementing Database Nodes

* Single-line Database Query Condition Configuration: [DBConditionRow](/en/materials/components/db-condition-row.md)
* SQL Editor: [SQLCodeEditor](/en/materials/components/code-editor.md)
* SQL Editor with Variables: [SQLEditorWithVariables](/en/materials/components/sql-editor-with-variables.md)

#### Implementing Loop Nodes

**Loop Input**

* Loop Input Array Variable Selector: [BatchVariableSelector](/en/materials/components/batch-variable-selector.md)
* Item, Index Derivation: [provideBatchInput](/en/materials/effects/provide-batch-input.md)

**Loop Output**

* Loop Output Array Variable Selector: [BatchOutputs](/en/materials/components/batch-outputs.md)
* Output Variable Scope Chain Adjustment + Type Derivation: [batchOutputsPlugin](/en/materials/form-plugins/batch-outputs-plugin.md)

### Implementing HTTP Nodes

* JSON Editor: [JsonCodeEditor](/en/materials/components/code-editor.md)
* JSON Editor with Variables: [JsonEditorWithVariables](/en/materials/components/json-editor-with-variables.md)

### Implementing Variable Assignment/Declaration Nodes

* Single-line Variable Assignment, Declaration: [AssignRow](/en/materials/components/assign-row.md)
* Variable Assignment, Declaration Configuration List: [AssignRows](/en/materials/components/assign-rows.md)
* Variable Declaration Type Automatic Derivation: [inferAssignPlugin](/en/materials/form-plugins/infer-assign-plugin.md)
