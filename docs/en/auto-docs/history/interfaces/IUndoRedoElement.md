# Interface: IUndoRedoElement

UndoRedo元素

## Hierarchy

* `Disposable`

  ↳ **`IUndoRedoElement`**

## Implemented by

* [`StackOperation`](/en/auto-docs/history/classes/StackOperation.md)

## Table of contents

### Properties

* [description](/en/auto-docs/history/interfaces/IUndoRedoElement.md#description)
* [label](/en/auto-docs/history/interfaces/IUndoRedoElement.md#label)

### Methods

* [dispose](/en/auto-docs/history/interfaces/IUndoRedoElement.md#dispose)
* [getChangeOperations](/en/auto-docs/history/interfaces/IUndoRedoElement.md#getchangeoperations)
* [getFirstOperation](/en/auto-docs/history/interfaces/IUndoRedoElement.md#getfirstoperation)
* [getLastOperation](/en/auto-docs/history/interfaces/IUndoRedoElement.md#getlastoperation)
* [getOperations](/en/auto-docs/history/interfaces/IUndoRedoElement.md#getoperations)
* [pushOperation](/en/auto-docs/history/interfaces/IUndoRedoElement.md#pushoperation)
* [redo](/en/auto-docs/history/interfaces/IUndoRedoElement.md#redo)
* [undo](/en/auto-docs/history/interfaces/IUndoRedoElement.md#undo)

## Properties

### description

`Optional` `Readonly` **description**: `string`

操作描述

***

### label

`Optional` `Readonly` **label**: `string`

操作标题

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

Disposable.dispose

***

### getChangeOperations

**getChangeOperations**(`type`): [`Operation`](/en/auto-docs/history/interfaces/Operation.md)<`unknown`>\[]

获取修改的操作

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`UndoRedoChangeType`](/en/auto-docs/history/enums/UndoRedoChangeType.md) |

#### Returns

[`Operation`](/en/auto-docs/history/interfaces/Operation.md)<`unknown`>\[]

***

### getFirstOperation

**getFirstOperation**(): [`Operation`](/en/auto-docs/history/interfaces/Operation.md)<`unknown`>

获取第一个操作

#### Returns

[`Operation`](/en/auto-docs/history/interfaces/Operation.md)<`unknown`>

***

### getLastOperation

**getLastOperation**(): [`Operation`](/en/auto-docs/history/interfaces/Operation.md)<`unknown`>

获取最后一个操作

#### Returns

[`Operation`](/en/auto-docs/history/interfaces/Operation.md)<`unknown`>

***

### getOperations

**getOperations**(): [`Operation`](/en/auto-docs/history/interfaces/Operation.md)<`unknown`>\[]

获取所有操作

#### Returns

[`Operation`](/en/auto-docs/history/interfaces/Operation.md)<`unknown`>\[]

***

### pushOperation

**pushOperation**(`operation`): [`Operation`](/en/auto-docs/history/interfaces/Operation.md)<`unknown`>

添加一个操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`Operation`](/en/auto-docs/history/interfaces/Operation.md)<`unknown`> | 操作 |

#### Returns

[`Operation`](/en/auto-docs/history/interfaces/Operation.md)<`unknown`>

***

### redo

**redo**(): `void` | `Promise`<`void`>

重做

#### Returns

`void` | `Promise`<`void`>

***

### undo

**undo**(): `void` | `Promise`<`void`>

撤销

#### Returns

`void` | `Promise`<`void`>
