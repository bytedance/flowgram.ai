# Class: Entity\<OPTS>

An object that performs a cleanup operation when `.dispose()` is called.

Some examples of how disposables are used:

* An event listener that removes itself when `.dispose()` is called.
* The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.

## Type parameters

| Name | Type |
| :------ | :------ |
| `OPTS` | extends [`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md) = [`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md) |

## Hierarchy

* **`Entity`**

  ↳ [`ConfigEntity`](/en/auto-docs/free-layout-editor/classes/ConfigEntity.md)

  ↳ [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

  ↳ [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)

  ↳ [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)

## Implements

* [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/Entity-1.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/en/auto-docs/free-layout-editor/classes/Entity-1.md#__opts_type__)
* [entityManager](/en/auto-docs/free-layout-editor/classes/Entity-1.md#entitymanager)
* [onDataChange](/en/auto-docs/free-layout-editor/classes/Entity-1.md#ondatachange)
* [onEntityChange](/en/auto-docs/free-layout-editor/classes/Entity-1.md#onentitychange)
* [preDispose](/en/auto-docs/free-layout-editor/classes/Entity-1.md#predispose)
* [toDispose](/en/auto-docs/free-layout-editor/classes/Entity-1.md#todispose)
* [type](/en/auto-docs/free-layout-editor/classes/Entity-1.md#type)

### Accessors

* [context](/en/auto-docs/free-layout-editor/classes/Entity-1.md#context)
* [disposed](/en/auto-docs/free-layout-editor/classes/Entity-1.md#disposed)
* [id](/en/auto-docs/free-layout-editor/classes/Entity-1.md#id)
* [onDispose](/en/auto-docs/free-layout-editor/classes/Entity-1.md#ondispose)
* [savedInManager](/en/auto-docs/free-layout-editor/classes/Entity-1.md#savedinmanager)
* [type](/en/auto-docs/free-layout-editor/classes/Entity-1.md#type-1)
* [version](/en/auto-docs/free-layout-editor/classes/Entity-1.md#version)

### Methods

* [addData](/en/auto-docs/free-layout-editor/classes/Entity-1.md#adddata)
* [addInitializeData](/en/auto-docs/free-layout-editor/classes/Entity-1.md#addinitializedata)
* [dispose](/en/auto-docs/free-layout-editor/classes/Entity-1.md#dispose)
* [fromJSON](/en/auto-docs/free-layout-editor/classes/Entity-1.md#fromjson)
* [getData](/en/auto-docs/free-layout-editor/classes/Entity-1.md#getdata)
* [getDefaultDataRegistries](/en/auto-docs/free-layout-editor/classes/Entity-1.md#getdefaultdataregistries)
* [getService](/en/auto-docs/free-layout-editor/classes/Entity-1.md#getservice)
* [hasData](/en/auto-docs/free-layout-editor/classes/Entity-1.md#hasdata)
* [removeData](/en/auto-docs/free-layout-editor/classes/Entity-1.md#removedata)
* [reset](/en/auto-docs/free-layout-editor/classes/Entity-1.md#reset)
* [toJSON](/en/auto-docs/free-layout-editor/classes/Entity-1.md#tojson)
* [updateData](/en/auto-docs/free-layout-editor/classes/Entity-1.md#updatedata)

## Constructors

### constructor

**new Entity**<`OPTS`>(`opts`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `OPTS` | extends [`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md) = [`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `OPTS` |

## Properties

### \_\_opts\_type\_\_

**\_\_opts\_type\_\_**: `OPTS`

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/en/auto-docs/free-layout-editor/classes/EntityManager.md)

全局的entity管理器

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityDataChangedEvent`](/en/auto-docs/free-layout-editor/interfaces/EntityDataChangedEvent.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>>>

数据更改事件

***

### onEntityChange

`Readonly` **onEntityChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>>

修改会触发

***

### preDispose

`Readonly` **preDispose**: [`DisposableCollection`](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md)

销毁前事件管理

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md)

销毁事件管理

***

### type

`Static` **type**: `string`

## Accessors

### context

`get` **context**(): `any`

#### Returns

`any`

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

***

### id

`get` **id**(): `string`

实体 id

#### Returns

`string`

***

### onDispose

`get` **onDispose**(): [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

销毁事件

#### Returns

[`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

***

### savedInManager

`get` **savedInManager**(): `boolean`

是否存到全局 manager，默认 true

#### Returns

`boolean`

***

### type

`get` **type**(): `string`

实体类型

#### Returns

`string`

***

### version

`get` **version**(): `number`

实体的版本

#### Returns

`number`

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

***

### dispose

**dispose**(): `void`

销毁实体

#### Returns

`void`

#### Implementation of

[Disposable](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md).[dispose](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md#dispose)

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

***

### getDefaultDataRegistries

**getDefaultDataRegistries**(): [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>\[]

默认初始化的 Data

#### Returns

[`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>\[]

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

***

### reset

**reset**(): `void`

重制为初始化状态

#### Returns

`void`

***

### toJSON

**toJSON**(): `any`

存储数据，用于持久化存储

#### Returns

`any`

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
