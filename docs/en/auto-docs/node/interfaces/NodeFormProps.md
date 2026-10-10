# Interface: NodeFormProps\<TValues>

## Type parameters

| Name |
| :------ |
| `TValues` |

## Table of contents

### Properties

* [initialValues](/en/auto-docs/node/interfaces/NodeFormProps.md#initialvalues)
* [onFormValuesChange](/en/auto-docs/node/interfaces/NodeFormProps.md#onformvalueschange)
* [onValidate](/en/auto-docs/node/interfaces/NodeFormProps.md#onvalidate)
* [render](/en/auto-docs/node/interfaces/NodeFormProps.md#render)
* [state](/en/auto-docs/node/interfaces/NodeFormProps.md#state)
* [validate](/en/auto-docs/node/interfaces/NodeFormProps.md#validate)
* [values](/en/auto-docs/node/interfaces/NodeFormProps.md#values)

### Methods

* [getValueIn](/en/auto-docs/node/interfaces/NodeFormProps.md#getvaluein)
* [onFormValueChangeIn](/en/auto-docs/node/interfaces/NodeFormProps.md#onformvaluechangein)
* [setValueIn](/en/auto-docs/node/interfaces/NodeFormProps.md#setvaluein)
* [updateFormValues](/en/auto-docs/node/interfaces/NodeFormProps.md#updateformvalues)

## Properties

### initialValues

**initialValues**: `TValues`

The initialValues of the form.

***

### onFormValuesChange

**onFormValuesChange**: `Event`<`OnFormValuesChangePayload`>

Form value change event

***

### onValidate

**onValidate**: `Event`<`FormState`>

Form validate event

***

### render

**render**: () => `ReactNode`

#### Type declaration

(): `ReactNode`

Render form

##### Returns

`ReactNode`

***

### state

**state**: `FormState`

Form state

***

### validate

**validate**: () => `Promise`<`boolean`>

#### Type declaration

(): `Promise`<`boolean`>

Trigger form validate

##### Returns

`Promise`<`boolean`>

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

### onFormValueChangeIn

**onFormValueChangeIn**<`TValue`, `TFormValue`>(`name`, `callback`): `Disposable`

Form field value change event

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | `any` |
| `TFormValue` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `callback` | (`payload`: [`onFormValueChangeInPayload`](/en/auto-docs/node/interfaces/onFormValueChangeInPayload.md)<`TValue`, `TFormValue`>) => `void` |

#### Returns

`Disposable`

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

***

### updateFormValues

**updateFormValues**(`values`): `void`

set form values

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `any` |

#### Returns

`void`
