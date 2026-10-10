# Interface: StorageService

存储数据到缓存

## Table of contents

### Methods

* [getData](/auto-docs/free-layout-editor/interfaces/StorageService.md#getdata)
* [setData](/auto-docs/free-layout-editor/interfaces/StorageService.md#setdata)

## Methods

### getData

**getData**<`T`>(`key`, `defaultValue`): `T`

Returns the data stored for the given key or the provided default value if nothing is stored for the given key.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `defaultValue` | `T` |

#### Returns

`T`

**getData**<`T`>(`key`): `undefined` | `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` | `T`

***

### setData

**setData**<`T`>(`key`, `data`): `void`

Stores the given data under the given key.

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
