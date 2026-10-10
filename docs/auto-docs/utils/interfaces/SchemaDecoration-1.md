# Interface: SchemaDecoration\<SCHEMA>

## Type parameters

| Name | Type |
| :------ | :------ |
| `SCHEMA` | `any` |

## Table of contents

### Properties

* [default](/auto-docs/utils/interfaces/SchemaDecoration-1.md#default)
* [description](/auto-docs/utils/interfaces/SchemaDecoration-1.md#description)
* [disabled](/auto-docs/utils/interfaces/SchemaDecoration-1.md#disabled)
* [enumLabels](/auto-docs/utils/interfaces/SchemaDecoration-1.md#enumlabels)
* [enumType](/auto-docs/utils/interfaces/SchemaDecoration-1.md#enumtype)
* [enumValues](/auto-docs/utils/interfaces/SchemaDecoration-1.md#enumvalues)
* [label](/auto-docs/utils/interfaces/SchemaDecoration-1.md#label)
* [max](/auto-docs/utils/interfaces/SchemaDecoration-1.md#max)
* [min](/auto-docs/utils/interfaces/SchemaDecoration-1.md#min)
* [mixinDefaults](/auto-docs/utils/interfaces/SchemaDecoration-1.md#mixindefaults)
* [properties](/auto-docs/utils/interfaces/SchemaDecoration-1.md#properties)
* [rangeStep](/auto-docs/utils/interfaces/SchemaDecoration-1.md#rangestep)
* [type](/auto-docs/utils/interfaces/SchemaDecoration-1.md#type)

## Properties

### default

`Optional` **default**: `SCHEMA`

***

### description

`Optional` **description**: `string`

***

### disabled

`Optional` **disabled**: `boolean`

***

### enumLabels

`Optional` **enumLabels**: `string`\[]

***

### enumType

`Optional` **enumType**: `string` | `number`

***

### enumValues

`Optional` **enumValues**: (`string` | `number`)\[]

***

### label

`Optional` **label**: `string`

***

### max

`Optional` **max**: `number`

***

### min

`Optional` **min**: `number`

***

### mixinDefaults

`Optional` **mixinDefaults**: `SchemaMixinDefaults`

***

### properties

`Optional` **properties**: { \[K in string | number | symbol]: SchemaDecoration\<SCHEMA\[K]> & Object }

***

### rangeStep

`Optional` **rangeStep**: `number`

***

### type

**type**: [`SchemaType`](/auto-docs/utils/types/SchemaType.md)
