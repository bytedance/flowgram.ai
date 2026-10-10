# Class: Playground\<CONTEXT>

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Type parameters

| Name | Type |
| :------ | :------ |
| `CONTEXT` | [`PlaygroundContext`](/en/auto-docs/playground-react/variables/PlaygroundContext-1.md) |

## Implements

* [`Disposable`](/en/auto-docs/playground-react/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/playground-react/classes/Playground.md#constructor)

### Properties

* [commandService](/en/auto-docs/playground-react/classes/Playground.md#commandservice)
* [contextProvider](/en/auto-docs/playground-react/classes/Playground.md#contextprovider)
* [entityManager](/en/auto-docs/playground-react/classes/Playground.md#entitymanager)
* [node](/en/auto-docs/playground-react/classes/Playground.md#node)
* [onBlur](/en/auto-docs/playground-react/classes/Playground.md#onblur)
* [onFocus](/en/auto-docs/playground-react/classes/Playground.md#onfocus)
* [onScroll](/en/auto-docs/playground-react/classes/Playground.md#onscroll)
* [onZoom](/en/auto-docs/playground-react/classes/Playground.md#onzoom)
* [pipelineRegistry](/en/auto-docs/playground-react/classes/Playground.md#pipelineregistry)
* [pipelineRenderer](/en/auto-docs/playground-react/classes/Playground.md#pipelinerenderer)
* [registry](/en/auto-docs/playground-react/classes/Playground.md#registry)
* [selectionService](/en/auto-docs/playground-react/classes/Playground.md#selectionservice)
* [toDispose](/en/auto-docs/playground-react/classes/Playground.md#todispose)

### Accessors

* [config](/en/auto-docs/playground-react/classes/Playground.md#config)
* [context](/en/auto-docs/playground-react/classes/Playground.md#context)
* [disposed](/en/auto-docs/playground-react/classes/Playground.md#disposed)
* [editorState](/en/auto-docs/playground-react/classes/Playground.md#editorstate)
* [focused](/en/auto-docs/playground-react/classes/Playground.md#focused)
* [onAllLayersRendered](/en/auto-docs/playground-react/classes/Playground.md#onalllayersrendered)
* [onResize](/en/auto-docs/playground-react/classes/Playground.md#onresize)
* [pipelineNode](/en/auto-docs/playground-react/classes/Playground.md#pipelinenode)
* [zoomEnable](/en/auto-docs/playground-react/classes/Playground.md#zoomenable)

### Methods

* [dispose](/en/auto-docs/playground-react/classes/Playground.md#dispose)
* [flush](/en/auto-docs/playground-react/classes/Playground.md#flush)
* [getConfigEntity](/en/auto-docs/playground-react/classes/Playground.md#getconfigentity)
* [getLayer](/en/auto-docs/playground-react/classes/Playground.md#getlayer)
* [init](/en/auto-docs/playground-react/classes/Playground.md#init)
* [ready](/en/auto-docs/playground-react/classes/Playground.md#ready)
* [registerLayer](/en/auto-docs/playground-react/classes/Playground.md#registerlayer)
* [registerLayers](/en/auto-docs/playground-react/classes/Playground.md#registerlayers)
* [resize](/en/auto-docs/playground-react/classes/Playground.md#resize)
* [scrollToView](/en/auto-docs/playground-react/classes/Playground.md#scrolltoview)
* [setParent](/en/auto-docs/playground-react/classes/Playground.md#setparent)
* [toReactComponent](/en/auto-docs/playground-react/classes/Playground.md#toreactcomponent)

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
| `entityManager` | [`EntityManager`](/en/auto-docs/playground-react/classes/EntityManager.md) | - |
| `registry` | [`PlaygroundRegistry`](/en/auto-docs/playground-react/classes/PlaygroundRegistry.md) | - |
| `contextProvider` | [`PlaygroundContextProvider`](/en/auto-docs/playground-react/variables/PlaygroundContextProvider-1.md) | - |
| `pipelineRenderer` | [`PipelineRenderer`](/en/auto-docs/playground-react/classes/PipelineRenderer.md) | - |
| `pipelineRegistry` | [`PipelineRegistry`](/en/auto-docs/playground-react/classes/PipelineRegistry.md) | - |
| `playgroundConfig` | [`PlaygroundConfig`](/en/auto-docs/playground-react/variables/PlaygroundConfig-1.md) | - |
| `contributionProvider` | [`ContributionProvider`](/en/auto-docs/playground-react/variables/ContributionProvider-1.md)<[`PlaygroundContribution`](/en/auto-docs/playground-react/variables/PlaygroundContribution-1.md)> | - |
| `commandService` | [`CommandService`](/en/auto-docs/playground-react/variables/CommandService-1.md) | 用于管理画布命令 |
| `selectionService` | [`SelectionService`](/en/auto-docs/playground-react/classes/SelectionService.md) | 用于管理画布选择 |

## Properties

### commandService

`Readonly` **commandService**: [`CommandService`](/en/auto-docs/playground-react/variables/CommandService-1.md)

用于管理画布命令

***

### contextProvider

`Readonly` **contextProvider**: [`PlaygroundContextProvider`](/en/auto-docs/playground-react/variables/PlaygroundContextProvider-1.md)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/en/auto-docs/playground-react/classes/EntityManager.md)

***

### node

`Readonly` **node**: `HTMLElement`

***

### onBlur

`Readonly` **onBlur**: [`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<`void`>

***

### onFocus

`Readonly` **onFocus**: [`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<`void`>

***

### onScroll

`Readonly` **onScroll**: [`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<{ `scrollX`: `number` ; `scrollY`: `number`  }>

***

### onZoom

`Readonly` **onZoom**: [`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<`number`>

***

### pipelineRegistry

`Readonly` **pipelineRegistry**: [`PipelineRegistry`](/en/auto-docs/playground-react/classes/PipelineRegistry.md)

***

### pipelineRenderer

`Readonly` **pipelineRenderer**: [`PipelineRenderer`](/en/auto-docs/playground-react/classes/PipelineRenderer.md)

***

### registry

`Readonly` **registry**: [`PlaygroundRegistry`](/en/auto-docs/playground-react/classes/PlaygroundRegistry.md)

***

### selectionService

`Readonly` **selectionService**: [`SelectionService`](/en/auto-docs/playground-react/classes/SelectionService.md)

用于管理画布选择

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

## Accessors

### config

`get` **config**(): [`PlaygroundConfigEntity`](/en/auto-docs/playground-react/classes/PlaygroundConfigEntity.md)

画布配置数据

#### Returns

[`PlaygroundConfigEntity`](/en/auto-docs/playground-react/classes/PlaygroundConfigEntity.md)

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

`get` **editorState**(): [`EditorStateConfigEntity`](/en/auto-docs/playground-react/classes/EditorStateConfigEntity.md)

画布编辑状态管理

#### Returns

[`EditorStateConfigEntity`](/en/auto-docs/playground-react/classes/EditorStateConfigEntity.md)

***

### focused

`get` **focused**(): `boolean`

#### Returns

`boolean`

***

### onAllLayersRendered

`get` **onAllLayersRendered**(): [`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<`void`>

***

### onResize

`get` **onResize**(): [`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<[`PipelineDimension`](/en/auto-docs/playground-react/interfaces/PipelineDimension.md)>

#### Returns

[`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<[`PipelineDimension`](/en/auto-docs/playground-react/interfaces/PipelineDimension.md)>

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

[Disposable](/en/auto-docs/playground-react/interfaces/Disposable-1.md).[dispose](/en/auto-docs/playground-react/interfaces/Disposable-1.md#dispose)

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
| `T` | extends [`ConfigEntity`](/en/auto-docs/playground-react/classes/ConfigEntity.md)<[`ConfigEntityProps`](/en/auto-docs/playground-react/interfaces/ConfigEntityProps.md), [`EntityOpts`](/en/auto-docs/playground-react/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `r` | [`EntityRegistry`](/en/auto-docs/playground-react/interfaces/EntityRegistry.md)<`T`> |

#### Returns

`T`

***

### getLayer

**getLayer**<`T`>(`layerRegistry`): `undefined` | `T`

获取 layer

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/en/auto-docs/playground-react/classes/Layer.md)<`any`, `any`, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/en/auto-docs/playground-react/interfaces/LayerRegistry.md)<`T`> |

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
| `P` | extends [`Layer`](/en/auto-docs/playground-react/classes/Layer.md)<`any`, `any`, `P`> = [`Layer`](/en/auto-docs/playground-react/classes/Layer.md)<`any`, `any`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/en/auto-docs/playground-react/interfaces/LayerRegistry.md)<`P`> |
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
| `...layerRegistries` | [`LayerRegistry`](/en/auto-docs/playground-react/interfaces/LayerRegistry.md)<[`Layer`](/en/auto-docs/playground-react/classes/Layer.md)<`any`, `any`>>\[] |

#### Returns

`void`

***

### resize

**resize**(`msg?`, `scrollToCenter?`): `boolean`

这里会由 widget 透传进来

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg?` | [`PipelineDimension`](/en/auto-docs/playground-react/interfaces/PipelineDimension.md) |
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
| `opts?` | [`PlaygroundConfigRevealOpts`](/en/auto-docs/playground-react/interfaces/PlaygroundConfigRevealOpts.md) |

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
