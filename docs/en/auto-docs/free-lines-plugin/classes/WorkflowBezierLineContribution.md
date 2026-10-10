# Class: WorkflowBezierLineContribution

## Implements

* `WorkflowLineRenderContribution`

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-lines-plugin/classes/WorkflowBezierLineContribution.md#constructor)

### Properties

* [entity](/en/auto-docs/free-lines-plugin/classes/WorkflowBezierLineContribution.md#entity)
* [type](/en/auto-docs/free-lines-plugin/classes/WorkflowBezierLineContribution.md#type)

### Accessors

* [bounds](/en/auto-docs/free-lines-plugin/classes/WorkflowBezierLineContribution.md#bounds)
* [center](/en/auto-docs/free-lines-plugin/classes/WorkflowBezierLineContribution.md#center)
* [path](/en/auto-docs/free-lines-plugin/classes/WorkflowBezierLineContribution.md#path)

### Methods

* [calcDistance](/en/auto-docs/free-lines-plugin/classes/WorkflowBezierLineContribution.md#calcdistance)
* [update](/en/auto-docs/free-lines-plugin/classes/WorkflowBezierLineContribution.md#update)

## Constructors

### constructor

**new WorkflowBezierLineContribution**(`entity`)

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

`Static` **type**: `LineType` = `LineType.BEZIER`

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
