# Class: WorkflowOperationBaseServiceImpl

操作服务

## Hierarchy

* [`FlowOperationBaseServiceImpl`](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md)

  ↳ **`WorkflowOperationBaseServiceImpl`**

## Implements

* [`WorkflowOperationBaseService`](/auto-docs/free-layout-editor/variables/WorkflowOperationBaseService-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#constructor)

### Properties

* [linesManager](/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#linesmanager)
* [onNodeAdd](/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#onnodeadd)
* [onNodeMove](/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#onnodemove)
* [onNodePostionUpdate](/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#onnodepostionupdate)

### Methods

* [addBlock](/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#addblock)
* [addFromNode](/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#addfromnode)
* [addNode](/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#addnode)
* [apply](/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#apply)
* [deleteNode](/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#deletenode)
* [deleteNodes](/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#deletenodes)
* [dispose](/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#dispose)
* [dragNodes](/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#dragnodes)
* [fromJSON](/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#fromjson)
* [moveNode](/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#movenode)
* [transact](/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#transact)
* [updateNodePosition](/auto-docs/free-layout-editor/classes/WorkflowOperationBaseServiceImpl.md#updatenodeposition)

## Constructors

### constructor

**new WorkflowOperationBaseServiceImpl**()

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[constructor](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#constructor)

## Properties

### linesManager

**linesManager**: [`WorkflowLinesManager`](/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md)

***

### onNodeAdd

`Readonly` **onNodeAdd**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`OnNodeAddEvent`](/auto-docs/free-layout-editor/interfaces/OnNodeAddEvent.md)>

#### Implementation of

WorkflowOperationBaseService.onNodeAdd

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[onNodeAdd](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#onnodeadd)

***

### onNodeMove

`Readonly` **onNodeMove**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`OnNodeMoveEvent`](/auto-docs/free-layout-editor/interfaces/OnNodeMoveEvent.md)>

#### Implementation of

WorkflowOperationBaseService.onNodeMove

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[onNodeMove](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#onnodemove)

***

### onNodePostionUpdate

`Readonly` **onNodePostionUpdate**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`NodePostionUpdateEvent`](/auto-docs/free-layout-editor/interfaces/NodePostionUpdateEvent.md)>

#### Implementation of

WorkflowOperationBaseService.onNodePostionUpdate

## Methods

### addBlock

**addBlock**(`target`, `blockJSON`, `config?`): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`FlowNodeEntityOrId`](/auto-docs/free-layout-editor/types/FlowNodeEntityOrId.md) |
| `blockJSON` | [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) |
| `config?` | [`AddBlockConfig`](/auto-docs/free-layout-editor/interfaces/AddBlockConfig.md) |

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Implementation of

WorkflowOperationBaseService.addBlock

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[addBlock](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#addblock)

***

### addFromNode

**addFromNode**(`fromNode`, `nodeJSON`): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | [`FlowNodeEntityOrId`](/auto-docs/free-layout-editor/types/FlowNodeEntityOrId.md) |
| `nodeJSON` | [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) |

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Implementation of

WorkflowOperationBaseService.addFromNode

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[addFromNode](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#addfromnode)

***

### addNode

**addNode**(`nodeJSON`, `config?`): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeJSON` | [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) |
| `config?` | [`AddNodeConfig`](/auto-docs/free-layout-editor/types/AddNodeConfig.md) |

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Implementation of

WorkflowOperationBaseService.addNode

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[addNode](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#addnode)

***

### apply

**apply**(`operation`): `any`

执行操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`FlowOperation`](/auto-docs/free-layout-editor/types/FlowOperation.md) | 可序列化的操作 |

#### Returns

`any`

操作返回

#### Implementation of

WorkflowOperationBaseService.apply

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[apply](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#apply)

***

### deleteNode

**deleteNode**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntityOrId`](/auto-docs/free-layout-editor/types/FlowNodeEntityOrId.md) |

#### Returns

`void`

#### Implementation of

WorkflowOperationBaseService.deleteNode

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[deleteNode](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#deletenode)

***

### deleteNodes

**deleteNodes**(`nodes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`FlowNodeEntityOrId`](/auto-docs/free-layout-editor/types/FlowNodeEntityOrId.md)\[] |

#### Returns

`void`

#### Implementation of

WorkflowOperationBaseService.deleteNodes

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[deleteNodes](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#deletenodes)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

WorkflowOperationBaseService.dispose

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[dispose](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#dispose)

***

### dragNodes

**dragNodes**(`param0`): `any`

拖拽节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `param0` | `Object` |
| `param0.dropNode` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `param0.nodes` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`any`

#### Implementation of

WorkflowOperationBaseService.dragNodes

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[dragNodes](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#dragnodes)

***

### fromJSON

**fromJSON**(`json`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`WorkflowJSON`](/auto-docs/free-layout-editor/interfaces/WorkflowJSON.md) |

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
| `node` | [`FlowNodeEntityOrId`](/auto-docs/free-layout-editor/types/FlowNodeEntityOrId.md) |
| `config?` | [`MoveNodeConfig`](/auto-docs/free-layout-editor/interfaces/MoveNodeConfig.md) |

#### Returns

`void`

#### Implementation of

WorkflowOperationBaseService.moveNode

#### Inherited from

[FlowOperationBaseServiceImpl](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[moveNode](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#movenode)

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

[FlowOperationBaseServiceImpl](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md).[transact](/auto-docs/free-layout-editor/classes/FlowOperationBaseServiceImpl.md#transact)

***

### updateNodePosition

**updateNodePosition**(`nodeOrId`, `position`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeOrId` | [`FlowNodeEntityOrId`](/auto-docs/free-layout-editor/types/FlowNodeEntityOrId.md) |
| `position` | [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md) |

#### Returns

`void`

#### Implementation of

WorkflowOperationBaseService.updateNodePosition
