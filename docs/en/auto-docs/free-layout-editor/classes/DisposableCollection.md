# Class: DisposableCollection

An object that performs a cleanup operation when `.dispose()` is called.

Some examples of how disposables are used:

* An event listener that removes itself when `.dispose()` is called.
* The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.

## Implements

* [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md#constructor)

### Accessors

* [disposed](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md#disposed)
* [length](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md#length)
* [onDispose](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md#ondispose)

### Methods

* [dispose](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md#dispose)
* [push](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md#push)
* [pushAll](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md#pushall)

## Constructors

### constructor

**new DisposableCollection**(`...toDispose`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...toDispose` | [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)\[] |

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

`get` **onDispose**(): [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md).[dispose](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md#dispose)

***

### push

**push**(`disposable`): [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `disposable` | [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md) |

#### Returns

[`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

***

### pushAll

**pushAll**(`disposables`): [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `disposables` | [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)\[] |

#### Returns

[`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)\[]
