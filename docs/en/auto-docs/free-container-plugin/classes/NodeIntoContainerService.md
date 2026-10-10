# Class: NodeIntoContainerService

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-container-plugin/classes/NodeIntoContainerService.md#constructor)

### Properties

* [on](/en/auto-docs/free-container-plugin/classes/NodeIntoContainerService.md#on)
* [state](/en/auto-docs/free-container-plugin/classes/NodeIntoContainerService.md#state)

### Methods

* [canMoveOutContainer](/en/auto-docs/free-container-plugin/classes/NodeIntoContainerService.md#canmoveoutcontainer)
* [clearInvalidLines](/en/auto-docs/free-container-plugin/classes/NodeIntoContainerService.md#clearinvalidlines)
* [dispose](/en/auto-docs/free-container-plugin/classes/NodeIntoContainerService.md#dispose)
* [init](/en/auto-docs/free-container-plugin/classes/NodeIntoContainerService.md#init)
* [moveOutContainer](/en/auto-docs/free-container-plugin/classes/NodeIntoContainerService.md#moveoutcontainer)
* [ready](/en/auto-docs/free-container-plugin/classes/NodeIntoContainerService.md#ready)
* [removeNodeLines](/en/auto-docs/free-container-plugin/classes/NodeIntoContainerService.md#removenodelines)

## Constructors

### constructor

**new NodeIntoContainerService**()

## Properties

### on

`Readonly` **on**: `Event`<[`NodeIntoContainerEvent`](/en/auto-docs/free-container-plugin/interfaces/NodeIntoContainerEvent.md)>

***

### state

**state**: [`NodeIntoContainerState`](/en/auto-docs/free-container-plugin/interfaces/NodeIntoContainerState.md)

## Methods

### canMoveOutContainer

**canMoveOutContainer**(`node`): `boolean`

能否将节点移出容器

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntity` |

#### Returns

`boolean`

***

### clearInvalidLines

**clearInvalidLines**(`params`): `Promise`<`void`>

移除节点所有非法连线

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.dragNode?` | `FlowNodeEntity` |
| `params.sourceParent?` | `FlowNodeEntity` |

#### Returns

`Promise`<`void`>

***

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### init

**init**(): `void`

#### Returns

`void`

***

### moveOutContainer

**moveOutContainer**(`params`): `Promise`<`void`>

将节点移出容器

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.node` | `FlowNodeEntity` |

#### Returns

`Promise`<`void`>

***

### ready

**ready**(): `void`

#### Returns

`void`

***

### removeNodeLines

**removeNodeLines**(`node`): `Promise`<`void`>

移除节点连线

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntity` |

#### Returns

`Promise`<`void`>
