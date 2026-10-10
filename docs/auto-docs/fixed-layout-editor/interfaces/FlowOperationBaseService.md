# Interface: FlowOperationBaseService

An object that performs a cleanup operation when `.dispose()` is called.

Some examples of how disposables are used:

* An event listener that removes itself when `.dispose()` is called.
* The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.

## Hierarchy

* [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

  ↳ **`FlowOperationBaseService`**

## Table of contents

### Properties

* [onNodeAdd](/auto-docs/fixed-layout-editor/interfaces/FlowOperationBaseService.md#onnodeadd)
* [onNodeMove](/auto-docs/fixed-layout-editor/interfaces/FlowOperationBaseService.md#onnodemove)

### Methods

* [addBlock](/auto-docs/fixed-layout-editor/interfaces/FlowOperationBaseService.md#addblock)
* [addFromNode](/auto-docs/fixed-layout-editor/interfaces/FlowOperationBaseService.md#addfromnode)
* [addNode](/auto-docs/fixed-layout-editor/interfaces/FlowOperationBaseService.md#addnode)
* [apply](/auto-docs/fixed-layout-editor/interfaces/FlowOperationBaseService.md#apply)
* [deleteNode](/auto-docs/fixed-layout-editor/interfaces/FlowOperationBaseService.md#deletenode)
* [deleteNodes](/auto-docs/fixed-layout-editor/interfaces/FlowOperationBaseService.md#deletenodes)
* [dispose](/auto-docs/fixed-layout-editor/interfaces/FlowOperationBaseService.md#dispose)
* [dragNodes](/auto-docs/fixed-layout-editor/interfaces/FlowOperationBaseService.md#dragnodes)
* [moveNode](/auto-docs/fixed-layout-editor/interfaces/FlowOperationBaseService.md#movenode)

## Properties

### onNodeAdd

**onNodeAdd**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`OnNodeAddEvent`](/auto-docs/fixed-layout-editor/interfaces/OnNodeAddEvent.md)>

添加节点的回调

***

### onNodeMove

**onNodeMove**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`OnNodeMoveEvent`](/auto-docs/fixed-layout-editor/interfaces/OnNodeMoveEvent.md)>

节点移动的回调

## Methods

### addBlock

**addBlock**(`target`, `blockJSON`, `config?`): [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

添加块（分支）

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | [`FlowNodeEntityOrId`](/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md) | 目标 |
| `blockJSON` | [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) | 块数据 |
| `config?` | [`AddBlockConfig`](/auto-docs/fixed-layout-editor/interfaces/AddBlockConfig.md) | 配置 |

#### Returns

[`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

***

### addFromNode

**addFromNode**(`fromNode`, `nodeJSON`): [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

基于某一个起始节点往后面添加

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fromNode` | [`FlowNodeEntityOrId`](/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md) | 起始节点 |
| `nodeJSON` | [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) | 添加的节点JSON |

#### Returns

[`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

***

### addNode

**addNode**(`nodeJSON`, `config?`): [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

添加节点，如果节点已经存在则不会重复创建

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeJSON` | [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) | 节点数据 |
| `config?` | [`AddNodeConfig`](/auto-docs/fixed-layout-editor/types/AddNodeConfig.md) | 配置 |

#### Returns

[`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

成功添加的节点

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

***

### deleteNode

**deleteNode**(`node`): `void`

删除节点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntityOrId`](/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md) | 节点 |

#### Returns

`void`

***

### deleteNodes

**deleteNodes**(`nodes`): `void`

批量删除节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`FlowNodeEntityOrId`](/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md)\[] |

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[Disposable](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md).[dispose](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md#dispose)

***

### dragNodes

**dragNodes**(`param0`): `void`

拖拽节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `param0` | `Object` |
| `param0.dropNode` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `param0.nodes` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`void`

***

### moveNode

**moveNode**(`node`, `config?`): `void`

移动节点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntityOrId`](/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md) | 被移动的节点 |
| `config?` | [`MoveNodeConfig`](/auto-docs/fixed-layout-editor/interfaces/MoveNodeConfig.md) | 移动节点配置 |

#### Returns

`void`
