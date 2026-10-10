# Class: FormPlugin\<Opts>

An object that performs a cleanup operation when `.dispose()` is called.

Some examples of how disposables are used:

* An event listener that removes itself when `.dispose()` is called.
* The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Opts` | `any` |

## Implements

* [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/FormPlugin.md#constructor)

### Properties

* [config](/auto-docs/fixed-layout-editor/classes/FormPlugin.md#config)
* [name](/auto-docs/fixed-layout-editor/classes/FormPlugin.md#name)
* [opts](/auto-docs/fixed-layout-editor/classes/FormPlugin.md#opts)
* [pluginId](/auto-docs/fixed-layout-editor/classes/FormPlugin.md#pluginid)

### Accessors

* [ctx](/auto-docs/fixed-layout-editor/classes/FormPlugin.md#ctx)
* [formModel](/auto-docs/fixed-layout-editor/classes/FormPlugin.md#formmodel)

### Methods

* [dispose](/auto-docs/fixed-layout-editor/classes/FormPlugin.md#dispose)
* [init](/auto-docs/fixed-layout-editor/classes/FormPlugin.md#init)
* [setupFormMeta](/auto-docs/fixed-layout-editor/classes/FormPlugin.md#setupformmeta)

## Constructors

### constructor

**new FormPlugin**<`Opts`>(`config`, `opts?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Opts` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`FormPluginConfig`](/auto-docs/fixed-layout-editor/interfaces/FormPluginConfig.md)<`any`> |
| `opts?` | `Opts` |

## Properties

### config

`Readonly` **config**: [`FormPluginConfig`](/auto-docs/fixed-layout-editor/interfaces/FormPluginConfig.md)<`any`>

***

### name

`Readonly` **name**: `string`

***

### opts

`Optional` `Readonly` **opts**: `Opts`

***

### pluginId

`Readonly` **pluginId**: `string`

## Accessors

### ctx

`get` **ctx**(): { `formModel`: [`FormModel`](/auto-docs/fixed-layout-editor/classes/FormModel.md)  } & `NodeFormContext`

#### Returns

{ `formModel`: [`FormModel`](/auto-docs/fixed-layout-editor/classes/FormModel.md)  } & `NodeFormContext`

***

### formModel

`get` **formModel**(): [`FormModel`](/auto-docs/fixed-layout-editor/classes/FormModel.md)

#### Returns

[`FormModel`](/auto-docs/fixed-layout-editor/classes/FormModel.md)

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md).[dispose](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md#dispose)

***

### init

**init**(`formModel`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `formModel` | [`FormModel`](/auto-docs/fixed-layout-editor/classes/FormModel.md) |

#### Returns

`void`

***

### setupFormMeta

**setupFormMeta**(`formMeta`, `nodeContext`): [`FormMeta`](/auto-docs/fixed-layout-editor/interfaces/FormMeta.md)<`any`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `formMeta` | [`FormMeta`](/auto-docs/fixed-layout-editor/interfaces/FormMeta.md)<`any`> |
| `nodeContext` | `NodeFormContext` |

#### Returns

[`FormMeta`](/auto-docs/fixed-layout-editor/interfaces/FormMeta.md)<`any`>
