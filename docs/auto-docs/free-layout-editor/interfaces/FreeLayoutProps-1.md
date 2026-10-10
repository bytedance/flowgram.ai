# Interface: FreeLayoutProps

Free layout configuration
自由布局配置

## Hierarchy

* [`EditorProps`](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md)<[`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), [`WorkflowJSON`](/auto-docs/free-layout-editor/interfaces/WorkflowJSON.md)>

  ↳ **`FreeLayoutProps`**

## Table of contents

### Properties

* [allNodesDefaultExpanded](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#allnodesdefaultexpanded)
* [background](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#background)
* [canAddLine](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#canaddline)
* [canDeleteLine](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#candeleteline)
* [canDeleteNode](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#candeletenode)
* [canDropToNode](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#candroptonode)
* [canResetLine](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#canresetline)
* [children](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#children)
* [constants](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#constants)
* [containerModules](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#containermodules)
* [cursors](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#cursors)
* [enableReadonlyNodeDragging](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#enablereadonlynodedragging)
* [getNodeDefaultRegistry](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#getnodedefaultregistry)
* [history](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#history)
* [i18n](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#i18n)
* [initialData](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#initialdata)
* [isDisabledLine](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#isdisabledline)
* [isDisabledPort](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#isdisabledport)
* [isErrorLine](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#iserrorline)
* [isErrorPort](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#iserrorport)
* [isFlowingLine](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#isflowingline)
* [isHideArrowLine](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#ishidearrowline)
* [isReverseLine](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#isreverseline)
* [layers](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#layers)
* [lineColor](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#linecolor)
* [materials](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#materials)
* [nodeEngine](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#nodeengine)
* [nodeRegistries](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#noderegistries)
* [onAllLayersRendered](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#onalllayersrendered)
* [onBind](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#onbind)
* [onContentChange](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#oncontentchange)
* [onDispose](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#ondispose)
* [onDragLineEnd](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#ondraglineend)
* [onInit](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#oninit)
* [onLoad](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#onload)
* [onReady](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#onready)
* [parentContainer](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#parentcontainer)
* [playground](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#playground)
* [plugins](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#plugins)
* [readonly](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#readonly)
* [reduxDevTool](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#reduxdevtool)
* [scroll](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#scroll)
* [selectBox](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#selectbox)
* [setLineClassName](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#setlineclassname)
* [setLineRenderType](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#setlinerendertype)
* [shortcuts](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#shortcuts)
* [twoWayConnection](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#twowayconnection)
* [variableEngine](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#variableengine)

### Methods

* [fromNodeJSON](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#fromnodejson)
* [toNodeJSON](/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#tonodejson)

## Properties

### allNodesDefaultExpanded

`Optional` **allNodesDefaultExpanded**: `boolean`

By default, all nodes are expanded
默认是否展开所有节点

#### Overrides

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[allNodesDefaultExpanded](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#allnodesdefaultexpanded)

***

### background

`Optional` **background**: `boolean` | `BackgroundLayerOptions`

背景开关，默认打开

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[background](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#background)

***

### canAddLine

`Optional` **canAddLine**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `fromPort`: [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md), `toPort`: [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md), `lines`: [`WorkflowLinesManager`](/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md), `silent?`: `boolean`) => `boolean`

#### Type declaration

(`ctx`, `fromPort`, `toPort`, `lines`, `silent?`): `boolean`

Whether to create lines or not
是否允许创建线条

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |  |
| `fromPort` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) | Source port |
| `toPort` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) | Target port |
| `lines` | [`WorkflowLinesManager`](/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md) | - |
| `silent?` | `boolean` | - |

##### Returns

`boolean`

***

### canDeleteLine

`Optional` **canDeleteLine**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `line`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md), `newLineInfo?`: `Required`<[`WorkflowLinePortInfo`](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md)>, `silent?`: `boolean`) => `boolean`

#### Type declaration

(`ctx`, `line`, `newLineInfo?`, `silent?`): `boolean`

Whether to delete lines or not
是否允许删除线条

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |  |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) | target line |
| `newLineInfo?` | `Required`<[`WorkflowLinePortInfo`](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md)> | new line info |
| `silent?` | `boolean` | If false, you can add a toast pop-up |

##### Returns

`boolean`

***

### canDeleteNode

`Optional` **canDeleteNode**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md), `silent?`: `boolean`) => `boolean`

#### Type declaration

(`ctx`, `node`, `silent?`): `boolean`

Whether to allow the deletion of nodes
是否允许删除节点

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |  |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) | 目标节点 |
| `silent?` | `boolean` | 如果为false，可以加 toast 弹窗 |

##### Returns

`boolean`

***

### canDropToNode

`Optional` **canDropToNode**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `params`: { `dragNode?`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) ; `dragNodeType?`: [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md) ; `dropNode?`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) ; `dropNodeType?`: [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md)  }) => `boolean`

#### Type declaration

(`ctx`, `params`): `boolean`

Whether to allow dragging into the sub-canvas (loop or group)
是否允许拖入子画布 (loop or group)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `params` | `Object` |
| `params.dragNode?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `params.dragNodeType?` | [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md) |
| `params.dropNode?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `params.dropNodeType?` | [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md) |

##### Returns

`boolean`

***

### canResetLine

`Optional` **canResetLine**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `oldLine`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md), `newLineInfo`: `Required`<[`WorkflowLinePortInfo`](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md)>, `lines`: [`WorkflowLinesManager`](/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md)) => `boolean`

#### Type declaration

(`ctx`, `oldLine`, `newLineInfo`, `lines`): `boolean`

Whether to allow lines to be reset
是否允许重置线条

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |  |
| `oldLine` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) | old line |
| `newLineInfo` | `Required`<[`WorkflowLinePortInfo`](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md)> | new line info |
| `lines` | [`WorkflowLinesManager`](/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md) | lines manager |

##### Returns

`boolean`

***

### children

`Optional` **children**: `ReactNode`

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[children](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#children)

***

### constants

`Optional` **constants**: `Record`<`string`, `any`>

Canvas internal constant customization
画布内部常量自定义

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[constants](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#constants)

***

### containerModules

`Optional` **containerModules**: [`ContainerModule`](/auto-docs/free-layout-editor/interfaces/interfaces.ContainerModule.md)\[]

IOC 模块，用于更底层的插件扩展

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[containerModules](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#containermodules)

***

### cursors

`Optional` **cursors**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `grab?` | `string` |
| `grabbing?` | `string` |

***

### enableReadonlyNodeDragging

`Optional` **enableReadonlyNodeDragging**: `boolean`

Enable dragging of read-only nodes (default false)
允许拖拽只读节点

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

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[getNodeDefaultRegistry](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#getnodedefaultregistry)

***

### history

`Optional` **history**: [`FreeHistoryPluginOptions`](/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md)<[`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md)> & { `disableShortcuts?`: `boolean`  }

