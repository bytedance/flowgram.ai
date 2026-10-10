# Class: FormModelV2

## Hierarchy

* `FormModel`

  ↳ **`FormModelV2`**

## Implements

* `Disposable`

## Table of contents

### Constructors

* [constructor](/auto-docs/node/classes/FormModelV2.md#constructor)

### Properties

* [onDispose](/auto-docs/node/classes/FormModelV2.md#ondispose)
* [onFeedbacksChange](/auto-docs/node/classes/FormModelV2.md#onfeedbackschange)
* [onFormValuesChange](/auto-docs/node/classes/FormModelV2.md#onformvalueschange)
* [onInitialized](/auto-docs/node/classes/FormModelV2.md#oninitialized)
* [onValidChange](/auto-docs/node/classes/FormModelV2.md#onvalidchange)
* [onValidate](/auto-docs/node/classes/FormModelV2.md#onvalidate)

### Accessors

* [feedbacks](/auto-docs/node/classes/FormModelV2.md#feedbacks)
* [flowNodeEntity](/auto-docs/node/classes/FormModelV2.md#flownodeentity)
* [formControl](/auto-docs/node/classes/FormModelV2.md#formcontrol)
* [formItemPathMap](/auto-docs/node/classes/FormModelV2.md#formitempathmap)
* [formManager](/auto-docs/node/classes/FormModelV2.md#formmanager)
* [formMeta](/auto-docs/node/classes/FormModelV2.md#formmeta)
* [initialized](/auto-docs/node/classes/FormModelV2.md#initialized)
* [nativeFormModel](/auto-docs/node/classes/FormModelV2.md#nativeformmodel)
* [nodeContext](/auto-docs/node/classes/FormModelV2.md#nodecontext)
* [valid](/auto-docs/node/classes/FormModelV2.md#valid)
* [values](/auto-docs/node/classes/FormModelV2.md#values)

### Methods

* [clearValid](/auto-docs/node/classes/FormModelV2.md#clearvalid)
* [dispose](/auto-docs/node/classes/FormModelV2.md#dispose)
* [getField](/auto-docs/node/classes/FormModelV2.md#getfield)
* [getFormItemByPath](/auto-docs/node/classes/FormModelV2.md#getformitembypath)
* [getFormItemValueByPath](/auto-docs/node/classes/FormModelV2.md#getformitemvaluebypath)
* [getValueIn](/auto-docs/node/classes/FormModelV2.md#getvaluein)
* [getValues](/auto-docs/node/classes/FormModelV2.md#getvalues)
* [init](/auto-docs/node/classes/FormModelV2.md#init)
* [initPlugins](/auto-docs/node/classes/FormModelV2.md#initplugins)
* [onFormValueChangeIn](/auto-docs/node/classes/FormModelV2.md#onformvaluechangein)
* [render](/auto-docs/node/classes/FormModelV2.md#render)
* [setValueIn](/auto-docs/node/classes/FormModelV2.md#setvaluein)
* [toJSON](/auto-docs/node/classes/FormModelV2.md#tojson)
* [updateFormValues](/auto-docs/node/classes/FormModelV2.md#updateformvalues)
* [validate](/auto-docs/node/classes/FormModelV2.md#validate)
* [validateWithFeedbacks](/auto-docs/node/classes/FormModelV2.md#validatewithfeedbacks)

## Constructors

### constructor

**new FormModelV2**(`node`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntity` |

#### Overrides

FormModel.constructor

## Properties

### onDispose

`Readonly` **onDispose**: `Event`<`void`>

***

### onFeedbacksChange

`Readonly` **onFeedbacksChange**: `Event`<`FormFeedback`\[]>

#### Overrides

FormModel.onFeedbacksChange

***

### onFormValuesChange

`Readonly` **onFormValuesChange**: `Event`<`OnFormValuesChangePayload`>

***

### onInitialized

`Readonly` **onInitialized**: `Event`<`FormModel`>

#### Overrides

FormModel.onInitialized

***

### onValidChange

`Readonly` **onValidChange**: `Event`<`FormModelValid`>

#### Overrides

FormModel.onValidChange

***

### onValidate

`Readonly` **onValidate**: `Event`<`FormModel`>

#### Overrides

FormModel.onValidate

## Accessors

### feedbacks

`get` **feedbacks**(): `FormFeedback`\[]

#### Returns

`FormFeedback`\[]

`set` **feedbacks**(`feedbacks`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `feedbacks` | `FormFeedback`\[] |

#### Returns

`void`

***

### flowNodeEntity

`get` **flowNodeEntity**(): `FlowNodeEntity`

#### Returns

`FlowNodeEntity`

#### Overrides

FormModel.flowNodeEntity

***

### formControl

`get` **formControl**(): `undefined` | `FormControl`<`any`>

#### Returns

`undefined` | `FormControl`<`any`>

***

### formItemPathMap

`get` **formItemPathMap**(): `Map`<`string`, `IFormItem`<`any`>>

#### Returns

`Map`<`string`, `IFormItem`<`any`>>

#### Overrides

FormModel.formItemPathMap

***

### formManager

`get` **formManager**(): `FormManager`

#### Returns

`FormManager`

#### Overrides

FormModel.formManager

***

### formMeta

`get` **formMeta**(): [`FormMeta`](/auto-docs/node/interfaces/FormMeta.md)<`any`>

#### Returns

[`FormMeta`](/auto-docs/node/interfaces/FormMeta.md)<`any`>

#### Overrides

FormModel.formMeta

***

### initialized

`get` **initialized**(): `boolean`

#### Returns

`boolean`

#### Overrides

FormModel.initialized

***

### nativeFormModel

`get` **nativeFormModel**(): `undefined` | `FormModel`<`any`>

#### Returns

`undefined` | `FormModel`<`any`>

***

### nodeContext

`get` **nodeContext**(): `NodeFormContext`

#### Returns

`NodeFormContext`

***

### valid

`get` **valid**(): `FormModelValid`

#### Returns

`FormModelValid`

#### Overrides

FormModel.valid

`set` **valid**(`valid`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `valid` | `FormModelValid` |

#### Returns

`void`

#### Overrides

FormModel.valid

***

### values

`get` **values**(): `any`

#### Returns

`any`

## Methods

### clearValid

**clearValid**(): `void`

#### Returns

`void`

#### Overrides

FormModel.clearValid

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

Disposable.dispose

#### Overrides

FormModel.dispose

***

### getField

**getField**<`TValue`, `TField`>(`name`): `undefined` | `TField`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | `any` |
| `TField` | extends `FieldArray$1`<`TValue`> | `Field$1`<`TValue`, `TValue` | `ChangeEvent`<`any`>> = `Field$1`<`TValue`, `TValue` | `ChangeEvent`<`any`>> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` | `TField`

***

### getFormItemByPath

**getFormItemByPath**(`path`): `undefined` | `FormItem`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | glob path |

#### Returns

`undefined` | `FormItem`

**`Deprecated`**

该方法用于兼容 V1 版本 FormModel接口，如果确定是FormModelV2, 请使用FormModel.getValueIn 和 FormModel.setValueIn

#### Overrides

FormModel.getFormItemByPath

***

### getFormItemValueByPath

**getFormItemValueByPath**(`globPath`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `globPath` | `string` |

#### Returns

`any`

**`Deprecated`**

该方法用于兼容 V1 版本 FormModel接口，如果确定是FormModelV2 请使用 FormModel.getValueIn

#### Overrides

FormModel.getFormItemValueByPath

***

### getValueIn

**getValueIn**<`TValue`>(`name`): `undefined` | `TValue`

#### Type parameters

| Name |
| :------ |
| `TValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` | `TValue`

***

### getValues

**getValues**<`T`>(): `undefined` | `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Returns

`undefined` | `T`

***

### init

**init**(`formMeta`, `rawInitialValues?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `formMeta` | [`FormMeta`](/auto-docs/node/interfaces/FormMeta.md)<`any`> |
| `rawInitialValues?` | `any` |

#### Returns

`void`

#### Overrides

FormModel.init

***

### initPlugins

**initPlugins**(`plugins`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `plugins` | [`FormPlugin`](/auto-docs/node/classes/FormPlugin.md)<`any`>\[] |

#### Returns

`void`

***

### onFormValueChangeIn

**onFormValueChangeIn**<`TValue`, `TFormValue`>(`name`, `callback`): `Disposable`

监听表单某个路径下的值变化

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | `any` |
| `TFormValue` | `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | 路径 |
| `callback` | (`payload`: [`onFormValueChangeInPayload`](/auto-docs/node/interfaces/onFormValueChangeInPayload.md)<`TValue`, `TFormValue`>) => `void` | 回调函数 |

#### Returns

`Disposable`

***

### render

**render**(): `Element`

#### Returns

`Element`

#### Overrides

FormModel.render

***

### setValueIn

**setValueIn**(`name`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `any` |

#### Returns

`void`

***

### toJSON

**toJSON**(): `any`

#### Returns

`any`

#### Overrides

FormModel.toJSON

***

### updateFormValues

**updateFormValues**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Overrides

FormModel.updateFormValues

***

### validate

**validate**(): `Promise`<`boolean`>

#### Returns

`Promise`<`boolean`>

#### Overrides

FormModel.validate

***

### validateWithFeedbacks

**validateWithFeedbacks**(): `Promise`<`FormFeedback`\[]>

#### Returns

`Promise`<`FormFeedback`\[]>

#### Overrides

FormModel.validateWithFeedbacks
