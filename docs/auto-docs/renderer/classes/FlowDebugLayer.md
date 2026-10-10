# Class: FlowDebugLayer

调试用，会绘出所有节点的边界

## Hierarchy

* `Layer`

  ↳ **`FlowDebugLayer`**

## Table of contents

### Constructors

* [constructor](/auto-docs/renderer/classes/FlowDebugLayer.md#constructor)

### Properties

* [\_transforms](/auto-docs/renderer/classes/FlowDebugLayer.md#_transforms)
* [boundsNodes](/auto-docs/renderer/classes/FlowDebugLayer.md#boundsnodes)
* [config](/auto-docs/renderer/classes/FlowDebugLayer.md#config)
* [context](/auto-docs/renderer/classes/FlowDebugLayer.md#context)
* [document](/auto-docs/renderer/classes/FlowDebugLayer.md#document)
* [documentTransformer](/auto-docs/renderer/classes/FlowDebugLayer.md#documenttransformer)
* [domCache](/auto-docs/renderer/classes/FlowDebugLayer.md#domcache)
* [entityManager](/auto-docs/renderer/classes/FlowDebugLayer.md#entitymanager)
* [filterKey](/auto-docs/renderer/classes/FlowDebugLayer.md#filterkey)
* [getOtherLayer](/auto-docs/renderer/classes/FlowDebugLayer.md#getotherlayer)
* [isFocused](/auto-docs/renderer/classes/FlowDebugLayer.md#isfocused)
* [listenGlobalEvent](/auto-docs/renderer/classes/FlowDebugLayer.md#listenglobalevent)
* [listenPlaygroundEvent](/auto-docs/renderer/classes/FlowDebugLayer.md#listenplaygroundevent)
* [node](/auto-docs/renderer/classes/FlowDebugLayer.md#node)
* [observeManager](/auto-docs/renderer/classes/FlowDebugLayer.md#observemanager)
* [options](/auto-docs/renderer/classes/FlowDebugLayer.md#options)
* [pipelineNode](/auto-docs/renderer/classes/FlowDebugLayer.md#pipelinenode)
* [playgroundNode](/auto-docs/renderer/classes/FlowDebugLayer.md#playgroundnode)
* [pointsNodes](/auto-docs/renderer/classes/FlowDebugLayer.md#pointsnodes)
* [reloadEntities](/auto-docs/renderer/classes/FlowDebugLayer.md#reloadentities)
* [renderWithReactMemo](/auto-docs/renderer/classes/FlowDebugLayer.md#renderwithreactmemo)
* [versionNodes](/auto-docs/renderer/classes/FlowDebugLayer.md#versionnodes)
* [viewport](/auto-docs/renderer/classes/FlowDebugLayer.md#viewport)

### Accessors

* [transforms](/auto-docs/renderer/classes/FlowDebugLayer.md#transforms)

### Methods

* [autorun](/auto-docs/renderer/classes/FlowDebugLayer.md#autorun)
* [createBounds](/auto-docs/renderer/classes/FlowDebugLayer.md#createbounds)
* [createDOMCache](/auto-docs/renderer/classes/FlowDebugLayer.md#createdomcache)
* [dispose](/auto-docs/renderer/classes/FlowDebugLayer.md#dispose)
* [getPosFromMouseEvent](/auto-docs/renderer/classes/FlowDebugLayer.md#getposfrommouseevent)
* [onBlur](/auto-docs/renderer/classes/FlowDebugLayer.md#onblur)
* [onFocus](/auto-docs/renderer/classes/FlowDebugLayer.md#onfocus)
* [onReadonlyOrDisabledChange](/auto-docs/renderer/classes/FlowDebugLayer.md#onreadonlyordisabledchange)
* [onReady](/auto-docs/renderer/classes/FlowDebugLayer.md#onready)
* [onResize](/auto-docs/renderer/classes/FlowDebugLayer.md#onresize)
* [onScroll](/auto-docs/renderer/classes/FlowDebugLayer.md#onscroll)
* [onViewportChange](/auto-docs/renderer/classes/FlowDebugLayer.md#onviewportchange)
* [onZoom](/auto-docs/renderer/classes/FlowDebugLayer.md#onzoom)
* [render](/auto-docs/renderer/classes/FlowDebugLayer.md#render)
* [renderScrollViewportBounds](/auto-docs/renderer/classes/FlowDebugLayer.md#renderscrollviewportbounds)

## Constructors

### constructor

**new FlowDebugLayer**()

#### Inherited from

Layer.constructor

## Properties

### \_transforms

**\_transforms**: `FlowNodeTransformData`\[]

***

### boundsNodes

**boundsNodes**: `HTMLDivElement`

***

### config

**config**: `PlaygroundConfigEntity`

全局画布配置

#### Inherited from

Layer.config

***

### context

`Readonly` **context**: `any`

#### Inherited from

Layer.context

***

### document

`Readonly` **document**: `FlowDocument`<`FlowDocumentJSON`>

***

### documentTransformer

`Readonly` **documentTransformer**: `FlowDocumentTransformerEntity`

***

### domCache

**domCache**: `WeakMap`<`FlowNodeTransformData`, { `bbox`: `HTMLDivElement` ; `color`: `string` ; `input`: `HTMLDivElement` ; `output`: `HTMLDivElement` ; `version`: `HTMLDivElement`  }>

***

### entityManager

`Readonly` **entityManager**: `EntityManager`

实体管理器

#### Inherited from

Layer.entityManager

***

### filterKey

**filterKey**: `string`

?debug=xxxx, 则返回 xxxx

***

### getOtherLayer

**getOtherLayer**: \<T>(`layerRegistry`: `LayerRegistry`<`T`>) => `undefined` | `T`

#### Type declaration

<`T`>(`layerRegistry`): `undefined` | `T`

可以用于获取别的 layer

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Layer`<`any`, `any`, `T`> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | `LayerRegistry`<`T`> |

##### Returns

`undefined` | `T`

#### Inherited from

Layer.getOtherLayer

***

### isFocused

`Readonly` **isFocused**: `boolean`

playground 是否 focused

#### Inherited from

Layer.isFocused

***

### listenGlobalEvent

**listenGlobalEvent**: (`name`: `string`, `handle`: (`event`: `any`) => `boolean` | `void`, `priority?`: `number`, `options?`: `AddEventListenerOptions`) => `Disposable`

#### Type declaration

(`name`, `handle`, `priority?`, `options?`): `Disposable`

监听 document 上的事件
规则：

1. 按 priority 排序，越高先执行
2. 没有提供，按 layer 的注册顺序，后注册先执行 (符合冒泡排序)
3. 执行返回 true，则阻止后续的执行

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `handle` | (`event`: `any`) => `boolean` | `void` |
| `priority?` | `number` |
| `options?` | `AddEventListenerOptions` |

##### Returns

`Disposable`

#### Inherited from

Layer.listenGlobalEvent

***

### listenPlaygroundEvent

**listenPlaygroundEvent**: (`name`: `string`, `handle`: (`event`: `any`) => `boolean` | `void`, `priority?`: `number`, `options?`: `AddEventListenerOptions`) => `Disposable`

#### Type declaration

(`name`, `handle`, `priority?`, `options?`): `Disposable`

监听 playground 上的事件
规则：

1. 按 priority 排序，越高先执行
2. 没有提供，按 layer 的注册顺序，后注册先执行 (符合冒泡排序)
3. 执行返回 true，则阻止后续的执行

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `handle` | (`event`: `any`) => `boolean` | `void` |
| `priority?` | `number` |
| `options?` | `AddEventListenerOptions` |

##### Returns

`Disposable`

#### Inherited from

Layer.listenPlaygroundEvent

***

### node

**node**: `HTMLElement`

#### Overrides

Layer.node

***

### observeManager

**observeManager**: `PipelineEntities`

当前 layer 的所有监听的实体数据

#### Inherited from

Layer.observeManager

***

### options

**options**: `any`

layer 的配置, 由 registerLayer(Layer, LayerOptions) 传入

#### Inherited from

Layer.options

***

### pipelineNode

**pipelineNode**: `HTMLElement`

父节点

#### Inherited from

Layer.pipelineNode

***

### playgroundNode

**playgroundNode**: `HTMLElement`

画布根节点

#### Inherited from

Layer.playgroundNode

***

### pointsNodes

**pointsNodes**: `HTMLDivElement`

***

### reloadEntities

**reloadEntities**: () => `boolean`

#### Type declaration

(): `boolean`

加载 layer 注册的实体数据，内部使用，不需要手动触发

##### Returns

`boolean`

数据是否变化

#### Inherited from

Layer.reloadEntities

***

### renderWithReactMemo

**renderWithReactMemo**: `boolean`

默认在渲染时候都会启用 react memo 进行隔离，这种情况就需要数据驱动更新

#### Inherited from

Layer.renderWithReactMemo

***

### versionNodes

**versionNodes**: `HTMLDivElement`

***

### viewport

**viewport**: `HTMLDivElement`

## Accessors

### transforms

`get` **transforms**(): `FlowNodeTransformData`\[]

#### Returns

`FlowNodeTransformData`\[]

## Methods

### autorun

**autorun**(): `void`

#### Returns

`void`

#### Overrides

Layer.autorun

***

### createBounds

**createBounds**(`transform`, `color`, `depth`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | `FlowNodeTransformData` |
| `color` | `string` |
| `depth` | `number` |

#### Returns

`void`

***

### createDOMCache

**createDOMCache**<`T`>(`className`, `children?`): `CacheManager`<`T`, `CacheOriginItem`>

创建 dom 缓冲池

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `DOMCache`<`T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `className` | `string` | () => `HTMLElement` |
| `children?` | `string` |

#### Returns

`CacheManager`<`T`, `CacheOriginItem`>

#### Inherited from

Layer.createDOMCache

***

### dispose

**dispose**(): `void`

销毁

#### Returns

`void`

#### Inherited from

Layer.dispose

***

### getPosFromMouseEvent

**getPosFromMouseEvent**(`event`, `addScale?`): `PositionSchema`

获取鼠标在 Playground 的位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Object` |
| `event.clientX` | `number` |
| `event.clientY` | `number` |
| `addScale?` | `boolean` |

#### Returns

`PositionSchema`

#### Inherited from

Layer.getPosFromMouseEvent

***

### onBlur

`Optional` **onBlur**(): `void`

playground blur 时候触发

#### Returns

`void`

#### Inherited from

Layer.onBlur

***

### onFocus

`Optional` **onFocus**(): `void`

playground focus 时候触发

#### Returns

`void`

#### Inherited from

Layer.onFocus

***

### onReadonlyOrDisabledChange

`Optional` **onReadonlyOrDisabledChange**(`state`): `void`

readonly 或 disable 状态变化

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `Object` |
| `state.disabled` | `boolean` |
| `state.readonly` | `boolean` |

#### Returns

`void`

#### Inherited from

Layer.onReadonlyOrDisabledChange

***

### onReady

**onReady**(): `void`

#### Returns

`void`

#### Overrides

Layer.onReady

***

### onResize

**onResize**(): `void`

#### Returns

`void`

#### Overrides

Layer.onResize

***

### onScroll

**onScroll**(): `void`

#### Returns

`void`

#### Overrides

Layer.onScroll

***

### onViewportChange

`Optional` **onViewportChange**(): `void`

viewport 更新触发

#### Returns

`void`

#### Inherited from

Layer.onViewportChange

***

### onZoom

**onZoom**(`scale`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scale` | `number` |

#### Returns

`void`

#### Overrides

Layer.onZoom

***

### render

`Optional` **render**(): `Element`

绘制 react

#### Returns

`Element`

#### Inherited from

Layer.render

***

### renderScrollViewportBounds

**renderScrollViewportBounds**(): `void`

显示 viewport 可滚动区域

#### Returns

`void`
