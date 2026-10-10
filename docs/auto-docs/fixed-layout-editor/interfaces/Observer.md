# Interface: Observer\<T>

An object interface that defines a set of callback functions a user can use to get
notified of any set of Observable
guide/glossary-and-semantics#notification notification events.

For more info, please refer to guide/observer this guide.

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

* [complete](/auto-docs/fixed-layout-editor/interfaces/Observer.md#complete)
* [error](/auto-docs/fixed-layout-editor/interfaces/Observer.md#error)
* [next](/auto-docs/fixed-layout-editor/interfaces/Observer.md#next)

## Properties

### complete

**complete**: () => `void`

#### Type declaration

(): `void`

A callback function that gets called by the producer if and when it has no more
values to provide (by calling `next` callback function). This means that no error
has happened. This callback can't be called more than one time, it can't be called
if the `error` callback function have been called previously, nor it can't be called
if the consumer has unsubscribed.

For more info, please refer to guide/glossary-and-semantics#complete this guide.

##### Returns

`void`

***

### error

**error**: (`err`: `any`) => `void`

#### Type declaration

(`err`): `void`

A callback function that gets called by the producer if and when it encountered a
problem of any kind. The errored value will be provided through the `err` parameter.
This callback can't be called more than one time, it can't be called if the
`complete` callback function have been called previously, nor it can't be called if
the consumer has unsubscribed.

For more info, please refer to guide/glossary-and-semantics#error this guide.

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `any` |

##### Returns

`void`

***

### next

**next**: (`value`: `T`) => `void`

#### Type declaration

(`value`): `void`

A callback function that gets called by the producer during the subscription when
the producer "has" the `value`. It won't be called if `error` or `complete` callback
functions have been called, nor after the consumer has unsubscribed.

For more info, please refer to guide/glossary-and-semantics#next this guide.

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

`void`
