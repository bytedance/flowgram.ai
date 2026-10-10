# Interface: SchemaDecoration\<SCHEMA>

## Type parameters

| Name | Type |
| :------ | :------ |
| `SCHEMA` | `any` |

## Table of contents

### Properties

* [default](/en/auto-docs/editor/interfaces/SchemaDecoration-1.md#default)
* [description](/en/auto-docs/editor/interfaces/SchemaDecoration-1.md#description)
* [disabled](/en/auto-docs/editor/interfaces/SchemaDecoration-1.md#disabled)
* [enumLabels](/en/auto-docs/editor/interfaces/SchemaDecoration-1.md#enumlabels)
* [enumType](/en/auto-docs/editor/interfaces/SchemaDecoration-1.md#enumtype)
* [enumValues](/en/auto-docs/editor/interfaces/SchemaDecoration-1.md#enumvalues)
* [label](/en/auto-docs/editor/interfaces/SchemaDecoration-1.md#label)
* [max](/en/auto-docs/editor/interfaces/SchemaDecoration-1.md#max)
* [min](/en/auto-docs/editor/interfaces/SchemaDecoration-1.md#min)
* [mixinDefaults](/en/auto-docs/editor/interfaces/SchemaDecoration-1.md#mixindefaults)
* [properties](/en/auto-docs/editor/interfaces/SchemaDecoration-1.md#properties)
* [rangeStep](/en/auto-docs/editor/interfaces/SchemaDecoration-1.md#rangestep)
* [type](/en/auto-docs/editor/interfaces/SchemaDecoration-1.md#type)

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

**type**: [`SchemaType`](/en/auto-docs/editor/types/SchemaType.md)
