# Interface: FlowDocumentContribution\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FlowDocument`](/auto-docs/fixed-layout-editor/classes/FlowDocument.md) = [`FlowDocument`](/auto-docs/fixed-layout-editor/classes/FlowDocument.md) |

## Table of contents

### Methods

* [loadDocument](/auto-docs/fixed-layout-editor/interfaces/FlowDocumentContribution.md#loaddocument)
* [registerDocument](/auto-docs/fixed-layout-editor/interfaces/FlowDocumentContribution.md#registerdocument)

## Methods

### loadDocument

`Optional` **loadDocument**(`document`): `Promise`<`void`>

加载数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `T` |

#### Returns

`Promise`<`void`>

***

### registerDocument

`Optional` **registerDocument**(`document`): `void`

注册

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `T` |

#### Returns

`void`
