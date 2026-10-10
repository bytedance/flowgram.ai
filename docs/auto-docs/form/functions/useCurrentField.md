# Function: useCurrentField

**useCurrentField**<`TFieldValue`, `TField`>(): [`IField`](/auto-docs/form/interfaces/IField.md)<`TFieldValue`> | [`IFieldArray`](/auto-docs/form/interfaces/IFieldArray.md)<`TFieldValue`>

Get the current Field. It should be used in a child component of <Field />, otherwise it throws an error

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TFieldValue` | `any` |
| `TField` | extends [`IField`](/auto-docs/form/interfaces/IField.md)<`TFieldValue`, `ChangeEvent`<`any`> | `TFieldValue`> | [`IFieldArray`](/auto-docs/form/interfaces/IFieldArray.md)<`TFieldValue`> = [`IField`](/auto-docs/form/interfaces/IField.md)<`TFieldValue`, `ChangeEvent`<`any`> | `TFieldValue`> |

#### Returns

[`IField`](/auto-docs/form/interfaces/IField.md)<`TFieldValue`> | [`IFieldArray`](/auto-docs/form/interfaces/IFieldArray.md)<`TFieldValue`>
