# Class: FormPathService

## Table of contents

### Constructors

* [constructor](/en/auto-docs/form-core/classes/FormPathService.md#constructor)

### Properties

* [ARRAY](/en/auto-docs/form-core/classes/FormPathService.md#array)
* [DIVIDER](/en/auto-docs/form-core/classes/FormPathService.md#divider)
* [RELATIVE\_CURRENT](/en/auto-docs/form-core/classes/FormPathService.md#relative_current)
* [RELATIVE\_PARENT](/en/auto-docs/form-core/classes/FormPathService.md#relative_parent)
* [ROOT](/en/auto-docs/form-core/classes/FormPathService.md#root)

### Methods

* [simplify](/en/auto-docs/form-core/classes/FormPathService.md#simplify)
* [join](/en/auto-docs/form-core/classes/FormPathService.md#join)
* [normalize](/en/auto-docs/form-core/classes/FormPathService.md#normalize)
* [parseArrayItemPath](/en/auto-docs/form-core/classes/FormPathService.md#parsearrayitempath)
* [toArrayPath](/en/auto-docs/form-core/classes/FormPathService.md#toarraypath)

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
