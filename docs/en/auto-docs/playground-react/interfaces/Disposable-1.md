# Interface: Disposable

An object that performs a cleanup operation when `.dispose()` is called.

Some examples of how disposables are used:

* An event listener that removes itself when `.dispose()` is called.
* The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.

## Hierarchy

* **`Disposable`**

  ↳ [`CommandService`](/en/auto-docs/playground-react/interfaces/CommandService.md)

## Implemented by

* [`Entity`](/en/auto-docs/playground-react/classes/Entity-1.md)
* [`EntityManager`](/en/auto-docs/playground-react/classes/EntityManager.md)
* [`LoggerService`](/en/auto-docs/playground-react/classes/LoggerService.md)
* [`PipelineRegistry`](/en/auto-docs/playground-react/classes/PipelineRegistry.md)
* [`PipelineRenderer`](/en/auto-docs/playground-react/classes/PipelineRenderer.md)
* [`Playground`](/en/auto-docs/playground-react/classes/Playground.md)
* [`PlaygroundDrag`](/en/auto-docs/playground-react/classes/PlaygroundDrag-1.md)
* [`PlaygroundSchedule`](/en/auto-docs/playground-react/classes/PlaygroundSchedule.md)
* [`SelectionService`](/en/auto-docs/playground-react/classes/SelectionService.md)

## Table of contents

### Methods

* [dispose](/en/auto-docs/playground-react/interfaces/Disposable-1.md#dispose)

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`
