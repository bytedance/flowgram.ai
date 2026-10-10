# Interface: WorkflowLineEntityOpts

## Hierarchy

* [`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)

* [`WorkflowLinePortInfo`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md)

  ↳ **`WorkflowLineEntityOpts`**

## Table of contents

### Properties

* [data](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#data)
* [datas](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#datas)
* [document](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#document)
* [drawingFrom](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#drawingfrom)
* [drawingTo](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#drawingto)
* [entityManager](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#entitymanager)
* [from](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#from)
* [fromPort](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#fromport)
* [id](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#id)
* [linesManager](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#linesmanager)
* [savedInManager](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#savedinmanager)
* [to](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#to)
* [toPort](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#toport)
* [uiState](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineEntityOpts.md#uistate)

## Properties

### data

`Optional` **data**: `any`

#### Inherited from

[WorkflowLinePortInfo](/en/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md).[data](/en/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md#data)

***

### datas

`Optional` **datas**: { `data?`: `any` ; `registry`: [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>  }\[]

#### Inherited from

[EntityOpts](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md).[datas](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md#datas)

***

### document

**document**: [`WorkflowDocument`](/en/auto-docs/free-layout-editor/classes/WorkflowDocument.md)

***

### drawingFrom

`Optional` **drawingFrom**: [`LinePoint`](/en/auto-docs/free-layout-editor/interfaces/LinePoint.md)

***

### drawingTo

`Optional` **drawingTo**: [`LinePoint`](/en/auto-docs/free-layout-editor/interfaces/LinePoint.md)

***

### entityManager

**entityManager**: [`EntityManager`](/en/auto-docs/free-layout-editor/classes/EntityManager.md)

#### Inherited from

[EntityOpts](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md).[entityManager](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md#entitymanager)

***

### from

`Optional` **from**: `string`

#### Inherited from

[WorkflowLinePortInfo](/en/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md).[from](/en/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md#from)

***

### fromPort

`Optional` **fromPort**: `string` | `number`

#### Inherited from

[WorkflowLinePortInfo](/en/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md).[fromPort](/en/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md#fromport)

***

### id

`Optional` **id**: `string`

#### Inherited from

[EntityOpts](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md).[id](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md#id)

***

### linesManager

**linesManager**: [`WorkflowLinesManager`](/en/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md)

***

### savedInManager

`Optional` **savedInManager**: `boolean`

#### Inherited from

[EntityOpts](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md).[savedInManager](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md#savedinmanager)

***

### to

`Optional` **to**: `string`

#### Inherited from

[WorkflowLinePortInfo](/en/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md).[to](/en/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md#to)

***

### toPort

`Optional` **toPort**: `string` | `number`

#### Inherited from

[WorkflowLinePortInfo](/en/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md).[toPort](/en/auto-docs/free-layout-editor/interfaces/WorkflowLinePortInfo.md#toport)

***

### uiState

`Optional` **uiState**: `Partial`<[`WorkflowLineUIState`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineUIState.md)>
