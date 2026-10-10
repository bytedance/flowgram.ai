# Class: FlowEditorClient

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/FlowEditorClient.md#constructor)

### Properties

* [nodeClient](/en/auto-docs/editor/classes/FlowEditorClient.md#nodeclient)
* [playground](/en/auto-docs/editor/classes/FlowEditorClient.md#playground)

### Methods

* [focusNode](/en/auto-docs/editor/classes/FlowEditorClient.md#focusnode)
* [focusNodeFormItem](/en/auto-docs/editor/classes/FlowEditorClient.md#focusnodeformitem)

## Constructors

### constructor

**new FlowEditorClient**()

## Properties

### nodeClient

`Readonly` **nodeClient**: [`NodeClient`](/en/auto-docs/editor/classes/NodeClient.md)

***

### playground

`Readonly` **playground**: [`Playground`](/en/auto-docs/editor/classes/Playground.md)<`any`>

## Methods

### focusNode

**focusNode**(`node`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md) |
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
| `options?` | [`FocusNodeFormItemOptions`](/en/auto-docs/editor/interfaces/FocusNodeFormItemOptions.md) |

#### Returns

`void`
