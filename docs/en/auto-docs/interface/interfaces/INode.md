# Interface: INode\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Table of contents

### Properties

* [children](/en/auto-docs/interface/interfaces/INode.md#children)
* [data](/en/auto-docs/interface/interfaces/INode.md#data)
* [declare](/en/auto-docs/interface/interfaces/INode.md#declare)
* [edges](/en/auto-docs/interface/interfaces/INode.md#edges)
* [id](/en/auto-docs/interface/interfaces/INode.md#id)
* [isBranch](/en/auto-docs/interface/interfaces/INode.md#isbranch)
* [name](/en/auto-docs/interface/interfaces/INode.md#name)
* [next](/en/auto-docs/interface/interfaces/INode.md#next)
* [parent](/en/auto-docs/interface/interfaces/INode.md#parent)
* [ports](/en/auto-docs/interface/interfaces/INode.md#ports)
* [position](/en/auto-docs/interface/interfaces/INode.md#position)
* [predecessors](/en/auto-docs/interface/interfaces/INode.md#predecessors)
* [prev](/en/auto-docs/interface/interfaces/INode.md#prev)
* [successors](/en/auto-docs/interface/interfaces/INode.md#successors)
* [type](/en/auto-docs/interface/interfaces/INode.md#type)

## Properties

### children

**children**: [`INode`](/en/auto-docs/interface/interfaces/INode.md)<`any`>\[]

***

### data

**data**: `T`

***

### declare

**declare**: [`NodeVariable`](/en/auto-docs/interface/interfaces/NodeVariable.md)

***

### edges

**edges**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `inputs` | [`IEdge`](/en/auto-docs/interface/interfaces/IEdge.md)\[] |
| `outputs` | [`IEdge`](/en/auto-docs/interface/interfaces/IEdge.md)\[] |

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

**next**: [`INode`](/en/auto-docs/interface/interfaces/INode.md)<`any`>\[]

***

### parent

**parent**: `null` | [`INode`](/en/auto-docs/interface/interfaces/INode.md)<`any`>

***

### ports

**ports**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `inputs` | [`IPort`](/en/auto-docs/interface/interfaces/IPort.md)\[] |
| `outputs` | [`IPort`](/en/auto-docs/interface/interfaces/IPort.md)\[] |

***

### position

**position**: [`XYSchema`](/en/auto-docs/interface/interfaces/XYSchema.md)

***

### predecessors

**predecessors**: [`INode`](/en/auto-docs/interface/interfaces/INode.md)<`any`>\[]

***

### prev

**prev**: [`INode`](/en/auto-docs/interface/interfaces/INode.md)<`any`>\[]

***

### successors

**successors**: [`INode`](/en/auto-docs/interface/interfaces/INode.md)<`any`>\[]

***

### type

**type**: [`FlowGramNode`](/en/auto-docs/interface/enums/FlowGramNode.md)
