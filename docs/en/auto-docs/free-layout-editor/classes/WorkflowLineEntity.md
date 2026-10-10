# Class: WorkflowLineEntity

线条

## Hierarchy

* [`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`WorkflowLineEntityOpts`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md)>

  ↳ **`WorkflowLineEntity`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#__opts_type__)
* [document](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#document)
* [entityManager](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#entitymanager)
* [info](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#info)
* [isDrawing](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#isdrawing)
* [linesManager](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#linesmanager)
* [onDataChange](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#ondatachange)
* [onEntityChange](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#onentitychange)
* [onLineDataChange](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#onlinedatachange)
* [preDispose](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#predispose)
* [stackIndex](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#stackindex)
* [toDispose](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#todispose)
* [type](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#type)

### Accessors

* [bounds](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#bounds)
* [center](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#center)
* [className](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#classname)
* [color](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#color)
* [context](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#context)
* [disabled](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#disabled)
* [disposed](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#disposed)
* [drawingFrom](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#drawingfrom)
* [drawingTo](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#drawingto)
* [flowing](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#flowing)
* [from](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#from)
* [fromPort](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#fromport)
* [hasError](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#haserror)
* [hideArrow](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#hidearrow)
* [highlightColor](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#highlightcolor)
* [id](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#id)
* [inContainer](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#incontainer)
* [isHidden](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#ishidden)
* [lineData](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#linedata)
* [lockedColor](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#lockedcolor)
* [node](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#node)
* [onDispose](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#ondispose)
* [position](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#position)
* [processing](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#processing)
* [renderType](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#rendertype)
* [reverse](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#reverse)
* [savedInManager](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#savedinmanager)
* [to](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#to)
* [toPort](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#toport)
* [type](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#type-1)
* [uiState](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#uistate)
* [version](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#version)
* [vertical](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#vertical)

### Methods

* [addData](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#adddata)
* [addInitializeData](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#addinitializedata)
* [canRemove](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#canremove)
* [dispose](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#dispose)
* [fireRender](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#firerender)
* [fromJSON](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#fromjson)
* [getData](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#getdata)
* [getDefaultDataRegistries](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#getdefaultdataregistries)
* [getHoverDist](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#gethoverdist)
* [getService](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#getservice)
* [hasData](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#hasdata)
* [is](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#is)
* [removeData](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#removedata)
* [reset](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#reset)
* [setFromPort](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#setfromport)
* [setToPort](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#settoport)
* [toJSON](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#tojson)
* [updateData](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#updatedata)
* [updateUIState](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#updateuistate)
* [validate](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#validate)
* [portInfoToLineId](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md#portinfotolineid)

## Constructors

### constructor

**new WorkflowLineEntity**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`WorkflowLineEntityOpts`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md) |

#### Overrides

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[constructor](/en/auto-docs/free-layout-editor/classes/Entity-1.md#constructor)

## Properties

### \_\_opts\_type\_\_

**\_\_opts\_type\_\_**: [`WorkflowLineEntityOpts`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md)

#### Inherited from

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[**opts\_type**](/en/auto-docs/free-layout-editor/classes/Entity-1.md#__opts_type__)

***

### document

`Readonly` **document**: [`WorkflowDocument`](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/en/auto-docs/free-layout-editor/classes/EntityManager.md)

全局的entity管理器

#### Inherited from

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[entityManager](/en/auto-docs/free-layout-editor/classes/Entity-1.md#entitymanager)

***

### info

**info**: [`WorkflowLineInfo`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineInfo.md)

线条数据

***

### isDrawing

`Readonly` **isDrawing**: `boolean`

***

### linesManager

`Readonly` **linesManager**: [`WorkflowLinesManager`](/en/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityDataChangedEvent`](/en/auto-docs/free-layout-editor/interfaces/EntityDataChangedEvent.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>>>

数据更改事件

#### Inherited from

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[onDataChange](/en/auto-docs/free-layout-editor/classes/Entity-1.md#ondatachange)

***

### onEntityChange

`Readonly` **onEntityChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>>

修改会触发

#### Inherited from

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[onEntityChange](/en/auto-docs/free-layout-editor/classes/Entity-1.md#onentitychange)

***

### onLineDataChange

`Readonly` **onLineDataChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<{ `newValue`: `any` ; `oldValue`: `any`  }>

***

### preDispose

`Readonly` **preDispose**: [`DisposableCollection`](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md)

销毁前事件管理

#### Inherited from

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[preDispose](/en/auto-docs/free-layout-editor/classes/Entity-1.md#predispose)

***

### stackIndex

**stackIndex**: `number`

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md)

销毁事件管理

#### Inherited from

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[toDispose](/en/auto-docs/free-layout-editor/classes/Entity-1.md#todispose)

***

### type

`Static` **type**: `string`

#### Overrides

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[type](/en/auto-docs/free-layout-editor/classes/Entity-1.md#type)

## Accessors

### bounds

`get` **bounds**(): [`Rectangle`](/en/auto-docs/free-layout-editor/classes/Rectangle-1.md)

获取线条的边框位置大小

#### Returns

[`Rectangle`](/en/auto-docs/free-layout-editor/classes/Rectangle-1.md)

***

### center

`get` **center**(): [`LineCenterPoint`](/en/auto-docs/free-layout-editor/interfaces/LineCenterPoint.md)

#### Returns

[`LineCenterPoint`](/en/auto-docs/free-layout-editor/interfaces/LineCenterPoint.md)

***

### className

`get` **className**(): `string`

获取线条样式

#### Returns

`string`

***

### color

`get` **color**(): `undefined` | `string`

#### Returns

`undefined` | `string`

***

### context

`get` **context**(): `any`

#### Returns

`any`

#### Inherited from

Entity.context

***

### disabled

`get` **disabled**(): `boolean`

是否禁用

#### Returns

`boolean`

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Entity.disposed

***

### drawingFrom

`get` **drawingFrom**(): `undefined` | [`LinePoint`](/en/auto-docs/free-layout-editor/interfaces/LinePoint.md)

#### Returns

`undefined` | [`LinePoint`](/en/auto-docs/free-layout-editor/interfaces/LinePoint.md)

`set` **drawingFrom**(`pos`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | `undefined` | [`LinePoint`](/en/auto-docs/free-layout-editor/interfaces/LinePoint.md) |

#### Returns

`void`

***

### drawingTo

`get` **drawingTo**(): `undefined` | [`LinePoint`](/en/auto-docs/free-layout-editor/interfaces/LinePoint.md)

获取线条正在画线的位置

#### Returns

`undefined` | [`LinePoint`](/en/auto-docs/free-layout-editor/interfaces/LinePoint.md)

`set` **drawingTo**(`pos`): `void`

设置线条画线时的目标位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | `undefined` | [`LinePoint`](/en/auto-docs/free-layout-editor/interfaces/LinePoint.md) |

#### Returns

`void`

***

### flowing

`get` **flowing**(): `boolean`

是否流动

#### Returns

`boolean`

`set` **flowing**(`flowing`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `flowing` | `boolean` |

#### Returns

`void`

***

### from

`get` **from**(): `undefined` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

获取线条的前置节点

#### Returns

`undefined` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

***

### fromPort

`get` **fromPort**(): `undefined` | [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)

#### Returns

`undefined` | [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)

***

### hasError

`get` **hasError**(): `boolean`

#### Returns

`boolean`

`set` **hasError**(`hasError`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hasError` | `boolean` |

#### Returns

`void`

***

### hideArrow

`get` **hideArrow**(): `boolean`

是否隐藏箭头

#### Returns

`boolean`

***

### highlightColor

`get` **highlightColor**(): `string`

#### Returns

`string`

`set` **highlightColor**(`highlightColor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `highlightColor` | `string` |

#### Returns

`void`

***

### id

`get` **id**(): `string`

实体 id

#### Returns

`string`

#### Inherited from

Entity.id

***

### inContainer

`get` **inContainer**(): `boolean`

#### Returns

`boolean`

***

### isHidden

`get` **isHidden**(): `boolean`

#### Returns

`boolean`

***

### lineData

`get` **lineData**(): `any`

线条的扩展数据

#### Returns

`any`

`set` **lineData**(`newValue`): `void`

更新线条扩展数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `newValue` | `any` |

#### Returns

`void`

***

### lockedColor

`get` **lockedColor**(): `string`

#### Returns

`string`

`set` **lockedColor**(`lockedColor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lockedColor` | `string` |

#### Returns

`void`

***

### node

`get` **node**(): `HTMLDivElement`

#### Returns

`HTMLDivElement`

***

### onDispose

`get` **onDispose**(): [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

销毁事件

#### Returns

[`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Inherited from

Entity.onDispose

***

### position

`get` **position**(): [`LinePosition`](/en/auto-docs/free-layout-editor/interfaces/LinePosition.md)

获取线条真实的输入输出节点坐标

#### Returns

[`LinePosition`](/en/auto-docs/free-layout-editor/interfaces/LinePosition.md)

***

### processing

`get` **processing**(): `boolean`

获取是否 testrun processing

#### Returns

`boolean`

**`Deprecated`**

use `flowing` instead

`set` **processing**(`status`): `void`

设置 testrun processing 状态

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | `boolean` |

#### Returns

`void`

**`Deprecated`**

use `flowing` instead

***

### renderType

`get` **renderType**(): `undefined` | [`LineRenderType`](/en/auto-docs/free-layout-editor/types/LineRenderType.md)

获取线条渲染器类型

#### Returns

`undefined` | [`LineRenderType`](/en/auto-docs/free-layout-editor/types/LineRenderType.md)

***

### reverse

`get` **reverse**(): `boolean`

是否反转箭头

#### Returns

`boolean`

***

### savedInManager

`get` **savedInManager**(): `boolean`

是否存到全局 manager，默认 true

#### Returns

`boolean`

#### Inherited from

Entity.savedInManager

***

### to

`get` **to**(): `undefined` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

获取线条的后置节点

#### Returns

`undefined` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

***

### toPort

`get` **toPort**(): `undefined` | [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)

#### Returns

`undefined` | [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)

***

### type

`get` **type**(): `string`

实体类型

#### Returns

`string`

#### Inherited from

Entity.type

***

### uiState

`get` **uiState**(): [`WorkflowLineUIState`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineUIState.md)

线条的 UI 状态

#### Returns

[`WorkflowLineUIState`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineUIState.md)

***

### version

`get` **version**(): `number`

实体的版本

#### Returns

`number`

#### Inherited from

Entity.version

***

### vertical

`get` **vertical**(): `boolean`

#### Returns

`boolean`

**`Deprecated`**

## Methods

### addData

**addData**<`D`>(`Registry`, `defaultProps?`): `D`

添加数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>> |
| `defaultProps?` | [`EntityDataProps`](/en/auto-docs/free-layout-editor/types/EntityDataProps.md)<`D`> |

#### Returns

`D`

#### Inherited from

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[addData](/en/auto-docs/free-layout-editor/classes/Entity-1.md#adddata)

***

### addInitializeData

**addInitializeData**(`datas`, `dataConfig?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `datas` | [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>\[] |
| `dataConfig?` | `any` |

#### Returns

`void`

#### Inherited from

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[addInitializeData](/en/auto-docs/free-layout-editor/classes/Entity-1.md#addinitializedata)

***

### canRemove

**canRemove**(`newLineInfo?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newLineInfo?` | `Required`<[`WorkflowLinePortInfo`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md)> |

#### Returns

`boolean`

***

### dispose

**dispose**(): `void`

销毁实体

#### Returns

`void`

#### Inherited from

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[dispose](/en/auto-docs/free-layout-editor/classes/Entity-1.md#dispose)

***

### fireRender

**fireRender**(): `void`

触发线条渲染

#### Returns

`void`

***

### fromJSON

**fromJSON**(`data?`): `void`

还原数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `data?` | `any` |

#### Returns

`void`

#### Inherited from

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[fromJSON](/en/auto-docs/free-layout-editor/classes/Entity-1.md#fromjson)

***

### getData

**getData**<`D`>(`Registry`): `D`

获取 data 数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`D`

#### Inherited from

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[getData](/en/auto-docs/free-layout-editor/classes/Entity-1.md#getdata)

***

### getDefaultDataRegistries

**getDefaultDataRegistries**(): [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>\[]

默认初始化的 Data

#### Returns

[`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>\[]

#### Inherited from

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[getDefaultDataRegistries](/en/auto-docs/free-layout-editor/classes/Entity-1.md#getdefaultdataregistries)

***

### getHoverDist

**getHoverDist**(`pos`): `number`

获取点和线最接近的距离

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | [`IPoint`](/en/auto-docs/free-layout-editor/interfaces/IPoint.md) |

#### Returns

`number`

***

### getService

**getService**<`T`>(`identifier`): `T`

获取 IOC 服务

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | [`ServiceIdentifier`](/en/auto-docs/free-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`

#### Inherited from

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[getService](/en/auto-docs/free-layout-editor/classes/Entity-1.md#getservice)

***

### hasData

**hasData**(`Registry`): `boolean`

是否有指定数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>> |

#### Returns

`boolean`

#### Inherited from

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[hasData](/en/auto-docs/free-layout-editor/classes/Entity-1.md#hasdata)

***

### is

**is**(`line`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) | [`WorkflowLinePortInfo`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md) |

#### Returns

`boolean`

***

### removeData

**removeData**<`D`>(`Registry`): `void`

删除数据，初始化状态注入的数据无法被删除

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`void`

#### Inherited from

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[removeData](/en/auto-docs/free-layout-editor/classes/Entity-1.md#removedata)

***

### reset

**reset**(): `void`

重制为初始化状态

#### Returns

`void`

#### Inherited from

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[reset](/en/auto-docs/free-layout-editor/classes/Entity-1.md#reset)

***

### setFromPort

**setFromPort**(`fromPort?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromPort?` | [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |

#### Returns

`void`

***

### setToPort

**setToPort**(`toPort?`): `void`

设置线条的后置节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `toPort?` | [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |

#### Returns

`void`

***

### toJSON

**toJSON**(): [`WorkflowEdgeJSON`](/en/auto-docs/free-layout-editor/interfaces/WorkflowEdgeJSON.md)

存储数据，用于持久化存储

#### Returns

[`WorkflowEdgeJSON`](/en/auto-docs/free-layout-editor/interfaces/WorkflowEdgeJSON.md)

#### Overrides

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[toJSON](/en/auto-docs/free-layout-editor/classes/Entity-1.md#tojson)

***

### updateData

**updateData**<`D`>(`Registry`, `props`): `void`

更新实体的数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<`D`> |
| `props` | [`EntityDataProps`](/en/auto-docs/free-layout-editor/types/EntityDataProps.md)<`D`> |

#### Returns

`void`

#### Inherited from

[Entity](/en/auto-docs/free-layout-editor/classes/Entity-1.md).[updateData](/en/auto-docs/free-layout-editor/classes/Entity-1.md#updatedata)

***

### updateUIState

**updateUIState**(`newState`): `void`

更新线条的 ui 状态

#### Parameters

| Name | Type |
| :------ | :------ |
| `newState` | `Partial`<[`WorkflowLineUIState`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineUIState.md)> |

#### Returns

`void`

***

### validate

**validate**(): `void`

#### Returns

`void`

***

### portInfoToLineId

`Static` **portInfoToLineId**(`info`): `string`

转成线条 id

#### Parameters

| Name | Type |
| :------ | :------ |
| `info` | [`WorkflowLinePortInfo`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md) |

#### Returns

`string`
