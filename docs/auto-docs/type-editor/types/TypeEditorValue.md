# Type alias: TypeEditorValue\<Mode, TypeSchema>

**TypeEditorValue**<`Mode`, `TypeSchema`>: `Mode` extends `"type-definition"` ? [`TypeEditorSchema`](/auto-docs/type-editor/types/TypeEditorSchema.md)<`TypeSchema`> : [`DeclareAssignValueType`](/auto-docs/type-editor/interfaces/DeclareAssignValueType.md)<`TypeSchema`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Mode` | extends [`TypeEditorMode`](/auto-docs/type-editor/types/TypeEditorMode.md) |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |
