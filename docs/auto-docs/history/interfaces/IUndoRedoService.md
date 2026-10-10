# Interface: IUndoRedoService

UndoRedo服务

## Hierarchy

* `Disposable`

  ↳ **`IUndoRedoService`**

## Implemented by

* [`UndoRedoService`](/auto-docs/history/classes/UndoRedoService.md)

## Table of contents

### Methods

* [canRedo](/auto-docs/history/interfaces/IUndoRedoService.md#canredo)
* [canUndo](/auto-docs/history/interfaces/IUndoRedoService.md#canundo)
* [clear](/auto-docs/history/interfaces/IUndoRedoService.md#clear)
* [clearRedoStack](/auto-docs/history/interfaces/IUndoRedoService.md#clearredostack)
* [dispose](/auto-docs/history/interfaces/IUndoRedoService.md#dispose)
* [getLastElement](/auto-docs/history/interfaces/IUndoRedoService.md#getlastelement)
* [getRedoStack](/auto-docs/history/interfaces/IUndoRedoService.md#getredostack)
* [getUndoStack](/auto-docs/history/interfaces/IUndoRedoService.md#getundostack)
* [pushElement](/auto-docs/history/interfaces/IUndoRedoService.md#pushelement)
* [redo](/auto-docs/history/interfaces/IUndoRedoService.md#redo)
* [undo](/auto-docs/history/interfaces/IUndoRedoService.md#undo)

## Methods

### canRedo

**canRedo**(): `boolean`

是否可redo

#### Returns

`boolean`

***

### canUndo

**canUndo**(): `boolean`

是否可undo

#### Returns

`boolean`

***

### clear

**clear**(): `void`

清空 undo和redo栈

#### Returns

`void`

***

### clearRedoStack

**clearRedoStack**(): `void`

清空redo栈

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

Disposable.dispose

***

### getLastElement

**getLastElement**(): [`IUndoRedoElement`](/auto-docs/history/interfaces/IUndoRedoElement.md)

获取最后一个可undo的元素

#### Returns

[`IUndoRedoElement`](/auto-docs/history/interfaces/IUndoRedoElement.md)

***

### getRedoStack

**getRedoStack**(): [`IUndoRedoElement`](/auto-docs/history/interfaces/IUndoRedoElement.md)\[]

获取redo栈

#### Returns

[`IUndoRedoElement`](/auto-docs/history/interfaces/IUndoRedoElement.md)\[]

***

### getUndoStack

**getUndoStack**(): [`IUndoRedoElement`](/auto-docs/history/interfaces/IUndoRedoElement.md)\[]

获取undo栈

#### Returns

[`IUndoRedoElement`](/auto-docs/history/interfaces/IUndoRedoElement.md)\[]

***

### pushElement

**pushElement**(`element`): `void`

添加一个undo/redo元素

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`IUndoRedoElement`](/auto-docs/history/interfaces/IUndoRedoElement.md) | 可undo/redo的元素 |

#### Returns

`void`

***

### redo

**redo**(): `void` | `Promise`<`void`>

执行redo

#### Returns

`void` | `Promise`<`void`>

***

### undo

**undo**(): `void` | `Promise`<`void`>

执行undo

#### Returns

`void` | `Promise`<`void`>
