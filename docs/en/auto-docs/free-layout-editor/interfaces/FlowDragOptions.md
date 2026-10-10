# Interface: FlowDragOptions

## Table of contents

### Properties

* [canDrop](/en/auto-docs/free-layout-editor/interfaces/FlowDragOptions.md#candrop)
* [onDrop](/en/auto-docs/free-layout-editor/interfaces/FlowDragOptions.md#ondrop)

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

`Optional` **onDrop**: (`opts`: { `dragNodes`: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] ; `dropNode`: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)  }) => `void`

#### Type declaration

(`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.dragNodes` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |
| `opts.dropNode` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

##### Returns

`void`
