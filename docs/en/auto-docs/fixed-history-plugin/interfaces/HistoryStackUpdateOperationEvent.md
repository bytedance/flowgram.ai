# Interface: HistoryStackUpdateOperationEvent

更新操作事件

## Hierarchy

* [`HistoryStackBaseEvent`](/en/auto-docs/fixed-history-plugin/interfaces/HistoryStackBaseEvent.md)

  ↳ **`HistoryStackUpdateOperationEvent`**

## Table of contents

### Properties

* [service](/en/auto-docs/fixed-history-plugin/interfaces/HistoryStackUpdateOperationEvent.md#service)
* [type](/en/auto-docs/fixed-history-plugin/interfaces/HistoryStackUpdateOperationEvent.md#type)
* [value](/en/auto-docs/fixed-history-plugin/interfaces/HistoryStackUpdateOperationEvent.md#value)

## Properties

### service

**service**: [`HistoryService`](/en/auto-docs/fixed-history-plugin/classes/HistoryService.md)

#### Inherited from

[HistoryStackBaseEvent](/en/auto-docs/fixed-history-plugin/interfaces/HistoryStackBaseEvent.md).[service](/en/auto-docs/fixed-history-plugin/interfaces/HistoryStackBaseEvent.md#service)

***

### type

**type**: [`UPDATE_OPERATION`](/en/auto-docs/fixed-history-plugin/enums/HistoryStackChangeType.md#update_operation)

#### Overrides

[HistoryStackBaseEvent](/en/auto-docs/fixed-history-plugin/interfaces/HistoryStackBaseEvent.md).[type](/en/auto-docs/fixed-history-plugin/interfaces/HistoryStackBaseEvent.md#type)

***

### value

**value**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `historyItem` | [`HistoryItem`](/en/auto-docs/fixed-history-plugin/interfaces/HistoryItem.md) |
| `operation` | [`HistoryOperation`](/en/auto-docs/fixed-history-plugin/interfaces/HistoryOperation.md) |

#### Overrides

[HistoryStackBaseEvent](/en/auto-docs/fixed-history-plugin/interfaces/HistoryStackBaseEvent.md).[value](/en/auto-docs/fixed-history-plugin/interfaces/HistoryStackBaseEvent.md#value)
