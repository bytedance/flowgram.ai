# Interface: FixedLayoutProps

固定布局配置

## Hierarchy

* [`EditorProps`](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md)<[`FixedLayoutPluginContext`](/auto-docs/fixed-layout-editor/variables/FixedLayoutPluginContext-1.md), [`FlowDocumentJSON`](/auto-docs/fixed-layout-editor/types/FlowDocumentJSON.md)>

  ↳ **`FixedLayoutProps`**

## Table of contents

### Properties

* [allNodesDefaultExpanded](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#allnodesdefaultexpanded)
* [background](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#background)
* [children](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#children)
* [constants](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#constants)
* [containerModules](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#containermodules)
* [defaultLayout](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#defaultlayout)
* [dragdrop](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#dragdrop)
* [formatNodeLabels](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#formatnodelabels)
* [formatNodeLines](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#formatnodelines)
* [getNodeDefaultRegistry](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#getnodedefaultregistry)
* [history](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#history)
* [i18n](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#i18n)
* [initialData](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#initialdata)
* [layers](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#layers)
* [materials](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#materials)
* [nodeEngine](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#nodeengine)
* [nodeRegistries](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#noderegistries)
* [onAllLayersRendered](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#onalllayersrendered)
* [onBind](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#onbind)
* [onDispose](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#ondispose)
* [onInit](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#oninit)
* [onLoad](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#onload)
* [onReady](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#onready)
* [parentContainer](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#parentcontainer)
* [playground](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#playground)
* [plugins](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#plugins)
* [readonly](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#readonly)
* [reduxDevTool](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#reduxdevtool)
* [scroll](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#scroll)
* [selectBox](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#selectbox)
* [shortcuts](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#shortcuts)
* [variableEngine](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#variableengine)

### Methods

* [fromNodeJSON](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#fromnodejson)
* [toNodeJSON](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutProps-1.md#tonodejson)

## Properties

### allNodesDefaultExpanded

`Optional` **allNodesDefaultExpanded**: `boolean`

By default, all nodes are expanded
默认是否展开所有节点

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[allNodesDefaultExpanded](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#allnodesdefaultexpanded)

***

### background

`Optional` **background**: `boolean` | `BackgroundLayerOptions`

背景开关，默认打开

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[background](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#background)

***

### children

`Optional` **children**: `ReactNode`

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[children](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#children)

***

### constants

`Optional` **constants**: `Record`<`string`, `any`>

Canvas internal constant customization
画布内部常量自定义

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[constants](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#constants)

***

### containerModules

`Optional` **containerModules**: [`ContainerModule`](/auto-docs/fixed-layout-editor/interfaces/interfaces.ContainerModule.md)\[]

IOC 模块，用于更底层的插件扩展

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[containerModules](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#containermodules)

***

### defaultLayout

`Optional` **defaultLayout**: `string`

vertical or horizontal layout

***

### dragdrop

`Optional` **dragdrop**: `FixDragPluginOptions`<[`FixedLayoutPluginContext`](/auto-docs/fixed-layout-editor/variables/FixedLayoutPluginContext-1.md)>

Drag/Drop config

***

### formatNodeLabels

`Optional` **formatNodeLabels**: (`node`: [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md), `lines`: [`FlowTransitionLabel`](/auto-docs/fixed-layout-editor/interfaces/FlowTransitionLabel.md)\[]) => [`FlowTransitionLabel`](/auto-docs/fixed-layout-editor/interfaces/FlowTransitionLabel.md)\[]

#### Type declaration

(`node`, `lines`): [`FlowTransitionLabel`](/auto-docs/fixed-layout-editor/interfaces/FlowTransitionLabel.md)\[]

Custom node label
自定义节点 label

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `lines` | [`FlowTransitionLabel`](/auto-docs/fixed-layout-editor/interfaces/FlowTransitionLabel.md)\[] |

##### Returns

[`FlowTransitionLabel`](/auto-docs/fixed-layout-editor/interfaces/FlowTransitionLabel.md)\[]

***

### formatNodeLines

`Optional` **formatNodeLines**: (`node`: [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md), `lines`: [`FlowTransitionLine`](/auto-docs/fixed-layout-editor/interfaces/FlowTransitionLine.md)\[]) => [`FlowTransitionLine`](/auto-docs/fixed-layout-editor/interfaces/FlowTransitionLine.md)\[]

#### Type declaration

(`node`, `lines`): [`FlowTransitionLine`](/auto-docs/fixed-layout-editor/interfaces/FlowTransitionLine.md)\[]

Customize the node line
自定义节点线条

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `lines` | [`FlowTransitionLine`](/auto-docs/fixed-layout-editor/interfaces/FlowTransitionLine.md)\[] |

##### Returns

[`FlowTransitionLine`](/auto-docs/fixed-layout-editor/interfaces/FlowTransitionLine.md)\[]

***

### getNodeDefaultRegistry

`Optional` **getNodeDefaultRegistry**: (`type`: [`FlowNodeType`](/auto-docs/fixed-layout-editor/types/FlowNodeType.md)) => [`FlowNodeRegistry`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeMeta.md)>

#### Type declaration

(`type`): [`FlowNodeRegistry`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeMeta.md)>

Get the default node registry, which will be merged with the 'nodeRegistries'
提供默认的节点注册，这个会和 nodeRegistries 做合并

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`FlowNodeType`](/auto-docs/fixed-layout-editor/types/FlowNodeType.md) |

##### Returns

[`FlowNodeRegistry`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeMeta.md)>

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[getNodeDefaultRegistry](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#getnodedefaultregistry)

***

### history

`Optional` **history**: [`FixedHistoryPluginOptions`](/auto-docs/fixed-layout-editor/interfaces/FixedHistoryPluginOptions.md)<[`FixedLayoutPluginContext`](/auto-docs/fixed-layout-editor/variables/FixedLayoutPluginContext-1.md)> & { `disableShortcuts?`: `boolean`  }

Redo/Undo enable

#### Overrides

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[history](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#history)

***

### i18n

`Optional` **i18n**: [`I18nPluginOptions`](/auto-docs/fixed-layout-editor/interfaces/I18nPluginOptions.md)

i18n
国际化

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[i18n](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#i18n)

***

### initialData

`Optional` **initialData**: [`FlowDocumentJSON`](/auto-docs/fixed-layout-editor/types/FlowDocumentJSON.md)

Initialize data
初始化数据

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[initialData](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#initialdata)

***

### layers

`Optional` **layers**: [`LayerRegistry`](/auto-docs/fixed-layout-editor/interfaces/LayerRegistry.md)<[`Layer`](/auto-docs/fixed-layout-editor/classes/Layer.md)<`any`, `any`>>\[]

注册 layer

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[layers](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#layers)

***

### materials

`Optional` **materials**: `MaterialsPluginOptions`

Canvas material, Used to customize react components
画布物料, 用于自定义 react 组件

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[materials](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#materials)

***

### nodeEngine

`Optional` **nodeEngine**: [`NodeCorePluginOptions`](/auto-docs/fixed-layout-editor/interfaces/NodeCorePluginOptions.md) & { `createDefaultFormMeta?`: (`node`: [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)) => `FormMetaOrFormMetaGenerator` ; `enable?`: `boolean`  }

Node engine configuration

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[nodeEngine](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#nodeengine)

***

### nodeRegistries

`Optional` **nodeRegistries**: [`FlowNodeRegistry`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeMeta.md)>\[]

node registries
节点定义

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[nodeRegistries](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#noderegistries)

***

### onAllLayersRendered

`Optional` **onAllLayersRendered**: (`ctx`: [`FixedLayoutPluginContext`](/auto-docs/fixed-layout-editor/variables/FixedLayoutPluginContext-1.md)) => `void`

#### Type declaration

(`ctx`): `void`

画布所有 layer 第一次渲染完成后触发

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FixedLayoutPluginContext`](/auto-docs/fixed-layout-editor/variables/FixedLayoutPluginContext-1.md) |

##### Returns

`void`

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[onAllLayersRendered](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#onalllayersrendered)

***

### onBind

`Optional` **onBind**: (`bindConfig`: [`PluginBindConfig`](/auto-docs/fixed-layout-editor/interfaces/PluginBindConfig.md)) => `void`

#### Type declaration

(`bindConfig`): `void`

插件 IOC 注册，等价于 containerModule

##### Parameters

| Name | Type |
| :------ | :------ |
| `bindConfig` | [`PluginBindConfig`](/auto-docs/fixed-layout-editor/interfaces/PluginBindConfig.md) |

##### Returns

`void`

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[onBind](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#onbind)

***

### onDispose

`Optional` **onDispose**: (`ctx`: [`FixedLayoutPluginContext`](/auto-docs/fixed-layout-editor/variables/FixedLayoutPluginContext-1.md)) => `void`

#### Type declaration

(`ctx`): `void`

画布销毁阶段

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FixedLayoutPluginContext`](/auto-docs/fixed-layout-editor/variables/FixedLayoutPluginContext-1.md) |

##### Returns

`void`

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[onDispose](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#ondispose)

***

### onInit

`Optional` **onInit**: (`ctx`: [`FixedLayoutPluginContext`](/auto-docs/fixed-layout-editor/variables/FixedLayoutPluginContext-1.md)) => `void`

#### Type declaration

(`ctx`): `void`

画布模块注册阶段

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FixedLayoutPluginContext`](/auto-docs/fixed-layout-editor/variables/FixedLayoutPluginContext-1.md) |

##### Returns

`void`

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[onInit](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#oninit)

***

### onLoad

`Optional` **onLoad**: (`ctx`: [`FixedLayoutPluginContext`](/auto-docs/fixed-layout-editor/variables/FixedLayoutPluginContext-1.md)) => `void`

#### Type declaration

(`ctx`): `void`

画布数据加载完成, 请使用 onAllLayersRendered 替代

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FixedLayoutPluginContext`](/auto-docs/fixed-layout-editor/variables/FixedLayoutPluginContext-1.md) |

##### Returns

`void`

**`Deprecated`**

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[onLoad](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#onload)

***

### onReady

`Optional` **onReady**: (`ctx`: [`FixedLayoutPluginContext`](/auto-docs/fixed-layout-editor/variables/FixedLayoutPluginContext-1.md)) => `void`

#### Type declaration

(`ctx`): `void`

画布事件注册阶段 (一般用于注册 dom 事件)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FixedLayoutPluginContext`](/auto-docs/fixed-layout-editor/variables/FixedLayoutPluginContext-1.md) |

##### Returns

`void`

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[onReady](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#onready)

***

### parentContainer

`Optional` **parentContainer**: [`Container`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)

父 IOC 容器

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[parentContainer](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#parentcontainer)

***

### playground

`Optional` **playground**: [`PlaygroundLayerOptions`](/auto-docs/fixed-layout-editor/interfaces/PlaygroundLayerOptions.md) & { `autoFocus?`: `boolean` ; `autoResize?`: `boolean`  }

画布相关配置

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[playground](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#playground)

***

### plugins

`Optional` **plugins**: (`ctx`: [`FixedLayoutPluginContext`](/auto-docs/fixed-layout-editor/variables/FixedLayoutPluginContext-1.md)) => [`Plugin`](/auto-docs/fixed-layout-editor/variables/Plugin-1.md)\[]

#### Type declaration

(`ctx`): [`Plugin`](/auto-docs/fixed-layout-editor/variables/Plugin-1.md)\[]

插件扩展

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FixedLayoutPluginContext`](/auto-docs/fixed-layout-editor/variables/FixedLayoutPluginContext-1.md) |

##### Returns

[`Plugin`](/auto-docs/fixed-layout-editor/variables/Plugin-1.md)\[]

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[plugins](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#plugins)

***

### readonly

`Optional` **readonly**: `boolean`

whether it is readonly
是否为 readonly

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[readonly](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#readonly)

***

### reduxDevTool

`Optional` **reduxDevTool**: `ReduxDevToolPluginOptions`

redux devtool configuration

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[reduxDevTool](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#reduxdevtool)

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

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[scroll](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#scroll)

***

### selectBox

`Optional` **selectBox**: `SelectBoxPluginOptions`

SelectBox config

***

### shortcuts

`Optional` **shortcuts**: (`shortcutsRegistry`: [`ShortcutsRegistry`](/auto-docs/fixed-layout-editor/classes/ShortcutsRegistry.md), `ctx`: [`FixedLayoutPluginContext`](/auto-docs/fixed-layout-editor/variables/FixedLayoutPluginContext-1.md)) => `void`

#### Type declaration

(`shortcutsRegistry`, `ctx`): `void`

注册快捷键

##### Parameters

| Name | Type |
| :------ | :------ |
| `shortcutsRegistry` | [`ShortcutsRegistry`](/auto-docs/fixed-layout-editor/classes/ShortcutsRegistry.md) |
| `ctx` | [`FixedLayoutPluginContext`](/auto-docs/fixed-layout-editor/variables/FixedLayoutPluginContext-1.md) |

##### Returns

`void`

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[shortcuts](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#shortcuts)

***

### variableEngine

`Optional` **variableEngine**: [`VariablePluginOptions`](/auto-docs/fixed-layout-editor/interfaces/VariablePluginOptions.md)

是否开启变量引擎
Variable engine enable

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[variableEngine](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#variableengine)

## Methods

### fromNodeJSON

`Optional` **fromNodeJSON**(`node`, `json`, `isFirstCreate`): [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md)

Node data transformation, called by ctx.document.toJSON
节点数据转换, 由 ctx.document.toJSON 调用

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) | current node |
| `json` | [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) | Current node json data |
| `isFirstCreate` | `boolean` | Whether it is created for the first time, If document.fromJSON is recalled, but the node already exists, isFirstCreate is false |

#### Returns

[`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md)

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[fromNodeJSON](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#fromnodejson)

***

### toNodeJSON

`Optional` **toNodeJSON**(`node`, `json`): [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md)

Node data transformation, called by ctx.document.fromJSON
节点数据转换, 由 ctx.document.fromJSON 调用

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) | current node |
| `json` | [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) | Current node json data |

#### Returns

[`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md)

#### Inherited from

[EditorProps](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md).[toNodeJSON](/auto-docs/fixed-layout-editor/interfaces/EditorProps-1.md#tonodejson)
