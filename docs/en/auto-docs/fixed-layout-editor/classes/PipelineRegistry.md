# Class: PipelineRegistry

pipeline 注册器，用于注册一些事件

## Implements

* [`Disposable`](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)
* `IMessageHandler`

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#constructor)

### Properties

* [context](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#context)
* [entityManager](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#entitymanager)
* [layerFactory](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#layerfactory)
* [onBlur](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#onblur)
* [onBlurEmitter](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#onbluremitter)
* [onFocus](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#onfocus)
* [onFocusEmitter](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#onfocusemitter)
* [onResize](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#onresize)
* [onResizeEmitter](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#onresizeemitter)
* [onScroll](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#onscroll)
* [onScrollEmitter](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#onscrollemitter)
* [onZoom](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#onzoom)
* [onZoomEmitter](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#onzoomemitter)
* [renderer](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#renderer)
* [selector](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#selector)

### Accessors

* [configEntity](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#configentity)

### Methods

* [\_listenEvent](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#_listenevent)
* [dispose](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#dispose)
* [getLayer](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#getlayer)
* [listenGlobalEvent](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#listenglobalevent)
* [listenPlaygroundEvent](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#listenplaygroundevent)
* [processMessage](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#processmessage)
* [ready](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#ready)
* [registerLayer](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md#registerlayer)

## Constructors

### constructor

**new PipelineRegistry**()

## Properties

### context

**context**: `any`

***

### entityManager

**entityManager**: [`EntityManager`](/en/auto-docs/fixed-layout-editor/classes/EntityManager.md)

***

### layerFactory

**layerFactory**: [`PipelineLayerFactory`](/en/auto-docs/fixed-layout-editor/variables/PipelineLayerFactory-1.md)

***

### onBlur

`Readonly` **onBlur**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

***

### onBlurEmitter

`Readonly` **onBlurEmitter**: [`Emitter`](/en/auto-docs/fixed-layout-editor/classes/Emitter.md)<`void`>

***

### onFocus

`Readonly` **onFocus**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

***

### onFocusEmitter

`Readonly` **onFocusEmitter**: [`Emitter`](/en/auto-docs/fixed-layout-editor/classes/Emitter.md)<`void`>

***

### onResize

`Readonly` **onResize**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`PipelineDimension`](/en/auto-docs/fixed-layout-editor/interfaces/PipelineDimension.md)>

pipline 大小变化时候会触发

***

### onResizeEmitter

`Readonly` **onResizeEmitter**: [`Emitter`](/en/auto-docs/fixed-layout-editor/classes/Emitter.md)<[`PipelineDimension`](/en/auto-docs/fixed-layout-editor/interfaces/PipelineDimension.md)>

***

### onScroll

`Readonly` **onScroll**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<{ `scrollX`: `number` ; `scrollY`: `number`  }>

***

### onScrollEmitter

`Readonly` **onScrollEmitter**: [`Emitter`](/en/auto-docs/fixed-layout-editor/classes/Emitter.md)<{ `scrollX`: `number` ; `scrollY`: `number`  }>

***

### onZoom

`Readonly` **onZoom**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`number`>

***

### onZoomEmitter

`Readonly` **onZoomEmitter**: [`Emitter`](/en/auto-docs/fixed-layout-editor/classes/Emitter.md)<`number`>

***

### renderer

**renderer**: [`PipelineRenderer`](/en/auto-docs/fixed-layout-editor/classes/PipelineRenderer.md)

***

### selector

**selector**: [`PipelineEntitiesSelector`](/en/auto-docs/fixed-layout-editor/classes/PipelineEntitiesSelector.md)

## Accessors

### configEntity

`get` **configEntity**(): [`PlaygroundConfigEntity`](/en/auto-docs/fixed-layout-editor/classes/PlaygroundConfigEntity.md)

#### Returns

[`PlaygroundConfigEntity`](/en/auto-docs/fixed-layout-editor/classes/PlaygroundConfigEntity.md)

## Methods

### \_listenEvent

**\_listenEvent**(`name`, `handle`, `isGlobal`, `priority?`, `options?`): [`Disposable`](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `handle` | [`PipelineEventHandler`](/en/auto-docs/fixed-layout-editor/types/PipelineEventHandler.md) |
| `isGlobal` | `boolean` |
| `priority?` | `number` |
| `options?` | `AddEventListenerOptions` |

#### Returns

[`Disposable`](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md).[dispose](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md#dispose)

***

### getLayer

**getLayer**<`T`>(`layerRegistry`): `undefined` | `T`

获取 layer

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/en/auto-docs/fixed-layout-editor/classes/Layer.md)<`any`, `any`, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/LayerRegistry.md)<`T`> |

#### Returns

`undefined` | `T`

***

### listenGlobalEvent

**listenGlobalEvent**(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

监听全局的事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `handle` | (`event`: `any`) => `undefined` | `boolean` |
| `priority?` | `number` |
| `options?` | `AddEventListenerOptions` |

#### Returns

[`Disposable`](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

***

### listenPlaygroundEvent

**listenPlaygroundEvent**(`name`, `handle`, `priority?`, `options?`): [`Disposable`](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

监听画布上的浏览器事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `handle` | (`event`: `any`) => `undefined` | `boolean` |
| `priority?` | `number` |
| `options?` | `AddEventListenerOptions` |

#### Returns

[`Disposable`](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

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
| `P` | extends [`Layer`](/en/auto-docs/fixed-layout-editor/classes/Layer.md)<`any`, `any`, `P`> = [`Layer`](/en/auto-docs/fixed-layout-editor/classes/Layer.md)<`any`, `any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/LayerRegistry.md)<`P`> |  |
| `layerOptions?` | `P`\[`"options"`] | 配置 |

#### Returns

`void`