History configuration

#### Overrides

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[history](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#history)

***

### i18n

`Optional` **i18n**: [`I18nPluginOptions`](/auto-docs/free-layout-editor/interfaces/I18nPluginOptions.md)

i18n
国际化

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[i18n](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#i18n)

***

### initialData

`Optional` **initialData**: [`WorkflowJSON`](/auto-docs/free-layout-editor/interfaces/WorkflowJSON.md)

Initialize data
初始化数据

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[initialData](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#initialdata)

***

### isDisabledLine

`Optional` **isDisabledLine**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `line`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `boolean`

#### Type declaration

(`ctx`, `line`): `boolean`

Determine if a line is disabled
判断线条是否禁用

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

##### Returns

`boolean`

***

### isDisabledPort

`Optional` **isDisabledPort**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `port`: [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)) => `boolean`

#### Type declaration

(`ctx`, `port`): `boolean`

Determine if the port is disabled
判断端口是否禁用

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `port` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |

##### Returns

`boolean`

***

### isErrorLine

`Optional` **isErrorLine**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `fromPort`: [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md), `toPort`: `undefined` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md), `lines`: [`WorkflowLinesManager`](/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md)) => `boolean`

#### Type declaration

(`ctx`, `fromPort`, `toPort`, `lines`): `boolean`

