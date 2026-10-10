# Interface: WorkflowContentChangeEvent

## Table of contents

### Properties

* [entity](/auto-docs/free-layout-core/interfaces/WorkflowContentChangeEvent.md#entity)
* [oldValue](/auto-docs/free-layout-core/interfaces/WorkflowContentChangeEvent.md#oldvalue)
* [toJSON](/auto-docs/free-layout-core/interfaces/WorkflowContentChangeEvent.md#tojson)
* [type](/auto-docs/free-layout-core/interfaces/WorkflowContentChangeEvent.md#type)

## Properties

### entity

**entity**: `FlowNodeEntity` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)

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

**type**: [`WorkflowContentChangeType`](/auto-docs/free-layout-core/enums/WorkflowContentChangeType.md)
