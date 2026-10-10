# Interface: FormControl\<TValues>

## Type parameters

| Name |
| :------ |
| `TValues` |

## Table of contents

### Properties

* [\_formModel](/en/auto-docs/fixed-layout-editor/interfaces/FormControl.md#_formmodel)
* [getField](/en/auto-docs/fixed-layout-editor/interfaces/FormControl.md#getfield)
* [init](/en/auto-docs/fixed-layout-editor/interfaces/FormControl.md#init)

## Properties

### \_formModel

**\_formModel**: `FormModel`<`TValues`>

***

### getField

**getField**: \<TValue, TField>(`name`: `string`) => `undefined` | [`IField`](/en/auto-docs/fixed-layout-editor/interfaces/IField.md)<`TValue`, `ChangeEvent`<`any`> | `TValue`> | [`IFieldArray`](/en/auto-docs/fixed-layout-editor/interfaces/IFieldArray.md)<`TValue`>

#### Type declaration

<`TValue`, `TField`>(`name`): `undefined` | [`IField`](/en/auto-docs/fixed-layout-editor/interfaces/IField.md)<`TValue`, `ChangeEvent`<`any`> | `TValue`> | [`IFieldArray`](/en/auto-docs/fixed-layout-editor/interfaces/IFieldArray.md)<`TValue`>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | `any` |
| `TField` | extends [`IField`](/en/auto-docs/fixed-layout-editor/interfaces/IField.md)<`TValue`, `ChangeEvent`<`any`> | `TValue`> | [`IFieldArray`](/en/auto-docs/fixed-layout-editor/interfaces/IFieldArray.md)<`TValue`> = [`IField`](/en/auto-docs/fixed-layout-editor/interfaces/IField.md)<`TValue`, `ChangeEvent`<`any`> | `TValue`> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

##### Returns

`undefined` | [`IField`](/en/auto-docs/fixed-layout-editor/interfaces/IField.md)<`TValue`, `ChangeEvent`<`any`> | `TValue`> | [`IFieldArray`](/en/auto-docs/fixed-layout-editor/interfaces/IFieldArray.md)<`TValue`>

***

### init

**init**: () => `void`

#### Type declaration

(): `void`

手动初始化form

##### Returns

`void`
