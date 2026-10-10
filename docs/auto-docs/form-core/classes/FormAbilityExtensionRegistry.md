# Class: FormAbilityExtensionRegistry

## Table of contents

### Constructors

* [constructor](/auto-docs/form-core/classes/FormAbilityExtensionRegistry.md#constructor)

### Accessors

* [collection](/auto-docs/form-core/classes/FormAbilityExtensionRegistry.md#collection)
* [objectMap](/auto-docs/form-core/classes/FormAbilityExtensionRegistry.md#objectmap)

### Methods

* [get](/auto-docs/form-core/classes/FormAbilityExtensionRegistry.md#get)
* [register](/auto-docs/form-core/classes/FormAbilityExtensionRegistry.md#register)

## Constructors

### constructor

**new FormAbilityExtensionRegistry**()

## Accessors

### collection

`get` **collection**(): [`Extension`](/auto-docs/form-core/interfaces/Extension.md)\[]

#### Returns

[`Extension`](/auto-docs/form-core/interfaces/Extension.md)\[]

***

### objectMap

`get` **objectMap**(): `Record`<`string`, [`Extension`](/auto-docs/form-core/interfaces/Extension.md)>

#### Returns

`Record`<`string`, [`Extension`](/auto-docs/form-core/interfaces/Extension.md)>

## Methods

### get

**get**<`T`>(`key`): `undefined` | `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Extension`](/auto-docs/form-core/interfaces/Extension.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` | `T`

***

### register

**register**(`extension`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `extension` | [`Extension`](/auto-docs/form-core/interfaces/Extension.md) |

#### Returns

`void`
