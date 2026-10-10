# Interface: CallNodePanelParams

## Hierarchy

* **`CallNodePanelParams`**

  ↳ [`NodePanelRenderProps`](/auto-docs/free-node-panel-plugin/interfaces/NodePanelRenderProps.md)

## Table of contents

### Properties

* [containerNode](/auto-docs/free-node-panel-plugin/interfaces/CallNodePanelParams.md#containernode)
* [enableMultiAdd](/auto-docs/free-node-panel-plugin/interfaces/CallNodePanelParams.md#enablemultiadd)
* [onClose](/auto-docs/free-node-panel-plugin/interfaces/CallNodePanelParams.md#onclose)
* [onSelect](/auto-docs/free-node-panel-plugin/interfaces/CallNodePanelParams.md#onselect)
* [panelProps](/auto-docs/free-node-panel-plugin/interfaces/CallNodePanelParams.md#panelprops)
* [position](/auto-docs/free-node-panel-plugin/interfaces/CallNodePanelParams.md#position)

## Properties

### containerNode

`Optional` **containerNode**: `FlowNodeEntity`

***

### enableMultiAdd

`Optional` **enableMultiAdd**: `boolean`

***

### onClose

**onClose**: () => `void`

#### Type declaration

(): `void`

##### Returns

`void`

***

### onSelect

**onSelect**: (`params?`: [`NodePanelResult`](/auto-docs/free-node-panel-plugin/types/NodePanelResult.md)) => `void`

#### Type declaration

(`params?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`NodePanelResult`](/auto-docs/free-node-panel-plugin/types/NodePanelResult.md) |

##### Returns

`void`

***

### panelProps

`Optional` **panelProps**: `Record`<`string`, `any`>

***

### position

**position**: `PositionSchema`
