# Class: PlaygroundGesture

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* `DisposableImpl`

  ↳ **`PlaygroundGesture`**

## Table of contents

### Constructors

* [constructor](/auto-docs/playground-react/classes/PlaygroundGesture.md#constructor)

### Properties

* [target](/auto-docs/playground-react/classes/PlaygroundGesture.md#target)
* [toDispose](/auto-docs/playground-react/classes/PlaygroundGesture.md#todispose)

### Accessors

* [disposed](/auto-docs/playground-react/classes/PlaygroundGesture.md#disposed)
* [onDispose](/auto-docs/playground-react/classes/PlaygroundGesture.md#ondispose)
* [pinching](/auto-docs/playground-react/classes/PlaygroundGesture.md#pinching)

### Methods

* [dispose](/auto-docs/playground-react/classes/PlaygroundGesture.md#dispose)
* [getScaleBounds](/auto-docs/playground-react/classes/PlaygroundGesture.md#getscalebounds)
* [handlePinch](/auto-docs/playground-react/classes/PlaygroundGesture.md#handlepinch)

## Constructors

### constructor

**new PlaygroundGesture**(`target`, `config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `HTMLElement` |
| `config` | [`PlaygroundConfigEntity`](/auto-docs/playground-react/classes/PlaygroundConfigEntity.md) |

#### Overrides

DisposableImpl.constructor

## Properties

### target

`Readonly` **target**: `HTMLElement`

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

#### Inherited from

DisposableImpl.toDispose

## Accessors

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

DisposableImpl.disposed

***

### onDispose

`get` **onDispose**(): [`Event`](/auto-docs/playground-react/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/auto-docs/playground-react/interfaces/Event-1.md)<`void`>

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

DisposableImpl.dispose

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
