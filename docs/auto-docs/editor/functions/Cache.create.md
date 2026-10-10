# Function: create

[Cache](/auto-docs/editor/modules/Cache.md).create

**create**<`T`, `ITEM`>(`cacheFactory`, `opts?`): [`CacheManager`](/auto-docs/editor/interfaces/CacheManager.md)<`T`, `ITEM`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `ITEM` | extends [`CacheOriginItem`](/auto-docs/editor/interfaces/CacheOriginItem.md) = [`CacheOriginItem`](/auto-docs/editor/interfaces/CacheOriginItem.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cacheFactory` | (`item?`: `ITEM`) => [`Cache`](/auto-docs/editor/types/Cache-1.md)<`T`> |
| `opts?` | [`CacheOpts`](/auto-docs/editor/interfaces/CacheOpts.md) |

#### Returns

[`CacheManager`](/auto-docs/editor/interfaces/CacheManager.md)<`T`, `ITEM`>
