# Class: SelectionService

画布全局的选择器，可以放任何东西

## Implements

* [`Disposable`](/en/auto-docs/playground-react/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/playground-react/classes/SelectionService.md#constructor)

### Properties

* [onSelectionChanged](/en/auto-docs/playground-react/classes/SelectionService.md#onselectionchanged)

### Accessors

* [selection](/en/auto-docs/playground-react/classes/SelectionService.md#selection)

### Methods

* [dispose](/en/auto-docs/playground-react/classes/SelectionService.md#dispose)
* [isEmpty](/en/auto-docs/playground-react/classes/SelectionService.md#isempty)

## Constructors

### constructor

**new SelectionService**()

## Properties

### onSelectionChanged

`Readonly` **onSelectionChanged**: [`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<`any`>

## Accessors

### selection

`get` **selection**(): [`Entity`](/en/auto-docs/playground-react/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/playground-react/interfaces/EntityOpts.md)>\[]

#### Returns

[`Entity`](/en/auto-docs/playground-react/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/playground-react/interfaces/EntityOpts.md)>\[]

`set` **selection**(`selection`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selection` | [`Entity`](/en/auto-docs/playground-react/classes/Entity-1.md)<`any`>\[] |

#### Returns

`void`

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/en/auto-docs/playground-react/interfaces/Disposable-1.md).[dispose](/en/auto-docs/playground-react/interfaces/Disposable-1.md#dispose)

***

### isEmpty

**isEmpty**(): `boolean`

#### Returns

`boolean`
