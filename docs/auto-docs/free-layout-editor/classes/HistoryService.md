# Class: HistoryService

历史服务

## Implements

* [`IHistoryService`](/auto-docs/free-layout-editor/interfaces/IHistoryService.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/HistoryService.md#constructor)

### Properties

* [config](/auto-docs/free-layout-editor/classes/HistoryService.md#config)
* [context](/auto-docs/free-layout-editor/classes/HistoryService.md#context)
* [historyManager](/auto-docs/free-layout-editor/classes/HistoryService.md#historymanager)
* [onMerge](/auto-docs/free-layout-editor/classes/HistoryService.md#onmerge)
* [onWillDispose](/auto-docs/free-layout-editor/classes/HistoryService.md#onwilldispose)
* [operationRegistry](/auto-docs/free-layout-editor/classes/HistoryService.md#operationregistry)
* [operationService](/auto-docs/free-layout-editor/classes/HistoryService.md#operationservice)
* [undoRedoService](/auto-docs/free-layout-editor/classes/HistoryService.md#undoredoservice)

### Accessors

* [onApply](/auto-docs/free-layout-editor/classes/HistoryService.md#onapply)

### Methods

* [canRedo](/auto-docs/free-layout-editor/classes/HistoryService.md#canredo)
* [canUndo](/auto-docs/free-layout-editor/classes/HistoryService.md#canundo)
* [clear](/auto-docs/free-layout-editor/classes/HistoryService.md#clear)
* [dispose](/auto-docs/free-layout-editor/classes/HistoryService.md#dispose)
* [endTransaction](/auto-docs/free-layout-editor/classes/HistoryService.md#endtransaction)
* [getHistoryOperations](/auto-docs/free-layout-editor/classes/HistoryService.md#gethistoryoperations)
* [getRecords](/auto-docs/free-layout-editor/classes/HistoryService.md#getrecords)
* [getSnapshot](/auto-docs/free-layout-editor/classes/HistoryService.md#getsnapshot)
* [init](/auto-docs/free-layout-editor/classes/HistoryService.md#init)
* [limit](/auto-docs/free-layout-editor/classes/HistoryService.md#limit)
* [pushOperation](/auto-docs/free-layout-editor/classes/HistoryService.md#pushoperation)
* [redo](/auto-docs/free-layout-editor/classes/HistoryService.md#redo)
* [restore](/auto-docs/free-layout-editor/classes/HistoryService.md#restore)
* [start](/auto-docs/free-layout-editor/classes/HistoryService.md#start)
* [startTransaction](/auto-docs/free-layout-editor/classes/HistoryService.md#starttransaction)
* [stop](/auto-docs/free-layout-editor/classes/HistoryService.md#stop)
* [transact](/auto-docs/free-layout-editor/classes/HistoryService.md#transact)
* [undo](/auto-docs/free-layout-editor/classes/HistoryService.md#undo)

## Constructors

### constructor

**new HistoryService**()

## Properties

### config

`Readonly` **config**: [`HistoryConfig`](/auto-docs/free-layout-editor/classes/HistoryConfig.md)

***

### context

`Readonly` **context**: [`HistoryContext`](/auto-docs/free-layout-editor/classes/HistoryContext.md)

***

### historyManager

**historyManager**: [`HistoryManager`](/auto-docs/free-layout-editor/classes/HistoryManager.md)

***

### onMerge

**onMerge**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`HistoryMergeEvent`](/auto-docs/free-layout-editor/types/HistoryMergeEvent.md)>

***

### onWillDispose

**onWillDispose**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`HistoryService`](/auto-docs/free-layout-editor/classes/HistoryService.md)>

***

### operationRegistry

`Readonly` **operationRegistry**: [`OperationRegistry`](/auto-docs/free-layout-editor/classes/OperationRegistry.md)

***

### operationService

`Readonly` **operationService**: [`OperationService`](/auto-docs/free-layout-editor/classes/OperationService.md)

***

### undoRedoService

`Readonly` **undoRedoService**: [`UndoRedoService`](/auto-docs/free-layout-editor/classes/UndoRedoService.md)

## Accessors

### onApply

`get` **onApply**(): [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>>

#### Returns

[`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>>

## Methods

### canRedo

**canRedo**(): `boolean`

是否有可重做的操作

#### Returns

`boolean`

#### Implementation of

[IHistoryService](/auto-docs/free-layout-editor/interfaces/IHistoryService.md).[canRedo](/auto-docs/free-layout-editor/interfaces/IHistoryService.md#canredo)

***

### canUndo

**canUndo**(): `boolean`

是否有可撤销的操作

#### Returns

`boolean`

#### Implementation of

[IHistoryService](/auto-docs/free-layout-editor/interfaces/IHistoryService.md).[canUndo](/auto-docs/free-layout-editor/interfaces/IHistoryService.md#canundo)

***

### clear

**clear**(): `void`

清空undo/redo

#### Returns

`void`

#### Implementation of

[IHistoryService](/auto-docs/free-layout-editor/interfaces/IHistoryService.md).[clear](/auto-docs/free-layout-editor/interfaces/IHistoryService.md#clear)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[IHistoryService](/auto-docs/free-layout-editor/interfaces/IHistoryService.md).[dispose](/auto-docs/free-layout-editor/interfaces/IHistoryService.md#dispose)

***

### endTransaction

**endTransaction**(): `void`

#### Returns

`void`

***

### getHistoryOperations

**getHistoryOperations**(): [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>\[]

获取所有历史操作

#### Returns

[`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>\[]

#### Implementation of

[IHistoryService](/auto-docs/free-layout-editor/interfaces/IHistoryService.md).[getHistoryOperations](/auto-docs/free-layout-editor/interfaces/IHistoryService.md#gethistoryoperations)

***

### getRecords

**getRecords**(): `Promise`<[`HistoryRecord`](/auto-docs/free-layout-editor/interfaces/HistoryRecord.md)\[]>

获取历史记录

#### Returns

`Promise`<[`HistoryRecord`](/auto-docs/free-layout-editor/interfaces/HistoryRecord.md)\[]>

#### Implementation of

[IHistoryService](/auto-docs/free-layout-editor/interfaces/IHistoryService.md).[getRecords](/auto-docs/free-layout-editor/interfaces/IHistoryService.md#getrecords)

***

### getSnapshot

**getSnapshot**(): `unknown`

返回快照

#### Returns

`unknown`

#### Implementation of

[IHistoryService](/auto-docs/free-layout-editor/interfaces/IHistoryService.md).[getSnapshot](/auto-docs/free-layout-editor/interfaces/IHistoryService.md#getsnapshot)

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

[IHistoryService](/auto-docs/free-layout-editor/interfaces/IHistoryService.md).[limit](/auto-docs/free-layout-editor/interfaces/IHistoryService.md#limit)

***

### pushOperation

**pushOperation**(`operation`, `options?`): `any`

添加操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`> | 操作 |
| `options?` | [`PushOperationOptions`](/auto-docs/free-layout-editor/interfaces/PushOperationOptions.md) | - |

#### Returns

`any`

#### Implementation of

[IHistoryService](/auto-docs/free-layout-editor/interfaces/IHistoryService.md).[pushOperation](/auto-docs/free-layout-editor/interfaces/IHistoryService.md#pushoperation)

***

### redo

**redo**(): `Promise`<`void`>

重做

#### Returns

`Promise`<`void`>

#### Implementation of

[IHistoryService](/auto-docs/free-layout-editor/interfaces/IHistoryService.md).[redo](/auto-docs/free-layout-editor/interfaces/IHistoryService.md#redo)

***

### restore

**restore**(`historyRecord`): `Promise`<`void`>

根据历史版本重新存储历史记录

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `historyRecord` | [`HistoryRecord`](/auto-docs/free-layout-editor/interfaces/HistoryRecord.md) | 历史记录 |

#### Returns

`Promise`<`void`>

#### Implementation of

[IHistoryService](/auto-docs/free-layout-editor/interfaces/IHistoryService.md).[restore](/auto-docs/free-layout-editor/interfaces/IHistoryService.md#restore)

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

[IHistoryService](/auto-docs/free-layout-editor/interfaces/IHistoryService.md).[undo](/auto-docs/free-layout-editor/interfaces/IHistoryService.md#undo)
