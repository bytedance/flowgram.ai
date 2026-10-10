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

* [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/PlaygroundDrag-1.md#constructor)

### Properties

* [onDrag](/en/auto-docs/free-layout-editor/classes/PlaygroundDrag-1.md#ondrag)
* [onDragEnd](/en/auto-docs/free-layout-editor/classes/PlaygroundDrag-1.md#ondragend)
* [onDragStart](/en/auto-docs/free-layout-editor/classes/PlaygroundDrag-1.md#ondragstart)

### Accessors

* [isStarted](/en/auto-docs/free-layout-editor/classes/PlaygroundDrag-1.md#isstarted)
* [scale](/en/auto-docs/free-layout-editor/classes/PlaygroundDrag-1.md#scale)

### Methods

* [dispose](/en/auto-docs/free-layout-editor/classes/PlaygroundDrag-1.md#dispose)
* [fireScroll](/en/auto-docs/free-layout-editor/classes/PlaygroundDrag-1.md#firescroll)
* [handleEvent](/en/auto-docs/free-layout-editor/classes/PlaygroundDrag-1.md#handleevent)
* [start](/en/auto-docs/free-layout-editor/classes/PlaygroundDrag-1.md#start)
* [stop](/en/auto-docs/free-layout-editor/classes/PlaygroundDrag-1.md#stop)

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
| `options?` | [`PlaygroundDragOptions`](/en/auto-docs/free-layout-editor/interfaces/PlaygroundDragOptions.md)<`T`> |

## Properties

### onDrag

`Readonly` **onDrag**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`PlaygroundDragEvent`](/en/auto-docs/free-layout-editor/interfaces/PlaygroundDragEvent.md)>

***

### onDragEnd

`Readonly` **onDragEnd**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`PlaygroundDragEvent`](/en/auto-docs/free-layout-editor/interfaces/PlaygroundDragEvent.md)>

***

### onDragStart

`Readonly` **onDragStart**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`PlaygroundDragEvent`](/en/auto-docs/free-layout-editor/interfaces/PlaygroundDragEvent.md)>

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

[Disposable](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md).[dispose](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md#dispose)

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
| `entity?` | [`PlaygroundConfigEntity`](/en/auto-docs/free-layout-editor/classes/PlaygroundConfigEntity.md) |
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
