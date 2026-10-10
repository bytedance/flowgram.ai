# Interface: HistoryStackUpdateOperationEvent

更新操作事件

## Hierarchy

* [`HistoryStackBaseEvent`](/en/auto-docs/free-layout-editor/interfaces/HistoryStackBaseEvent.md)

  ↳ **`HistoryStackUpdateOperationEvent`**

## Table of contents

### Properties

* [service](/en/auto-docs/free-layout-editor/interfaces/HistoryStackUpdateOperationEvent.md#service)
* [type](/en/auto-docs/free-layout-editor/interfaces/HistoryStackUpdateOperationEvent.md#type)
* [value](/en/auto-docs/free-layout-editor/interfaces/HistoryStackUpdateOperationEvent.md#value)

## Properties

### service

**service**: [`HistoryService`](/en/auto-docs/free-layout-editor/classes/HistoryService.md)

#### Inherited from

[HistoryStackBaseEvent](/en/auto-docs/free-layout-editor/interfaces/HistoryStackBaseEvent.md).[service](/en/auto-docs/free-layout-editor/interfaces/HistoryStackBaseEvent.md#service)

***

### type

**type**: [`UPDATE_OPERATION`](/en/auto-docs/free-layout-editor/enums/HistoryStackChangeType.md#update_operation)

#### Overrides

[HistoryStackBaseEvent](/en/auto-docs/free-layout-editor/interfaces/HistoryStackBaseEvent.md).[type](/en/auto-docs/free-layout-editor/interfaces/HistoryStackBaseEvent.md#type)

***

### value

**value**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `historyItem` | [`HistoryItem`](/en/auto-docs/free-layout-editor/interfaces/HistoryItem.md) |
| `operation` | [`HistoryOperation`](/en/auto-docs/free-layout-editor/interfaces/HistoryOperation.md) |

#### Overrides

[HistoryStackBaseEvent](/en/auto-docs/free-layout-editor/interfaces/HistoryStackBaseEvent.md).[value](/en/auto-docs/free-layout-editor/interfaces/HistoryStackBaseEvent.md#value)
