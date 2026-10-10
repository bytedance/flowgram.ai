# Class: DefaultClipboardService

剪贴板服务，一般用于管理临时的复制黏贴数据
TODO: 后续可以支持调用浏览器

## Implements

* [`ClipboardService`](/auto-docs/playground-react/variables/ClipboardService-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/playground-react/classes/DefaultClipboardService.md#constructor)

### Properties

* [onClipboardChanged](/auto-docs/playground-react/classes/DefaultClipboardService.md#onclipboardchanged)

### Methods

* [readText](/auto-docs/playground-react/classes/DefaultClipboardService.md#readtext)
* [writeText](/auto-docs/playground-react/classes/DefaultClipboardService.md#writetext)

## Constructors

### constructor

**new DefaultClipboardService**()

## Properties

### onClipboardChanged

`Readonly` **onClipboardChanged**: [`Event`](/auto-docs/playground-react/interfaces/Event-1.md)<`string`>

#### Implementation of

ClipboardService.onClipboardChanged

## Methods

### readText

**readText**(): `string`

#### Returns

`string`

#### Implementation of

ClipboardService.readText

***

### writeText

**writeText**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Implementation of

ClipboardService.writeText
