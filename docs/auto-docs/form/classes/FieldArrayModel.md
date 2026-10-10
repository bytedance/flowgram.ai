# Class: FieldArrayModel\<TValue>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | [`FieldValue`](/auto-docs/form/types/FieldValue.md) |

## Hierarchy

* [`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`TValue`\[]>

  ↳ **`FieldArrayModel`**

## Table of contents

### Constructors

* [constructor](/auto-docs/form/classes/FieldArrayModel.md#constructor)

### Properties

* [form](/auto-docs/form/classes/FieldArrayModel.md#form)
* [id](/auto-docs/form/classes/FieldArrayModel.md#id)
* [onAppend](/auto-docs/form/classes/FieldArrayModel.md#onappend)
* [onDelete](/auto-docs/form/classes/FieldArrayModel.md#ondelete)
* [onValueChange](/auto-docs/form/classes/FieldArrayModel.md#onvaluechange)
* [onValueChangeEmitter](/auto-docs/form/classes/FieldArrayModel.md#onvaluechangeemitter)
* [originalValidate](/auto-docs/form/classes/FieldArrayModel.md#originalvalidate)

### Accessors

* [children](/auto-docs/form/classes/FieldArrayModel.md#children)
* [disposed](/auto-docs/form/classes/FieldArrayModel.md#disposed)
* [name](/auto-docs/form/classes/FieldArrayModel.md#name)
* [parent](/auto-docs/form/classes/FieldArrayModel.md#parent)
* [path](/auto-docs/form/classes/FieldArrayModel.md#path)
* [reactiveState](/auto-docs/form/classes/FieldArrayModel.md#reactivestate)
* [ref](/auto-docs/form/classes/FieldArrayModel.md#ref)
* [renderCount](/auto-docs/form/classes/FieldArrayModel.md#rendercount)
* [state](/auto-docs/form/classes/FieldArrayModel.md#state)
* [value](/auto-docs/form/classes/FieldArrayModel.md#value)

### Methods

* [\_splice](/auto-docs/form/classes/FieldArrayModel.md#_splice)
* [append](/auto-docs/form/classes/FieldArrayModel.md#append)
* [bubbleState](/auto-docs/form/classes/FieldArrayModel.md#bubblestate)
* [clear](/auto-docs/form/classes/FieldArrayModel.md#clear)
* [clearState](/auto-docs/form/classes/FieldArrayModel.md#clearstate)
* [delete](/auto-docs/form/classes/FieldArrayModel.md#delete)
* [dispose](/auto-docs/form/classes/FieldArrayModel.md#dispose)
* [map](/auto-docs/form/classes/FieldArrayModel.md#map)
* [move](/auto-docs/form/classes/FieldArrayModel.md#move)
* [onDispose](/auto-docs/form/classes/FieldArrayModel.md#ondispose)
* [swap](/auto-docs/form/classes/FieldArrayModel.md#swap)
* [updateNameForLeafState](/auto-docs/form/classes/FieldArrayModel.md#updatenameforleafstate)
* [updateState](/auto-docs/form/classes/FieldArrayModel.md#updatestate)
* [updateValidate](/auto-docs/form/classes/FieldArrayModel.md#updatevalidate)
* [validate](/auto-docs/form/classes/FieldArrayModel.md#validate)
* [validateSelf](/auto-docs/form/classes/FieldArrayModel.md#validateself)

## Constructors

### constructor

**new FieldArrayModel**<`TValue`>(`path`, `form`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | [`Path`](/auto-docs/form/classes/Path.md) |
| `form` | [`FormModel`](/auto-docs/form/classes/FormModel.md)<`any`> |

#### Inherited from

[FieldModel](/auto-docs/form/classes/FieldModel.md).[constructor](/auto-docs/form/classes/FieldModel.md#constructor)

## Properties

### form

`Readonly` **form**: [`FormModel`](/auto-docs/form/classes/FormModel.md)<`any`>

#### Inherited from

[FieldModel](/auto-docs/form/classes/FieldModel.md).[form](/auto-docs/form/classes/FieldModel.md#form)

***

### id

`Readonly` **id**: `string`

#### Inherited from

[FieldModel](/auto-docs/form/classes/FieldModel.md).[id](/auto-docs/form/classes/FieldModel.md#id)

***

### onAppend

`Readonly` **onAppend**: `Event`<{ `arrayValue`: `TValue`\[] ; `index`: `number` ; `value`: `undefined` | `TValue`  }>

***

### onDelete

`Readonly` **onDelete**: `Event`<{ `arrayValue`: `undefined` | `TValue`\[] ; `index`: `number`  }>

***

### onValueChange

`Readonly` **onValueChange**: `Event`<`OnValueChangePayload`<`TValue`\[]>>

#### Inherited from

[FieldModel](/auto-docs/form/classes/FieldModel.md).[onValueChange](/auto-docs/form/classes/FieldModel.md#onvaluechange)

***

### onValueChangeEmitter

`Readonly` **onValueChangeEmitter**: `Emitter`<`OnValueChangePayload`<`TValue`\[]>>

#### Inherited from

[FieldModel](/auto-docs/form/classes/FieldModel.md).[onValueChangeEmitter](/auto-docs/form/classes/FieldModel.md#onvaluechangeemitter)

***

### originalValidate

`Optional` **originalValidate**: [`Validate`](/auto-docs/form/types/Validate.md)

**`Deprecated`**

原用于直接给field 设置validate 逻辑，现将该逻辑放到form.\_options.validate 中设置，该字段暂时弃用

#### Inherited from

[FieldModel](/auto-docs/form/classes/FieldModel.md).[originalValidate](/auto-docs/form/classes/FieldModel.md#originalvalidate)

## Accessors

### children

`get` **children**(): [`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`>\[]

#### Returns

[`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`>\[]

#### Overrides

FieldModel.children

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

FieldModel.disposed

***

### name

`get` **name**(): `string`

#### Returns

`string`

#### Inherited from

FieldModel.name

`set` **name**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

#### Inherited from

FieldModel.name

***

### parent

`get` **parent**(): `undefined` | [`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`>

#### Returns

`undefined` | [`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`>

#### Inherited from

FieldModel.parent

***

### path

`get` **path**(): [`Path`](/auto-docs/form/classes/Path.md)

#### Returns

[`Path`](/auto-docs/form/classes/Path.md)

#### Inherited from

FieldModel.path

***

### reactiveState

`get` **reactiveState**(): `ReactiveState`<`FieldModelState`>

#### Returns

`ReactiveState`<`FieldModelState`>

#### Inherited from

FieldModel.reactiveState

***

### ref

`get` **ref**(): `undefined` | `FieldElement`

#### Returns

`undefined` | `FieldElement`

#### Inherited from

FieldModel.ref

`set` **ref**(`ref`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | `undefined` | `FieldElement` |

#### Returns

`void`

#### Inherited from

FieldModel.ref

***

### renderCount

`get` **renderCount**(): `number`

#### Returns

`number`

#### Inherited from

FieldModel.renderCount

`set` **renderCount**(`n`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`void`

#### Inherited from

FieldModel.renderCount

***

### state

`get` **state**(): `FieldModelState`

#### Returns

`FieldModelState`

#### Inherited from

FieldModel.state

***

### value

`get` **value**(): `undefined` | `TValue`

#### Returns

`undefined` | `TValue`

#### Inherited from

FieldModel.value

`set` **value**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `undefined` | `TValue` |

#### Returns

`void`

#### Inherited from

FieldModel.value

## Methods

### \_splice

**\_splice**(`start`, `deleteCount?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `start` | `number` | `undefined` |
| `deleteCount` | `number` | `1` |

#### Returns

`void`

***

### append

**append**(`value?`): [`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `TValue` |

#### Returns

[`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`>

***

### bubbleState

**bubbleState**(): `void`

#### Returns

`void`

#### Inherited from

[FieldModel](/auto-docs/form/classes/FieldModel.md).[bubbleState](/auto-docs/form/classes/FieldModel.md#bubblestate)

***

### clear

**clear**(): `void`

#### Returns

`void`

#### Inherited from

[FieldModel](/auto-docs/form/classes/FieldModel.md).[clear](/auto-docs/form/classes/FieldModel.md#clear)

***

### clearState

**clearState**(): `void`

#### Returns

`void`

#### Inherited from

[FieldModel](/auto-docs/form/classes/FieldModel.md).[clearState](/auto-docs/form/classes/FieldModel.md#clearstate)

***

### delete

**delete**(`index`): `void`

Delete the element in given index and delete the corresponding FieldModel as well

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[FieldModel](/auto-docs/form/classes/FieldModel.md).[dispose](/auto-docs/form/classes/FieldModel.md#dispose)

***

### map

**map**<`T`>(`cb`): `T`\[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (`f`: [`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`>, `index`: `number`, `arr`: [`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`>\[]) => `T` |

#### Returns

`T`\[]

***

### move

**move**(`from`, `to`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `number` |
| `to` | `number` |

#### Returns

`void`

***

### onDispose

**onDispose**(`fn`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | () => `void` |

#### Returns

`void`

#### Inherited from

[FieldModel](/auto-docs/form/classes/FieldModel.md).[onDispose](/auto-docs/form/classes/FieldModel.md#ondispose)

***

### swap

**swap**(`from`, `to`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `number` |
| `to` | `number` |

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

#### Inherited from

[FieldModel](/auto-docs/form/classes/FieldModel.md).[updateNameForLeafState](/auto-docs/form/classes/FieldModel.md#updatenameforleafstate)

***

### updateState

**updateState**(`s`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `Partial`<[`FieldModel`](/auto-docs/form/classes/FieldModel.md)<`any`>> |

#### Returns

`void`

#### Inherited from

[FieldModel](/auto-docs/form/classes/FieldModel.md).[updateState](/auto-docs/form/classes/FieldModel.md#updatestate)

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

#### Inherited from

[FieldModel](/auto-docs/form/classes/FieldModel.md).[updateValidate](/auto-docs/form/classes/FieldModel.md#updatevalidate)

***

### validate

**validate**(): `Promise`<`void`>

#### Returns

`Promise`<`void`>

#### Inherited from

[FieldModel](/auto-docs/form/classes/FieldModel.md).[validate](/auto-docs/form/classes/FieldModel.md#validate)

***

### validateSelf

**validateSelf**(): `Promise`<`void`>

#### Returns

`Promise`<`void`>

#### Inherited from

[FieldModel](/auto-docs/form/classes/FieldModel.md).[validateSelf](/auto-docs/form/classes/FieldModel.md#validateself)
