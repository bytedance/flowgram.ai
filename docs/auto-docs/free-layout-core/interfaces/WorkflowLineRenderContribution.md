# Interface: WorkflowLineRenderContribution

## Table of contents

### Properties

* [bounds](/auto-docs/free-layout-core/interfaces/WorkflowLineRenderContribution.md#bounds)
* [calcDistance](/auto-docs/free-layout-core/interfaces/WorkflowLineRenderContribution.md#calcdistance)
* [center](/auto-docs/free-layout-core/interfaces/WorkflowLineRenderContribution.md#center)
* [entity](/auto-docs/free-layout-core/interfaces/WorkflowLineRenderContribution.md#entity)
* [path](/auto-docs/free-layout-core/interfaces/WorkflowLineRenderContribution.md#path)
* [update](/auto-docs/free-layout-core/interfaces/WorkflowLineRenderContribution.md#update)

## Properties

### bounds

**bounds**: `Rectangle`

***

### calcDistance

**calcDistance**: (`pos`: `IPoint`) => `number`

#### Type declaration

(`pos`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | `IPoint` |

##### Returns

`number`

***

### center

`Optional` **center**: [`LineCenterPoint`](/auto-docs/free-layout-core/interfaces/LineCenterPoint.md)

***

### entity

**entity**: [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)

***

### path

**path**: `string`

***

### update

**update**: (`params`: { `fromPos`: [`LinePoint`](/auto-docs/free-layout-core/interfaces/LinePoint.md) ; `toPos`: [`LinePoint`](/auto-docs/free-layout-core/interfaces/LinePoint.md)  }) => `void`

#### Type declaration

(`params`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.fromPos` | [`LinePoint`](/auto-docs/free-layout-core/interfaces/LinePoint.md) |
| `params.toPos` | [`LinePoint`](/auto-docs/free-layout-core/interfaces/LinePoint.md) |

##### Returns

`void`
