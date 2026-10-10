# Interface: IHistoryDocument

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Implemented by

* [`FixedHistoryService`](/en/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md)

## Table of contents

### Methods

* [addBlock](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md#addblock)
* [addFromNode](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md#addfromnode)
* [deleteNode](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md#deletenode)

## Methods

### addBlock

**addBlock**(`target`, `blockData`, `parent?`, `index?`): [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `blockData` | [`FlowNodeJSON`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) |
| `parent?` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `index?` | `number` |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

***

### addFromNode

**addFromNode**(`fromNode`, `json`): [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | `string` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `json` | [`FlowNodeJSON`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) |

#### Returns

[`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

***

### deleteNode

**deleteNode**(`fromNode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`void`
