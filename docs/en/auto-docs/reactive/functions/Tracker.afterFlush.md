# Function: afterFlush

[Tracker](/en/auto-docs/reactive/modules/Tracker.md).afterFlush

**afterFlush**(`f`): `void`

Schedules a function to be called during the next flush, or later in the current flush if one is in progress, after all invalidated computations have been rerun.  The function will be run once and not on subsequent flushes unless `afterFlush` is called again.

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `ICallback`<`void`, `void`> |

#### Returns

`void`
