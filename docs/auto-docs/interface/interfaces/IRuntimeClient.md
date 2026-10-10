# Interface: IRuntimeClient

## Table of contents

### Properties

* [TaskCancel](/auto-docs/interface/interfaces/IRuntimeClient.md#taskcancel)
* [TaskReport](/auto-docs/interface/interfaces/IRuntimeClient.md#taskreport)
* [TaskResult](/auto-docs/interface/interfaces/IRuntimeClient.md#taskresult)
* [TaskRun](/auto-docs/interface/interfaces/IRuntimeClient.md#taskrun)
* [TaskValidate](/auto-docs/interface/interfaces/IRuntimeClient.md#taskvalidate)

## Properties

### TaskCancel

**TaskCancel**: (`input`: [`TaskCancelInput`](/auto-docs/interface/interfaces/TaskCancelInput.md)) => `Promise`<`undefined` | [`TaskCancelOutput`](/auto-docs/interface/types/TaskCancelOutput.md)>

#### Type declaration

(`input`): `Promise`<`undefined` | [`TaskCancelOutput`](/auto-docs/interface/types/TaskCancelOutput.md)>

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`TaskCancelInput`](/auto-docs/interface/interfaces/TaskCancelInput.md) |

##### Returns

`Promise`<`undefined` | [`TaskCancelOutput`](/auto-docs/interface/types/TaskCancelOutput.md)>

***

### TaskReport

**TaskReport**: (`input`: [`TaskReportInput`](/auto-docs/interface/interfaces/TaskReportInput.md)) => `Promise`<[`TaskReportOutput`](/auto-docs/interface/types/TaskReportOutput.md)>

#### Type declaration

(`input`): `Promise`<[`TaskReportOutput`](/auto-docs/interface/types/TaskReportOutput.md)>

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`TaskReportInput`](/auto-docs/interface/interfaces/TaskReportInput.md) |

##### Returns

`Promise`<[`TaskReportOutput`](/auto-docs/interface/types/TaskReportOutput.md)>

***

### TaskResult

**TaskResult**: (`input`: [`TaskResultInput`](/auto-docs/interface/interfaces/TaskResultInput.md)) => `Promise`<[`TaskResultOutput`](/auto-docs/interface/types/TaskResultOutput.md)>

#### Type declaration

(`input`): `Promise`<[`TaskResultOutput`](/auto-docs/interface/types/TaskResultOutput.md)>

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`TaskResultInput`](/auto-docs/interface/interfaces/TaskResultInput.md) |

##### Returns

`Promise`<[`TaskResultOutput`](/auto-docs/interface/types/TaskResultOutput.md)>

***

### TaskRun

**TaskRun**: (`input`: [`TaskRunInput`](/auto-docs/interface/interfaces/TaskRunInput.md)) => `Promise`<`undefined` | [`TaskRunOutput`](/auto-docs/interface/interfaces/TaskRunOutput.md)>

#### Type declaration

(`input`): `Promise`<`undefined` | [`TaskRunOutput`](/auto-docs/interface/interfaces/TaskRunOutput.md)>

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`TaskRunInput`](/auto-docs/interface/interfaces/TaskRunInput.md) |

##### Returns

`Promise`<`undefined` | [`TaskRunOutput`](/auto-docs/interface/interfaces/TaskRunOutput.md)>

***

### TaskValidate

**TaskValidate**: (`input`: [`TaskValidateInput`](/auto-docs/interface/interfaces/TaskValidateInput.md)) => `Promise`<`undefined` | [`TaskValidateOutput`](/auto-docs/interface/interfaces/TaskValidateOutput.md)>

#### Type declaration

(`input`): `Promise`<`undefined` | [`TaskValidateOutput`](/auto-docs/interface/interfaces/TaskValidateOutput.md)>

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`TaskValidateInput`](/auto-docs/interface/interfaces/TaskValidateInput.md) |

##### Returns

`Promise`<`undefined` | [`TaskValidateOutput`](/auto-docs/interface/interfaces/TaskValidateOutput.md)>
