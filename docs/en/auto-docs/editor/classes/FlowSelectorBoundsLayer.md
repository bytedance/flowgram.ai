# Class: FlowSelectorBoundsLayer

流程节点被框选后的边界区域渲染

## Hierarchy

* [`Layer`](/en/auto-docs/editor/classes/Layer.md)<[`FlowSelectorBoundsLayerOptions`](/en/auto-docs/editor/interfaces/FlowSelectorBoundsLayerOptions.md)>

  ↳ **`FlowSelectorBoundsLayer`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#constructor)

### Properties

* [\_transforms](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#_transforms)
* [commandRegistry](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#commandregistry)
* [config](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#config)
* [context](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#context)
* [entityManager](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#entitymanager)
* [getOtherLayer](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#getotherlayer)
* [isFocused](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#isfocused)
* [listenGlobalEvent](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#listenglobalevent)
* [listenPlaygroundEvent](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#listenplaygroundevent)
* [node](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#node)
* [observeManager](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#observemanager)
* [options](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#options)
* [pipelineNode](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#pipelinenode)
* [playgroundNode](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#playgroundnode)
* [reloadEntities](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#reloadentities)
* [renderStates](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#renderstates)
* [renderWithReactMemo](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#renderwithreactmemo)
* [rendererRegistry](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#rendererregistry)
* [selectBoundsBackground](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#selectboundsbackground)

### Methods

* [autorun](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#autorun)
* [createDOMCache](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#createdomcache)
* [dispose](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#dispose)
* [getPosFromMouseEvent](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#getposfrommouseevent)
* [isEnabled](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#isenabled)
* [onBlur](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#onblur)
* [onFocus](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#onfocus)
* [onReadonlyOrDisabledChange](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#onreadonlyordisabledchange)
* [onReady](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#onready)
* [onResize](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#onresize)
* [onScroll](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#onscroll)
* [onViewportChange](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#onviewportchange)
* [onZoom](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#onzoom)
* [render](/en/auto-docs/editor/classes/FlowSelectorBoundsLayer.md#render)

## Constructors

### constructor

**new FlowSelectorBoundsLayer**()

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[constructor](/en/auto-docs/editor/classes/Layer.md#constructor)

## Properties

### \_transforms

**\_transforms**: [`FlowNodeTransformData`](/en/auto-docs/editor/classes/FlowNodeTransformData.md)\[]

***

### commandRegistry

`Readonly` **commandRegistry**: [`CommandRegistry`](/en/auto-docs/editor/classes/CommandRegistry.md)

***

### config

**config**: [`PlaygroundConfigEntity`](/en/auto-docs/editor/classes/PlaygroundConfigEntity.md)

全局画布配置

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[config](/en/auto-docs/editor/classes/Layer.md#config)

***

### context

`Readonly` **context**: `any`

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[context](/en/auto-docs/editor/classes/Layer.md#context)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/en/auto-docs/editor/classes/EntityManager.md)

实体管理器

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[entityManager](/en/auto-docs/editor/classes/Layer.md#entitymanager)

***

### getOtherLayer

**getOtherLayer**: \<T>(`layerRegistry`: [`LayerRegistry`](/en/auto-docs/editor/interfaces/LayerRegistry.md)<`T`>) => `undefined` | `T`

#### Type declaration

<`T`>(`layerRegistry`): `undefined` | `T`

可以用于获取别的 layer

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/en/auto-docs/editor/classes/Layer.md)<`any`, `any`, `T`> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/en/auto-docs/editor/interfaces/LayerRegistry.md)<`T`> |

##### Returns

`undefined` | `T`

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[getOtherLayer](/en/auto-docs/editor/classes/Layer.md#getotherlayer)

***

### isFocused

`Readonly` **isFocused**: `boolean`

playground 是否 focused

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[isFocused](/en/auto-docs/editor/classes/Layer.md#isfocused)

***

### listenGlobalEvent

**listenGlobalEvent**: (`name`: `string`, `handle`: (`event`: `any`) => `boolean` | `void`, `priority?`: `number`, `options?`: `AddEventListenerOptions`) => [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

#### Type declaration

(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

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

[`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[listenGlobalEvent](/en/auto-docs/editor/classes/Layer.md#listenglobalevent)

***

### listenPlaygroundEvent

**listenPlaygroundEvent**: (`name`: `string`, `handle`: (`event`: `any`) => `boolean` | `void`, `priority?`: `number`, `options?`: `AddEventListenerOptions`) => [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

#### Type declaration

(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

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

[`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[listenPlaygroundEvent](/en/auto-docs/editor/classes/Layer.md#listenplaygroundevent)

***

### node

`Readonly` **node**: `HTMLDivElement`

layer 可能存在 dom 也可能没有，如果有，则会加入到 pipeline 的 dom 节点上

#### Overrides

[Layer](/en/auto-docs/editor/classes/Layer.md).[node](/en/auto-docs/editor/classes/Layer.md#node)

***

### observeManager

**observeManager**: [`PipelineEntities`](/en/auto-docs/editor/interfaces/PipelineEntities.md)

当前 layer 的所有监听的实体数据

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[observeManager](/en/auto-docs/editor/classes/Layer.md#observemanager)

***

### options

**options**: [`FlowSelectorBoundsLayerOptions`](/en/auto-docs/editor/interfaces/FlowSelectorBoundsLayerOptions.md)

layer 的配置, 由 registerLayer(Layer, LayerOptions) 传入

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[options](/en/auto-docs/editor/classes/Layer.md#options)

***

### pipelineNode

**pipelineNode**: `HTMLElement`

父节点

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[pipelineNode](/en/auto-docs/editor/classes/Layer.md#pipelinenode)

***

### playgroundNode

**playgroundNode**: `HTMLElement`

画布根节点

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[playgroundNode](/en/auto-docs/editor/classes/Layer.md#playgroundnode)

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

[Layer](/en/auto-docs/editor/classes/Layer.md).[reloadEntities](/en/auto-docs/editor/classes/Layer.md#reloadentities)

***

### renderStates

**renderStates**: [`FlowNodeRenderData`](/en/auto-docs/editor/classes/FlowNodeRenderData.md)\[]

需要监听节点的展开和收起状态，重新绘制边框

***

### renderWithReactMemo

**renderWithReactMemo**: `boolean`

默认在渲染时候都会启用 react memo 进行隔离，这种情况就需要数据驱动更新

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[renderWithReactMemo](/en/auto-docs/editor/classes/Layer.md#renderwithreactmemo)

***

### rendererRegistry

`Readonly` **rendererRegistry**: [`FlowRendererRegistry`](/en/auto-docs/editor/classes/FlowRendererRegistry.md)

***

### selectBoundsBackground

`Readonly` **selectBoundsBackground**: `HTMLDivElement`

## Methods

### autorun

`Optional` **autorun**(): `void`

自动触发更新，在不需要 react 的时候用这个方法

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[autorun](/en/auto-docs/editor/classes/Layer.md#autorun)

***

### createDOMCache

**createDOMCache**<`T`>(`className`, `children?`): [`CacheManager`](/en/auto-docs/editor/interfaces/CacheManager.md)<`T`, [`CacheOriginItem`](/en/auto-docs/editor/interfaces/CacheOriginItem.md)>

创建 dom 缓冲池

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`DOMCache`](/en/auto-docs/editor/interfaces/DOMCache.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `className` | `string` | () => `HTMLElement` |
| `children?` | `string` |

#### Returns

[`CacheManager`](/en/auto-docs/editor/interfaces/CacheManager.md)<`T`, [`CacheOriginItem`](/en/auto-docs/editor/interfaces/CacheOriginItem.md)>

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[createDOMCache](/en/auto-docs/editor/classes/Layer.md#createdomcache)

***

### dispose

**dispose**(): `void`

销毁

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[dispose](/en/auto-docs/editor/classes/Layer.md#dispose)

***

### getPosFromMouseEvent

**getPosFromMouseEvent**(`event`, `addScale?`): [`PositionSchema`](/en/auto-docs/editor/interfaces/PositionSchema.md)

获取鼠标在 Playground 的位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Object` |
| `event.clientX` | `number` |
| `event.clientY` | `number` |
| `addScale?` | `boolean` |

#### Returns

[`PositionSchema`](/en/auto-docs/editor/interfaces/PositionSchema.md)

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[getPosFromMouseEvent](/en/auto-docs/editor/classes/Layer.md#getposfrommouseevent)

***

### isEnabled

**isEnabled**(): `boolean`

#### Returns

`boolean`

***

### onBlur

`Optional` **onBlur**(): `void`

playground blur 时候触发

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[onBlur](/en/auto-docs/editor/classes/Layer.md#onblur)

***

### onFocus

`Optional` **onFocus**(): `void`

playground focus 时候触发

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[onFocus](/en/auto-docs/editor/classes/Layer.md#onfocus)

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

[Layer](/en/auto-docs/editor/classes/Layer.md).[onReadonlyOrDisabledChange](/en/auto-docs/editor/classes/Layer.md#onreadonlyordisabledchange)

***

### onReady

**onReady**(): `void`

初始化时候触发

#### Returns

`void`

#### Overrides

[Layer](/en/auto-docs/editor/classes/Layer.md).[onReady](/en/auto-docs/editor/classes/Layer.md#onready)

***

### onResize

`Optional` **onResize**(`size`): `void`

playground 大小变化时候会触发

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | [`PipelineDimension`](/en/auto-docs/editor/interfaces/PipelineDimension.md) |

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/editor/classes/Layer.md).[onResize](/en/auto-docs/editor/classes/Layer.md#onresize)

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

[Layer](/en/auto-docs/editor/classes/Layer.md).[onScroll](/en/auto-docs/editor/classes/Layer.md#onscroll)

***

### onViewportChange

**onViewportChange**(): `void`

viewport 更新触发

#### Returns

`void`

#### Overrides

[Layer](/en/auto-docs/editor/classes/Layer.md).[onViewportChange](/en/auto-docs/editor/classes/Layer.md#onviewportchange)

***

### onZoom

**onZoom**(`scale`): `void`

监听缩放

#### Parameters

| Name | Type |
| :------ | :------ |
| `scale` | `number` |

#### Returns

`void`

#### Overrides

[Layer](/en/auto-docs/editor/classes/Layer.md).[onZoom](/en/auto-docs/editor/classes/Layer.md#onzoom)

***

### render

**render**(): `Element`

绘制 react

#### Returns

`Element`

#### Overrides

[Layer](/en/auto-docs/editor/classes/Layer.md).[render](/en/auto-docs/editor/classes/Layer.md#render)
