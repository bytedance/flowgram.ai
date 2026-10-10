# Class: FlowLabelsLayer

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)

  ↳ **`FlowLabelsLayer`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#constructor)

### Properties

* [\_transitions](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#_transitions)
* [config](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#config)
* [context](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#context)
* [document](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#document)
* [documentTransformer](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#documenttransformer)
* [entityManager](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#entitymanager)
* [flowRenderState](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#flowrenderstate)
* [getOtherLayer](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#getotherlayer)
* [isFocused](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#isfocused)
* [listenGlobalEvent](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#listenglobalevent)
* [listenPlaygroundEvent](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#listenplaygroundevent)
* [node](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#node)
* [observeManager](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#observemanager)
* [onViewportChange](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#onviewportchange)
* [options](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#options)
* [pipelineNode](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#pipelinenode)
* [playgroundNode](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#playgroundnode)
* [reloadEntities](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#reloadentities)
* [renderWithReactMemo](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#renderwithreactmemo)
* [rendererRegistry](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#rendererregistry)

### Accessors

* [transitions](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#transitions)

### Methods

* [autorun](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#autorun)
* [createDOMCache](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#createdomcache)
* [dispose](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#dispose)
* [getPosFromMouseEvent](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#getposfrommouseevent)
* [onBlur](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#onblur)
* [onFocus](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#onfocus)
* [onReadonlyOrDisabledChange](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#onreadonlyordisabledchange)
* [onReady](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#onready)
* [onResize](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#onresize)
* [onScroll](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#onscroll)
* [onZoom](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#onzoom)
* [render](/en/auto-docs/free-layout-editor/classes/FlowLabelsLayer.md#render)

## Constructors

### constructor

**new FlowLabelsLayer**()

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[constructor](/en/auto-docs/free-layout-editor/classes/Layer.md#constructor)

## Properties

### \_transitions

**\_transitions**: [`FlowNodeTransitionData`](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md)\[]

监听 transition 变化

***

### config

**config**: [`PlaygroundConfigEntity`](/en/auto-docs/free-layout-editor/classes/PlaygroundConfigEntity.md)

全局画布配置

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[config](/en/auto-docs/free-layout-editor/classes/Layer.md#config)

***

### context

`Readonly` **context**: `any`

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[context](/en/auto-docs/free-layout-editor/classes/Layer.md#context)

***

### document

`Readonly` **document**: [`FlowDocument`](/en/auto-docs/free-layout-editor/classes/FlowDocument.md)<[`FlowDocumentJSON`](/en/auto-docs/free-layout-editor/types/FlowDocumentJSON.md)>

***

### documentTransformer

`Readonly` **documentTransformer**: [`FlowDocumentTransformerEntity`](/en/auto-docs/free-layout-editor/classes/FlowDocumentTransformerEntity.md)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/en/auto-docs/free-layout-editor/classes/EntityManager.md)

实体管理器

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[entityManager](/en/auto-docs/free-layout-editor/classes/Layer.md#entitymanager)

***

### flowRenderState

`Readonly` **flowRenderState**: [`FlowRendererStateEntity`](/en/auto-docs/free-layout-editor/classes/FlowRendererStateEntity.md)

***

### getOtherLayer

**getOtherLayer**: \<T>(`layerRegistry`: [`LayerRegistry`](/en/auto-docs/free-layout-editor/interfaces/LayerRegistry.md)<`T`>) => `undefined` | `T`

#### Type declaration

<`T`>(`layerRegistry`): `undefined` | `T`

可以用于获取别的 layer

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`, `T`> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/en/auto-docs/free-layout-editor/interfaces/LayerRegistry.md)<`T`> |

##### Returns

`undefined` | `T`

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[getOtherLayer](/en/auto-docs/free-layout-editor/classes/Layer.md#getotherlayer)

***

### isFocused

`Readonly` **isFocused**: `boolean`

playground 是否 focused

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[isFocused](/en/auto-docs/free-layout-editor/classes/Layer.md#isfocused)

***

### listenGlobalEvent

**listenGlobalEvent**: (`name`: `string`, `handle`: (`event`: `any`) => `boolean` | `void`, `priority?`: `number`, `options?`: `AddEventListenerOptions`) => [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Type declaration

(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

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

[`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[listenGlobalEvent](/en/auto-docs/free-layout-editor/classes/Layer.md#listenglobalevent)

***

### listenPlaygroundEvent

**listenPlaygroundEvent**: (`name`: `string`, `handle`: (`event`: `any`) => `boolean` | `void`, `priority?`: `number`, `options?`: `AddEventListenerOptions`) => [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Type declaration

(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

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

[`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[listenPlaygroundEvent](/en/auto-docs/free-layout-editor/classes/Layer.md#listenplaygroundevent)

***

### node

**node**: `HTMLDivElement`

layer 可能存在 dom 也可能没有，如果有，则会加入到 pipeline 的 dom 节点上

#### Overrides

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[node](/en/auto-docs/free-layout-editor/classes/Layer.md#node)

***

### observeManager

**observeManager**: [`PipelineEntities`](/en/auto-docs/free-layout-editor/interfaces/PipelineEntities.md)

当前 layer 的所有监听的实体数据

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[observeManager](/en/auto-docs/free-layout-editor/classes/Layer.md#observemanager)

***

### onViewportChange

**onViewportChange**: `DebouncedFunc`<(...`args`: `any`) => `any`>

可视区域变化

#### Overrides

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[onViewportChange](/en/auto-docs/free-layout-editor/classes/Layer.md#onviewportchange)

***

### options

**options**: `any`

layer 的配置, 由 registerLayer(Layer, LayerOptions) 传入

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[options](/en/auto-docs/free-layout-editor/classes/Layer.md#options)

***

### pipelineNode

**pipelineNode**: `HTMLElement`

父节点

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[pipelineNode](/en/auto-docs/free-layout-editor/classes/Layer.md#pipelinenode)

***

### playgroundNode

**playgroundNode**: `HTMLElement`

画布根节点

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[playgroundNode](/en/auto-docs/free-layout-editor/classes/Layer.md#playgroundnode)

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

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[reloadEntities](/en/auto-docs/free-layout-editor/classes/Layer.md#reloadentities)

***

### renderWithReactMemo

**renderWithReactMemo**: `boolean`

默认在渲染时候都会启用 react memo 进行隔离，这种情况就需要数据驱动更新

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[renderWithReactMemo](/en/auto-docs/free-layout-editor/classes/Layer.md#renderwithreactmemo)

***

### rendererRegistry

`Readonly` **rendererRegistry**: [`FlowRendererRegistry`](/en/auto-docs/free-layout-editor/classes/FlowRendererRegistry.md)

## Accessors

### transitions

`get` **transitions**(): [`FlowNodeTransitionData`](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md)\[]

#### Returns

[`FlowNodeTransitionData`](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md)\[]

## Methods

### autorun

`Optional` **autorun**(): `void`

自动触发更新，在不需要 react 的时候用这个方法

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[autorun](/en/auto-docs/free-layout-editor/classes/Layer.md#autorun)

***

### createDOMCache

**createDOMCache**<`T`>(`className`, `children?`): [`CacheManager`](/en/auto-docs/free-layout-editor/interfaces/CacheManager.md)<`T`, [`CacheOriginItem`](/en/auto-docs/free-layout-editor/interfaces/CacheOriginItem.md)>

创建 dom 缓冲池

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`DOMCache`](/en/auto-docs/free-layout-editor/interfaces/DOMCache.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `className` | `string` | () => `HTMLElement` |
| `children?` | `string` |

#### Returns

[`CacheManager`](/en/auto-docs/free-layout-editor/interfaces/CacheManager.md)<`T`, [`CacheOriginItem`](/en/auto-docs/free-layout-editor/interfaces/CacheOriginItem.md)>

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[createDOMCache](/en/auto-docs/free-layout-editor/classes/Layer.md#createdomcache)

***

### dispose

**dispose**(): `void`

销毁

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[dispose](/en/auto-docs/free-layout-editor/classes/Layer.md#dispose)

***

### getPosFromMouseEvent

**getPosFromMouseEvent**(`event`, `addScale?`): [`PositionSchema`](/en/auto-docs/free-layout-editor/interfaces/PositionSchema.md)

获取鼠标在 Playground 的位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Object` |
| `event.clientX` | `number` |
| `event.clientY` | `number` |
| `addScale?` | `boolean` |

#### Returns

[`PositionSchema`](/en/auto-docs/free-layout-editor/interfaces/PositionSchema.md)

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[getPosFromMouseEvent](/en/auto-docs/free-layout-editor/classes/Layer.md#getposfrommouseevent)

***

### onBlur

`Optional` **onBlur**(): `void`

playground blur 时候触发

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[onBlur](/en/auto-docs/free-layout-editor/classes/Layer.md#onblur)

***

### onFocus

`Optional` **onFocus**(): `void`

playground focus 时候触发

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[onFocus](/en/auto-docs/free-layout-editor/classes/Layer.md#onfocus)

***

### onReadonlyOrDisabledChange

**onReadonlyOrDisabledChange**(): `void`

监听readonly和 disabled 状态 并刷新layer, 并刷新

#### Returns

`void`

#### Overrides

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[onReadonlyOrDisabledChange](/en/auto-docs/free-layout-editor/classes/Layer.md#onreadonlyordisabledchange)

***

### onReady

**onReady**(): `void`

初始化时候触发

#### Returns

`void`

#### Overrides

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[onReady](/en/auto-docs/free-layout-editor/classes/Layer.md#onready)

***

### onResize

`Optional` **onResize**(`size`): `void`

playground 大小变化时候会触发

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | [`PipelineDimension`](/en/auto-docs/free-layout-editor/interfaces/PipelineDimension.md) |

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[onResize](/en/auto-docs/free-layout-editor/classes/Layer.md#onresize)

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

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[onScroll](/en/auto-docs/free-layout-editor/classes/Layer.md#onscroll)

***

### onZoom

**onZoom**(`scale`): `void`

监听缩放，目前采用整体缩放

#### Parameters

| Name | Type |
| :------ | :------ |
| `scale` | `number` |

#### Returns

`void`

#### Overrides

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[onZoom](/en/auto-docs/free-layout-editor/classes/Layer.md#onzoom)

***

### render

**render**(): `Element`

绘制 react

#### Returns

`Element`

#### Overrides

[Layer](/en/auto-docs/free-layout-editor/classes/Layer.md).[render](/en/auto-docs/free-layout-editor/classes/Layer.md#render)
