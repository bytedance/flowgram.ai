# Interface: LayoutNode

## Table of contents

### Properties

* [entity](/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#entity)
* [followTo](/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#followto)
* [followedBy](/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#followedby)
* [id](/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#id)
* [index](/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#index)
* [layoutEdges](/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#layoutedges)
* [layoutNodes](/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#layoutnodes)
* [offset](/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#offset)
* [order](/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#order)
* [padding](/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#padding)
* [position](/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#position)
* [rank](/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#rank)
* [size](/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#size)

## Properties

### entity

**entity**: `FlowNodeEntity`

节点实体

***

### followTo

`Optional` **followTo**: `string`

跟随节点

***

### followedBy

`Optional` **followedBy**: `string`\[]

被跟随节点

***

### id

**id**: `string`

***

### index

**index**: `string`

节点索引

***

### layoutEdges

**layoutEdges**: [`LayoutEdge`](/auto-docs/free-auto-layout-plugin/interfaces/LayoutEdge.md)\[]

子线条

***

### layoutNodes

**layoutNodes**: [`LayoutNode`](/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md)\[]

子节点

***

### offset

**offset**: `Object`

偏移量

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

***

### order

**order**: `number`

顺序

***

### padding

**padding**: `Object`

边距

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bottom` | `number` |
| `left` | `number` |
| `right` | `number` |
| `top` | `number` |

***

### position

**position**: `Object`

位置

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

***

### rank

**rank**: `number`

层级

***

### size

**size**: `LayoutSize`

宽高
