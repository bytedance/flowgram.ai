# Interface: NodeRenderReturnType

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Properties

* [activated](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#activated)
* [data](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#data)
* [deleteNode](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#deletenode)
* [expanded](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#expanded)
* [form](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#form)
* [id](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#id)
* [linkingNodeId](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#linkingnodeid)
* [node](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#node)
* [nodeRef](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#noderef)
* [onBlur](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#onblur)
* [onFocus](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#onfocus)
* [ports](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#ports)
* [readonly](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#readonly)
* [selectNode](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#selectnode)
* [selected](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#selected)
* [startDrag](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#startdrag)
* [type](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#type)
* [updateData](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#updatedata)

### Methods

* [getExtInfo](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#getextinfo)
* [toggleExpand](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#toggleexpand)
* [updateExtInfo](/auto-docs/free-layout-editor/interfaces/NodeRenderReturnType.md#updateextinfo)

## Properties

### activated

**activated**: `boolean`

节点激活

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

### expanded

**expanded**: `boolean`

节点展开

***

### form

**form**: `undefined` | [`NodeFormProps`](/auto-docs/free-layout-editor/interfaces/NodeFormProps.md)<`any`>

渲染表单，只有节点引擎开启才能使用

***

### id

**id**: `string`

***

### linkingNodeId

**linkingNodeId**: `string`

拖拽线条的目标 node id

***

### node

**node**: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

当前节点

***

### nodeRef

**nodeRef**: `MutableRefObject`<`null` | `HTMLDivElement`>

节点 ref

***

### onBlur

**onBlur**: () => `void`

#### Type declaration

(): `void`

节点 blur 事件

##### Returns

`void`

***

### onFocus

**onFocus**: () => `void`

#### Type declaration

(): `void`

节点 focus 事件

##### Returns

`void`

***

### ports

**ports**: [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)\[]

当前节点的点位信息

***

### readonly

**readonly**: `boolean`

全局 readonly 状态

***

### selectNode

**selectNode**: (`e`: `MouseEvent`<`Element`, `MouseEvent`>) => `void`

#### Type declaration

(`e`): `void`

选中节点

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent`<`Element`, `MouseEvent`> |

##### Returns

`void`

***

### selected

**selected**: `boolean`

节点选中

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
