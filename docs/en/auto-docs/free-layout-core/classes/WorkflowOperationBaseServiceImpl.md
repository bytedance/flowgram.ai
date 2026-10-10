# Class: WorkflowOperationBaseServiceImpl

## Hierarchy

* `FlowOperationBaseServiceImpl`

  ↳ **`WorkflowOperationBaseServiceImpl`**

## Implements

* [`WorkflowOperationBaseService`](/en/auto-docs/free-layout-core/variables/WorkflowOperationBaseService-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-core/classes/WorkflowOperationBaseServiceImpl.md#constructor)

### Properties

* [linesManager](/en/auto-docs/free-layout-core/classes/WorkflowOperationBaseServiceImpl.md#linesmanager)
* [onNodeAdd](/en/auto-docs/free-layout-core/classes/WorkflowOperationBaseServiceImpl.md#onnodeadd)
* [onNodeMove](/en/auto-docs/free-layout-core/classes/WorkflowOperationBaseServiceImpl.md#onnodemove)
* [onNodePostionUpdate](/en/auto-docs/free-layout-core/classes/WorkflowOperationBaseServiceImpl.md#onnodepostionupdate)

### Methods

* [addBlock](/en/auto-docs/free-layout-core/classes/WorkflowOperationBaseServiceImpl.md#addblock)
* [addFromNode](/en/auto-docs/free-layout-core/classes/WorkflowOperationBaseServiceImpl.md#addfromnode)
* [addNode](/en/auto-docs/free-layout-core/classes/WorkflowOperationBaseServiceImpl.md#addnode)
* [apply](/en/auto-docs/free-layout-core/classes/WorkflowOperationBaseServiceImpl.md#apply)
* [deleteNode](/en/auto-docs/free-layout-core/classes/WorkflowOperationBaseServiceImpl.md#deletenode)
* [deleteNodes](/en/auto-docs/free-layout-core/classes/WorkflowOperationBaseServiceImpl.md#deletenodes)
* [dispose](/en/auto-docs/free-layout-core/classes/WorkflowOperationBaseServiceImpl.md#dispose)
* [dragNodes](/en/auto-docs/free-layout-core/classes/WorkflowOperationBaseServiceImpl.md#dragnodes)
* [fromJSON](/en/auto-docs/free-layout-core/classes/WorkflowOperationBaseServiceImpl.md#fromjson)
* [moveNode](/en/auto-docs/free-layout-core/classes/WorkflowOperationBaseServiceImpl.md#movenode)
* [transact](/en/auto-docs/free-layout-core/classes/WorkflowOperationBaseServiceImpl.md#transact)
* [updateNodePosition](/en/auto-docs/free-layout-core/classes/WorkflowOperationBaseServiceImpl.md#updatenodeposition)

## Constructors

### constructor

**new WorkflowOperationBaseServiceImpl**()

#### Inherited from

FlowOperationBaseServiceImpl.constructor

## Properties

### linesManager

**linesManager**: [`WorkflowLinesManager`](/en/auto-docs/free-layout-core/classes/WorkflowLinesManager.md)

***

### onNodeAdd

`Readonly` **onNodeAdd**: `Event`<`OnNodeAddEvent`>

#### Implementation of

WorkflowOperationBaseService.onNodeAdd

#### Inherited from

FlowOperationBaseServiceImpl.onNodeAdd

***

### onNodeMove

`Readonly` **onNodeMove**: `Event`<`OnNodeMoveEvent`>

#### Implementation of

WorkflowOperationBaseService.onNodeMove

#### Inherited from

FlowOperationBaseServiceImpl.onNodeMove

***

### onNodePostionUpdate

`Readonly` **onNodePostionUpdate**: `Event`<[`NodePostionUpdateEvent`](/en/auto-docs/free-layout-core/interfaces/NodePostionUpdateEvent.md)>

#### Implementation of

WorkflowOperationBaseService.onNodePostionUpdate

## Methods

### addBlock

**addBlock**(`target`, `blockJSON`, `config?`): `FlowNodeEntity`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `FlowNodeEntityOrId` |
| `blockJSON` | `FlowNodeJSON` |
| `config?` | `AddBlockConfig` |

#### Returns

`FlowNodeEntity`

#### Implementation of

WorkflowOperationBaseService.addBlock

#### Inherited from

FlowOperationBaseServiceImpl.addBlock

***

### addFromNode

**addFromNode**(`fromNode`, `nodeJSON`): `FlowNodeEntity`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | `FlowNodeEntityOrId` |
| `nodeJSON` | `FlowNodeJSON` |

#### Returns

`FlowNodeEntity`

#### Implementation of

WorkflowOperationBaseService.addFromNode

#### Inherited from

FlowOperationBaseServiceImpl.addFromNode

***

### addNode

**addNode**(`nodeJSON`, `config?`): `FlowNodeEntity`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeJSON` | `FlowNodeJSON` |
| `config?` | `AddNodeConfig` |

#### Returns

`FlowNodeEntity`

#### Implementation of

WorkflowOperationBaseService.addNode

#### Inherited from

FlowOperationBaseServiceImpl.addNode

***

### apply

**apply**(`operation`): `any`

执行操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | `FlowOperation` | 可序列化的操作 |

#### Returns

`any`

操作返回

#### Implementation of

WorkflowOperationBaseService.apply

#### Inherited from

FlowOperationBaseServiceImpl.apply

***

### deleteNode

**deleteNode**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntityOrId` |

#### Returns

`void`

#### Implementation of

WorkflowOperationBaseService.deleteNode

#### Inherited from

FlowOperationBaseServiceImpl.deleteNode

***

### deleteNodes

**deleteNodes**(`nodes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | `FlowNodeEntityOrId`\[] |

#### Returns

`void`

#### Implementation of

WorkflowOperationBaseService.deleteNodes

#### Inherited from

FlowOperationBaseServiceImpl.deleteNodes

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

WorkflowOperationBaseService.dispose

#### Inherited from

FlowOperationBaseServiceImpl.dispose

***

### dragNodes

**dragNodes**(`param0`): `any`

拖拽节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `param0` | `Object` |
| `param0.dropNode` | `FlowNodeEntity` |
| `param0.nodes` | `FlowNodeEntity`\[] |

#### Returns

`any`

#### Implementation of

WorkflowOperationBaseService.dragNodes

#### Inherited from

FlowOperationBaseServiceImpl.dragNodes

***

### fromJSON

**fromJSON**(`json`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`WorkflowJSON`](/en/auto-docs/free-layout-core/interfaces/WorkflowJSON.md) |

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
| `node` | `FlowNodeEntityOrId` |
| `config?` | `MoveNodeConfig` |

#### Returns

`void`

#### Implementation of

WorkflowOperationBaseService.moveNode

#### Inherited from

FlowOperationBaseServiceImpl.moveNode

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

FlowOperationBaseServiceImpl.transact

***

### updateNodePosition

**updateNodePosition**(`nodeOrId`, `position`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeOrId` | `FlowNodeEntityOrId` |
| `position` | `IPoint` |

#### Returns

`void`

#### Implementation of

WorkflowOperationBaseService.updateNodePosition
