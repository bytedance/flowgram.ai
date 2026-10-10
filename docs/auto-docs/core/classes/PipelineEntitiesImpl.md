# Class: PipelineEntitiesImpl

注入到 Layer 中的实体选择器

## Implements

* [`PipelineEntities`](/auto-docs/core/interfaces/PipelineEntities.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/core/classes/PipelineEntitiesImpl.md#constructor)

### Accessors

* [size](/auto-docs/core/classes/PipelineEntitiesImpl.md#size)

### Methods

* [\[iterator\]](/auto-docs/core/classes/PipelineEntitiesImpl.md#[iterator])
* [createEntity](/auto-docs/core/classes/PipelineEntitiesImpl.md#createentity)
* [get](/auto-docs/core/classes/PipelineEntitiesImpl.md#get)
* [getConfig](/auto-docs/core/classes/PipelineEntitiesImpl.md#getconfig)
* [getEntities](/auto-docs/core/classes/PipelineEntitiesImpl.md#getentities)
* [getEntityDatas](/auto-docs/core/classes/PipelineEntitiesImpl.md#getentitydatas)
* [has](/auto-docs/core/classes/PipelineEntitiesImpl.md#has)
* [load](/auto-docs/core/classes/PipelineEntitiesImpl.md#load)
* [removeEntities](/auto-docs/core/classes/PipelineEntitiesImpl.md#removeentities)
* [updateConfig](/auto-docs/core/classes/PipelineEntitiesImpl.md#updateconfig)

## Constructors

### constructor

**new PipelineEntitiesImpl**(`entityManager`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityManager` | [`EntityManager`](/auto-docs/core/classes/EntityManager.md) |

## Accessors

### size

`get` **size**(): `number`

当前画布订阅的实体数目

#### Returns

`number`

#### Implementation of

[PipelineEntities](/auto-docs/core/interfaces/PipelineEntities.md).[size](/auto-docs/core/interfaces/PipelineEntities.md#size)

## Methods

### \[iterator]

**\[iterator]**(): `Iterator`<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>, `any`, `undefined`>

#### Returns

`Iterator`<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>, `any`, `undefined`>

#### Implementation of

[PipelineEntities](/auto-docs/core/interfaces/PipelineEntities.md).[\[iterator\]](/auto-docs/core/interfaces/PipelineEntities.md#[iterator])

***

### createEntity

**createEntity**<`E`>(`registry`, `opts?`): `E`

创建实体

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md), `E`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |
| `opts?` | `Omit`<`E`\[`"__opts_type__"`], `"entityManager"`> |

#### Returns

`E`

#### Implementation of

[PipelineEntities](/auto-docs/core/interfaces/PipelineEntities.md).[createEntity](/auto-docs/core/interfaces/PipelineEntities.md#createentity)

***

### get

**get**<`T`>(`registry`, `id?`): `undefined` | `T`

获取单个实体，如果该实体是单例且被注册过，则会自动创建

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |
| `id?` | `string` |

#### Returns

`undefined` | `T`

#### Implementation of

[PipelineEntities](/auto-docs/core/interfaces/PipelineEntities.md).[get](/auto-docs/core/interfaces/PipelineEntities.md#get)

***

### getConfig

**getConfig**<`E`>(`registry`): `undefined` | `E`\[`"config"`]

获取配置信息

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`ConfigEntity`](/auto-docs/core/classes/ConfigEntity.md)<[`ConfigEntityProps`](/auto-docs/core/interfaces/ConfigEntityProps.md), [`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md), `E`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |

#### Returns

`undefined` | `E`\[`"config"`]

#### Implementation of

[PipelineEntities](/auto-docs/core/interfaces/PipelineEntities.md).[getConfig](/auto-docs/core/interfaces/PipelineEntities.md#getconfig)

***

### getEntities

**getEntities**<`T`>(`registry`): `T`\[]

获取多个实体

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |

#### Returns

`T`\[]

#### Implementation of

[PipelineEntities](/auto-docs/core/interfaces/PipelineEntities.md).[getEntities](/auto-docs/core/interfaces/PipelineEntities.md#getentities)

***

### getEntityDatas

**getEntityDatas**<`T`>(`entityRegistry`, `dataRegistry`): `T`\[]

获取 entity

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}, `T`> = [`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityRegistry` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |
| `dataRegistry` | `T` |

#### Returns

`T`\[]

#### Implementation of

[PipelineEntities](/auto-docs/core/interfaces/PipelineEntities.md).[getEntityDatas](/auto-docs/core/interfaces/PipelineEntities.md#getentitydatas)

***

### has

**has**(`registy`): `boolean`

是否存在

#### Parameters

| Name | Type |
| :------ | :------ |
| `registy` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |

#### Returns

`boolean`

#### Implementation of

[PipelineEntities](/auto-docs/core/interfaces/PipelineEntities.md).[has](/auto-docs/core/interfaces/PipelineEntities.md#has)

***

### load

**load**(`observeEntites`, `observeDatas`): `void`

加载订阅数据，会缓存到 layer 内部，layer 只能拿到订阅数据的子集

#### Parameters

| Name | Type |
| :------ | :------ |
| `observeEntites` | [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>\[] |
| `observeDatas` | [`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}>\[] |

#### Returns

`void`

***

### removeEntities

**removeEntities**(`registry`): `void`

批量删除实体

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |

#### Returns

`void`

#### Implementation of

[PipelineEntities](/auto-docs/core/interfaces/PipelineEntities.md).[removeEntities](/auto-docs/core/interfaces/PipelineEntities.md#removeentities)

***

### updateConfig

**updateConfig**<`E`>(`registry`, `props`): `void`

更新配置数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`ConfigEntity`](/auto-docs/core/classes/ConfigEntity.md)<[`ConfigEntityProps`](/auto-docs/core/interfaces/ConfigEntityProps.md), [`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md), `E`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |
| `props` | `Partial`<`E`\[`"config"`]> |

#### Returns

`void`

#### Implementation of

[PipelineEntities](/auto-docs/core/interfaces/PipelineEntities.md).[updateConfig](/auto-docs/core/interfaces/PipelineEntities.md#updateconfig)
