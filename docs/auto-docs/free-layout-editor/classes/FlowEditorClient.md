# Class: FlowEditorClient

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/FlowEditorClient.md#constructor)

### Properties

* [nodeClient](/auto-docs/free-layout-editor/classes/FlowEditorClient.md#nodeclient)
* [playground](/auto-docs/free-layout-editor/classes/FlowEditorClient.md#playground)

### Methods

* [focusNode](/auto-docs/free-layout-editor/classes/FlowEditorClient.md#focusnode)
* [focusNodeFormItem](/auto-docs/free-layout-editor/classes/FlowEditorClient.md#focusnodeformitem)

## Constructors

### constructor

**new FlowEditorClient**()

## Properties

### nodeClient

`Readonly` **nodeClient**: [`NodeClient`](/auto-docs/free-layout-editor/classes/NodeClient.md)

***

### playground

`Readonly` **playground**: [`Playground`](/auto-docs/free-layout-editor/classes/Playground.md)<`any`>

## Methods

### focusNode

**focusNode**(`node`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `options?` | `FocusNodeOptions` |

#### Returns

`void`

***

### focusNodeFormItem

**focusNodeFormItem**(`formItem`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `formItem` | `FormItem` |
| `options?` | [`FocusNodeFormItemOptions`](/auto-docs/free-layout-editor/interfaces/FocusNodeFormItemOptions.md) |

#### Returns

`void`
