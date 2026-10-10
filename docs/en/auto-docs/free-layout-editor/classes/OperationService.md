# Class: OperationService

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/OperationService.md#constructor)

### Properties

* [applyEmitter](/en/auto-docs/free-layout-editor/classes/OperationService.md#applyemitter)
* [config](/en/auto-docs/free-layout-editor/classes/OperationService.md#config)
* [context](/en/auto-docs/free-layout-editor/classes/OperationService.md#context)
* [onApply](/en/auto-docs/free-layout-editor/classes/OperationService.md#onapply)
* [operationRegistry](/en/auto-docs/free-layout-editor/classes/OperationService.md#operationregistry)

### Methods

* [applyOperation](/en/auto-docs/free-layout-editor/classes/OperationService.md#applyoperation)
* [dispose](/en/auto-docs/free-layout-editor/classes/OperationService.md#dispose)
* [getOperationDescription](/en/auto-docs/free-layout-editor/classes/OperationService.md#getoperationdescription)
* [getOperationLabel](/en/auto-docs/free-layout-editor/classes/OperationService.md#getoperationlabel)
* [init](/en/auto-docs/free-layout-editor/classes/OperationService.md#init)
* [inverseOperation](/en/auto-docs/free-layout-editor/classes/OperationService.md#inverseoperation)
* [inverseOperations](/en/auto-docs/free-layout-editor/classes/OperationService.md#inverseoperations)

## Constructors

### constructor

**new OperationService**()

## Properties

### applyEmitter

`Readonly` **applyEmitter**: [`Emitter`](/en/auto-docs/free-layout-editor/classes/Emitter.md)<[`Operation`](/en/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>>

***

### config

**config**: [`HistoryConfig`](/en/auto-docs/free-layout-editor/classes/HistoryConfig.md)

***

### context

`Readonly` **context**: [`HistoryContext`](/en/auto-docs/free-layout-editor/classes/HistoryContext.md)

***

### onApply

`Readonly` **onApply**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`Operation`](/en/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>>

***

### operationRegistry

`Readonly` **operationRegistry**: [`OperationRegistry`](/en/auto-docs/free-layout-editor/classes/OperationRegistry.md)

## Methods

### applyOperation

**applyOperation**(`op`, `options?`): `any`

执行操作

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [`Operation`](/en/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`> |
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
| `operation` | [`Operation`](/en/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`> | 操作 |

#### Returns

`undefined` | `string`

***

### getOperationLabel

**getOperationLabel**(`operation`): `undefined` | `string`

根据操作类型获取操作的label

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`Operation`](/en/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`> | 操作 |

#### Returns

`undefined` | `string`

***

### init

**init**(): `void`

#### Returns

`void`

***

### inverseOperation

**inverseOperation**(`op`): [`Operation`](/en/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [`Operation`](/en/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`> |

#### Returns

[`Operation`](/en/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>

***

### inverseOperations

**inverseOperations**(`operations`): [`Operation`](/en/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>\[]

操作取反

#### Parameters

| Name | Type |
| :------ | :------ |
| `operations` | [`Operation`](/en/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>\[] |

#### Returns

[`Operation`](/en/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>\[]
