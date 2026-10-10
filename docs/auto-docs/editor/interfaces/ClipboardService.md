# Interface: ClipboardService

## Table of contents

### Properties

* [onClipboardChanged](/auto-docs/editor/interfaces/ClipboardService.md#onclipboardchanged)

### Methods

* [readText](/auto-docs/editor/interfaces/ClipboardService.md#readtext)
* [writeText](/auto-docs/editor/interfaces/ClipboardService.md#writetext)

## Properties

### onClipboardChanged

**onClipboardChanged**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<`string`>

## Methods

### readText

**readText**(): [`MaybePromise`](/auto-docs/editor/types/MaybePromise.md)<`string`>

#### Returns

[`MaybePromise`](/auto-docs/editor/types/MaybePromise.md)<`string`>

***

### writeText

**writeText**(`value`): [`MaybePromise`](/auto-docs/editor/types/MaybePromise.md)<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`MaybePromise`](/auto-docs/editor/types/MaybePromise.md)<`void`>
