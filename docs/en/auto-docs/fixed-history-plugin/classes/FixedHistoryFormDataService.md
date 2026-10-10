# Class: FixedHistoryFormDataService

## Implements

* `Disposable`

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryFormDataService.md#constructor)

### Properties

* [document](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryFormDataService.md#document)
* [onFormValueChangeByHistory](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryFormDataService.md#onformvaluechangebyhistory)

### Methods

* [dispose](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryFormDataService.md#dispose)
* [getCache](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryFormDataService.md#getcache)
* [getFormDataByNodeId](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryFormDataService.md#getformdatabynodeid)
* [getFormItem](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryFormDataService.md#getformitem)
* [getFormItemValue](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryFormDataService.md#getformitemvalue)
* [resetCache](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryFormDataService.md#resetcache)
* [setCache](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryFormDataService.md#setcache)
* [setFormItemValue](/en/auto-docs/fixed-history-plugin/classes/FixedHistoryFormDataService.md#setformitemvalue)

## Constructors

### constructor

**new FixedHistoryFormDataService**()

## Properties

### document

**document**: `FlowDocument`<`FlowDocumentJSON`>

***

### onFormValueChangeByHistory

**onFormValueChangeByHistory**: `Event`<{ `formData`: `FlowNodeFormData` ; `path`: `string` ; `value`: `any`  }>

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

Disposable.dispose

***

### getCache

**getCache**(`flowNodeFormData`, `prop`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `flowNodeFormData` | `FlowNodeFormData` |
| `prop` | `string` |

#### Returns

`any`

***

### getFormDataByNodeId

**getFormDataByNodeId**(`id`): `undefined` | `FlowNodeFormData`

获取表单数据

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | node id |

#### Returns

`undefined` | `FlowNodeFormData`

表单数据

***

### getFormItem

**getFormItem**(`formData`, `path`): `undefined` | `FormItem`

#### Parameters

| Name | Type |
| :------ | :------ |
| `formData` | `FlowNodeFormData` |
| `path` | `string` |

#### Returns

`undefined` | `FormItem`

***

### getFormItemValue

**getFormItemValue**(`formData`, `path`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `formData` | `FlowNodeFormData` |
| `path` | `string` |

#### Returns

`any`

***

### resetCache

**resetCache**(`flowNodeFormData`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `flowNodeFormData` | `FlowNodeFormData` |
| `value` | `any` |

#### Returns

`void`

***

### setCache

**setCache**(`flowNodeFormData`, `prop`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `flowNodeFormData` | `FlowNodeFormData` |
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
| `formData` | `FlowNodeFormData` |
| `path` | `string` |
| `value` | `any` |

#### Returns

`void`
