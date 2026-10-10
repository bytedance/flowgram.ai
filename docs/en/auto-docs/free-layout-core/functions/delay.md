# Function: delay

**delay**(`ms`, `token?`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ms` | `number` |
| `token?` | `Readonly`<`CancellationToken`> |

#### Returns

`Promise`<`void`>

resolves after a specified number of milliseconds

**`Throws`**

cancelled if a given token is cancelled before a specified number of milliseconds
