# Interface: IContext

## Hierarchy

* [`ContextData`](/en/auto-docs/interface/interfaces/ContextData.md)

  ↳ **`IContext`**

## Table of contents

### Properties

* [cache](/en/auto-docs/interface/interfaces/IContext.md#cache)
* [document](/en/auto-docs/interface/interfaces/IContext.md#document)
* [id](/en/auto-docs/interface/interfaces/IContext.md#id)
* [ioCenter](/en/auto-docs/interface/interfaces/IContext.md#iocenter)
* [messageCenter](/en/auto-docs/interface/interfaces/IContext.md#messagecenter)
* [reporter](/en/auto-docs/interface/interfaces/IContext.md#reporter)
* [snapshotCenter](/en/auto-docs/interface/interfaces/IContext.md#snapshotcenter)
* [state](/en/auto-docs/interface/interfaces/IContext.md#state)
* [statusCenter](/en/auto-docs/interface/interfaces/IContext.md#statuscenter)
* [variableStore](/en/auto-docs/interface/interfaces/IContext.md#variablestore)

### Methods

* [dispose](/en/auto-docs/interface/interfaces/IContext.md#dispose)
* [init](/en/auto-docs/interface/interfaces/IContext.md#init)
* [sub](/en/auto-docs/interface/interfaces/IContext.md#sub)

## Properties

### cache

**cache**: [`ICache`](/en/auto-docs/interface/interfaces/ICache.md)<`string`, `any`>

#### Inherited from

[ContextData](/en/auto-docs/interface/interfaces/ContextData.md).[cache](/en/auto-docs/interface/interfaces/ContextData.md#cache)

***

### document

**document**: [`IDocument`](/en/auto-docs/interface/interfaces/IDocument.md)

#### Inherited from

[ContextData](/en/auto-docs/interface/interfaces/ContextData.md).[document](/en/auto-docs/interface/interfaces/ContextData.md#document)

***

### id

**id**: `string`

***

### ioCenter

**ioCenter**: [`IIOCenter`](/en/auto-docs/interface/interfaces/IIOCenter.md)

#### Inherited from

[ContextData](/en/auto-docs/interface/interfaces/ContextData.md).[ioCenter](/en/auto-docs/interface/interfaces/ContextData.md#iocenter)

***

### messageCenter

**messageCenter**: [`IMessageCenter`](/en/auto-docs/interface/interfaces/IMessageCenter.md)

#### Inherited from

[ContextData](/en/auto-docs/interface/interfaces/ContextData.md).[messageCenter](/en/auto-docs/interface/interfaces/ContextData.md#messagecenter)

***

### reporter

**reporter**: [`IReporter`](/en/auto-docs/interface/interfaces/IReporter.md)

#### Inherited from

[ContextData](/en/auto-docs/interface/interfaces/ContextData.md).[reporter](/en/auto-docs/interface/interfaces/ContextData.md#reporter)

***

### snapshotCenter

**snapshotCenter**: [`ISnapshotCenter`](/en/auto-docs/interface/interfaces/ISnapshotCenter.md)

#### Inherited from

[ContextData](/en/auto-docs/interface/interfaces/ContextData.md).[snapshotCenter](/en/auto-docs/interface/interfaces/ContextData.md#snapshotcenter)

***

### state

**state**: [`IState`](/en/auto-docs/interface/interfaces/IState.md)

#### Inherited from

[ContextData](/en/auto-docs/interface/interfaces/ContextData.md).[state](/en/auto-docs/interface/interfaces/ContextData.md#state)

***

### statusCenter

**statusCenter**: [`IStatusCenter`](/en/auto-docs/interface/interfaces/IStatusCenter.md)

#### Inherited from

[ContextData](/en/auto-docs/interface/interfaces/ContextData.md).[statusCenter](/en/auto-docs/interface/interfaces/ContextData.md#statuscenter)

***

### variableStore

**variableStore**: [`IVariableStore`](/en/auto-docs/interface/interfaces/IVariableStore.md)

#### Inherited from

[ContextData](/en/auto-docs/interface/interfaces/ContextData.md).[variableStore](/en/auto-docs/interface/interfaces/ContextData.md#variablestore)

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### init

**init**(`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`InvokeParams`](/en/auto-docs/interface/interfaces/InvokeParams.md) |

#### Returns

`void`

***

### sub

**sub**(): [`IContext`](/en/auto-docs/interface/interfaces/IContext.md)

#### Returns

[`IContext`](/en/auto-docs/interface/interfaces/IContext.md)
