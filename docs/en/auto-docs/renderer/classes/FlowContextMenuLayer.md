# Class: FlowContextMenuLayer

流程右键菜单

## Hierarchy

* `Layer`

  ↳ **`FlowContextMenuLayer`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#constructor)

### Properties

* [commandRegistry](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#commandregistry)
* [config](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#config)
* [context](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#context)
* [contextMenuService](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#contextmenuservice)
* [entityManager](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#entitymanager)
* [getOtherLayer](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#getotherlayer)
* [isFocused](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#isfocused)
* [listenGlobalEvent](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#listenglobalevent)
* [listenPlaygroundEvent](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#listenplaygroundevent)
* [node](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#node)
* [nodeRef](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#noderef)
* [observeManager](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#observemanager)
* [options](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#options)
* [pipelineNode](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#pipelinenode)
* [playgroundNode](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#playgroundnode)
* [reloadEntities](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#reloadentities)
* [renderWithReactMemo](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#renderwithreactmemo)
* [rendererRegistry](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#rendererregistry)
* [selectionService](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#selectionservice)

### Methods

* [autorun](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#autorun)
* [createDOMCache](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#createdomcache)
* [dispose](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#dispose)
* [getPosFromMouseEvent](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#getposfrommouseevent)
* [isEnabled](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#isenabled)
* [onBlur](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#onblur)
* [onFocus](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#onfocus)
* [onReadonlyOrDisabledChange](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#onreadonlyordisabledchange)
* [onReady](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#onready)
* [onResize](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#onresize)
* [onScroll](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#onscroll)
* [onViewportChange](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#onviewportchange)
* [onZoom](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#onzoom)
* [render](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#render)
* [renderCommandMenus](/en/auto-docs/renderer/classes/FlowContextMenuLayer.md#rendercommandmenus)

## Constructors

### constructor

**new FlowContextMenuLayer**()

#### Inherited from

Layer.constructor

## Properties

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

### nodeRef

`Readonly` **nodeRef**: `RefObject`<{ `setVisible`: (`v`: `boolean`) => `void`  }>

***

### observeManager

**observeManager**: `PipelineEntities`

当前 layer 的所有监听的实体数据

#### Inherited from

Layer.observeManager

***

### options

**options**: `any`

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

**onScroll**(): `void`

#### Returns

`void`

#### Overrides

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

**onZoom**(): `void`

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

***

### renderCommandMenus

**renderCommandMenus**(): `Element`\[]

渲染工具栏

#### Returns

`Element`\[]
