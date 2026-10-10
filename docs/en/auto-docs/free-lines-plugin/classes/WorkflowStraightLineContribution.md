# Class: WorkflowStraightLineContribution

## Implements

* `WorkflowLineRenderContribution`

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-lines-plugin/classes/WorkflowStraightLineContribution.md#constructor)

### Properties

* [entity](/en/auto-docs/free-lines-plugin/classes/WorkflowStraightLineContribution.md#entity)
* [type](/en/auto-docs/free-lines-plugin/classes/WorkflowStraightLineContribution.md#type)

### Accessors

* [bounds](/en/auto-docs/free-lines-plugin/classes/WorkflowStraightLineContribution.md#bounds)
* [center](/en/auto-docs/free-lines-plugin/classes/WorkflowStraightLineContribution.md#center)
* [path](/en/auto-docs/free-lines-plugin/classes/WorkflowStraightLineContribution.md#path)

### Methods

* [calcDistance](/en/auto-docs/free-lines-plugin/classes/WorkflowStraightLineContribution.md#calcdistance)
* [update](/en/auto-docs/free-lines-plugin/classes/WorkflowStraightLineContribution.md#update)

## Constructors

### constructor

**new WorkflowStraightLineContribution**(`entity`)

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

`Static` **type**: `LineType` = `LineType.STRAIGHT`

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
