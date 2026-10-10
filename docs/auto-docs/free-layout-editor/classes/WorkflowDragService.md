# Class: WorkflowDragService

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/WorkflowDragService.md#constructor)

### Properties

* [isDragging](/auto-docs/free-layout-editor/classes/WorkflowDragService.md#isdragging)
* [onDragLineEventChange](/auto-docs/free-layout-editor/classes/WorkflowDragService.md#ondraglineeventchange)
* [onNodesDrag](/auto-docs/free-layout-editor/classes/WorkflowDragService.md#onnodesdrag)
* [options](/auto-docs/free-layout-editor/classes/WorkflowDragService.md#options)

### Methods

* [adjustSubNodePosition](/auto-docs/free-layout-editor/classes/WorkflowDragService.md#adjustsubnodeposition)
* [canDropToNode](/auto-docs/free-layout-editor/classes/WorkflowDragService.md#candroptonode)
* [dispose](/auto-docs/free-layout-editor/classes/WorkflowDragService.md#dispose)
* [dropCard](/auto-docs/free-layout-editor/classes/WorkflowDragService.md#dropcard)
* [init](/auto-docs/free-layout-editor/classes/WorkflowDragService.md#init)
* [onDragLineEnd](/auto-docs/free-layout-editor/classes/WorkflowDragService.md#ondraglineend)
* [registerPosAdjuster](/auto-docs/free-layout-editor/classes/WorkflowDragService.md#registerposadjuster)
* [resetLine](/auto-docs/free-layout-editor/classes/WorkflowDragService.md#resetline)
* [startDragCard](/auto-docs/free-layout-editor/classes/WorkflowDragService.md#startdragcard)
* [startDragSelectedNodes](/auto-docs/free-layout-editor/classes/WorkflowDragService.md#startdragselectednodes)
* [startDrawingLine](/auto-docs/free-layout-editor/classes/WorkflowDragService.md#startdrawingline)

## Constructors

### constructor

**new WorkflowDragService**()

## Properties

### isDragging

**isDragging**: `boolean`

***

### onDragLineEventChange

`Readonly` **onDragLineEventChange**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`LineEventProps`](/auto-docs/free-layout-editor/interfaces/LineEventProps.md)>

***

### onNodesDrag

`Readonly` **onNodesDrag**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`NodesDragEvent`](/auto-docs/free-layout-editor/types/NodesDragEvent.md)>

***

### options

`Readonly` **options**: [`WorkflowDocumentOptions`](/auto-docs/free-layout-editor/variables/WorkflowDocumentOptions-1.md)

## Methods

### adjustSubNodePosition

**adjustSubNodePosition**(`subNodeType?`, `containerNode?`, `mousePos?`): [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

如果存在容器节点，且传入鼠标坐标，需要用容器的坐标减去传入的鼠标坐标

#### Parameters

| Name | Type |
| :------ | :------ |
| `subNodeType?` | `string` |
| `containerNode?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `mousePos?` | [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md) |

#### Returns

[`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

***

### canDropToNode

**canDropToNode**(`params`): `Object`

判断是否可以放置节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.dragNode?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `params.dragNodeType?` | [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md) |
| `params.dropNode?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `params.dropNodeType?` | [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `allowDrop` | `boolean` |
| `dropNode?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `message?` | `string` |

***

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### dropCard

**dropCard**(`type`, `event`, `data?`, `parent?`): `Promise`<`undefined` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)>

通过拖入卡片添加

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` |  |
| `event` | `Object` |  |
| `event.clientX` | `number` | - |
| `event.clientY` | `number` | - |
| `data?` | `Partial`<[`WorkflowNodeJSON`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeJSON.md)> | 节点数据 |
| `parent?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) | - |

#### Returns

`Promise`<`undefined` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)>

***

### init

**init**(): `void`

#### Returns

`void`

***

### onDragLineEnd

**onDragLineEnd**(`callback`): [`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

线条拖拽结束

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`OnDragLineEnd`](/auto-docs/free-layout-editor/types/OnDragLineEnd.md) |

#### Returns

[`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

***

### registerPosAdjuster

**registerPosAdjuster**(`adjuster`): `Object`

注册位置调整

#### Parameters

| Name | Type |
| :------ | :------ |
| `adjuster` | (`params`: { `position`: [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md) ; `selectedNodes`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]  }) => [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `dispose` | () => `boolean` |

***

### resetLine

**resetLine**(`line`, `e`): `Promise`<`void`>

重新连接线条

#### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |
| `e` | `MouseEvent` |

#### Returns

`Promise`<`void`>

***

### startDragCard

**startDragCard**(`type`, `event`, `data`, `cloneNode?`): `Promise`<`undefined` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)>

拖拽卡片到画布
返回创建结果

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `event` | `MouseEvent`<`Element`, `MouseEvent`> |
| `data` | `Partial`<[`WorkflowNodeJSON`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeJSON.md)> |
| `cloneNode?` | (`e`: [`PlaygroundDragEvent`](/auto-docs/free-layout-editor/interfaces/PlaygroundDragEvent.md)) => `HTMLDivElement` |

#### Returns

`Promise`<`undefined` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)>

***

### startDragSelectedNodes

**startDragSelectedNodes**(`triggerEvent`): `Promise`<`boolean`>

拖拽选中节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `triggerEvent` | `MouseEvent` | `MouseEvent`<`Element`, `MouseEvent`> |

#### Returns

`Promise`<`boolean`>

***

### startDrawingLine

**startDrawingLine**(`port`, `event`, `originLine?`): `Promise`<{ `dragSuccess?`: `boolean` ; `newLine?`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)  }>

绘制线条

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |
| `event` | `Object` |
| `event.clientX` | `number` |
| `event.clientY` | `number` |
| `originLine?` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

#### Returns

`Promise`<{ `dragSuccess?`: `boolean` ; `newLine?`: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)  }>
