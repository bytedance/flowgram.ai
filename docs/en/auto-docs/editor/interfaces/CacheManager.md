# Interface: CacheManager\<T, ITEM>

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `ITEM` | extends [`CacheOriginItem`](/en/auto-docs/editor/interfaces/CacheOriginItem.md) = [`CacheOriginItem`](/en/auto-docs/editor/interfaces/CacheOriginItem.md) |

## Hierarchy

* [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

  ↳ **`CacheManager`**

## Table of contents

### Methods

* [clear](/en/auto-docs/editor/interfaces/CacheManager.md#clear)
* [dispose](/en/auto-docs/editor/interfaces/CacheManager.md#dispose)
* [get](/en/auto-docs/editor/interfaces/CacheManager.md#get)
* [getFromCache](/en/auto-docs/editor/interfaces/CacheManager.md#getfromcache)
* [getFromCacheByKey](/en/auto-docs/editor/interfaces/CacheManager.md#getfromcachebykey)
* [getMore](/en/auto-docs/editor/interfaces/CacheManager.md#getmore)
* [getMoreByItemKeys](/en/auto-docs/editor/interfaces/CacheManager.md#getmorebyitemkeys)
* [getMoreByItems](/en/auto-docs/editor/interfaces/CacheManager.md#getmorebyitems)

## Methods

### clear

**clear**(): `void`

清空缓存数据

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[Disposable](/en/auto-docs/editor/interfaces/Disposable-1.md).[dispose](/en/auto-docs/editor/interfaces/Disposable-1.md#dispose)

***

### get

**get**(): `T`

#### Returns

`T`

***

### getFromCache

**getFromCache**(): [`Cache`](/en/auto-docs/editor/types/Cache-1.md)<`T`>\[]

获取所有缓存

#### Returns

[`Cache`](/en/auto-docs/editor/types/Cache-1.md)<`T`>\[]

***

### getFromCacheByKey

**getFromCacheByKey**(`key`): `undefined` | `T`

从缓存中获取

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` | `T`

***

### getMore

**getMore**(`count`, `autoDelete?`): `T`\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `count` | `number` |
| `autoDelete?` | `boolean` |

#### Returns

`T`\[]

***

### getMoreByItemKeys

**getMoreByItemKeys**(`item`): `T`\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `ITEM`\[] |

#### Returns

`T`\[]

***

### getMoreByItems

**getMoreByItems**(`item`): `T`\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `ITEM`\[] |

#### Returns

`T`\[]
