# Interface: IRuntimeClient

## Table of contents

### Properties

* [TaskCancel](/en/auto-docs/interface/interfaces/IRuntimeClient.md#taskcancel)
* [TaskReport](/en/auto-docs/interface/interfaces/IRuntimeClient.md#taskreport)
* [TaskResult](/en/auto-docs/interface/interfaces/IRuntimeClient.md#taskresult)
* [TaskRun](/en/auto-docs/interface/interfaces/IRuntimeClient.md#taskrun)
* [TaskValidate](/en/auto-docs/interface/interfaces/IRuntimeClient.md#taskvalidate)

## Properties

### TaskCancel

**TaskCancel**: (`input`: [`TaskCancelInput`](/en/auto-docs/interface/interfaces/TaskCancelInput.md)) => `Promise`<`undefined` | [`TaskCancelOutput`](/en/auto-docs/interface/types/TaskCancelOutput.md)>

#### Type declaration

(`input`): `Promise`<`undefined` | [`TaskCancelOutput`](/en/auto-docs/interface/types/TaskCancelOutput.md)>

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`TaskCancelInput`](/en/auto-docs/interface/interfaces/TaskCancelInput.md) |

##### Returns

`Promise`<`undefined` | [`TaskCancelOutput`](/en/auto-docs/interface/types/TaskCancelOutput.md)>

***

### TaskReport

**TaskReport**: (`input`: [`TaskReportInput`](/en/auto-docs/interface/interfaces/TaskReportInput.md)) => `Promise`<[`TaskReportOutput`](/en/auto-docs/interface/types/TaskReportOutput.md)>

#### Type declaration

(`input`): `Promise`<[`TaskReportOutput`](/en/auto-docs/interface/types/TaskReportOutput.md)>

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`TaskReportInput`](/en/auto-docs/interface/interfaces/TaskReportInput.md) |

##### Returns

`Promise`<[`TaskReportOutput`](/en/auto-docs/interface/types/TaskReportOutput.md)>

***

### TaskResult

**TaskResult**: (`input`: [`TaskResultInput`](/en/auto-docs/interface/interfaces/TaskResultInput.md)) => `Promise`<[`TaskResultOutput`](/en/auto-docs/interface/types/TaskResultOutput.md)>

#### Type declaration

(`input`): `Promise`<[`TaskResultOutput`](/en/auto-docs/interface/types/TaskResultOutput.md)>

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`TaskResultInput`](/en/auto-docs/interface/interfaces/TaskResultInput.md) |

##### Returns

`Promise`<[`TaskResultOutput`](/en/auto-docs/interface/types/TaskResultOutput.md)>

***

### TaskRun

**TaskRun**: (`input`: [`TaskRunInput`](/en/auto-docs/interface/interfaces/TaskRunInput.md)) => `Promise`<`undefined` | [`TaskRunOutput`](/en/auto-docs/interface/interfaces/TaskRunOutput.md)>

#### Type declaration

(`input`): `Promise`<`undefined` | [`TaskRunOutput`](/en/auto-docs/interface/interfaces/TaskRunOutput.md)>

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`TaskRunInput`](/en/auto-docs/interface/interfaces/TaskRunInput.md) |

##### Returns

`Promise`<`undefined` | [`TaskRunOutput`](/en/auto-docs/interface/interfaces/TaskRunOutput.md)>

***

### TaskValidate

**TaskValidate**: (`input`: [`TaskValidateInput`](/en/auto-docs/interface/interfaces/TaskValidateInput.md)) => `Promise`<`undefined` | [`TaskValidateOutput`](/en/auto-docs/interface/interfaces/TaskValidateOutput.md)>

#### Type declaration

(`input`): `Promise`<`undefined` | [`TaskValidateOutput`](/en/auto-docs/interface/interfaces/TaskValidateOutput.md)>

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`TaskValidateInput`](/en/auto-docs/interface/interfaces/TaskValidateInput.md) |

##### Returns

`Promise`<`undefined` | [`TaskValidateOutput`](/en/auto-docs/interface/interfaces/TaskValidateOutput.md)>
