# Interface: DeleteLineOperation

操作

## Hierarchy

* [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)

  ↳ **`DeleteLineOperation`**

## Table of contents

### Properties

* [origin](/auto-docs/free-layout-editor/interfaces/DeleteLineOperation.md#origin)
* [type](/auto-docs/free-layout-editor/interfaces/DeleteLineOperation.md#type)
* [uri](/auto-docs/free-layout-editor/interfaces/DeleteLineOperation.md#uri)
* [value](/auto-docs/free-layout-editor/interfaces/DeleteLineOperation.md#value)

## Properties

### origin

`Optional` **origin**: `string` | `Symbol`

操作触发源头

#### Inherited from

[Operation](/auto-docs/free-layout-editor/interfaces/Operation.md).[origin](/auto-docs/free-layout-editor/interfaces/Operation.md#origin)

***

### type

**type**: [`deleteLine`](/auto-docs/free-layout-editor/enums/FreeOperationType.md#deleteline)

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

**value**: [`AddOrDeleteLineOperationValue`](/auto-docs/free-layout-editor/interfaces/AddOrDeleteLineOperationValue.md)

操作的值 外部自定义

#### Overrides

[Operation](/auto-docs/free-layout-editor/interfaces/Operation.md).[value](/auto-docs/free-layout-editor/interfaces/Operation.md#value)
