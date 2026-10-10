# Interface: EditorPluginContext

## Hierarchy

* [`PluginContext`](/en/auto-docs/fixed-layout-editor/variables/PluginContext-1.md)

  ↳ **`EditorPluginContext`**

  ↳↳ [`FixedLayoutPluginContext`](/en/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.md)

## Table of contents

### Properties

* [container](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md#container)
* [document](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md#document)
* [playground](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md#playground)
* [selection](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md#selection)

### Methods

* [get](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md#get)
* [getAll](/en/auto-docs/fixed-layout-editor/interfaces/EditorPluginContext.md#getall)

## Properties

### container

**container**: [`Container`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)

IOC 容器

#### Inherited from

PluginContext.container

***

### document

**document**: [`FlowDocument`](/en/auto-docs/fixed-layout-editor/classes/FlowDocument.md)<[`FlowDocumentJSON`](/en/auto-docs/fixed-layout-editor/types/FlowDocumentJSON.md)>

***

### playground

**playground**: [`Playground`](/en/auto-docs/fixed-layout-editor/classes/Playground.md)<`any`>

画布实例

#### Inherited from

PluginContext.playground

***

### selection

**selection**: [`SelectionService`](/en/auto-docs/fixed-layout-editor/classes/SelectionService.md)

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
| `identifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`\[]

#### Inherited from

PluginContext.getAll
