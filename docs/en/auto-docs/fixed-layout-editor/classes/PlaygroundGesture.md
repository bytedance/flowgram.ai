# Class: PlaygroundGesture

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`DisposableImpl`](/en/auto-docs/fixed-layout-editor/classes/DisposableImpl.md)

  ↳ **`PlaygroundGesture`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md#constructor)

### Properties

* [target](/en/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md#target)
* [toDispose](/en/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md#todispose)

### Accessors

* [disposed](/en/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md#disposed)
* [onDispose](/en/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md#ondispose)
* [pinching](/en/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md#pinching)

### Methods

* [dispose](/en/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md#dispose)
* [getScaleBounds](/en/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md#getscalebounds)
* [handlePinch](/en/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md#handlepinch)

## Constructors

### constructor

**new PlaygroundGesture**(`target`, `config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `HTMLElement` |
| `config` | [`PlaygroundConfigEntity`](/en/auto-docs/fixed-layout-editor/classes/PlaygroundConfigEntity.md) |

#### Overrides

[DisposableImpl](/en/auto-docs/fixed-layout-editor/classes/DisposableImpl.md).[constructor](/en/auto-docs/fixed-layout-editor/classes/DisposableImpl.md#constructor)

## Properties

### target

`Readonly` **target**: `HTMLElement`

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

#### Inherited from

[DisposableImpl](/en/auto-docs/fixed-layout-editor/classes/DisposableImpl.md).[toDispose](/en/auto-docs/fixed-layout-editor/classes/DisposableImpl.md#todispose)

## Accessors

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

DisposableImpl.disposed

***

### onDispose

`get` **onDispose**(): [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

#### Inherited from

DisposableImpl.onDispose

***

### pinching

`get` **pinching**(): `boolean`

#### Returns

`boolean`

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[DisposableImpl](/en/auto-docs/fixed-layout-editor/classes/DisposableImpl.md).[dispose](/en/auto-docs/fixed-layout-editor/classes/DisposableImpl.md#dispose)

***

### getScaleBounds

**getScaleBounds**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `max` | `number` |
| `min` | `number` |

***

### handlePinch

**handlePinch**(`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.first` | `boolean` |
| `params.last` | `boolean` |
| `params.newScale` | `number` |
| `params.originX` | `number` |
| `params.originY` | `number` |

#### Returns

`void`
