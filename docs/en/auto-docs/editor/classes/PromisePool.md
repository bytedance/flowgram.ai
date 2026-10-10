# Class: PromisePool

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/PromisePool.md#constructor)

### Methods

* [run](/en/auto-docs/editor/classes/PromisePool.md#run)

## Constructors

### constructor

**new PromisePool**(`opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | [`PromisePoolOpts`](/en/auto-docs/editor/interfaces/PromisePoolOpts.md) |

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
| `tasks` | [`PromiseTask`](/en/auto-docs/editor/interfaces/PromiseTask.md)<`T`>\[] | 执行任务 |
| `checkIfRetry?` | (`res`: `T`) => `boolean` | 判断结果是否需要重试 |

#### Returns

`Promise`<`T`\[]>
