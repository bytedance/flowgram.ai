# Class: PipelineRegistry

pipeline 注册器，用于注册一些事件

## Implements

* `Disposable`
* `IMessageHandler`

## Table of contents

### Constructors

* [constructor](/en/auto-docs/core/classes/PipelineRegistry.md#constructor)

### Properties

* [context](/en/auto-docs/core/classes/PipelineRegistry.md#context)
* [entityManager](/en/auto-docs/core/classes/PipelineRegistry.md#entitymanager)
* [layerFactory](/en/auto-docs/core/classes/PipelineRegistry.md#layerfactory)
* [onBlur](/en/auto-docs/core/classes/PipelineRegistry.md#onblur)
* [onBlurEmitter](/en/auto-docs/core/classes/PipelineRegistry.md#onbluremitter)
* [onFocus](/en/auto-docs/core/classes/PipelineRegistry.md#onfocus)
* [onFocusEmitter](/en/auto-docs/core/classes/PipelineRegistry.md#onfocusemitter)
* [onResize](/en/auto-docs/core/classes/PipelineRegistry.md#onresize)
* [onResizeEmitter](/en/auto-docs/core/classes/PipelineRegistry.md#onresizeemitter)
* [onScroll](/en/auto-docs/core/classes/PipelineRegistry.md#onscroll)
* [onScrollEmitter](/en/auto-docs/core/classes/PipelineRegistry.md#onscrollemitter)
* [onZoom](/en/auto-docs/core/classes/PipelineRegistry.md#onzoom)
* [onZoomEmitter](/en/auto-docs/core/classes/PipelineRegistry.md#onzoomemitter)
* [renderer](/en/auto-docs/core/classes/PipelineRegistry.md#renderer)
* [selector](/en/auto-docs/core/classes/PipelineRegistry.md#selector)

### Accessors

* [configEntity](/en/auto-docs/core/classes/PipelineRegistry.md#configentity)

### Methods

* [\_listenEvent](/en/auto-docs/core/classes/PipelineRegistry.md#_listenevent)
* [dispose](/en/auto-docs/core/classes/PipelineRegistry.md#dispose)
* [getLayer](/en/auto-docs/core/classes/PipelineRegistry.md#getlayer)
* [listenGlobalEvent](/en/auto-docs/core/classes/PipelineRegistry.md#listenglobalevent)
* [listenPlaygroundEvent](/en/auto-docs/core/classes/PipelineRegistry.md#listenplaygroundevent)
* [processMessage](/en/auto-docs/core/classes/PipelineRegistry.md#processmessage)
* [ready](/en/auto-docs/core/classes/PipelineRegistry.md#ready)
* [registerLayer](/en/auto-docs/core/classes/PipelineRegistry.md#registerlayer)

## Constructors

### constructor

**new PipelineRegistry**()

## Properties

### context

**context**: `any`

***

### entityManager

**entityManager**: [`EntityManager`](/en/auto-docs/core/classes/EntityManager.md)

***

### layerFactory

**layerFactory**: [`PipelineLayerFactory`](/en/auto-docs/core/variables/PipelineLayerFactory-1.md)

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

`Readonly` **onResize**: `Event`<[`PipelineDimension`](/en/auto-docs/core/interfaces/PipelineDimension.md)>

pipline 大小变化时候会触发

***

### onResizeEmitter

`Readonly` **onResizeEmitter**: `Emitter`<[`PipelineDimension`](/en/auto-docs/core/interfaces/PipelineDimension.md)>

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

**renderer**: [`PipelineRenderer`](/en/auto-docs/core/classes/PipelineRenderer.md)

***

### selector

**selector**: [`PipelineEntitiesSelector`](/en/auto-docs/core/classes/PipelineEntitiesSelector.md)

## Accessors

### configEntity

`get` **configEntity**(): [`PlaygroundConfigEntity`](/en/auto-docs/core/classes/PlaygroundConfigEntity.md)

#### Returns

[`PlaygroundConfigEntity`](/en/auto-docs/core/classes/PlaygroundConfigEntity.md)

## Methods

### \_listenEvent

**\_listenEvent**(`name`, `handle`, `isGlobal`, `priority?`, `options?`): `Disposable`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `handle` | [`PipelineEventHandler`](/en/auto-docs/core/types/PipelineEventHandler.md) | `undefined` |
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
| `T` | extends [`Layer`](/en/auto-docs/core/classes/Layer.md)<`any`, `any`, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/en/auto-docs/core/interfaces/LayerRegistry.md)<`T`> |

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
| `P` | extends [`Layer`](/en/auto-docs/core/classes/Layer.md)<`any`, `any`, `P`> = [`Layer`](/en/auto-docs/core/classes/Layer.md)<`any`, `any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/en/auto-docs/core/interfaces/LayerRegistry.md)<`P`> |  |
| `layerOptions?` | `P`\[`"options"`] | 配置 |

#### Returns

`void`
