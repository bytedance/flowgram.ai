# Class: StackOperation

UndoRedo元素

## Implements

* [`IUndoRedoElement`](/auto-docs/history/interfaces/IUndoRedoElement.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/history/classes/StackOperation.md#constructor)

### Properties

* [description](/auto-docs/history/classes/StackOperation.md#description)
* [label](/auto-docs/history/classes/StackOperation.md#label)

### Accessors

* [id](/auto-docs/history/classes/StackOperation.md#id)

### Methods

* [dispose](/auto-docs/history/classes/StackOperation.md#dispose)
* [getChangeOperations](/auto-docs/history/classes/StackOperation.md#getchangeoperations)
* [getFirstOperation](/auto-docs/history/classes/StackOperation.md#getfirstoperation)
* [getLastOperation](/auto-docs/history/classes/StackOperation.md#getlastoperation)
* [getOperations](/auto-docs/history/classes/StackOperation.md#getoperations)
* [getTimestamp](/auto-docs/history/classes/StackOperation.md#gettimestamp)
* [pushOperation](/auto-docs/history/classes/StackOperation.md#pushoperation)
* [redo](/auto-docs/history/classes/StackOperation.md#redo)
* [revert](/auto-docs/history/classes/StackOperation.md#revert)
* [undo](/auto-docs/history/classes/StackOperation.md#undo)

## Constructors

### constructor

**new StackOperation**(`operationService`, `operations?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `operationService` | [`OperationService`](/auto-docs/history/classes/OperationService.md) | `undefined` |
| `operations` | [`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>\[] | `[]` |

## Properties

### description

`Optional` **description**: `string`

操作描述

#### Implementation of

[IUndoRedoElement](/auto-docs/history/interfaces/IUndoRedoElement.md).[description](/auto-docs/history/interfaces/IUndoRedoElement.md#description)

***

### label

`Optional` **label**: `string`

操作标题

#### Implementation of

[IUndoRedoElement](/auto-docs/history/interfaces/IUndoRedoElement.md).[label](/auto-docs/history/interfaces/IUndoRedoElement.md#label)

## Accessors

### id

`get` **id**(): `string`

#### Returns

`string`

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[IUndoRedoElement](/auto-docs/history/interfaces/IUndoRedoElement.md).[dispose](/auto-docs/history/interfaces/IUndoRedoElement.md#dispose)

***

### getChangeOperations

**getChangeOperations**(`type`): [`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>\[]

获取修改的操作

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`UndoRedoChangeType`](/auto-docs/history/enums/UndoRedoChangeType.md) |

#### Returns

[`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>\[]

#### Implementation of

[IUndoRedoElement](/auto-docs/history/interfaces/IUndoRedoElement.md).[getChangeOperations](/auto-docs/history/interfaces/IUndoRedoElement.md#getchangeoperations)

***

### getFirstOperation

**getFirstOperation**(): [`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>

获取第一个操作

#### Returns

[`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>

#### Implementation of

[IUndoRedoElement](/auto-docs/history/interfaces/IUndoRedoElement.md).[getFirstOperation](/auto-docs/history/interfaces/IUndoRedoElement.md#getfirstoperation)

***

### getLastOperation

**getLastOperation**(): [`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>

获取最后一个操作

#### Returns

[`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>

#### Implementation of

[IUndoRedoElement](/auto-docs/history/interfaces/IUndoRedoElement.md).[getLastOperation](/auto-docs/history/interfaces/IUndoRedoElement.md#getlastoperation)

***

### getOperations

**getOperations**(): [`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>\[]

获取所有操作

#### Returns

[`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>\[]

#### Implementation of

[IUndoRedoElement](/auto-docs/history/interfaces/IUndoRedoElement.md).[getOperations](/auto-docs/history/interfaces/IUndoRedoElement.md#getoperations)

***

### getTimestamp

**getTimestamp**(): `number`

#### Returns

`number`

***

### pushOperation

**pushOperation**(`operation`): [`OperationWithId`](/auto-docs/history/types/OperationWithId.md)

添加一个操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`> | 操作 |

#### Returns

[`OperationWithId`](/auto-docs/history/types/OperationWithId.md)

#### Implementation of

[IUndoRedoElement](/auto-docs/history/interfaces/IUndoRedoElement.md).[pushOperation](/auto-docs/history/interfaces/IUndoRedoElement.md#pushoperation)

***

### redo

**redo**(): `Promise`<`void`>

重做

#### Returns

`Promise`<`void`>

#### Implementation of

[IUndoRedoElement](/auto-docs/history/interfaces/IUndoRedoElement.md).[redo](/auto-docs/history/interfaces/IUndoRedoElement.md#redo)

***

### revert

**revert**(`type`): `void` | `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`UndoRedoChangeType`](/auto-docs/history/enums/UndoRedoChangeType.md) |

#### Returns

`void` | `Promise`<`void`>

***

### undo

**undo**(): `Promise`<`void`>

撤销

#### Returns

`Promise`<`void`>

#### Implementation of

[IUndoRedoElement](/auto-docs/history/interfaces/IUndoRedoElement.md).[undo](/auto-docs/history/interfaces/IUndoRedoElement.md#undo)
