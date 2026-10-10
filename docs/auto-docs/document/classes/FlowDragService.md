# Class: FlowDragService

拖拽相关操作
外部实现抽象类

## Table of contents

### Constructors

* [constructor](/auto-docs/document/classes/FlowDragService.md#constructor)

### Properties

* [onDrop](/auto-docs/document/classes/FlowDragService.md#ondrop)

### Accessors

* [dragNodes](/auto-docs/document/classes/FlowDragService.md#dragnodes)
* [dragStartNode](/auto-docs/document/classes/FlowDragService.md#dragstartnode)
* [dragging](/auto-docs/document/classes/FlowDragService.md#dragging)
* [dropNodeId](/auto-docs/document/classes/FlowDragService.md#dropnodeid)
* [isDragBranch](/auto-docs/document/classes/FlowDragService.md#isdragbranch)
* [labelSide](/auto-docs/document/classes/FlowDragService.md#labelside)
* [nodeDragIdsWithChildren](/auto-docs/document/classes/FlowDragService.md#nodedragidswithchildren)
* [renderState](/auto-docs/document/classes/FlowDragService.md#renderstate)

### Methods

* [dropBranch](/auto-docs/document/classes/FlowDragService.md#dropbranch)
* [dropCreateNode](/auto-docs/document/classes/FlowDragService.md#dropcreatenode)
* [dropNode](/auto-docs/document/classes/FlowDragService.md#dropnode)
* [isDroppableBranch](/auto-docs/document/classes/FlowDragService.md#isdroppablebranch)
* [isDroppableNode](/auto-docs/document/classes/FlowDragService.md#isdroppablenode)

## Constructors

### constructor

**new FlowDragService**()

## Properties

### onDrop

`Readonly` **onDrop**: `Event`<{ `dragJSON?`: [`FlowNodeJSON`](/auto-docs/document/interfaces/FlowNodeJSON.md) ; `dragNodes`: [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)\[] ; `dropNode`: [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)  }>

## Accessors

### dragNodes

`get` **dragNodes**(): [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)\[]

#### Returns

[`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)\[]

***

### dragStartNode

`get` **dragStartNode**(): [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

#### Returns

[`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

***

### dragging

`get` **dragging**(): `boolean`

#### Returns

`boolean`

***

### dropNodeId

`get` **dropNodeId**(): `undefined` | `string`

#### Returns

`undefined` | `string`

***

### isDragBranch

`get` **isDragBranch**(): `boolean`

#### Returns

`boolean`

***

### labelSide

`get` **labelSide**(): `undefined` | [`LABEL_SIDE_TYPE`](/auto-docs/document/enums/LABEL_SIDE_TYPE.md)

#### Returns

`undefined` | [`LABEL_SIDE_TYPE`](/auto-docs/document/enums/LABEL_SIDE_TYPE.md)

***

### nodeDragIdsWithChildren

`get` **nodeDragIdsWithChildren**(): `string`\[]

#### Returns

`string`\[]

***

### renderState

`get` **renderState**(): [`FlowRendererStateEntity`](/auto-docs/document/classes/FlowRendererStateEntity.md)

#### Returns

[`FlowRendererStateEntity`](/auto-docs/document/classes/FlowRendererStateEntity.md)

## Methods

### dropBranch

**dropBranch**(): `void`

放置到目标分支

#### Returns

`void`

***

### dropCreateNode

**dropCreateNode**(`json`, `onCreateNode?`): `Promise`<`void`>

移动并且创建节点
Move and create node

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`FlowNodeJSON`](/auto-docs/document/interfaces/FlowNodeJSON.md) |
| `onCreateNode?` | (`json`: [`FlowNodeJSON`](/auto-docs/document/interfaces/FlowNodeJSON.md), `dropEntity`: [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)) => `Promise`<[`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)> |

#### Returns

`Promise`<`void`>

***

### dropNode

**dropNode**(): `void`

移动到目标节点

#### Returns

`void`

***

### isDroppableBranch

**isDroppableBranch**(`node`, `side?`): `boolean`

拖拽分支是否可以释放在该分支

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) | `undefined` | 拖拽的分支节点 |
| `side` | [`LABEL_SIDE_TYPE`](/auto-docs/document/enums/LABEL_SIDE_TYPE.md) | `LABEL_SIDE_TYPE.NORMAL_BRANCH` | 分支的前面还是后面 |

#### Returns

`boolean`

***

### isDroppableNode

**isDroppableNode**(`node`): `boolean`

拖拽是否可以释放在该节点后面

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) |

#### Returns

`boolean`
