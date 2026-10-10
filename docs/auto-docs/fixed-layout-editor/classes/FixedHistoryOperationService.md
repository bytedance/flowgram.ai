# Class: FixedHistoryOperationService

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`FlowOperationBaseServiceImpl`](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md)

  ↳ **`FixedHistoryOperationService`**

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#constructor)

### Properties

* [historyService](/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#historyservice)
* [onNodeAdd](/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#onnodeadd)
* [onNodeMove](/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#onnodemove)

### Methods

* [addBlock](/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#addblock)
* [addFromNode](/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#addfromnode)
* [addNode](/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#addnode)
* [apply](/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#apply)
* [deleteNode](/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#deletenode)
* [deleteNodes](/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#deletenodes)
* [dispose](/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#dispose)
* [dragNodes](/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#dragnodes)
* [moveNode](/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#movenode)
* [originApply](/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#originapply)
* [transact](/auto-docs/fixed-layout-editor/classes/FixedHistoryOperationService.md#transact)

## Constructors

### constructor

**new FixedHistoryOperationService**()

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[constructor](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#constructor)

## Properties

### historyService

**historyService**: [`HistoryService`](/auto-docs/fixed-layout-editor/classes/HistoryService.md)

***

### onNodeAdd

`Readonly` **onNodeAdd**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`OnNodeAddEvent`](/auto-docs/fixed-layout-editor/interfaces/OnNodeAddEvent.md)>

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[onNodeAdd](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#onnodeadd)

***

### onNodeMove

`Readonly` **onNodeMove**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`OnNodeMoveEvent`](/auto-docs/fixed-layout-editor/interfaces/OnNodeMoveEvent.md)>

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[onNodeMove](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#onnodemove)

## Methods

### addBlock

**addBlock**(`target`, `blockJSON`, `config?`): [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`FlowNodeEntityOrId`](/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md) |
| `blockJSON` | [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) |
| `config?` | [`AddBlockConfig`](/auto-docs/fixed-layout-editor/interfaces/AddBlockConfig.md) |

#### Returns

[`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[addBlock](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#addblock)

***

### addFromNode

**addFromNode**(`fromNode`, `nodeJSON`): [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | [`FlowNodeEntityOrId`](/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md) |
| `nodeJSON` | [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) |

#### Returns

[`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[addFromNode](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#addfromnode)

***

### addNode

**addNode**(`nodeJSON`, `config?`): [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeJSON` | [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) |
| `config?` | [`AddNodeConfig`](/auto-docs/fixed-layout-editor/types/AddNodeConfig.md) |

#### Returns

[`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[addNode](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#addnode)

***

### apply

**apply**(`operation`): `any`

执行操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`FlowOperation`](/auto-docs/fixed-layout-editor/types/FlowOperation.md) | 可序列化的操作 |

#### Returns

`any`

操作返回

#### Overrides

[FlowOperationBaseServiceImpl](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[apply](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#apply)

***

### deleteNode

**deleteNode**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntityOrId`](/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md) |

#### Returns

`void`

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[deleteNode](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#deletenode)

***

### deleteNodes

**deleteNodes**(`nodes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`FlowNodeEntityOrId`](/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md)\[] |

#### Returns

`void`

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[deleteNodes](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#deletenodes)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[dispose](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#dispose)

***

### dragNodes

**dragNodes**(`param0`): `any`

拖拽节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `param0` | `Object` |
| `param0.dropNode` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `param0.nodes` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`any`

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[dragNodes](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#dragnodes)

***

### moveNode

**moveNode**(`node`, `config?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntityOrId`](/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md) |
| `config?` | [`MoveNodeConfig`](/auto-docs/fixed-layout-editor/interfaces/MoveNodeConfig.md) |

#### Returns

`void`

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[moveNode](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#movenode)

***

### originApply

**originApply**(`operation`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operation` | [`FlowOperation`](/auto-docs/fixed-layout-editor/types/FlowOperation.md) |

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

[FlowOperationBaseServiceImpl](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md).[transact](/auto-docs/fixed-layout-editor/classes/FlowOperationBaseServiceImpl.md#transact)
