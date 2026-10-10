# Class: FlowDragLayer

监听节点的激活状态

## Hierarchy

* `Layer`<[`FlowDragOptions`](/en/auto-docs/renderer/interfaces/FlowDragOptions.md)>

  ↳ **`FlowDragLayer`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/renderer/classes/FlowDragLayer.md#constructor)

### Properties

* [config](/en/auto-docs/renderer/classes/FlowDragLayer.md#config)
* [containerRef](/en/auto-docs/renderer/classes/FlowDragLayer.md#containerref)
* [context](/en/auto-docs/renderer/classes/FlowDragLayer.md#context)
* [document](/en/auto-docs/renderer/classes/FlowDragLayer.md#document)
* [dragOffset](/en/auto-docs/renderer/classes/FlowDragLayer.md#dragoffset)
* [draggingNodeMask](/en/auto-docs/renderer/classes/FlowDragLayer.md#draggingnodemask)
* [entityManager](/en/auto-docs/renderer/classes/FlowDragLayer.md#entitymanager)
* [flowDragService](/en/auto-docs/renderer/classes/FlowDragLayer.md#flowdragservice)
* [getOtherLayer](/en/auto-docs/renderer/classes/FlowDragLayer.md#getotherlayer)
* [isFocused](/en/auto-docs/renderer/classes/FlowDragLayer.md#isfocused)
* [listenGlobalEvent](/en/auto-docs/renderer/classes/FlowDragLayer.md#listenglobalevent)
* [listenPlaygroundEvent](/en/auto-docs/renderer/classes/FlowDragLayer.md#listenplaygroundevent)
* [node](/en/auto-docs/renderer/classes/FlowDragLayer.md#node)
* [observeManager](/en/auto-docs/renderer/classes/FlowDragLayer.md#observemanager)
* [options](/en/auto-docs/renderer/classes/FlowDragLayer.md#options)
* [pipelineNode](/en/auto-docs/renderer/classes/FlowDragLayer.md#pipelinenode)
* [playgroundNode](/en/auto-docs/renderer/classes/FlowDragLayer.md#playgroundnode)
* [reloadEntities](/en/auto-docs/renderer/classes/FlowDragLayer.md#reloadentities)
* [renderWithReactMemo](/en/auto-docs/renderer/classes/FlowDragLayer.md#renderwithreactmemo)
* [rendererRegistry](/en/auto-docs/renderer/classes/FlowDragLayer.md#rendererregistry)
* [transforms](/en/auto-docs/renderer/classes/FlowDragLayer.md#transforms)

### Accessors

* [dragEntities](/en/auto-docs/renderer/classes/FlowDragLayer.md#dragentities)
* [dragStartEntity](/en/auto-docs/renderer/classes/FlowDragLayer.md#dragstartentity)
* [transitions](/en/auto-docs/renderer/classes/FlowDragLayer.md#transitions)

### Methods

* [autorun](/en/auto-docs/renderer/classes/FlowDragLayer.md#autorun)
* [createDOMCache](/en/auto-docs/renderer/classes/FlowDragLayer.md#createdomcache)
* [dispose](/en/auto-docs/renderer/classes/FlowDragLayer.md#dispose)
* [dragEnable](/en/auto-docs/renderer/classes/FlowDragLayer.md#dragenable)
* [getPosFromMouseEvent](/en/auto-docs/renderer/classes/FlowDragLayer.md#getposfrommouseevent)
* [handleMouseMove](/en/auto-docs/renderer/classes/FlowDragLayer.md#handlemousemove)
* [handleMouseUp](/en/auto-docs/renderer/classes/FlowDragLayer.md#handlemouseup)
* [onBlur](/en/auto-docs/renderer/classes/FlowDragLayer.md#onblur)
* [onFocus](/en/auto-docs/renderer/classes/FlowDragLayer.md#onfocus)
* [onReadonlyOrDisabledChange](/en/auto-docs/renderer/classes/FlowDragLayer.md#onreadonlyordisabledchange)
* [onReady](/en/auto-docs/renderer/classes/FlowDragLayer.md#onready)
* [onResize](/en/auto-docs/renderer/classes/FlowDragLayer.md#onresize)
* [onScroll](/en/auto-docs/renderer/classes/FlowDragLayer.md#onscroll)
* [onViewportChange](/en/auto-docs/renderer/classes/FlowDragLayer.md#onviewportchange)
* [onZoom](/en/auto-docs/renderer/classes/FlowDragLayer.md#onzoom)
* [render](/en/auto-docs/renderer/classes/FlowDragLayer.md#render)
* [setDraggingStatus](/en/auto-docs/renderer/classes/FlowDragLayer.md#setdraggingstatus)
* [startDrag](/en/auto-docs/renderer/classes/FlowDragLayer.md#startdrag)

## Constructors

### constructor

**new FlowDragLayer**()

#### Inherited from

Layer\<FlowDragOptions>.constructor

## Properties

### config

**config**: `PlaygroundConfigEntity`

全局画布配置

#### Inherited from

Layer.config

***

### containerRef

**containerRef**: `RefObject`<`HTMLDivElement`>

***

### context

`Readonly` **context**: `any`

#### Inherited from

Layer.context

***

### document

`Readonly` **document**: `FlowDocument`<`FlowDocumentJSON`>

***

### dragOffset

**dragOffset**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

***

### draggingNodeMask

**draggingNodeMask**: `HTMLDivElement`

***

### entityManager

`Readonly` **entityManager**: `EntityManager`

实体管理器

#### Inherited from

Layer.entityManager

***

### flowDragService

`Readonly` **flowDragService**: `FlowDragService`

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

**options**: [`FlowDragOptions`](/en/auto-docs/renderer/interfaces/FlowDragOptions.md)

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

### rendererRegistry

`Readonly` **rendererRegistry**: [`FlowRendererRegistry`](/en/auto-docs/renderer/classes/FlowRendererRegistry.md)

***

### transforms

**transforms**: `FlowNodeTransformData`\[]

## Accessors

### dragEntities

`get` **dragEntities**(): `FlowNodeEntity`\[]

#### Returns

`FlowNodeEntity`\[]

`set` **dragEntities**(`entities`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `FlowNodeEntity`\[] |

#### Returns

`void`

***

### dragStartEntity

`get` **dragStartEntity**(): `undefined` | `FlowNodeEntity`

#### Returns

`undefined` | `FlowNodeEntity`

`set` **dragStartEntity**(`entity`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `undefined` | `FlowNodeEntity` |

#### Returns

`void`

***

### transitions

`get` **transitions**(): `FlowNodeTransitionData`\[]

#### Returns

`FlowNodeTransitionData`\[]

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

#### Returns

`void`

#### Overrides

Layer.dispose

***

### dragEnable

**dragEnable**(`e`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent` |

#### Returns

`boolean`

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

### handleMouseMove

**handleMouseMove**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `MouseEvent` |

#### Returns

`void`

***

### handleMouseUp

**handleMouseUp**(): `Promise`<`void`>

#### Returns

`Promise`<`void`>

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

**render**(): `ReactPortal`

#### Returns

`ReactPortal`

#### Overrides

Layer.render

***

### setDraggingStatus

**setDraggingStatus**(`status`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | `boolean` |

#### Returns

`void`

***

### startDrag

**startDrag**(`e`, `«destructured»`, `options?`): `Promise`<`void`>

开始拖拽事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `Object` |
| `e.clientX` | `number` |
| `e.clientY` | `number` |
| `«destructured»` | `StartDragProps` |
| `options?` | `Object` |
| `options.disableDragScroll?` | `boolean` |
| `options.dragOffsetX?` | `number` |
| `options.dragOffsetY?` | `number` |

#### Returns

`Promise`<`void`>
