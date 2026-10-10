# Class: Emitter\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/Emitter.md#constructor)

### Accessors

* [disposed](/en/auto-docs/fixed-layout-editor/classes/Emitter.md#disposed)
* [event](/en/auto-docs/fixed-layout-editor/classes/Emitter.md#event)

### Methods

* [dispose](/en/auto-docs/fixed-layout-editor/classes/Emitter.md#dispose)
* [fire](/en/auto-docs/fixed-layout-editor/classes/Emitter.md#fire)

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

`get` **event**(): [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`T`>

#### Returns

[`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`T`>

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
