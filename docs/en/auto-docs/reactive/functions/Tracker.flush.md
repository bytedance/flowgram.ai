# Function: flush

[Tracker](/en/auto-docs/reactive/modules/Tracker.md).flush

**flush**(`options?`): `void`

Process all reactive updates immediately and ensure that all invalidated computations are rerun.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Omit`<[`FlushOptions`](/en/auto-docs/reactive/interfaces/Tracker.FlushOptions.md), `"finishSynchronously"`> |

#### Returns

`void`
