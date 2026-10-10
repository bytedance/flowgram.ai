# Class: Layer\<OPT, CONTEXT>

基础 layer

## Type parameters

| Name | Type |
| :------ | :------ |
| `OPT` | extends [`LayerOptions`](/auto-docs/playground-react/variables/LayerOptions-1.md) = `any` |
| `CONTEXT` | extends [`PlaygroundContext`](/auto-docs/playground-react/variables/PlaygroundContext-1.md) = [`PlaygroundContext`](/auto-docs/playground-react/variables/PlaygroundContext-1.md) |

## Hierarchy

* **`Layer`**

  ↳ [`PlaygroundLayer`](/auto-docs/playground-react/classes/PlaygroundLayer.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/playground-react/classes/Layer.md#constructor)

### Properties

* [config](/auto-docs/playground-react/classes/Layer.md#config)
* [context](/auto-docs/playground-react/classes/Layer.md#context)
* [entityManager](/auto-docs/playground-react/classes/Layer.md#entitymanager)
* [getOtherLayer](/auto-docs/playground-react/classes/Layer.md#getotherlayer)
* [isFocused](/auto-docs/playground-react/classes/Layer.md#isfocused)
* [listenGlobalEvent](/auto-docs/playground-react/classes/Layer.md#listenglobalevent)
* [listenPlaygroundEvent](/auto-docs/playground-react/classes/Layer.md#listenplaygroundevent)
* [node](/auto-docs/playground-react/classes/Layer.md#node)
* [observeManager](/auto-docs/playground-react/classes/Layer.md#observemanager)
* [options](/auto-docs/playground-react/classes/Layer.md#options)
* [pipelineNode](/auto-docs/playground-react/classes/Layer.md#pipelinenode)
* [playgroundNode](/auto-docs/playground-react/classes/Layer.md#playgroundnode)
* [reloadEntities](/auto-docs/playground-react/classes/Layer.md#reloadentities)
* [renderWithReactMemo](/auto-docs/playground-react/classes/Layer.md#renderwithreactmemo)

### Methods

* [autorun](/auto-docs/playground-react/classes/Layer.md#autorun)
* [createDOMCache](/auto-docs/playground-react/classes/Layer.md#createdomcache)
* [dispose](/auto-docs/playground-react/classes/Layer.md#dispose)
* [getPosFromMouseEvent](/auto-docs/playground-react/classes/Layer.md#getposfrommouseevent)
* [onBlur](/auto-docs/playground-react/classes/Layer.md#onblur)
* [onFocus](/auto-docs/playground-react/classes/Layer.md#onfocus)
* [onReadonlyOrDisabledChange](/auto-docs/playground-react/classes/Layer.md#onreadonlyordisabledchange)
* [onReady](/auto-docs/playground-react/classes/Layer.md#onready)
* [onResize](/auto-docs/playground-react/classes/Layer.md#onresize)
* [onScroll](/auto-docs/playground-react/classes/Layer.md#onscroll)
* [onViewportChange](/auto-docs/playground-react/classes/Layer.md#onviewportchange)
* [onZoom](/auto-docs/playground-react/classes/Layer.md#onzoom)
* [render](/auto-docs/playground-react/classes/Layer.md#render)

## Constructors

### constructor

**new Layer**<`OPT`, `CONTEXT`>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `OPT` | extends [`LayerOptions`](/auto-docs/playground-react/variables/LayerOptions-1.md) = `any` |
| `CONTEXT` | extends `unknown` = `any` |

## Properties

### config

**config**: [`PlaygroundConfigEntity`](/auto-docs/playground-react/classes/PlaygroundConfigEntity.md)

全局画布配置

***

### context

`Readonly` **context**: `CONTEXT`

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/auto-docs/playground-react/classes/EntityManager.md)

实体管理器

***

### getOtherLayer

**getOtherLayer**: \<T>(`layerRegistry`: [`LayerRegistry`](/auto-docs/playground-react/interfaces/LayerRegistry.md)<`T`>) => `undefined` | `T`

#### Type declaration

<`T`>(`layerRegistry`): `undefined` | `T`

可以用于获取别的 layer

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`, `T`> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/playground-react/interfaces/LayerRegistry.md)<`T`> |

##### Returns

`undefined` | `T`

***

### isFocused

`Readonly` **isFocused**: `boolean`

playground 是否 focused

***

### listenGlobalEvent

**listenGlobalEvent**: (`name`: `string`, `handle`: (`event`: `any`) => `boolean` | `void`, `priority?`: `number`, `options?`: `AddEventListenerOptions`) => [`Disposable`](/auto-docs/playground-react/interfaces/Disposable-1.md)

#### Type declaration

(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/auto-docs/playground-react/interfaces/Disposable-1.md)

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

[`Disposable`](/auto-docs/playground-react/interfaces/Disposable-1.md)

***

### listenPlaygroundEvent

**listenPlaygroundEvent**: (`name`: `string`, `handle`: (`event`: `any`) => `boolean` | `void`, `priority?`: `number`, `options?`: `AddEventListenerOptions`) => [`Disposable`](/auto-docs/playground-react/interfaces/Disposable-1.md)

#### Type declaration

(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/auto-docs/playground-react/interfaces/Disposable-1.md)

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

[`Disposable`](/auto-docs/playground-react/interfaces/Disposable-1.md)

***

### node

**node**: `HTMLElement`

layer 可能存在 dom 也可能没有，如果有，则会加入到 pipeline 的 dom 节点上

***

### observeManager

**observeManager**: [`PipelineEntities`](/auto-docs/playground-react/interfaces/PipelineEntities.md)

当前 layer 的所有监听的实体数据

***

### options

**options**: `OPT`

layer 的配置, 由 registerLayer(Layer, LayerOptions) 传入

***

### pipelineNode

**pipelineNode**: `HTMLElement`

父节点

***

### playgroundNode

**playgroundNode**: `HTMLElement`

画布根节点

***

### reloadEntities

**reloadEntities**: () => `boolean`

#### Type declaration

(): `boolean`

加载 layer 注册的实体数据，内部使用，不需要手动触发

##### Returns

`boolean`

数据是否变化

***

### renderWithReactMemo

**renderWithReactMemo**: `boolean`

默认在渲染时候都会启用 react memo 进行隔离，这种情况就需要数据驱动更新

## Methods

### autorun

`Optional` **autorun**(): `void`

自动触发更新，在不需要 react 的时候用这个方法

#### Returns

`void`

***

### createDOMCache

**createDOMCache**<`T`>(`className`, `children?`): `CacheManager`<`T`, `CacheOriginItem`>

创建 dom 缓冲池

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `DOMCache` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `className` | `string` | () => `HTMLElement` |
| `children?` | `string` |

#### Returns

`CacheManager`<`T`, `CacheOriginItem`>

***

### dispose

**dispose**(): `void`

销毁

#### Returns

`void`

***

### getPosFromMouseEvent

**getPosFromMouseEvent**(`event`, `addScale?`): [`PositionSchema`](/auto-docs/playground-react/interfaces/PositionSchema.md)

获取鼠标在 Playground 的位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Object` |
| `event.clientX` | `number` |
| `event.clientY` | `number` |
| `addScale?` | `boolean` |

#### Returns

[`PositionSchema`](/auto-docs/playground-react/interfaces/PositionSchema.md)

***

### onBlur

`Optional` **onBlur**(): `void`

playground blur 时候触发

#### Returns

`void`

***

### onFocus

`Optional` **onFocus**(): `void`

playground focus 时候触发

#### Returns

`void`

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

***

### onReady

`Optional` **onReady**(): `void`

初始化时候触发

#### Returns

`void`

***

### onResize

`Optional` **onResize**(`size`): `void`

playground 大小变化时候会触发

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | [`PipelineDimension`](/auto-docs/playground-react/interfaces/PipelineDimension.md) |

#### Returns

`void`

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

***

### onViewportChange

`Optional` **onViewportChange**(): `void`

viewport 更新触发

#### Returns

`void`

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

***

### render

`Optional` **render**(): `Element`

绘制 react

#### Returns

`Element`
