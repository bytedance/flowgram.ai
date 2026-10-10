# Function: createProperty

[ASTFactory](/en/auto-docs/variable-plugin/modules/ASTFactory.md).createProperty

**createProperty**<`VariableMeta`>(`json`): `Object`

Creates a `Property` node.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `VariableMeta` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`PropertyJSON`](/en/auto-docs/variable-plugin/types/PropertyJSON.md)<`VariableMeta`> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `initializer?` | [`ASTNodeJSON`](/en/auto-docs/variable-plugin/interfaces/ASTNodeJSON.md) |
| `key` | `string` |
| `kind` | `string` |
| `meta?` | `VariableMeta` |
| `type?` | `ASTNodeJSONOrKind` |
