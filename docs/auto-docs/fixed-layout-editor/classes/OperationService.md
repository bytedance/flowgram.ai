# Class: OperationService

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/OperationService.md#constructor)

### Properties

* [applyEmitter](/auto-docs/fixed-layout-editor/classes/OperationService.md#applyemitter)
* [config](/auto-docs/fixed-layout-editor/classes/OperationService.md#config)
* [context](/auto-docs/fixed-layout-editor/classes/OperationService.md#context)
* [onApply](/auto-docs/fixed-layout-editor/classes/OperationService.md#onapply)
* [operationRegistry](/auto-docs/fixed-layout-editor/classes/OperationService.md#operationregistry)

### Methods

* [applyOperation](/auto-docs/fixed-layout-editor/classes/OperationService.md#applyoperation)
* [dispose](/auto-docs/fixed-layout-editor/classes/OperationService.md#dispose)
* [getOperationDescription](/auto-docs/fixed-layout-editor/classes/OperationService.md#getoperationdescription)
* [getOperationLabel](/auto-docs/fixed-layout-editor/classes/OperationService.md#getoperationlabel)
* [init](/auto-docs/fixed-layout-editor/classes/OperationService.md#init)
* [inverseOperation](/auto-docs/fixed-layout-editor/classes/OperationService.md#inverseoperation)
* [inverseOperations](/auto-docs/fixed-layout-editor/classes/OperationService.md#inverseoperations)

## Constructors

### constructor

**new OperationService**()

## Properties

### applyEmitter

`Readonly` **applyEmitter**: [`Emitter`](/auto-docs/fixed-layout-editor/classes/Emitter.md)<[`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>>

***

### config

**config**: [`HistoryConfig`](/auto-docs/fixed-layout-editor/classes/HistoryConfig.md)

***

### context

`Readonly` **context**: [`HistoryContext`](/auto-docs/fixed-layout-editor/classes/HistoryContext.md)

***

### onApply

`Readonly` **onApply**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>>

***

### operationRegistry

`Readonly` **operationRegistry**: [`OperationRegistry`](/auto-docs/fixed-layout-editor/classes/OperationRegistry.md)

## Methods

### applyOperation

**applyOperation**(`op`, `options?`): `any`

执行操作

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`> |
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
| `operation` | [`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`> | 操作 |

#### Returns

`undefined` | `string`

***

### getOperationLabel

**getOperationLabel**(`operation`): `undefined` | `string`

根据操作类型获取操作的label

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`> | 操作 |

#### Returns

`undefined` | `string`

***

### init

**init**(): `void`

#### Returns

`void`

***

### inverseOperation

**inverseOperation**(`op`): [`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`> |

#### Returns

[`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>

***

### inverseOperations

**inverseOperations**(`operations`): [`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>\[]

操作取反

#### Parameters

| Name | Type |
| :------ | :------ |
| `operations` | [`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>\[] |

#### Returns

[`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>\[]
