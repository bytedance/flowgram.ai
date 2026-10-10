# Class: FlowScrollBarLayer

渲染滚动条 layer

## Hierarchy

* `Layer`<[`ScrollBarOptions`](/en/auto-docs/renderer/interfaces/ScrollBarOptions.md)>

  ↳ **`FlowScrollBarLayer`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#constructor)

### Properties

* [bottomScrollBar](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#bottomscrollbar)
* [bottomScrollBarBlock](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#bottomscrollbarblock)
* [config](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#config)
* [context](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#context)
* [entityManager](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#entitymanager)
* [events](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#events)
* [flowDocument](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#flowdocument)
* [getOtherLayer](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#getotherlayer)
* [isFocused](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#isfocused)
* [listenGlobalEvent](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#listenglobalevent)
* [listenPlaygroundEvent](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#listenplaygroundevent)
* [node](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#node)
* [observeManager](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#observemanager)
* [options](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#options)
* [pipelineNode](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#pipelinenode)
* [playgroundNode](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#playgroundnode)
* [reloadEntities](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#reloadentities)
* [renderWithReactMemo](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#renderwithreactmemo)
* [rightScrollBar](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#rightscrollbar)
* [rightScrollBarBlock](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#rightscrollbarblock)

### Accessors

* [clientViewportHeight](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#clientviewportheight)
* [clientViewportWidth](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#clientviewportwidth)
* [viewportFullHeight](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#viewportfullheight)
* [viewportFullWidth](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#viewportfullwidth)
* [viewportMoveHeight](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#viewportmoveheight)
* [viewportMoveWidth](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#viewportmovewidth)

### Methods

* [autorun](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#autorun)
* [clickBottomScrollBar](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#clickbottomscrollbar)
* [clickRightScrollBar](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#clickrightscrollbar)
* [createDOMCache](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#createdomcache)
* [dispose](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#dispose)
* [getPosFromMouseEvent](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#getposfrommouseevent)
* [getToLeft](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#gettoleft)
* [getToTop](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#gettotop)
* [onBlur](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#onblur)
* [onBoardingToast](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#onboardingtoast)
* [onFocus](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#onfocus)
* [onReadonlyOrDisabledChange](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#onreadonlyordisabledchange)
* [onReady](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#onready)
* [onResize](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#onresize)
* [onScroll](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#onscroll)
* [onViewportChange](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#onviewportchange)
* [onZoom](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#onzoom)
* [render](/en/auto-docs/renderer/classes/FlowScrollBarLayer.md#render)

## Constructors

### constructor

**new FlowScrollBarLayer**()

#### Inherited from

Layer\<ScrollBarOptions>.constructor

## Properties

### bottomScrollBar

`Readonly` **bottomScrollBar**: `HTMLDivElement`

***

### bottomScrollBarBlock

`Readonly` **bottomScrollBarBlock**: `HTMLDivElement`

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

### events

`Optional` `Readonly` **events**: [`ScrollBarEvents`](/en/auto-docs/renderer/variables/ScrollBarEvents-1.md)

***

### flowDocument

`Optional` **flowDocument**: `FlowDocument`<`FlowDocumentJSON`>

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

**node**: `HTMLElement`

layer 可能存在 dom 也可能没有，如果有，则会加入到 pipeline 的 dom 节点上

#### Inherited from

Layer.node

***

### observeManager

**observeManager**: `PipelineEntities`

当前 layer 的所有监听的实体数据

#### Inherited from

Layer.observeManager

***

### options

**options**: [`ScrollBarOptions`](/en/auto-docs/renderer/interfaces/ScrollBarOptions.md)

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

#### Returns

`void`

#### Overrides

Layer.autorun

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

Layer.onBlur

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
