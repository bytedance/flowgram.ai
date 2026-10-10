# Interface: WorkflowNodeProps

## Table of contents

### Properties

* [children](/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#children)
* [className](/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#classname)
* [node](/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#node)
* [onPortClick](/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#onportclick)
* [portBackgroundColor](/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#portbackgroundcolor)
* [portClassName](/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#portclassname)
* [portErrorColor](/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#porterrorcolor)
* [portPrimaryColor](/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#portprimarycolor)
* [portSecondaryColor](/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#portsecondarycolor)
* [portStyle](/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#portstyle)
* [style](/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#style)

## Properties

### children

`Optional` **children**: `ReactNode`

***

### className

`Optional` **className**: `string`

***

### node

**node**: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

***

### onPortClick

`Optional` **onPortClick**: (`port`: [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md), `e`: `MouseEvent`<`HTMLDivElement`, `MouseEvent`> | `MouseEventHandler`<`HTMLDivElement`>) => `void`

#### Type declaration

(`port`, `e`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `port` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |
| `e` | `MouseEvent`<`HTMLDivElement`, `MouseEvent`> | `MouseEventHandler`<`HTMLDivElement`> |

##### Returns

`void`

***

### portBackgroundColor

`Optional` **portBackgroundColor**: `string`

端口背景颜色

***

### portClassName

`Optional` **portClassName**: `string`

***

### portErrorColor

`Optional` **portErrorColor**: `string`

端口错误状态颜色

***

### portPrimaryColor

`Optional` **portPrimaryColor**: `string`

端口激活状态颜色 (linked/hovered)

***

### portSecondaryColor

`Optional` **portSecondaryColor**: `string`

端口默认状态颜色

***

### portStyle

`Optional` **portStyle**: `CSSProperties`

***

### style

`Optional` **style**: `CSSProperties`
