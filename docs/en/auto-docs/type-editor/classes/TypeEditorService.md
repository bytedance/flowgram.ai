# Class: TypeEditorService\<TypeSchema>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |

## Table of contents

### Constructors

* [constructor](/en/auto-docs/type-editor/classes/TypeEditorService.md#constructor)

### Properties

* [blink](/en/auto-docs/type-editor/classes/TypeEditorService.md#blink)
* [clipboard](/en/auto-docs/type-editor/classes/TypeEditorService.md#clipboard)
* [columnViewConfig](/en/auto-docs/type-editor/classes/TypeEditorService.md#columnviewconfig)
* [dataSourceMap](/en/auto-docs/type-editor/classes/TypeEditorService.md#datasourcemap)
* [dataSourceTouchedMap](/en/auto-docs/type-editor/classes/TypeEditorService.md#datasourcetouchedmap)
* [editValue](/en/auto-docs/type-editor/classes/TypeEditorService.md#editvalue)
* [errorMsgs](/en/auto-docs/type-editor/classes/TypeEditorService.md#errormsgs)
* [onActivePosChange](/en/auto-docs/type-editor/classes/TypeEditorService.md#onactiveposchange)
* [onChange](/en/auto-docs/type-editor/classes/TypeEditorService.md#onchange)
* [onDropInfoChange](/en/auto-docs/type-editor/classes/TypeEditorService.md#ondropinfochange)
* [onGlobalAdd](/en/auto-docs/type-editor/classes/TypeEditorService.md#onglobaladd)
* [onRemoveEmptyLine](/en/auto-docs/type-editor/classes/TypeEditorService.md#onremoveemptyline)
* [rootTypeSchema](/en/auto-docs/type-editor/classes/TypeEditorService.md#roottypeschema)
* [typeDefinition](/en/auto-docs/type-editor/classes/TypeEditorService.md#typedefinition)
* [typeRegistryCreators](/en/auto-docs/type-editor/classes/TypeEditorService.md#typeregistrycreators)

### Accessors

* [activePos](/en/auto-docs/type-editor/classes/TypeEditorService.md#activepos)
* [dropInfo](/en/auto-docs/type-editor/classes/TypeEditorService.md#dropinfo)

### Methods

* [addConfigProps](/en/auto-docs/type-editor/classes/TypeEditorService.md#addconfigprops)
* [checkActivePosError](/en/auto-docs/type-editor/classes/TypeEditorService.md#checkactiveposerror)
* [clearActivePos](/en/auto-docs/type-editor/classes/TypeEditorService.md#clearactivepos)
* [clearDropInfo](/en/auto-docs/type-editor/classes/TypeEditorService.md#cleardropinfo)
* [getConfigByType](/en/auto-docs/type-editor/classes/TypeEditorService.md#getconfigbytype)
* [getConfigs](/en/auto-docs/type-editor/classes/TypeEditorService.md#getconfigs)
* [getDataSource](/en/auto-docs/type-editor/classes/TypeEditorService.md#getdatasource)
* [moveActivePosToLastColumn](/en/auto-docs/type-editor/classes/TypeEditorService.md#moveactivepostolastcolumn)
* [moveActivePosToLastLine](/en/auto-docs/type-editor/classes/TypeEditorService.md#moveactivepostolastline)
* [moveActivePosToNextColumn](/en/auto-docs/type-editor/classes/TypeEditorService.md#moveactivepostonextcolumn)
* [moveActivePosToNextItem](/en/auto-docs/type-editor/classes/TypeEditorService.md#moveactivepostonextitem)
* [moveActivePosToNextLine](/en/auto-docs/type-editor/classes/TypeEditorService.md#moveactivepostonextline)
* [moveActivePosToNextLineWithAddLine](/en/auto-docs/type-editor/classes/TypeEditorService.md#moveactivepostonextlinewithaddline)
* [refreshErrorMsgAfterRemove](/en/auto-docs/type-editor/classes/TypeEditorService.md#refresherrormsgafterremove)
* [registerConfigs](/en/auto-docs/type-editor/classes/TypeEditorService.md#registerconfigs)
* [setActivePos](/en/auto-docs/type-editor/classes/TypeEditorService.md#setactivepos)
* [setColumnViewConfig](/en/auto-docs/type-editor/classes/TypeEditorService.md#setcolumnviewconfig)
* [setDataSource](/en/auto-docs/type-editor/classes/TypeEditorService.md#setdatasource)
* [setDropInfo](/en/auto-docs/type-editor/classes/TypeEditorService.md#setdropinfo)
* [setEditValue](/en/auto-docs/type-editor/classes/TypeEditorService.md#seteditvalue)
* [setErrorMsg](/en/auto-docs/type-editor/classes/TypeEditorService.md#seterrormsg)
* [triggerShortcutEvent](/en/auto-docs/type-editor/classes/TypeEditorService.md#triggershortcutevent)

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

**columnViewConfig**: [`TypeEditorColumnViewConfig`](/en/auto-docs/type-editor/interfaces/TypeEditorColumnViewConfig.md)\[] = `[]`

***

### dataSourceMap

**dataSourceMap**: `Record`<`string`, [`TypeEditorRowData`](/en/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>> = `{}`

***

### dataSourceTouchedMap

**dataSourceTouchedMap**: `Record`<`string`, `boolean`> = `{}`

***

### editValue

**editValue**: `unknown`

***

### errorMsgs

**errorMsgs**: `MonitorData`<{ `msg?`: `string` ; `pos`: [`TypeEditorPos`](/en/auto-docs/type-editor/interfaces/TypeEditorPos.md)  }\[]>

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

**typeDefinition**: [`TypeEditorRegistryManager`](/en/auto-docs/type-editor/classes/TypeEditorRegistryManager.md)<`TypeSchema`>

***

### typeRegistryCreators

`Optional` **typeRegistryCreators**: `TypeRegistryCreatorsAdapter`<`TypeSchema`>\[]

## Accessors

### activePos

`get` **activePos**(): [`TypeEditorPos`](/en/auto-docs/type-editor/interfaces/TypeEditorPos.md)

#### Returns

[`TypeEditorPos`](/en/auto-docs/type-editor/interfaces/TypeEditorPos.md)

***

### dropInfo

`get` **dropInfo**(): [`TypeEditorDropInfo`](/en/auto-docs/type-editor/interfaces/TypeEditorDropInfo.md)

#### Returns

[`TypeEditorDropInfo`](/en/auto-docs/type-editor/interfaces/TypeEditorDropInfo.md)

## Methods

### addConfigProps

**addConfigProps**(`type`, `config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`TypeEditorColumnType`](/en/auto-docs/type-editor/enums/TypeEditorColumnType.md) |
| `config` | `Partial`<`Omit`<[`TypeEditorColumnConfig`](/en/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md)<`TypeSchema`>, `"type"`>> |

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

**getConfigByType**(`type`): [`TypeEditorColumnConfig`](/en/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md)<`TypeSchema`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`TypeEditorColumnType`](/en/auto-docs/type-editor/enums/TypeEditorColumnType.md) |

#### Returns

[`TypeEditorColumnConfig`](/en/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md)<`TypeSchema`>

***

### getConfigs

**getConfigs**(): [`TypeEditorColumnConfig`](/en/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md)<`TypeSchema`>\[]

#### Returns

[`TypeEditorColumnConfig`](/en/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md)<`TypeSchema`>\[]

***

### getDataSource

**getDataSource**(): [`TypeEditorRowData`](/en/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>\[]

#### Returns

[`TypeEditorRowData`](/en/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>\[]

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
| `rowData` | [`TypeEditorRowData`](/en/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`> |

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
| `config` | [`TypeEditorColumnConfig`](/en/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md)<`TypeSchema`> | [`TypeEditorColumnConfig`](/en/auto-docs/type-editor/interfaces/TypeEditorColumnConfig.md)<`TypeSchema`>\[] |

#### Returns

`void`

***

### setActivePos

**setActivePos**(`pos`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | [`TypeEditorPos`](/en/auto-docs/type-editor/interfaces/TypeEditorPos.md) |

#### Returns

`void`

***

### setColumnViewConfig

**setColumnViewConfig**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`TypeEditorColumnViewConfig`](/en/auto-docs/type-editor/interfaces/TypeEditorColumnViewConfig.md)\[] |

#### Returns

`void`

***

### setDataSource

**setDataSource**(`newData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newData` | [`TypeEditorRowData`](/en/auto-docs/type-editor/types/TypeEditorRowData.md)<`TypeSchema`>\[] |

#### Returns

`void`

***

### setDropInfo

**setDropInfo**(`dropInfo`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dropInfo` | [`TypeEditorDropInfo`](/en/auto-docs/type-editor/interfaces/TypeEditorDropInfo.md) |

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
| `pos` | [`TypeEditorPos`](/en/auto-docs/type-editor/interfaces/TypeEditorPos.md) |
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
