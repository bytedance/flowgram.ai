# Type alias: TypeEditorRowData\<TypeSchema>

**TypeEditorRowData**<`TypeSchema`>: `TypeSchema` & { `cannotDrag?`: `boolean` ; `childrenCount`: `number` ; `deepChildrenCount`: `number` ; `disableEditColumn?`: { `column`: [`TypeEditorColumnType`](/auto-docs/type-editor/enums/TypeEditorColumnType.md) ; `reason`: `string`  }\[] ; `extraConfig`: [`TypeEditorSpecialConfig`](/auto-docs/type-editor/interfaces/TypeEditorSpecialConfig.md)<`TypeSchema`> ; `id`: `string` ; `index`: `number` ; `isRequired`: `boolean` ; `key`: `string` ; `level`: `number` ; `parent?`: [`TypeEditorSchema`](/auto-docs/type-editor/types/TypeEditorSchema.md)<`TypeSchema`> ; `parentId?`: `string` ; `path`: `string`\[] ; `self`: [`TypeEditorSchema`](/auto-docs/type-editor/types/TypeEditorSchema.md)<`TypeSchema`>  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |
