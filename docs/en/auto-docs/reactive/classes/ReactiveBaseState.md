# Class: ReactiveBaseState\<V>

## Type parameters

| Name |
| :------ |
| `V` |

## Hierarchy

* **`ReactiveBaseState`**

  ↳ [`ReactiveState`](/en/auto-docs/reactive/classes/ReactiveState.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/reactive/classes/ReactiveBaseState.md#constructor)

### Accessors

* [value](/en/auto-docs/reactive/classes/ReactiveBaseState.md#value)

### Methods

* [hasDependents](/en/auto-docs/reactive/classes/ReactiveBaseState.md#hasdependents)

## Constructors

### constructor

**new ReactiveBaseState**<`V`>(`initialValue`, `opts?`)

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initialValue` | `V` |
| `opts?` | `Object` |
| `opts.isEqual?` | `IStateEqual` |

## Accessors

### value

`get` **value**(): `V`

#### Returns

`V`

`set` **value**(`newValue`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newValue` | `V` |

#### Returns

`void`

## Methods

### hasDependents

**hasDependents**(): `boolean`

#### Returns

`boolean`
