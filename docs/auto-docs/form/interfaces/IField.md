# Interface: IField\<TFieldValue, E>

Field render model, it's only available when Field is rendered

## Type parameters

| Name | Type |
| :------ | :------ |
| `TFieldValue` | extends [`FieldValue`](/auto-docs/form/types/FieldValue.md) = [`FieldValue`](/auto-docs/form/types/FieldValue.md) |
| `E` | `React.ChangeEvent`<`any`> | `TFieldValue` |

## Hierarchy

* **`IField`**

  ↳ [`IFieldArray`](/auto-docs/form/interfaces/IFieldArray.md)

## Table of contents

### Properties

* [key](/auto-docs/form/interfaces/IField.md#key)
* [name](/auto-docs/form/interfaces/IField.md#name)
* [onBlur](/auto-docs/form/interfaces/IField.md#onblur)
* [onChange](/auto-docs/form/interfaces/IField.md#onchange)
* [onFocus](/auto-docs/form/interfaces/IField.md#onfocus)
* [value](/auto-docs/form/interfaces/IField.md#value)

## Properties

### key

**key**: `string`

Uniq key for the Field, you can use it for the child react component's uniq key.

***

### name

**name**: `string`

Field's name (path)

***

### onBlur

`Optional` **onBlur**: () => `void`

#### Type declaration

(): `void`

A function which sends the input's onBlur event to Field. It should be assigned to the input's onBlur prop.

##### Returns

`void`

***

### onChange

**onChange**: (`e`: `E`) => `void`

#### Type declaration

(`e`): `void`

A function which sends the input's value to Field.
It should be assigned to the onChange prop of the input component

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `E` | It can be the new value of the field or the event sent by original dom input or checkbox component. |

##### Returns

`void`

***

### onFocus

`Optional` **onFocus**: () => `void`

#### Type declaration

(): `void`

A function which sends the input's onFocus event to Field. It should be assigned to the input's onFocus prop.

##### Returns

`void`

***

### value

**value**: `TFieldValue`

The current value of Field
