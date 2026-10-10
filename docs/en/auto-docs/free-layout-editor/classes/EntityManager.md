# Class: EntityManager

TODO registry 改成 decorator
Entity 管理器，全局唯一

## Implements

* [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/EntityManager.md#constructor)

### Properties

* [changeEntityLocked](/en/auto-docs/free-layout-editor/classes/EntityManager.md#changeentitylocked)
* [context](/en/auto-docs/free-layout-editor/classes/EntityManager.md#context)
* [contributions](/en/auto-docs/free-layout-editor/classes/EntityManager.md#contributions)
* [fireEntityChanged](/en/auto-docs/free-layout-editor/classes/EntityManager.md#fireentitychanged)
* [fireEntityDataChanged](/en/auto-docs/free-layout-editor/classes/EntityManager.md#fireentitydatachanged)
* [fireEntityLifeCycleChanged](/en/auto-docs/free-layout-editor/classes/EntityManager.md#fireentitylifecyclechanged)
* [onEntityChange](/en/auto-docs/free-layout-editor/classes/EntityManager.md#onentitychange)
* [onEntityDataChange](/en/auto-docs/free-layout-editor/classes/EntityManager.md#onentitydatachange)
* [onEntityLifeCycleChange](/en/auto-docs/free-layout-editor/classes/EntityManager.md#onentitylifecyclechange)
* [toDispose](/en/auto-docs/free-layout-editor/classes/EntityManager.md#todispose)

### Methods

* [createEntity](/en/auto-docs/free-layout-editor/classes/EntityManager.md#createentity)
* [dispose](/en/auto-docs/free-layout-editor/classes/EntityManager.md#dispose)
* [getDataInjector](/en/auto-docs/free-layout-editor/classes/EntityManager.md#getdatainjector)
* [getDataRegistryByType](/en/auto-docs/free-layout-editor/classes/EntityManager.md#getdataregistrybytype)
* [getEntities](/en/auto-docs/free-layout-editor/classes/EntityManager.md#getentities)
* [getEntity](/en/auto-docs/free-layout-editor/classes/EntityManager.md#getentity)
* [getEntityById](/en/auto-docs/free-layout-editor/classes/EntityManager.md#getentitybyid)
* [getEntityDataVersion](/en/auto-docs/free-layout-editor/classes/EntityManager.md#getentitydataversion)
* [getEntityDatas](/en/auto-docs/free-layout-editor/classes/EntityManager.md#getentitydatas)
* [getEntityVersion](/en/auto-docs/free-layout-editor/classes/EntityManager.md#getentityversion)
* [getRegistryByType](/en/auto-docs/free-layout-editor/classes/EntityManager.md#getregistrybytype)
* [getService](/en/auto-docs/free-layout-editor/classes/EntityManager.md#getservice)
* [hasEntity](/en/auto-docs/free-layout-editor/classes/EntityManager.md#hasentity)
* [init](/en/auto-docs/free-layout-editor/classes/EntityManager.md#init)
* [isConfigEntity](/en/auto-docs/free-layout-editor/classes/EntityManager.md#isconfigentity)
* [registerEntity](/en/auto-docs/free-layout-editor/classes/EntityManager.md#registerentity)
* [registerEntityData](/en/auto-docs/free-layout-editor/classes/EntityManager.md#registerentitydata)
* [removeEntities](/en/auto-docs/free-layout-editor/classes/EntityManager.md#removeentities)
* [removeEntityById](/en/auto-docs/free-layout-editor/classes/EntityManager.md#removeentitybyid)
* [reset](/en/auto-docs/free-layout-editor/classes/EntityManager.md#reset)
* [resetEntities](/en/auto-docs/free-layout-editor/classes/EntityManager.md#resetentities)
* [resetEntity](/en/auto-docs/free-layout-editor/classes/EntityManager.md#resetentity)
* [restoreState](/en/auto-docs/free-layout-editor/classes/EntityManager.md#restorestate)
* [storeState](/en/auto-docs/free-layout-editor/classes/EntityManager.md#storestate)
* [updateConfigEntity](/en/auto-docs/free-layout-editor/classes/EntityManager.md#updateconfigentity)

## Constructors

### constructor

**new EntityManager**()

## Properties

### changeEntityLocked

**changeEntityLocked**: `boolean`

暂停触发实体类型变化

***

### context

**context**: `any`

***

### contributions

**contributions**: [`EntityManagerContribution`](/en/auto-docs/free-layout-editor/variables/EntityManagerContribution-1.md)\[]

***

### fireEntityChanged

**fireEntityChanged**: (`entity`: `string` | [`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>) => `void`

#### Type declaration

(`entity`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `string` | [`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)> |

##### Returns

`void`

***

### fireEntityDataChanged

**fireEntityDataChanged**: (`entityType`: `string`, `entityDataType`: `string`) => `void`

#### Type declaration

(`entityType`, `entityDataType`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `entityType` | `string` |
| `entityDataType` | `string` |

##### Returns

`void`

***

### fireEntityLifeCycleChanged

**fireEntityLifeCycleChanged**: (`__namedParameters`: { `entity`: [`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)> ; `type`: `"add"` | `"delete"` | `"update"`  }) => `void`

#### Type declaration

(`«destructured»`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `entity` | [`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)> |
| › `type` | `"add"` | `"delete"` | `"update"` |

##### Returns

`void`

***

### onEntityChange

`Readonly` **onEntityChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`string`>

当对应的实体类型变化后触发

***

### onEntityDataChange

`Readonly` **onEntityDataChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<{ `entityDataType`: `string` ; `entityType`: `string`  }>

entity data 数据变化

***

### onEntityLifeCycleChange

`Readonly` **onEntityLifeCycleChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<{ `entity`: [`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)> ; `type`: `"add"` | `"delete"` | `"update"`  }>

Entity 生命周期变化

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md)

## Methods

### createEntity

**createEntity**<`T`>(`Registry`, `opts?`): `T`

创建实体

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>> |
| `opts?` | `Omit`<`T`\[`"__opts_type__"`], `"entityManager"`> |

#### Returns

`T`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md).[dispose](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md#dispose)

***

### getDataInjector

**getDataInjector**(`registry`): `undefined` | [`EntityDataInjector`](/en/auto-docs/free-layout-editor/types/EntityDataInjector.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | `string` | [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>> |

#### Returns

`undefined` | [`EntityDataInjector`](/en/auto-docs/free-layout-editor/types/EntityDataInjector.md)

***

### getDataRegistryByType

**getDataRegistryByType**(`type`): `undefined` | [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`undefined` | [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>

***

### getEntities

**getEntities**<`T`>(`registry`): `T`\[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>> |

#### Returns

`T`\[]

***

### getEntity

**getEntity**<`T`>(`registry`, `autoCreate?`): `undefined` | `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `registry` | [`EntityRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>> | - |
| `autoCreate?` | `boolean` | 是否要自动创建，默认 false |

#### Returns

`undefined` | `T`

***

### getEntityById

**getEntityById**<`T`>(`id`): `undefined` | `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md), `T`> |

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
| `registry` | `string` | [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>> |

#### Returns

`number`

***

### getEntityDatas

**getEntityDatas**<`T`>(`entityRegistry`, `dataRegistry`): `T`\[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityRegistry` | [`EntityRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>> |
| `dataRegistry` | [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<`T`> |

#### Returns

`T`\[]

***

### getEntityVersion

**getEntityVersion**(`registry`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | `string` | [`EntityRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>> |

#### Returns

`number`

***

### getRegistryByType

**getRegistryByType**(`type`): `undefined` | [`EntityRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`undefined` | [`EntityRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>>

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
| `identifier` | [`ServiceIdentifier`](/en/auto-docs/free-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`

***

### hasEntity

**hasEntity**(`registry`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>> |

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
| `Registry` | [`EntityRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>> |

#### Returns

`void`

***

### registerEntityData

**registerEntityData**(`Registry`, `injector?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>> |
| `injector?` | [`EntityDataInjector`](/en/auto-docs/free-layout-editor/types/EntityDataInjector.md) |

#### Returns

`void`

***

### removeEntities

**removeEntities**(`Registry`): `void`

批量删除实体

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>> |

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
| `registry` | [`EntityRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>> |

#### Returns

`void`

***

### resetEntity

**resetEntity**(`registry`, `autoCreate?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>> |
| `autoCreate?` | `boolean` |

#### Returns

`void`

***

### restoreState

**restoreState**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`EntityJSON`](/en/auto-docs/free-layout-editor/interfaces/EntityJSON.md)\[] |

#### Returns

`void`

***

### storeState

**storeState**(`«destructured»?`): [`EntityJSON`](/en/auto-docs/free-layout-editor/interfaces/EntityJSON.md)\[]

只存储 config 数据，忽略动态数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `configOnly?` | `boolean` |

#### Returns

[`EntityJSON`](/en/auto-docs/free-layout-editor/interfaces/EntityJSON.md)\[]

***

### updateConfigEntity

**updateConfigEntity**<`E`>(`registry`, `config`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`ConfigEntity`](/en/auto-docs/free-layout-editor/classes/ConfigEntity.md)<[`ConfigEntityProps`](/en/auto-docs/free-layout-editor/interfaces/ConfigEntityProps.md), [`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md), `E`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>> |
| `config` | `Partial`<`E`\[`"config"`]> |

#### Returns

`void`
