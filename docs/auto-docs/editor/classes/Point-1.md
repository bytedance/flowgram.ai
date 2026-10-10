# Class: Point

The Point object represents a location in a two-dimensional coordinate system, where x represents
the horizontal axis and y represents the vertical axis.

**`Memberof`**

PIXI

**`Implements`**

IPoint

## Implements

* [`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/Point-1.md#constructor)

### Properties

* [x](/auto-docs/editor/classes/Point-1.md#x)
* [y](/auto-docs/editor/classes/Point-1.md#y)

### Methods

* [clone](/auto-docs/editor/classes/Point-1.md#clone)
* [copyFrom](/auto-docs/editor/classes/Point-1.md#copyfrom)
* [copyTo](/auto-docs/editor/classes/Point-1.md#copyto)
* [equals](/auto-docs/editor/classes/Point-1.md#equals)
* [set](/auto-docs/editor/classes/Point-1.md#set)

## Constructors

### constructor

**new Point**(`x?`, `y?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x?` | `number` |
| `y?` | `number` |

## Properties

### x

**x**: `number`

X coord

#### Implementation of

[IPoint](/auto-docs/editor/interfaces/IPoint.md).[x](/auto-docs/editor/interfaces/IPoint.md#x)

***

### y

**y**: `number`

Y coord

#### Implementation of

[IPoint](/auto-docs/editor/interfaces/IPoint.md).[y](/auto-docs/editor/interfaces/IPoint.md#y)

## Methods

### clone

**clone**(): [`Point`](/auto-docs/editor/classes/Point-1.md)

Creates a clone of this point

#### Returns

[`Point`](/auto-docs/editor/classes/Point-1.md)

a copy of the point

***

### copyFrom

**copyFrom**(`p`): [`Point`](/auto-docs/editor/classes/Point-1.md)

Copies x and y from the given point

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p` | [`IPoint`](/auto-docs/editor/interfaces/IPoint.md) | The point to copy from |

#### Returns

[`Point`](/auto-docs/editor/classes/Point-1.md)

Returns itself.

***

### copyTo

**copyTo**<`T`>(`p`): `T`

Copies x and y into the given point

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`IPoint`](/auto-docs/editor/interfaces/IPoint.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p` | `T` | The point to copy. |

#### Returns

`T`

Given point with values updated

***

### equals

**equals**(`p`): `boolean`

Returns true if the given point is equal to this point

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p` | [`IPoint`](/auto-docs/editor/interfaces/IPoint.md) | The point to check |

#### Returns

`boolean`

Whether the given point equal to this point

***

### set

**set**(`x?`, `y?`): [`Point`](/auto-docs/editor/classes/Point-1.md)

Sets the point to a new x and y position.
If y is omitted, both x and y will be set to x.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x?` | `number` | position of the point on the x axis |
| `y?` | `number` | position of the point on the y axis |

#### Returns

[`Point`](/auto-docs/editor/classes/Point-1.md)

Returns itself.
