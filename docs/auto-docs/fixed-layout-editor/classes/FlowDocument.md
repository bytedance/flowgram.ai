# Class: FlowDocument\<T>

流程整个文档数据

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`FlowDocumentJSON`](/auto-docs/fixed-layout-editor/types/FlowDocumentJSON.md) |

## Implements

* [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#constructor)

### Properties

* [config](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#config)
* [onLayoutChange](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#onlayoutchange)
* [onNodeCreate](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#onnodecreate)
* [onNodeDispose](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#onnodedispose)
* [onNodeUpdate](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#onnodeupdate)
* [options](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#options)
* [originTree](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#origintree)
* [renderState](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#renderstate)
* [renderTree](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#rendertree)
* [root](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#root)
* [transformer](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#transformer)

### Accessors

* [disposed](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#disposed)
* [layout](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#layout)
* [loading](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#loading)
* [size](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#size)

### Methods

* [addBlock](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#addblock)
* [addBlocksAsChildren](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#addblocksaschildren)
* [addFromNode](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#addfromnode)
* [addInlineBlocks](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#addinlineblocks)
* [addNode](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#addnode)
* [dispose](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#dispose)
* [fireRender](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#firerender)
* [fromJSON](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#fromjson)
* [getAllNodes](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#getallnodes)
* [getNode](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#getnode)
* [getNodeRegister](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#getnoderegister)
* [getNodeRegistry](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#getnoderegistry)
* [getRenderDatas](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#getrenderdatas)
* [hasNode](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#hasnode)
* [init](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#init)
* [isExtend](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#isextend)
* [isTypeOrExtendType](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#istypeorextendtype)
* [load](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#load)
* [moveChildNodes](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#movechildnodes)
* [moveNodes](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#movenodes)
* [registerFlowNodes](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#registerflownodes)
* [registerLayout](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#registerlayout)
* [registerNodeDatas](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#registernodedatas)
* [removeNode](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#removenode)
* [setLayout](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#setlayout)
* [toJSON](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#tojson)
* [toNodeJSON](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#tonodejson)
* [toString](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#tostring)
* [toggleFixedLayout](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#togglefixedlayout)
* [traverse](/auto-docs/fixed-layout-editor/classes/FlowDocument.md#traverse)

## Constructors

### constructor

**new FlowDocument**<`T`>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`FlowDocumentJSON`](/auto-docs/fixed-layout-editor/types/FlowDocumentJSON.md) |

## Properties

### config

`Readonly` **config**: [`FlowDocumentConfig`](/auto-docs/fixed-layout-editor/classes/FlowDocumentConfig.md)

***

### onLayoutChange

`Readonly` **onLayoutChange**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`FlowLayout`](/auto-docs/fixed-layout-editor/variables/FlowLayout-1.md)>

***

### onNodeCreate

`Readonly` **onNodeCreate**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<{ `data`: [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) ; `json`: [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) ; `node`: [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)  }>

***

### onNodeDispose

`Readonly` **onNodeDispose**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<{ `node`: [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)  }>

***

### onNodeUpdate

`Readonly` **onNodeUpdate**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<{ `data`: [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) ; `json`: [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) ; `node`: [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)  }>

***

### options

**options**: [`FlowDocumentOptions`](/auto-docs/fixed-layout-editor/variables/FlowDocumentOptions-1.md)

流程画布配置项

***

### originTree

**originTree**: [`FlowVirtualTree`](/auto-docs/fixed-layout-editor/classes/FlowVirtualTree-1.md)<[`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)>

原始的 tree 结构

***

### renderState

**renderState**: [`FlowRendererStateEntity`](/auto-docs/fixed-layout-editor/classes/FlowRendererStateEntity.md)

渲染相关的全局轧辊台

***

### renderTree

**renderTree**: `FlowRenderTree`<[`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)>

渲染后的 tree 结构

***

### root

**root**: [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

***

### transformer

**transformer**: [`FlowDocumentTransformerEntity`](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md)

## Accessors

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

***

### layout

`get` **layout**(): [`FlowLayout`](/auto-docs/fixed-layout-editor/variables/FlowLayout-1.md)

#### Returns

[`FlowLayout`](/auto-docs/fixed-layout-editor/variables/FlowLayout-1.md)

***

### loading

`get` **loading**(): `boolean`

#### Returns

`boolean`

***

### size

`get` **size**(): `number`

#### Returns

`number`

## Methods

### addBlock

**addBlock**(`target`, `blockData`, `addedNodes?`, `parent?`, `index?`): [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

添加单个 block

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |  |
| `blockData` | [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) |  |
| `addedNodes?` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)\[] |  |
| `parent?` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) | 默认去找 $inlineBlocks$ |
| `index?` | `number` | - |

#### Returns

[`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

***

### addBlocksAsChildren

**addBlocksAsChildren**(`parent`, `blocks`, `addedNodes?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `blocks` | [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md)\[] |
| `addedNodes?` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`void`

***

### addFromNode

**addFromNode**(`fromNode`, `json`): [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

从指定节点的下一个节点新增

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | `string` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `json` | [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) |

#### Returns

[`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

***

### addInlineBlocks

**addInlineBlocks**(`node`, `blocks`, `addedNodes?`): [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)\[]

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
| `node` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `blocks` | [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md)\[] |
| `addedNodes?` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

[`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)\[]

***

### addNode

**addNode**(`data`, `addedNodes?`): [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

添加节点，如果节点已经存在则不会重复创建

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`AddNodeData`](/auto-docs/fixed-layout-editor/types/AddNodeData.md) |
| `addedNodes?` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

[`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md).[dispose](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md#dispose)

***

### fireRender

**fireRender**(): `void`

触发 render

#### Returns

`void`

***

### fromJSON

**fromJSON**(`json`, `fireRender?`): `void`

加载数据，可以被重载

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `any` | 文档数据更新 |
| `fireRender?` | `boolean` | 是否要触发渲染，默认 true |

#### Returns

`void`

***

### getAllNodes

**getAllNodes**(): [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)\[]

#### Returns

[`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)\[]

***

### getNode

**getNode**(`id`): `undefined` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

根据 id 获取节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

***

### getNodeRegister

**getNodeRegister**<`T`>(`type`, `originParent?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FlowNodeRegistry`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeMeta.md), `T`> = [`FlowNodeRegistry`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeMeta.md)> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`FlowNodeType`](/auto-docs/fixed-layout-editor/types/FlowNodeType.md) |
| `originParent?` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`T`

**`Deprecated`**

use `getNodeRegistry` instead

***

### getNodeRegistry

**getNodeRegistry**<`T`>(`type`, `originParent?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FlowNodeRegistry`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeMeta.md), `T`> = [`FlowNodeRegistry`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeMeta.md)> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`FlowNodeType`](/auto-docs/fixed-layout-editor/types/FlowNodeType.md) |
| `originParent?` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`T`

***

### getRenderDatas

**getRenderDatas**<`T`>(`dataRegistry`, `containHiddenNodes?`): `T`\[]

返回需要渲染的数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataRegistry` | [`EntityDataRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<`T`> |
| `containHiddenNodes?` | `boolean` |

#### Returns

`T`\[]

***

### hasNode

**hasNode**(`nodeId`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeId` | `string` |

#### Returns

`boolean`

***

### init

**init**(): `void`

#### Returns

`void`

***

### isExtend

**isExtend**(`currentType`, `extendType`): `boolean`

Check node extend

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentType` | [`FlowNodeType`](/auto-docs/fixed-layout-editor/types/FlowNodeType.md) |
| `extendType` | [`FlowNodeType`](/auto-docs/fixed-layout-editor/types/FlowNodeType.md) |

#### Returns

`boolean`

***

### isTypeOrExtendType

**isTypeOrExtendType**(`currentType`, `extendType`): `boolean`

Check node type

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentType` | [`FlowNodeType`](/auto-docs/fixed-layout-editor/types/FlowNodeType.md) |
| `extendType` | [`FlowNodeType`](/auto-docs/fixed-layout-editor/types/FlowNodeType.md) |

#### Returns

`boolean`

***

### load

**load**(): `Promise`<`void`>

#### Returns

`Promise`<`void`>

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

***

### registerFlowNodes

**registerFlowNodes**<`T`>(`...registries`): `void`

注册节点

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FlowNodeRegistry`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeRegistry-1.md)<`any`, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...registries` | `T`\[] |

#### Returns

`void`

***

### registerLayout

**registerLayout**(`layout`): `void`

注册布局

#### Parameters

| Name | Type |
| :------ | :------ |
| `layout` | [`FlowLayout`](/auto-docs/fixed-layout-editor/variables/FlowLayout-1.md) |

#### Returns

`void`

***

### registerNodeDatas

**registerNodeDatas**(`...nodeDatas`): `void`

节点注入数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `...nodeDatas` | [`EntityDataRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>>\[] |

#### Returns

`void`

***

### removeNode

**removeNode**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `string` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`void`

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

***

### toJSON

**toJSON**(): `any`

导出数据，可以重载

#### Returns

`any`

***

### toNodeJSON

**toNodeJSON**(`node`): [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

[`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md)

***

### toString

**toString**(`showType?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `showType?` | `boolean` |

#### Returns

`string`

***

### toggleFixedLayout

**toggleFixedLayout**(): `void`

切换垂直或水平布局

#### Returns

`void`

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
| `fn` | (`node`: [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md), `depth`: `number`, `index`: `number`) => `boolean` | `void` |
| `node?` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `depth?` | `number` |

#### Returns

`boolean` | `void`

isBreak
