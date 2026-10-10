# Class: FlowOperationBaseServiceImpl

操作服务

## Implements

* [`FlowOperationBaseService`](/en/auto-docs/document/variables/FlowOperationBaseService-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/document/classes/FlowOperationBaseServiceImpl.md#constructor)

### Properties

* [onNodeAdd](/en/auto-docs/document/classes/FlowOperationBaseServiceImpl.md#onnodeadd)
* [onNodeMove](/en/auto-docs/document/classes/FlowOperationBaseServiceImpl.md#onnodemove)

### Methods

* [addBlock](/en/auto-docs/document/classes/FlowOperationBaseServiceImpl.md#addblock)
* [addFromNode](/en/auto-docs/document/classes/FlowOperationBaseServiceImpl.md#addfromnode)
* [addNode](/en/auto-docs/document/classes/FlowOperationBaseServiceImpl.md#addnode)
* [apply](/en/auto-docs/document/classes/FlowOperationBaseServiceImpl.md#apply)
* [deleteNode](/en/auto-docs/document/classes/FlowOperationBaseServiceImpl.md#deletenode)
* [deleteNodes](/en/auto-docs/document/classes/FlowOperationBaseServiceImpl.md#deletenodes)
* [dispose](/en/auto-docs/document/classes/FlowOperationBaseServiceImpl.md#dispose)
* [dragNodes](/en/auto-docs/document/classes/FlowOperationBaseServiceImpl.md#dragnodes)
* [moveNode](/en/auto-docs/document/classes/FlowOperationBaseServiceImpl.md#movenode)
* [transact](/en/auto-docs/document/classes/FlowOperationBaseServiceImpl.md#transact)

## Constructors

### constructor

**new FlowOperationBaseServiceImpl**()

## Properties

### onNodeAdd

`Readonly` **onNodeAdd**: `Event`<[`OnNodeAddEvent`](/en/auto-docs/document/interfaces/OnNodeAddEvent.md)>

#### Implementation of

FlowOperationBaseService.onNodeAdd

***

### onNodeMove

`Readonly` **onNodeMove**: `Event`<[`OnNodeMoveEvent`](/en/auto-docs/document/interfaces/OnNodeMoveEvent.md)>

#### Implementation of

FlowOperationBaseService.onNodeMove

## Methods

### addBlock

**addBlock**(`target`, `blockJSON`, `config?`): [`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`FlowNodeEntityOrId`](/en/auto-docs/document/types/FlowNodeEntityOrId.md) |
| `blockJSON` | [`FlowNodeJSON`](/en/auto-docs/document/interfaces/FlowNodeJSON.md) |
| `config` | [`AddBlockConfig`](/en/auto-docs/document/interfaces/AddBlockConfig.md) |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)

#### Implementation of

FlowOperationBaseService.addBlock

***

### addFromNode

**addFromNode**(`fromNode`, `nodeJSON`): [`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | [`FlowNodeEntityOrId`](/en/auto-docs/document/types/FlowNodeEntityOrId.md) |
| `nodeJSON` | [`FlowNodeJSON`](/en/auto-docs/document/interfaces/FlowNodeJSON.md) |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)

#### Implementation of

FlowOperationBaseService.addFromNode

***

### addNode

**addNode**(`nodeJSON`, `config?`): [`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeJSON` | [`FlowNodeJSON`](/en/auto-docs/document/interfaces/FlowNodeJSON.md) |
| `config` | [`AddNodeConfig`](/en/auto-docs/document/types/AddNodeConfig.md) |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)

#### Implementation of

FlowOperationBaseService.addNode

***

### apply

**apply**(`operation`): `any`

执行操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`FlowOperation`](/en/auto-docs/document/types/FlowOperation.md) | 可序列化的操作 |

#### Returns

`any`

操作返回

#### Implementation of

FlowOperationBaseService.apply

***

### deleteNode

**deleteNode**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntityOrId`](/en/auto-docs/document/types/FlowNodeEntityOrId.md) |

#### Returns

`void`

#### Implementation of

FlowOperationBaseService.deleteNode

***

### deleteNodes

**deleteNodes**(`nodes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`FlowNodeEntityOrId`](/en/auto-docs/document/types/FlowNodeEntityOrId.md)\[] |

#### Returns

`void`

#### Implementation of

FlowOperationBaseService.deleteNodes

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

FlowOperationBaseService.dispose

***

### dragNodes

**dragNodes**(`param0`): `any`

拖拽节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `param0` | `Object` |
| `param0.dropNode` | [`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md) |
| `param0.nodes` | [`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`any`

#### Implementation of

FlowOperationBaseService.dragNodes

***

### moveNode

**moveNode**(`node`, `config?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntityOrId`](/en/auto-docs/document/types/FlowNodeEntityOrId.md) |
| `config` | [`MoveNodeConfig`](/en/auto-docs/document/interfaces/MoveNodeConfig.md) |

#### Returns

`void`

#### Implementation of

FlowOperationBaseService.moveNode

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
