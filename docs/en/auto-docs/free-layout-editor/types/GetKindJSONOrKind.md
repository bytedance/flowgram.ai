# Type alias: GetKindJSONOrKind\<KindType, JSON>

**GetKindJSONOrKind**<`KindType`, `JSON`>: { `key?`: `Identifier` ; `kind`: `KindType`  } & `JSON` | `KindType`

TypeUtils to get the JSON representation of an AST node with a specific kind or just the kind string.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `KindType` | extends `string` |
| `JSON` | extends [`ASTNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/ASTNodeJSON.md) |
