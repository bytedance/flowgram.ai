# Class: DisposableImpl

An object that performs a cleanup operation when `.dispose()` is called.

Some examples of how disposables are used:

* An event listener that removes itself when `.dispose()` is called.
* The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.

## Implements

* [`Disposable`](/en/auto-docs/utils/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/utils/classes/DisposableImpl.md#constructor)

### Properties

* [toDispose](/en/auto-docs/utils/classes/DisposableImpl.md#todispose)

### Accessors

* [disposed](/en/auto-docs/utils/classes/DisposableImpl.md#disposed)
* [onDispose](/en/auto-docs/utils/classes/DisposableImpl.md#ondispose)

### Methods

* [dispose](/en/auto-docs/utils/classes/DisposableImpl.md#dispose)

## Constructors

### constructor

**new DisposableImpl**()

## Properties

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/utils/classes/DisposableCollection.md)

## Accessors

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

***

### onDispose

`get` **onDispose**(): [`Event`](/en/auto-docs/utils/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/utils/interfaces/Event-1.md)<`void`>

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/en/auto-docs/utils/interfaces/Disposable-1.md).[dispose](/en/auto-docs/utils/interfaces/Disposable-1.md#dispose)
