# Interface: FreeLayoutPluginContext

## Hierarchy

* [`EditorPluginContext`](/en/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md)

  ↳ **`FreeLayoutPluginContext`**

## Table of contents

### Properties

* [clipboard](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#clipboard)
* [container](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#container)
* [document](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#document)
* [history](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#history)
* [operation](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#operation)
* [playground](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#playground)
* [selection](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#selection)
* [tools](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#tools)

### Methods

* [get](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#get)
* [getAll](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#getall)

## Properties

### clipboard

**clipboard**: [`ClipboardService`](/en/auto-docs/free-layout-editor/variables/ClipboardService-1.md)

***

### container

**container**: [`Container`](/en/auto-docs/free-layout-editor/interfaces/interfaces.Container.md)

IOC 容器

#### Inherited from

[EditorPluginContext](/en/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md).[container](/en/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md#container)

***

### document

**document**: [`WorkflowDocument`](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md)

文档

#### Overrides

[EditorPluginContext](/en/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md).[document](/en/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md#document)

***

### history

**history**: [`HistoryService`](/en/auto-docs/free-layout-editor/classes/HistoryService.md)

***

### operation

**operation**: `WorkflowOperationService`

提供对画布节点相关操作方法, 并 支持 redo/undo

***

### playground

**playground**: [`Playground`](/en/auto-docs/free-layout-editor/classes/Playground.md)<`any`>

画布实例

#### Inherited from

[EditorPluginContext](/en/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md).[playground](/en/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md#playground)

***

### selection

**selection**: [`SelectionService`](/en/auto-docs/free-layout-editor/classes/SelectionService.md)

#### Overrides

[EditorPluginContext](/en/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md).[selection](/en/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md#selection)

***

### tools

**tools**: [`FreeLayoutPluginTools`](/en/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginTools.md)

## Methods

### get

**get**<`T`>(`identifier`): `T`

获取 IOC 容器的 单例模块

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | [`ServiceIdentifier`](/en/auto-docs/free-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`

#### Inherited from

[EditorPluginContext](/en/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md).[get](/en/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md#get)

***

### getAll

**getAll**<`T`>(`identifier`): `T`\[]

获取 IOC 容器的 多例模块

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | [`ServiceIdentifier`](/en/auto-docs/free-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`\[]

#### Inherited from

[EditorPluginContext](/en/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md).[getAll](/en/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md#getall)
