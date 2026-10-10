# Interface: LayoutNode

## Table of contents

### Properties

* [entity](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#entity)
* [followTo](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#followto)
* [followedBy](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#followedby)
* [id](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#id)
* [index](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#index)
* [layoutEdges](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#layoutedges)
* [layoutNodes](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#layoutnodes)
* [offset](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#offset)
* [order](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#order)
* [padding](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#padding)
* [position](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#position)
* [rank](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#rank)
* [size](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md#size)

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

**layoutEdges**: [`LayoutEdge`](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutEdge.md)\[]

子线条

***

### layoutNodes

**layoutNodes**: [`LayoutNode`](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md)\[]

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
