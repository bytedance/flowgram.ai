# Class: FlowOperationBaseServiceImpl

操作服务

## Implements

* [`FlowOperationBaseService`](/auto-docs/editor/variables/FlowOperationBaseService-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/FlowOperationBaseServiceImpl.md#constructor)

### Properties

* [onNodeAdd](/auto-docs/editor/classes/FlowOperationBaseServiceImpl.md#onnodeadd)
* [onNodeMove](/auto-docs/editor/classes/FlowOperationBaseServiceImpl.md#onnodemove)

### Methods

* [addBlock](/auto-docs/editor/classes/FlowOperationBaseServiceImpl.md#addblock)
* [addFromNode](/auto-docs/editor/classes/FlowOperationBaseServiceImpl.md#addfromnode)
* [addNode](/auto-docs/editor/classes/FlowOperationBaseServiceImpl.md#addnode)
* [apply](/auto-docs/editor/classes/FlowOperationBaseServiceImpl.md#apply)
* [deleteNode](/auto-docs/editor/classes/FlowOperationBaseServiceImpl.md#deletenode)
* [deleteNodes](/auto-docs/editor/classes/FlowOperationBaseServiceImpl.md#deletenodes)
* [dispose](/auto-docs/editor/classes/FlowOperationBaseServiceImpl.md#dispose)
* [dragNodes](/auto-docs/editor/classes/FlowOperationBaseServiceImpl.md#dragnodes)
* [moveNode](/auto-docs/editor/classes/FlowOperationBaseServiceImpl.md#movenode)
* [transact](/auto-docs/editor/classes/FlowOperationBaseServiceImpl.md#transact)

## Constructors

### constructor

**new FlowOperationBaseServiceImpl**()

## Properties

### onNodeAdd

`Readonly` **onNodeAdd**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`OnNodeAddEvent`](/auto-docs/editor/interfaces/OnNodeAddEvent.md)>

#### Implementation of

FlowOperationBaseService.onNodeAdd

***

### onNodeMove

`Readonly` **onNodeMove**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`OnNodeMoveEvent`](/auto-docs/editor/interfaces/OnNodeMoveEvent.md)>

#### Implementation of

FlowOperationBaseService.onNodeMove

## Methods

### addBlock

**addBlock**(`target`, `blockJSON`, `config?`): [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`FlowNodeEntityOrId`](/auto-docs/editor/types/FlowNodeEntityOrId.md) |
| `blockJSON` | [`FlowNodeJSON`](/auto-docs/editor/interfaces/FlowNodeJSON.md) |
| `config?` | [`AddBlockConfig`](/auto-docs/editor/interfaces/AddBlockConfig.md) |

#### Returns

[`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)

#### Implementation of

FlowOperationBaseService.addBlock

***

### addFromNode

**addFromNode**(`fromNode`, `nodeJSON`): [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | [`FlowNodeEntityOrId`](/auto-docs/editor/types/FlowNodeEntityOrId.md) |
| `nodeJSON` | [`FlowNodeJSON`](/auto-docs/editor/interfaces/FlowNodeJSON.md) |

#### Returns

[`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)

#### Implementation of

FlowOperationBaseService.addFromNode

***

### addNode

**addNode**(`nodeJSON`, `config?`): [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeJSON` | [`FlowNodeJSON`](/auto-docs/editor/interfaces/FlowNodeJSON.md) |
| `config?` | [`AddNodeConfig`](/auto-docs/editor/types/AddNodeConfig.md) |

#### Returns

[`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)

#### Implementation of

FlowOperationBaseService.addNode

***

### apply

**apply**(`operation`): `any`

执行操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`FlowOperation`](/auto-docs/editor/types/FlowOperation.md) | 可序列化的操作 |

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
| `node` | [`FlowNodeEntityOrId`](/auto-docs/editor/types/FlowNodeEntityOrId.md) |

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
| `nodes` | [`FlowNodeEntityOrId`](/auto-docs/editor/types/FlowNodeEntityOrId.md)\[] |

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
| `param0.dropNode` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md) |
| `param0.nodes` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)\[] |

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
| `node` | [`FlowNodeEntityOrId`](/auto-docs/editor/types/FlowNodeEntityOrId.md) |
| `config?` | [`MoveNodeConfig`](/auto-docs/editor/interfaces/MoveNodeConfig.md) |

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
