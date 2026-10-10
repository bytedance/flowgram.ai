# Class: FormMeta

## Implements

* [`IFormMeta`](/auto-docs/form-core/interfaces/IFormMeta.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/form-core/classes/FormMeta.md#constructor)

### Accessors

* [options](/auto-docs/form-core/classes/FormMeta.md#options)
* [root](/auto-docs/form-core/classes/FormMeta.md#root)

### Methods

* [traverse](/auto-docs/form-core/classes/FormMeta.md#traverse)

## Constructors

### constructor

**new FormMeta**(`root`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`IFormItemMeta`](/auto-docs/form-core/interfaces/IFormItemMeta.md) |
| `options` | [`IFormMetaOptions`](/auto-docs/form-core/interfaces/IFormMetaOptions.md) |

## Accessors

### options

`get` **options**(): [`IFormMetaOptions`](/auto-docs/form-core/interfaces/IFormMetaOptions.md)

表单全局配置

#### Returns

[`IFormMetaOptions`](/auto-docs/form-core/interfaces/IFormMetaOptions.md)

#### Implementation of

[IFormMeta](/auto-docs/form-core/interfaces/IFormMeta.md).[options](/auto-docs/form-core/interfaces/IFormMeta.md#options)

***

### root

`get` **root**(): [`IFormItemMeta`](/auto-docs/form-core/interfaces/IFormItemMeta.md)

表单树结构root

#### Returns

[`IFormItemMeta`](/auto-docs/form-core/interfaces/IFormItemMeta.md)

#### Implementation of

[IFormMeta](/auto-docs/form-core/interfaces/IFormMeta.md).[root](/auto-docs/form-core/interfaces/IFormMeta.md#root)

## Methods

### traverse

`Static` **traverse**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`FormMetaTraverseParams`](/auto-docs/form-core/interfaces/FormMetaTraverseParams.md) |

#### Returns

`void`
