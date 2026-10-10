# Class: PipelineEntitiesSelector

选择器用来在 pipeline 绘制之前，筛选并注入 entities

## Table of contents

### Constructors

* [constructor](/auto-docs/core/classes/PipelineEntitiesSelector.md#constructor)

### Properties

* [ableLayerMap](/auto-docs/core/classes/PipelineEntitiesSelector.md#ablelayermap)
* [entityLayerMap](/auto-docs/core/classes/PipelineEntitiesSelector.md#entitylayermap)
* [entityManager](/auto-docs/core/classes/PipelineEntitiesSelector.md#entitymanager)

### Methods

* [getLayerData](/auto-docs/core/classes/PipelineEntitiesSelector.md#getlayerdata)
* [getLayerEntities](/auto-docs/core/classes/PipelineEntitiesSelector.md#getlayerentities)
* [getLayerEntityDatas](/auto-docs/core/classes/PipelineEntitiesSelector.md#getlayerentitydatas)
* [subscribeEntities](/auto-docs/core/classes/PipelineEntitiesSelector.md#subscribeentities)
* [subscribleEntityByData](/auto-docs/core/classes/PipelineEntitiesSelector.md#subscribleentitybydata)

## Constructors

### constructor

**new PipelineEntitiesSelector**()

## Properties

### ableLayerMap

`Readonly` **ableLayerMap**: `Map`<`string`, `Set`<[`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`>>>

***

### entityLayerMap

`Readonly` **entityLayerMap**: `Map`<`string`, `Set`<[`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`>>>

***

### entityManager

**entityManager**: [`EntityManager`](/auto-docs/core/classes/EntityManager.md)

## Methods

### getLayerData

**getLayerData**(`layer`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `changed` | `boolean` |
| `observeDatas` | [`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}>\[] |
| `observeEntities` | [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>\[] |

***

### getLayerEntities

**getLayerEntities**(`layer`): `Object`

查询 layer 关联的实体

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `changed` | `boolean` |
| `entities` | [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>\[] |

***

### getLayerEntityDatas

**getLayerEntityDatas**(`layer`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `changed` | `boolean` |
| `datas` | [`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}>\[] |

***

### subscribeEntities

**subscribeEntities**(`layer`, `entities`): `void`

订阅关联的 entity，会影响 autorun

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`> |
| `entities` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>>\[] |

#### Returns

`void`

***

### subscribleEntityByData

**subscribleEntityByData**(`layer`, `entity`, `data`): `void`

订阅 data 数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`> |
| `entity` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |
| `data` | [`EntityDataRegistry`](/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}>> |

#### Returns

`void`
