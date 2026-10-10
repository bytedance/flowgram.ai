# Function: useEntityDataFromContext

**useEntityDataFromContext**<`T`>(`dataRegistry`, `listenChange?`): `T`

从上下 PlaygroundEntityContext 获取 entity data 并监听变化 (默认不监听)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}, `T`> |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dataRegistry` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<`any`> | `undefined` |
| `listenChange` | `boolean` | `false` |

#### Returns

`T`
