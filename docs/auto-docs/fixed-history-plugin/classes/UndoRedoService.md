# Class: UndoRedoService

UndoRedo服务

## Implements

* [`IUndoRedoService`](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-history-plugin/classes/UndoRedoService.md#constructor)

### Properties

* [\_toDispose](/auto-docs/fixed-history-plugin/classes/UndoRedoService.md#_todispose)
* [onChange](/auto-docs/fixed-history-plugin/classes/UndoRedoService.md#onchange)

### Methods

* [canPush](/auto-docs/fixed-history-plugin/classes/UndoRedoService.md#canpush)
* [canRedo](/auto-docs/fixed-history-plugin/classes/UndoRedoService.md#canredo)
* [canUndo](/auto-docs/fixed-history-plugin/classes/UndoRedoService.md#canundo)
* [clear](/auto-docs/fixed-history-plugin/classes/UndoRedoService.md#clear)
* [clearRedoStack](/auto-docs/fixed-history-plugin/classes/UndoRedoService.md#clearredostack)
* [clearUndoStack](/auto-docs/fixed-history-plugin/classes/UndoRedoService.md#clearundostack)
* [dispose](/auto-docs/fixed-history-plugin/classes/UndoRedoService.md#dispose)
* [getLastElement](/auto-docs/fixed-history-plugin/classes/UndoRedoService.md#getlastelement)
* [getRedoStack](/auto-docs/fixed-history-plugin/classes/UndoRedoService.md#getredostack)
* [getUndoStack](/auto-docs/fixed-history-plugin/classes/UndoRedoService.md#getundostack)
* [pushElement](/auto-docs/fixed-history-plugin/classes/UndoRedoService.md#pushelement)
* [redo](/auto-docs/fixed-history-plugin/classes/UndoRedoService.md#redo)
* [setLimit](/auto-docs/fixed-history-plugin/classes/UndoRedoService.md#setlimit)
* [undo](/auto-docs/fixed-history-plugin/classes/UndoRedoService.md#undo)

## Constructors

### constructor

**new UndoRedoService**()

## Properties

### \_toDispose

`Readonly` **\_toDispose**: `DisposableCollection`

***

### onChange

`Readonly` **onChange**: `Event`<[`UndoRedoChangeEvent`](/auto-docs/fixed-history-plugin/types/UndoRedoChangeEvent.md)>

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

[IUndoRedoService](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md).[canRedo](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md#canredo)

***

### canUndo

**canUndo**(): `boolean`

是否可undo

#### Returns

`boolean`

true代表可以，false代表不可以

#### Implementation of

[IUndoRedoService](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md).[canUndo](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md#canundo)

***

### clear

**clear**(): `void`

清空

#### Returns

`void`

#### Implementation of

[IUndoRedoService](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md).[clear](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md#clear)

***

### clearRedoStack

**clearRedoStack**(): `void`

清空redo栈

#### Returns

`void`

#### Implementation of

[IUndoRedoService](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md).[clearRedoStack](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md#clearredostack)

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

[IUndoRedoService](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md).[dispose](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md#dispose)

***

### getLastElement

**getLastElement**(): [`IUndoRedoElement`](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoElement.md)

获取最后一个可undo的元素

#### Returns

[`IUndoRedoElement`](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoElement.md)

#### Implementation of

[IUndoRedoService](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md).[getLastElement](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md#getlastelement)

***

### getRedoStack

**getRedoStack**(): [`IUndoRedoElement`](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoElement.md)\[]

获取redo栈

#### Returns

[`IUndoRedoElement`](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoElement.md)\[]

#### Implementation of

[IUndoRedoService](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md).[getRedoStack](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md#getredostack)

***

### getUndoStack

**getUndoStack**(): [`IUndoRedoElement`](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoElement.md)\[]

获取undo栈

#### Returns

[`IUndoRedoElement`](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoElement.md)\[]

#### Implementation of

[IUndoRedoService](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md).[getUndoStack](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md#getundostack)

***

### pushElement

**pushElement**(`element`): `void`

添加一个undo/redo元素

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`IUndoRedoElement`](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoElement.md) | 可undo/redo的元素 |

#### Returns

`void`

#### Implementation of

[IUndoRedoService](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md).[pushElement](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md#pushelement)

***

### redo

**redo**(): `Promise`<`void`>

执行redo

#### Returns

`Promise`<`void`>

void

#### Implementation of

[IUndoRedoService](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md).[redo](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md#redo)

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

[IUndoRedoService](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md).[undo](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoService.md#undo)
