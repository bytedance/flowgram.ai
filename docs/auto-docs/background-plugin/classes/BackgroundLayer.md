# Class: BackgroundLayer

dot 网格背景

## Hierarchy

* `Layer`<[`BackgroundLayerOptions`](/auto-docs/background-plugin/interfaces/BackgroundLayerOptions.md)>

  ↳ **`BackgroundLayer`**

## Table of contents

### Constructors

* [constructor](/auto-docs/background-plugin/classes/BackgroundLayer.md#constructor)

### Properties

* [config](/auto-docs/background-plugin/classes/BackgroundLayer.md#config)
* [context](/auto-docs/background-plugin/classes/BackgroundLayer.md#context)
* [entityManager](/auto-docs/background-plugin/classes/BackgroundLayer.md#entitymanager)
* [getOtherLayer](/auto-docs/background-plugin/classes/BackgroundLayer.md#getotherlayer)
* [grid](/auto-docs/background-plugin/classes/BackgroundLayer.md#grid)
* [isFocused](/auto-docs/background-plugin/classes/BackgroundLayer.md#isfocused)
* [listenGlobalEvent](/auto-docs/background-plugin/classes/BackgroundLayer.md#listenglobalevent)
* [listenPlaygroundEvent](/auto-docs/background-plugin/classes/BackgroundLayer.md#listenplaygroundevent)
* [node](/auto-docs/background-plugin/classes/BackgroundLayer.md#node)
* [observeManager](/auto-docs/background-plugin/classes/BackgroundLayer.md#observemanager)
* [options](/auto-docs/background-plugin/classes/BackgroundLayer.md#options)
* [pipelineNode](/auto-docs/background-plugin/classes/BackgroundLayer.md#pipelinenode)
* [playgroundNode](/auto-docs/background-plugin/classes/BackgroundLayer.md#playgroundnode)
* [reloadEntities](/auto-docs/background-plugin/classes/BackgroundLayer.md#reloadentities)
* [renderWithReactMemo](/auto-docs/background-plugin/classes/BackgroundLayer.md#renderwithreactmemo)
* [type](/auto-docs/background-plugin/classes/BackgroundLayer.md#type)

### Accessors

* [zoom](/auto-docs/background-plugin/classes/BackgroundLayer.md#zoom)

### Methods

* [autorun](/auto-docs/background-plugin/classes/BackgroundLayer.md#autorun)
* [createDOMCache](/auto-docs/background-plugin/classes/BackgroundLayer.md#createdomcache)
* [dispose](/auto-docs/background-plugin/classes/BackgroundLayer.md#dispose)
* [getPosFromMouseEvent](/auto-docs/background-plugin/classes/BackgroundLayer.md#getposfrommouseevent)
* [getScaleUnit](/auto-docs/background-plugin/classes/BackgroundLayer.md#getscaleunit)
* [onBlur](/auto-docs/background-plugin/classes/BackgroundLayer.md#onblur)
* [onFocus](/auto-docs/background-plugin/classes/BackgroundLayer.md#onfocus)
* [onReadonlyOrDisabledChange](/auto-docs/background-plugin/classes/BackgroundLayer.md#onreadonlyordisabledchange)
* [onReady](/auto-docs/background-plugin/classes/BackgroundLayer.md#onready)
* [onResize](/auto-docs/background-plugin/classes/BackgroundLayer.md#onresize)
* [onScroll](/auto-docs/background-plugin/classes/BackgroundLayer.md#onscroll)
* [onViewportChange](/auto-docs/background-plugin/classes/BackgroundLayer.md#onviewportchange)
* [onZoom](/auto-docs/background-plugin/classes/BackgroundLayer.md#onzoom)
* [render](/auto-docs/background-plugin/classes/BackgroundLayer.md#render)

## Constructors

### constructor

**new BackgroundLayer**()

#### Inherited from

Layer\<BackgroundLayerOptions>.constructor

## Properties

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

### entityManager

`Readonly` **entityManager**: `EntityManager`

实体管理器

#### Inherited from

Layer.entityManager

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

### grid

**grid**: `HTMLElement`

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

**node**: `HTMLDivElement`

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

**options**: [`BackgroundLayerOptions`](/auto-docs/background-plugin/interfaces/BackgroundLayerOptions.md)

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

### type

`Static` **type**: `string` = `'WorkflowBackgroundLayer'`

## Accessors

### zoom

`get` **zoom**(): `number`

当前缩放比

#### Returns

`number`

## Methods

### autorun

**autorun**(): `void`

绘制

#### Returns

`void`

#### Overrides

Layer.autorun

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

### getScaleUnit

**getScaleUnit**(): `BackgroundScaleUnit`

最小单元格大小

#### Returns

`BackgroundScaleUnit`

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

`Optional` **onResize**(`size`): `void`

playground 大小变化时候会触发

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `PipelineDimension` |

#### Returns

`void`

#### Inherited from

Layer.onResize

***

### onScroll

`Optional` **onScroll**(`scroll`): `void`

监听滚动

#### Parameters

| Name | Type |
| :------ | :------ |
| `scroll` | `Object` |
| `scroll.scrollX` | `number` |
| `scroll.scrollY` | `number` |

#### Returns

`void`

#### Inherited from

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

`Optional` **onZoom**(`zoom`): `void`

监听缩放

#### Parameters

| Name | Type |
| :------ | :------ |
| `zoom` | `number` |

#### Returns

`void`

#### Inherited from

Layer.onZoom

***

### render

`Optional` **render**(): `Element`

绘制 react

#### Returns

`Element`

#### Inherited from

Layer.render
