# Function: useCurrentScope

**useCurrentScope**<`Strict`>(`params?`): `Strict` extends `true` ? [`Scope`](/auto-docs/variable-core/classes/Scope.md)<`Record`<`string`, `any`>> : `undefined` | [`Scope`](/auto-docs/variable-core/classes/Scope.md)<`Record`<`string`, `any`>>

useCurrentScope returns the scope provided by ScopeProvider.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Strict` | extends `boolean` = `false` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params?` | `Object` | - |
| `params.strict` | `Strict` | whether to throw error when no scope in ScopeProvider is found |

#### Returns

`Strict` extends `true` ? [`Scope`](/auto-docs/variable-core/classes/Scope.md)<`Record`<`string`, `any`>> : `undefined` | [`Scope`](/auto-docs/variable-core/classes/Scope.md)<`Record`<`string`, `any`>>
