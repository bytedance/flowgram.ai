# Class: FormModel

An object that performs a cleanup operation when `.dispose()` is called.

Some examples of how disposables are used:

* An event listener that removes itself when `.dispose()` is called.
* The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.

## Hierarchy

* `FormModel`

  ↳ **`FormModel`**

## Implements

* [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/FormModel.md#constructor)

### Properties

* [onDispose](/en/auto-docs/editor/classes/FormModel.md#ondispose)
* [onFeedbacksChange](/en/auto-docs/editor/classes/FormModel.md#onfeedbackschange)
* [onFormValuesChange](/en/auto-docs/editor/classes/FormModel.md#onformvalueschange)
* [onInitialized](/en/auto-docs/editor/classes/FormModel.md#oninitialized)
* [onValidChange](/en/auto-docs/editor/classes/FormModel.md#onvalidchange)
* [onValidate](/en/auto-docs/editor/classes/FormModel.md#onvalidate)

### Accessors

* [feedbacks](/en/auto-docs/editor/classes/FormModel.md#feedbacks)
* [flowNodeEntity](/en/auto-docs/editor/classes/FormModel.md#flownodeentity)
* [formControl](/en/auto-docs/editor/classes/FormModel.md#formcontrol)
* [formItemPathMap](/en/auto-docs/editor/classes/FormModel.md#formitempathmap)
* [formManager](/en/auto-docs/editor/classes/FormModel.md#formmanager)
* [formMeta](/en/auto-docs/editor/classes/FormModel.md#formmeta)
* [initialized](/en/auto-docs/editor/classes/FormModel.md#initialized)
* [nativeFormModel](/en/auto-docs/editor/classes/FormModel.md#nativeformmodel)
* [nodeContext](/en/auto-docs/editor/classes/FormModel.md#nodecontext)
* [valid](/en/auto-docs/editor/classes/FormModel.md#valid)
* [values](/en/auto-docs/editor/classes/FormModel.md#values)

### Methods

* [clearValid](/en/auto-docs/editor/classes/FormModel.md#clearvalid)
* [dispose](/en/auto-docs/editor/classes/FormModel.md#dispose)
* [getField](/en/auto-docs/editor/classes/FormModel.md#getfield)
* [getFormItemByPath](/en/auto-docs/editor/classes/FormModel.md#getformitembypath)
* [getFormItemValueByPath](/en/auto-docs/editor/classes/FormModel.md#getformitemvaluebypath)
* [getValueIn](/en/auto-docs/editor/classes/FormModel.md#getvaluein)
* [getValues](/en/auto-docs/editor/classes/FormModel.md#getvalues)
* [init](/en/auto-docs/editor/classes/FormModel.md#init)
* [initPlugins](/en/auto-docs/editor/classes/FormModel.md#initplugins)
* [onFormValueChangeIn](/en/auto-docs/editor/classes/FormModel.md#onformvaluechangein)
* [render](/en/auto-docs/editor/classes/FormModel.md#render)
* [setValueIn](/en/auto-docs/editor/classes/FormModel.md#setvaluein)
* [toJSON](/en/auto-docs/editor/classes/FormModel.md#tojson)
* [updateFormValues](/en/auto-docs/editor/classes/FormModel.md#updateformvalues)
* [validate](/en/auto-docs/editor/classes/FormModel.md#validate)
* [validateWithFeedbacks](/en/auto-docs/editor/classes/FormModel.md#validatewithfeedbacks)

## Constructors

### constructor

**new FormModel**(`node`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md) |

#### Overrides

FormModel.constructor

## Properties

### onDispose

`Readonly` **onDispose**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`void`>

***

### onFeedbacksChange

`Readonly` **onFeedbacksChange**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`FormFeedback`\[]>

#### Overrides

FormModel.onFeedbacksChange

***

### onFormValuesChange

`Readonly` **onFormValuesChange**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`OnFormValuesChangePayload`>

***

### onInitialized

`Readonly` **onInitialized**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`FormModel`>

#### Overrides

FormModel.onInitialized

***

### onValidChange

`Readonly` **onValidChange**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`FormModelValid`>

#### Overrides

FormModel.onValidChange

***

### onValidate

`Readonly` **onValidate**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`FormModel`>

#### Overrides

FormModel.onValidate

## Accessors

### feedbacks

`get` **feedbacks**(): `FormFeedback`\[]

#### Returns

`FormFeedback`\[]

`set` **feedbacks**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `FormFeedback`\[] |

#### Returns

`void`

***

### flowNodeEntity

`get` **flowNodeEntity**(): [`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md)

#### Returns

[`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md)

#### Overrides

FormModel.flowNodeEntity

***

### formControl

`get` **formControl**(): `undefined` | [`FormControl`](/en/auto-docs/editor/interfaces/FormControl.md)<`any`>

#### Returns

`undefined` | [`FormControl`](/en/auto-docs/editor/interfaces/FormControl.md)<`any`>

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

`get` **formMeta**(): [`FormMeta`](/en/auto-docs/editor/interfaces/FormMeta.md)<`any`>

#### Returns

[`FormMeta`](/en/auto-docs/editor/interfaces/FormMeta.md)<`any`>

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

`set` **valid**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `FormModelValid` |

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

[Disposable](/en/auto-docs/editor/interfaces/Disposable-1.md).[dispose](/en/auto-docs/editor/interfaces/Disposable-1.md#dispose)

#### Overrides

FormModel.dispose

***

### getField

**getField**<`TValue`, `TField`>(`name`): `undefined` | `TField`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | `any` |
| `TField` | extends [`IFieldArray`](/en/auto-docs/editor/interfaces/IFieldArray.md)<`TValue`> | [`IField`](/en/auto-docs/editor/interfaces/IField.md)<`TValue`, `ChangeEvent`<`any`> | `TValue`> = [`IField`](/en/auto-docs/editor/interfaces/IField.md)<`TValue`, `ChangeEvent`<`any`> | `TValue`> |

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
| `formMeta` | [`FormMeta`](/en/auto-docs/editor/interfaces/FormMeta.md)<`any`> |
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
| `plugins` | [`FormPlugin`](/en/auto-docs/editor/classes/FormPlugin.md)<`any`>\[] |

#### Returns

`void`

***

### onFormValueChangeIn

**onFormValueChangeIn**<`TValue`, `TFormValue`>(`name`, `callback`): [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

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
| `callback` | (`payload`: [`onFormValueChangeInPayload`](/en/auto-docs/editor/interfaces/onFormValueChangeInPayload.md)<`TValue`, `TFormValue`>) => `void` | 回调函数 |

#### Returns

[`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

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
