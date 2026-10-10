# Interface: ChangeLineDataOperation

操作

## Hierarchy

* [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)

  ↳ **`ChangeLineDataOperation`**

## Table of contents

### Properties

* [origin](/auto-docs/free-layout-editor/interfaces/ChangeLineDataOperation.md#origin)
* [type](/auto-docs/free-layout-editor/interfaces/ChangeLineDataOperation.md#type)
* [uri](/auto-docs/free-layout-editor/interfaces/ChangeLineDataOperation.md#uri)
* [value](/auto-docs/free-layout-editor/interfaces/ChangeLineDataOperation.md#value)

## Properties

### origin

`Optional` **origin**: `string` | `Symbol`

操作触发源头

#### Inherited from

[Operation](/auto-docs/free-layout-editor/interfaces/Operation.md).[origin](/auto-docs/free-layout-editor/interfaces/Operation.md#origin)

***

### type

**type**: [`changeLineData`](/auto-docs/free-layout-editor/enums/FreeOperationType.md#changelinedata)

操作的类型 如insert\_node, move\_node等

#### Overrides

[Operation](/auto-docs/free-layout-editor/interfaces/Operation.md).[type](/auto-docs/free-layout-editor/interfaces/Operation.md#type)

***

### uri

`Optional` **uri**: `string`

资源唯一标志

#### Inherited from

[Operation](/auto-docs/free-layout-editor/interfaces/Operation.md).[uri](/auto-docs/free-layout-editor/interfaces/Operation.md#uri)

***

### value

**value**: [`ChangeLineDataValue`](/auto-docs/free-layout-editor/interfaces/ChangeLineDataValue.md)

操作的值 外部自定义

#### Overrides

[Operation](/auto-docs/free-layout-editor/interfaces/Operation.md).[value](/auto-docs/free-layout-editor/interfaces/Operation.md#value)
