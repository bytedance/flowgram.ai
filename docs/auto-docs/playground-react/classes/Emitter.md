# Class: Emitter\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Table of contents

### Constructors

* [constructor](/auto-docs/playground-react/classes/Emitter.md#constructor)

### Accessors

* [disposed](/auto-docs/playground-react/classes/Emitter.md#disposed)
* [event](/auto-docs/playground-react/classes/Emitter.md#event)

### Methods

* [dispose](/auto-docs/playground-react/classes/Emitter.md#dispose)
* [fire](/auto-docs/playground-react/classes/Emitter.md#fire)

## Constructors

### constructor

**new Emitter**<`T`>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Accessors

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

***

### event

`get` **event**(): [`Event`](/auto-docs/playground-react/interfaces/Event-1.md)<`T`>

#### Returns

[`Event`](/auto-docs/playground-react/interfaces/Event-1.md)<`T`>

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### fire

**fire**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `T` |

#### Returns

`void`
