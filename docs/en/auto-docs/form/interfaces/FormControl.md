# Interface: FormControl\<TValues>

## Type parameters

| Name |
| :------ |
| `TValues` |

## Table of contents

### Properties

* [\_formModel](/en/auto-docs/form/interfaces/FormControl.md#_formmodel)
* [getField](/en/auto-docs/form/interfaces/FormControl.md#getfield)
* [init](/en/auto-docs/form/interfaces/FormControl.md#init)

## Properties

### \_formModel

**\_formModel**: [`FormModel`](/en/auto-docs/form/classes/FormModel.md)<`TValues`>

***

### getField

**getField**: \<TValue, TField>(`name`: `string`) => `undefined` | [`IField`](/en/auto-docs/form/interfaces/IField.md)<`TValue`, `ChangeEvent`<`any`> | `TValue`> | [`IFieldArray`](/en/auto-docs/form/interfaces/IFieldArray.md)<`TValue`>

#### Type declaration

<`TValue`, `TField`>(`name`): `undefined` | [`IField`](/en/auto-docs/form/interfaces/IField.md)<`TValue`, `ChangeEvent`<`any`> | `TValue`> | [`IFieldArray`](/en/auto-docs/form/interfaces/IFieldArray.md)<`TValue`>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | `any` |
| `TField` | extends [`IField`](/en/auto-docs/form/interfaces/IField.md)<`TValue`, `ChangeEvent`<`any`> | `TValue`> | [`IFieldArray`](/en/auto-docs/form/interfaces/IFieldArray.md)<`TValue`> = [`IField`](/en/auto-docs/form/interfaces/IField.md)<`TValue`, `ChangeEvent`<`any`> | `TValue`> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

##### Returns

`undefined` | [`IField`](/en/auto-docs/form/interfaces/IField.md)<`TValue`, `ChangeEvent`<`any`> | `TValue`> | [`IFieldArray`](/en/auto-docs/form/interfaces/IFieldArray.md)<`TValue`>

***

### init

**init**: () => `void`

#### Type declaration

(): `void`

手动初始化form

##### Returns

`void`
