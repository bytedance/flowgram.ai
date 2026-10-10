# Interface: Container

[interfaces](/en/auto-docs/fixed-layout-editor/modules/interfaces.md).Container

## Implemented by

* [`Container`](/en/auto-docs/fixed-layout-editor/classes/Container.md)

## Table of contents

### Properties

* [id](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#id)
* [options](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#options)
* [parent](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#parent)

### Methods

* [applyCustomMetadataReader](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#applycustommetadatareader)
* [applyMiddleware](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#applymiddleware)
* [bind](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#bind)
* [createChild](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#createchild)
* [get](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#get)
* [getAll](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#getall)
* [getAllAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#getallasync)
* [getAllNamed](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#getallnamed)
* [getAllNamedAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#getallnamedasync)
* [getAllTagged](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#getalltagged)
* [getAllTaggedAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#getalltaggedasync)
* [getAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#getasync)
* [getNamed](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#getnamed)
* [getNamedAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#getnamedasync)
* [getTagged](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#gettagged)
* [getTaggedAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#gettaggedasync)
* [isBound](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#isbound)
* [isBoundNamed](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#isboundnamed)
* [isBoundTagged](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#isboundtagged)
* [isCurrentBound](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#iscurrentbound)
* [load](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#load)
* [loadAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#loadasync)
* [onActivation](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#onactivation)
* [onDeactivation](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#ondeactivation)
* [rebind](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#rebind)
* [rebindAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#rebindasync)
* [resolve](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#resolve)
* [restore](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#restore)
* [snapshot](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#snapshot)
* [tryGet](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#tryget)
* [tryGetAll](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygetall)
* [tryGetAllAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygetallasync)
* [tryGetAllNamed](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygetallnamed)
* [tryGetAllNamedAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygetallnamedasync)
* [tryGetAllTagged](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygetalltagged)
* [tryGetAllTaggedAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygetalltaggedasync)
* [tryGetAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygetasync)
* [tryGetNamed](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygetnamed)
* [tryGetNamedAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygetnamedasync)
* [tryGetTagged](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygettagged)
* [tryGetTaggedAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygettaggedasync)
* [unbind](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#unbind)
* [unbindAll](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#unbindall)
* [unbindAllAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#unbindallasync)
* [unbindAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#unbindasync)
* [unload](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#unload)
* [unloadAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#unloadasync)

## Properties

### id

**id**: `number`

***

### options

**options**: [`ContainerOptions`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ContainerOptions.md)

***

### parent

**parent**: `null` | [`Container`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)

## Methods

### applyCustomMetadataReader

**applyCustomMetadataReader**(`metadataReader`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadataReader` | [`MetadataReader`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.MetadataReader.md) |

#### Returns

`void`

***

### applyMiddleware

**applyMiddleware**(`...middleware`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...middleware` | [`Middleware`](/en/auto-docs/fixed-layout-editor/types/interfaces.Middleware.md)\[] |

#### Returns

`void`

***

### bind

**bind**<`T`>(`serviceIdentifier`): [`BindingToSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingToSyntax.md)<`T`>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |

#### Returns

[`BindingToSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingToSyntax.md)<`T`>

***

### createChild

**createChild**(): [`Container`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)

#### Returns

[`Container`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)

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
| `options?` | [`GetAllOptions`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.GetAllOptions.md) |

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
| `options?` | [`GetAllOptions`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.GetAllOptions.md) |

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
| `...modules` | [`ContainerModule`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ContainerModule.md)\[] |

#### Returns

`void`

***

### loadAsync

**loadAsync**(`...modules`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...modules` | [`AsyncContainerModule`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.AsyncContainerModule.md)\[] |

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
| `onActivation` | [`BindingActivation`](/en/auto-docs/fixed-layout-editor/types/interfaces.BindingActivation.md)<`T`> |

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
| `onDeactivation` | [`BindingDeactivation`](/en/auto-docs/fixed-layout-editor/types/interfaces.BindingDeactivation.md)<`T`> |

#### Returns

`void`

***

### rebind

**rebind**<`T`>(`serviceIdentifier`): [`BindingToSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingToSyntax.md)<`T`>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

[`BindingToSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingToSyntax.md)<`T`>

***

### rebindAsync

**rebindAsync**<`T`>(`serviceIdentifier`): `Promise`<[`BindingToSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingToSyntax.md)<`T`>>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`Promise`<[`BindingToSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingToSyntax.md)<`T`>>

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
| `constructorFunction` | [`Newable`](/en/auto-docs/fixed-layout-editor/types/interfaces.Newable.md)<`T`> |

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `options?` | [`GetAllOptions`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.GetAllOptions.md) |

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `options?` | [`GetAllOptions`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.GetAllOptions.md) |

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`unknown`> |

#### Returns

`Promise`<`void`>

***

### unload

**unload**(`...modules`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...modules` | [`ContainerModuleBase`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ContainerModuleBase.md)\[] |

#### Returns

`void`

***

### unloadAsync

**unloadAsync**(`...modules`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...modules` | [`ContainerModuleBase`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ContainerModuleBase.md)\[] |

#### Returns

`Promise`<`void`>
