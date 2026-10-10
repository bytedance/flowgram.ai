# Interface: PluginContext

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Properties

* [container](/auto-docs/editor/interfaces/PluginContext.md#container)
* [playground](/auto-docs/editor/interfaces/PluginContext.md#playground)

### Methods

* [get](/auto-docs/editor/interfaces/PluginContext.md#get)
* [getAll](/auto-docs/editor/interfaces/PluginContext.md#getall)

## Properties

### container

**container**: [`Container`](/auto-docs/editor/interfaces/interfaces.Container.md)

IOC 容器

***

### playground

**playground**: [`Playground`](/auto-docs/editor/classes/Playground.md)<`any`>

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
| `identifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |

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
| `identifier` | [`ServiceIdentifier`](/auto-docs/editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`\[]
