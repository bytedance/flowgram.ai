# Class: FormContextMaker

## Table of contents

### Constructors

* [constructor](/en/auto-docs/form-core/classes/FormContextMaker.md#constructor)

### Properties

* [nodeEngineContext](/en/auto-docs/form-core/classes/FormContextMaker.md#nodeenginecontext)
* [playgroundContext](/en/auto-docs/form-core/classes/FormContextMaker.md#playgroundcontext)

### Methods

* [makeFormItemMaterialContext](/en/auto-docs/form-core/classes/FormContextMaker.md#makeformitemmaterialcontext)

## Constructors

### constructor

**new FormContextMaker**()

## Properties

### nodeEngineContext

`Readonly` **nodeEngineContext**: [`NodeEngineContext`](/en/auto-docs/form-core/classes/NodeEngineContext.md)

***

### playgroundContext

`Readonly` **playgroundContext**: `any`

## Methods

### makeFormItemMaterialContext

**makeFormItemMaterialContext**(`formItem`, `options?`): [`FormItemMaterialContext`](/en/auto-docs/form-core/interfaces/FormItemMaterialContext.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `formItem` | [`FormItem`](/en/auto-docs/form-core/classes/FormItem.md) |
| `options?` | `Object` |
| `options.getIndex` | () => `undefined` | `number` |

#### Returns

[`FormItemMaterialContext`](/en/auto-docs/form-core/interfaces/FormItemMaterialContext.md)
