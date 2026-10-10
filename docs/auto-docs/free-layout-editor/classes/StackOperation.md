# Class: StackOperation

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Implements

* [`IUndoRedoElement`](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/StackOperation.md#constructor)

### Properties

* [description](/auto-docs/free-layout-editor/classes/StackOperation.md#description)
* [label](/auto-docs/free-layout-editor/classes/StackOperation.md#label)

### Accessors

* [id](/auto-docs/free-layout-editor/classes/StackOperation.md#id)

### Methods

* [dispose](/auto-docs/free-layout-editor/classes/StackOperation.md#dispose)
* [getChangeOperations](/auto-docs/free-layout-editor/classes/StackOperation.md#getchangeoperations)
* [getFirstOperation](/auto-docs/free-layout-editor/classes/StackOperation.md#getfirstoperation)
* [getLastOperation](/auto-docs/free-layout-editor/classes/StackOperation.md#getlastoperation)
* [getOperations](/auto-docs/free-layout-editor/classes/StackOperation.md#getoperations)
* [getTimestamp](/auto-docs/free-layout-editor/classes/StackOperation.md#gettimestamp)
* [pushOperation](/auto-docs/free-layout-editor/classes/StackOperation.md#pushoperation)
* [redo](/auto-docs/free-layout-editor/classes/StackOperation.md#redo)
* [revert](/auto-docs/free-layout-editor/classes/StackOperation.md#revert)
* [undo](/auto-docs/free-layout-editor/classes/StackOperation.md#undo)

## Constructors

### constructor

**new StackOperation**(`operationService`, `operations?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operationService` | [`OperationService`](/auto-docs/free-layout-editor/classes/OperationService.md) |
| `operations?` | [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>\[] |

## Properties

### description

`Optional` **description**: `string`

操作描述

#### Implementation of

[IUndoRedoElement](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md).[description](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md#description)

***

### label

`Optional` **label**: `string`

操作标题

#### Implementation of

[IUndoRedoElement](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md).[label](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md#label)

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

[IUndoRedoElement](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md).[dispose](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md#dispose)

***

### getChangeOperations

**getChangeOperations**(`type`): [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>\[]

获取修改的操作

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`UndoRedoChangeType`](/auto-docs/free-layout-editor/enums/UndoRedoChangeType.md) |

#### Returns

[`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>\[]

#### Implementation of

[IUndoRedoElement](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md).[getChangeOperations](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md#getchangeoperations)

***

### getFirstOperation

**getFirstOperation**(): [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>

获取第一个操作

#### Returns

[`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>

#### Implementation of

[IUndoRedoElement](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md).[getFirstOperation](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md#getfirstoperation)

***

### getLastOperation

**getLastOperation**(): [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>

获取最后一个操作

#### Returns

[`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>

#### Implementation of

[IUndoRedoElement](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md).[getLastOperation](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md#getlastoperation)

***

### getOperations

**getOperations**(): [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>\[]

获取所有操作

#### Returns

[`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>\[]

#### Implementation of

[IUndoRedoElement](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md).[getOperations](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md#getoperations)

***

### getTimestamp

**getTimestamp**(): `number`

#### Returns

`number`

***

### pushOperation

**pushOperation**(`operation`): [`OperationWithId`](/auto-docs/free-layout-editor/types/OperationWithId.md)

添加一个操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`> | 操作 |

#### Returns

[`OperationWithId`](/auto-docs/free-layout-editor/types/OperationWithId.md)

#### Implementation of

[IUndoRedoElement](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md).[pushOperation](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md#pushoperation)

***

### redo

**redo**(): `Promise`<`void`>

重做

#### Returns

`Promise`<`void`>

#### Implementation of

[IUndoRedoElement](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md).[redo](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md#redo)

***

### revert

**revert**(`type`): `void` | `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`UndoRedoChangeType`](/auto-docs/free-layout-editor/enums/UndoRedoChangeType.md) |

#### Returns

`void` | `Promise`<`void`>

***

### undo

**undo**(): `Promise`<`void`>

撤销

#### Returns

`Promise`<`void`>

#### Implementation of

[IUndoRedoElement](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md).[undo](/auto-docs/free-layout-editor/interfaces/IUndoRedoElement.md#undo)
