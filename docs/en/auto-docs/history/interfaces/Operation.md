# Interface: Operation\<OperationValue>

操作

## Type parameters

| Name | Type |
| :------ | :------ |
| `OperationValue` | `unknown` |

## Hierarchy

* **`Operation`**

  ↳ [`HistoryOperation`](/en/auto-docs/history/interfaces/HistoryOperation.md)

## Table of contents

### Properties

* [origin](/en/auto-docs/history/interfaces/Operation.md#origin)
* [type](/en/auto-docs/history/interfaces/Operation.md#type)
* [uri](/en/auto-docs/history/interfaces/Operation.md#uri)
* [value](/en/auto-docs/history/interfaces/Operation.md#value)

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
