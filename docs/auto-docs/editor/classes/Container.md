# Class: Container

## Implements

* [`Container`](/auto-docs/editor/interfaces/interfaces.Container.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/Container.md#constructor)

### Properties

* [id](/auto-docs/editor/classes/Container.md#id)
* [options](/auto-docs/editor/classes/Container.md#options)
* [parent](/auto-docs/editor/classes/Container.md#parent)

### Methods

* [applyCustomMetadataReader](/auto-docs/editor/classes/Container.md#applycustommetadatareader)
* [applyMiddleware](/auto-docs/editor/classes/Container.md#applymiddleware)
* [bind](/auto-docs/editor/classes/Container.md#bind)
* [createChild](/auto-docs/editor/classes/Container.md#createchild)
* [get](/auto-docs/editor/classes/Container.md#get)
* [getAll](/auto-docs/editor/classes/Container.md#getall)
* [getAllAsync](/auto-docs/editor/classes/Container.md#getallasync)
* [getAllNamed](/auto-docs/editor/classes/Container.md#getallnamed)
* [getAllNamedAsync](/auto-docs/editor/classes/Container.md#getallnamedasync)
* [getAllTagged](/auto-docs/editor/classes/Container.md#getalltagged)
* [getAllTaggedAsync](/auto-docs/editor/classes/Container.md#getalltaggedasync)
* [getAsync](/auto-docs/editor/classes/Container.md#getasync)
* [getNamed](/auto-docs/editor/classes/Container.md#getnamed)
* [getNamedAsync](/auto-docs/editor/classes/Container.md#getnamedasync)
* [getTagged](/auto-docs/editor/classes/Container.md#gettagged)
* [getTaggedAsync](/auto-docs/editor/classes/Container.md#gettaggedasync)
* [isBound](/auto-docs/editor/classes/Container.md#isbound)
* [isBoundNamed](/auto-docs/editor/classes/Container.md#isboundnamed)
* [isBoundTagged](/auto-docs/editor/classes/Container.md#isboundtagged)
* [isCurrentBound](/auto-docs/editor/classes/Container.md#iscurrentbound)
* [load](/auto-docs/editor/classes/Container.md#load)
* [loadAsync](/auto-docs/editor/classes/Container.md#loadasync)
* [onActivation](/auto-docs/editor/classes/Container.md#onactivation)
* [onDeactivation](/auto-docs/editor/classes/Container.md#ondeactivation)
* [rebind](/auto-docs/editor/classes/Container.md#rebind)
* [rebindAsync](/auto-docs/editor/classes/Container.md#rebindasync)
* [resolve](/auto-docs/editor/classes/Container.md#resolve)
* [restore](/auto-docs/editor/classes/Container.md#restore)
* [snapshot](/auto-docs/editor/classes/Container.md#snapshot)
* [tryGet](/auto-docs/editor/classes/Container.md#tryget)
* [tryGetAll](/auto-docs/editor/classes/Container.md#trygetall)
* [tryGetAllAsync](/auto-docs/editor/classes/Container.md#trygetallasync)
* [tryGetAllNamed](/auto-docs/editor/classes/Container.md#trygetallnamed)
* [tryGetAllNamedAsync](/auto-docs/editor/classes/Container.md#trygetallnamedasync)
* [tryGetAllTagged](/auto-docs/editor/classes/Container.md#trygetalltagged)
* [tryGetAllTaggedAsync](/auto-docs/editor/classes/Container.md#trygetalltaggedasync)
* [tryGetAsync](/auto-docs/editor/classes/Container.md#trygetasync)
* [tryGetNamed](/auto-docs/editor/classes/Container.md#trygetnamed)
* [tryGetNamedAsync](/auto-docs/editor/classes/Container.md#trygetnamedasync)
* [tryGetTagged](/auto-docs/editor/classes/Container.md#trygettagged)
* [tryGetTaggedAsync](/auto-docs/editor/classes/Container.md#trygettaggedasync)
* [unbind](/auto-docs/editor/classes/Container.md#unbind)
* [unbindAll](/auto-docs/editor/classes/Container.md#unbindall)
* [unbindAllAsync](/auto-docs/editor/classes/Container.md#unbindallasync)
* [unbindAsync](/auto-docs/editor/classes/Container.md#unbindasync)
* [unload](/auto-docs/editor/classes/Container.md#unload)
* [unloadAsync](/auto-docs/editor/classes/Container.md#unloadasync)
* [merge](/auto-docs/editor/classes/Container.md#merge)

## Constructors

### constructor

**new Container**(`containerOptions?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `containerOptions?` | [`ContainerOptions`](/auto-docs/editor/interfaces/interfaces.ContainerOptions.md) |

## Properties

### id

**id**: `number`

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[id](/auto-docs/editor/interfaces/interfaces.Container.md#id)

***

### options

`Readonly` **options**: [`ContainerOptions`](/auto-docs/editor/interfaces/interfaces.ContainerOptions.md)

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[options](/auto-docs/editor/interfaces/interfaces.Container.md#options)

***

### parent

**parent**: `null` | [`Container`](/auto-docs/editor/interfaces/interfaces.Container.md)

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[parent](/auto-docs/editor/interfaces/interfaces.Container.md#parent)

## Methods

### applyCustomMetadataReader

**applyCustomMetadataReader**(`metadataReader`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadataReader` | [`MetadataReader`](/auto-docs/editor/interfaces/interfaces.MetadataReader.md) |

#### Returns

`void`

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[applyCustomMetadataReader](/auto-docs/editor/interfaces/interfaces.Container.md#applycustommetadatareader)

***

### applyMiddleware

**applyMiddleware**(`...middlewares`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...middlewares` | [`Middleware`](/auto-docs/editor/types/interfaces.Middleware.md)\[] |

#### Returns

`void`

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[applyMiddleware](/auto-docs/editor/interfaces/interfaces.Container.md#applymiddleware)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

[`BindingToSyntax`](/auto-docs/editor/interfaces/interfaces.BindingToSyntax.md)<`T`>

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[bind](/auto-docs/editor/interfaces/interfaces.Container.md#bind)

***

### createChild

**createChild**(`containerOptions?`): [`Container`](/auto-docs/editor/classes/Container.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `containerOptions?` | [`ContainerOptions`](/auto-docs/editor/interfaces/interfaces.ContainerOptions.md) |

#### Returns

[`Container`](/auto-docs/editor/classes/Container.md)

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[createChild](/auto-docs/editor/interfaces/interfaces.Container.md#createchild)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[get](/auto-docs/editor/interfaces/interfaces.Container.md#get)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `options?` | [`GetAllOptions`](/auto-docs/editor/interfaces/interfaces.GetAllOptions.md) |

#### Returns

`T`\[]

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[getAll](/auto-docs/editor/interfaces/interfaces.Container.md#getall)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `options?` | [`GetAllOptions`](/auto-docs/editor/interfaces/interfaces.GetAllOptions.md) |

#### Returns

`Promise`<`T`\[]>

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[getAllAsync](/auto-docs/editor/interfaces/interfaces.Container.md#getallasync)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `named` | `string` | `number` | `symbol` |

#### Returns

`T`\[]

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[getAllNamed](/auto-docs/editor/interfaces/interfaces.Container.md#getallnamed)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `named` | `string` | `number` | `symbol` |

#### Returns

`Promise`<`T`\[]>

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[getAllNamedAsync](/auto-docs/editor/interfaces/interfaces.Container.md#getallnamedasync)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`T`\[]

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[getAllTagged](/auto-docs/editor/interfaces/interfaces.Container.md#getalltagged)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`Promise`<`T`\[]>

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[getAllTaggedAsync](/auto-docs/editor/interfaces/interfaces.Container.md#getalltaggedasync)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`Promise`<`T`>

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[getAsync](/auto-docs/editor/interfaces/interfaces.Container.md#getasync)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `named` | `string` | `number` | `symbol` |

#### Returns

`T`

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[getNamed](/auto-docs/editor/interfaces/interfaces.Container.md#getnamed)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `named` | `string` | `number` | `symbol` |

#### Returns

`Promise`<`T`>

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[getNamedAsync](/auto-docs/editor/interfaces/interfaces.Container.md#getnamedasync)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`T`

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[getTagged](/auto-docs/editor/interfaces/interfaces.Container.md#gettagged)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`Promise`<`T`>

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[getTaggedAsync](/auto-docs/editor/interfaces/interfaces.Container.md#gettaggedasync)

***

### isBound

**isBound**(`serviceIdentifier`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`unknown`> |

#### Returns

`boolean`

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[isBound](/auto-docs/editor/interfaces/interfaces.Container.md#isbound)

***

### isBoundNamed

**isBoundNamed**(`serviceIdentifier`, `named`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`unknown`> |
| `named` | `string` | `number` | `symbol` |

#### Returns

`boolean`

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[isBoundNamed](/auto-docs/editor/interfaces/interfaces.Container.md#isboundnamed)

***

### isBoundTagged

**isBoundTagged**(`serviceIdentifier`, `key`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`unknown`> |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`boolean`

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[isBoundTagged](/auto-docs/editor/interfaces/interfaces.Container.md#isboundtagged)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`boolean`

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[isCurrentBound](/auto-docs/editor/interfaces/interfaces.Container.md#iscurrentbound)

***

### load

**load**(`...modules`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...modules` | [`ContainerModule`](/auto-docs/editor/interfaces/interfaces.ContainerModule.md)\[] |

#### Returns

`void`

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[load](/auto-docs/editor/interfaces/interfaces.Container.md#load)

***

### loadAsync

**loadAsync**(`...modules`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...modules` | [`AsyncContainerModule`](/auto-docs/editor/interfaces/interfaces.AsyncContainerModule.md)\[] |

#### Returns

`Promise`<`void`>

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[loadAsync](/auto-docs/editor/interfaces/interfaces.Container.md#loadasync)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `onActivation` | [`BindingActivation`](/auto-docs/editor/types/interfaces.BindingActivation.md)<`T`> |

#### Returns

`void`

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[onActivation](/auto-docs/editor/interfaces/interfaces.Container.md#onactivation)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `onDeactivation` | [`BindingDeactivation`](/auto-docs/editor/types/interfaces.BindingDeactivation.md)<`T`> |

#### Returns

`void`

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[onDeactivation](/auto-docs/editor/interfaces/interfaces.Container.md#ondeactivation)

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

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[rebind](/auto-docs/editor/interfaces/interfaces.Container.md#rebind)

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

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[rebindAsync](/auto-docs/editor/interfaces/interfaces.Container.md#rebindasync)

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

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[resolve](/auto-docs/editor/interfaces/interfaces.Container.md#resolve)

***

### restore

**restore**(): `void`

#### Returns

`void`

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[restore](/auto-docs/editor/interfaces/interfaces.Container.md#restore)

***

### snapshot

**snapshot**(): `void`

#### Returns

`void`

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[snapshot](/auto-docs/editor/interfaces/interfaces.Container.md#snapshot)

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

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[tryGet](/auto-docs/editor/interfaces/interfaces.Container.md#tryget)

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

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[tryGetAll](/auto-docs/editor/interfaces/interfaces.Container.md#trygetall)

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

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[tryGetAllAsync](/auto-docs/editor/interfaces/interfaces.Container.md#trygetallasync)

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

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[tryGetAllNamed](/auto-docs/editor/interfaces/interfaces.Container.md#trygetallnamed)

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

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[tryGetAllNamedAsync](/auto-docs/editor/interfaces/interfaces.Container.md#trygetallnamedasync)

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

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[tryGetAllTagged](/auto-docs/editor/interfaces/interfaces.Container.md#trygetalltagged)

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

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[tryGetAllTaggedAsync](/auto-docs/editor/interfaces/interfaces.Container.md#trygetalltaggedasync)

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

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[tryGetAsync](/auto-docs/editor/interfaces/interfaces.Container.md#trygetasync)

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

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[tryGetNamed](/auto-docs/editor/interfaces/interfaces.Container.md#trygetnamed)

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

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[tryGetNamedAsync](/auto-docs/editor/interfaces/interfaces.Container.md#trygetnamedasync)

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

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[tryGetTagged](/auto-docs/editor/interfaces/interfaces.Container.md#trygettagged)

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

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[tryGetTaggedAsync](/auto-docs/editor/interfaces/interfaces.Container.md#trygettaggedasync)

***

### unbind

**unbind**(`serviceIdentifier`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`unknown`> |

#### Returns

`void`

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[unbind](/auto-docs/editor/interfaces/interfaces.Container.md#unbind)

***

### unbindAll

**unbindAll**(): `void`

#### Returns

`void`

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[unbindAll](/auto-docs/editor/interfaces/interfaces.Container.md#unbindall)

***

### unbindAllAsync

**unbindAllAsync**(): `Promise`<`void`>

#### Returns

`Promise`<`void`>

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[unbindAllAsync](/auto-docs/editor/interfaces/interfaces.Container.md#unbindallasync)

***

### unbindAsync

**unbindAsync**(`serviceIdentifier`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`unknown`> |

#### Returns

`Promise`<`void`>

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[unbindAsync](/auto-docs/editor/interfaces/interfaces.Container.md#unbindasync)

***

### unload

**unload**(`...modules`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...modules` | [`ContainerModuleBase`](/auto-docs/editor/interfaces/interfaces.ContainerModuleBase.md)\[] |

#### Returns

`void`

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[unload](/auto-docs/editor/interfaces/interfaces.Container.md#unload)

***

### unloadAsync

**unloadAsync**(`...modules`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...modules` | [`ContainerModuleBase`](/auto-docs/editor/interfaces/interfaces.ContainerModuleBase.md)\[] |

#### Returns

`Promise`<`void`>

#### Implementation of

[Container](/auto-docs/editor/interfaces/interfaces.Container.md).[unloadAsync](/auto-docs/editor/interfaces/interfaces.Container.md#unloadasync)

***

### merge

`Static` **merge**(`container1`, `container2`, `...containers`): [`Container`](/auto-docs/editor/interfaces/interfaces.Container.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `container1` | [`Container`](/auto-docs/editor/interfaces/interfaces.Container.md) |
| `container2` | [`Container`](/auto-docs/editor/interfaces/interfaces.Container.md) |
| `...containers` | [`Container`](/auto-docs/editor/interfaces/interfaces.Container.md)\[] |

#### Returns

[`Container`](/auto-docs/editor/interfaces/interfaces.Container.md)
