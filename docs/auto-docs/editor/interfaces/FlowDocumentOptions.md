# Interface: FlowDocumentOptions

流程画布配置

## Table of contents

### Properties

* [allNodesDefaultExpanded](/auto-docs/editor/interfaces/FlowDocumentOptions.md#allnodesdefaultexpanded)
* [constants](/auto-docs/editor/interfaces/FlowDocumentOptions.md#constants)
* [defaultLayout](/auto-docs/editor/interfaces/FlowDocumentOptions.md#defaultlayout)
* [formatNodeLabels](/auto-docs/editor/interfaces/FlowDocumentOptions.md#formatnodelabels)
* [formatNodeLines](/auto-docs/editor/interfaces/FlowDocumentOptions.md#formatnodelines)
* [getNodeDefaultRegistry](/auto-docs/editor/interfaces/FlowDocumentOptions.md#getnodedefaultregistry)
* [preNodeCreate](/auto-docs/editor/interfaces/FlowDocumentOptions.md#prenodecreate)

### Methods

* [fromNodeJSON](/auto-docs/editor/interfaces/FlowDocumentOptions.md#fromnodejson)
* [toNodeJSON](/auto-docs/editor/interfaces/FlowDocumentOptions.md#tonodejson)

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

`Optional` **formatNodeLabels**: (`node`: [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md), `lines`: [`FlowTransitionLabel`](/auto-docs/editor/interfaces/FlowTransitionLabel.md)\[]) => [`FlowTransitionLabel`](/auto-docs/editor/interfaces/FlowTransitionLabel.md)\[]

#### Type declaration

(`node`, `lines`): [`FlowTransitionLabel`](/auto-docs/editor/interfaces/FlowTransitionLabel.md)\[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md) |
| `lines` | [`FlowTransitionLabel`](/auto-docs/editor/interfaces/FlowTransitionLabel.md)\[] |

##### Returns

[`FlowTransitionLabel`](/auto-docs/editor/interfaces/FlowTransitionLabel.md)\[]

***

### formatNodeLines

`Optional` **formatNodeLines**: (`node`: [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md), `lines`: [`FlowTransitionLine`](/auto-docs/editor/interfaces/FlowTransitionLine.md)\[]) => [`FlowTransitionLine`](/auto-docs/editor/interfaces/FlowTransitionLine.md)\[]

#### Type declaration

(`node`, `lines`): [`FlowTransitionLine`](/auto-docs/editor/interfaces/FlowTransitionLine.md)\[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md) |
| `lines` | [`FlowTransitionLine`](/auto-docs/editor/interfaces/FlowTransitionLine.md)\[] |

##### Returns

[`FlowTransitionLine`](/auto-docs/editor/interfaces/FlowTransitionLine.md)\[]

***

### getNodeDefaultRegistry

`Optional` **getNodeDefaultRegistry**: (`type`: [`FlowNodeType`](/auto-docs/editor/types/FlowNodeType.md)) => [`FlowNodeRegistry`](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/editor/interfaces/FlowNodeMeta.md)>

#### Type declaration

(`type`): [`FlowNodeRegistry`](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/editor/interfaces/FlowNodeMeta.md)>

获取默认的节点配置

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`FlowNodeType`](/auto-docs/editor/types/FlowNodeType.md) |

##### Returns

[`FlowNodeRegistry`](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/editor/interfaces/FlowNodeMeta.md)>

***

### preNodeCreate

`Optional` **preNodeCreate**: (`node`: [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)) => `void`

#### Type declaration

(`node`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md) |

##### Returns

`void`

## Methods

### fromNodeJSON

`Optional` **fromNodeJSON**(`node`, `json`, `isFirstCreate`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md) |
| `json` | [`FlowNodeJSON`](/auto-docs/editor/interfaces/FlowNodeJSON.md) |
| `isFirstCreate` | `boolean` |

#### Returns

`void`

***

### toNodeJSON

`Optional` **toNodeJSON**(`node`): [`FlowNodeJSON`](/auto-docs/editor/interfaces/FlowNodeJSON.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md) |

#### Returns

[`FlowNodeJSON`](/auto-docs/editor/interfaces/FlowNodeJSON.md)
