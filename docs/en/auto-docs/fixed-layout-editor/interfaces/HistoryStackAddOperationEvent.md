# Interface: HistoryStackAddOperationEvent

添加操作事件

## Hierarchy

* [`HistoryStackBaseEvent`](/en/auto-docs/fixed-layout-editor/interfaces/HistoryStackBaseEvent.md)

  ↳ **`HistoryStackAddOperationEvent`**

## Table of contents

### Properties

* [service](/en/auto-docs/fixed-layout-editor/interfaces/HistoryStackAddOperationEvent.md#service)
* [type](/en/auto-docs/fixed-layout-editor/interfaces/HistoryStackAddOperationEvent.md#type)
* [value](/en/auto-docs/fixed-layout-editor/interfaces/HistoryStackAddOperationEvent.md#value)

## Properties

### service

**service**: [`HistoryService`](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md)

#### Inherited from

[HistoryStackBaseEvent](/en/auto-docs/fixed-layout-editor/interfaces/HistoryStackBaseEvent.md).[service](/en/auto-docs/fixed-layout-editor/interfaces/HistoryStackBaseEvent.md#service)

***

### type

**type**: [`ADD_OPERATION`](/en/auto-docs/fixed-layout-editor/enums/HistoryStackChangeType.md#add_operation)

#### Overrides

[HistoryStackBaseEvent](/en/auto-docs/fixed-layout-editor/interfaces/HistoryStackBaseEvent.md).[type](/en/auto-docs/fixed-layout-editor/interfaces/HistoryStackBaseEvent.md#type)

***

### value

**value**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `historyItem` | [`HistoryItem`](/en/auto-docs/fixed-layout-editor/interfaces/HistoryItem.md) |
| `operation` | [`HistoryOperation`](/en/auto-docs/fixed-layout-editor/interfaces/HistoryOperation.md) |

#### Overrides

[HistoryStackBaseEvent](/en/auto-docs/fixed-layout-editor/interfaces/HistoryStackBaseEvent.md).[value](/en/auto-docs/fixed-layout-editor/interfaces/HistoryStackBaseEvent.md#value)
