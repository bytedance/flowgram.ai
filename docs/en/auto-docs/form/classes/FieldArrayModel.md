# Class: FieldArrayModel\<TValue>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | [`FieldValue`](/en/auto-docs/form/types/FieldValue.md) |

## Hierarchy

* [`FieldModel`](/en/auto-docs/form/classes/FieldModel.md)<`TValue`\[]>

  ↳ **`FieldArrayModel`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/form/classes/FieldArrayModel.md#constructor)

### Properties

* [form](/en/auto-docs/form/classes/FieldArrayModel.md#form)
* [id](/en/auto-docs/form/classes/FieldArrayModel.md#id)
* [onAppend](/en/auto-docs/form/classes/FieldArrayModel.md#onappend)
* [onDelete](/en/auto-docs/form/classes/FieldArrayModel.md#ondelete)
* [onValueChange](/en/auto-docs/form/classes/FieldArrayModel.md#onvaluechange)
* [onValueChangeEmitter](/en/auto-docs/form/classes/FieldArrayModel.md#onvaluechangeemitter)
* [originalValidate](/en/auto-docs/form/classes/FieldArrayModel.md#originalvalidate)

### Accessors

* [children](/en/auto-docs/form/classes/FieldArrayModel.md#children)
* [disposed](/en/auto-docs/form/classes/FieldArrayModel.md#disposed)
* [name](/en/auto-docs/form/classes/FieldArrayModel.md#name)
* [parent](/en/auto-docs/form/classes/FieldArrayModel.md#parent)
* [path](/en/auto-docs/form/classes/FieldArrayModel.md#path)
* [reactiveState](/en/auto-docs/form/classes/FieldArrayModel.md#reactivestate)
* [ref](/en/auto-docs/form/classes/FieldArrayModel.md#ref)
* [renderCount](/en/auto-docs/form/classes/FieldArrayModel.md#rendercount)
* [state](/en/auto-docs/form/classes/FieldArrayModel.md#state)
* [value](/en/auto-docs/form/classes/FieldArrayModel.md#value)

### Methods

* [\_splice](/en/auto-docs/form/classes/FieldArrayModel.md#_splice)
* [append](/en/auto-docs/form/classes/FieldArrayModel.md#append)
* [bubbleState](/en/auto-docs/form/classes/FieldArrayModel.md#bubblestate)
* [clear](/en/auto-docs/form/classes/FieldArrayModel.md#clear)
* [clearState](/en/auto-docs/form/classes/FieldArrayModel.md#clearstate)
* [delete](/en/auto-docs/form/classes/FieldArrayModel.md#delete)
* [dispose](/en/auto-docs/form/classes/FieldArrayModel.md#dispose)
* [map](/en/auto-docs/form/classes/FieldArrayModel.md#map)
* [move](/en/auto-docs/form/classes/FieldArrayModel.md#move)
* [onDispose](/en/auto-docs/form/classes/FieldArrayModel.md#ondispose)
* [swap](/en/auto-docs/form/classes/FieldArrayModel.md#swap)
* [updateNameForLeafState](/en/auto-docs/form/classes/FieldArrayModel.md#updatenameforleafstate)
* [updateState](/en/auto-docs/form/classes/FieldArrayModel.md#updatestate)
* [updateValidate](/en/auto-docs/form/classes/FieldArrayModel.md#updatevalidate)
* [validate](/en/auto-docs/form/classes/FieldArrayModel.md#validate)
* [validateSelf](/en/auto-docs/form/classes/FieldArrayModel.md#validateself)

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
| `path` | [`Path`](/en/auto-docs/form/classes/Path.md) |
| `form` | [`FormModel`](/en/auto-docs/form/classes/FormModel.md)<`any`> |

#### Inherited from

[FieldModel](/en/auto-docs/form/classes/FieldModel.md).[constructor](/en/auto-docs/form/classes/FieldModel.md#constructor)

## Properties

### form

`Readonly` **form**: [`FormModel`](/en/auto-docs/form/classes/FormModel.md)<`any`>

#### Inherited from

[FieldModel](/en/auto-docs/form/classes/FieldModel.md).[form](/en/auto-docs/form/classes/FieldModel.md#form)

***

### id

`Readonly` **id**: `string`

#### Inherited from

[FieldModel](/en/auto-docs/form/classes/FieldModel.md).[id](/en/auto-docs/form/classes/FieldModel.md#id)

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

[FieldModel](/en/auto-docs/form/classes/FieldModel.md).[onValueChange](/en/auto-docs/form/classes/FieldModel.md#onvaluechange)

***

### onValueChangeEmitter

`Readonly` **onValueChangeEmitter**: `Emitter`<`OnValueChangePayload`<`TValue`\[]>>

#### Inherited from

[FieldModel](/en/auto-docs/form/classes/FieldModel.md).[onValueChangeEmitter](/en/auto-docs/form/classes/FieldModel.md#onvaluechangeemitter)

***

### originalValidate

`Optional` **originalValidate**: [`Validate`](/en/auto-docs/form/types/Validate.md)

**`Deprecated`**

原用于直接给field 设置validate 逻辑，现将该逻辑放到form.\_options.validate 中设置，该字段暂时弃用

#### Inherited from

[FieldModel](/en/auto-docs/form/classes/FieldModel.md).[originalValidate](/en/auto-docs/form/classes/FieldModel.md#originalvalidate)

## Accessors

### children

`get` **children**(): [`FieldModel`](/en/auto-docs/form/classes/FieldModel.md)<`any`>\[]

#### Returns

[`FieldModel`](/en/auto-docs/form/classes/FieldModel.md)<`any`>\[]

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

`get` **parent**(): `undefined` | [`FieldModel`](/en/auto-docs/form/classes/FieldModel.md)<`any`>

#### Returns

`undefined` | [`FieldModel`](/en/auto-docs/form/classes/FieldModel.md)<`any`>

#### Inherited from

FieldModel.parent

***

### path

`get` **path**(): [`Path`](/en/auto-docs/form/classes/Path.md)

#### Returns

[`Path`](/en/auto-docs/form/classes/Path.md)

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

**append**(`value?`): [`FieldModel`](/en/auto-docs/form/classes/FieldModel.md)<`any`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `TValue` |

#### Returns

[`FieldModel`](/en/auto-docs/form/classes/FieldModel.md)<`any`>

***

### bubbleState

**bubbleState**(): `void`

#### Returns

`void`

#### Inherited from

[FieldModel](/en/auto-docs/form/classes/FieldModel.md).[bubbleState](/en/auto-docs/form/classes/FieldModel.md#bubblestate)

***

### clear

**clear**(): `void`

#### Returns

`void`

#### Inherited from

[FieldModel](/en/auto-docs/form/classes/FieldModel.md).[clear](/en/auto-docs/form/classes/FieldModel.md#clear)

***

### clearState

**clearState**(): `void`

#### Returns

`void`

#### Inherited from

[FieldModel](/en/auto-docs/form/classes/FieldModel.md).[clearState](/en/auto-docs/form/classes/FieldModel.md#clearstate)

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

[FieldModel](/en/auto-docs/form/classes/FieldModel.md).[dispose](/en/auto-docs/form/classes/FieldModel.md#dispose)

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
| `cb` | (`f`: [`FieldModel`](/en/auto-docs/form/classes/FieldModel.md)<`any`>, `index`: `number`, `arr`: [`FieldModel`](/en/auto-docs/form/classes/FieldModel.md)<`any`>\[]) => `T` |

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

[FieldModel](/en/auto-docs/form/classes/FieldModel.md).[onDispose](/en/auto-docs/form/classes/FieldModel.md#ondispose)

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

[FieldModel](/en/auto-docs/form/classes/FieldModel.md).[updateNameForLeafState](/en/auto-docs/form/classes/FieldModel.md#updatenameforleafstate)

***

### updateState

**updateState**(`s`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `Partial`<[`FieldModel`](/en/auto-docs/form/classes/FieldModel.md)<`any`>> |

#### Returns

`void`

#### Inherited from

[FieldModel](/en/auto-docs/form/classes/FieldModel.md).[updateState](/en/auto-docs/form/classes/FieldModel.md#updatestate)

***

### updateValidate

**updateValidate**(`validate`, `from?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `validate` | `undefined` | [`Validate`](/en/auto-docs/form/types/Validate.md) |
| `from?` | `"ui"` |

#### Returns

`void`

**`Deprecated`**

#### Inherited from

[FieldModel](/en/auto-docs/form/classes/FieldModel.md).[updateValidate](/en/auto-docs/form/classes/FieldModel.md#updatevalidate)

***

### validate

**validate**(): `Promise`<`void`>

#### Returns

`Promise`<`void`>

#### Inherited from

[FieldModel](/en/auto-docs/form/classes/FieldModel.md).[validate](/en/auto-docs/form/classes/FieldModel.md#validate)

***

### validateSelf

**validateSelf**(): `Promise`<`void`>

#### Returns

`Promise`<`void`>

#### Inherited from

[FieldModel](/en/auto-docs/form/classes/FieldModel.md).[validateSelf](/en/auto-docs/form/classes/FieldModel.md#validateself)
