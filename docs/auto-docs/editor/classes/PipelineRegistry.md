# Class: PipelineRegistry

pipeline 注册器，用于注册一些事件

## Implements

* [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)
* `IMessageHandler`

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/PipelineRegistry.md#constructor)

### Properties

* [context](/auto-docs/editor/classes/PipelineRegistry.md#context)
* [entityManager](/auto-docs/editor/classes/PipelineRegistry.md#entitymanager)
* [layerFactory](/auto-docs/editor/classes/PipelineRegistry.md#layerfactory)
* [onBlur](/auto-docs/editor/classes/PipelineRegistry.md#onblur)
* [onBlurEmitter](/auto-docs/editor/classes/PipelineRegistry.md#onbluremitter)
* [onFocus](/auto-docs/editor/classes/PipelineRegistry.md#onfocus)
* [onFocusEmitter](/auto-docs/editor/classes/PipelineRegistry.md#onfocusemitter)
* [onResize](/auto-docs/editor/classes/PipelineRegistry.md#onresize)
* [onResizeEmitter](/auto-docs/editor/classes/PipelineRegistry.md#onresizeemitter)
* [onScroll](/auto-docs/editor/classes/PipelineRegistry.md#onscroll)
* [onScrollEmitter](/auto-docs/editor/classes/PipelineRegistry.md#onscrollemitter)
* [onZoom](/auto-docs/editor/classes/PipelineRegistry.md#onzoom)
* [onZoomEmitter](/auto-docs/editor/classes/PipelineRegistry.md#onzoomemitter)
* [renderer](/auto-docs/editor/classes/PipelineRegistry.md#renderer)
* [selector](/auto-docs/editor/classes/PipelineRegistry.md#selector)

### Accessors

* [configEntity](/auto-docs/editor/classes/PipelineRegistry.md#configentity)

### Methods

* [\_listenEvent](/auto-docs/editor/classes/PipelineRegistry.md#_listenevent)
* [dispose](/auto-docs/editor/classes/PipelineRegistry.md#dispose)
* [getLayer](/auto-docs/editor/classes/PipelineRegistry.md#getlayer)
* [listenGlobalEvent](/auto-docs/editor/classes/PipelineRegistry.md#listenglobalevent)
* [listenPlaygroundEvent](/auto-docs/editor/classes/PipelineRegistry.md#listenplaygroundevent)
* [processMessage](/auto-docs/editor/classes/PipelineRegistry.md#processmessage)
* [ready](/auto-docs/editor/classes/PipelineRegistry.md#ready)
* [registerLayer](/auto-docs/editor/classes/PipelineRegistry.md#registerlayer)

## Constructors

### constructor

**new PipelineRegistry**()

## Properties

### context

**context**: `any`

***

### entityManager

**entityManager**: [`EntityManager`](/auto-docs/editor/classes/EntityManager.md)

***

### layerFactory

**layerFactory**: [`PipelineLayerFactory`](/auto-docs/editor/variables/PipelineLayerFactory-1.md)

***

### onBlur

`Readonly` **onBlur**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<`void`>

***

### onBlurEmitter

`Readonly` **onBlurEmitter**: [`Emitter`](/auto-docs/editor/classes/Emitter.md)<`void`>

***

### onFocus

`Readonly` **onFocus**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<`void`>

***

### onFocusEmitter

`Readonly` **onFocusEmitter**: [`Emitter`](/auto-docs/editor/classes/Emitter.md)<`void`>

***

### onResize

`Readonly` **onResize**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`PipelineDimension`](/auto-docs/editor/interfaces/PipelineDimension.md)>

pipline 大小变化时候会触发

***

### onResizeEmitter

`Readonly` **onResizeEmitter**: [`Emitter`](/auto-docs/editor/classes/Emitter.md)<[`PipelineDimension`](/auto-docs/editor/interfaces/PipelineDimension.md)>

***

### onScroll

`Readonly` **onScroll**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<{ `scrollX`: `number` ; `scrollY`: `number`  }>

***

### onScrollEmitter

`Readonly` **onScrollEmitter**: [`Emitter`](/auto-docs/editor/classes/Emitter.md)<{ `scrollX`: `number` ; `scrollY`: `number`  }>

***

### onZoom

`Readonly` **onZoom**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<`number`>

***

### onZoomEmitter

`Readonly` **onZoomEmitter**: [`Emitter`](/auto-docs/editor/classes/Emitter.md)<`number`>

***

### renderer

**renderer**: [`PipelineRenderer`](/auto-docs/editor/classes/PipelineRenderer.md)

***

### selector

**selector**: [`PipelineEntitiesSelector`](/auto-docs/editor/classes/PipelineEntitiesSelector.md)

## Accessors

### configEntity

`get` **configEntity**(): [`PlaygroundConfigEntity`](/auto-docs/editor/classes/PlaygroundConfigEntity.md)

#### Returns

[`PlaygroundConfigEntity`](/auto-docs/editor/classes/PlaygroundConfigEntity.md)

## Methods

### \_listenEvent

**\_listenEvent**(`name`, `handle`, `isGlobal`, `priority?`, `options?`): [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `handle` | [`PipelineEventHandler`](/auto-docs/editor/types/PipelineEventHandler.md) |
| `isGlobal` | `boolean` |
| `priority?` | `number` |
| `options?` | `AddEventListenerOptions` |

#### Returns

[`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/auto-docs/editor/interfaces/Disposable-1.md).[dispose](/auto-docs/editor/interfaces/Disposable-1.md#dispose)

***

### getLayer

**getLayer**<`T`>(`layerRegistry`): `undefined` | `T`

获取 layer

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/auto-docs/editor/classes/Layer.md)<`any`, `any`, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/editor/interfaces/LayerRegistry.md)<`T`> |

#### Returns

`undefined` | `T`

***

### listenGlobalEvent

**listenGlobalEvent**(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

监听全局的事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `handle` | (`event`: `any`) => `undefined` | `boolean` |
| `priority?` | `number` |
| `options?` | `AddEventListenerOptions` |

#### Returns

[`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

***

### listenPlaygroundEvent

**listenPlaygroundEvent**(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

监听画布上的浏览器事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `handle` | (`event`: `any`) => `undefined` | `boolean` |
| `priority?` | `number` |
| `options?` | `AddEventListenerOptions` |

#### Returns

[`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

***

### processMessage

**processMessage**(`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `Message` |

#### Returns

`void`

#### Implementation of

IMessageHandler.processMessage

***

### ready

**ready**(): `void`

#### Returns

`void`

***

### registerLayer

**registerLayer**<`P`>(`layerRegistry`, `layerOptions?`): `void`

注册 layer

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends [`Layer`](/auto-docs/editor/classes/Layer.md)<`any`, `any`, `P`> = [`Layer`](/auto-docs/editor/classes/Layer.md)<`any`, `any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/editor/interfaces/LayerRegistry.md)<`P`> |  |
| `layerOptions?` | `P`\[`"options"`] | 配置 |

#### Returns

`void`
