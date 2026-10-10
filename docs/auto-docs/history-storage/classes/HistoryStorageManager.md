# Class: HistoryStorageManager

历史存储管理

## Table of contents

### Constructors

* [constructor](/auto-docs/history-storage/classes/HistoryStorageManager.md#constructor)

### Properties

* [db](/auto-docs/history-storage/classes/HistoryStorageManager.md#db)

### Methods

* [dispose](/auto-docs/history-storage/classes/HistoryStorageManager.md#dispose)
* [historyItemToRecord](/auto-docs/history-storage/classes/HistoryStorageManager.md#historyitemtorecord)
* [historyOperationToRecord](/auto-docs/history-storage/classes/HistoryStorageManager.md#historyoperationtorecord)
* [onInit](/auto-docs/history-storage/classes/HistoryStorageManager.md#oninit)

## Constructors

### constructor

**new HistoryStorageManager**()

## Properties

### db

**db**: [`HistoryDatabase`](/auto-docs/history-storage/classes/HistoryDatabase.md)

## Methods

### dispose

**dispose**(): `void`

销毁

#### Returns

`void`

***

### historyItemToRecord

**historyItemToRecord**(`historyService`, `historyItem`): \[[`HistoryRecord`](/auto-docs/history-storage/interfaces/HistoryRecord.md), [`HistoryOperationRecord`](/auto-docs/history-storage/interfaces/HistoryOperationRecord.md)\[]]

内存历史转数据表记录

#### Parameters

| Name | Type |
| :------ | :------ |
| `historyService` | `HistoryService` |
| `historyItem` | `HistoryItem` |

#### Returns

\[[`HistoryRecord`](/auto-docs/history-storage/interfaces/HistoryRecord.md), [`HistoryOperationRecord`](/auto-docs/history-storage/interfaces/HistoryOperationRecord.md)\[]]

***

### historyOperationToRecord

**historyOperationToRecord**(`historyItem`, `op`): [`HistoryOperationRecord`](/auto-docs/history-storage/interfaces/HistoryOperationRecord.md)

内存操作转数据表操作

#### Parameters

| Name | Type |
| :------ | :------ |
| `historyItem` | `HistoryItem` |
| `op` | `HistoryOperation` |

#### Returns

[`HistoryOperationRecord`](/auto-docs/history-storage/interfaces/HistoryOperationRecord.md)

***

### onInit

**onInit**(`_ctx`, `opts`): `void`

初始化

#### Parameters

| Name | Type |
| :------ | :------ |
| `_ctx` | `PluginContext` |
| `opts` | [`HistoryStoragePluginOptions`](/auto-docs/history-storage/interfaces/HistoryStoragePluginOptions.md) |

#### Returns

`void`
