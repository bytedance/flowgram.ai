# Function: create

[Cache](/en/auto-docs/free-layout-editor/modules/Cache.md).create

**create**<`T`, `ITEM`>(`cacheFactory`, `opts?`): [`CacheManager`](/en/auto-docs/free-layout-editor/interfaces/CacheManager.md)<`T`, `ITEM`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `ITEM` | extends [`CacheOriginItem`](/en/auto-docs/free-layout-editor/interfaces/CacheOriginItem.md) = [`CacheOriginItem`](/en/auto-docs/free-layout-editor/interfaces/CacheOriginItem.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cacheFactory` | (`item?`: `ITEM`) => [`Cache`](/en/auto-docs/free-layout-editor/types/Cache-1.md)<`T`> |
| `opts?` | [`CacheOpts`](/en/auto-docs/free-layout-editor/interfaces/CacheOpts.md) |

#### Returns

[`CacheManager`](/en/auto-docs/free-layout-editor/interfaces/CacheManager.md)<`T`, `ITEM`>
