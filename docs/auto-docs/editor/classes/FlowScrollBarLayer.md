# Class: FlowScrollBarLayer

渲染滚动条 layer

## Hierarchy

* [`Layer`](/auto-docs/editor/classes/Layer.md)<[`ScrollBarOptions`](/auto-docs/editor/interfaces/ScrollBarOptions.md)>

  ↳ **`FlowScrollBarLayer`**

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/FlowScrollBarLayer.md#constructor)

### Properties

* [bottomScrollBar](/auto-docs/editor/classes/FlowScrollBarLayer.md#bottomscrollbar)
* [bottomScrollBarBlock](/auto-docs/editor/classes/FlowScrollBarLayer.md#bottomscrollbarblock)
* [config](/auto-docs/editor/classes/FlowScrollBarLayer.md#config)
* [context](/auto-docs/editor/classes/FlowScrollBarLayer.md#context)
* [entityManager](/auto-docs/editor/classes/FlowScrollBarLayer.md#entitymanager)
* [events](/auto-docs/editor/classes/FlowScrollBarLayer.md#events)
* [flowDocument](/auto-docs/editor/classes/FlowScrollBarLayer.md#flowdocument)
* [getOtherLayer](/auto-docs/editor/classes/FlowScrollBarLayer.md#getotherlayer)
* [isFocused](/auto-docs/editor/classes/FlowScrollBarLayer.md#isfocused)
* [listenGlobalEvent](/auto-docs/editor/classes/FlowScrollBarLayer.md#listenglobalevent)
* [listenPlaygroundEvent](/auto-docs/editor/classes/FlowScrollBarLayer.md#listenplaygroundevent)
* [node](/auto-docs/editor/classes/FlowScrollBarLayer.md#node)
* [observeManager](/auto-docs/editor/classes/FlowScrollBarLayer.md#observemanager)
* [options](/auto-docs/editor/classes/FlowScrollBarLayer.md#options)
* [pipelineNode](/auto-docs/editor/classes/FlowScrollBarLayer.md#pipelinenode)
* [playgroundNode](/auto-docs/editor/classes/FlowScrollBarLayer.md#playgroundnode)
* [reloadEntities](/auto-docs/editor/classes/FlowScrollBarLayer.md#reloadentities)
* [renderWithReactMemo](/auto-docs/editor/classes/FlowScrollBarLayer.md#renderwithreactmemo)
* [rightScrollBar](/auto-docs/editor/classes/FlowScrollBarLayer.md#rightscrollbar)
* [rightScrollBarBlock](/auto-docs/editor/classes/FlowScrollBarLayer.md#rightscrollbarblock)

### Accessors

* [clientViewportHeight](/auto-docs/editor/classes/FlowScrollBarLayer.md#clientviewportheight)
* [clientViewportWidth](/auto-docs/editor/classes/FlowScrollBarLayer.md#clientviewportwidth)
* [viewportFullHeight](/auto-docs/editor/classes/FlowScrollBarLayer.md#viewportfullheight)
* [viewportFullWidth](/auto-docs/editor/classes/FlowScrollBarLayer.md#viewportfullwidth)
* [viewportMoveHeight](/auto-docs/editor/classes/FlowScrollBarLayer.md#viewportmoveheight)
* [viewportMoveWidth](/auto-docs/editor/classes/FlowScrollBarLayer.md#viewportmovewidth)

### Methods

* [autorun](/auto-docs/editor/classes/FlowScrollBarLayer.md#autorun)
* [clickBottomScrollBar](/auto-docs/editor/classes/FlowScrollBarLayer.md#clickbottomscrollbar)
* [clickRightScrollBar](/auto-docs/editor/classes/FlowScrollBarLayer.md#clickrightscrollbar)
* [createDOMCache](/auto-docs/editor/classes/FlowScrollBarLayer.md#createdomcache)
* [dispose](/auto-docs/editor/classes/FlowScrollBarLayer.md#dispose)
* [getPosFromMouseEvent](/auto-docs/editor/classes/FlowScrollBarLayer.md#getposfrommouseevent)
* [getToLeft](/auto-docs/editor/classes/FlowScrollBarLayer.md#gettoleft)
* [getToTop](/auto-docs/editor/classes/FlowScrollBarLayer.md#gettotop)
* [onBlur](/auto-docs/editor/classes/FlowScrollBarLayer.md#onblur)
* [onBoardingToast](/auto-docs/editor/classes/FlowScrollBarLayer.md#onboardingtoast)
* [onFocus](/auto-docs/editor/classes/FlowScrollBarLayer.md#onfocus)
* [onReadonlyOrDisabledChange](/auto-docs/editor/classes/FlowScrollBarLayer.md#onreadonlyordisabledchange)
* [onReady](/auto-docs/editor/classes/FlowScrollBarLayer.md#onready)
* [onResize](/auto-docs/editor/classes/FlowScrollBarLayer.md#onresize)
* [onScroll](/auto-docs/editor/classes/FlowScrollBarLayer.md#onscroll)
* [onViewportChange](/auto-docs/editor/classes/FlowScrollBarLayer.md#onviewportchange)
* [onZoom](/auto-docs/editor/classes/FlowScrollBarLayer.md#onzoom)
* [render](/auto-docs/editor/classes/FlowScrollBarLayer.md#render)

## Constructors

### constructor

**new FlowScrollBarLayer**()

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[constructor](/auto-docs/editor/classes/Layer.md#constructor)

## Properties

### bottomScrollBar

`Readonly` **bottomScrollBar**: `HTMLDivElement`

***

### bottomScrollBarBlock

`Readonly` **bottomScrollBarBlock**: `HTMLDivElement`

***

### config

**config**: [`PlaygroundConfigEntity`](/auto-docs/editor/classes/PlaygroundConfigEntity.md)

全局画布配置

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[config](/auto-docs/editor/classes/Layer.md#config)

***

### context

`Readonly` **context**: `any`

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[context](/auto-docs/editor/classes/Layer.md#context)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/auto-docs/editor/classes/EntityManager.md)

实体管理器

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[entityManager](/auto-docs/editor/classes/Layer.md#entitymanager)

***

### events

`Optional` `Readonly` **events**: [`ScrollBarEvents`](/auto-docs/editor/variables/ScrollBarEvents-1.md)

***

### flowDocument

`Optional` **flowDocument**: [`FlowDocument`](/auto-docs/editor/classes/FlowDocument.md)<[`FlowDocumentJSON`](/auto-docs/editor/types/FlowDocumentJSON.md)>

***

### getOtherLayer

**getOtherLayer**: \<T>(`layerRegistry`: [`LayerRegistry`](/auto-docs/editor/interfaces/LayerRegistry.md)<`T`>) => `undefined` | `T`

#### Type declaration

<`T`>(`layerRegistry`): `undefined` | `T`

可以用于获取别的 layer

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/auto-docs/editor/classes/Layer.md)<`any`, `any`, `T`> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/editor/interfaces/LayerRegistry.md)<`T`> |

##### Returns

`undefined` | `T`

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[getOtherLayer](/auto-docs/editor/classes/Layer.md#getotherlayer)

***

### isFocused

`Readonly` **isFocused**: `boolean`

playground 是否 focused

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[isFocused](/auto-docs/editor/classes/Layer.md#isfocused)

***

### listenGlobalEvent

**listenGlobalEvent**: (`name`: `string`, `handle`: (`event`: `any`) => `boolean` | `void`, `priority?`: `number`, `options?`: `AddEventListenerOptions`) => [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

#### Type declaration

(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

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

[`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[listenGlobalEvent](/auto-docs/editor/classes/Layer.md#listenglobalevent)

***

### listenPlaygroundEvent

**listenPlaygroundEvent**: (`name`: `string`, `handle`: (`event`: `any`) => `boolean` | `void`, `priority?`: `number`, `options?`: `AddEventListenerOptions`) => [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

#### Type declaration

(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

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

[`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[listenPlaygroundEvent](/auto-docs/editor/classes/Layer.md#listenplaygroundevent)

***

### node

**node**: `HTMLElement`

layer 可能存在 dom 也可能没有，如果有，则会加入到 pipeline 的 dom 节点上

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[node](/auto-docs/editor/classes/Layer.md#node)

***

### observeManager

**observeManager**: [`PipelineEntities`](/auto-docs/editor/interfaces/PipelineEntities.md)

当前 layer 的所有监听的实体数据

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[observeManager](/auto-docs/editor/classes/Layer.md#observemanager)

***

### options

**options**: [`ScrollBarOptions`](/auto-docs/editor/interfaces/ScrollBarOptions.md)

layer 的配置, 由 registerLayer(Layer, LayerOptions) 传入

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[options](/auto-docs/editor/classes/Layer.md#options)

***

### pipelineNode

**pipelineNode**: `HTMLElement`

父节点

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[pipelineNode](/auto-docs/editor/classes/Layer.md#pipelinenode)

***

### playgroundNode

**playgroundNode**: `HTMLElement`

画布根节点

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[playgroundNode](/auto-docs/editor/classes/Layer.md#playgroundnode)

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

[Layer](/auto-docs/editor/classes/Layer.md).[reloadEntities](/auto-docs/editor/classes/Layer.md#reloadentities)

***

### renderWithReactMemo

**renderWithReactMemo**: `boolean`

默认在渲染时候都会启用 react memo 进行隔离，这种情况就需要数据驱动更新

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[renderWithReactMemo](/auto-docs/editor/classes/Layer.md#renderwithreactmemo)

***

### rightScrollBar

`Readonly` **rightScrollBar**: `HTMLDivElement`

***

### rightScrollBarBlock

`Readonly` **rightScrollBarBlock**: `HTMLDivElement`

## Accessors

### clientViewportHeight

`get` **clientViewportHeight**(): `number`

#### Returns

`number`

***

### clientViewportWidth

`get` **clientViewportWidth**(): `number`

#### Returns

`number`

***

### viewportFullHeight

`get` **viewportFullHeight**(): `number`

#### Returns

`number`

***

### viewportFullWidth

`get` **viewportFullWidth**(): `number`

#### Returns

`number`

***

### viewportMoveHeight

`get` **viewportMoveHeight**(): `number`

#### Returns

`number`

***

### viewportMoveWidth

`get` **viewportMoveWidth**(): `number`

#### Returns

`number`

## Methods

### autorun

**autorun**(): `void`

自动触发更新，在不需要 react 的时候用这个方法

#### Returns

`void`

#### Overrides

[Layer](/auto-docs/editor/classes/Layer.md).[autorun](/auto-docs/editor/classes/Layer.md#autorun)

***

### clickBottomScrollBar

**clickBottomScrollBar**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent` |

#### Returns

`void`

***

### clickRightScrollBar

**clickRightScrollBar**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent` |

#### Returns

`void`

***

### createDOMCache

**createDOMCache**<`T`>(`className`, `children?`): [`CacheManager`](/auto-docs/editor/interfaces/CacheManager.md)<`T`, [`CacheOriginItem`](/auto-docs/editor/interfaces/CacheOriginItem.md)>

创建 dom 缓冲池

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`DOMCache`](/auto-docs/editor/interfaces/DOMCache.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `className` | `string` | () => `HTMLElement` |
| `children?` | `string` |

#### Returns

[`CacheManager`](/auto-docs/editor/interfaces/CacheManager.md)<`T`, [`CacheOriginItem`](/auto-docs/editor/interfaces/CacheOriginItem.md)>

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[createDOMCache](/auto-docs/editor/classes/Layer.md#createdomcache)

***

### dispose

**dispose**(): `void`

销毁

#### Returns

`void`

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[dispose](/auto-docs/editor/classes/Layer.md#dispose)

***

### getPosFromMouseEvent

**getPosFromMouseEvent**(`event`, `addScale?`): [`PositionSchema`](/auto-docs/editor/interfaces/PositionSchema.md)

获取鼠标在 Playground 的位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Object` |
| `event.clientX` | `number` |
| `event.clientY` | `number` |
| `addScale?` | `boolean` |

#### Returns

[`PositionSchema`](/auto-docs/editor/interfaces/PositionSchema.md)

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[getPosFromMouseEvent](/auto-docs/editor/classes/Layer.md#getposfrommouseevent)

***

### getToLeft

**getToLeft**(`scrollX`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scrollX` | `number` |

#### Returns

`number`

***

### getToTop

**getToTop**(`scrollY`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scrollY` | `number` |

#### Returns

`number`

***

### onBlur

`Optional` **onBlur**(): `void`

playground blur 时候触发

#### Returns

`void`

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[onBlur](/auto-docs/editor/classes/Layer.md#onblur)

***

### onBoardingToast

**onBoardingToast**(): `void`

#### Returns

`void`

***

### onFocus

`Optional` **onFocus**(): `void`

playground focus 时候触发

#### Returns

`void`

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[onFocus](/auto-docs/editor/classes/Layer.md#onfocus)

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

[Layer](/auto-docs/editor/classes/Layer.md).[onReadonlyOrDisabledChange](/auto-docs/editor/classes/Layer.md#onreadonlyordisabledchange)

***

### onReady

**onReady**(): `void`

初始化时候触发

#### Returns

`void`

#### Overrides

[Layer](/auto-docs/editor/classes/Layer.md).[onReady](/auto-docs/editor/classes/Layer.md#onready)

***

### onResize

`Optional` **onResize**(`size`): `void`

playground 大小变化时候会触发

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | [`PipelineDimension`](/auto-docs/editor/interfaces/PipelineDimension.md) |

#### Returns

`void`

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[onResize](/auto-docs/editor/classes/Layer.md#onresize)

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

[Layer](/auto-docs/editor/classes/Layer.md).[onScroll](/auto-docs/editor/classes/Layer.md#onscroll)

***

### onViewportChange

`Optional` **onViewportChange**(): `void`

viewport 更新触发

#### Returns

`void`

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[onViewportChange](/auto-docs/editor/classes/Layer.md#onviewportchange)

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

[Layer](/auto-docs/editor/classes/Layer.md).[onZoom](/auto-docs/editor/classes/Layer.md#onzoom)

***

### render

`Optional` **render**(): `Element`

绘制 react

#### Returns

`Element`

#### Inherited from

[Layer](/auto-docs/editor/classes/Layer.md).[render](/auto-docs/editor/classes/Layer.md#render)
