# Class: PlaygroundDrag\<T>

An object that performs a cleanup operation when `.dispose()` is called.

Some examples of how disposables are used:

* An event listener that removes itself when `.dispose()` is called.
* The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `undefined` |

## Implements

* [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/PlaygroundDrag-1.md#constructor)

### Properties

* [onDrag](/auto-docs/editor/classes/PlaygroundDrag-1.md#ondrag)
* [onDragEnd](/auto-docs/editor/classes/PlaygroundDrag-1.md#ondragend)
* [onDragStart](/auto-docs/editor/classes/PlaygroundDrag-1.md#ondragstart)

### Accessors

* [isStarted](/auto-docs/editor/classes/PlaygroundDrag-1.md#isstarted)
* [scale](/auto-docs/editor/classes/PlaygroundDrag-1.md#scale)

### Methods

* [dispose](/auto-docs/editor/classes/PlaygroundDrag-1.md#dispose)
* [fireScroll](/auto-docs/editor/classes/PlaygroundDrag-1.md#firescroll)
* [handleEvent](/auto-docs/editor/classes/PlaygroundDrag-1.md#handleevent)
* [start](/auto-docs/editor/classes/PlaygroundDrag-1.md#start)
* [stop](/auto-docs/editor/classes/PlaygroundDrag-1.md#stop)

## Constructors

### constructor

**new PlaygroundDrag**<`T`>(`options?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `undefined` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`PlaygroundDragOptions`](/auto-docs/editor/interfaces/PlaygroundDragOptions.md)<`T`> |

## Properties

### onDrag

`Readonly` **onDrag**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`PlaygroundDragEvent`](/auto-docs/editor/interfaces/PlaygroundDragEvent.md)>

***

### onDragEnd

`Readonly` **onDragEnd**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`PlaygroundDragEvent`](/auto-docs/editor/interfaces/PlaygroundDragEvent.md)>

***

### onDragStart

`Readonly` **onDragStart**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`PlaygroundDragEvent`](/auto-docs/editor/interfaces/PlaygroundDragEvent.md)>

## Accessors

### isStarted

`get` **isStarted**(): `boolean`

#### Returns

`boolean`

***

### scale

`get` **scale**(): `number`

#### Returns

`number`

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/auto-docs/editor/interfaces/Disposable-1.md).[dispose](/auto-docs/editor/interfaces/Disposable-1.md#dispose)

***

### fireScroll

**fireScroll**(`scrollKey`, `added`): `void`

触发滚动

#### Parameters

| Name | Type |
| :------ | :------ |
| `scrollKey` | `"scrollY"` | `"scrollX"` |
| `added` | `boolean` |

#### Returns

`void`

***

### handleEvent

**handleEvent**(`_event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_event` | `Event` |

#### Returns

`void`

***

### start

**start**(`clientX`, `clientY`, `entity?`, `context?`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `clientX` | `number` |
| `clientY` | `number` |
| `entity?` | [`PlaygroundConfigEntity`](/auto-docs/editor/classes/PlaygroundConfigEntity.md) |
| `context?` | `T` |

#### Returns

`Promise`<`void`>

***

### stop

**stop**(`clientX`, `clientY`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `clientX` | `number` |
| `clientY` | `number` |

#### Returns

`void`
