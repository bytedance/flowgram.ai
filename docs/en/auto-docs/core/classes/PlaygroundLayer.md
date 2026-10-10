# Class: PlaygroundLayer

基础层，控制画布缩放/滚动等操作

## Hierarchy

* [`Layer`](/en/auto-docs/core/classes/Layer.md)<[`PlaygroundLayerOptions`](/en/auto-docs/core/interfaces/PlaygroundLayerOptions.md)>

  ↳ **`PlaygroundLayer`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/core/classes/PlaygroundLayer.md#constructor)

### Properties

* [config](/en/auto-docs/core/classes/PlaygroundLayer.md#config)
* [context](/en/auto-docs/core/classes/PlaygroundLayer.md#context)
* [entityManager](/en/auto-docs/core/classes/PlaygroundLayer.md#entitymanager)
* [getOtherLayer](/en/auto-docs/core/classes/PlaygroundLayer.md#getotherlayer)
* [isFocused](/en/auto-docs/core/classes/PlaygroundLayer.md#isfocused)
* [listenGlobalEvent](/en/auto-docs/core/classes/PlaygroundLayer.md#listenglobalevent)
* [listenPlaygroundEvent](/en/auto-docs/core/classes/PlaygroundLayer.md#listenplaygroundevent)
* [node](/en/auto-docs/core/classes/PlaygroundLayer.md#node)
* [observeManager](/en/auto-docs/core/classes/PlaygroundLayer.md#observemanager)
* [options](/en/auto-docs/core/classes/PlaygroundLayer.md#options)
* [pipelineNode](/en/auto-docs/core/classes/PlaygroundLayer.md#pipelinenode)
* [playgroundNode](/en/auto-docs/core/classes/PlaygroundLayer.md#playgroundnode)
* [protectWheelArea](/en/auto-docs/core/classes/PlaygroundLayer.md#protectwheelarea)
* [reloadEntities](/en/auto-docs/core/classes/PlaygroundLayer.md#reloadentities)
* [renderWithReactMemo](/en/auto-docs/core/classes/PlaygroundLayer.md#renderwithreactmemo)

### Methods

* [autorun](/en/auto-docs/core/classes/PlaygroundLayer.md#autorun)
* [createDOMCache](/en/auto-docs/core/classes/PlaygroundLayer.md#createdomcache)
* [createGesture](/en/auto-docs/core/classes/PlaygroundLayer.md#creategesture)
* [dispose](/en/auto-docs/core/classes/PlaygroundLayer.md#dispose)
* [getPosFromMouseEvent](/en/auto-docs/core/classes/PlaygroundLayer.md#getposfrommouseevent)
* [onBlur](/en/auto-docs/core/classes/PlaygroundLayer.md#onblur)
* [onFocus](/en/auto-docs/core/classes/PlaygroundLayer.md#onfocus)
* [onReadonlyOrDisabledChange](/en/auto-docs/core/classes/PlaygroundLayer.md#onreadonlyordisabledchange)
* [onReady](/en/auto-docs/core/classes/PlaygroundLayer.md#onready)
* [onResize](/en/auto-docs/core/classes/PlaygroundLayer.md#onresize)
* [onScroll](/en/auto-docs/core/classes/PlaygroundLayer.md#onscroll)
* [onStateChanged](/en/auto-docs/core/classes/PlaygroundLayer.md#onstatechanged)
* [onViewportChange](/en/auto-docs/core/classes/PlaygroundLayer.md#onviewportchange)
* [onZoom](/en/auto-docs/core/classes/PlaygroundLayer.md#onzoom)
* [render](/en/auto-docs/core/classes/PlaygroundLayer.md#render)

## Constructors

### constructor

**new PlaygroundLayer**()

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[constructor](/en/auto-docs/core/classes/Layer.md#constructor)

## Properties

### config

**config**: [`PlaygroundConfigEntity`](/en/auto-docs/core/classes/PlaygroundConfigEntity.md)

全局画布配置

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[config](/en/auto-docs/core/classes/Layer.md#config)

***

### context

`Readonly` **context**: `any`

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[context](/en/auto-docs/core/classes/Layer.md#context)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/en/auto-docs/core/classes/EntityManager.md)

实体管理器

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[entityManager](/en/auto-docs/core/classes/Layer.md#entitymanager)

***

### getOtherLayer

**getOtherLayer**: \<T>(`layerRegistry`: [`LayerRegistry`](/en/auto-docs/core/interfaces/LayerRegistry.md)<`T`>) => `undefined` | `T`

#### Type declaration

<`T`>(`layerRegistry`): `undefined` | `T`

可以用于获取别的 layer

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/en/auto-docs/core/classes/Layer.md)<`any`, `any`, `T`> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/en/auto-docs/core/interfaces/LayerRegistry.md)<`T`> |

##### Returns

`undefined` | `T`

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[getOtherLayer](/en/auto-docs/core/classes/Layer.md#getotherlayer)

***

### isFocused

`Readonly` **isFocused**: `boolean`

playground 是否 focused

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[isFocused](/en/auto-docs/core/classes/Layer.md#isfocused)

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

[Layer](/en/auto-docs/core/classes/Layer.md).[listenGlobalEvent](/en/auto-docs/core/classes/Layer.md#listenglobalevent)

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

[Layer](/en/auto-docs/core/classes/Layer.md).[listenPlaygroundEvent](/en/auto-docs/core/classes/Layer.md#listenplaygroundevent)

***

### node

**node**: `HTMLElement`

layer 可能存在 dom 也可能没有，如果有，则会加入到 pipeline 的 dom 节点上

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[node](/en/auto-docs/core/classes/Layer.md#node)

***

### observeManager

**observeManager**: [`PipelineEntities`](/en/auto-docs/core/interfaces/PipelineEntities.md)

当前 layer 的所有监听的实体数据

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[observeManager](/en/auto-docs/core/classes/Layer.md#observemanager)

***

### options

**options**: [`PlaygroundLayerOptions`](/en/auto-docs/core/interfaces/PlaygroundLayerOptions.md)

layer 的配置, 由 registerLayer(Layer, LayerOptions) 传入

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[options](/en/auto-docs/core/classes/Layer.md#options)

***

### pipelineNode

**pipelineNode**: `HTMLElement`

父节点

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[pipelineNode](/en/auto-docs/core/classes/Layer.md#pipelinenode)

***

### playgroundNode

**playgroundNode**: `HTMLElement`

画布根节点

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[playgroundNode](/en/auto-docs/core/classes/Layer.md#playgroundnode)

***

### protectWheelArea

`Optional` **protectWheelArea**: [`ProtectWheelArea`](/en/auto-docs/core/variables/ProtectWheelArea-1.md)

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

[Layer](/en/auto-docs/core/classes/Layer.md).[reloadEntities](/en/auto-docs/core/classes/Layer.md#reloadentities)

***

### renderWithReactMemo

**renderWithReactMemo**: `boolean` = `true`

默认在渲染时候都会启用 react memo 进行隔离，这种情况就需要数据驱动更新

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[renderWithReactMemo](/en/auto-docs/core/classes/Layer.md#renderwithreactmemo)

## Methods

### autorun

**autorun**(): `void`

自动触发更新，在不需要 react 的时候用这个方法

#### Returns

`void`

#### Overrides

[Layer](/en/auto-docs/core/classes/Layer.md).[autorun](/en/auto-docs/core/classes/Layer.md#autorun)

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

[Layer](/en/auto-docs/core/classes/Layer.md).[createDOMCache](/en/auto-docs/core/classes/Layer.md#createdomcache)

***

### createGesture

**createGesture**(): `void`

#### Returns

`void`

***

### dispose

**dispose**(): `void`

销毁

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[dispose](/en/auto-docs/core/classes/Layer.md#dispose)

***

### getPosFromMouseEvent

**getPosFromMouseEvent**(`event`, `addScale?`): [`PositionSchema`](/en/auto-docs/core/interfaces/PositionSchema.md)

获取鼠标在 Playground 的位置

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `event` | `Object` | `undefined` |
| `event.clientX` | `number` | `undefined` |
| `event.clientY` | `number` | `undefined` |
| `addScale` | `boolean` | `true` |

#### Returns

[`PositionSchema`](/en/auto-docs/core/interfaces/PositionSchema.md)

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[getPosFromMouseEvent](/en/auto-docs/core/classes/Layer.md#getposfrommouseevent)

***

### onBlur

`Optional` **onBlur**(): `void`

playground blur 时候触发

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[onBlur](/en/auto-docs/core/classes/Layer.md#onblur)

***

### onFocus

`Optional` **onFocus**(): `void`

playground focus 时候触发

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[onFocus](/en/auto-docs/core/classes/Layer.md#onfocus)

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

[Layer](/en/auto-docs/core/classes/Layer.md).[onReadonlyOrDisabledChange](/en/auto-docs/core/classes/Layer.md#onreadonlyordisabledchange)

***

### onReady

**onReady**(): `void`

初始化时候触发

#### Returns

`void`

#### Overrides

[Layer](/en/auto-docs/core/classes/Layer.md).[onReady](/en/auto-docs/core/classes/Layer.md#onready)

***

### onResize

`Optional` **onResize**(`size`): `void`

playground 大小变化时候会触发

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | [`PipelineDimension`](/en/auto-docs/core/interfaces/PipelineDimension.md) |

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[onResize](/en/auto-docs/core/classes/Layer.md#onresize)

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

[Layer](/en/auto-docs/core/classes/Layer.md).[onScroll](/en/auto-docs/core/classes/Layer.md#onscroll)

***

### onStateChanged

**onStateChanged**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`EditorStateChangeEvent`](/en/auto-docs/core/interfaces/EditorStateChangeEvent.md) |

#### Returns

`void`

***

### onViewportChange

`Optional` **onViewportChange**(): `void`

viewport 更新触发

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[onViewportChange](/en/auto-docs/core/classes/Layer.md#onviewportchange)

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

[Layer](/en/auto-docs/core/classes/Layer.md).[onZoom](/en/auto-docs/core/classes/Layer.md#onzoom)

***

### render

`Optional` **render**(): `Element`

绘制 react

#### Returns

`Element`

#### Inherited from

[Layer](/en/auto-docs/core/classes/Layer.md).[render](/en/auto-docs/core/classes/Layer.md#render)
