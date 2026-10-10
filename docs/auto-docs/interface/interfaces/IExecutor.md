# Interface: IExecutor

## Table of contents

### Properties

* [execute](/auto-docs/interface/interfaces/IExecutor.md#execute)
* [register](/auto-docs/interface/interfaces/IExecutor.md#register)

## Properties

### execute

**execute**: (`context`: [`ExecutionContext`](/auto-docs/interface/interfaces/ExecutionContext.md)) => `Promise`<[`ExecutionResult`](/auto-docs/interface/interfaces/ExecutionResult.md)>

#### Type declaration

(`context`): `Promise`<[`ExecutionResult`](/auto-docs/interface/interfaces/ExecutionResult.md)>

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`ExecutionContext`](/auto-docs/interface/interfaces/ExecutionContext.md) |

##### Returns

`Promise`<[`ExecutionResult`](/auto-docs/interface/interfaces/ExecutionResult.md)>

***

### register

**register**: (`executor`: [`INodeExecutor`](/auto-docs/interface/interfaces/INodeExecutor.md)) => `void`

#### Type declaration

(`executor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `executor` | [`INodeExecutor`](/auto-docs/interface/interfaces/INodeExecutor.md) |

##### Returns

`void`
