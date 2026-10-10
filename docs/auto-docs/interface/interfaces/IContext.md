# Interface: IContext

## Hierarchy

* [`ContextData`](/auto-docs/interface/interfaces/ContextData.md)

  ↳ **`IContext`**

## Table of contents

### Properties

* [cache](/auto-docs/interface/interfaces/IContext.md#cache)
* [document](/auto-docs/interface/interfaces/IContext.md#document)
* [id](/auto-docs/interface/interfaces/IContext.md#id)
* [ioCenter](/auto-docs/interface/interfaces/IContext.md#iocenter)
* [messageCenter](/auto-docs/interface/interfaces/IContext.md#messagecenter)
* [reporter](/auto-docs/interface/interfaces/IContext.md#reporter)
* [snapshotCenter](/auto-docs/interface/interfaces/IContext.md#snapshotcenter)
* [state](/auto-docs/interface/interfaces/IContext.md#state)
* [statusCenter](/auto-docs/interface/interfaces/IContext.md#statuscenter)
* [variableStore](/auto-docs/interface/interfaces/IContext.md#variablestore)

### Methods

* [dispose](/auto-docs/interface/interfaces/IContext.md#dispose)
* [init](/auto-docs/interface/interfaces/IContext.md#init)
* [sub](/auto-docs/interface/interfaces/IContext.md#sub)

## Properties

### cache

**cache**: [`ICache`](/auto-docs/interface/interfaces/ICache.md)<`string`, `any`>

#### Inherited from

[ContextData](/auto-docs/interface/interfaces/ContextData.md).[cache](/auto-docs/interface/interfaces/ContextData.md#cache)

***

### document

**document**: [`IDocument`](/auto-docs/interface/interfaces/IDocument.md)

#### Inherited from

[ContextData](/auto-docs/interface/interfaces/ContextData.md).[document](/auto-docs/interface/interfaces/ContextData.md#document)

***

### id

**id**: `string`

***

### ioCenter

**ioCenter**: [`IIOCenter`](/auto-docs/interface/interfaces/IIOCenter.md)

#### Inherited from

[ContextData](/auto-docs/interface/interfaces/ContextData.md).[ioCenter](/auto-docs/interface/interfaces/ContextData.md#iocenter)

***

### messageCenter

**messageCenter**: [`IMessageCenter`](/auto-docs/interface/interfaces/IMessageCenter.md)

#### Inherited from

[ContextData](/auto-docs/interface/interfaces/ContextData.md).[messageCenter](/auto-docs/interface/interfaces/ContextData.md#messagecenter)

***

### reporter

**reporter**: [`IReporter`](/auto-docs/interface/interfaces/IReporter.md)

#### Inherited from

[ContextData](/auto-docs/interface/interfaces/ContextData.md).[reporter](/auto-docs/interface/interfaces/ContextData.md#reporter)

***

### snapshotCenter

**snapshotCenter**: [`ISnapshotCenter`](/auto-docs/interface/interfaces/ISnapshotCenter.md)

#### Inherited from

[ContextData](/auto-docs/interface/interfaces/ContextData.md).[snapshotCenter](/auto-docs/interface/interfaces/ContextData.md#snapshotcenter)

***

### state

**state**: [`IState`](/auto-docs/interface/interfaces/IState.md)

#### Inherited from

[ContextData](/auto-docs/interface/interfaces/ContextData.md).[state](/auto-docs/interface/interfaces/ContextData.md#state)

***

### statusCenter

**statusCenter**: [`IStatusCenter`](/auto-docs/interface/interfaces/IStatusCenter.md)

#### Inherited from

[ContextData](/auto-docs/interface/interfaces/ContextData.md).[statusCenter](/auto-docs/interface/interfaces/ContextData.md#statuscenter)

***

### variableStore

**variableStore**: [`IVariableStore`](/auto-docs/interface/interfaces/IVariableStore.md)

#### Inherited from

[ContextData](/auto-docs/interface/interfaces/ContextData.md).[variableStore](/auto-docs/interface/interfaces/ContextData.md#variablestore)

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
| `params` | [`InvokeParams`](/auto-docs/interface/interfaces/InvokeParams.md) |

#### Returns

`void`

***

### sub

**sub**(): [`IContext`](/auto-docs/interface/interfaces/IContext.md)

#### Returns

[`IContext`](/auto-docs/interface/interfaces/IContext.md)
