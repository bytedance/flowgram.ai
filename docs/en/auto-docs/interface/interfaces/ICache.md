# Interface: ICache\<K, V>

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Type parameters

| Name | Type |
| :------ | :------ |
| `K` | `string` |
| `V` | `any` |

## Table of contents

### Methods

* [delete](/en/auto-docs/interface/interfaces/ICache.md#delete)
* [dispose](/en/auto-docs/interface/interfaces/ICache.md#dispose)
* [get](/en/auto-docs/interface/interfaces/ICache.md#get)
* [has](/en/auto-docs/interface/interfaces/ICache.md#has)
* [init](/en/auto-docs/interface/interfaces/ICache.md#init)
* [set](/en/auto-docs/interface/interfaces/ICache.md#set)

## Methods

### delete

**delete**(`key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |

#### Returns

`boolean`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### get

**get**(`key`): `V`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |

#### Returns

`V`

***

### has

**has**(`key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |

#### Returns

`boolean`

***

### init

**init**(): `void`

#### Returns

`void`

***

### set

**set**(`key`, `value`): [`ICache`](/en/auto-docs/interface/interfaces/ICache.md)<`K`, `V`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |
| `value` | `V` |

#### Returns

[`ICache`](/en/auto-docs/interface/interfaces/ICache.md)<`K`, `V`>
