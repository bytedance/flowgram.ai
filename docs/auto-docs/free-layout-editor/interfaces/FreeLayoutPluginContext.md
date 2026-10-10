# Interface: FreeLayoutPluginContext

## Hierarchy

* [`EditorPluginContext`](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md)

  ↳ **`FreeLayoutPluginContext`**

## Table of contents

### Properties

* [clipboard](/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#clipboard)
* [container](/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#container)
* [document](/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#document)
* [history](/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#history)
* [operation](/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#operation)
* [playground](/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#playground)
* [selection](/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#selection)
* [tools](/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#tools)

### Methods

* [get](/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#get)
* [getAll](/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md#getall)

## Properties

### clipboard

**clipboard**: [`ClipboardService`](/auto-docs/free-layout-editor/variables/ClipboardService-1.md)

***

### container

**container**: [`Container`](/auto-docs/free-layout-editor/interfaces/interfaces.Container.md)

IOC 容器

#### Inherited from

[EditorPluginContext](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md).[container](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md#container)

***

### document

**document**: [`WorkflowDocument`](/auto-docs/free-layout-editor/classes/WorkflowDocument.md)

文档

#### Overrides

[EditorPluginContext](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md).[document](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md#document)

***

### history

**history**: [`HistoryService`](/auto-docs/free-layout-editor/classes/HistoryService.md)

***

### operation

**operation**: `WorkflowOperationService`

提供对画布节点相关操作方法, 并 支持 redo/undo

***

### playground

**playground**: [`Playground`](/auto-docs/free-layout-editor/classes/Playground.md)<`any`>

画布实例

#### Inherited from

[EditorPluginContext](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md).[playground](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md#playground)

***

### selection

**selection**: [`SelectionService`](/auto-docs/free-layout-editor/classes/SelectionService.md)

#### Overrides

[EditorPluginContext](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md).[selection](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md#selection)

***

### tools

**tools**: [`FreeLayoutPluginTools`](/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginTools.md)

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
| `identifier` | [`ServiceIdentifier`](/auto-docs/free-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`

#### Inherited from

[EditorPluginContext](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md).[get](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md#get)

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
| `identifier` | [`ServiceIdentifier`](/auto-docs/free-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`\[]

#### Inherited from

[EditorPluginContext](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md).[getAll](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md#getall)
