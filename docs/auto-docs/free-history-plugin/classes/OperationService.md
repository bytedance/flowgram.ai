# Class: OperationService

## Table of contents

### Constructors

* [constructor](/auto-docs/free-history-plugin/classes/OperationService.md#constructor)

### Properties

* [applyEmitter](/auto-docs/free-history-plugin/classes/OperationService.md#applyemitter)
* [config](/auto-docs/free-history-plugin/classes/OperationService.md#config)
* [context](/auto-docs/free-history-plugin/classes/OperationService.md#context)
* [onApply](/auto-docs/free-history-plugin/classes/OperationService.md#onapply)
* [operationRegistry](/auto-docs/free-history-plugin/classes/OperationService.md#operationregistry)

### Methods

* [applyOperation](/auto-docs/free-history-plugin/classes/OperationService.md#applyoperation)
* [dispose](/auto-docs/free-history-plugin/classes/OperationService.md#dispose)
* [getOperationDescription](/auto-docs/free-history-plugin/classes/OperationService.md#getoperationdescription)
* [getOperationLabel](/auto-docs/free-history-plugin/classes/OperationService.md#getoperationlabel)
* [init](/auto-docs/free-history-plugin/classes/OperationService.md#init)
* [inverseOperation](/auto-docs/free-history-plugin/classes/OperationService.md#inverseoperation)
* [inverseOperations](/auto-docs/free-history-plugin/classes/OperationService.md#inverseoperations)

## Constructors

### constructor

**new OperationService**()

## Properties

### applyEmitter

`Readonly` **applyEmitter**: `Emitter`<[`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`>>

***

### config

**config**: [`HistoryConfig`](/auto-docs/free-history-plugin/classes/HistoryConfig.md)

***

### context

`Readonly` **context**: [`HistoryContext`](/auto-docs/free-history-plugin/classes/HistoryContext.md)

***

### onApply

`Readonly` **onApply**: `Event`<[`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`>>

***

### operationRegistry

`Readonly` **operationRegistry**: [`OperationRegistry`](/auto-docs/free-history-plugin/classes/OperationRegistry.md)

## Methods

### applyOperation

**applyOperation**(`op`, `options?`): `any`

执行操作

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`> |
| `options?` | `Object` |
| `options.noApply?` | `boolean` |

#### Returns

`any`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### getOperationDescription

**getOperationDescription**(`operation`): `undefined` | `string`

根据操作类型获取操作的description

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`> | 操作 |

#### Returns

`undefined` | `string`

***

### getOperationLabel

**getOperationLabel**(`operation`): `undefined` | `string`

根据操作类型获取操作的label

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`> | 操作 |

#### Returns

`undefined` | `string`

***

### init

**init**(): `void`

#### Returns

`void`

***

### inverseOperation

**inverseOperation**(`op`): [`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`> |

#### Returns

[`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`>

***

### inverseOperations

**inverseOperations**(`operations`): [`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`>\[]

操作取反

#### Parameters

| Name | Type |
| :------ | :------ |
| `operations` | [`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`>\[] |

#### Returns

[`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`>\[]
