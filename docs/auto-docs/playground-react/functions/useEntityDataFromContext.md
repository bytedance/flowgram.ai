# Function: useEntityDataFromContext

**useEntityDataFromContext**<`T`>(`dataRegistry`, `listenChange?`): `T`

从上下 PlaygroundEntityContext 获取 entity data 并监听变化 (默认不监听)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EntityData`](/auto-docs/playground-react/classes/EntityData.md)<`any`, {}, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataRegistry` | [`EntityDataRegistry`](/auto-docs/playground-react/interfaces/EntityDataRegistry.md)<`any`> |
| `listenChange?` | `boolean` |

#### Returns

`T`
