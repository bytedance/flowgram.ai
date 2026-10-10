# Interface: IJsonSchema\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `string` |

## Table of contents

### Properties

* [$ref](/en/auto-docs/json-schema/interfaces/IJsonSchema.md#$ref)
* [additionalProperties](/en/auto-docs/json-schema/interfaces/IJsonSchema.md#additionalproperties)
* [default](/en/auto-docs/json-schema/interfaces/IJsonSchema.md#default)
* [description](/en/auto-docs/json-schema/interfaces/IJsonSchema.md#description)
* [enum](/en/auto-docs/json-schema/interfaces/IJsonSchema.md#enum)
* [extra](/en/auto-docs/json-schema/interfaces/IJsonSchema.md#extra)
* [format](/en/auto-docs/json-schema/interfaces/IJsonSchema.md#format)
* [items](/en/auto-docs/json-schema/interfaces/IJsonSchema.md#items)
* [properties](/en/auto-docs/json-schema/interfaces/IJsonSchema.md#properties)
* [required](/en/auto-docs/json-schema/interfaces/IJsonSchema.md#required)
* [title](/en/auto-docs/json-schema/interfaces/IJsonSchema.md#title)
* [type](/en/auto-docs/json-schema/interfaces/IJsonSchema.md#type)

## Properties

### $ref

`Optional` **$ref**: `string`

***

### additionalProperties

`Optional` **additionalProperties**: [`IJsonSchema`](/en/auto-docs/json-schema/interfaces/IJsonSchema.md)<`T`>

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

`Optional` **items**: [`IJsonSchema`](/en/auto-docs/json-schema/interfaces/IJsonSchema.md)<`T`>

***

### properties

`Optional` **properties**: `Record`<`string`, [`IJsonSchema`](/en/auto-docs/json-schema/interfaces/IJsonSchema.md)<`T`>>

***

### required

`Optional` **required**: `string`\[]

***

### title

`Optional` **title**: `string`

***

### type

`Optional` **type**: `T`
