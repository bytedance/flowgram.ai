# Class: Playground\<CONTEXT>

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Type parameters

| Name | Type |
| :------ | :------ |
| `CONTEXT` | [`PlaygroundContext`](/auto-docs/playground-react/variables/PlaygroundContext-1.md) |

## Implements

* [`Disposable`](/auto-docs/playground-react/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/playground-react/classes/Playground.md#constructor)

### Properties

* [commandService](/auto-docs/playground-react/classes/Playground.md#commandservice)
* [contextProvider](/auto-docs/playground-react/classes/Playground.md#contextprovider)
* [entityManager](/auto-docs/playground-react/classes/Playground.md#entitymanager)
* [node](/auto-docs/playground-react/classes/Playground.md#node)
* [onBlur](/auto-docs/playground-react/classes/Playground.md#onblur)
* [onFocus](/auto-docs/playground-react/classes/Playground.md#onfocus)
* [onScroll](/auto-docs/playground-react/classes/Playground.md#onscroll)
* [onZoom](/auto-docs/playground-react/classes/Playground.md#onzoom)
* [pipelineRegistry](/auto-docs/playground-react/classes/Playground.md#pipelineregistry)
* [pipelineRenderer](/auto-docs/playground-react/classes/Playground.md#pipelinerenderer)
* [registry](/auto-docs/playground-react/classes/Playground.md#registry)
* [selectionService](/auto-docs/playground-react/classes/Playground.md#selectionservice)
* [toDispose](/auto-docs/playground-react/classes/Playground.md#todispose)

### Accessors

* [config](/auto-docs/playground-react/classes/Playground.md#config)
* [context](/auto-docs/playground-react/classes/Playground.md#context)
* [disposed](/auto-docs/playground-react/classes/Playground.md#disposed)
* [editorState](/auto-docs/playground-react/classes/Playground.md#editorstate)
* [focused](/auto-docs/playground-react/classes/Playground.md#focused)
* [onAllLayersRendered](/auto-docs/playground-react/classes/Playground.md#onalllayersrendered)
* [onResize](/auto-docs/playground-react/classes/Playground.md#onresize)
* [pipelineNode](/auto-docs/playground-react/classes/Playground.md#pipelinenode)
* [zoomEnable](/auto-docs/playground-react/classes/Playground.md#zoomenable)

### Methods

* [dispose](/auto-docs/playground-react/classes/Playground.md#dispose)
* [flush](/auto-docs/playground-react/classes/Playground.md#flush)
* [getConfigEntity](/auto-docs/playground-react/classes/Playground.md#getconfigentity)
* [getLayer](/auto-docs/playground-react/classes/Playground.md#getlayer)
* [init](/auto-docs/playground-react/classes/Playground.md#init)
* [ready](/auto-docs/playground-react/classes/Playground.md#ready)
* [registerLayer](/auto-docs/playground-react/classes/Playground.md#registerlayer)
* [registerLayers](/auto-docs/playground-react/classes/Playground.md#registerlayers)
* [resize](/auto-docs/playground-react/classes/Playground.md#resize)
* [scrollToView](/auto-docs/playground-react/classes/Playground.md#scrolltoview)
* [setParent](/auto-docs/playground-react/classes/Playground.md#setparent)
* [toReactComponent](/auto-docs/playground-react/classes/Playground.md#toreactcomponent)

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
| `entityManager` | [`EntityManager`](/auto-docs/playground-react/classes/EntityManager.md) | - |
| `registry` | [`PlaygroundRegistry`](/auto-docs/playground-react/classes/PlaygroundRegistry.md) | - |
| `contextProvider` | [`PlaygroundContextProvider`](/auto-docs/playground-react/variables/PlaygroundContextProvider-1.md) | - |
| `pipelineRenderer` | [`PipelineRenderer`](/auto-docs/playground-react/classes/PipelineRenderer.md) | - |
| `pipelineRegistry` | [`PipelineRegistry`](/auto-docs/playground-react/classes/PipelineRegistry.md) | - |
| `playgroundConfig` | [`PlaygroundConfig`](/auto-docs/playground-react/variables/PlaygroundConfig-1.md) | - |
| `contributionProvider` | [`ContributionProvider`](/auto-docs/playground-react/variables/ContributionProvider-1.md)<[`PlaygroundContribution`](/auto-docs/playground-react/variables/PlaygroundContribution-1.md)> | - |
| `commandService` | [`CommandService`](/auto-docs/playground-react/variables/CommandService-1.md) | 用于管理画布命令 |
| `selectionService` | [`SelectionService`](/auto-docs/playground-react/classes/SelectionService.md) | 用于管理画布选择 |

## Properties

### commandService

`Readonly` **commandService**: [`CommandService`](/auto-docs/playground-react/variables/CommandService-1.md)

用于管理画布命令

***

### contextProvider

`Readonly` **contextProvider**: [`PlaygroundContextProvider`](/auto-docs/playground-react/variables/PlaygroundContextProvider-1.md)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/auto-docs/playground-react/classes/EntityManager.md)

***

### node

`Readonly` **node**: `HTMLElement`

***

### onBlur

`Readonly` **onBlur**: [`Event`](/auto-docs/playground-react/interfaces/Event-1.md)<`void`>

***

### onFocus

`Readonly` **onFocus**: [`Event`](/auto-docs/playground-react/interfaces/Event-1.md)<`void`>

***

### onScroll

`Readonly` **onScroll**: [`Event`](/auto-docs/playground-react/interfaces/Event-1.md)<{ `scrollX`: `number` ; `scrollY`: `number`  }>

***

### onZoom

`Readonly` **onZoom**: [`Event`](/auto-docs/playground-react/interfaces/Event-1.md)<`number`>

***

### pipelineRegistry

`Readonly` **pipelineRegistry**: [`PipelineRegistry`](/auto-docs/playground-react/classes/PipelineRegistry.md)

***

### pipelineRenderer

`Readonly` **pipelineRenderer**: [`PipelineRenderer`](/auto-docs/playground-react/classes/PipelineRenderer.md)

***

### registry

`Readonly` **registry**: [`PlaygroundRegistry`](/auto-docs/playground-react/classes/PlaygroundRegistry.md)

***

### selectionService

`Readonly` **selectionService**: [`SelectionService`](/auto-docs/playground-react/classes/SelectionService.md)

用于管理画布选择

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

## Accessors

### config

`get` **config**(): [`PlaygroundConfigEntity`](/auto-docs/playground-react/classes/PlaygroundConfigEntity.md)

画布配置数据

#### Returns

[`PlaygroundConfigEntity`](/auto-docs/playground-react/classes/PlaygroundConfigEntity.md)

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

`get` **editorState**(): [`EditorStateConfigEntity`](/auto-docs/playground-react/classes/EditorStateConfigEntity.md)

画布编辑状态管理

#### Returns

[`EditorStateConfigEntity`](/auto-docs/playground-react/classes/EditorStateConfigEntity.md)

***

### focused

`get` **focused**(): `boolean`

#### Returns

`boolean`

***

### onAllLayersRendered

`get` **onAllLayersRendered**(): [`Event`](/auto-docs/playground-react/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/auto-docs/playground-react/interfaces/Event-1.md)<`void`>

***

### onResize

`get` **onResize**(): [`Event`](/auto-docs/playground-react/interfaces/Event-1.md)<[`PipelineDimension`](/auto-docs/playground-react/interfaces/PipelineDimension.md)>

#### Returns

[`Event`](/auto-docs/playground-react/interfaces/Event-1.md)<[`PipelineDimension`](/auto-docs/playground-react/interfaces/PipelineDimension.md)>

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

[Disposable](/auto-docs/playground-react/interfaces/Disposable-1.md).[dispose](/auto-docs/playground-react/interfaces/Disposable-1.md#dispose)

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
| `T` | extends [`ConfigEntity`](/auto-docs/playground-react/classes/ConfigEntity.md)<[`ConfigEntityProps`](/auto-docs/playground-react/interfaces/ConfigEntityProps.md), [`EntityOpts`](/auto-docs/playground-react/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `r` | [`EntityRegistry`](/auto-docs/playground-react/interfaces/EntityRegistry.md)<`T`> |

#### Returns

`T`

***

### getLayer

**getLayer**<`T`>(`layerRegistry`): `undefined` | `T`

获取 layer

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/playground-react/interfaces/LayerRegistry.md)<`T`> |

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
| `P` | extends [`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`, `P`> = [`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/playground-react/interfaces/LayerRegistry.md)<`P`> |
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
| `...layerRegistries` | [`LayerRegistry`](/auto-docs/playground-react/interfaces/LayerRegistry.md)<[`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`>>\[] |

#### Returns

`void`

***

### resize

**resize**(`msg?`, `scrollToCenter?`): `boolean`

这里会由 widget 透传进来

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg?` | [`PipelineDimension`](/auto-docs/playground-react/interfaces/PipelineDimension.md) |
| `scrollToCenter?` | `boolean` |

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
| `opts?` | [`PlaygroundConfigRevealOpts`](/auto-docs/playground-react/interfaces/PlaygroundConfigRevealOpts.md) |

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
