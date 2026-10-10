# Interface: HistoryOperation

操作历史

## Hierarchy

* [`Operation`](/en/auto-docs/history/interfaces/Operation.md)

  ↳ **`HistoryOperation`**

## Table of contents

### Properties

* [description](/en/auto-docs/history/interfaces/HistoryOperation.md#description)
* [id](/en/auto-docs/history/interfaces/HistoryOperation.md#id)
* [label](/en/auto-docs/history/interfaces/HistoryOperation.md#label)
* [origin](/en/auto-docs/history/interfaces/HistoryOperation.md#origin)
* [timestamp](/en/auto-docs/history/interfaces/HistoryOperation.md#timestamp)
* [type](/en/auto-docs/history/interfaces/HistoryOperation.md#type)
* [uri](/en/auto-docs/history/interfaces/HistoryOperation.md#uri)
* [value](/en/auto-docs/history/interfaces/HistoryOperation.md#value)

## Properties

### description

`Optional` **description**: `string`

描述

***

### id

**id**: `string`

唯一id

***

### label

`Optional` **label**: `string`

显示名称

***

### origin

`Optional` **origin**: `string` | `Symbol`

操作触发源头

#### Inherited from

[Operation](/en/auto-docs/history/interfaces/Operation.md).[origin](/en/auto-docs/history/interfaces/Operation.md#origin)

***

### timestamp

**timestamp**: `number`

时间戳

***

### type

**type**: `string`

操作的类型 如insert\_node, move\_node等

#### Inherited from

[Operation](/en/auto-docs/history/interfaces/Operation.md).[type](/en/auto-docs/history/interfaces/Operation.md#type)

***

### uri

`Optional` **uri**: `string`

资源唯一标志

#### Inherited from

[Operation](/en/auto-docs/history/interfaces/Operation.md).[uri](/en/auto-docs/history/interfaces/Operation.md#uri)

***

### value

**value**: `unknown`

操作的值 外部自定义

#### Inherited from

[Operation](/en/auto-docs/history/interfaces/Operation.md).[value](/en/auto-docs/history/interfaces/Operation.md#value)
