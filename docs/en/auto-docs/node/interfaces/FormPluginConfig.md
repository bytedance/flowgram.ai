# Interface: FormPluginConfig\<Opts>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Opts` | `any` |

## Table of contents

### Properties

* [name](/en/auto-docs/node/interfaces/FormPluginConfig.md#name)
* [onDispose](/en/auto-docs/node/interfaces/FormPluginConfig.md#ondispose)
* [onInit](/en/auto-docs/node/interfaces/FormPluginConfig.md#oninit)
* [onSetupFormMeta](/en/auto-docs/node/interfaces/FormPluginConfig.md#onsetupformmeta)

## Properties

### name

`Optional` **name**: `string`

form plugin name, for debug use

***

### onDispose

`Optional` **onDispose**: (`ctx`: [`FormPluginCtx`](/en/auto-docs/node/types/FormPluginCtx.md), `opts`: `Opts`) => `void`

#### Type declaration

(`ctx`, `opts`): `void`

FormModel 销毁时执行

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FormPluginCtx`](/en/auto-docs/node/types/FormPluginCtx.md) |
| `opts` | `Opts` |

##### Returns

`void`

***

### onInit

`Optional` **onInit**: (`ctx`: [`FormPluginCtx`](/en/auto-docs/node/types/FormPluginCtx.md), `opts`: `Opts`) => `void`

#### Type declaration

(`ctx`, `opts`): `void`

FormModel 初始化时执行

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FormPluginCtx`](/en/auto-docs/node/types/FormPluginCtx.md) |
| `opts` | `Opts` |

##### Returns

`void`

***

### onSetupFormMeta

`Optional` **onSetupFormMeta**: (`ctx`: [`FormPluginSetupMetaCtx`](/en/auto-docs/node/types/FormPluginSetupMetaCtx.md), `opts`: `Opts`) => `void`

#### Type declaration

(`ctx`, `opts`): `void`

setup formMeta

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FormPluginSetupMetaCtx`](/en/auto-docs/node/types/FormPluginSetupMetaCtx.md) |
| `opts` | `Opts` |

##### Returns

`void`
