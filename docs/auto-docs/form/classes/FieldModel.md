# Class: FieldModel\<TValue>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | extends [`FieldValue`](/auto-docs/form/types/FieldValue.md) = [`FieldValue`](/auto-docs/form/types/FieldValue.md) |

## Hierarchy

* **`FieldModel`**

  ↳ [`FieldArrayModel`](/auto-docs/form/classes/FieldArrayModel.md)

## Implements

* `Disposable`

## Table of contents

### Constructors

* [constructor](/auto-docs/form/classes/FieldModel.md#constructor)

### Properties

* [form](/auto-docs/form/classes/FieldModel.md#form)
* [id](/auto-docs/form/classes/FieldModel.md#id)
* [onValueChange](/auto-docs/form/classes/FieldModel.md#onvaluechange)
* [onValueChangeEmitter](/auto-docs/form/classes/FieldModel.md#onvaluechangeemitter)
* [originalValidate](/auto-docs/form/classes/FieldModel.md#originalvalidate)

### Accessors

* [children](/auto-docs/form/classes/FieldModel.md#children)
* [disposed](/auto-docs/form/classes/FieldModel.md#disposed)
* [name](/auto-docs/form/classes/FieldModel.md#name)
* [parent](/auto-docs/form/classes/FieldModel.md#parent)
* [path](/auto-docs/form/classes/FieldModel.md#path)
* [reactiveState](/auto-docs/form/classes/FieldModel.md#reactivestate)
* [ref](/auto-docs/form/classes/FieldModel.md#ref)
* [renderCount](/auto-docs/form/classes/FieldModel.md#rendercount)
* [state](/auto-docs/form/classes/FieldModel.md#state)
* [value](/auto-docs/form/classes/FieldModel.md#value)

### Methods

* [bubbleState](/auto-docs/form/classes/FieldModel.md#bubblestate)
* [clear](/auto-docs/form/classes/FieldModel.md#clear)
* [clearState](/auto-docs/form/classes/FieldModel.md#clearstate)
* [dispose](/auto-docs/form/classes/FieldModel.md#dispose)
* [onDispose](/auto-docs/form/classes/FieldModel.md#ondispose)
* [updateNameForLeafState](/auto-docs/form/classes/FieldModel.md#updatenameforleafstate)
* [updateState](/auto-docs/form/classes/FieldModel.md#updatestate)
* [updateValidate](/auto-docs/form/classes/FieldModel.md#updatevalidate)
* [validate](/auto-docs/form/classes/FieldModel.md#validate)
* [validateSelf](/auto-docs/form/classes/FieldModel.md#validateself)

## Constructors

### constructor

**new FieldModel**<`TValue`>(`path`, `form`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | extends `unknown` = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | [`Path`](/auto-docs/form/classes/Path.md) |
| `form` | [`FormModel`](/auto-docs/form/classes/FormModel.md)<`any`> |

## Properties

### form

`Readonly` **form**: [`FormModel`](/auto-docs/form/classes/FormModel.md)<`any`>

***

### id

`Readonly` **id**: `string`

***

### onValueChange

`Readonly` **onValueChange**: `Event`<`OnValueChangePayload`<`TValue`>>

***

### onValueChangeEmitter

`Readonly` **onValueChangeEmitter**: `Emitter`<`OnValueChangePayload`<`TValue`>>

***

### originalValidate

`Optional` **originalValidate**: [`Validate`](/auto-docs/form/types/Validate.md)

**`Deprecated`**

原用于直接给field 设置validate 逻辑，现将该逻辑放到form.\_options.validate 中设置，该字段暂时弃用

## Accessors

### children

`get` **children**(): [`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`>\[]

#### Returns

[`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`>\[]

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

***

### name

`get` **name**(): `string`

#### Returns

`string`

`set` **name**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

***

### parent

`get` **parent**(): `undefined` | [`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`>

#### Returns

`undefined` | [`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`>

***

### path

`get` **path**(): [`Path`](/auto-docs/form/classes/Path.md)

#### Returns

[`Path`](/auto-docs/form/classes/Path.md)

***

### reactiveState

`get` **reactiveState**(): `ReactiveState`<`FieldModelState`>

#### Returns

`ReactiveState`<`FieldModelState`>

***

### ref

`get` **ref**(): `undefined` | `FieldElement`

#### Returns

`undefined` | `FieldElement`

`set` **ref**(`ref`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | `undefined` | `FieldElement` |

#### Returns

`void`

***

### renderCount

`get` **renderCount**(): `number`

#### Returns

`number`

`set` **renderCount**(`n`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`void`

***

### state

`get` **state**(): `FieldModelState`

#### Returns

`FieldModelState`

***

### value

`get` **value**(): `undefined` | `TValue`

#### Returns

`undefined` | `TValue`

`set` **value**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `undefined` | `TValue` |

#### Returns

`void`

## Methods

### bubbleState

**bubbleState**(): `void`

#### Returns

`void`

***

### clear

**clear**(): `void`

#### Returns

`void`

***

### clearState

**clearState**(): `void`

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

### onDispose

**onDispose**(`fn`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | () => `void` |

#### Returns

`void`

***

### updateNameForLeafState

**updateNameForLeafState**(`newName`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newName` | `string` |

#### Returns

`void`

***

### updateState

**updateState**(`s`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `Partial`<[`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`>> |

#### Returns

`void`

***

### updateValidate

**updateValidate**(`validate`, `from?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `validate` | `undefined` | [`Validate`](/auto-docs/form/types/Validate.md) |
| `from?` | `"ui"` |

#### Returns

`void`

**`Deprecated`**

***

### validate

**validate**(): `Promise`<`void`>

#### Returns

`Promise`<`void`>

***

### validateSelf

**validateSelf**(): `Promise`<`void`>

#### Returns

`Promise`<`void`>
