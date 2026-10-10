# Interface: IJsonSchema\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `string` |

## Table of contents

### Properties

* [$ref](/auto-docs/form-antd-materials/interfaces/IJsonSchema.md#$ref)
* [additionalProperties](/auto-docs/form-antd-materials/interfaces/IJsonSchema.md#additionalproperties)
* [default](/auto-docs/form-antd-materials/interfaces/IJsonSchema.md#default)
* [description](/auto-docs/form-antd-materials/interfaces/IJsonSchema.md#description)
* [enum](/auto-docs/form-antd-materials/interfaces/IJsonSchema.md#enum)
* [extra](/auto-docs/form-antd-materials/interfaces/IJsonSchema.md#extra)
* [items](/auto-docs/form-antd-materials/interfaces/IJsonSchema.md#items)
* [properties](/auto-docs/form-antd-materials/interfaces/IJsonSchema.md#properties)
* [required](/auto-docs/form-antd-materials/interfaces/IJsonSchema.md#required)
* [title](/auto-docs/form-antd-materials/interfaces/IJsonSchema.md#title)
* [type](/auto-docs/form-antd-materials/interfaces/IJsonSchema.md#type)

## Properties

### $ref

`Optional` **$ref**: `string`

***

### additionalProperties

`Optional` **additionalProperties**: [`IJsonSchema`](/auto-docs/form-antd-materials/interfaces/IJsonSchema.md)<`T`>

***

### default

`Optional` **default**: `any`

***

### description

`Optional` **description**: `string`

***

### enum

`Optional` **enum**: (`string` | `number`)\[]

***

### extra

`Optional` **extra**: `Object`

#### Index signature

▪ \[key: `string`]: `any`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `formComponent?` | `string` |
| `index?` | `number` |
| `weak?` | `boolean` |

***

### items

`Optional` **items**: [`IJsonSchema`](/auto-docs/form-antd-materials/interfaces/IJsonSchema.md)<`T`>

***

### properties

`Optional` **properties**: `Record`<`string`, [`IJsonSchema`](/auto-docs/form-antd-materials/interfaces/IJsonSchema.md)<`T`>>

***

### required

`Optional` **required**: `string`\[]

***

### title

`Optional` **title**: `string`

***

### type

`Optional` **type**: `T`
