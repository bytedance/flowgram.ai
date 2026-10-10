# Class: FormPathService

## Table of contents

### Constructors

* [constructor](/auto-docs/form-core/classes/FormPathService.md#constructor)

### Properties

* [ARRAY](/auto-docs/form-core/classes/FormPathService.md#array)
* [DIVIDER](/auto-docs/form-core/classes/FormPathService.md#divider)
* [RELATIVE\_CURRENT](/auto-docs/form-core/classes/FormPathService.md#relative_current)
* [RELATIVE\_PARENT](/auto-docs/form-core/classes/FormPathService.md#relative_parent)
* [ROOT](/auto-docs/form-core/classes/FormPathService.md#root)

### Methods

* [simplify](/auto-docs/form-core/classes/FormPathService.md#simplify)
* [join](/auto-docs/form-core/classes/FormPathService.md#join)
* [normalize](/auto-docs/form-core/classes/FormPathService.md#normalize)
* [parseArrayItemPath](/auto-docs/form-core/classes/FormPathService.md#parsearrayitempath)
* [toArrayPath](/auto-docs/form-core/classes/FormPathService.md#toarraypath)

## Constructors

### constructor

**new FormPathService**()

## Properties

### ARRAY

`Static` `Readonly` **ARRAY**: `"[]"`

***

### DIVIDER

`Static` `Readonly` **DIVIDER**: `"/"`

***

### RELATIVE\_CURRENT

`Static` `Readonly` **RELATIVE\_CURRENT**: `"."`

***

### RELATIVE\_PARENT

`Static` `Readonly` **RELATIVE\_PARENT**: `".."`

***

### ROOT

`Static` `Readonly` **ROOT**: `"/"`

## Methods

### simplify

**simplify**(`path`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`string`

***

### join

`Static` **join**(`paths`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `paths` | `string`\[] |

#### Returns

`string`

***

### normalize

`Static` **normalize**(`path`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`string`

***

### parseArrayItemPath

`Static` **parseArrayItemPath**(`path`): `null` | { `arrayPath`: `string` ; `itemIndex`: `number` ; `itemMetaPath`: `string`  }

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`null` | { `arrayPath`: `string` ; `itemIndex`: `number` ; `itemMetaPath`: `string`  }

***

### toArrayPath

`Static` **toArrayPath**(`path`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`string`
