# Interface: HistoryOperation

操作历史

## Hierarchy

* [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)

  ↳ **`HistoryOperation`**

## Table of contents

### Properties

* [description](/auto-docs/free-layout-editor/interfaces/HistoryOperation.md#description)
* [id](/auto-docs/free-layout-editor/interfaces/HistoryOperation.md#id)
* [label](/auto-docs/free-layout-editor/interfaces/HistoryOperation.md#label)
* [origin](/auto-docs/free-layout-editor/interfaces/HistoryOperation.md#origin)
* [timestamp](/auto-docs/free-layout-editor/interfaces/HistoryOperation.md#timestamp)
* [type](/auto-docs/free-layout-editor/interfaces/HistoryOperation.md#type)
* [uri](/auto-docs/free-layout-editor/interfaces/HistoryOperation.md#uri)
* [value](/auto-docs/free-layout-editor/interfaces/HistoryOperation.md#value)

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

[Operation](/auto-docs/free-layout-editor/interfaces/Operation.md).[origin](/auto-docs/free-layout-editor/interfaces/Operation.md#origin)

***

### timestamp

**timestamp**: `number`

时间戳

***

### type

**type**: `string`

操作的类型 如insert\_node, move\_node等

#### Inherited from

[Operation](/auto-docs/free-layout-editor/interfaces/Operation.md).[type](/auto-docs/free-layout-editor/interfaces/Operation.md#type)

***

### uri

`Optional` **uri**: `string`

资源唯一标志

#### Inherited from

[Operation](/auto-docs/free-layout-editor/interfaces/Operation.md).[uri](/auto-docs/free-layout-editor/interfaces/Operation.md#uri)

***

### value

**value**: `unknown`

操作的值 外部自定义

#### Inherited from

[Operation](/auto-docs/free-layout-editor/interfaces/Operation.md).[value](/auto-docs/free-layout-editor/interfaces/Operation.md#value)
