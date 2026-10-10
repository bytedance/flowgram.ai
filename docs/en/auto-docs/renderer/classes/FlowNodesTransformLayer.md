# Class: FlowNodesTransformLayer

渲染节点位置

## Hierarchy

* `Layer`<[`FlowNodesTransformLayerOptions`](/en/auto-docs/renderer/interfaces/FlowNodesTransformLayerOptions.md)>

  ↳ **`FlowNodesTransformLayer`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#constructor)

### Properties

* [\_transforms](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#_transforms)
* [config](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#config)
* [context](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#context)
* [document](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#document)
* [documentTransformer](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#documenttransformer)
* [entityManager](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#entitymanager)
* [getOtherLayer](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#getotherlayer)
* [isFocused](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#isfocused)
* [listenGlobalEvent](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#listenglobalevent)
* [listenPlaygroundEvent](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#listenplaygroundevent)
* [node](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#node)
* [observeManager](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#observemanager)
* [options](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#options)
* [pipelineNode](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#pipelinenode)
* [playgroundNode](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#playgroundnode)
* [reloadEntities](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#reloadentities)
* [renderWithReactMemo](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#renderwithreactmemo)
* [resizeObserver](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#resizeobserver)

### Accessors

* [transformVisibles](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#transformvisibles)
* [visibeBounds](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#visibebounds)

### Methods

* [autorun](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#autorun)
* [createDOMCache](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#createdomcache)
* [dispose](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#dispose)
* [getPosFromMouseEvent](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#getposfrommouseevent)
* [onBlur](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#onblur)
* [onFocus](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#onfocus)
* [onReadonlyOrDisabledChange](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#onreadonlyordisabledchange)
* [onReady](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#onready)
* [onResize](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#onresize)
* [onScroll](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#onscroll)
* [onViewportChange](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#onviewportchange)
* [onZoom](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#onzoom)
* [render](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#render)
* [updateNodesBounds](/en/auto-docs/renderer/classes/FlowNodesTransformLayer.md#updatenodesbounds)

## Constructors

### constructor

**new FlowNodesTransformLayer**()

#### Inherited from

Layer\<FlowNodesTransformLayerOptions>.constructor

## Properties

### \_transforms

**\_transforms**: `FlowNodeTransformData`\[]

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

**options**: [`FlowNodesTransformLayerOptions`](/en/auto-docs/renderer/interfaces/FlowNodesTransformLayerOptions.md)

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

### resizeObserver

`Readonly` **resizeObserver**: `FlowRendererResizeObserver`

## Accessors

### transformVisibles

`get` **transformVisibles**(): `FlowNodeTransformData`\[]

#### Returns

`FlowNodeTransformData`\[]

***

### visibeBounds

`get` **visibeBounds**(): `Rectangle`\[]

#### Returns

`Rectangle`\[]

## Methods

### autorun

**autorun**(): `void`

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

#### Returns

`void`

#### Overrides

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

**onZoom**(`scale`): `void`

监听缩放，目前采用整体缩放

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

### updateNodesBounds

**updateNodesBounds**(): `void`

更新节点的 bounds 数据

#### Returns

`void`
