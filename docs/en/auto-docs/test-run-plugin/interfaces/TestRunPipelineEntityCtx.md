# Interface: TestRunPipelineEntityCtx\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Table of contents

### Properties

* [id](/en/auto-docs/test-run-plugin/interfaces/TestRunPipelineEntityCtx.md#id)
* [operate](/en/auto-docs/test-run-plugin/interfaces/TestRunPipelineEntityCtx.md#operate)
* [store](/en/auto-docs/test-run-plugin/interfaces/TestRunPipelineEntityCtx.md#store)

## Properties

### id

**id**: `string`

***

### operate

**operate**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `cancel` | () => `void` |
| `update` | (`data`: `any`) => `void` |

***

### store

**store**: `StoreApi`<`TestRunPipelineEntityState`<`T`>>
