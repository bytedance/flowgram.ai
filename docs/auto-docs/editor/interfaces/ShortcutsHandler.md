# Interface: ShortcutsHandler

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Properties

* [commandDetail](/auto-docs/editor/interfaces/ShortcutsHandler.md#commanddetail)
* [commandId](/auto-docs/editor/interfaces/ShortcutsHandler.md#commandid)
* [execute](/auto-docs/editor/interfaces/ShortcutsHandler.md#execute)
* [isEnabled](/auto-docs/editor/interfaces/ShortcutsHandler.md#isenabled)
* [shortcuts](/auto-docs/editor/interfaces/ShortcutsHandler.md#shortcuts)

## Properties

### commandDetail

`Optional` **commandDetail**: `Omit`<[`Command`](/auto-docs/editor/interfaces/Command-1.md), `"id"`>

***

### commandId

**commandId**: `string`

***

### execute

**execute**: (...`args`: `any`\[]) => `void`

#### Type declaration

(`...args`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`\[] |

##### Returns

`void`

***

### isEnabled

`Optional` **isEnabled**: (...`args`: `any`\[]) => `boolean`

#### Type declaration

(`...args`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`\[] |

##### Returns

`boolean`

***

### shortcuts

**shortcuts**: `string`\[]
