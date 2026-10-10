# Function: delay

**delay**(`ms`, `token?`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ms` | `number` |
| `token?` | `Readonly`<[`CancellationToken`](/auto-docs/editor/interfaces/CancellationToken-1.md)> |

#### Returns

`Promise`<`void`>

resolves after a specified number of milliseconds

**`Throws`**

cancelled if a given token is cancelled before a specified number of milliseconds
