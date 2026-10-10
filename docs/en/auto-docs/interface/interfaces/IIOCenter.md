# Interface: IIOCenter

Input & Output

## Table of contents

### Properties

* [inputs](/en/auto-docs/interface/interfaces/IIOCenter.md#inputs)
* [outputs](/en/auto-docs/interface/interfaces/IIOCenter.md#outputs)

### Methods

* [dispose](/en/auto-docs/interface/interfaces/IIOCenter.md#dispose)
* [export](/en/auto-docs/interface/interfaces/IIOCenter.md#export)
* [init](/en/auto-docs/interface/interfaces/IIOCenter.md#init)
* [setInputs](/en/auto-docs/interface/interfaces/IIOCenter.md#setinputs)
* [setOutputs](/en/auto-docs/interface/interfaces/IIOCenter.md#setoutputs)

## Properties

### inputs

**inputs**: [`WorkflowInputs`](/en/auto-docs/interface/types/WorkflowInputs.md)

***

### outputs

**outputs**: [`WorkflowOutputs`](/en/auto-docs/interface/types/WorkflowOutputs.md)

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### export

**export**(): [`IOData`](/en/auto-docs/interface/interfaces/IOData.md)

#### Returns

[`IOData`](/en/auto-docs/interface/interfaces/IOData.md)

***

### init

**init**(`inputs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputs` | [`WorkflowInputs`](/en/auto-docs/interface/types/WorkflowInputs.md) |

#### Returns

`void`

***

### setInputs

**setInputs**(`inputs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputs` | [`WorkflowInputs`](/en/auto-docs/interface/types/WorkflowInputs.md) |

#### Returns

`void`

***

### setOutputs

**setOutputs**(`outputs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `outputs` | [`WorkflowOutputs`](/en/auto-docs/interface/types/WorkflowOutputs.md) |

#### Returns

`void`
