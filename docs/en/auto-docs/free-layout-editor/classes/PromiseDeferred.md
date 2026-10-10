# Class: PromiseDeferred\<T>

Simple implementation of the deferred pattern.
An object that exposes a promise and functions to resolve and reject it.

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/PromiseDeferred.md#constructor)

### Properties

* [promise](/en/auto-docs/free-layout-editor/classes/PromiseDeferred.md#promise)
* [reject](/en/auto-docs/free-layout-editor/classes/PromiseDeferred.md#reject)
* [resolve](/en/auto-docs/free-layout-editor/classes/PromiseDeferred.md#resolve)

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
