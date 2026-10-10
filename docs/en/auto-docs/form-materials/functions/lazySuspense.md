# Function: lazySuspense

**lazySuspense**<`T`>(`params`, `fallback?`): `LazyExoticComponent`<`T`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ComponentType`<`any`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | () => `Promise`<{ `default`: `T`  }> |
| `fallback?` | `ReactNode` |

#### Returns

`LazyExoticComponent`<`T`>
