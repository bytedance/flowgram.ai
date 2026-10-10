# Interface: CallNodePanelParams

## Hierarchy

* **`CallNodePanelParams`**

  ↳ [`NodePanelRenderProps`](/en/auto-docs/free-node-panel-plugin/interfaces/NodePanelRenderProps.md)

## Table of contents

### Properties

* [containerNode](/en/auto-docs/free-node-panel-plugin/interfaces/CallNodePanelParams.md#containernode)
* [enableMultiAdd](/en/auto-docs/free-node-panel-plugin/interfaces/CallNodePanelParams.md#enablemultiadd)
* [onClose](/en/auto-docs/free-node-panel-plugin/interfaces/CallNodePanelParams.md#onclose)
* [onSelect](/en/auto-docs/free-node-panel-plugin/interfaces/CallNodePanelParams.md#onselect)
* [panelProps](/en/auto-docs/free-node-panel-plugin/interfaces/CallNodePanelParams.md#panelprops)
* [position](/en/auto-docs/free-node-panel-plugin/interfaces/CallNodePanelParams.md#position)

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

**onSelect**: (`params?`: [`NodePanelResult`](/en/auto-docs/free-node-panel-plugin/types/NodePanelResult.md)) => `void`

#### Type declaration

(`params?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`NodePanelResult`](/en/auto-docs/free-node-panel-plugin/types/NodePanelResult.md) |

##### Returns

`void`

***

### panelProps

`Optional` **panelProps**: `Record`<`string`, `any`>

***

### position

**position**: `PositionSchema`
