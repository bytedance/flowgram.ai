# Interface: IEngine

## Table of contents

### Methods

* [executeNode](/en/auto-docs/interface/interfaces/IEngine.md#executenode)
* [invoke](/en/auto-docs/interface/interfaces/IEngine.md#invoke)

## Methods

### executeNode

**executeNode**(`params`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.context` | [`IContext`](/en/auto-docs/interface/interfaces/IContext.md) |
| `params.node` | [`INode`](/en/auto-docs/interface/interfaces/INode.md)<`any`> |

#### Returns

`Promise`<`void`>

***

### invoke

**invoke**(`params`): [`ITask`](/en/auto-docs/interface/interfaces/ITask.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`InvokeParams`](/en/auto-docs/interface/interfaces/InvokeParams.md) |

#### Returns

[`ITask`](/en/auto-docs/interface/interfaces/ITask.md)
