# Class: PipelineEntitiesSelector

选择器用来在 pipeline 绘制之前，筛选并注入 entities

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/PipelineEntitiesSelector.md#constructor)

### Properties

* [ableLayerMap](/auto-docs/fixed-layout-editor/classes/PipelineEntitiesSelector.md#ablelayermap)
* [entityLayerMap](/auto-docs/fixed-layout-editor/classes/PipelineEntitiesSelector.md#entitylayermap)
* [entityManager](/auto-docs/fixed-layout-editor/classes/PipelineEntitiesSelector.md#entitymanager)

### Methods

* [getLayerData](/auto-docs/fixed-layout-editor/classes/PipelineEntitiesSelector.md#getlayerdata)
* [getLayerEntities](/auto-docs/fixed-layout-editor/classes/PipelineEntitiesSelector.md#getlayerentities)
* [getLayerEntityDatas](/auto-docs/fixed-layout-editor/classes/PipelineEntitiesSelector.md#getlayerentitydatas)
* [subscribeEntities](/auto-docs/fixed-layout-editor/classes/PipelineEntitiesSelector.md#subscribeentities)
* [subscribleEntityByData](/auto-docs/fixed-layout-editor/classes/PipelineEntitiesSelector.md#subscribleentitybydata)

## Constructors

### constructor

**new PipelineEntitiesSelector**()

## Properties

### ableLayerMap

`Readonly` **ableLayerMap**: `Map`<`string`, `Set`<[`Layer`](/auto-docs/fixed-layout-editor/classes/Layer.md)<`any`, `any`>>>

***

### entityLayerMap

`Readonly` **entityLayerMap**: `Map`<`string`, `Set`<[`Layer`](/auto-docs/fixed-layout-editor/classes/Layer.md)<`any`, `any`>>>

***

### entityManager

**entityManager**: [`EntityManager`](/auto-docs/fixed-layout-editor/classes/EntityManager.md)

## Methods

### getLayerData

**getLayerData**(`layer`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/fixed-layout-editor/classes/Layer.md)<`any`, `any`> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `changed` | `boolean` |
| `observeDatas` | [`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>\[] |
| `observeEntities` | [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>\[] |

***

### getLayerEntities

**getLayerEntities**(`layer`): `Object`

查询 layer 关联的实体

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/fixed-layout-editor/classes/Layer.md)<`any`, `any`> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `changed` | `boolean` |
| `entities` | [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>\[] |

***

### getLayerEntityDatas

**getLayerEntityDatas**(`layer`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/fixed-layout-editor/classes/Layer.md)<`any`, `any`> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `changed` | `boolean` |
| `datas` | [`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>\[] |

***

### subscribeEntities

**subscribeEntities**(`layer`, `entities`): `void`

订阅关联的 entity，会影响 autorun

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/fixed-layout-editor/classes/Layer.md)<`any`, `any`> |
| `entities` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>>\[] |

#### Returns

`void`

***

### subscribleEntityByData

**subscribleEntityByData**(`layer`, `entity`, `data`): `void`

订阅 data 数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/auto-docs/fixed-layout-editor/classes/Layer.md)<`any`, `any`> |
| `entity` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |
| `data` | [`EntityDataRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>> |

#### Returns

`void`
