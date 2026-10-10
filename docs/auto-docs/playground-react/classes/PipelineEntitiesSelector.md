# Class: PipelineEntitiesSelector

选择器用来在 pipeline 绘制之前，筛选并注入 entities

## Table of contents

### Constructors

* [constructor](/auto-docs/playground-react/classes/PipelineEntitiesSelector.md#constructor)

### Properties

* [ableLayerMap](/auto-docs/playground-react/classes/PipelineEntitiesSelector.md#ablelayermap)
* [entityLayerMap](/auto-docs/playground-react/classes/PipelineEntitiesSelector.md#entitylayermap)
* [entityManager](/auto-docs/playground-react/classes/PipelineEntitiesSelector.md#entitymanager)

### Methods

* [getLayerData](/auto-docs/playground-react/classes/PipelineEntitiesSelector.md#getlayerdata)
* [getLayerEntities](/auto-docs/playground-react/classes/PipelineEntitiesSelector.md#getlayerentities)
* [getLayerEntityDatas](/auto-docs/playground-react/classes/PipelineEntitiesSelector.md#getlayerentitydatas)
* [subscribeEntities](/auto-docs/playground-react/classes/PipelineEntitiesSelector.md#subscribeentities)
* [subscribleEntityByData](/auto-docs/playground-react/classes/PipelineEntitiesSelector.md#subscribleentitybydata)

## Constructors

### constructor

**new PipelineEntitiesSelector**()

## Properties

### ableLayerMap

`Readonly` **ableLayerMap**: `Map`<`string`, `Set`<[`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`>>>

***

### entityLayerMap

`Readonly` **entityLayerMap**: `Map`<`string`, `Set`<[`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`>>>

***

### entityManager

**entityManager**: [`EntityManager`](/auto-docs/playground-react/classes/EntityManager.md)

## Methods

### getLayerData

**getLayerData**(`layer`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `changed` | `boolean` |
| `observeDatas` | [`EntityData`](/auto-docs/playground-react/classes/EntityData.md)<`any`, {}>\[] |
| `observeEntities` | [`Entity`](/auto-docs/playground-react/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/playground-react/interfaces/EntityOpts.md)>\[] |

***

### getLayerEntities

**getLayerEntities**(`layer`): `Object`

查询 layer 关联的实体

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `changed` | `boolean` |
| `entities` | [`Entity`](/auto-docs/playground-react/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/playground-react/interfaces/EntityOpts.md)>\[] |

***

### getLayerEntityDatas

**getLayerEntityDatas**(`layer`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `changed` | `boolean` |
| `datas` | [`EntityData`](/auto-docs/playground-react/classes/EntityData.md)<`any`, {}>\[] |

***

### subscribeEntities

**subscribeEntities**(`layer`, `entities`): `void`

订阅关联的 entity，会影响 autorun

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`> |
| `entities` | [`EntityRegistry`](/auto-docs/playground-react/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/playground-react/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/playground-react/interfaces/EntityOpts.md)>>\[] |

#### Returns

`void`

***

### subscribleEntityByData

**subscribleEntityByData**(`layer`, `entity`, `data`): `void`

订阅 data 数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`> |
| `entity` | [`EntityRegistry`](/auto-docs/playground-react/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/playground-react/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/playground-react/interfaces/EntityOpts.md)>> |
| `data` | [`EntityDataRegistry`](/auto-docs/playground-react/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/playground-react/classes/EntityData.md)<`any`, {}>> |

#### Returns

`void`
