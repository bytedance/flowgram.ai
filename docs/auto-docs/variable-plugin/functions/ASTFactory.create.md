# Function: create

[ASTFactory](/auto-docs/variable-plugin/modules/ASTFactory.md).create

**create**<`JSON`>(`targetType`, `json`): { `kind`: `string`  } & `JSON`

Creates Type-Safe ASTNodeJSON object based on the provided AST class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `JSON` | extends [`ASTNodeJSON`](/auto-docs/variable-plugin/interfaces/ASTNodeJSON.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `targetType` | (...`args`: `any`\[]) => [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`JSON`> | Target ASTNode class. |
| `targetType.kind` | `string` | - |
| `json` | `JSON` | The JSON data for the node. |

#### Returns

{ `kind`: `string`  } & `JSON`

The ASTNode JSON object.
