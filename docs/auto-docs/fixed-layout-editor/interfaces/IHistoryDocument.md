# Interface: IHistoryDocument

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Implemented by

* [`FixedHistoryService`](/auto-docs/fixed-layout-editor/classes/FixedHistoryService.md)

## Table of contents

### Methods

* [addBlock](/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md#addblock)
* [addFromNode](/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md#addfromnode)
* [deleteNode](/auto-docs/fixed-layout-editor/interfaces/IHistoryDocument.md#deletenode)

## Methods

### addBlock

**addBlock**(`target`, `blockData`, `parent?`, `index?`): [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `blockData` | [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) |
| `parent?` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `index?` | `number` |

#### Returns

[`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

***

### addFromNode

**addFromNode**(`fromNode`, `json`): [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | `string` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `json` | [`FlowNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) |

#### Returns

[`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

***

### deleteNode

**deleteNode**(`fromNode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromNode` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`void`
