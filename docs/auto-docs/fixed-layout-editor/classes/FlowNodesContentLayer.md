# Class: FlowNodesContentLayer

渲染节点内容

## Hierarchy

* [`Layer`](/auto-docs/fixed-layout-editor/classes/Layer.md)

  ↳ **`FlowNodesContentLayer`**

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#constructor)

### Properties

* [\_renderStates](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#_renderstates)
* [config](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#config)
* [context](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#context)
* [document](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#document)
* [documentTransformer](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#documenttransformer)
* [entityManager](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#entitymanager)
* [getOtherLayer](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#getotherlayer)
* [isFocused](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#isfocused)
* [listenGlobalEvent](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#listenglobalevent)
* [listenPlaygroundEvent](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#listenplaygroundevent)
* [node](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#node)
* [observeManager](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#observemanager)
* [options](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#options)
* [pipelineNode](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#pipelinenode)
* [playgroundNode](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#playgroundnode)
* [reloadEntities](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#reloadentities)
* [renderWithReactMemo](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#renderwithreactmemo)
* [rendererRegistry](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#rendererregistry)

### Accessors

* [renderStatesVisible](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#renderstatesvisible)

### Methods

* [autorun](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#autorun)
* [createDOMCache](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#createdomcache)
* [dispose](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#dispose)
* [getPortalRenderer](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#getportalrenderer)
* [getPortals](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#getportals)
* [getPosFromMouseEvent](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#getposfrommouseevent)
* [onBlur](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#onblur)
* [onFocus](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#onfocus)
* [onReadonlyOrDisabledChange](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#onreadonlyordisabledchange)
* [onReady](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#onready)
* [onResize](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#onresize)
* [onScroll](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#onscroll)
* [onViewportChange](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#onviewportchange)
* [onZoom](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#onzoom)
* [render](/auto-docs/fixed-layout-editor/classes/FlowNodesContentLayer.md#render)

## Constructors

### constructor

**new FlowNodesContentLayer**()

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[constructor](/auto-docs/fixed-layout-editor/classes/Layer.md#constructor)

## Properties

### \_renderStates

**\_renderStates**: [`FlowNodeRenderData`](/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md)\[]

***

### config

**config**: [`PlaygroundConfigEntity`](/auto-docs/fixed-layout-editor/classes/PlaygroundConfigEntity.md)

全局画布配置

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[config](/auto-docs/fixed-layout-editor/classes/Layer.md#config)

***

### context

`Readonly` **context**: `any`

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[context](/auto-docs/fixed-layout-editor/classes/Layer.md#context)

***

### document

`Readonly` **document**: [`FlowDocument`](/auto-docs/fixed-layout-editor/classes/FlowDocument.md)<[`FlowDocumentJSON`](/auto-docs/fixed-layout-editor/types/FlowDocumentJSON.md)>

***

### documentTransformer

`Readonly` **documentTransformer**: [`FlowDocumentTransformerEntity`](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/auto-docs/fixed-layout-editor/classes/EntityManager.md)

实体管理器

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[entityManager](/auto-docs/fixed-layout-editor/classes/Layer.md#entitymanager)

***

### getOtherLayer

**getOtherLayer**: \<T>(`layerRegistry`: [`LayerRegistry`](/auto-docs/fixed-layout-editor/interfaces/LayerRegistry.md)<`T`>) => `undefined` | `T`

#### Type declaration

<`T`>(`layerRegistry`): `undefined` | `T`

可以用于获取别的 layer

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/auto-docs/fixed-layout-editor/classes/Layer.md)<`any`, `any`, `T`> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/fixed-layout-editor/interfaces/LayerRegistry.md)<`T`> |

##### Returns

`undefined` | `T`

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[getOtherLayer](/auto-docs/fixed-layout-editor/classes/Layer.md#getotherlayer)

***

### isFocused

`Readonly` **isFocused**: `boolean`

playground 是否 focused

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[isFocused](/auto-docs/fixed-layout-editor/classes/Layer.md#isfocused)

***

### listenGlobalEvent

**listenGlobalEvent**: (`name`: `string`, `handle`: (`event`: `any`) => `boolean` | `void`, `priority?`: `number`, `options?`: `AddEventListenerOptions`) => [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Type declaration

(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

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

[`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[listenGlobalEvent](/auto-docs/fixed-layout-editor/classes/Layer.md#listenglobalevent)

***

### listenPlaygroundEvent

**listenPlaygroundEvent**: (`name`: `string`, `handle`: (`event`: `any`) => `boolean` | `void`, `priority?`: `number`, `options?`: `AddEventListenerOptions`) => [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Type declaration

(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

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

[`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[listenPlaygroundEvent](/auto-docs/fixed-layout-editor/classes/Layer.md#listenplaygroundevent)

***

### node

**node**: `HTMLDivElement`

layer 可能存在 dom 也可能没有，如果有，则会加入到 pipeline 的 dom 节点上

#### Overrides

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[node](/auto-docs/fixed-layout-editor/classes/Layer.md#node)

***

### observeManager

**observeManager**: [`PipelineEntities`](/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md)

当前 layer 的所有监听的实体数据

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[observeManager](/auto-docs/fixed-layout-editor/classes/Layer.md#observemanager)

***

### options

**options**: `any`

layer 的配置, 由 registerLayer(Layer, LayerOptions) 传入

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[options](/auto-docs/fixed-layout-editor/classes/Layer.md#options)

***

### pipelineNode

**pipelineNode**: `HTMLElement`

父节点

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[pipelineNode](/auto-docs/fixed-layout-editor/classes/Layer.md#pipelinenode)

***

### playgroundNode

**playgroundNode**: `HTMLElement`

画布根节点

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[playgroundNode](/auto-docs/fixed-layout-editor/classes/Layer.md#playgroundnode)

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

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[reloadEntities](/auto-docs/fixed-layout-editor/classes/Layer.md#reloadentities)

***

### renderWithReactMemo

**renderWithReactMemo**: `boolean`

默认在渲染时候都会启用 react memo 进行隔离，这种情况就需要数据驱动更新

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[renderWithReactMemo](/auto-docs/fixed-layout-editor/classes/Layer.md#renderwithreactmemo)

***

### rendererRegistry

`Readonly` **rendererRegistry**: [`FlowRendererRegistry`](/auto-docs/fixed-layout-editor/classes/FlowRendererRegistry.md)

## Accessors

### renderStatesVisible

`get` **renderStatesVisible**(): [`FlowNodeRenderData`](/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md)\[]

#### Returns

[`FlowNodeRenderData`](/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md)\[]

## Methods

### autorun

`Optional` **autorun**(): `void`

自动触发更新，在不需要 react 的时候用这个方法

#### Returns

`void`

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[autorun](/auto-docs/fixed-layout-editor/classes/Layer.md#autorun)

***

### createDOMCache

**createDOMCache**<`T`>(`className`, `children?`): [`CacheManager`](/auto-docs/fixed-layout-editor/interfaces/CacheManager.md)<`T`, [`CacheOriginItem`](/auto-docs/fixed-layout-editor/interfaces/CacheOriginItem.md)>

创建 dom 缓冲池

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`DOMCache`](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `className` | `string` | () => `HTMLElement` |
| `children?` | `string` |

#### Returns

[`CacheManager`](/auto-docs/fixed-layout-editor/interfaces/CacheManager.md)<`T`, [`CacheOriginItem`](/auto-docs/fixed-layout-editor/interfaces/CacheOriginItem.md)>

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[createDOMCache](/auto-docs/fixed-layout-editor/classes/Layer.md#createdomcache)

***

### dispose

**dispose**(): `void`

销毁

#### Returns

`void`

#### Overrides

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[dispose](/auto-docs/fixed-layout-editor/classes/Layer.md#dispose)

***

### getPortalRenderer

**getPortalRenderer**(`data`): (`props`: `any`) => `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`FlowNodeRenderData`](/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md) |

#### Returns

`fn`

(`props`): `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `any` |

##### Returns

`Element`

***

### getPortals

**getPortals**(): `NodePortal`\[]

#### Returns

`NodePortal`\[]

***

### getPosFromMouseEvent

**getPosFromMouseEvent**(`event`, `addScale?`): [`PositionSchema`](/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md)

获取鼠标在 Playground 的位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Object` |
| `event.clientX` | `number` |
| `event.clientY` | `number` |
| `addScale?` | `boolean` |

#### Returns

[`PositionSchema`](/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md)

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[getPosFromMouseEvent](/auto-docs/fixed-layout-editor/classes/Layer.md#getposfrommouseevent)

***

### onBlur

`Optional` **onBlur**(): `void`

playground blur 时候触发

#### Returns

`void`

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[onBlur](/auto-docs/fixed-layout-editor/classes/Layer.md#onblur)

***

### onFocus

`Optional` **onFocus**(): `void`

playground focus 时候触发

#### Returns

`void`

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[onFocus](/auto-docs/fixed-layout-editor/classes/Layer.md#onfocus)

***

### onReadonlyOrDisabledChange

**onReadonlyOrDisabledChange**(): `void`

监听readonly和 disabled 状态 并刷新layer, 并刷新节点

#### Returns

`void`

#### Overrides

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[onReadonlyOrDisabledChange](/auto-docs/fixed-layout-editor/classes/Layer.md#onreadonlyordisabledchange)

***

### onReady

**onReady**(): `void`

初始化时候触发

#### Returns

`void`

#### Overrides

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[onReady](/auto-docs/fixed-layout-editor/classes/Layer.md#onready)

***

### onResize

`Optional` **onResize**(`size`): `void`

playground 大小变化时候会触发

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | [`PipelineDimension`](/auto-docs/fixed-layout-editor/interfaces/PipelineDimension.md) |

#### Returns

`void`

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[onResize](/auto-docs/fixed-layout-editor/classes/Layer.md#onresize)

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

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[onScroll](/auto-docs/fixed-layout-editor/classes/Layer.md#onscroll)

***

### onViewportChange

`Optional` **onViewportChange**(): `void`

viewport 更新触发

#### Returns

`void`

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[onViewportChange](/auto-docs/fixed-layout-editor/classes/Layer.md#onviewportchange)

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

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[onZoom](/auto-docs/fixed-layout-editor/classes/Layer.md#onzoom)

***

### render

**render**(): `Element`

绘制 react

#### Returns

`Element`

#### Overrides

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[render](/auto-docs/fixed-layout-editor/classes/Layer.md#render)
