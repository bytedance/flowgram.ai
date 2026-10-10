# Function: autorun

[Tracker](/en/auto-docs/fixed-layout-editor/modules/Tracker.md).autorun

**autorun**<`T`>(`f`, `options?`): [`Computation`](/en/auto-docs/fixed-layout-editor/classes/Tracker.Computation.md)<`T`>

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
| `f` | [`IComputationCallback`](/en/auto-docs/fixed-layout-editor/types/Tracker.IComputationCallback.md)<`T`> |
| `options?` | `Object` |
| `options.onError` | `ICallback`<`Error`, `void`> |

#### Returns

[`Computation`](/en/auto-docs/fixed-layout-editor/classes/Tracker.Computation.md)<`T`>
