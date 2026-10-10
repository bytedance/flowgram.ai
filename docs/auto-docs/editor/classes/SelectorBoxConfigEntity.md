# Class: SelectorBoxConfigEntity

选择框配置

## Hierarchy

* [`ConfigEntity`](/auto-docs/editor/classes/ConfigEntity.md)<[`SelectorBoxConfigData`](/auto-docs/editor/interfaces/SelectorBoxConfigData.md)>

  ↳ **`SelectorBoxConfigEntity`**

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#__opts_type__)
* [entityManager](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#entitymanager)
* [onDataChange](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#ondatachange)
* [onEntityChange](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#onentitychange)
* [preDispose](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#predispose)
* [toDispose](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#todispose)
* [type](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#type)

### Accessors

* [collapsed](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#collapsed)
* [config](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#config)
* [context](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#context)
* [disabled](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#disabled)
* [disposed](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#disposed)
* [dragInfo](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#draginfo)
* [id](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#id)
* [isMoving](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#ismoving)
* [isStart](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#isstart)
* [onDispose](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#ondispose)
* [position](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#position)
* [savedInManager](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#savedinmanager)
* [size](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#size)
* [type](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#type-1)
* [version](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#version)

### Methods

* [addData](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#adddata)
* [addInitializeData](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#addinitializedata)
* [checkChanged](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#checkchanged)
* [collapse](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#collapse)
* [dispose](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#dispose)
* [fromJSON](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#fromjson)
* [getData](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#getdata)
* [getDefaultConfig](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#getdefaultconfig)
* [getDefaultDataRegistries](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#getdefaultdataregistries)
* [getService](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#getservice)
* [hasData](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#hasdata)
* [onConfigChanged](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#onconfigchanged)
* [removeData](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#removedata)
* [reset](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#reset)
* [setDragInfo](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#setdraginfo)
* [toJSON](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#tojson)
* [toRectangle](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#torectangle)
* [updateConfig](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#updateconfig)
* [updateData](/auto-docs/editor/classes/SelectorBoxConfigEntity.md#updatedata)

## Constructors

### constructor

**new SelectorBoxConfigEntity**(`opts`)

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

### collapsed

`get` **collapsed**(): `boolean`

#### Returns

`boolean`

***

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

### disabled

`get` **disabled**(): `boolean`

#### Returns

`boolean`

`set` **disabled**(`disabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `disabled` | `boolean` |

#### Returns

`void`

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

ConfigEntity.disposed

***

### dragInfo

`get` **dragInfo**(): [`PlaygroundDragEvent`](/auto-docs/editor/interfaces/PlaygroundDragEvent.md)

#### Returns

[`PlaygroundDragEvent`](/auto-docs/editor/interfaces/PlaygroundDragEvent.md)

***

### id

`get` **id**(): `string`

实体 id

#### Returns

`string`

#### Inherited from

ConfigEntity.id

***

### isMoving

`get` **isMoving**(): `boolean`

#### Returns

`boolean`

***

### isStart

`get` **isStart**(): `boolean`

#### Returns

`boolean`

***

### onDispose

`get` **onDispose**(): [`Event`](/auto-docs/editor/interfaces/Event-1.md)<`void`>

销毁事件

#### Returns

[`Event`](/auto-docs/editor/interfaces/Event-1.md)<`void`>

#### Inherited from

ConfigEntity.onDispose

***

### position

`get` **position**(): [`PositionSchema`](/auto-docs/editor/interfaces/PositionSchema.md)

#### Returns

[`PositionSchema`](/auto-docs/editor/interfaces/PositionSchema.md)

***

### savedInManager

`get` **savedInManager**(): `boolean`

是否存到全局 manager，默认 true

#### Returns

`boolean`

#### Inherited from

ConfigEntity.savedInManager

***

### size

`get` **size**(): [`SizeSchema`](/auto-docs/editor/interfaces/SizeSchema-1.md)

#### Returns

[`SizeSchema`](/auto-docs/editor/interfaces/SizeSchema-1.md)

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
| `oldData` | [`SelectorBoxConfigData`](/auto-docs/editor/interfaces/SelectorBoxConfigData.md) |
| `newData` | `Partial`<[`SelectorBoxConfigData`](/auto-docs/editor/interfaces/SelectorBoxConfigData.md)> |

#### Returns

`boolean`

#### Inherited from

[ConfigEntity](/auto-docs/editor/classes/ConfigEntity.md).[checkChanged](/auto-docs/editor/classes/ConfigEntity.md#checkchanged)

***

### collapse

**collapse**(): `void`

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

**getDefaultConfig**(): [`SelectorBoxConfigData`](/auto-docs/editor/interfaces/SelectorBoxConfigData.md)

#### Returns

[`SelectorBoxConfigData`](/auto-docs/editor/interfaces/SelectorBoxConfigData.md)

#### Inherited from

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
| `fn` | (`data`: [`SelectorBoxConfigData`](/auto-docs/editor/interfaces/SelectorBoxConfigData.md)) => `void` |

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

### setDragInfo

**setDragInfo**(`info`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `info` | [`PlaygroundDragEvent`](/auto-docs/editor/interfaces/PlaygroundDragEvent.md) |

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

### toRectangle

**toRectangle**(`scale`): [`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scale` | `number` |

#### Returns

[`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md)

***

### updateConfig

**updateConfig**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Partial`<[`SelectorBoxConfigData`](/auto-docs/editor/interfaces/SelectorBoxConfigData.md)> |

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
