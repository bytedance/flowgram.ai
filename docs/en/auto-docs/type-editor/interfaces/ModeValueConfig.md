# Interface: ModeValueConfig\<Mode, TypeSchema>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Mode` | extends [`TypeEditorMode`](/en/auto-docs/type-editor/types/TypeEditorMode.md) |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |

## Table of contents

### Properties

* [commonValueToSubmitValue](/en/auto-docs/type-editor/interfaces/ModeValueConfig.md#commonvaluetosubmitvalue)
* [convertSchemaToValue](/en/auto-docs/type-editor/interfaces/ModeValueConfig.md#convertschematovalue)
* [convertValueToSchema](/en/auto-docs/type-editor/interfaces/ModeValueConfig.md#convertvaluetoschema)
* [mode](/en/auto-docs/type-editor/interfaces/ModeValueConfig.md#mode)
* [toolConfig](/en/auto-docs/type-editor/interfaces/ModeValueConfig.md#toolconfig)

## Properties

### commonValueToSubmitValue

**commonValueToSubmitValue**: (`val`: `Record`<`string`, `unknown`>) => [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

#### Type declaration

(`val`): [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

常量值生成提交值

##### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Record`<`string`, `unknown`> |

##### Returns

[`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

***

### convertSchemaToValue

**convertSchemaToValue**: (`val`: `TypeSchema`) => [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

#### Type declaration

(`val`): [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

typeSchema 到提交值

##### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `TypeSchema` |

##### Returns

[`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

***

### convertValueToSchema

**convertValueToSchema**: (`val`: [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>) => `TypeSchema`

#### Type declaration

(`val`): `TypeSchema`

提交值到 typeSchema

##### Parameters

| Name | Type |
| :------ | :------ |
| `val` | [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`> |

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
| `createByData` | { `genDefaultValue`: () => [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`> ; `viewConfig`: [`TypeEditorColumnViewConfig`](/en/auto-docs/type-editor/interfaces/TypeEditorColumnViewConfig.md)\[]  } |
| `createByData.genDefaultValue` | () => [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`> |
| `createByData.viewConfig` | [`TypeEditorColumnViewConfig`](/en/auto-docs/type-editor/interfaces/TypeEditorColumnViewConfig.md)\[] |
