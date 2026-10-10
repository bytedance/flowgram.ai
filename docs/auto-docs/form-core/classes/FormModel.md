# Class: FormModel

## Table of contents

### Constructors

* [constructor](/auto-docs/form-core/classes/FormModel.md#constructor)

### Properties

* [onFeedbacksChange](/auto-docs/form-core/classes/FormModel.md#onfeedbackschange)
* [onInitialized](/auto-docs/form-core/classes/FormModel.md#oninitialized)
* [onValidChange](/auto-docs/form-core/classes/FormModel.md#onvalidchange)
* [onValidate](/auto-docs/form-core/classes/FormModel.md#onvalidate)

### Accessors

* [flowNodeEntity](/auto-docs/form-core/classes/FormModel.md#flownodeentity)
* [formItemPathMap](/auto-docs/form-core/classes/FormModel.md#formitempathmap)
* [formManager](/auto-docs/form-core/classes/FormModel.md#formmanager)
* [formMeta](/auto-docs/form-core/classes/FormModel.md#formmeta)
* [initialized](/auto-docs/form-core/classes/FormModel.md#initialized)
* [valid](/auto-docs/form-core/classes/FormModel.md#valid)

### Methods

* [clearValid](/auto-docs/form-core/classes/FormModel.md#clearvalid)
* [dispose](/auto-docs/form-core/classes/FormModel.md#dispose)
* [getFormItemByPath](/auto-docs/form-core/classes/FormModel.md#getformitembypath)
* [getFormItemValueByPath](/auto-docs/form-core/classes/FormModel.md#getformitemvaluebypath)
* [init](/auto-docs/form-core/classes/FormModel.md#init)
* [render](/auto-docs/form-core/classes/FormModel.md#render)
* [toJSON](/auto-docs/form-core/classes/FormModel.md#tojson)
* [updateFormValues](/auto-docs/form-core/classes/FormModel.md#updateformvalues)
* [validate](/auto-docs/form-core/classes/FormModel.md#validate)
* [validateWithFeedbacks](/auto-docs/form-core/classes/FormModel.md#validatewithfeedbacks)

## Constructors

### constructor

**new FormModel**()

## Properties

### onFeedbacksChange

`Readonly` **onFeedbacksChange**: `Event`<[`FormFeedback`](/auto-docs/form-core/interfaces/FormFeedback.md)\[]>

***

### onInitialized

`Readonly` **onInitialized**: `Event`<[`FormModel`](/auto-docs/form-core/classes/FormModel.md)>

***

### onValidChange

`Readonly` **onValidChange**: `Event`<[`FormModelValid`](/auto-docs/form-core/types/FormModelValid.md)>

***

### onValidate

`Readonly` **onValidate**: `Event`<[`FormModel`](/auto-docs/form-core/classes/FormModel.md)>

## Accessors

### flowNodeEntity

`Abstract` `get` **flowNodeEntity**(): `FlowNodeEntity`

#### Returns

`FlowNodeEntity`

**`Deprecated`**

use `formModel.node` instead in FormModelV2

***

### formItemPathMap

`Abstract` `get` **formItemPathMap**(): `Map`<`string`, [`IFormItem`](/auto-docs/form-core/interfaces/IFormItem.md)<`any`>>

#### Returns

`Map`<`string`, [`IFormItem`](/auto-docs/form-core/interfaces/IFormItem.md)<`any`>>

**`Deprecated`**

use `formModel.getFieldIn` instead in FormModelV2 to get the model of a form field
do not use this in FormModelV2 since  it only return an empty Map.

***

### formManager

`Abstract` `get` **formManager**(): [`FormManager`](/auto-docs/form-core/classes/FormManager.md)

#### Returns

[`FormManager`](/auto-docs/form-core/classes/FormManager.md)

**`Deprecated`**

***

### formMeta

`Abstract` `get` **formMeta**(): `any`

#### Returns

`any`

***

### initialized

`Abstract` `get` **initialized**(): `boolean`

#### Returns

`boolean`

***

### valid

`Abstract` `get` **valid**(): [`FormModelValid`](/auto-docs/form-core/types/FormModelValid.md)

#### Returns

[`FormModelValid`](/auto-docs/form-core/types/FormModelValid.md)

## Methods

### clearValid

`Abstract` **clearValid**(): `void`

#### Returns

`void`

**`Deprecated`**

***

### dispose

`Abstract` **dispose**(): `void`

#### Returns

`void`

***

### getFormItemByPath

`Abstract` **getFormItemByPath**(`path`): `undefined` | [`FormItem`](/auto-docs/form-core/classes/FormItem.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`undefined` | [`FormItem`](/auto-docs/form-core/classes/FormItem.md)

**`Deprecated`**

use `formModel.getField` instead in FormModelV2

***

### getFormItemValueByPath

`Abstract` **getFormItemValueByPath**<`T`>(`path`): `any`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`any`

**`Deprecated`**

use `formModel.getFieldValue` instead in FormModelV2 to get the model of a form field by path

***

### init

`Abstract` **init**(`formMetaOrFormMetaGenerator`, `initialValue?`): `MaybePromise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `formMetaOrFormMetaGenerator` | `any` |
| `initialValue?` | `any` |

#### Returns

`MaybePromise`<`void`>

***

### render

`Abstract` **render**(): `any`

#### Returns

`any`

***

### toJSON

`Abstract` **toJSON**(): `any`

#### Returns

`any`

***

### updateFormValues

`Abstract` **updateFormValues**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

***

### validate

`Abstract` **validate**(): `Promise`<`boolean`>

#### Returns

`Promise`<`boolean`>

***

### validateWithFeedbacks

`Abstract` **validateWithFeedbacks**(): `Promise`<[`FormFeedback`](/auto-docs/form-core/interfaces/FormFeedback.md)\[]>

#### Returns

`Promise`<[`FormFeedback`](/auto-docs/form-core/interfaces/FormFeedback.md)\[]>
