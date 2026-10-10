# Class: HistoryService

历史服务

## Implements

* [`IHistoryService`](/en/auto-docs/history/interfaces/IHistoryService.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/history/classes/HistoryService.md#constructor)

### Properties

* [config](/en/auto-docs/history/classes/HistoryService.md#config)
* [context](/en/auto-docs/history/classes/HistoryService.md#context)
* [historyManager](/en/auto-docs/history/classes/HistoryService.md#historymanager)
* [onMerge](/en/auto-docs/history/classes/HistoryService.md#onmerge)
* [onWillDispose](/en/auto-docs/history/classes/HistoryService.md#onwilldispose)
* [operationRegistry](/en/auto-docs/history/classes/HistoryService.md#operationregistry)
* [operationService](/en/auto-docs/history/classes/HistoryService.md#operationservice)
* [undoRedoService](/en/auto-docs/history/classes/HistoryService.md#undoredoservice)

### Accessors

* [onApply](/en/auto-docs/history/classes/HistoryService.md#onapply)

### Methods

* [canRedo](/en/auto-docs/history/classes/HistoryService.md#canredo)
* [canUndo](/en/auto-docs/history/classes/HistoryService.md#canundo)
* [clear](/en/auto-docs/history/classes/HistoryService.md#clear)
* [dispose](/en/auto-docs/history/classes/HistoryService.md#dispose)
* [endTransaction](/en/auto-docs/history/classes/HistoryService.md#endtransaction)
* [getHistoryOperations](/en/auto-docs/history/classes/HistoryService.md#gethistoryoperations)
* [getRecords](/en/auto-docs/history/classes/HistoryService.md#getrecords)
* [getSnapshot](/en/auto-docs/history/classes/HistoryService.md#getsnapshot)
* [init](/en/auto-docs/history/classes/HistoryService.md#init)
* [limit](/en/auto-docs/history/classes/HistoryService.md#limit)
* [pushOperation](/en/auto-docs/history/classes/HistoryService.md#pushoperation)
* [redo](/en/auto-docs/history/classes/HistoryService.md#redo)
* [restore](/en/auto-docs/history/classes/HistoryService.md#restore)
* [start](/en/auto-docs/history/classes/HistoryService.md#start)
* [startTransaction](/en/auto-docs/history/classes/HistoryService.md#starttransaction)
* [stop](/en/auto-docs/history/classes/HistoryService.md#stop)
* [transact](/en/auto-docs/history/classes/HistoryService.md#transact)
* [undo](/en/auto-docs/history/classes/HistoryService.md#undo)

## Constructors

### constructor

**new HistoryService**()

## Properties

### config

`Readonly` **config**: [`HistoryConfig`](/en/auto-docs/history/classes/HistoryConfig.md)

***

### context

`Readonly` **context**: [`HistoryContext`](/en/auto-docs/history/classes/HistoryContext.md)

***

### historyManager

**historyManager**: [`HistoryManager`](/en/auto-docs/history/classes/HistoryManager.md)

***

### onMerge

**onMerge**: `Event`<[`HistoryMergeEvent`](/en/auto-docs/history/types/HistoryMergeEvent.md)>

***

### onWillDispose

**onWillDispose**: `Event`<[`HistoryService`](/en/auto-docs/history/classes/HistoryService.md)>

***

### operationRegistry

`Readonly` **operationRegistry**: [`OperationRegistry`](/en/auto-docs/history/classes/OperationRegistry.md)

***

### operationService

`Readonly` **operationService**: [`OperationService`](/en/auto-docs/history/classes/OperationService.md)

***

### undoRedoService

`Readonly` **undoRedoService**: [`UndoRedoService`](/en/auto-docs/history/classes/UndoRedoService.md)

## Accessors

### onApply

`get` **onApply**(): `Event`<[`Operation`](/en/auto-docs/history/interfaces/Operation.md)<`unknown`>>

#### Returns

`Event`<[`Operation`](/en/auto-docs/history/interfaces/Operation.md)<`unknown`>>

## Methods

### canRedo

**canRedo**(): `boolean`

是否有可重做的操作

#### Returns

`boolean`

#### Implementation of

[IHistoryService](/en/auto-docs/history/interfaces/IHistoryService.md).[canRedo](/en/auto-docs/history/interfaces/IHistoryService.md#canredo)

***

### canUndo

**canUndo**(): `boolean`

是否有可撤销的操作

#### Returns

`boolean`

#### Implementation of

[IHistoryService](/en/auto-docs/history/interfaces/IHistoryService.md).[canUndo](/en/auto-docs/history/interfaces/IHistoryService.md#canundo)

***

### clear

**clear**(): `void`

清空undo/redo

#### Returns

`void`

#### Implementation of

[IHistoryService](/en/auto-docs/history/interfaces/IHistoryService.md).[clear](/en/auto-docs/history/interfaces/IHistoryService.md#clear)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[IHistoryService](/en/auto-docs/history/interfaces/IHistoryService.md).[dispose](/en/auto-docs/history/interfaces/IHistoryService.md#dispose)

***

### endTransaction

**endTransaction**(): `void`

#### Returns

`void`

***

### getHistoryOperations

**getHistoryOperations**(): [`Operation`](/en/auto-docs/history/interfaces/Operation.md)<`unknown`>\[]

获取所有历史操作

#### Returns

[`Operation`](/en/auto-docs/history/interfaces/Operation.md)<`unknown`>\[]

#### Implementation of

[IHistoryService](/en/auto-docs/history/interfaces/IHistoryService.md).[getHistoryOperations](/en/auto-docs/history/interfaces/IHistoryService.md#gethistoryoperations)

***

### getRecords

**getRecords**(): `Promise`<[`HistoryRecord`](/en/auto-docs/history/interfaces/HistoryRecord.md)\[]>

获取历史记录

#### Returns

`Promise`<[`HistoryRecord`](/en/auto-docs/history/interfaces/HistoryRecord.md)\[]>

#### Implementation of

[IHistoryService](/en/auto-docs/history/interfaces/IHistoryService.md).[getRecords](/en/auto-docs/history/interfaces/IHistoryService.md#getrecords)

***

### getSnapshot

**getSnapshot**(): `unknown`

返回快照

#### Returns

`unknown`

#### Implementation of

[IHistoryService](/en/auto-docs/history/interfaces/IHistoryService.md).[getSnapshot](/en/auto-docs/history/interfaces/IHistoryService.md#getsnapshot)

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

[IHistoryService](/en/auto-docs/history/interfaces/IHistoryService.md).[limit](/en/auto-docs/history/interfaces/IHistoryService.md#limit)

***

### pushOperation

**pushOperation**(`operation`, `options?`): `any`

添加操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`Operation`](/en/auto-docs/history/interfaces/Operation.md)<`unknown`> | 操作 |
| `options?` | [`PushOperationOptions`](/en/auto-docs/history/interfaces/PushOperationOptions.md) | - |

#### Returns

`any`

#### Implementation of

[IHistoryService](/en/auto-docs/history/interfaces/IHistoryService.md).[pushOperation](/en/auto-docs/history/interfaces/IHistoryService.md#pushoperation)

***

### redo

**redo**(): `Promise`<`void`>

重做

#### Returns

`Promise`<`void`>

#### Implementation of

[IHistoryService](/en/auto-docs/history/interfaces/IHistoryService.md).[redo](/en/auto-docs/history/interfaces/IHistoryService.md#redo)

***

### restore

**restore**(`historyRecord`): `Promise`<`void`>

根据历史版本重新存储历史记录

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `historyRecord` | [`HistoryRecord`](/en/auto-docs/history/interfaces/HistoryRecord.md) | 历史记录 |

#### Returns

`Promise`<`void`>

#### Implementation of

[IHistoryService](/en/auto-docs/history/interfaces/IHistoryService.md).[restore](/en/auto-docs/history/interfaces/IHistoryService.md#restore)

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

[IHistoryService](/en/auto-docs/history/interfaces/IHistoryService.md).[undo](/en/auto-docs/history/interfaces/IHistoryService.md#undo)
