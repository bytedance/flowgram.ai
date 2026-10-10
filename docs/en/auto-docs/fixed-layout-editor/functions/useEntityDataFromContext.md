# Function: useEntityDataFromContext

**useEntityDataFromContext**<`T`>(`dataRegistry`, `listenChange?`): `T`

从上下 PlaygroundEntityContext 获取 entity data 并监听变化 (默认不监听)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataRegistry` | [`EntityDataRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<`any`> |
| `listenChange?` | `boolean` |

#### Returns

`T`
