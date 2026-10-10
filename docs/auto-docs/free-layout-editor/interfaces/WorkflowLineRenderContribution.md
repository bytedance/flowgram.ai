# Interface: WorkflowLineRenderContribution

## Table of contents

### Properties

* [bounds](/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderContribution.md#bounds)
* [calcDistance](/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderContribution.md#calcdistance)
* [center](/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderContribution.md#center)
* [entity](/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderContribution.md#entity)
* [path](/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderContribution.md#path)
* [update](/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderContribution.md#update)

## Properties

### bounds

**bounds**: [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

***

### calcDistance

**calcDistance**: (`pos`: [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)) => `number`

#### Type declaration

(`pos`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md) |

##### Returns

`number`

***

### center

`Optional` **center**: [`LineCenterPoint`](/auto-docs/free-layout-editor/interfaces/LineCenterPoint.md)

***

### entity

**entity**: [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)

***

### path

**path**: `string`

***

### update

**update**: (`params`: { `fromPos`: [`LinePoint`](/auto-docs/free-layout-editor/interfaces/LinePoint.md) ; `toPos`: [`LinePoint`](/auto-docs/free-layout-editor/interfaces/LinePoint.md)  }) => `void`

#### Type declaration

(`params`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.fromPos` | [`LinePoint`](/auto-docs/free-layout-editor/interfaces/LinePoint.md) |
| `params.toPos` | [`LinePoint`](/auto-docs/free-layout-editor/interfaces/LinePoint.md) |

##### Returns

`void`
