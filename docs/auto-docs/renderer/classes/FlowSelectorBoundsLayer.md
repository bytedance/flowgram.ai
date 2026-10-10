# Class: FlowSelectorBoundsLayer

流程节点被框选后的边界区域渲染

## Hierarchy

* `Layer`<[`FlowSelectorBoundsLayerOptions`](/auto-docs/renderer/interfaces/FlowSelectorBoundsLayerOptions.md)>

  ↳ **`FlowSelectorBoundsLayer`**

## Table of contents

### Constructors

* [constructor](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#constructor)

### Properties

* [\_transforms](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#_transforms)
* [commandRegistry](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#commandregistry)
* [config](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#config)
* [context](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#context)
* [entityManager](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#entitymanager)
* [getOtherLayer](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#getotherlayer)
* [isFocused](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#isfocused)
* [listenGlobalEvent](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#listenglobalevent)
* [listenPlaygroundEvent](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#listenplaygroundevent)
* [node](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#node)
* [observeManager](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#observemanager)
* [options](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#options)
* [pipelineNode](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#pipelinenode)
* [playgroundNode](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#playgroundnode)
* [reloadEntities](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#reloadentities)
* [renderStates](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#renderstates)
* [renderWithReactMemo](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#renderwithreactmemo)
* [rendererRegistry](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#rendererregistry)
* [selectBoundsBackground](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#selectboundsbackground)

### Methods

* [autorun](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#autorun)
* [createDOMCache](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#createdomcache)
* [dispose](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#dispose)
* [getPosFromMouseEvent](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#getposfrommouseevent)
* [isEnabled](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#isenabled)
* [onBlur](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#onblur)
* [onFocus](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#onfocus)
* [onReadonlyOrDisabledChange](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#onreadonlyordisabledchange)
* [onReady](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#onready)
* [onResize](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#onresize)
* [onScroll](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#onscroll)
* [onViewportChange](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#onviewportchange)
* [onZoom](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#onzoom)
* [render](/auto-docs/renderer/classes/FlowSelectorBoundsLayer.md#render)

## Constructors

### constructor

**new FlowSelectorBoundsLayer**()

#### Inherited from

Layer\<FlowSelectorBoundsLayerOptions>.constructor

## Properties

### \_transforms

**\_transforms**: `FlowNodeTransformData`\[]

***

### commandRegistry

`Readonly` **commandRegistry**: `CommandRegistry`

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

`Readonly` **node**: `HTMLDivElement`

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

**options**: [`FlowSelectorBoundsLayerOptions`](/auto-docs/renderer/interfaces/FlowSelectorBoundsLayerOptions.md)

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

### renderStates

**renderStates**: `FlowNodeRenderData`\[]

需要监听节点的展开和收起状态，重新绘制边框

***

### renderWithReactMemo

**renderWithReactMemo**: `boolean`

默认在渲染时候都会启用 react memo 进行隔离，这种情况就需要数据驱动更新

#### Inherited from

Layer.renderWithReactMemo

***

### rendererRegistry

`Readonly` **rendererRegistry**: [`FlowRendererRegistry`](/auto-docs/renderer/classes/FlowRendererRegistry.md)

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

**onViewportChange**(): `void`

#### Returns

`void`

#### Overrides

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

**render**(): `Element`

#### Returns

`Element`

#### Overrides

Layer.render
