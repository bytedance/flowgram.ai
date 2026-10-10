# Interface: ContentChangeTypeToOperation\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Operation`](/auto-docs/free-layout-editor/interfaces/Operation.md) |

## Table of contents

### Properties

* [toOperation](/auto-docs/free-layout-editor/interfaces/ContentChangeTypeToOperation.md#tooperation)
* [type](/auto-docs/free-layout-editor/interfaces/ContentChangeTypeToOperation.md#type)

## Properties

### toOperation

**toOperation**: (`event`: [`WorkflowContentChangeEvent`](/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md), `ctx`: [`PluginContext`](/auto-docs/free-layout-editor/variables/PluginContext-1.md)) => `undefined` | `T`

#### Type declaration

(`event`, `ctx`): `undefined` | `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`WorkflowContentChangeEvent`](/auto-docs/free-layout-editor/interfaces/WorkflowContentChangeEvent.md) |
| `ctx` | [`PluginContext`](/auto-docs/free-layout-editor/variables/PluginContext-1.md) |

##### Returns

`undefined` | `T`

***

### type

**type**: [`WorkflowContentChangeType`](/auto-docs/free-layout-editor/enums/WorkflowContentChangeType.md)
