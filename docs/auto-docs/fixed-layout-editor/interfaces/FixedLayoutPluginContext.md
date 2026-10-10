# Interface: FixedLayoutPluginContext

## Hierarchy

* [`EditorPluginContext`](/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md)

  ↳ **`FixedLayoutPluginContext`**

## Table of contents

### Properties

* [clipboard](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#clipboard)
* [container](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#container)
* [document](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#document)
* [history](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#history)
* [operation](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#operation)
* [playground](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#playground)
* [selection](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#selection)
* [tools](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#tools)

### Methods

* [get](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#get)
* [getAll](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#getall)

## Properties

### clipboard

**clipboard**: [`ClipboardService`](/auto-docs/fixed-layout-editor/variables/ClipboardService-1.md)

***

### container

**container**: [`Container`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)

IOC 容器

#### Inherited from

[EditorPluginContext](/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md).[container](/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md#container)

***

### document

**document**: [`FlowDocument`](/auto-docs/fixed-layout-editor/classes/FlowDocument.md)<[`FlowDocumentJSON`](/auto-docs/fixed-layout-editor/types/FlowDocumentJSON.md)>

#### Overrides

[EditorPluginContext](/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md).[document](/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md#document)

***

### history

**history**: [`HistoryService`](/auto-docs/fixed-layout-editor/classes/HistoryService.md)

***

### operation

**operation**: [`FlowOperationService`](/auto-docs/fixed-layout-editor/variables/FlowOperationService-1.md)

提供对画布节点相关操作方法, 并 支持 redo/undo

***

### playground

**playground**: [`Playground`](/auto-docs/fixed-layout-editor/classes/Playground.md)<`any`>

画布实例

#### Inherited from

[EditorPluginContext](/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md).[playground](/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md#playground)

***

### selection

**selection**: [`SelectionService`](/auto-docs/fixed-layout-editor/classes/SelectionService.md)

#### Overrides

[EditorPluginContext](/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md).[selection](/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md#selection)

***

### tools

**tools**: [`FixedLayoutPluginTools`](/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginTools.md)

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
| `identifier` | [`ServiceIdentifier`](/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`

#### Inherited from

[EditorPluginContext](/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md).[get](/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md#get)

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
| `identifier` | [`ServiceIdentifier`](/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`\[]

#### Inherited from

[EditorPluginContext](/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md).[getAll](/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md#getall)
