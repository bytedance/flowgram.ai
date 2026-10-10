# Interface: PluginContext

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Properties

* [container](/en/auto-docs/fixed-layout-editor/interfaces/PluginContext.md#container)
* [playground](/en/auto-docs/fixed-layout-editor/interfaces/PluginContext.md#playground)

### Methods

* [get](/en/auto-docs/fixed-layout-editor/interfaces/PluginContext.md#get)
* [getAll](/en/auto-docs/fixed-layout-editor/interfaces/PluginContext.md#getall)

## Properties

### container

**container**: [`Container`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)

IOC 容器

***

### playground

**playground**: [`Playground`](/en/auto-docs/fixed-layout-editor/classes/Playground.md)<`any`>

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
| `identifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

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
| `identifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`\[]
