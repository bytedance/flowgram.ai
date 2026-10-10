# Interface: ShortcutsHandler

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Properties

* [commandDetail](/en/auto-docs/editor/interfaces/ShortcutsHandler.md#commanddetail)
* [commandId](/en/auto-docs/editor/interfaces/ShortcutsHandler.md#commandid)
* [execute](/en/auto-docs/editor/interfaces/ShortcutsHandler.md#execute)
* [isEnabled](/en/auto-docs/editor/interfaces/ShortcutsHandler.md#isenabled)
* [shortcuts](/en/auto-docs/editor/interfaces/ShortcutsHandler.md#shortcuts)

## Properties

### commandDetail

`Optional` **commandDetail**: `Omit`<[`Command`](/en/auto-docs/editor/interfaces/Command-1.md), `"id"`>

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
