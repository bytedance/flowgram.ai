# Interface: FlowDragOptions

## Table of contents

### Properties

* [canDrop](/auto-docs/free-layout-editor/interfaces/FlowDragOptions.md#candrop)
* [onDrop](/auto-docs/free-layout-editor/interfaces/FlowDragOptions.md#ondrop)

## Properties

### canDrop

`Optional` **canDrop**: (`opts`: `Object`) => `boolean`

#### Type declaration

(`opts`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |

##### Returns

`boolean`

***

### onDrop

`Optional` **onDrop**: (`opts`: { `dragNodes`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] ; `dropNode`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)  }) => `void`

#### Type declaration

(`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.dragNodes` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |
| `opts.dropNode` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

##### Returns

`void`
