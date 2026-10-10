# Class: HistoryStack

历史栈，聚合所有历史操作

## Table of contents

### Constructors

* [constructor](/en/auto-docs/history/classes/HistoryStack.md#constructor)

### Properties

* [historyConfig](/en/auto-docs/history/classes/HistoryStack.md#historyconfig)
* [limit](/en/auto-docs/history/classes/HistoryStack.md#limit)
* [onChange](/en/auto-docs/history/classes/HistoryStack.md#onchange)
* [onChangeEmitter](/en/auto-docs/history/classes/HistoryStack.md#onchangeemitter)

### Accessors

* [items](/en/auto-docs/history/classes/HistoryStack.md#items)

### Methods

* [add](/en/auto-docs/history/classes/HistoryStack.md#add)
* [addOperation](/en/auto-docs/history/classes/HistoryStack.md#addoperation)
* [changeByIndex](/en/auto-docs/history/classes/HistoryStack.md#changebyindex)
* [clear](/en/auto-docs/history/classes/HistoryStack.md#clear)
* [dispose](/en/auto-docs/history/classes/HistoryStack.md#dispose)
* [findById](/en/auto-docs/history/classes/HistoryStack.md#findbyid)
* [updateOperation](/en/auto-docs/history/classes/HistoryStack.md#updateoperation)
* [dateFormat](/en/auto-docs/history/classes/HistoryStack.md#dateformat)

## Constructors

### constructor

**new HistoryStack**()

## Properties

### historyConfig

**historyConfig**: [`HistoryConfig`](/en/auto-docs/history/classes/HistoryConfig.md)

***

### limit

**limit**: `number` = `100`

***

### onChange

`Readonly` **onChange**: `Event`<[`HistoryStackChangeEvent`](/en/auto-docs/history/types/HistoryStackChangeEvent.md)>

***

### onChangeEmitter

`Readonly` **onChangeEmitter**: `Emitter`<[`HistoryStackChangeEvent`](/en/auto-docs/history/types/HistoryStackChangeEvent.md)>

## Accessors

### items

`get` **items**(): [`HistoryItem`](/en/auto-docs/history/interfaces/HistoryItem.md)\[]

#### Returns

[`HistoryItem`](/en/auto-docs/history/interfaces/HistoryItem.md)\[]

## Methods

### add

**add**(`service`, `item`): [`HistoryItem`](/en/auto-docs/history/interfaces/HistoryItem.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`HistoryService`](/en/auto-docs/history/classes/HistoryService.md) |
| `item` | [`HistoryStackItem`](/en/auto-docs/history/interfaces/HistoryStackItem.md) |

#### Returns

[`HistoryItem`](/en/auto-docs/history/interfaces/HistoryItem.md)

***

### addOperation

**addOperation**(`service`, `id`, `op`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`HistoryService`](/en/auto-docs/history/classes/HistoryService.md) |
| `id` | `string` |
| `op` | [`OperationWithId`](/en/auto-docs/history/types/OperationWithId.md) |

#### Returns

`void`

***

### changeByIndex

**changeByIndex**(`index`, `service`, `item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `service` | [`HistoryService`](/en/auto-docs/history/classes/HistoryService.md) |
| `item` | [`HistoryStackItem`](/en/auto-docs/history/interfaces/HistoryStackItem.md) |

#### Returns

`void`

***

### clear

**clear**(): `void`

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### findById

**findById**(`id`): `undefined` | [`HistoryItem`](/en/auto-docs/history/interfaces/HistoryItem.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` | [`HistoryItem`](/en/auto-docs/history/interfaces/HistoryItem.md)

***

### updateOperation

**updateOperation**(`service`, `id`, `op`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`HistoryService`](/en/auto-docs/history/classes/HistoryService.md) |
| `id` | `string` |
| `op` | [`OperationWithId`](/en/auto-docs/history/types/OperationWithId.md) |

#### Returns

`void`

***

### dateFormat

`Static` **dateFormat**(`timestamp`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `timestamp` | `number` |

#### Returns

`string`
