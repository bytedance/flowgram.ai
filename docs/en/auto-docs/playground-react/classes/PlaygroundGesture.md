# Class: PlaygroundGesture

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* `DisposableImpl`

  ↳ **`PlaygroundGesture`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/playground-react/classes/PlaygroundGesture.md#constructor)

### Properties

* [target](/en/auto-docs/playground-react/classes/PlaygroundGesture.md#target)
* [toDispose](/en/auto-docs/playground-react/classes/PlaygroundGesture.md#todispose)

### Accessors

* [disposed](/en/auto-docs/playground-react/classes/PlaygroundGesture.md#disposed)
* [onDispose](/en/auto-docs/playground-react/classes/PlaygroundGesture.md#ondispose)
* [pinching](/en/auto-docs/playground-react/classes/PlaygroundGesture.md#pinching)

### Methods

* [dispose](/en/auto-docs/playground-react/classes/PlaygroundGesture.md#dispose)
* [getScaleBounds](/en/auto-docs/playground-react/classes/PlaygroundGesture.md#getscalebounds)
* [handlePinch](/en/auto-docs/playground-react/classes/PlaygroundGesture.md#handlepinch)

## Constructors

### constructor

**new PlaygroundGesture**(`target`, `config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `HTMLElement` |
| `config` | [`PlaygroundConfigEntity`](/en/auto-docs/playground-react/classes/PlaygroundConfigEntity.md) |

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

`get` **onDispose**(): [`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<`void`>

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
