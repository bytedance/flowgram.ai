# Class: FlowDragService

拖拽相关操作
外部实现抽象类

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/FlowDragService.md#constructor)

### Properties

* [onDrop](/auto-docs/editor/classes/FlowDragService.md#ondrop)

### Accessors

* [dragNodes](/auto-docs/editor/classes/FlowDragService.md#dragnodes)
* [dragStartNode](/auto-docs/editor/classes/FlowDragService.md#dragstartnode)
* [dragging](/auto-docs/editor/classes/FlowDragService.md#dragging)
* [dropNodeId](/auto-docs/editor/classes/FlowDragService.md#dropnodeid)
* [isDragBranch](/auto-docs/editor/classes/FlowDragService.md#isdragbranch)
* [labelSide](/auto-docs/editor/classes/FlowDragService.md#labelside)
* [nodeDragIdsWithChildren](/auto-docs/editor/classes/FlowDragService.md#nodedragidswithchildren)
* [renderState](/auto-docs/editor/classes/FlowDragService.md#renderstate)

### Methods

* [dropBranch](/auto-docs/editor/classes/FlowDragService.md#dropbranch)
* [dropCreateNode](/auto-docs/editor/classes/FlowDragService.md#dropcreatenode)
* [dropNode](/auto-docs/editor/classes/FlowDragService.md#dropnode)
* [isDroppableBranch](/auto-docs/editor/classes/FlowDragService.md#isdroppablebranch)
* [isDroppableNode](/auto-docs/editor/classes/FlowDragService.md#isdroppablenode)

## Constructors

### constructor

**new FlowDragService**()

## Properties

### onDrop

`Readonly` **onDrop**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<{ `dragJSON?`: [`FlowNodeJSON`](/auto-docs/editor/interfaces/FlowNodeJSON.md) ; `dragNodes`: [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)\[] ; `dropNode`: [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)  }>

## Accessors

### dragNodes

`get` **dragNodes**(): [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)\[]

#### Returns

[`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)\[]

***

### dragStartNode

`get` **dragStartNode**(): [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)

#### Returns

[`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)

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

`get` **labelSide**(): `undefined` | [`LABEL_SIDE_TYPE`](/auto-docs/editor/enums/LABEL_SIDE_TYPE.md)

#### Returns

`undefined` | [`LABEL_SIDE_TYPE`](/auto-docs/editor/enums/LABEL_SIDE_TYPE.md)

***

### nodeDragIdsWithChildren

`get` **nodeDragIdsWithChildren**(): `string`\[]

#### Returns

`string`\[]

***

### renderState

`get` **renderState**(): [`FlowRendererStateEntity`](/auto-docs/editor/classes/FlowRendererStateEntity.md)

#### Returns

[`FlowRendererStateEntity`](/auto-docs/editor/classes/FlowRendererStateEntity.md)

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
| `json` | [`FlowNodeJSON`](/auto-docs/editor/interfaces/FlowNodeJSON.md) |
| `onCreateNode?` | (`json`: [`FlowNodeJSON`](/auto-docs/editor/interfaces/FlowNodeJSON.md), `dropEntity`: [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)) => `Promise`<[`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)> |

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md) | 拖拽的分支节点 |
| `side?` | [`LABEL_SIDE_TYPE`](/auto-docs/editor/enums/LABEL_SIDE_TYPE.md) | 分支的前面还是后面 |

#### Returns

`boolean`

***

### isDroppableNode

**isDroppableNode**(`node`): `boolean`

拖拽是否可以释放在该节点后面

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md) |

#### Returns

`boolean`
