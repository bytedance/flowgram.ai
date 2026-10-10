# Class: FixedHistoryFormDataService

An object that performs a cleanup operation when `.dispose()` is called.

Some examples of how disposables are used:

* An event listener that removes itself when `.dispose()` is called.
* The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.

## Implements

* [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/FixedHistoryFormDataService.md#constructor)

### Properties

* [document](/auto-docs/fixed-layout-editor/classes/FixedHistoryFormDataService.md#document)
* [onFormValueChangeByHistory](/auto-docs/fixed-layout-editor/classes/FixedHistoryFormDataService.md#onformvaluechangebyhistory)

### Methods

* [dispose](/auto-docs/fixed-layout-editor/classes/FixedHistoryFormDataService.md#dispose)
* [getCache](/auto-docs/fixed-layout-editor/classes/FixedHistoryFormDataService.md#getcache)
* [getFormDataByNodeId](/auto-docs/fixed-layout-editor/classes/FixedHistoryFormDataService.md#getformdatabynodeid)
* [getFormItem](/auto-docs/fixed-layout-editor/classes/FixedHistoryFormDataService.md#getformitem)
* [getFormItemValue](/auto-docs/fixed-layout-editor/classes/FixedHistoryFormDataService.md#getformitemvalue)
* [resetCache](/auto-docs/fixed-layout-editor/classes/FixedHistoryFormDataService.md#resetcache)
* [setCache](/auto-docs/fixed-layout-editor/classes/FixedHistoryFormDataService.md#setcache)
* [setFormItemValue](/auto-docs/fixed-layout-editor/classes/FixedHistoryFormDataService.md#setformitemvalue)

## Constructors

### constructor

**new FixedHistoryFormDataService**()

## Properties

### document

**document**: [`FlowDocument`](/auto-docs/fixed-layout-editor/classes/FlowDocument.md)<[`FlowDocumentJSON`](/auto-docs/fixed-layout-editor/types/FlowDocumentJSON.md)>

***

### onFormValueChangeByHistory

**onFormValueChangeByHistory**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<{ `formData`: [`FlowNodeFormData`](/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md) ; `path`: `string` ; `value`: `any`  }>

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md).[dispose](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md#dispose)

***

### getCache

**getCache**(`flowNodeFormData`, `prop`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `flowNodeFormData` | [`FlowNodeFormData`](/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md) |
| `prop` | `string` |

#### Returns

`any`

***

### getFormDataByNodeId

**getFormDataByNodeId**(`id`): `undefined` | [`FlowNodeFormData`](/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md)

获取表单数据

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | node id |

#### Returns

`undefined` | [`FlowNodeFormData`](/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md)

表单数据

***

### getFormItem

**getFormItem**(`formData`, `path`): `undefined` | `FormItem`

#### Parameters

| Name | Type |
| :------ | :------ |
| `formData` | [`FlowNodeFormData`](/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md) |
| `path` | `string` |

#### Returns

`undefined` | `FormItem`

***

### getFormItemValue

**getFormItemValue**(`formData`, `path`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `formData` | [`FlowNodeFormData`](/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md) |
| `path` | `string` |

#### Returns

`any`

***

### resetCache

**resetCache**(`flowNodeFormData`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `flowNodeFormData` | [`FlowNodeFormData`](/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md) |
| `value` | `any` |

#### Returns

`void`

***

### setCache

**setCache**(`flowNodeFormData`, `prop`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `flowNodeFormData` | [`FlowNodeFormData`](/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md) |
| `prop` | `string` |
| `value` | `any` |

#### Returns

`void`

***

### setFormItemValue

**setFormItemValue**(`formData`, `path`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `formData` | [`FlowNodeFormData`](/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md) |
| `path` | `string` |
| `value` | `any` |

#### Returns

`void`
