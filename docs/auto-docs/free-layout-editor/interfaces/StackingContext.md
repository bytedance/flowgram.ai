# Interface: StackingContext

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Properties

* [hoveredEntityID](/auto-docs/free-layout-editor/interfaces/StackingContext.md#hoveredentityid)
* [selectedIDs](/auto-docs/free-layout-editor/interfaces/StackingContext.md#selectedids)
* [selectedNodes](/auto-docs/free-layout-editor/interfaces/StackingContext.md#selectednodes)
* [sortNodes](/auto-docs/free-layout-editor/interfaces/StackingContext.md#sortnodes)

## Properties

### hoveredEntityID

`Optional` **hoveredEntityID**: `string`

***

### selectedIDs

**selectedIDs**: `Set`<`string`>

***

### selectedNodes

**selectedNodes**: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

***

### sortNodes

**sortNodes**: (`nodes`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]) => [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

#### Type declaration

(`nodes`): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |

##### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]
