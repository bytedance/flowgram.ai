# Interface: TestRunPipelineEntityCtx\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Table of contents

### Properties

* [id](/auto-docs/test-run-plugin/interfaces/TestRunPipelineEntityCtx.md#id)
* [operate](/auto-docs/test-run-plugin/interfaces/TestRunPipelineEntityCtx.md#operate)
* [store](/auto-docs/test-run-plugin/interfaces/TestRunPipelineEntityCtx.md#store)

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
