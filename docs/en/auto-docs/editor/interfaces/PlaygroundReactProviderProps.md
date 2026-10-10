# Interface: PlaygroundReactProviderProps

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Properties

* [autoFocus](/en/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#autofocus)
* [autoResize](/en/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#autoresize)
* [children](/en/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#children)
* [containerModules](/en/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#containermodules)
* [customPluginContext](/en/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#customplugincontext)
* [parentContainer](/en/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#parentcontainer)
* [playgroundContainer](/en/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#playgroundcontainer)
* [playgroundContext](/en/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#playgroundcontext)
* [plugins](/en/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#plugins)
* [zoomEnable](/en/auto-docs/editor/interfaces/PlaygroundReactProviderProps.md#zoomenable)

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

`Optional` **containerModules**: [`ContainerModule`](/en/auto-docs/editor/interfaces/interfaces.ContainerModule.md)\[]

***

### customPluginContext

`Optional` **customPluginContext**: (`container`: [`Container`](/en/auto-docs/editor/interfaces/interfaces.Container.md)) => [`PluginContext`](/en/auto-docs/editor/variables/PluginContext-1.md)

#### Type declaration

(`container`): [`PluginContext`](/en/auto-docs/editor/variables/PluginContext-1.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `container` | [`Container`](/en/auto-docs/editor/interfaces/interfaces.Container.md) |

##### Returns

[`PluginContext`](/en/auto-docs/editor/variables/PluginContext-1.md)

***

### parentContainer

`Optional` **parentContainer**: [`Container`](/en/auto-docs/editor/interfaces/interfaces.Container.md)

***

### playgroundContainer

`Optional` **playgroundContainer**: [`Container`](/en/auto-docs/editor/interfaces/interfaces.Container.md)

***

### playgroundContext

`Optional` **playgroundContext**: `any`

***

### plugins

`Optional` **plugins**: [`PluginsProvider`](/en/auto-docs/editor/interfaces/PluginsProvider.md)<`any`>

***

### zoomEnable

`Optional` **zoomEnable**: `boolean`
