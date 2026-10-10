# Interface: IFieldArray\<TFieldValue>

FieldArray render model, it's only available when FieldArray is rendered

## Type parameters

| Name | Type |
| :------ | :------ |
| `TFieldValue` | extends `FieldValue` = `FieldValue` |

## Hierarchy

* [`IField`](/en/auto-docs/editor/interfaces/IField.md)<`TFieldValue`\[] | `undefined`, `TFieldValue`\[] | `undefined`>

  ↳ **`IFieldArray`**

## Table of contents

### Properties

* [append](/en/auto-docs/editor/interfaces/IFieldArray.md#append)
* [delete](/en/auto-docs/editor/interfaces/IFieldArray.md#delete)
* [key](/en/auto-docs/editor/interfaces/IFieldArray.md#key)
* [map](/en/auto-docs/editor/interfaces/IFieldArray.md#map)
* [move](/en/auto-docs/editor/interfaces/IFieldArray.md#move)
* [name](/en/auto-docs/editor/interfaces/IFieldArray.md#name)
* [onBlur](/en/auto-docs/editor/interfaces/IFieldArray.md#onblur)
* [onChange](/en/auto-docs/editor/interfaces/IFieldArray.md#onchange)
* [onFocus](/en/auto-docs/editor/interfaces/IFieldArray.md#onfocus)
* [remove](/en/auto-docs/editor/interfaces/IFieldArray.md#remove)
* [swap](/en/auto-docs/editor/interfaces/IFieldArray.md#swap)
* [value](/en/auto-docs/editor/interfaces/IFieldArray.md#value)

## Properties

### append

**append**: (`value`: `TFieldValue`) => [`IField`](/en/auto-docs/editor/interfaces/IField.md)<`TFieldValue`, `TFieldValue` | `ChangeEvent`<`any`>>

#### Type declaration

(`value`): [`IField`](/en/auto-docs/editor/interfaces/IField.md)<`TFieldValue`, `TFieldValue` | `ChangeEvent`<`any`>>

Append a value at the end of the array, it will create a new Field for this value as well.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `TFieldValue` | the value to append |

##### Returns

[`IField`](/en/auto-docs/editor/interfaces/IField.md)<`TFieldValue`, `TFieldValue` | `ChangeEvent`<`any`>>

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

[IField](/en/auto-docs/editor/interfaces/IField.md).[key](/en/auto-docs/editor/interfaces/IField.md#key)

***

### map

**map**: \<T>(`cb`: (`f`: [`IField`](/en/auto-docs/editor/interfaces/IField.md)<`TFieldValue`, `TFieldValue` | `ChangeEvent`<`any`>>, `index`: `number`) => `T`) => `T`\[]

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
| `cb` | (`f`: [`IField`](/en/auto-docs/editor/interfaces/IField.md)<`TFieldValue`, `TFieldValue` | `ChangeEvent`<`any`>>, `index`: `number`) => `T` | callback function |

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

[IField](/en/auto-docs/editor/interfaces/IField.md).[name](/en/auto-docs/editor/interfaces/IField.md#name)

***

### onBlur

`Optional` **onBlur**: () => `void`

#### Type declaration

(): `void`

A function which sends the input's onBlur event to Field. It should be assigned to the input's onBlur prop.

##### Returns

`void`

#### Inherited from

[IField](/en/auto-docs/editor/interfaces/IField.md).[onBlur](/en/auto-docs/editor/interfaces/IField.md#onblur)

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

[IField](/en/auto-docs/editor/interfaces/IField.md).[onChange](/en/auto-docs/editor/interfaces/IField.md#onchange)

***

### onFocus

`Optional` **onFocus**: () => `void`

#### Type declaration

(): `void`

A function which sends the input's onFocus event to Field. It should be assigned to the input's onFocus prop.

##### Returns

`void`

#### Inherited from

[IField](/en/auto-docs/editor/interfaces/IField.md).[onFocus](/en/auto-docs/editor/interfaces/IField.md#onfocus)

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

[IField](/en/auto-docs/editor/interfaces/IField.md).[value](/en/auto-docs/editor/interfaces/IField.md#value)
