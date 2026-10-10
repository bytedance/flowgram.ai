# Interface: ShortcutsHandler

## Table of contents

### Properties

* [commandDetail](/auto-docs/shortcuts-plugin/interfaces/ShortcutsHandler.md#commanddetail)
* [commandId](/auto-docs/shortcuts-plugin/interfaces/ShortcutsHandler.md#commandid)
* [execute](/auto-docs/shortcuts-plugin/interfaces/ShortcutsHandler.md#execute)
* [isEnabled](/auto-docs/shortcuts-plugin/interfaces/ShortcutsHandler.md#isenabled)
* [shortcuts](/auto-docs/shortcuts-plugin/interfaces/ShortcutsHandler.md#shortcuts)

## Properties

### commandDetail

`Optional` **commandDetail**: `Omit`<`Command`, `"id"`>

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
