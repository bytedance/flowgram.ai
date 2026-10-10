# Class: EntityManager

TODO registry 改成 decorator
Entity 管理器，全局唯一

## Implements

* [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/EntityManager.md#constructor)

### Properties

* [changeEntityLocked](/auto-docs/fixed-layout-editor/classes/EntityManager.md#changeentitylocked)
* [context](/auto-docs/fixed-layout-editor/classes/EntityManager.md#context)
* [contributions](/auto-docs/fixed-layout-editor/classes/EntityManager.md#contributions)
* [fireEntityChanged](/auto-docs/fixed-layout-editor/classes/EntityManager.md#fireentitychanged)
* [fireEntityDataChanged](/auto-docs/fixed-layout-editor/classes/EntityManager.md#fireentitydatachanged)
* [fireEntityLifeCycleChanged](/auto-docs/fixed-layout-editor/classes/EntityManager.md#fireentitylifecyclechanged)
* [onEntityChange](/auto-docs/fixed-layout-editor/classes/EntityManager.md#onentitychange)
* [onEntityDataChange](/auto-docs/fixed-layout-editor/classes/EntityManager.md#onentitydatachange)
* [onEntityLifeCycleChange](/auto-docs/fixed-layout-editor/classes/EntityManager.md#onentitylifecyclechange)
* [toDispose](/auto-docs/fixed-layout-editor/classes/EntityManager.md#todispose)

### Methods

* [createEntity](/auto-docs/fixed-layout-editor/classes/EntityManager.md#createentity)
* [dispose](/auto-docs/fixed-layout-editor/classes/EntityManager.md#dispose)
* [getDataInjector](/auto-docs/fixed-layout-editor/classes/EntityManager.md#getdatainjector)
* [getDataRegistryByType](/auto-docs/fixed-layout-editor/classes/EntityManager.md#getdataregistrybytype)
* [getEntities](/auto-docs/fixed-layout-editor/classes/EntityManager.md#getentities)
* [getEntity](/auto-docs/fixed-layout-editor/classes/EntityManager.md#getentity)
* [getEntityById](/auto-docs/fixed-layout-editor/classes/EntityManager.md#getentitybyid)
* [getEntityDataVersion](/auto-docs/fixed-layout-editor/classes/EntityManager.md#getentitydataversion)
* [getEntityDatas](/auto-docs/fixed-layout-editor/classes/EntityManager.md#getentitydatas)
* [getEntityVersion](/auto-docs/fixed-layout-editor/classes/EntityManager.md#getentityversion)
* [getRegistryByType](/auto-docs/fixed-layout-editor/classes/EntityManager.md#getregistrybytype)
* [getService](/auto-docs/fixed-layout-editor/classes/EntityManager.md#getservice)
* [hasEntity](/auto-docs/fixed-layout-editor/classes/EntityManager.md#hasentity)
* [init](/auto-docs/fixed-layout-editor/classes/EntityManager.md#init)
* [isConfigEntity](/auto-docs/fixed-layout-editor/classes/EntityManager.md#isconfigentity)
* [registerEntity](/auto-docs/fixed-layout-editor/classes/EntityManager.md#registerentity)
* [registerEntityData](/auto-docs/fixed-layout-editor/classes/EntityManager.md#registerentitydata)
* [removeEntities](/auto-docs/fixed-layout-editor/classes/EntityManager.md#removeentities)
* [removeEntityById](/auto-docs/fixed-layout-editor/classes/EntityManager.md#removeentitybyid)
* [reset](/auto-docs/fixed-layout-editor/classes/EntityManager.md#reset)
* [resetEntities](/auto-docs/fixed-layout-editor/classes/EntityManager.md#resetentities)
* [resetEntity](/auto-docs/fixed-layout-editor/classes/EntityManager.md#resetentity)
* [restoreState](/auto-docs/fixed-layout-editor/classes/EntityManager.md#restorestate)
* [storeState](/auto-docs/fixed-layout-editor/classes/EntityManager.md#storestate)
* [updateConfigEntity](/auto-docs/fixed-layout-editor/classes/EntityManager.md#updateconfigentity)

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

**contributions**: [`EntityManagerContribution`](/auto-docs/fixed-layout-editor/variables/EntityManagerContribution-1.md)\[]

***

### fireEntityChanged

**fireEntityChanged**: (`entity`: `string` | [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>) => `void`

#### Type declaration

(`entity`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `string` | [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)> |

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

**fireEntityLifeCycleChanged**: (`__namedParameters`: { `entity`: [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)> ; `type`: `"add"` | `"delete"` | `"update"`  }) => `void`

#### Type declaration

(`«destructured»`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `entity` | [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)> |
| › `type` | `"add"` | `"delete"` | `"update"` |

##### Returns

`void`

***

### onEntityChange

`Readonly` **onEntityChange**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`string`>

当对应的实体类型变化后触发

***

### onEntityDataChange

`Readonly` **onEntityDataChange**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<{ `entityDataType`: `string` ; `entityType`: `string`  }>

entity data 数据变化

***

### onEntityLifeCycleChange

`Readonly` **onEntityLifeCycleChange**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<{ `entity`: [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)> ; `type`: `"add"` | `"delete"` | `"update"`  }>

Entity 生命周期变化

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

## Methods

### createEntity

**createEntity**<`T`>(`Registry`, `opts?`): `T`

创建实体

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |
| `opts?` | `Omit`<`T`\[`"__opts_type__"`], `"entityManager"`> |

#### Returns

`T`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md).[dispose](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md#dispose)

***

### getDataInjector

**getDataInjector**(`registry`): `undefined` | [`EntityDataInjector`](/auto-docs/fixed-layout-editor/types/EntityDataInjector.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | `string` | [`EntityDataRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>> |

#### Returns

`undefined` | [`EntityDataInjector`](/auto-docs/fixed-layout-editor/types/EntityDataInjector.md)

***

### getDataRegistryByType

**getDataRegistryByType**(`type`): `undefined` | [`EntityDataRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`undefined` | [`EntityDataRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>>

***

### getEntities

**getEntities**<`T`>(`registry`): `T`\[]

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

### getEntity

**getEntity**<`T`>(`registry`, `autoCreate?`): `undefined` | `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md), `T`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> | - |
| `autoCreate?` | `boolean` | 是否要自动创建，默认 false |

#### Returns

`undefined` | `T`

***

### getEntityById

**getEntityById**<`T`>(`id`): `undefined` | `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md), `T`> |

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
| `registry` | `string` | [`EntityDataRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>> |

#### Returns

`number`

***

### getEntityDatas

**getEntityDatas**<`T`>(`entityRegistry`, `dataRegistry`): `T`\[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityRegistry` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |
| `dataRegistry` | [`EntityDataRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<`T`> |

#### Returns

`T`\[]

***

### getEntityVersion

**getEntityVersion**(`registry`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | `string` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |

#### Returns

`number`

***

### getRegistryByType

**getRegistryByType**(`type`): `undefined` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`undefined` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>>

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
| `identifier` | [`ServiceIdentifier`](/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`

***

### hasEntity

**hasEntity**(`registry`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |

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
| `Registry` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |

#### Returns

`void`

***

### registerEntityData

**registerEntityData**(`Registry`, `injector?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>> |
| `injector?` | [`EntityDataInjector`](/auto-docs/fixed-layout-editor/types/EntityDataInjector.md) |

#### Returns

`void`

***

### removeEntities

**removeEntities**(`Registry`): `void`

批量删除实体

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |

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
| `registry` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |

#### Returns

`void`

***

### resetEntity

**resetEntity**(`registry`, `autoCreate?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |
| `autoCreate?` | `boolean` |

#### Returns

`void`

***

### restoreState

**restoreState**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`EntityJSON`](/auto-docs/fixed-layout-editor/interfaces/EntityJSON.md)\[] |

#### Returns

`void`

***

### storeState

**storeState**(`«destructured»?`): [`EntityJSON`](/auto-docs/fixed-layout-editor/interfaces/EntityJSON.md)\[]

只存储 config 数据，忽略动态数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `configOnly?` | `boolean` |

#### Returns

[`EntityJSON`](/auto-docs/fixed-layout-editor/interfaces/EntityJSON.md)\[]

***

### updateConfigEntity

**updateConfigEntity**<`E`>(`registry`, `config`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`ConfigEntity`](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md)<[`ConfigEntityProps`](/auto-docs/fixed-layout-editor/interfaces/ConfigEntityProps.md), [`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md), `E`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`EntityRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>> |
| `config` | `Partial`<`E`\[`"config"`]> |

#### Returns

`void`
