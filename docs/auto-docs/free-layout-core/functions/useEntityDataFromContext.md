# Function: useEntityDataFromContext

**useEntityDataFromContext**<`T`>(`dataRegistry`, `listenChange?`): `T`

从上下 PlaygroundEntityContext 获取 entity data 并监听变化 (默认不监听)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `EntityData`<`any`, {}, `T`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataRegistry` | `EntityDataRegistry`<`any`> |
| `listenChange?` | `boolean` |

#### Returns

`T`
