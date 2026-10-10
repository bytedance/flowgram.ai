# Class: FormItem

## Table of contents

### Properties

* [formModel](/en/auto-docs/form-core/classes/FormItem.md#formmodel)
* [meta](/en/auto-docs/form-core/classes/FormItem.md#meta)
* [onDispose](/en/auto-docs/form-core/classes/FormItem.md#ondispose)
* [onInit](/en/auto-docs/form-core/classes/FormItem.md#oninit)
* [onInitEventEmitter](/en/auto-docs/form-core/classes/FormItem.md#oniniteventemitter)
* [path](/en/auto-docs/form-core/classes/FormItem.md#path)

### Accessors

* [domRef](/en/auto-docs/form-core/classes/FormItem.md#domref)
* [value](/en/auto-docs/form-core/classes/FormItem.md#value)

### Methods

* [dispose](/en/auto-docs/form-core/classes/FormItem.md#dispose)
* [validate](/en/auto-docs/form-core/classes/FormItem.md#validate)

## Properties

### formModel

`Readonly` **formModel**: [`FormModel`](/en/auto-docs/form-core/classes/FormModel.md)

***

### meta

`Readonly` **meta**: [`IFormItemMeta`](/en/auto-docs/form-core/interfaces/IFormItemMeta.md)

***

### onDispose

`Readonly` **onDispose**: `Event`<`void`>

***

### onInit

`Readonly` **onInit**: `Event`<[`FormItem`](/en/auto-docs/form-core/classes/FormItem.md)>

***

### onInitEventEmitter

`Readonly` **onInitEventEmitter**: `Emitter`<[`FormItem`](/en/auto-docs/form-core/classes/FormItem.md)>

***

### path

`Readonly` **path**: `string`

## Accessors

### domRef

`get` **domRef**(): [`FormItemDomRef`](/en/auto-docs/form-core/interfaces/FormItemDomRef.md)

#### Returns

[`FormItemDomRef`](/en/auto-docs/form-core/interfaces/FormItemDomRef.md)

`set` **domRef**(`domRef`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `domRef` | [`FormItemDomRef`](/en/auto-docs/form-core/interfaces/FormItemDomRef.md) |

#### Returns

`void`

***

### value

`Abstract` `get` **value**(): `any`

#### Returns

`any`

`Abstract` `set` **value**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### validate

`Abstract` **validate**(): `void`

#### Returns

`void`
