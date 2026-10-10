# Class: PipelineRenderer

pipeline 渲染器

## Implements

* [`Disposable`](/auto-docs/playground-react/interfaces/Disposable-1.md)
* `IMessageHandler`

## Table of contents

### Constructors

* [constructor](/auto-docs/playground-react/classes/PipelineRenderer.md#constructor)

### Properties

* [isReady](/auto-docs/playground-react/classes/PipelineRenderer.md#isready)
* [layerAutorunMap](/auto-docs/playground-react/classes/PipelineRenderer.md#layerautorunmap)
* [layerFlushMessages](/auto-docs/playground-react/classes/PipelineRenderer.md#layerflushmessages)
* [layerRenderedMap](/auto-docs/playground-react/classes/PipelineRenderer.md#layerrenderedmap)
* [layers](/auto-docs/playground-react/classes/PipelineRenderer.md#layers)
* [node](/auto-docs/playground-react/classes/PipelineRenderer.md#node)
* [onAllLayersRendered](/auto-docs/playground-react/classes/PipelineRenderer.md#onalllayersrendered)

### Methods

* [addLayer](/auto-docs/playground-react/classes/PipelineRenderer.md#addlayer)
* [dispose](/auto-docs/playground-react/classes/PipelineRenderer.md#dispose)
* [flush](/auto-docs/playground-react/classes/PipelineRenderer.md#flush)
* [processMessage](/auto-docs/playground-react/classes/PipelineRenderer.md#processmessage)
* [ready](/auto-docs/playground-react/classes/PipelineRenderer.md#ready)
* [reportLayerRendered](/auto-docs/playground-react/classes/PipelineRenderer.md#reportlayerrendered)
* [toReactComponent](/auto-docs/playground-react/classes/PipelineRenderer.md#toreactcomponent)
* [updateLayer](/auto-docs/playground-react/classes/PipelineRenderer.md#updatelayer)

## Constructors

### constructor

**new PipelineRenderer**(`selector`, `entityManager`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | [`PipelineEntitiesSelector`](/auto-docs/playground-react/classes/PipelineEntitiesSelector.md) |
| `entityManager` | [`EntityManager`](/auto-docs/playground-react/classes/EntityManager.md) |

## Properties

### isReady

**isReady**: `boolean`

***

### layerAutorunMap

`Readonly` **layerAutorunMap**: `Map`<[`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`>, () => `void`>

***

### layerFlushMessages

`Readonly` **layerFlushMessages**: `Map`<[`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`>, [`FlushLayerMessage`](/auto-docs/playground-react/classes/FlushLayerMessage.md)>

***

### layerRenderedMap

`Readonly` **layerRenderedMap**: `Map`<[`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`>, `boolean`>

***

### layers

`Readonly` **layers**: [`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`>\[]

***

### node

`Readonly` **node**: `HTMLDivElement`

***

### onAllLayersRendered

`Readonly` **onAllLayersRendered**: [`Event`](/auto-docs/playground-react/interfaces/Event-1.md)<`void`>

所有 Layer 第一次渲染完成后触发

## Methods

### addLayer

**addLayer**(`layer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`> |

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/auto-docs/playground-react/interfaces/Disposable-1.md).[dispose](/auto-docs/playground-react/interfaces/Disposable-1.md#dispose)

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
| `layer` | [`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`> |

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
| `layer` | [`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`> |
| `forceUpdate?` | `boolean` |

#### Returns

`void`
