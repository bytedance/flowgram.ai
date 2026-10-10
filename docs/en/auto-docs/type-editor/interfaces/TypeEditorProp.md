# Interface: TypeEditorProp\<Mode, TypeSchema>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Mode` | extends [`TypeEditorMode`](/en/auto-docs/type-editor/types/TypeEditorMode.md) |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |

## Table of contents

### Properties

* [customEmptyNode](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#customemptynode)
* [disableEditColumn](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#disableeditcolumn)
* [extraConfig](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#extraconfig)
* [forceUpdate](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#forceupdate)
* [getRootSchema](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#getrootschema)
* [mode](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#mode)
* [onChange](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#onchange)
* [onCustomSetValue](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#oncustomsetvalue)
* [onEditRowDataSource](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#oneditrowdatasource)
* [onError](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#onerror)
* [onFieldChange](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#onfieldchange)
* [onInit](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#oninit)
* [onPaste](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#onpaste)
* [readonly](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#readonly)
* [rootLevel](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#rootlevel)
* [tableClassName](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#tableclassname)
* [toolbarConfig](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#toolbarconfig)
* [typeRegistryCreators](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#typeregistrycreators)
* [value](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#value)
* [viewConfigs](/en/auto-docs/type-editor/interfaces/TypeEditorProp.md#viewconfigs)

## Properties

### customEmptyNode

`Optional` **customEmptyNode**: `ReactElement`

自定义空状态

***

### disableEditColumn

`Optional` **disableEditColumn**: { `column`: [`TypeEditorColumnType`](/en/auto-docs/type-editor/enums/TypeEditorColumnType.md) ; `reason`: `string`  }\[]

不能编辑的列
和 TypeSchema 中 editable 的关系
editable 为 false，会将 disableEditColumn 每个 column 都填上

***

### extraConfig

`Optional` **extraConfig**: [`TypeEditorSpecialConfig`](/en/auto-docs/type-editor/interfaces/TypeEditorSpecialConfig.md)<`TypeSchema`>

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

`Optional` **onChange**: (`newValue`: [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>) => `void`

#### Type declaration

(`newValue`): `void`

onChange

##### Parameters

| Name | Type |
| :------ | :------ |
| `newValue` | [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`> |

##### Returns

`void`

***

### onCustomSetValue

`Optional` **onCustomSetValue**: (`newValue`: [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>) => [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

#### Type declaration

(`newValue`): [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

当执行 setValue

##### Parameters

| Name | Type |
| :------ | :------ |
| `newValue` | [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`> |

##### Returns

[`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

***

### onEditRowDataSource

`Optional` **onEditRowDataSource**: (`data`: [`TypeEditorRowData`](/en/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>\[]) => [`TypeEditorRowData`](/en/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>\[]

#### Type declaration

(`data`): [`TypeEditorRowData`](/en/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>\[]

每次设置 DataSource 前调用，最后修改值的钩子

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`TypeEditorRowData`](/en/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>\[] |

##### Returns

[`TypeEditorRowData`](/en/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>\[]

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

`Optional` **onFieldChange**: (`ctx`: [`TypeChangeContext`](/en/auto-docs/type-editor/interfaces/TypeChangeContext.md)) => `void`

#### Type declaration

(`ctx`): `void`

当具体某个 field change

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`TypeChangeContext`](/en/auto-docs/type-editor/interfaces/TypeChangeContext.md) |

##### Returns

`void`

***

### onInit

`Optional` **onInit**: (`editor`: `MutableRefObject`<[`TypeEditorRef`](/en/auto-docs/type-editor/interfaces/TypeEditorRef.md)<`Mode`, `TypeSchema`>>) => `void`

#### Type declaration

(`editor`): `void`

onInit

##### Parameters

| Name | Type |
| :------ | :------ |
| `editor` | `MutableRefObject`<[`TypeEditorRef`](/en/auto-docs/type-editor/interfaces/TypeEditorRef.md)<`Mode`, `TypeSchema`>> |

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

`Optional` **toolbarConfig**: ([`ToolbarKey`](/en/auto-docs/type-editor/enums/ToolbarKey.md) | [`ToolbarConfig`](/en/auto-docs/type-editor/types/ToolbarConfig.md))\[]

菜单栏配置

***

### typeRegistryCreators

`Optional` **typeRegistryCreators**: `TypeRegistryCreatorsAdapter`<`IJsonSchema`>\[]

***

### value

`Optional` **value**: [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

value

***

### viewConfigs

**viewConfigs**: [`TypeEditorColumnViewConfig`](/en/auto-docs/type-editor/interfaces/TypeEditorColumnViewConfig.md) & { `config?`: `Partial`<`Omit`<[`TypeEditorColumnConfig`](/en/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md)<`TypeSchema`>, `"type"`>>  }\[]

每个列的配置
