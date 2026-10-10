# Class: HistoryDatabase

历史数据库

## Hierarchy

* `unknown`

  ↳ **`HistoryDatabase`**

## Table of contents

### Constructors

* [constructor](/auto-docs/history-storage/classes/HistoryDatabase.md#constructor)

### Properties

* [history](/auto-docs/history-storage/classes/HistoryDatabase.md#history)
* [operation](/auto-docs/history-storage/classes/HistoryDatabase.md#operation)
* [resourceStorageLimit](/auto-docs/history-storage/classes/HistoryDatabase.md#resourcestoragelimit)

### Methods

* [addHistoryRecord](/auto-docs/history-storage/classes/HistoryDatabase.md#addhistoryrecord)
* [addOperationRecord](/auto-docs/history-storage/classes/HistoryDatabase.md#addoperationrecord)
* [allHistoryByResourceURI](/auto-docs/history-storage/classes/HistoryDatabase.md#allhistorybyresourceuri)
* [allOperationByResourceURI](/auto-docs/history-storage/classes/HistoryDatabase.md#alloperationbyresourceuri)
* [getHistoryByUUID](/auto-docs/history-storage/classes/HistoryDatabase.md#gethistorybyuuid)
* [reset](/auto-docs/history-storage/classes/HistoryDatabase.md#reset)
* [resetByResourceURI](/auto-docs/history-storage/classes/HistoryDatabase.md#resetbyresourceuri)
* [updateHistoryByUUID](/auto-docs/history-storage/classes/HistoryDatabase.md#updatehistorybyuuid)
* [updateOperationRecord](/auto-docs/history-storage/classes/HistoryDatabase.md#updateoperationrecord)

## Constructors

### constructor

**new HistoryDatabase**(`databaseName?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `databaseName` | `string` | `'ide-history-storage'` |

#### Overrides

Dexie.constructor

## Properties

### history

`Readonly` **history**: `Table`<[`HistoryRecord`](/auto-docs/history-storage/interfaces/HistoryRecord.md)>

***

### operation

`Readonly` **operation**: `Table`<[`HistoryOperationRecord`](/auto-docs/history-storage/interfaces/HistoryOperationRecord.md)>

***

### resourceStorageLimit

**resourceStorageLimit**: `number` = `100`

## Methods

### addHistoryRecord

**addHistoryRecord**(`history`, `operations`): `any`

添加历史记录

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `history` | [`HistoryRecord`](/auto-docs/history-storage/interfaces/HistoryRecord.md) | 历史记录 |
| `operations` | [`HistoryOperationRecord`](/auto-docs/history-storage/interfaces/HistoryOperationRecord.md)\[] | 操作记录 |

#### Returns

`any`

***

### addOperationRecord

**addOperationRecord**(`record`): `any`

添加操作记录

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `record` | [`HistoryOperationRecord`](/auto-docs/history-storage/interfaces/HistoryOperationRecord.md) | 操作记录 |

#### Returns

`any`

***

### allHistoryByResourceURI

**allHistoryByResourceURI**(`resourceURI`): `any`

某个uri下所有的history记录

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resourceURI` | `string` | 资源uri |

#### Returns

`any`

***

### allOperationByResourceURI

**allOperationByResourceURI**(`resourceURI`): `any`

某个uri下所有的operation记录

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resourceURI` | `string` | 资源uri |

#### Returns

`any`

***

### getHistoryByUUID

**getHistoryByUUID**(`uuid`): `any`

根据uuid获取历史

#### Parameters

| Name | Type |
| :------ | :------ |
| `uuid` | `string` |

#### Returns

`any`

***

### reset

**reset**(): `any`

重置数据库

#### Returns

`any`

***

### resetByResourceURI

**resetByResourceURI**(`resourceURI`): `any`

清空某个资源下所有的数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `resourceURI` | `string` |

#### Returns

`any`

***

### updateHistoryByUUID

**updateHistoryByUUID**(`uuid`, `historyRecord`): `Promise`<`any`>

更新历史记录

#### Parameters

| Name | Type |
| :------ | :------ |
| `uuid` | `string` |
| `historyRecord` | `Partial`<[`HistoryRecord`](/auto-docs/history-storage/interfaces/HistoryRecord.md)> |

#### Returns

`Promise`<`any`>

***

### updateOperationRecord

**updateOperationRecord**(`record`): `Promise`<`any`>

更新操作记录

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `record` | [`HistoryOperationRecord`](/auto-docs/history-storage/interfaces/HistoryOperationRecord.md) | 操作记录 |

#### Returns

`Promise`<`any`>
