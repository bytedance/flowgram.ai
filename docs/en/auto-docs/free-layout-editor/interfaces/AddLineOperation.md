# Interface: AddLineOperation

操作

## Hierarchy

* [`Operation`](/en/auto-docs/free-layout-editor/interfaces/Operation.md)

  ↳ **`AddLineOperation`**

## Table of contents

### Properties

* [origin](/en/auto-docs/free-layout-editor/interfaces/AddLineOperation.md#origin)
* [type](/en/auto-docs/free-layout-editor/interfaces/AddLineOperation.md#type)
* [uri](/en/auto-docs/free-layout-editor/interfaces/AddLineOperation.md#uri)
* [value](/en/auto-docs/free-layout-editor/interfaces/AddLineOperation.md#value)

## Properties

### origin

`Optional` **origin**: `string` | `Symbol`

操作触发源头

#### Inherited from

[Operation](/en/auto-docs/free-layout-editor/interfaces/Operation.md).[origin](/en/auto-docs/free-layout-editor/interfaces/Operation.md#origin)

***

### type

**type**: [`addLine`](/en/auto-docs/free-layout-editor/enums/FreeOperationType.md#addline)

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

**value**: [`AddOrDeleteLineOperationValue`](/en/auto-docs/free-layout-editor/interfaces/AddOrDeleteLineOperationValue.md)

操作的值 外部自定义

#### Overrides

[Operation](/en/auto-docs/free-layout-editor/interfaces/Operation.md).[value](/en/auto-docs/free-layout-editor/interfaces/Operation.md#value)
