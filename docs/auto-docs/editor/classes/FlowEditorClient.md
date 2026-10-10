# Class: FlowEditorClient

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/FlowEditorClient.md#constructor)

### Properties

* [nodeClient](/auto-docs/editor/classes/FlowEditorClient.md#nodeclient)
* [playground](/auto-docs/editor/classes/FlowEditorClient.md#playground)

### Methods

* [focusNode](/auto-docs/editor/classes/FlowEditorClient.md#focusnode)
* [focusNodeFormItem](/auto-docs/editor/classes/FlowEditorClient.md#focusnodeformitem)

## Constructors

### constructor

**new FlowEditorClient**()

## Properties

### nodeClient

`Readonly` **nodeClient**: [`NodeClient`](/auto-docs/editor/classes/NodeClient.md)

***

### playground

`Readonly` **playground**: [`Playground`](/auto-docs/editor/classes/Playground.md)<`any`>

## Methods

### focusNode

**focusNode**(`node`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md) |
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
| `options?` | [`FocusNodeFormItemOptions`](/auto-docs/editor/interfaces/FocusNodeFormItemOptions.md) |

#### Returns

`void`
