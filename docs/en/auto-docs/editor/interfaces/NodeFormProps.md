# Interface: NodeFormProps\<TValues>

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Type parameters

| Name |
| :------ |
| `TValues` |

## Table of contents

### Properties

* [initialValues](/en/auto-docs/editor/interfaces/NodeFormProps.md#initialvalues)
* [onFormValuesChange](/en/auto-docs/editor/interfaces/NodeFormProps.md#onformvalueschange)
* [onValidate](/en/auto-docs/editor/interfaces/NodeFormProps.md#onvalidate)
* [render](/en/auto-docs/editor/interfaces/NodeFormProps.md#render)
* [state](/en/auto-docs/editor/interfaces/NodeFormProps.md#state)
* [validate](/en/auto-docs/editor/interfaces/NodeFormProps.md#validate)
* [values](/en/auto-docs/editor/interfaces/NodeFormProps.md#values)

### Methods

* [getValueIn](/en/auto-docs/editor/interfaces/NodeFormProps.md#getvaluein)
* [onFormValueChangeIn](/en/auto-docs/editor/interfaces/NodeFormProps.md#onformvaluechangein)
* [setValueIn](/en/auto-docs/editor/interfaces/NodeFormProps.md#setvaluein)
* [updateFormValues](/en/auto-docs/editor/interfaces/NodeFormProps.md#updateformvalues)

## Properties

### initialValues

**initialValues**: `TValues`

The initialValues of the form.

***

### onFormValuesChange

**onFormValuesChange**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`OnFormValuesChangePayload`>

Form value change event

***

### onValidate

**onValidate**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<[`FormState`](/en/auto-docs/editor/interfaces/FormState.md)>

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

**state**: [`FormState`](/en/auto-docs/editor/interfaces/FormState.md)

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

**onFormValueChangeIn**<`TValue`, `TFormValue`>(`name`, `callback`): [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

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
| `callback` | (`payload`: [`onFormValueChangeInPayload`](/en/auto-docs/editor/interfaces/onFormValueChangeInPayload.md)<`TValue`, `TFormValue`>) => `void` |

#### Returns

[`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

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
