# Interface: PlaygroundReactProps\<CTX>

画布配置配置

## Type parameters

| Name | Type |
| :------ | :------ |
| `CTX` | extends [`PluginContext`](/en/auto-docs/playground-react/variables/PluginContext-1.md) = [`PluginContext`](/en/auto-docs/playground-react/variables/PluginContext-1.md) |

## Table of contents

### Properties

* [background](/en/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#background)
* [children](/en/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#children)
* [containerModules](/en/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#containermodules)
* [layers](/en/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#layers)
* [onAllLayersRendered](/en/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#onalllayersrendered)
* [onBind](/en/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#onbind)
* [onDispose](/en/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#ondispose)
* [onInit](/en/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#oninit)
* [onReady](/en/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#onready)
* [parentContainer](/en/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#parentcontainer)
* [playground](/en/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#playground)
* [plugins](/en/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#plugins)
* [shortcuts](/en/auto-docs/playground-react/interfaces/PlaygroundReactProps.md#shortcuts)

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

`Optional` **layers**: [`LayerRegistry`](/en/auto-docs/playground-react/interfaces/LayerRegistry.md)<[`Layer`](/en/auto-docs/playground-react/classes/Layer.md)<`any`, `any`>>\[]

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

`Optional` **onBind**: (`bindConfig`: [`PluginBindConfig`](/en/auto-docs/playground-react/interfaces/PluginBindConfig.md)) => `void`

#### Type declaration

(`bindConfig`): `void`

插件 IOC 注册，等价于 containerModule

##### Parameters

| Name | Type |
| :------ | :------ |
| `bindConfig` | [`PluginBindConfig`](/en/auto-docs/playground-react/interfaces/PluginBindConfig.md) |

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

`Optional` **playground**: [`PlaygroundLayerOptions`](/en/auto-docs/playground-react/interfaces/PlaygroundLayerOptions.md) & { `autoFocus?`: `boolean` ; `autoResize?`: `boolean`  }

画布相关配置

***

### plugins

`Optional` **plugins**: (`ctx`: `CTX`) => [`Plugin`](/en/auto-docs/playground-react/variables/Plugin-1.md)\[]

#### Type declaration

(`ctx`): [`Plugin`](/en/auto-docs/playground-react/variables/Plugin-1.md)\[]

插件扩展

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`Plugin`](/en/auto-docs/playground-react/variables/Plugin-1.md)\[]

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
