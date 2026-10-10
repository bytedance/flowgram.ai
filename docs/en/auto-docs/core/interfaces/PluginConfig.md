# Interface: PluginConfig\<Opts, CTX>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Opts` | `Opts` |
| `CTX` | extends [`PluginContext`](/en/auto-docs/core/variables/PluginContext-1.md) = [`PluginContext`](/en/auto-docs/core/variables/PluginContext-1.md) |

## Table of contents

### Properties

* [containerModules](/en/auto-docs/core/interfaces/PluginConfig.md#containermodules)
* [onAllLayersRendered](/en/auto-docs/core/interfaces/PluginConfig.md#onalllayersrendered)
* [onBind](/en/auto-docs/core/interfaces/PluginConfig.md#onbind)
* [onDispose](/en/auto-docs/core/interfaces/PluginConfig.md#ondispose)
* [onInit](/en/auto-docs/core/interfaces/PluginConfig.md#oninit)
* [onReady](/en/auto-docs/core/interfaces/PluginConfig.md#onready)

## Properties

### containerModules

`Optional` **containerModules**: `ContainerModule`\[]

IOC 模块，用于更底层的插件扩展

***

### onAllLayersRendered

`Optional` **onAllLayersRendered**: (`ctx`: `CTX`, `opts`: `Opts`) => `void`

#### Type declaration

(`ctx`, `opts`): `void`

画布所有 layer 渲染结束

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |
| `opts` | `Opts` |

##### Returns

`void`

***

### onBind

`Optional` **onBind**: (`bindConfig`: [`PluginBindConfig`](/en/auto-docs/core/interfaces/PluginBindConfig.md), `opts`: `Opts`) => `void`

#### Type declaration

(`bindConfig`, `opts`): `void`

插件 IOC 注册, 等价于 containerModule

##### Parameters

| Name | Type |
| :------ | :------ |
| `bindConfig` | [`PluginBindConfig`](/en/auto-docs/core/interfaces/PluginBindConfig.md) |
| `opts` | `Opts` |

##### Returns

`void`

***

### onDispose

`Optional` **onDispose**: (`ctx`: `CTX`, `opts`: `Opts`) => `void`

#### Type declaration

(`ctx`, `opts`): `void`

画布销毁阶段

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |
| `opts` | `Opts` |

##### Returns

`void`

***

### onInit

`Optional` **onInit**: (`ctx`: `CTX`, `opts`: `Opts`) => `void`

#### Type declaration

(`ctx`, `opts`): `void`

画布注册阶段

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |
| `opts` | `Opts` |

##### Returns

`void`

***

### onReady

`Optional` **onReady**: (`ctx`: `CTX`, `opts`: `Opts`) => `void`

#### Type declaration

(`ctx`, `opts`): `void`

画布准备阶段，一般用于 dom 事件注册等

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |
| `opts` | `Opts` |

##### Returns

`void`
