# Class: FlowSelectorBoxLayer

流程选择框

## Hierarchy

* `Layer`<[`FlowSelectorBoxOptions`](/auto-docs/renderer/interfaces/FlowSelectorBoxOptions.md)>

  ↳ **`FlowSelectorBoxLayer`**

## Table of contents

### Constructors

* [constructor](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#constructor)

### Properties

* [config](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#config)
* [context](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#context)
* [contextMenuService](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#contextmenuservice)
* [entityManager](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#entitymanager)
* [getOtherLayer](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#getotherlayer)
* [isFocused](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#isfocused)
* [listenGlobalEvent](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#listenglobalevent)
* [listenPlaygroundEvent](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#listenplaygroundevent)
* [node](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#node)
* [observeManager](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#observemanager)
* [options](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#options)
* [pipelineNode](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#pipelinenode)
* [playgroundNode](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#playgroundnode)
* [reloadEntities](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#reloadentities)
* [renderWithReactMemo](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#renderwithreactmemo)
* [selectionService](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#selectionservice)

### Methods

* [autorun](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#autorun)
* [createDOMCache](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#createdomcache)
* [dispose](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#dispose)
* [getPosFromMouseEvent](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#getposfrommouseevent)
* [isEnabled](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#isenabled)
* [onBlur](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#onblur)
* [onFocus](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#onfocus)
* [onReadonlyOrDisabledChange](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#onreadonlyordisabledchange)
* [onReady](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#onready)
* [onResize](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#onresize)
* [onScroll](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#onscroll)
* [onViewportChange](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#onviewportchange)
* [onZoom](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#onzoom)
* [render](/auto-docs/renderer/classes/FlowSelectorBoxLayer.md#render)

## Constructors

### constructor

**new FlowSelectorBoxLayer**()

#### Inherited from

Layer\<FlowSelectorBoxOptions>.constructor

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

### contextMenuService

`Readonly` **contextMenuService**: `ContextMenuService`

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

**options**: [`FlowSelectorBoxOptions`](/auto-docs/renderer/interfaces/FlowSelectorBoxOptions.md)

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

### selectionService

`Readonly` **selectionService**: `SelectionService`

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

Destroy

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
