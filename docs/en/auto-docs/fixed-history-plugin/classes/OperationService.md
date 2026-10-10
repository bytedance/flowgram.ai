# Class: OperationService

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-history-plugin/classes/OperationService.md#constructor)

### Properties

* [applyEmitter](/en/auto-docs/fixed-history-plugin/classes/OperationService.md#applyemitter)
* [config](/en/auto-docs/fixed-history-plugin/classes/OperationService.md#config)
* [context](/en/auto-docs/fixed-history-plugin/classes/OperationService.md#context)
* [onApply](/en/auto-docs/fixed-history-plugin/classes/OperationService.md#onapply)
* [operationRegistry](/en/auto-docs/fixed-history-plugin/classes/OperationService.md#operationregistry)

### Methods

* [applyOperation](/en/auto-docs/fixed-history-plugin/classes/OperationService.md#applyoperation)
* [dispose](/en/auto-docs/fixed-history-plugin/classes/OperationService.md#dispose)
* [getOperationDescription](/en/auto-docs/fixed-history-plugin/classes/OperationService.md#getoperationdescription)
* [getOperationLabel](/en/auto-docs/fixed-history-plugin/classes/OperationService.md#getoperationlabel)
* [init](/en/auto-docs/fixed-history-plugin/classes/OperationService.md#init)
* [inverseOperation](/en/auto-docs/fixed-history-plugin/classes/OperationService.md#inverseoperation)
* [inverseOperations](/en/auto-docs/fixed-history-plugin/classes/OperationService.md#inverseoperations)

## Constructors

### constructor

**new OperationService**()

## Properties

### applyEmitter

`Readonly` **applyEmitter**: `Emitter`<[`Operation`](/en/auto-docs/fixed-history-plugin/interfaces/Operation.md)<`unknown`>>

***

### config

**config**: [`HistoryConfig`](/en/auto-docs/fixed-history-plugin/classes/HistoryConfig.md)

***

### context

`Readonly` **context**: [`HistoryContext`](/en/auto-docs/fixed-history-plugin/classes/HistoryContext.md)

***

### onApply

`Readonly` **onApply**: `Event`<[`Operation`](/en/auto-docs/fixed-history-plugin/interfaces/Operation.md)<`unknown`>>

***

### operationRegistry

`Readonly` **operationRegistry**: [`OperationRegistry`](/en/auto-docs/fixed-history-plugin/classes/OperationRegistry.md)

## Methods

### applyOperation

**applyOperation**(`op`, `options?`): `any`

执行操作

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [`Operation`](/en/auto-docs/fixed-history-plugin/interfaces/Operation.md)<`unknown`> |
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
| `operation` | [`Operation`](/en/auto-docs/fixed-history-plugin/interfaces/Operation.md)<`unknown`> | 操作 |

#### Returns

`undefined` | `string`

***

### getOperationLabel

**getOperationLabel**(`operation`): `undefined` | `string`

根据操作类型获取操作的label

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`Operation`](/en/auto-docs/fixed-history-plugin/interfaces/Operation.md)<`unknown`> | 操作 |

#### Returns

`undefined` | `string`

***

### init

**init**(): `void`

#### Returns

`void`

***

### inverseOperation

**inverseOperation**(`op`): [`Operation`](/en/auto-docs/fixed-history-plugin/interfaces/Operation.md)<`unknown`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [`Operation`](/en/auto-docs/fixed-history-plugin/interfaces/Operation.md)<`unknown`> |

#### Returns

[`Operation`](/en/auto-docs/fixed-history-plugin/interfaces/Operation.md)<`unknown`>

***

### inverseOperations

**inverseOperations**(`operations`): [`Operation`](/en/auto-docs/fixed-history-plugin/interfaces/Operation.md)<`unknown`>\[]

操作取反

#### Parameters

| Name | Type |
| :------ | :------ |
| `operations` | [`Operation`](/en/auto-docs/fixed-history-plugin/interfaces/Operation.md)<`unknown`>\[] |

#### Returns

[`Operation`](/en/auto-docs/fixed-history-plugin/interfaces/Operation.md)<`unknown`>\[]
