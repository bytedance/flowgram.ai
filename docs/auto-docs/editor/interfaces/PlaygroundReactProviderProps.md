# Interface: PlaygroundReactProviderProps

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Properties

* [autoFocus](/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#autofocus)
* [autoResize](/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#autoresize)
* [children](/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#children)
* [containerModules](/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#containermodules)
* [customPluginContext](/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#customplugincontext)
* [parentContainer](/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#parentcontainer)
* [playgroundContainer](/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#playgroundcontainer)
* [playgroundContext](/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#playgroundcontext)
* [plugins](/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#plugins)
* [zoomEnable](/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#zoomenable)

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

`Optional` **containerModules**: [`ContainerModule`](/auto-docs/editor/interfaces/interfaces.ContainerModule.md)\[]

***

### customPluginContext

`Optional` **customPluginContext**: (`container`: [`Container`](/auto-docs/editor/interfaces/interfaces.Container.md)) => [`PluginContext`](/auto-docs/editor/variables/PluginContext-1.md)

#### Type declaration

(`container`): [`PluginContext`](/auto-docs/editor/variables/PluginContext-1.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `container` | [`Container`](/auto-docs/editor/interfaces/interfaces.Container.md) |

##### Returns

[`PluginContext`](/auto-docs/editor/variables/PluginContext-1.md)

***

### parentContainer

`Optional` **parentContainer**: [`Container`](/auto-docs/editor/interfaces/interfaces.Container.md)

***

### playgroundContainer

`Optional` **playgroundContainer**: [`Container`](/auto-docs/editor/interfaces/interfaces.Container.md)

***

### playgroundContext

`Optional` **playgroundContext**: `any`

***

### plugins

`Optional` **plugins**: [`PluginsProvider`](/auto-docs/editor/interfaces/PluginsProvider.md)<`any`>

***

### zoomEnable

`Optional` **zoomEnable**: `boolean`
