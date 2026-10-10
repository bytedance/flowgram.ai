# Function: create

[ASTFactory](/en/auto-docs/variable-core/modules/ASTFactory.md).create

**create**<`JSON`>(`targetType`, `json`): { `kind`: `string` = targetType.kind } & `JSON`

Creates Type-Safe ASTNodeJSON object based on the provided AST class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `JSON` | extends [`ASTNodeJSON`](/en/auto-docs/variable-core/interfaces/ASTNodeJSON.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `targetType` | (...`args`: `any`\[]) => [`ASTNode`](/en/auto-docs/variable-core/classes/ASTNode.md)<`JSON`> | Target ASTNode class. |
| `targetType.kind` | `string` | - |
| `json` | `JSON` | The JSON data for the node. |

#### Returns

{ `kind`: `string` = targetType.kind } & `JSON`

The ASTNode JSON object.
