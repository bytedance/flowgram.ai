# Interface: ContentChangeTypeToOperation\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Operation`](/en/auto-docs/free-layout-editor/interfaces/Operation.md) |

## Table of contents

### Properties

* [toOperation](/en/auto-docs/free-layout-editor/interfaces/ContentChangeTypeToOperation.md#tooperation)
* [type](/en/auto-docs/free-layout-editor/interfaces/ContentChangeTypeToOperation.md#type)

## Properties

### toOperation

**toOperation**: (`event`: [`WorkflowContentChangeEvent`](/en/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md), `ctx`: [`PluginContext`](/en/auto-docs/free-layout-editor/variables/PluginContext-1.md)) => `undefined` | `T`

#### Type declaration

(`event`, `ctx`): `undefined` | `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`WorkflowContentChangeEvent`](/en/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md) |
| `ctx` | [`PluginContext`](/en/auto-docs/free-layout-editor/variables/PluginContext-1.md) |

##### Returns

`undefined` | `T`

***

### type

**type**: [`WorkflowContentChangeType`](/en/auto-docs/free-layout-editor/enums/WorkflowContentChangeType.md)
