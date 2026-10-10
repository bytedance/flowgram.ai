# Interface: CancellationToken

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Implemented by

* [`MutableToken`](/en/auto-docs/editor/classes/MutableToken.md)

## Table of contents

### Properties

* [isCancellationRequested](/en/auto-docs/editor/interfaces/CancellationToken-1.md#iscancellationrequested)

### Events

* [onCancellationRequested](/en/auto-docs/editor/interfaces/CancellationToken-1.md#oncancellationrequested)

## Properties

### isCancellationRequested

`Readonly` **isCancellationRequested**: `boolean`

A flag signalling is cancellation has been requested.

## Events

### onCancellationRequested

`Readonly` **onCancellationRequested**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`void`>

An event which fires when cancellation is requested. This event
only ever fires `once` as cancellation can only happen once. Listeners
that are registered after cancellation will be called (next event loop run),
but also only once.
