# Function: createObject

[ASTFactory](/en/auto-docs/variable-core/modules/ASTFactory.md).createObject

**createObject**(`json`): `Object`

Creates an `Object` type node.

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ObjectJSON`](/en/auto-docs/variable-core/interfaces/ObjectJSON.md)<`any`> |

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | [`ASTKind`](/en/auto-docs/variable-core/enums/ASTKind.md) | - |
| `properties?` | [`PropertyJSON`](/en/auto-docs/variable-core/types/PropertyJSON.md)<`any`>\[] | The properties of the object. The `properties` of an Object must be of type `Property`, so the business can omit the `kind` field. |
