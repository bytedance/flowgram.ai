# Interface: HistoryStackAddOperationEvent

添加操作事件

## Hierarchy

* [`HistoryStackBaseEvent`](/auto-docs/free-layout-editor/interfaces/HistoryStackBaseEvent.md)

  ↳ **`HistoryStackAddOperationEvent`**

## Table of contents

### Properties

* [service](/auto-docs/free-layout-editor/interfaces/HistoryStackAddOperationEvent.md#service)
* [type](/auto-docs/free-layout-editor/interfaces/HistoryStackAddOperationEvent.md#type)
* [value](/auto-docs/free-layout-editor/interfaces/HistoryStackAddOperationEvent.md#value)

## Properties

### service

**service**: [`HistoryService`](/auto-docs/free-layout-editor/classes/HistoryService.md)

#### Inherited from

[HistoryStackBaseEvent](/auto-docs/free-layout-editor/interfaces/HistoryStackBaseEvent.md).[service](/auto-docs/free-layout-editor/interfaces/HistoryStackBaseEvent.md#service)

***

### type

**type**: [`ADD_OPERATION`](/auto-docs/free-layout-editor/enums/HistoryStackChangeType.md#add_operation)

#### Overrides

[HistoryStackBaseEvent](/auto-docs/free-layout-editor/interfaces/HistoryStackBaseEvent.md).[type](/auto-docs/free-layout-editor/interfaces/HistoryStackBaseEvent.md#type)

***

### value

**value**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `historyItem` | [`HistoryItem`](/auto-docs/free-layout-editor/interfaces/HistoryItem.md) |
| `operation` | [`HistoryOperation`](/auto-docs/free-layout-editor/interfaces/HistoryOperation.md) |

#### Overrides

[HistoryStackBaseEvent](/auto-docs/free-layout-editor/interfaces/HistoryStackBaseEvent.md).[value](/auto-docs/free-layout-editor/interfaces/HistoryStackBaseEvent.md#value)
