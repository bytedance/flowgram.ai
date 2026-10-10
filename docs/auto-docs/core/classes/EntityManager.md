# Class: EntityManager

TODO registry 改成 decorator
Entity 管理器，全局唯一

## Implements

* `Disposable`

## Table of contents

### Constructors

* [constructor](/auto-docs/core/classes/EntityManager.md#constructor)

### Properties

* [changeEntityLocked](/auto-docs/core/classes/EntityManager.md#changeentitylocked)
* [context](/auto-docs/core/classes/EntityManager.md#context)
* [contributions](/auto-docs/core/classes/EntityManager.md#contributions)
* [onEntityChange](/auto-docs/core/classes/EntityManager.md#onentitychange)
* [onEntityDataChange](/auto-docs/core/classes/EntityManager.md#onentitydatachange)
* [onEntityLifeCycleChange](/auto-docs/core/classes/EntityManager.md#onentitylifecyclechange)
* [toDispose](/auto-docs/core/classes/EntityManager.md#todispose)

### Methods

* [createEntity](/auto-docs/core/classes/EntityManager.md#createentity)
* [dispose](/auto-docs/core/classes/EntityManager.md#dispose)
* [fireEntityChanged](/auto-docs/core/classes/EntityManager.md#fireentitychanged)
* [fireEntityDataChanged](/auto-docs/core/classes/EntityManager.md#fireentitydatachanged)
* [fireEntityLifeCycleChanged](/auto-docs/core/classes/EntityManager.md#fireentitylifecyclechanged)
* [getDataInjector](/auto-docs/core/classes/EntityManager.md#getdatainjector)
* [getDataRegistryByType](/auto-docs/core/classes/EntityManager.md#getdataregistrybytype)
* [getEntities](/auto-docs/core/classes/EntityManager.md#getentities)
* [getEntity](/auto-docs/core/classes/EntityManager.md#getentity)
* [getEntityById](/auto-docs/core/classes/EntityManager.md#getentitybyid)
* [getEntityDataVersion](/auto-docs/core/classes/EntityManager.md#getentitydataversion)
* [getEntityDatas](/auto-docs/core/classes/EntityManager.md#getentitydatas)
* [getEntityVersion](/auto-docs/core/classes/EntityManager.md#getentityversion)
* [getRegistryByType](/auto-docs/core/classes/EntityManager.md#getregistrybytype)
* [getService](/auto-docs/core/classes/EntityManager.md#getservice)
* [hasEntity](/auto-docs/core/classes/EntityManager.md#hasentity)
* [init](/auto-docs/core/classes/EntityManager.md#init)
* [isConfigEntity](/auto-docs/core/classes/EntityManager.md#isconfigentity)
* [registerEntity](/auto-docs/core/classes/EntityManager.md#registerentity)
* [registerEntityData](/auto-docs/core/classes/EntityManager.md#registerentitydata)
* [removeEntities](/auto-docs/core/classes/EntityManager.md#removeentities)
* [removeEntityById](/auto-docs/core/classes/EntityManager.md#removeentitybyid)
* [reset](/auto-docs/core/classes/EntityManager.md#reset)
* [resetEntities](/auto-docs/core/classes/EntityManager.md#resetentities)
* [resetEntity](/auto-docs/core/classes/EntityManager.md#resetentity)
* [restoreState](/auto-docs/core/classes/EntityManager.md#restorestate)
* [storeState](/auto-docs/core/classes/EntityManager.md#storestate)
* [updateConfigEntity](/auto-docs/core/classes/EntityManager.md#updateconfigentity)

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

**contributions**: [`EntityManagerContribution`](/auto-docs/core/variables/EntityManagerContribution-1.md)\[]

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

`Readonly` **onEntityLifeCycleChange**: `Event`<{ `entity`: [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)> ; `type`: `"add"` | `"update"` | `"delete"`  }>

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
| `T` | extends [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |
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
| `entity` | `string` | [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)> |

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
| › `entity` | [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)> |
| › `type` | `"add"` | `"update"` | `"delete"` |

#### Returns

`void`

***

### getDataInjector

**getDataInjector**(`registry`): `undefined` | [`EntityDataInjector`](/auto-docs/core/types/EntityDataInjector.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | `string` | [`EntityDataRegistry`](/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}>> |

#### Returns

`undefined` | [`EntityDataInjector`](/auto-docs/core/types/EntityDataInjector.md)

***

### getDataRegistryByType

**getDataRegistryByType**(`type`): `undefined` | [`EntityDataRegistry`](/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}>>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`undefined` | [`EntityDataRegistry`](/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}>>

***

### getEntities

**getEntities**<`T`>(`registry`): `T`\[]

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

***

### getEntity

**getEntity**<`T`>(`registry`, `autoCreate?`): `undefined` | `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> | - |
| `autoCreate?` | `boolean` | 是否要自动创建，默认 false |

#### Returns

`undefined` | `T`

***

### getEntityById

**getEntityById**<`T`>(`id`): `undefined` | `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md), `T`> |

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
| `registry` | `string` | [`EntityDataRegistry`](/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}>> |

#### Returns

`number`

***

### getEntityDatas

**getEntityDatas**<`T`>(`entityRegistry`, `dataRegistry`): `T`\[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityRegistry` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |
| `dataRegistry` | [`EntityDataRegistry`](/auto-docs/core/interfaces/EntityDataRegistry.md)<`T`> |

#### Returns

`T`\[]

***

### getEntityVersion

**getEntityVersion**(`registry`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | `string` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |

#### Returns

`number`

***

### getRegistryByType

**getRegistryByType**(`type`): `undefined` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`undefined` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>>

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
| `registry` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |

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
| `Registry` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |

#### Returns

`void`

***

### registerEntityData

**registerEntityData**(`Registry`, `injector?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}>> |
| `injector?` | [`EntityDataInjector`](/auto-docs/core/types/EntityDataInjector.md) |

#### Returns

`void`

***

### removeEntities

**removeEntities**(`Registry`): `void`

批量删除实体

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |

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
| `registry` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |

#### Returns

`void`

***

### resetEntity

**resetEntity**(`registry`, `autoCreate?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |
| `autoCreate?` | `boolean` |

#### Returns

`void`

***

### restoreState

**restoreState**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`EntityJSON`](/auto-docs/core/interfaces/EntityJSON.md)\[] |

#### Returns

`void`

***

### storeState

**storeState**(`«destructured»?`): [`EntityJSON`](/auto-docs/core/interfaces/EntityJSON.md)\[]

只存储 config 数据，忽略动态数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `configOnly?` | `boolean` |

#### Returns

[`EntityJSON`](/auto-docs/core/interfaces/EntityJSON.md)\[]

***

### updateConfigEntity

**updateConfigEntity**<`E`>(`registry`, `config`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`ConfigEntity`](/auto-docs/core/classes/ConfigEntity.md)<[`ConfigEntityProps`](/auto-docs/core/interfaces/ConfigEntityProps.md), [`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md), `E`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |
| `config` | `Partial`<`E`\[`"config"`]> |

#### Returns

`void`
