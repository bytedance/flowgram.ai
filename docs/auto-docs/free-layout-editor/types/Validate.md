# Type alias: Validate\<TFieldValue, TFormValues>

**Validate**<`TFieldValue`, `TFormValues`>: (`props`: { `context`: `Context` ; `formValues`: `TFormValues` ; `name`: [`FieldName`](/auto-docs/free-layout-editor/types/FieldName.md) ; `value`: `TFieldValue`  }) => [`MaybePromise`](/auto-docs/free-layout-editor/types/MaybePromise.md)<`string`> | [`MaybePromise`](/auto-docs/free-layout-editor/types/MaybePromise.md)<`FormErrorOptions`> | [`MaybePromise`](/auto-docs/free-layout-editor/types/MaybePromise.md)<`FormWarningOptions`> | [`MaybePromise`](/auto-docs/free-layout-editor/types/MaybePromise.md)<`undefined`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TFieldValue` | `any` |
| `TFormValues` | `any` |

#### Type declaration

(`props`): [`MaybePromise`](/auto-docs/free-layout-editor/types/MaybePromise.md)<`string`> | [`MaybePromise`](/auto-docs/free-layout-editor/types/MaybePromise.md)<`FormErrorOptions`> | [`MaybePromise`](/auto-docs/free-layout-editor/types/MaybePromise.md)<`FormWarningOptions`> | [`MaybePromise`](/auto-docs/free-layout-editor/types/MaybePromise.md)<`undefined`>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Object` | - |
| `props.context` | `Context` | The custom context set when init form |
| `props.formValues` | `TFormValues` | Complete form values |
| `props.name` | [`FieldName`](/auto-docs/free-layout-editor/types/FieldName.md) | The path of the data we are validating |
| `props.value` | `TFieldValue` | Value of the data to validate |

##### Returns

[`MaybePromise`](/auto-docs/free-layout-editor/types/MaybePromise.md)<`string`> | [`MaybePromise`](/auto-docs/free-layout-editor/types/MaybePromise.md)<`FormErrorOptions`> | [`MaybePromise`](/auto-docs/free-layout-editor/types/MaybePromise.md)<`FormWarningOptions`> | [`MaybePromise`](/auto-docs/free-layout-editor/types/MaybePromise.md)<`undefined`>
