# Interface: IExecutor

## Table of contents

### Properties

* [execute](/en/auto-docs/interface/interfaces/IExecutor.md#execute)
* [register](/en/auto-docs/interface/interfaces/IExecutor.md#register)

## Properties

### execute

**execute**: (`context`: [`ExecutionContext`](/en/auto-docs/interface/interfaces/ExecutionContext.md)) => `Promise`<[`ExecutionResult`](/en/auto-docs/interface/interfaces/ExecutionResult.md)>

#### Type declaration

(`context`): `Promise`<[`ExecutionResult`](/en/auto-docs/interface/interfaces/ExecutionResult.md)>

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`ExecutionContext`](/en/auto-docs/interface/interfaces/ExecutionContext.md) |

##### Returns

`Promise`<[`ExecutionResult`](/en/auto-docs/interface/interfaces/ExecutionResult.md)>

***

### register

**register**: (`executor`: [`INodeExecutor`](/en/auto-docs/interface/interfaces/INodeExecutor.md)) => `void`

#### Type declaration

(`executor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `executor` | [`INodeExecutor`](/en/auto-docs/interface/interfaces/INodeExecutor.md) |

##### Returns

`void`
