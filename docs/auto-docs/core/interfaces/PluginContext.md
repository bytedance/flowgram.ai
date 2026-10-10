# Interface: PluginContext

## Table of contents

### Properties

* [container](/auto-docs/core/interfaces/PluginContext.md#container)
* [playground](/auto-docs/core/interfaces/PluginContext.md#playground)

### Methods

* [get](/auto-docs/core/interfaces/PluginContext.md#get)
* [getAll](/auto-docs/core/interfaces/PluginContext.md#getall)

## Properties

### container

**container**: `Container`

IOC 容器

***

### playground

**playground**: [`Playground`](/auto-docs/core/classes/Playground.md)<`any`>

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
