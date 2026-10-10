# Interface: FixedHistoryPluginOptions\<CTX>

插件配置

## Type parameters

| Name | Type |
| :------ | :------ |
| `CTX` | extends `PluginContext` = `PluginContext` |

## Hierarchy

* [`HistoryPluginOptions`](/auto-docs/fixed-history-plugin/interfaces/HistoryPluginOptions.md)<`CTX`>

  ↳ **`FixedHistoryPluginOptions`**

## Table of contents

### Properties

* [enable](/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#enable)
* [enableChangeNode](/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#enablechangenode)
* [getBlockLabel](/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#getblocklabel)
* [getDocumentJSON](/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#getdocumentjson)
* [getNodeLabel](/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#getnodelabel)
* [getNodeLabelById](/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#getnodelabelbyid)
* [getNodeURI](/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#getnodeuri)
* [nodeToJSON](/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#nodetojson)
* [onApply](/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#onapply)
* [operationMetas](/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#operationmetas)
* [uri](/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#uri)

## Properties

### enable

`Optional` **enable**: `boolean`

#### Inherited from

[HistoryPluginOptions](/auto-docs/fixed-history-plugin/interfaces/HistoryPluginOptions.md).[enable](/auto-docs/fixed-history-plugin/interfaces/HistoryPluginOptions.md#enable)

***

### enableChangeNode

`Optional` **enableChangeNode**: `boolean`

#### Inherited from

[HistoryPluginOptions](/auto-docs/fixed-history-plugin/interfaces/HistoryPluginOptions.md).[enableChangeNode](/auto-docs/fixed-history-plugin/interfaces/HistoryPluginOptions.md#enablechangenode)

***

### getBlockLabel

`Optional` **getBlockLabel**: (`ctx`: `CTX`) => [`GetBlockLabel`](/auto-docs/fixed-history-plugin/types/GetBlockLabel.md)

#### Type declaration

(`ctx`): [`GetBlockLabel`](/auto-docs/fixed-history-plugin/types/GetBlockLabel.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetBlockLabel`](/auto-docs/fixed-history-plugin/types/GetBlockLabel.md)

***

### getDocumentJSON

`Optional` **getDocumentJSON**: (`ctx`: `CTX`) => [`GetDocumentJSON`](/auto-docs/fixed-history-plugin/types/GetDocumentJSON.md)

#### Type declaration

(`ctx`): [`GetDocumentJSON`](/auto-docs/fixed-history-plugin/types/GetDocumentJSON.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetDocumentJSON`](/auto-docs/fixed-history-plugin/types/GetDocumentJSON.md)

***

### getNodeLabel

`Optional` **getNodeLabel**: (`ctx`: `CTX`) => [`GetNodeLabel`](/auto-docs/fixed-history-plugin/types/GetNodeLabel.md)

#### Type declaration

(`ctx`): [`GetNodeLabel`](/auto-docs/fixed-history-plugin/types/GetNodeLabel.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetNodeLabel`](/auto-docs/fixed-history-plugin/types/GetNodeLabel.md)

***

### getNodeLabelById

`Optional` **getNodeLabelById**: (`ctx`: `CTX`) => [`GetNodeLabelById`](/auto-docs/fixed-history-plugin/types/GetNodeLabelById.md)

#### Type declaration

(`ctx`): [`GetNodeLabelById`](/auto-docs/fixed-history-plugin/types/GetNodeLabelById.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetNodeLabelById`](/auto-docs/fixed-history-plugin/types/GetNodeLabelById.md)

***

### getNodeURI

`Optional` **getNodeURI**: (`ctx`: `CTX`) => [`GetNodeURI`](/auto-docs/fixed-history-plugin/types/GetNodeURI.md)

#### Type declaration

(`ctx`): [`GetNodeURI`](/auto-docs/fixed-history-plugin/types/GetNodeURI.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetNodeURI`](/auto-docs/fixed-history-plugin/types/GetNodeURI.md)

***

### nodeToJSON

`Optional` **nodeToJSON**: (`ctx`: `CTX`) => [`NodeToJson`](/auto-docs/fixed-history-plugin/types/NodeToJson.md)

#### Type declaration

(`ctx`): [`NodeToJson`](/auto-docs/fixed-history-plugin/types/NodeToJson.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`NodeToJson`](/auto-docs/fixed-history-plugin/types/NodeToJson.md)

***

### onApply

`Optional` **onApply**: (`ctx`: `CTX`, `operation`: [`Operation`](/auto-docs/fixed-history-plugin/interfaces/Operation.md)<`unknown`>) => `void`

#### Type declaration

(`ctx`, `operation`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |
| `operation` | [`Operation`](/auto-docs/fixed-history-plugin/interfaces/Operation.md)<`unknown`> |

##### Returns

`void`

#### Inherited from

[HistoryPluginOptions](/auto-docs/fixed-history-plugin/interfaces/HistoryPluginOptions.md).[onApply](/auto-docs/fixed-history-plugin/interfaces/HistoryPluginOptions.md#onapply)

***

### operationMetas

`Optional` **operationMetas**: [`OperationMeta`](/auto-docs/fixed-history-plugin/interfaces/OperationMeta.md)<`any`, `any`, `any`>\[]

***

### uri

`Optional` **uri**: `any`
