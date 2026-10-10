# Interface: FreeLayoutProps

Free layout configuration
自由布局配置

## Hierarchy

* [`EditorProps`](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md)<[`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), [`WorkflowJSON`](/en/auto-docs/free-layout-editor/interfaces/WorkflowJSON.md)>

  ↳ **`FreeLayoutProps`**

## Table of contents

### Properties

* [allNodesDefaultExpanded](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#allnodesdefaultexpanded)
* [background](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#background)
* [canAddLine](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#canaddline)
* [canDeleteLine](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#candeleteline)
* [canDeleteNode](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#candeletenode)
* [canDropToNode](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#candroptonode)
* [canResetLine](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#canresetline)
* [children](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#children)
* [constants](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#constants)
* [containerModules](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#containermodules)
* [cursors](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#cursors)
* [enableReadonlyNodeDragging](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#enablereadonlynodedragging)
* [getNodeDefaultRegistry](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#getnodedefaultregistry)
* [history](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#history)
* [i18n](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#i18n)
* [initialData](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#initialdata)
* [isDisabledLine](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#isdisabledline)
* [isDisabledPort](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#isdisabledport)
* [isErrorLine](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#iserrorline)
* [isErrorPort](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#iserrorport)
* [isFlowingLine](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#isflowingline)
* [isHideArrowLine](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#ishidearrowline)
* [isReverseLine](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#isreverseline)
* [layers](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#layers)
* [lineColor](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#linecolor)
* [materials](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#materials)
* [nodeEngine](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#nodeengine)
* [nodeRegistries](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#noderegistries)
* [onAllLayersRendered](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#onalllayersrendered)
* [onBind](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#onbind)
* [onContentChange](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#oncontentchange)
* [onDispose](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#ondispose)
* [onDragLineEnd](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#ondraglineend)
* [onInit](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#oninit)
* [onLoad](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#onload)
* [onReady](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#onready)
* [parentContainer](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#parentcontainer)
* [playground](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#playground)
* [plugins](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#plugins)
* [readonly](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#readonly)
* [reduxDevTool](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#reduxdevtool)
* [scroll](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#scroll)
* [selectBox](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#selectbox)
* [setLineClassName](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#setlineclassname)
* [setLineRenderType](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#setlinerendertype)
* [shortcuts](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#shortcuts)
* [twoWayConnection](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#twowayconnection)
* [variableEngine](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#variableengine)

### Methods

* [fromNodeJSON](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#fromnodejson)
* [toNodeJSON](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutProps-1.md#tonodejson)

## Properties

### allNodesDefaultExpanded

`Optional` **allNodesDefaultExpanded**: `boolean`

By default, all nodes are expanded
默认是否展开所有节点

#### Overrides

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[allNodesDefaultExpanded](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#allnodesdefaultexpanded)

***

### background

`Optional` **background**: `boolean` | `BackgroundLayerOptions`

背景开关，默认打开

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[background](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#background)

***

### canAddLine

`Optional` **canAddLine**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `fromPort`: [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md), `toPort`: [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md), `lines`: [`WorkflowLinesManager`](/en/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md), `silent?`: `boolean`) => `boolean`

#### Type declaration

(`ctx`, `fromPort`, `toPort`, `lines`, `silent?`): `boolean`

Whether to create lines or not
是否允许创建线条

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |  |
| `fromPort` | [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) | Source port |
| `toPort` | [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) | Target port |
| `lines` | [`WorkflowLinesManager`](/en/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md) | - |
| `silent?` | `boolean` | - |

##### Returns

`boolean`

***

### canDeleteLine

`Optional` **canDeleteLine**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `line`: [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md), `newLineInfo?`: `Required`<[`WorkflowLinePortInfo`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md)>, `silent?`: `boolean`) => `boolean`

#### Type declaration

(`ctx`, `line`, `newLineInfo?`, `silent?`): `boolean`

Whether to delete lines or not
是否允许删除线条

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |  |
| `line` | [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) | target line |
| `newLineInfo?` | `Required`<[`WorkflowLinePortInfo`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md)> | new line info |
| `silent?` | `boolean` | If false, you can add a toast pop-up |

##### Returns

`boolean`

***

### canDeleteNode

`Optional` **canDeleteNode**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `node`: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md), `silent?`: `boolean`) => `boolean`

#### Type declaration

(`ctx`, `node`, `silent?`): `boolean`

Whether to allow the deletion of nodes
是否允许删除节点

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |  |
| `node` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) | 目标节点 |
| `silent?` | `boolean` | 如果为false，可以加 toast 弹窗 |

##### Returns

`boolean`

***

### canDropToNode

`Optional` **canDropToNode**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `params`: { `dragNode?`: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) ; `dragNodeType?`: [`FlowNodeType`](/en/auto-docs/free-layout-editor/types/FlowNodeType.md) ; `dropNode?`: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) ; `dropNodeType?`: [`FlowNodeType`](/en/auto-docs/free-layout-editor/types/FlowNodeType.md)  }) => `boolean`

#### Type declaration

(`ctx`, `params`): `boolean`

Whether to allow dragging into the sub-canvas (loop or group)
是否允许拖入子画布 (loop or group)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `params` | `Object` |
| `params.dragNode?` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `params.dragNodeType?` | [`FlowNodeType`](/en/auto-docs/free-layout-editor/types/FlowNodeType.md) |
| `params.dropNode?` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `params.dropNodeType?` | [`FlowNodeType`](/en/auto-docs/free-layout-editor/types/FlowNodeType.md) |

##### Returns

`boolean`

***

### canResetLine

`Optional` **canResetLine**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `oldLine`: [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md), `newLineInfo`: `Required`<[`WorkflowLinePortInfo`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md)>, `lines`: [`WorkflowLinesManager`](/en/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md)) => `boolean`

#### Type declaration

(`ctx`, `oldLine`, `newLineInfo`, `lines`): `boolean`

Whether to allow lines to be reset
是否允许重置线条

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |  |
| `oldLine` | [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) | old line |
| `newLineInfo` | `Required`<[`WorkflowLinePortInfo`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md)> | new line info |
| `lines` | [`WorkflowLinesManager`](/en/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md) | lines manager |

##### Returns

`boolean`

***

### children

`Optional` **children**: `ReactNode`

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[children](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#children)

***

### constants

`Optional` **constants**: `Record`<`string`, `any`>

Canvas internal constant customization
画布内部常量自定义

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[constants](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#constants)

***

### containerModules

`Optional` **containerModules**: [`ContainerModule`](/en/auto-docs/free-layout-editor/interfaces/interfaces.ContainerModule.md)\[]

IOC 模块，用于更底层的插件扩展

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[containerModules](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#containermodules)

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

`Optional` **getNodeDefaultRegistry**: (`type`: [`FlowNodeType`](/en/auto-docs/free-layout-editor/types/FlowNodeType.md)) => [`FlowNodeRegistry`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md)>

#### Type declaration

(`type`): [`FlowNodeRegistry`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md)>

Get the default node registry, which will be merged with the 'nodeRegistries'
提供默认的节点注册，这个会和 nodeRegistries 做合并

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`FlowNodeType`](/en/auto-docs/free-layout-editor/types/FlowNodeType.md) |

##### Returns

[`FlowNodeRegistry`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md)>

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[getNodeDefaultRegistry](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#getnodedefaultregistry)

***

### history

`Optional` **history**: [`FreeHistoryPluginOptions`](/en/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md)<[`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md)> & { `disableShortcuts?`: `boolean`  }

