# Class: StackingComputing

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/StackingComputing.md#constructor)

### Methods

* [compute](/auto-docs/free-layout-editor/classes/StackingComputing.md#compute)

## Constructors

### constructor

**new StackingComputing**()

## Methods

### compute

**compute**(`params`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.context` | [`StackingContext`](/auto-docs/free-layout-editor/interfaces/StackingContext.md) |
| `params.nodes` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |
| `params.root` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `lineLevel` | `Map`<`string`, `number`> | 线条层级 |
| `maxLevel` | `number` | 选中计算叠加后可能计算出的最高层级 |
| `nodeLevel` | `Map`<`string`, `number`> | 节点层级 |
| `topLevel` | `number` | 正常渲染的最高层级 |
