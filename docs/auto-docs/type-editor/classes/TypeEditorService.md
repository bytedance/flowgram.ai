# Class: TypeEditorService\<TypeSchema>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |

## Table of contents

### Constructors

* [constructor](/auto-docs/type-editor/classes/TypeEditorService.md#constructor)

### Properties

* [blink](/auto-docs/type-editor/classes/TypeEditorService.md#blink)
* [clipboard](/auto-docs/type-editor/classes/TypeEditorService.md#clipboard)
* [columnViewConfig](/auto-docs/type-editor/classes/TypeEditorService.md#columnviewconfig)
* [dataSourceMap](/auto-docs/type-editor/classes/TypeEditorService.md#datasourcemap)
* [dataSourceTouchedMap](/auto-docs/type-editor/classes/TypeEditorService.md#datasourcetouchedmap)
* [editValue](/auto-docs/type-editor/classes/TypeEditorService.md#editvalue)
* [errorMsgs](/auto-docs/type-editor/classes/TypeEditorService.md#errormsgs)
* [onActivePosChange](/auto-docs/type-editor/classes/TypeEditorService.md#onactiveposchange)
* [onChange](/auto-docs/type-editor/classes/TypeEditorService.md#onchange)
* [onDropInfoChange](/auto-docs/type-editor/classes/TypeEditorService.md#ondropinfochange)
* [onGlobalAdd](/auto-docs/type-editor/classes/TypeEditorService.md#onglobaladd)
* [onRemoveEmptyLine](/auto-docs/type-editor/classes/TypeEditorService.md#onremoveemptyline)
* [rootTypeSchema](/auto-docs/type-editor/classes/TypeEditorService.md#roottypeschema)
* [typeDefinition](/auto-docs/type-editor/classes/TypeEditorService.md#typedefinition)
* [typeRegistryCreators](/auto-docs/type-editor/classes/TypeEditorService.md#typeregistrycreators)

### Accessors

* [activePos](/auto-docs/type-editor/classes/TypeEditorService.md#activepos)
* [dropInfo](/auto-docs/type-editor/classes/TypeEditorService.md#dropinfo)

### Methods

* [addConfigProps](/auto-docs/type-editor/classes/TypeEditorService.md#addconfigprops)
* [checkActivePosError](/auto-docs/type-editor/classes/TypeEditorService.md#checkactiveposerror)
* [clearActivePos](/auto-docs/type-editor/classes/TypeEditorService.md#clearactivepos)
* [clearDropInfo](/auto-docs/type-editor/classes/TypeEditorService.md#cleardropinfo)
* [getConfigByType](/auto-docs/type-editor/classes/TypeEditorService.md#getconfigbytype)
* [getConfigs](/auto-docs/type-editor/classes/TypeEditorService.md#getconfigs)
* [getDataSource](/auto-docs/type-editor/classes/TypeEditorService.md#getdatasource)
* [moveActivePosToLastColumn](/auto-docs/type-editor/classes/TypeEditorService.md#moveactivepostolastcolumn)
* [moveActivePosToLastLine](/auto-docs/type-editor/classes/TypeEditorService.md#moveactivepostolastline)
* [moveActivePosToNextColumn](/auto-docs/type-editor/classes/TypeEditorService.md#moveactivepostonextcolumn)
* [moveActivePosToNextItem](/auto-docs/type-editor/classes/TypeEditorService.md#moveactivepostonextitem)
* [moveActivePosToNextLine](/auto-docs/type-editor/classes/TypeEditorService.md#moveactivepostonextline)
* [moveActivePosToNextLineWithAddLine](/auto-docs/type-editor/classes/TypeEditorService.md#moveactivepostonextlinewithaddline)
* [refreshErrorMsgAfterRemove](/auto-docs/type-editor/classes/TypeEditorService.md#refresherrormsgafterremove)
* [registerConfigs](/auto-docs/type-editor/classes/TypeEditorService.md#registerconfigs)
* [setActivePos](/auto-docs/type-editor/classes/TypeEditorService.md#setactivepos)
* [setColumnViewConfig](/auto-docs/type-editor/classes/TypeEditorService.md#setcolumnviewconfig)
* [setDataSource](/auto-docs/type-editor/classes/TypeEditorService.md#setdatasource)
* [setDropInfo](/auto-docs/type-editor/classes/TypeEditorService.md#setdropinfo)
* [setEditValue](/auto-docs/type-editor/classes/TypeEditorService.md#seteditvalue)
* [setErrorMsg](/auto-docs/type-editor/classes/TypeEditorService.md#seterrormsg)
* [triggerShortcutEvent](/auto-docs/type-editor/classes/TypeEditorService.md#triggershortcutevent)

## Constructors

### constructor

**new TypeEditorService**<`TypeSchema`>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TypeSchema` | extends `IJsonSchema` |

## Properties

### blink

**blink**: `MonitorData`<`boolean`>

***

### clipboard

**clipboard**: `ClipboardService`

***

### columnViewConfig

**columnViewConfig**: [`TypeEditorColumnViewConfig`](/auto-docs/type-editor/interfaces/TypeEditorColumnViewConfig.md)\[] = `[]`

***

### dataSourceMap

**dataSourceMap**: `Record`<`string`, [`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>> = `{}`

***

### dataSourceTouchedMap

**dataSourceTouchedMap**: `Record`<`string`, `boolean`> = `{}`

***

### editValue

**editValue**: `unknown`

***

### errorMsgs

**errorMsgs**: `MonitorData`<{ `msg?`: `string` ; `pos`: [`TypeEditorPos`](/auto-docs/type-editor/interfaces/TypeEditorPos.md)  }\[]>

***

### onActivePosChange

**onActivePosChange**: `any`

***

### onChange

**onChange**: (`typeSchema?`: `TypeSchema`, `ctx?`: { `storeState?`: `boolean`  }) => `void`

#### Type declaration

(`typeSchema?`, `ctx?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema?` | `TypeSchema` |
| `ctx?` | `Object` |
| `ctx.storeState?` | `boolean` |

##### Returns

`void`

***

### onDropInfoChange

**onDropInfoChange**: `any`

***

### onGlobalAdd

**onGlobalAdd**: (`id`: `string`) => `void`

#### Type declaration

(`id`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

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

### rootTypeSchema

**rootTypeSchema**: `TypeSchema`

***

### typeDefinition

**typeDefinition**: [`TypeEditorRegistryManager`](/auto-docs/type-editor/classes/TypeEditorRegistryManager.md)<`TypeSchema`>

***

### typeRegistryCreators

`Optional` **typeRegistryCreators**: `TypeRegistryCreatorsAdapter`<`TypeSchema`>\[]

## Accessors

### activePos

`get` **activePos**(): [`TypeEditorPos`](/auto-docs/type-editor/interfaces/TypeEditorPos.md)

#### Returns

[`TypeEditorPos`](/auto-docs/type-editor/interfaces/TypeEditorPos.md)

***

### dropInfo

`get` **dropInfo**(): [`TypeEditorDropInfo`](/auto-docs/type-editor/interfaces/TypeEditorDropInfo.md)

#### Returns

[`TypeEditorDropInfo`](/auto-docs/type-editor/interfaces/TypeEditorDropInfo.md)

## Methods

### addConfigProps

**addConfigProps**(`type`, `config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`TypeEditorColumnType`](/auto-docs/type-editor/enums/TypeEditorColumnType.md) |
| `config` | `Partial`<`Omit`<[`TypeEditorColumnConfig`](/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md)<`TypeSchema`>, `"type"`>> |

#### Returns

`void`

***

### checkActivePosError

**checkActivePosError**(): `boolean`

#### Returns

`boolean`

***

### clearActivePos

**clearActivePos**(): `void`

#### Returns

`void`

***

### clearDropInfo

**clearDropInfo**(): `void`

#### Returns

`void`

***

### getConfigByType

**getConfigByType**(`type`): [`TypeEditorColumnConfig`](/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md)<`TypeSchema`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`TypeEditorColumnType`](/auto-docs/type-editor/enums/TypeEditorColumnType.md) |

#### Returns

[`TypeEditorColumnConfig`](/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md)<`TypeSchema`>

***

### getConfigs

**getConfigs**(): [`TypeEditorColumnConfig`](/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md)<`TypeSchema`>\[]

#### Returns

[`TypeEditorColumnConfig`](/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md)<`TypeSchema`>\[]

***

### getDataSource

**getDataSource**(): [`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>\[]

#### Returns

[`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>\[]

***

### moveActivePosToLastColumn

**moveActivePosToLastColumn**(): `void`

#### Returns

`void`

***

### moveActivePosToLastLine

**moveActivePosToLastLine**(): `void`

#### Returns

`void`

***

### moveActivePosToNextColumn

**moveActivePosToNextColumn**(): `void`

#### Returns

`void`

***

### moveActivePosToNextItem

**moveActivePosToNextItem**(): `void`

#### Returns

`void`

***

### moveActivePosToNextLine

**moveActivePosToNextLine**(): `void`

#### Returns

`void`

***

### moveActivePosToNextLineWithAddLine

**moveActivePosToNextLineWithAddLine**(`rowData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rowData` | [`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`> |

#### Returns

`void`

***

### refreshErrorMsgAfterRemove

**refreshErrorMsgAfterRemove**(`index`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`void`

***

### registerConfigs

**registerConfigs**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`TypeEditorColumnConfig`](/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md)<`TypeSchema`> | [`TypeEditorColumnConfig`](/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md)<`TypeSchema`>\[] |

#### Returns

`void`

***

### setActivePos

**setActivePos**(`pos`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | [`TypeEditorPos`](/auto-docs/type-editor/interfaces/TypeEditorPos.md) |

#### Returns

`void`

***

### setColumnViewConfig

**setColumnViewConfig**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`TypeEditorColumnViewConfig`](/auto-docs/type-editor/interfaces/TypeEditorColumnViewConfig.md)\[] |

#### Returns

`void`

***

### setDataSource

**setDataSource**(`newData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newData` | [`TypeEditorRowData`](/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>\[] |

#### Returns

`void`

***

### setDropInfo

**setDropInfo**(`dropInfo`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dropInfo` | [`TypeEditorDropInfo`](/auto-docs/type-editor/interfaces/TypeEditorDropInfo.md) |

#### Returns

`void`

***

### setEditValue

**setEditValue**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `unknown` |

#### Returns

`void`

***

### setErrorMsg

**setErrorMsg**(`pos`, `msg?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | [`TypeEditorPos`](/auto-docs/type-editor/interfaces/TypeEditorPos.md) |
| `msg?` | `string` |

#### Returns

`void`

***

### triggerShortcutEvent

**triggerShortcutEvent**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `"enter"` | `"tab"` | `"left"` | `"right"` | `"up"` | `"down"` | `"copy"` | `"paste"` | `"delete"` |

#### Returns

`void`
