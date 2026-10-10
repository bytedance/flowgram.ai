# Interface: HistoryStackAddOperationEvent

添加操作事件

## Hierarchy

* [`HistoryStackBaseEvent`](/en/auto-docs/fixed-history-plugin/interfaces/HistoryStackBaseEvent.md)

  ↳ **`HistoryStackAddOperationEvent`**

## Table of contents

### Properties

* [service](/en/auto-docs/fixed-history-plugin/interfaces/HistoryStackAddOperationEvent.md#service)
* [type](/en/auto-docs/fixed-history-plugin/interfaces/HistoryStackAddOperationEvent.md#type)
* [value](/en/auto-docs/fixed-history-plugin/interfaces/HistoryStackAddOperationEvent.md#value)

## Properties

### service

**service**: [`HistoryService`](/en/auto-docs/fixed-history-plugin/classes/HistoryService.md)

#### Inherited from

[HistoryStackBaseEvent](/en/auto-docs/fixed-history-plugin/interfaces/HistoryStackBaseEvent.md).[service](/en/auto-docs/fixed-history-plugin/interfaces/HistoryStackBaseEvent.md#service)

***

### type

**type**: [`ADD_OPERATION`](/en/auto-docs/fixed-history-plugin/enums/HistoryStackChangeType.md#add_operation)

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
