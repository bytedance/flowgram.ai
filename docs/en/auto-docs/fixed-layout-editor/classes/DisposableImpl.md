# Class: DisposableImpl

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* **`DisposableImpl`**

  ↳ [`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)

  ↳ [`PlaygroundGesture`](/en/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md)

## Implements

* [`Disposable`](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/DisposableImpl.md#constructor)

### Properties

* [toDispose](/en/auto-docs/fixed-layout-editor/classes/DisposableImpl.md#todispose)

### Accessors

* [disposed](/en/auto-docs/fixed-layout-editor/classes/DisposableImpl.md#disposed)
* [onDispose](/en/auto-docs/fixed-layout-editor/classes/DisposableImpl.md#ondispose)

### Methods

* [dispose](/en/auto-docs/fixed-layout-editor/classes/DisposableImpl.md#dispose)

## Constructors

### constructor

**new DisposableImpl**()

## Properties

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

## Accessors

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

***

### onDispose

`get` **onDispose**(): [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md).[dispose](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md#dispose)
