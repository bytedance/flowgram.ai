# Class: HistoryStack

历史栈，聚合所有历史操作

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/HistoryStack.md#constructor)

### Properties

* [historyConfig](/auto-docs/fixed-layout-editor/classes/HistoryStack.md#historyconfig)
* [limit](/auto-docs/fixed-layout-editor/classes/HistoryStack.md#limit)
* [onChange](/auto-docs/fixed-layout-editor/classes/HistoryStack.md#onchange)
* [onChangeEmitter](/auto-docs/fixed-layout-editor/classes/HistoryStack.md#onchangeemitter)

### Accessors

* [items](/auto-docs/fixed-layout-editor/classes/HistoryStack.md#items)

### Methods

* [add](/auto-docs/fixed-layout-editor/classes/HistoryStack.md#add)
* [addOperation](/auto-docs/fixed-layout-editor/classes/HistoryStack.md#addoperation)
* [changeByIndex](/auto-docs/fixed-layout-editor/classes/HistoryStack.md#changebyindex)
* [clear](/auto-docs/fixed-layout-editor/classes/HistoryStack.md#clear)
* [dispose](/auto-docs/fixed-layout-editor/classes/HistoryStack.md#dispose)
* [findById](/auto-docs/fixed-layout-editor/classes/HistoryStack.md#findbyid)
* [updateOperation](/auto-docs/fixed-layout-editor/classes/HistoryStack.md#updateoperation)
* [dateFormat](/auto-docs/fixed-layout-editor/classes/HistoryStack.md#dateformat)

## Constructors

### constructor

**new HistoryStack**()

## Properties

### historyConfig

**historyConfig**: [`HistoryConfig`](/auto-docs/fixed-layout-editor/classes/HistoryConfig.md)

***

### limit

**limit**: `number`

***

### onChange

`Readonly` **onChange**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`HistoryStackChangeEvent`](/auto-docs/fixed-layout-editor/types/HistoryStackChangeEvent.md)>

***

### onChangeEmitter

`Readonly` **onChangeEmitter**: [`Emitter`](/auto-docs/fixed-layout-editor/classes/Emitter.md)<[`HistoryStackChangeEvent`](/auto-docs/fixed-layout-editor/types/HistoryStackChangeEvent.md)>

## Accessors

### items

`get` **items**(): [`HistoryItem`](/auto-docs/fixed-layout-editor/interfaces/HistoryItem.md)\[]

#### Returns

[`HistoryItem`](/auto-docs/fixed-layout-editor/interfaces/HistoryItem.md)\[]

## Methods

### add

**add**(`service`, `item`): [`HistoryItem`](/auto-docs/fixed-layout-editor/interfaces/HistoryItem.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`HistoryService`](/auto-docs/fixed-layout-editor/classes/HistoryService.md) |
| `item` | [`HistoryStackItem`](/auto-docs/fixed-layout-editor/interfaces/HistoryStackItem.md) |

#### Returns

[`HistoryItem`](/auto-docs/fixed-layout-editor/interfaces/HistoryItem.md)

***

### addOperation

**addOperation**(`service`, `id`, `op`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`HistoryService`](/auto-docs/fixed-layout-editor/classes/HistoryService.md) |
| `id` | `string` |
| `op` | [`OperationWithId`](/auto-docs/fixed-layout-editor/types/OperationWithId.md) |

#### Returns

`void`

***

### changeByIndex

**changeByIndex**(`index`, `service`, `item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `service` | [`HistoryService`](/auto-docs/fixed-layout-editor/classes/HistoryService.md) |
| `item` | [`HistoryStackItem`](/auto-docs/fixed-layout-editor/interfaces/HistoryStackItem.md) |

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

**findById**(`id`): `undefined` | [`HistoryItem`](/auto-docs/fixed-layout-editor/interfaces/HistoryItem.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` | [`HistoryItem`](/auto-docs/fixed-layout-editor/interfaces/HistoryItem.md)

***

### updateOperation

**updateOperation**(`service`, `id`, `op`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`HistoryService`](/auto-docs/fixed-layout-editor/classes/HistoryService.md) |
| `id` | `string` |
| `op` | [`OperationWithId`](/auto-docs/fixed-layout-editor/types/OperationWithId.md) |

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
