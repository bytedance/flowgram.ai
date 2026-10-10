# Interface: EditorProps\<CTX, JSON>

## Type parameters

| Name | Type |
| :------ | :------ |
| `CTX` | extends [`EditorPluginContext`](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md) = [`EditorPluginContext`](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md) |
| `JSON` | [`FlowDocumentJSON`](/auto-docs/free-layout-editor/types/FlowDocumentJSON.md) |

## Hierarchy

* `PlaygroundReactProps`<`CTX`>

  ↳ **`EditorProps`**

  ↳↳ [`FreeLayoutProps`](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md)

## Table of contents

### Properties

* [allNodesDefaultExpanded](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#allnodesdefaultexpanded)
* [background](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#background)
* [children](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#children)
* [constants](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#constants)
* [containerModules](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#containermodules)
* [getNodeDefaultRegistry](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#getnodedefaultregistry)
* [history](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#history)
* [i18n](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#i18n)
* [initialData](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#initialdata)
* [layers](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#layers)
* [materials](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#materials)
* [nodeEngine](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#nodeengine)
* [nodeRegistries](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#noderegistries)
* [onAllLayersRendered](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#onalllayersrendered)
* [onBind](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#onbind)
* [onDispose](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#ondispose)
* [onInit](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#oninit)
* [onLoad](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#onload)
* [onReady](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#onready)
* [parentContainer](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#parentcontainer)
* [playground](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#playground)
* [plugins](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#plugins)
* [readonly](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#readonly)
* [reduxDevTool](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#reduxdevtool)
* [scroll](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#scroll)
* [shortcuts](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#shortcuts)
* [variableEngine](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#variableengine)

### Methods

* [fromNodeJSON](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#fromnodejson)
* [toNodeJSON](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#tonodejson)

## Properties

### allNodesDefaultExpanded

`Optional` **allNodesDefaultExpanded**: `boolean`

By default, all nodes are expanded
默认是否展开所有节点

***

### background

`Optional` **background**: `boolean` | `BackgroundLayerOptions`

背景开关，默认打开

#### Inherited from

PlaygroundReactProps.background

***

### children

`Optional` **children**: `ReactNode`

#### Inherited from

PlaygroundReactProps.children

***

### constants

`Optional` **constants**: `Record`<`string`, `any`>

Canvas internal constant customization
画布内部常量自定义

***

### containerModules

`Optional` **containerModules**: [`ContainerModule`](/auto-docs/free-layout-editor/interfaces/interfaces.ContainerModule.md)\[]

IOC 模块，用于更底层的插件扩展

#### Inherited from

PlaygroundReactProps.containerModules

***

### getNodeDefaultRegistry

`Optional` **getNodeDefaultRegistry**: (`type`: [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md)) => [`FlowNodeRegistry`](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md)>

#### Type declaration

(`type`): [`FlowNodeRegistry`](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md)>

Get the default node registry, which will be merged with the 'nodeRegistries'
提供默认的节点注册，这个会和 nodeRegistries 做合并

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md) |

##### Returns

[`FlowNodeRegistry`](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md)>

***

### history

`Optional` **history**: [`HistoryPluginOptions`](/auto-docs/free-layout-editor/interfaces/HistoryPluginOptions.md)<`CTX`> & { `disableShortcuts?`: `boolean`  }

Redo/Undo enable

***

### i18n

`Optional` **i18n**: [`I18nPluginOptions`](/auto-docs/free-layout-editor/interfaces/I18nPluginOptions.md)

i18n
国际化

***

### initialData

`Optional` **initialData**: `JSON`

Initialize data
初始化数据

***

### layers

`Optional` **layers**: [`LayerRegistry`](/auto-docs/free-layout-editor/interfaces/LayerRegistry.md)<[`Layer`](/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`>>\[]

注册 layer

#### Inherited from

PlaygroundReactProps.layers

***

### materials

`Optional` **materials**: `MaterialsPluginOptions`

Canvas material, Used to customize react components
画布物料, 用于自定义 react 组件

***

### nodeEngine

`Optional` **nodeEngine**: [`NodeCorePluginOptions`](/auto-docs/free-layout-editor/interfaces/NodeCorePluginOptions.md) & { `createDefaultFormMeta?`: (`node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)) => `FormMetaOrFormMetaGenerator` ; `enable?`: `boolean`  }

Node engine configuration

***

### nodeRegistries

`Optional` **nodeRegistries**: [`FlowNodeRegistry`](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md)>\[]

node registries
节点定义

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

#### Inherited from

PlaygroundReactProps.onAllLayersRendered

***

### onBind

`Optional` **onBind**: (`bindConfig`: [`PluginBindConfig`](/auto-docs/free-layout-editor/interfaces/PluginBindConfig.md)) => `void`

#### Type declaration

(`bindConfig`): `void`

插件 IOC 注册，等价于 containerModule

##### Parameters

| Name | Type |
| :------ | :------ |
| `bindConfig` | [`PluginBindConfig`](/auto-docs/free-layout-editor/interfaces/PluginBindConfig.md) |

##### Returns

`void`

#### Inherited from

PlaygroundReactProps.onBind

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

#### Inherited from

PlaygroundReactProps.onDispose

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

#### Inherited from

PlaygroundReactProps.onInit

***

### onLoad

`Optional` **onLoad**: (`ctx`: `CTX`) => `void`

#### Type declaration

(`ctx`): `void`

画布数据加载完成, 请使用 onAllLayersRendered 替代

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

`void`

**`Deprecated`**

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

#### Inherited from

PlaygroundReactProps.onReady

***

### parentContainer

`Optional` **parentContainer**: [`Container`](/auto-docs/free-layout-editor/interfaces/interfaces.Container.md)

父 IOC 容器

#### Inherited from

PlaygroundReactProps.parentContainer

***

### playground

`Optional` **playground**: [`PlaygroundLayerOptions`](/auto-docs/free-layout-editor/interfaces/PlaygroundLayerOptions.md) & { `autoFocus?`: `boolean` ; `autoResize?`: `boolean`  }

画布相关配置

#### Inherited from

PlaygroundReactProps.playground

***

### plugins

`Optional` **plugins**: (`ctx`: `CTX`) => [`Plugin`](/auto-docs/free-layout-editor/variables/Plugin-1.md)\[]

#### Type declaration

(`ctx`): [`Plugin`](/auto-docs/free-layout-editor/variables/Plugin-1.md)\[]

插件扩展

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`Plugin`](/auto-docs/free-layout-editor/variables/Plugin-1.md)\[]

#### Inherited from

PlaygroundReactProps.plugins

***

### readonly

`Optional` **readonly**: `boolean`

whether it is readonly
是否为 readonly

***

### reduxDevTool

`Optional` **reduxDevTool**: `ReduxDevToolPluginOptions`

redux devtool configuration

***

### scroll

`Optional` **scroll**: `Object`

Scroll configuration
滚动配置

#### Type declaration

| Name | Type |
| :------ | :------ |
| `disableScroll?` | `boolean` |
| `disableScrollBar?` | `boolean` |
| `enableScrollLimit?` | `boolean` |

***

### shortcuts

`Optional` **shortcuts**: (`shortcutsRegistry`: [`ShortcutsRegistry`](/auto-docs/free-layout-editor/classes/ShortcutsRegistry.md), `ctx`: `CTX`) => `void`

#### Type declaration

(`shortcutsRegistry`, `ctx`): `void`

注册快捷键

##### Parameters

| Name | Type |
| :------ | :------ |
| `shortcutsRegistry` | [`ShortcutsRegistry`](/auto-docs/free-layout-editor/classes/ShortcutsRegistry.md) |
| `ctx` | `CTX` |

##### Returns

`void`

#### Inherited from

PlaygroundReactProps.shortcuts

***

### variableEngine

`Optional` **variableEngine**: [`VariablePluginOptions`](/auto-docs/free-layout-editor/interfaces/VariablePluginOptions.md)

是否开启变量引擎
Variable engine enable

## Methods

### fromNodeJSON

`Optional` **fromNodeJSON**(`node`, `json`, `isFirstCreate`): [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md)

Node data transformation, called by ctx.document.toJSON
节点数据转换, 由 ctx.document.toJSON 调用

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) | current node |
| `json` | [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) | Current node json data |
| `isFirstCreate` | `boolean` | Whether it is created for the first time, If document.fromJSON is recalled, but the node already exists, isFirstCreate is false |

#### Returns

[`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md)

***

### toNodeJSON

`Optional` **toNodeJSON**(`node`, `json`): [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md)

Node data transformation, called by ctx.document.fromJSON
节点数据转换, 由 ctx.document.fromJSON 调用

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) | current node |
| `json` | [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) | Current node json data |

#### Returns

[`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md)
