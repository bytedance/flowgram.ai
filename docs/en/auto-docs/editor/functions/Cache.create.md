# Function: create

[Cache](/en/auto-docs/editor/modules/Cache.md).create

**create**<`T`, `ITEM`>(`cacheFactory`, `opts?`): [`CacheManager`](/en/auto-docs/editor/interfaces/CacheManager.md)<`T`, `ITEM`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `ITEM` | extends [`CacheOriginItem`](/en/auto-docs/editor/interfaces/CacheOriginItem.md) = [`CacheOriginItem`](/en/auto-docs/editor/interfaces/CacheOriginItem.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cacheFactory` | (`item?`: `ITEM`) => [`Cache`](/en/auto-docs/editor/types/Cache-1.md)<`T`> |
| `opts?` | [`CacheOpts`](/en/auto-docs/editor/interfaces/CacheOpts.md) |

#### Returns

[`CacheManager`](/en/auto-docs/editor/interfaces/CacheManager.md)<`T`, `ITEM`>
