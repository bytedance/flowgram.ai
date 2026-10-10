# Interface: WorkflowNodeProps

## Table of contents

### Properties

* [children](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#children)
* [className](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#classname)
* [node](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#node)
* [onPortClick](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#onportclick)
* [portBackgroundColor](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#portbackgroundcolor)
* [portClassName](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#portclassname)
* [portErrorColor](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#porterrorcolor)
* [portPrimaryColor](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#portprimarycolor)
* [portSecondaryColor](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#portsecondarycolor)
* [portStyle](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#portstyle)
* [style](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeProps.md#style)

## Properties

### children

`Optional` **children**: `ReactNode`

***

### className

`Optional` **className**: `string`

***

### node

**node**: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

***

### onPortClick

`Optional` **onPortClick**: (`port`: [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md), `e`: `MouseEvent`<`HTMLDivElement`, `MouseEvent`> | `MouseEventHandler`<`HTMLDivElement`>) => `void`

#### Type declaration

(`port`, `e`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `port` | [`WorkflowPortEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |
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
