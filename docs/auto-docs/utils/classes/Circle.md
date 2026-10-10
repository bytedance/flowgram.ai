# Class: Circle

The Circle object is used to help draw graphics and can also be used to specify a hit area for displayObjects.

## Table of contents

### Constructors

* [constructor](/auto-docs/utils/classes/Circle.md#constructor)

### Properties

* [radius](/auto-docs/utils/classes/Circle.md#radius)
* [type](/auto-docs/utils/classes/Circle.md#type)
* [x](/auto-docs/utils/classes/Circle.md#x)
* [y](/auto-docs/utils/classes/Circle.md#y)

### Methods

* [clone](/auto-docs/utils/classes/Circle.md#clone)
* [contains](/auto-docs/utils/classes/Circle.md#contains)
* [getBounds](/auto-docs/utils/classes/Circle.md#getbounds)

## Constructors

### constructor

**new Circle**(`x?`, `y?`, `radius?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `x` | `number` | `0` | Circle center x |
| `y` | `number` | `0` | Circle center y |
| `radius` | `number` | `0` | - |

## Properties

### radius

**radius**: `number` = `0`

***

### type

`Readonly` **type**: [`CIRC`](/auto-docs/utils/enums/SHAPES.md#circ) = `SHAPES.CIRC`

The type of the object, mainly used to avoid `instanceof` checks

***

### x

**x**: `number` = `0`

Circle center x

***

### y

**y**: `number` = `0`

Circle center y

## Methods

### clone

**clone**(): [`Circle`](/auto-docs/utils/classes/Circle.md)

Creates a clone of this Circle instance

#### Returns

[`Circle`](/auto-docs/utils/classes/Circle.md)

a copy of the Circle

***

### contains

**contains**(`x`, `y`): `boolean`

Checks whether the x and y coordinates given are contained within this circle

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

`boolean`

Whether the (x, y) coordinates are within this Circle

***

### getBounds

**getBounds**(): [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

Returns the framing rectangle of the circle as a Rectangle object

#### Returns

[`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

the framing rectangle
