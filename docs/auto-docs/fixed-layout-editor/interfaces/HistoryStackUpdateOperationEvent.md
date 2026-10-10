# Interface: HistoryStackUpdateOperationEvent

更新操作事件

## Hierarchy

* [`HistoryStackBaseEvent`](/auto-docs/fixed-layout-editor/interfaces/HistoryStackBaseEvent.md)

  ↳ **`HistoryStackUpdateOperationEvent`**

## Table of contents

### Properties

* [service](/auto-docs/fixed-layout-editor/interfaces/HistoryStackUpdateOperationEvent.md#service)
* [type](/auto-docs/fixed-layout-editor/interfaces/HistoryStackUpdateOperationEvent.md#type)
* [value](/auto-docs/fixed-layout-editor/interfaces/HistoryStackUpdateOperationEvent.md#value)

## Properties

### service

**service**: [`HistoryService`](/auto-docs/fixed-layout-editor/classes/HistoryService.md)

#### Inherited from

[HistoryStackBaseEvent](/auto-docs/fixed-layout-editor/interfaces/HistoryStackBaseEvent.md).[service](/auto-docs/fixed-layout-editor/interfaces/HistoryStackBaseEvent.md#service)

***

### type

**type**: [`UPDATE_OPERATION`](/auto-docs/fixed-layout-editor/enums/HistoryStackChangeType.md#update_operation)

#### Overrides

[HistoryStackBaseEvent](/auto-docs/fixed-layout-editor/interfaces/HistoryStackBaseEvent.md).[type](/auto-docs/fixed-layout-editor/interfaces/HistoryStackBaseEvent.md#type)

***

### value

**value**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `historyItem` | [`HistoryItem`](/auto-docs/fixed-layout-editor/interfaces/HistoryItem.md) |
| `operation` | [`HistoryOperation`](/auto-docs/fixed-layout-editor/interfaces/HistoryOperation.md) |

#### Overrides

[HistoryStackBaseEvent](/auto-docs/fixed-layout-editor/interfaces/HistoryStackBaseEvent.md).[value](/auto-docs/fixed-layout-editor/interfaces/HistoryStackBaseEvent.md#value)
