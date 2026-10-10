# Function: create

[Cache](/auto-docs/utils/modules/Cache.md).create

**create**<`T`, `ITEM`>(`cacheFactory`, `opts?`): [`CacheManager`](/auto-docs/utils/interfaces/CacheManager.md)<`T`, `ITEM`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `ITEM` | extends [`CacheOriginItem`](/auto-docs/utils/interfaces/CacheOriginItem.md) = [`CacheOriginItem`](/auto-docs/utils/interfaces/CacheOriginItem.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cacheFactory` | (`item?`: `ITEM`) => [`Cache`](/auto-docs/utils/types/Cache-1.md)<`T`> |
| `opts` | [`CacheOpts`](/auto-docs/utils/interfaces/CacheOpts.md) |

#### Returns

[`CacheManager`](/auto-docs/utils/interfaces/CacheManager.md)<`T`, `ITEM`>
