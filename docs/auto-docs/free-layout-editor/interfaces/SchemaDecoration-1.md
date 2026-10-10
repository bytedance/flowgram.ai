# Interface: SchemaDecoration\<SCHEMA>

## Type parameters

| Name | Type |
| :------ | :------ |
| `SCHEMA` | `any` |

## Table of contents

### Properties

* [default](/auto-docs/free-layout-editor/interfaces/SchemaDecoration-1.md#default)
* [description](/auto-docs/free-layout-editor/interfaces/SchemaDecoration-1.md#description)
* [disabled](/auto-docs/free-layout-editor/interfaces/SchemaDecoration-1.md#disabled)
* [enumLabels](/auto-docs/free-layout-editor/interfaces/SchemaDecoration-1.md#enumlabels)
* [enumType](/auto-docs/free-layout-editor/interfaces/SchemaDecoration-1.md#enumtype)
* [enumValues](/auto-docs/free-layout-editor/interfaces/SchemaDecoration-1.md#enumvalues)
* [label](/auto-docs/free-layout-editor/interfaces/SchemaDecoration-1.md#label)
* [max](/auto-docs/free-layout-editor/interfaces/SchemaDecoration-1.md#max)
* [min](/auto-docs/free-layout-editor/interfaces/SchemaDecoration-1.md#min)
* [mixinDefaults](/auto-docs/free-layout-editor/interfaces/SchemaDecoration-1.md#mixindefaults)
* [properties](/auto-docs/free-layout-editor/interfaces/SchemaDecoration-1.md#properties)
* [rangeStep](/auto-docs/free-layout-editor/interfaces/SchemaDecoration-1.md#rangestep)
* [type](/auto-docs/free-layout-editor/interfaces/SchemaDecoration-1.md#type)

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

**type**: [`SchemaType`](/auto-docs/free-layout-editor/types/SchemaType.md)
