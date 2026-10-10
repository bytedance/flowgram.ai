# Class: WorkflowDocument

## Hierarchy

* `FlowDocument`

  ↳ **`WorkflowDocument`**

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-core/classes/WorkflowDocument.md#constructor)

### Properties

* [config](/auto-docs/free-layout-core/classes/WorkflowDocument.md#config)
* [linesManager](/auto-docs/free-layout-core/classes/WorkflowDocument.md#linesmanager)
* [nodeEngineContext](/auto-docs/free-layout-core/classes/WorkflowDocument.md#nodeenginecontext)
* [onContentChange](/auto-docs/free-layout-core/classes/WorkflowDocument.md#oncontentchange)
* [onLayoutChange](/auto-docs/free-layout-core/classes/WorkflowDocument.md#onlayoutchange)
* [onLoaded](/auto-docs/free-layout-core/classes/WorkflowDocument.md#onloaded)
* [onNodeCreate](/auto-docs/free-layout-core/classes/WorkflowDocument.md#onnodecreate)
* [onNodeDispose](/auto-docs/free-layout-core/classes/WorkflowDocument.md#onnodedispose)
* [onNodeUpdate](/auto-docs/free-layout-core/classes/WorkflowDocument.md#onnodeupdate)
* [onReload](/auto-docs/free-layout-core/classes/WorkflowDocument.md#onreload)
* [options](/auto-docs/free-layout-core/classes/WorkflowDocument.md#options)
* [originTree](/auto-docs/free-layout-core/classes/WorkflowDocument.md#origintree)
* [playgroundConfig](/auto-docs/free-layout-core/classes/WorkflowDocument.md#playgroundconfig)
* [playgroundContext](/auto-docs/free-layout-core/classes/WorkflowDocument.md#playgroundcontext)
* [renderState](/auto-docs/free-layout-core/classes/WorkflowDocument.md#renderstate)
* [renderTree](/auto-docs/free-layout-core/classes/WorkflowDocument.md#rendertree)
* [root](/auto-docs/free-layout-core/classes/WorkflowDocument.md#root)
* [selectServices](/auto-docs/free-layout-core/classes/WorkflowDocument.md#selectservices)
* [transformer](/auto-docs/free-layout-core/classes/WorkflowDocument.md#transformer)

### Accessors

* [disposed](/auto-docs/free-layout-core/classes/WorkflowDocument.md#disposed)
* [layout](/auto-docs/free-layout-core/classes/WorkflowDocument.md#layout)
* [loading](/auto-docs/free-layout-core/classes/WorkflowDocument.md#loading)
* [size](/auto-docs/free-layout-core/classes/WorkflowDocument.md#size)

### Methods

* [addBlock](/auto-docs/free-layout-core/classes/WorkflowDocument.md#addblock)
* [addBlocksAsChildren](/auto-docs/free-layout-core/classes/WorkflowDocument.md#addblocksaschildren)
* [addFromNode](/auto-docs/free-layout-core/classes/WorkflowDocument.md#addfromnode)
* [addInlineBlocks](/auto-docs/free-layout-core/classes/WorkflowDocument.md#addinlineblocks)
* [addNode](/auto-docs/free-layout-core/classes/WorkflowDocument.md#addnode)
* [batchAddFromJSON](/auto-docs/free-layout-core/classes/WorkflowDocument.md#batchaddfromjson)
* [canRemove](/auto-docs/free-layout-core/classes/WorkflowDocument.md#canremove)
* [clear](/auto-docs/free-layout-core/classes/WorkflowDocument.md#clear)
* [copyNode](/auto-docs/free-layout-core/classes/WorkflowDocument.md#copynode)
* [copyNodeFromJSON](/auto-docs/free-layout-core/classes/WorkflowDocument.md#copynodefromjson)
* [createWorkflowNode](/auto-docs/free-layout-core/classes/WorkflowDocument.md#createworkflownode)
* [createWorkflowNodeByType](/auto-docs/free-layout-core/classes/WorkflowDocument.md#createworkflownodebytype)
* [dispose](/auto-docs/free-layout-core/classes/WorkflowDocument.md#dispose)
* [fireContentChange](/auto-docs/free-layout-core/classes/WorkflowDocument.md#firecontentchange)
* [fireRender](/auto-docs/free-layout-core/classes/WorkflowDocument.md#firerender)
* [fitView](/auto-docs/free-layout-core/classes/WorkflowDocument.md#fitview)
* [fromJSON](/auto-docs/free-layout-core/classes/WorkflowDocument.md#fromjson)
* [getAllEdges](/auto-docs/free-layout-core/classes/WorkflowDocument.md#getalledges)
* [getAllNodes](/auto-docs/free-layout-core/classes/WorkflowDocument.md#getallnodes)
* [getAllPorts](/auto-docs/free-layout-core/classes/WorkflowDocument.md#getallports)
* [getAssociatedNodes](/auto-docs/free-layout-core/classes/WorkflowDocument.md#getassociatednodes)
* [getNode](/auto-docs/free-layout-core/classes/WorkflowDocument.md#getnode)
* [getNodeRegister](/auto-docs/free-layout-core/classes/WorkflowDocument.md#getnoderegister)
* [getNodeRegistry](/auto-docs/free-layout-core/classes/WorkflowDocument.md#getnoderegistry)
* [getRenderDatas](/auto-docs/free-layout-core/classes/WorkflowDocument.md#getrenderdatas)
* [hasNode](/auto-docs/free-layout-core/classes/WorkflowDocument.md#hasnode)
* [init](/auto-docs/free-layout-core/classes/WorkflowDocument.md#init)
* [isErrorPort](/auto-docs/free-layout-core/classes/WorkflowDocument.md#iserrorport)
* [isExtend](/auto-docs/free-layout-core/classes/WorkflowDocument.md#isextend)
* [isTypeOrExtendType](/auto-docs/free-layout-core/classes/WorkflowDocument.md#istypeorextendtype)
* [load](/auto-docs/free-layout-core/classes/WorkflowDocument.md#load)
* [moveChildNodes](/auto-docs/free-layout-core/classes/WorkflowDocument.md#movechildnodes)
* [moveNodes](/auto-docs/free-layout-core/classes/WorkflowDocument.md#movenodes)
* [registerFlowNodes](/auto-docs/free-layout-core/classes/WorkflowDocument.md#registerflownodes)
* [registerLayout](/auto-docs/free-layout-core/classes/WorkflowDocument.md#registerlayout)
* [registerNodeDatas](/auto-docs/free-layout-core/classes/WorkflowDocument.md#registernodedatas)
* [reload](/auto-docs/free-layout-core/classes/WorkflowDocument.md#reload)
* [removeNode](/auto-docs/free-layout-core/classes/WorkflowDocument.md#removenode)
* [renderJSON](/auto-docs/free-layout-core/classes/WorkflowDocument.md#renderjson)
* [setLayout](/auto-docs/free-layout-core/classes/WorkflowDocument.md#setlayout)
* [toJSON](/auto-docs/free-layout-core/classes/WorkflowDocument.md#tojson)
* [toNodeJSON](/auto-docs/free-layout-core/classes/WorkflowDocument.md#tonodejson)
* [toString](/auto-docs/free-layout-core/classes/WorkflowDocument.md#tostring)
* [toggleFixedLayout](/auto-docs/free-layout-core/classes/WorkflowDocument.md#togglefixedlayout)
* [traverse](/auto-docs/free-layout-core/classes/WorkflowDocument.md#traverse)

## Constructors

### constructor

**new WorkflowDocument**()

#### Inherited from

FlowDocument.constructor

## Properties

### config

`Readonly` **config**: `FlowDocumentConfig`

#### Inherited from

FlowDocument.config

***

### linesManager

**linesManager**: [`WorkflowLinesManager`](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md)

***

### nodeEngineContext

**nodeEngineContext**: `NodeEngineContext`

***

### onContentChange

`Readonly` **onContentChange**: `Event`<[`WorkflowContentChangeEvent`](/auto-docs/free-layout-core/interfaces/WorkflowContentChangeEvent.md)>

***

### onLayoutChange

`Readonly` **onLayoutChange**: `Event`<`FlowLayout`>

#### Inherited from

FlowDocument.onLayoutChange

***

### onLoaded

`Readonly` **onLoaded**: `Event`<`void`>

数据加载完成

***

### onNodeCreate

`Readonly` **onNodeCreate**: `Event`<{ `data`: `FlowNodeJSON` ; `json`: `FlowNodeJSON` ; `node`: `FlowNodeEntity`  }>

#### Inherited from

FlowDocument.onNodeCreate

***

### onNodeDispose

`Readonly` **onNodeDispose**: `Event`<{ `node`: `FlowNodeEntity`  }>

#### Inherited from

FlowDocument.onNodeDispose

***

### onNodeUpdate

`Readonly` **onNodeUpdate**: `Event`<{ `data`: `FlowNodeJSON` ; `json`: `FlowNodeJSON` ; `node`: `FlowNodeEntity`  }>

#### Inherited from

FlowDocument.onNodeUpdate

***

### onReload

`Readonly` **onReload**: `Event`<[`WorkflowDocument`](/auto-docs/free-layout-core/classes/WorkflowDocument.md)>

***

### options

**options**: [`WorkflowDocumentOptions`](/auto-docs/free-layout-core/variables/WorkflowDocumentOptions-1.md) = `{}`

#### Overrides

FlowDocument.options

***

### originTree

**originTree**: `FlowVirtualTree`<`FlowNodeEntity`>

原始的 tree 结构

#### Inherited from

FlowDocument.originTree

***

### playgroundConfig

**playgroundConfig**: `PlaygroundConfigEntity`

***

### playgroundContext

**playgroundContext**: `any`

***

### renderState

**renderState**: `FlowRendererStateEntity`

渲染相关的全局轧辊台

#### Inherited from

FlowDocument.renderState

***

### renderTree

**renderTree**: `FlowRenderTree`<`FlowNodeEntity`>

渲染后的 tree 结构

#### Inherited from

FlowDocument.renderTree

***

### root

**root**: `FlowNodeEntity`

#### Inherited from

FlowDocument.root

***

### selectServices

**selectServices**: [`WorkflowSelectService`](/auto-docs/free-layout-core/classes/WorkflowSelectService.md)

***

### transformer

**transformer**: `FlowDocumentTransformerEntity`

#### Inherited from

FlowDocument.transformer

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

**addBlock**(`target`, `blockData`, `addedNodes?`, `parent?`, `index?`): `FlowNodeEntity`

添加单个 block

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | `FlowNodeEntity` |  |
| `blockData` | `FlowNodeJSON` |  |
| `addedNodes?` | `FlowNodeEntity`\[] |  |
| `parent?` | `FlowNodeEntity` | 默认去找 $inlineBlocks$ |
| `index?` | `number` | - |

#### Returns

`FlowNodeEntity`

#### Inherited from

FlowDocument.addBlock

***

### addBlocksAsChildren

**addBlocksAsChildren**(`parent`, `blocks`, `addedNodes?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | `FlowNodeEntity` |
| `blocks` | `FlowNodeJSON`\[] |
| `addedNodes?` | `FlowNodeEntity`\[] |

#### Returns

`void`

#### Inherited from

FlowDocument.addBlocksAsChildren

***

### addFromNode

**addFromNode**(`fromNode`, `json`): `FlowNodeEntity`

从指定节点的下一个节点新增

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | `string` | `FlowNodeEntity` |
| `json` | `FlowNodeJSON` |

#### Returns

`FlowNodeEntity`

#### Inherited from

FlowDocument.addFromNode

***

### addInlineBlocks

**addInlineBlocks**(`node`, `blocks`, `addedNodes?`): `FlowNodeEntity`\[]

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
| `node` | `FlowNodeEntity` |
| `blocks` | `FlowNodeJSON`\[] |
| `addedNodes?` | `FlowNodeEntity`\[] |

#### Returns

`FlowNodeEntity`\[]

#### Inherited from

FlowDocument.addInlineBlocks

***

### addNode

**addNode**(`data`, `addedNodes?`, `ignoreCreateAndUpdateEvent?`): `FlowNodeEntity`

添加节点，如果节点已经存在则不会重复创建

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `AddNodeData` |
| `addedNodes?` | `FlowNodeEntity`\[] |
| `ignoreCreateAndUpdateEvent?` | `boolean` |

#### Returns

`FlowNodeEntity`

#### Overrides

FlowDocument.addNode

***

### batchAddFromJSON

**batchAddFromJSON**(`json`, `options?`): `Object`

批量添加节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`WorkflowJSON`](/auto-docs/free-layout-core/interfaces/WorkflowJSON.md) |
| `options?` | `Object` |
| `options.onEdgeCreated?` | (`edge`: [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)) => `void` |
| `options.onNodeCreated?` | (`node`: `FlowNodeEntity`) => `void` |
| `options.parent?` | `FlowNodeEntity` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `edges` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[] |
| `nodes` | `FlowNodeEntity`\[] |

***

### canRemove

**canRemove**(`node`, `silent?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntity` |
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

**copyNode**(`node`, `newNodeId?`, `format?`, `position?`): `FlowNodeEntity`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntity` |
| `newNodeId?` | `string` |
| `format?` | (`json`: [`WorkflowNodeJSON`](/auto-docs/free-layout-core/interfaces/WorkflowNodeJSON.md)) => [`WorkflowNodeJSON`](/auto-docs/free-layout-core/interfaces/WorkflowNodeJSON.md) |
| `position?` | `IPoint` |

#### Returns

`FlowNodeEntity`

***

### copyNodeFromJSON

**copyNodeFromJSON**(`flowNodeType`, `nodeJSON`, `newNodeId?`, `position?`, `parentID?`): `FlowNodeEntity`

#### Parameters

| Name | Type |
| :------ | :------ |
| `flowNodeType` | `string` |
| `nodeJSON` | [`WorkflowNodeJSON`](/auto-docs/free-layout-core/interfaces/WorkflowNodeJSON.md) |
| `newNodeId?` | `string` |
| `position?` | `IPoint` |
| `parentID?` | `string` |

#### Returns

`FlowNodeEntity`

***

### createWorkflowNode

**createWorkflowNode**(`json`, `isClone?`, `parentID?`): `FlowNodeEntity`

创建流程节点

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `json` | [`WorkflowNodeJSON`](/auto-docs/free-layout-core/interfaces/WorkflowNodeJSON.md) | `undefined` |  |
| `isClone` | `boolean` | `false` | **`Deprecated`** |
| `parentID?` | `string` | `undefined` | - |

#### Returns

`FlowNodeEntity`

***

### createWorkflowNodeByType

**createWorkflowNodeByType**(`type`, `position?`, `json?`, `parentID?`): `FlowNodeEntity`

通过类型创建节点, 如果没有提供position 则直接放在画布中间

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` | `number` |
| `position?` | `IPoint` |
| `json` | `Partial`<[`WorkflowNodeJSON`](/auto-docs/free-layout-core/interfaces/WorkflowNodeJSON.md)> |
| `parentID?` | `string` |

#### Returns

`FlowNodeEntity`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Overrides

FlowDocument.dispose

***

### fireContentChange

**fireContentChange**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`WorkflowContentChangeEvent`](/auto-docs/free-layout-core/interfaces/WorkflowContentChangeEvent.md) |

#### Returns

`void`

***

### fireRender

**fireRender**(): `void`

触发渲染

#### Returns

`void`

#### Overrides

FlowDocument.fireRender

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

| Name | Type | Default value |
| :------ | :------ | :------ |
| `json` | `Partial`<[`WorkflowJSON`](/auto-docs/free-layout-core/interfaces/WorkflowJSON.md)> | `undefined` |
| `fireRender` | `boolean` | `true` |

#### Returns

`void`

#### Overrides

FlowDocument.fromJSON

***

### getAllEdges

**getAllEdges**(): [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

#### Returns

[`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

***

### getAllNodes

**getAllNodes**(): `FlowNodeEntity`\[]

#### Returns

`FlowNodeEntity`\[]

#### Overrides

FlowDocument.getAllNodes

***

### getAllPorts

**getAllPorts**(): [`WorkflowPortEntity`](/auto-docs/free-layout-core/classes/WorkflowPortEntity.md)\[]

#### Returns

[`WorkflowPortEntity`](/auto-docs/free-layout-core/classes/WorkflowPortEntity.md)\[]

***

### getAssociatedNodes

**getAssociatedNodes**(): `FlowNodeEntity`\[]

获取画布中的非游离节点

1. 开始节点
2. 从开始节点出发能走到的节点
3. 结束节点
4. 默认所有子画布内节点为游离节点

#### Returns

`FlowNodeEntity`\[]

***

### getNode

**getNode**(`id`): `undefined` | `FlowNodeEntity`

根据 id 获取节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` | `FlowNodeEntity`

#### Inherited from

FlowDocument.getNode

***

### getNodeRegister

**getNodeRegister**<`T`>(`type`, `originParent?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `FlowNodeRegistry`<`FlowNodeMeta`, `T`> = `FlowNodeRegistry`<`FlowNodeMeta`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `FlowNodeType` |
| `originParent?` | `FlowNodeEntity` |

#### Returns

`T`

**`Deprecated`**

use `getNodeRegistry` instead

#### Inherited from

FlowDocument.getNodeRegister

***

### getNodeRegistry

**getNodeRegistry**<`T`>(`type`, `originParent?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `FlowNodeRegistry`<`FlowNodeMeta`, `T`> = `FlowNodeRegistry`<`FlowNodeMeta`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `FlowNodeType` |
| `originParent?` | `FlowNodeEntity` |

#### Returns

`T`

#### Inherited from

FlowDocument.getNodeRegistry

***

### getRenderDatas

**getRenderDatas**<`T`>(`dataRegistry`, `containHiddenNodes?`): `T`\[]

返回需要渲染的数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `EntityData`<`any`, {}, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataRegistry` | `EntityDataRegistry`<`T`> |
| `containHiddenNodes?` | `boolean` |

#### Returns

`T`\[]

#### Inherited from

FlowDocument.getRenderDatas

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

FlowDocument.hasNode

***

### init

**init**(): `void`

#### Returns

`void`

#### Overrides

FlowDocument.init

***

### isErrorPort

**isErrorPort**(`port`, `defaultValue?`): `boolean`

判断端口是否为错误态

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `port` | [`WorkflowPortEntity`](/auto-docs/free-layout-core/classes/WorkflowPortEntity.md) | `undefined` |
| `defaultValue` | `boolean` | `false` |

#### Returns

`boolean`

***

### isExtend

**isExtend**(`currentType`, `extendType`): `boolean`

Check node extend

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentType` | `FlowNodeType` |
| `extendType` | `FlowNodeType` |

#### Returns

`boolean`

#### Inherited from

FlowDocument.isExtend

***

### isTypeOrExtendType

**isTypeOrExtendType**(`currentType`, `extendType`): `boolean`

Check node type

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentType` | `FlowNodeType` |
| `extendType` | `FlowNodeType` |

#### Returns

`boolean`

#### Inherited from

FlowDocument.isTypeOrExtendType

***

### load

**load**(): `Promise`<`void`>

#### Returns

`Promise`<`void`>

#### Overrides

FlowDocument.load

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

FlowDocument.moveChildNodes

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

FlowDocument.moveNodes

***

### registerFlowNodes

**registerFlowNodes**<`T`>(`...registries`): `void`

注册节点

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `FlowNodeRegistry`<`any`, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...registries` | `T`\[] |

#### Returns

`void`

#### Inherited from

FlowDocument.registerFlowNodes

***

### registerLayout

**registerLayout**(`layout`): `void`

注册布局

#### Parameters

| Name | Type |
| :------ | :------ |
| `layout` | `FlowLayout` |

#### Returns

`void`

#### Inherited from

FlowDocument.registerLayout

***

### registerNodeDatas

**registerNodeDatas**(`...nodeDatas`): `void`

节点注入数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `...nodeDatas` | `EntityDataRegistry`<`EntityData`<`any`, {}>>\[] |

#### Returns

`void`

#### Inherited from

FlowDocument.registerNodeDatas

***

### reload

**reload**(`json`, `delayTime?`): `Promise`<`void`>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `json` | [`WorkflowJSON`](/auto-docs/free-layout-core/interfaces/WorkflowJSON.md) | `undefined` |
| `delayTime` | `number` | `0` |

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
| `node` | `string` | `FlowNodeEntity` |

#### Returns

`void`

#### Inherited from

FlowDocument.removeNode

***

### renderJSON

**renderJSON**(`json`, `options?`): `Object`

批量添加节点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | [`WorkflowJSON`](/auto-docs/free-layout-core/interfaces/WorkflowJSON.md) |  |
| `options?` | `Object` |  |
| `options.isClone?` | `boolean` | **`Deprecated`** useless api |
| `options.parent?` | `FlowNodeEntity` | - |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `edges` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[] |
| `nodes` | `FlowNodeEntity`\[] |

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

FlowDocument.setLayout

***

### toJSON

**toJSON**(): [`WorkflowJSON`](/auto-docs/free-layout-core/interfaces/WorkflowJSON.md)

导出数据

#### Returns

[`WorkflowJSON`](/auto-docs/free-layout-core/interfaces/WorkflowJSON.md)

#### Overrides

FlowDocument.toJSON

***

### toNodeJSON

**toNodeJSON**(`node`): [`WorkflowNodeJSON`](/auto-docs/free-layout-core/interfaces/WorkflowNodeJSON.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntity` |

#### Returns

[`WorkflowNodeJSON`](/auto-docs/free-layout-core/interfaces/WorkflowNodeJSON.md)

#### Overrides

FlowDocument.toNodeJSON

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

FlowDocument.toString

***

### toggleFixedLayout

**toggleFixedLayout**(): `void`

切换垂直或水平布局

#### Returns

`void`

#### Inherited from

FlowDocument.toggleFixedLayout

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
| `fn` | (`node`: `FlowNodeEntity`, `depth`: `number`, `index`: `number`) => `boolean` | `void` |
| `node?` | `FlowNodeEntity` |
| `depth?` | `number` |

#### Returns

`boolean` | `void`

isBreak

#### Inherited from

FlowDocument.traverse
