# Class: FormAbilityExtensionRegistry

## Table of contents

### Constructors

* [constructor](/en/auto-docs/form-core/classes/FormAbilityExtensionRegistry.md#constructor)

### Accessors

* [collection](/en/auto-docs/form-core/classes/FormAbilityExtensionRegistry.md#collection)
* [objectMap](/en/auto-docs/form-core/classes/FormAbilityExtensionRegistry.md#objectmap)

### Methods

* [get](/en/auto-docs/form-core/classes/FormAbilityExtensionRegistry.md#get)
* [register](/en/auto-docs/form-core/classes/FormAbilityExtensionRegistry.md#register)

## Constructors

### constructor

**new FormAbilityExtensionRegistry**()

## Accessors

### collection

`get` **collection**(): [`Extension`](/en/auto-docs/form-core/interfaces/Extension.md)\[]

#### Returns

[`Extension`](/en/auto-docs/form-core/interfaces/Extension.md)\[]

***

### objectMap

`get` **objectMap**(): `Record`<`string`, [`Extension`](/en/auto-docs/form-core/interfaces/Extension.md)>

#### Returns

`Record`<`string`, [`Extension`](/en/auto-docs/form-core/interfaces/Extension.md)>

## Methods

### get

**get**<`T`>(`key`): `undefined` | `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Extension`](/en/auto-docs/form-core/interfaces/Extension.md) |

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
| `extension` | [`Extension`](/en/auto-docs/form-core/interfaces/Extension.md) |

#### Returns

`void`
