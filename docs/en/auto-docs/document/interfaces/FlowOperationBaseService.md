# Interface: FlowOperationBaseService

## Hierarchy

* `Disposable`

  ↳ **`FlowOperationBaseService`**

## Table of contents

### Properties

* [onNodeAdd](/en/auto-docs/document/interfaces/FlowOperationBaseService.md#onnodeadd)
* [onNodeMove](/en/auto-docs/document/interfaces/FlowOperationBaseService.md#onnodemove)

### Methods

* [addBlock](/en/auto-docs/document/interfaces/FlowOperationBaseService.md#addblock)
* [addFromNode](/en/auto-docs/document/interfaces/FlowOperationBaseService.md#addfromnode)
* [addNode](/en/auto-docs/document/interfaces/FlowOperationBaseService.md#addnode)
* [apply](/en/auto-docs/document/interfaces/FlowOperationBaseService.md#apply)
* [deleteNode](/en/auto-docs/document/interfaces/FlowOperationBaseService.md#deletenode)
* [deleteNodes](/en/auto-docs/document/interfaces/FlowOperationBaseService.md#deletenodes)
* [dispose](/en/auto-docs/document/interfaces/FlowOperationBaseService.md#dispose)
* [dragNodes](/en/auto-docs/document/interfaces/FlowOperationBaseService.md#dragnodes)
* [moveNode](/en/auto-docs/document/interfaces/FlowOperationBaseService.md#movenode)

## Properties

### onNodeAdd

**onNodeAdd**: `Event`<[`OnNodeAddEvent`](/en/auto-docs/document/interfaces/OnNodeAddEvent.md)>

添加节点的回调

***

### onNodeMove

**onNodeMove**: `Event`<[`OnNodeMoveEvent`](/en/auto-docs/document/interfaces/OnNodeMoveEvent.md)>

节点移动的回调

## Methods

### addBlock

**addBlock**(`target`, `blockJSON`, `config?`): [`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)

添加块（分支）

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | [`FlowNodeEntityOrId`](/en/auto-docs/document/types/FlowNodeEntityOrId.md) | 目标 |
| `blockJSON` | [`FlowNodeJSON`](/en/auto-docs/document/interfaces/FlowNodeJSON.md) | 块数据 |
| `config?` | [`AddBlockConfig`](/en/auto-docs/document/interfaces/AddBlockConfig.md) | 配置 |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)

***

### addFromNode

**addFromNode**(`fromNode`, `nodeJSON`): [`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)

基于某一个起始节点往后面添加

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fromNode` | [`FlowNodeEntityOrId`](/en/auto-docs/document/types/FlowNodeEntityOrId.md) | 起始节点 |
| `nodeJSON` | [`FlowNodeJSON`](/en/auto-docs/document/interfaces/FlowNodeJSON.md) | 添加的节点JSON |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)

***

### addNode

**addNode**(`nodeJSON`, `config?`): [`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)

添加节点，如果节点已经存在则不会重复创建

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeJSON` | [`FlowNodeJSON`](/en/auto-docs/document/interfaces/FlowNodeJSON.md) | 节点数据 |
| `config?` | [`AddNodeConfig`](/en/auto-docs/document/types/AddNodeConfig.md) | 配置 |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)

成功添加的节点

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

***

### deleteNode

**deleteNode**(`node`): `void`

删除节点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntityOrId`](/en/auto-docs/document/types/FlowNodeEntityOrId.md) | 节点 |

#### Returns

`void`

***

### deleteNodes

**deleteNodes**(`nodes`): `void`

批量删除节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`FlowNodeEntityOrId`](/en/auto-docs/document/types/FlowNodeEntityOrId.md)\[] |

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

Disposable.dispose

***

### dragNodes

**dragNodes**(`param0`): `void`

拖拽节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `param0` | `Object` |
| `param0.dropNode` | [`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md) |
| `param0.nodes` | [`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`void`

***

### moveNode

**moveNode**(`node`, `config?`): `void`

移动节点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntityOrId`](/en/auto-docs/document/types/FlowNodeEntityOrId.md) | 被移动的节点 |
| `config?` | [`MoveNodeConfig`](/en/auto-docs/document/interfaces/MoveNodeConfig.md) | 移动节点配置 |

#### Returns

`void`
