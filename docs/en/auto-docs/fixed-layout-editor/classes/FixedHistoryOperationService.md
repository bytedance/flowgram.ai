# Class: FixedHistoryOperationService

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`FlowOperationBaseServiceImpl`](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md)

  ↳ **`FixedHistoryOperationService`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#constructor)

### Properties

* [historyService](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#historyservice)
* [onNodeAdd](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#onnodeadd)
* [onNodeMove](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#onnodemove)

### Methods

* [addBlock](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#addblock)
* [addFromNode](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#addfromnode)
* [addNode](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#addnode)
* [apply](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#apply)
* [deleteNode](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#deletenode)
* [deleteNodes](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#deletenodes)
* [dispose](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#dispose)
* [dragNodes](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#dragnodes)
* [moveNode](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#movenode)
* [originApply](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#originapply)
* [transact](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#transact)

## Constructors

### constructor

**new FixedHistoryOperationService**()

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[constructor](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#constructor)

## Properties

### historyService

**historyService**: [`HistoryService`](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md)

***

### onNodeAdd

`Readonly` **onNodeAdd**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`OnNodeAddEvent`](/en/auto-docs/fixed-layout-editor/interfaces/OnNodeAddEvent.md)>

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[onNodeAdd](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#onnodeadd)

***

### onNodeMove

`Readonly` **onNodeMove**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`OnNodeMoveEvent`](/en/auto-docs/fixed-layout-editor/interfaces/OnNodeMoveEvent.md)>

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[onNodeMove](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#onnodemove)

## Methods

### addBlock

**addBlock**(`target`, `blockJSON`, `config?`): [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`FlowNodeEntityOrId`](/en/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md) |
| `blockJSON` | [`FlowNodeJSON`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) |
| `config?` | [`AddBlockConfig`](/en/auto-docs/fixed-layout-editor/interfaces/AddBlockConfig.md) |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[addBlock](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#addblock)

***

### addFromNode

**addFromNode**(`fromNode`, `nodeJSON`): [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | [`FlowNodeEntityOrId`](/en/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md) |
| `nodeJSON` | [`FlowNodeJSON`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[addFromNode](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#addfromnode)

***

### addNode

**addNode**(`nodeJSON`, `config?`): [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeJSON` | [`FlowNodeJSON`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) |
| `config?` | [`AddNodeConfig`](/en/auto-docs/fixed-layout-editor/types/AddNodeConfig.md) |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[addNode](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#addnode)

***

### apply

**apply**(`operation`): `any`

执行操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`FlowOperation`](/en/auto-docs/fixed-layout-editor/types/FlowOperation.md) | 可序列化的操作 |

#### Returns

`any`

操作返回

#### Overrides

[FlowOperationBaseServiceImpl](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[apply](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#apply)

***

### deleteNode

**deleteNode**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntityOrId`](/en/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md) |

#### Returns

`void`

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[deleteNode](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#deletenode)

***

### deleteNodes

**deleteNodes**(`nodes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`FlowNodeEntityOrId`](/en/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md)\[] |

#### Returns

`void`

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[deleteNodes](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#deletenodes)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[dispose](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#dispose)

***

### dragNodes

**dragNodes**(`param0`): `any`

拖拽节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `param0` | `Object` |
| `param0.dropNode` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `param0.nodes` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`any`

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[dragNodes](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#dragnodes)

***

### moveNode

**moveNode**(`node`, `config?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntityOrId`](/en/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md) |
| `config?` | [`MoveNodeConfig`](/en/auto-docs/fixed-layout-editor/interfaces/MoveNodeConfig.md) |

#### Returns

`void`

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[moveNode](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#movenode)

***

### originApply

**originApply**(`operation`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operation` | [`FlowOperation`](/en/auto-docs/fixed-layout-editor/types/FlowOperation.md) |

#### Returns

`any`

***

### transact

**transact**(`transaction`): `void`

事务执行

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | () => `void` |

#### Returns

`void`

#### Overrides

[FlowOperationBaseServiceImpl](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[transact](/en/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#transact)
