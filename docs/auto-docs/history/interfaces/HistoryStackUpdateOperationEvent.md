# Interface: HistoryStackUpdateOperationEvent

更新操作事件

## Hierarchy

* [`HistoryStackBaseEvent`](/auto-docs/history/interfaces/HistoryStackBaseEvent.md)

  ↳ **`HistoryStackUpdateOperationEvent`**

## Table of contents

### Properties

* [service](/auto-docs/history/interfaces/HistoryStackUpdateOperationEvent.md#service)
* [type](/auto-docs/history/interfaces/HistoryStackUpdateOperationEvent.md#type)
* [value](/auto-docs/history/interfaces/HistoryStackUpdateOperationEvent.md#value)

## Properties

### service

**service**: [`HistoryService`](/auto-docs/history/classes/HistoryService.md)

#### Inherited from

[HistoryStackBaseEvent](/auto-docs/history/interfaces/HistoryStackBaseEvent.md).[service](/auto-docs/history/interfaces/HistoryStackBaseEvent.md#service)

***

### type

**type**: [`UPDATE_OPERATION`](/auto-docs/history/enums/HistoryStackChangeType.md#update_operation)

#### Overrides

[HistoryStackBaseEvent](/auto-docs/history/interfaces/HistoryStackBaseEvent.md).[type](/auto-docs/history/interfaces/HistoryStackBaseEvent.md#type)

***

### value

**value**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `historyItem` | [`HistoryItem`](/auto-docs/history/interfaces/HistoryItem.md) |
| `operation` | [`HistoryOperation`](/auto-docs/history/interfaces/HistoryOperation.md) |

#### Overrides

[HistoryStackBaseEvent](/auto-docs/history/interfaces/HistoryStackBaseEvent.md).[value](/auto-docs/history/interfaces/HistoryStackBaseEvent.md#value)
