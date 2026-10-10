# Class: FlowSelectConfigEntity

圈选节点相关数据存储

## Hierarchy

* [`ConfigEntity`](/auto-docs/editor/classes/ConfigEntity.md)<`FlowSelectConfigEntityData`>

  ↳ **`FlowSelectConfigEntity`**

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/FlowSelectConfigEntity.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/auto-docs/editor/classes/FlowSelectConfigEntity.md#__opts_type__)
* [boundsPadding](/auto-docs/editor/classes/FlowSelectConfigEntity.md#boundspadding)
* [entityManager](/auto-docs/editor/classes/FlowSelectConfigEntity.md#entitymanager)
* [onDataChange](/auto-docs/editor/classes/FlowSelectConfigEntity.md#ondatachange)
* [onEntityChange](/auto-docs/editor/classes/FlowSelectConfigEntity.md#onentitychange)
* [preDispose](/auto-docs/editor/classes/FlowSelectConfigEntity.md#predispose)
* [toDispose](/auto-docs/editor/classes/FlowSelectConfigEntity.md#todispose)
* [type](/auto-docs/editor/classes/FlowSelectConfigEntity.md#type)

### Accessors

* [config](/auto-docs/editor/classes/FlowSelectConfigEntity.md#config)
* [context](/auto-docs/editor/classes/FlowSelectConfigEntity.md#context)
* [disposed](/auto-docs/editor/classes/FlowSelectConfigEntity.md#disposed)
* [id](/auto-docs/editor/classes/FlowSelectConfigEntity.md#id)
* [onDispose](/auto-docs/editor/classes/FlowSelectConfigEntity.md#ondispose)
* [savedInManager](/auto-docs/editor/classes/FlowSelectConfigEntity.md#savedinmanager)
* [selectedNodes](/auto-docs/editor/classes/FlowSelectConfigEntity.md#selectednodes)
* [type](/auto-docs/editor/classes/FlowSelectConfigEntity.md#type-1)
* [version](/auto-docs/editor/classes/FlowSelectConfigEntity.md#version)

### Methods

* [addData](/auto-docs/editor/classes/FlowSelectConfigEntity.md#adddata)
* [addInitializeData](/auto-docs/editor/classes/FlowSelectConfigEntity.md#addinitializedata)
* [checkChanged](/auto-docs/editor/classes/FlowSelectConfigEntity.md#checkchanged)
* [clearSelectedNodes](/auto-docs/editor/classes/FlowSelectConfigEntity.md#clearselectednodes)
* [dispose](/auto-docs/editor/classes/FlowSelectConfigEntity.md#dispose)
* [fromJSON](/auto-docs/editor/classes/FlowSelectConfigEntity.md#fromjson)
* [getData](/auto-docs/editor/classes/FlowSelectConfigEntity.md#getdata)
* [getDefaultConfig](/auto-docs/editor/classes/FlowSelectConfigEntity.md#getdefaultconfig)
* [getDefaultDataRegistries](/auto-docs/editor/classes/FlowSelectConfigEntity.md#getdefaultdataregistries)
* [getSelectedBounds](/auto-docs/editor/classes/FlowSelectConfigEntity.md#getselectedbounds)
* [getService](/auto-docs/editor/classes/FlowSelectConfigEntity.md#getservice)
* [hasData](/auto-docs/editor/classes/FlowSelectConfigEntity.md#hasdata)
* [onConfigChanged](/auto-docs/editor/classes/FlowSelectConfigEntity.md#onconfigchanged)
* [removeData](/auto-docs/editor/classes/FlowSelectConfigEntity.md#removedata)
* [reset](/auto-docs/editor/classes/FlowSelectConfigEntity.md#reset)
* [selectFromBounds](/auto-docs/editor/classes/FlowSelectConfigEntity.md#selectfrombounds)
* [toJSON](/auto-docs/editor/classes/FlowSelectConfigEntity.md#tojson)
* [updateConfig](/auto-docs/editor/classes/FlowSelectConfigEntity.md#updateconfig)
* [updateData](/auto-docs/editor/classes/FlowSelectConfigEntity.md#updatedata)

## Constructors

### constructor

**new FlowSelectConfigEntity**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`EntityOpts`](/auto-docs/editor/interfaces/EntityOpts.md) |

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[constructor](/auto-docs/editor/classes/ConfigEntity.md#constructor)

## Properties

### \_\_opts\_type\_\_

**\_\_opts\_type\_\_**: [`EntityOpts`](/auto-docs/editor/interfaces/EntityOpts.md)

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[**opts\_type**](/auto-docs/editor/classes/ConfigEntity.md#__opts_type__)

***

### boundsPadding

**boundsPadding**: `number`

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/auto-docs/editor/classes/EntityManager.md)

全局的entity管理器

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[entityManager](/auto-docs/editor/classes/ConfigEntity.md#entitymanager)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`EntityDataChangedEvent`](/auto-docs/editor/interfaces/EntityDataChangedEvent.md)<[`Entity`](/auto-docs/editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/editor/interfaces/EntityOpts.md)>>>

数据更改事件

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[onDataChange](/auto-docs/editor/classes/ConfigEntity.md#ondatachange)

***

### onEntityChange

`Readonly` **onEntityChange**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`Entity`](/auto-docs/editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/editor/interfaces/EntityOpts.md)>>

修改会触发

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[onEntityChange](/auto-docs/editor/classes/ConfigEntity.md#onentitychange)

***

### preDispose

`Readonly` **preDispose**: [`DisposableCollection`](/auto-docs/editor/classes/DisposableCollection.md)

销毁前事件管理

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[preDispose](/auto-docs/editor/classes/ConfigEntity.md#predispose)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/editor/classes/DisposableCollection.md)

销毁事件管理

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[toDispose](/auto-docs/editor/classes/ConfigEntity.md#todispose)

***

### type

`Static` **type**: `string`

#### Overrides

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[type](/auto-docs/editor/classes/ConfigEntity.md#type)

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

### id

`get` **id**(): `string`

实体 id

#### Returns

`string`

#### Inherited from

ConfigEntity.id

***

### onDispose

`get` **onDispose**(): [`Event`](/auto-docs/editor/interfaces/Event-1.md)<`void`>

销毁事件

#### Returns

[`Event`](/auto-docs/editor/interfaces/Event-1.md)<`void`>

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

### selectedNodes

`get` **selectedNodes**(): [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)\[]

#### Returns

[`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)\[]

`set` **selectedNodes**(`nodes`): `void`

选中节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)\[] |

#### Returns

`void`

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
| `D` | extends [`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}>> |
| `defaultProps?` | [`EntityDataProps`](/auto-docs/editor/types/EntityDataProps.md)<`D`> |

#### Returns

`D`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[addData](/auto-docs/editor/classes/ConfigEntity.md#adddata)

***

### addInitializeData

**addInitializeData**(`datas`, `dataConfig?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `datas` | [`EntityDataRegistry`](/auto-docs/editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}>>\[] |
| `dataConfig?` | `any` |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[addInitializeData](/auto-docs/editor/classes/ConfigEntity.md#addinitializedata)

***

### checkChanged

**checkChanged**(`oldData`, `newData`): `boolean`

判断 config 数据是否变化

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldData` | `FlowSelectConfigEntityData` |
| `newData` | `Partial`<`FlowSelectConfigEntityData`> |

#### Returns

`boolean`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[checkChanged](/auto-docs/editor/classes/ConfigEntity.md#checkchanged)

***

### clearSelectedNodes

**clearSelectedNodes**(): `void`

清除选中节点

#### Returns

`void`

***

### dispose

**dispose**(): `void`

销毁实体

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[dispose](/auto-docs/editor/classes/ConfigEntity.md#dispose)

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

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[fromJSON](/auto-docs/editor/classes/ConfigEntity.md#fromjson)

***

### getData

**getData**<`D`>(`Registry`): `D`

获取 data 数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/editor/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`D`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[getData](/auto-docs/editor/classes/ConfigEntity.md#getdata)

***

### getDefaultConfig

**getDefaultConfig**(): `FlowSelectConfigEntityData`

#### Returns

`FlowSelectConfigEntityData`

#### Overrides

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[getDefaultConfig](/auto-docs/editor/classes/ConfigEntity.md#getdefaultconfig)

***

### getDefaultDataRegistries

**getDefaultDataRegistries**(): [`EntityDataRegistry`](/auto-docs/editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}>>\[]

默认初始化的 Data

#### Returns

[`EntityDataRegistry`](/auto-docs/editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}>>\[]

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[getDefaultDataRegistries](/auto-docs/editor/classes/ConfigEntity.md#getdefaultdataregistries)

***

### getSelectedBounds

**getSelectedBounds**(): [`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md)

获取选中节点外围的最大边框

#### Returns

[`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md)

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
| `identifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[getService](/auto-docs/editor/classes/ConfigEntity.md#getservice)

***

### hasData

**hasData**(`Registry`): `boolean`

是否有指定数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}>> |

#### Returns

`boolean`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[hasData](/auto-docs/editor/classes/ConfigEntity.md#hasdata)

***

### onConfigChanged

**onConfigChanged**(`fn`): [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`data`: `FlowSelectConfigEntityData`) => `void` |

#### Returns

[`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[onConfigChanged](/auto-docs/editor/classes/ConfigEntity.md#onconfigchanged)

***

### removeData

**removeData**<`D`>(`Registry`): `void`

删除数据，初始化状态注入的数据无法被删除

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/editor/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[removeData](/auto-docs/editor/classes/ConfigEntity.md#removedata)

***

### reset

**reset**(): `void`

重制为初始化状态

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[reset](/auto-docs/editor/classes/ConfigEntity.md#reset)

***

### selectFromBounds

**selectFromBounds**(`rect`, `transforms`): `void`

通过选择框选中节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `rect` | [`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md) |
| `transforms` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md)\[] |

#### Returns

`void`

***

### toJSON

**toJSON**(): `any`

存储数据，用于持久化存储

#### Returns

`any`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[toJSON](/auto-docs/editor/classes/ConfigEntity.md#tojson)

***

### updateConfig

**updateConfig**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Partial`<`FlowSelectConfigEntityData`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[updateConfig](/auto-docs/editor/classes/ConfigEntity.md#updateconfig)

***

### updateData

**updateData**<`D`>(`Registry`, `props`): `void`

更新实体的数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/editor/interfaces/EntityDataRegistry.md)<`D`> |
| `props` | [`EntityDataProps`](/auto-docs/editor/types/EntityDataProps.md)<`D`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[updateData](/auto-docs/editor/classes/ConfigEntity.md#updatedata)
