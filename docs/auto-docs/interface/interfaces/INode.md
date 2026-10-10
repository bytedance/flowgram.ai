# Interface: INode\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Table of contents

### Properties

* [children](/auto-docs/interface/interfaces/INode.md#children)
* [data](/auto-docs/interface/interfaces/INode.md#data)
* [declare](/auto-docs/interface/interfaces/INode.md#declare)
* [edges](/auto-docs/interface/interfaces/INode.md#edges)
* [id](/auto-docs/interface/interfaces/INode.md#id)
* [isBranch](/auto-docs/interface/interfaces/INode.md#isbranch)
* [name](/auto-docs/interface/interfaces/INode.md#name)
* [next](/auto-docs/interface/interfaces/INode.md#next)
* [parent](/auto-docs/interface/interfaces/INode.md#parent)
* [ports](/auto-docs/interface/interfaces/INode.md#ports)
* [position](/auto-docs/interface/interfaces/INode.md#position)
* [predecessors](/auto-docs/interface/interfaces/INode.md#predecessors)
* [prev](/auto-docs/interface/interfaces/INode.md#prev)
* [successors](/auto-docs/interface/interfaces/INode.md#successors)
* [type](/auto-docs/interface/interfaces/INode.md#type)

## Properties

### children

**children**: [`INode`](/auto-docs/interface/interfaces/INode.md)<`any`>\[]

***

### data

**data**: `T`

***

### declare

**declare**: [`NodeVariable`](/auto-docs/interface/interfaces/NodeVariable.md)

***

### edges

**edges**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `inputs` | [`IEdge`](/auto-docs/interface/interfaces/IEdge.md)\[] |
| `outputs` | [`IEdge`](/auto-docs/interface/interfaces/IEdge.md)\[] |

***

### id

**id**: `string`

***

### isBranch

**isBranch**: `boolean`

***

### name

**name**: `string`

***

### next

**next**: [`INode`](/auto-docs/interface/interfaces/INode.md)<`any`>\[]

***

### parent

**parent**: `null` | [`INode`](/auto-docs/interface/interfaces/INode.md)<`any`>

***

### ports

**ports**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `inputs` | [`IPort`](/auto-docs/interface/interfaces/IPort.md)\[] |
| `outputs` | [`IPort`](/auto-docs/interface/interfaces/IPort.md)\[] |

***

### position

**position**: [`XYSchema`](/auto-docs/interface/interfaces/XYSchema.md)

***

### predecessors

**predecessors**: [`INode`](/auto-docs/interface/interfaces/INode.md)<`any`>\[]

***

### prev

**prev**: [`INode`](/auto-docs/interface/interfaces/INode.md)<`any`>\[]

***

### successors

**successors**: [`INode`](/auto-docs/interface/interfaces/INode.md)<`any`>\[]

***

### type

**type**: [`FlowGramNode`](/auto-docs/interface/enums/FlowGramNode.md)
