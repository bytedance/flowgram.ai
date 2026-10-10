# Interface: FlowDocumentOptions

流程画布配置

## Table of contents

### Properties

* [allNodesDefaultExpanded](/auto-docs/document/interfaces/FlowDocumentOptions.md#allnodesdefaultexpanded)
* [constants](/auto-docs/document/interfaces/FlowDocumentOptions.md#constants)
* [defaultLayout](/auto-docs/document/interfaces/FlowDocumentOptions.md#defaultlayout)
* [formatNodeLabels](/auto-docs/document/interfaces/FlowDocumentOptions.md#formatnodelabels)
* [formatNodeLines](/auto-docs/document/interfaces/FlowDocumentOptions.md#formatnodelines)
* [getNodeDefaultRegistry](/auto-docs/document/interfaces/FlowDocumentOptions.md#getnodedefaultregistry)
* [preNodeCreate](/auto-docs/document/interfaces/FlowDocumentOptions.md#prenodecreate)

### Methods

* [fromNodeJSON](/auto-docs/document/interfaces/FlowDocumentOptions.md#fromnodejson)
* [toNodeJSON](/auto-docs/document/interfaces/FlowDocumentOptions.md#tonodejson)

## Properties

### allNodesDefaultExpanded

`Optional` **allNodesDefaultExpanded**: `boolean`

所有节点的默认展开状态

***

### constants

`Optional` **constants**: `Record`<`string`, `any`>

***

### defaultLayout

`Optional` **defaultLayout**: `string`

布局，默认 垂直布局

***

### formatNodeLabels

`Optional` **formatNodeLabels**: (`node`: [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md), `lines`: [`FlowTransitionLabel`](/auto-docs/document/interfaces/FlowTransitionLabel.md)\[]) => [`FlowTransitionLabel`](/auto-docs/document/interfaces/FlowTransitionLabel.md)\[]

#### Type declaration

(`node`, `lines`): [`FlowTransitionLabel`](/auto-docs/document/interfaces/FlowTransitionLabel.md)\[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) |
| `lines` | [`FlowTransitionLabel`](/auto-docs/document/interfaces/FlowTransitionLabel.md)\[] |

##### Returns

[`FlowTransitionLabel`](/auto-docs/document/interfaces/FlowTransitionLabel.md)\[]

***

### formatNodeLines

`Optional` **formatNodeLines**: (`node`: [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md), `lines`: [`FlowTransitionLine`](/auto-docs/document/interfaces/FlowTransitionLine.md)\[]) => [`FlowTransitionLine`](/auto-docs/document/interfaces/FlowTransitionLine.md)\[]

#### Type declaration

(`node`, `lines`): [`FlowTransitionLine`](/auto-docs/document/interfaces/FlowTransitionLine.md)\[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) |
| `lines` | [`FlowTransitionLine`](/auto-docs/document/interfaces/FlowTransitionLine.md)\[] |

##### Returns

[`FlowTransitionLine`](/auto-docs/document/interfaces/FlowTransitionLine.md)\[]

***

### getNodeDefaultRegistry

`Optional` **getNodeDefaultRegistry**: (`type`: [`FlowNodeType`](/auto-docs/document/types/FlowNodeType.md)) => [`FlowNodeRegistry`](/auto-docs/document/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/document/interfaces/FlowNodeMeta.md)>

#### Type declaration

(`type`): [`FlowNodeRegistry`](/auto-docs/document/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/document/interfaces/FlowNodeMeta.md)>

获取默认的节点配置

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`FlowNodeType`](/auto-docs/document/types/FlowNodeType.md) |

##### Returns

[`FlowNodeRegistry`](/auto-docs/document/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/document/interfaces/FlowNodeMeta.md)>

***

### preNodeCreate

`Optional` **preNodeCreate**: (`node`: [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)) => `void`

#### Type declaration

(`node`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) |

##### Returns

`void`

## Methods

### fromNodeJSON

`Optional` **fromNodeJSON**(`node`, `json`, `isFirstCreate`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) |
| `json` | [`FlowNodeJSON`](/auto-docs/document/interfaces/FlowNodeJSON.md) |
| `isFirstCreate` | `boolean` |

#### Returns

`void`

***

### toNodeJSON

`Optional` **toNodeJSON**(`node`): [`FlowNodeJSON`](/auto-docs/document/interfaces/FlowNodeJSON.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) |

#### Returns

[`FlowNodeJSON`](/auto-docs/document/interfaces/FlowNodeJSON.md)
