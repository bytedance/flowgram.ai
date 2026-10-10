# Class: Playground\<CONTEXT>

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Type parameters

| Name | Type |
| :------ | :------ |
| `CONTEXT` | [`PlaygroundContext`](/en/auto-docs/free-layout-editor/variables/PlaygroundContext-1.md) |

## Implements

* [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/Playground.md#constructor)

### Properties

* [commandService](/en/auto-docs/free-layout-editor/classes/Playground.md#commandservice)
* [contextProvider](/en/auto-docs/free-layout-editor/classes/Playground.md#contextprovider)
* [entityManager](/en/auto-docs/free-layout-editor/classes/Playground.md#entitymanager)
* [node](/en/auto-docs/free-layout-editor/classes/Playground.md#node)
* [onBlur](/en/auto-docs/free-layout-editor/classes/Playground.md#onblur)
* [onFocus](/en/auto-docs/free-layout-editor/classes/Playground.md#onfocus)
* [onScroll](/en/auto-docs/free-layout-editor/classes/Playground.md#onscroll)
* [onZoom](/en/auto-docs/free-layout-editor/classes/Playground.md#onzoom)
* [pipelineRegistry](/en/auto-docs/free-layout-editor/classes/Playground.md#pipelineregistry)
* [pipelineRenderer](/en/auto-docs/free-layout-editor/classes/Playground.md#pipelinerenderer)
* [registry](/en/auto-docs/free-layout-editor/classes/Playground.md#registry)
* [selectionService](/en/auto-docs/free-layout-editor/classes/Playground.md#selectionservice)
* [toDispose](/en/auto-docs/free-layout-editor/classes/Playground.md#todispose)

### Accessors

* [config](/en/auto-docs/free-layout-editor/classes/Playground.md#config)
* [context](/en/auto-docs/free-layout-editor/classes/Playground.md#context)
* [disposed](/en/auto-docs/free-layout-editor/classes/Playground.md#disposed)
* [editorState](/en/auto-docs/free-layout-editor/classes/Playground.md#editorstate)
* [focused](/en/auto-docs/free-layout-editor/classes/Playground.md#focused)
* [onAllLayersRendered](/en/auto-docs/free-layout-editor/classes/Playground.md#onalllayersrendered)
* [onResize](/en/auto-docs/free-layout-editor/classes/Playground.md#onresize)
* [pipelineNode](/en/auto-docs/free-layout-editor/classes/Playground.md#pipelinenode)
* [zoomEnable](/en/auto-docs/free-layout-editor/classes/Playground.md#zoomenable)

### Methods

* [dispose](/en/auto-docs/free-layout-editor/classes/Playground.md#dispose)
* [flush](/en/auto-docs/free-layout-editor/classes/Playground.md#flush)
* [getConfigEntity](/en/auto-docs/free-layout-editor/classes/Playground.md#getconfigentity)
* [getLayer](/en/auto-docs/free-layout-editor/classes/Playground.md#getlayer)
* [init](/en/auto-docs/free-layout-editor/classes/Playground.md#init)
* [ready](/en/auto-docs/free-layout-editor/classes/Playground.md#ready)
* [registerLayer](/en/auto-docs/free-layout-editor/classes/Playground.md#registerlayer)
* [registerLayers](/en/auto-docs/free-layout-editor/classes/Playground.md#registerlayers)
* [resize](/en/auto-docs/free-layout-editor/classes/Playground.md#resize)
* [scrollToView](/en/auto-docs/free-layout-editor/classes/Playground.md#scrolltoview)
* [setParent](/en/auto-docs/free-layout-editor/classes/Playground.md#setparent)
* [toReactComponent](/en/auto-docs/free-layout-editor/classes/Playground.md#toreactcomponent)

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
| `entityManager` | [`EntityManager`](/en/auto-docs/free-layout-editor/classes/EntityManager.md) | - |
| `registry` | [`PlaygroundRegistry`](/en/auto-docs/free-layout-editor/classes/PlaygroundRegistry.md) | - |
| `contextProvider` | [`PlaygroundContextProvider`](/en/auto-docs/free-layout-editor/variables/PlaygroundContextProvider-1.md) | - |
| `pipelineRenderer` | [`PipelineRenderer`](/en/auto-docs/free-layout-editor/classes/PipelineRenderer.md) | - |
| `pipelineRegistry` | [`PipelineRegistry`](/en/auto-docs/free-layout-editor/classes/PipelineRegistry.md) | - |
| `playgroundConfig` | [`PlaygroundConfig`](/en/auto-docs/free-layout-editor/variables/PlaygroundConfig-1.md) | - |
| `contributionProvider` | [`ContributionProvider`](/en/auto-docs/free-layout-editor/variables/ContributionProvider-1.md)<[`PlaygroundContribution`](/en/auto-docs/free-layout-editor/variables/PlaygroundContribution-1.md)> | - |
| `commandService` | [`CommandService`](/en/auto-docs/free-layout-editor/variables/CommandService-1.md) | 用于管理画布命令 |
| `selectionService` | [`SelectionService`](/en/auto-docs/free-layout-editor/classes/SelectionService.md) | 用于管理画布选择 |

## Properties

### commandService

`Readonly` **commandService**: [`CommandService`](/en/auto-docs/free-layout-editor/variables/CommandService-1.md)

用于管理画布命令

***

### contextProvider

`Readonly` **contextProvider**: [`PlaygroundContextProvider`](/en/auto-docs/free-layout-editor/variables/PlaygroundContextProvider-1.md)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/en/auto-docs/free-layout-editor/classes/EntityManager.md)

***

### node

`Readonly` **node**: `HTMLElement`

***

### onBlur

`Readonly` **onBlur**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

***

### onFocus

`Readonly` **onFocus**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

***

### onScroll

`Readonly` **onScroll**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<{ `scrollX`: `number` ; `scrollY`: `number`  }>

***

### onZoom

`Readonly` **onZoom**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`number`>

***

### pipelineRegistry

`Readonly` **pipelineRegistry**: [`PipelineRegistry`](/en/auto-docs/free-layout-editor/classes/PipelineRegistry.md)

***

### pipelineRenderer

`Readonly` **pipelineRenderer**: [`PipelineRenderer`](/en/auto-docs/free-layout-editor/classes/PipelineRenderer.md)

***

### registry

`Readonly` **registry**: [`PlaygroundRegistry`](/en/auto-docs/free-layout-editor/classes/PlaygroundRegistry.md)

***

### selectionService

`Readonly` **selectionService**: [`SelectionService`](/en/auto-docs/free-layout-editor/classes/SelectionService.md)

用于管理画布选择

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md)

## Accessors

### config

`get` **config**(): [`PlaygroundConfigEntity`](/en/auto-docs/free-layout-editor/classes/PlaygroundConfigEntity.md)

画布配置数据

#### Returns

[`PlaygroundConfigEntity`](/en/auto-docs/free-layout-editor/classes/PlaygroundConfigEntity.md)

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

`get` **editorState**(): [`EditorStateConfigEntity`](/en/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md)

画布编辑状态管理

#### Returns

[`EditorStateConfigEntity`](/en/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md)

***

### focused

`get` **focused**(): `boolean`

#### Returns

`boolean`

***

### onAllLayersRendered

`get` **onAllLayersRendered**(): [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

***

### onResize

`get` **onResize**(): [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`PipelineDimension`](/en/auto-docs/free-layout-editor/interfaces/PipelineDimension.md)>

#### Returns

[`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`PipelineDimension`](/en/auto-docs/free-layout-editor/interfaces/PipelineDimension.md)>

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

[Disposable](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md).[dispose](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md#dispose)

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
| `T` | extends [`ConfigEntity`](/en/auto-docs/free-layout-editor/classes/ConfigEntity.md)<[`ConfigEntityProps`](/en/auto-docs/free-layout-editor/interfaces/ConfigEntityProps.md), [`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `r` | [`EntityRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityRegistry.md)<`T`> |

#### Returns

`T`

***

### getLayer

**getLayer**<`T`>(`layerRegistry`): `undefined` | `T`

获取 layer

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/en/auto-docs/free-layout-editor/interfaces/LayerRegistry.md)<`T`> |

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
| `P` | extends [`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`, `P`> = [`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/en/auto-docs/free-layout-editor/interfaces/LayerRegistry.md)<`P`> |
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
| `...layerRegistries` | [`LayerRegistry`](/en/auto-docs/free-layout-editor/interfaces/LayerRegistry.md)<[`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`>>\[] |

#### Returns

`void`

***

### resize

**resize**(`msg?`, `scrollToCenter?`): `boolean`

这里会由 widget 透传进来

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg?` | [`PipelineDimension`](/en/auto-docs/free-layout-editor/interfaces/PipelineDimension.md) |
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
| `opts?` | [`PlaygroundConfigRevealOpts`](/en/auto-docs/free-layout-editor/interfaces/PlaygroundConfigRevealOpts.md) |

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
