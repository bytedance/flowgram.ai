# Interface: WorkflowLineRenderContribution

## Table of contents

### Properties

* [bounds](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderContribution.md#bounds)
* [calcDistance](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderContribution.md#calcdistance)
* [center](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderContribution.md#center)
* [entity](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderContribution.md#entity)
* [path](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderContribution.md#path)
* [update](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderContribution.md#update)

## Properties

### bounds

**bounds**: [`Rectangle`](/en/auto-docs/free-layout-editor/classes/Rectangle-1.md)

***

### calcDistance

**calcDistance**: (`pos`: [`IPoint`](/en/auto-docs/free-layout-editor/interfaces/IPoint.md)) => `number`

#### Type declaration

(`pos`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | [`IPoint`](/en/auto-docs/free-layout-editor/interfaces/IPoint.md) |

##### Returns

`number`

***

### center

`Optional` **center**: [`LineCenterPoint`](/en/auto-docs/free-layout-editor/interfaces/LineCenterPoint.md)

***

### entity

**entity**: [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)

***

### path

**path**: `string`

***

### update

**update**: (`params`: { `fromPos`: [`LinePoint`](/en/auto-docs/free-layout-editor/interfaces/LinePoint.md) ; `toPos`: [`LinePoint`](/en/auto-docs/free-layout-editor/interfaces/LinePoint.md)  }) => `void`

#### Type declaration

(`params`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.fromPos` | [`LinePoint`](/en/auto-docs/free-layout-editor/interfaces/LinePoint.md) |
| `params.toPos` | [`LinePoint`](/en/auto-docs/free-layout-editor/interfaces/LinePoint.md) |

##### Returns

`void`
