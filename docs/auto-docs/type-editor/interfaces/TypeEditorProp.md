# Interface: TypeEditorProp\<Mode, TypeSchema>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Mode` | extends [`TypeEditorMode`](/auto-docs/type-editor/types/TypeEditorMode.md) |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |

## Table of contents

### Properties

* [customEmptyNode](/auto-docs/type-editor/interfaces/TypeEditorProp.md#customemptynode)
* [disableEditColumn](/auto-docs/type-editor/interfaces/TypeEditorProp.md#disableeditcolumn)
* [extraConfig](/auto-docs/type-editor/interfaces/TypeEditorProp.md#extraconfig)
* [forceUpdate](/auto-docs/type-editor/interfaces/TypeEditorProp.md#forceupdate)
* [getRootSchema](/auto-docs/type-editor/interfaces/TypeEditorProp.md#getrootschema)
* [mode](/auto-docs/type-editor/interfaces/TypeEditorProp.md#mode)
* [onChange](/auto-docs/type-editor/interfaces/TypeEditorProp.md#onchange)
* [onCustomSetValue](/auto-docs/type-editor/interfaces/TypeEditorProp.md#oncustomsetvalue)
* [onEditRowDataSource](/auto-docs/type-editor/interfaces/TypeEditorProp.md#oneditrowdatasource)
* [onError](/auto-docs/type-editor/interfaces/TypeEditorProp.md#onerror)
* [onFieldChange](/auto-docs/type-editor/interfaces/TypeEditorProp.md#onfieldchange)
* [onInit](/auto-docs/type-editor/interfaces/TypeEditorProp.md#oninit)
* [onPaste](/auto-docs/type-editor/interfaces/TypeEditorProp.md#onpaste)
* [readonly](/auto-docs/type-editor/interfaces/TypeEditorProp.md#readonly)
* [rootLevel](/auto-docs/type-editor/interfaces/TypeEditorProp.md#rootlevel)
* [tableClassName](/auto-docs/type-editor/interfaces/TypeEditorProp.md#tableclassname)
* [toolbarConfig](/auto-docs/type-editor/interfaces/TypeEditorProp.md#toolbarconfig)
* [typeRegistryCreators](/auto-docs/type-editor/interfaces/TypeEditorProp.md#typeregistrycreators)
* [value](/auto-docs/type-editor/interfaces/TypeEditorProp.md#value)
* [viewConfigs](/auto-docs/type-editor/interfaces/TypeEditorProp.md#viewconfigs)

## Properties

### customEmptyNode

`Optional` **customEmptyNode**: `ReactElement`

自定义空状态

***

### disableEditColumn

`Optional` **disableEditColumn**: { `column`: [`TypeEditorColumnType`](/auto-docs/type-editor/enums/TypeEditorColumnType.md) ; `reason`: `string`  }\[]

不能编辑的列
和 TypeSchema 中 editable 的关系
editable 为 false，会将 disableEditColumn 每个 column 都填上

***

### extraConfig

`Optional` **extraConfig**: [`TypeEditorSpecialConfig`](/auto-docs/type-editor/interfaces/TypeEditorSpecialConfig.md)<`TypeSchema`>

各个 cell 的特化配置

***

### forceUpdate

`Optional` **forceUpdate**: `boolean`

忽略报错强制更新

***

### getRootSchema

`Optional` **getRootSchema**: (`schema`: `TypeSchema`) => `TypeSchema`

#### Type declaration

(`schema`): `TypeSchema`

获取全局 add 的 root schema

##### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `TypeSchema` |

##### Returns

`TypeSchema`

***

### mode

**mode**: `Mode`

type editor 模式类型

***

### onChange

`Optional` **onChange**: (`newValue`: [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>) => `void`

#### Type declaration

(`newValue`): `void`

onChange

##### Parameters

| Name | Type |
| :------ | :------ |
| `newValue` | [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`> |

##### Returns

`void`

***

### onCustomSetValue

`Optional` **onCustomSetValue**: (`newValue`: [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>) => [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

#### Type declaration

(`newValue`): [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

当执行 setValue

##### Parameters

| Name | Type |
| :------ | :------ |
| `newValue` | [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`> |

##### Returns

[`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

***

### onEditRowDataSource

`Optional` **onEditRowDataSource**: (`data`: [`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>\[]) => [`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>\[]

#### Type declaration

(`data`): [`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>\[]

每次设置 DataSource 前调用，最后修改值的钩子

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>\[] |

##### Returns

[`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>\[]

***

### onError

`Optional` **onError**: (`msg?`: `string`\[]) => `void`

#### Type declaration

(`msg?`): `void`

onError

##### Parameters

| Name | Type |
| :------ | :------ |
| `msg?` | `string`\[] |

##### Returns

`void`

***

### onFieldChange

`Optional` **onFieldChange**: (`ctx`: [`TypeChangeContext`](/auto-docs/type-editor/interfaces/TypeChangeContext.md)) => `void`

#### Type declaration

(`ctx`): `void`

当具体某个 field change

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`TypeChangeContext`](/auto-docs/type-editor/interfaces/TypeChangeContext.md) |

##### Returns

`void`

***

### onInit

`Optional` **onInit**: (`editor`: `MutableRefObject`<[`TypeEditorRef`](/auto-docs/type-editor/interfaces/TypeEditorRef.md)<`Mode`, `TypeSchema`>>) => `void`

#### Type declaration

(`editor`): `void`

onInit

##### Parameters

| Name | Type |
| :------ | :------ |
| `editor` | `MutableRefObject`<[`TypeEditorRef`](/auto-docs/type-editor/interfaces/TypeEditorRef.md)<`Mode`, `TypeSchema`>> |

##### Returns

`void`

***

### onPaste

`Optional` **onPaste**: (`typeSchema?`: `TypeSchema`) => `TypeSchema`

#### Type declaration

(`typeSchema?`): `TypeSchema`

onPaste

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema?` | `TypeSchema` |

##### Returns

`TypeSchema`

***

### readonly

`Optional` **readonly**: `boolean`

只读态

***

### rootLevel

`Optional` **rootLevel**: `number`

根节点层级

***

### tableClassName

`Optional` **tableClassName**: `string`

***

### toolbarConfig

`Optional` **toolbarConfig**: ([`ToolbarKey`](/auto-docs/type-editor/enums/ToolbarKey.md) | [`ToolbarConfig`](/auto-docs/type-editor/types/ToolbarConfig.md))\[]

菜单栏配置

***

### typeRegistryCreators

`Optional` **typeRegistryCreators**: `TypeRegistryCreatorsAdapter`<`IJsonSchema`>\[]

***

### value

`Optional` **value**: [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

value

***

### viewConfigs

**viewConfigs**: [`TypeEditorColumnViewConfig`](/auto-docs/type-editor/interfaces/TypeEditorColumnViewConfig.md) & { `config?`: `Partial`<`Omit`<[`TypeEditorColumnConfig`](/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md)<`TypeSchema`>, `"type"`>>  }\[]

每个列的配置
