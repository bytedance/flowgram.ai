# Class: SelectorBoxConfigEntity

选择框配置

## Hierarchy

* `ConfigEntity`<[`SelectorBoxConfigData`](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md)>

  ↳ **`SelectorBoxConfigEntity`**

## Table of contents

### Constructors

* [constructor](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#__opts_type__)
* [entityManager](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#entitymanager)
* [onDataChange](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#ondatachange)
* [onEntityChange](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#onentitychange)
* [preDispose](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#predispose)
* [toDispose](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#todispose)
* [type](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#type)

### Accessors

* [collapsed](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#collapsed)
* [config](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#config)
* [context](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#context)
* [disabled](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#disabled)
* [disposed](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#disposed)
* [dragInfo](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#draginfo)
* [id](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#id)
* [isMoving](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#ismoving)
* [isStart](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#isstart)
* [onDispose](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#ondispose)
* [position](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#position)
* [savedInManager](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#savedinmanager)
* [size](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#size)
* [type](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#type-1)
* [version](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#version)

### Methods

* [addData](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#adddata)
* [addInitializeData](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#addinitializedata)
* [checkChanged](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#checkchanged)
* [collapse](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#collapse)
* [dispose](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#dispose)
* [fromJSON](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#fromjson)
* [getData](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#getdata)
* [getDefaultConfig](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#getdefaultconfig)
* [getDefaultDataRegistries](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#getdefaultdataregistries)
* [getService](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#getservice)
* [hasData](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#hasdata)
* [onConfigChanged](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#onconfigchanged)
* [removeData](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#removedata)
* [reset](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#reset)
* [setDragInfo](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#setdraginfo)
* [toJSON](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#tojson)
* [toRectangle](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#torectangle)
* [updateConfig](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#updateconfig)
* [updateData](/auto-docs/renderer/classes/SelectorBoxConfigEntity.md#updatedata)

## Constructors

### constructor

**new SelectorBoxConfigEntity**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `EntityOpts` |

#### Inherited from

ConfigEntity\<SelectorBoxConfigData>.constructor

## Properties

### \_\_opts\_type\_\_

**\_\_opts\_type\_\_**: `EntityOpts`

#### Inherited from

ConfigEntity.\_\_opts\_type\_\_

***

### entityManager

`Readonly` **entityManager**: `EntityManager`

全局的entity管理器

#### Inherited from

ConfigEntity.entityManager

***

### onDataChange

`Readonly` **onDataChange**: `Event`<`EntityDataChangedEvent`<`Entity`<`EntityOpts`>>>

数据更改事件

#### Inherited from

ConfigEntity.onDataChange

***

### onEntityChange

`Readonly` **onEntityChange**: `Event`<`Entity`<`EntityOpts`>>

修改会触发

#### Inherited from

ConfigEntity.onEntityChange

***

### preDispose

`Readonly` **preDispose**: `DisposableCollection`

销毁前事件管理

#### Inherited from

ConfigEntity.preDispose

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

销毁事件管理

#### Inherited from

ConfigEntity.toDispose

***

### type

`Static` **type**: `string` = `'SelectorBoxConfigEntity'`

#### Overrides

ConfigEntity.type

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

`get` **dragInfo**(): `PlaygroundDragEvent`

#### Returns

`PlaygroundDragEvent`

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

`get` **onDispose**(): `Event`<`void`>

销毁事件

#### Returns

`Event`<`void`>

#### Inherited from

ConfigEntity.onDispose

***

### position

`get` **position**(): `PositionSchema`

#### Returns

`PositionSchema`

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

`get` **size**(): `SizeSchema`

#### Returns

`SizeSchema`

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
| `D` | extends `EntityData`<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | `EntityDataRegistry`<`EntityData`<`any`, {}>> |
| `defaultProps?` | `EntityDataProps`<`D`> |

#### Returns

`D`

#### Inherited from

ConfigEntity.addData

***

### addInitializeData

**addInitializeData**(`datas`, `dataConfig?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `datas` | `EntityDataRegistry`<`EntityData`<`any`, {}>>\[] |
| `dataConfig?` | `any` |

#### Returns

`void`

#### Inherited from

ConfigEntity.addInitializeData

***

### checkChanged

**checkChanged**(`oldData`, `newData`): `boolean`

判断 config 数据是否变化

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldData` | [`SelectorBoxConfigData`](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md) |
| `newData` | `Partial`<[`SelectorBoxConfigData`](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md)> |

#### Returns

`boolean`

#### Inherited from

ConfigEntity.checkChanged

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

ConfigEntity.dispose

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

ConfigEntity.fromJSON

***

### getData

**getData**<`D`>(`Registry`): `D`

获取 data 数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends `EntityData`<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | `EntityDataRegistry`<`D`> |

#### Returns

`D`

#### Inherited from

ConfigEntity.getData

***

### getDefaultConfig

**getDefaultConfig**(): [`SelectorBoxConfigData`](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md)

#### Returns

[`SelectorBoxConfigData`](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md)

#### Inherited from

ConfigEntity.getDefaultConfig

***

### getDefaultDataRegistries

**getDefaultDataRegistries**(): `EntityDataRegistry`<`EntityData`<`any`, {}>>\[]

默认初始化的 Data

#### Returns

`EntityDataRegistry`<`EntityData`<`any`, {}>>\[]

#### Inherited from

ConfigEntity.getDefaultDataRegistries

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
| `identifier` | `ServiceIdentifier`<`T`> |

#### Returns

`T`

#### Inherited from

ConfigEntity.getService

***

### hasData

**hasData**(`Registry`): `boolean`

是否有指定数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | `EntityDataRegistry`<`EntityData`<`any`, {}>> |

#### Returns

`boolean`

#### Inherited from

ConfigEntity.hasData

***

### onConfigChanged

**onConfigChanged**(`fn`): `Disposable`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`data`: [`SelectorBoxConfigData`](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md)) => `void` |

#### Returns

`Disposable`

#### Inherited from

ConfigEntity.onConfigChanged

***

### removeData

**removeData**<`D`>(`Registry`): `void`

删除数据，初始化状态注入的数据无法被删除

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends `EntityData`<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | `EntityDataRegistry`<`D`> |

#### Returns

`void`

#### Inherited from

ConfigEntity.removeData

***

### reset

**reset**(): `void`

重制为初始化状态

#### Returns

`void`

#### Inherited from

ConfigEntity.reset

***

### setDragInfo

**setDragInfo**(`info`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `info` | `PlaygroundDragEvent` |

#### Returns

`void`

***

### toJSON

**toJSON**(): `any`

存储数据，用于持久化存储

#### Returns

`any`

#### Inherited from

ConfigEntity.toJSON

***

### toRectangle

**toRectangle**(`scale`): `Rectangle`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scale` | `number` |

#### Returns

`Rectangle`

***

### updateConfig

**updateConfig**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Partial`<[`SelectorBoxConfigData`](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md)> |

#### Returns

`void`

#### Inherited from

ConfigEntity.updateConfig

***

### updateData

**updateData**<`D`>(`Registry`, `props`): `void`

更新实体的数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends `EntityData`<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | `EntityDataRegistry`<`D`> |
| `props` | `EntityDataProps`<`D`> |

#### Returns

`void`

#### Inherited from

ConfigEntity.updateData
