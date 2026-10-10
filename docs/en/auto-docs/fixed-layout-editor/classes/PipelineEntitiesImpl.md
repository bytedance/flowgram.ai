# Class: PipelineEntitiesImpl

注入到 Layer 中的实体选择器

## Implements

* [`PipelineEntities`](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/PipelineEntitiesImpl.md#constructor)

### Accessors

* [size](/en/auto-docs/fixed-layout-editor/classes/PipelineEntitiesImpl.md#size)

### Methods

* [\[iterator\]](/en/auto-docs/fixed-layout-editor/classes/PipelineEntitiesImpl.md#[iterator])
* [createEntity](/en/auto-docs/fixed-layout-editor/classes/PipelineEntitiesImpl.md#createentity)
* [get](/en/auto-docs/fixed-layout-editor/classes/PipelineEntitiesImpl.md#get)
* [getConfig](/en/auto-docs/fixed-layout-editor/classes/PipelineEntitiesImpl.md#getconfig)
* [getEntities](/en/auto-docs/fixed-layout-editor/classes/PipelineEntitiesImpl.md#getentities)
* [getEntityDatas](/en/auto-docs/fixed-layout-editor/classes/PipelineEntitiesImpl.md#getentitydatas)
* [has](/en/auto-docs/fixed-layout-editor/classes/PipelineEntitiesImpl.md#has)
* [load](/en/auto-docs/fixed-layout-editor/classes/PipelineEntitiesImpl.md#load)
* [removeEntities](/en/auto-docs/fixed-layout-editor/classes/PipelineEntitiesImpl.md#removeentities)
* [updateConfig](/en/auto-docs/fixed-layout-editor/classes/PipelineEntitiesImpl.md#updateconfig)

## Constructors

### constructor

**new PipelineEntitiesImpl**(`entityManager`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityManager` | [`EntityManager`](/en/auto-docs/fixed-layout-editor/classes/EntityManager.md) |

## Accessors

### size

`get` **size**(): `number`

当前画布订阅的实体数目

#### Returns

`number`

#### Implementation of

[PipelineEntities](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md).[size](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#size)

## Methods

### \[iterator]

**\[iterator]**(): `Iterator`<[`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>, `any`, `undefined`>

#### Returns

`Iterator`<[`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>, `any`, `undefined`>

#### Implementation of

[PipelineEntities](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md).[\[iterator\]](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#[iterator])

***

### createEntity

**createEntity**<`E`>(`registry`, `opts?`): `E`

创建实体

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md), `E`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |
| `opts?` | `Omit`<`E`\[`"__opts_type__"`], `"entityManager"`> |

#### Returns

`E`

#### Implementation of

[PipelineEntities](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md).[createEntity](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#createentity)

***

### get

**get**<`T`>(`registry`, `id?`): `undefined` | `T`

获取单个实体，如果该实体是单例且被注册过，则会自动创建

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |
| `id?` | `string` |

#### Returns

`undefined` | `T`

#### Implementation of

[PipelineEntities](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md).[get](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#get)

***

### getConfig

**getConfig**<`E`>(`registry`): `undefined` | `E`\[`"config"`]

获取配置信息

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`ConfigEntity`](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md)<[`ConfigEntityProps`](/en/auto-docs/fixed-layout-editor/interfaces/ConfigEntityProps.md), [`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md), `E`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |

#### Returns

`undefined` | `E`\[`"config"`]

#### Implementation of

[PipelineEntities](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md).[getConfig](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#getconfig)

***

### getEntities

**getEntities**<`T`>(`registry`): `T`\[]

获取多个实体

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |

#### Returns

`T`\[]

#### Implementation of

[PipelineEntities](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md).[getEntities](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#getentities)

***

### getEntityDatas

**getEntityDatas**<`T`>(`entityRegistry`, `dataRegistry`): `T`\[]

获取 entity

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}, `T`> = [`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityRegistry` | [`EntityRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |
| `dataRegistry` | `T` |

#### Returns

`T`\[]

#### Implementation of

[PipelineEntities](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md).[getEntityDatas](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#getentitydatas)

***

### has

**has**(`registy`): `boolean`

是否存在

#### Parameters

| Name | Type |
| :------ | :------ |
| `registy` | [`EntityRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |

#### Returns

`boolean`

#### Implementation of

[PipelineEntities](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md).[has](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#has)

***

### load

**load**(`observeEntites`, `observeDatas`): `void`

加载订阅数据，会缓存到 layer 内部，layer 只能拿到订阅数据的子集

#### Parameters

| Name | Type |
| :------ | :------ |
| `observeEntites` | [`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>\[] |
| `observeDatas` | [`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>\[] |

#### Returns

`void`

***

### removeEntities

**removeEntities**(`registry`): `void`

批量删除实体

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |

#### Returns

`void`

#### Implementation of

[PipelineEntities](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md).[removeEntities](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#removeentities)

***

### updateConfig

**updateConfig**<`E`>(`registry`, `props`): `void`

更新配置数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`ConfigEntity`](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md)<[`ConfigEntityProps`](/en/auto-docs/fixed-layout-editor/interfaces/ConfigEntityProps.md), [`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md), `E`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |
| `props` | `Partial`<`E`\[`"config"`]> |

#### Returns

`void`

#### Implementation of

[PipelineEntities](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md).[updateConfig](/en/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#updateconfig)
