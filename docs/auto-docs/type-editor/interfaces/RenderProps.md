# Interface: RenderProps\<TypeSchema>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |

## Table of contents

### Properties

* [config](/auto-docs/type-editor/interfaces/RenderProps.md#config)
* [dragSource](/auto-docs/type-editor/interfaces/RenderProps.md#dragsource)
* [error](/auto-docs/type-editor/interfaces/RenderProps.md#error)
* [onChange](/auto-docs/type-editor/interfaces/RenderProps.md#onchange)
* [onChildrenVisibleChange](/auto-docs/type-editor/interfaces/RenderProps.md#onchildrenvisiblechange)
* [onEditMode](/auto-docs/type-editor/interfaces/RenderProps.md#oneditmode)
* [onError](/auto-docs/type-editor/interfaces/RenderProps.md#onerror)
* [onFieldChange](/auto-docs/type-editor/interfaces/RenderProps.md#onfieldchange)
* [onPaste](/auto-docs/type-editor/interfaces/RenderProps.md#onpaste)
* [onViewMode](/auto-docs/type-editor/interfaces/RenderProps.md#onviewmode)
* [readonly](/auto-docs/type-editor/interfaces/RenderProps.md#readonly)
* [rowData](/auto-docs/type-editor/interfaces/RenderProps.md#rowdata)
* [typeEditor](/auto-docs/type-editor/interfaces/RenderProps.md#typeeditor)
* [unOpenKeys](/auto-docs/type-editor/interfaces/RenderProps.md#unopenkeys)

## Properties

### config

**config**: `Omit`<[`TypeEditorColumnViewConfig`](/auto-docs/type-editor/interfaces/TypeEditorColumnViewConfig.md), `"type"` | `"visible"`>

***

### dragSource

`Optional` **dragSource**: `Ref`<`HTMLSpanElement`>

***

### error

**error**: `boolean`

***

### onChange

**onChange**: () => `void`

#### Type declaration

(): `void`

##### Returns

`void`

***

### onChildrenVisibleChange

**onChildrenVisibleChange**: (`rowDataKey`: `string`, `newVal`: `boolean`) => `void`

#### Type declaration

(`rowDataKey`, `newVal`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `rowDataKey` | `string` |
| `newVal` | `boolean` |

##### Returns

`void`

***

### onEditMode

**onEditMode**: () => `void`

#### Type declaration

(): `void`

##### Returns

`void`

***

### onError

`Optional` **onError**: (`msg`: `string`\[]) => `void`

#### Type declaration

(`msg`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string`\[] |

##### Returns

`void`

***

### onFieldChange

`Optional` **onFieldChange**: (`ctx`: [`TypeChangeContext`](/auto-docs/type-editor/interfaces/TypeChangeContext.md)) => `void`

#### Type declaration

(`ctx`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`TypeChangeContext`](/auto-docs/type-editor/interfaces/TypeChangeContext.md) |

##### Returns

`void`

***

### onPaste

`Optional` **onPaste**: (`typeSchema?`: `TypeSchema`) => `TypeSchema`

#### Type declaration

(`typeSchema?`): `TypeSchema`

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema?` | `TypeSchema` |

##### Returns

`TypeSchema`

***

### onViewMode

**onViewMode**: () => `void`

#### Type declaration

(): `void`

##### Returns

`void`

***

### readonly

`Optional` **readonly**: `boolean`

***

### rowData

**rowData**: [`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>

***

### typeEditor

**typeEditor**: [`TypeEditorService`](/auto-docs/type-editor/classes/TypeEditorService.md)<`TypeSchema`>

***

### unOpenKeys

**unOpenKeys**: `Record`<`string`, `boolean`>
