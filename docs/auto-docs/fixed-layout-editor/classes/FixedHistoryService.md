# Class: FixedHistoryService

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Implements

* [`IHistoryDocument`](/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#constructor)

### Properties

* [config](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#config)
* [document](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#document)
* [fixedHistoryOperationService](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#fixedhistoryoperationservice)
* [historyService](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#historyservice)
* [operationRegistry](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#operationregistry)

### Methods

* [addBlock](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#addblock)
* [addChildNode](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#addchildnode)
* [addFromNode](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#addfromnode)
* [addFromNodes](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#addfromnodes)
* [canRedo](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#canredo)
* [canUndo](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#canundo)
* [deleteNode](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#deletenode)
* [deleteNodes](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#deletenodes)
* [getHistoryOperations](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#gethistoryoperations)
* [moveNode](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#movenode)
* [pushHistoryOperation](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#pushhistoryoperation)
* [redo](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#redo)
* [registerOperationMetas](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#registeroperationmetas)
* [setSource](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#setsource)
* [transact](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#transact)
* [undo](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#undo)

## Constructors

### constructor

**new FixedHistoryService**()

## Properties

### config

**config**: [`FixedHistoryConfig`](/auto-docs/fixed-layout-editor/classes/FixedHistoryConfig.md)

***

### document

**document**: [`FlowDocument`](/auto-docs/fixed-layout-editor/classes/FlowDocument.md)<[`FlowDocumentJSON`](/auto-docs/fixed-layout-editor/types/FlowDocumentJSON.md)>

***

### fixedHistoryOperationService

**fixedHistoryOperationService**: [`FixedHistoryOperationService`](/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md)

***

### historyService

**historyService**: [`HistoryService`](/auto-docs/fixed-layout-editor/classes/HistoryService.md)

***

### operationRegistry

**operationRegistry**: [`OperationRegistry`](/auto-docs/fixed-layout-editor/classes/OperationRegistry.md)

## Methods

### addBlock

**addBlock**(`target`, `blockData`, `parent?`, `index?`): [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

添加块级元素

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) | 目标 |
| `blockData` | [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) | 块数据 |
| `parent?` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) | 父级 |
| `index?` | `number` | - |

#### Returns

[`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

**`Deprecated`**

请使用 `FlowOperationService.addBlock` 代替

#### Implementation of

[IHistoryDocument](/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md).[addBlock](/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md#addblock)

***

### addChildNode

**addChildNode**(`data`, `parent?`, `index?`, `originParent?`): `any`

添加子节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) |
| `parent?` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `index?` | `number` |
| `originParent?` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`any`

**`Deprecated`**

请使用 `FlowOperationService.addNode` 代替

***

### addFromNode

**addFromNode**(`fromNode`, `json`): [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

添加节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | `string` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `json` | [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) |

#### Returns

[`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

**`Deprecated`**

请使用 `FlowOperationService.addFromNode` 代替

#### Implementation of

[IHistoryDocument](/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md).[addFromNode](/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md#addfromnode)

***

### addFromNodes

**addFromNodes**(`from`, `nodes`): `any`

批量添加

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `nodes` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`any`

***

### canRedo

**canRedo**(): `boolean`

是否可重做

#### Returns

`boolean`

***

### canUndo

**canUndo**(): `boolean`

是否可撤销

#### Returns

`boolean`

***

### deleteNode

**deleteNode**(`node`): `void`

删除节点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) | 节点 |

#### Returns

`void`

**`Deprecated`**

请使用 `FlowOperationService.deleteNode` 代替

#### Implementation of

[IHistoryDocument](/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md).[deleteNode](/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md#deletenode)

***

### deleteNodes

**deleteNodes**(`nodes`): `void`

批量删除

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`void`

**`Deprecated`**

请使用 `FlowOperationService.deleteNodes` 代替

***

### getHistoryOperations

**getHistoryOperations**(): [`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>\[]

获取历史操作

#### Returns

[`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>\[]

***

### moveNode

**moveNode**(`node`, `toNode`): `any`

移动节点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) | 被移动的节点 |
| `toNode` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) | 被放置的节点 |

#### Returns

`any`

***

### pushHistoryOperation

**pushHistoryOperation**(`operation`): `any`

添加一个操作

#### Parameters

| Name | Type |
| :------ | :------ |
| `operation` | [`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`> |

#### Returns

`any`

***

### redo

**redo**(): `Promise`<`void`>

重做

#### Returns

`Promise`<`void`>

***

### registerOperationMetas

**registerOperationMetas**(`operationMetas`): `void`

注册操作

#### Parameters

| Name | Type |
| :------ | :------ |
| `operationMetas` | [`OperationMeta`](/auto-docs/fixed-layout-editor/interfaces/OperationMeta.md)<`any`, `any`, `any`>\[] |

#### Returns

`void`

***

### setSource

**setSource**(`source`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`PluginContext`](/auto-docs/fixed-layout-editor/variables/PluginContext-1.md) |

#### Returns

`void`

***

### transact

**transact**(`transaction`): `void`

事务

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | () => `void` |

#### Returns

`void`

***

### undo

**undo**(): `Promise`<`void`>

撤销

#### Returns

`Promise`<`void`>
