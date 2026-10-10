# Function: is

[ASTMatch](/auto-docs/fixed-layout-editor/modules/ASTMatch.md).is

**is**<`TargetASTNode`>(`node?`, `targetType?`): node is TargetASTNode

Check ASTNode Match by ASTClass

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TargetASTNode` | extends [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`, `TargetASTNode`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node?` | [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`> | ASTNode to be checked. |
| `targetType?` | (...`args`: `any`\[]) => `TargetASTNode` | Target ASTNode class. |
| `targetType.kind` | `string` | - |

#### Returns

node is TargetASTNode

Whether the node is of the target type.
