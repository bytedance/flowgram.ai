# Interface: Operation\<OperationValue>

操作

## Type parameters

| Name | Type |
| :------ | :------ |
| `OperationValue` | `unknown` |

## Hierarchy

* **`Operation`**

  ↳ [`AddLineOperation`](/auto-docs/free-layout-editor/interfaces/AddLineOperation.md)

  ↳ [`AddWorkflowNodeOperation`](/auto-docs/free-layout-editor/interfaces/AddWorkflowNodeOperation.md)

  ↳ [`ChangeLineDataOperation`](/auto-docs/free-layout-editor/interfaces/ChangeLineDataOperation.md)

  ↳ [`DeleteLineOperation`](/auto-docs/free-layout-editor/interfaces/DeleteLineOperation.md)

  ↳ [`DeleteWorkflowNodeOperation`](/auto-docs/free-layout-editor/interfaces/DeleteWorkflowNodeOperation.md)

  ↳ [`MoveNodeOperation`](/auto-docs/free-layout-editor/interfaces/MoveNodeOperation.md)

  ↳ [`HistoryOperation`](/auto-docs/free-layout-editor/interfaces/HistoryOperation.md)

## Table of contents

### Properties

* [origin](/auto-docs/free-layout-editor/interfaces/Operation.md#origin)
* [type](/auto-docs/free-layout-editor/interfaces/Operation.md#type)
* [uri](/auto-docs/free-layout-editor/interfaces/Operation.md#uri)
* [value](/auto-docs/free-layout-editor/interfaces/Operation.md#value)

## Properties

### origin

`Optional` **origin**: `string` | `Symbol`

操作触发源头

***

### type

**type**: `string`

操作的类型 如insert\_node, move\_node等

***

### uri

`Optional` **uri**: `string`

资源唯一标志

***

### value

**value**: `OperationValue`

操作的值 外部自定义
