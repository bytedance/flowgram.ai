# Interface: CacheManager\<T, ITEM>

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `ITEM` | extends [`CacheOriginItem`](/auto-docs/fixed-layout-editor/interfaces/CacheOriginItem.md) = [`CacheOriginItem`](/auto-docs/fixed-layout-editor/interfaces/CacheOriginItem.md) |

## Hierarchy

* [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

  ↳ **`CacheManager`**

## Table of contents

### Methods

* [clear](/auto-docs/fixed-layout-editor/interfaces/CacheManager.md#clear)
* [dispose](/auto-docs/fixed-layout-editor/interfaces/CacheManager.md#dispose)
* [get](/auto-docs/fixed-layout-editor/interfaces/CacheManager.md#get)
* [getFromCache](/auto-docs/fixed-layout-editor/interfaces/CacheManager.md#getfromcache)
* [getFromCacheByKey](/auto-docs/fixed-layout-editor/interfaces/CacheManager.md#getfromcachebykey)
* [getMore](/auto-docs/fixed-layout-editor/interfaces/CacheManager.md#getmore)
* [getMoreByItemKeys](/auto-docs/fixed-layout-editor/interfaces/CacheManager.md#getmorebyitemkeys)
* [getMoreByItems](/auto-docs/fixed-layout-editor/interfaces/CacheManager.md#getmorebyitems)

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

[Disposable](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md).[dispose](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md#dispose)

***

### get

**get**(): `T`

#### Returns

`T`

***

### getFromCache

**getFromCache**(): [`Cache`](/auto-docs/fixed-layout-editor/types/Cache-1.md)<`T`>\[]

获取所有缓存

#### Returns

[`Cache`](/auto-docs/fixed-layout-editor/types/Cache-1.md)<`T`>\[]

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
