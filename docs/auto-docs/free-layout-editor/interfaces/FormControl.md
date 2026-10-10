# Interface: FormControl\<TValues>

## Type parameters

| Name |
| :------ |
| `TValues` |

## Table of contents

### Properties

* [\_formModel](/auto-docs/free-layout-editor/interfaces/FormControl.md#_formmodel)
* [getField](/auto-docs/free-layout-editor/interfaces/FormControl.md#getfield)
* [init](/auto-docs/free-layout-editor/interfaces/FormControl.md#init)

## Properties

### \_formModel

**\_formModel**: `FormModel`<`TValues`>

***

### getField

**getField**: \<TValue, TField>(`name`: `string`) => `undefined` | [`IField`](/auto-docs/free-layout-editor/interfaces/IField.md)<`TValue`, `ChangeEvent`<`any`> | `TValue`> | [`IFieldArray`](/auto-docs/free-layout-editor/interfaces/IFieldArray.md)<`TValue`>

#### Type declaration

<`TValue`, `TField`>(`name`): `undefined` | [`IField`](/auto-docs/free-layout-editor/interfaces/IField.md)<`TValue`, `ChangeEvent`<`any`> | `TValue`> | [`IFieldArray`](/auto-docs/free-layout-editor/interfaces/IFieldArray.md)<`TValue`>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | `any` |
| `TField` | extends [`IField`](/auto-docs/free-layout-editor/interfaces/IField.md)<`TValue`, `ChangeEvent`<`any`> | `TValue`> | [`IFieldArray`](/auto-docs/free-layout-editor/interfaces/IFieldArray.md)<`TValue`> = [`IField`](/auto-docs/free-layout-editor/interfaces/IField.md)<`TValue`, `ChangeEvent`<`any`> | `TValue`> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

##### Returns

`undefined` | [`IField`](/auto-docs/free-layout-editor/interfaces/IField.md)<`TValue`, `ChangeEvent`<`any`> | `TValue`> | [`IFieldArray`](/auto-docs/free-layout-editor/interfaces/IFieldArray.md)<`TValue`>

***

### init

**init**: () => `void`

#### Type declaration

(): `void`

手动初始化form

##### Returns

`void`
