# Interface: FixedHistoryPluginOptions\<CTX>

插件配置

## Type parameters

| Name | Type |
| :------ | :------ |
| `CTX` | extends `PluginContext` = `PluginContext` |

## Hierarchy

* [`HistoryPluginOptions`](/en/auto-docs/fixed-history-plugin/interfaces/HistoryPluginOptions.md)<`CTX`>

  ↳ **`FixedHistoryPluginOptions`**

## Table of contents

### Properties

* [enable](/en/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#enable)
* [enableChangeNode](/en/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#enablechangenode)
* [getBlockLabel](/en/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#getblocklabel)
* [getDocumentJSON](/en/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#getdocumentjson)
* [getNodeLabel](/en/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#getnodelabel)
* [getNodeLabelById](/en/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#getnodelabelbyid)
* [getNodeURI](/en/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#getnodeuri)
* [nodeToJSON](/en/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#nodetojson)
* [onApply](/en/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#onapply)
* [operationMetas](/en/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#operationmetas)
* [uri](/en/auto-docs/fixed-history-plugin/interfaces/FixedHistoryPluginOptions.md#uri)

## Properties

### enable

`Optional` **enable**: `boolean`

#### Inherited from

[HistoryPluginOptions](/en/auto-docs/fixed-history-plugin/interfaces/HistoryPluginOptions.md).[enable](/en/auto-docs/fixed-history-plugin/interfaces/HistoryPluginOptions.md#enable)

***

### enableChangeNode

`Optional` **enableChangeNode**: `boolean`

#### Inherited from

[HistoryPluginOptions](/en/auto-docs/fixed-history-plugin/interfaces/HistoryPluginOptions.md).[enableChangeNode](/en/auto-docs/fixed-history-plugin/interfaces/HistoryPluginOptions.md#enablechangenode)

***

### getBlockLabel

`Optional` **getBlockLabel**: (`ctx`: `CTX`) => [`GetBlockLabel`](/en/auto-docs/fixed-history-plugin/types/GetBlockLabel.md)

#### Type declaration

(`ctx`): [`GetBlockLabel`](/en/auto-docs/fixed-history-plugin/types/GetBlockLabel.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetBlockLabel`](/en/auto-docs/fixed-history-plugin/types/GetBlockLabel.md)

***

### getDocumentJSON

`Optional` **getDocumentJSON**: (`ctx`: `CTX`) => [`GetDocumentJSON`](/en/auto-docs/fixed-history-plugin/types/GetDocumentJSON.md)

#### Type declaration

(`ctx`): [`GetDocumentJSON`](/en/auto-docs/fixed-history-plugin/types/GetDocumentJSON.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetDocumentJSON`](/en/auto-docs/fixed-history-plugin/types/GetDocumentJSON.md)

***

### getNodeLabel

`Optional` **getNodeLabel**: (`ctx`: `CTX`) => [`GetNodeLabel`](/en/auto-docs/fixed-history-plugin/types/GetNodeLabel.md)

#### Type declaration

(`ctx`): [`GetNodeLabel`](/en/auto-docs/fixed-history-plugin/types/GetNodeLabel.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetNodeLabel`](/en/auto-docs/fixed-history-plugin/types/GetNodeLabel.md)

***

### getNodeLabelById

`Optional` **getNodeLabelById**: (`ctx`: `CTX`) => [`GetNodeLabelById`](/en/auto-docs/fixed-history-plugin/types/GetNodeLabelById.md)

#### Type declaration

(`ctx`): [`GetNodeLabelById`](/en/auto-docs/fixed-history-plugin/types/GetNodeLabelById.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetNodeLabelById`](/en/auto-docs/fixed-history-plugin/types/GetNodeLabelById.md)

***

### getNodeURI

`Optional` **getNodeURI**: (`ctx`: `CTX`) => [`GetNodeURI`](/en/auto-docs/fixed-history-plugin/types/GetNodeURI.md)

#### Type declaration

(`ctx`): [`GetNodeURI`](/en/auto-docs/fixed-history-plugin/types/GetNodeURI.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetNodeURI`](/en/auto-docs/fixed-history-plugin/types/GetNodeURI.md)

***

### nodeToJSON

`Optional` **nodeToJSON**: (`ctx`: `CTX`) => [`NodeToJson`](/en/auto-docs/fixed-history-plugin/types/NodeToJson.md)

#### Type declaration

(`ctx`): [`NodeToJson`](/en/auto-docs/fixed-history-plugin/types/NodeToJson.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`NodeToJson`](/en/auto-docs/fixed-history-plugin/types/NodeToJson.md)

***

### onApply

`Optional` **onApply**: (`ctx`: `CTX`, `operation`: [`Operation`](/en/auto-docs/fixed-history-plugin/interfaces/Operation.md)<`unknown`>) => `void`

#### Type declaration

(`ctx`, `operation`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |
| `operation` | [`Operation`](/en/auto-docs/fixed-history-plugin/interfaces/Operation.md)<`unknown`> |

##### Returns

`void`

#### Inherited from

[HistoryPluginOptions](/en/auto-docs/fixed-history-plugin/interfaces/HistoryPluginOptions.md).[onApply](/en/auto-docs/fixed-history-plugin/interfaces/HistoryPluginOptions.md#onapply)

***

### operationMetas

`Optional` **operationMetas**: [`OperationMeta`](/en/auto-docs/fixed-history-plugin/interfaces/OperationMeta.md)<`any`, `any`, `any`>\[]

***

### uri

`Optional` **uri**: `any`
