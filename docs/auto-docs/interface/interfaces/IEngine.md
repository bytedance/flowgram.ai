# Interface: IEngine

## Table of contents

### Methods

* [executeNode](/auto-docs/interface/interfaces/IEngine.md#executenode)
* [invoke](/auto-docs/interface/interfaces/IEngine.md#invoke)

## Methods

### executeNode

**executeNode**(`params`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.context` | [`IContext`](/auto-docs/interface/interfaces/IContext.md) |
| `params.node` | [`INode`](/auto-docs/interface/interfaces/INode.md)<`any`> |

#### Returns

`Promise`<`void`>

***

### invoke

**invoke**(`params`): [`ITask`](/auto-docs/interface/interfaces/ITask.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`InvokeParams`](/auto-docs/interface/interfaces/InvokeParams.md) |

#### Returns

[`ITask`](/auto-docs/interface/interfaces/ITask.md)
