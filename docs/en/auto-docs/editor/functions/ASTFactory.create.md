# Function: create

[ASTFactory](/en/auto-docs/editor/modules/ASTFactory.md).create

**create**<`JSON`>(`targetType`, `json`): { `kind`: `string`  } & `JSON`

Creates Type-Safe ASTNodeJSON object based on the provided AST class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `JSON` | extends [`ASTNodeJSON`](/en/auto-docs/editor/interfaces/ASTNodeJSON.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `targetType` | (...`args`: `any`\[]) => [`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`JSON`> | Target ASTNode class. |
| `targetType.kind` | `string` | - |
| `json` | `JSON` | The JSON data for the node. |

#### Returns

{ `kind`: `string`  } & `JSON`

The ASTNode JSON object.
