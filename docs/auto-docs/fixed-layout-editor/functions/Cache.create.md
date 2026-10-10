# Function: create

[Cache](/auto-docs/fixed-layout-editor/modules/Cache.md).create

**create**<`T`, `ITEM`>(`cacheFactory`, `opts?`): [`CacheManager`](/auto-docs/fixed-layout-editor/interfaces/CacheManager.md)<`T`, `ITEM`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `ITEM` | extends [`CacheOriginItem`](/auto-docs/fixed-layout-editor/interfaces/CacheOriginItem.md) = [`CacheOriginItem`](/auto-docs/fixed-layout-editor/interfaces/CacheOriginItem.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cacheFactory` | (`item?`: `ITEM`) => [`Cache`](/auto-docs/fixed-layout-editor/types/Cache-1.md)<`T`> |
| `opts?` | [`CacheOpts`](/auto-docs/fixed-layout-editor/interfaces/CacheOpts.md) |

#### Returns

[`CacheManager`](/auto-docs/fixed-layout-editor/interfaces/CacheManager.md)<`T`, `ITEM`>
