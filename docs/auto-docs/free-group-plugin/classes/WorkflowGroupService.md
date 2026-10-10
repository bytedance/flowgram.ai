# Class: WorkflowGroupService

## Hierarchy

* `FlowGroupService`

  ↳ **`WorkflowGroupService`**

## Table of contents

### Constructors

* [constructor](/auto-docs/free-group-plugin/classes/WorkflowGroupService.md#constructor)

### Properties

* [entityManager](/auto-docs/free-group-plugin/classes/WorkflowGroupService.md#entitymanager)
* [freeOperationService](/auto-docs/free-group-plugin/classes/WorkflowGroupService.md#freeoperationservice)
* [operationService](/auto-docs/free-group-plugin/classes/WorkflowGroupService.md#operationservice)

### Methods

* [createGroup](/auto-docs/free-group-plugin/classes/WorkflowGroupService.md#creategroup)
* [deleteGroup](/auto-docs/free-group-plugin/classes/WorkflowGroupService.md#deletegroup)
* [dispose](/auto-docs/free-group-plugin/classes/WorkflowGroupService.md#dispose)
* [getAllGroups](/auto-docs/free-group-plugin/classes/WorkflowGroupService.md#getallgroups)
* [groupController](/auto-docs/free-group-plugin/classes/WorkflowGroupService.md#groupcontroller)
* [ready](/auto-docs/free-group-plugin/classes/WorkflowGroupService.md#ready)
* [ungroup](/auto-docs/free-group-plugin/classes/WorkflowGroupService.md#ungroup)
* [validate](/auto-docs/free-group-plugin/classes/WorkflowGroupService.md#validate)

## Constructors

### constructor

**new WorkflowGroupService**()

#### Inherited from

FlowGroupService.constructor

## Properties

### entityManager

`Readonly` **entityManager**: `EntityManager`

#### Inherited from

FlowGroupService.entityManager

***

### freeOperationService

**freeOperationService**: `WorkflowOperationBaseService`

***

### operationService

`Readonly` **operationService**: `FlowOperationBaseService`

#### Inherited from

FlowGroupService.operationService

## Methods

### createGroup

**createGroup**(`nodes`): `undefined` | `FlowNodeEntity`

创建分组节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | `FlowNodeEntity`\[] |

#### Returns

`undefined` | `FlowNodeEntity`

#### Overrides

FlowGroupService.createGroup

***

### deleteGroup

**deleteGroup**(`groupNode`): `void`

删除分组

#### Parameters

| Name | Type |
| :------ | :------ |
| `groupNode` | `FlowNodeEntity` |

#### Returns

`void`

#### Inherited from

FlowGroupService.deleteGroup

***

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### getAllGroups

**getAllGroups**(): `FlowGroupController`\[]

返回所有分组节点

#### Returns

`FlowGroupController`\[]

#### Inherited from

FlowGroupService.getAllGroups

***

### groupController

**groupController**(`group`): `undefined` | `FlowGroupController`

获取分组控制器

#### Parameters

| Name | Type |
| :------ | :------ |
| `group` | `FlowNodeEntity` |

#### Returns

`undefined` | `FlowGroupController`

#### Inherited from

FlowGroupService.groupController

***

### ready

**ready**(): `void`

#### Returns

`void`

***

### ungroup

**ungroup**(`groupNode`): `void`

取消分组

#### Parameters

| Name | Type |
| :------ | :------ |
| `groupNode` | `FlowNodeEntity` |

#### Returns

`void`

#### Overrides

FlowGroupService.ungroup

***

### validate

`Static` **validate**(`nodes`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | `FlowNodeEntity`\[] |

#### Returns

`boolean`

#### Inherited from

FlowGroupService.validate
