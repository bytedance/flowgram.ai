# Class: PlaygroundDrag\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `undefined` |

## Implements

* `Disposable`

## Table of contents

### Constructors

* [constructor](/auto-docs/core/classes/PlaygroundDrag-1.md#constructor)

### Properties

* [onDrag](/auto-docs/core/classes/PlaygroundDrag-1.md#ondrag)
* [onDragEnd](/auto-docs/core/classes/PlaygroundDrag-1.md#ondragend)
* [onDragStart](/auto-docs/core/classes/PlaygroundDrag-1.md#ondragstart)

### Accessors

* [isStarted](/auto-docs/core/classes/PlaygroundDrag-1.md#isstarted)
* [scale](/auto-docs/core/classes/PlaygroundDrag-1.md#scale)

### Methods

* [dispose](/auto-docs/core/classes/PlaygroundDrag-1.md#dispose)
* [fireScroll](/auto-docs/core/classes/PlaygroundDrag-1.md#firescroll)
* [handleEvent](/auto-docs/core/classes/PlaygroundDrag-1.md#handleevent)
* [start](/auto-docs/core/classes/PlaygroundDrag-1.md#start)
* [stop](/auto-docs/core/classes/PlaygroundDrag-1.md#stop)

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
| `options` | [`PlaygroundDragOptions`](/auto-docs/core/interfaces/PlaygroundDragOptions.md)<`T`> |

## Properties

### onDrag

`Readonly` **onDrag**: `Event`<[`PlaygroundDragEvent`](/auto-docs/core/interfaces/PlaygroundDragEvent.md)>

***

### onDragEnd

`Readonly` **onDragEnd**: `Event`<[`PlaygroundDragEvent`](/auto-docs/core/interfaces/PlaygroundDragEvent.md)>

***

### onDragStart

`Readonly` **onDragStart**: `Event`<[`PlaygroundDragEvent`](/auto-docs/core/interfaces/PlaygroundDragEvent.md)>

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

Disposable.dispose

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
| `entity?` | [`PlaygroundConfigEntity`](/auto-docs/core/classes/PlaygroundConfigEntity.md) |
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
