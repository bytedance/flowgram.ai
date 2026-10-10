# Interface: FreeHistoryPluginOptions\<CTX>

插件配置

## Type parameters

| Name | Type |
| :------ | :------ |
| `CTX` | extends [`PluginContext`](/auto-docs/free-layout-editor/variables/PluginContext-1.md) = [`PluginContext`](/auto-docs/free-layout-editor/variables/PluginContext-1.md) |

## Table of contents

### Properties

* [enable](/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#enable)
* [enableChangeLineData](/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#enablechangelinedata)
* [enableChangeNode](/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#enablechangenode)
* [getBlockLabel](/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#getblocklabel)
* [getLineURI](/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#getlineuri)
* [getNodeLabel](/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#getnodelabel)
* [getNodeLabelById](/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#getnodelabelbyid)
* [getNodeURI](/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#getnodeuri)
* [limit](/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#limit)
* [nodeToJSON](/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#nodetojson)
* [operationMetas](/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#operationmetas)
* [uri](/auto-docs/free-layout-editor/interfaces/FreeHistoryPluginOptions.md#uri)

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

`Optional` **getBlockLabel**: (`ctx`: `CTX`) => [`GetBlockLabel`](/auto-docs/free-layout-editor/types/GetBlockLabel.md)

#### Type declaration

(`ctx`): [`GetBlockLabel`](/auto-docs/free-layout-editor/types/GetBlockLabel.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetBlockLabel`](/auto-docs/free-layout-editor/types/GetBlockLabel.md)

***

### getLineURI

`Optional` **getLineURI**: (`ctx`: `CTX`) => [`GetLineURI`](/auto-docs/free-layout-editor/types/GetLineURI.md)

#### Type declaration

(`ctx`): [`GetLineURI`](/auto-docs/free-layout-editor/types/GetLineURI.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetLineURI`](/auto-docs/free-layout-editor/types/GetLineURI.md)

***

### getNodeLabel

`Optional` **getNodeLabel**: (`ctx`: `CTX`) => [`GetNodeLabel`](/auto-docs/free-layout-editor/types/GetNodeLabel.md)

#### Type declaration

(`ctx`): [`GetNodeLabel`](/auto-docs/free-layout-editor/types/GetNodeLabel.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetNodeLabel`](/auto-docs/free-layout-editor/types/GetNodeLabel.md)

***

### getNodeLabelById

`Optional` **getNodeLabelById**: (`ctx`: `CTX`) => [`GetNodeLabelById`](/auto-docs/free-layout-editor/types/GetNodeLabelById.md)

#### Type declaration

(`ctx`): [`GetNodeLabelById`](/auto-docs/free-layout-editor/types/GetNodeLabelById.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetNodeLabelById`](/auto-docs/free-layout-editor/types/GetNodeLabelById.md)

***

### getNodeURI

`Optional` **getNodeURI**: (`ctx`: `CTX`) => [`GetNodeURI`](/auto-docs/free-layout-editor/types/GetNodeURI.md)

#### Type declaration

(`ctx`): [`GetNodeURI`](/auto-docs/free-layout-editor/types/GetNodeURI.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`GetNodeURI`](/auto-docs/free-layout-editor/types/GetNodeURI.md)

***

### limit

`Optional` **limit**: `number`

***

### nodeToJSON

`Optional` **nodeToJSON**: (`ctx`: `CTX`) => [`NodeToJson`](/auto-docs/free-layout-editor/types/NodeToJson.md)

#### Type declaration

(`ctx`): [`NodeToJson`](/auto-docs/free-layout-editor/types/NodeToJson.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |

##### Returns

[`NodeToJson`](/auto-docs/free-layout-editor/types/NodeToJson.md)

***

### operationMetas

`Optional` **operationMetas**: [`OperationMeta`](/auto-docs/free-layout-editor/interfaces/OperationMeta.md)<`any`, `any`, `any`>\[]

***

### uri

`Optional` **uri**: `any`
