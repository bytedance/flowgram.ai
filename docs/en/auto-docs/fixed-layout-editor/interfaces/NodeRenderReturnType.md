# Interface: NodeRenderReturnType

## Table of contents

### Properties

* [activated](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#activated)
* [data](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#data)
* [deleteNode](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#deletenode)
* [dragging](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#dragging)
* [expanded](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#expanded)
* [form](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#form)
* [id](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#id)
* [isBlockIcon](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#isblockicon)
* [isBlockOrderIcon](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#isblockordericon)
* [node](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#node)
* [onMouseEnter](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#onmouseenter)
* [onMouseLeave](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#onmouseleave)
* [readonly](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#readonly)
* [startDrag](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#startdrag)
* [type](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#type)
* [updateData](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#updatedata)

### Methods

* [getExtInfo](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#getextinfo)
* [toggleExpand](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#toggleexpand)
* [updateExtInfo](/en/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.md#updateextinfo)

## Properties

### activated

**activated**: `boolean`

节点是否激活

***

### data

**data**: `any`

节点 data 数据

***

### deleteNode

**deleteNode**: () => `void`

#### Type declaration

(): `void`

删除节点

##### Returns

`void`

***

### dragging

**dragging**: `boolean`

是否在拖拽中

***

### expanded

**expanded**: `boolean`

节点是否展开

***

### form

**form**: `undefined` | [`NodeFormProps`](/en/auto-docs/fixed-layout-editor/interfaces/NodeFormProps.md)<`any`>

渲染表单，只有节点引擎开启才能使用

***

### id

**id**: `string`

***

### isBlockIcon

**isBlockIcon**: `boolean`

BlockIcon 节点，一般用于带有分支的占位节点

***

### isBlockOrderIcon

**isBlockOrderIcon**: `boolean`

BlockOrderIcon节点，一般用于分支的第一个占位节点

***

### node

**node**: [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

当前节点 (如果是 icon 则会返回它的父节点)

***

### onMouseEnter

**onMouseEnter**: (`e`: `MouseEvent`<`Element`, `MouseEvent`>) => `void`

#### Type declaration

(`e`): `void`

鼠标进入, 主要用于控制 activated 状态

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent`<`Element`, `MouseEvent`> |

##### Returns

`void`

***

### onMouseLeave

**onMouseLeave**: (`e`: `MouseEvent`<`Element`, `MouseEvent`>) => `void`

#### Type declaration

(`e`): `void`

鼠标离开, 主要用于控制 activated 状态

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent`<`Element`, `MouseEvent`> |

##### Returns

`void`

***

### readonly

**readonly**: `boolean`

全局 readonly 状态

***

### startDrag

**startDrag**: (`e`: `MouseEvent`<`Element`, `MouseEvent`>) => `void`

#### Type declaration

(`e`): `void`

触发拖拽

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent`<`Element`, `MouseEvent`> |

##### Returns

`void`

***

### type

**type**: `string` | `number`

***

### updateData

**updateData**: (`newData`: `any`) => `void`

#### Type declaration

(`newData`): `void`

更新节点 data 数据

##### Parameters

| Name | Type |
| :------ | :------ |
| `newData` | `any` |

##### Returns

`void`

## Methods

### getExtInfo

**getExtInfo**<`T`>(): `T`

获取节点的扩展数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Returns

`T`

***

### toggleExpand

**toggleExpand**(): `void`

展开/收起节点

#### Returns

`void`

***

### updateExtInfo

**updateExtInfo**<`T`>(`extInfo`, `fullUpdate?`): `void`

更新节点的扩展数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `extInfo` | `T` |
| `fullUpdate?` | `boolean` |

#### Returns

`void`
