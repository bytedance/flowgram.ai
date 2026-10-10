# Function: createMap

[ASTFactory](/en/auto-docs/variable-core/modules/ASTFactory.md).createMap

**createMap**(`json`): `Object`

Creates a `Map` type node.

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `MapJSON` |

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyType?` | `ASTNodeJSONOrKind` | The type of the keys in the map. |
| `kind` | [`ASTKind`](/en/auto-docs/variable-core/enums/ASTKind.md) | - |
| `valueType?` | `ASTNodeJSONOrKind` | The type of the values in the map. |
