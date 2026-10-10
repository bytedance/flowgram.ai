# Function: create

[Cache](/en/auto-docs/utils/modules/Cache.md).create

**create**<`T`, `ITEM`>(`cacheFactory`, `opts?`): [`CacheManager`](/en/auto-docs/utils/interfaces/CacheManager.md)<`T`, `ITEM`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `ITEM` | extends [`CacheOriginItem`](/en/auto-docs/utils/interfaces/CacheOriginItem.md) = [`CacheOriginItem`](/en/auto-docs/utils/interfaces/CacheOriginItem.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cacheFactory` | (`item?`: `ITEM`) => [`Cache`](/en/auto-docs/utils/types/Cache-1.md)<`T`> |
| `opts` | [`CacheOpts`](/en/auto-docs/utils/interfaces/CacheOpts.md) |

#### Returns

[`CacheManager`](/en/auto-docs/utils/interfaces/CacheManager.md)<`T`, `ITEM`>
