# Class: FlowGroupService

## Table of contents

### Constructors

* [constructor](/auto-docs/document/classes/FlowGroupService.md#constructor)

### Properties

* [entityManager](/auto-docs/document/classes/FlowGroupService.md#entitymanager)
* [operationService](/auto-docs/document/classes/FlowGroupService.md#operationservice)

### Methods

* [createGroup](/auto-docs/document/classes/FlowGroupService.md#creategroup)
* [deleteGroup](/auto-docs/document/classes/FlowGroupService.md#deletegroup)
* [getAllGroups](/auto-docs/document/classes/FlowGroupService.md#getallgroups)
* [groupController](/auto-docs/document/classes/FlowGroupService.md#groupcontroller)
* [ungroup](/auto-docs/document/classes/FlowGroupService.md#ungroup)
* [validate](/auto-docs/document/classes/FlowGroupService.md#validate)

## Constructors

### constructor

**new FlowGroupService**()

## Properties

### entityManager

`Readonly` **entityManager**: `EntityManager`

***

### operationService

`Readonly` **operationService**: [`FlowOperationBaseService`](/auto-docs/document/variables/FlowOperationBaseService-1.md)

## Methods

### createGroup

**createGroup**(`nodes`): `undefined` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

创建分组节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`undefined` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

***

### deleteGroup

**deleteGroup**(`groupNode`): `void`

删除分组

#### Parameters

| Name | Type |
| :------ | :------ |
| `groupNode` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) |

#### Returns

`void`

***

### getAllGroups

**getAllGroups**(): [`FlowGroupController`](/auto-docs/document/classes/FlowGroupController.md)\[]

返回所有分组节点

#### Returns

[`FlowGroupController`](/auto-docs/document/classes/FlowGroupController.md)\[]

***

### groupController

**groupController**(`group`): `undefined` | [`FlowGroupController`](/auto-docs/document/classes/FlowGroupController.md)

获取分组控制器

#### Parameters

| Name | Type |
| :------ | :------ |
| `group` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) |

#### Returns

`undefined` | [`FlowGroupController`](/auto-docs/document/classes/FlowGroupController.md)

***

### ungroup

**ungroup**(`groupNode`): `void`

取消分组

#### Parameters

| Name | Type |
| :------ | :------ |
| `groupNode` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) |

#### Returns

`void`

***

### validate

`Static` **validate**(`nodes`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`boolean`
