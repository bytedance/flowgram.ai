# Class: HistoryService

历史服务

## Implements

* [`IHistoryService`](/auto-docs/free-history-plugin/interfaces/IHistoryService.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/free-history-plugin/classes/HistoryService.md#constructor)

### Properties

* [config](/auto-docs/free-history-plugin/classes/HistoryService.md#config)
* [context](/auto-docs/free-history-plugin/classes/HistoryService.md#context)
* [historyManager](/auto-docs/free-history-plugin/classes/HistoryService.md#historymanager)
* [onMerge](/auto-docs/free-history-plugin/classes/HistoryService.md#onmerge)
* [onWillDispose](/auto-docs/free-history-plugin/classes/HistoryService.md#onwilldispose)
* [operationRegistry](/auto-docs/free-history-plugin/classes/HistoryService.md#operationregistry)
* [operationService](/auto-docs/free-history-plugin/classes/HistoryService.md#operationservice)
* [undoRedoService](/auto-docs/free-history-plugin/classes/HistoryService.md#undoredoservice)

### Accessors

* [onApply](/auto-docs/free-history-plugin/classes/HistoryService.md#onapply)

### Methods

* [canRedo](/auto-docs/free-history-plugin/classes/HistoryService.md#canredo)
* [canUndo](/auto-docs/free-history-plugin/classes/HistoryService.md#canundo)
* [clear](/auto-docs/free-history-plugin/classes/HistoryService.md#clear)
* [dispose](/auto-docs/free-history-plugin/classes/HistoryService.md#dispose)
* [endTransaction](/auto-docs/free-history-plugin/classes/HistoryService.md#endtransaction)
* [getHistoryOperations](/auto-docs/free-history-plugin/classes/HistoryService.md#gethistoryoperations)
* [getRecords](/auto-docs/free-history-plugin/classes/HistoryService.md#getrecords)
* [getSnapshot](/auto-docs/free-history-plugin/classes/HistoryService.md#getsnapshot)
* [init](/auto-docs/free-history-plugin/classes/HistoryService.md#init)
* [limit](/auto-docs/free-history-plugin/classes/HistoryService.md#limit)
* [pushOperation](/auto-docs/free-history-plugin/classes/HistoryService.md#pushoperation)
* [redo](/auto-docs/free-history-plugin/classes/HistoryService.md#redo)
* [restore](/auto-docs/free-history-plugin/classes/HistoryService.md#restore)
* [start](/auto-docs/free-history-plugin/classes/HistoryService.md#start)
* [startTransaction](/auto-docs/free-history-plugin/classes/HistoryService.md#starttransaction)
* [stop](/auto-docs/free-history-plugin/classes/HistoryService.md#stop)
* [transact](/auto-docs/free-history-plugin/classes/HistoryService.md#transact)
* [undo](/auto-docs/free-history-plugin/classes/HistoryService.md#undo)

## Constructors

### constructor

**new HistoryService**()

## Properties

### config

`Readonly` **config**: [`HistoryConfig`](/auto-docs/free-history-plugin/classes/HistoryConfig.md)

***

### context

`Readonly` **context**: [`HistoryContext`](/auto-docs/free-history-plugin/classes/HistoryContext.md)

***

### historyManager

**historyManager**: [`HistoryManager`](/auto-docs/free-history-plugin/classes/HistoryManager.md)

***

### onMerge

**onMerge**: `Event`<[`HistoryMergeEvent`](/auto-docs/free-history-plugin/types/HistoryMergeEvent.md)>

***

### onWillDispose

**onWillDispose**: `Event`<[`HistoryService`](/auto-docs/free-history-plugin/classes/HistoryService.md)>

***

### operationRegistry

`Readonly` **operationRegistry**: [`OperationRegistry`](/auto-docs/free-history-plugin/classes/OperationRegistry.md)

***

### operationService

`Readonly` **operationService**: [`OperationService`](/auto-docs/free-history-plugin/classes/OperationService.md)

***

### undoRedoService

`Readonly` **undoRedoService**: [`UndoRedoService`](/auto-docs/free-history-plugin/classes/UndoRedoService.md)

## Accessors

### onApply

`get` **onApply**(): `Event`<[`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`>>

#### Returns

`Event`<[`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`>>

## Methods

### canRedo

**canRedo**(): `boolean`

是否有可重做的操作

#### Returns

`boolean`

#### Implementation of

[IHistoryService](/auto-docs/free-history-plugin/interfaces/IHistoryService.md).[canRedo](/auto-docs/free-history-plugin/interfaces/IHistoryService.md#canredo)

***

### canUndo

**canUndo**(): `boolean`

是否有可撤销的操作

#### Returns

`boolean`

#### Implementation of

[IHistoryService](/auto-docs/free-history-plugin/interfaces/IHistoryService.md).[canUndo](/auto-docs/free-history-plugin/interfaces/IHistoryService.md#canundo)

***

### clear

**clear**(): `void`

清空undo/redo

#### Returns

`void`

#### Implementation of

[IHistoryService](/auto-docs/free-history-plugin/interfaces/IHistoryService.md).[clear](/auto-docs/free-history-plugin/interfaces/IHistoryService.md#clear)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[IHistoryService](/auto-docs/free-history-plugin/interfaces/IHistoryService.md).[dispose](/auto-docs/free-history-plugin/interfaces/IHistoryService.md#dispose)

***

### endTransaction

**endTransaction**(): `void`

#### Returns

`void`

***

### getHistoryOperations

**getHistoryOperations**(): [`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`>\[]

获取所有历史操作

#### Returns

[`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`>\[]

#### Implementation of

[IHistoryService](/auto-docs/free-history-plugin/interfaces/IHistoryService.md).[getHistoryOperations](/auto-docs/free-history-plugin/interfaces/IHistoryService.md#gethistoryoperations)

***

### getRecords

**getRecords**(): `Promise`<[`HistoryRecord`](/auto-docs/free-history-plugin/interfaces/HistoryRecord.md)\[]>

获取历史记录

#### Returns

`Promise`<[`HistoryRecord`](/auto-docs/free-history-plugin/interfaces/HistoryRecord.md)\[]>

#### Implementation of

[IHistoryService](/auto-docs/free-history-plugin/interfaces/IHistoryService.md).[getRecords](/auto-docs/free-history-plugin/interfaces/IHistoryService.md#getrecords)

***

### getSnapshot

**getSnapshot**(): `unknown`

返回快照

#### Returns

`unknown`

#### Implementation of

[IHistoryService](/auto-docs/free-history-plugin/interfaces/IHistoryService.md).[getSnapshot](/auto-docs/free-history-plugin/interfaces/IHistoryService.md#getsnapshot)

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

[IHistoryService](/auto-docs/free-history-plugin/interfaces/IHistoryService.md).[limit](/auto-docs/free-history-plugin/interfaces/IHistoryService.md#limit)

***

### pushOperation

**pushOperation**(`operation`, `options?`): `any`

添加操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`> | 操作 |
| `options?` | [`PushOperationOptions`](/auto-docs/free-history-plugin/interfaces/PushOperationOptions.md) | - |

#### Returns

`any`

#### Implementation of

[IHistoryService](/auto-docs/free-history-plugin/interfaces/IHistoryService.md).[pushOperation](/auto-docs/free-history-plugin/interfaces/IHistoryService.md#pushoperation)

***

### redo

**redo**(): `Promise`<`void`>

重做

#### Returns

`Promise`<`void`>

#### Implementation of

[IHistoryService](/auto-docs/free-history-plugin/interfaces/IHistoryService.md).[redo](/auto-docs/free-history-plugin/interfaces/IHistoryService.md#redo)

***

### restore

**restore**(`historyRecord`): `Promise`<`void`>

根据历史版本重新存储历史记录

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `historyRecord` | [`HistoryRecord`](/auto-docs/free-history-plugin/interfaces/HistoryRecord.md) | 历史记录 |

#### Returns

`Promise`<`void`>

#### Implementation of

[IHistoryService](/auto-docs/free-history-plugin/interfaces/IHistoryService.md).[restore](/auto-docs/free-history-plugin/interfaces/IHistoryService.md#restore)

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

[IHistoryService](/auto-docs/free-history-plugin/interfaces/IHistoryService.md).[undo](/auto-docs/free-history-plugin/interfaces/IHistoryService.md#undo)
