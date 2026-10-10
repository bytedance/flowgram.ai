# Interface: EditorPluginContext

## Hierarchy

* [`PluginContext`](/auto-docs/free-layout-editor/variables/PluginContext-1.md)

  ↳ **`EditorPluginContext`**

  ↳↳ [`FreeLayoutPluginContext`](/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.md)

## Table of contents

### Properties

* [container](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md#container)
* [document](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md#document)
* [playground](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md#playground)
* [selection](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md#selection)

### Methods

* [get](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md#get)
* [getAll](/auto-docs/free-layout-editor/interfaces/EditorPluginContext.md#getall)

## Properties

### container

**container**: [`Container`](/auto-docs/free-layout-editor/interfaces/interfaces.Container.md)

IOC 容器

#### Inherited from

PluginContext.container

***

### document

**document**: [`FlowDocument`](/auto-docs/free-layout-editor/classes/FlowDocument.md)<[`FlowDocumentJSON`](/auto-docs/free-layout-editor/types/FlowDocumentJSON.md)>

***

### playground

**playground**: [`Playground`](/auto-docs/free-layout-editor/classes/Playground.md)<`any`>

画布实例

#### Inherited from

PluginContext.playground

***

### selection

**selection**: [`SelectionService`](/auto-docs/free-layout-editor/classes/SelectionService.md)

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

PluginContext.get

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

PluginContext.getAll
