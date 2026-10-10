# Class: SelectionService

画布全局的选择器，可以放任何东西

## Implements

* [`Disposable`](/auto-docs/playground-react/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/playground-react/classes/SelectionService.md#constructor)

### Properties

* [onSelectionChanged](/auto-docs/playground-react/classes/SelectionService.md#onselectionchanged)

### Accessors

* [selection](/auto-docs/playground-react/classes/SelectionService.md#selection)

### Methods

* [dispose](/auto-docs/playground-react/classes/SelectionService.md#dispose)
* [isEmpty](/auto-docs/playground-react/classes/SelectionService.md#isempty)

## Constructors

### constructor

**new SelectionService**()

## Properties

### onSelectionChanged

`Readonly` **onSelectionChanged**: [`Event`](/auto-docs/playground-react/interfaces/Event-1.md)<`any`>

## Accessors

### selection

`get` **selection**(): [`Entity`](/auto-docs/playground-react/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/playground-react/interfaces/EntityOpts.md)>\[]

#### Returns

[`Entity`](/auto-docs/playground-react/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/playground-react/interfaces/EntityOpts.md)>\[]

`set` **selection**(`selection`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selection` | [`Entity`](/auto-docs/playground-react/classes/Entity-1.md)<`any`>\[] |

#### Returns

`void`

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/auto-docs/playground-react/interfaces/Disposable-1.md).[dispose](/auto-docs/playground-react/interfaces/Disposable-1.md#dispose)

***

### isEmpty

**isEmpty**(): `boolean`

#### Returns

`boolean`
