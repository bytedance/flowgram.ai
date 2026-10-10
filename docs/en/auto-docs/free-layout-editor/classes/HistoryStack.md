# Class: HistoryStack

历史栈，聚合所有历史操作

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/HistoryStack.md#constructor)

### Properties

* [historyConfig](/en/auto-docs/free-layout-editor/classes/HistoryStack.md#historyconfig)
* [limit](/en/auto-docs/free-layout-editor/classes/HistoryStack.md#limit)
* [onChange](/en/auto-docs/free-layout-editor/classes/HistoryStack.md#onchange)
* [onChangeEmitter](/en/auto-docs/free-layout-editor/classes/HistoryStack.md#onchangeemitter)

### Accessors

* [items](/en/auto-docs/free-layout-editor/classes/HistoryStack.md#items)

### Methods

* [add](/en/auto-docs/free-layout-editor/classes/HistoryStack.md#add)
* [addOperation](/en/auto-docs/free-layout-editor/classes/HistoryStack.md#addoperation)
* [changeByIndex](/en/auto-docs/free-layout-editor/classes/HistoryStack.md#changebyindex)
* [clear](/en/auto-docs/free-layout-editor/classes/HistoryStack.md#clear)
* [dispose](/en/auto-docs/free-layout-editor/classes/HistoryStack.md#dispose)
* [findById](/en/auto-docs/free-layout-editor/classes/HistoryStack.md#findbyid)
* [updateOperation](/en/auto-docs/free-layout-editor/classes/HistoryStack.md#updateoperation)
* [dateFormat](/en/auto-docs/free-layout-editor/classes/HistoryStack.md#dateformat)

## Constructors

### constructor

**new HistoryStack**()

## Properties

### historyConfig

**historyConfig**: [`HistoryConfig`](/en/auto-docs/free-layout-editor/classes/HistoryConfig.md)

***

### limit

**limit**: `number`

***

### onChange

`Readonly` **onChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`HistoryStackChangeEvent`](/en/auto-docs/free-layout-editor/types/HistoryStackChangeEvent.md)>

***

### onChangeEmitter

`Readonly` **onChangeEmitter**: [`Emitter`](/en/auto-docs/free-layout-editor/classes/Emitter.md)<[`HistoryStackChangeEvent`](/en/auto-docs/free-layout-editor/types/HistoryStackChangeEvent.md)>

## Accessors

### items

`get` **items**(): [`HistoryItem`](/en/auto-docs/free-layout-editor/interfaces/HistoryItem.md)\[]

#### Returns

[`HistoryItem`](/en/auto-docs/free-layout-editor/interfaces/HistoryItem.md)\[]

## Methods

### add

**add**(`service`, `item`): [`HistoryItem`](/en/auto-docs/free-layout-editor/interfaces/HistoryItem.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`HistoryService`](/en/auto-docs/free-layout-editor/classes/HistoryService.md) |
| `item` | [`HistoryStackItem`](/en/auto-docs/free-layout-editor/interfaces/HistoryStackItem.md) |

#### Returns

[`HistoryItem`](/en/auto-docs/free-layout-editor/interfaces/HistoryItem.md)

***

### addOperation

**addOperation**(`service`, `id`, `op`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`HistoryService`](/en/auto-docs/free-layout-editor/classes/HistoryService.md) |
| `id` | `string` |
| `op` | [`OperationWithId`](/en/auto-docs/free-layout-editor/types/OperationWithId.md) |

#### Returns

`void`

***

### changeByIndex

**changeByIndex**(`index`, `service`, `item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `service` | [`HistoryService`](/en/auto-docs/free-layout-editor/classes/HistoryService.md) |
| `item` | [`HistoryStackItem`](/en/auto-docs/free-layout-editor/interfaces/HistoryStackItem.md) |

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

**findById**(`id`): `undefined` | [`HistoryItem`](/en/auto-docs/free-layout-editor/interfaces/HistoryItem.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` | [`HistoryItem`](/en/auto-docs/free-layout-editor/interfaces/HistoryItem.md)

***

### updateOperation

**updateOperation**(`service`, `id`, `op`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`HistoryService`](/en/auto-docs/free-layout-editor/classes/HistoryService.md) |
| `id` | `string` |
| `op` | [`OperationWithId`](/en/auto-docs/free-layout-editor/types/OperationWithId.md) |

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
