# Class: LocalStorageService

## Implements

* [`StorageService`](/auto-docs/playground-react/variables/StorageService-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/playground-react/classes/LocalStorageService.md#constructor)

### Methods

* [getData](/auto-docs/playground-react/classes/LocalStorageService.md#getdata)
* [prefix](/auto-docs/playground-react/classes/LocalStorageService.md#prefix)
* [setData](/auto-docs/playground-react/classes/LocalStorageService.md#setdata)
* [setPrefix](/auto-docs/playground-react/classes/LocalStorageService.md#setprefix)

## Constructors

### constructor

**new LocalStorageService**()

## Methods

### getData

**getData**<`T`>(`key`, `defaultValue?`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `defaultValue?` | `T` |

#### Returns

`T`

#### Implementation of

StorageService.getData

***

### prefix

**prefix**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

***

### setData

**setData**<`T`>(`key`, `data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `data` | `T` |

#### Returns

`void`

#### Implementation of

StorageService.setData

***

### setPrefix

**setPrefix**(`prefix`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string` |

#### Returns

`void`
