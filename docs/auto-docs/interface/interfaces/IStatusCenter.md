# Interface: IStatusCenter

## Table of contents

### Properties

* [workflow](/auto-docs/interface/interfaces/IStatusCenter.md#workflow)

### Methods

* [dispose](/auto-docs/interface/interfaces/IStatusCenter.md#dispose)
* [exportNodeStatus](/auto-docs/interface/interfaces/IStatusCenter.md#exportnodestatus)
* [getStatusNodeIDs](/auto-docs/interface/interfaces/IStatusCenter.md#getstatusnodeids)
* [init](/auto-docs/interface/interfaces/IStatusCenter.md#init)
* [nodeStatus](/auto-docs/interface/interfaces/IStatusCenter.md#nodestatus)

## Properties

### workflow

**workflow**: [`IStatus`](/auto-docs/interface/interfaces/IStatus.md)

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### exportNodeStatus

**exportNodeStatus**(): `Record`<`string`, [`StatusData`](/auto-docs/interface/interfaces/StatusData.md)>

#### Returns

`Record`<`string`, [`StatusData`](/auto-docs/interface/interfaces/StatusData.md)>

***

### getStatusNodeIDs

**getStatusNodeIDs**(`status`): `string`\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | [`WorkflowStatus`](/auto-docs/interface/enums/WorkflowStatus.md) |

#### Returns

`string`\[]

***

### init

**init**(): `void`

#### Returns

`void`

***

### nodeStatus

**nodeStatus**(`nodeID`): [`IStatus`](/auto-docs/interface/interfaces/IStatus.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeID` | `string` |

#### Returns

[`IStatus`](/auto-docs/interface/interfaces/IStatus.md)
