# Class: SelectionService

画布全局的选择器，可以放任何东西

## Implements

* [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/SelectionService.md#constructor)

### Properties

* [onSelectionChanged](/auto-docs/fixed-layout-editor/classes/SelectionService.md#onselectionchanged)

### Accessors

* [selection](/auto-docs/fixed-layout-editor/classes/SelectionService.md#selection)

### Methods

* [dispose](/auto-docs/fixed-layout-editor/classes/SelectionService.md#dispose)
* [isEmpty](/auto-docs/fixed-layout-editor/classes/SelectionService.md#isempty)

## Constructors

### constructor

**new SelectionService**()

## Properties

### onSelectionChanged

`Readonly` **onSelectionChanged**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`any`>

## Accessors

### selection

`get` **selection**(): [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>\[]

#### Returns

[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>\[]

`set` **selection**(`selection`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selection` | [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<`any`>\[] |

#### Returns

`void`

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md).[dispose](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md#dispose)

***

### isEmpty

**isEmpty**(): `boolean`

#### Returns

`boolean`
