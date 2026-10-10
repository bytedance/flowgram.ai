# Interface: WorkflowLineRenderContribution

## Table of contents

### Properties

* [bounds](/en/auto-docs/free-layout-core/interfaces/WorkflowLineRenderContribution.md#bounds)
* [calcDistance](/en/auto-docs/free-layout-core/interfaces/WorkflowLineRenderContribution.md#calcdistance)
* [center](/en/auto-docs/free-layout-core/interfaces/WorkflowLineRenderContribution.md#center)
* [entity](/en/auto-docs/free-layout-core/interfaces/WorkflowLineRenderContribution.md#entity)
* [path](/en/auto-docs/free-layout-core/interfaces/WorkflowLineRenderContribution.md#path)
* [update](/en/auto-docs/free-layout-core/interfaces/WorkflowLineRenderContribution.md#update)

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

`Optional` **center**: [`LineCenterPoint`](/en/auto-docs/free-layout-core/interfaces/LineCenterPoint.md)

***

### entity

**entity**: [`WorkflowLineEntity`](/en/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)

***

### path

**path**: `string`

***

### update

**update**: (`params`: { `fromPos`: [`LinePoint`](/en/auto-docs/free-layout-core/interfaces/LinePoint.md) ; `toPos`: [`LinePoint`](/en/auto-docs/free-layout-core/interfaces/LinePoint.md)  }) => `void`

#### Type declaration

(`params`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.fromPos` | [`LinePoint`](/en/auto-docs/free-layout-core/interfaces/LinePoint.md) |
| `params.toPos` | [`LinePoint`](/en/auto-docs/free-layout-core/interfaces/LinePoint.md) |

##### Returns

`void`
