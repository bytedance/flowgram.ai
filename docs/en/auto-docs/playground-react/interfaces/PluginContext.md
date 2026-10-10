# Interface: PluginContext

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Properties

* [container](/en/auto-docs/playground-react/interfaces/PluginContext.md#container)
* [playground](/en/auto-docs/playground-react/interfaces/PluginContext.md#playground)

### Methods

* [get](/en/auto-docs/playground-react/interfaces/PluginContext.md#get)
* [getAll](/en/auto-docs/playground-react/interfaces/PluginContext.md#getall)

## Properties

### container

**container**: `Container`

IOC 容器

***

### playground

**playground**: [`Playground`](/en/auto-docs/playground-react/classes/Playground.md)<`any`>

画布实例

## Methods

### get

**get**<`T`>(`identifier`): `T`

获取 IOC 容器的 单例模块

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | `ServiceIdentifier`<`T`> |

#### Returns

`T`

***

### getAll

**getAll**<`T`>(`identifier`): `T`\[]

获取 IOC 容器的 多例模块

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | `ServiceIdentifier`<`T`> |

#### Returns

`T`\[]
