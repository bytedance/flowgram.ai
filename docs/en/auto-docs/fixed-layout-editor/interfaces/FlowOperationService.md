# Interface: FlowOperationService

## Hierarchy

* [`FlowOperationBaseService`](/en/auto-docs/fixed-layout-editor/variables/FlowOperationBaseService-1.md)

  ↳ **`FlowOperationService`**

## Table of contents

### Properties

* [onNodeAdd](/en/auto-docs/fixed-layout-editor/interfaces/FlowOperationService.md#onnodeadd)
* [onNodeMove](/en/auto-docs/fixed-layout-editor/interfaces/FlowOperationService.md#onnodemove)

### Methods

* [addBlock](/en/auto-docs/fixed-layout-editor/interfaces/FlowOperationService.md#addblock)
* [addFromNode](/en/auto-docs/fixed-layout-editor/interfaces/FlowOperationService.md#addfromnode)
* [addNode](/en/auto-docs/fixed-layout-editor/interfaces/FlowOperationService.md#addnode)
* [apply](/en/auto-docs/fixed-layout-editor/interfaces/FlowOperationService.md#apply)
* [createGroup](/en/auto-docs/fixed-layout-editor/interfaces/FlowOperationService.md#creategroup)
* [deleteNode](/en/auto-docs/fixed-layout-editor/interfaces/FlowOperationService.md#deletenode)
* [deleteNodes](/en/auto-docs/fixed-layout-editor/interfaces/FlowOperationService.md#deletenodes)
* [dispose](/en/auto-docs/fixed-layout-editor/interfaces/FlowOperationService.md#dispose)
* [dragNodes](/en/auto-docs/fixed-layout-editor/interfaces/FlowOperationService.md#dragnodes)
* [endTransaction](/en/auto-docs/fixed-layout-editor/interfaces/FlowOperationService.md#endtransaction)
* [moveNode](/en/auto-docs/fixed-layout-editor/interfaces/FlowOperationService.md#movenode)
* [setFormValue](/en/auto-docs/fixed-layout-editor/interfaces/FlowOperationService.md#setformvalue)
* [startTransaction](/en/auto-docs/fixed-layout-editor/interfaces/FlowOperationService.md#starttransaction)
* [ungroup](/en/auto-docs/fixed-layout-editor/interfaces/FlowOperationService.md#ungroup)

## Properties

### onNodeAdd

**onNodeAdd**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`OnNodeAddEvent`](/en/auto-docs/fixed-layout-editor/interfaces/OnNodeAddEvent.md)>

添加节点的回调

#### Inherited from

FlowOperationBaseService.onNodeAdd

***

### onNodeMove

**onNodeMove**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`OnNodeMoveEvent`](/en/auto-docs/fixed-layout-editor/interfaces/OnNodeMoveEvent.md)>

节点移动的回调

#### Inherited from

FlowOperationBaseService.onNodeMove

## Methods

### addBlock

**addBlock**(`target`, `blockJSON`, `config?`): [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

添加块（分支）

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | [`FlowNodeEntityOrId`](/en/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md) | 目标 |
| `blockJSON` | [`FlowNodeJSON`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) | 块数据 |
| `config?` | [`AddBlockConfig`](/en/auto-docs/fixed-layout-editor/interfaces/AddBlockConfig.md) | 配置 |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Inherited from

FlowOperationBaseService.addBlock

***

### addFromNode

**addFromNode**(`fromNode`, `nodeJSON`): [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

基于某一个起始节点往后面添加

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fromNode` | [`FlowNodeEntityOrId`](/en/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md) | 起始节点 |
| `nodeJSON` | [`FlowNodeJSON`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) | 添加的节点JSON |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Inherited from

FlowOperationBaseService.addFromNode

***

### addNode

**addNode**(`nodeJSON`, `config?`): [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

添加节点，如果节点已经存在则不会重复创建

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeJSON` | [`FlowNodeJSON`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) | 节点数据 |
| `config?` | [`AddNodeConfig`](/en/auto-docs/fixed-layout-editor/types/AddNodeConfig.md) | 配置 |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

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
| `operation` | [`FlowOperation`](/en/auto-docs/fixed-layout-editor/types/FlowOperation.md) | 可序列化的操作 |

#### Returns

`any`

操作返回

#### Inherited from

FlowOperationBaseService.apply

***

### createGroup

**createGroup**(`nodes`): `undefined` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

创建分组

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodes` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)\[] | 节点列表 |

#### Returns

`undefined` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

***

### deleteNode

**deleteNode**(`node`): `void`

删除节点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntityOrId`](/en/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md) | 节点 |

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
| `nodes` | [`FlowNodeEntityOrId`](/en/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md)\[] |

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
| `param0.dropNode` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `param0.nodes` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`void`

#### Inherited from

FlowOperationBaseService.dragNodes

***

### endTransaction

**endTransaction**(): `void`

结束事务

#### Returns

`void`

***

### moveNode

**moveNode**(`node`, `config?`): `void`

移动节点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntityOrId`](/en/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md) | 被移动的节点 |
| `config?` | [`MoveNodeConfig`](/en/auto-docs/fixed-layout-editor/interfaces/MoveNodeConfig.md) | 移动节点配置 |

#### Returns

`void`

#### Inherited from

FlowOperationBaseService.moveNode

***

### setFormValue

**setFormValue**(`node`, `path`, `value`): `void`

修改表单数据

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntityOrId`](/en/auto-docs/fixed-layout-editor/types/FlowNodeEntityOrId.md) | 节点 |
| `path` | `string` | 属性路径 |
| `value` | `unknown` | 值 |

#### Returns

`void`

***

### startTransaction

**startTransaction**(): `void`

开始事务

#### Returns

`void`

***

### ungroup

**ungroup**(`groupNode`): `void`

取消分组

#### Parameters

| Name | Type |
| :------ | :------ |
| `groupNode` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`void`
