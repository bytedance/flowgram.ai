# Class: FormMeta

## Implements

* [`IFormMeta`](/en/auto-docs/form-core/interfaces/IFormMeta.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/form-core/classes/FormMeta.md#constructor)

### Accessors

* [options](/en/auto-docs/form-core/classes/FormMeta.md#options)
* [root](/en/auto-docs/form-core/classes/FormMeta.md#root)

### Methods

* [traverse](/en/auto-docs/form-core/classes/FormMeta.md#traverse)

## Constructors

### constructor

**new FormMeta**(`root`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`IFormItemMeta`](/en/auto-docs/form-core/interfaces/IFormItemMeta.md) |
| `options` | [`IFormMetaOptions`](/en/auto-docs/form-core/interfaces/IFormMetaOptions.md) |

## Accessors

### options

`get` **options**(): [`IFormMetaOptions`](/en/auto-docs/form-core/interfaces/IFormMetaOptions.md)

表单全局配置

#### Returns

[`IFormMetaOptions`](/en/auto-docs/form-core/interfaces/IFormMetaOptions.md)

#### Implementation of

[IFormMeta](/en/auto-docs/form-core/interfaces/IFormMeta.md).[options](/en/auto-docs/form-core/interfaces/IFormMeta.md#options)

***

### root

`get` **root**(): [`IFormItemMeta`](/en/auto-docs/form-core/interfaces/IFormItemMeta.md)

表单树结构root

#### Returns

[`IFormItemMeta`](/en/auto-docs/form-core/interfaces/IFormItemMeta.md)

#### Implementation of

[IFormMeta](/en/auto-docs/form-core/interfaces/IFormMeta.md).[root](/en/auto-docs/form-core/interfaces/IFormMeta.md#root)

## Methods

### traverse

`Static` **traverse**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`FormMetaTraverseParams`](/en/auto-docs/form-core/interfaces/FormMetaTraverseParams.md) |

#### Returns

`void`
