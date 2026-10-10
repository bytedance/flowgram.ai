# Class: Container

## Implements

* [`Container`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/Container.md#constructor)

### Properties

* [id](/en/auto-docs/fixed-layout-editor/classes/Container.md#id)
* [options](/en/auto-docs/fixed-layout-editor/classes/Container.md#options)
* [parent](/en/auto-docs/fixed-layout-editor/classes/Container.md#parent)

### Methods

* [applyCustomMetadataReader](/en/auto-docs/fixed-layout-editor/classes/Container.md#applycustommetadatareader)
* [applyMiddleware](/en/auto-docs/fixed-layout-editor/classes/Container.md#applymiddleware)
* [bind](/en/auto-docs/fixed-layout-editor/classes/Container.md#bind)
* [createChild](/en/auto-docs/fixed-layout-editor/classes/Container.md#createchild)
* [get](/en/auto-docs/fixed-layout-editor/classes/Container.md#get)
* [getAll](/en/auto-docs/fixed-layout-editor/classes/Container.md#getall)
* [getAllAsync](/en/auto-docs/fixed-layout-editor/classes/Container.md#getallasync)
* [getAllNamed](/en/auto-docs/fixed-layout-editor/classes/Container.md#getallnamed)
* [getAllNamedAsync](/en/auto-docs/fixed-layout-editor/classes/Container.md#getallnamedasync)
* [getAllTagged](/en/auto-docs/fixed-layout-editor/classes/Container.md#getalltagged)
* [getAllTaggedAsync](/en/auto-docs/fixed-layout-editor/classes/Container.md#getalltaggedasync)
* [getAsync](/en/auto-docs/fixed-layout-editor/classes/Container.md#getasync)
* [getNamed](/en/auto-docs/fixed-layout-editor/classes/Container.md#getnamed)
* [getNamedAsync](/en/auto-docs/fixed-layout-editor/classes/Container.md#getnamedasync)
* [getTagged](/en/auto-docs/fixed-layout-editor/classes/Container.md#gettagged)
* [getTaggedAsync](/en/auto-docs/fixed-layout-editor/classes/Container.md#gettaggedasync)
* [isBound](/en/auto-docs/fixed-layout-editor/classes/Container.md#isbound)
* [isBoundNamed](/en/auto-docs/fixed-layout-editor/classes/Container.md#isboundnamed)
* [isBoundTagged](/en/auto-docs/fixed-layout-editor/classes/Container.md#isboundtagged)
* [isCurrentBound](/en/auto-docs/fixed-layout-editor/classes/Container.md#iscurrentbound)
* [load](/en/auto-docs/fixed-layout-editor/classes/Container.md#load)
* [loadAsync](/en/auto-docs/fixed-layout-editor/classes/Container.md#loadasync)
* [onActivation](/en/auto-docs/fixed-layout-editor/classes/Container.md#onactivation)
* [onDeactivation](/en/auto-docs/fixed-layout-editor/classes/Container.md#ondeactivation)
* [rebind](/en/auto-docs/fixed-layout-editor/classes/Container.md#rebind)
* [rebindAsync](/en/auto-docs/fixed-layout-editor/classes/Container.md#rebindasync)
* [resolve](/en/auto-docs/fixed-layout-editor/classes/Container.md#resolve)
* [restore](/en/auto-docs/fixed-layout-editor/classes/Container.md#restore)
* [snapshot](/en/auto-docs/fixed-layout-editor/classes/Container.md#snapshot)
* [tryGet](/en/auto-docs/fixed-layout-editor/classes/Container.md#tryget)
* [tryGetAll](/en/auto-docs/fixed-layout-editor/classes/Container.md#trygetall)
* [tryGetAllAsync](/en/auto-docs/fixed-layout-editor/classes/Container.md#trygetallasync)
* [tryGetAllNamed](/en/auto-docs/fixed-layout-editor/classes/Container.md#trygetallnamed)
* [tryGetAllNamedAsync](/en/auto-docs/fixed-layout-editor/classes/Container.md#trygetallnamedasync)
* [tryGetAllTagged](/en/auto-docs/fixed-layout-editor/classes/Container.md#trygetalltagged)
* [tryGetAllTaggedAsync](/en/auto-docs/fixed-layout-editor/classes/Container.md#trygetalltaggedasync)
* [tryGetAsync](/en/auto-docs/fixed-layout-editor/classes/Container.md#trygetasync)
* [tryGetNamed](/en/auto-docs/fixed-layout-editor/classes/Container.md#trygetnamed)
* [tryGetNamedAsync](/en/auto-docs/fixed-layout-editor/classes/Container.md#trygetnamedasync)
* [tryGetTagged](/en/auto-docs/fixed-layout-editor/classes/Container.md#trygettagged)
* [tryGetTaggedAsync](/en/auto-docs/fixed-layout-editor/classes/Container.md#trygettaggedasync)
* [unbind](/en/auto-docs/fixed-layout-editor/classes/Container.md#unbind)
* [unbindAll](/en/auto-docs/fixed-layout-editor/classes/Container.md#unbindall)
* [unbindAllAsync](/en/auto-docs/fixed-layout-editor/classes/Container.md#unbindallasync)
* [unbindAsync](/en/auto-docs/fixed-layout-editor/classes/Container.md#unbindasync)
* [unload](/en/auto-docs/fixed-layout-editor/classes/Container.md#unload)
* [unloadAsync](/en/auto-docs/fixed-layout-editor/classes/Container.md#unloadasync)
* [merge](/en/auto-docs/fixed-layout-editor/classes/Container.md#merge)

## Constructors

### constructor

**new Container**(`containerOptions?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `containerOptions?` | [`ContainerOptions`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ContainerOptions.md) |

## Properties

### id

**id**: `number`

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[id](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#id)

***

### options

`Readonly` **options**: [`ContainerOptions`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ContainerOptions.md)

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[options](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#options)

***

### parent

**parent**: `null` | [`Container`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[parent](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#parent)

## Methods

### applyCustomMetadataReader

**applyCustomMetadataReader**(`metadataReader`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadataReader` | [`MetadataReader`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.MetadataReader.md) |

#### Returns

`void`

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[applyCustomMetadataReader](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#applycustommetadatareader)

***

### applyMiddleware

**applyMiddleware**(`...middlewares`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...middlewares` | [`Middleware`](/en/auto-docs/fixed-layout-editor/types/interfaces.Middleware.md)\[] |

#### Returns

`void`

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[applyMiddleware](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#applymiddleware)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

[`BindingToSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingToSyntax.md)<`T`>

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[bind](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#bind)

***

### createChild

**createChild**(`containerOptions?`): [`Container`](/en/auto-docs/fixed-layout-editor/classes/Container.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `containerOptions?` | [`ContainerOptions`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ContainerOptions.md) |

#### Returns

[`Container`](/en/auto-docs/fixed-layout-editor/classes/Container.md)

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[createChild](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#createchild)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[get](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#get)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `options?` | [`GetAllOptions`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.GetAllOptions.md) |

#### Returns

`T`\[]

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[getAll](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#getall)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `options?` | [`GetAllOptions`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.GetAllOptions.md) |

#### Returns

`Promise`<`T`\[]>

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[getAllAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#getallasync)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `named` | `string` | `number` | `symbol` |

#### Returns

`T`\[]

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[getAllNamed](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#getallnamed)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `named` | `string` | `number` | `symbol` |

#### Returns

`Promise`<`T`\[]>

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[getAllNamedAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#getallnamedasync)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`T`\[]

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[getAllTagged](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#getalltagged)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`Promise`<`T`\[]>

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[getAllTaggedAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#getalltaggedasync)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`Promise`<`T`>

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[getAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#getasync)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `named` | `string` | `number` | `symbol` |

#### Returns

`T`

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[getNamed](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#getnamed)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `named` | `string` | `number` | `symbol` |

#### Returns

`Promise`<`T`>

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[getNamedAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#getnamedasync)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`T`

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[getTagged](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#gettagged)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`Promise`<`T`>

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[getTaggedAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#gettaggedasync)

***

### isBound

**isBound**(`serviceIdentifier`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`unknown`> |

#### Returns

`boolean`

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[isBound](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#isbound)

***

### isBoundNamed

**isBoundNamed**(`serviceIdentifier`, `named`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`unknown`> |
| `named` | `string` | `number` | `symbol` |

#### Returns

`boolean`

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[isBoundNamed](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#isboundnamed)

***

### isBoundTagged

**isBoundTagged**(`serviceIdentifier`, `key`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`unknown`> |
| `key` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

`boolean`

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[isBoundTagged](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#isboundtagged)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`boolean`

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[isCurrentBound](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#iscurrentbound)

***

### load

**load**(`...modules`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...modules` | [`ContainerModule`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ContainerModule.md)\[] |

#### Returns

`void`

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[load](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#load)

***

### loadAsync

**loadAsync**(`...modules`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...modules` | [`AsyncContainerModule`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.AsyncContainerModule.md)\[] |

#### Returns

`Promise`<`void`>

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[loadAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#loadasync)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `onActivation` | [`BindingActivation`](/en/auto-docs/fixed-layout-editor/types/interfaces.BindingActivation.md)<`T`> |

#### Returns

`void`

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[onActivation](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#onactivation)

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
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |
| `onDeactivation` | [`BindingDeactivation`](/en/auto-docs/fixed-layout-editor/types/interfaces.BindingDeactivation.md)<`T`> |

#### Returns

`void`

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[onDeactivation](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#ondeactivation)

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

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[rebind](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#rebind)

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

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[rebindAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#rebindasync)

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

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[resolve](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#resolve)

***

### restore

**restore**(): `void`

#### Returns

`void`

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[restore](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#restore)

***

### snapshot

**snapshot**(): `void`

#### Returns

`void`

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[snapshot](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#snapshot)

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

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[tryGet](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#tryget)

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

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[tryGetAll](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygetall)

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

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[tryGetAllAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygetallasync)

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

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[tryGetAllNamed](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygetallnamed)

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

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[tryGetAllNamedAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygetallnamedasync)

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

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[tryGetAllTagged](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygetalltagged)

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

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[tryGetAllTaggedAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygetalltaggedasync)

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

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[tryGetAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygetasync)

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

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[tryGetNamed](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygetnamed)

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

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[tryGetNamedAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygetnamedasync)

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

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[tryGetTagged](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygettagged)

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

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[tryGetTaggedAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#trygettaggedasync)

***

### unbind

**unbind**(`serviceIdentifier`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`unknown`> |

#### Returns

`void`

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[unbind](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#unbind)

***

### unbindAll

**unbindAll**(): `void`

#### Returns

`void`

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[unbindAll](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#unbindall)

***

### unbindAllAsync

**unbindAllAsync**(): `Promise`<`void`>

#### Returns

`Promise`<`void`>

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[unbindAllAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#unbindallasync)

***

### unbindAsync

**unbindAsync**(`serviceIdentifier`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`unknown`> |

#### Returns

`Promise`<`void`>

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[unbindAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#unbindasync)

***

### unload

**unload**(`...modules`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...modules` | [`ContainerModuleBase`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ContainerModuleBase.md)\[] |

#### Returns

`void`

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[unload](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#unload)

***

### unloadAsync

**unloadAsync**(`...modules`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...modules` | [`ContainerModuleBase`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ContainerModuleBase.md)\[] |

#### Returns

`Promise`<`void`>

#### Implementation of

[Container](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md).[unloadAsync](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md#unloadasync)

***

### merge

`Static` **merge**(`container1`, `container2`, `...containers`): [`Container`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `container1` | [`Container`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md) |
| `container2` | [`Container`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md) |
| `...containers` | [`Container`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)\[] |

#### Returns

[`Container`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)
