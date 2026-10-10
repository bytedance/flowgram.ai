# Interface: WorkflowDocumentOptions

线条配置

## Hierarchy

* [`FlowDocumentOptions`](/auto-docs/free-layout-editor/variables/FlowDocumentOptions-1.md)

  ↳ **`WorkflowDocumentOptions`**

## Table of contents

### Properties

* [allNodesDefaultExpanded](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#allnodesdefaultexpanded)
* [canAddLine](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#canaddline)
* [canDeleteLine](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#candeleteline)
* [canDeleteNode](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#candeletenode)
* [canDropToNode](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#candroptonode)
* [canResetLine](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#canresetline)
* [constants](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#constants)
* [cursors](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#cursors)
* [defaultLayout](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#defaultlayout)
* [enableReadonlyNodeDragging](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#enablereadonlynodedragging)
* [formatNodeLabels](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#formatnodelabels)
* [formatNodeLines](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#formatnodelines)
* [getNodeDefaultRegistry](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#getnodedefaultregistry)
* [isDisabledLine](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#isdisabledline)
* [isDisabledPort](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#isdisabledport)
* [isErrorLine](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#iserrorline)
* [isErrorPort](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#iserrorport)
* [isFlowingLine](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#isflowingline)
* [isHideArrowLine](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#ishidearrowline)
* [isReverseLine](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#isreverseline)
* [lineColor](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#linecolor)
* [onDragLineEnd](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#ondraglineend)
* [preNodeCreate](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#prenodecreate)
* [setLineClassName](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#setlineclassname)
* [setLineRenderType](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#setlinerendertype)
* [twoWayConnection](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#twowayconnection)

### Methods

* [fromNodeJSON](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#fromnodejson)
* [toNodeJSON](/auto-docs/free-layout-editor/interfaces/WorkflowDocumentOptions.md#tonodejson)

## Properties

### allNodesDefaultExpanded

`Optional` **allNodesDefaultExpanded**: `boolean`

所有节点的默认展开状态

#### Inherited from

FlowDocumentOptions.allNodesDefaultExpanded

***

### canAddLine

`Optional` **canAddLine**: (`fromPort`: [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md), `toPort`: [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md), `lines`: [`WorkflowLinesManager`](/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md), `silent?`: `boolean`) => `boolean`

#### Type declaration

(`fromPort`, `toPort`, `lines`, `silent?`): `boolean`

能否添加线条

##### Parameters

| Name | Type |
| :------ | :------ |
| `fromPort` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |
| `toPort` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |
| `lines` | [`WorkflowLinesManager`](/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md) |
| `silent?` | `boolean` |

##### Returns

`boolean`

***

### canDeleteLine

`Optional` **canDeleteLine**: (`line`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md), `newLineInfo?`: `Required`<`Omit`<[`WorkflowLinePortInfo`](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md), `"data"`>>, `silent?`: `boolean`) => `boolean`

#### Type declaration

(`line`, `newLineInfo?`, `silent?`): `boolean`

能否删除线条

##### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |
| `newLineInfo?` | `Required`<`Omit`<[`WorkflowLinePortInfo`](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md), `"data"`>> |
| `silent?` | `boolean` |

##### Returns

`boolean`

***

### canDeleteNode

`Optional` **canDeleteNode**: (`node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md), `silent?`: `boolean`) => `boolean`

#### Type declaration

(`node`, `silent?`): `boolean`

能否删除节点

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `silent?` | `boolean` |

##### Returns

`boolean`

***

### canDropToNode

`Optional` **canDropToNode**: (`params`: { `dragNode?`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) ; `dragNodeType?`: [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md) ; `dropNode?`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) ; `dropNodeType?`: [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md)  }) => `boolean`

#### Type declaration

(`params`): `boolean`

是否允许拖入子画布 (loop or group)
Whether to allow dragging into the sub-canvas (loop or group)

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.dragNode?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `params.dragNodeType?` | [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md) |
| `params.dropNode?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `params.dropNodeType?` | [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md) |

##### Returns

`boolean`

***

### canResetLine

`Optional` **canResetLine**: (`oldLine`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md), `newLineInfo`: `Required`<[`WorkflowLinePortInfo`](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md)>, `lines`: [`WorkflowLinesManager`](/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md)) => `boolean`

#### Type declaration

(`oldLine`, `newLineInfo`, `lines`): `boolean`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `oldLine` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) | - |
| `newLineInfo` | `Required`<[`WorkflowLinePortInfo`](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md)> | - |
| `lines` | [`WorkflowLinesManager`](/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md) | 线条管理器 |

##### Returns

`boolean`

***

### constants

`Optional` **constants**: `Record`<`string`, `any`>

#### Inherited from

FlowDocumentOptions.constants

***

### cursors

`Optional` **cursors**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `grab?` | `string` |
| `grabbing?` | `string` |

***

### defaultLayout

`Optional` **defaultLayout**: `string`

布局，默认 垂直布局

#### Inherited from

FlowDocumentOptions.defaultLayout

***

### enableReadonlyNodeDragging

`Optional` **enableReadonlyNodeDragging**: `boolean`

允许拖拽只读节点

***

### formatNodeLabels

`Optional` **formatNodeLabels**: (`node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md), `lines`: [`FlowTransitionLabel`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLabel.md)\[]) => [`FlowTransitionLabel`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLabel.md)\[]

#### Type declaration

(`node`, `lines`): [`FlowTransitionLabel`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLabel.md)\[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `lines` | [`FlowTransitionLabel`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLabel.md)\[] |

##### Returns

[`FlowTransitionLabel`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLabel.md)\[]

#### Inherited from

FlowDocumentOptions.formatNodeLabels

***

### formatNodeLines

`Optional` **formatNodeLines**: (`node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md), `lines`: [`FlowTransitionLine`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLine.md)\[]) => [`FlowTransitionLine`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLine.md)\[]

#### Type declaration

(`node`, `lines`): [`FlowTransitionLine`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLine.md)\[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `lines` | [`FlowTransitionLine`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLine.md)\[] |

##### Returns

[`FlowTransitionLine`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLine.md)\[]

#### Inherited from

FlowDocumentOptions.formatNodeLines

***

### getNodeDefaultRegistry

`Optional` **getNodeDefaultRegistry**: (`type`: [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md)) => [`FlowNodeRegistry`](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md)>

#### Type declaration

(`type`): [`FlowNodeRegistry`](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md)>

获取默认的节点配置

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md) |

##### Returns

[`FlowNodeRegistry`](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md)>

#### Inherited from

FlowDocumentOptions.getNodeDefaultRegistry

***

### isDisabledLine

`Optional` **isDisabledLine**: (`line`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `boolean`

#### Type declaration

(`line`): `boolean`

是否禁用线条

##### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

##### Returns

`boolean`

***

### isDisabledPort

`Optional` **isDisabledPort**: (`port`: [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)) => `boolean`

#### Type declaration

(`port`): `boolean`

是否禁用端口

##### Parameters

| Name | Type |
| :------ | :------ |
| `port` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |

##### Returns

`boolean`

***

### isErrorLine

`Optional` **isErrorLine**: (`fromPort`: `undefined` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md), `toPort`: `undefined` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md), `lines`: [`WorkflowLinesManager`](/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md)) => `boolean`

#### Type declaration

(`fromPort`, `toPort`, `lines`): `boolean`

是否显示错误线条

##### Parameters

| Name | Type |
| :------ | :------ |
| `fromPort` | `undefined` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |
| `toPort` | `undefined` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |
| `lines` | [`WorkflowLinesManager`](/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md) |

##### Returns

`boolean`

***

### isErrorPort

`Optional` **isErrorPort**: (`port`: [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)) => `boolean`

#### Type declaration

(`port`): `boolean`

是否错误端口

##### Parameters

| Name | Type |
| :------ | :------ |
| `port` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |

##### Returns

`boolean`

***

### isFlowingLine

`Optional` **isFlowingLine**: (`line`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `boolean`

#### Type declaration

(`line`): `boolean`

是否流动线条

##### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

##### Returns

`boolean`

***

### isHideArrowLine

`Optional` **isHideArrowLine**: (`line`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `boolean`

#### Type declaration

(`line`): `boolean`

是否隐藏线条箭头

##### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

##### Returns

`boolean`

***

### isReverseLine

`Optional` **isReverseLine**: (`line`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `boolean`

#### Type declaration

(`line`): `boolean`

是否反转线条箭头

##### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

##### Returns

`boolean`

***

### lineColor

`Optional` **lineColor**: `Partial`<[`LineColor`](/auto-docs/free-layout-editor/interfaces/LineColor.md)>

线条颜色

***

### onDragLineEnd

`Optional` **onDragLineEnd**: (`params`: [`onDragLineEndParams`](/auto-docs/free-layout-editor/types/onDragLineEndParams.md)) => `Promise`<`void`>

#### Type declaration

(`params`): `Promise`<`void`>

拖拽线条结束

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`onDragLineEndParams`](/auto-docs/free-layout-editor/types/onDragLineEndParams.md) |

##### Returns

`Promise`<`void`>

***

### preNodeCreate

`Optional` **preNodeCreate**: (`node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)) => `void`

#### Type declaration

(`node`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

##### Returns

`void`

#### Inherited from

FlowDocumentOptions.preNodeCreate

***

### setLineClassName

`Optional` **setLineClassName**: (`line`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `undefined` | `string`

#### Type declaration

(`line`): `undefined` | `string`

设置线条样式

##### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

##### Returns

`undefined` | `string`

***

### setLineRenderType

`Optional` **setLineRenderType**: (`line`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)) => `undefined` | [`LineRenderType`](/auto-docs/free-layout-editor/types/LineRenderType.md)

#### Type declaration

(`line`): `undefined` | [`LineRenderType`](/auto-docs/free-layout-editor/types/LineRenderType.md)

获取线条渲染器

##### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

##### Returns

`undefined` | [`LineRenderType`](/auto-docs/free-layout-editor/types/LineRenderType.md)

***

### twoWayConnection

`Optional` **twoWayConnection**: `boolean`

双向连接

## Methods

### fromNodeJSON

`Optional` **fromNodeJSON**(`node`, `json`, `isFirstCreate`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `json` | [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) |
| `isFirstCreate` | `boolean` |

#### Returns

`void`

#### Inherited from

FlowDocumentOptions.fromNodeJSON

***

### toNodeJSON

`Optional` **toNodeJSON**(`node`): [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

[`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md)

#### Inherited from

FlowDocumentOptions.toNodeJSON
