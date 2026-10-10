# Interface: IHistoryDocument

## Implemented by

* [`FixedHistoryService`](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryService.md)

## Table of contents

### Methods

* [addBlock](/en/auto-docs/fixed-history-plugin/interfaces/IHistoryDocument.md#addblock)
* [addFromNode](/en/auto-docs/fixed-history-plugin/interfaces/IHistoryDocument.md#addfromnode)
* [deleteNode](/en/auto-docs/fixed-history-plugin/interfaces/IHistoryDocument.md#deletenode)

## Methods

### addBlock

**addBlock**(`target`, `blockData`, `parent?`, `index?`): `FlowNodeEntity`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` | `FlowNodeEntity` |
| `blockData` | `FlowNodeJSON` |
| `parent?` | `FlowNodeEntity` |
| `index?` | `number` |

#### Returns

`FlowNodeEntity`

***

### addFromNode

**addFromNode**(`fromNode`, `json`): `FlowNodeEntity`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | `string` | `FlowNodeEntity` |
| `json` | `FlowNodeJSON` |

#### Returns

`FlowNodeEntity`

***

### deleteNode

**deleteNode**(`fromNode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | `FlowNodeEntity` |

#### Returns

`void`
