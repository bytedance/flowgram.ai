# Interface: VariableSelectorProps

## Table of contents

### Properties

* [config](/en/auto-docs/form-materials/interfaces/VariableSelectorProps.md#config)
* [excludeSchema](/en/auto-docs/form-materials/interfaces/VariableSelectorProps.md#excludeschema)
* [hasError](/en/auto-docs/form-materials/interfaces/VariableSelectorProps.md#haserror)
* [includeSchema](/en/auto-docs/form-materials/interfaces/VariableSelectorProps.md#includeschema)
* [onChange](/en/auto-docs/form-materials/interfaces/VariableSelectorProps.md#onchange)
* [readonly](/en/auto-docs/form-materials/interfaces/VariableSelectorProps.md#readonly)
* [style](/en/auto-docs/form-materials/interfaces/VariableSelectorProps.md#style)
* [triggerRender](/en/auto-docs/form-materials/interfaces/VariableSelectorProps.md#triggerrender)
* [value](/en/auto-docs/form-materials/interfaces/VariableSelectorProps.md#value)

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

`Optional` **excludeSchema**: [`IJsonSchema`](/en/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`> | [`IJsonSchema`](/en/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>\[]

***

### hasError

`Optional` **hasError**: `boolean`

***

### includeSchema

`Optional` **includeSchema**: [`IJsonSchema`](/en/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`> | [`IJsonSchema`](/en/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>\[]

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
