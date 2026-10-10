# Interface: WorkflowNodeSchema\<T, D>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `string` |
| `D` | `any` |

## Table of contents

### Properties

* [blocks](/en/auto-docs/interface/interfaces/WorkflowNodeSchema.md#blocks)
* [data](/en/auto-docs/interface/interfaces/WorkflowNodeSchema.md#data)
* [edges](/en/auto-docs/interface/interfaces/WorkflowNodeSchema.md#edges)
* [id](/en/auto-docs/interface/interfaces/WorkflowNodeSchema.md#id)
* [meta](/en/auto-docs/interface/interfaces/WorkflowNodeSchema.md#meta)
* [type](/en/auto-docs/interface/interfaces/WorkflowNodeSchema.md#type)

## Properties

### blocks

`Optional` **blocks**: [`WorkflowNodeSchema`](/en/auto-docs/interface/interfaces/WorkflowNodeSchema.md)<`string`, `any`>\[]

***

### data

**data**: `D` & { `[key: string]`: `any`; `inputs?`: [`IJsonSchema`](/en/auto-docs/interface/interfaces/IJsonSchema.md)<`string`> ; `inputsValues?`: `Record`<`string`, [`IFlowValue`](/en/auto-docs/interface/types/IFlowValue.md)> ; `outputs?`: [`IJsonSchema`](/en/auto-docs/interface/interfaces/IJsonSchema.md)<`string`> ; `title?`: `string`  }

***

### edges

`Optional` **edges**: [`WorkflowEdgeSchema`](/en/auto-docs/interface/interfaces/WorkflowEdgeSchema.md)\[]

***

### id

**id**: `string`

***

### meta

**meta**: [`WorkflowNodeMetaSchema`](/en/auto-docs/interface/interfaces/WorkflowNodeMetaSchema.md)

***

### type

**type**: `T`
