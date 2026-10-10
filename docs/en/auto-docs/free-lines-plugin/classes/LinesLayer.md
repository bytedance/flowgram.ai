# Class: LinesLayer

## Hierarchy

* `Layer`<[`LinesLayerOptions`](/en/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md)>

  ↳ **`LinesLayer`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#constructor)

### Properties

* [config](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#config)
* [context](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#context)
* [entityManager](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#entitymanager)
* [getOtherLayer](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#getotherlayer)
* [hoverService](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#hoverservice)
* [isFocused](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#isfocused)
* [lines](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#lines)
* [listenGlobalEvent](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#listenglobalevent)
* [listenPlaygroundEvent](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#listenplaygroundevent)
* [node](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#node)
* [observeManager](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#observemanager)
* [options](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#options)
* [pipelineNode](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#pipelinenode)
* [playgroundNode](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#playgroundnode)
* [ports](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#ports)
* [reloadEntities](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#reloadentities)
* [renderWithReactMemo](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#renderwithreactmemo)
* [rendererRegistry](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#rendererregistry)
* [selectService](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#selectservice)
* [stackContext](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#stackcontext)
* [trans](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#trans)
* [type](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#type)

### Methods

* [autorun](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#autorun)
* [createDOMCache](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#createdomcache)
* [dispose](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#dispose)
* [getPosFromMouseEvent](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#getposfrommouseevent)
* [onBlur](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#onblur)
* [onFocus](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#onfocus)
* [onReadonlyOrDisabledChange](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#onreadonlyordisabledchange)
* [onReady](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#onready)
* [onResize](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#onresize)
* [onScroll](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#onscroll)
* [onViewportChange](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#onviewportchange)
* [onZoom](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#onzoom)
* [render](/en/auto-docs/free-lines-plugin/classes/LinesLayer.md#render)

## Constructors

### constructor

**new LinesLayer**()

#### Inherited from

Layer\<LinesLayerOptions>.constructor

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

### hoverService

**hoverService**: `WorkflowHoverService`

***

### isFocused

`Readonly` **isFocused**: `boolean`

playground 是否 focused

#### Inherited from

Layer.isFocused

***

### lines

`Readonly` **lines**: `WorkflowLineEntity`\[]

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

节点线条

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

**options**: [`LinesLayerOptions`](/en/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md)

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

### ports

`Readonly` **ports**: `WorkflowPortEntity`\[]

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

**rendererRegistry**: `FlowRendererRegistry`

***

### selectService

**selectService**: `WorkflowSelectService`

***

### stackContext

**stackContext**: `StackingContextManager`

***

### trans

`Readonly` **trans**: `TransformData`\[]

***

### type

`Static` **type**: `string` = `'WorkflowLinesLayer'`

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
