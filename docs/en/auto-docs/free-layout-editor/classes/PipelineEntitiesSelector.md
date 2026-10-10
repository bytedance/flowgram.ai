# Class: PipelineEntitiesSelector

选择器用来在 pipeline 绘制之前，筛选并注入 entities

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/PipelineEntitiesSelector.md#constructor)

### Properties

* [ableLayerMap](/en/auto-docs/free-layout-editor/classes/PipelineEntitiesSelector.md#ablelayermap)
* [entityLayerMap](/en/auto-docs/free-layout-editor/classes/PipelineEntitiesSelector.md#entitylayermap)
* [entityManager](/en/auto-docs/free-layout-editor/classes/PipelineEntitiesSelector.md#entitymanager)

### Methods

* [getLayerData](/en/auto-docs/free-layout-editor/classes/PipelineEntitiesSelector.md#getlayerdata)
* [getLayerEntities](/en/auto-docs/free-layout-editor/classes/PipelineEntitiesSelector.md#getlayerentities)
* [getLayerEntityDatas](/en/auto-docs/free-layout-editor/classes/PipelineEntitiesSelector.md#getlayerentitydatas)
* [subscribeEntities](/en/auto-docs/free-layout-editor/classes/PipelineEntitiesSelector.md#subscribeentities)
* [subscribleEntityByData](/en/auto-docs/free-layout-editor/classes/PipelineEntitiesSelector.md#subscribleentitybydata)

## Constructors

### constructor

**new PipelineEntitiesSelector**()

## Properties

### ableLayerMap

`Readonly` **ableLayerMap**: `Map`<`string`, `Set`<[`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`>>>

***

### entityLayerMap

`Readonly` **entityLayerMap**: `Map`<`string`, `Set`<[`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`>>>

***

### entityManager

**entityManager**: [`EntityManager`](/en/auto-docs/free-layout-editor/classes/EntityManager.md)

## Methods

### getLayerData

**getLayerData**(`layer`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `changed` | `boolean` |
| `observeDatas` | [`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>\[] |
| `observeEntities` | [`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>\[] |

***

### getLayerEntities

**getLayerEntities**(`layer`): `Object`

查询 layer 关联的实体

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `changed` | `boolean` |
| `entities` | [`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>\[] |

***

### getLayerEntityDatas

**getLayerEntityDatas**(`layer`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `changed` | `boolean` |
| `datas` | [`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>\[] |

***

### subscribeEntities

**subscribeEntities**(`layer`, `entities`): `void`

订阅关联的 entity，会影响 autorun

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`> |
| `entities` | [`EntityRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>>\[] |

#### Returns

`void`

***

### subscribleEntityByData

**subscribleEntityByData**(`layer`, `entity`, `data`): `void`

订阅 data 数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`> |
| `entity` | [`EntityRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>> |
| `data` | [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>> |

#### Returns

`void`
