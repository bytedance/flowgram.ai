# Interface: ShortcutContext\<TypeSchema>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |

## Table of contents

### Properties

* [onChange](/auto-docs/type-editor/interfaces/ShortcutContext.md#onchange)
* [onError](/auto-docs/type-editor/interfaces/ShortcutContext.md#onerror)
* [onRemoveEmptyLine](/auto-docs/type-editor/interfaces/ShortcutContext.md#onremoveemptyline)
* [rowData](/auto-docs/type-editor/interfaces/ShortcutContext.md#rowdata)
* [typeDefinitionService](/auto-docs/type-editor/interfaces/ShortcutContext.md#typedefinitionservice)
* [typeEditor](/auto-docs/type-editor/interfaces/ShortcutContext.md#typeeditor)
* [value](/auto-docs/type-editor/interfaces/ShortcutContext.md#value)

## Properties

### onChange

**onChange**: () => `void`

#### Type declaration

(): `void`

##### Returns

`void`

***

### onError

`Optional` **onError**: (`msg?`: `string`) => `void`

#### Type declaration

(`msg?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `msg?` | `string` |

##### Returns

`void`

***

### onRemoveEmptyLine

**onRemoveEmptyLine**: (`id`: `string`) => `void`

#### Type declaration

(`id`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

##### Returns

`void`

***

### rowData

**rowData**: [`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>

***

### typeDefinitionService

**typeDefinitionService**: [`TypeEditorRegistryManager`](/auto-docs/type-editor/classes/TypeEditorRegistryManager.md)<`TypeSchema`>

***

### typeEditor

**typeEditor**: [`TypeEditorService`](/auto-docs/type-editor/classes/TypeEditorService.md)<`TypeSchema`>

***

### value

**value**: `any`
