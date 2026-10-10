# Class: FlowSelectorBoxLayer

流程选择框

## Hierarchy

* [`Layer`](/en/auto-docs/fixed-layout-editor/classes/Layer.md)<[`FlowSelectorBoxOptions`](/en/auto-docs/fixed-layout-editor/interfaces/FlowSelectorBoxOptions.md)>

  ↳ **`FlowSelectorBoxLayer`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#constructor)

### Properties

* [config](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#config)
* [context](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#context)
* [contextMenuService](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#contextmenuservice)
* [entityManager](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#entitymanager)
* [getOtherLayer](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#getotherlayer)
* [isFocused](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#isfocused)
* [listenGlobalEvent](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#listenglobalevent)
* [listenPlaygroundEvent](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#listenplaygroundevent)
* [node](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#node)
* [observeManager](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#observemanager)
* [options](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#options)
* [pipelineNode](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#pipelinenode)
* [playgroundNode](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#playgroundnode)
* [reloadEntities](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#reloadentities)
* [renderWithReactMemo](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#renderwithreactmemo)
* [selectionService](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#selectionservice)

### Methods

* [autorun](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#autorun)
* [createDOMCache](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#createdomcache)
* [dispose](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#dispose)
* [getPosFromMouseEvent](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#getposfrommouseevent)
* [isEnabled](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#isenabled)
* [onBlur](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#onblur)
* [onFocus](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#onfocus)
* [onReadonlyOrDisabledChange](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#onreadonlyordisabledchange)
* [onReady](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#onready)
* [onResize](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#onresize)
* [onScroll](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#onscroll)
* [onViewportChange](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#onviewportchange)
* [onZoom](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#onzoom)
* [render](/en/auto-docs/fixed-layout-editor/classes/FlowSelectorBoxLayer.md#render)

## Constructors

### constructor

**new FlowSelectorBoxLayer**()

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[constructor](/en/auto-docs/fixed-layout-editor/classes/Layer.md#constructor)

## Properties

### config

**config**: [`PlaygroundConfigEntity`](/en/auto-docs/fixed-layout-editor/classes/PlaygroundConfigEntity.md)

全局画布配置

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[config](/en/auto-docs/fixed-layout-editor/classes/Layer.md#config)

***

### context

`Readonly` **context**: `any`

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[context](/en/auto-docs/fixed-layout-editor/classes/Layer.md#context)

***

### contextMenuService

`Readonly` **contextMenuService**: [`ContextMenuService`](/en/auto-docs/fixed-layout-editor/classes/ContextMenuService.md)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/en/auto-docs/fixed-layout-editor/classes/EntityManager.md)

实体管理器

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[entityManager](/en/auto-docs/fixed-layout-editor/classes/Layer.md#entitymanager)

***

### getOtherLayer

**getOtherLayer**: \<T>(`layerRegistry`: [`LayerRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/LayerRegistry.md)<`T`>) => `undefined` | `T`

#### Type declaration

<`T`>(`layerRegistry`): `undefined` | `T`

可以用于获取别的 layer

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/en/auto-docs/fixed-layout-editor/classes/Layer.md)<`any`, `any`, `T`> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/LayerRegistry.md)<`T`> |

##### Returns

`undefined` | `T`

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[getOtherLayer](/en/auto-docs/fixed-layout-editor/classes/Layer.md#getotherlayer)

***

### isFocused

`Readonly` **isFocused**: `boolean`

playground 是否 focused

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[isFocused](/en/auto-docs/fixed-layout-editor/classes/Layer.md#isfocused)

***

### listenGlobalEvent

**listenGlobalEvent**: (`name`: `string`, `handle`: (`event`: `any`) => `boolean` | `void`, `priority?`: `number`, `options?`: `AddEventListenerOptions`) => [`Disposable`](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Type declaration

(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

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

[`Disposable`](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[listenGlobalEvent](/en/auto-docs/fixed-layout-editor/classes/Layer.md#listenglobalevent)

***

### listenPlaygroundEvent

**listenPlaygroundEvent**: (`name`: `string`, `handle`: (`event`: `any`) => `boolean` | `void`, `priority?`: `number`, `options?`: `AddEventListenerOptions`) => [`Disposable`](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Type declaration

(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

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

[`Disposable`](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[listenPlaygroundEvent](/en/auto-docs/fixed-layout-editor/classes/Layer.md#listenplaygroundevent)

***

### node

`Readonly` **node**: `HTMLDivElement`

layer 可能存在 dom 也可能没有，如果有，则会加入到 pipeline 的 dom 节点上

#### Overrides

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[node](/en/auto-docs/fixed-layout-editor/classes/Layer.md#node)

***

### observeManager

**observeManager**: [`PipelineEntities`](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md)

当前 layer 的所有监听的实体数据

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[observeManager](/en/auto-docs/fixed-layout-editor/classes/Layer.md#observemanager)

***

### options

**options**: [`FlowSelectorBoxOptions`](/en/auto-docs/fixed-layout-editor/interfaces/FlowSelectorBoxOptions.md)

layer 的配置, 由 registerLayer(Layer, LayerOptions) 传入

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[options](/en/auto-docs/fixed-layout-editor/classes/Layer.md#options)

***

### pipelineNode

**pipelineNode**: `HTMLElement`

父节点

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[pipelineNode](/en/auto-docs/fixed-layout-editor/classes/Layer.md#pipelinenode)

***

### playgroundNode

**playgroundNode**: `HTMLElement`

画布根节点

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[playgroundNode](/en/auto-docs/fixed-layout-editor/classes/Layer.md#playgroundnode)

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

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[reloadEntities](/en/auto-docs/fixed-layout-editor/classes/Layer.md#reloadentities)

***

### renderWithReactMemo

**renderWithReactMemo**: `boolean`

默认在渲染时候都会启用 react memo 进行隔离，这种情况就需要数据驱动更新

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[renderWithReactMemo](/en/auto-docs/fixed-layout-editor/classes/Layer.md#renderwithreactmemo)

***

### selectionService

`Readonly` **selectionService**: [`SelectionService`](/en/auto-docs/fixed-layout-editor/classes/SelectionService.md)

## Methods

### autorun

`Optional` **autorun**(): `void`

自动触发更新，在不需要 react 的时候用这个方法

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[autorun](/en/auto-docs/fixed-layout-editor/classes/Layer.md#autorun)

***

### createDOMCache

**createDOMCache**<`T`>(`className`, `children?`): [`CacheManager`](/en/auto-docs/fixed-layout-editor/interfaces/CacheManager.md)<`T`, [`CacheOriginItem`](/en/auto-docs/fixed-layout-editor/interfaces/CacheOriginItem.md)>

创建 dom 缓冲池

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`DOMCache`](/en/auto-docs/fixed-layout-editor/interfaces/DOMCache.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `className` | `string` | () => `HTMLElement` |
| `children?` | `string` |

#### Returns

[`CacheManager`](/en/auto-docs/fixed-layout-editor/interfaces/CacheManager.md)<`T`, [`CacheOriginItem`](/en/auto-docs/fixed-layout-editor/interfaces/CacheOriginItem.md)>

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[createDOMCache](/en/auto-docs/fixed-layout-editor/classes/Layer.md#createdomcache)

***

### dispose

**dispose**(): `void`

Destroy

#### Returns

`void`

#### Overrides

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[dispose](/en/auto-docs/fixed-layout-editor/classes/Layer.md#dispose)

***

### getPosFromMouseEvent

**getPosFromMouseEvent**(`event`, `addScale?`): [`PositionSchema`](/en/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md)

获取鼠标在 Playground 的位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Object` |
| `event.clientX` | `number` |
| `event.clientY` | `number` |
| `addScale?` | `boolean` |

#### Returns

[`PositionSchema`](/en/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md)

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[getPosFromMouseEvent](/en/auto-docs/fixed-layout-editor/classes/Layer.md#getposfrommouseevent)

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

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[onBlur](/en/auto-docs/fixed-layout-editor/classes/Layer.md#onblur)

***

### onFocus

`Optional` **onFocus**(): `void`

playground focus 时候触发

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[onFocus](/en/auto-docs/fixed-layout-editor/classes/Layer.md#onfocus)

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

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[onReadonlyOrDisabledChange](/en/auto-docs/fixed-layout-editor/classes/Layer.md#onreadonlyordisabledchange)

***

### onReady

**onReady**(): `void`

初始化时候触发

#### Returns

`void`

#### Overrides

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[onReady](/en/auto-docs/fixed-layout-editor/classes/Layer.md#onready)

***

### onResize

`Optional` **onResize**(`size`): `void`

playground 大小变化时候会触发

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | [`PipelineDimension`](/en/auto-docs/fixed-layout-editor/interfaces/PipelineDimension.md) |

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[onResize](/en/auto-docs/fixed-layout-editor/classes/Layer.md#onresize)

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

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[onScroll](/en/auto-docs/fixed-layout-editor/classes/Layer.md#onscroll)

***

### onViewportChange

`Optional` **onViewportChange**(): `void`

viewport 更新触发

#### Returns

`void`

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[onViewportChange](/en/auto-docs/fixed-layout-editor/classes/Layer.md#onviewportchange)

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

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[onZoom](/en/auto-docs/fixed-layout-editor/classes/Layer.md#onzoom)

***

### render

`Optional` **render**(): `Element`

绘制 react

#### Returns

`Element`

#### Inherited from

[Layer](/en/auto-docs/fixed-layout-editor/classes/Layer.md).[render](/en/auto-docs/fixed-layout-editor/classes/Layer.md#render)
