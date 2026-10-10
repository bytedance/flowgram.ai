# Class: HistoryService

历史服务

## Implements

* [`IHistoryService`](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#constructor)

### Properties

* [config](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#config)
* [context](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#context)
* [historyManager](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#historymanager)
* [onMerge](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#onmerge)
* [onWillDispose](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#onwilldispose)
* [operationRegistry](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#operationregistry)
* [operationService](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#operationservice)
* [undoRedoService](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#undoredoservice)

### Accessors

* [onApply](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#onapply)

### Methods

* [canRedo](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#canredo)
* [canUndo](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#canundo)
* [clear](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#clear)
* [dispose](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#dispose)
* [endTransaction](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#endtransaction)
* [getHistoryOperations](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#gethistoryoperations)
* [getRecords](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#getrecords)
* [getSnapshot](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#getsnapshot)
* [init](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#init)
* [limit](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#limit)
* [pushOperation](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#pushoperation)
* [redo](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#redo)
* [restore](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#restore)
* [start](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#start)
* [startTransaction](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#starttransaction)
* [stop](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#stop)
* [transact](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#transact)
* [undo](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md#undo)

## Constructors

### constructor

**new HistoryService**()

## Properties

### config

`Readonly` **config**: [`HistoryConfig`](/en/auto-docs/fixed-layout-editor/classes/HistoryConfig.md)

***

### context

`Readonly` **context**: [`HistoryContext`](/en/auto-docs/fixed-layout-editor/classes/HistoryContext.md)

***

### historyManager

**historyManager**: [`HistoryManager`](/en/auto-docs/fixed-layout-editor/classes/HistoryManager.md)

***

### onMerge

**onMerge**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`HistoryMergeEvent`](/en/auto-docs/fixed-layout-editor/types/HistoryMergeEvent.md)>

***

### onWillDispose

**onWillDispose**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`HistoryService`](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md)>

***

### operationRegistry

`Readonly` **operationRegistry**: [`OperationRegistry`](/en/auto-docs/fixed-layout-editor/classes/OperationRegistry.md)

***

### operationService

`Readonly` **operationService**: [`OperationService`](/en/auto-docs/fixed-layout-editor/classes/OperationService.md)

***

### undoRedoService

`Readonly` **undoRedoService**: [`UndoRedoService`](/en/auto-docs/fixed-layout-editor/classes/UndoRedoService.md)

## Accessors

### onApply

`get` **onApply**(): [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>>

#### Returns

[`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>>

## Methods

### canRedo

**canRedo**(): `boolean`

是否有可重做的操作

#### Returns

`boolean`

#### Implementation of

[IHistoryService](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md).[canRedo](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#canredo)

***

### canUndo

**canUndo**(): `boolean`

是否有可撤销的操作

#### Returns

`boolean`

#### Implementation of

[IHistoryService](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md).[canUndo](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#canundo)

***

### clear

**clear**(): `void`

清空undo/redo

#### Returns

`void`

#### Implementation of

[IHistoryService](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md).[clear](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#clear)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[IHistoryService](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md).[dispose](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#dispose)

***

### endTransaction

**endTransaction**(): `void`

#### Returns

`void`

***

### getHistoryOperations

**getHistoryOperations**(): [`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>\[]

获取所有历史操作

#### Returns

[`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>\[]

#### Implementation of

[IHistoryService](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md).[getHistoryOperations](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#gethistoryoperations)

***

### getRecords

**getRecords**(): `Promise`<[`HistoryRecord`](/en/auto-docs/fixed-layout-editor/interfaces/HistoryRecord.md)\[]>

获取历史记录

#### Returns

`Promise`<[`HistoryRecord`](/en/auto-docs/fixed-layout-editor/interfaces/HistoryRecord.md)\[]>

#### Implementation of

[IHistoryService](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md).[getRecords](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#getrecords)

***

### getSnapshot

**getSnapshot**(): `unknown`

返回快照

#### Returns

`unknown`

#### Implementation of

[IHistoryService](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md).[getSnapshot](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#getsnapshot)

***

### init

**init**(): `void`

#### Returns

`void`

***

### limit

**limit**(`num`): `void`

最大数量限制

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `num` | `number` | 数量 |

#### Returns

`void`

#### Implementation of

[IHistoryService](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md).[limit](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#limit)

***

### pushOperation

**pushOperation**(`operation`, `options?`): `any`

添加操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`> | 操作 |
| `options?` | [`PushOperationOptions`](/en/auto-docs/fixed-layout-editor/interfaces/PushOperationOptions.md) | - |

#### Returns

`any`

#### Implementation of

[IHistoryService](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md).[pushOperation](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#pushoperation)

***

### redo

**redo**(): `Promise`<`void`>

重做

#### Returns

`Promise`<`void`>

#### Implementation of

[IHistoryService](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md).[redo](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#redo)

***

### restore

**restore**(`historyRecord`): `Promise`<`void`>

根据历史版本重新存储历史记录

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `historyRecord` | [`HistoryRecord`](/en/auto-docs/fixed-layout-editor/interfaces/HistoryRecord.md) | 历史记录 |

#### Returns

`Promise`<`void`>

#### Implementation of

[IHistoryService](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md).[restore](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#restore)

***

### start

**start**(): `void`

#### Returns

`void`

***

### startTransaction

**startTransaction**(): `void`

#### Returns

`void`

***

### stop

**stop**(): `void`

#### Returns

`void`

***

### transact

**transact**(`transaction`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | () => `void` |

#### Returns

`void`

***

### undo

**undo**(): `Promise`<`void`>

撤回

#### Returns

`Promise`<`void`>

#### Implementation of

[IHistoryService](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md).[undo](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#undo)
