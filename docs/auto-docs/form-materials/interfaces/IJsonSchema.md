# Interface: IJsonSchema\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `string` |

## Table of contents

### Properties

* [$ref](/auto-docs/form-materials/interfaces/IJsonSchema.md#$ref)
* [additionalProperties](/auto-docs/form-materials/interfaces/IJsonSchema.md#additionalproperties)
* [default](/auto-docs/form-materials/interfaces/IJsonSchema.md#default)
* [description](/auto-docs/form-materials/interfaces/IJsonSchema.md#description)
* [enum](/auto-docs/form-materials/interfaces/IJsonSchema.md#enum)
* [extra](/auto-docs/form-materials/interfaces/IJsonSchema.md#extra)
* [format](/auto-docs/form-materials/interfaces/IJsonSchema.md#format)
* [items](/auto-docs/form-materials/interfaces/IJsonSchema.md#items)
* [properties](/auto-docs/form-materials/interfaces/IJsonSchema.md#properties)
* [required](/auto-docs/form-materials/interfaces/IJsonSchema.md#required)
* [title](/auto-docs/form-materials/interfaces/IJsonSchema.md#title)
* [type](/auto-docs/form-materials/interfaces/IJsonSchema.md#type)

## Properties

### $ref

`Optional` **$ref**: `string`

***

### additionalProperties

`Optional` **additionalProperties**: [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`T`>

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

### format

`Optional` **format**: `string`

The format of string
https://json-schema.org/understanding-json-schema/reference/type#format

***

### items

`Optional` **items**: [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`T`>

***

### properties

`Optional` **properties**: `Record`<`string`, [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`T`>>

***

### required

`Optional` **required**: `string`\[]

***

### title

`Optional` **title**: `string`

***

### type

`Optional` **type**: `T`
