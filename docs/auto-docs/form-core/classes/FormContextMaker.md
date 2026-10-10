# Class: FormContextMaker

## Table of contents

### Constructors

* [constructor](/auto-docs/form-core/classes/FormContextMaker.md#constructor)

### Properties

* [nodeEngineContext](/auto-docs/form-core/classes/FormContextMaker.md#nodeenginecontext)
* [playgroundContext](/auto-docs/form-core/classes/FormContextMaker.md#playgroundcontext)

### Methods

* [makeFormItemMaterialContext](/auto-docs/form-core/classes/FormContextMaker.md#makeformitemmaterialcontext)

## Constructors

### constructor

**new FormContextMaker**()

## Properties

### nodeEngineContext

`Readonly` **nodeEngineContext**: [`NodeEngineContext`](/auto-docs/form-core/classes/NodeEngineContext.md)

***

### playgroundContext

`Readonly` **playgroundContext**: `any`

## Methods

### makeFormItemMaterialContext

**makeFormItemMaterialContext**(`formItem`, `options?`): [`FormItemMaterialContext`](/auto-docs/form-core/interfaces/FormItemMaterialContext.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `formItem` | [`FormItem`](/auto-docs/form-core/classes/FormItem.md) |
| `options?` | `Object` |
| `options.getIndex` | () => `undefined` | `number` |

#### Returns

[`FormItemMaterialContext`](/auto-docs/form-core/interfaces/FormItemMaterialContext.md)
