# Interface: IFieldArray\<TFieldValue>

FieldArray render model, it's only available when FieldArray is rendered

## Type parameters

| Name | Type |
| :------ | :------ |
| `TFieldValue` | extends [`FieldValue`](/auto-docs/form/types/FieldValue.md) = [`FieldValue`](/auto-docs/form/types/FieldValue.md) |

## Hierarchy

* [`IField`](/auto-docs/form/interfaces/IField.md)<`TFieldValue`\[] | `undefined`, `TFieldValue`\[] | `undefined`>

  ↳ **`IFieldArray`**

## Table of contents

### Properties

* [append](/auto-docs/form/interfaces/IFieldArray.md#append)
* [delete](/auto-docs/form/interfaces/IFieldArray.md#delete)
* [key](/auto-docs/form/interfaces/IFieldArray.md#key)
* [map](/auto-docs/form/interfaces/IFieldArray.md#map)
* [move](/auto-docs/form/interfaces/IFieldArray.md#move)
* [name](/auto-docs/form/interfaces/IFieldArray.md#name)
* [onBlur](/auto-docs/form/interfaces/IFieldArray.md#onblur)
* [onChange](/auto-docs/form/interfaces/IFieldArray.md#onchange)
* [onFocus](/auto-docs/form/interfaces/IFieldArray.md#onfocus)
* [remove](/auto-docs/form/interfaces/IFieldArray.md#remove)
* [swap](/auto-docs/form/interfaces/IFieldArray.md#swap)
* [value](/auto-docs/form/interfaces/IFieldArray.md#value)

## Properties

### append

**append**: (`value`: `TFieldValue`) => [`IField`](/auto-docs/form/interfaces/IField.md)<`TFieldValue`, `ChangeEvent`<`any`> | `TFieldValue`>

#### Type declaration

(`value`): [`IField`](/auto-docs/form/interfaces/IField.md)<`TFieldValue`, `ChangeEvent`<`any`> | `TFieldValue`>

Append a value at the end of the array, it will create a new Field for this value as well.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `TFieldValue` | the value to append |

##### Returns

[`IField`](/auto-docs/form/interfaces/IField.md)<`TFieldValue`, `ChangeEvent`<`any`> | `TFieldValue`>

***

### delete

**delete**: (`index`: `number`) => `void`

#### Type declaration

(`index`): `void`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | the index of the element to delete |

##### Returns

`void`

**`Deprecated`**

use remove instead
Delete the value and the related field at certain index of the array.

***

### key

**key**: `string`

Uniq key for the Field, you can use it for the child react component's uniq key.

#### Inherited from

[IField](/auto-docs/form/interfaces/IField.md).[key](/auto-docs/form/interfaces/IField.md#key)

***

### map

**map**: \<T>(`cb`: (`f`: [`IField`](/auto-docs/form/interfaces/IField.md)<`TFieldValue`, `ChangeEvent`<`any`> | `TFieldValue`>, `index`: `number`) => `T`) => `T`\[]

#### Type declaration

<`T`>(`cb`): `T`\[]

Same as native Array.map, the first param of the callback function is the child field of this FieldArray.

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cb` | (`f`: [`IField`](/auto-docs/form/interfaces/IField.md)<`TFieldValue`, `ChangeEvent`<`any`> | `TFieldValue`>, `index`: `number`) => `T` | callback function |

##### Returns

`T`\[]

***

### move

**move**: (`from`: `number`, `to`: `number`) => `void`

#### Type declaration

(`from`, `to`): `void`

Move an array element from one position to another.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `number` | from position |
| `to` | `number` | to position |

##### Returns

`void`

***

### name

**name**: `string`

Field's name (path)

#### Inherited from

[IField](/auto-docs/form/interfaces/IField.md).[name](/auto-docs/form/interfaces/IField.md#name)

***

### onBlur

`Optional` **onBlur**: () => `void`

#### Type declaration

(): `void`

A function which sends the input's onBlur event to Field. It should be assigned to the input's onBlur prop.

##### Returns

`void`

#### Inherited from

[IField](/auto-docs/form/interfaces/IField.md).[onBlur](/auto-docs/form/interfaces/IField.md#onblur)

***

### onChange

**onChange**: (`e`: `undefined` | `TFieldValue`\[]) => `void`

#### Type declaration

(`e`): `void`

A function which sends the input's value to Field.
It should be assigned to the onChange prop of the input component

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `undefined` | `TFieldValue`\[] | It can be the new value of the field or the event sent by original dom input or checkbox component. |

##### Returns

`void`

#### Inherited from

[IField](/auto-docs/form/interfaces/IField.md).[onChange](/auto-docs/form/interfaces/IField.md#onchange)

***

### onFocus

`Optional` **onFocus**: () => `void`

#### Type declaration

(): `void`

A function which sends the input's onFocus event to Field. It should be assigned to the input's onFocus prop.

##### Returns

`void`

#### Inherited from

[IField](/auto-docs/form/interfaces/IField.md).[onFocus](/auto-docs/form/interfaces/IField.md#onfocus)

***

### remove

**remove**: (`index`: `number`) => `void`

#### Type declaration

(`index`): `void`

Delete the value and the related field at certain index of the array.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | the index of the element to delete |

##### Returns

`void`

***

### swap

**swap**: (`from`: `number`, `to`: `number`) => `void`

#### Type declaration

(`from`, `to`): `void`

Swap the position of two elements of the array.

##### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `number` |
| `to` | `number` |

##### Returns

`void`

***

### value

**value**: `undefined` | `TFieldValue`\[]

The current value of Field

#### Inherited from

[IField](/auto-docs/form/interfaces/IField.md).[value](/auto-docs/form/interfaces/IField.md#value)
