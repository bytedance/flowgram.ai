# Class: FormItem

## Table of contents

### Properties

* [formModel](/auto-docs/form-core/classes/FormItem.md#formmodel)
* [meta](/auto-docs/form-core/classes/FormItem.md#meta)
* [onDispose](/auto-docs/form-core/classes/FormItem.md#ondispose)
* [onInit](/auto-docs/form-core/classes/FormItem.md#oninit)
* [onInitEventEmitter](/auto-docs/form-core/classes/FormItem.md#oniniteventemitter)
* [path](/auto-docs/form-core/classes/FormItem.md#path)

### Accessors

* [domRef](/auto-docs/form-core/classes/FormItem.md#domref)
* [value](/auto-docs/form-core/classes/FormItem.md#value)

### Methods

* [dispose](/auto-docs/form-core/classes/FormItem.md#dispose)
* [validate](/auto-docs/form-core/classes/FormItem.md#validate)

## Properties

### formModel

`Readonly` **formModel**: [`FormModel`](/auto-docs/form-core/classes/FormModel.md)

***

### meta

`Readonly` **meta**: [`IFormItemMeta`](/auto-docs/form-core/interfaces/IFormItemMeta.md)

***

### onDispose

`Readonly` **onDispose**: `Event`<`void`>

***

### onInit

`Readonly` **onInit**: `Event`<[`FormItem`](/auto-docs/form-core/classes/FormItem.md)>

***

### onInitEventEmitter

`Readonly` **onInitEventEmitter**: `Emitter`<[`FormItem`](/auto-docs/form-core/classes/FormItem.md)>

***

### path

`Readonly` **path**: `string`

## Accessors

### domRef

`get` **domRef**(): [`FormItemDomRef`](/auto-docs/form-core/interfaces/FormItemDomRef.md)

#### Returns

[`FormItemDomRef`](/auto-docs/form-core/interfaces/FormItemDomRef.md)

`set` **domRef**(`domRef`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `domRef` | [`FormItemDomRef`](/auto-docs/form-core/interfaces/FormItemDomRef.md) |

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
