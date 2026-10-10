# Class: PlaygroundLayer

基础层，控制画布缩放/滚动等操作

## Hierarchy

* [`Layer`](/auto-docs/free-layout-editor/classes/Layer.md)<[`PlaygroundLayerOptions`](/auto-docs/free-layout-editor/interfaces/PlaygroundLayerOptions.md)>

  ↳ **`PlaygroundLayer`**

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#constructor)

### Properties

* [config](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#config)
* [context](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#context)
* [entityManager](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#entitymanager)
* [getOtherLayer](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#getotherlayer)
* [isFocused](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#isfocused)
* [listenGlobalEvent](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#listenglobalevent)
* [listenPlaygroundEvent](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#listenplaygroundevent)
* [node](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#node)
* [observeManager](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#observemanager)
* [options](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#options)
* [pipelineNode](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#pipelinenode)
* [playgroundNode](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#playgroundnode)
* [protectWheelArea](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#protectwheelarea)
* [reloadEntities](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#reloadentities)
* [renderWithReactMemo](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#renderwithreactmemo)

### Methods

* [autorun](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#autorun)
* [createDOMCache](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#createdomcache)
* [createGesture](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#creategesture)
* [dispose](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#dispose)
* [getPosFromMouseEvent](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#getposfrommouseevent)
* [onBlur](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#onblur)
* [onFocus](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#onfocus)
* [onReadonlyOrDisabledChange](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#onreadonlyordisabledchange)
* [onReady](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#onready)
* [onResize](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#onresize)
* [onScroll](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#onscroll)
* [onStateChanged](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#onstatechanged)
* [onViewportChange](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#onviewportchange)
* [onZoom](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#onzoom)
* [render](/auto-docs/free-layout-editor/classes/PlaygroundLayer.md#render)

## Constructors

### constructor

**new PlaygroundLayer**()

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[constructor](/auto-docs/free-layout-editor/classes/Layer.md#constructor)

## Properties

### config

**config**: [`PlaygroundConfigEntity`](/auto-docs/free-layout-editor/classes/PlaygroundConfigEntity.md)

全局画布配置

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[config](/auto-docs/free-layout-editor/classes/Layer.md#config)

***

### context

`Readonly` **context**: `any`

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[context](/auto-docs/free-layout-editor/classes/Layer.md#context)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/auto-docs/free-layout-editor/classes/EntityManager.md)

实体管理器

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[entityManager](/auto-docs/free-layout-editor/classes/Layer.md#entitymanager)

***

### getOtherLayer

**getOtherLayer**: \<T>(`layerRegistry`: [`LayerRegistry`](/auto-docs/free-layout-editor/interfaces/LayerRegistry.md)<`T`>) => `undefined` | `T`

#### Type declaration

<`T`>(`layerRegistry`): `undefined` | `T`

可以用于获取别的 layer

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`, `T`> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/free-layout-editor/interfaces/LayerRegistry.md)<`T`> |

##### Returns

`undefined` | `T`

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[getOtherLayer](/auto-docs/free-layout-editor/classes/Layer.md#getotherlayer)

***

### isFocused

`Readonly` **isFocused**: `boolean`

playground 是否 focused

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[isFocused](/auto-docs/free-layout-editor/classes/Layer.md#isfocused)

***

### listenGlobalEvent

**listenGlobalEvent**: (`name`: `string`, `handle`: (`event`: `any`) => `boolean` | `void`, `priority?`: `number`, `options?`: `AddEventListenerOptions`) => [`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Type declaration

(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

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

[`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[listenGlobalEvent](/auto-docs/free-layout-editor/classes/Layer.md#listenglobalevent)

***

### listenPlaygroundEvent

**listenPlaygroundEvent**: (`name`: `string`, `handle`: (`event`: `any`) => `boolean` | `void`, `priority?`: `number`, `options?`: `AddEventListenerOptions`) => [`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Type declaration

(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

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

[`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[listenPlaygroundEvent](/auto-docs/free-layout-editor/classes/Layer.md#listenplaygroundevent)

***

### node

**node**: `HTMLElement`

layer 可能存在 dom 也可能没有，如果有，则会加入到 pipeline 的 dom 节点上

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[node](/auto-docs/free-layout-editor/classes/Layer.md#node)

***

### observeManager

**observeManager**: [`PipelineEntities`](/auto-docs/free-layout-editor/interfaces/PipelineEntities.md)

当前 layer 的所有监听的实体数据

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[observeManager](/auto-docs/free-layout-editor/classes/Layer.md#observemanager)

***

### options

**options**: [`PlaygroundLayerOptions`](/auto-docs/free-layout-editor/interfaces/PlaygroundLayerOptions.md)

layer 的配置, 由 registerLayer(Layer, LayerOptions) 传入

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[options](/auto-docs/free-layout-editor/classes/Layer.md#options)

***

### pipelineNode

**pipelineNode**: `HTMLElement`

父节点

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[pipelineNode](/auto-docs/free-layout-editor/classes/Layer.md#pipelinenode)

***

### playgroundNode

**playgroundNode**: `HTMLElement`

画布根节点

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[playgroundNode](/auto-docs/free-layout-editor/classes/Layer.md#playgroundnode)

***

### protectWheelArea

`Optional` **protectWheelArea**: [`ProtectWheelArea`](/auto-docs/free-layout-editor/variables/ProtectWheelArea-1.md)

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

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[reloadEntities](/auto-docs/free-layout-editor/classes/Layer.md#reloadentities)

***

### renderWithReactMemo

**renderWithReactMemo**: `boolean`

默认在渲染时候都会启用 react memo 进行隔离，这种情况就需要数据驱动更新

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[renderWithReactMemo](/auto-docs/free-layout-editor/classes/Layer.md#renderwithreactmemo)

## Methods

### autorun

**autorun**(): `void`

自动触发更新，在不需要 react 的时候用这个方法

#### Returns

`void`

#### Overrides

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[autorun](/auto-docs/free-layout-editor/classes/Layer.md#autorun)

***

### createDOMCache

**createDOMCache**<`T`>(`className`, `children?`): [`CacheManager`](/auto-docs/free-layout-editor/interfaces/CacheManager.md)<`T`, [`CacheOriginItem`](/auto-docs/free-layout-editor/interfaces/CacheOriginItem.md)>

创建 dom 缓冲池

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`DOMCache`](/auto-docs/free-layout-editor/interfaces/DOMCache.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `className` | `string` | () => `HTMLElement` |
| `children?` | `string` |

#### Returns

[`CacheManager`](/auto-docs/free-layout-editor/interfaces/CacheManager.md)<`T`, [`CacheOriginItem`](/auto-docs/free-layout-editor/interfaces/CacheOriginItem.md)>

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[createDOMCache](/auto-docs/free-layout-editor/classes/Layer.md#createdomcache)

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

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[dispose](/auto-docs/free-layout-editor/classes/Layer.md#dispose)

***

### getPosFromMouseEvent

**getPosFromMouseEvent**(`event`, `addScale?`): [`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md)

获取鼠标在 Playground 的位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Object` |
| `event.clientX` | `number` |
| `event.clientY` | `number` |
| `addScale?` | `boolean` |

#### Returns

[`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md)

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[getPosFromMouseEvent](/auto-docs/free-layout-editor/classes/Layer.md#getposfrommouseevent)

***

### onBlur

`Optional` **onBlur**(): `void`

playground blur 时候触发

#### Returns

`void`

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[onBlur](/auto-docs/free-layout-editor/classes/Layer.md#onblur)

***

### onFocus

`Optional` **onFocus**(): `void`

playground focus 时候触发

#### Returns

`void`

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[onFocus](/auto-docs/free-layout-editor/classes/Layer.md#onfocus)

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

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[onReadonlyOrDisabledChange](/auto-docs/free-layout-editor/classes/Layer.md#onreadonlyordisabledchange)

***

### onReady

**onReady**(): `void`

初始化时候触发

#### Returns

`void`

#### Overrides

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[onReady](/auto-docs/free-layout-editor/classes/Layer.md#onready)

***

### onResize

`Optional` **onResize**(`size`): `void`

playground 大小变化时候会触发

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | [`PipelineDimension`](/auto-docs/free-layout-editor/interfaces/PipelineDimension.md) |

#### Returns

`void`

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[onResize](/auto-docs/free-layout-editor/classes/Layer.md#onresize)

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

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[onScroll](/auto-docs/free-layout-editor/classes/Layer.md#onscroll)

***

### onStateChanged

**onStateChanged**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`EditorStateChangeEvent`](/auto-docs/free-layout-editor/interfaces/EditorStateChangeEvent.md) |

#### Returns

`void`

***

### onViewportChange

`Optional` **onViewportChange**(): `void`

viewport 更新触发

#### Returns

`void`

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[onViewportChange](/auto-docs/free-layout-editor/classes/Layer.md#onviewportchange)

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

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[onZoom](/auto-docs/free-layout-editor/classes/Layer.md#onzoom)

***

### render

`Optional` **render**(): `Element`

绘制 react

#### Returns

`Element`

#### Inherited from

[Layer](/auto-docs/free-layout-editor/classes/Layer.md).[render](/auto-docs/free-layout-editor/classes/Layer.md#render)
