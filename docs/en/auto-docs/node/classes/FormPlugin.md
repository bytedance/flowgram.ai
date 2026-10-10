# Class: FormPlugin\<Opts>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Opts` | `any` |

## Implements

* `Disposable`

## Table of contents

### Constructors

* [constructor](/en/auto-docs/node/classes/FormPlugin.md#constructor)

### Properties

* [config](/en/auto-docs/node/classes/FormPlugin.md#config)
* [name](/en/auto-docs/node/classes/FormPlugin.md#name)
* [opts](/en/auto-docs/node/classes/FormPlugin.md#opts)
* [pluginId](/en/auto-docs/node/classes/FormPlugin.md#pluginid)

### Accessors

* [ctx](/en/auto-docs/node/classes/FormPlugin.md#ctx)
* [formModel](/en/auto-docs/node/classes/FormPlugin.md#formmodel)

### Methods

* [dispose](/en/auto-docs/node/classes/FormPlugin.md#dispose)
* [init](/en/auto-docs/node/classes/FormPlugin.md#init)
* [setupFormMeta](/en/auto-docs/node/classes/FormPlugin.md#setupformmeta)

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
| `config` | [`FormPluginConfig`](/en/auto-docs/node/interfaces/FormPluginConfig.md)<`any`> |
| `opts?` | `Opts` |

## Properties

### config

`Readonly` **config**: [`FormPluginConfig`](/en/auto-docs/node/interfaces/FormPluginConfig.md)<`any`>

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

`get` **ctx**(): { `formModel`: [`FormModelV2`](/en/auto-docs/node/classes/FormModelV2.md)  } & `NodeFormContext`

#### Returns

{ `formModel`: [`FormModelV2`](/en/auto-docs/node/classes/FormModelV2.md)  } & `NodeFormContext`

***

### formModel

`get` **formModel**(): [`FormModelV2`](/en/auto-docs/node/classes/FormModelV2.md)

#### Returns

[`FormModelV2`](/en/auto-docs/node/classes/FormModelV2.md)

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
| `formModel` | [`FormModelV2`](/en/auto-docs/node/classes/FormModelV2.md) |

#### Returns

`void`

***

### setupFormMeta

**setupFormMeta**(`formMeta`, `nodeContext`): [`FormMeta`](/en/auto-docs/node/interfaces/FormMeta.md)<`any`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `formMeta` | [`FormMeta`](/en/auto-docs/node/interfaces/FormMeta.md)<`any`> |
| `nodeContext` | `NodeFormContext` |

#### Returns

[`FormMeta`](/en/auto-docs/node/interfaces/FormMeta.md)<`any`>
