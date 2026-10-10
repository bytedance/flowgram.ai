# Class: SelectionService

画布全局的选择器，可以放任何东西

## Implements

* `Disposable`

## Table of contents

### Constructors

* [constructor](/auto-docs/core/classes/SelectionService.md#constructor)

### Properties

* [onSelectionChanged](/auto-docs/core/classes/SelectionService.md#onselectionchanged)

### Accessors

* [selection](/auto-docs/core/classes/SelectionService.md#selection)

### Methods

* [dispose](/auto-docs/core/classes/SelectionService.md#dispose)
* [isEmpty](/auto-docs/core/classes/SelectionService.md#isempty)

## Constructors

### constructor

**new SelectionService**()

## Properties

### onSelectionChanged

`Readonly` **onSelectionChanged**: `Event`<`any`>

## Accessors

### selection

`get` **selection**(): [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>\[]

#### Returns

[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>\[]

`set` **selection**(`selection`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selection` | [`Entity`](/auto-docs/core/classes/Entity-1.md)<`any`>\[] |

#### Returns

`void`

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

Disposable.dispose

***

### isEmpty

**isEmpty**(): `boolean`

#### Returns

`boolean`
