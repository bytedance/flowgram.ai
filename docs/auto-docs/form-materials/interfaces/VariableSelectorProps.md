# Interface: VariableSelectorProps

## Table of contents

### Properties

* [config](/auto-docs/form-materials/interfaces/VariableSelectorProps.md#config)
* [excludeSchema](/auto-docs/form-materials/interfaces/VariableSelectorProps.md#excludeschema)
* [hasError](/auto-docs/form-materials/interfaces/VariableSelectorProps.md#haserror)
* [includeSchema](/auto-docs/form-materials/interfaces/VariableSelectorProps.md#includeschema)
* [onChange](/auto-docs/form-materials/interfaces/VariableSelectorProps.md#onchange)
* [readonly](/auto-docs/form-materials/interfaces/VariableSelectorProps.md#readonly)
* [style](/auto-docs/form-materials/interfaces/VariableSelectorProps.md#style)
* [triggerRender](/auto-docs/form-materials/interfaces/VariableSelectorProps.md#triggerrender)
* [value](/auto-docs/form-materials/interfaces/VariableSelectorProps.md#value)

## Properties

### config

`Optional` **config**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `notFoundContent?` | `string` |
| `placeholder?` | `string` |

***

### excludeSchema

`Optional` **excludeSchema**: [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`> | [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>\[]

***

### hasError

`Optional` **hasError**: `boolean`

***

### includeSchema

`Optional` **includeSchema**: [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`> | [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>\[]

***

### onChange

**onChange**: (`value?`: `string`\[]) => `void`

#### Type declaration

(`value?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `string`\[] |

##### Returns

`void`

***

### readonly

`Optional` **readonly**: `boolean`

***

### style

`Optional` **style**: `CSSProperties`

***

### triggerRender

`Optional` **triggerRender**: (`props`: `TriggerRenderProps`) => `ReactNode`

#### Type declaration

(`props`): `ReactNode`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `TriggerRenderProps` |

##### Returns

`ReactNode`

***

### value

`Optional` **value**: `string`\[]
