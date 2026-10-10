# Class: DisposableCollection

An object that performs a cleanup operation when `.dispose()` is called.

Some examples of how disposables are used:

* An event listener that removes itself when `.dispose()` is called.
* The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.

## Implements

* [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/DisposableCollection.md#constructor)

### Accessors

* [disposed](/auto-docs/editor/classes/DisposableCollection.md#disposed)
* [length](/auto-docs/editor/classes/DisposableCollection.md#length)
* [onDispose](/auto-docs/editor/classes/DisposableCollection.md#ondispose)

### Methods

* [dispose](/auto-docs/editor/classes/DisposableCollection.md#dispose)
* [push](/auto-docs/editor/classes/DisposableCollection.md#push)
* [pushAll](/auto-docs/editor/classes/DisposableCollection.md#pushall)

## Constructors

### constructor

**new DisposableCollection**(`...toDispose`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...toDispose` | [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)\[] |

## Accessors

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

***

### length

`get` **length**(): `number`

#### Returns

`number`

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

***

### push

**push**(`disposable`): [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `disposable` | [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md) |

#### Returns

[`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

***

### pushAll

**pushAll**(`disposables`): [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `disposables` | [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)\[] |

#### Returns

[`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)\[]
