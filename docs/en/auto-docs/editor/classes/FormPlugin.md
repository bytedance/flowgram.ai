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

* [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/FormPlugin.md#constructor)

### Properties

* [config](/en/auto-docs/editor/classes/FormPlugin.md#config)
* [name](/en/auto-docs/editor/classes/FormPlugin.md#name)
* [opts](/en/auto-docs/editor/classes/FormPlugin.md#opts)
* [pluginId](/en/auto-docs/editor/classes/FormPlugin.md#pluginid)

### Accessors

* [ctx](/en/auto-docs/editor/classes/FormPlugin.md#ctx)
* [formModel](/en/auto-docs/editor/classes/FormPlugin.md#formmodel)

### Methods

* [dispose](/en/auto-docs/editor/classes/FormPlugin.md#dispose)
* [init](/en/auto-docs/editor/classes/FormPlugin.md#init)
* [setupFormMeta](/en/auto-docs/editor/classes/FormPlugin.md#setupformmeta)

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
| `config` | [`FormPluginConfig`](/en/auto-docs/editor/interfaces/FormPluginConfig.md)<`any`> |
| `opts?` | `Opts` |

## Properties

### config

`Readonly` **config**: [`FormPluginConfig`](/en/auto-docs/editor/interfaces/FormPluginConfig.md)<`any`>

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

`get` **ctx**(): { `formModel`: [`FormModel`](/en/auto-docs/editor/classes/FormModel.md)  } & `NodeFormContext`

#### Returns

{ `formModel`: [`FormModel`](/en/auto-docs/editor/classes/FormModel.md)  } & `NodeFormContext`

***

### formModel

`get` **formModel**(): [`FormModel`](/en/auto-docs/editor/classes/FormModel.md)

#### Returns

[`FormModel`](/en/auto-docs/editor/classes/FormModel.md)

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/en/auto-docs/editor/interfaces/Disposable-1.md).[dispose](/en/auto-docs/editor/interfaces/Disposable-1.md#dispose)

***

### init

**init**(`formModel`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `formModel` | [`FormModel`](/en/auto-docs/editor/classes/FormModel.md) |

#### Returns

`void`

***

### setupFormMeta

**setupFormMeta**(`formMeta`, `nodeContext`): [`FormMeta`](/en/auto-docs/editor/interfaces/FormMeta.md)<`any`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `formMeta` | [`FormMeta`](/en/auto-docs/editor/interfaces/FormMeta.md)<`any`> |
| `nodeContext` | `NodeFormContext` |

#### Returns

[`FormMeta`](/en/auto-docs/editor/interfaces/FormMeta.md)<`any`>
