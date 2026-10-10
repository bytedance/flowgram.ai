# Type alias: Validate\<TFieldValue, TFormValues>

**Validate**<`TFieldValue`, `TFormValues`>: (`props`: { `context`: `Context` ; `formValues`: `TFormValues` ; `name`: [`FieldName`](/en/auto-docs/form/types/FieldName.md) ; `value`: `TFieldValue`  }) => `MaybePromise`<`string`> | `MaybePromise`<`FormErrorOptions`> | `MaybePromise`<`FormWarningOptions`> | `MaybePromise`<`undefined`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TFieldValue` | `any` |
| `TFormValues` | `any` |

#### Type declaration

(`props`): `MaybePromise`<`string`> | `MaybePromise`<`FormErrorOptions`> | `MaybePromise`<`FormWarningOptions`> | `MaybePromise`<`undefined`>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Object` | - |
| `props.context` | `Context` | The custom context set when init form |
| `props.formValues` | `TFormValues` | Complete form values |
| `props.name` | [`FieldName`](/en/auto-docs/form/types/FieldName.md) | The path of the data we are validating |
| `props.value` | `TFieldValue` | Value of the data to validate |

##### Returns

`MaybePromise`<`string`> | `MaybePromise`<`FormErrorOptions`> | `MaybePromise`<`FormWarningOptions`> | `MaybePromise`<`undefined`>
