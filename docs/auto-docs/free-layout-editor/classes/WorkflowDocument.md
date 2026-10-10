# Class: WorkflowDocument

流程整个文档数据

## Hierarchy

* [`FlowDocument`](/auto-docs/free-layout-editor/classes/FlowDocument.md)

  ↳ **`WorkflowDocument`**

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#constructor)

### Properties

* [config](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#config)
* [linesManager](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#linesmanager)
* [nodeEngineContext](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#nodeenginecontext)
* [onContentChange](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#oncontentchange)
* [onLayoutChange](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#onlayoutchange)
* [onLoaded](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#onloaded)
* [onNodeCreate](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#onnodecreate)
* [onNodeDispose](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#onnodedispose)
* [onNodeUpdate](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#onnodeupdate)
* [onReload](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#onreload)
* [options](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#options)
* [originTree](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#origintree)
* [playgroundConfig](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#playgroundconfig)
* [playgroundContext](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#playgroundcontext)
* [renderState](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#renderstate)
* [renderTree](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#rendertree)
* [root](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#root)
* [selectServices](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#selectservices)
* [transformer](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#transformer)

### Accessors

* [disposed](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#disposed)
* [layout](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#layout)
* [loading](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#loading)
* [size](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#size)

### Methods

* [addBlock](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#addblock)
* [addBlocksAsChildren](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#addblocksaschildren)
* [addFromNode](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#addfromnode)
* [addInlineBlocks](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#addinlineblocks)
* [addNode](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#addnode)
* [batchAddFromJSON](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#batchaddfromjson)
* [canRemove](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#canremove)
* [clear](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#clear)
* [copyNode](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#copynode)
* [copyNodeFromJSON](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#copynodefromjson)
* [createWorkflowNode](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#createworkflownode)
* [createWorkflowNodeByType](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#createworkflownodebytype)
* [dispose](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#dispose)
* [fireContentChange](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#firecontentchange)
* [fireRender](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#firerender)
* [fitView](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#fitview)
* [fromJSON](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#fromjson)
* [getAllEdges](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#getalledges)
* [getAllNodes](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#getallnodes)
* [getAllPorts](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#getallports)
* [getAssociatedNodes](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#getassociatednodes)
* [getNode](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#getnode)
* [getNodeRegister](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#getnoderegister)
* [getNodeRegistry](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#getnoderegistry)
* [getRenderDatas](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#getrenderdatas)
* [hasNode](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#hasnode)
* [init](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#init)
* [isErrorPort](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#iserrorport)
* [isExtend](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#isextend)
* [isTypeOrExtendType](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#istypeorextendtype)
* [load](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#load)
* [moveChildNodes](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#movechildnodes)
* [moveNodes](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#movenodes)
* [registerFlowNodes](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#registerflownodes)
* [registerLayout](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#registerlayout)
* [registerNodeDatas](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#registernodedatas)
* [reload](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#reload)
* [removeNode](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#removenode)
* [renderJSON](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#renderjson)
* [setLayout](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#setlayout)
* [toJSON](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#tojson)
* [toNodeJSON](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#tonodejson)
* [toString](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#tostring)
* [toggleFixedLayout](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#togglefixedlayout)
* [traverse](/auto-docs/free-layout-editor/classes/WorkflowDocument.md#traverse)

## Constructors

### constructor

**new WorkflowDocument**()

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[constructor](/auto-docs/free-layout-editor/classes/FlowDocument.md#constructor)

## Properties

### config

`Readonly` **config**: [`FlowDocumentConfig`](/auto-docs/free-layout-editor/classes/FlowDocumentConfig.md)

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[config](/auto-docs/free-layout-editor/classes/FlowDocument.md#config)

***

### linesManager

**linesManager**: [`WorkflowLinesManager`](/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md)

***

### nodeEngineContext

**nodeEngineContext**: `NodeEngineContext`

***

### onContentChange

`Readonly` **onContentChange**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`WorkflowContentChangeEvent`](/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md)>

***

### onLayoutChange

`Readonly` **onLayoutChange**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md)>

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[onLayoutChange](/auto-docs/free-layout-editor/classes/FlowDocument.md#onlayoutchange)

***

### onLoaded

`Readonly` **onLoaded**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

数据加载完成

***

### onNodeCreate

`Readonly` **onNodeCreate**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<{ `data`: [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) ; `json`: [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) ; `node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)  }>

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[onNodeCreate](/auto-docs/free-layout-editor/classes/FlowDocument.md#onnodecreate)

***

### onNodeDispose

`Readonly` **onNodeDispose**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<{ `node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)  }>

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[onNodeDispose](/auto-docs/free-layout-editor/classes/FlowDocument.md#onnodedispose)

***

### onNodeUpdate

`Readonly` **onNodeUpdate**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<{ `data`: [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) ; `json`: [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) ; `node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)  }>

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[onNodeUpdate](/auto-docs/free-layout-editor/classes/FlowDocument.md#onnodeupdate)

***

### onReload

`Readonly` **onReload**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`WorkflowDocument`](/auto-docs/free-layout-editor/classes/WorkflowDocument.md)>

***

### options

**options**: [`WorkflowDocumentOptions`](/auto-docs/free-layout-editor/variables/WorkflowDocumentOptions-1.md)

流程画布配置项

#### Overrides

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[options](/auto-docs/free-layout-editor/classes/FlowDocument.md#options)

***

### originTree

**originTree**: [`FlowVirtualTree`](/auto-docs/free-layout-editor/classes/FlowVirtualTree-1.md)<[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)>

原始的 tree 结构

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[originTree](/auto-docs/free-layout-editor/classes/FlowDocument.md#origintree)

***

### playgroundConfig

**playgroundConfig**: [`PlaygroundConfigEntity`](/auto-docs/free-layout-editor/classes/PlaygroundConfigEntity.md)

***

### playgroundContext

**playgroundContext**: `any`

***

### renderState

**renderState**: [`FlowRendererStateEntity`](/auto-docs/free-layout-editor/classes/FlowRendererStateEntity.md)

渲染相关的全局轧辊台

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[renderState](/auto-docs/free-layout-editor/classes/FlowDocument.md#renderstate)

***

### renderTree

**renderTree**: `FlowRenderTree`<[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)>

渲染后的 tree 结构

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[renderTree](/auto-docs/free-layout-editor/classes/FlowDocument.md#rendertree)

***

### root

**root**: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[root](/auto-docs/free-layout-editor/classes/FlowDocument.md#root)

***

### selectServices

**selectServices**: [`WorkflowSelectService`](/auto-docs/free-layout-editor/classes/WorkflowSelectService.md)

***

### transformer

**transformer**: [`FlowDocumentTransformerEntity`](/auto-docs/free-layout-editor/classes/FlowDocumentTransformerEntity.md)

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[transformer](/auto-docs/free-layout-editor/classes/FlowDocument.md#transformer)

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

**addBlock**(`target`, `blockData`, `addedNodes?`, `parent?`, `index?`): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

添加单个 block

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |  |
| `blockData` | [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) |  |
| `addedNodes?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |  |
| `parent?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) | 默认去找 $inlineBlocks$ |
| `index?` | `number` | - |

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[addBlock](/auto-docs/free-layout-editor/classes/FlowDocument.md#addblock)

***

### addBlocksAsChildren

**addBlocksAsChildren**(`parent`, `blocks`, `addedNodes?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `blocks` | [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md)\[] |
| `addedNodes?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`void`

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[addBlocksAsChildren](/auto-docs/free-layout-editor/classes/FlowDocument.md#addblocksaschildren)

***

### addFromNode

**addFromNode**(`fromNode`, `json`): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

从指定节点的下一个节点新增

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | `string` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `json` | [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) |

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[addFromNode](/auto-docs/free-layout-editor/classes/FlowDocument.md#addfromnode)

***

### addInlineBlocks

**addInlineBlocks**(`node`, `blocks`, `addedNodes?`): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

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
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `blocks` | [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md)\[] |
| `addedNodes?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[addInlineBlocks](/auto-docs/free-layout-editor/classes/FlowDocument.md#addinlineblocks)

***

### addNode

**addNode**(`data`, `addedNodes?`, `ignoreCreateAndUpdateEvent?`): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

添加节点，如果节点已经存在则不会重复创建

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`AddNodeData`](/auto-docs/free-layout-editor/types/AddNodeData.md) |
| `addedNodes?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |
| `ignoreCreateAndUpdateEvent?` | `boolean` |

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Overrides

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[addNode](/auto-docs/free-layout-editor/classes/FlowDocument.md#addnode)

***

### batchAddFromJSON

**batchAddFromJSON**(`json`, `options?`): `Object`

批量添加节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`WorkflowJSON`](/auto-docs/free-layout-editor/interfaces/WorkflowJSON.md) |
| `options?` | `Object` |
| `options.onEdgeCreated?` | (`edge`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `void` |
| `options.onNodeCreated?` | (`node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)) => `void` |
| `options.parent?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `edges` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[] |
| `nodes` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |

***

### canRemove

**canRemove**(`node`, `silent?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
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

**copyNode**(`node`, `newNodeId?`, `format?`, `position?`): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `newNodeId?` | `string` |
| `format?` | (`json`: [`WorkflowNodeJSON`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeJSON.md)) => [`WorkflowNodeJSON`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeJSON.md) |
| `position?` | [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md) |

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

***

### copyNodeFromJSON

**copyNodeFromJSON**(`flowNodeType`, `nodeJSON`, `newNodeId?`, `position?`, `parentID?`): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `flowNodeType` | `string` |
| `nodeJSON` | [`WorkflowNodeJSON`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeJSON.md) |
| `newNodeId?` | `string` |
| `position?` | [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md) |
| `parentID?` | `string` |

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

***

### createWorkflowNode

**createWorkflowNode**(`json`, `isClone?`, `parentID?`): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

创建流程节点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | [`WorkflowNodeJSON`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeJSON.md) |  |
| `isClone?` | `boolean` | **`Deprecated`** |
| `parentID?` | `string` | - |

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

***

### createWorkflowNodeByType

**createWorkflowNodeByType**(`type`, `position?`, `json?`, `parentID?`): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

通过类型创建节点, 如果没有提供position 则直接放在画布中间

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` | `number` |
| `position?` | [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md) |
| `json?` | `Partial`<[`WorkflowNodeJSON`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeJSON.md)> |
| `parentID?` | `string` |

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Overrides

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[dispose](/auto-docs/free-layout-editor/classes/FlowDocument.md#dispose)

***

### fireContentChange

**fireContentChange**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`WorkflowContentChangeEvent`](/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md) |

#### Returns

`void`

***

### fireRender

**fireRender**(): `void`

触发渲染

#### Returns

`void`

#### Overrides

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[fireRender](/auto-docs/free-layout-editor/classes/FlowDocument.md#firerender)

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
| `json` | `Partial`<[`WorkflowJSON`](/auto-docs/free-layout-editor/interfaces/WorkflowJSON.md)> |
| `fireRender?` | `boolean` |

#### Returns

`void`

#### Overrides

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[fromJSON](/auto-docs/free-layout-editor/classes/FlowDocument.md#fromjson)

***

### getAllEdges

**getAllEdges**(): [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

#### Returns

[`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

***

### getAllNodes

**getAllNodes**(): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

#### Overrides

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[getAllNodes](/auto-docs/free-layout-editor/classes/FlowDocument.md#getallnodes)

***

### getAllPorts

**getAllPorts**(): [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)\[]

#### Returns

[`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)\[]

***

### getAssociatedNodes

**getAssociatedNodes**(): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

获取画布中的非游离节点

1. 开始节点
2. 从开始节点出发能走到的节点
3. 结束节点
4. 默认所有子画布内节点为游离节点

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

***

### getNode

**getNode**(`id`): `undefined` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

根据 id 获取节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[getNode](/auto-docs/free-layout-editor/classes/FlowDocument.md#getnode)

***

### getNodeRegister

**getNodeRegister**<`T`>(`type`, `originParent?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FlowNodeRegistry`](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md), `T`> = [`FlowNodeRegistry`](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md)> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md) |
| `originParent?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`T`

**`Deprecated`**

use `getNodeRegistry` instead

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[getNodeRegister](/auto-docs/free-layout-editor/classes/FlowDocument.md#getnoderegister)

***

### getNodeRegistry

**getNodeRegistry**<`T`>(`type`, `originParent?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FlowNodeRegistry`](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md), `T`> = [`FlowNodeRegistry`](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md)> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md) |
| `originParent?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`T`

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[getNodeRegistry](/auto-docs/free-layout-editor/classes/FlowDocument.md#getnoderegistry)

***

### getRenderDatas

**getRenderDatas**<`T`>(`dataRegistry`, `containHiddenNodes?`): `T`\[]

返回需要渲染的数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataRegistry` | [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<`T`> |
| `containHiddenNodes?` | `boolean` |

#### Returns

`T`\[]

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[getRenderDatas](/auto-docs/free-layout-editor/classes/FlowDocument.md#getrenderdatas)

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

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[hasNode](/auto-docs/free-layout-editor/classes/FlowDocument.md#hasnode)

***

### init

**init**(): `void`

#### Returns

`void`

#### Overrides

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[init](/auto-docs/free-layout-editor/classes/FlowDocument.md#init)

***

### isErrorPort

**isErrorPort**(`port`, `defaultValue?`): `boolean`

判断端口是否为错误态

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |
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
| `currentType` | [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md) |
| `extendType` | [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md) |

#### Returns

`boolean`

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[isExtend](/auto-docs/free-layout-editor/classes/FlowDocument.md#isextend)

***

### isTypeOrExtendType

**isTypeOrExtendType**(`currentType`, `extendType`): `boolean`

Check node type

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentType` | [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md) |
| `extendType` | [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md) |

#### Returns

`boolean`

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[isTypeOrExtendType](/auto-docs/free-layout-editor/classes/FlowDocument.md#istypeorextendtype)

***

### load

**load**(): `Promise`<`void`>

#### Returns

`Promise`<`void`>

#### Overrides

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[load](/auto-docs/free-layout-editor/classes/FlowDocument.md#load)

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

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[moveChildNodes](/auto-docs/free-layout-editor/classes/FlowDocument.md#movechildnodes)

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

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[moveNodes](/auto-docs/free-layout-editor/classes/FlowDocument.md#movenodes)

***

### registerFlowNodes

**registerFlowNodes**<`T`>(`...registries`): `void`

注册节点

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FlowNodeRegistry`](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<`any`, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...registries` | `T`\[] |

#### Returns

`void`

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[registerFlowNodes](/auto-docs/free-layout-editor/classes/FlowDocument.md#registerflownodes)

***

### registerLayout

**registerLayout**(`layout`): `void`

注册布局

#### Parameters

| Name | Type |
| :------ | :------ |
| `layout` | [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md) |

#### Returns

`void`

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[registerLayout](/auto-docs/free-layout-editor/classes/FlowDocument.md#registerlayout)

***

### registerNodeDatas

**registerNodeDatas**(`...nodeDatas`): `void`

节点注入数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `...nodeDatas` | [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>\[] |

#### Returns

`void`

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[registerNodeDatas](/auto-docs/free-layout-editor/classes/FlowDocument.md#registernodedatas)

***

### reload

**reload**(`json`, `delayTime?`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`WorkflowJSON`](/auto-docs/free-layout-editor/interfaces/WorkflowJSON.md) |
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
| `node` | `string` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`void`

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[removeNode](/auto-docs/free-layout-editor/classes/FlowDocument.md#removenode)

***

### renderJSON

**renderJSON**(`json`, `options?`): `Object`

批量添加节点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | [`WorkflowJSON`](/auto-docs/free-layout-editor/interfaces/WorkflowJSON.md) |  |
| `options?` | `Object` |  |
| `options.isClone?` | `boolean` | **`Deprecated`** useless api |
| `options.parent?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) | - |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `edges` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[] |
| `nodes` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |

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

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[setLayout](/auto-docs/free-layout-editor/classes/FlowDocument.md#setlayout)

***

### toJSON

**toJSON**(): [`WorkflowJSON`](/auto-docs/free-layout-editor/interfaces/WorkflowJSON.md)

导出数据

#### Returns

[`WorkflowJSON`](/auto-docs/free-layout-editor/interfaces/WorkflowJSON.md)

#### Overrides

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[toJSON](/auto-docs/free-layout-editor/classes/FlowDocument.md#tojson)

***

### toNodeJSON

**toNodeJSON**(`node`): [`WorkflowNodeJSON`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeJSON.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

[`WorkflowNodeJSON`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeJSON.md)

#### Overrides

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[toNodeJSON](/auto-docs/free-layout-editor/classes/FlowDocument.md#tonodejson)

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

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[toString](/auto-docs/free-layout-editor/classes/FlowDocument.md#tostring)

***

### toggleFixedLayout

**toggleFixedLayout**(): `void`

切换垂直或水平布局

#### Returns

`void`

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[toggleFixedLayout](/auto-docs/free-layout-editor/classes/FlowDocument.md#togglefixedlayout)

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
| `fn` | (`node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md), `depth`: `number`, `index`: `number`) => `boolean` | `void` |
| `node?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `depth?` | `number` |

#### Returns

`boolean` | `void`

isBreak

#### Inherited from

[FlowDocument](/auto-docs/free-layout-editor/classes/FlowDocument.md).[traverse](/auto-docs/free-layout-editor/classes/FlowDocument.md#traverse)
