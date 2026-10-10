# Class: PlaygroundGesture

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`DisposableImpl`](/auto-docs/fixed-layout-editor/classes/DisposableImpl.md)

  ↳ **`PlaygroundGesture`**

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md#constructor)

### Properties

* [target](/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md#target)
* [toDispose](/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md#todispose)

### Accessors

* [disposed](/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md#disposed)
* [onDispose](/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md#ondispose)
* [pinching](/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md#pinching)

### Methods

* [dispose](/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md#dispose)
* [getScaleBounds](/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md#getscalebounds)
* [handlePinch](/auto-docs/fixed-layout-editor/classes/PlaygroundGesture.md#handlepinch)

## Constructors

### constructor

**new PlaygroundGesture**(`target`, `config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `HTMLElement` |
| `config` | [`PlaygroundConfigEntity`](/auto-docs/fixed-layout-editor/classes/PlaygroundConfigEntity.md) |

#### Overrides

[DisposableImpl](/auto-docs/fixed-layout-editor/classes/DisposableImpl.md).[constructor](/auto-docs/fixed-layout-editor/classes/DisposableImpl.md#constructor)

## Properties

### target

`Readonly` **target**: `HTMLElement`

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

#### Inherited from

[DisposableImpl](/auto-docs/fixed-layout-editor/classes/DisposableImpl.md).[toDispose](/auto-docs/fixed-layout-editor/classes/DisposableImpl.md#todispose)

## Accessors

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

DisposableImpl.disposed

***

### onDispose

`get` **onDispose**(): [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

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

[DisposableImpl](/auto-docs/fixed-layout-editor/classes/DisposableImpl.md).[dispose](/auto-docs/fixed-layout-editor/classes/DisposableImpl.md#dispose)

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
