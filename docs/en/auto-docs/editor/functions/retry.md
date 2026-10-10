# Function: retry

**retry**<`T`>(`task`, `delayTime`, `retries`, `shouldRetry?`): `Promise`<`T`>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `task` | () => `Promise`<`T`> |
| `delayTime` | `number` |
| `retries` | `number` |
| `shouldRetry?` | (`res`: `T`) => `boolean` |

#### Returns

`Promise`<`T`>
