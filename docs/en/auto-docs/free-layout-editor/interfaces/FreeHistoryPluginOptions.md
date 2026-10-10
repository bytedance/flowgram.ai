# Interface: FreeHistoryPluginOptions\<CTX>

插件配置

## Type parameters

| Name | Type |
| :------ | :------ |
| `CTX` | extends [`PluginContext`](/en/auto-docs/free-layout-editor/variables/PluginContext-1.md) = [`PluginContext`](/en/auto-docs/free-layout-editor/variables/PluginContext-1.md) |

## Table of contents

### Properties

* [enable](/en/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#enable)
* [enableChangeLineData](/en/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#enablechangelinedata)
* [enableChangeNode](/en/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#enablechangenode)
* [getBlockLabel](/en/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#getblocklabel)
* [getLineURI](/en/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#getlineuri)
* [getNodeLabel](/en/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#getnodelabel)
* [getNodeLabelById](/en/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#getnodelabelbyid)
* [getNodeURI](/en/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#getnodeuri)
* [limit](/en/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#limit)
* [nodeToJSON](/en/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#nodetojson)
* [operationMetas](/en/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#operationmetas)
* [uri](/en/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#uri)

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

`Optional` **getBlockLabel**: (`ctx`: `CTX`) => [`GetBlockLabel`](/en/auto-docs/free-layout-editor/types/GetBlockLabel.md)

#### Type declaration

(`ctx`): [`GetBlockLabel`](/en/auto-docs/free-layout-editor/types/GetBlockLabel.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetBlockLabel`](/en/auto-docs/free-layout-editor/types/GetBlockLabel.md)

***

### getLineURI

`Optional` **getLineURI**: (`ctx`: `CTX`) => [`GetLineURI`](/en/auto-docs/free-layout-editor/types/GetLineURI.md)

#### Type declaration

(`ctx`): [`GetLineURI`](/en/auto-docs/free-layout-editor/types/GetLineURI.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetLineURI`](/en/auto-docs/free-layout-editor/types/GetLineURI.md)

***

### getNodeLabel

`Optional` **getNodeLabel**: (`ctx`: `CTX`) => [`GetNodeLabel`](/en/auto-docs/free-layout-editor/types/GetNodeLabel.md)

#### Type declaration

(`ctx`): [`GetNodeLabel`](/en/auto-docs/free-layout-editor/types/GetNodeLabel.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetNodeLabel`](/en/auto-docs/free-layout-editor/types/GetNodeLabel.md)

***

### getNodeLabelById

`Optional` **getNodeLabelById**: (`ctx`: `CTX`) => [`GetNodeLabelById`](/en/auto-docs/free-layout-editor/types/GetNodeLabelById.md)

#### Type declaration

(`ctx`): [`GetNodeLabelById`](/en/auto-docs/free-layout-editor/types/GetNodeLabelById.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetNodeLabelById`](/en/auto-docs/free-layout-editor/types/GetNodeLabelById.md)

***

### getNodeURI

`Optional` **getNodeURI**: (`ctx`: `CTX`) => [`GetNodeURI`](/en/auto-docs/free-layout-editor/types/GetNodeURI.md)

#### Type declaration

(`ctx`): [`GetNodeURI`](/en/auto-docs/free-layout-editor/types/GetNodeURI.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetNodeURI`](/en/auto-docs/free-layout-editor/types/GetNodeURI.md)

***

### limit

`Optional` **limit**: `number`

***

### nodeToJSON

`Optional` **nodeToJSON**: (`ctx`: `CTX`) => [`NodeToJson`](/en/auto-docs/free-layout-editor/types/NodeToJson.md)

#### Type declaration

(`ctx`): [`NodeToJson`](/en/auto-docs/free-layout-editor/types/NodeToJson.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`NodeToJson`](/en/auto-docs/free-layout-editor/types/NodeToJson.md)

***

### operationMetas

`Optional` **operationMetas**: [`OperationMeta`](/en/auto-docs/free-layout-editor/interfaces/OperationMeta.md)<`any`, `any`, `any`>\[]

***

### uri

`Optional` **uri**: `any`
