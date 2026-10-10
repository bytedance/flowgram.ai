# Interface: TypeEditorColumnConfig\<TypeSchema>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |

## Table of contents

### Properties

* [customDrop](/en/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#customdrop)
* [editRender](/en/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#editrender)
* [focusable](/en/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#focusable)
* [info](/en/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#info)
* [label](/en/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#label)
* [shortcuts](/en/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#shortcuts)
* [type](/en/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#type)
* [validateCell](/en/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#validatecell)
* [viewRender](/en/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#viewrender)
* [width](/en/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md#width)

## Properties

### customDrop

`Optional` **customDrop**: `boolean`

是否自定义拖拽

***

### editRender

`Optional` **editRender**: `FC`<[`RenderProps`](/en/auto-docs/type-editor/interfaces/RenderProps.md)<`TypeSchema`>>

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
| `onCopy?` | (`ctx`: [`ShortcutContext`](/en/auto-docs/type-editor/interfaces/ShortcutContext.md)<`TypeSchema`>) => `void` |
| `onDelete?` | (`ctx`: [`ShortcutContext`](/en/auto-docs/type-editor/interfaces/ShortcutContext.md)<`TypeSchema`>) => `void` |
| `onDown?` | (`ctx`: [`ShortcutContext`](/en/auto-docs/type-editor/interfaces/ShortcutContext.md)<`TypeSchema`>) => `void` |
| `onEnter?` | (`ctx`: [`ShortcutContext`](/en/auto-docs/type-editor/interfaces/ShortcutContext.md)<`TypeSchema`>) => `void` |
| `onLeft?` | (`ctx`: [`ShortcutContext`](/en/auto-docs/type-editor/interfaces/ShortcutContext.md)<`TypeSchema`>) => `void` |
| `onPaste?` | (`ctx`: [`ShortcutContext`](/en/auto-docs/type-editor/interfaces/ShortcutContext.md)<`TypeSchema`>) => `void` |
| `onRight?` | (`ctx`: [`ShortcutContext`](/en/auto-docs/type-editor/interfaces/ShortcutContext.md)<`TypeSchema`>) => `void` |
| `onTab?` | (`ctx`: [`ShortcutContext`](/en/auto-docs/type-editor/interfaces/ShortcutContext.md)<`TypeSchema`>) => `void` |
| `onUp?` | (`ctx`: [`ShortcutContext`](/en/auto-docs/type-editor/interfaces/ShortcutContext.md)<`TypeSchema`>) => `void` |

***

### type

**type**: [`TypeEditorColumnType`](/en/auto-docs/type-editor/enums/TypeEditorColumnType.md)

type

***

### validateCell

`Optional` **validateCell**: (`rowData`: [`TypeEditorRowData`](/en/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>, `extra`: [`TypeEditorSpecialConfig`](/en/auto-docs/type-editor/interfaces/TypeEditorSpecialConfig.md)<`TypeSchema`>) => { `level`: `"error"` | `"warning"` ; `msg?`: `string`  }

#### Type declaration

(`rowData`, `extra`): `Object`

校验该行是否存在错误

##### Parameters

| Name | Type |
| :------ | :------ |
| `rowData` | [`TypeEditorRowData`](/en/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`> |
| `extra` | [`TypeEditorSpecialConfig`](/en/auto-docs/type-editor/interfaces/TypeEditorSpecialConfig.md)<`TypeSchema`> |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `level` | `"error"` | `"warning"` |
| `msg?` | `string` |

***

### viewRender

`Optional` **viewRender**: `FC`<[`RenderProps`](/en/auto-docs/type-editor/interfaces/RenderProps.md)<`TypeSchema`>>

只读态 render

***

### width

`Optional` **width**: `number`

百分比
