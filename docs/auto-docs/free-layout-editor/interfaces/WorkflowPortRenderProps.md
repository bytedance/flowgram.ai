# Interface: WorkflowPortRenderProps

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Properties

* [backgroundColor](/auto-docs/free-layout-editor/interfaces/WorkflowPortRenderProps.md#backgroundcolor)
* [className](/auto-docs/free-layout-editor/interfaces/WorkflowPortRenderProps.md#classname)
* [entity](/auto-docs/free-layout-editor/interfaces/WorkflowPortRenderProps.md#entity)
* [errorColor](/auto-docs/free-layout-editor/interfaces/WorkflowPortRenderProps.md#errorcolor)
* [onClick](/auto-docs/free-layout-editor/interfaces/WorkflowPortRenderProps.md#onclick)
* [primaryColor](/auto-docs/free-layout-editor/interfaces/WorkflowPortRenderProps.md#primarycolor)
* [secondaryColor](/auto-docs/free-layout-editor/interfaces/WorkflowPortRenderProps.md#secondarycolor)
* [style](/auto-docs/free-layout-editor/interfaces/WorkflowPortRenderProps.md#style)

## Properties

### backgroundColor

`Optional` **backgroundColor**: `string`

背景颜色

***

### className

`Optional` **className**: `string`

***

### entity

**entity**: [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)

***

### errorColor

`Optional` **errorColor**: `string`

错误状态颜色

***

### onClick

`Optional` **onClick**: (`e`: `MouseEvent`<`HTMLDivElement`, `MouseEvent`>, `port`: [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)) => `void`

#### Type declaration

(`e`, `port`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent`<`HTMLDivElement`, `MouseEvent`> |
| `port` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |

##### Returns

`void`

***

### primaryColor

`Optional` **primaryColor**: `string`

激活状态颜色 (linked/hovered)

***

### secondaryColor

`Optional` **secondaryColor**: `string`

默认状态颜色

***

### style

`Optional` **style**: `CSSProperties`
