# Class: AsyncContainerModule

## Implements

* [`AsyncContainerModule`](/en/auto-docs/editor/interfaces/interfaces.AsyncContainerModule.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/AsyncContainerModule.md#constructor)

### Properties

* [id](/en/auto-docs/editor/classes/AsyncContainerModule.md#id)
* [registry](/en/auto-docs/editor/classes/AsyncContainerModule.md#registry)

## Constructors

### constructor

**new AsyncContainerModule**(`registry`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | (...`args`: \[bind: Bind, unbind: Unbind, isBound: IsBound, rebind: Rebind, unbindAsync: UnbindAsync, onActivation: Function, onDeactivation: Function]) => `Promise`<`void`> |

## Properties

### id

**id**: `number`

#### Implementation of

[AsyncContainerModule](/en/auto-docs/editor/interfaces/interfaces.AsyncContainerModule.md).[id](/en/auto-docs/editor/interfaces/interfaces.AsyncContainerModule.md#id)

***

### registry

**registry**: (...`args`: \[bind: Bind, unbind: Unbind, isBound: IsBound, rebind: Rebind, unbindAsync: UnbindAsync, onActivation: Function, onDeactivation: Function]) => `Promise`<`void`>

#### Type declaration

(`...args`): `Promise`<`void`>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | \[bind: Bind, unbind: Unbind, isBound: IsBound, rebind: Rebind, unbindAsync: UnbindAsync, onActivation: Function, onDeactivation: Function] |

##### Returns

`Promise`<`void`>

#### Implementation of

[AsyncContainerModule](/en/auto-docs/editor/interfaces/interfaces.AsyncContainerModule.md).[registry](/en/auto-docs/editor/interfaces/interfaces.AsyncContainerModule.md#registry)
