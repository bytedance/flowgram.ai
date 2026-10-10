# Class: WorkflowPortEntity

Port 抽象的 Entity

## Hierarchy

* [`Entity`](/auto-docs/free-layout-editor/classes/Entity-1.md)<[`WorkflowPortEntityOpts`](/auto-docs/free-layout-editor/interfaces/WorkflowPortEntityOpts.md)>

  ↳ **`WorkflowPortEntity`**

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#__opts_type__)
* [entityManager](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#entitymanager)
* [node](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#node)
* [onDataChange](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#ondatachange)
* [onEntityChange](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#onentitychange)
* [onErrorChanged](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#onerrorchanged)
* [portID](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#portid)
* [portType](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#porttype)
* [preDispose](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#predispose)
* [targetElement](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#targetelement)
* [toDispose](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#todispose)
* [type](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#type)

### Accessors

* [allLines](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#alllines)
* [availableLines](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#availablelines)
* [bounds](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#bounds)
* [context](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#context)
* [disabled](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#disabled)
* [disposed](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#disposed)
* [hasError](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#haserror)
* [id](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#id)
* [lines](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#lines)
* [location](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#location)
* [onDispose](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#ondispose)
* [point](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#point)
* [position](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#position)
* [relativePosition](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#relativeposition)
* [savedInManager](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#savedinmanager)
* [type](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#type-1)
* [version](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#version)

### Methods

* [addData](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#adddata)
* [addInitializeData](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#addinitializedata)
* [dispose](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#dispose)
* [fromJSON](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#fromjson)
* [getData](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#getdata)
* [getDefaultDataRegistries](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#getdefaultdataregistries)
* [getService](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#getservice)
* [hasData](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#hasdata)
* [isErrorPort](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#iserrorport)
* [isHovered](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#ishovered)
* [removeData](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#removedata)
* [reset](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#reset)
* [toJSON](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#tojson)
* [update](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#update)
* [updateData](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#updatedata)
* [updateTargetElement](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#updatetargetelement)
* [validate](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#validate)
* [getPortEntityId](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md#getportentityid)

## Constructors

### constructor

**new WorkflowPortEntity**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`WorkflowPortEntityOpts`](/auto-docs/free-layout-editor/interfaces/WorkflowPortEntityOpts.md) |

#### Overrides

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[constructor](/auto-docs/free-layout-editor/classes/Entity-1.md#constructor)

## Properties

### \_\_opts\_type\_\_

**\_\_opts\_type\_\_**: [`WorkflowPortEntityOpts`](/auto-docs/free-layout-editor/interfaces/WorkflowPortEntityOpts.md)

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[**opts\_type**](/auto-docs/free-layout-editor/classes/Entity-1.md#__opts_type__)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/auto-docs/free-layout-editor/classes/EntityManager.md)

全局的entity管理器

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[entityManager](/auto-docs/free-layout-editor/classes/Entity-1.md#entitymanager)

***

### node

`Readonly` **node**: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityDataChangedEvent`](/auto-docs/free-layout-editor/interfaces/EntityDataChangedEvent.md)<[`Entity`](/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>>>

数据更改事件

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[onDataChange](/auto-docs/free-layout-editor/classes/Entity-1.md#ondatachange)

***

### onEntityChange

`Readonly` **onEntityChange**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`Entity`](/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>>

修改会触发

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[onEntityChange](/auto-docs/free-layout-editor/classes/Entity-1.md#onentitychange)

***

### onErrorChanged

**onErrorChanged**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

***

### portID

`Readonly` **portID**: `string` | `number`

***

### portType

`Readonly` **portType**: [`WorkflowPortType`](/auto-docs/free-layout-editor/types/WorkflowPortType.md)

***

### preDispose

`Readonly` **preDispose**: [`DisposableCollection`](/auto-docs/free-layout-editor/classes/DisposableCollection.md)

销毁前事件管理

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[preDispose](/auto-docs/free-layout-editor/classes/Entity-1.md#predispose)

***

### targetElement

`Optional` **targetElement**: `HTMLElement`

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/free-layout-editor/classes/DisposableCollection.md)

销毁事件管理

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[toDispose](/auto-docs/free-layout-editor/classes/Entity-1.md#todispose)

***

### type

`Static` **type**: `string`

#### Overrides

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[type](/auto-docs/free-layout-editor/classes/Entity-1.md#type)

## Accessors

### allLines

`get` **allLines**(): [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

当前点位上连接的线条（包含 isDrawing === true 的线条）

#### Returns

[`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

***

### availableLines

`get` **availableLines**(): [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

当前有效的线条，不包含正在画的线条和隐藏的线条（这个出现在线条重连会先把原来的线条隐藏）

#### Returns

[`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

***

### bounds

`get` **bounds**(): [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

端口热区

#### Returns

[`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

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

是否被禁用

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

### id

`get` **id**(): `string`

实体 id

#### Returns

`string`

#### Inherited from

Entity.id

***

### lines

`get` **lines**(): [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

当前点位上连接的线条

#### Returns

[`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

**`Deprecated`**

use `availableLines` instead

***

### location

`get` **location**(): [`LinePointLocation`](/auto-docs/free-layout-editor/types/LinePointLocation.md)

#### Returns

[`LinePointLocation`](/auto-docs/free-layout-editor/types/LinePointLocation.md)

***

### onDispose

`get` **onDispose**(): [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

销毁事件

#### Returns

[`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Inherited from

Entity.onDispose

***

### point

`get` **point**(): [`LinePoint`](/auto-docs/free-layout-editor/interfaces/LinePoint.md)

#### Returns

[`LinePoint`](/auto-docs/free-layout-editor/interfaces/LinePoint.md)

***

### position

`get` **position**(): `undefined` | [`LinePointLocation`](/auto-docs/free-layout-editor/types/LinePointLocation.md)

#### Returns

`undefined` | [`LinePointLocation`](/auto-docs/free-layout-editor/types/LinePointLocation.md)

***

### relativePosition

`get` **relativePosition**(): [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

相对节点左上角的位置

#### Returns

[`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

***

### savedInManager

`get` **savedInManager**(): `boolean`

是否存到全局 manager，默认 true

#### Returns

`boolean`

#### Inherited from

Entity.savedInManager

***

### type

`get` **type**(): `string`

实体类型

#### Returns

`string`

#### Inherited from

Entity.type

***

### version

`get` **version**(): `number`

实体的版本

#### Returns

`number`

#### Inherited from

Entity.version

## Methods

### addData

**addData**<`D`>(`Registry`, `defaultProps?`): `D`

添加数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>> |
| `defaultProps?` | [`EntityDataProps`](/auto-docs/free-layout-editor/types/EntityDataProps.md)<`D`> |

#### Returns

`D`

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[addData](/auto-docs/free-layout-editor/classes/Entity-1.md#adddata)

***

### addInitializeData

**addInitializeData**(`datas`, `dataConfig?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `datas` | [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>\[] |
| `dataConfig?` | `any` |

#### Returns

`void`

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[addInitializeData](/auto-docs/free-layout-editor/classes/Entity-1.md#addinitializedata)

***

### dispose

**dispose**(): `void`

销毁实体

#### Returns

`void`

#### Overrides

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[dispose](/auto-docs/free-layout-editor/classes/Entity-1.md#dispose)

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

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[fromJSON](/auto-docs/free-layout-editor/classes/Entity-1.md#fromjson)

***

### getData

**getData**<`D`>(`Registry`): `D`

获取 data 数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`D`

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[getData](/auto-docs/free-layout-editor/classes/Entity-1.md#getdata)

***

### getDefaultDataRegistries

**getDefaultDataRegistries**(): [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>\[]

默认初始化的 Data

#### Returns

[`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>\[]

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[getDefaultDataRegistries](/auto-docs/free-layout-editor/classes/Entity-1.md#getdefaultdataregistries)

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
| `identifier` | [`ServiceIdentifier`](/auto-docs/free-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[getService](/auto-docs/free-layout-editor/classes/Entity-1.md#getservice)

***

### hasData

**hasData**(`Registry`): `boolean`

是否有指定数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>> |

#### Returns

`boolean`

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[hasData](/auto-docs/free-layout-editor/classes/Entity-1.md#hasdata)

***

### isErrorPort

**isErrorPort**(): `boolean`

#### Returns

`boolean`

***

### isHovered

**isHovered**(`x`, `y`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

`boolean`

***

### removeData

**removeData**<`D`>(`Registry`): `void`

删除数据，初始化状态注入的数据无法被删除

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`void`

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[removeData](/auto-docs/free-layout-editor/classes/Entity-1.md#removedata)

***

### reset

**reset**(): `void`

重制为初始化状态

#### Returns

`void`

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[reset](/auto-docs/free-layout-editor/classes/Entity-1.md#reset)

***

### toJSON

**toJSON**(): `any`

存储数据，用于持久化存储

#### Returns

`any`

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[toJSON](/auto-docs/free-layout-editor/classes/Entity-1.md#tojson)

***

### update

**update**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`WorkflowPort`](/auto-docs/free-layout-editor/interfaces/WorkflowPort.md) |

#### Returns

`void`

***

### updateData

**updateData**<`D`>(`Registry`, `props`): `void`

更新实体的数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<`D`> |
| `props` | [`EntityDataProps`](/auto-docs/free-layout-editor/types/EntityDataProps.md)<`D`> |

#### Returns

`void`

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[updateData](/auto-docs/free-layout-editor/classes/Entity-1.md#updatedata)

***

### updateTargetElement

**updateTargetElement**(`el?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el?` | `HTMLElement` |

#### Returns

`void`

***

### validate

**validate**(): `void`

#### Returns

`void`

***

### getPortEntityId

`Static` **getPortEntityId**(`node`, `portType`, `portID?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `portType` | [`WorkflowPortType`](/auto-docs/free-layout-editor/types/WorkflowPortType.md) |
| `portID?` | `string` | `number` |

#### Returns

`string`
