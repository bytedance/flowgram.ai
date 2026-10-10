# Class: HistoryManager

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Implements

* [`IHistoryManager`](/auto-docs/fixed-history-plugin/interfaces/IHistoryManager.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-history-plugin/classes/HistoryManager.md#constructor)

### Properties

* [historyConfig](/auto-docs/fixed-history-plugin/classes/HistoryManager.md#historyconfig)
* [historyStack](/auto-docs/fixed-history-plugin/classes/HistoryManager.md#historystack)

### Methods

* [\_handleMerge](/auto-docs/fixed-history-plugin/classes/HistoryManager.md#_handlemerge)
* [dispose](/auto-docs/fixed-history-plugin/classes/HistoryManager.md#dispose)
* [getFirstHistoryService](/auto-docs/fixed-history-plugin/classes/HistoryManager.md#getfirsthistoryservice)
* [getHistoryServiceByURI](/auto-docs/fixed-history-plugin/classes/HistoryManager.md#gethistoryservicebyuri)
* [registerHistoryService](/auto-docs/fixed-history-plugin/classes/HistoryManager.md#registerhistoryservice)
* [unregisterHistoryService](/auto-docs/fixed-history-plugin/classes/HistoryManager.md#unregisterhistoryservice)

## Constructors

### constructor

**new HistoryManager**()

## Properties

### historyConfig

`Readonly` **historyConfig**: [`HistoryConfig`](/auto-docs/fixed-history-plugin/classes/HistoryConfig.md)

***

### historyStack

`Readonly` **historyStack**: [`HistoryStack`](/auto-docs/fixed-history-plugin/classes/HistoryStack.md)

## Methods

### \_handleMerge

**\_handleMerge**(`service`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`HistoryService`](/auto-docs/fixed-history-plugin/classes/HistoryService.md) |
| `event` | [`HistoryMergeEvent`](/auto-docs/fixed-history-plugin/types/HistoryMergeEvent.md) |

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### getFirstHistoryService

**getFirstHistoryService**(): `undefined` | [`HistoryService`](/auto-docs/fixed-history-plugin/classes/HistoryService.md)

#### Returns

`undefined` | [`HistoryService`](/auto-docs/fixed-history-plugin/classes/HistoryService.md)

***

### getHistoryServiceByURI

**getHistoryServiceByURI**(`uri`): `undefined` | [`HistoryService`](/auto-docs/fixed-history-plugin/classes/HistoryService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |

#### Returns

`undefined` | [`HistoryService`](/auto-docs/fixed-history-plugin/classes/HistoryService.md)

***

### registerHistoryService

**registerHistoryService**(`service`): `void`

注册历史服务

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | [`HistoryService`](/auto-docs/fixed-history-plugin/classes/HistoryService.md) | 历史服务示例 |

#### Returns

`void`

#### Implementation of

[IHistoryManager](/auto-docs/fixed-history-plugin/interfaces/IHistoryManager.md).[registerHistoryService](/auto-docs/fixed-history-plugin/interfaces/IHistoryManager.md#registerhistoryservice)

***

### unregisterHistoryService

**unregisterHistoryService**(`service`): `void`

取消注册历史服务

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | [`HistoryService`](/auto-docs/fixed-history-plugin/classes/HistoryService.md) | 历史服务示例 |

#### Returns

`void`

#### Implementation of

[IHistoryManager](/auto-docs/fixed-history-plugin/interfaces/IHistoryManager.md).[unregisterHistoryService](/auto-docs/fixed-history-plugin/interfaces/IHistoryManager.md#unregisterhistoryservice)
