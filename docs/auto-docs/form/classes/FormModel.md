# Class: FormModel\<TValues>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TValues` | `any` |

## Implements

* `Disposable`

## Table of contents

### Constructors

* [constructor](/auto-docs/form/classes/FormModel.md#constructor)

### Properties

* [onFieldModelCreate](/auto-docs/form/classes/FormModel.md#onfieldmodelcreate)
* [onFormValuesChange](/auto-docs/form/classes/FormModel.md#onformvalueschange)
* [onFormValuesChangeEmitter](/auto-docs/form/classes/FormModel.md#onformvalueschangeemitter)
* [onFormValuesInit](/auto-docs/form/classes/FormModel.md#onformvaluesinit)
* [onFormValuesInitEmitter](/auto-docs/form/classes/FormModel.md#onformvaluesinitemitter)
* [onFormValuesUpdated](/auto-docs/form/classes/FormModel.md#onformvaluesupdated)
* [onFormValuesUpdatedEmitter](/auto-docs/form/classes/FormModel.md#onformvaluesupdatedemitter)
* [onValidate](/auto-docs/form/classes/FormModel.md#onvalidate)
* [onValidateEmitter](/auto-docs/form/classes/FormModel.md#onvalidateemitter)
* [store](/auto-docs/form/classes/FormModel.md#store)
* [validateDisabled](/auto-docs/form/classes/FormModel.md#validatedisabled)

### Accessors

* [context](/auto-docs/form/classes/FormModel.md#context)
* [fieldMap](/auto-docs/form/classes/FormModel.md#fieldmap)
* [fields](/auto-docs/form/classes/FormModel.md#fields)
* [initialValues](/auto-docs/form/classes/FormModel.md#initialvalues)
* [initialized](/auto-docs/form/classes/FormModel.md#initialized)
* [reactiveState](/auto-docs/form/classes/FormModel.md#reactivestate)
* [state](/auto-docs/form/classes/FormModel.md#state)
* [validationTrigger](/auto-docs/form/classes/FormModel.md#validationtrigger)
* [values](/auto-docs/form/classes/FormModel.md#values)

### Methods

* [alignStateWithFieldMap](/auto-docs/form/classes/FormModel.md#alignstatewithfieldmap)
* [clearValueIn](/auto-docs/form/classes/FormModel.md#clearvaluein)
* [createField](/auto-docs/form/classes/FormModel.md#createfield)
* [createFieldArray](/auto-docs/form/classes/FormModel.md#createfieldarray)
* [deleteField](/auto-docs/form/classes/FormModel.md#deletefield)
* [dispose](/auto-docs/form/classes/FormModel.md#dispose)
* [disposeField](/auto-docs/form/classes/FormModel.md#disposefield)
* [fireOnFormValuesChange](/auto-docs/form/classes/FormModel.md#fireonformvalueschange)
* [fireOnFormValuesInit](/auto-docs/form/classes/FormModel.md#fireonformvaluesinit)
* [getField](/auto-docs/form/classes/FormModel.md#getfield)
* [getValueIn](/auto-docs/form/classes/FormModel.md#getvaluein)
* [init](/auto-docs/form/classes/FormModel.md#init)
* [setInitValueIn](/auto-docs/form/classes/FormModel.md#setinitvaluein)
* [setValueIn](/auto-docs/form/classes/FormModel.md#setvaluein)
* [updateState](/auto-docs/form/classes/FormModel.md#updatestate)
* [validate](/auto-docs/form/classes/FormModel.md#validate)
* [validateIn](/auto-docs/form/classes/FormModel.md#validatein)

## Constructors

### constructor

**new FormModel**<`TValues`>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TValues` | `any` |

## Properties

### onFieldModelCreate

`Readonly` **onFieldModelCreate**: `Event`<[`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`>>

***

### onFormValuesChange

`Readonly` **onFormValuesChange**: `Event`<`OnFormValuesChangePayload`>

***

### onFormValuesChangeEmitter

`Readonly` **onFormValuesChangeEmitter**: `Emitter`<`OnFormValuesChangePayload`>

***

### onFormValuesInit

`Readonly` **onFormValuesInit**: `Event`<`OnFormValuesInitPayload`>

***

### onFormValuesInitEmitter

`Readonly` **onFormValuesInitEmitter**: `Emitter`<`OnFormValuesInitPayload`>

***

### onFormValuesUpdated

`Readonly` **onFormValuesUpdated**: `Event`<`OnFormValuesUpdatedPayload`>

***

### onFormValuesUpdatedEmitter

`Readonly` **onFormValuesUpdatedEmitter**: `Emitter`<`OnFormValuesUpdatedPayload`>

***

### onValidate

`Readonly` **onValidate**: `Event`<`FormModelState`>

***

### onValidateEmitter

`Readonly` **onValidateEmitter**: `Emitter`<`FormModelState`>

***

### store

`Readonly` **store**: `Store`<`any`>

***

### validateDisabled

**validateDisabled**: `boolean` = `false`

## Accessors

### context

`get` **context**(): `any`

#### Returns

`any`

***

### fieldMap

`set` **fieldMap**(`map`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `map` | `Map`<`string`, [`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`>> |

#### Returns

`void`

***

### fields

`get` **fields**(): [`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`>\[]

#### Returns

[`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`>\[]

***

### initialValues

`get` **initialValues**(): `any`

#### Returns

`any`

***

### initialized

`get` **initialized**(): `boolean`

#### Returns

`boolean`

***

### reactiveState

`get` **reactiveState**(): `ReactiveState`<`FormModelState`>

#### Returns

`ReactiveState`<`FormModelState`>

***

### state

`get` **state**(): `FormModelState`

#### Returns

`FormModelState`

***

### validationTrigger

`get` **validationTrigger**(): `undefined` | [`ValidateTrigger`](/auto-docs/form/enums/ValidateTrigger.md)

#### Returns

`undefined` | [`ValidateTrigger`](/auto-docs/form/enums/ValidateTrigger.md)

***

### values

`get` **values**(): `any`

#### Returns

`any`

`set` **values**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `any` |

#### Returns

`void`

## Methods

### alignStateWithFieldMap

**alignStateWithFieldMap**(): `void`

#### Returns

`void`

***

### clearValueIn

**clearValueIn**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

***

### createField

**createField**<`TValue`>(`name`, `isArray?`): [`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`TValue`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `isArray?` | `boolean` |

#### Returns

[`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`TValue`>

***

### createFieldArray

**createFieldArray**<`TValue`>(`name`, `value?`): [`FieldArrayModel`](/auto-docs/form/classes/FieldArrayModel.md)<`TValue`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value?` | `TValue`\[] |

#### Returns

[`FieldArrayModel`](/auto-docs/form/classes/FieldArrayModel.md)<`TValue`>

***

### deleteField

**deleteField**(`name`): `void`

删除field, 会删除值和 Field 模型， 以及对应的子模型

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

Disposable.dispose

***

### disposeField

**disposeField**(`name`): `void`

销毁Field 模型和子模型,但不会删除field的值

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

***

### fireOnFormValuesChange

**fireOnFormValuesChange**(`payload`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `OnFormValuesChangePayload` |

#### Returns

`void`

***

### fireOnFormValuesInit

**fireOnFormValuesInit**(`payload`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `OnFormValuesInitPayload` |

#### Returns

`void`

***

### getField

**getField**<`TFieldModel`>(`name`): `undefined` | `TFieldModel`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TFieldModel` | extends [`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`> | [`FieldArrayModel`](/auto-docs/form/classes/FieldArrayModel.md)<`any`> = [`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` | `TFieldModel`

***

### getValueIn

**getValueIn**<`TValue`>(`name`): `TValue`

#### Type parameters

| Name |
| :------ |
| `TValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`TValue`

***

### init

**init**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `FormOptions`<`TValues`> |

#### Returns

`void`

***

### setInitValueIn

**setInitValueIn**<`TValue`>(`name`, `value`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `TValue` |

#### Returns

`void`

***

### setValueIn

**setValueIn**<`TValue`>(`name`, `value`): `void`

#### Type parameters

| Name |
| :------ |
| `TValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `TValue` |

#### Returns

`void`

***

### updateState

**updateState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `Partial`<[`FormState`](/auto-docs/form/interfaces/FormState.md)> |

#### Returns

`void`

***

### validate

**validate**(): `Promise`<[`FormValidateReturn`](/auto-docs/form/types/FormValidateReturn.md)>

#### Returns

`Promise`<[`FormValidateReturn`](/auto-docs/form/types/FormValidateReturn.md)>

***

### validateIn

**validateIn**(`name`): `Promise`<`undefined` | (`undefined` | `string` | `FormErrorOptions` | `FormWarningOptions`)\[]>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`undefined` | (`undefined` | `string` | `FormErrorOptions` | `FormWarningOptions`)\[]>
