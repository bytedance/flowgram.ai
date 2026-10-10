# Class: Rectangle

Rectangle object is an area defined by its position, as indicated by its top-left corner
point (x, y) and by its width and its height.

## Table of contents

### Constructors

* [constructor](/auto-docs/utils/classes/Rectangle-1.md#constructor)

### Properties

* [height](/auto-docs/utils/classes/Rectangle-1.md#height)
* [type](/auto-docs/utils/classes/Rectangle-1.md#type)
* [width](/auto-docs/utils/classes/Rectangle-1.md#width)
* [x](/auto-docs/utils/classes/Rectangle-1.md#x)
* [y](/auto-docs/utils/classes/Rectangle-1.md#y)

### Accessors

* [bottom](/auto-docs/utils/classes/Rectangle-1.md#bottom)
* [bottomCenter](/auto-docs/utils/classes/Rectangle-1.md#bottomcenter)
* [center](/auto-docs/utils/classes/Rectangle-1.md#center)
* [crossDistance](/auto-docs/utils/classes/Rectangle-1.md#crossdistance)
* [left](/auto-docs/utils/classes/Rectangle-1.md#left)
* [leftBottom](/auto-docs/utils/classes/Rectangle-1.md#leftbottom)
* [leftCenter](/auto-docs/utils/classes/Rectangle-1.md#leftcenter)
* [leftTop](/auto-docs/utils/classes/Rectangle-1.md#lefttop)
* [right](/auto-docs/utils/classes/Rectangle-1.md#right)
* [rightBottom](/auto-docs/utils/classes/Rectangle-1.md#rightbottom)
* [rightCenter](/auto-docs/utils/classes/Rectangle-1.md#rightcenter)
* [rightTop](/auto-docs/utils/classes/Rectangle-1.md#righttop)
* [top](/auto-docs/utils/classes/Rectangle-1.md#top)
* [topCenter](/auto-docs/utils/classes/Rectangle-1.md#topcenter)
* [EMPTY](/auto-docs/utils/classes/Rectangle-1.md#empty)

### Methods

* [ceil](/auto-docs/utils/classes/Rectangle-1.md#ceil)
* [clearSpace](/auto-docs/utils/classes/Rectangle-1.md#clearspace)
* [clone](/auto-docs/utils/classes/Rectangle-1.md#clone)
* [contains](/auto-docs/utils/classes/Rectangle-1.md#contains)
* [containsRectangle](/auto-docs/utils/classes/Rectangle-1.md#containsrectangle)
* [copyFrom](/auto-docs/utils/classes/Rectangle-1.md#copyfrom)
* [copyTo](/auto-docs/utils/classes/Rectangle-1.md#copyto)
* [enlarge](/auto-docs/utils/classes/Rectangle-1.md#enlarge)
* [fit](/auto-docs/utils/classes/Rectangle-1.md#fit)
* [isEqual](/auto-docs/utils/classes/Rectangle-1.md#isequal)
* [pad](/auto-docs/utils/classes/Rectangle-1.md#pad)
* [toStyleStr](/auto-docs/utils/classes/Rectangle-1.md#tostylestr)
* [update](/auto-docs/utils/classes/Rectangle-1.md#update)
* [withHeight](/auto-docs/utils/classes/Rectangle-1.md#withheight)
* [withPadding](/auto-docs/utils/classes/Rectangle-1.md#withpadding)
* [withoutPadding](/auto-docs/utils/classes/Rectangle-1.md#withoutpadding)

## Constructors

### constructor

**new Rectangle**(`x?`, `y?`, `width?`, `height?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `x?` | `number` | `0` | The X coordinate of the upper-left corner of the rectangle |
| `y?` | `number` | `0` | The Y coordinate of the upper-left corner of the rectangle |
| `width?` | `number` | `0` | The overall width of this rectangle |
| `height?` | `number` | `0` | The overall height of this rectangle |

## Properties

### height

**height**: `number` = `0`

The overall height of this rectangle

***

### type

`Readonly` **type**: [`RECT`](/auto-docs/utils/enums/SHAPES.md#rect) = `SHAPES.RECT`

The type of the object, mainly used to avoid `instanceof` checks

***

### width

**width**: `number` = `0`

The overall width of this rectangle

***

### x

**x**: `number` = `0`

The X coordinate of the upper-left corner of the rectangle

***

### y

**y**: `number` = `0`

The Y coordinate of the upper-left corner of the rectangle

## Accessors

### bottom

`get` **bottom**(): `number`

#### Returns

`number`

***

### bottomCenter

`get` **bottomCenter**(): [`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

***

### center

`get` **center**(): [`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

***

### crossDistance

`get` **crossDistance**(): `number`

#### Returns

`number`

***

### left

`get` **left**(): `number`

#### Returns

`number`

***

### leftBottom

`get` **leftBottom**(): [`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

***

### leftCenter

`get` **leftCenter**(): [`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

***

### leftTop

`get` **leftTop**(): [`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

***

### right

`get` **right**(): `number`

#### Returns

`number`

***

### rightBottom

`get` **rightBottom**(): [`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

***

### rightCenter

`get` **rightCenter**(): [`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

***

### rightTop

`get` **rightTop**(): [`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

***

### top

`get` **top**(): `number`

#### Returns

`number`

***

### topCenter

`get` **topCenter**(): [`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

***

### EMPTY

`Static` `get` **EMPTY**(): [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

A constant empty rectangle. MUST NOT modify properties!

#### Returns

[`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

## Methods

### ceil

**ceil**(`resolution?`, `precision?`): [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

Enlarges rectangle that way its corners lie on grid

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `resolution` | `number` | `1` |
| `precision` | `number` | `0.001` |

#### Returns

[`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

***

### clearSpace

**clearSpace**(): [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

#### Returns

[`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

***

### clone

**clone**(): [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

Creates a clone of this Rectangle.

#### Returns

[`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

a copy of the rectangle

***

### contains

**contains**(`x`, `y`): `boolean`

Checks whether the x and y coordinates given are contained within this Rectangle

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The X coordinate of the point to test |
| `y` | `number` | The Y coordinate of the point to test |

#### Returns

`boolean`

Whether the x/y coordinates are within this Rectangle

***

### containsRectangle

**containsRectangle**(`rect`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rect` | [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md) |

#### Returns

`boolean`

***

### copyFrom

**copyFrom**(`rectangle`): [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

Copies another rectangle to this one.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rectangle` | [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md) |

#### Returns

[`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

Returns itself.

***

### copyTo

**copyTo**(`rectangle`): [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

Copies this rectangle to another one.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rectangle` | [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md) |

#### Returns

[`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

Returns given rectangle.

***

### enlarge

**enlarge**(`rectangle`): [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

Enlarges this rectangle to include the passed rectangle.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rectangle` | [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md) |

#### Returns

[`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

***

### fit

**fit**(`rectangle`): [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

Fits this rectangle around the passed one.
Intersection 交集

#### Parameters

| Name | Type |
| :------ | :------ |
| `rectangle` | [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md) |

#### Returns

[`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

***

### isEqual

**isEqual**(`rect`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rect` | [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md) |

#### Returns

`boolean`

***

### pad

**pad**(`paddingX?`, `paddingY?`): [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

Pads the rectangle making it grow in all directions.
If paddingY is omitted, both paddingX and paddingY will be set to paddingX.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `paddingX?` | `number` | `0` | The horizontal padding amount. |
| `paddingY?` | `number` | `paddingX` | The vertical padding amount. |

#### Returns

[`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

***

### toStyleStr

**toStyleStr**(): `string`

#### Returns

`string`

***

### update

**update**(`fn`): [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`rect`: [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)) => [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md) |

#### Returns

[`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

***

### withHeight

**withHeight**(`height`): [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `height` | `number` |

#### Returns

[`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

***

### withPadding

**withPadding**(`padding`): [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `padding` | [`PaddingSchema`](/auto-docs/utils/interfaces/PaddingSchema-1.md) |

#### Returns

[`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

***

### withoutPadding

**withoutPadding**(`padding`): [`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `padding` | [`PaddingSchema`](/auto-docs/utils/interfaces/PaddingSchema-1.md) |

#### Returns

[`Rectangle`](/auto-docs/utils/classes/Rectangle-1.md)
