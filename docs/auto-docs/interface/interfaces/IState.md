# Interface: IState

## Table of contents

### Properties

* [id](/auto-docs/interface/interfaces/IState.md#id)
* [variableStore](/auto-docs/interface/interfaces/IState.md#variablestore)

### Methods

* [addExecutedNode](/auto-docs/interface/interfaces/IState.md#addexecutednode)
* [dispose](/auto-docs/interface/interfaces/IState.md#dispose)
* [getNodeInputs](/auto-docs/interface/interfaces/IState.md#getnodeinputs)
* [init](/auto-docs/interface/interfaces/IState.md#init)
* [isExecutedNode](/auto-docs/interface/interfaces/IState.md#isexecutednode)
* [parseFlowValue](/auto-docs/interface/interfaces/IState.md#parseflowvalue)
* [parseInputs](/auto-docs/interface/interfaces/IState.md#parseinputs)
* [parseRef](/auto-docs/interface/interfaces/IState.md#parseref)
* [parseTemplate](/auto-docs/interface/interfaces/IState.md#parsetemplate)
* [setNodeOutputs](/auto-docs/interface/interfaces/IState.md#setnodeoutputs)

## Properties

### id

**id**: `string`

***

### variableStore

**variableStore**: [`IVariableStore`](/auto-docs/interface/interfaces/IVariableStore.md)

## Methods

### addExecutedNode

**addExecutedNode**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`INode`](/auto-docs/interface/interfaces/INode.md)<`any`> |

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### getNodeInputs

**getNodeInputs**(`node`): [`WorkflowInputs`](/auto-docs/interface/types/WorkflowInputs.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`INode`](/auto-docs/interface/interfaces/INode.md)<`any`> |

#### Returns

[`WorkflowInputs`](/auto-docs/interface/types/WorkflowInputs.md)

***

### init

**init**(`schema?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema?` | [`WorkflowSchema`](/auto-docs/interface/interfaces/WorkflowSchema.md) |

#### Returns

`void`

***

### isExecutedNode

**isExecutedNode**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`INode`](/auto-docs/interface/interfaces/INode.md)<`any`> |

#### Returns

`boolean`

***

### parseFlowValue

**parseFlowValue**<`T`>(`params`): `null` | [`IVariableParseResult`](/auto-docs/interface/interfaces/IVariableParseResult.md)<`T`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.declareType` | [`WorkflowVariableType`](/auto-docs/interface/enums/WorkflowVariableType.md) |
| `params.flowValue` | [`IFlowValue`](/auto-docs/interface/types/IFlowValue.md) |

#### Returns

`null` | [`IVariableParseResult`](/auto-docs/interface/interfaces/IVariableParseResult.md)<`T`>

***

### parseInputs

**parseInputs**(`params`): [`WorkflowInputs`](/auto-docs/interface/types/WorkflowInputs.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.declare` | [`IJsonSchema`](/auto-docs/interface/interfaces/IJsonSchema.md)<`string`> |
| `params.values` | `Record`<`string`, [`IFlowValue`](/auto-docs/interface/types/IFlowValue.md)> |

#### Returns

[`WorkflowInputs`](/auto-docs/interface/types/WorkflowInputs.md)

***

### parseRef

**parseRef**<`T`>(`ref`): `null` | [`IVariableParseResult`](/auto-docs/interface/interfaces/IVariableParseResult.md)<`T`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | [`IFlowRefValue`](/auto-docs/interface/interfaces/IFlowRefValue.md) |

#### Returns

`null` | [`IVariableParseResult`](/auto-docs/interface/interfaces/IVariableParseResult.md)<`T`>

***

### parseTemplate

**parseTemplate**(`template`): `null` | [`IVariableParseResult`](/auto-docs/interface/interfaces/IVariableParseResult.md)<`string`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `template` | [`IFlowTemplateValue`](/auto-docs/interface/interfaces/IFlowTemplateValue.md) |

#### Returns

`null` | [`IVariableParseResult`](/auto-docs/interface/interfaces/IVariableParseResult.md)<`string`>

***

### setNodeOutputs

**setNodeOutputs**(`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.node` | [`INode`](/auto-docs/interface/interfaces/INode.md)<`any`> |
| `params.outputs` | [`WorkflowOutputs`](/auto-docs/interface/types/WorkflowOutputs.md) |

#### Returns

`void`
