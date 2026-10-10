# Class: EntityManager

TODO registry 改成 decorator
Entity 管理器，全局唯一

## Implements

* `Disposable`

## Table of contents

### Constructors

* [constructor](/en/auto-docs/core/classes/EntityManager.md#constructor)

### Properties

* [changeEntityLocked](/en/auto-docs/core/classes/EntityManager.md#changeentitylocked)
* [context](/en/auto-docs/core/classes/EntityManager.md#context)
* [contributions](/en/auto-docs/core/classes/EntityManager.md#contributions)
* [onEntityChange](/en/auto-docs/core/classes/EntityManager.md#onentitychange)
* [onEntityDataChange](/en/auto-docs/core/classes/EntityManager.md#onentitydatachange)
* [onEntityLifeCycleChange](/en/auto-docs/core/classes/EntityManager.md#onentitylifecyclechange)
* [toDispose](/en/auto-docs/core/classes/EntityManager.md#todispose)

### Methods

* [createEntity](/en/auto-docs/core/classes/EntityManager.md#createentity)
* [dispose](/en/auto-docs/core/classes/EntityManager.md#dispose)
* [fireEntityChanged](/en/auto-docs/core/classes/EntityManager.md#fireentitychanged)
* [fireEntityDataChanged](/en/auto-docs/core/classes/EntityManager.md#fireentitydatachanged)
* [fireEntityLifeCycleChanged](/en/auto-docs/core/classes/EntityManager.md#fireentitylifecyclechanged)
* [getDataInjector](/en/auto-docs/core/classes/EntityManager.md#getdatainjector)
* [getDataRegistryByType](/en/auto-docs/core/classes/EntityManager.md#getdataregistrybytype)
* [getEntities](/en/auto-docs/core/classes/EntityManager.md#getentities)
* [getEntity](/en/auto-docs/core/classes/EntityManager.md#getentity)
* [getEntityById](/en/auto-docs/core/classes/EntityManager.md#getentitybyid)
* [getEntityDataVersion](/en/auto-docs/core/classes/EntityManager.md#getentitydataversion)
* [getEntityDatas](/en/auto-docs/core/classes/EntityManager.md#getentitydatas)
* [getEntityVersion](/en/auto-docs/core/classes/EntityManager.md#getentityversion)
* [getRegistryByType](/en/auto-docs/core/classes/EntityManager.md#getregistrybytype)
* [getService](/en/auto-docs/core/classes/EntityManager.md#getservice)
* [hasEntity](/en/auto-docs/core/classes/EntityManager.md#hasentity)
* [init](/en/auto-docs/core/classes/EntityManager.md#init)
* [isConfigEntity](/en/auto-docs/core/classes/EntityManager.md#isconfigentity)
* [registerEntity](/en/auto-docs/core/classes/EntityManager.md#registerentity)
* [registerEntityData](/en/auto-docs/core/classes/EntityManager.md#registerentitydata)
* [removeEntities](/en/auto-docs/core/classes/EntityManager.md#removeentities)
* [removeEntityById](/en/auto-docs/core/classes/EntityManager.md#removeentitybyid)
* [reset](/en/auto-docs/core/classes/EntityManager.md#reset)
* [resetEntities](/en/auto-docs/core/classes/EntityManager.md#resetentities)
* [resetEntity](/en/auto-docs/core/classes/EntityManager.md#resetentity)
* [restoreState](/en/auto-docs/core/classes/EntityManager.md#restorestate)
* [storeState](/en/auto-docs/core/classes/EntityManager.md#storestate)
* [updateConfigEntity](/en/auto-docs/core/classes/EntityManager.md#updateconfigentity)

## Constructors

### constructor

**new EntityManager**()

## Properties

### changeEntityLocked

**changeEntityLocked**: `boolean` = `false`

暂停触发实体类型变化

***

### context

**context**: `any`

***

### contributions

**contributions**: [`EntityManagerContribution`](/en/auto-docs/core/variables/EntityManagerContribution-1.md)\[]

***

### onEntityChange

`Readonly` **onEntityChange**: `Event`<`string`>

当对应的实体类型变化后触发

***

### onEntityDataChange

`Readonly` **onEntityDataChange**: `Event`<{ `entityDataType`: `string` ; `entityType`: `string`  }>

entity data 数据变化

***

### onEntityLifeCycleChange

`Readonly` **onEntityLifeCycleChange**: `Event`<{ `entity`: [`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)> ; `type`: `"add"` | `"update"` | `"delete"`  }>

Entity 生命周期变化

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

## Methods

### createEntity

**createEntity**<`T`>(`Registry`, `opts?`): `T`

创建实体

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityRegistry`](/en/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>> |
| `opts?` | `Omit`<`T`\[`"__opts_type__"`], `"entityManager"`> |

#### Returns

`T`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

Disposable.dispose

***

### fireEntityChanged

**fireEntityChanged**(`entity`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `string` | [`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)> |

#### Returns

`void`

***

### fireEntityDataChanged

**fireEntityDataChanged**(`entityType`, `entityDataType`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityType` | `string` |
| `entityDataType` | `string` |

#### Returns

`void`

***

### fireEntityLifeCycleChanged

**fireEntityLifeCycleChanged**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `entity` | [`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)> |
| › `type` | `"add"` | `"update"` | `"delete"` |

#### Returns

`void`

***

### getDataInjector

**getDataInjector**(`registry`): `undefined` | [`EntityDataInjector`](/en/auto-docs/core/types/EntityDataInjector.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | `string` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}>> |

#### Returns

`undefined` | [`EntityDataInjector`](/en/auto-docs/core/types/EntityDataInjector.md)

***

### getDataRegistryByType

**getDataRegistryByType**(`type`): `undefined` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}>>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`undefined` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}>>

***

### getEntities

**getEntities**<`T`>(`registry`): `T`\[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/en/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>> |

#### Returns

`T`\[]

***

### getEntity

**getEntity**<`T`>(`registry`, `autoCreate?`): `undefined` | `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `registry` | [`EntityRegistry`](/en/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>> | - |
| `autoCreate?` | `boolean` | 是否要自动创建，默认 false |

#### Returns

`undefined` | `T`

***

### getEntityById

**getEntityById**<`T`>(`id`): `undefined` | `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` | `T`

***

### getEntityDataVersion

**getEntityDataVersion**(`registry`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | `string` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}>> |

#### Returns

`number`

***

### getEntityDatas

**getEntityDatas**<`T`>(`entityRegistry`, `dataRegistry`): `T`\[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityRegistry` | [`EntityRegistry`](/en/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>> |
| `dataRegistry` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<`T`> |

#### Returns

`T`\[]

***

### getEntityVersion

**getEntityVersion**(`registry`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | `string` | [`EntityRegistry`](/en/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>> |

#### Returns

`number`

***

### getRegistryByType

**getRegistryByType**(`type`): `undefined` | [`EntityRegistry`](/en/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`undefined` | [`EntityRegistry`](/en/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>>

***

### getService

**getService**<`T`>(`identifier`): `T`

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

***

### hasEntity

**hasEntity**(`registry`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/en/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>> |

#### Returns

`boolean`

***

### init

**init**(): `void`

#### Returns

`void`

***

### isConfigEntity

**isConfigEntity**(`type`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`boolean`

***

### registerEntity

**registerEntity**(`Registry`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityRegistry`](/en/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>> |

#### Returns

`void`

***

### registerEntityData

**registerEntityData**(`Registry`, `injector?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}>> |
| `injector?` | [`EntityDataInjector`](/en/auto-docs/core/types/EntityDataInjector.md) |

#### Returns

`void`

***

### removeEntities

**removeEntities**(`Registry`): `void`

批量删除实体

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityRegistry`](/en/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>> |

#### Returns

`void`

***

### removeEntityById

**removeEntityById**(`id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`boolean`

***

### reset

**reset**(): `void`

重制所有 entity 为初始化状态

#### Returns

`void`

***

### resetEntities

**resetEntities**(`registry`): `void`

触发实体 reset

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/en/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>> |

#### Returns

`void`

***

### resetEntity

**resetEntity**(`registry`, `autoCreate?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/en/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>> |
| `autoCreate?` | `boolean` |

#### Returns

`void`

***

### restoreState

**restoreState**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`EntityJSON`](/en/auto-docs/core/interfaces/EntityJSON.md)\[] |

#### Returns

`void`

***

### storeState

**storeState**(`«destructured»?`): [`EntityJSON`](/en/auto-docs/core/interfaces/EntityJSON.md)\[]

只存储 config 数据，忽略动态数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `configOnly?` | `boolean` |

#### Returns

[`EntityJSON`](/en/auto-docs/core/interfaces/EntityJSON.md)\[]

***

### updateConfigEntity

**updateConfigEntity**<`E`>(`registry`, `config`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`ConfigEntity`](/en/auto-docs/core/classes/ConfigEntity.md)<[`ConfigEntityProps`](/en/auto-docs/core/interfaces/ConfigEntityProps.md), [`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md), `E`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/en/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>> |
| `config` | `Partial`<`E`\[`"config"`]> |

#### Returns

`void`
