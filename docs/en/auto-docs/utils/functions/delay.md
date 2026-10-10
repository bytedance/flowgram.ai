# Function: delay

**delay**(`ms`, `token?`): `Promise`<`void`>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `ms` | `number` | `undefined` |
| `token` | `Readonly`<[`CancellationToken`](/en/auto-docs/utils/interfaces/CancellationToken-1.md)> | `CancellationToken.None` |

#### Returns

`Promise`<`void`>

resolves after a specified number of milliseconds

**`Throws`**

cancelled if a given token is cancelled before a specified number of milliseconds
