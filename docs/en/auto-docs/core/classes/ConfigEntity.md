# Class: ConfigEntity\<P, O>

用于专门的数据配置，且是单例

## Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends [`ConfigEntityProps`](/en/auto-docs/core/interfaces/ConfigEntityProps.md) = [`ConfigEntityProps`](/en/auto-docs/core/interfaces/ConfigEntityProps.md) |
| `O` | extends [`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md) = [`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md) |

## Hierarchy

* [`Entity`](/en/auto-docs/core/classes/Entity-1.md)<`O`>

  ↳ **`ConfigEntity`**

  ↳↳ [`EditorStateConfigEntity`](/en/auto-docs/core/classes/EditorStateConfigEntity.md)

  ↳↳ [`PlaygroundConfigEntity`](/en/auto-docs/core/classes/PlaygroundConfigEntity.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/core/classes/ConfigEntity.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/en/auto-docs/core/classes/ConfigEntity.md#__opts_type__)
* [entityManager](/en/auto-docs/core/classes/ConfigEntity.md#entitymanager)
* [onDataChange](/en/auto-docs/core/classes/ConfigEntity.md#ondatachange)
* [onEntityChange](/en/auto-docs/core/classes/ConfigEntity.md#onentitychange)
* [preDispose](/en/auto-docs/core/classes/ConfigEntity.md#predispose)
* [toDispose](/en/auto-docs/core/classes/ConfigEntity.md#todispose)
* [type](/en/auto-docs/core/classes/ConfigEntity.md#type)

### Accessors

* [config](/en/auto-docs/core/classes/ConfigEntity.md#config)
* [context](/en/auto-docs/core/classes/ConfigEntity.md#context)
* [disposed](/en/auto-docs/core/classes/ConfigEntity.md#disposed)
* [id](/en/auto-docs/core/classes/ConfigEntity.md#id)
* [onDispose](/en/auto-docs/core/classes/ConfigEntity.md#ondispose)
* [savedInManager](/en/auto-docs/core/classes/ConfigEntity.md#savedinmanager)
* [type](/en/auto-docs/core/classes/ConfigEntity.md#type-1)
* [version](/en/auto-docs/core/classes/ConfigEntity.md#version)

### Methods

* [addData](/en/auto-docs/core/classes/ConfigEntity.md#adddata)
* [addInitializeData](/en/auto-docs/core/classes/ConfigEntity.md#addinitializedata)
* [checkChanged](/en/auto-docs/core/classes/ConfigEntity.md#checkchanged)
* [dispose](/en/auto-docs/core/classes/ConfigEntity.md#dispose)
* [fromJSON](/en/auto-docs/core/classes/ConfigEntity.md#fromjson)
* [getData](/en/auto-docs/core/classes/ConfigEntity.md#getdata)
* [getDefaultConfig](/en/auto-docs/core/classes/ConfigEntity.md#getdefaultconfig)
* [getDefaultDataRegistries](/en/auto-docs/core/classes/ConfigEntity.md#getdefaultdataregistries)
* [getService](/en/auto-docs/core/classes/ConfigEntity.md#getservice)
* [hasData](/en/auto-docs/core/classes/ConfigEntity.md#hasdata)
* [onConfigChanged](/en/auto-docs/core/classes/ConfigEntity.md#onconfigchanged)
* [removeData](/en/auto-docs/core/classes/ConfigEntity.md#removedata)
* [reset](/en/auto-docs/core/classes/ConfigEntity.md#reset)
* [toJSON](/en/auto-docs/core/classes/ConfigEntity.md#tojson)
* [updateConfig](/en/auto-docs/core/classes/ConfigEntity.md#updateconfig)
* [updateData](/en/auto-docs/core/classes/ConfigEntity.md#updatedata)

## Constructors

### constructor

**new ConfigEntity**<`P`, `O`>(`opts`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends [`ConfigEntityProps`](/en/auto-docs/core/interfaces/ConfigEntityProps.md) = [`ConfigEntityProps`](/en/auto-docs/core/interfaces/ConfigEntityProps.md) |
| `O` | extends [`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md) = [`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `O` |

#### Overrides

[Entity](/en/auto-docs/core/classes/Entity-1.md).[constructor](/en/auto-docs/core/classes/Entity-1.md#constructor)

## Properties

### \_\_opts\_type\_\_

**\_\_opts\_type\_\_**: `O`

#### Inherited from

[Entity](/en/auto-docs/core/classes/Entity-1.md).[**opts\_type**](/en/auto-docs/core/classes/Entity-1.md#__opts_type__)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/en/auto-docs/core/classes/EntityManager.md)

全局的entity管理器

#### Inherited from

[Entity](/en/auto-docs/core/classes/Entity-1.md).[entityManager](/en/auto-docs/core/classes/Entity-1.md#entitymanager)

***

### onDataChange

`Readonly` **onDataChange**: `Event`<[`EntityDataChangedEvent`](/en/auto-docs/core/interfaces/EntityDataChangedEvent.md)<[`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>>>

数据更改事件

#### Inherited from

[Entity](/en/auto-docs/core/classes/Entity-1.md).[onDataChange](/en/auto-docs/core/classes/Entity-1.md#ondatachange)

***

### onEntityChange

`Readonly` **onEntityChange**: `Event`<[`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>>

修改会触发

#### Inherited from

[Entity](/en/auto-docs/core/classes/Entity-1.md).[onEntityChange](/en/auto-docs/core/classes/Entity-1.md#onentitychange)

***

### preDispose

`Readonly` **preDispose**: `DisposableCollection`

销毁前事件管理

#### Inherited from

[Entity](/en/auto-docs/core/classes/Entity-1.md).[preDispose](/en/auto-docs/core/classes/Entity-1.md#predispose)

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

销毁事件管理

#### Inherited from

[Entity](/en/auto-docs/core/classes/Entity-1.md).[toDispose](/en/auto-docs/core/classes/Entity-1.md#todispose)

***

### type

`Static` **type**: `string` = `'ConfigEntity'`

#### Overrides

[Entity](/en/auto-docs/core/classes/Entity-1.md).[type](/en/auto-docs/core/classes/Entity-1.md#type)

## Accessors

### config

`get` **config**(): `P`

#### Returns

`P`

***

### context

`get` **context**(): `any`

#### Returns

`any`

#### Inherited from

Entity.context

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Entity.disposed

***

### id

`get` **id**(): `string`

实体 id

#### Returns

`string`

#### Inherited from

Entity.id

***

### onDispose

`get` **onDispose**(): `Event`<`void`>

销毁事件

#### Returns

`Event`<`void`>

#### Inherited from

Entity.onDispose

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
| `D` | extends [`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}>> |
| `defaultProps?` | [`EntityDataProps`](/en/auto-docs/core/types/EntityDataProps.md)<`D`> |

#### Returns

`D`

#### Inherited from

[Entity](/en/auto-docs/core/classes/Entity-1.md).[addData](/en/auto-docs/core/classes/Entity-1.md#adddata)

***

### addInitializeData

**addInitializeData**(`datas`, `dataConfig?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `datas` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}>>\[] |
| `dataConfig?` | `any` |

#### Returns

`void`

#### Inherited from

[Entity](/en/auto-docs/core/classes/Entity-1.md).[addInitializeData](/en/auto-docs/core/classes/Entity-1.md#addinitializedata)

***

### checkChanged

**checkChanged**(`oldData`, `newData`): `boolean`

判断 config 数据是否变化

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldData` | `P` |
| `newData` | `Partial`<`P`> |

#### Returns

`boolean`

***

### dispose

**dispose**(): `void`

销毁实体

#### Returns

`void`

#### Inherited from

[Entity](/en/auto-docs/core/classes/Entity-1.md).[dispose](/en/auto-docs/core/classes/Entity-1.md#dispose)

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

[Entity](/en/auto-docs/core/classes/Entity-1.md).[fromJSON](/en/auto-docs/core/classes/Entity-1.md#fromjson)

***

### getData

**getData**<`D`>(`Registry`): `D`

获取 data 数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`D`

#### Inherited from

[Entity](/en/auto-docs/core/classes/Entity-1.md).[getData](/en/auto-docs/core/classes/Entity-1.md#getdata)

***

### getDefaultConfig

**getDefaultConfig**(): `P`

#### Returns

`P`

***

### getDefaultDataRegistries

**getDefaultDataRegistries**(): [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}>>\[]

默认初始化的 Data

#### Returns

[`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}>>\[]

#### Inherited from

[Entity](/en/auto-docs/core/classes/Entity-1.md).[getDefaultDataRegistries](/en/auto-docs/core/classes/Entity-1.md#getdefaultdataregistries)

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

[Entity](/en/auto-docs/core/classes/Entity-1.md).[getService](/en/auto-docs/core/classes/Entity-1.md#getservice)

***

### hasData

**hasData**(`Registry`): `boolean`

是否有指定数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}>> |

#### Returns

`boolean`

#### Inherited from

[Entity](/en/auto-docs/core/classes/Entity-1.md).[hasData](/en/auto-docs/core/classes/Entity-1.md#hasdata)

***

### onConfigChanged

**onConfigChanged**(`fn`): `Disposable`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`data`: `P`) => `void` |

#### Returns

`Disposable`

***

### removeData

**removeData**<`D`>(`Registry`): `void`

删除数据，初始化状态注入的数据无法被删除

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`void`

#### Inherited from

[Entity](/en/auto-docs/core/classes/Entity-1.md).[removeData](/en/auto-docs/core/classes/Entity-1.md#removedata)

***

### reset

**reset**(): `void`

重制为初始化状态

#### Returns

`void`

#### Inherited from

[Entity](/en/auto-docs/core/classes/Entity-1.md).[reset](/en/auto-docs/core/classes/Entity-1.md#reset)

***

### toJSON

**toJSON**(): `any`

存储数据，用于持久化存储

#### Returns

`any`

#### Inherited from

[Entity](/en/auto-docs/core/classes/Entity-1.md).[toJSON](/en/auto-docs/core/classes/Entity-1.md#tojson)

***

### updateConfig

**updateConfig**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Partial`<`P`> |

#### Returns

`void`

***

### updateData

**updateData**<`D`>(`Registry`, `props`): `void`

更新实体的数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<`D`> |
| `props` | [`EntityDataProps`](/en/auto-docs/core/types/EntityDataProps.md)<`D`> |

#### Returns

`void`

#### Inherited from

[Entity](/en/auto-docs/core/classes/Entity-1.md).[updateData](/en/auto-docs/core/classes/Entity-1.md#updatedata)
