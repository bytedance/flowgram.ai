# Function: createProperty

[ASTFactory](/en/auto-docs/variable-core/modules/ASTFactory.md).createProperty

**createProperty**<`VariableMeta`>(`json`): `Object`

Creates a `Property` node.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `VariableMeta` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`PropertyJSON`](/en/auto-docs/variable-core/types/PropertyJSON.md)<`VariableMeta`> |

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `initializer?` | [`ASTNodeJSON`](/en/auto-docs/variable-core/interfaces/ASTNodeJSON.md) | initializer of the variable field, similar to js code: `const v = 'hello'` with initializer, the type of field will be inferred from the initializer. |
| `key` | `string` | key of the variable field - For `VariableDeclaration`, the key should be global unique. - For `Property`, the key is the property name. |
| `kind` | `string` | Kind is the type of the AST node. |
| `meta?` | `VariableMeta` | meta data of the variable field, you cans store information like `title`, `icon`, etc. |
| `type?` | `ASTNodeJSONOrKind` | type of the variable field, similar to js code: `const v: string` |
