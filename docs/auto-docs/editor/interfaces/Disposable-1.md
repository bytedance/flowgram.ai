# Interface: Disposable

An object that performs a cleanup operation when `.dispose()` is called.

Some examples of how disposables are used:

* An event listener that removes itself when `.dispose()` is called.
* The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.

## Hierarchy

* **`Disposable`**

  ↳ [`CacheManager`](/auto-docs/editor/interfaces/CacheManager.md)

  ↳ [`DOMCache`](/auto-docs/editor/interfaces/DOMCache.md)

  ↳ [`CommandService`](/auto-docs/editor/interfaces/CommandService.md)

  ↳ [`FlowOperationBaseService`](/auto-docs/editor/interfaces/FlowOperationBaseService.md)

  ↳ [`IVariableTable`](/auto-docs/editor/interfaces/IVariableTable.md)

## Implemented by

* [`ASTNode`](/auto-docs/editor/classes/ASTNode.md)
* [`DisposableCollection`](/auto-docs/editor/classes/DisposableCollection.md)
* [`DisposableImpl`](/auto-docs/editor/classes/DisposableImpl.md)
* [`Entity`](/auto-docs/editor/classes/Entity-1.md)
* [`EntityManager`](/auto-docs/editor/classes/EntityManager.md)
* [`FlowDocument`](/auto-docs/editor/classes/FlowDocument.md)
* [`FlowVirtualTree`](/auto-docs/editor/classes/FlowVirtualTree-1.md)
* [`FormModel`](/auto-docs/editor/classes/FormModel.md)
* [`FormPlugin`](/auto-docs/editor/classes/FormPlugin.md)
* [`LoggerService`](/auto-docs/editor/classes/LoggerService.md)
* [`PipelineRegistry`](/auto-docs/editor/classes/PipelineRegistry.md)
* [`PipelineRenderer`](/auto-docs/editor/classes/PipelineRenderer.md)
* [`Playground`](/auto-docs/editor/classes/Playground.md)
* [`PlaygroundDrag`](/auto-docs/editor/classes/PlaygroundDrag-1.md)
* [`PlaygroundSchedule`](/auto-docs/editor/classes/PlaygroundSchedule.md)
* [`SelectionService`](/auto-docs/editor/classes/SelectionService.md)
* [`VariableEngine`](/auto-docs/editor/classes/VariableEngine.md)

## Table of contents

### Methods

* [dispose](/auto-docs/editor/interfaces/Disposable-1.md#dispose)

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`
