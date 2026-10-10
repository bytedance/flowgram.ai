# Interface: RenderProps\<TypeSchema>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |

## Table of contents

### Properties

* [config](/en/auto-docs/type-editor/interfaces/RenderProps.md#config)
* [dragSource](/en/auto-docs/type-editor/interfaces/RenderProps.md#dragsource)
* [error](/en/auto-docs/type-editor/interfaces/RenderProps.md#error)
* [onChange](/en/auto-docs/type-editor/interfaces/RenderProps.md#onchange)
* [onChildrenVisibleChange](/en/auto-docs/type-editor/interfaces/RenderProps.md#onchildrenvisiblechange)
* [onEditMode](/en/auto-docs/type-editor/interfaces/RenderProps.md#oneditmode)
* [onError](/en/auto-docs/type-editor/interfaces/RenderProps.md#onerror)
* [onFieldChange](/en/auto-docs/type-editor/interfaces/RenderProps.md#onfieldchange)
* [onPaste](/en/auto-docs/type-editor/interfaces/RenderProps.md#onpaste)
* [onViewMode](/en/auto-docs/type-editor/interfaces/RenderProps.md#onviewmode)
* [readonly](/en/auto-docs/type-editor/interfaces/RenderProps.md#readonly)
* [rowData](/en/auto-docs/type-editor/interfaces/RenderProps.md#rowdata)
* [typeEditor](/en/auto-docs/type-editor/interfaces/RenderProps.md#typeeditor)
* [unOpenKeys](/en/auto-docs/type-editor/interfaces/RenderProps.md#unopenkeys)

## Properties

### config

**config**: `Omit`<[`TypeEditorColumnViewConfig`](/en/auto-docs/type-editor/interfaces/TypeEditorColumnViewConfig.md), `"type"` | `"visible"`>

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

`Optional` **onFieldChange**: (`ctx`: [`TypeChangeContext`](/en/auto-docs/type-editor/interfaces/TypeChangeContext.md)) => `void`

#### Type declaration

(`ctx`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`TypeChangeContext`](/en/auto-docs/type-editor/interfaces/TypeChangeContext.md) |

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

**rowData**: [`TypeEditorRowData`](/en/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>

***

### typeEditor

**typeEditor**: [`TypeEditorService`](/en/auto-docs/type-editor/classes/TypeEditorService.md)<`TypeSchema`>

***

### unOpenKeys

**unOpenKeys**: `Record`<`string`, `boolean`>
