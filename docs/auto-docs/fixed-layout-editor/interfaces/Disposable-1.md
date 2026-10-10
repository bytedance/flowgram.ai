# Interface: Disposable

An object that performs a cleanup operation when `.dispose()` is called.

Some examples of how disposables are used:

* An event listener that removes itself when `.dispose()` is called.
* The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.

## Hierarchy

* **`Disposable`**

  ↳ [`CacheManager`](/auto-docs/fixed-layout-editor/interfaces/CacheManager.md)

  ↳ [`DOMCache`](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md)

  ↳ [`CommandService`](/auto-docs/fixed-layout-editor/interfaces/CommandService.md)

  ↳ [`FlowOperationBaseService`](/auto-docs/fixed-layout-editor/interfaces/FlowOperationBaseService.md)

  ↳ [`IVariableTable`](/auto-docs/fixed-layout-editor/interfaces/IVariableTable.md)

  ↳ [`IHistoryService`](/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md)

  ↳ [`IUndoRedoElement`](/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md)

  ↳ [`IUndoRedoService`](/auto-docs/fixed-layout-editor/interfaces/IUndoRedoService.md)

## Implemented by

* [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)
* [`DisposableCollection`](/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)
* [`DisposableImpl`](/auto-docs/fixed-layout-editor/classes/DisposableImpl.md)
* [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)
* [`EntityManager`](/auto-docs/fixed-layout-editor/classes/EntityManager.md)
* [`FixedHistoryFormDataService`](/auto-docs/fixed-layout-editor/classes/FixedHistoryFormDataService.md)
* [`FlowDocument`](/auto-docs/fixed-layout-editor/classes/FlowDocument.md)
* [`FlowVirtualTree`](/auto-docs/fixed-layout-editor/classes/FlowVirtualTree-1.md)
* [`FormModel`](/auto-docs/fixed-layout-editor/classes/FormModel.md)
* [`FormPlugin`](/auto-docs/fixed-layout-editor/classes/FormPlugin.md)
* [`LoggerService`](/auto-docs/fixed-layout-editor/classes/LoggerService.md)
* [`PipelineRegistry`](/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md)
* [`PipelineRenderer`](/auto-docs/fixed-layout-editor/classes/PipelineRenderer.md)
* [`Playground`](/auto-docs/fixed-layout-editor/classes/Playground.md)
* [`PlaygroundDrag`](/auto-docs/fixed-layout-editor/classes/PlaygroundDrag-1.md)
* [`PlaygroundSchedule`](/auto-docs/fixed-layout-editor/classes/PlaygroundSchedule.md)
* [`SelectionService`](/auto-docs/fixed-layout-editor/classes/SelectionService.md)
* [`VariableEngine`](/auto-docs/fixed-layout-editor/classes/VariableEngine.md)

## Table of contents

### Methods

* [dispose](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md#dispose)

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`