Determine whether the line is marked as error
判断线条是否标红

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `fromPort` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |
| `toPort` | `undefined` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |
| `lines` | [`WorkflowLinesManager`](/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md) |

##### Returns

`boolean`

***

### isErrorPort

`Optional` **isErrorPort**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `port`: [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)) => `boolean`

#### Type declaration

(`ctx`, `port`): `boolean`

Determine whether the port is marked as error
判断端口是否标红

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `port` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |

##### Returns

`boolean`

***

### isFlowingLine

`Optional` **isFlowingLine**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `line`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `boolean`

#### Type declaration

(`ctx`, `line`): `boolean`

Determine whether the line shows a flow effect
判断线条是否展示流动效果

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

##### Returns

`boolean`

***

### isHideArrowLine

`Optional` **isHideArrowLine**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `line`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `boolean`

#### Type declaration

(`ctx`, `line`): `boolean`

Determine if the line hides the arrow
判断线条是否隐藏箭头

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

##### Returns

`boolean`

***

### isReverseLine

`Optional` **isReverseLine**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `line`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `boolean`

#### Type declaration

(`ctx`, `line`): `boolean`

Determine whether the line arrow is reversed
判断线条箭头是否反转

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

##### Returns

`boolean`

***

### layers

`Optional` **layers**: [`LayerRegistry`](/auto-docs/free-layout-editor/interfaces/LayerRegistry.md)<[`Layer`](/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`>>\[]

注册 layer

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[layers](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#layers)

***

### lineColor

`Optional` **lineColor**: [`LineColor`](/auto-docs/free-layout-editor/interfaces/LineColor.md)

Line color configuration
线条颜色

***

### materials

`Optional` **materials**: `MaterialsPluginOptions`

Canvas material, Used to customize react components
画布物料, 用于自定义 react 组件

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[materials](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#materials)

***

### nodeEngine

`Optional` **nodeEngine**: [`NodeCorePluginOptions`](/auto-docs/free-layout-editor/interfaces/NodeCorePluginOptions.md) & { `createDefaultFormMeta?`: (`node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)) => `FormMetaOrFormMetaGenerator` ; `enable?`: `boolean`  }

Node engine configuration

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[nodeEngine](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#nodeengine)

***

### nodeRegistries

`Optional` **nodeRegistries**: [`WorkflowNodeRegistry`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md)\[]

Node registries
节点注册

#### Overrides

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[nodeRegistries](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#noderegistries)

***

### onAllLayersRendered

`Optional` **onAllLayersRendered**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md)) => `void`

#### Type declaration

(`ctx`): `void`

画布所有 layer 第一次渲染完成后触发

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |

##### Returns

`void`

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[onAllLayersRendered](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#onalllayersrendered)

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

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[onBind](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#onbind)

***

### onContentChange

`Optional` **onContentChange**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `event`: [`WorkflowContentChangeEvent`](/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md)) => `void`

#### Type declaration

(`ctx`, `event`): `void`

Listen for content change
监听画布内容更新

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `event` | [`WorkflowContentChangeEvent`](/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md) |

##### Returns

`void`

***

### onDispose

`Optional` **onDispose**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md)) => `void`

#### Type declaration

(`ctx`): `void`

画布销毁阶段

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |

##### Returns

`void`

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[onDispose](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#ondispose)

***

### onDragLineEnd

`Optional` **onDragLineEnd**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `params`: [`onDragLineEndParams`](/auto-docs/free-layout-editor/types/onDragLineEndParams.md)) => `Promise`<`void`>

#### Type declaration

(`ctx`, `params`): `Promise`<`void`>

Listen for dragging the line to end
拖拽线条结束

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `params` | [`onDragLineEndParams`](/auto-docs/free-layout-editor/types/onDragLineEndParams.md) |

##### Returns

`Promise`<`void`>

***

### onInit

`Optional` **onInit**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md)) => `void`

#### Type declaration

