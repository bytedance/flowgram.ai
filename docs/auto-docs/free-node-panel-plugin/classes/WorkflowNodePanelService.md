# Class: WorkflowNodePanelService

添加节点面板服务

## Table of contents

### Constructors

* [constructor](/auto-docs/free-node-panel-plugin/classes/WorkflowNodePanelService.md#constructor)

### Properties

* [callNodePanel](/auto-docs/free-node-panel-plugin/classes/WorkflowNodePanelService.md#callnodepanel)

### Methods

* [call](/auto-docs/free-node-panel-plugin/classes/WorkflowNodePanelService.md#call)
* [dispose](/auto-docs/free-node-panel-plugin/classes/WorkflowNodePanelService.md#dispose)
* [setCallNodePanel](/auto-docs/free-node-panel-plugin/classes/WorkflowNodePanelService.md#setcallnodepanel)
* [singleSelectNodePanel](/auto-docs/free-node-panel-plugin/classes/WorkflowNodePanelService.md#singleselectnodepanel)

## Constructors

### constructor

**new WorkflowNodePanelService**()

## Properties

### callNodePanel

**callNodePanel**: `CallNodePanel`

## Methods

### call

**call**(`callParams`): `Promise`<`undefined` | `FlowNodeEntity` | `FlowNodeEntity`\[]>

唤起节点面板

#### Parameters

| Name | Type |
| :------ | :------ |
| `callParams` | `NodePanelCallParams` |

#### Returns

`Promise`<`undefined` | `FlowNodeEntity` | `FlowNodeEntity`\[]>

***

### dispose

**dispose**(): `void`

销毁

#### Returns

`void`

***

### setCallNodePanel

**setCallNodePanel**(`callNodePanel`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callNodePanel` | `CallNodePanel` |

#### Returns

`void`

***

### singleSelectNodePanel

**singleSelectNodePanel**(`params`): `Promise`<[`NodePanelResult`](/auto-docs/free-node-panel-plugin/types/NodePanelResult.md)>

唤起单选面板

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Omit`<[`CallNodePanelParams`](/auto-docs/free-node-panel-plugin/interfaces/CallNodePanelParams.md), `"onSelect"` | `"onClose"` | `"enableMultiAdd"`> |

#### Returns

`Promise`<[`NodePanelResult`](/auto-docs/free-node-panel-plugin/types/NodePanelResult.md)>
