# Class: ReactiveState\<V>

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends `Record`<`string`, `any`> |

## Hierarchy

* [`ReactiveBaseState`](/auto-docs/free-layout-editor/classes/ReactiveBaseState.md)<`V`>

  ↳ **`ReactiveState`**

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/ReactiveState.md#constructor)

### Accessors

* [readonlyValue](/auto-docs/free-layout-editor/classes/ReactiveState.md#readonlyvalue)
* [value](/auto-docs/free-layout-editor/classes/ReactiveState.md#value)

### Methods

* [get](/auto-docs/free-layout-editor/classes/ReactiveState.md#get)
* [hasDependents](/auto-docs/free-layout-editor/classes/ReactiveState.md#hasdependents)
* [keys](/auto-docs/free-layout-editor/classes/ReactiveState.md#keys)
* [set](/auto-docs/free-layout-editor/classes/ReactiveState.md#set)

## Constructors

### constructor

**new ReactiveState**<`V`>(`initialValue`, `opts?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends `Record`<`string`, `any`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initialValue` | `V` |
| `opts?` | `Object` |
| `opts.isEqual?` | `IStateEqual` |

#### Inherited from

[ReactiveBaseState](/auto-docs/free-layout-editor/classes/ReactiveBaseState.md).[constructor](/auto-docs/free-layout-editor/classes/ReactiveBaseState.md#constructor)

## Accessors

### readonlyValue

`get` **readonlyValue**(): `Readonly`<`V`>

#### Returns

`Readonly`<`V`>

***

### value

`get` **value**(): `V`

#### Returns

`V`

#### Overrides

ReactiveBaseState.value

`set` **value**(`newValue`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newValue` | `V` |

#### Returns

`void`

#### Overrides

ReactiveBaseState.value

## Methods

### get

**get**<`K`>(`key`): `V`\[`K`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |

#### Returns

`V`\[`K`]

***

### hasDependents

**hasDependents**(): `boolean`

#### Returns

`boolean`

#### Overrides

[ReactiveBaseState](/auto-docs/free-layout-editor/classes/ReactiveBaseState.md).[hasDependents](/auto-docs/free-layout-editor/classes/ReactiveBaseState.md#hasdependents)

***

### keys

**keys**(): `string`\[]

#### Returns

`string`\[]

***

### set

**set**<`K`>(`key`, `value`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |
| `value` | `V`\[`K`] |

#### Returns

`boolean`
