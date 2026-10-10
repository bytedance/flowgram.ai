# Class: FlowGroupService

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/FlowGroupService.md#constructor)

### Properties

* [entityManager](/en/auto-docs/free-layout-editor/classes/FlowGroupService.md#entitymanager)
* [operationService](/en/auto-docs/free-layout-editor/classes/FlowGroupService.md#operationservice)

### Methods

* [createGroup](/en/auto-docs/free-layout-editor/classes/FlowGroupService.md#creategroup)
* [deleteGroup](/en/auto-docs/free-layout-editor/classes/FlowGroupService.md#deletegroup)
* [getAllGroups](/en/auto-docs/free-layout-editor/classes/FlowGroupService.md#getallgroups)
* [groupController](/en/auto-docs/free-layout-editor/classes/FlowGroupService.md#groupcontroller)
* [ungroup](/en/auto-docs/free-layout-editor/classes/FlowGroupService.md#ungroup)
* [validate](/en/auto-docs/free-layout-editor/classes/FlowGroupService.md#validate)

## Constructors

### constructor

**new FlowGroupService**()

## Properties

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/en/auto-docs/free-layout-editor/classes/EntityManager.md)

***

### operationService

`Readonly` **operationService**: [`FlowOperationBaseService`](/en/auto-docs/free-layout-editor/variables/FlowOperationBaseService-1.md)

## Methods

### createGroup

**createGroup**(`nodes`): `undefined` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

创建分组节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`undefined` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

***

### deleteGroup

**deleteGroup**(`groupNode`): `void`

删除分组

#### Parameters

| Name | Type |
| :------ | :------ |
| `groupNode` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`void`

***

### getAllGroups

**getAllGroups**(): [`FlowGroupController`](/en/auto-docs/free-layout-editor/classes/FlowGroupController.md)\[]

返回所有分组节点

#### Returns

[`FlowGroupController`](/en/auto-docs/free-layout-editor/classes/FlowGroupController.md)\[]

***

### groupController

**groupController**(`group`): `undefined` | [`FlowGroupController`](/en/auto-docs/free-layout-editor/classes/FlowGroupController.md)

获取分组控制器

#### Parameters

| Name | Type |
| :------ | :------ |
| `group` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`undefined` | [`FlowGroupController`](/en/auto-docs/free-layout-editor/classes/FlowGroupController.md)

***

### ungroup

**ungroup**(`groupNode`): `void`

取消分组

#### Parameters

| Name | Type |
| :------ | :------ |
| `groupNode` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`void`

***

### validate

`Static` **validate**(`nodes`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`boolean`
