# Class: HistoryManager

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Implements

* [`IHistoryManager`](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryManager.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/HistoryManager.md#constructor)

### Properties

* [historyConfig](/en/auto-docs/fixed-layout-editor/classes/HistoryManager.md#historyconfig)
* [historyStack](/en/auto-docs/fixed-layout-editor/classes/HistoryManager.md#historystack)

### Methods

* [\_handleMerge](/en/auto-docs/fixed-layout-editor/classes/HistoryManager.md#_handlemerge)
* [dispose](/en/auto-docs/fixed-layout-editor/classes/HistoryManager.md#dispose)
* [getFirstHistoryService](/en/auto-docs/fixed-layout-editor/classes/HistoryManager.md#getfirsthistoryservice)
* [getHistoryServiceByURI](/en/auto-docs/fixed-layout-editor/classes/HistoryManager.md#gethistoryservicebyuri)
* [registerHistoryService](/en/auto-docs/fixed-layout-editor/classes/HistoryManager.md#registerhistoryservice)
* [unregisterHistoryService](/en/auto-docs/fixed-layout-editor/classes/HistoryManager.md#unregisterhistoryservice)

## Constructors

### constructor

**new HistoryManager**()

## Properties

### historyConfig

`Readonly` **historyConfig**: [`HistoryConfig`](/en/auto-docs/fixed-layout-editor/classes/HistoryConfig.md)

***

### historyStack

`Readonly` **historyStack**: [`HistoryStack`](/en/auto-docs/fixed-layout-editor/classes/HistoryStack.md)

## Methods

### \_handleMerge

**\_handleMerge**(`service`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`HistoryService`](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md) |
| `event` | [`HistoryMergeEvent`](/en/auto-docs/fixed-layout-editor/types/HistoryMergeEvent.md) |

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### getFirstHistoryService

**getFirstHistoryService**(): `undefined` | [`HistoryService`](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md)

#### Returns

`undefined` | [`HistoryService`](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md)

***

### getHistoryServiceByURI

**getHistoryServiceByURI**(`uri`): `undefined` | [`HistoryService`](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |

#### Returns

`undefined` | [`HistoryService`](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md)

***

### registerHistoryService

**registerHistoryService**(`service`): `void`

注册历史服务

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | [`HistoryService`](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md) | 历史服务示例 |

#### Returns

`void`

#### Implementation of

[IHistoryManager](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryManager.md).[registerHistoryService](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryManager.md#registerhistoryservice)

***

### unregisterHistoryService

**unregisterHistoryService**(`service`): `void`

取消注册历史服务

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | [`HistoryService`](/en/auto-docs/fixed-layout-editor/classes/HistoryService.md) | 历史服务示例 |

#### Returns

`void`

#### Implementation of

[IHistoryManager](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryManager.md).[unregisterHistoryService](/en/auto-docs/fixed-layout-editor/interfaces/IHistoryManager.md#unregisterhistoryservice)
