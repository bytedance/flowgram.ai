# Class: FlowRendererStateEntity

渲染相关的全局状态管理

## Hierarchy

* [`ConfigEntity`](/en/auto-docs/editor/classes/ConfigEntity.md)<`FlowRendererState`, `FlowRendererStateEntityConfig`>

  ↳ **`FlowRendererStateEntity`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#__opts_type__)
* [entityManager](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#entitymanager)
* [onDataChange](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#ondatachange)
* [onEntityChange](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#onentitychange)
* [preDispose](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#predispose)
* [toDispose](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#todispose)
* [type](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#type)

### Accessors

* [config](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#config)
* [context](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#context)
* [disposed](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#disposed)
* [dragging](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#dragging)
* [id](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#id)
* [isBranch](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#isbranch)
* [onDispose](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#ondispose)
* [savedInManager](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#savedinmanager)
* [type](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#type-1)
* [version](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#version)

### Methods

* [addData](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#adddata)
* [addInitializeData](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#addinitializedata)
* [checkChanged](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#checkchanged)
* [dispose](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#dispose)
* [fromJSON](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#fromjson)
* [getData](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#getdata)
* [getDefaultConfig](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#getdefaultconfig)
* [getDefaultDataRegistries](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#getdefaultdataregistries)
* [getDragEntities](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#getdragentities)
* [getDragLabelSide](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#getdraglabelside)
* [getDragStartEntity](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#getdragstartentity)
* [getNodeDroppingId](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#getnodedroppingid)
* [getNodeHovered](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#getnodehovered)
* [getService](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#getservice)
* [hasData](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#hasdata)
* [onConfigChanged](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#onconfigchanged)
* [onNodeHoveredChange](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#onnodehoveredchange)
* [removeData](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#removedata)
* [reset](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#reset)
* [setDragEntities](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#setdragentities)
* [setDragLabelSide](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#setdraglabelside)
* [setDragStartEntity](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#setdragstartentity)
* [setDragging](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#setdragging)
* [setIsBranch](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#setisbranch)
* [setNodeDroppingId](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#setnodedroppingid)
* [setNodeHovered](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#setnodehovered)
* [toJSON](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#tojson)
* [updateConfig](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#updateconfig)
* [updateData](/en/auto-docs/editor/classes/FlowRendererStateEntity.md#updatedata)

## Constructors

### constructor

**new FlowRendererStateEntity**(`conf`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `conf` | `FlowRendererStateEntityConfig` |

#### Overrides

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[constructor](/en/auto-docs/editor/classes/ConfigEntity.md#constructor)

## Properties

### \_\_opts\_type\_\_

**\_\_opts\_type\_\_**: `FlowRendererStateEntityConfig`

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[**opts\_type**](/en/auto-docs/editor/classes/ConfigEntity.md#__opts_type__)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/en/auto-docs/editor/classes/EntityManager.md)

全局的entity管理器

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[entityManager](/en/auto-docs/editor/classes/ConfigEntity.md#entitymanager)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<[`EntityDataChangedEvent`](/en/auto-docs/editor/interfaces/EntityDataChangedEvent.md)<[`Entity`](/en/auto-docs/editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/editor/interfaces/EntityOpts.md)>>>

数据更改事件

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[onDataChange](/en/auto-docs/editor/classes/ConfigEntity.md#ondatachange)

***

### onEntityChange

`Readonly` **onEntityChange**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<[`Entity`](/en/auto-docs/editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/editor/interfaces/EntityOpts.md)>>

修改会触发

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[onEntityChange](/en/auto-docs/editor/classes/ConfigEntity.md#onentitychange)

***

### preDispose

`Readonly` **preDispose**: [`DisposableCollection`](/en/auto-docs/editor/classes/DisposableCollection.md)

销毁前事件管理

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[preDispose](/en/auto-docs/editor/classes/ConfigEntity.md#predispose)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/editor/classes/DisposableCollection.md)

销毁事件管理

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[toDispose](/en/auto-docs/editor/classes/ConfigEntity.md#todispose)

***

### type

`Static` **type**: `string`

#### Overrides

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[type](/en/auto-docs/editor/classes/ConfigEntity.md#type)

## Accessors

### config

`get` **config**(): `P`

#### Returns

`P`

#### Inherited from

ConfigEntity.config

***

### context

`get` **context**(): `any`

#### Returns

`any`

#### Inherited from

ConfigEntity.context

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

ConfigEntity.disposed

***

### dragging

`get` **dragging**(): `undefined` | `boolean`

#### Returns

`undefined` | `boolean`

***

### id

`get` **id**(): `string`

实体 id

#### Returns

`string`

#### Inherited from

ConfigEntity.id

***

### isBranch

`get` **isBranch**(): `undefined` | `boolean`

#### Returns

`undefined` | `boolean`

***

### onDispose

`get` **onDispose**(): [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`void`>

销毁事件

#### Returns

[`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`void`>

#### Inherited from

ConfigEntity.onDispose

***

### savedInManager

`get` **savedInManager**(): `boolean`

是否存到全局 manager，默认 true

#### Returns

`boolean`

#### Inherited from

ConfigEntity.savedInManager

***

### type

`get` **type**(): `string`

实体类型

#### Returns

`string`

#### Inherited from

ConfigEntity.type

***

### version

`get` **version**(): `number`

实体的版本

#### Returns

`number`

#### Inherited from

ConfigEntity.version

## Methods

### addData

**addData**<`D`>(`Registry`, `defaultProps?`): `D`

添加数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/en/auto-docs/editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/editor/classes/EntityData.md)<`any`, {}>> |
| `defaultProps?` | [`EntityDataProps`](/en/auto-docs/editor/types/EntityDataProps.md)<`D`> |

#### Returns

`D`

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[addData](/en/auto-docs/editor/classes/ConfigEntity.md#adddata)

***

### addInitializeData

**addInitializeData**(`datas`, `dataConfig?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `datas` | [`EntityDataRegistry`](/en/auto-docs/editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/editor/classes/EntityData.md)<`any`, {}>>\[] |
| `dataConfig?` | `any` |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[addInitializeData](/en/auto-docs/editor/classes/ConfigEntity.md#addinitializedata)

***

### checkChanged

**checkChanged**(`oldData`, `newData`): `boolean`

判断 config 数据是否变化

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldData` | `FlowRendererState` |
| `newData` | `Partial`<`FlowRendererState`> |

#### Returns

`boolean`

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[checkChanged](/en/auto-docs/editor/classes/ConfigEntity.md#checkchanged)

***

### dispose

**dispose**(): `void`

销毁实体

#### Returns

`void`

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[dispose](/en/auto-docs/editor/classes/ConfigEntity.md#dispose)

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

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[fromJSON](/en/auto-docs/editor/classes/ConfigEntity.md#fromjson)

***

### getData

**getData**<`D`>(`Registry`): `D`

获取 data 数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/en/auto-docs/editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/editor/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`D`

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[getData](/en/auto-docs/editor/classes/ConfigEntity.md#getdata)

***

### getDefaultConfig

**getDefaultConfig**(): `Object`

#### Returns

`Object`

#### Overrides

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[getDefaultConfig](/en/auto-docs/editor/classes/ConfigEntity.md#getdefaultconfig)

***

### getDefaultDataRegistries

**getDefaultDataRegistries**(): [`EntityDataRegistry`](/en/auto-docs/editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/editor/classes/EntityData.md)<`any`, {}>>\[]

默认初始化的 Data

#### Returns

[`EntityDataRegistry`](/en/auto-docs/editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/editor/classes/EntityData.md)<`any`, {}>>\[]

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[getDefaultDataRegistries](/en/auto-docs/editor/classes/ConfigEntity.md#getdefaultdataregistries)

***

### getDragEntities

**getDragEntities**(): [`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md)\[]

#### Returns

[`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md)\[]

***

### getDragLabelSide

**getDragLabelSide**(): `undefined` | [`LABEL_SIDE_TYPE`](/en/auto-docs/editor/enums/LABEL_SIDE_TYPE.md)

#### Returns

`undefined` | [`LABEL_SIDE_TYPE`](/en/auto-docs/editor/enums/LABEL_SIDE_TYPE.md)

***

### getDragStartEntity

**getDragStartEntity**(): `undefined` | [`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md)

#### Returns

`undefined` | [`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md)

***

### getNodeDroppingId

**getNodeDroppingId**(): `undefined` | `string`

#### Returns

`undefined` | `string`

***

### getNodeHovered

**getNodeHovered**(): `undefined` | [`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md)

#### Returns

`undefined` | [`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md)

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
| `identifier` | [`ServiceIdentifier`](/en/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[getService](/en/auto-docs/editor/classes/ConfigEntity.md#getservice)

***

### hasData

**hasData**(`Registry`): `boolean`

是否有指定数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/editor/classes/EntityData.md)<`any`, {}>> |

#### Returns

`boolean`

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[hasData](/en/auto-docs/editor/classes/ConfigEntity.md#hasdata)

***

### onConfigChanged

**onConfigChanged**(`fn`): [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`data`: `FlowRendererState`) => `void` |

#### Returns

[`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[onConfigChanged](/en/auto-docs/editor/classes/ConfigEntity.md#onconfigchanged)

***

### onNodeHoveredChange

**onNodeHoveredChange**(`fn`, `debounceTime?`): [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`hoveredNode`: `undefined` | [`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md)) => `void` |
| `debounceTime?` | `number` |

#### Returns

[`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

***

### removeData

**removeData**<`D`>(`Registry`): `void`

删除数据，初始化状态注入的数据无法被删除

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/en/auto-docs/editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/editor/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[removeData](/en/auto-docs/editor/classes/ConfigEntity.md#removedata)

***

### reset

**reset**(): `void`

重制为初始化状态

#### Returns

`void`

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[reset](/en/auto-docs/editor/classes/ConfigEntity.md#reset)

***

### setDragEntities

**setDragEntities**(`nodes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`void`

***

### setDragLabelSide

**setDragLabelSide**(`dragLabelSide?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dragLabelSide?` | [`LABEL_SIDE_TYPE`](/en/auto-docs/editor/enums/LABEL_SIDE_TYPE.md) |

#### Returns

`void`

***

### setDragStartEntity

**setDragStartEntity**(`node?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node?` | [`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md) |

#### Returns

`void`

***

### setDragging

**setDragging**(`dragging`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dragging` | `boolean` |

#### Returns

`void`

***

### setIsBranch

**setIsBranch**(`isBranch`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isBranch` | `boolean` |

#### Returns

`void`

***

### setNodeDroppingId

**setNodeDroppingId**(`nodeDroppingId?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeDroppingId?` | `string` |

#### Returns

`void`

***

### setNodeHovered

**setNodeHovered**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` | [`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md) |

#### Returns

`void`

***

### toJSON

**toJSON**(): `any`

存储数据，用于持久化存储

#### Returns

`any`

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[toJSON](/en/auto-docs/editor/classes/ConfigEntity.md#tojson)

***

### updateConfig

**updateConfig**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Partial`<`FlowRendererState`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[updateConfig](/en/auto-docs/editor/classes/ConfigEntity.md#updateconfig)

***

### updateData

**updateData**<`D`>(`Registry`, `props`): `void`

更新实体的数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/en/auto-docs/editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/editor/interfaces/EntityDataRegistry.md)<`D`> |
| `props` | [`EntityDataProps`](/en/auto-docs/editor/types/EntityDataProps.md)<`D`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/en/auto-docs/editor/classes/ConfigEntity.md).[updateData](/en/auto-docs/editor/classes/ConfigEntity.md#updatedata)
