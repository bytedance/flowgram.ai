# Interface: WorkflowLineEntityOpts

## Hierarchy

* `EntityOpts`

* [`WorkflowLinePortInfo`](/en/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md)

  ↳ **`WorkflowLineEntityOpts`**

## Table of contents

### Properties

* [data](/en/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#data)
* [datas](/en/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#datas)
* [document](/en/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#document)
* [drawingFrom](/en/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#drawingfrom)
* [drawingTo](/en/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#drawingto)
* [entityManager](/en/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#entitymanager)
* [from](/en/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#from)
* [fromPort](/en/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#fromport)
* [id](/en/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#id)
* [linesManager](/en/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#linesmanager)
* [savedInManager](/en/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#savedinmanager)
* [to](/en/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#to)
* [toPort](/en/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#toport)
* [uiState](/en/auto-docs/free-layout-core/interfaces/WorkflowLineEntityOpts.md#uistate)

## Properties

### data

`Optional` **data**: `any`

#### Inherited from

[WorkflowLinePortInfo](/en/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md).[data](/en/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md#data)

***

### datas

`Optional` **datas**: { `data?`: `any` ; `registry`: `EntityDataRegistry`<`EntityData`<`any`, {}>>  }\[]

#### Inherited from

EntityOpts.datas

***

### document

**document**: [`WorkflowDocument`](/en/auto-docs/free-layout-core/classes/WorkflowDocument.md)

***

### drawingFrom

`Optional` **drawingFrom**: [`LinePoint`](/en/auto-docs/free-layout-core/interfaces/LinePoint.md)

***

### drawingTo

`Optional` **drawingTo**: [`LinePoint`](/en/auto-docs/free-layout-core/interfaces/LinePoint.md)

***

### entityManager

**entityManager**: `EntityManager`

#### Inherited from

EntityOpts.entityManager

***

### from

`Optional` **from**: `string`

#### Inherited from

[WorkflowLinePortInfo](/en/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md).[from](/en/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md#from)

***

### fromPort

`Optional` **fromPort**: `string` | `number`

#### Inherited from

[WorkflowLinePortInfo](/en/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md).[fromPort](/en/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md#fromport)

***

### id

`Optional` **id**: `string`

#### Inherited from

EntityOpts.id

***

### linesManager

**linesManager**: [`WorkflowLinesManager`](/en/auto-docs/free-layout-core/classes/WorkflowLinesManager.md)

***

### savedInManager

`Optional` **savedInManager**: `boolean`

#### Inherited from

EntityOpts.savedInManager

***

### to

`Optional` **to**: `string`

#### Inherited from

[WorkflowLinePortInfo](/en/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md).[to](/en/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md#to)

***

### toPort

`Optional` **toPort**: `string` | `number`

#### Inherited from

[WorkflowLinePortInfo](/en/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md).[toPort](/en/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md#toport)

***

### uiState

`Optional` **uiState**: `Partial`<[`WorkflowLineUIState`](/en/auto-docs/free-layout-core/interfaces/WorkflowLineUIState.md)>
