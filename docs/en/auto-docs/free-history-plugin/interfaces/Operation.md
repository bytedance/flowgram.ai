# Interface: Operation\<OperationValue>

操作

## Type parameters

| Name | Type |
| :------ | :------ |
| `OperationValue` | `unknown` |

## Hierarchy

* **`Operation`**

  ↳ [`AddLineOperation`](/en/auto-docs/free-history-plugin/interfaces/AddLineOperation.md)

  ↳ [`ChangeLineDataOperation`](/en/auto-docs/free-history-plugin/interfaces/ChangeLineDataOperation.md)

  ↳ [`DeleteLineOperation`](/en/auto-docs/free-history-plugin/interfaces/DeleteLineOperation.md)

  ↳ [`MoveNodeOperation`](/en/auto-docs/free-history-plugin/interfaces/MoveNodeOperation.md)

  ↳ [`AddWorkflowNodeOperation`](/en/auto-docs/free-history-plugin/interfaces/AddWorkflowNodeOperation.md)

  ↳ [`DeleteWorkflowNodeOperation`](/en/auto-docs/free-history-plugin/interfaces/DeleteWorkflowNodeOperation.md)

  ↳ [`HistoryOperation`](/en/auto-docs/free-history-plugin/interfaces/HistoryOperation.md)

## Table of contents

### Properties

* [origin](/en/auto-docs/free-history-plugin/interfaces/Operation.md#origin)
* [type](/en/auto-docs/free-history-plugin/interfaces/Operation.md#type)
* [uri](/en/auto-docs/free-history-plugin/interfaces/Operation.md#uri)
* [value](/en/auto-docs/free-history-plugin/interfaces/Operation.md#value)

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
