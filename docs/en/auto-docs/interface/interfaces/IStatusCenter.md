# Interface: IStatusCenter

## Table of contents

### Properties

* [workflow](/en/auto-docs/interface/interfaces/IStatusCenter.md#workflow)

### Methods

* [dispose](/en/auto-docs/interface/interfaces/IStatusCenter.md#dispose)
* [exportNodeStatus](/en/auto-docs/interface/interfaces/IStatusCenter.md#exportnodestatus)
* [getStatusNodeIDs](/en/auto-docs/interface/interfaces/IStatusCenter.md#getstatusnodeids)
* [init](/en/auto-docs/interface/interfaces/IStatusCenter.md#init)
* [nodeStatus](/en/auto-docs/interface/interfaces/IStatusCenter.md#nodestatus)

## Properties

### workflow

**workflow**: [`IStatus`](/en/auto-docs/interface/interfaces/IStatus.md)

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### exportNodeStatus

**exportNodeStatus**(): `Record`<`string`, [`StatusData`](/en/auto-docs/interface/interfaces/StatusData.md)>

#### Returns

`Record`<`string`, [`StatusData`](/en/auto-docs/interface/interfaces/StatusData.md)>

***

### getStatusNodeIDs

**getStatusNodeIDs**(`status`): `string`\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | [`WorkflowStatus`](/en/auto-docs/interface/enums/WorkflowStatus.md) |

#### Returns

`string`\[]

***

### init

**init**(): `void`

#### Returns

`void`

***

### nodeStatus

**nodeStatus**(`nodeID`): [`IStatus`](/en/auto-docs/interface/interfaces/IStatus.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeID` | `string` |

#### Returns

[`IStatus`](/en/auto-docs/interface/interfaces/IStatus.md)
