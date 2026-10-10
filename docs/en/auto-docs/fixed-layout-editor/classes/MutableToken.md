# Class: MutableToken

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Implements

* [`CancellationToken`](/en/auto-docs/fixed-layout-editor/interfaces/CancellationToken-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/MutableToken.md#constructor)

### Accessors

* [isCancellationRequested](/en/auto-docs/fixed-layout-editor/classes/MutableToken.md#iscancellationrequested)
* [onCancellationRequested](/en/auto-docs/fixed-layout-editor/classes/MutableToken.md#oncancellationrequested)

### Methods

* [cancel](/en/auto-docs/fixed-layout-editor/classes/MutableToken.md#cancel)
* [dispose](/en/auto-docs/fixed-layout-editor/classes/MutableToken.md#dispose)

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

[CancellationToken](/en/auto-docs/fixed-layout-editor/interfaces/CancellationToken-1.md).[isCancellationRequested](/en/auto-docs/fixed-layout-editor/interfaces/CancellationToken-1.md#iscancellationrequested)

***

### onCancellationRequested

`get` **onCancellationRequested**(): [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

An event which fires when cancellation is requested. This event
only ever fires `once` as cancellation can only happen once. Listeners
that are registered after cancellation will be called (next event loop run),
but also only once.

#### Returns

[`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

#### Implementation of

[CancellationToken](/en/auto-docs/fixed-layout-editor/interfaces/CancellationToken-1.md).[onCancellationRequested](/en/auto-docs/fixed-layout-editor/interfaces/CancellationToken-1.md#oncancellationrequested)

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
