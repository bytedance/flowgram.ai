# Function: useField

**useField**<`TFieldValue`, `TField`>(`name?`): `TField` | `undefined`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TFieldValue` | `any` |
| `TField` | extends [`IField`](/auto-docs/editor/interfaces/IField.md)<`TFieldValue`, `ChangeEvent`<`any`> | `TFieldValue`> | [`IFieldArray`](/auto-docs/editor/interfaces/IFieldArray.md)<`TFieldValue`> = [`IField`](/auto-docs/editor/interfaces/IField.md)<`TFieldValue`, `ChangeEvent`<`any`> | `TFieldValue`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

`TField` | `undefined`

**`Deprecated`**

`useField` is deprecated because its return relies on React render. if the Field is not rendered, the return would be
undefined. If you simply want to monitor the change of the value of a certain path, please use `useWatch(fieldName)`
