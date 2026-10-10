# Function: createProperty

[ASTFactory](/en/auto-docs/free-layout-editor/modules/ASTFactory.md).createProperty

**createProperty**<`VariableMeta`>(`json`): `Object`

Creates a `Property` node.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `VariableMeta` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`PropertyJSON`](/en/auto-docs/free-layout-editor/types/PropertyJSON.md)<`VariableMeta`> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `initializer?` | [`ASTNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/ASTNodeJSON.md) |
| `key` | `string` |
| `kind` | `string` |
| `meta?` | `VariableMeta` |
| `type?` | `ASTNodeJSONOrKind` |
