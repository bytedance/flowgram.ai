# Interface: ModeValueConfig\<Mode, TypeSchema>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Mode` | extends [`TypeEditorMode`](/auto-docs/type-editor/types/TypeEditorMode.md) |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |

## Table of contents

### Properties

* [commonValueToSubmitValue](/auto-docs/type-editor/interfaces/ModeValueConfig.md#commonvaluetosubmitvalue)
* [convertSchemaToValue](/auto-docs/type-editor/interfaces/ModeValueConfig.md#convertschematovalue)
* [convertValueToSchema](/auto-docs/type-editor/interfaces/ModeValueConfig.md#convertvaluetoschema)
* [mode](/auto-docs/type-editor/interfaces/ModeValueConfig.md#mode)
* [toolConfig](/auto-docs/type-editor/interfaces/ModeValueConfig.md#toolconfig)

## Properties

### commonValueToSubmitValue

**commonValueToSubmitValue**: (`val`: `Record`<`string`, `unknown`>) => [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

#### Type declaration

(`val`): [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

常量值生成提交值

##### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Record`<`string`, `unknown`> |

##### Returns

[`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

***

### convertSchemaToValue

**convertSchemaToValue**: (`val`: `TypeSchema`) => [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

#### Type declaration

(`val`): [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

typeSchema 到提交值

##### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `TypeSchema` |

##### Returns

[`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

***

### convertValueToSchema

**convertValueToSchema**: (`val`: [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>) => `TypeSchema`

#### Type declaration

(`val`): `TypeSchema`

提交值到 typeSchema

##### Parameters

| Name | Type |
| :------ | :------ |
| `val` | [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`> |

##### Returns

`TypeSchema`

***

### mode

**mode**: `Mode`

***

### toolConfig

**toolConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `createByData` | { `genDefaultValue`: () => [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`> ; `viewConfig`: [`TypeEditorColumnViewConfig`](/auto-docs/type-editor/interfaces/TypeEditorColumnViewConfig.md)\[]  } |
| `createByData.genDefaultValue` | () => [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`> |
| `createByData.viewConfig` | [`TypeEditorColumnViewConfig`](/auto-docs/type-editor/interfaces/TypeEditorColumnViewConfig.md)\[] |
