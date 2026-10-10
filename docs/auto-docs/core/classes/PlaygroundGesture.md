# Class: PlaygroundGesture

## Hierarchy

* `DisposableImpl`

  ↳ **`PlaygroundGesture`**

## Table of contents

### Constructors

* [constructor](/auto-docs/core/classes/PlaygroundGesture.md#constructor)

### Properties

* [target](/auto-docs/core/classes/PlaygroundGesture.md#target)
* [toDispose](/auto-docs/core/classes/PlaygroundGesture.md#todispose)

### Accessors

* [disposed](/auto-docs/core/classes/PlaygroundGesture.md#disposed)
* [onDispose](/auto-docs/core/classes/PlaygroundGesture.md#ondispose)
* [pinching](/auto-docs/core/classes/PlaygroundGesture.md#pinching)

### Methods

* [dispose](/auto-docs/core/classes/PlaygroundGesture.md#dispose)
* [getScaleBounds](/auto-docs/core/classes/PlaygroundGesture.md#getscalebounds)
* [handlePinch](/auto-docs/core/classes/PlaygroundGesture.md#handlepinch)

## Constructors

### constructor

**new PlaygroundGesture**(`target`, `config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `HTMLElement` |
| `config` | [`PlaygroundConfigEntity`](/auto-docs/core/classes/PlaygroundConfigEntity.md) |

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

`get` **onDispose**(): `Event`<`void`>

#### Returns

`Event`<`void`>

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
