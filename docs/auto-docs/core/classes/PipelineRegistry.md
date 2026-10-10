# Class: PipelineRegistry

pipeline 注册器，用于注册一些事件

## Implements

* `Disposable`
* `IMessageHandler`

## Table of contents

### Constructors

* [constructor](/auto-docs/core/classes/PipelineRegistry.md#constructor)

### Properties

* [context](/auto-docs/core/classes/PipelineRegistry.md#context)
* [entityManager](/auto-docs/core/classes/PipelineRegistry.md#entitymanager)
* [layerFactory](/auto-docs/core/classes/PipelineRegistry.md#layerfactory)
* [onBlur](/auto-docs/core/classes/PipelineRegistry.md#onblur)
* [onBlurEmitter](/auto-docs/core/classes/PipelineRegistry.md#onbluremitter)
* [onFocus](/auto-docs/core/classes/PipelineRegistry.md#onfocus)
* [onFocusEmitter](/auto-docs/core/classes/PipelineRegistry.md#onfocusemitter)
* [onResize](/auto-docs/core/classes/PipelineRegistry.md#onresize)
* [onResizeEmitter](/auto-docs/core/classes/PipelineRegistry.md#onresizeemitter)
* [onScroll](/auto-docs/core/classes/PipelineRegistry.md#onscroll)
* [onScrollEmitter](/auto-docs/core/classes/PipelineRegistry.md#onscrollemitter)
* [onZoom](/auto-docs/core/classes/PipelineRegistry.md#onzoom)
* [onZoomEmitter](/auto-docs/core/classes/PipelineRegistry.md#onzoomemitter)
* [renderer](/auto-docs/core/classes/PipelineRegistry.md#renderer)
* [selector](/auto-docs/core/classes/PipelineRegistry.md#selector)

### Accessors

* [configEntity](/auto-docs/core/classes/PipelineRegistry.md#configentity)

### Methods

* [\_listenEvent](/auto-docs/core/classes/PipelineRegistry.md#_listenevent)
* [dispose](/auto-docs/core/classes/PipelineRegistry.md#dispose)
* [getLayer](/auto-docs/core/classes/PipelineRegistry.md#getlayer)
* [listenGlobalEvent](/auto-docs/core/classes/PipelineRegistry.md#listenglobalevent)
* [listenPlaygroundEvent](/auto-docs/core/classes/PipelineRegistry.md#listenplaygroundevent)
* [processMessage](/auto-docs/core/classes/PipelineRegistry.md#processmessage)
* [ready](/auto-docs/core/classes/PipelineRegistry.md#ready)
* [registerLayer](/auto-docs/core/classes/PipelineRegistry.md#registerlayer)

## Constructors

### constructor

**new PipelineRegistry**()

## Properties

### context

**context**: `any`

***

### entityManager

**entityManager**: [`EntityManager`](/auto-docs/core/classes/EntityManager.md)

***

### layerFactory

**layerFactory**: [`PipelineLayerFactory`](/auto-docs/core/variables/PipelineLayerFactory-1.md)

***

### onBlur

`Readonly` **onBlur**: `Event`<`void`>

***

### onBlurEmitter

`Readonly` **onBlurEmitter**: `Emitter`<`void`>

***

### onFocus

`Readonly` **onFocus**: `Event`<`void`>

***

### onFocusEmitter

`Readonly` **onFocusEmitter**: `Emitter`<`void`>

***

### onResize

`Readonly` **onResize**: `Event`<[`PipelineDimension`](/auto-docs/core/interfaces/PipelineDimension.md)>

pipline 大小变化时候会触发

***

### onResizeEmitter

`Readonly` **onResizeEmitter**: `Emitter`<[`PipelineDimension`](/auto-docs/core/interfaces/PipelineDimension.md)>

***

### onScroll

`Readonly` **onScroll**: `Event`<{ `scrollX`: `number` ; `scrollY`: `number`  }>

***

### onScrollEmitter

`Readonly` **onScrollEmitter**: `Emitter`<{ `scrollX`: `number` ; `scrollY`: `number`  }>

***

### onZoom

`Readonly` **onZoom**: `Event`<`number`>

***

### onZoomEmitter

`Readonly` **onZoomEmitter**: `Emitter`<`number`>

***

### renderer

**renderer**: [`PipelineRenderer`](/auto-docs/core/classes/PipelineRenderer.md)

***

### selector

**selector**: [`PipelineEntitiesSelector`](/auto-docs/core/classes/PipelineEntitiesSelector.md)

## Accessors

### configEntity

`get` **configEntity**(): [`PlaygroundConfigEntity`](/auto-docs/core/classes/PlaygroundConfigEntity.md)

#### Returns

[`PlaygroundConfigEntity`](/auto-docs/core/classes/PlaygroundConfigEntity.md)

## Methods

### \_listenEvent

**\_listenEvent**(`name`, `handle`, `isGlobal`, `priority?`, `options?`): `Disposable`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `handle` | [`PipelineEventHandler`](/auto-docs/core/types/PipelineEventHandler.md) | `undefined` |
| `isGlobal` | `boolean` | `undefined` |
| `priority` | `number` | `0` |
| `options?` | `AddEventListenerOptions` | `undefined` |

#### Returns

`Disposable`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

Disposable.dispose

***

### getLayer

**getLayer**<`T`>(`layerRegistry`): `undefined` | `T`

获取 layer

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/core/interfaces/LayerRegistry.md)<`T`> |

#### Returns

`undefined` | `T`

***

### listenGlobalEvent

**listenGlobalEvent**(`name`, `handle`, `priority?`, `options?`): `Disposable`

监听全局的事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `handle` | (`event`: `any`) => `undefined` | `boolean` |
| `priority?` | `number` |
| `options?` | `AddEventListenerOptions` |

#### Returns

`Disposable`

***

### listenPlaygroundEvent

**listenPlaygroundEvent**(`name`, `handle`, `priority?`, `options?`): `Disposable`

监听画布上的浏览器事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `handle` | (`event`: `any`) => `undefined` | `boolean` |
| `priority?` | `number` |
| `options?` | `AddEventListenerOptions` |

#### Returns

`Disposable`

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
| `P` | extends [`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`, `P`> = [`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/core/interfaces/LayerRegistry.md)<`P`> |  |
| `layerOptions?` | `P`\[`"options"`] | 配置 |

#### Returns

`void`
