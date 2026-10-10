# Interface: NodeFormProps\<TValues>

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Type parameters

| Name |
| :------ |
| `TValues` |

## Table of contents

### Properties

* [initialValues](/auto-docs/fixed-layout-editor/interfaces/NodeFormProps.md#initialvalues)
* [onFormValuesChange](/auto-docs/fixed-layout-editor/interfaces/NodeFormProps.md#onformvalueschange)
* [onValidate](/auto-docs/fixed-layout-editor/interfaces/NodeFormProps.md#onvalidate)
* [render](/auto-docs/fixed-layout-editor/interfaces/NodeFormProps.md#render)
* [state](/auto-docs/fixed-layout-editor/interfaces/NodeFormProps.md#state)
* [validate](/auto-docs/fixed-layout-editor/interfaces/NodeFormProps.md#validate)
* [values](/auto-docs/fixed-layout-editor/interfaces/NodeFormProps.md#values)

### Methods

* [getValueIn](/auto-docs/fixed-layout-editor/interfaces/NodeFormProps.md#getvaluein)
* [onFormValueChangeIn](/auto-docs/fixed-layout-editor/interfaces/NodeFormProps.md#onformvaluechangein)
* [setValueIn](/auto-docs/fixed-layout-editor/interfaces/NodeFormProps.md#setvaluein)
* [updateFormValues](/auto-docs/fixed-layout-editor/interfaces/NodeFormProps.md#updateformvalues)

## Properties

### initialValues

**initialValues**: `TValues`

The initialValues of the form.

***

### onFormValuesChange

**onFormValuesChange**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`OnFormValuesChangePayload`>

Form value change event

***

### onValidate

**onValidate**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`FormState`](/auto-docs/fixed-layout-editor/interfaces/FormState.md)>

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

**state**: [`FormState`](/auto-docs/fixed-layout-editor/interfaces/FormState.md)

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

**onFormValueChangeIn**<`TValue`, `TFormValue`>(`name`, `callback`): [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

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
| `callback` | (`payload`: [`onFormValueChangeInPayload`](/auto-docs/fixed-layout-editor/interfaces/onFormValueChangeInPayload.md)<`TValue`, `TFormValue`>) => `void` |

#### Returns

[`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

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
