# Class: StackOperation

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Implements

* [`IUndoRedoElement`](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/StackOperation.md#constructor)

### Properties

* [description](/en/auto-docs/fixed-layout-editor/classes/StackOperation.md#description)
* [label](/en/auto-docs/fixed-layout-editor/classes/StackOperation.md#label)

### Accessors

* [id](/en/auto-docs/fixed-layout-editor/classes/StackOperation.md#id)

### Methods

* [dispose](/en/auto-docs/fixed-layout-editor/classes/StackOperation.md#dispose)
* [getChangeOperations](/en/auto-docs/fixed-layout-editor/classes/StackOperation.md#getchangeoperations)
* [getFirstOperation](/en/auto-docs/fixed-layout-editor/classes/StackOperation.md#getfirstoperation)
* [getLastOperation](/en/auto-docs/fixed-layout-editor/classes/StackOperation.md#getlastoperation)
* [getOperations](/en/auto-docs/fixed-layout-editor/classes/StackOperation.md#getoperations)
* [getTimestamp](/en/auto-docs/fixed-layout-editor/classes/StackOperation.md#gettimestamp)
* [pushOperation](/en/auto-docs/fixed-layout-editor/classes/StackOperation.md#pushoperation)
* [redo](/en/auto-docs/fixed-layout-editor/classes/StackOperation.md#redo)
* [revert](/en/auto-docs/fixed-layout-editor/classes/StackOperation.md#revert)
* [undo](/en/auto-docs/fixed-layout-editor/classes/StackOperation.md#undo)

## Constructors

### constructor

**new StackOperation**(`operationService`, `operations?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operationService` | [`OperationService`](/en/auto-docs/fixed-layout-editor/classes/OperationService.md) |
| `operations?` | [`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>\[] |

## Properties

### description

`Optional` **description**: `string`

操作描述

#### Implementation of

[IUndoRedoElement](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md).[description](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md#description)

***

### label

`Optional` **label**: `string`

操作标题

#### Implementation of

[IUndoRedoElement](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md).[label](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md#label)

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

[IUndoRedoElement](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md).[dispose](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md#dispose)

***

### getChangeOperations

**getChangeOperations**(`type`): [`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>\[]

获取修改的操作

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`UndoRedoChangeType`](/en/auto-docs/fixed-layout-editor/enums/UndoRedoChangeType.md) |

#### Returns

[`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>\[]

#### Implementation of

[IUndoRedoElement](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md).[getChangeOperations](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md#getchangeoperations)

***

### getFirstOperation

**getFirstOperation**(): [`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>

获取第一个操作

#### Returns

[`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>

#### Implementation of

[IUndoRedoElement](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md).[getFirstOperation](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md#getfirstoperation)

***

### getLastOperation

**getLastOperation**(): [`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>

获取最后一个操作

#### Returns

[`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>

#### Implementation of

[IUndoRedoElement](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md).[getLastOperation](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md#getlastoperation)

***

### getOperations

**getOperations**(): [`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>\[]

获取所有操作

#### Returns

[`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>\[]

#### Implementation of

[IUndoRedoElement](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md).[getOperations](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md#getoperations)

***

### getTimestamp

**getTimestamp**(): `number`

#### Returns

`number`

***

### pushOperation

**pushOperation**(`operation`): [`OperationWithId`](/en/auto-docs/fixed-layout-editor/types/OperationWithId.md)

添加一个操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`> | 操作 |

#### Returns

[`OperationWithId`](/en/auto-docs/fixed-layout-editor/types/OperationWithId.md)

#### Implementation of

[IUndoRedoElement](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md).[pushOperation](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md#pushoperation)

***

### redo

**redo**(): `Promise`<`void`>

重做

#### Returns

`Promise`<`void`>

#### Implementation of

[IUndoRedoElement](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md).[redo](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md#redo)

***

### revert

**revert**(`type`): `void` | `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`UndoRedoChangeType`](/en/auto-docs/fixed-layout-editor/enums/UndoRedoChangeType.md) |

#### Returns

`void` | `Promise`<`void`>

***

### undo

**undo**(): `Promise`<`void`>

撤销

#### Returns

`Promise`<`void`>

#### Implementation of

[IUndoRedoElement](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md).[undo](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md#undo)
