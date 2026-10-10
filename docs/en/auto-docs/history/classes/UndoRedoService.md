# Class: UndoRedoService

UndoRedo服务

## Implements

* [`IUndoRedoService`](/en/auto-docs/history/interfaces/IUndoRedoService.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/history/classes/UndoRedoService.md#constructor)

### Properties

* [\_toDispose](/en/auto-docs/history/classes/UndoRedoService.md#_todispose)
* [onChange](/en/auto-docs/history/classes/UndoRedoService.md#onchange)

### Methods

* [canPush](/en/auto-docs/history/classes/UndoRedoService.md#canpush)
* [canRedo](/en/auto-docs/history/classes/UndoRedoService.md#canredo)
* [canUndo](/en/auto-docs/history/classes/UndoRedoService.md#canundo)
* [clear](/en/auto-docs/history/classes/UndoRedoService.md#clear)
* [clearRedoStack](/en/auto-docs/history/classes/UndoRedoService.md#clearredostack)
* [clearUndoStack](/en/auto-docs/history/classes/UndoRedoService.md#clearundostack)
* [dispose](/en/auto-docs/history/classes/UndoRedoService.md#dispose)
* [getLastElement](/en/auto-docs/history/classes/UndoRedoService.md#getlastelement)
* [getRedoStack](/en/auto-docs/history/classes/UndoRedoService.md#getredostack)
* [getUndoStack](/en/auto-docs/history/classes/UndoRedoService.md#getundostack)
* [pushElement](/en/auto-docs/history/classes/UndoRedoService.md#pushelement)
* [redo](/en/auto-docs/history/classes/UndoRedoService.md#redo)
* [setLimit](/en/auto-docs/history/classes/UndoRedoService.md#setlimit)
* [undo](/en/auto-docs/history/classes/UndoRedoService.md#undo)

## Constructors

### constructor

**new UndoRedoService**()

## Properties

### \_toDispose

`Readonly` **\_toDispose**: `DisposableCollection`

***

### onChange

`Readonly` **onChange**: `Event`<[`UndoRedoChangeEvent`](/en/auto-docs/history/types/UndoRedoChangeEvent.md)>

## Methods

### canPush

**canPush**(): `boolean`

是否可以push

#### Returns

`boolean`

true代表可以，false代表不可以

***

### canRedo

**canRedo**(): `boolean`

是否可redo

#### Returns

`boolean`

true代表可以，false代表不可以

#### Implementation of

[IUndoRedoService](/en/auto-docs/history/interfaces/IUndoRedoService.md).[canRedo](/en/auto-docs/history/interfaces/IUndoRedoService.md#canredo)

***

### canUndo

**canUndo**(): `boolean`

是否可undo

#### Returns

`boolean`

true代表可以，false代表不可以

#### Implementation of

[IUndoRedoService](/en/auto-docs/history/interfaces/IUndoRedoService.md).[canUndo](/en/auto-docs/history/interfaces/IUndoRedoService.md#canundo)

***

### clear

**clear**(): `void`

清空

#### Returns

`void`

#### Implementation of

[IUndoRedoService](/en/auto-docs/history/interfaces/IUndoRedoService.md).[clear](/en/auto-docs/history/interfaces/IUndoRedoService.md#clear)

***

### clearRedoStack

**clearRedoStack**(): `void`

清空redo栈

#### Returns

`void`

#### Implementation of

[IUndoRedoService](/en/auto-docs/history/interfaces/IUndoRedoService.md).[clearRedoStack](/en/auto-docs/history/interfaces/IUndoRedoService.md#clearredostack)

***

### clearUndoStack

**clearUndoStack**(): `void`

清空undo栈

#### Returns

`void`

***

### dispose

**dispose**(): `void`

销毁

#### Returns

`void`

#### Implementation of

[IUndoRedoService](/en/auto-docs/history/interfaces/IUndoRedoService.md).[dispose](/en/auto-docs/history/interfaces/IUndoRedoService.md#dispose)

***

### getLastElement

**getLastElement**(): [`IUndoRedoElement`](/en/auto-docs/history/interfaces/IUndoRedoElement.md)

获取最后一个可undo的元素

#### Returns

[`IUndoRedoElement`](/en/auto-docs/history/interfaces/IUndoRedoElement.md)

#### Implementation of

[IUndoRedoService](/en/auto-docs/history/interfaces/IUndoRedoService.md).[getLastElement](/en/auto-docs/history/interfaces/IUndoRedoService.md#getlastelement)

***

### getRedoStack

**getRedoStack**(): [`IUndoRedoElement`](/en/auto-docs/history/interfaces/IUndoRedoElement.md)\[]

获取redo栈

#### Returns

[`IUndoRedoElement`](/en/auto-docs/history/interfaces/IUndoRedoElement.md)\[]

#### Implementation of

[IUndoRedoService](/en/auto-docs/history/interfaces/IUndoRedoService.md).[getRedoStack](/en/auto-docs/history/interfaces/IUndoRedoService.md#getredostack)

***

### getUndoStack

**getUndoStack**(): [`IUndoRedoElement`](/en/auto-docs/history/interfaces/IUndoRedoElement.md)\[]

获取undo栈

#### Returns

[`IUndoRedoElement`](/en/auto-docs/history/interfaces/IUndoRedoElement.md)\[]

#### Implementation of

[IUndoRedoService](/en/auto-docs/history/interfaces/IUndoRedoService.md).[getUndoStack](/en/auto-docs/history/interfaces/IUndoRedoService.md#getundostack)

***

### pushElement

**pushElement**(`element`): `void`

添加一个undo/redo元素

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`IUndoRedoElement`](/en/auto-docs/history/interfaces/IUndoRedoElement.md) | 可undo/redo的元素 |

#### Returns

`void`

#### Implementation of

[IUndoRedoService](/en/auto-docs/history/interfaces/IUndoRedoService.md).[pushElement](/en/auto-docs/history/interfaces/IUndoRedoService.md#pushelement)

***

### redo

**redo**(): `Promise`<`void`>

执行redo

#### Returns

`Promise`<`void`>

void

#### Implementation of

[IUndoRedoService](/en/auto-docs/history/interfaces/IUndoRedoService.md).[redo](/en/auto-docs/history/interfaces/IUndoRedoService.md#redo)

***

### setLimit

**setLimit**(`limit`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `limit` | `number` |

#### Returns

`void`

***

### undo

**undo**(): `Promise`<`void`>

执行undo

#### Returns

`Promise`<`void`>

void

#### Implementation of

[IUndoRedoService](/en/auto-docs/history/interfaces/IUndoRedoService.md).[undo](/en/auto-docs/history/interfaces/IUndoRedoService.md#undo)
