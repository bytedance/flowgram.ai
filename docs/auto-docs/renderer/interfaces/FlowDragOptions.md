# Interface: FlowDragOptions

## Table of contents

### Properties

* [canDrop](/auto-docs/renderer/interfaces/FlowDragOptions.md#candrop)
* [onDrop](/auto-docs/renderer/interfaces/FlowDragOptions.md#ondrop)

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

`Optional` **onDrop**: (`opts`: { `dragNodes`: `FlowNodeEntity`\[] ; `dropNode`: `FlowNodeEntity`  }) => `void`

#### Type declaration

(`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.dragNodes` | `FlowNodeEntity`\[] |
| `opts.dropNode` | `FlowNodeEntity` |

##### Returns

`void`
