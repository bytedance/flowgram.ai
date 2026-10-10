# Class: WorkflowOperationBaseServiceImpl

操作服务

## Hierarchy

* [`FlowOperationBaseServiceImpl`](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md)

  ↳ **`WorkflowOperationBaseServiceImpl`**

## Implements

* [`WorkflowOperationBaseService`](/en/auto-docs/free-layout-editor/variables/WorkflowOperationBaseService-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#constructor)

### Properties

* [linesManager](/en/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#linesmanager)
* [onNodeAdd](/en/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#onnodeadd)
* [onNodeMove](/en/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#onnodemove)
* [onNodePostionUpdate](/en/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#onnodepostionupdate)

### Methods

* [addBlock](/en/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#addblock)
* [addFromNode](/en/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#addfromnode)
* [addNode](/en/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#addnode)
* [apply](/en/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#apply)
* [deleteNode](/en/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#deletenode)
* [deleteNodes](/en/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#deletenodes)
* [dispose](/en/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#dispose)
* [dragNodes](/en/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#dragnodes)
* [fromJSON](/en/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#fromjson)
* [moveNode](/en/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#movenode)
* [transact](/en/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#transact)
* [updateNodePosition](/en/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#updatenodeposition)

## Constructors

### constructor

**new WorkflowOperationBaseServiceImpl**()

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[constructor](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#constructor)

## Properties

### linesManager

**linesManager**: [`WorkflowLinesManager`](/en/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md)

***

### onNodeAdd

`Readonly` **onNodeAdd**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`OnNodeAddEvent`](/en/auto-docs/free-layout-editor/interfaces/OnNodeAddEvent.md)>

#### Implementation of

WorkflowOperationBaseService.onNodeAdd

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[onNodeAdd](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#onnodeadd)

***

### onNodeMove

`Readonly` **onNodeMove**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`OnNodeMoveEvent`](/en/auto-docs/free-layout-editor/interfaces/OnNodeMoveEvent.md)>

#### Implementation of

WorkflowOperationBaseService.onNodeMove

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[onNodeMove](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#onnodemove)

***

### onNodePostionUpdate

`Readonly` **onNodePostionUpdate**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`NodePostionUpdateEvent`](/en/auto-docs/free-layout-editor/interfaces/NodePostionUpdateEvent.md)>

#### Implementation of

WorkflowOperationBaseService.onNodePostionUpdate

## Methods

### addBlock

**addBlock**(`target`, `blockJSON`, `config?`): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`FlowNodeEntityOrId`](/en/auto-docs/free-layout-editor/types/FlowNodeEntityOrId.md) |
| `blockJSON` | [`FlowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) |
| `config?` | [`AddBlockConfig`](/en/auto-docs/free-layout-editor/interfaces/AddBlockConfig.md) |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Implementation of

WorkflowOperationBaseService.addBlock

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[addBlock](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#addblock)

***

### addFromNode

**addFromNode**(`fromNode`, `nodeJSON`): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | [`FlowNodeEntityOrId`](/en/auto-docs/free-layout-editor/types/FlowNodeEntityOrId.md) |
| `nodeJSON` | [`FlowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Implementation of

WorkflowOperationBaseService.addFromNode

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[addFromNode](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#addfromnode)

***

### addNode

**addNode**(`nodeJSON`, `config?`): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeJSON` | [`FlowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) |
| `config?` | [`AddNodeConfig`](/en/auto-docs/free-layout-editor/types/AddNodeConfig.md) |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Implementation of

WorkflowOperationBaseService.addNode

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[addNode](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#addnode)

***

### apply

**apply**(`operation`): `any`

执行操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`FlowOperation`](/en/auto-docs/free-layout-editor/types/FlowOperation.md) | 可序列化的操作 |

#### Returns

`any`

操作返回

#### Implementation of

WorkflowOperationBaseService.apply

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[apply](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#apply)

***

### deleteNode

**deleteNode**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntityOrId`](/en/auto-docs/free-layout-editor/types/FlowNodeEntityOrId.md) |

#### Returns

`void`

#### Implementation of

WorkflowOperationBaseService.deleteNode

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[deleteNode](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#deletenode)

***

### deleteNodes

**deleteNodes**(`nodes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`FlowNodeEntityOrId`](/en/auto-docs/free-layout-editor/types/FlowNodeEntityOrId.md)\[] |

#### Returns

`void`

#### Implementation of

WorkflowOperationBaseService.deleteNodes

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[deleteNodes](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#deletenodes)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

WorkflowOperationBaseService.dispose

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[dispose](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#dispose)

***

### dragNodes

**dragNodes**(`param0`): `any`

拖拽节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `param0` | `Object` |
| `param0.dropNode` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `param0.nodes` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`any`

#### Implementation of

WorkflowOperationBaseService.dragNodes

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[dragNodes](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#dragnodes)

***

### fromJSON

**fromJSON**(`json`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`WorkflowJSON`](/en/auto-docs/free-layout-editor/interfaces/WorkflowJSON.md) |

#### Returns

`void`

#### Implementation of

WorkflowOperationBaseService.fromJSON

***

### moveNode

**moveNode**(`node`, `config?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntityOrId`](/en/auto-docs/free-layout-editor/types/FlowNodeEntityOrId.md) |
| `config?` | [`MoveNodeConfig`](/en/auto-docs/free-layout-editor/interfaces/MoveNodeConfig.md) |

#### Returns

`void`

#### Implementation of

WorkflowOperationBaseService.moveNode

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[moveNode](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#movenode)

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

#### Inherited from

[FlowOperationBaseServiceImpl](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[transact](/en/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#transact)

***

### updateNodePosition

**updateNodePosition**(`nodeOrId`, `position`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeOrId` | [`FlowNodeEntityOrId`](/en/auto-docs/free-layout-editor/types/FlowNodeEntityOrId.md) |
| `position` | [`IPoint`](/en/auto-docs/free-layout-editor/interfaces/IPoint.md) |

#### Returns

`void`

#### Implementation of

WorkflowOperationBaseService.updateNodePosition
