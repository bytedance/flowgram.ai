# Interface: DeleteWorkflowNodeOperation

操作

## Hierarchy

* [`Operation`](/en/auto-docs/free-history-plugin/interfaces/Operation.md)

  ↳ **`DeleteWorkflowNodeOperation`**

## Table of contents

### Properties

* [origin](/en/auto-docs/free-history-plugin/interfaces/DeleteWorkflowNodeOperation.md#origin)
* [type](/en/auto-docs/free-history-plugin/interfaces/DeleteWorkflowNodeOperation.md#type)
* [uri](/en/auto-docs/free-history-plugin/interfaces/DeleteWorkflowNodeOperation.md#uri)
* [value](/en/auto-docs/free-history-plugin/interfaces/DeleteWorkflowNodeOperation.md#value)

## Properties

### origin

`Optional` **origin**: `string` | `Symbol`

操作触发源头

#### Inherited from

[Operation](/en/auto-docs/free-history-plugin/interfaces/Operation.md).[origin](/en/auto-docs/free-history-plugin/interfaces/Operation.md#origin)

***

### type

**type**: [`deleteNode`](/en/auto-docs/free-history-plugin/enums/FreeOperationType.md#deletenode)

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

**value**: [`AddOrDeleteWorkflowNodeOperationValue`](/en/auto-docs/free-history-plugin/interfaces/AddOrDeleteWorkflowNodeOperationValue.md)

操作的值 外部自定义

#### Overrides

[Operation](/en/auto-docs/free-history-plugin/interfaces/Operation.md).[value](/en/auto-docs/free-history-plugin/interfaces/Operation.md#value)
