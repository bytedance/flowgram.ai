# Class: Playground\<CONTEXT>

## Type parameters

| Name | Type |
| :------ | :------ |
| `CONTEXT` | [`PlaygroundContext`](/auto-docs/core/variables/PlaygroundContext-1.md) |

## Implements

* `Disposable`

## Table of contents

### Constructors

* [constructor](/auto-docs/core/classes/Playground.md#constructor)

### Properties

* [commandService](/auto-docs/core/classes/Playground.md#commandservice)
* [contextProvider](/auto-docs/core/classes/Playground.md#contextprovider)
* [entityManager](/auto-docs/core/classes/Playground.md#entitymanager)
* [node](/auto-docs/core/classes/Playground.md#node)
* [onBlur](/auto-docs/core/classes/Playground.md#onblur)
* [onFocus](/auto-docs/core/classes/Playground.md#onfocus)
* [onScroll](/auto-docs/core/classes/Playground.md#onscroll)
* [onZoom](/auto-docs/core/classes/Playground.md#onzoom)
* [pipelineRegistry](/auto-docs/core/classes/Playground.md#pipelineregistry)
* [pipelineRenderer](/auto-docs/core/classes/Playground.md#pipelinerenderer)
* [registry](/auto-docs/core/classes/Playground.md#registry)
* [selectionService](/auto-docs/core/classes/Playground.md#selectionservice)
* [toDispose](/auto-docs/core/classes/Playground.md#todispose)

### Accessors

* [config](/auto-docs/core/classes/Playground.md#config)
* [context](/auto-docs/core/classes/Playground.md#context)
* [disposed](/auto-docs/core/classes/Playground.md#disposed)
* [editorState](/auto-docs/core/classes/Playground.md#editorstate)
* [focused](/auto-docs/core/classes/Playground.md#focused)
* [onAllLayersRendered](/auto-docs/core/classes/Playground.md#onalllayersrendered)
* [onResize](/auto-docs/core/classes/Playground.md#onresize)
* [pipelineNode](/auto-docs/core/classes/Playground.md#pipelinenode)
* [zoomEnable](/auto-docs/core/classes/Playground.md#zoomenable)

### Methods

* [dispose](/auto-docs/core/classes/Playground.md#dispose)
* [flush](/auto-docs/core/classes/Playground.md#flush)
* [getConfigEntity](/auto-docs/core/classes/Playground.md#getconfigentity)
* [getLayer](/auto-docs/core/classes/Playground.md#getlayer)
* [init](/auto-docs/core/classes/Playground.md#init)
* [ready](/auto-docs/core/classes/Playground.md#ready)
* [registerLayer](/auto-docs/core/classes/Playground.md#registerlayer)
* [registerLayers](/auto-docs/core/classes/Playground.md#registerlayers)
* [resize](/auto-docs/core/classes/Playground.md#resize)
* [scrollToView](/auto-docs/core/classes/Playground.md#scrolltoview)
* [setParent](/auto-docs/core/classes/Playground.md#setparent)
* [toReactComponent](/auto-docs/core/classes/Playground.md#toreactcomponent)

## Constructors

### constructor

**new Playground**<`CONTEXT`>(`entityManager`, `registry`, `contextProvider`, `pipelineRenderer`, `pipelineRegistry`, `playgroundConfig`, `contributionProvider`, `commandService`, `selectionService`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `CONTEXT` | `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entityManager` | [`EntityManager`](/auto-docs/core/classes/EntityManager.md) | - |
| `registry` | [`PlaygroundRegistry`](/auto-docs/core/classes/PlaygroundRegistry.md) | - |
| `contextProvider` | [`PlaygroundContextProvider`](/auto-docs/core/variables/PlaygroundContextProvider-1.md) | - |
| `pipelineRenderer` | [`PipelineRenderer`](/auto-docs/core/classes/PipelineRenderer.md) | - |
| `pipelineRegistry` | [`PipelineRegistry`](/auto-docs/core/classes/PipelineRegistry.md) | - |
| `playgroundConfig` | [`PlaygroundConfig`](/auto-docs/core/variables/PlaygroundConfig-1.md) | - |
| `contributionProvider` | [`ContributionProvider`](/auto-docs/core/variables/ContributionProvider-1.md)<[`PlaygroundContribution`](/auto-docs/core/variables/PlaygroundContribution-1.md)> | - |
| `commandService` | [`CommandService`](/auto-docs/core/variables/CommandService-1.md) | 用于管理画布命令 |
| `selectionService` | [`SelectionService`](/auto-docs/core/classes/SelectionService.md) | 用于管理画布选择 |

## Properties

### commandService

`Readonly` **commandService**: [`CommandService`](/auto-docs/core/variables/CommandService-1.md)

用于管理画布命令

***

### contextProvider

`Readonly` **contextProvider**: [`PlaygroundContextProvider`](/auto-docs/core/variables/PlaygroundContextProvider-1.md)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/auto-docs/core/classes/EntityManager.md)

***

### node

`Readonly` **node**: `HTMLElement`

***

### onBlur

`Readonly` **onBlur**: `Event`<`void`>

***

### onFocus

`Readonly` **onFocus**: `Event`<`void`>

***

### onScroll

`Readonly` **onScroll**: `Event`<{ `scrollX`: `number` ; `scrollY`: `number`  }>

***

### onZoom

`Readonly` **onZoom**: `Event`<`number`>

***

### pipelineRegistry

`Readonly` **pipelineRegistry**: [`PipelineRegistry`](/auto-docs/core/classes/PipelineRegistry.md)

***

### pipelineRenderer

`Readonly` **pipelineRenderer**: [`PipelineRenderer`](/auto-docs/core/classes/PipelineRenderer.md)

***

### registry

`Readonly` **registry**: [`PlaygroundRegistry`](/auto-docs/core/classes/PlaygroundRegistry.md)

***

### selectionService

`Readonly` **selectionService**: [`SelectionService`](/auto-docs/core/classes/SelectionService.md)

用于管理画布选择

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

## Accessors

### config

`get` **config**(): [`PlaygroundConfigEntity`](/auto-docs/core/classes/PlaygroundConfigEntity.md)

画布配置数据

#### Returns

[`PlaygroundConfigEntity`](/auto-docs/core/classes/PlaygroundConfigEntity.md)

***

### context

`get` **context**(): `CONTEXT`

#### Returns

`CONTEXT`

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

***

### editorState

`get` **editorState**(): [`EditorStateConfigEntity`](/auto-docs/core/classes/EditorStateConfigEntity.md)

画布编辑状态管理

#### Returns

[`EditorStateConfigEntity`](/auto-docs/core/classes/EditorStateConfigEntity.md)

***

### focused

`get` **focused**(): `boolean`

#### Returns

`boolean`

***

### onAllLayersRendered

`get` **onAllLayersRendered**(): `Event`<`void`>

#### Returns

`Event`<`void`>

***

### onResize

`get` **onResize**(): `Event`<[`PipelineDimension`](/auto-docs/core/interfaces/PipelineDimension.md)>

#### Returns

`Event`<[`PipelineDimension`](/auto-docs/core/interfaces/PipelineDimension.md)>

***

### pipelineNode

`get` **pipelineNode**(): `HTMLDivElement`

#### Returns

`HTMLDivElement`

***

### zoomEnable

`get` **zoomEnable**(): `boolean`

对应的右键菜单路径

#### Returns

`boolean`

`set` **zoomEnable**(`zoomEnable`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `zoomEnable` | `boolean` |

#### Returns

`void`

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

Disposable.dispose

***

### flush

**flush**(): `void`

刷新所有 layer

#### Returns

`void`

***

### getConfigEntity

**getConfigEntity**<`T`>(`r`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ConfigEntity`](/auto-docs/core/classes/ConfigEntity.md)<[`ConfigEntityProps`](/auto-docs/core/interfaces/ConfigEntityProps.md), [`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `r` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<`T`> |

#### Returns

`T`

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

### init

**init**(): `void`

#### Returns

`void`

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

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/core/interfaces/LayerRegistry.md)<`P`> |
| `layerOptions?` | `P`\[`"options"`] |

#### Returns

`void`

***

### registerLayers

**registerLayers**(`...layerRegistries`): `void`

注册 多个 layer

#### Parameters

| Name | Type |
| :------ | :------ |
| `...layerRegistries` | [`LayerRegistry`](/auto-docs/core/interfaces/LayerRegistry.md)<[`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`>>\[] |

#### Returns

`void`

***

### resize

**resize**(`msg?`, `scrollToCenter?`): `boolean`

这里会由 widget 透传进来

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `msg?` | [`PipelineDimension`](/auto-docs/core/interfaces/PipelineDimension.md) | `undefined` |
| `scrollToCenter` | `boolean` | `true` |

#### Returns

`boolean`

***

### scrollToView

**scrollToView**(`opts?`): `Promise`<`void`>

按下边顺序执行

1. 指定的 entity 位置或 pos 位置
2. selection 位置
3. 初始化位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | [`PlaygroundConfigRevealOpts`](/auto-docs/core/interfaces/PlaygroundConfigRevealOpts.md) |

#### Returns

`Promise`<`void`>

***

### setParent

**setParent**(`parent`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | `HTMLElement` |

#### Returns

`void`

***

### toReactComponent

**toReactComponent**(): `FC`<{}>

转换成 react 组件

#### Returns

`FC`<{}>
