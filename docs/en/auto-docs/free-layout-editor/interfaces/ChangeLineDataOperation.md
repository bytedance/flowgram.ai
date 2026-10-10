# Interface: ChangeLineDataOperation

操作

## Hierarchy

* [`Operation`](/en/auto-docs/free-layout-editor/interfaces/Operation.md)

  ↳ **`ChangeLineDataOperation`**

## Table of contents

### Properties

* [origin](/en/auto-docs/free-layout-editor/interfaces/ChangeLineDataOperation.md#origin)
* [type](/en/auto-docs/free-layout-editor/interfaces/ChangeLineDataOperation.md#type)
* [uri](/en/auto-docs/free-layout-editor/interfaces/ChangeLineDataOperation.md#uri)
* [value](/en/auto-docs/free-layout-editor/interfaces/ChangeLineDataOperation.md#value)

## Properties

### origin

`Optional` **origin**: `string` | `Symbol`

操作触发源头

#### Inherited from

[Operation](/en/auto-docs/free-layout-editor/interfaces/Operation.md).[origin](/en/auto-docs/free-layout-editor/interfaces/Operation.md#origin)

***

### type

**type**: [`changeLineData`](/en/auto-docs/free-layout-editor/enums/FreeOperationType.md#changelinedata)

操作的类型 如insert\_node, move\_node等

#### Overrides

[Operation](/en/auto-docs/free-layout-editor/interfaces/Operation.md).[type](/en/auto-docs/free-layout-editor/interfaces/Operation.md#type)

***

### uri

`Optional` **uri**: `string`

资源唯一标志

#### Inherited from

[Operation](/en/auto-docs/free-layout-editor/interfaces/Operation.md).[uri](/en/auto-docs/free-layout-editor/interfaces/Operation.md#uri)

***

### value

**value**: [`ChangeLineDataValue`](/en/auto-docs/free-layout-editor/interfaces/ChangeLineDataValue.md)

操作的值 外部自定义

#### Overrides

[Operation](/en/auto-docs/free-layout-editor/interfaces/Operation.md).[value](/en/auto-docs/free-layout-editor/interfaces/Operation.md#value)
