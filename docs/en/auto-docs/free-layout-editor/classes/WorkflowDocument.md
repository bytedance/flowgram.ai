# Class: WorkflowDocument

流程整个文档数据

## Hierarchy

* [`FlowDocument`](/en/auto-docs/free-layout-editor/classes/FlowDocument.md)

  ↳ **`WorkflowDocument`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#constructor)

### Properties

* [config](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#config)
* [linesManager](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#linesmanager)
* [nodeEngineContext](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#nodeenginecontext)
* [onContentChange](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#oncontentchange)
* [onLayoutChange](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#onlayoutchange)
* [onLoaded](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#onloaded)
* [onNodeCreate](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#onnodecreate)
* [onNodeDispose](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#onnodedispose)
* [onNodeUpdate](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#onnodeupdate)
* [onReload](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#onreload)
* [options](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#options)
* [originTree](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#origintree)
* [playgroundConfig](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#playgroundconfig)
* [playgroundContext](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#playgroundcontext)
* [renderState](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#renderstate)
* [renderTree](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#rendertree)
* [root](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#root)
* [selectServices](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#selectservices)
* [transformer](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#transformer)

### Accessors

* [disposed](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#disposed)
* [layout](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#layout)
* [loading](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#loading)
* [size](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#size)

### Methods

* [addBlock](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#addblock)
* [addBlocksAsChildren](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#addblocksaschildren)
* [addFromNode](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#addfromnode)
* [addInlineBlocks](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#addinlineblocks)
* [addNode](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#addnode)
* [batchAddFromJSON](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#batchaddfromjson)
* [canRemove](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#canremove)
* [clear](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#clear)
* [copyNode](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#copynode)
* [copyNodeFromJSON](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#copynodefromjson)
* [createWorkflowNode](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#createworkflownode)
* [createWorkflowNodeByType](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#createworkflownodebytype)
* [dispose](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#dispose)
* [fireContentChange](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#firecontentchange)
* [fireRender](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#firerender)
* [fitView](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#fitview)
* [fromJSON](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#fromjson)
* [getAllEdges](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#getalledges)
* [getAllNodes](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#getallnodes)
* [getAllPorts](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#getallports)
* [getAssociatedNodes](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#getassociatednodes)
* [getNode](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#getnode)
* [getNodeRegister](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#getnoderegister)
* [getNodeRegistry](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#getnoderegistry)
* [getRenderDatas](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#getrenderdatas)
* [hasNode](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#hasnode)
* [init](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#init)
* [isErrorPort](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#iserrorport)
* [isExtend](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#isextend)
* [isTypeOrExtendType](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#istypeorextendtype)
* [load](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#load)
* [moveChildNodes](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#movechildnodes)
* [moveNodes](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#movenodes)
* [registerFlowNodes](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#registerflownodes)
* [registerLayout](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#registerlayout)
* [registerNodeDatas](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#registernodedatas)
* [reload](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#reload)
* [removeNode](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#removenode)
* [renderJSON](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#renderjson)
* [setLayout](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#setlayout)
* [toJSON](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#tojson)
* [toNodeJSON](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#tonodejson)
* [toString](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#tostring)
* [toggleFixedLayout](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#togglefixedlayout)
* [traverse](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md#traverse)

## Constructors

### constructor

**new WorkflowDocument**()

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[constructor](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#constructor)

## Properties

### config

`Readonly` **config**: [`FlowDocumentConfig`](/en/auto-docs/free-layout-editor/classes/FlowDocumentConfig.md)

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[config](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#config)

***

### linesManager

**linesManager**: [`WorkflowLinesManager`](/en/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md)

***

### nodeEngineContext

**nodeEngineContext**: `NodeEngineContext`

***

### onContentChange

`Readonly` **onContentChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`WorkflowContentChangeEvent`](/en/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md)>

***

### onLayoutChange

`Readonly` **onLayoutChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`FlowLayout`](/en/auto-docs/free-layout-editor/variables/FlowLayout-1.md)>

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[onLayoutChange](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#onlayoutchange)

***

### onLoaded

`Readonly` **onLoaded**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

数据加载完成

***

### onNodeCreate

`Readonly` **onNodeCreate**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<{ `data`: [`FlowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) ; `json`: [`FlowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) ; `node`: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)  }>

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[onNodeCreate](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#onnodecreate)

***

### onNodeDispose

`Readonly` **onNodeDispose**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<{ `node`: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)  }>

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[onNodeDispose](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#onnodedispose)

***

### onNodeUpdate

`Readonly` **onNodeUpdate**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<{ `data`: [`FlowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) ; `json`: [`FlowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) ; `node`: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)  }>

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[onNodeUpdate](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#onnodeupdate)

***

### onReload

`Readonly` **onReload**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`WorkflowDocument`](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md)>

***

### options

**options**: [`WorkflowDocumentOptions`](/en/auto-docs/free-layout-editor/variables/WorkflowDocumentOptions-1.md)

流程画布配置项

#### Overrides

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[options](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#options)

***

### originTree

**originTree**: [`FlowVirtualTree`](/en/auto-docs/free-layout-editor/classes/FlowVirtualTree-1.md)<[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)>

原始的 tree 结构

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[originTree](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#origintree)

***

### playgroundConfig

**playgroundConfig**: [`PlaygroundConfigEntity`](/en/auto-docs/free-layout-editor/classes/PlaygroundConfigEntity.md)

***

### playgroundContext

**playgroundContext**: `any`

***

### renderState

**renderState**: [`FlowRendererStateEntity`](/en/auto-docs/free-layout-editor/classes/FlowRendererStateEntity.md)

渲染相关的全局轧辊台

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[renderState](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#renderstate)

***

### renderTree

**renderTree**: `FlowRenderTree`<[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)>

渲染后的 tree 结构

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[renderTree](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#rendertree)

***

### root

**root**: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[root](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#root)

***

### selectServices

**selectServices**: [`WorkflowSelectService`](/en/auto-docs/free-layout-editor/classes/WorkflowSelectService.md)

***

### transformer

**transformer**: [`FlowDocumentTransformerEntity`](/en/auto-docs/free-layout-editor/classes/FlowDocumentTransformerEntity.md)

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[transformer](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#transformer)

## Accessors

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

FlowDocument.disposed

***

### layout

`get` **layout**(): `FreeLayout`

#### Returns

`FreeLayout`

#### Overrides

FlowDocument.layout

***

### loading

`get` **loading**(): `boolean`

#### Returns

`boolean`

#### Overrides

FlowDocument.loading

***

### size

`get` **size**(): `number`

#### Returns

`number`

#### Inherited from

FlowDocument.size

## Methods

### addBlock

**addBlock**(`target`, `blockData`, `addedNodes?`, `parent?`, `index?`): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

添加单个 block

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |  |
| `blockData` | [`FlowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) |  |
| `addedNodes?` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |  |
| `parent?` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) | 默认去找 $inlineBlocks$ |
| `index?` | `number` | - |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[addBlock](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#addblock)

***

### addBlocksAsChildren

**addBlocksAsChildren**(`parent`, `blocks`, `addedNodes?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `blocks` | [`FlowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md)\[] |
| `addedNodes?` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`void`

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[addBlocksAsChildren](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#addblocksaschildren)

***

### addFromNode

**addFromNode**(`fromNode`, `json`): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

从指定节点的下一个节点新增

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | `string` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `json` | [`FlowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[addFromNode](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#addfromnode)

***

### addInlineBlocks

**addInlineBlocks**(`node`, `blocks`, `addedNodes?`): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

block 格式：
node:  (最原始的 id)
blockIcon
inlineBlocks
block
blockOrderIcon
block
blockOrderIcon

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `blocks` | [`FlowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md)\[] |
| `addedNodes?` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[addInlineBlocks](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#addinlineblocks)

***

### addNode

**addNode**(`data`, `addedNodes?`, `ignoreCreateAndUpdateEvent?`): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

添加节点，如果节点已经存在则不会重复创建

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`AddNodeData`](/en/auto-docs/free-layout-editor/types/AddNodeData.md) |
| `addedNodes?` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |
| `ignoreCreateAndUpdateEvent?` | `boolean` |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Overrides

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[addNode](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#addnode)

***

### batchAddFromJSON

**batchAddFromJSON**(`json`, `options?`): `Object`

批量添加节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`WorkflowJSON`](/en/auto-docs/free-layout-editor/interfaces/WorkflowJSON.md) |
| `options?` | `Object` |
| `options.onEdgeCreated?` | (`edge`: [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `void` |
| `options.onNodeCreated?` | (`node`: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)) => `void` |
| `options.parent?` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `edges` | [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[] |
| `nodes` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |

***

### canRemove

**canRemove**(`node`, `silent?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `silent?` | `boolean` |

#### Returns

`boolean`

***

### clear

**clear**(): `void`

清空画布

#### Returns

`void`

***

### copyNode

**copyNode**(`node`, `newNodeId?`, `format?`, `position?`): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `newNodeId?` | `string` |
| `format?` | (`json`: [`WorkflowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeJSON.md)) => [`WorkflowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeJSON.md) |
| `position?` | [`IPoint`](/en/auto-docs/free-layout-editor/interfaces/IPoint.md) |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

***

### copyNodeFromJSON

**copyNodeFromJSON**(`flowNodeType`, `nodeJSON`, `newNodeId?`, `position?`, `parentID?`): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `flowNodeType` | `string` |
| `nodeJSON` | [`WorkflowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeJSON.md) |
| `newNodeId?` | `string` |
| `position?` | [`IPoint`](/en/auto-docs/free-layout-editor/interfaces/IPoint.md) |
| `parentID?` | `string` |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

***

### createWorkflowNode

**createWorkflowNode**(`json`, `isClone?`, `parentID?`): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

创建流程节点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | [`WorkflowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeJSON.md) |  |
| `isClone?` | `boolean` | **`Deprecated`** |
| `parentID?` | `string` | - |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

***

### createWorkflowNodeByType

**createWorkflowNodeByType**(`type`, `position?`, `json?`, `parentID?`): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

通过类型创建节点, 如果没有提供position 则直接放在画布中间

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` | `number` |
| `position?` | [`IPoint`](/en/auto-docs/free-layout-editor/interfaces/IPoint.md) |
| `json?` | `Partial`<[`WorkflowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeJSON.md)> |
| `parentID?` | `string` |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Overrides

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[dispose](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#dispose)

***

### fireContentChange

**fireContentChange**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`WorkflowContentChangeEvent`](/en/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md) |

#### Returns

`void`

***

### fireRender

**fireRender**(): `void`

触发渲染

#### Returns

`void`

#### Overrides

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[fireRender](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#firerender)

***

### fitView

**fitView**(`easing?`): `Promise`<`void`>

use `ctx.tools.fitView()` instead

#### Parameters

| Name | Type |
| :------ | :------ |
| `easing?` | `boolean` |

#### Returns

`Promise`<`void`>

**`Deprecated`**

***

### fromJSON

**fromJSON**(`json`, `fireRender?`): `void`

从数据加载

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `Partial`<[`WorkflowJSON`](/en/auto-docs/free-layout-editor/interfaces/WorkflowJSON.md)> |
| `fireRender?` | `boolean` |

#### Returns

`void`

#### Overrides

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[fromJSON](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#fromjson)

***

### getAllEdges

**getAllEdges**(): [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

#### Returns

[`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

***

### getAllNodes

**getAllNodes**(): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

#### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

#### Overrides

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[getAllNodes](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#getallnodes)

***

### getAllPorts

**getAllPorts**(): [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)\[]

#### Returns

[`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)\[]

***

### getAssociatedNodes

**getAssociatedNodes**(): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

获取画布中的非游离节点

1. 开始节点
2. 从开始节点出发能走到的节点
3. 结束节点
4. 默认所有子画布内节点为游离节点

#### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

***

### getNode

**getNode**(`id`): `undefined` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

根据 id 获取节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[getNode](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#getnode)

***

### getNodeRegister

**getNodeRegister**<`T`>(`type`, `originParent?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FlowNodeRegistry`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md), `T`> = [`FlowNodeRegistry`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md)> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`FlowNodeType`](/en/auto-docs/free-layout-editor/types/FlowNodeType.md) |
| `originParent?` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`T`

**`Deprecated`**

use `getNodeRegistry` instead

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[getNodeRegister](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#getnoderegister)

***

### getNodeRegistry

**getNodeRegistry**<`T`>(`type`, `originParent?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FlowNodeRegistry`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md), `T`> = [`FlowNodeRegistry`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md)> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`FlowNodeType`](/en/auto-docs/free-layout-editor/types/FlowNodeType.md) |
| `originParent?` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`T`

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[getNodeRegistry](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#getnoderegistry)

***

### getRenderDatas

**getRenderDatas**<`T`>(`dataRegistry`, `containHiddenNodes?`): `T`\[]

返回需要渲染的数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataRegistry` | [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<`T`> |
| `containHiddenNodes?` | `boolean` |

#### Returns

`T`\[]

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[getRenderDatas](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#getrenderdatas)

***

### hasNode

**hasNode**(`nodeId`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeId` | `string` |

#### Returns

`boolean`

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[hasNode](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#hasnode)

***

### init

**init**(): `void`

#### Returns

`void`

#### Overrides

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[init](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#init)

***

### isErrorPort

**isErrorPort**(`port`, `defaultValue?`): `boolean`

判断端口是否为错误态

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |
| `defaultValue?` | `boolean` |

#### Returns

`boolean`

***

### isExtend

**isExtend**(`currentType`, `extendType`): `boolean`

Check node extend

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentType` | [`FlowNodeType`](/en/auto-docs/free-layout-editor/types/FlowNodeType.md) |
| `extendType` | [`FlowNodeType`](/en/auto-docs/free-layout-editor/types/FlowNodeType.md) |

#### Returns

`boolean`

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[isExtend](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#isextend)

***

### isTypeOrExtendType

**isTypeOrExtendType**(`currentType`, `extendType`): `boolean`

Check node type

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentType` | [`FlowNodeType`](/en/auto-docs/free-layout-editor/types/FlowNodeType.md) |
| `extendType` | [`FlowNodeType`](/en/auto-docs/free-layout-editor/types/FlowNodeType.md) |

#### Returns

`boolean`

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[isTypeOrExtendType](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#istypeorextendtype)

***

### load

**load**(): `Promise`<`void`>

#### Returns

`Promise`<`void`>

#### Overrides

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[load](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#load)

***

### moveChildNodes

**moveChildNodes**(`param0`): `void`

移动子节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `param0` | `Object` |
| `param0.nodeIds` | `string`\[] |
| `param0.toIndex` | `number` |
| `param0.toParentId` | `string` |

#### Returns

`void`

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[moveChildNodes](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#movechildnodes)

***

### moveNodes

**moveNodes**(`param0`): `void`

移动节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `param0` | `Object` |
| `param0.dropNodeId` | `string` |
| `param0.inside?` | `boolean` |
| `param0.sortNodeIds` | `string`\[] |

#### Returns

`void`

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[moveNodes](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#movenodes)

***

### registerFlowNodes

**registerFlowNodes**<`T`>(`...registries`): `void`

注册节点

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FlowNodeRegistry`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<`any`, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...registries` | `T`\[] |

#### Returns

`void`

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[registerFlowNodes](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#registerflownodes)

***

### registerLayout

**registerLayout**(`layout`): `void`

注册布局

#### Parameters

| Name | Type |
| :------ | :------ |
| `layout` | [`FlowLayout`](/en/auto-docs/free-layout-editor/variables/FlowLayout-1.md) |

#### Returns

`void`

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[registerLayout](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#registerlayout)

***

### registerNodeDatas

**registerNodeDatas**(`...nodeDatas`): `void`

节点注入数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `...nodeDatas` | [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>\[] |

#### Returns

`void`

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[registerNodeDatas](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#registernodedatas)

***

### reload

**reload**(`json`, `delayTime?`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`WorkflowJSON`](/en/auto-docs/free-layout-editor/interfaces/WorkflowJSON.md) |
| `delayTime?` | `number` |

#### Returns

`Promise`<`void`>

**`Deprecated`**

use `ctx.operation.fromJSON` instead

***

### removeNode

**removeNode**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `string` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`void`

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[removeNode](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#removenode)

***

### renderJSON

**renderJSON**(`json`, `options?`): `Object`

批量添加节点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | [`WorkflowJSON`](/en/auto-docs/free-layout-editor/interfaces/WorkflowJSON.md) |  |
| `options?` | `Object` |  |
| `options.isClone?` | `boolean` | **`Deprecated`** useless api |
| `options.parent?` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) | - |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `edges` | [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[] |
| `nodes` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |

**`Deprecated`**

use 'batchAddFromJSON' instead

***

### setLayout

**setLayout**(`layoutKey`): `void`

更新布局

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutKey` | `string` |

#### Returns

`void`

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[setLayout](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#setlayout)

***

### toJSON

**toJSON**(): [`WorkflowJSON`](/en/auto-docs/free-layout-editor/interfaces/WorkflowJSON.md)

导出数据

#### Returns

[`WorkflowJSON`](/en/auto-docs/free-layout-editor/interfaces/WorkflowJSON.md)

#### Overrides

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[toJSON](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#tojson)

***

### toNodeJSON

**toNodeJSON**(`node`): [`WorkflowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeJSON.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

[`WorkflowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeJSON.md)

#### Overrides

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[toNodeJSON](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#tonodejson)

***

### toString

**toString**(`showType?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `showType?` | `boolean` |

#### Returns

`string`

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[toString](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#tostring)

***

### toggleFixedLayout

**toggleFixedLayout**(): `void`

切换垂直或水平布局

#### Returns

`void`

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[toggleFixedLayout](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#togglefixedlayout)

***

### traverse

**traverse**(`fn`, `node?`, `depth?`): `boolean` | `void`

traverse all nodes, O(n)
R
|
+---1
|   |
|   +---1.1
|   |
|   +---1.2
|   |
|   +---1.3
|   |    |
|   |    +---1.3.1
|   |    |
|   |    +---1.3.2
|   |
|   +---1.4
|
+---2
|
+---2.1

sort: \[1, 1.1, 1.2, 1.3, 1.3.1, 1.3.2, 1.4, 2, 2.1]

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`node`: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md), `depth`: `number`, `index`: `number`) => `boolean` | `void` |
| `node?` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `depth?` | `number` |

#### Returns

`boolean` | `void`

isBreak

#### Inherited from

[FlowDocument](/en/auto-docs/free-layout-editor/classes/FlowDocument.md).[traverse](/en/auto-docs/free-layout-editor/classes/FlowDocument.md#traverse)
