# Class: FormPlugin\<Opts>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Opts` | `any` |

## Implements

* `Disposable`

## Table of contents

### Constructors

* [constructor](/auto-docs/node/classes/FormPlugin.md#constructor)

### Properties

* [config](/auto-docs/node/classes/FormPlugin.md#config)
* [name](/auto-docs/node/classes/FormPlugin.md#name)
* [opts](/auto-docs/node/classes/FormPlugin.md#opts)
* [pluginId](/auto-docs/node/classes/FormPlugin.md#pluginid)

### Accessors

* [ctx](/auto-docs/node/classes/FormPlugin.md#ctx)
* [formModel](/auto-docs/node/classes/FormPlugin.md#formmodel)

### Methods

* [dispose](/auto-docs/node/classes/FormPlugin.md#dispose)
* [init](/auto-docs/node/classes/FormPlugin.md#init)
* [setupFormMeta](/auto-docs/node/classes/FormPlugin.md#setupformmeta)

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
| `config` | [`FormPluginConfig`](/auto-docs/node/interfaces/FormPluginConfig.md)<`any`> |
| `opts?` | `Opts` |

## Properties

### config

`Readonly` **config**: [`FormPluginConfig`](/auto-docs/node/interfaces/FormPluginConfig.md)<`any`>

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

`get` **ctx**(): { `formModel`: [`FormModelV2`](/auto-docs/node/classes/FormModelV2.md)  } & `NodeFormContext`

#### Returns

{ `formModel`: [`FormModelV2`](/auto-docs/node/classes/FormModelV2.md)  } & `NodeFormContext`

***

### formModel

`get` **formModel**(): [`FormModelV2`](/auto-docs/node/classes/FormModelV2.md)

#### Returns

[`FormModelV2`](/auto-docs/node/classes/FormModelV2.md)

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

Disposable.dispose

***

### init

**init**(`formModel`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `formModel` | [`FormModelV2`](/auto-docs/node/classes/FormModelV2.md) |

#### Returns

`void`

***

### setupFormMeta

**setupFormMeta**(`formMeta`, `nodeContext`): [`FormMeta`](/auto-docs/node/interfaces/FormMeta.md)<`any`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `formMeta` | [`FormMeta`](/auto-docs/node/interfaces/FormMeta.md)<`any`> |
| `nodeContext` | `NodeFormContext` |

#### Returns

[`FormMeta`](/auto-docs/node/interfaces/FormMeta.md)<`any`>
