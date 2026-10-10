# Interface: WorkflowOperationBaseService

## Hierarchy

* `FlowOperationBaseService`

  ↳ **`WorkflowOperationBaseService`**

## Table of contents

### Properties

* [onNodeAdd](/auto-docs/free-layout-core/interfaces/WorkflowOperationBaseService.md#onnodeadd)
* [onNodeMove](/auto-docs/free-layout-core/interfaces/WorkflowOperationBaseService.md#onnodemove)
* [onNodePostionUpdate](/auto-docs/free-layout-core/interfaces/WorkflowOperationBaseService.md#onnodepostionupdate)

### Methods

* [addBlock](/auto-docs/free-layout-core/interfaces/WorkflowOperationBaseService.md#addblock)
* [addFromNode](/auto-docs/free-layout-core/interfaces/WorkflowOperationBaseService.md#addfromnode)
* [addNode](/auto-docs/free-layout-core/interfaces/WorkflowOperationBaseService.md#addnode)
* [apply](/auto-docs/free-layout-core/interfaces/WorkflowOperationBaseService.md#apply)
* [deleteNode](/auto-docs/free-layout-core/interfaces/WorkflowOperationBaseService.md#deletenode)
* [deleteNodes](/auto-docs/free-layout-core/interfaces/WorkflowOperationBaseService.md#deletenodes)
* [dispose](/auto-docs/free-layout-core/interfaces/WorkflowOperationBaseService.md#dispose)
* [dragNodes](/auto-docs/free-layout-core/interfaces/WorkflowOperationBaseService.md#dragnodes)
* [fromJSON](/auto-docs/free-layout-core/interfaces/WorkflowOperationBaseService.md#fromjson)
* [moveNode](/auto-docs/free-layout-core/interfaces/WorkflowOperationBaseService.md#movenode)
* [updateNodePosition](/auto-docs/free-layout-core/interfaces/WorkflowOperationBaseService.md#updatenodeposition)

## Properties

### onNodeAdd

**onNodeAdd**: `Event`<`OnNodeAddEvent`>

添加节点的回调

#### Inherited from

FlowOperationBaseService.onNodeAdd

***

### onNodeMove

**onNodeMove**: `Event`<`OnNodeMoveEvent`>

节点移动的回调

#### Inherited from

FlowOperationBaseService.onNodeMove

***

### onNodePostionUpdate

`Readonly` **onNodePostionUpdate**: `Event`<[`NodePostionUpdateEvent`](/auto-docs/free-layout-core/interfaces/NodePostionUpdateEvent.md)>

节点位置更新事件

## Methods

### addBlock

**addBlock**(`target`, `blockJSON`, `config?`): `FlowNodeEntity`

添加块（分支）

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `FlowNodeEntityOrId` | 目标 |
| `blockJSON` | `FlowNodeJSON` | 块数据 |
| `config?` | `AddBlockConfig` | 配置 |

#### Returns

`FlowNodeEntity`

#### Inherited from

FlowOperationBaseService.addBlock

***

### addFromNode

**addFromNode**(`fromNode`, `nodeJSON`): `FlowNodeEntity`

基于某一个起始节点往后面添加

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fromNode` | `FlowNodeEntityOrId` | 起始节点 |
| `nodeJSON` | `FlowNodeJSON` | 添加的节点JSON |

#### Returns

`FlowNodeEntity`

#### Inherited from

FlowOperationBaseService.addFromNode

***

### addNode

**addNode**(`nodeJSON`, `config?`): `FlowNodeEntity`

添加节点，如果节点已经存在则不会重复创建

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeJSON` | `FlowNodeJSON` | 节点数据 |
| `config?` | `AddNodeConfig` | 配置 |

#### Returns

`FlowNodeEntity`

成功添加的节点

#### Inherited from

FlowOperationBaseService.addNode

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

#### Inherited from

FlowOperationBaseService.apply

***

### deleteNode

**deleteNode**(`node`): `void`

删除节点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `FlowNodeEntityOrId` | 节点 |

#### Returns

`void`

#### Inherited from

FlowOperationBaseService.deleteNode

***

### deleteNodes

**deleteNodes**(`nodes`): `void`

批量删除节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | `FlowNodeEntityOrId`\[] |

#### Returns

`void`

#### Inherited from

FlowOperationBaseService.deleteNodes

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

FlowOperationBaseService.dispose

***

### dragNodes

**dragNodes**(`param0`): `void`

拖拽节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `param0` | `Object` |
| `param0.dropNode` | `FlowNodeEntity` |
| `param0.nodes` | `FlowNodeEntity`\[] |

#### Returns

`void`

#### Inherited from

FlowOperationBaseService.dragNodes

***

### fromJSON

**fromJSON**(`json`): `void`

更新节点与线条

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`WorkflowJSON`](/auto-docs/free-layout-core/interfaces/WorkflowJSON.md) |

#### Returns

`void`

***

### moveNode

**moveNode**(`node`, `config?`): `void`

移动节点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `FlowNodeEntityOrId` | 被移动的节点 |
| `config?` | `MoveNodeConfig` | 移动节点配置 |

#### Returns

`void`

#### Inherited from

FlowOperationBaseService.moveNode

***

### updateNodePosition

**updateNodePosition**(`nodeOrId`, `position`): `void`

更新节点位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeOrId` | `FlowNodeEntityOrId` |
| `position` | `IPoint` |

#### Returns

`void`
