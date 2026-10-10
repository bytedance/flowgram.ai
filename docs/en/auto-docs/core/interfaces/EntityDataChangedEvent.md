# Interface: EntityDataChangedEvent\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Entity`](/en/auto-docs/core/classes/Entity-1.md) = [`Entity`](/en/auto-docs/core/classes/Entity-1.md) |

## Table of contents

### Properties

* [data](/en/auto-docs/core/interfaces/EntityDataChangedEvent.md#data)
* [entity](/en/auto-docs/core/interfaces/EntityDataChangedEvent.md#entity)
* [type](/en/auto-docs/core/interfaces/EntityDataChangedEvent.md#type)

## Properties

### data

**data**: [`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}>

***

### entity

**entity**: `T`

***

### type

**type**: `"add"` | `"update"` | `"delete"`
