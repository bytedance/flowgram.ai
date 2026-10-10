# Interface: CancellationToken

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Implemented by

* [`MutableToken`](/auto-docs/fixed-layout-editor/classes/MutableToken.md)

## Table of contents

### Properties

* [isCancellationRequested](/auto-docs/fixed-layout-editor/interfaces/CancellationToken-1.md#iscancellationrequested)

### Events

* [onCancellationRequested](/auto-docs/fixed-layout-editor/interfaces/CancellationToken-1.md#oncancellationrequested)

## Properties

### isCancellationRequested

`Readonly` **isCancellationRequested**: `boolean`

A flag signalling is cancellation has been requested.

## Events

### onCancellationRequested

`Readonly` **onCancellationRequested**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

An event which fires when cancellation is requested. This event
only ever fires `once` as cancellation can only happen once. Listeners
that are registered after cancellation will be called (next event loop run),
but also only once.
