# Interface: Operation\<OperationValue>

操作

## Type parameters

| Name | Type |
| :------ | :------ |
| `OperationValue` | `unknown` |

## Hierarchy

* **`Operation`**

  ↳ [`AddLineOperation`](/en/auto-docs/free-layout-editor/interfaces/AddLineOperation.md)

  ↳ [`AddWorkflowNodeOperation`](/en/auto-docs/free-layout-editor/interfaces/AddWorkflowNodeOperation.md)

  ↳ [`ChangeLineDataOperation`](/en/auto-docs/free-layout-editor/interfaces/ChangeLineDataOperation.md)

  ↳ [`DeleteLineOperation`](/en/auto-docs/free-layout-editor/interfaces/DeleteLineOperation.md)

  ↳ [`DeleteWorkflowNodeOperation`](/en/auto-docs/free-layout-editor/interfaces/DeleteWorkflowNodeOperation.md)

  ↳ [`MoveNodeOperation`](/en/auto-docs/free-layout-editor/interfaces/MoveNodeOperation.md)

  ↳ [`HistoryOperation`](/en/auto-docs/free-layout-editor/interfaces/HistoryOperation.md)

## Table of contents

### Properties

* [origin](/en/auto-docs/free-layout-editor/interfaces/Operation.md#origin)
* [type](/en/auto-docs/free-layout-editor/interfaces/Operation.md#type)
* [uri](/en/auto-docs/free-layout-editor/interfaces/Operation.md#uri)
* [value](/en/auto-docs/free-layout-editor/interfaces/Operation.md#value)

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
