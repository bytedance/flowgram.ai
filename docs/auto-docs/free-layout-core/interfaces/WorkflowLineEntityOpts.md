# Interface: WorkflowLineEntityOpts

## Hierarchy

* `EntityOpts`

* [`WorkflowLinePortInfo`](/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md)

  ↳ **`WorkflowLineEntityOpts`**

## Table of contents

### Properties

* [data](/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#data)
* [datas](/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#datas)
* [document](/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#document)
* [drawingFrom](/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#drawingfrom)
* [drawingTo](/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#drawingto)
* [entityManager](/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#entitymanager)
* [from](/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#from)
* [fromPort](/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#fromport)
* [id](/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#id)
* [linesManager](/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#linesmanager)
* [savedInManager](/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#savedinmanager)
* [to](/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#to)
* [toPort](/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#toport)
* [uiState](/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#uistate)

## Properties

### data

`Optional` **data**: `any`

#### Inherited from

[WorkflowLinePortInfo](/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md).[data](/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md#data)

***

### datas

`Optional` **datas**: { `data?`: `any` ; `registry`: `EntityDataRegistry`<`EntityData`<`any`, {}>>  }\[]

#### Inherited from

EntityOpts.datas

***

### document

**document**: [`WorkflowDocument`](/auto-docs/free-layout-core/classes/WorkflowDocument.md)

***

### drawingFrom

`Optional` **drawingFrom**: [`LinePoint`](/auto-docs/free-layout-core/interfaces/LinePoint.md)

***

### drawingTo

`Optional` **drawingTo**: [`LinePoint`](/auto-docs/free-layout-core/interfaces/LinePoint.md)

***

### entityManager

**entityManager**: `EntityManager`

#### Inherited from

EntityOpts.entityManager

***

### from

`Optional` **from**: `string`

#### Inherited from

[WorkflowLinePortInfo](/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md).[from](/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md#from)

***

### fromPort

`Optional` **fromPort**: `string` | `number`

#### Inherited from

[WorkflowLinePortInfo](/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md).[fromPort](/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md#fromport)

***

### id

`Optional` **id**: `string`

#### Inherited from

EntityOpts.id

***

### linesManager

**linesManager**: [`WorkflowLinesManager`](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md)

***

### savedInManager

`Optional` **savedInManager**: `boolean`

#### Inherited from

EntityOpts.savedInManager

***

### to

`Optional` **to**: `string`

#### Inherited from

[WorkflowLinePortInfo](/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md).[to](/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md#to)

***

### toPort

`Optional` **toPort**: `string` | `number`

#### Inherited from

[WorkflowLinePortInfo](/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md).[toPort](/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md#toport)

***

### uiState

`Optional` **uiState**: `Partial`<[`WorkflowLineUIState`](/auto-docs/free-layout-core/interfaces/WorkflowLineUIState.md)>
