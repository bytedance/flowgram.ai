# Class: HistoryManager

历史服务管理

## Implements

* [`IHistoryManager`](/en/auto-docs/history/interfaces/IHistoryManager.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/history/classes/HistoryManager.md#constructor)

### Properties

* [historyConfig](/en/auto-docs/history/classes/HistoryManager.md#historyconfig)
* [historyStack](/en/auto-docs/history/classes/HistoryManager.md#historystack)

### Methods

* [\_handleMerge](/en/auto-docs/history/classes/HistoryManager.md#_handlemerge)
* [dispose](/en/auto-docs/history/classes/HistoryManager.md#dispose)
* [getFirstHistoryService](/en/auto-docs/history/classes/HistoryManager.md#getfirsthistoryservice)
* [getHistoryServiceByURI](/en/auto-docs/history/classes/HistoryManager.md#gethistoryservicebyuri)
* [registerHistoryService](/en/auto-docs/history/classes/HistoryManager.md#registerhistoryservice)
* [unregisterHistoryService](/en/auto-docs/history/classes/HistoryManager.md#unregisterhistoryservice)

## Constructors

### constructor

**new HistoryManager**()

## Properties

### historyConfig

`Readonly` **historyConfig**: [`HistoryConfig`](/en/auto-docs/history/classes/HistoryConfig.md)

***

### historyStack

`Readonly` **historyStack**: [`HistoryStack`](/en/auto-docs/history/classes/HistoryStack.md)

## Methods

### \_handleMerge

**\_handleMerge**(`service`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`HistoryService`](/en/auto-docs/history/classes/HistoryService.md) |
| `event` | [`HistoryMergeEvent`](/en/auto-docs/history/types/HistoryMergeEvent.md) |

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### getFirstHistoryService

**getFirstHistoryService**(): `undefined` | [`HistoryService`](/en/auto-docs/history/classes/HistoryService.md)

#### Returns

`undefined` | [`HistoryService`](/en/auto-docs/history/classes/HistoryService.md)

***

### getHistoryServiceByURI

**getHistoryServiceByURI**(`uri`): `undefined` | [`HistoryService`](/en/auto-docs/history/classes/HistoryService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |

#### Returns

`undefined` | [`HistoryService`](/en/auto-docs/history/classes/HistoryService.md)

***

### registerHistoryService

**registerHistoryService**(`service`): `void`

注册历史服务

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | [`HistoryService`](/en/auto-docs/history/classes/HistoryService.md) | 历史服务示例 |

#### Returns

`void`

#### Implementation of

[IHistoryManager](/en/auto-docs/history/interfaces/IHistoryManager.md).[registerHistoryService](/en/auto-docs/history/interfaces/IHistoryManager.md#registerhistoryservice)

***

### unregisterHistoryService

**unregisterHistoryService**(`service`): `void`

取消注册历史服务

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | [`HistoryService`](/en/auto-docs/history/classes/HistoryService.md) | 历史服务示例 |

#### Returns

`void`

#### Implementation of

[IHistoryManager](/en/auto-docs/history/interfaces/IHistoryManager.md).[unregisterHistoryService](/en/auto-docs/history/interfaces/IHistoryManager.md#unregisterhistoryservice)
