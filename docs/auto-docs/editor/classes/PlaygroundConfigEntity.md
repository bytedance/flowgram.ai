# Class: PlaygroundConfigEntity

全局画布的配置信息

## Hierarchy

* [`ConfigEntity`](/auto-docs/editor/classes/ConfigEntity.md)<[`PlaygroundConfigEntityData`](/auto-docs/editor/interfaces/PlaygroundConfigEntityData.md)>

  ↳ **`PlaygroundConfigEntity`**

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/PlaygroundConfigEntity.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/auto-docs/editor/classes/PlaygroundConfigEntity.md#__opts_type__)
* [cursor](/auto-docs/editor/classes/PlaygroundConfigEntity.md#cursor)
* [entityManager](/auto-docs/editor/classes/PlaygroundConfigEntity.md#entitymanager)
* [getCursors](/auto-docs/editor/classes/PlaygroundConfigEntity.md#getcursors)
* [onDataChange](/auto-docs/editor/classes/PlaygroundConfigEntity.md#ondatachange)
* [onEntityChange](/auto-docs/editor/classes/PlaygroundConfigEntity.md#onentitychange)
* [onGrabDisableChange](/auto-docs/editor/classes/PlaygroundConfigEntity.md#ongrabdisablechange)
* [onReadonlyOrDisabledChange](/auto-docs/editor/classes/PlaygroundConfigEntity.md#onreadonlyordisabledchange)
* [playgroundDomNode](/auto-docs/editor/classes/PlaygroundConfigEntity.md#playgrounddomnode)
* [preDispose](/auto-docs/editor/classes/PlaygroundConfigEntity.md#predispose)
* [toDispose](/auto-docs/editor/classes/PlaygroundConfigEntity.md#todispose)
* [type](/auto-docs/editor/classes/PlaygroundConfigEntity.md#type)

### Accessors

* [config](/auto-docs/editor/classes/PlaygroundConfigEntity.md#config)
* [context](/auto-docs/editor/classes/PlaygroundConfigEntity.md#context)
* [disabled](/auto-docs/editor/classes/PlaygroundConfigEntity.md#disabled)
* [disposed](/auto-docs/editor/classes/PlaygroundConfigEntity.md#disposed)
* [finalScale](/auto-docs/editor/classes/PlaygroundConfigEntity.md#finalscale)
* [grabDisable](/auto-docs/editor/classes/PlaygroundConfigEntity.md#grabdisable)
* [id](/auto-docs/editor/classes/PlaygroundConfigEntity.md#id)
* [loading](/auto-docs/editor/classes/PlaygroundConfigEntity.md#loading)
* [onDispose](/auto-docs/editor/classes/PlaygroundConfigEntity.md#ondispose)
* [readonly](/auto-docs/editor/classes/PlaygroundConfigEntity.md#readonly)
* [readonlyOrDisabled](/auto-docs/editor/classes/PlaygroundConfigEntity.md#readonlyordisabled)
* [savedInManager](/auto-docs/editor/classes/PlaygroundConfigEntity.md#savedinmanager)
* [scrollData](/auto-docs/editor/classes/PlaygroundConfigEntity.md#scrolldata)
* [scrollDisable](/auto-docs/editor/classes/PlaygroundConfigEntity.md#scrolldisable)
* [type](/auto-docs/editor/classes/PlaygroundConfigEntity.md#type-1)
* [version](/auto-docs/editor/classes/PlaygroundConfigEntity.md#version)
* [zoom](/auto-docs/editor/classes/PlaygroundConfigEntity.md#zoom)
* [zoomDisable](/auto-docs/editor/classes/PlaygroundConfigEntity.md#zoomdisable)
* [zoomEnable](/auto-docs/editor/classes/PlaygroundConfigEntity.md#zoomenable)

### Methods

* [addData](/auto-docs/editor/classes/PlaygroundConfigEntity.md#adddata)
* [addInitializeData](/auto-docs/editor/classes/PlaygroundConfigEntity.md#addinitializedata)
* [addScrollLimit](/auto-docs/editor/classes/PlaygroundConfigEntity.md#addscrolllimit)
* [checkChanged](/auto-docs/editor/classes/PlaygroundConfigEntity.md#checkchanged)
* [dispose](/auto-docs/editor/classes/PlaygroundConfigEntity.md#dispose)
* [fitView](/auto-docs/editor/classes/PlaygroundConfigEntity.md#fitview)
* [fixLayerPosition](/auto-docs/editor/classes/PlaygroundConfigEntity.md#fixlayerposition)
* [fromJSON](/auto-docs/editor/classes/PlaygroundConfigEntity.md#fromjson)
* [getClientBounds](/auto-docs/editor/classes/PlaygroundConfigEntity.md#getclientbounds)
* [getData](/auto-docs/editor/classes/PlaygroundConfigEntity.md#getdata)
* [getDefaultConfig](/auto-docs/editor/classes/PlaygroundConfigEntity.md#getdefaultconfig)
* [getDefaultDataRegistries](/auto-docs/editor/classes/PlaygroundConfigEntity.md#getdefaultdataregistries)
* [getPageBounds](/auto-docs/editor/classes/PlaygroundConfigEntity.md#getpagebounds)
* [getPosFromMouseEvent](/auto-docs/editor/classes/PlaygroundConfigEntity.md#getposfrommouseevent)
* [getService](/auto-docs/editor/classes/PlaygroundConfigEntity.md#getservice)
* [getViewport](/auto-docs/editor/classes/PlaygroundConfigEntity.md#getviewport)
* [hasData](/auto-docs/editor/classes/PlaygroundConfigEntity.md#hasdata)
* [isViewportVisible](/auto-docs/editor/classes/PlaygroundConfigEntity.md#isviewportvisible)
* [onConfigChanged](/auto-docs/editor/classes/PlaygroundConfigEntity.md#onconfigchanged)
* [removeData](/auto-docs/editor/classes/PlaygroundConfigEntity.md#removedata)
* [reset](/auto-docs/editor/classes/PlaygroundConfigEntity.md#reset)
* [scroll](/auto-docs/editor/classes/PlaygroundConfigEntity.md#scroll)
* [scrollPageBoundsToCenter](/auto-docs/editor/classes/PlaygroundConfigEntity.md#scrollpageboundstocenter)
* [scrollToView](/auto-docs/editor/classes/PlaygroundConfigEntity.md#scrolltoview)
* [setPageBounds](/auto-docs/editor/classes/PlaygroundConfigEntity.md#setpagebounds)
* [toFixedPos](/auto-docs/editor/classes/PlaygroundConfigEntity.md#tofixedpos)
* [toJSON](/auto-docs/editor/classes/PlaygroundConfigEntity.md#tojson)
* [updateConfig](/auto-docs/editor/classes/PlaygroundConfigEntity.md#updateconfig)
* [updateCursor](/auto-docs/editor/classes/PlaygroundConfigEntity.md#updatecursor)
* [updateData](/auto-docs/editor/classes/PlaygroundConfigEntity.md#updatedata)
* [updateZoom](/auto-docs/editor/classes/PlaygroundConfigEntity.md#updatezoom)
* [zoomin](/auto-docs/editor/classes/PlaygroundConfigEntity.md#zoomin)
* [zoomout](/auto-docs/editor/classes/PlaygroundConfigEntity.md#zoomout)

## Constructors

### constructor

**new PlaygroundConfigEntity**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `any` |

#### Overrides

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[constructor](/auto-docs/editor/classes/ConfigEntity.md#constructor)

## Properties

### \_\_opts\_type\_\_

**\_\_opts\_type\_\_**: [`EntityOpts`](/auto-docs/editor/interfaces/EntityOpts.md)

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[**opts\_type**](/auto-docs/editor/classes/ConfigEntity.md#__opts_type__)

***

### cursor

**cursor**: `string`

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/auto-docs/editor/classes/EntityManager.md)

全局的entity管理器

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[entityManager](/auto-docs/editor/classes/ConfigEntity.md#entitymanager)

***

### getCursors

**getCursors**: `undefined` | () => `undefined` | [`Cursors`](/auto-docs/editor/types/Cursors.md)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`EntityDataChangedEvent`](/auto-docs/editor/interfaces/EntityDataChangedEvent.md)<[`Entity`](/auto-docs/editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/editor/interfaces/EntityOpts.md)>>>

数据更改事件

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[onDataChange](/auto-docs/editor/classes/ConfigEntity.md#ondatachange)

***

### onEntityChange

`Readonly` **onEntityChange**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`Entity`](/auto-docs/editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/editor/interfaces/EntityOpts.md)>>

修改会触发

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[onEntityChange](/auto-docs/editor/classes/ConfigEntity.md#onentitychange)

***

### onGrabDisableChange

`Readonly` **onGrabDisableChange**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<`boolean`>

***

### onReadonlyOrDisabledChange

`Readonly` **onReadonlyOrDisabledChange**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<{ `disabled`: `boolean` ; `readonly`: `boolean`  }>

***

### playgroundDomNode

**playgroundDomNode**: `HTMLElement`

***

### preDispose

`Readonly` **preDispose**: [`DisposableCollection`](/auto-docs/editor/classes/DisposableCollection.md)

销毁前事件管理

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[preDispose](/auto-docs/editor/classes/ConfigEntity.md#predispose)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/editor/classes/DisposableCollection.md)

销毁事件管理

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[toDispose](/auto-docs/editor/classes/ConfigEntity.md#todispose)

***

### type

`Static` **type**: `string`

#### Overrides

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[type](/auto-docs/editor/classes/ConfigEntity.md#type)

## Accessors

### config

`get` **config**(): `P`

#### Returns

`P`

#### Inherited from

ConfigEntity.config

***

### context

`get` **context**(): `any`

#### Returns

`any`

#### Inherited from

ConfigEntity.context

***

### disabled

`get` **disabled**(): `boolean`

#### Returns

`boolean`

`set` **disabled**(`disabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `disabled` | `boolean` |

#### Returns

`void`

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

ConfigEntity.disposed

***

### finalScale

`get` **finalScale**(): `number`

缩放比例
使用 zoom 替代

#### Returns

`number`

**`Deprecated`**

***

### grabDisable

`get` **grabDisable**(): `boolean`

是否禁用抓取拖拽画布能力

#### Returns

`boolean`

`set` **grabDisable**(`grabDisable`): `void`

是否禁用抓取拖拽画布能力

#### Parameters

| Name | Type |
| :------ | :------ |
| `grabDisable` | `boolean` |

#### Returns

`void`

***

### id

`get` **id**(): `string`

实体 id

#### Returns

`string`

#### Inherited from

ConfigEntity.id

***

### loading

`get` **loading**(): `boolean`

#### Returns

`boolean`

`set` **loading**(`loading`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `loading` | `boolean` |

#### Returns

`void`

***

### onDispose

`get` **onDispose**(): [`Event`](/auto-docs/editor/interfaces/Event-1.md)<`void`>

销毁事件

#### Returns

[`Event`](/auto-docs/editor/interfaces/Event-1.md)<`void`>

#### Inherited from

ConfigEntity.onDispose

***

### readonly

`get` **readonly**(): `boolean`

#### Returns

`boolean`

`set` **readonly**(`readonly`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `readonly` | `boolean` |

#### Returns

`void`

***

### readonlyOrDisabled

`get` **readonlyOrDisabled**(): `boolean`

#### Returns

`boolean`

***

### savedInManager

`get` **savedInManager**(): `boolean`

是否存到全局 manager，默认 true

#### Returns

`boolean`

#### Inherited from

ConfigEntity.savedInManager

***

### scrollData

`get` **scrollData**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `scrollX` | `number` |
| `scrollY` | `number` |

***

### scrollDisable

`get` **scrollDisable**(): `boolean`

#### Returns

`boolean`

`set` **scrollDisable**(`scrollDisable`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scrollDisable` | `boolean` |

#### Returns

`void`

***

### type

`get` **type**(): `string`

实体类型

#### Returns

`string`

#### Inherited from

ConfigEntity.type

***

### version

`get` **version**(): `number`

实体的版本

#### Returns

`number`

#### Inherited from

ConfigEntity.version

***

### zoom

`get` **zoom**(): `number`

缩放比例

#### Returns

`number`

***

### zoomDisable

`get` **zoomDisable**(): `boolean`

#### Returns

`boolean`

`set` **zoomDisable**(`zoomDisable`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `zoomDisable` | `boolean` |

#### Returns

`void`

***

### zoomEnable

`get` **zoomEnable**(): `boolean`

#### Returns

`boolean`

**`Deprecated`**

use 'zoomDisable' instead

`set` **zoomEnable**(`zoomEnable`): `void`

开启缩放

#### Parameters

| Name | Type |
| :------ | :------ |
| `zoomEnable` | `boolean` |

#### Returns

`void`

**`Deprecated`**

use 'zoomDisable' instead

## Methods

### addData

**addData**<`D`>(`Registry`, `defaultProps?`): `D`

添加数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}>> |
| `defaultProps?` | [`EntityDataProps`](/auto-docs/editor/types/EntityDataProps.md)<`D`> |

#### Returns

`D`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[addData](/auto-docs/editor/classes/ConfigEntity.md#adddata)

***

### addInitializeData

**addInitializeData**(`datas`, `dataConfig?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `datas` | [`EntityDataRegistry`](/auto-docs/editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}>>\[] |
| `dataConfig?` | `any` |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[addInitializeData](/auto-docs/editor/classes/ConfigEntity.md#addinitializedata)

***

### addScrollLimit

**addScrollLimit**(`fn`): `void`

添加滚动限制逻辑

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | [`PlaygroundScrollLimitFn`](/auto-docs/editor/types/PlaygroundScrollLimitFn.md) |

#### Returns

`void`

***

### checkChanged

**checkChanged**(`oldData`, `newData`): `boolean`

判断 config 数据是否变化

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldData` | [`PlaygroundConfigEntityData`](/auto-docs/editor/interfaces/PlaygroundConfigEntityData.md) |
| `newData` | `Partial`<[`PlaygroundConfigEntityData`](/auto-docs/editor/interfaces/PlaygroundConfigEntityData.md)> |

#### Returns

`boolean`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[checkChanged](/auto-docs/editor/classes/ConfigEntity.md#checkchanged)

***

### dispose

**dispose**(): `void`

销毁实体

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[dispose](/auto-docs/editor/classes/ConfigEntity.md#dispose)

***

### fitView

**fitView**(`bounds`, `easing?`, `padding?`, `easingDuration?`): `Promise`<`void`>

适应大小

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bounds` | [`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md) | 目标大小 |
| `easing?` | `boolean` | 是否开启动画，默认开启 |
| `padding?` | `number` | 边界空白 |
| `easingDuration?` | `number` |  |

#### Returns

`Promise`<`void`>

***

### fixLayerPosition

**fixLayerPosition**(`layerNode`): `void`

让 layer 的 node 节点不随着画布滚动条滚动

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerNode` | `HTMLElement` |

#### Returns

`void`

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

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[fromJSON](/auto-docs/editor/classes/ConfigEntity.md#fromjson)

***

### getClientBounds

**getClientBounds**(): [`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md)

#### Returns

[`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md)

***

### getData

**getData**<`D`>(`Registry`): `D`

获取 data 数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/editor/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`D`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[getData](/auto-docs/editor/classes/ConfigEntity.md#getdata)

***

### getDefaultConfig

**getDefaultConfig**(): [`PlaygroundConfigEntityData`](/auto-docs/editor/interfaces/PlaygroundConfigEntityData.md)

#### Returns

[`PlaygroundConfigEntityData`](/auto-docs/editor/interfaces/PlaygroundConfigEntityData.md)

#### Overrides

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[getDefaultConfig](/auto-docs/editor/classes/ConfigEntity.md#getdefaultconfig)

***

### getDefaultDataRegistries

**getDefaultDataRegistries**(): [`EntityDataRegistry`](/auto-docs/editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}>>\[]

默认初始化的 Data

#### Returns

[`EntityDataRegistry`](/auto-docs/editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}>>\[]

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[getDefaultDataRegistries](/auto-docs/editor/classes/ConfigEntity.md#getdefaultdataregistries)

***

### getPageBounds

**getPageBounds**(): `undefined` | [`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md)

#### Returns

`undefined` | [`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md)

***

### getPosFromMouseEvent

**getPosFromMouseEvent**(`event`, `withScale?`): [`PositionSchema`](/auto-docs/editor/interfaces/PositionSchema.md)

获取相对画布的位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `MouseEvent` | `TouchEvent` | { `clientX`: `number` ; `clientY`: `number`  } |
| `withScale?` | `boolean` |

#### Returns

[`PositionSchema`](/auto-docs/editor/interfaces/PositionSchema.md)

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
| `identifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[getService](/auto-docs/editor/classes/ConfigEntity.md#getservice)

***

### getViewport

**getViewport**(`withScale?`): [`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md)

获取可视区域

#### Parameters

| Name | Type |
| :------ | :------ |
| `withScale?` | `boolean` |

#### Returns

[`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md)

***

### hasData

**hasData**(`Registry`): `boolean`

是否有指定数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}>> |

#### Returns

`boolean`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[hasData](/auto-docs/editor/classes/ConfigEntity.md#hasdata)

***

### isViewportVisible

**isViewportVisible**(`bounds`, `rotation?`, `includeAll?`): `boolean`

判断矩形是否在可视区域，如果有擦边页代表在可是区域

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bounds` | [`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md) |  |
| `rotation?` | `number` |  |
| `includeAll?` | `boolean` | 是否包含在里边，默认 false |

#### Returns

`boolean`

***

### onConfigChanged

**onConfigChanged**(`fn`): [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`data`: [`PlaygroundConfigEntityData`](/auto-docs/editor/interfaces/PlaygroundConfigEntityData.md)) => `void` |

#### Returns

[`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[onConfigChanged](/auto-docs/editor/classes/ConfigEntity.md#onconfigchanged)

***

### removeData

**removeData**<`D`>(`Registry`): `void`

删除数据，初始化状态注入的数据无法被删除

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/editor/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[removeData](/auto-docs/editor/classes/ConfigEntity.md#removedata)

***

### reset

**reset**(): `void`

重制为初始化状态

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[reset](/auto-docs/editor/classes/ConfigEntity.md#reset)

***

### scroll

**scroll**(`scroll`, `easing?`, `easingDuration?`): `Promise`<`void`>

滚动

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scroll` | `Partial`<{ `scrollX`: `number` ; `scrollY`: `number` ; `zoom`: `number`  }> |  |
| `easing?` | `boolean` | 是否开启缓动，默认开启 |
| `easingDuration?` | `number` | 滚动持续时间，默认 300ms |

#### Returns

`Promise`<`void`>

***

### scrollPageBoundsToCenter

**scrollPageBoundsToCenter**(`zoomToFit?`, `fitPadding?`, `easing?`): `Promise`<`void`>

滚动到画布中央

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `zoomToFit?` | `boolean` | 是否缩放并适配外围大小 |
| `fitPadding?` | `number` | 适配外围的留白 |
| `easing?` | `boolean` | 是否缓动 |

#### Returns

`Promise`<`void`>

***

### scrollToView

**scrollToView**(`opts?`): `Promise`<`void`>

按下边顺序执行

1. 指定的 entity 位置或 pos 位置
2. 初始化位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | [`PlaygroundConfigRevealOpts`](/auto-docs/editor/interfaces/PlaygroundConfigRevealOpts.md) |

#### Returns

`Promise`<`void`>

***

### setPageBounds

**setPageBounds**(`bounds`): `void`

这只画布边框，元素编辑的时候回吸附画布边框

#### Parameters

| Name | Type |
| :------ | :------ |
| `bounds` | [`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md) |

#### Returns

`void`

***

### toFixedPos

**toFixedPos**(`pos`): [`PositionSchema`](/auto-docs/editor/interfaces/PositionSchema.md)

将画布中的位置转成相对 window 的位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | [`PositionSchema`](/auto-docs/editor/interfaces/PositionSchema.md) |

#### Returns

[`PositionSchema`](/auto-docs/editor/interfaces/PositionSchema.md)

***

### toJSON

**toJSON**(): `any`

存储数据，用于持久化存储

#### Returns

`any`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[toJSON](/auto-docs/editor/classes/ConfigEntity.md#tojson)

***

### updateConfig

**updateConfig**(`props`): `void`

更新实体配置

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Partial`<[`PlaygroundConfigEntityData`](/auto-docs/editor/interfaces/PlaygroundConfigEntityData.md)> |

#### Returns

`void`

#### Overrides

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[updateConfig](/auto-docs/editor/classes/ConfigEntity.md#updateconfig)

***

### updateCursor

**updateCursor**(`cursor`): `void`

修改画布光标

#### Parameters

| Name | Type |
| :------ | :------ |
| `cursor` | `string` |

#### Returns

`void`

***

### updateData

**updateData**<`D`>(`Registry`, `props`): `void`

更新实体的数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/editor/interfaces/EntityDataRegistry.md)<`D`> |
| `props` | [`EntityDataProps`](/auto-docs/editor/types/EntityDataProps.md)<`D`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[updateData](/auto-docs/editor/classes/ConfigEntity.md#updatedata)

***

### updateZoom

**updateZoom**(`newZoom`, `easing?`, `easingDuration?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newZoom` | `number` |
| `easing?` | `boolean` |
| `easingDuration?` | `number` |

#### Returns

`void`

***

### zoomin

**zoomin**(`easing?`, `easingDuration?`): `void`

放大

#### Parameters

| Name | Type |
| :------ | :------ |
| `easing?` | `boolean` |
| `easingDuration?` | `number` |

#### Returns

`void`

***

### zoomout

**zoomout**(`easing?`, `easingDuration?`): `void`

缩小

#### Parameters

| Name | Type |
| :------ | :------ |
| `easing?` | `boolean` |
| `easingDuration?` | `number` |

#### Returns

`void`
