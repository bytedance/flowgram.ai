# Interface: FreeHistoryPluginOptions\<CTX>

插件配置

## Type parameters

| Name | Type |
| :------ | :------ |
| `CTX` | extends `PluginContext` = `PluginContext` |

## Table of contents

### Properties

* [enable](/auto-docs/free-history-plugin/interfaces/FreeHistoryPluginOptions.md#enable)
* [enableChangeLineData](/auto-docs/free-history-plugin/interfaces/FreeHistoryPluginOptions.md#enablechangelinedata)
* [enableChangeNode](/auto-docs/free-history-plugin/interfaces/FreeHistoryPluginOptions.md#enablechangenode)
* [getBlockLabel](/auto-docs/free-history-plugin/interfaces/FreeHistoryPluginOptions.md#getblocklabel)
* [getLineURI](/auto-docs/free-history-plugin/interfaces/FreeHistoryPluginOptions.md#getlineuri)
* [getNodeLabel](/auto-docs/free-history-plugin/interfaces/FreeHistoryPluginOptions.md#getnodelabel)
* [getNodeLabelById](/auto-docs/free-history-plugin/interfaces/FreeHistoryPluginOptions.md#getnodelabelbyid)
* [getNodeURI](/auto-docs/free-history-plugin/interfaces/FreeHistoryPluginOptions.md#getnodeuri)
* [limit](/auto-docs/free-history-plugin/interfaces/FreeHistoryPluginOptions.md#limit)
* [nodeToJSON](/auto-docs/free-history-plugin/interfaces/FreeHistoryPluginOptions.md#nodetojson)
* [operationMetas](/auto-docs/free-history-plugin/interfaces/FreeHistoryPluginOptions.md#operationmetas)
* [uri](/auto-docs/free-history-plugin/interfaces/FreeHistoryPluginOptions.md#uri)

## Properties

### enable

`Optional` **enable**: `boolean`

***

### enableChangeLineData

`Optional` **enableChangeLineData**: `boolean`

***

### enableChangeNode

`Optional` **enableChangeNode**: `boolean`

***

### getBlockLabel

`Optional` **getBlockLabel**: (`ctx`: `CTX`) => [`GetBlockLabel`](/auto-docs/free-history-plugin/types/GetBlockLabel.md)

#### Type declaration

(`ctx`): [`GetBlockLabel`](/auto-docs/free-history-plugin/types/GetBlockLabel.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetBlockLabel`](/auto-docs/free-history-plugin/types/GetBlockLabel.md)

***

### getLineURI

`Optional` **getLineURI**: (`ctx`: `CTX`) => [`GetLineURI`](/auto-docs/free-history-plugin/types/GetLineURI.md)

#### Type declaration

(`ctx`): [`GetLineURI`](/auto-docs/free-history-plugin/types/GetLineURI.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetLineURI`](/auto-docs/free-history-plugin/types/GetLineURI.md)

***

### getNodeLabel

`Optional` **getNodeLabel**: (`ctx`: `CTX`) => [`GetNodeLabel`](/auto-docs/free-history-plugin/types/GetNodeLabel.md)

#### Type declaration

(`ctx`): [`GetNodeLabel`](/auto-docs/free-history-plugin/types/GetNodeLabel.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetNodeLabel`](/auto-docs/free-history-plugin/types/GetNodeLabel.md)

***

### getNodeLabelById

`Optional` **getNodeLabelById**: (`ctx`: `CTX`) => [`GetNodeLabelById`](/auto-docs/free-history-plugin/types/GetNodeLabelById.md)

#### Type declaration

(`ctx`): [`GetNodeLabelById`](/auto-docs/free-history-plugin/types/GetNodeLabelById.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetNodeLabelById`](/auto-docs/free-history-plugin/types/GetNodeLabelById.md)

***

### getNodeURI

`Optional` **getNodeURI**: (`ctx`: `CTX`) => [`GetNodeURI`](/auto-docs/free-history-plugin/types/GetNodeURI.md)

#### Type declaration

(`ctx`): [`GetNodeURI`](/auto-docs/free-history-plugin/types/GetNodeURI.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetNodeURI`](/auto-docs/free-history-plugin/types/GetNodeURI.md)

***

### limit

`Optional` **limit**: `number`

***

### nodeToJSON

`Optional` **nodeToJSON**: (`ctx`: `CTX`) => [`NodeToJson`](/auto-docs/free-history-plugin/types/NodeToJson.md)

#### Type declaration

(`ctx`): [`NodeToJson`](/auto-docs/free-history-plugin/types/NodeToJson.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`NodeToJson`](/auto-docs/free-history-plugin/types/NodeToJson.md)

***

### operationMetas

`Optional` **operationMetas**: [`OperationMeta`](/auto-docs/free-history-plugin/interfaces/OperationMeta.md)<`any`, `any`, `any`>\[]

***

### uri

`Optional` **uri**: `any`
