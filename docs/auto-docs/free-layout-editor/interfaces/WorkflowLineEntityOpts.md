# Interface: WorkflowLineEntityOpts

## Hierarchy

* [`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md)

* [`WorkflowLinePortInfo`](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md)

  ↳ **`WorkflowLineEntityOpts`**

## Table of contents

### Properties

* [data](/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#data)
* [datas](/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#datas)
* [document](/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#document)
* [drawingFrom](/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#drawingfrom)
* [drawingTo](/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#drawingto)
* [entityManager](/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#entitymanager)
* [from](/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#from)
* [fromPort](/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#fromport)
* [id](/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#id)
* [linesManager](/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#linesmanager)
* [savedInManager](/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#savedinmanager)
* [to](/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#to)
* [toPort](/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#toport)
* [uiState](/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#uistate)

## Properties

### data

`Optional` **data**: `any`

#### Inherited from

[WorkflowLinePortInfo](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md).[data](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md#data)

***

### datas

`Optional` **datas**: { `data?`: `any` ; `registry`: [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>  }\[]

#### Inherited from

[EntityOpts](/auto-docs/free-layout-editor/interfaces/EntityOpts.md).[datas](/auto-docs/free-layout-editor/interfaces/EntityOpts.md#datas)

***

### document

**document**: [`WorkflowDocument`](/auto-docs/free-layout-editor/classes/WorkflowDocument.md)

***

### drawingFrom

`Optional` **drawingFrom**: [`LinePoint`](/auto-docs/free-layout-editor/interfaces/LinePoint.md)

***

### drawingTo

`Optional` **drawingTo**: [`LinePoint`](/auto-docs/free-layout-editor/interfaces/LinePoint.md)

***

### entityManager

**entityManager**: [`EntityManager`](/auto-docs/free-layout-editor/classes/EntityManager.md)

#### Inherited from

[EntityOpts](/auto-docs/free-layout-editor/interfaces/EntityOpts.md).[entityManager](/auto-docs/free-layout-editor/interfaces/EntityOpts.md#entitymanager)

***

### from

`Optional` **from**: `string`

#### Inherited from

[WorkflowLinePortInfo](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md).[from](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md#from)

***

### fromPort

`Optional` **fromPort**: `string` | `number`

#### Inherited from

[WorkflowLinePortInfo](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md).[fromPort](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md#fromport)

***

### id

`Optional` **id**: `string`

#### Inherited from

[EntityOpts](/auto-docs/free-layout-editor/interfaces/EntityOpts.md).[id](/auto-docs/free-layout-editor/interfaces/EntityOpts.md#id)

***

### linesManager

**linesManager**: [`WorkflowLinesManager`](/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md)

***

### savedInManager

`Optional` **savedInManager**: `boolean`

#### Inherited from

[EntityOpts](/auto-docs/free-layout-editor/interfaces/EntityOpts.md).[savedInManager](/auto-docs/free-layout-editor/interfaces/EntityOpts.md#savedinmanager)

***

### to

`Optional` **to**: `string`

#### Inherited from

[WorkflowLinePortInfo](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md).[to](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md#to)

***

### toPort

`Optional` **toPort**: `string` | `number`

#### Inherited from

[WorkflowLinePortInfo](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md).[toPort](/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md#toport)

***

### uiState

`Optional` **uiState**: `Partial`<[`WorkflowLineUIState`](/auto-docs/free-layout-editor/interfaces/WorkflowLineUIState.md)>
