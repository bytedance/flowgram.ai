# Interface: IForm\<TValues>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TValues` | `any` |

## Table of contents

### Properties

* [initialValues](/en/auto-docs/form/interfaces/IForm.md#initialvalues)
* [state](/en/auto-docs/form/interfaces/IForm.md#state)
* [validate](/en/auto-docs/form/interfaces/IForm.md#validate)
* [values](/en/auto-docs/form/interfaces/IForm.md#values)

### Methods

* [getValueIn](/en/auto-docs/form/interfaces/IForm.md#getvaluein)
* [setValueIn](/en/auto-docs/form/interfaces/IForm.md#setvaluein)

## Properties

### initialValues

**initialValues**: `TValues`

The initialValues of the form.

***

### state

**state**: [`FormState`](/en/auto-docs/form/interfaces/FormState.md)

Form state

***

### validate

**validate**: () => `Promise`<[`FormValidateReturn`](/en/auto-docs/form/types/FormValidateReturn.md)>

#### Type declaration

(): `Promise`<[`FormValidateReturn`](/en/auto-docs/form/types/FormValidateReturn.md)>

Trigger validate for the whole form.

##### Returns

`Promise`<[`FormValidateReturn`](/en/auto-docs/form/types/FormValidateReturn.md)>

***

### values

**values**: `TValues`

Form values. Returns a deep copy of the data in the store.

## Methods

### getValueIn

**getValueIn**<`TValue`>(`name`): `TValue`

Get value in certain path

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | path |

#### Returns

`TValue`

***

### setValueIn

**setValueIn**<`TValue`>(`name`, `value`): `void`

Set value in certain path.
It will trigger the re-rendering of the Field Component if a Field is related to this path

#### Type parameters

| Name |
| :------ |
| `TValue` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | path |
| `value` | `TValue` | - |

#### Returns

`void`
