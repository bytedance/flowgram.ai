# Interface: TypeEditorSpecialConfig\<TypeSchema>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |

## Table of contents

### Properties

* [customDefaultEditable](/auto-docs/type-editor/interfaces/TypeEditorSpecialConfig.md#customdefaulteditable)
* [customDefaultView](/auto-docs/type-editor/interfaces/TypeEditorSpecialConfig.md#customdefaultview)
* [customDisabledTypes](/auto-docs/type-editor/interfaces/TypeEditorSpecialConfig.md#customdisabledtypes)
* [customValidateName](/auto-docs/type-editor/interfaces/TypeEditorSpecialConfig.md#customvalidatename)
* [defaultMode](/auto-docs/type-editor/interfaces/TypeEditorSpecialConfig.md#defaultmode)
* [disableFixIndex](/auto-docs/type-editor/interfaces/TypeEditorSpecialConfig.md#disablefixindex)
* [disabledAdd](/auto-docs/type-editor/interfaces/TypeEditorSpecialConfig.md#disabledadd)
* [editorVisible](/auto-docs/type-editor/interfaces/TypeEditorSpecialConfig.md#editorvisible)
* [hiddenDrag](/auto-docs/type-editor/interfaces/TypeEditorSpecialConfig.md#hiddendrag)
* [useExtra](/auto-docs/type-editor/interfaces/TypeEditorSpecialConfig.md#useextra)

## Properties

### customDefaultEditable

`Optional` **customDefaultEditable**: (`rowData`: [`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>) => `string` | `true`

#### Type declaration

(`rowData`): `string` | `true`

自定义 default 禁用规则

##### Parameters

| Name | Type |
| :------ | :------ |
| `rowData` | [`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`> |

##### Returns

`string` | `true`

***

### customDefaultView

`Optional` **customDefaultView**: (`ctx`: { `disabled?`: `string` ; `onChange`: (`value`: `unknown`) => `void` ; `onSubmit`: (`value`: `unknown`) => `void` ; `rowData`: [`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`> ; `value`: `unknown`  }) => `Element`

#### Type declaration

(`ctx`): `Element`

自定义默认值展示

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.disabled?` | `string` |
| `ctx.onChange` | (`value`: `unknown`) => `void` |
| `ctx.onSubmit` | (`value`: `unknown`) => `void` |
| `ctx.rowData` | [`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`> |
| `ctx.value` | `unknown` |

##### Returns

`Element`

***

### customDisabledTypes

`Optional` **customDisabledTypes**: [`DisableTypeInfo`](/auto-docs/type-editor/interfaces/DisableTypeInfo.md)\[]

type-selector 禁用类型

***

### customValidateName

`Optional` **customValidateName**: (`name`: `string`) => `string`

#### Type declaration

(`name`): `string`

支持自定义校验 Name 函数

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

##### Returns

`string`

***

### defaultMode

`Optional` **defaultMode**: `"default"` | `"server"`

默认值展示模式

default 默认编辑模式
server 为展示后端兜底默认值

***

### disableFixIndex

`Optional` **disableFixIndex**: `boolean`

关闭自动修复 index

***

### disabledAdd

`Optional` **disabledAdd**: (`rowData`: [`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>) => `string`

#### Type declaration

(`rowData`): `string`

是否禁用 add

##### Parameters

| Name | Type |
| :------ | :------ |
| `rowData` | [`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`> |

##### Returns

`string`

***

### editorVisible

`Optional` **editorVisible**: `string` | `boolean`

是否可以编辑 key 的可见

***

### hiddenDrag

`Optional` **hiddenDrag**: `boolean`

隐藏拖拽

***

### useExtra

`Optional` **useExtra**: `boolean`

使用 extra 字段，而非 flow 字段
