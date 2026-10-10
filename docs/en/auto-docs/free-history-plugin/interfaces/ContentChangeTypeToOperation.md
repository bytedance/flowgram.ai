# Interface: ContentChangeTypeToOperation\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Operation`](/en/auto-docs/free-history-plugin/interfaces/Operation.md) |

## Table of contents

### Properties

* [toOperation](/en/auto-docs/free-history-plugin/interfaces/ContentChangeTypeToOperation.md#tooperation)
* [type](/en/auto-docs/free-history-plugin/interfaces/ContentChangeTypeToOperation.md#type)

## Properties

### toOperation

**toOperation**: (`event`: `WorkflowContentChangeEvent`, `ctx`: `PluginContext`) => `undefined` | `T`

#### Type declaration

(`event`, `ctx`): `undefined` | `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `WorkflowContentChangeEvent` |
| `ctx` | `PluginContext` |

##### Returns

`undefined` | `T`

***

### type

**type**: `WorkflowContentChangeType`
