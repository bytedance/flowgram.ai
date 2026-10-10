# Class: MutableToken

## Implements

* [`CancellationToken`](/auto-docs/utils/interfaces/CancellationToken-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/utils/classes/MutableToken.md#constructor)

### Accessors

* [isCancellationRequested](/auto-docs/utils/classes/MutableToken.md#iscancellationrequested)
* [onCancellationRequested](/auto-docs/utils/classes/MutableToken.md#oncancellationrequested)

### Methods

* [cancel](/auto-docs/utils/classes/MutableToken.md#cancel)
* [dispose](/auto-docs/utils/classes/MutableToken.md#dispose)

## Constructors

### constructor

**new MutableToken**()

## Accessors

### isCancellationRequested

`get` **isCancellationRequested**(): `boolean`

A flag signalling is cancellation has been requested.

#### Returns

`boolean`

#### Implementation of

[CancellationToken](/auto-docs/utils/interfaces/CancellationToken-1.md).[isCancellationRequested](/auto-docs/utils/interfaces/CancellationToken-1.md#iscancellationrequested)

***

### onCancellationRequested

`get` **onCancellationRequested**(): [`Event`](/auto-docs/utils/interfaces/Event-1.md)<`void`>

An event which fires when cancellation is requested. This event
only ever fires `once` as cancellation can only happen once. Listeners
that are registered after cancellation will be called (next event loop run),
but also only once.

#### Returns

[`Event`](/auto-docs/utils/interfaces/Event-1.md)<`void`>

#### Implementation of

[CancellationToken](/auto-docs/utils/interfaces/CancellationToken-1.md).[onCancellationRequested](/auto-docs/utils/interfaces/CancellationToken-1.md#oncancellationrequested)

## Methods

### cancel

**cancel**(): `void`

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`
