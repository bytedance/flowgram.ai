# Function: createVariableDeclarationList

[ASTFactory](/auto-docs/variable-core/modules/ASTFactory.md).createVariableDeclarationList

**createVariableDeclarationList**(`json`): `Object`

Creates a `VariableDeclarationList` node.

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`VariableDeclarationListJSON`](/auto-docs/variable-core/interfaces/VariableDeclarationListJSON.md)<`any`> |

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `declarations?` | [`VariableDeclarationJSON`](/auto-docs/variable-core/types/VariableDeclarationJSON.md)<`any`>\[] | `declarations` must be of type `VariableDeclaration`, so the business can omit the `kind` field. |
| `kind` | [`ASTKind`](/auto-docs/variable-core/enums/ASTKind.md) | - |
| `startOrder?` | `number` | The starting order number for variables. |
