# Interface: IHistoryService

历史服务

## Hierarchy

* [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

  ↳ **`IHistoryService`**

## Implemented by

* [`HistoryService`](/auto-docs/fixed-layout-editor/classes/HistoryService.md)

## Table of contents

### Methods

* [canRedo](/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#canredo)
* [canUndo](/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#canundo)
* [clear](/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#clear)
* [dispose](/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#dispose)
* [getHistoryOperations](/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#gethistoryoperations)
* [getRecords](/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#getrecords)
* [getSnapshot](/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#getsnapshot)
* [limit](/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#limit)
* [pushOperation](/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#pushoperation)
* [redo](/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#redo)
* [restore](/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#restore)
* [undo](/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md#undo)

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

[Disposable](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md).[dispose](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md#dispose)

***

### getHistoryOperations

**getHistoryOperations**(): [`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>\[]

获取所有历史操作

#### Returns

[`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>\[]

***

### getRecords

**getRecords**(): `Promise`<[`HistoryRecord`](/auto-docs/fixed-layout-editor/interfaces/HistoryRecord.md)\[]>

获取历史记录

#### Returns

`Promise`<[`HistoryRecord`](/auto-docs/fixed-layout-editor/interfaces/HistoryRecord.md)\[]>

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
| `operation` | [`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`> | 操作 |

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
| `historyRecord` | [`HistoryRecord`](/auto-docs/fixed-layout-editor/interfaces/HistoryRecord.md) | 历史记录 |

#### Returns

`Promise`<`void`>

***

### undo

**undo**(): `void` | `Promise`<`void`>

撤回

#### Returns

`void` | `Promise`<`void`>
