# Function: createWrapArrayExpression

[ASTFactory](/auto-docs/variable-core/modules/ASTFactory.md).createWrapArrayExpression

**createWrapArrayExpression**(`json`): `Object`

Creates a `WrapArrayExpression` node.

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`WrapArrayExpressionJSON`](/auto-docs/variable-core/interfaces/WrapArrayExpressionJSON.md) |

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | [`ASTKind`](/auto-docs/variable-core/enums/ASTKind.md) | - |
| `wrapFor` | [`ASTNodeJSON`](/auto-docs/variable-core/interfaces/ASTNodeJSON.md) | The expression to be wrapped. |
