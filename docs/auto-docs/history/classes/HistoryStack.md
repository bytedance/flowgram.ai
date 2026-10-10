# Class: HistoryStack

历史栈，聚合所有历史操作

## Table of contents

### Constructors

* [constructor](/auto-docs/history/classes/HistoryStack.md#constructor)

### Properties

* [historyConfig](/auto-docs/history/classes/HistoryStack.md#historyconfig)
* [limit](/auto-docs/history/classes/HistoryStack.md#limit)
* [onChange](/auto-docs/history/classes/HistoryStack.md#onchange)
* [onChangeEmitter](/auto-docs/history/classes/HistoryStack.md#onchangeemitter)

### Accessors

* [items](/auto-docs/history/classes/HistoryStack.md#items)

### Methods

* [add](/auto-docs/history/classes/HistoryStack.md#add)
* [addOperation](/auto-docs/history/classes/HistoryStack.md#addoperation)
* [changeByIndex](/auto-docs/history/classes/HistoryStack.md#changebyindex)
* [clear](/auto-docs/history/classes/HistoryStack.md#clear)
* [dispose](/auto-docs/history/classes/HistoryStack.md#dispose)
* [findById](/auto-docs/history/classes/HistoryStack.md#findbyid)
* [updateOperation](/auto-docs/history/classes/HistoryStack.md#updateoperation)
* [dateFormat](/auto-docs/history/classes/HistoryStack.md#dateformat)

## Constructors

### constructor

**new HistoryStack**()

## Properties

### historyConfig

**historyConfig**: [`HistoryConfig`](/auto-docs/history/classes/HistoryConfig.md)

***

### limit

**limit**: `number` = `100`

***

### onChange

`Readonly` **onChange**: `Event`<[`HistoryStackChangeEvent`](/auto-docs/history/types/HistoryStackChangeEvent.md)>

***

### onChangeEmitter

`Readonly` **onChangeEmitter**: `Emitter`<[`HistoryStackChangeEvent`](/auto-docs/history/types/HistoryStackChangeEvent.md)>

## Accessors

### items

`get` **items**(): [`HistoryItem`](/auto-docs/history/interfaces/HistoryItem.md)\[]

#### Returns

[`HistoryItem`](/auto-docs/history/interfaces/HistoryItem.md)\[]

## Methods

### add

**add**(`service`, `item`): [`HistoryItem`](/auto-docs/history/interfaces/HistoryItem.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`HistoryService`](/auto-docs/history/classes/HistoryService.md) |
| `item` | [`HistoryStackItem`](/auto-docs/history/interfaces/HistoryStackItem.md) |

#### Returns

[`HistoryItem`](/auto-docs/history/interfaces/HistoryItem.md)

***

### addOperation

**addOperation**(`service`, `id`, `op`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`HistoryService`](/auto-docs/history/classes/HistoryService.md) |
| `id` | `string` |
| `op` | [`OperationWithId`](/auto-docs/history/types/OperationWithId.md) |

#### Returns

`void`

***

### changeByIndex

**changeByIndex**(`index`, `service`, `item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `service` | [`HistoryService`](/auto-docs/history/classes/HistoryService.md) |
| `item` | [`HistoryStackItem`](/auto-docs/history/interfaces/HistoryStackItem.md) |

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

**findById**(`id`): `undefined` | [`HistoryItem`](/auto-docs/history/interfaces/HistoryItem.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` | [`HistoryItem`](/auto-docs/history/interfaces/HistoryItem.md)

***

### updateOperation

**updateOperation**(`service`, `id`, `op`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`HistoryService`](/auto-docs/history/classes/HistoryService.md) |
| `id` | `string` |
| `op` | [`OperationWithId`](/auto-docs/history/types/OperationWithId.md) |

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
