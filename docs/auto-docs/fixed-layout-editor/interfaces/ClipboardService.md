# Interface: ClipboardService

## Table of contents

### Properties

* [onClipboardChanged](/auto-docs/fixed-layout-editor/interfaces/ClipboardService.md#onclipboardchanged)

### Methods

* [readText](/auto-docs/fixed-layout-editor/interfaces/ClipboardService.md#readtext)
* [writeText](/auto-docs/fixed-layout-editor/interfaces/ClipboardService.md#writetext)

## Properties

### onClipboardChanged

**onClipboardChanged**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`string`>

## Methods

### readText

**readText**(): [`MaybePromise`](/auto-docs/fixed-layout-editor/types/MaybePromise.md)<`string`>

#### Returns

[`MaybePromise`](/auto-docs/fixed-layout-editor/types/MaybePromise.md)<`string`>

***

### writeText

**writeText**(`value`): [`MaybePromise`](/auto-docs/fixed-layout-editor/types/MaybePromise.md)<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`MaybePromise`](/auto-docs/fixed-layout-editor/types/MaybePromise.md)<`void`>
