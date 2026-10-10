# Class: HistoryManager

历史服务管理

## Implements

* [`IHistoryManager`](/auto-docs/history/interfaces/IHistoryManager.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/history/classes/HistoryManager.md#constructor)

### Properties

* [historyConfig](/auto-docs/history/classes/HistoryManager.md#historyconfig)
* [historyStack](/auto-docs/history/classes/HistoryManager.md#historystack)

### Methods

* [\_handleMerge](/auto-docs/history/classes/HistoryManager.md#_handlemerge)
* [dispose](/auto-docs/history/classes/HistoryManager.md#dispose)
* [getFirstHistoryService](/auto-docs/history/classes/HistoryManager.md#getfirsthistoryservice)
* [getHistoryServiceByURI](/auto-docs/history/classes/HistoryManager.md#gethistoryservicebyuri)
* [registerHistoryService](/auto-docs/history/classes/HistoryManager.md#registerhistoryservice)
* [unregisterHistoryService](/auto-docs/history/classes/HistoryManager.md#unregisterhistoryservice)

## Constructors

### constructor

**new HistoryManager**()

## Properties

### historyConfig

`Readonly` **historyConfig**: [`HistoryConfig`](/auto-docs/history/classes/HistoryConfig.md)

***

### historyStack

`Readonly` **historyStack**: [`HistoryStack`](/auto-docs/history/classes/HistoryStack.md)

## Methods

### \_handleMerge

**\_handleMerge**(`service`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`HistoryService`](/auto-docs/history/classes/HistoryService.md) |
| `event` | [`HistoryMergeEvent`](/auto-docs/history/types/HistoryMergeEvent.md) |

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### getFirstHistoryService

**getFirstHistoryService**(): `undefined` | [`HistoryService`](/auto-docs/history/classes/HistoryService.md)

#### Returns

`undefined` | [`HistoryService`](/auto-docs/history/classes/HistoryService.md)

***

### getHistoryServiceByURI

**getHistoryServiceByURI**(`uri`): `undefined` | [`HistoryService`](/auto-docs/history/classes/HistoryService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |

#### Returns

`undefined` | [`HistoryService`](/auto-docs/history/classes/HistoryService.md)

***

### registerHistoryService

**registerHistoryService**(`service`): `void`

注册历史服务

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | [`HistoryService`](/auto-docs/history/classes/HistoryService.md) | 历史服务示例 |

#### Returns

`void`

#### Implementation of

[IHistoryManager](/auto-docs/history/interfaces/IHistoryManager.md).[registerHistoryService](/auto-docs/history/interfaces/IHistoryManager.md#registerhistoryservice)

***

### unregisterHistoryService

**unregisterHistoryService**(`service`): `void`

取消注册历史服务

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | [`HistoryService`](/auto-docs/history/classes/HistoryService.md) | 历史服务示例 |

#### Returns

`void`

#### Implementation of

[IHistoryManager](/auto-docs/history/interfaces/IHistoryManager.md).[unregisterHistoryService](/auto-docs/history/interfaces/IHistoryManager.md#unregisterhistoryservice)
