# Class: PromisePool

## Table of contents

### Constructors

* [constructor](/en/auto-docs/utils/classes/PromisePool.md#constructor)

### Methods

* [run](/en/auto-docs/utils/classes/PromisePool.md#run)

## Constructors

### constructor

**new PromisePool**(`opts?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opts` | [`PromisePoolOpts`](/en/auto-docs/utils/interfaces/PromisePoolOpts.md) | `PromisePoolOptsDefault` |

## Methods

### run

**run**<`T`>(`tasks`, `checkIfRetry?`): `Promise`<`T`\[]>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tasks` | [`PromiseTask`](/en/auto-docs/utils/interfaces/PromiseTask.md)<`T`>\[] | 执行任务 |
| `checkIfRetry?` | (`res`: `T`) => `boolean` | 判断结果是否需要重试 |

#### Returns

`Promise`<`T`\[]>
