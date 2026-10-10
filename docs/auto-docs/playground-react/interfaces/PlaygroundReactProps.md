# Interface: PlaygroundReactProps\<CTX>

画布配置配置

## Type parameters

| Name | Type |
| :------ | :------ |
| `CTX` | extends [`PluginContext`](/auto-docs/playground-react/variables/PluginContext-1.md) = [`PluginContext`](/auto-docs/playground-react/variables/PluginContext-1.md) |

## Table of contents

### Properties

* [background](/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#background)
* [children](/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#children)
* [containerModules](/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#containermodules)
* [layers](/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#layers)
* [onAllLayersRendered](/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#onalllayersrendered)
* [onBind](/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#onbind)
* [onDispose](/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#ondispose)
* [onInit](/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#oninit)
* [onReady](/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#onready)
* [parentContainer](/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#parentcontainer)
* [playground](/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#playground)
* [plugins](/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#plugins)
* [shortcuts](/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#shortcuts)

## Properties

### background

`Optional` **background**: `boolean` | `BackgroundLayerOptions`

背景开关，默认打开

***

### children

`Optional` **children**: `ReactNode`

***

### containerModules

`Optional` **containerModules**: `ContainerModule`\[]

IOC 模块，用于更底层的插件扩展

***

### layers

`Optional` **layers**: [`LayerRegistry`](/auto-docs/playground-react/interfaces/LayerRegistry.md)<[`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`>>\[]

注册 layer

***

### onAllLayersRendered

`Optional` **onAllLayersRendered**: (`ctx`: `CTX`) => `void`

#### Type declaration

(`ctx`): `void`

画布所有 layer 第一次渲染完成后触发

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

`void`

***

### onBind

`Optional` **onBind**: (`bindConfig`: [`PluginBindConfig`](/auto-docs/playground-react/interfaces/PluginBindConfig.md)) => `void`

#### Type declaration

(`bindConfig`): `void`

插件 IOC 注册，等价于 containerModule

##### Parameters

| Name | Type |
| :------ | :------ |
| `bindConfig` | [`PluginBindConfig`](/auto-docs/playground-react/interfaces/PluginBindConfig.md) |

##### Returns

`void`

***

### onDispose

`Optional` **onDispose**: (`ctx`: `CTX`) => `void`

#### Type declaration

(`ctx`): `void`

画布销毁阶段

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

`void`

***

### onInit

`Optional` **onInit**: (`ctx`: `CTX`) => `void`

#### Type declaration

(`ctx`): `void`

画布模块注册阶段

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

`void`

***

### onReady

`Optional` **onReady**: (`ctx`: `CTX`) => `void`

#### Type declaration

(`ctx`): `void`

画布事件注册阶段 (一般用于注册 dom 事件)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

`void`

***

### parentContainer

`Optional` **parentContainer**: `Container`

父 IOC 容器

***

### playground

`Optional` **playground**: [`PlaygroundLayerOptions`](/auto-docs/playground-react/interfaces/PlaygroundLayerOptions.md) & { `autoFocus?`: `boolean` ; `autoResize?`: `boolean`  }

画布相关配置

***

### plugins

`Optional` **plugins**: (`ctx`: `CTX`) => [`Plugin`](/auto-docs/playground-react/variables/Plugin-1.md)\[]

#### Type declaration

(`ctx`): [`Plugin`](/auto-docs/playground-react/variables/Plugin-1.md)\[]

插件扩展

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`Plugin`](/auto-docs/playground-react/variables/Plugin-1.md)\[]

***

### shortcuts

`Optional` **shortcuts**: (`shortcutsRegistry`: `ShortcutsRegistry`, `ctx`: `CTX`) => `void`

#### Type declaration

(`shortcutsRegistry`, `ctx`): `void`

注册快捷键

##### Parameters

| Name | Type |
| :------ | :------ |
| `shortcutsRegistry` | `ShortcutsRegistry` |
| `ctx` | `CTX` |

##### Returns

`void`
