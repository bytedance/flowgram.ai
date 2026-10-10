# Class: LocalStorageService

## Implements

* [`StorageService`](/auto-docs/fixed-layout-editor/variables/StorageService-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/LocalStorageService.md#constructor)

### Methods

* [getData](/auto-docs/fixed-layout-editor/classes/LocalStorageService.md#getdata)
* [prefix](/auto-docs/fixed-layout-editor/classes/LocalStorageService.md#prefix)
* [setData](/auto-docs/fixed-layout-editor/classes/LocalStorageService.md#setdata)
* [setPrefix](/auto-docs/fixed-layout-editor/classes/LocalStorageService.md#setprefix)

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
