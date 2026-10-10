# Class: HistoryService

历史服务

## Implements

* [`IHistoryService`](/auto-docs/history/interfaces/IHistoryService.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/history/classes/HistoryService.md#constructor)

### Properties

* [config](/auto-docs/history/classes/HistoryService.md#config)
* [context](/auto-docs/history/classes/HistoryService.md#context)
* [historyManager](/auto-docs/history/classes/HistoryService.md#historymanager)
* [onMerge](/auto-docs/history/classes/HistoryService.md#onmerge)
* [onWillDispose](/auto-docs/history/classes/HistoryService.md#onwilldispose)
* [operationRegistry](/auto-docs/history/classes/HistoryService.md#operationregistry)
* [operationService](/auto-docs/history/classes/HistoryService.md#operationservice)
* [undoRedoService](/auto-docs/history/classes/HistoryService.md#undoredoservice)

### Accessors

* [onApply](/auto-docs/history/classes/HistoryService.md#onapply)

### Methods

* [canRedo](/auto-docs/history/classes/HistoryService.md#canredo)
* [canUndo](/auto-docs/history/classes/HistoryService.md#canundo)
* [clear](/auto-docs/history/classes/HistoryService.md#clear)
* [dispose](/auto-docs/history/classes/HistoryService.md#dispose)
* [endTransaction](/auto-docs/history/classes/HistoryService.md#endtransaction)
* [getHistoryOperations](/auto-docs/history/classes/HistoryService.md#gethistoryoperations)
* [getRecords](/auto-docs/history/classes/HistoryService.md#getrecords)
* [getSnapshot](/auto-docs/history/classes/HistoryService.md#getsnapshot)
* [init](/auto-docs/history/classes/HistoryService.md#init)
* [limit](/auto-docs/history/classes/HistoryService.md#limit)
* [pushOperation](/auto-docs/history/classes/HistoryService.md#pushoperation)
* [redo](/auto-docs/history/classes/HistoryService.md#redo)
* [restore](/auto-docs/history/classes/HistoryService.md#restore)
* [start](/auto-docs/history/classes/HistoryService.md#start)
* [startTransaction](/auto-docs/history/classes/HistoryService.md#starttransaction)
* [stop](/auto-docs/history/classes/HistoryService.md#stop)
* [transact](/auto-docs/history/classes/HistoryService.md#transact)
* [undo](/auto-docs/history/classes/HistoryService.md#undo)

## Constructors

### constructor

**new HistoryService**()

## Properties

### config

`Readonly` **config**: [`HistoryConfig`](/auto-docs/history/classes/HistoryConfig.md)

***

### context

`Readonly` **context**: [`HistoryContext`](/auto-docs/history/classes/HistoryContext.md)

***

### historyManager

**historyManager**: [`HistoryManager`](/auto-docs/history/classes/HistoryManager.md)

***

### onMerge

**onMerge**: `Event`<[`HistoryMergeEvent`](/auto-docs/history/types/HistoryMergeEvent.md)>

***

### onWillDispose

**onWillDispose**: `Event`<[`HistoryService`](/auto-docs/history/classes/HistoryService.md)>

***

### operationRegistry

`Readonly` **operationRegistry**: [`OperationRegistry`](/auto-docs/history/classes/OperationRegistry.md)

***

### operationService

`Readonly` **operationService**: [`OperationService`](/auto-docs/history/classes/OperationService.md)

***

### undoRedoService

`Readonly` **undoRedoService**: [`UndoRedoService`](/auto-docs/history/classes/UndoRedoService.md)

## Accessors

### onApply

`get` **onApply**(): `Event`<[`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>>

#### Returns

`Event`<[`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>>

## Methods

### canRedo

**canRedo**(): `boolean`

是否有可重做的操作

#### Returns

`boolean`

#### Implementation of

[IHistoryService](/auto-docs/history/interfaces/IHistoryService.md).[canRedo](/auto-docs/history/interfaces/IHistoryService.md#canredo)

***

### canUndo

**canUndo**(): `boolean`

是否有可撤销的操作

#### Returns

`boolean`

#### Implementation of

[IHistoryService](/auto-docs/history/interfaces/IHistoryService.md).[canUndo](/auto-docs/history/interfaces/IHistoryService.md#canundo)

***

### clear

**clear**(): `void`

清空undo/redo

#### Returns

`void`

#### Implementation of

[IHistoryService](/auto-docs/history/interfaces/IHistoryService.md).[clear](/auto-docs/history/interfaces/IHistoryService.md#clear)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[IHistoryService](/auto-docs/history/interfaces/IHistoryService.md).[dispose](/auto-docs/history/interfaces/IHistoryService.md#dispose)

***

### endTransaction

**endTransaction**(): `void`

#### Returns

`void`

***

### getHistoryOperations

**getHistoryOperations**(): [`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>\[]

获取所有历史操作

#### Returns

[`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>\[]

#### Implementation of

[IHistoryService](/auto-docs/history/interfaces/IHistoryService.md).[getHistoryOperations](/auto-docs/history/interfaces/IHistoryService.md#gethistoryoperations)

***

### getRecords

**getRecords**(): `Promise`<[`HistoryRecord`](/auto-docs/history/interfaces/HistoryRecord.md)\[]>

获取历史记录

#### Returns

`Promise`<[`HistoryRecord`](/auto-docs/history/interfaces/HistoryRecord.md)\[]>

#### Implementation of

[IHistoryService](/auto-docs/history/interfaces/IHistoryService.md).[getRecords](/auto-docs/history/interfaces/IHistoryService.md#getrecords)

***

### getSnapshot

**getSnapshot**(): `unknown`

返回快照

#### Returns

`unknown`

#### Implementation of

[IHistoryService](/auto-docs/history/interfaces/IHistoryService.md).[getSnapshot](/auto-docs/history/interfaces/IHistoryService.md#getsnapshot)

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

[IHistoryService](/auto-docs/history/interfaces/IHistoryService.md).[limit](/auto-docs/history/interfaces/IHistoryService.md#limit)

***

### pushOperation

**pushOperation**(`operation`, `options?`): `any`

添加操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`> | 操作 |
| `options?` | [`PushOperationOptions`](/auto-docs/history/interfaces/PushOperationOptions.md) | - |

#### Returns

`any`

#### Implementation of

[IHistoryService](/auto-docs/history/interfaces/IHistoryService.md).[pushOperation](/auto-docs/history/interfaces/IHistoryService.md#pushoperation)

***

### redo

**redo**(): `Promise`<`void`>

重做

#### Returns

`Promise`<`void`>

#### Implementation of

[IHistoryService](/auto-docs/history/interfaces/IHistoryService.md).[redo](/auto-docs/history/interfaces/IHistoryService.md#redo)

***

### restore

**restore**(`historyRecord`): `Promise`<`void`>

根据历史版本重新存储历史记录

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `historyRecord` | [`HistoryRecord`](/auto-docs/history/interfaces/HistoryRecord.md) | 历史记录 |

#### Returns

`Promise`<`void`>

#### Implementation of

[IHistoryService](/auto-docs/history/interfaces/IHistoryService.md).[restore](/auto-docs/history/interfaces/IHistoryService.md#restore)

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

[IHistoryService](/auto-docs/history/interfaces/IHistoryService.md).[undo](/auto-docs/history/interfaces/IHistoryService.md#undo)
