# Function: createVariableDeclarationList

[ASTFactory](/en/auto-docs/variable-core/modules/ASTFactory.md).createVariableDeclarationList

**createVariableDeclarationList**(`json`): `Object`

Creates a `VariableDeclarationList` node.

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`VariableDeclarationListJSON`](/en/auto-docs/variable-core/interfaces/VariableDeclarationListJSON.md)<`any`> |

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `declarations?` | [`VariableDeclarationJSON`](/en/auto-docs/variable-core/types/VariableDeclarationJSON.md)<`any`>\[] | `declarations` must be of type `VariableDeclaration`, so the business can omit the `kind` field. |
| `kind` | [`ASTKind`](/en/auto-docs/variable-core/enums/ASTKind.md) | - |
| `startOrder?` | `number` | The starting order number for variables. |
