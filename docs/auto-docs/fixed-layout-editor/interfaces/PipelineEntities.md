# Interface: PipelineEntities

注入到 Layer 中的实体选择器

## Hierarchy

* `Iterable`<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)>

  ↳ **`PipelineEntities`**

## Implemented by

* [`PipelineEntitiesImpl`](/auto-docs/fixed-layout-editor/classes/PipelineEntitiesImpl.md)

## Table of contents

### Properties

* [createEntity](/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#createentity)
* [removeEntities](/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#removeentities)
* [size](/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#size)

### Methods

* [\[iterator\]](/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#[iterator])
* [get](/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#get)
* [getConfig](/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#getconfig)
* [getEntities](/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#getentities)
* [getEntityDatas](/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#getentitydatas)
* [has](/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#has)
* [updateConfig](/auto-docs/fixed-layout-editor/interfaces/PipelineEntities.md#updateconfig)

## Properties

### createEntity

**createEntity**: \<E>(`registry`: [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>>, `opts?`: `Omit`<`E`\[`"__opts_type__"`], `"entityManager"`>) => `E`

#### Type declaration

<`E`>(`registry`, `opts?`): `E`

创建实体

##### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md), `E`> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |
| `opts?` | `Omit`<`E`\[`"__opts_type__"`], `"entityManager"`> |

##### Returns

`E`

***

### removeEntities

**removeEntities**: (`registry`: [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>>) => `void`

#### Type declaration

(`registry`): `void`

批量删除实体

##### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |

##### Returns

`void`

***

### size

`Readonly` **size**: `number`

当前画布订阅的实体数目

## Methods

### \[iterator]

**\[iterator]**(): `Iterator`<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>, `any`, `undefined`>

#### Returns

`Iterator`<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>, `any`, `undefined`>

#### Inherited from

Iterable.\[iterator]

***

### get

**get**<`T`>(`registry`, `id?`): `undefined` | `T`

获取单个实体，如果该实体是单例且被注册过，则会自动创建

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |
| `id?` | `string` |

#### Returns

`undefined` | `T`

***

### getConfig

**getConfig**<`E`>(`registry`): `undefined` | `E`\[`"config"`]

获取配置信息

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`ConfigEntity`](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md)<[`ConfigEntityProps`](/auto-docs/fixed-layout-editor/interfaces/ConfigEntityProps.md), [`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md), `E`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |

#### Returns

`undefined` | `E`\[`"config"`]

***

### getEntities

**getEntities**<`T`>(`registry`): `T`\[]

获取多个实体

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |

#### Returns

`T`\[]

***

### getEntityDatas

**getEntityDatas**<`T`>(`entityRegistry`, `dataRegistry`): `T`\[]

获取 entity

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityRegistry` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |
| `dataRegistry` | `T` |

#### Returns

`T`\[]

***

### has

**has**(`registry`): `boolean`

是否存在

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |

#### Returns

`boolean`

***

### updateConfig

**updateConfig**<`E`>(`registry`, `props`): `void`

更新配置数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`ConfigEntity`](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md)<[`ConfigEntityProps`](/auto-docs/fixed-layout-editor/interfaces/ConfigEntityProps.md), [`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md), `E`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |
| `props` | `Partial`<`E`\[`"config"`]> |

#### Returns

`void`
