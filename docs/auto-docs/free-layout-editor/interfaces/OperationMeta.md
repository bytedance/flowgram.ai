# Interface: OperationMeta\<OperationValue, Source, ApplyResult>

操作元数据

## Type parameters

| Name | Type |
| :------ | :------ |
| `OperationValue` | `any` |
| `Source` | `any` |
| `ApplyResult` | `any` |

## Table of contents

### Properties

* [getDescription](/auto-docs/free-layout-editor/interfaces/OperationMeta.md#getdescription)
* [getLabel](/auto-docs/free-layout-editor/interfaces/OperationMeta.md#getlabel)
* [getURI](/auto-docs/free-layout-editor/interfaces/OperationMeta.md#geturi)
* [inverse](/auto-docs/free-layout-editor/interfaces/OperationMeta.md#inverse)
* [shouldMerge](/auto-docs/free-layout-editor/interfaces/OperationMeta.md#shouldmerge)
* [shouldSave](/auto-docs/free-layout-editor/interfaces/OperationMeta.md#shouldsave)
* [type](/auto-docs/free-layout-editor/interfaces/OperationMeta.md#type)

### Methods

* [apply](/auto-docs/free-layout-editor/interfaces/OperationMeta.md#apply)

## Properties

### getDescription

`Optional` **getDescription**: (`operation`: [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`OperationValue`>, `source`: `Source`) => `string`

#### Type declaration

(`operation`, `source`): `string`

获取描述

##### Parameters

| Name | Type |
| :------ | :------ |
| `operation` | [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`OperationValue`> |
| `source` | `Source` |

##### Returns

`string`

***

### getLabel

`Optional` **getLabel**: (`operation`: [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`OperationValue`>, `source`: `Source`) => `string`

#### Type declaration

(`operation`, `source`): `string`

获取标签

##### Parameters

| Name | Type |
| :------ | :------ |
| `operation` | [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`OperationValue`> |
| `source` | `Source` |

##### Returns

`string`

***

### getURI

`Optional` **getURI**: (`operation`: [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`OperationValue`>, `source`: `Source`) => `undefined` | `string`

#### Type declaration

(`operation`, `source`): `undefined` | `string`

获取uri

##### Parameters

| Name | Type |
| :------ | :------ |
| `operation` | [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`OperationValue`> |
| `source` | `Source` |

##### Returns

`undefined` | `string`

***

### inverse

**inverse**: (`op`: [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`OperationValue`>) => [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`OperationValue`>

#### Type declaration

(`op`): [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`OperationValue`>

将一个操作转换成另一个逆操作， 如insert转成delete

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`OperationValue`> | 操作 |

##### Returns

[`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`OperationValue`>

逆操作

***

### shouldMerge

`Optional` **shouldMerge**: (`op`: [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`OperationValue`>, `prev`: `undefined` | [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`OperationValue`>, `stackItem`: [`StackOperation`](/auto-docs/free-layout-editor/classes/StackOperation.md)) => `boolean` | [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>

#### Type declaration

(`op`, `prev`, `stackItem`): `boolean` | [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>

判断是否可以合并

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`OperationValue`> | 操作 |
| `prev` | `undefined` | [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`OperationValue`> | 上一个操作 |
| `stackItem` | [`StackOperation`](/auto-docs/free-layout-editor/classes/StackOperation.md) | - |

##### Returns

`boolean` | [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`unknown`>

true表示可以合并 返回一个操作表示直接用新操作替换之前的操作

***

### shouldSave

`Optional` **shouldSave**: (`op`: [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`OperationValue`>) => `boolean`

#### Type declaration

(`op`): `boolean`

判断是否需要保存，如选中等操作可以不保存

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`OperationValue`> | 操作 |

##### Returns

`boolean`

true表示可以保存

***

### type

**type**: `string`

操作类型 需要唯一

## Methods

### apply

**apply**(`operation`, `source`): `ApplyResult` | `Promise`<`ApplyResult`>

执行操作

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md)<`OperationValue`> | 操作 |
| `source` | `Source` | - |

#### Returns

`ApplyResult` | `Promise`<`ApplyResult`>
