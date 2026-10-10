# Function: autorun

[Tracker](/auto-docs/reactive/modules/Tracker.md).autorun

**autorun**<`T`>(`f`, `options?`): [`Computation`](/auto-docs/reactive/classes/Tracker.Computation.md)<`T`>

Run a function now and rerun it later whenever its dependencies
change. Returns a Computation object that can be used to stop or observe the
rerunning.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | [`IComputationCallback`](/auto-docs/reactive/types/Tracker.IComputationCallback.md)<`T`> |
| `options?` | `Object` |
| `options.onError` | `ICallback`<`Error`, `void`> |

#### Returns

[`Computation`](/auto-docs/reactive/classes/Tracker.Computation.md)<`T`>
