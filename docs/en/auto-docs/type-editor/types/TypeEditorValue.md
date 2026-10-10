# Type alias: TypeEditorValue\<Mode, TypeSchema>

**TypeEditorValue**<`Mode`, `TypeSchema`>: `Mode` extends `"type-definition"` ? [`TypeEditorSchema`](/en/auto-docs/type-editor/types/TypeEditorSchema.md)<`TypeSchema`> : [`DeclareAssignValueType`](/en/auto-docs/type-editor/interfaces/DeclareAssignValueType.md)<`TypeSchema`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Mode` | extends [`TypeEditorMode`](/en/auto-docs/type-editor/types/TypeEditorMode.md) |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |
