# Interface: FormPluginConfig\<Opts>

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Type parameters

| Name | Type |
| :------ | :------ |
| `Opts` | `any` |

## Table of contents

### Properties

* [name](/auto-docs/free-layout-editor/interfaces/FormPluginConfig.md#name)
* [onDispose](/auto-docs/free-layout-editor/interfaces/FormPluginConfig.md#ondispose)
* [onInit](/auto-docs/free-layout-editor/interfaces/FormPluginConfig.md#oninit)
* [onSetupFormMeta](/auto-docs/free-layout-editor/interfaces/FormPluginConfig.md#onsetupformmeta)

## Properties

### name

`Optional` **name**: `string`

form plugin name, for debug use

***

### onDispose

`Optional` **onDispose**: (`ctx`: [`FormPluginCtx`](/auto-docs/free-layout-editor/types/FormPluginCtx.md), `opts`: `Opts`) => `void`

#### Type declaration

(`ctx`, `opts`): `void`

FormModel 销毁时执行

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FormPluginCtx`](/auto-docs/free-layout-editor/types/FormPluginCtx.md) |
| `opts` | `Opts` |

##### Returns

`void`

***

### onInit

`Optional` **onInit**: (`ctx`: [`FormPluginCtx`](/auto-docs/free-layout-editor/types/FormPluginCtx.md), `opts`: `Opts`) => `void`

#### Type declaration

(`ctx`, `opts`): `void`

FormModel 初始化时执行

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FormPluginCtx`](/auto-docs/free-layout-editor/types/FormPluginCtx.md) |
| `opts` | `Opts` |

##### Returns

`void`

***

### onSetupFormMeta

`Optional` **onSetupFormMeta**: (`ctx`: [`FormPluginSetupMetaCtx`](/auto-docs/free-layout-editor/types/FormPluginSetupMetaCtx.md), `opts`: `Opts`) => `void`

#### Type declaration

(`ctx`, `opts`): `void`

setup formMeta

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FormPluginSetupMetaCtx`](/auto-docs/free-layout-editor/types/FormPluginSetupMetaCtx.md) |
| `opts` | `Opts` |

##### Returns

`void`
