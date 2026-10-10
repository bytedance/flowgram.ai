# Class: FlowNodeEntity

## Hierarchy

* `Entity`<[`FlowNodeEntityConfig`](/auto-docs/document/interfaces/FlowNodeEntityConfig.md)>

  ↳ **`FlowNodeEntity`**

## Table of contents

### Constructors

* [constructor](/auto-docs/document/classes/FlowNodeEntity-1.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/auto-docs/document/classes/FlowNodeEntity-1.md#__opts_type__)
* [document](/auto-docs/document/classes/FlowNodeEntity-1.md#document)
* [entityManager](/auto-docs/document/classes/FlowNodeEntity-1.md#entitymanager)
* [flowNodeType](/auto-docs/document/classes/FlowNodeEntity-1.md#flownodetype)
* [index](/auto-docs/document/classes/FlowNodeEntity-1.md#index)
* [metaFromJSON](/auto-docs/document/classes/FlowNodeEntity-1.md#metafromjson)
* [onDataChange](/auto-docs/document/classes/FlowNodeEntity-1.md#ondatachange)
* [onEntityChange](/auto-docs/document/classes/FlowNodeEntity-1.md#onentitychange)
* [originParent](/auto-docs/document/classes/FlowNodeEntity-1.md#originparent)
* [preDispose](/auto-docs/document/classes/FlowNodeEntity-1.md#predispose)
* [toDispose](/auto-docs/document/classes/FlowNodeEntity-1.md#todispose)
* [type](/auto-docs/document/classes/FlowNodeEntity-1.md#type)

### Accessors

* [allChildren](/auto-docs/document/classes/FlowNodeEntity-1.md#allchildren)
* [allCollapsedChildren](/auto-docs/document/classes/FlowNodeEntity-1.md#allcollapsedchildren)
* [blocks](/auto-docs/document/classes/FlowNodeEntity-1.md#blocks)
* [bounds](/auto-docs/document/classes/FlowNodeEntity-1.md#bounds)
* [children](/auto-docs/document/classes/FlowNodeEntity-1.md#children)
* [childrenLength](/auto-docs/document/classes/FlowNodeEntity-1.md#childrenlength)
* [collapsed](/auto-docs/document/classes/FlowNodeEntity-1.md#collapsed)
* [collapsedChildren](/auto-docs/document/classes/FlowNodeEntity-1.md#collapsedchildren)
* [context](/auto-docs/document/classes/FlowNodeEntity-1.md#context)
* [disposed](/auto-docs/document/classes/FlowNodeEntity-1.md#disposed)
* [firstChild](/auto-docs/document/classes/FlowNodeEntity-1.md#firstchild)
* [hasChild](/auto-docs/document/classes/FlowNodeEntity-1.md#haschild)
* [hidden](/auto-docs/document/classes/FlowNodeEntity-1.md#hidden)
* [id](/auto-docs/document/classes/FlowNodeEntity-1.md#id)
* [isFirst](/auto-docs/document/classes/FlowNodeEntity-1.md#isfirst)
* [isInlineBlock](/auto-docs/document/classes/FlowNodeEntity-1.md#isinlineblock)
* [isInlineBlocks](/auto-docs/document/classes/FlowNodeEntity-1.md#isinlineblocks)
* [isLast](/auto-docs/document/classes/FlowNodeEntity-1.md#islast)
* [isNodeEnd](/auto-docs/document/classes/FlowNodeEntity-1.md#isnodeend)
* [isStart](/auto-docs/document/classes/FlowNodeEntity-1.md#isstart)
* [isVertical](/auto-docs/document/classes/FlowNodeEntity-1.md#isvertical)
* [lastBlock](/auto-docs/document/classes/FlowNodeEntity-1.md#lastblock)
* [lastChild](/auto-docs/document/classes/FlowNodeEntity-1.md#lastchild)
* [lastCollapsedChild](/auto-docs/document/classes/FlowNodeEntity-1.md#lastcollapsedchild)
* [next](/auto-docs/document/classes/FlowNodeEntity-1.md#next)
* [onDispose](/auto-docs/document/classes/FlowNodeEntity-1.md#ondispose)
* [onExtInfoChange](/auto-docs/document/classes/FlowNodeEntity-1.md#onextinfochange)
* [parent](/auto-docs/document/classes/FlowNodeEntity-1.md#parent)
* [pre](/auto-docs/document/classes/FlowNodeEntity-1.md#pre)
* [renderData](/auto-docs/document/classes/FlowNodeEntity-1.md#renderdata)
* [savedInManager](/auto-docs/document/classes/FlowNodeEntity-1.md#savedinmanager)
* [transform](/auto-docs/document/classes/FlowNodeEntity-1.md#transform)
* [type](/auto-docs/document/classes/FlowNodeEntity-1.md#type-1)
* [version](/auto-docs/document/classes/FlowNodeEntity-1.md#version)

### Methods

* [addChild](/auto-docs/document/classes/FlowNodeEntity-1.md#addchild)
* [addData](/auto-docs/document/classes/FlowNodeEntity-1.md#adddata)
* [addInitializeData](/auto-docs/document/classes/FlowNodeEntity-1.md#addinitializedata)
* [clearMemoGlobal](/auto-docs/document/classes/FlowNodeEntity-1.md#clearmemoglobal)
* [clearMemoLocal](/auto-docs/document/classes/FlowNodeEntity-1.md#clearmemolocal)
* [dispose](/auto-docs/document/classes/FlowNodeEntity-1.md#dispose)
* [fromJSON](/auto-docs/document/classes/FlowNodeEntity-1.md#fromjson)
* [getData](/auto-docs/document/classes/FlowNodeEntity-1.md#getdata)
* [getDefaultDataRegistries](/auto-docs/document/classes/FlowNodeEntity-1.md#getdefaultdataregistries)
* [getExtInfo](/auto-docs/document/classes/FlowNodeEntity-1.md#getextinfo)
* [getJSONData](/auto-docs/document/classes/FlowNodeEntity-1.md#getjsondata)
* [getNodeMeta](/auto-docs/document/classes/FlowNodeEntity-1.md#getnodemeta)
* [getNodeRegister](/auto-docs/document/classes/FlowNodeEntity-1.md#getnoderegister)
* [getNodeRegistry](/auto-docs/document/classes/FlowNodeEntity-1.md#getnoderegistry)
* [getService](/auto-docs/document/classes/FlowNodeEntity-1.md#getservice)
* [hasData](/auto-docs/document/classes/FlowNodeEntity-1.md#hasdata)
* [initData](/auto-docs/document/classes/FlowNodeEntity-1.md#initdata)
* [isExtend](/auto-docs/document/classes/FlowNodeEntity-1.md#isextend)
* [isTypeOrExtendType](/auto-docs/document/classes/FlowNodeEntity-1.md#istypeorextendtype)
* [memoGlobal](/auto-docs/document/classes/FlowNodeEntity-1.md#memoglobal)
* [memoLocal](/auto-docs/document/classes/FlowNodeEntity-1.md#memolocal)
* [openInsideCollapsed](/auto-docs/document/classes/FlowNodeEntity-1.md#openinsidecollapsed)
* [removeData](/auto-docs/document/classes/FlowNodeEntity-1.md#removedata)
* [reset](/auto-docs/document/classes/FlowNodeEntity-1.md#reset)
* [toJSON](/auto-docs/document/classes/FlowNodeEntity-1.md#tojson)
* [updateData](/auto-docs/document/classes/FlowNodeEntity-1.md#updatedata)
* [updateExtInfo](/auto-docs/document/classes/FlowNodeEntity-1.md#updateextinfo)

## Constructors

### constructor

**new FlowNodeEntity**(`conf`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `conf` | [`FlowNodeEntityConfig`](/auto-docs/document/interfaces/FlowNodeEntityConfig.md) |

#### Overrides

Entity\&lt;FlowNodeEntityConfig\&gt;.constructor

## Properties

### \_\_opts\_type\_\_

**\_\_opts\_type\_\_**: [`FlowNodeEntityConfig`](/auto-docs/document/interfaces/FlowNodeEntityConfig.md)

#### Inherited from

Entity.\_\_opts\_type\_\_

***

### document

**document**: [`FlowDocument`](/auto-docs/document/classes/FlowDocument.md)<[`FlowDocumentJSON`](/auto-docs/document/types/FlowDocumentJSON.md)>

文档引用

***

### entityManager

`Readonly` **entityManager**: `EntityManager`

全局的entity管理器

#### Inherited from

Entity.entityManager

***

### flowNodeType

**flowNodeType**: [`FlowNodeType`](/auto-docs/document/types/FlowNodeType.md) = `'unknown'`

***

### index

**index**: `number` = `-1`

***

### metaFromJSON

`Optional` **metaFromJSON**: [`FlowNodeMeta`](/auto-docs/document/interfaces/FlowNodeMeta.md)

***

### onDataChange

`Readonly` **onDataChange**: `Event`<`EntityDataChangedEvent`<`Entity`<`EntityOpts`>>>

数据更改事件

#### Inherited from

Entity.onDataChange

***

### onEntityChange

`Readonly` **onEntityChange**: `Event`<`Entity`<`EntityOpts`>>

修改会触发

#### Inherited from

Entity.onEntityChange

***

### originParent

`Optional` **originParent**: [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

真实的父节点，条件块在内部会创建一些空的块节点，这些块需要关联它真实的父亲节点

***

### preDispose

`Readonly` **preDispose**: `DisposableCollection`

销毁前事件管理

#### Inherited from

Entity.preDispose

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

销毁事件管理

#### Inherited from

Entity.toDispose

***

### type

`Static` **type**: `string` = `'FlowNodeEntity'`

#### Overrides

Entity.type

## Accessors

### allChildren

`get` **allChildren**(): [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)\[]

获取所有子节点，包含 child 及其所有兄弟节点

#### Returns

[`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)\[]

***

### allCollapsedChildren

`get` **allCollapsedChildren**(): [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)\[]

获取所有收起的子节点，包含 child 及其所有兄弟节点

#### Returns

[`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)\[]

***

### blocks

`get` **blocks**(): [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)\[]

Get child blocks

#### Returns

[`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)\[]

***

### bounds

`get` **bounds**(): `Rectangle`

获取节点的位置及大小矩形

#### Returns

`Rectangle`

***

### children

`get` **children**(): [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)\[]

获取子节点，如果子节点收起来，则会返回 空数组

#### Returns

[`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)\[]

***

### childrenLength

`get` **childrenLength**(): `number`

#### Returns

`number`

***

### collapsed

`get` **collapsed**(): `boolean`

#### Returns

`boolean`

`set` **collapsed**(`collapsed`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `collapsed` | `boolean` |

#### Returns

`void`

***

### collapsedChildren

`get` **collapsedChildren**(): [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)\[]

Get child blocks

use `blocks` instead

#### Returns

[`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)\[]

**`Deprecated`**

***

### context

`get` **context**(): `any`

#### Returns

`any`

#### Inherited from

Entity.context

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Entity.disposed

***

### firstChild

`get` **firstChild**(): `undefined` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

#### Returns

`undefined` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

***

### hasChild

`get` **hasChild**(): `boolean`

#### Returns

`boolean`

***

### hidden

`get` **hidden**(): `boolean`

#### Returns

`boolean`

***

### id

`get` **id**(): `string`

实体 id

#### Returns

`string`

#### Inherited from

Entity.id

***

### isFirst

`get` **isFirst**(): `boolean`

#### Returns

`boolean`

***

### isInlineBlock

`get` **isInlineBlock**(): `boolean`

水平节点

#### Returns

`boolean`

***

### isInlineBlocks

`get` **isInlineBlocks**(): `boolean`

子节点采用水平布局

#### Returns

`boolean`

***

### isLast

`get` **isLast**(): `boolean`

#### Returns

`boolean`

***

### isNodeEnd

`get` **isNodeEnd**(): `boolean`

节点结束标记

* 当前节点是结束节点
* 当前节点最后一个节点包含结束标记
* 当前节点为 inlineBlock，每一个 block 包含结束标记

由子元素确定，因此使用 memoLocal

#### Returns

`boolean`

***

### isStart

`get` **isStart**(): `boolean`

#### Returns

`boolean`

***

### isVertical

`get` **isVertical**(): `boolean`

#### Returns

`boolean`

***

### lastBlock

`get` **lastBlock**(): `undefined` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

Get last block

#### Returns

`undefined` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

***

### lastChild

`get` **lastChild**(): `undefined` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

#### Returns

`undefined` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

***

### lastCollapsedChild

`get` **lastCollapsedChild**(): `undefined` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

use `lastBlock` instead

#### Returns

`undefined` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

***

### next

`get` **next**(): `undefined` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

#### Returns

`undefined` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

***

### onDispose

`get` **onDispose**(): `Event`<`void`>

销毁事件

#### Returns

`Event`<`void`>

#### Inherited from

Entity.onDispose

***

### onExtInfoChange

`get` **onExtInfoChange**(): `Event`<{ `newInfo`: `any` ; `oldInfo`: `any`  }>

#### Returns

`Event`<{ `newInfo`: `any` ; `oldInfo`: `any`  }>

***

### parent

`get` **parent**(): `undefined` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

#### Returns

`undefined` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

***

### pre

`get` **pre**(): `undefined` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

#### Returns

`undefined` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

***

### renderData

`get` **renderData**(): [`FlowNodeRenderData`](/auto-docs/document/classes/FlowNodeRenderData.md)

获取渲染数据

#### Returns

[`FlowNodeRenderData`](/auto-docs/document/classes/FlowNodeRenderData.md)

***

### savedInManager

`get` **savedInManager**(): `boolean`

是否存到全局 manager，默认 true

#### Returns

`boolean`

#### Inherited from

Entity.savedInManager

***

### transform

`get` **transform**(): [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)

获取位置大小数据

#### Returns

[`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)

***

### type

`get` **type**(): `string`

实体类型

#### Returns

`string`

#### Inherited from

Entity.type

***

### version

`get` **version**(): `number`

实体的版本

#### Returns

`number`

#### Inherited from

Entity.version

## Methods

### addChild

**addChild**(`child`, `index?`): `void`

添加 子节点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `child` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) | 插入节点 |
| `index?` | `number` | - |

#### Returns

`void`

***

### addData

**addData**<`D`>(`Registry`, `defaultProps?`): `D`

添加数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends `EntityData`<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | `EntityDataRegistry`<`EntityData`<`any`, {}>> |
| `defaultProps?` | `EntityDataProps`<`D`> |

#### Returns

`D`

#### Inherited from

Entity.addData

***

### addInitializeData

**addInitializeData**(`datas`, `dataConfig?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `datas` | `EntityDataRegistry`<`EntityData`<`any`, {}>>\[] |
| `dataConfig?` | `any` |

#### Returns

`void`

#### Inherited from

Entity.addInitializeData

***

### clearMemoGlobal

**clearMemoGlobal**(): `void`

#### Returns

`void`

***

### clearMemoLocal

**clearMemoLocal**(): `void`

#### Returns

`void`

***

### dispose

**dispose**(): `void`

销毁实体

#### Returns

`void`

#### Inherited from

Entity.dispose

***

### fromJSON

**fromJSON**(`data?`): `void`

还原数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `data?` | `any` |

#### Returns

`void`

#### Inherited from

Entity.fromJSON

***

### getData

**getData**<`D`>(`Registry`): `D`

获取 data 数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends `EntityData`<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | `EntityDataRegistry`<`D`> |

#### Returns

`D`

#### Inherited from

Entity.getData

***

### getDefaultDataRegistries

**getDefaultDataRegistries**(): `EntityDataRegistry`<`EntityData`<`any`, {}>>\[]

默认初始化的 Data

#### Returns

`EntityDataRegistry`<`EntityData`<`any`, {}>>\[]

#### Inherited from

Entity.getDefaultDataRegistries

***

### getExtInfo

**getExtInfo**<`T`>(): `T`

获取节点扩展信息

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`> = `Record`<`string`, `any`> |

#### Returns

`T`

***

### getJSONData

**getJSONData**(): `any`

可以重载

#### Returns

`any`

***

### getNodeMeta

**getNodeMeta**<`M`>(): `M` & `Required`<[`FlowNodeMeta`](/auto-docs/document/interfaces/FlowNodeMeta.md)>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `M` | extends [`FlowNodeMeta`](/auto-docs/document/interfaces/FlowNodeMeta.md) = [`FlowNodeMeta`](/auto-docs/document/interfaces/FlowNodeMeta.md) |

#### Returns

`M` & `Required`<[`FlowNodeMeta`](/auto-docs/document/interfaces/FlowNodeMeta.md)>

***

### getNodeRegister

**getNodeRegister**<`M`>(): `M`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `M` | extends [`FlowNodeRegistry`](/auto-docs/document/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/document/interfaces/FlowNodeMeta.md), `M`> = [`FlowNodeRegistry`](/auto-docs/document/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/document/interfaces/FlowNodeMeta.md)> |

#### Returns

`M`

**`Deprecated`**

use getNodeRegistry instead

***

### getNodeRegistry

**getNodeRegistry**<`M`>(): `M`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `M` | extends [`FlowNodeRegistry`](/auto-docs/document/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/document/interfaces/FlowNodeMeta.md), `M`> = [`FlowNodeRegistry`](/auto-docs/document/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/document/interfaces/FlowNodeMeta.md)> & { `meta`: [`FlowNodeMeta`](/auto-docs/document/interfaces/FlowNodeMeta.md)  } |

#### Returns

`M`

***

### getService

**getService**<`T`>(`identifier`): `T`

获取 IOC 服务

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | `ServiceIdentifier`<`T`> |

#### Returns

`T`

#### Inherited from

Entity.getService

***

### hasData

**hasData**(`Registry`): `boolean`

是否有指定数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | `EntityDataRegistry`<`EntityData`<`any`, {}>> |

#### Returns

`boolean`

#### Inherited from

Entity.hasData

***

### initData

**initData**(`initConf`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `initConf` | [`FlowNodeInitData`](/auto-docs/document/interfaces/FlowNodeInitData.md) |

#### Returns

`void`

***

### isExtend

**isExtend**(`parentType`): `boolean`

Check node extend type

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentType` | [`FlowNodeType`](/auto-docs/document/types/FlowNodeType.md) |

#### Returns

`boolean`

***

### isTypeOrExtendType

**isTypeOrExtendType**(`parentType`): `boolean`

Check node type

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentType` | [`FlowNodeType`](/auto-docs/document/types/FlowNodeType.md) |

#### Returns

`boolean`

***

### memoGlobal

**memoGlobal**<`T`>(`key`, `fn`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `fn` | () => `T` |

#### Returns

`T`

***

### memoLocal

**memoLocal**<`T`>(`key`, `fn`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `fn` | () => `T` |

#### Returns

`T`

***

### openInsideCollapsed

**openInsideCollapsed**(): `void`

#### Returns

`void`

***

### removeData

**removeData**<`D`>(`Registry`): `void`

删除数据，初始化状态注入的数据无法被删除

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends `EntityData`<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | `EntityDataRegistry`<`D`> |

#### Returns

`void`

#### Inherited from

Entity.removeData

***

### reset

**reset**(): `void`

重制为初始化状态

#### Returns

`void`

#### Inherited from

Entity.reset

***

### toJSON

**toJSON**(): [`FlowNodeJSON`](/auto-docs/document/interfaces/FlowNodeJSON.md)

生成 JSON

#### Returns

[`FlowNodeJSON`](/auto-docs/document/interfaces/FlowNodeJSON.md)

#### Overrides

Entity.toJSON

***

### updateData

**updateData**<`D`>(`Registry`, `props`): `void`

更新实体的数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends `EntityData`<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | `EntityDataRegistry`<`D`> |
| `props` | `EntityDataProps`<`D`> |

#### Returns

`void`

#### Inherited from

Entity.updateData

***

### updateExtInfo

**updateExtInfo**<`T`>(`extInfo`, `fullUpdate?`): `void`

修改节点扩展信息

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`> = `Record`<`string`, `any`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `extInfo` | `T` |
| `fullUpdate?` | `boolean` |

#### Returns

`void`
