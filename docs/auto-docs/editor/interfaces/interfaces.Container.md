# Interface: Container

[interfaces](/auto-docs/editor/modules/interfaces.md).Container

## Implemented by

* [`Container`](/auto-docs/editor/classes/Container.md)

## Table of contents

### Properties

* [id](/auto-docs/editor/interfaces/interfaces.Container.md#id)
* [options](/auto-docs/editor/interfaces/interfaces.Container.md#options)
* [parent](/auto-docs/editor/interfaces/interfaces.Container.md#parent)

### Methods

* [applyCustomMetadataReader](/auto-docs/editor/interfaces/interfaces.Container.md#applycustommetadatareader)
* [applyMiddleware](/auto-docs/editor/interfaces/interfaces.Container.md#applymiddleware)
* [bind](/auto-docs/editor/interfaces/interfaces.Container.md#bind)
* [createChild](/auto-docs/editor/interfaces/interfaces.Container.md#createchild)
* [get](/auto-docs/editor/interfaces/interfaces.Container.md#get)
* [getAll](/auto-docs/editor/interfaces/interfaces.Container.md#getall)
* [getAllAsync](/auto-docs/editor/interfaces/interfaces.Container.md#getallasync)
* [getAllNamed](/auto-docs/editor/interfaces/interfaces.Container.md#getallnamed)
* [getAllNamedAsync](/auto-docs/editor/interfaces/interfaces.Container.md#getallnamedasync)
* [getAllTagged](/auto-docs/editor/interfaces/interfaces.Container.md#getalltagged)
* [getAllTaggedAsync](/auto-docs/editor/interfaces/interfaces.Container.md#getalltaggedasync)
* [getAsync](/auto-docs/editor/interfaces/interfaces.Container.md#getasync)
* [getNamed](/auto-docs/editor/interfaces/interfaces.Container.md#getnamed)
* [getNamedAsync](/auto-docs/editor/interfaces/interfaces.Container.md#getnamedasync)
* [getTagged](/auto-docs/editor/interfaces/interfaces.Container.md#gettagged)
* [getTaggedAsync](/auto-docs/editor/interfaces/interfaces.Container.md#gettaggedasync)
* [isBound](/auto-docs/editor/interfaces/interfaces.Container.md#isbound)
* [isBoundNamed](/auto-docs/editor/interfaces/interfaces.Container.md#isboundnamed)
* [isBoundTagged](/auto-docs/editor/interfaces/interfaces.Container.md#isboundtagged)
* [isCurrentBound](/auto-docs/editor/interfaces/interfaces.Container.md#iscurrentbound)
* [load](/auto-docs/editor/interfaces/interfaces.Container.md#load)
* [loadAsync](/auto-docs/editor/interfaces/interfaces.Container.md#loadasync)
* [onActivation](/auto-docs/editor/interfaces/interfaces.Container.md#onactivation)
* [onDeactivation](/auto-docs/editor/interfaces/interfaces.Container.md#ondeactivation)
* [rebind](/auto-docs/editor/interfaces/interfaces.Container.md#rebind)
* [rebindAsync](/auto-docs/editor/interfaces/interfaces.Container.md#rebindasync)
* [resolve](/auto-docs/editor/interfaces/interfaces.Container.md#resolve)
* [restore](/auto-docs/editor/interfaces/interfaces.Container.md#restore)
* [snapshot](/auto-docs/editor/interfaces/interfaces.Container.md#snapshot)
* [tryGet](/auto-docs/editor/interfaces/interfaces.Container.md#tryget)
* [tryGetAll](/auto-docs/editor/interfaces/interfaces.Container.md#trygetall)
* [tryGetAllAsync](/auto-docs/editor/interfaces/interfaces.Container.md#trygetallasync)
* [tryGetAllNamed](/auto-docs/editor/interfaces/interfaces.Container.md#trygetallnamed)
* [tryGetAllNamedAsync](/auto-docs/editor/interfaces/interfaces.Container.md#trygetallnamedasync)
* [tryGetAllTagged](/auto-docs/editor/interfaces/interfaces.Container.md#trygetalltagged)
* [tryGetAllTaggedAsync](/auto-docs/editor/interfaces/interfaces.Container.md#trygetalltaggedasync)
* [tryGetAsync](/auto-docs/editor/interfaces/interfaces.Container.md#trygetasync)
* [tryGetNamed](/auto-docs/editor/interfaces/interfaces.Container.md#trygetnamed)
* [tryGetNamedAsync](/auto-docs/editor/interfaces/interfaces.Container.md#trygetnamedasync)
* [tryGetTagged](/auto-docs/editor/interfaces/interfaces.Container.md#trygettagged)
* [tryGetTaggedAsync](/auto-docs/editor/interfaces/interfaces.Container.md#trygettaggedasync)
* [unbind](/auto-docs/editor/interfaces/interfaces.Container.md#unbind)
* [unbindAll](/auto-docs/editor/interfaces/interfaces.Container.md#unbindall)
* [unbindAllAsync](/auto-docs/editor/interfaces/interfaces.Container.md#unbindallasync)
* [unbindAsync](/auto-docs/editor/interfaces/interfaces.Container.md#unbindasync)
* [unload](/auto-docs/editor/interfaces/interfaces.Container.md#unload)
* [unloadAsync](/auto-docs/editor/interfaces/interfaces.Container.md#unloadasync)

## Properties

### id

**id**: `number`

***

### options

**options**: [`ContainerOptions`](/auto-docs/editor/interfaces/interfaces.ContainerOptions.md)

***

### parent

**parent**: `null` | [`Container`](/auto-docs/editor/interfaces/interfaces.Container.md)

## Methods

### applyCustomMetadataReader

**applyCustomMetadataReader**(`metadataReader`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadataReader` | [`MetadataReader`](/auto-docs/editor/interfaces/interfaces.MetadataReader.md) |

#### Returns

`void`

***

### applyMiddleware

**applyMiddleware**(`...middleware`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...middleware` | [`Middleware`](/auto-docs/editor/types/interfaces.Middleware.md)\[] |

#### Returns

`void`

***

### bind

**bind**<`T`>(`serviceIdentifier`): [`BindingToSyntax`](/auto-docs/editor/interfaces/interfaces.BindingToSyntax.md)<`T`>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |

#### Returns

[`BindingToSyntax`](/auto-docs/editor/interfaces/interfaces.BindingToSyntax.md)<`T`>

***

### createChild

**createChild**(): [`Container`](/auto-docs/editor/interfaces/interfaces.Container.md)

#### Returns

[`Container`](/auto-docs/editor/interfaces/interfaces.Container.md)

***

### get

**get**<`T`>(`serviceIdentifier`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |

#### Returns

`T`

***

### getAll

**getAll**<`T`>(`serviceIdentifier`, `options?`): `T`\[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |
| `options?` | [`GetAllOptions`](/auto-docs/editor/interfaces/interfaces.GetAllOptions.md) |

#### Returns

`T`\[]

***

### getAllAsync

**getAllAsync**<`T`>(`serviceIdentifier`, `options?`): `Promise`<`T`\[]>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |
| `options?` | [`GetAllOptions`](/auto-docs/editor/interfaces/interfaces.GetAllOptions.md) |

#### Returns

`Promise`<`T`\[]>

***

### getAllNamed

**getAllNamed**<`T`>(`serviceIdentifier`, `named`): `T`\[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |
| `named` | `string` | `number` | `symbol` |

#### Returns

`T`\[]

***

### getAllNamedAsync

**getAllNamedAsync**<`T`>(`serviceIdentifier`, `named`): `Promise`<`T`\[]>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |
| `named` | `string` | `number` | `symbol` |

#### Returns

`Promise`<`T`\[]>

***

### getAllTagged

**getAllTagged**<`T`>(`serviceIdentifier`, `key`, `value`): `T`\[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`T`\[]

***

### getAllTaggedAsync

**getAllTaggedAsync**<`T`>(`serviceIdentifier`, `key`, `value`): `Promise`<`T`\[]>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`Promise`<`T`\[]>

***

### getAsync

**getAsync**<`T`>(`serviceIdentifier`): `Promise`<`T`>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |

#### Returns

`Promise`<`T`>

***

### getNamed

**getNamed**<`T`>(`serviceIdentifier`, `named`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |
| `named` | `string` | `number` | `symbol` |

#### Returns

`T`

***

### getNamedAsync

**getNamedAsync**<`T`>(`serviceIdentifier`, `named`): `Promise`<`T`>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |
| `named` | `string` | `number` | `symbol` |

#### Returns

`Promise`<`T`>

***

### getTagged

**getTagged**<`T`>(`serviceIdentifier`, `key`, `value`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`T`

***

### getTaggedAsync

**getTaggedAsync**<`T`>(`serviceIdentifier`, `key`, `value`): `Promise`<`T`>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`Promise`<`T`>

***

### isBound

**isBound**(`serviceIdentifier`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier` |

#### Returns

`boolean`

***

### isBoundNamed

**isBoundNamed**(`serviceIdentifier`, `named`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier` |
| `named` | `string` | `number` | `symbol` |

#### Returns

`boolean`

***

### isBoundTagged

**isBoundTagged**(`serviceIdentifier`, `key`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier` |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`boolean`

***

### isCurrentBound

**isCurrentBound**<`T`>(`serviceIdentifier`): `boolean`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |

#### Returns

`boolean`

***

### load

**load**(`...modules`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...modules` | [`ContainerModule`](/auto-docs/editor/interfaces/interfaces.ContainerModule.md)\[] |

#### Returns

`void`

***

### loadAsync

**loadAsync**(`...modules`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...modules` | [`AsyncContainerModule`](/auto-docs/editor/interfaces/interfaces.AsyncContainerModule.md)\[] |

#### Returns

`Promise`<`void`>

***

### onActivation

**onActivation**<`T`>(`serviceIdentifier`, `onActivation`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |
| `onActivation` | [`BindingActivation`](/auto-docs/editor/types/interfaces.BindingActivation.md)<`T`> |

#### Returns

`void`

***

### onDeactivation

**onDeactivation**<`T`>(`serviceIdentifier`, `onDeactivation`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |
| `onDeactivation` | [`BindingDeactivation`](/auto-docs/editor/types/interfaces.BindingDeactivation.md)<`T`> |

#### Returns

`void`

***

### rebind

**rebind**<`T`>(`serviceIdentifier`): [`BindingToSyntax`](/auto-docs/editor/interfaces/interfaces.BindingToSyntax.md)<`T`>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

[`BindingToSyntax`](/auto-docs/editor/interfaces/interfaces.BindingToSyntax.md)<`T`>

***

### rebindAsync

**rebindAsync**<`T`>(`serviceIdentifier`): `Promise`<[`BindingToSyntax`](/auto-docs/editor/interfaces/interfaces.BindingToSyntax.md)<`T`>>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`Promise`<[`BindingToSyntax`](/auto-docs/editor/interfaces/interfaces.BindingToSyntax.md)<`T`>>

***

### resolve

**resolve**<`T`>(`constructorFunction`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `constructorFunction` | [`Newable`](/auto-docs/editor/types/interfaces.Newable.md)<`T`> |

#### Returns

`T`

***

### restore

**restore**(): `void`

#### Returns

`void`

***

### snapshot

**snapshot**(): `void`

#### Returns

`void`

***

### tryGet

**tryGet**<`T`>(`serviceIdentifier`): `undefined` | `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`undefined` | `T`

***

### tryGetAll

**tryGetAll**<`T`>(`serviceIdentifier`, `options?`): `T`\[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `options?` | [`GetAllOptions`](/auto-docs/editor/interfaces/interfaces.GetAllOptions.md) |

#### Returns

`T`\[]

***

### tryGetAllAsync

**tryGetAllAsync**<`T`>(`serviceIdentifier`, `options?`): `Promise`<`T`\[]>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `options?` | [`GetAllOptions`](/auto-docs/editor/interfaces/interfaces.GetAllOptions.md) |

#### Returns

`Promise`<`T`\[]>

***

### tryGetAllNamed

**tryGetAllNamed**<`T`>(`serviceIdentifier`, `named`): `T`\[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `named` | `string` | `number` | `symbol` |

#### Returns

`T`\[]

***

### tryGetAllNamedAsync

**tryGetAllNamedAsync**<`T`>(`serviceIdentifier`, `named`): `Promise`<`T`\[]>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `named` | `string` | `number` | `symbol` |

#### Returns

`Promise`<`T`\[]>

***

### tryGetAllTagged

**tryGetAllTagged**<`T`>(`serviceIdentifier`, `key`, `value`): `T`\[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`T`\[]

***

### tryGetAllTaggedAsync

**tryGetAllTaggedAsync**<`T`>(`serviceIdentifier`, `key`, `value`): `Promise`<`T`\[]>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`Promise`<`T`\[]>

***

### tryGetAsync

**tryGetAsync**<`T`>(`serviceIdentifier`): `Promise`<`undefined` | `T`>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`Promise`<`undefined` | `T`>

***

### tryGetNamed

**tryGetNamed**<`T`>(`serviceIdentifier`, `named`): `undefined` | `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `named` | `string` | `number` | `symbol` |

#### Returns

`undefined` | `T`

***

### tryGetNamedAsync

**tryGetNamedAsync**<`T`>(`serviceIdentifier`, `named`): `Promise`<`undefined` | `T`>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `named` | `string` | `number` | `symbol` |

#### Returns

`Promise`<`undefined` | `T`>

***

### tryGetTagged

**tryGetTagged**<`T`>(`serviceIdentifier`, `key`, `value`): `undefined` | `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`undefined` | `T`

***

### tryGetTaggedAsync

**tryGetTaggedAsync**<`T`>(`serviceIdentifier`, `key`, `value`): `Promise`<`undefined` | `T`>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`Promise`<`undefined` | `T`>

***

### unbind

**unbind**(`serviceIdentifier`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier` |

#### Returns

`void`

***

### unbindAll

**unbindAll**(): `void`

#### Returns

`void`

***

### unbindAllAsync

**unbindAllAsync**(): `Promise`<`void`>

#### Returns

`Promise`<`void`>

***

### unbindAsync

**unbindAsync**(`serviceIdentifier`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`unknown`> |

#### Returns

`Promise`<`void`>

***

### unload

**unload**(`...modules`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...modules` | [`ContainerModuleBase`](/auto-docs/editor/interfaces/interfaces.ContainerModuleBase.md)\[] |

#### Returns

`void`

***

### unloadAsync

**unloadAsync**(`...modules`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...modules` | [`ContainerModuleBase`](/auto-docs/editor/interfaces/interfaces.ContainerModuleBase.md)\[] |

#### Returns

`Promise`<`void`>
