# Function: createProperty

[ASTFactory](/auto-docs/fixed-layout-editor/modules/ASTFactory.md).createProperty

**createProperty**<`VariableMeta`>(`json`): `Object`

Creates a `Property` node.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `VariableMeta` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`PropertyJSON`](/auto-docs/fixed-layout-editor/types/PropertyJSON.md)<`VariableMeta`> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `initializer?` | [`ASTNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/ASTNodeJSON.md) |
| `key` | `string` |
| `kind` | `string` |
| `meta?` | `VariableMeta` |
| `type?` | `ASTNodeJSONOrKind` |
