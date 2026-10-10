# Class: PipelineRenderer

pipeline 渲染器

## Implements

* `Disposable`
* `IMessageHandler`

## Table of contents

### Constructors

* [constructor](/auto-docs/core/classes/PipelineRenderer.md#constructor)

### Properties

* [isReady](/auto-docs/core/classes/PipelineRenderer.md#isready)
* [layerAutorunMap](/auto-docs/core/classes/PipelineRenderer.md#layerautorunmap)
* [layerFlushMessages](/auto-docs/core/classes/PipelineRenderer.md#layerflushmessages)
* [layerRenderedMap](/auto-docs/core/classes/PipelineRenderer.md#layerrenderedmap)
* [layers](/auto-docs/core/classes/PipelineRenderer.md#layers)
* [node](/auto-docs/core/classes/PipelineRenderer.md#node)
* [onAllLayersRendered](/auto-docs/core/classes/PipelineRenderer.md#onalllayersrendered)

### Methods

* [addLayer](/auto-docs/core/classes/PipelineRenderer.md#addlayer)
* [dispose](/auto-docs/core/classes/PipelineRenderer.md#dispose)
* [flush](/auto-docs/core/classes/PipelineRenderer.md#flush)
* [processMessage](/auto-docs/core/classes/PipelineRenderer.md#processmessage)
* [ready](/auto-docs/core/classes/PipelineRenderer.md#ready)
* [reportLayerRendered](/auto-docs/core/classes/PipelineRenderer.md#reportlayerrendered)
* [toReactComponent](/auto-docs/core/classes/PipelineRenderer.md#toreactcomponent)
* [updateLayer](/auto-docs/core/classes/PipelineRenderer.md#updatelayer)

## Constructors

### constructor

**new PipelineRenderer**(`selector`, `entityManager`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | [`PipelineEntitiesSelector`](/auto-docs/core/classes/PipelineEntitiesSelector.md) |
| `entityManager` | [`EntityManager`](/auto-docs/core/classes/EntityManager.md) |

## Properties

### isReady

**isReady**: `boolean` = `false`

***

### layerAutorunMap

`Readonly` **layerAutorunMap**: `Map`<[`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`>, () => `void`>

***

### layerFlushMessages

`Readonly` **layerFlushMessages**: `Map`<[`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`>, [`FlushLayerMessage`](/auto-docs/core/classes/FlushLayerMessage.md)>

***

### layerRenderedMap

`Readonly` **layerRenderedMap**: `Map`<[`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`>, `boolean`>

***

### layers

`Readonly` **layers**: [`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`>\[] = `[]`

***

### node

`Readonly` **node**: `HTMLDivElement`

***

### onAllLayersRendered

`Readonly` **onAllLayersRendered**: `Event`<`void`>

所有 Layer 第一次渲染完成后触发

## Methods

### addLayer

**addLayer**(`layer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`> |

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

Disposable.dispose

***

### flush

**flush**(`forceUpdate?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `forceUpdate?` | `boolean` |

#### Returns

`void`

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

### reportLayerRendered

**reportLayerRendered**(`layer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`> |

#### Returns

`void`

***

### toReactComponent

**toReactComponent**(): `FC`<{}>

转成 react

#### Returns

`FC`<{}>

***

### updateLayer

**updateLayer**(`layer`, `forceUpdate?`): `void`

1. PostMessage: 会将消息在 nextTick 执行
2. ConflatableMessage: 当多个消息进来会在下一个 nextTick 做合并
3. 图层相互隔离，即时一层挂了也不受影响

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`> |
| `forceUpdate?` | `boolean` |

#### Returns

`void`
