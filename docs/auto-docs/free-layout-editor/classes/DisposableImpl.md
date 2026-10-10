# Class: DisposableImpl

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* **`DisposableImpl`**

  ↳ [`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)

  ↳ [`PlaygroundGesture`](/auto-docs/free-layout-editor/classes/PlaygroundGesture.md)

## Implements

* [`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/DisposableImpl.md#constructor)

### Properties

* [toDispose](/auto-docs/free-layout-editor/classes/DisposableImpl.md#todispose)

### Accessors

* [disposed](/auto-docs/free-layout-editor/classes/DisposableImpl.md#disposed)
* [onDispose](/auto-docs/free-layout-editor/classes/DisposableImpl.md#ondispose)

### Methods

* [dispose](/auto-docs/free-layout-editor/classes/DisposableImpl.md#dispose)

## Constructors

### constructor

**new DisposableImpl**()

## Properties

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/free-layout-editor/classes/DisposableCollection.md)

## Accessors

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

***

### onDispose

`get` **onDispose**(): [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/auto-docs/free-layout-editor/interfaces/Disposable-1.md).[dispose](/auto-docs/free-layout-editor/interfaces/Disposable-1.md#dispose)
