# Interface: FixedHistoryPluginOptions\<CTX>

插件配置

## Type parameters

| Name | Type |
| :------ | :------ |
| `CTX` | extends [`PluginContext`](/auto-docs/fixed-layout-editor/variables/PluginContext-1.md) = [`PluginContext`](/auto-docs/fixed-layout-editor/variables/PluginContext-1.md) |

## Hierarchy

* [`HistoryPluginOptions`](/auto-docs/fixed-layout-editor/interfaces/HistoryPluginOptions.md)<`CTX`>

  ↳ **`FixedHistoryPluginOptions`**

## Table of contents

### Properties

* [enable](/auto-docs/fixed-layout-editor/interfaces/FixedHistoryPluginOptions.md#enable)
* [enableChangeNode](/auto-docs/fixed-layout-editor/interfaces/FixedHistoryPluginOptions.md#enablechangenode)
* [getBlockLabel](/auto-docs/fixed-layout-editor/interfaces/FixedHistoryPluginOptions.md#getblocklabel)
* [getDocumentJSON](/auto-docs/fixed-layout-editor/interfaces/FixedHistoryPluginOptions.md#getdocumentjson)
* [getNodeLabel](/auto-docs/fixed-layout-editor/interfaces/FixedHistoryPluginOptions.md#getnodelabel)
* [getNodeLabelById](/auto-docs/fixed-layout-editor/interfaces/FixedHistoryPluginOptions.md#getnodelabelbyid)
* [getNodeURI](/auto-docs/fixed-layout-editor/interfaces/FixedHistoryPluginOptions.md#getnodeuri)
* [nodeToJSON](/auto-docs/fixed-layout-editor/interfaces/FixedHistoryPluginOptions.md#nodetojson)
* [onApply](/auto-docs/fixed-layout-editor/interfaces/FixedHistoryPluginOptions.md#onapply)
* [operationMetas](/auto-docs/fixed-layout-editor/interfaces/FixedHistoryPluginOptions.md#operationmetas)
* [uri](/auto-docs/fixed-layout-editor/interfaces/FixedHistoryPluginOptions.md#uri)

## Properties

### enable

`Optional` **enable**: `boolean`

#### Inherited from

[HistoryPluginOptions](/auto-docs/fixed-layout-editor/interfaces/HistoryPluginOptions.md).[enable](/auto-docs/fixed-layout-editor/interfaces/HistoryPluginOptions.md#enable)

***

### enableChangeNode

`Optional` **enableChangeNode**: `boolean`

#### Inherited from

[HistoryPluginOptions](/auto-docs/fixed-layout-editor/interfaces/HistoryPluginOptions.md).[enableChangeNode](/auto-docs/fixed-layout-editor/interfaces/HistoryPluginOptions.md#enablechangenode)

***

### getBlockLabel

`Optional` **getBlockLabel**: (`ctx`: `CTX`) => [`GetBlockLabel`](/auto-docs/fixed-layout-editor/types/GetBlockLabel.md)

#### Type declaration

(`ctx`): [`GetBlockLabel`](/auto-docs/fixed-layout-editor/types/GetBlockLabel.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetBlockLabel`](/auto-docs/fixed-layout-editor/types/GetBlockLabel.md)

***

### getDocumentJSON

`Optional` **getDocumentJSON**: (`ctx`: `CTX`) => [`GetDocumentJSON`](/auto-docs/fixed-layout-editor/types/GetDocumentJSON.md)

#### Type declaration

(`ctx`): [`GetDocumentJSON`](/auto-docs/fixed-layout-editor/types/GetDocumentJSON.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetDocumentJSON`](/auto-docs/fixed-layout-editor/types/GetDocumentJSON.md)

***

### getNodeLabel

`Optional` **getNodeLabel**: (`ctx`: `CTX`) => [`GetNodeLabel`](/auto-docs/fixed-layout-editor/types/GetNodeLabel.md)

#### Type declaration

(`ctx`): [`GetNodeLabel`](/auto-docs/fixed-layout-editor/types/GetNodeLabel.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetNodeLabel`](/auto-docs/fixed-layout-editor/types/GetNodeLabel.md)

***

### getNodeLabelById

`Optional` **getNodeLabelById**: (`ctx`: `CTX`) => [`GetNodeLabelById`](/auto-docs/fixed-layout-editor/types/GetNodeLabelById.md)

#### Type declaration

(`ctx`): [`GetNodeLabelById`](/auto-docs/fixed-layout-editor/types/GetNodeLabelById.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetNodeLabelById`](/auto-docs/fixed-layout-editor/types/GetNodeLabelById.md)

***

### getNodeURI

`Optional` **getNodeURI**: (`ctx`: `CTX`) => [`GetNodeURI`](/auto-docs/fixed-layout-editor/types/GetNodeURI.md)

#### Type declaration

(`ctx`): [`GetNodeURI`](/auto-docs/fixed-layout-editor/types/GetNodeURI.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetNodeURI`](/auto-docs/fixed-layout-editor/types/GetNodeURI.md)

***

### nodeToJSON

`Optional` **nodeToJSON**: (`ctx`: `CTX`) => [`NodeToJson`](/auto-docs/fixed-layout-editor/types/NodeToJson.md)

#### Type declaration

(`ctx`): [`NodeToJson`](/auto-docs/fixed-layout-editor/types/NodeToJson.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`NodeToJson`](/auto-docs/fixed-layout-editor/types/NodeToJson.md)

***

### onApply

`Optional` **onApply**: (`ctx`: `CTX`, `operation`: [`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>) => `void`

#### Type declaration

(`ctx`, `operation`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |
| `operation` | [`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`> |

##### Returns

`void`

#### Inherited from

[HistoryPluginOptions](/auto-docs/fixed-layout-editor/interfaces/HistoryPluginOptions.md).[onApply](/auto-docs/fixed-layout-editor/interfaces/HistoryPluginOptions.md#onapply)

***

### operationMetas

`Optional` **operationMetas**: [`OperationMeta`](/auto-docs/fixed-layout-editor/interfaces/OperationMeta.md)<`any`, `any`, `any`>\[]

***

### uri

`Optional` **uri**: `any`
