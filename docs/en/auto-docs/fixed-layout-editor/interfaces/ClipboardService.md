# Interface: ClipboardService

## Table of contents

### Properties

* [onClipboardChanged](/en/auto-docs/fixed-layout-editor/interfaces/ClipboardService.md#onclipboardchanged)

### Methods

* [readText](/en/auto-docs/fixed-layout-editor/interfaces/ClipboardService.md#readtext)
* [writeText](/en/auto-docs/fixed-layout-editor/interfaces/ClipboardService.md#writetext)

## Properties

### onClipboardChanged

**onClipboardChanged**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`string`>

## Methods

### readText

**readText**(): [`MaybePromise`](/en/auto-docs/fixed-layout-editor/types/MaybePromise.md)<`string`>

#### Returns

[`MaybePromise`](/en/auto-docs/fixed-layout-editor/types/MaybePromise.md)<`string`>

***

### writeText

**writeText**(`value`): [`MaybePromise`](/en/auto-docs/fixed-layout-editor/types/MaybePromise.md)<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`MaybePromise`](/en/auto-docs/fixed-layout-editor/types/MaybePromise.md)<`void`>
