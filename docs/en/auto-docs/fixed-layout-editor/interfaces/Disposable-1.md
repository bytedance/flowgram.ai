# Interface: Disposable

An object that performs a cleanup operation when `.dispose()` is called.

Some examples of how disposables are used:

* An event listener that removes itself when `.dispose()` is called.
* The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.

## Hierarchy

* **`Disposable`**

  ↳ [`CacheManager`](/en/auto-docs/fixed-layout-editor/interfaces/CacheManager.md)

  ↳ [`DOMCache`](/en/auto-docs/fixed-layout-editor/interfaces/DOMCache.md)

  ↳ [`CommandService`](/en/auto-docs/fixed-layout-editor/interfaces/CommandService.md)

  ↳ [`FlowOperationBaseService`](/en/auto-docs/fixed-layout-editor/interfaces/FlowOperationBaseService.md)

  ↳ [`IVariableTable`](/en/auto-docs/fixed-layout-editor/interfaces/IVariableTable.md)

  ↳ [`IHistoryService`](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryService.md)

  ↳ [`IUndoRedoElement`](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md)

  ↳ [`IUndoRedoService`](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoService.md)

## Implemented by

* [`ASTNode`](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md)
* [`DisposableCollection`](/en/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)
* [`DisposableImpl`](/en/auto-docs/fixed-layout-editor/classes/DisposableImpl.md)
* [`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)
* [`EntityManager`](/en/auto-docs/fixed-layout-editor/classes/EntityManager.md)
* [`FixedHistoryFormDataService`](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryFormDataService.md)
* [`FlowDocument`](/en/auto-docs/fixed-layout-editor/classes/FlowDocument.md)
* [`FlowVirtualTree`](/en/auto-docs/fixed-layout-editor/classes/FlowVirtualTree-1.md)
* [`FormModel`](/en/auto-docs/fixed-layout-editor/classes/FormModel.md)
* [`FormPlugin`](/en/auto-docs/fixed-layout-editor/classes/FormPlugin.md)
* [`LoggerService`](/en/auto-docs/fixed-layout-editor/classes/LoggerService.md)
* [`PipelineRegistry`](/en/auto-docs/fixed-layout-editor/classes/PipelineRegistry.md)
* [`PipelineRenderer`](/en/auto-docs/fixed-layout-editor/classes/PipelineRenderer.md)
* [`Playground`](/en/auto-docs/fixed-layout-editor/classes/Playground.md)
* [`PlaygroundDrag`](/en/auto-docs/fixed-layout-editor/classes/PlaygroundDrag-1.md)
* [`PlaygroundSchedule`](/en/auto-docs/fixed-layout-editor/classes/PlaygroundSchedule.md)
* [`SelectionService`](/en/auto-docs/fixed-layout-editor/classes/SelectionService.md)
* [`VariableEngine`](/en/auto-docs/fixed-layout-editor/classes/VariableEngine.md)

## Table of contents

### Methods

* [dispose](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md#dispose)

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`
