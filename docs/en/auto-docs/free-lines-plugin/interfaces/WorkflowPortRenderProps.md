# Interface: WorkflowPortRenderProps

## Table of contents

### Properties

* [backgroundColor](/en/auto-docs/free-lines-plugin/interfaces/WorkflowPortRenderProps.md#backgroundcolor)
* [className](/en/auto-docs/free-lines-plugin/interfaces/WorkflowPortRenderProps.md#classname)
* [entity](/en/auto-docs/free-lines-plugin/interfaces/WorkflowPortRenderProps.md#entity)
* [errorColor](/en/auto-docs/free-lines-plugin/interfaces/WorkflowPortRenderProps.md#errorcolor)
* [onClick](/en/auto-docs/free-lines-plugin/interfaces/WorkflowPortRenderProps.md#onclick)
* [primaryColor](/en/auto-docs/free-lines-plugin/interfaces/WorkflowPortRenderProps.md#primarycolor)
* [secondaryColor](/en/auto-docs/free-lines-plugin/interfaces/WorkflowPortRenderProps.md#secondarycolor)
* [style](/en/auto-docs/free-lines-plugin/interfaces/WorkflowPortRenderProps.md#style)

## Properties

### backgroundColor

`Optional` **backgroundColor**: `string`

背景颜色

***

### className

`Optional` **className**: `string`

***

### entity

**entity**: `WorkflowPortEntity`

***

### errorColor

`Optional` **errorColor**: `string`

错误状态颜色

***

### onClick

`Optional` **onClick**: (`e`: `MouseEvent`<`HTMLDivElement`, `MouseEvent`>, `port`: `WorkflowPortEntity`) => `void`

#### Type declaration

(`e`, `port`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent`<`HTMLDivElement`, `MouseEvent`> |
| `port` | `WorkflowPortEntity` |

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
