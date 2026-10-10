# Interface: PlaygroundReactProviderProps

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Properties

* [autoFocus](/auto-docs/free-layout-editor/interfaces/PlaygroundReactProviderProps.md#autofocus)
* [autoResize](/auto-docs/free-layout-editor/interfaces/PlaygroundReactProviderProps.md#autoresize)
* [children](/auto-docs/free-layout-editor/interfaces/PlaygroundReactProviderProps.md#children)
* [containerModules](/auto-docs/free-layout-editor/interfaces/PlaygroundReactProviderProps.md#containermodules)
* [customPluginContext](/auto-docs/free-layout-editor/interfaces/PlaygroundReactProviderProps.md#customplugincontext)
* [parentContainer](/auto-docs/free-layout-editor/interfaces/PlaygroundReactProviderProps.md#parentcontainer)
* [playgroundContainer](/auto-docs/free-layout-editor/interfaces/PlaygroundReactProviderProps.md#playgroundcontainer)
* [playgroundContext](/auto-docs/free-layout-editor/interfaces/PlaygroundReactProviderProps.md#playgroundcontext)
* [plugins](/auto-docs/free-layout-editor/interfaces/PlaygroundReactProviderProps.md#plugins)
* [zoomEnable](/auto-docs/free-layout-editor/interfaces/PlaygroundReactProviderProps.md#zoomenable)

## Properties

### autoFocus

`Optional` **autoFocus**: `boolean`

***

### autoResize

`Optional` **autoResize**: `boolean`

***

### children

`Optional` **children**: `ReactNode`

***

### containerModules

`Optional` **containerModules**: [`ContainerModule`](/auto-docs/free-layout-editor/interfaces/interfaces.ContainerModule.md)\[]

***

### customPluginContext

`Optional` **customPluginContext**: (`container`: [`Container`](/auto-docs/free-layout-editor/interfaces/interfaces.Container.md)) => [`PluginContext`](/auto-docs/free-layout-editor/variables/PluginContext-1.md)

#### Type declaration

(`container`): [`PluginContext`](/auto-docs/free-layout-editor/variables/PluginContext-1.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `container` | [`Container`](/auto-docs/free-layout-editor/interfaces/interfaces.Container.md) |

##### Returns

[`PluginContext`](/auto-docs/free-layout-editor/variables/PluginContext-1.md)

***

### parentContainer

`Optional` **parentContainer**: [`Container`](/auto-docs/free-layout-editor/interfaces/interfaces.Container.md)

***

### playgroundContainer

`Optional` **playgroundContainer**: [`Container`](/auto-docs/free-layout-editor/interfaces/interfaces.Container.md)

***

### playgroundContext

`Optional` **playgroundContext**: `any`

***

### plugins

`Optional` **plugins**: [`PluginsProvider`](/auto-docs/free-layout-editor/interfaces/PluginsProvider.md)<`any`>

***

### zoomEnable

`Optional` **zoomEnable**: `boolean`
