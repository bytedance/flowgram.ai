# Class: WorkflowFoldLineContribution

## Implements

* `WorkflowLineRenderContribution`

## Table of contents

### Constructors

* [constructor](/auto-docs/free-lines-plugin/classes/WorkflowFoldLineContribution.md#constructor)

### Properties

* [entity](/auto-docs/free-lines-plugin/classes/WorkflowFoldLineContribution.md#entity)
* [type](/auto-docs/free-lines-plugin/classes/WorkflowFoldLineContribution.md#type)

### Accessors

* [bounds](/auto-docs/free-lines-plugin/classes/WorkflowFoldLineContribution.md#bounds)
* [center](/auto-docs/free-lines-plugin/classes/WorkflowFoldLineContribution.md#center)
* [path](/auto-docs/free-lines-plugin/classes/WorkflowFoldLineContribution.md#path)

### Methods

* [calcDistance](/auto-docs/free-lines-plugin/classes/WorkflowFoldLineContribution.md#calcdistance)
* [update](/auto-docs/free-lines-plugin/classes/WorkflowFoldLineContribution.md#update)

## Constructors

### constructor

**new WorkflowFoldLineContribution**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `WorkflowLineEntity` |

## Properties

### entity

**entity**: `WorkflowLineEntity`

#### Implementation of

WorkflowLineRenderContribution.entity

***

### type

`Static` **type**: `LineType` = `LineType.LINE_CHART`

## Accessors

### bounds

`get` **bounds**(): `Rectangle`

#### Returns

`Rectangle`

#### Implementation of

WorkflowLineRenderContribution.bounds

***

### center

`get` **center**(): `undefined` | `LineCenterPoint`

#### Returns

`undefined` | `LineCenterPoint`

#### Implementation of

WorkflowLineRenderContribution.center

***

### path

`get` **path**(): `string`

#### Returns

`string`

#### Implementation of

WorkflowLineRenderContribution.path

## Methods

### calcDistance

**calcDistance**(`pos`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | `IPoint` |

#### Returns

`number`

#### Implementation of

WorkflowLineRenderContribution.calcDistance

***

### update

**update**(`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.fromPos` | `LinePoint` |
| `params.toPos` | `LinePoint` |

#### Returns

`void`

#### Implementation of

WorkflowLineRenderContribution.update
