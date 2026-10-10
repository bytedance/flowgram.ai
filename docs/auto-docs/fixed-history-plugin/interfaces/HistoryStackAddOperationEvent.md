# Interface: HistoryStackAddOperationEvent

添加操作事件

## Hierarchy

* [`HistoryStackBaseEvent`](/auto-docs/fixed-history-plugin/interfaces/HistoryStackBaseEvent.md)

  ↳ **`HistoryStackAddOperationEvent`**

## Table of contents

### Properties

* [service](/auto-docs/fixed-history-plugin/interfaces/HistoryStackAddOperationEvent.md#service)
* [type](/auto-docs/fixed-history-plugin/interfaces/HistoryStackAddOperationEvent.md#type)
* [value](/auto-docs/fixed-history-plugin/interfaces/HistoryStackAddOperationEvent.md#value)

## Properties

### service

**service**: [`HistoryService`](/auto-docs/fixed-history-plugin/classes/HistoryService.md)

#### Inherited from

[HistoryStackBaseEvent](/auto-docs/fixed-history-plugin/interfaces/HistoryStackBaseEvent.md).[service](/auto-docs/fixed-history-plugin/interfaces/HistoryStackBaseEvent.md#service)

***

### type

**type**: [`ADD_OPERATION`](/auto-docs/fixed-history-plugin/enums/HistoryStackChangeType.md#add_operation)

#### Overrides

[HistoryStackBaseEvent](/auto-docs/fixed-history-plugin/interfaces/HistoryStackBaseEvent.md).[type](/auto-docs/fixed-history-plugin/interfaces/HistoryStackBaseEvent.md#type)

***

### value

**value**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `historyItem` | [`HistoryItem`](/auto-docs/fixed-history-plugin/interfaces/HistoryItem.md) |
| `operation` | [`HistoryOperation`](/auto-docs/fixed-history-plugin/interfaces/HistoryOperation.md) |

#### Overrides

[HistoryStackBaseEvent](/auto-docs/fixed-history-plugin/interfaces/HistoryStackBaseEvent.md).[value](/auto-docs/fixed-history-plugin/interfaces/HistoryStackBaseEvent.md#value)
