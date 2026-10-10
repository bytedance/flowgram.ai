# Interface: WorkflowNodeSchema\<T, D>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `string` |
| `D` | `any` |

## Table of contents

### Properties

* [blocks](/auto-docs/interface/interfaces/WorkflowNodeSchema.md#blocks)
* [data](/auto-docs/interface/interfaces/WorkflowNodeSchema.md#data)
* [edges](/auto-docs/interface/interfaces/WorkflowNodeSchema.md#edges)
* [id](/auto-docs/interface/interfaces/WorkflowNodeSchema.md#id)
* [meta](/auto-docs/interface/interfaces/WorkflowNodeSchema.md#meta)
* [type](/auto-docs/interface/interfaces/WorkflowNodeSchema.md#type)

## Properties

### blocks

`Optional` **blocks**: [`WorkflowNodeSchema`](/auto-docs/interface/interfaces/WorkflowNodeSchema.md)<`string`, `any`>\[]

***

### data

**data**: `D` & { `[key: string]`: `any`; `inputs?`: [`IJsonSchema`](/auto-docs/interface/interfaces/IJsonSchema.md)<`string`> ; `inputsValues?`: `Record`<`string`, [`IFlowValue`](/auto-docs/interface/types/IFlowValue.md)> ; `outputs?`: [`IJsonSchema`](/auto-docs/interface/interfaces/IJsonSchema.md)<`string`> ; `title?`: `string`  }

***

### edges

`Optional` **edges**: [`WorkflowEdgeSchema`](/auto-docs/interface/interfaces/WorkflowEdgeSchema.md)\[]

***

### id

**id**: `string`

***

### meta

**meta**: [`WorkflowNodeMetaSchema`](/auto-docs/interface/interfaces/WorkflowNodeMetaSchema.md)

***

### type

**type**: `T`