(`ctx`): `void`

画布模块注册阶段

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |

##### Returns

`void`

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[onInit](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#oninit)

***

### onLoad

`Optional` **onLoad**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md)) => `void`

#### Type declaration

(`ctx`): `void`

画布数据加载完成, 请使用 onAllLayersRendered 替代

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |

##### Returns

`void`

**`Deprecated`**

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[onLoad](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#onload)

***

### onReady

`Optional` **onReady**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md)) => `void`

#### Type declaration

(`ctx`): `void`

画布事件注册阶段 (一般用于注册 dom 事件)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |

##### Returns

`void`

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[onReady](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#onready)

***

### parentContainer

`Optional` **parentContainer**: [`Container`](/auto-docs/free-layout-editor/interfaces/interfaces.Container.md)

父 IOC 容器

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[parentContainer](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#parentcontainer)

***

### playground

`Optional` **playground**: [`PlaygroundLayerOptions`](/auto-docs/free-layout-editor/interfaces/PlaygroundLayerOptions.md) & { `autoFocus?`: `boolean` ; `autoResize?`: `boolean`  }

画布相关配置

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[playground](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#playground)

***

### plugins

`Optional` **plugins**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md)) => [`Plugin`](/auto-docs/free-layout-editor/variables/Plugin-1.md)\[]

#### Type declaration

(`ctx`): [`Plugin`](/auto-docs/free-layout-editor/variables/Plugin-1.md)\[]

插件扩展

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |

##### Returns

[`Plugin`](/auto-docs/free-layout-editor/variables/Plugin-1.md)\[]

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[plugins](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#plugins)

***

### readonly

`Optional` **readonly**: `boolean`

whether it is readonly
是否为 readonly

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[readonly](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#readonly)

***

### reduxDevTool

`Optional` **reduxDevTool**: `ReduxDevToolPluginOptions`

redux devtool configuration

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[reduxDevTool](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#reduxdevtool)

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

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[scroll](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#scroll)

***

### selectBox

`Optional` **selectBox**: `SelectBoxPluginOptions`

SelectBox config
选择框定义

***

### setLineClassName

`Optional` **setLineClassName**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `line`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `undefined` | `string`

#### Type declaration

(`ctx`, `line`): `undefined` | `string`

Set the line className
设置线条样式

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

##### Returns

`undefined` | `string`

***

### setLineRenderType

`Optional` **setLineRenderType**: (`ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `line`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `undefined` | [`LineRenderType`](/auto-docs/free-layout-editor/types/LineRenderType.md)

#### Type declaration

(`ctx`, `line`): `undefined` | [`LineRenderType`](/auto-docs/free-layout-editor/types/LineRenderType.md)

Set the line renderer type
设置线条渲染器类型

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

##### Returns

`undefined` | [`LineRenderType`](/auto-docs/free-layout-editor/types/LineRenderType.md)

***

### shortcuts

`Optional` **shortcuts**: (`shortcutsRegistry`: [`ShortcutsRegistry`](/auto-docs/free-layout-editor/classes/ShortcutsRegistry.md), `ctx`: [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md)) => `void`

#### Type declaration

(`shortcutsRegistry`, `ctx`): `void`

注册快捷键

##### Parameters

| Name | Type |
| :------ | :------ |
| `shortcutsRegistry` | [`ShortcutsRegistry`](/auto-docs/free-layout-editor/classes/ShortcutsRegistry.md) |
| `ctx` | [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |

##### Returns

`void`

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[shortcuts](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#shortcuts)

***

### twoWayConnection

`Optional` **twoWayConnection**: `boolean`

Line support both-way connection (default true)
线条支持双向连接

***

### variableEngine

`Optional` **variableEngine**: [`VariablePluginOptions`](/auto-docs/free-layout-editor/interfaces/VariablePluginOptions.md)

是否开启变量引擎
Variable engine enable

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[variableEngine](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#variableengine)

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

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[fromNodeJSON](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#fromnodejson)

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

#### Inherited from

[EditorProps](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[toNodeJSON](/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#tonodejson)
