# Interface: LayoutOptions

## Table of contents

### Properties

* [alignTopEdge](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutOptions.md#aligntopedge)
* [animationDuration](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutOptions.md#animationduration)
* [containerNode](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutOptions.md#containernode)
* [disableFitView](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutOptions.md#disablefitview)
* [enableAnimation](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutOptions.md#enableanimation)
* [filterLine](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutOptions.md#filterline)
* [filterNode](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutOptions.md#filternode)
* [getFollowNode](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutOptions.md#getfollownode)
* [layoutConfig](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutOptions.md#layoutconfig)

## Properties

### alignTopEdge

`Optional` **alignTopEdge**: `boolean`

When true, aligns nodes by their top edge instead of their center point.
Defaults to false (center-aligned). Set to true to place all nodes' top edges on the same horizontal line.

***

### animationDuration

`Optional` **animationDuration**: `number`

Duration of the position animation in milliseconds. Only effective when `enableAnimation` is true.

***

### containerNode

`Optional` **containerNode**: `FlowNodeEntity`

The container node entity used as the root for the layout.

***

### disableFitView

`Optional` **disableFitView**: `boolean`

When true, skips the fit-view step after layout is applied.

***

### enableAnimation

`Optional` **enableAnimation**: `boolean`

Whether to animate node movements during layout positioning.

***

### filterLine

`Optional` **filterLine**: (`params`: { `line`: `WorkflowLineEntity`  }) => `boolean`

#### Type declaration

(`params`): `boolean`

Filter function to exclude specific edges from the layout. Return false to skip an edge.

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.line` | `WorkflowLineEntity` |

##### Returns

`boolean`

***

### filterNode

`Optional` **filterNode**: (`params`: { `node`: `FlowNodeEntity` ; `parent?`: `FlowNodeEntity`  }) => `boolean`

#### Type declaration

(`params`): `boolean`

Filter function to exclude specific nodes from the layout. Return false to skip a node.

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.node` | `FlowNodeEntity` |
| `params.parent?` | `FlowNodeEntity` |

##### Returns

`boolean`

***

### getFollowNode

`Optional` **getFollowNode**: [`GetFollowNode`](/en/auto-docs/free-auto-layout-plugin/types/GetFollowNode.md)

Custom function to determine follow-node relationships between layout nodes.

***

### layoutConfig

`Optional` **layoutConfig**: `Partial`<`LayoutConfig`>

Custom layout configuration to override default dagre settings.
