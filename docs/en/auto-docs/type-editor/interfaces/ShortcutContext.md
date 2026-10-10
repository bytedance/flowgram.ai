# Interface: ShortcutContext\<TypeSchema>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |

## Table of contents

### Properties

* [onChange](/en/auto-docs/type-editor/interfaces/ShortcutContext.md#onchange)
* [onError](/en/auto-docs/type-editor/interfaces/ShortcutContext.md#onerror)
* [onRemoveEmptyLine](/en/auto-docs/type-editor/interfaces/ShortcutContext.md#onremoveemptyline)
* [rowData](/en/auto-docs/type-editor/interfaces/ShortcutContext.md#rowdata)
* [typeDefinitionService](/en/auto-docs/type-editor/interfaces/ShortcutContext.md#typedefinitionservice)
* [typeEditor](/en/auto-docs/type-editor/interfaces/ShortcutContext.md#typeeditor)
* [value](/en/auto-docs/type-editor/interfaces/ShortcutContext.md#value)

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

**rowData**: [`TypeEditorRowData`](/en/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>

***

### typeDefinitionService

**typeDefinitionService**: [`TypeEditorRegistryManager`](/en/auto-docs/type-editor/classes/TypeEditorRegistryManager.md)<`TypeSchema`>

***

### typeEditor

**typeEditor**: [`TypeEditorService`](/en/auto-docs/type-editor/classes/TypeEditorService.md)<`TypeSchema`>

***

### value

**value**: `any`
