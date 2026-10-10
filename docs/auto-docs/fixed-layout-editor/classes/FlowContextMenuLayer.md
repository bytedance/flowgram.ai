# Class: FlowContextMenuLayer

流程右键菜单

## Hierarchy

* [`Layer`](/auto-docs/fixed-layout-editor/classes/Layer.md)

  ↳ **`FlowContextMenuLayer`**

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#constructor)

### Properties

* [commandRegistry](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#commandregistry)
* [config](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#config)
* [context](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#context)
* [contextMenuService](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#contextmenuservice)
* [entityManager](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#entitymanager)
* [getOtherLayer](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#getotherlayer)
* [isFocused](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#isfocused)
* [listenGlobalEvent](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#listenglobalevent)
* [listenPlaygroundEvent](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#listenplaygroundevent)
* [node](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#node)
* [nodeRef](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#noderef)
* [observeManager](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#observemanager)
* [options](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#options)
* [pipelineNode](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#pipelinenode)
* [playgroundNode](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#playgroundnode)
* [reloadEntities](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#reloadentities)
* [renderWithReactMemo](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#renderwithreactmemo)
* [rendererRegistry](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#rendererregistry)
* [selectionService](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#selectionservice)

### Methods

* [autorun](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#autorun)
* [createDOMCache](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#createdomcache)
* [dispose](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#dispose)
* [getPosFromMouseEvent](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#getposfrommouseevent)
* [isEnabled](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#isenabled)
* [onBlur](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#onblur)
* [onFocus](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#onfocus)
* [onReadonlyOrDisabledChange](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#onreadonlyordisabledchange)
* [onReady](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#onready)
* [onResize](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#onresize)
* [onScroll](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#onscroll)
* [onViewportChange](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#onviewportchange)
* [onZoom](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#onzoom)
* [render](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#render)
* [renderCommandMenus](/auto-docs/fixed-layout-editor/classes/FlowContextMenuLayer.md#rendercommandmenus)

## Constructors

### constructor

**new FlowContextMenuLayer**()

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[constructor](/auto-docs/fixed-layout-editor/classes/Layer.md#constructor)

## Properties

### commandRegistry

`Readonly` **commandRegistry**: [`CommandRegistry`](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md)

***

### config

**config**: [`PlaygroundConfigEntity`](/auto-docs/fixed-layout-editor/classes/PlaygroundConfigEntity.md)

全局画布配置

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[config](/auto-docs/fixed-layout-editor/classes/Layer.md#config)

***

### context

`Readonly` **context**: `any`

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[context](/auto-docs/fixed-layout-editor/classes/Layer.md#context)

***

### contextMenuService

`Readonly` **contextMenuService**: [`ContextMenuService`](/auto-docs/fixed-layout-editor/classes/ContextMenuService.md)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/auto-docs/fixed-layout-editor/classes/EntityManager.md)

实体管理器

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[entityManager](/auto-docs/fixed-layout-editor/classes/Layer.md#entitymanager)

***

### getOtherLayer

**getOtherLayer**: \<T>(`layerRegistry`: [`LayerRegistry`](/auto-docs/fixed-layout-editor/interfaces/LayerRegistry.md)<`T`>) => `undefined` | `T`

#### Type declaration

<`T`>(`layerRegistry`): `undefined` | `T`

可以用于获取别的 layer

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/auto-docs/fixed-layout-editor/classes/Layer.md)<`any`, `any`, `T`> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/fixed-layout-editor/interfaces/LayerRegistry.md)<`T`> |

##### Returns

`undefined` | `T`

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[getOtherLayer](/auto-docs/fixed-layout-editor/classes/Layer.md#getotherlayer)

***

### isFocused

`Readonly` **isFocused**: `boolean`

playground 是否 focused

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[isFocused](/auto-docs/fixed-layout-editor/classes/Layer.md#isfocused)

***

### listenGlobalEvent

**listenGlobalEvent**: (`name`: `string`, `handle`: (`event`: `any`) => `boolean` | `void`, `priority?`: `number`, `options?`: `AddEventListenerOptions`) => [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Type declaration

(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

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

[`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[listenGlobalEvent](/auto-docs/fixed-layout-editor/classes/Layer.md#listenglobalevent)

***

### listenPlaygroundEvent

**listenPlaygroundEvent**: (`name`: `string`, `handle`: (`event`: `any`) => `boolean` | `void`, `priority?`: `number`, `options?`: `AddEventListenerOptions`) => [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Type declaration

(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

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

[`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[listenPlaygroundEvent](/auto-docs/fixed-layout-editor/classes/Layer.md#listenplaygroundevent)

***

### node

`Readonly` **node**: `HTMLDivElement`

layer 可能存在 dom 也可能没有，如果有，则会加入到 pipeline 的 dom 节点上

#### Overrides

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[node](/auto-docs/fixed-layout-editor/classes/Layer.md#node)

***

### nodeRef

`Readonly` **nodeRef**: `RefObject`<{ `setVisible`: (`v`: `boolean`) => `void`  }>

***

### observeManager

**observeManager**: [`PipelineEntities`](/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md)

当前 layer 的所有监听的实体数据

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[observeManager](/auto-docs/fixed-layout-editor/classes/Layer.md#observemanager)

***

### options

**options**: `any`

layer 的配置, 由 registerLayer(Layer, LayerOptions) 传入

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[options](/auto-docs/fixed-layout-editor/classes/Layer.md#options)

***

### pipelineNode

**pipelineNode**: `HTMLElement`

父节点

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[pipelineNode](/auto-docs/fixed-layout-editor/classes/Layer.md#pipelinenode)

***

### playgroundNode

**playgroundNode**: `HTMLElement`

画布根节点

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[playgroundNode](/auto-docs/fixed-layout-editor/classes/Layer.md#playgroundnode)

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

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[reloadEntities](/auto-docs/fixed-layout-editor/classes/Layer.md#reloadentities)

***

### renderWithReactMemo

**renderWithReactMemo**: `boolean`

默认在渲染时候都会启用 react memo 进行隔离，这种情况就需要数据驱动更新

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[renderWithReactMemo](/auto-docs/fixed-layout-editor/classes/Layer.md#renderwithreactmemo)

***

### rendererRegistry

`Readonly` **rendererRegistry**: [`FlowRendererRegistry`](/auto-docs/fixed-layout-editor/classes/FlowRendererRegistry.md)

***

### selectionService

`Readonly` **selectionService**: [`SelectionService`](/auto-docs/fixed-layout-editor/classes/SelectionService.md)

## Methods

### autorun

`Optional` **autorun**(): `void`

自动触发更新，在不需要 react 的时候用这个方法

#### Returns

`void`

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[autorun](/auto-docs/fixed-layout-editor/classes/Layer.md#autorun)

***

### createDOMCache

**createDOMCache**<`T`>(`className`, `children?`): [`CacheManager`](/auto-docs/fixed-layout-editor/interfaces/CacheManager.md)<`T`, [`CacheOriginItem`](/auto-docs/fixed-layout-editor/interfaces/CacheOriginItem.md)>

创建 dom 缓冲池

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`DOMCache`](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `className` | `string` | () => `HTMLElement` |
| `children?` | `string` |

#### Returns

[`CacheManager`](/auto-docs/fixed-layout-editor/interfaces/CacheManager.md)<`T`, [`CacheOriginItem`](/auto-docs/fixed-layout-editor/interfaces/CacheOriginItem.md)>

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[createDOMCache](/auto-docs/fixed-layout-editor/classes/Layer.md#createdomcache)

***

### dispose

**dispose**(): `void`

Destroy

#### Returns

`void`

#### Overrides

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[dispose](/auto-docs/fixed-layout-editor/classes/Layer.md#dispose)

***

### getPosFromMouseEvent

**getPosFromMouseEvent**(`event`, `addScale?`): [`PositionSchema`](/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md)

获取鼠标在 Playground 的位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Object` |
| `event.clientX` | `number` |
| `event.clientY` | `number` |
| `addScale?` | `boolean` |

#### Returns

[`PositionSchema`](/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md)

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[getPosFromMouseEvent](/auto-docs/fixed-layout-editor/classes/Layer.md#getposfrommouseevent)

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

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[onBlur](/auto-docs/fixed-layout-editor/classes/Layer.md#onblur)

***

### onFocus

`Optional` **onFocus**(): `void`

playground focus 时候触发

#### Returns

`void`

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[onFocus](/auto-docs/fixed-layout-editor/classes/Layer.md#onfocus)

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

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[onReadonlyOrDisabledChange](/auto-docs/fixed-layout-editor/classes/Layer.md#onreadonlyordisabledchange)

***

### onReady

**onReady**(): `void`

初始化时候触发

#### Returns

`void`

#### Overrides

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[onReady](/auto-docs/fixed-layout-editor/classes/Layer.md#onready)

***

### onResize

`Optional` **onResize**(`size`): `void`

playground 大小变化时候会触发

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | [`PipelineDimension`](/auto-docs/fixed-layout-editor/interfaces/PipelineDimension.md) |

#### Returns

`void`

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[onResize](/auto-docs/fixed-layout-editor/classes/Layer.md#onresize)

***

### onScroll

**onScroll**(): `void`

监听滚动

#### Returns

`void`

#### Overrides

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[onScroll](/auto-docs/fixed-layout-editor/classes/Layer.md#onscroll)

***

### onViewportChange

`Optional` **onViewportChange**(): `void`

viewport 更新触发

#### Returns

`void`

#### Inherited from

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[onViewportChange](/auto-docs/fixed-layout-editor/classes/Layer.md#onviewportchange)

***

### onZoom

**onZoom**(): `void`

监听缩放

#### Returns

`void`

#### Overrides

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[onZoom](/auto-docs/fixed-layout-editor/classes/Layer.md#onzoom)

***

### render

**render**(): `Element`

绘制 react

#### Returns

`Element`

#### Overrides

[Layer](/auto-docs/fixed-layout-editor/classes/Layer.md).[render](/auto-docs/fixed-layout-editor/classes/Layer.md#render)

***

### renderCommandMenus

**renderCommandMenus**(): `Element`\[]

渲染工具栏

#### Returns

`Element`\[]
