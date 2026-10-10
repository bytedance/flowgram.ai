# Interface: Disposable

An object that performs a cleanup operation when `.dispose()` is called.

Some examples of how disposables are used:

* An event listener that removes itself when `.dispose()` is called.
* The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.

## Hierarchy

* **`Disposable`**

  ↳ [`CacheManager`](/en/auto-docs/editor/interfaces/CacheManager.md)

  ↳ [`DOMCache`](/en/auto-docs/editor/interfaces/DOMCache.md)

  ↳ [`CommandService`](/en/auto-docs/editor/interfaces/CommandService.md)

  ↳ [`FlowOperationBaseService`](/en/auto-docs/editor/interfaces/FlowOperationBaseService.md)

  ↳ [`IVariableTable`](/en/auto-docs/editor/interfaces/IVariableTable.md)

## Implemented by

* [`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)
* [`DisposableCollection`](/en/auto-docs/editor/classes/DisposableCollection.md)
* [`DisposableImpl`](/en/auto-docs/editor/classes/DisposableImpl.md)
* [`Entity`](/en/auto-docs/editor/classes/Entity-1.md)
* [`EntityManager`](/en/auto-docs/editor/classes/EntityManager.md)
* [`FlowDocument`](/en/auto-docs/editor/classes/FlowDocument.md)
* [`FlowVirtualTree`](/en/auto-docs/editor/classes/FlowVirtualTree-1.md)
* [`FormModel`](/en/auto-docs/editor/classes/FormModel.md)
* [`FormPlugin`](/en/auto-docs/editor/classes/FormPlugin.md)
* [`LoggerService`](/en/auto-docs/editor/classes/LoggerService.md)
* [`PipelineRegistry`](/en/auto-docs/editor/classes/PipelineRegistry.md)
* [`PipelineRenderer`](/en/auto-docs/editor/classes/PipelineRenderer.md)
* [`Playground`](/en/auto-docs/editor/classes/Playground.md)
* [`PlaygroundDrag`](/en/auto-docs/editor/classes/PlaygroundDrag-1.md)
* [`PlaygroundSchedule`](/en/auto-docs/editor/classes/PlaygroundSchedule.md)
* [`SelectionService`](/en/auto-docs/editor/classes/SelectionService.md)
* [`VariableEngine`](/en/auto-docs/editor/classes/VariableEngine.md)

## Table of contents

### Methods

* [dispose](/en/auto-docs/editor/interfaces/Disposable-1.md#dispose)

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`
