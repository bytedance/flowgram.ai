# Class: GroupsLayer

## Hierarchy

* `Layer`<[`GroupsLayerOptions`](/auto-docs/group-plugin/interfaces/GroupsLayerOptions.md)>

  ↳ **`GroupsLayer`**

## Table of contents

### Constructors

* [constructor](/auto-docs/group-plugin/classes/GroupsLayer.md#constructor)

### Properties

* [config](/auto-docs/group-plugin/classes/GroupsLayer.md#config)
* [context](/auto-docs/group-plugin/classes/GroupsLayer.md#context)
* [documentTransformer](/auto-docs/group-plugin/classes/GroupsLayer.md#documenttransformer)
* [entityManager](/auto-docs/group-plugin/classes/GroupsLayer.md#entitymanager)
* [getOtherLayer](/auto-docs/group-plugin/classes/GroupsLayer.md#getotherlayer)
* [isFocused](/auto-docs/group-plugin/classes/GroupsLayer.md#isfocused)
* [listenGlobalEvent](/auto-docs/group-plugin/classes/GroupsLayer.md#listenglobalevent)
* [listenPlaygroundEvent](/auto-docs/group-plugin/classes/GroupsLayer.md#listenplaygroundevent)
* [node](/auto-docs/group-plugin/classes/GroupsLayer.md#node)
* [observeManager](/auto-docs/group-plugin/classes/GroupsLayer.md#observemanager)
* [options](/auto-docs/group-plugin/classes/GroupsLayer.md#options)
* [pipelineNode](/auto-docs/group-plugin/classes/GroupsLayer.md#pipelinenode)
* [playgroundNode](/auto-docs/group-plugin/classes/GroupsLayer.md#playgroundnode)
* [reloadEntities](/auto-docs/group-plugin/classes/GroupsLayer.md#reloadentities)
* [renderStates](/auto-docs/group-plugin/classes/GroupsLayer.md#renderstates)
* [renderWithReactMemo](/auto-docs/group-plugin/classes/GroupsLayer.md#renderwithreactmemo)
* [transforms](/auto-docs/group-plugin/classes/GroupsLayer.md#transforms)

### Methods

* [autorun](/auto-docs/group-plugin/classes/GroupsLayer.md#autorun)
* [createDOMCache](/auto-docs/group-plugin/classes/GroupsLayer.md#createdomcache)
* [dispose](/auto-docs/group-plugin/classes/GroupsLayer.md#dispose)
* [getPosFromMouseEvent](/auto-docs/group-plugin/classes/GroupsLayer.md#getposfrommouseevent)
* [onBlur](/auto-docs/group-plugin/classes/GroupsLayer.md#onblur)
* [onFocus](/auto-docs/group-plugin/classes/GroupsLayer.md#onfocus)
* [onReadonlyOrDisabledChange](/auto-docs/group-plugin/classes/GroupsLayer.md#onreadonlyordisabledchange)
* [onReady](/auto-docs/group-plugin/classes/GroupsLayer.md#onready)
* [onResize](/auto-docs/group-plugin/classes/GroupsLayer.md#onresize)
* [onScroll](/auto-docs/group-plugin/classes/GroupsLayer.md#onscroll)
* [onViewportChange](/auto-docs/group-plugin/classes/GroupsLayer.md#onviewportchange)
* [onZoom](/auto-docs/group-plugin/classes/GroupsLayer.md#onzoom)
* [render](/auto-docs/group-plugin/classes/GroupsLayer.md#render)

## Constructors

### constructor

**new GroupsLayer**()

#### Overrides

Layer\&lt;GroupsLayerOptions\&gt;.constructor

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

`Readonly` **node**: `HTMLElement`

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

**options**: [`GroupsLayerOptions`](/auto-docs/group-plugin/interfaces/GroupsLayerOptions.md)

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

***

### renderWithReactMemo

**renderWithReactMemo**: `boolean`

默认在渲染时候都会启用 react memo 进行隔离，这种情况就需要数据驱动更新

#### Inherited from

Layer.renderWithReactMemo

***

### transforms

**transforms**: `FlowNodeTransformData`\[]

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
| `T` | extends `DOMCache` |

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

`Optional` **onReady**(): `void`

初始化时候触发

#### Returns

`void`

#### Inherited from

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

缩放

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
