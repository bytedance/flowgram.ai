# Class: FixedHistoryOperationService

## Hierarchy

* `FlowOperationBaseServiceImpl`

  ↳ **`FixedHistoryOperationService`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryOperationService.md#constructor)

### Properties

* [historyService](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryOperationService.md#historyservice)
* [onNodeAdd](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryOperationService.md#onnodeadd)
* [onNodeMove](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryOperationService.md#onnodemove)

### Methods

* [addBlock](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryOperationService.md#addblock)
* [addFromNode](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryOperationService.md#addfromnode)
* [addNode](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryOperationService.md#addnode)
* [apply](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryOperationService.md#apply)
* [deleteNode](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryOperationService.md#deletenode)
* [deleteNodes](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryOperationService.md#deletenodes)
* [dispose](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryOperationService.md#dispose)
* [dragNodes](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryOperationService.md#dragnodes)
* [moveNode](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryOperationService.md#movenode)
* [originApply](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryOperationService.md#originapply)
* [transact](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryOperationService.md#transact)

## Constructors

### constructor

**new FixedHistoryOperationService**()

#### Inherited from

FlowOperationBaseServiceImpl.constructor

## Properties

### historyService

**historyService**: [`HistoryService`](/en/auto-docs/fixed-history-plugin/classes/HistoryService.md)

***

### onNodeAdd

`Readonly` **onNodeAdd**: `Event`<`OnNodeAddEvent`>

#### Inherited from

FlowOperationBaseServiceImpl.onNodeAdd

***

### onNodeMove

`Readonly` **onNodeMove**: `Event`<`OnNodeMoveEvent`>

#### Inherited from

FlowOperationBaseServiceImpl.onNodeMove

## Methods

### addBlock

**addBlock**(`target`, `blockJSON`, `config?`): `FlowNodeEntity`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `FlowNodeEntityOrId` |
| `blockJSON` | `FlowNodeJSON` |
| `config?` | `AddBlockConfig` |

#### Returns

`FlowNodeEntity`

#### Inherited from

FlowOperationBaseServiceImpl.addBlock

***

### addFromNode

**addFromNode**(`fromNode`, `nodeJSON`): `FlowNodeEntity`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | `FlowNodeEntityOrId` |
| `nodeJSON` | `FlowNodeJSON` |

#### Returns

`FlowNodeEntity`

#### Inherited from

FlowOperationBaseServiceImpl.addFromNode

***

### addNode

**addNode**(`nodeJSON`, `config?`): `FlowNodeEntity`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeJSON` | `FlowNodeJSON` |
| `config?` | `AddNodeConfig` |

#### Returns

`FlowNodeEntity`

#### Inherited from

FlowOperationBaseServiceImpl.addNode

***

### apply

**apply**(`operation`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operation` | `FlowOperation` |

#### Returns

`any`

#### Overrides

FlowOperationBaseServiceImpl.apply

***

### deleteNode

**deleteNode**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntityOrId` |

#### Returns

`void`

#### Inherited from

FlowOperationBaseServiceImpl.deleteNode

***

### deleteNodes

**deleteNodes**(`nodes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | `FlowNodeEntityOrId`\[] |

#### Returns

`void`

#### Inherited from

FlowOperationBaseServiceImpl.deleteNodes

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

FlowOperationBaseServiceImpl.dispose

***

### dragNodes

**dragNodes**(`param0`): `any`

拖拽节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `param0` | `Object` |
| `param0.dropNode` | `FlowNodeEntity` |
| `param0.nodes` | `FlowNodeEntity`\[] |

#### Returns

`any`

#### Inherited from

FlowOperationBaseServiceImpl.dragNodes

***

### moveNode

**moveNode**(`node`, `config?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntityOrId` |
| `config?` | `MoveNodeConfig` |

#### Returns

`void`

#### Inherited from

FlowOperationBaseServiceImpl.moveNode

***

### originApply

**originApply**(`operation`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operation` | `FlowOperation` |

#### Returns

`any`

***

### transact

**transact**(`transaction`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | () => `void` |

#### Returns

`void`

#### Overrides

FlowOperationBaseServiceImpl.transact
