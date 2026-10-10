# Interface: WorkflowContentChangeEvent

## Table of contents

### Properties

* [entity](/en/auto-docs/free-layout-core/interfaces/WorkflowContentChangeEvent.md#entity)
* [oldValue](/en/auto-docs/free-layout-core/interfaces/WorkflowContentChangeEvent.md#oldvalue)
* [toJSON](/en/auto-docs/free-layout-core/interfaces/WorkflowContentChangeEvent.md#tojson)
* [type](/en/auto-docs/free-layout-core/interfaces/WorkflowContentChangeEvent.md#type)

## Properties

### entity

**entity**: `FlowNodeEntity` | [`WorkflowLineEntity`](/en/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)

***

### oldValue

`Optional` **oldValue**: `any`

oldValue

***

### toJSON

**toJSON**: () => `any`

#### Type declaration

(): `any`

当前触发的元素的json数据，toJSON 需要主动触发

##### Returns

`any`

***

### type

**type**: [`WorkflowContentChangeType`](/en/auto-docs/free-layout-core/enums/WorkflowContentChangeType.md)
