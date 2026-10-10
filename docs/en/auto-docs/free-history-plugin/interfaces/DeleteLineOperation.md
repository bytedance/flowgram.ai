# Interface: DeleteLineOperation

操作

## Hierarchy

* [`Operation`](/en/auto-docs/free-history-plugin/interfaces/Operation.md)

  ↳ **`DeleteLineOperation`**

## Table of contents

### Properties

* [origin](/en/auto-docs/free-history-plugin/interfaces/DeleteLineOperation.md#origin)
* [type](/en/auto-docs/free-history-plugin/interfaces/DeleteLineOperation.md#type)
* [uri](/en/auto-docs/free-history-plugin/interfaces/DeleteLineOperation.md#uri)
* [value](/en/auto-docs/free-history-plugin/interfaces/DeleteLineOperation.md#value)

## Properties

### origin

`Optional` **origin**: `string` | `Symbol`

操作触发源头

#### Inherited from

[Operation](/en/auto-docs/free-history-plugin/interfaces/Operation.md).[origin](/en/auto-docs/free-history-plugin/interfaces/Operation.md#origin)

***

### type

**type**: [`deleteLine`](/en/auto-docs/free-history-plugin/enums/FreeOperationType.md#deleteline)

操作的类型 如insert\_node, move\_node等

#### Overrides

[Operation](/en/auto-docs/free-history-plugin/interfaces/Operation.md).[type](/en/auto-docs/free-history-plugin/interfaces/Operation.md#type)

***

### uri

`Optional` **uri**: `string`

资源唯一标志

#### Inherited from

[Operation](/en/auto-docs/free-history-plugin/interfaces/Operation.md).[uri](/en/auto-docs/free-history-plugin/interfaces/Operation.md#uri)

***

### value

**value**: [`AddOrDeleteLineOperationValue`](/en/auto-docs/free-history-plugin/interfaces/AddOrDeleteLineOperationValue.md)

操作的值 外部自定义

#### Overrides

[Operation](/en/auto-docs/free-history-plugin/interfaces/Operation.md).[value](/en/auto-docs/free-history-plugin/interfaces/Operation.md#value)
