# Class: DisposableImpl

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* **`DisposableImpl`**

  ↳ [`EntityData`](/auto-docs/editor/classes/EntityData.md)

  ↳ [`PlaygroundGesture`](/auto-docs/editor/classes/PlaygroundGesture.md)

## Implements

* [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/DisposableImpl.md#constructor)

### Properties

* [toDispose](/auto-docs/editor/classes/DisposableImpl.md#todispose)

### Accessors

* [disposed](/auto-docs/editor/classes/DisposableImpl.md#disposed)
* [onDispose](/auto-docs/editor/classes/DisposableImpl.md#ondispose)

### Methods

* [dispose](/auto-docs/editor/classes/DisposableImpl.md#dispose)

## Constructors

### constructor

**new DisposableImpl**()

## Properties

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/editor/classes/DisposableCollection.md)

## Accessors

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

***

### onDispose

`get` **onDispose**(): [`Event`](/auto-docs/editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/auto-docs/editor/interfaces/Event-1.md)<`void`>

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/auto-docs/editor/interfaces/Disposable-1.md).[dispose](/auto-docs/editor/interfaces/Disposable-1.md#dispose)
