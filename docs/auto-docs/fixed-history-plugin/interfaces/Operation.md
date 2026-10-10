# Interface: Operation\<OperationValue>

操作

## Type parameters

| Name | Type |
| :------ | :------ |
| `OperationValue` | `unknown` |

## Hierarchy

* **`Operation`**

  ↳ [`HistoryOperation`](/auto-docs/fixed-history-plugin/interfaces/HistoryOperation.md)

## Table of contents

### Properties

* [origin](/auto-docs/fixed-history-plugin/interfaces/Operation.md#origin)
* [type](/auto-docs/fixed-history-plugin/interfaces/Operation.md#type)
* [uri](/auto-docs/fixed-history-plugin/interfaces/Operation.md#uri)
* [value](/auto-docs/fixed-history-plugin/interfaces/Operation.md#value)

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
