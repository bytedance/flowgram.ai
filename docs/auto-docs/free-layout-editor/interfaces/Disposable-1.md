# Interface: Disposable

An object that performs a cleanup operation when `.dispose()` is called.

Some examples of how disposables are used:

* An event listener that removes itself when `.dispose()` is called.
* The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.

## Hierarchy

* **`Disposable`**

  ↳ [`CacheManager`](/auto-docs/free-layout-editor/interfaces/CacheManager.md)

  ↳ [`DOMCache`](/auto-docs/free-layout-editor/interfaces/DOMCache.md)

  ↳ [`CommandService`](/auto-docs/free-layout-editor/interfaces/CommandService.md)

  ↳ [`FlowOperationBaseService`](/auto-docs/free-layout-editor/interfaces/FlowOperationBaseService.md)

  ↳ [`IVariableTable`](/auto-docs/free-layout-editor/interfaces/IVariableTable.md)

  ↳ [`IHistoryService`](/auto-docs/free-layout-editor/interfaces/IHistoryService.md)

  ↳ [`IUndoRedoElement`](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md)

  ↳ [`IUndoRedoService`](/auto-docs/free-layout-editor/interfaces/IUndoRedoService.md)

## Implemented by

* [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)
* [`DisposableCollection`](/auto-docs/free-layout-editor/classes/DisposableCollection.md)
* [`DisposableImpl`](/auto-docs/free-layout-editor/classes/DisposableImpl.md)
* [`Entity`](/auto-docs/free-layout-editor/classes/Entity-1.md)
* [`EntityManager`](/auto-docs/free-layout-editor/classes/EntityManager.md)
* [`FlowDocument`](/auto-docs/free-layout-editor/classes/FlowDocument.md)
* [`FlowVirtualTree`](/auto-docs/free-layout-editor/classes/FlowVirtualTree-1.md)
* [`FormModel`](/auto-docs/free-layout-editor/classes/FormModel.md)
* [`FormPlugin`](/auto-docs/free-layout-editor/classes/FormPlugin.md)
* [`LoggerService`](/auto-docs/free-layout-editor/classes/LoggerService.md)
* [`PipelineRegistry`](/auto-docs/free-layout-editor/classes/PipelineRegistry.md)
* [`PipelineRenderer`](/auto-docs/free-layout-editor/classes/PipelineRenderer.md)
* [`Playground`](/auto-docs/free-layout-editor/classes/Playground.md)
* [`PlaygroundDrag`](/auto-docs/free-layout-editor/classes/PlaygroundDrag-1.md)
* [`PlaygroundSchedule`](/auto-docs/free-layout-editor/classes/PlaygroundSchedule.md)
* [`SelectionService`](/auto-docs/free-layout-editor/classes/SelectionService.md)
* [`VariableEngine`](/auto-docs/free-layout-editor/classes/VariableEngine.md)

## Table of contents

### Methods

* [dispose](/auto-docs/free-layout-editor/interfaces/Disposable-1.md#dispose)

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`
