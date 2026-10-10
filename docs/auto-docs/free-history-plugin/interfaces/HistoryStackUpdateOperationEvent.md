# Interface: HistoryStackUpdateOperationEvent

更新操作事件

## Hierarchy

* [`HistoryStackBaseEvent`](/auto-docs/free-history-plugin/interfaces/HistoryStackBaseEvent.md)

  ↳ **`HistoryStackUpdateOperationEvent`**

## Table of contents

### Properties

* [service](/auto-docs/free-history-plugin/interfaces/HistoryStackUpdateOperationEvent.md#service)
* [type](/auto-docs/free-history-plugin/interfaces/HistoryStackUpdateOperationEvent.md#type)
* [value](/auto-docs/free-history-plugin/interfaces/HistoryStackUpdateOperationEvent.md#value)

## Properties

### service

**service**: [`HistoryService`](/auto-docs/free-history-plugin/classes/HistoryService.md)

#### Inherited from

[HistoryStackBaseEvent](/auto-docs/free-history-plugin/interfaces/HistoryStackBaseEvent.md).[service](/auto-docs/free-history-plugin/interfaces/HistoryStackBaseEvent.md#service)

***

### type

**type**: [`UPDATE_OPERATION`](/auto-docs/free-history-plugin/enums/HistoryStackChangeType.md#update_operation)

#### Overrides

[HistoryStackBaseEvent](/auto-docs/free-history-plugin/interfaces/HistoryStackBaseEvent.md).[type](/auto-docs/free-history-plugin/interfaces/HistoryStackBaseEvent.md#type)

***

### value

**value**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `historyItem` | [`HistoryItem`](/auto-docs/free-history-plugin/interfaces/HistoryItem.md) |
| `operation` | [`HistoryOperation`](/auto-docs/free-history-plugin/interfaces/HistoryOperation.md) |

#### Overrides

[HistoryStackBaseEvent](/auto-docs/free-history-plugin/interfaces/HistoryStackBaseEvent.md).[value](/auto-docs/free-history-plugin/interfaces/HistoryStackBaseEvent.md#value)