History configuration

#### Overrides

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[history](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#history)

***

### i18n

`Optional` **i18n**: [`I18nPluginOptions`](/en/auto-docs/free-layout-editor/interfaces/I18nPluginOptions.md)

i18n
国际化

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[i18n](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#i18n)

***

### initialData

`Optional` **initialData**: [`WorkflowJSON`](/en/auto-docs/free-layout-editor/interfaces/WorkflowJSON.md)

Initialize data
初始化数据

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[initialData](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#initialdata)

***

### isDisabledLine

`Optional` **isDisabledLine**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `line`: [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `boolean`

#### Type declaration

(`ctx`, `line`): `boolean`

Determine if a line is disabled
判断线条是否禁用

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `line` | [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

##### Returns

`boolean`

***

### isDisabledPort

`Optional` **isDisabledPort**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `port`: [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)) => `boolean`

#### Type declaration

(`ctx`, `port`): `boolean`

Determine if the port is disabled
判断端口是否禁用

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `port` | [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |

##### Returns

`boolean`

***

### isErrorLine

`Optional` **isErrorLine**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `fromPort`: [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md), `toPort`: `undefined` | [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md), `lines`: [`WorkflowLinesManager`](/en/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md)) => `boolean`

#### Type declaration

(`ctx`, `fromPort`, `toPort`, `lines`): `boolean`

Determine whether the line is marked as error
判断线条是否标红

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `fromPort` | [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |
| `toPort` | `undefined` | [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |
| `lines` | [`WorkflowLinesManager`](/en/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md) |

##### Returns

`boolean`

***

### isErrorPort

`Optional` **isErrorPort**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `port`: [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)) => `boolean`

#### Type declaration

(`ctx`, `port`): `boolean`

Determine whether the port is marked as error
判断端口是否标红

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `port` | [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |

##### Returns

`boolean`

***

### isFlowingLine

`Optional` **isFlowingLine**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `line`: [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `boolean`

#### Type declaration

(`ctx`, `line`): `boolean`

Determine whether the line shows a flow effect
判断线条是否展示流动效果

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `line` | [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

##### Returns

`boolean`

***

### isHideArrowLine

`Optional` **isHideArrowLine**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `line`: [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `boolean`

#### Type declaration

(`ctx`, `line`): `boolean`

Determine if the line hides the arrow
判断线条是否隐藏箭头

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `line` | [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

##### Returns

`boolean`

***

### isReverseLine

`Optional` **isReverseLine**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `line`: [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `boolean`

#### Type declaration

(`ctx`, `line`): `boolean`

Determine whether the line arrow is reversed
判断线条箭头是否反转

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `line` | [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

##### Returns

`boolean`

***

### layers

`Optional` **layers**: [`LayerRegistry`](/en/auto-docs/free-layout-editor/interfaces/LayerRegistry.md)<[`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`>>\[]

注册 layer

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[layers](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#layers)

***

### lineColor

`Optional` **lineColor**: [`LineColor`](/en/auto-docs/free-layout-editor/interfaces/LineColor.md)

Line color configuration
线条颜色

***

### materials

`Optional` **materials**: `MaterialsPluginOptions`

Canvas material, Used to customize react components
画布物料, 用于自定义 react 组件

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[materials](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#materials)

***

### nodeEngine

`Optional` **nodeEngine**: [`NodeCorePluginOptions`](/en/auto-docs/free-layout-editor/interfaces/NodeCorePluginOptions.md) & { `createDefaultFormMeta?`: (`node`: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)) => `FormMetaOrFormMetaGenerator` ; `enable?`: `boolean`  }

Node engine configuration

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[nodeEngine](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#nodeengine)

***

### nodeRegistries

`Optional` **nodeRegistries**: [`WorkflowNodeRegistry`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md)\[]

Node registries
节点注册

#### Overrides

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[nodeRegistries](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#noderegistries)

***

### onAllLayersRendered

`Optional` **onAllLayersRendered**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md)) => `void`

#### Type declaration

(`ctx`): `void`

画布所有 layer 第一次渲染完成后触发

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |

##### Returns

`void`

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[onAllLayersRendered](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#onalllayersrendered)

***

### onBind

`Optional` **onBind**: (`bindConfig`: [`PluginBindConfig`](/en/auto-docs/free-layout-editor/interfaces/PluginBindConfig.md)) => `void`

#### Type declaration

(`bindConfig`): `void`

插件 IOC 注册，等价于 containerModule

##### Parameters

| Name | Type |
| :------ | :------ |
| `bindConfig` | [`PluginBindConfig`](/en/auto-docs/free-layout-editor/interfaces/PluginBindConfig.md) |

##### Returns

`void`

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[onBind](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#onbind)

***

### onContentChange

`Optional` **onContentChange**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `event`: [`WorkflowContentChangeEvent`](/en/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md)) => `void`

#### Type declaration

(`ctx`, `event`): `void`

Listen for content change
监听画布内容更新

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `event` | [`WorkflowContentChangeEvent`](/en/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md) |

##### Returns

`void`

***

### onDispose

`Optional` **onDispose**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md)) => `void`

#### Type declaration

(`ctx`): `void`

画布销毁阶段

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |

##### Returns

`void`

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[onDispose](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#ondispose)

***

### onDragLineEnd

`Optional` **onDragLineEnd**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `params`: [`onDragLineEndParams`](/en/auto-docs/free-layout-editor/types/onDragLineEndParams.md)) => `Promise`<`void`>

#### Type declaration

(`ctx`, `params`): `Promise`<`void`>

Listen for dragging the line to end
拖拽线条结束

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `params` | [`onDragLineEndParams`](/en/auto-docs/free-layout-editor/types/onDragLineEndParams.md) |

##### Returns

`Promise`<`void`>

***

### onInit

`Optional` **onInit**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md)) => `void`

#### Type declaration

(`ctx`): `void`

画布模块注册阶段

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |

##### Returns

`void`

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[onInit](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#oninit)

***

### onLoad

`Optional` **onLoad**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md)) => `void`

#### Type declaration

(`ctx`): `void`

画布数据加载完成, 请使用 onAllLayersRendered 替代

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |

##### Returns

`void`

**`Deprecated`**

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[onLoad](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#onload)

***

### onReady

`Optional` **onReady**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md)) => `void`

#### Type declaration

(`ctx`): `void`

画布事件注册阶段 (一般用于注册 dom 事件)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |

##### Returns

`void`

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[onReady](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#onready)

***

### parentContainer

`Optional` **parentContainer**: [`Container`](/en/auto-docs/free-layout-editor/interfaces/interfaces.Container.md)

父 IOC 容器

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[parentContainer](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#parentcontainer)

***

### playground

`Optional` **playground**: [`PlaygroundLayerOptions`](/en/auto-docs/free-layout-editor/interfaces/PlaygroundLayerOptions.md) & { `autoFocus?`: `boolean` ; `autoResize?`: `boolean`  }

画布相关配置

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[playground](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#playground)

***

### plugins

`Optional` **plugins**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md)) => [`Plugin`](/en/auto-docs/free-layout-editor/variables/Plugin-1.md)\[]

#### Type declaration

(`ctx`): [`Plugin`](/en/auto-docs/free-layout-editor/variables/Plugin-1.md)\[]

插件扩展

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |

##### Returns

[`Plugin`](/en/auto-docs/free-layout-editor/variables/Plugin-1.md)\[]

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[plugins](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#plugins)

***

### readonly

`Optional` **readonly**: `boolean`

whether it is readonly
是否为 readonly

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[readonly](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#readonly)

***

### reduxDevTool

`Optional` **reduxDevTool**: `ReduxDevToolPluginOptions`

redux devtool configuration

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[reduxDevTool](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#reduxdevtool)

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

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[scroll](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#scroll)

***

### selectBox

`Optional` **selectBox**: `SelectBoxPluginOptions`

SelectBox config
选择框定义

***

### setLineClassName

`Optional` **setLineClassName**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `line`: [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `undefined` | `string`

#### Type declaration

(`ctx`, `line`): `undefined` | `string`

Set the line className
设置线条样式

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `line` | [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

##### Returns

`undefined` | `string`

***

### setLineRenderType

`Optional` **setLineRenderType**: (`ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md), `line`: [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `undefined` | [`LineRenderType`](/en/auto-docs/free-layout-editor/types/LineRenderType.md)

#### Type declaration

(`ctx`, `line`): `undefined` | [`LineRenderType`](/en/auto-docs/free-layout-editor/types/LineRenderType.md)

Set the line renderer type
设置线条渲染器类型

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |
| `line` | [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

##### Returns

`undefined` | [`LineRenderType`](/en/auto-docs/free-layout-editor/types/LineRenderType.md)

***

### shortcuts

`Optional` **shortcuts**: (`shortcutsRegistry`: [`ShortcutsRegistry`](/en/auto-docs/free-layout-editor/classes/ShortcutsRegistry.md), `ctx`: [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md)) => `void`

#### Type declaration

(`shortcutsRegistry`, `ctx`): `void`

注册快捷键

##### Parameters

| Name | Type |
| :------ | :------ |
| `shortcutsRegistry` | [`ShortcutsRegistry`](/en/auto-docs/free-layout-editor/classes/ShortcutsRegistry.md) |
| `ctx` | [`FreeLayoutPluginContext`](/en/auto-docs/free-layout-editor/variables/FreeLayoutPluginContext-1.md) |

##### Returns

`void`

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[shortcuts](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#shortcuts)

***

### twoWayConnection

`Optional` **twoWayConnection**: `boolean`

Line support both-way connection (default true)
线条支持双向连接

***

### variableEngine

`Optional` **variableEngine**: [`VariablePluginOptions`](/en/auto-docs/free-layout-editor/interfaces/VariablePluginOptions.md)

是否开启变量引擎
Variable engine enable

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[variableEngine](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#variableengine)

## Methods

### fromNodeJSON

`Optional` **fromNodeJSON**(`node`, `json`, `isFirstCreate`): [`FlowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md)

Node data transformation, called by ctx.document.toJSON
节点数据转换, 由 ctx.document.toJSON 调用

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) | current node |
| `json` | [`FlowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) | Current node json data |
| `isFirstCreate` | `boolean` | Whether it is created for the first time, If document.fromJSON is recalled, but the node already exists, isFirstCreate is false |

#### Returns

[`FlowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md)

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[fromNodeJSON](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#fromnodejson)

***

### toNodeJSON

`Optional` **toNodeJSON**(`node`, `json`): [`FlowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md)

Node data transformation, called by ctx.document.fromJSON
节点数据转换, 由 ctx.document.fromJSON 调用

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) | current node |
| `json` | [`FlowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) | Current node json data |

#### Returns

[`FlowNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md)

#### Inherited from

[EditorProps](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md).[toNodeJSON](/en/auto-docs/free-layout-editor/interfaces/EditorProps-1.md#tonodejson)
