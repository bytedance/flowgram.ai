# Interface: IHistoryService

历史服务

## Hierarchy

* `Disposable`

  ↳ **`IHistoryService`**

## Implemented by

* [`HistoryService`](/en/auto-docs/free-history-plugin/classes/HistoryService.md)

## Table of contents

### Methods

* [canRedo](/en/auto-docs/free-history-plugin/interfaces/IHistoryService.md#canredo)
* [canUndo](/en/auto-docs/free-history-plugin/interfaces/IHistoryService.md#canundo)
* [clear](/en/auto-docs/free-history-plugin/interfaces/IHistoryService.md#clear)
* [dispose](/en/auto-docs/free-history-plugin/interfaces/IHistoryService.md#dispose)
* [getHistoryOperations](/en/auto-docs/free-history-plugin/interfaces/IHistoryService.md#gethistoryoperations)
* [getRecords](/en/auto-docs/free-history-plugin/interfaces/IHistoryService.md#getrecords)
* [getSnapshot](/en/auto-docs/free-history-plugin/interfaces/IHistoryService.md#getsnapshot)
* [limit](/en/auto-docs/free-history-plugin/interfaces/IHistoryService.md#limit)
* [pushOperation](/en/auto-docs/free-history-plugin/interfaces/IHistoryService.md#pushoperation)
* [redo](/en/auto-docs/free-history-plugin/interfaces/IHistoryService.md#redo)
* [restore](/en/auto-docs/free-history-plugin/interfaces/IHistoryService.md#restore)
* [undo](/en/auto-docs/free-history-plugin/interfaces/IHistoryService.md#undo)

## Methods

### canRedo

**canRedo**(): `boolean`

是否有可重做的操作

#### Returns

`boolean`

***

### canUndo

**canUndo**(): `boolean`

是否有可撤销的操作

#### Returns

`boolean`

***

### clear

**clear**(): `void`

清空undo/redo

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

Disposable.dispose

***

### getHistoryOperations

**getHistoryOperations**(): [`Operation`](/en/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`>\[]

获取所有历史操作

#### Returns

[`Operation`](/en/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`>\[]

***

### getRecords

**getRecords**(): `Promise`<[`HistoryRecord`](/en/auto-docs/free-history-plugin/interfaces/HistoryRecord.md)\[]>

获取历史记录

#### Returns

`Promise`<[`HistoryRecord`](/en/auto-docs/free-history-plugin/interfaces/HistoryRecord.md)\[]>

***

### getSnapshot

**getSnapshot**(): `unknown`

返回快照

#### Returns

`unknown`

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

***

### pushOperation

**pushOperation**(`operation`): `void` | `Promise`<`void`>

添加操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`Operation`](/en/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`> | 操作 |

#### Returns

`void` | `Promise`<`void`>

***

### redo

**redo**(): `void` | `Promise`<`void`>

重做

#### Returns

`void` | `Promise`<`void`>

***

### restore

**restore**(`historyRecord`): `Promise`<`void`>

根据历史版本重新存储历史记录

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `historyRecord` | [`HistoryRecord`](/en/auto-docs/free-history-plugin/interfaces/HistoryRecord.md) | 历史记录 |

#### Returns

`Promise`<`void`>

***

### undo

**undo**(): `void` | `Promise`<`void`>

撤回

#### Returns

`void` | `Promise`<`void`>
