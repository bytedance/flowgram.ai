# Class: TestRunPipelineEntity

## Hierarchy

* `StoreService`<`TestRunPipelineEntityState`>

  ↳ **`TestRunPipelineEntity`**

## Table of contents

### Constructors

* [constructor](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#constructor)

### Properties

* [container](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#container)
* [id](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#id)
* [onFinished](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#onfinished)
* [onFinishedEmitter](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#onfinishedemitter)
* [onProgress](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#onprogress)
* [onProgressEmitter](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#onprogressemitter)
* [plugins](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#plugins)
* [prepare](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#prepare)
* [store](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#store)

### Accessors

* [getState](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#getstate)
* [setState](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#setstate)
* [status](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#status)

### Methods

* [cancel](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#cancel)
* [dispose](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#dispose)
* [init](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#init)
* [registerExecute](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#registerexecute)
* [registerProgress](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#registerprogress)
* [start](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#start)
* [update](/auto-docs/test-run-plugin/classes/TestRunPipelineEntity.md#update)

## Constructors

### constructor

**new TestRunPipelineEntity**()

#### Overrides

StoreService\&lt;TestRunPipelineEntityState\&gt;.constructor

## Properties

### container

**container**: `any`

***

### id

**id**: `any`

***

### onFinished

**onFinished**: `any`

***

### onFinishedEmitter

**onFinishedEmitter**: `any`

***

### onProgress

**onProgress**: `any`

***

### onProgressEmitter

**onProgressEmitter**: `any`

***

### plugins

**plugins**: [`TestRunPipelinePlugin`](/auto-docs/test-run-plugin/interfaces/TestRunPipelinePlugin.md)\[] = `[]`

***

### prepare

**prepare**: `Tap`<[`TestRunPipelineEntityCtx`](/auto-docs/test-run-plugin/interfaces/TestRunPipelineEntityCtx.md)<`any`>>

***

### store

**store**: `StoreApi`<`State`>

#### Inherited from

StoreService.store

## Accessors

### getState

`get` **getState**(): `any`

#### Returns

`any`

#### Inherited from

StoreService.getState

***

### setState

`get` **setState**(): `any`

#### Returns

`any`

#### Inherited from

StoreService.setState

***

### status

`get` **status**(): `"idle"` | `"preparing"` | `"executing"` | `"canceled"` | `"finished"` | `"disposed"`

#### Returns

`"idle"` | `"preparing"` | `"executing"` | `"canceled"` | `"finished"` | `"disposed"`

`set` **status**(`next`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | `"idle"` | `"preparing"` | `"executing"` | `"canceled"` | `"finished"` | `"disposed"` |

#### Returns

`void`

## Methods

### cancel

**cancel**(): `void`

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### init

**init**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `TestRunPipelineEntityOptions` |

#### Returns

`void`

***

### registerExecute

**registerExecute**(`fn`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`ctx`: [`TestRunPipelineEntityCtx`](/auto-docs/test-run-plugin/interfaces/TestRunPipelineEntityCtx.md)<`any`>) => `void` | `Promise`<`void`> |

#### Returns

`void`

***

### registerProgress

**registerProgress**(`fn`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`ctx`: [`TestRunPipelineEntityCtx`](/auto-docs/test-run-plugin/interfaces/TestRunPipelineEntityCtx.md)<`any`>) => `void` | `Promise`<`void`> |

#### Returns

`void`

***

### start

**start**<`T`>(`options?`): `Promise`<`void`>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.data` | `T` |

#### Returns

`Promise`<`void`>

***

### update

**update**(`result`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `any` |

#### Returns

`void`
