# Interface: FixedLayoutPluginContext

## Hierarchy

* [`EditorPluginContext`](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md)

  ↳ **`FixedLayoutPluginContext`**

## Table of contents

### Properties

* [clipboard](/en/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#clipboard)
* [container](/en/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#container)
* [document](/en/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#document)
* [history](/en/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#history)
* [operation](/en/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#operation)
* [playground](/en/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#playground)
* [selection](/en/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#selection)
* [tools](/en/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#tools)

### Methods

* [get](/en/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#get)
* [getAll](/en/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md#getall)

## Properties

### clipboard

**clipboard**: [`ClipboardService`](/en/auto-docs/fixed-layout-editor/variables/ClipboardService-1.md)

***

### container

**container**: [`Container`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)

IOC 容器

#### Inherited from

[EditorPluginContext](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md).[container](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md#container)

***

### document

**document**: [`FlowDocument`](/en/auto-docs/fixed-layout-editor/classes/FlowDocument.md)<[`FlowDocumentJSON`](/en/auto-docs/fixed-layout-editor/types/FlowDocumentJSON.md)>

#### Overrides

[EditorPluginContext](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md).[document](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md#document)

***

### history

**history**: [`HistoryService`](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md)

***

### operation

**operation**: [`FlowOperationService`](/en/auto-docs/fixed-layout-editor/variables/FlowOperationService-1.md)

提供对画布节点相关操作方法, 并 支持 redo/undo

***

### playground

**playground**: [`Playground`](/en/auto-docs/fixed-layout-editor/classes/Playground.md)<`any`>

画布实例

#### Inherited from

[EditorPluginContext](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md).[playground](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md#playground)

***

### selection

**selection**: [`SelectionService`](/en/auto-docs/fixed-layout-editor/classes/SelectionService.md)

#### Overrides

[EditorPluginContext](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md).[selection](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md#selection)

***

### tools

**tools**: [`FixedLayoutPluginTools`](/en/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginTools.md)

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
| `identifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`

#### Inherited from

[EditorPluginContext](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md).[get](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md#get)

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
| `identifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`\[]

#### Inherited from

[EditorPluginContext](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md).[getAll](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md#getall)
