# Class: PromiseDeferred\<T>

Simple implementation of the deferred pattern.
An object that exposes a promise and functions to resolve and reject it.

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

* [constructor](/auto-docs/utils/classes/PromiseDeferred.md#constructor)

### Properties

* [promise](/auto-docs/utils/classes/PromiseDeferred.md#promise)
* [reject](/auto-docs/utils/classes/PromiseDeferred.md#reject)
* [resolve](/auto-docs/utils/classes/PromiseDeferred.md#resolve)

## Constructors

### constructor

**new PromiseDeferred**<`T`>()

#### Type parameters

| Name |
| :------ |
| `T` |

## Properties

### promise

**promise**: `Promise`<`T`>

***

### reject

**reject**: (`err?`: `any`) => `void`

#### Type declaration

(`err?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `any` |

##### Returns

`void`

***

### resolve

**resolve**: (`value?`: `T` | `PromiseLike`<`T`>) => `void`

#### Type declaration

(`value?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `T` | `PromiseLike`<`T`> |

##### Returns

`void`
