# Interface: WorkflowContentChangeEvent

## Table of contents

### Properties

* [entity](/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md#entity)
* [oldValue](/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md#oldvalue)
* [toJSON](/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md#tojson)
* [type](/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md#type)

## Properties

### entity

**entity**: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)

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

**type**: [`WorkflowContentChangeType`](/auto-docs/free-layout-editor/enums/WorkflowContentChangeType.md)
