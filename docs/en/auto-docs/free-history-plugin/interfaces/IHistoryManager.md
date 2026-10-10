# Interface: IHistoryManager

历史服务管理

## Implemented by

* [`HistoryManager`](/en/auto-docs/free-history-plugin/classes/HistoryManager.md)

## Table of contents

### Methods

* [registerHistoryService](/en/auto-docs/free-history-plugin/interfaces/IHistoryManager.md#registerhistoryservice)
* [unregisterHistoryService](/en/auto-docs/free-history-plugin/interfaces/IHistoryManager.md#unregisterhistoryservice)

## Methods

### registerHistoryService

**registerHistoryService**(`service`): `void`

注册历史服务

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | [`IHistoryService`](/en/auto-docs/free-history-plugin/interfaces/IHistoryService.md) | 历史服务示例 |

#### Returns

`void`

***

### unregisterHistoryService

**unregisterHistoryService**(`service`): `void`

取消注册历史服务

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | [`HistoryService`](/en/auto-docs/free-history-plugin/classes/HistoryService.md) | 历史服务示例 |

#### Returns

`void`
