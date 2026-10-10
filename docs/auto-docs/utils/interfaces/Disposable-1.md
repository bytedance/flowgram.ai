# Interface: Disposable

An object that performs a cleanup operation when `.dispose()` is called.

Some examples of how disposables are used:

* An event listener that removes itself when `.dispose()` is called.
* The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.

## Hierarchy

* **`Disposable`**

  ↳ [`CacheManager`](/auto-docs/utils/interfaces/CacheManager.md)

  ↳ [`DOMCache`](/auto-docs/utils/interfaces/DOMCache.md)

## Implemented by

* [`DisposableCollection`](/auto-docs/utils/classes/DisposableCollection.md)
* [`DisposableImpl`](/auto-docs/utils/classes/DisposableImpl.md)

## Table of contents

### Methods

* [dispose](/auto-docs/utils/interfaces/Disposable-1.md#dispose)

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`
