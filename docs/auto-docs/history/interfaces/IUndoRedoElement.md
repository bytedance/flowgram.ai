# Interface: IUndoRedoElement

UndoRedo元素

## Hierarchy

* `Disposable`

  ↳ **`IUndoRedoElement`**

## Implemented by

* [`StackOperation`](/auto-docs/history/classes/StackOperation.md)

## Table of contents

### Properties

* [description](/auto-docs/history/interfaces/IUndoRedoElement.md#description)
* [label](/auto-docs/history/interfaces/IUndoRedoElement.md#label)

### Methods

* [dispose](/auto-docs/history/interfaces/IUndoRedoElement.md#dispose)
* [getChangeOperations](/auto-docs/history/interfaces/IUndoRedoElement.md#getchangeoperations)
* [getFirstOperation](/auto-docs/history/interfaces/IUndoRedoElement.md#getfirstoperation)
* [getLastOperation](/auto-docs/history/interfaces/IUndoRedoElement.md#getlastoperation)
* [getOperations](/auto-docs/history/interfaces/IUndoRedoElement.md#getoperations)
* [pushOperation](/auto-docs/history/interfaces/IUndoRedoElement.md#pushoperation)
* [redo](/auto-docs/history/interfaces/IUndoRedoElement.md#redo)
* [undo](/auto-docs/history/interfaces/IUndoRedoElement.md#undo)

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

**getChangeOperations**(`type`): [`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>\[]

获取修改的操作

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`UndoRedoChangeType`](/auto-docs/history/enums/UndoRedoChangeType.md) |

#### Returns

[`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>\[]

***

### getFirstOperation

**getFirstOperation**(): [`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>

获取第一个操作

#### Returns

[`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>

***

### getLastOperation

**getLastOperation**(): [`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>

获取最后一个操作

#### Returns

[`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>

***

### getOperations

**getOperations**(): [`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>\[]

获取所有操作

#### Returns

[`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>\[]

***

### pushOperation

**pushOperation**(`operation`): [`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>

添加一个操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`> | 操作 |

#### Returns

[`Operation`](/auto-docs/history/interfaces/Operation.md)<`unknown`>

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
