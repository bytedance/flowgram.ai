# Class: FixedHistoryService

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Implements

* [`IHistoryDocument`](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#constructor)

### Properties

* [config](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#config)
* [document](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#document)
* [fixedHistoryOperationService](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#fixedhistoryoperationservice)
* [historyService](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#historyservice)
* [operationRegistry](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#operationregistry)

### Methods

* [addBlock](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#addblock)
* [addChildNode](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#addchildnode)
* [addFromNode](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#addfromnode)
* [addFromNodes](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#addfromnodes)
* [canRedo](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#canredo)
* [canUndo](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#canundo)
* [deleteNode](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#deletenode)
* [deleteNodes](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#deletenodes)
* [getHistoryOperations](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#gethistoryoperations)
* [moveNode](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#movenode)
* [pushHistoryOperation](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#pushhistoryoperation)
* [redo](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#redo)
* [registerOperationMetas](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#registeroperationmetas)
* [setSource](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#setsource)
* [transact](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#transact)
* [undo](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md#undo)

## Constructors

### constructor

**new FixedHistoryService**()

## Properties

### config

**config**: [`FixedHistoryConfig`](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryConfig.md)

***

### document

**document**: [`FlowDocument`](/en/auto-docs/fixed-layout-editor/classes/FlowDocument.md)<[`FlowDocumentJSON`](/en/auto-docs/fixed-layout-editor/types/FlowDocumentJSON.md)>

***

### fixedHistoryOperationService

**fixedHistoryOperationService**: [`FixedHistoryOperationService`](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md)

***

### historyService

**historyService**: [`HistoryService`](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md)

***

### operationRegistry

**operationRegistry**: [`OperationRegistry`](/en/auto-docs/fixed-layout-editor/classes/OperationRegistry.md)

## Methods

### addBlock

**addBlock**(`target`, `blockData`, `parent?`, `index?`): [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

添加块级元素

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) | 目标 |
| `blockData` | [`FlowNodeJSON`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) | 块数据 |
| `parent?` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) | 父级 |
| `index?` | `number` | - |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

**`Deprecated`**

请使用 `FlowOperationService.addBlock` 代替

#### Implementation of

[IHistoryDocument](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md).[addBlock](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md#addblock)

***

### addChildNode

**addChildNode**(`data`, `parent?`, `index?`, `originParent?`): `any`

添加子节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`FlowNodeJSON`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) |
| `parent?` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `index?` | `number` |
| `originParent?` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`any`

**`Deprecated`**

请使用 `FlowOperationService.addNode` 代替

***

### addFromNode

**addFromNode**(`fromNode`, `json`): [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

添加节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | `string` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `json` | [`FlowNodeJSON`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

**`Deprecated`**

请使用 `FlowOperationService.addFromNode` 代替

#### Implementation of

[IHistoryDocument](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md).[addFromNode](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md#addfromnode)

***

### addFromNodes

**addFromNodes**(`from`, `nodes`): `any`

批量添加

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `nodes` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)\[] |

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
| `node` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) | 节点 |

#### Returns

`void`

**`Deprecated`**

请使用 `FlowOperationService.deleteNode` 代替

#### Implementation of

[IHistoryDocument](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md).[deleteNode](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md#deletenode)

***

### deleteNodes

**deleteNodes**(`nodes`): `void`

批量删除

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`void`

**`Deprecated`**

请使用 `FlowOperationService.deleteNodes` 代替

***

### getHistoryOperations

**getHistoryOperations**(): [`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>\[]

获取历史操作

#### Returns

[`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>\[]

***

### moveNode

**moveNode**(`node`, `toNode`): `any`

移动节点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) | 被移动的节点 |
| `toNode` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) | 被放置的节点 |

#### Returns

`any`

***

### pushHistoryOperation

**pushHistoryOperation**(`operation`): `any`

添加一个操作

#### Parameters

| Name | Type |
| :------ | :------ |
| `operation` | [`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`> |

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
| `operationMetas` | [`OperationMeta`](/en/auto-docs/fixed-layout-editor/interfaces/OperationMeta.md)<`any`, `any`, `any`>\[] |

#### Returns

`void`

***

### setSource

**setSource**(`source`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`PluginContext`](/en/auto-docs/fixed-layout-editor/variables/PluginContext-1.md) |

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
