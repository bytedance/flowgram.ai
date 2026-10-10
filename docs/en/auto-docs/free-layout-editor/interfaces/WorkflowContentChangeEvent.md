# Interface: WorkflowContentChangeEvent

## Table of contents

### Properties

* [entity](/en/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md#entity)
* [oldValue](/en/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md#oldvalue)
* [toJSON](/en/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md#tojson)
* [type](/en/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md#type)

## Properties

### entity

**entity**: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) | [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)

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

**type**: [`WorkflowContentChangeType`](/en/auto-docs/free-layout-editor/enums/WorkflowContentChangeType.md)
