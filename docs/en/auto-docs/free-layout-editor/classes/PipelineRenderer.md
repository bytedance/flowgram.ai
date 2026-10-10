# Class: PipelineRenderer

pipeline 渲染器

## Implements

* [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)
* `IMessageHandler`

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/PipelineRenderer.md#constructor)

### Properties

* [isReady](/en/auto-docs/free-layout-editor/classes/PipelineRenderer.md#isready)
* [layerAutorunMap](/en/auto-docs/free-layout-editor/classes/PipelineRenderer.md#layerautorunmap)
* [layerFlushMessages](/en/auto-docs/free-layout-editor/classes/PipelineRenderer.md#layerflushmessages)
* [layerRenderedMap](/en/auto-docs/free-layout-editor/classes/PipelineRenderer.md#layerrenderedmap)
* [layers](/en/auto-docs/free-layout-editor/classes/PipelineRenderer.md#layers)
* [node](/en/auto-docs/free-layout-editor/classes/PipelineRenderer.md#node)
* [onAllLayersRendered](/en/auto-docs/free-layout-editor/classes/PipelineRenderer.md#onalllayersrendered)

### Methods

* [addLayer](/en/auto-docs/free-layout-editor/classes/PipelineRenderer.md#addlayer)
* [dispose](/en/auto-docs/free-layout-editor/classes/PipelineRenderer.md#dispose)
* [flush](/en/auto-docs/free-layout-editor/classes/PipelineRenderer.md#flush)
* [processMessage](/en/auto-docs/free-layout-editor/classes/PipelineRenderer.md#processmessage)
* [ready](/en/auto-docs/free-layout-editor/classes/PipelineRenderer.md#ready)
* [reportLayerRendered](/en/auto-docs/free-layout-editor/classes/PipelineRenderer.md#reportlayerrendered)
* [toReactComponent](/en/auto-docs/free-layout-editor/classes/PipelineRenderer.md#toreactcomponent)
* [updateLayer](/en/auto-docs/free-layout-editor/classes/PipelineRenderer.md#updatelayer)

## Constructors

### constructor

**new PipelineRenderer**(`selector`, `entityManager`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | [`PipelineEntitiesSelector`](/en/auto-docs/free-layout-editor/classes/PipelineEntitiesSelector.md) |
| `entityManager` | [`EntityManager`](/en/auto-docs/free-layout-editor/classes/EntityManager.md) |

## Properties

### isReady

**isReady**: `boolean`

***

### layerAutorunMap

`Readonly` **layerAutorunMap**: `Map`<[`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`>, () => `void`>

***

### layerFlushMessages

`Readonly` **layerFlushMessages**: `Map`<[`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`>, [`FlushLayerMessage`](/en/auto-docs/free-layout-editor/classes/FlushLayerMessage.md)>

***

### layerRenderedMap

`Readonly` **layerRenderedMap**: `Map`<[`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`>, `boolean`>

***

### layers

`Readonly` **layers**: [`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`>\[]

***

### node

`Readonly` **node**: `HTMLDivElement`

***

### onAllLayersRendered

`Readonly` **onAllLayersRendered**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

所有 Layer 第一次渲染完成后触发

## Methods

### addLayer

**addLayer**(`layer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`> |

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md).[dispose](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md#dispose)

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
| `layer` | [`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`> |

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
| `layer` | [`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`> |
| `forceUpdate?` | `boolean` |

#### Returns

`void`
