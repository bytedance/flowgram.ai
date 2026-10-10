# Interface: IState

## Table of contents

### Properties

* [id](/en/auto-docs/interface/interfaces/IState.md#id)
* [variableStore](/en/auto-docs/interface/interfaces/IState.md#variablestore)

### Methods

* [addExecutedNode](/en/auto-docs/interface/interfaces/IState.md#addexecutednode)
* [dispose](/en/auto-docs/interface/interfaces/IState.md#dispose)
* [getNodeInputs](/en/auto-docs/interface/interfaces/IState.md#getnodeinputs)
* [init](/en/auto-docs/interface/interfaces/IState.md#init)
* [isExecutedNode](/en/auto-docs/interface/interfaces/IState.md#isexecutednode)
* [parseFlowValue](/en/auto-docs/interface/interfaces/IState.md#parseflowvalue)
* [parseInputs](/en/auto-docs/interface/interfaces/IState.md#parseinputs)
* [parseRef](/en/auto-docs/interface/interfaces/IState.md#parseref)
* [parseTemplate](/en/auto-docs/interface/interfaces/IState.md#parsetemplate)
* [setNodeOutputs](/en/auto-docs/interface/interfaces/IState.md#setnodeoutputs)

## Properties

### id

**id**: `string`

***

### variableStore

**variableStore**: [`IVariableStore`](/en/auto-docs/interface/interfaces/IVariableStore.md)

## Methods

### addExecutedNode

**addExecutedNode**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`INode`](/en/auto-docs/interface/interfaces/INode.md)<`any`> |

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### getNodeInputs

**getNodeInputs**(`node`): [`WorkflowInputs`](/en/auto-docs/interface/types/WorkflowInputs.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`INode`](/en/auto-docs/interface/interfaces/INode.md)<`any`> |

#### Returns

[`WorkflowInputs`](/en/auto-docs/interface/types/WorkflowInputs.md)

***

### init

**init**(`schema?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema?` | [`WorkflowSchema`](/en/auto-docs/interface/interfaces/WorkflowSchema.md) |

#### Returns

`void`

***

### isExecutedNode

**isExecutedNode**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`INode`](/en/auto-docs/interface/interfaces/INode.md)<`any`> |

#### Returns

`boolean`

***

### parseFlowValue

**parseFlowValue**<`T`>(`params`): `null` | [`IVariableParseResult`](/en/auto-docs/interface/interfaces/IVariableParseResult.md)<`T`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.declareType` | [`WorkflowVariableType`](/en/auto-docs/interface/enums/WorkflowVariableType.md) |
| `params.flowValue` | [`IFlowValue`](/en/auto-docs/interface/types/IFlowValue.md) |

#### Returns

`null` | [`IVariableParseResult`](/en/auto-docs/interface/interfaces/IVariableParseResult.md)<`T`>

***

### parseInputs

**parseInputs**(`params`): [`WorkflowInputs`](/en/auto-docs/interface/types/WorkflowInputs.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.declare` | [`IJsonSchema`](/en/auto-docs/interface/interfaces/IJsonSchema.md)<`string`> |
| `params.values` | `Record`<`string`, [`IFlowValue`](/en/auto-docs/interface/types/IFlowValue.md)> |

#### Returns

[`WorkflowInputs`](/en/auto-docs/interface/types/WorkflowInputs.md)

***

### parseRef

**parseRef**<`T`>(`ref`): `null` | [`IVariableParseResult`](/en/auto-docs/interface/interfaces/IVariableParseResult.md)<`T`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | [`IFlowRefValue`](/en/auto-docs/interface/interfaces/IFlowRefValue.md) |

#### Returns

`null` | [`IVariableParseResult`](/en/auto-docs/interface/interfaces/IVariableParseResult.md)<`T`>

***

### parseTemplate

**parseTemplate**(`template`): `null` | [`IVariableParseResult`](/en/auto-docs/interface/interfaces/IVariableParseResult.md)<`string`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `template` | [`IFlowTemplateValue`](/en/auto-docs/interface/interfaces/IFlowTemplateValue.md) |

#### Returns

`null` | [`IVariableParseResult`](/en/auto-docs/interface/interfaces/IVariableParseResult.md)<`string`>

***

### setNodeOutputs

**setNodeOutputs**(`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.node` | [`INode`](/en/auto-docs/interface/interfaces/INode.md)<`any`> |
| `params.outputs` | [`WorkflowOutputs`](/en/auto-docs/interface/types/WorkflowOutputs.md) |

#### Returns

`void`
