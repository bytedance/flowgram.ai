# Function: useCurrentField

**useCurrentField**<`TFieldValue`, `TField`>(): [`IField`](/en/auto-docs/free-layout-editor/interfaces/IField.md)<`TFieldValue`> | [`IFieldArray`](/en/auto-docs/free-layout-editor/interfaces/IFieldArray.md)<`TFieldValue`>

Get the current Field. It should be used in a child component of <Field />, otherwise it throws an error

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TFieldValue` | `any` |
| `TField` | extends [`IField`](/en/auto-docs/free-layout-editor/interfaces/IField.md)<`TFieldValue`, `ChangeEvent`<`any`> | `TFieldValue`> | [`IFieldArray`](/en/auto-docs/free-layout-editor/interfaces/IFieldArray.md)<`TFieldValue`> = [`IField`](/en/auto-docs/free-layout-editor/interfaces/IField.md)<`TFieldValue`, `ChangeEvent`<`any`> | `TFieldValue`> |

#### Returns

[`IField`](/en/auto-docs/free-layout-editor/interfaces/IField.md)<`TFieldValue`> | [`IFieldArray`](/en/auto-docs/free-layout-editor/interfaces/IFieldArray.md)<`TFieldValue`>
