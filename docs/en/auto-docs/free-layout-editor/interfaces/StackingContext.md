# Interface: StackingContext

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Properties

* [hoveredEntityID](/en/auto-docs/free-layout-editor/interfaces/StackingContext.md#hoveredentityid)
* [selectedIDs](/en/auto-docs/free-layout-editor/interfaces/StackingContext.md#selectedids)
* [selectedNodes](/en/auto-docs/free-layout-editor/interfaces/StackingContext.md#selectednodes)
* [sortNodes](/en/auto-docs/free-layout-editor/interfaces/StackingContext.md#sortnodes)

## Properties

### hoveredEntityID

`Optional` **hoveredEntityID**: `string`

***

### selectedIDs

**selectedIDs**: `Set`<`string`>

***

### selectedNodes

**selectedNodes**: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

***

### sortNodes

**sortNodes**: (`nodes`: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]) => [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

#### Type declaration

(`nodes`): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |

##### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]
