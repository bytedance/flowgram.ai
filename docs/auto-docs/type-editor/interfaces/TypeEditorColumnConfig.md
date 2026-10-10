# Interface: TypeEditorColumnConfig\<TypeSchema>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |

## Table of contents

### Properties

* [customDrop](/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#customdrop)
* [editRender](/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#editrender)
* [focusable](/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#focusable)
* [info](/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#info)
* [label](/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#label)
* [shortcuts](/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#shortcuts)
* [type](/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#type)
* [validateCell](/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#validatecell)
* [viewRender](/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#viewrender)
* [width](/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#width)

## Properties

### customDrop

`Optional` **customDrop**: `boolean`

是否自定义拖拽

***

### editRender

`Optional` **editRender**: `FC`<[`RenderProps`](/auto-docs/type-editor/interfaces/RenderProps.md)<`TypeSchema`>>

编辑态 render

***

### focusable

`Optional` **focusable**: `boolean`

是否可 focus

***

### info

`Optional` **info**: () => `string`

#### Type declaration

(): `string`

label ❓ 提示

##### Returns

`string`

***

### label

**label**: `string`

标题

***

### shortcuts

`Optional` **shortcuts**: `Object`

快捷键响应

#### Type declaration

| Name | Type |
| :------ | :------ |
| `onCopy?` | (`ctx`: [`ShortcutContext`](/auto-docs/type-editor/interfaces/ShortcutContext.md)<`TypeSchema`>) => `void` |
| `onDelete?` | (`ctx`: [`ShortcutContext`](/auto-docs/type-editor/interfaces/ShortcutContext.md)<`TypeSchema`>) => `void` |
| `onDown?` | (`ctx`: [`ShortcutContext`](/auto-docs/type-editor/interfaces/ShortcutContext.md)<`TypeSchema`>) => `void` |
| `onEnter?` | (`ctx`: [`ShortcutContext`](/auto-docs/type-editor/interfaces/ShortcutContext.md)<`TypeSchema`>) => `void` |
| `onLeft?` | (`ctx`: [`ShortcutContext`](/auto-docs/type-editor/interfaces/ShortcutContext.md)<`TypeSchema`>) => `void` |
| `onPaste?` | (`ctx`: [`ShortcutContext`](/auto-docs/type-editor/interfaces/ShortcutContext.md)<`TypeSchema`>) => `void` |
| `onRight?` | (`ctx`: [`ShortcutContext`](/auto-docs/type-editor/interfaces/ShortcutContext.md)<`TypeSchema`>) => `void` |
| `onTab?` | (`ctx`: [`ShortcutContext`](/auto-docs/type-editor/interfaces/ShortcutContext.md)<`TypeSchema`>) => `void` |
| `onUp?` | (`ctx`: [`ShortcutContext`](/auto-docs/type-editor/interfaces/ShortcutContext.md)<`TypeSchema`>) => `void` |

***

### type

**type**: [`TypeEditorColumnType`](/auto-docs/type-editor/enums/TypeEditorColumnType.md)

type

***

### validateCell

`Optional` **validateCell**: (`rowData`: [`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>, `extra`: [`TypeEditorSpecialConfig`](/auto-docs/type-editor/interfaces/TypeEditorSpecialConfig.md)<`TypeSchema`>) => { `level`: `"error"` | `"warning"` ; `msg?`: `string`  }

#### Type declaration

(`rowData`, `extra`): `Object`

校验该行是否存在错误

##### Parameters

| Name | Type |
| :------ | :------ |
| `rowData` | [`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`> |
| `extra` | [`TypeEditorSpecialConfig`](/auto-docs/type-editor/interfaces/TypeEditorSpecialConfig.md)<`TypeSchema`> |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `level` | `"error"` | `"warning"` |
| `msg?` | `string` |

***

### viewRender

`Optional` **viewRender**: `FC`<[`RenderProps`](/auto-docs/type-editor/interfaces/RenderProps.md)<`TypeSchema`>>

只读态 render

***

### width

`Optional` **width**: `number`

百分比
